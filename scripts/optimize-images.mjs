// Converts source assets in /assets-src into optimized, cropped WebP files in /public/images.
// Run with: npm run images
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/images';
fs.mkdirSync(OUT, { recursive: true });

// crop: fractions of the source [left, top, width, height]
const jobs = [
  { src: 'logo.png', out: 'logo', width: 320, alpha: true },
  { src: 'logo.png', out: 'logo-lg', width: 640, alpha: true },
  { src: 'logo.png', out: 'favicon', width: 64, alpha: true, format: 'png' },

  // Hero + editorial imagery (user supplied)
  { src: 'ambient-living.png', out: 'hero-living', width: 1920 },
  { src: 'ambient-living.png', out: 'hero-living-sm', width: 800, crop: [0.18, 0, 0.5, 1] },
  { src: 'ambient-living.png', out: 'ambient-living', width: 1000 },
  { src: 'modern-interior.png', out: 'hero-architectural', width: 1920 },
  { src: 'modern-interior.png', out: 'hero-architectural-sm', width: 800, crop: [0.3, 0, 0.42, 1] },
  { src: 'modern-interior.png', out: 'modern-interior', width: 1200 },
  { src: 'modern-interior.png', out: 'outdoor-garden', width: 800, crop: [0, 0.22, 0.36, 0.62] },
  { src: 'wire-coils.png', out: 'hero-cables', width: 1920 },
  { src: 'wire-coils.png', out: 'hero-cables-sm', width: 800, crop: [0.02, 0, 0.62, 1] },
  { src: 'wire-coils.png', out: 'wire-coils', width: 1000 },
  { src: 'smart-switch.png', out: 'hero-switch', width: 1920, crop: [0.07, 0, 0.93, 1] },
  { src: 'smart-switch.png', out: 'hero-switch-sm', width: 800, crop: [0.3, 0.05, 0.55, 0.9] },
  { src: 'smart-switch.png', out: 'smart-switch', width: 1000, crop: [0.07, 0, 0.93, 1] },

  // Product crops (square) from user supplied photography
  { src: 'smart-switch.png', out: 'p-switch-modular', width: 700, crop: [0.24, 0.12, 0.62, 0.9] },
  { src: 'wire-coils.png', out: 'p-wire-red', width: 700, crop: [0.03, 0.02, 0.4, 0.6] },
  { src: 'wire-coils.png', out: 'p-wire-yellow', width: 700, crop: [0.38, 0.0, 0.34, 0.51] },
  { src: 'wire-coils.png', out: 'p-wire-blue', width: 700, crop: [0.29, 0.38, 0.33, 0.5] },
  { src: 'wire-coils.png', out: 'p-wire-black', width: 700, crop: [0.67, 0.12, 0.33, 0.5] },
  { src: 'wire-coils.png', out: 'p-wire-green', width: 700, crop: [0.6, 0.43, 0.36, 0.55] },
  { src: 'wire-coils.png', out: 'p-wire-ends', width: 700, crop: [0.03, 0.5, 0.42, 0.5] },

  // CC0 photography (rawpixel, public domain)
  { src: 'led-spot.jpg', out: 'p-led-spot', width: 700 },
  { src: 'cob-downlight.jpg', out: 'p-cob-downlight', width: 700 },
  { src: 'recessed-downlight.jpg', out: 'p-recessed-downlight', width: 700 },
  { src: 'filament-bulb.jpg', out: 'p-filament-bulb', width: 700, crop: [0.25, 0, 0.5, 1] },
  { src: 'filament-bulb.jpg', out: 'filament-bulb', width: 1000 },
  { src: 'ceiling-fan.jpg', out: 'p-ceiling-fan', width: 700, crop: [0.08, 0, 0.66, 1] },
  { src: 'ceiling-fan.jpg', out: 'ceiling-fan', width: 1000 },
  { src: 'fan-interior.jpg', out: 'fan-interior', width: 1000 },
  { src: 'plug-black.jpg', out: 'p-plug', width: 700, crop: [0.15, 0, 0.68, 1] },
  { src: 'extension-board.jpg', out: 'p-extension-board', width: 700, crop: [0.0, 0, 0.67, 1] },
  { src: 'extension-board.jpg', out: 'extension-board', width: 1000 },
  { src: 'pendant-lights.jpg', out: 'pendant-lights', width: 1000 },
  { src: 'pendant-lights.jpg', out: 'p-pendant', width: 700, crop: [0.2, 0, 0.6, 0.8] },
  { src: 'industrial-hall.jpg', out: 'industrial-hall', width: 1000 },
  { src: 'cable-drum.jpg', out: 'cable-drum', width: 1000 },
  { src: 'cable-drum.jpg', out: 'p-cable-drum', width: 700, crop: [0.18, 0, 0.66, 1] },
  { src: 'office.jpg', out: 'office', width: 1000 },
  { src: 'construction.jpg', out: 'construction', width: 1000 },
  { src: 'contractors.jpg', out: 'contractors', width: 1000 },
];

for (const job of jobs) {
  const file = path.join(SRC, job.src);
  let img = sharp(file);
  const meta = await img.metadata();
  if (job.crop) {
    const [l, t, w, h] = job.crop;
    img = img.extract({
      left: Math.round(l * meta.width),
      top: Math.round(t * meta.height),
      width: Math.min(meta.width - Math.round(l * meta.width), Math.round(w * meta.width)),
      height: Math.min(meta.height - Math.round(t * meta.height), Math.round(h * meta.height)),
    });
  }
  img = img.resize({ width: job.width, withoutEnlargement: true });
  const ext = job.format ?? 'webp';
  const outFile = path.join(OUT, `${job.out}.${ext}`);
  if (ext === 'png') await img.png({ compressionLevel: 9 }).toFile(outFile);
  else await img.webp({ quality: job.alpha ? 90 : 78, alphaQuality: 90, effort: 5 }).toFile(outFile);
  const { size } = fs.statSync(outFile);
  console.log(`${outFile.padEnd(44)} ${(size / 1024).toFixed(0)} KB`);
}
