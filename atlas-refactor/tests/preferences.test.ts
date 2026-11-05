import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import atlas from '../src/data/atlas.json';
import english from '../src/i18n/atlas.en.json';
import {localizeAtlas} from '../src/i18n/content';
import {translate,translatedObject} from '../src/i18n';
import {createManualCase,applyMetadata} from '../src/services/manual-case';
import {validate} from '../src/services/packages';

test('English atlas covers all stages and scenarios without changing identifiers',()=>{
 const localized=localizeAtlas(atlas,'en');
 assert.equal(localized.stages.length,13);
 for(const stage of atlas.stages){assert.ok((english.stages as any)[stage.id]);for(const scene of stage.scenes)assert.equal((english.scenes as any)[scene.id]?.length,6)}
 assert.equal(localized.stages.flatMap(s=>s.scenes).length,61);
 assert.deepEqual(localized.stages.flatMap(s=>s.scenes.map(x=>x.id)),atlas.stages.flatMap(s=>s.scenes.map(x=>x.id)));
 assert.ok(!/[\u3400-\u9fff]/.test(JSON.stringify(localized.stages.map(s=>({name:s.name,blurb:s.blurb,scenes:s.scenes.map(x=>({name:x.name,intro:x.intro,point:x.point,problem:x.problem,diffWhy:x.diffWhy,data:x.data,diff:x.diff}))})))));
 assert.equal(localizeAtlas(atlas,'zh'),atlas);
});
test('all five experiment definitions have English teaching content and keep algorithm IDs',()=>{
 for(const file of fs.readdirSync('src/cases').filter(f=>f.endsWith('.case.ts'))){
  const source=fs.readFileSync('src/cases/'+file,'utf8');if(!source.includes(' satisfies CaseDef;'))continue;const def=JSON.parse(source.slice(source.indexOf('export default ')+15,source.indexOf(' satisfies CaseDef;'))),en=translatedObject(def,'en');
  assert.equal(en.id,def.id);assert.equal(en.kind,def.kind);
  for(const key of ['title','intro','method','concept','limit','data','classes','steps','teaching','lesson'])assert.ok(!/[\u3400-\u9fff]/.test(JSON.stringify(en[key])),`${file}: ${key}`);
 }
 assert.equal(translate('像元 (2, 3) · 特征 [0.1] · 预测 砂岩','en'),'Pixel (2, 3) · Features [0.1] · Predicted Sandstone');
});
const scenes=atlas.stages.flatMap(s=>s.scenes);
const metadata={id:'manual-example',sceneId:'g1',title:'Manual example',methods:[],version:'1.0.0',updated:'2026-10-23'};
test('manual packages accept optional demos, inherit methods and reject empty or duplicate metadata',()=>{
 const record=createManualCase(metadata,{intro:'Background',html:'<p>Data and limitations</p>',steps:[],demo:'<button onclick="this.textContent=42">Run</button><script>window.example=42</script>'},scenes);
 assert.deepEqual(validate(record.manifest,scenes),[]);assert.deepEqual(record.manifest.methods,scenes.find(s=>s.id==='g1')!.methods);
 assert.equal(record.files[0].name,record.manifest.tabs.demo?.html);
 assert.ok(!JSON.stringify(record.manifest).includes('<script>'));
 assert.ok(record.files[0].data.includes('<script>'));
 assert.ok(validate(record.manifest,scenes,[record]).length);
 const backgroundOnly=createManualCase(metadata,{intro:'',html:'Valid content',steps:[],demo:''},scenes);assert.deepEqual(validate(backgroundOnly.manifest,scenes),[]);assert.equal(backgroundOnly.manifest.tabs.demo,undefined);
 const empty=createManualCase({...metadata,id:'bad id',sceneId:''},{intro:'',html:' ',steps:[],demo:''},scenes);assert.equal(validate(empty.manifest,scenes).length,3);
});
test('editing imported metadata retains package files and original content',()=>{
 const record=createManualCase(metadata,{intro:'Original',html:'Original body',steps:[],demo:'<p>Original demo</p>'},scenes);
 const edited=applyMetadata(record,{...metadata,id:'edited',title:'Edited',sceneId:'g2',methods:['opt'],version:'2.0.0'},scenes);
 assert.equal(edited.id,edited.manifest.id);assert.equal(edited.manifest.version,'2.0.0');assert.deepEqual(edited.manifest.methods,['opt']);assert.equal(edited.files,record.files);assert.equal(edited.manifest.tabs,record.manifest.tabs);assert.equal(record.id,'manual-example');
});
