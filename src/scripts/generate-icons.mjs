import sharp from 'sharp';
import { mkdirSync } from 'fs';

mkdirSync('public/icons', { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0a0a0a"/>
  <text x="256" y="200" font-family="serif" font-size="180" font-weight="900" fill="#f5f5f5" text-anchor="middle">V</text>
  <text x="256" y="380" font-family="serif" font-size="100" font-weight="700" fill="#a3e635" text-anchor="middle">Logic</text>
</svg>`;

await sharp(Buffer.from(svg)).resize(192, 192).png().toFile('public/icons/icon-192.png');
await sharp(Buffer.from(svg)).resize(512, 512).png().toFile('public/icons/icon-512.png');

console.log('✅ Icons generated: public/icons/icon-192.png & icon-512.png');
