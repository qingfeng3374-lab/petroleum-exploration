import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const app=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(app,'dist');
const fail=message=>{throw new Error(`Deployment check failed: ${message}`)};
function requireAsset(relative){
  const filename=path.resolve(dist,relative);
  if(!filename.startsWith(dist+path.sep)||!fs.existsSync(filename)||!fs.statSync(filename).isFile()||fs.statSync(filename).size===0)fail(`missing or empty asset ${relative}`);
  return filename;
}
const html=fs.readFileSync(requireAsset('index.html'),'utf8');
if(/(?:src|href)=["'][^"']*(?:\/src\/|\.(?:ts|svelte)(?:[?#]|["']))/.test(html))fail('index.html still references uncompiled source; run npm run build and publish dist only');
const modules=[...html.matchAll(/<script\b(?=[^>]*\btype=["']module["'])[^>]*\bsrc=["']([^"']+)["']/g)].map(match=>match[1]);
const styles=[...html.matchAll(/<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["']/g)].map(match=>match[1]);
if(!modules.length||!styles.length)fail('compiled JavaScript or stylesheet is missing');
for(const asset of [...modules,...styles]){
  if(!/^(?:\.\/|\/)?assets\//.test(asset))fail(`unexpected compiled entry ${asset}`);
  requireAsset(decodeURIComponent(asset.replace(/^(?:\.\/|\/)/,'')));
}
for(const asset of ['favicon.svg','legacy/index.html','legacy/assets/core/case-demo-host.js','cases/legacy-presentation.js','examples/firstbreak-pick-case.zip','case-archives/welllog-layer.zip'])requireAsset(asset);
const catalog=JSON.parse(fs.readFileSync(path.join(app,'src/data/catalog.json'),'utf8'));
if(catalog.length!==101)fail(`expected 101 native case entries, found ${catalog.length}`);
for(const entry of catalog){requireAsset(entry.url);requireAsset(entry.extensions.atlas.archive)}
console.log(`Deployment check passed: compiled JS/CSS, legacy resources and ${catalog.length+1} case packages are present in dist/.`);
