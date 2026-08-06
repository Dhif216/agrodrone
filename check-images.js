import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imagesDir = path.join(__dirname, 'public', 'images');
console.log('Source images:');
fs.readdirSync(imagesDir).filter(f => f.endsWith('.png')).forEach(f => {
  const stat = fs.statSync(path.join(imagesDir, f));
  console.log(`  ${f}: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
});

console.log('\nDist images:');
const distDir = path.join(__dirname, 'dist', 'images');
if (fs.existsSync(distDir)) {
  fs.readdirSync(distDir).filter(f => f.endsWith('.png')).forEach(f => {
    const stat = fs.statSync(path.join(distDir, f));
    console.log(`  ${f}: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
  });
}
