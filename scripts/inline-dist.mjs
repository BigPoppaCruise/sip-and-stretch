// Inlines the built JS and CSS into dist/index.html so the app runs when the
// file is opened directly (browsers block external module scripts on file://).
// Runs automatically as part of `npm run build`.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const htmlPath = path.join(dist, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(/<script type="module"[^>]*src="\.\/(assets\/[^"]+\.js)"[^>]*><\/script>/g, (_, rel) => {
  const js = fs.readFileSync(path.join(dist, rel), 'utf8').replace(/<\/script>/g, '<\\/script>');
  return `<script type="module">\n${js}\n</script>`;
});

html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/g, (_, rel) => {
  const css = fs.readFileSync(path.join(dist, rel), 'utf8');
  return `<style>\n${css}\n</style>`;
});

html = html.replace(/<link rel="modulepreload"[^>]*>/g, '');

fs.writeFileSync(htmlPath, html);
console.log(`Inlined JS/CSS into dist/index.html (${(html.length / 1024).toFixed(0)} KB) — works when opened as a file.`);
