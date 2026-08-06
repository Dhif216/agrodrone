import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const publicImagesDir = path.join(__dirname, 'public', 'images');
const distImagesDir = path.join(__dirname, 'dist', 'images');

// Image optimization config: [filename, maxWidth, quality]
const images = [
  ['seed.png', 800, 85],      // Service card image
  ['furt.png', 800, 85],      // Service card image
  ['map.png', 1200, 85],      // Wider image
  ['fleet.png', 1600, 90],    // Hero image, higher quality
];

async function optimizeImages() {
  console.log('Optimizing images...\n');
  
  for (const [filename, maxWidth, quality] of images) {
    const inputPath = path.join(publicImagesDir, filename);
    const outputPath = path.join(publicImagesDir, filename);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${filename}: not found`);
      continue;
    }
    
    try {
      const info = await sharp(inputPath).metadata();
      const originalSize = fs.statSync(inputPath).size;
      
      await sharp(inputPath)
        .resize(maxWidth, undefined, { withoutEnlargement: true })
        .png({ quality, compressionLevel: 9 })
        .toFile(outputPath + '.tmp');
      
      const optimizedSize = fs.statSync(outputPath + '.tmp').size;
      const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      
      fs.renameSync(outputPath + '.tmp', outputPath);
      
      console.log(`✅ ${filename}`);
      console.log(`   Original: ${info.width}x${info.height}px, ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Optimized: ${maxWidth}px wide, ${(optimizedSize / 1024 / 1024).toFixed(2)} MB (${reduction}% reduction)\n`);
    } catch (err) {
      console.log(`❌ ${filename}: ${err.message}\n`);
    }
  }
  
  // Copy optimized images to dist if it exists
  if (fs.existsSync(distImagesDir)) {
    console.log('Copying optimized images to dist...');
    for (const [filename] of images) {
      const src = path.join(publicImagesDir, filename);
      const dst = path.join(distImagesDir, filename);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dst);
        console.log(`✅ Copied ${filename}`);
      }
    }
  }
  
  console.log('\n✨ Optimization complete!');
}

optimizeImages().catch(console.error);
