import fs from 'node:fs';
import assert from 'node:assert/strict';
import {runScene} from '../src/scene-sdk/models.ts';
import {unpackArchive,PACKAGE_LIMIT} from '../src/services/archive.ts';
import {initialSettings} from '../src/scene-sdk/settings.ts';
const atlas=JSON.parse(fs.readFileSync('src/data/atlas.json','utf8'));
const original=fs.readdirSync('src/cases').flatMap(file=>{const source=fs.readFileSync('src/cases/'+file,'utf8'),match=source.match(/export default ([\s\S]*?) satisfies (?:CaseDef|ChapterCaseDef|SceneCaseDef);/);return match?[JSON.parse(match[1])]:[]});
export const defaults=initialSettings;
const cases=[];
for(const d of original.filter(d=>d.engine==='scene')){
 const a=runScene(d,defaults(d));assert.equal(a.prediction.length,a.test.length,d.id);assert.ok(a.prediction.flat().every(Number.isFinite),d.id);assert.ok(a.metrics.flat().every(m=>Number.isFinite(m.ai)&&Number.isFinite(m.baseline)),d.id);assert.ok(a.explain(0,0).values.every(Number.isFinite),d.id);
 cases.push({id:d.id,sceneId:d.sceneId,title:d.title,family:d.family,method:d.method,reference:a.train.length,test:a.test.length,metrics:a.metrics,htmlBytes:fs.existsSync('public/cases/'+d.id+'.html')?fs.statSync('public/cases/'+d.id+'.html').size:null,zipBytes:fs.existsSync('public/case-archives/'+d.id+'.zip')?fs.statSync('public/case-archives/'+d.id+'.zip').size:null});
}
const artifacts=[];
for(const d of original){const html=fs.readFileSync('public/cases/'+d.id+'.html','utf8'),single=fs.readFileSync('release/single/'+d.name+'.html','utf8'),bytes=fs.readFileSync('public/case-archives/'+d.id+'.zip'),files=await unpackArchive(bytes),manifest=JSON.parse(new TextDecoder().decode(files.find(f=>f.name==='case.json').bytes)),embedded=JSON.parse(html.match(/<script[^>]+id="atlas-case-manifest"[^>]*>([\s\S]*?)<\/script>/)[1]);assert.equal(single,html);assert.equal(manifest.id,d.id);assert.equal(manifest.sceneId,d.sceneId);assert.equal(embedded.id,manifest.id);assert.equal(new TextDecoder().decode(files.find(f=>f.name==='demo/index.html').bytes),html);assert.ok(Buffer.byteLength(html)<PACKAGE_LIMIT&&bytes.length<PACKAGE_LIMIT);artifacts.push({id:d.id,sceneId:d.sceneId,htmlBytes:Buffer.byteLength(html),zipBytes:bytes.length,roundtrip:true})}
const covered=new Set(original.map(d=>d.sceneId)),all=atlas.stages.flatMap(st=>st.scenes),report={version:'4.0.0',scenes:all.length,covered:covered.size,aiCases:original.length,totalCases:original.length+1,researchCases:original.filter(d=>d.extension).length,sceneEngineCases:cases.length,pending:all.filter(s=>!covered.has(s.id)).map(s=>s.id),operations:atlas.stages.map(st=>({id:st.id,name:st.name,total:st.scenes.length,covered:st.scenes.filter(s=>covered.has(s.id)).length})),cases,artifacts};
fs.writeFileSync('docs/scene-learning-audit.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({researchCases:report.researchCases,sceneEngineCases:cases.length,covered:report.covered,pending:report.pending,operations:report.operations}));
