// Prints the class play order and total runtime from src/sip-and-stretch.jsx.
// Usage: npm run program
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = fs.readFileSync(path.join(root, 'src', 'sip-and-stretch.jsx'), 'utf8');

const order = JSON.parse(src.match(/ORDERED_STRETCH_IDS = (\[[^\]]+\])/)[1]);
const entries = {};
for (const m of src.matchAll(/id: (\d+), name: "([^"]+)", duration: (\d+),[\s\S]*?bilateral: (true|false)/g)) {
  if (entries[m[1]]) console.warn(`WARNING: duplicate id ${m[1]} in CLASS_DATA — the later entry wins`);
  entries[m[1]] = { name: m[2], dur: +m[3], bi: m[4] === 'true' };
}

const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
let total = 0;
for (const id of order) {
  const e = entries[id];
  if (!e) { console.warn(`WARNING: id ${id} in ORDERED_STRETCH_IDS has no CLASS_DATA entry — it will be SKIPPED in class`); continue; }
  const t = e.dur * (e.bi ? 2 : 1);
  total += t;
  console.log(`${String(id).padStart(2)}  ${e.name.padEnd(26)} ${fmt(e.dur)}${e.bi ? ' /side' : '      '}  = ${fmt(t)}`);
}
console.log(`\nTOTAL: ${fmt(total)}  (${(total / 60).toFixed(1)} minutes, ${order.length} segments)`);
