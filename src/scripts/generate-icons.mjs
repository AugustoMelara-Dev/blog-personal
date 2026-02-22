import sharp from 'sharp'
import { mkdirSync } from 'fs'

mkdirSync('public/icons', { recursive: true })

const svgIcon = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="512" height="512" 
  viewBox="0 0 512 512">
  <rect width="512" height="512" 
    rx="80" fill="#0a0a0a"/>
  <polygon 
    points="96,128 176,128 256,320 336,128 
             416,128 296,400 216,400" 
    fill="#f5f5f5"/>
  <rect x="216" y="380" width="80" height="12" 
    rx="6" fill="#a3e635"/>
</svg>`

const sizes = [
  { size: 512, file: 'public/icons/icon-512.png' },
  { size: 192, file: 'public/icons/icon-192.png' },
  { size: 32,  file: 'public/favicon.png' },
]

for (const { size, file } of sizes) {
  await sharp(Buffer.from(svgIcon))
    .resize(size, size)
    .png()
    .toFile(file)
  console.log(`✓ ${file}`)
}
