// Recompresse les photos (1600 px, JPEG q=0.72) via le navigateur : pas d'outil image dans le conteneur.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'fs';
const b = await chromium.launch(); const p = await b.newPage();
// Recadrages : part de la hauteur conservée depuis le haut (valerian : retire le filigrane du photographe en bas)
const CROP = { valerian: 0.885 };
for (const name of ['podium', 'valerian', 'leo']) {
  const src = 'data:image/jpeg;base64,' + readFileSync(`photos/${name}.jpg`).toString('base64');
  const out = await p.evaluate(async ([src, keep]) => {
    const img = new Image(); img.src = src; await img.decode();
    const sh = Math.round(img.naturalHeight * keep);
    const w = Math.min(1600, img.naturalWidth), h = Math.round(sh * w / img.naturalWidth);
    const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, img.naturalWidth, sh, 0, 0, w, h);
    return c.toDataURL('image/jpeg', 0.72).split(',')[1];
  }, [src, CROP[name] || 1]);
  writeFileSync(`photos/web/${name}.jpg`, Buffer.from(out, 'base64'));
}
await b.close();
