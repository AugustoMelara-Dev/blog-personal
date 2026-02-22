import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const width = 1200;
const height = 630;
const text = "Nombre del Blog";
const bgColor = "#0a0a0a";

const svgImage = `
  <svg width="${width}" height="${height}">
    <rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}" />
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#ffffff" font-family="sans-serif" font-size="60" font-weight="bold">${text}</text>
  </svg>
`;

const outputPath = path.join(__dirname, '..', '..', 'public', 'og-default.png');

async function generate() {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    const sharp = (await import('sharp')).default;
    await sharp(Buffer.from(svgImage))
      .png()
      .toFile(outputPath);
    console.log('OG image generated successfully at', outputPath);
  } catch (error) {
    console.error('Error with sharp, creating fallback at', outputPath);
    // Create a 1x1 black PNG
    const blackPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    fs.writeFileSync(outputPath, Buffer.from(blackPngBase64, 'base64'));
    console.log('Placeholder image created.');
  }
}

generate();
