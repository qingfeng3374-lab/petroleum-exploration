import fs from 'node:fs';import assert from 'node:assert/strict';
import {runScene} from '../src/scene-sdk/models.ts';import {initialSettings} from '../src/scene-sdk/settings.ts';import {runChapter} from '../src/chapter-sdk/model.ts';import {runExperiment,controlSpec} from '../src/case-sdk/experiment.ts';
const definitions=fs.readdirSync('src/cases').map(file=>JSON.parse(fs.readFileSync('src/cases/'+file,'utf8').match(/export default ([\s\S]*?) satisfies/)[1])),results=[],errors=[];
for(const d of definitions){try{
 let count=0;
 if(d.engine==='scene'){
  const s=initialSettings(d),threshold=['raster','risk','boundary','tank'].includes(d.family),knn=['shape','gas','graph','report','classification'].includes(d.family),min=threshold?.1:knn?1:d.family==='anomaly'?.5:.001,max=threshold?.9:knn?11:d.family==='anomaly'?6:1;
  for(const changes of [{},{seed:17,noise:.05,parameter:min,budget:.2},{seed:44551,noise:1.2,parameter:max,budget:1},{shift:true},{noise:1.2,shift:true,parameter:max,budget:.2}]){
   const r=runScene(d,{...s,...changes});assert.equal(r.prediction.length,r.test.length);assert.equal(r.baseline.length,r.test.length);assert.ok(r.prediction.flat().every(Number.isFinite));assert.ok(r.baseline.flat().every(Number.isFinite));assert.ok(r.test.every(row=>row.x.every(Number.isFinite)&&row.y.every(Number.isFinite)));assert.ok(r.metrics.flat().every(m=>Number.isFinite(m.ai)&&Number.isFinite(m.baseline)));assert.equal(r.fit.labels.length,r.fit.values.length);if(d.family!=='report')assert.ok(r.test.every(row=>row.x.length===d.features.length));
   for(const i of [0,r.test.length-1])for(let j=0;j<d.outputs.length;j++){const e=r.explain(i,j);assert.equal(e.labels.length,e.values.length);assert.ok(e.values.every(Number.isFinite));if(e.base!==undefined)assert.ok(Number.isFinite(e.base))}
   if(r.classification)assert.ok(r.prediction.flat().every(v=>Number.isInteger(v)&&v>=-1&&v<d.classes.length));
   if(r.grid){const feasible=r.grid.filter(g=>g.allowed);assert.ok(feasible.length);assert.equal(r.best.value,Math.max(...feasible.map(g=>g.value)))}count++;
  }
 }else if(d.engine==='chapter'){
  const defaults={firstbreak:.6,classification:d.task==='cementing'?.5:5,regression:.08,forecast:.08,anomaly:2,retrieval:3,surrogate:.08},s={seed:20261103,noise:.25,parameter:defaults[d.kind],shift:false,budget:.6,query:'pressure'};
  for(const changes of [{},{noise:1.2},{shift:true},{seed:44551,budget:.2}]){const r=runChapter(d,{...s,...changes});assert.ok(r.prediction.every(Number.isFinite));assert.equal(r.prediction.length,r.test.length);assert.ok(r.metrics.every(m=>Number.isFinite(m.model)&&Number.isFinite(m.baseline)));for(const i of [0,r.test.length-1]){const e=r.evidence(i);assert.equal(e.labels.length,e.values.length);assert.ok(e.values.every(Number.isFinite))}count++}
 }else{
  const control=controlSpec(d.kind);for(const changes of [{},{noise:1.2},{seed:44551,small:true}]){const r=runExperiment(d,{seed:20261023,noise:.25,param:control.value,threshold:2.5,small:false,...changes});assert.ok(r.pred.every(Number.isFinite));assert.equal(r.pred.length,r.test.truth.length);assert.ok(Number.isFinite(r.m.macro));count++}
 }
 results.push({id:d.id,scenarios:count,passed:true});
 }catch(error){errors.push({id:d.id,message:error.message})}}
const report={cases:definitions.length,scenarios:results.reduce((sum,r)=>sum+r.scenarios,0),results,errors};fs.writeFileSync('docs/site-review-models.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({cases:report.cases,scenarios:report.scenarios,errors}));assert.deepEqual(errors,[]);
