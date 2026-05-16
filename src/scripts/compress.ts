/**
 * Compresses an image file entirely in the browser.
 * HEIC/HEIF files are converted to JPEG via heic2any before compression.
 * All other formats use the Canvas API — no server, no upload.
 */
export async function compressImage(file: File, quality = 0.8): Promise<Blob> {
  const isHeic = /\.(heic|heif)$/i.test(file.name) || file.type === 'image/heic' || file.type === 'image/heif';

  if (isHeic) {
    const { default: heic2any } = await import('heic2any');
    const result = await heic2any({ blob: file, toType: 'image/jpeg', quality });
    return Array.isArray(result) ? result[0] : result;
  }

  return compressViaCanvas(file, quality);
}

function compressViaCanvas(file: File, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));
      ctx.drawImage(img, 0, 0);

      // GIFs fall back to PNG (canvas can't re-encode animated GIFs)
      const outputMime = file.type === 'image/gif' ? 'image/png' : (file.type || 'image/jpeg');

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas toBlob returned null'));
        },
        outputMime,
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load image: ${file.name}`));
    };

    img.src = objectUrl;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
