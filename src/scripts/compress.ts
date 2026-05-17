/**
 * Compresses an image file entirely in the browser.
 * HEIC/HEIF files are converted via heic2any before compression.
 * All other formats use the Canvas API — no server, no upload.
 * WebP is encoded via the Canvas API where supported, falling back to
 * a WASM build of libwebp (@jsquash/webp) on browsers like mobile Safari.
 */
export async function compressImage(file: File, quality = 0.8, outputMime = 'image/jpeg'): Promise<Blob> {
  const isHeic = /\.(heic|heif)$/i.test(file.name) || file.type === 'image/heic' || file.type === 'image/heif';

  if (isHeic) {
    const { default: heic2any } = await import('heic2any');
    // heic2any only supports jpeg/png; use png as lossless intermediate when targeting webp
    const intermediateType = outputMime === 'image/webp' ? 'image/png' : (outputMime as 'image/jpeg' | 'image/png');
    const result = await heic2any({ blob: file, toType: intermediateType, quality });
    const intermediate = Array.isArray(result) ? result[0] : result;
    if (outputMime === 'image/webp') {
      return compressViaCanvas(intermediate, quality, outputMime);
    }
    return intermediate;
  }

  return compressViaCanvas(file, quality, outputMime);
}

function canEncodeWebP(): boolean {
  const c = document.createElement('canvas');
  c.width = 1; c.height = 1;
  return c.toDataURL('image/webp').startsWith('data:image/webp');
}

async function compressViaCanvas(source: Blob, quality: number, outputMime: string): Promise<Blob> {
  const img = new Image();
  const objectUrl = URL.createObjectURL(source);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = objectUrl;
  }).finally(() => URL.revokeObjectURL(objectUrl));

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');
  ctx.drawImage(img, 0, 0);

  // Use WASM libwebp on browsers that can't natively encode WebP (mobile Safari etc.)
  if (outputMime === 'image/webp' && !canEncodeWebP()) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { default: encode } = await import('@jsquash/webp/encode');
    const arrayBuffer = await encode(imageData, { quality: Math.round(quality * 100) });
    return new Blob([arrayBuffer], { type: 'image/webp' });
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob returned null'));
      },
      outputMime,
      quality,
    );
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
