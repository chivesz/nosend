import sharp from 'sharp';

const logoBuffer = await sharp('./public/logo.png')
  .resize(180, 180)
  .png()
  .toBuffer();
const logoBase64 = logoBuffer.toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="12" height="630" fill="#4F46E5"/>
  <circle cx="160" cy="315" r="110" fill="#EEF2FF"/>
  <image href="data:image/png;base64,${logoBase64}" x="70" y="225" width="180" height="180"/>
  <text x="310" y="290" font-family="Segoe UI" font-size="88" font-weight="700" fill="#4F46E5">no</text>
  <text x="444" y="290" font-family="Segoe UI" font-size="88" font-weight="700" fill="#0F172A">send.io</text>
  <text x="310" y="355" font-family="Segoe UI" font-size="34" font-weight="400" fill="#64748B">Compress images without uploading them.</text>
  <rect x="310" y="400" width="210" height="48" rx="24" fill="#EEF2FF"/>
  <text x="415" y="430" font-family="Segoe UI" font-size="22" font-weight="400" fill="#4F46E5" text-anchor="middle">No uploads</text>
  <rect x="538" y="400" width="220" height="48" rx="24" fill="#EEF2FF"/>
  <text x="648" y="430" font-family="Segoe UI" font-size="22" font-weight="400" fill="#4F46E5" text-anchor="middle">No account</text>
  <rect x="776" y="400" width="230" height="48" rx="24" fill="#EEF2FF"/>
  <text x="891" y="430" font-family="Segoe UI" font-size="22" font-weight="400" fill="#4F46E5" text-anchor="middle">No tracking</text>
  <text x="310" y="580" font-family="Segoe UI" font-size="26" font-weight="400" fill="#94A3B8">nosend.io</text>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile('./public/og-image.png');

console.log('OG image generated: public/og-image.png');
