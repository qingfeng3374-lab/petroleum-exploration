import {test} from 'node:test';import assert from 'node:assert/strict';
import lithology from '../src/cases/地质勘察-遥感岩性识别.case';
import lineament from '../src/cases/地质勘察-构造线候选提取.case';
import geochem from '../src/cases/地质勘察-化探异常识别.case';
import map from '../src/cases/地质勘察-地质图件要素提取.case';
import {extractImageFeatures,cleanRegions} from '../src/case-sdk/image-features';
import {generate} from '../src/case-sdk/algorithms';
import {runExperiment} from '../src/case-sdk/experiment';
const settings={seed:20261023,noise:.25,param:5,threshold:2.5,small:false};
test('raster features are a function only of observed pixels',()=>{
 const d=generate('line',77,.2);assert.equal(d.image!.length,d.samples.length);
 assert.deepEqual(d.samples,extractImageFeatures(d.image!,d.width,d.height));
 d.truth.fill(1);assert.deepEqual(d.samples,extractImageFeatures(d.image!,d.width,d.height));
 const modified=d.image!.slice();modified[20]=1-modified[20];
 assert.notDeepEqual(d.samples,extractImageFeatures(modified,d.width,d.height));
});
test('constant raster is finite and has no spurious ridge',()=>{
 const f=extractImageFeatures(Array(25).fill(.5),5,5);assert.ok(f.every(p=>p.f.every(Number.isFinite)));assert.ok(f.every(p=>p.f[1]===0&&p.f[2]===0));
});
test('multiclass cleanup handles class zero and row boundaries',()=>{
 assert.deepEqual(cleanRegions([1,1,1,1,0,1,1,1,1],3,2),Array(9).fill(1));
 assert.deepEqual(cleanRegions([0,0,0,0],2,80),[0,0,0,0]);
 assert.deepEqual(cleanRegions([0,0,1,1,0,0],3,1),[0,0,1,1,0,0]);
});
test('map area control affects predictions on fixed noisy data',()=>{
 const a=runExperiment(map,{...settings,noise:.9,param:1}),b=runExperiment(map,{...settings,noise:.9,param:60});
 assert.notDeepEqual(a.pred,b.pred);assert.deepEqual(a.test,b.test);
});
test('geochem threshold changes decisions without changing fitted centers',()=>{
 const a=runExperiment(geochem,{...settings,param:3,threshold:1}),b=runExperiment(geochem,{...settings,param:3,threshold:5});
 assert.deepEqual(a.history,b.history);assert.deepEqual(a.scores,b.scores);
 assert.ok(a.pred.reduce((s,v)=>s+v,0)>b.pred.reduce((s,v)=>s+v,0));
});
test('reference data, selected neighbour indices and snapshots remain reproducible',()=>{
 const a=runExperiment(lithology,settings),b=runExperiment(lithology,settings);
 assert.deepEqual(a.pred,b.pred);assert.notDeepEqual(a.trainData.samples,a.test.samples);
 settings.seed++;assert.notEqual(a.settings.seed,settings.seed);settings.seed--;
});
test('binary image pipeline fits actual extracted features and returns independent test results',()=>{
 const r=runExperiment(lineament,{...settings,param:.5});assert.ok(r.loss!.at(-1)!<r.loss![0]);
 assert.deepEqual(r.test.samples,extractImageFeatures(r.test.image!,48,40));
 assert.equal(r.pred.length,1920);assert.equal(r.m.matrix.flat().reduce((s,v)=>s+v,0),1920);
});
