// Recompresse les photos (1600 px, JPEG q=0.72) via le navigateur : pas d'outil image dans le conteneur.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'fs';
const b = await chromium.launch(); const p = await b.newPage();
for (const name of ['course', 'podium', 'leo']) {
  const src = 'data:image/jpeg;base64,' + readFileSync(`photos/${name}.jpg`).toString('base64');
  const out = await p.evaluate(async src => {
    const img = new Image(); img.src = src; await img.decode();
    const w = Math.min(1600, img.naturalWidth), h = Math.round(img.naturalHeight * w / img.naturalWidth);
    const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h);
    return c.toDataURL('image/jpeg', 0.72).split(',')[1];
  }, src);
  writeFileSync(`photos/web/${name}.jpg`, Buffer.from(out, 'base64'));
}
await b.close();
