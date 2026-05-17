/**
 * Compresses an image file entirely in the browser.
 * HEIC/HEIF files are converted via heic2any before compression.
 * All other formats use the Canvas API — no server, no upload.
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

function compressViaCanvas(source: Blob, quality: number, outputMime: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(source);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas toBlob returned null'));
          // Mobile Safari (and some Android browsers) don't support WebP encoding via canvas
          // and silently fall back to PNG, which ignores quality. Re-encode as JPEG so the
          // quality slider still works on unsupported browsers.
          if (blob.type !== outputMime) {
            canvas.toBlob(
              (fallback) => {
                if (fallback) resolve(fallback);
                else resolve(blob);
              },
              'image/jpeg',
              quality,
            );
          } else {
            resolve(blob);
          }
        },
        outputMime,
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load image`));
    };

    img.src = objectUrl;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
