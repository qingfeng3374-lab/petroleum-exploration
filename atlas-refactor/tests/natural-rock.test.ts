import test from 'node:test';
import assert from 'node:assert/strict';
import {slabGeometry} from '../src/visuals/cinematic';
import {contactHeight,naturalSurface,rockFootprint} from '../src/visuals/geology';

test('eroded rock volume stays watertight with finite normals and nondegenerate faces',()=>{
  const geometry=slabGeometry(9,6.1,naturalSurface,(x,z)=>contactHeight(.05,1,x,z),32,24);
  const p=geometry.getAttribute('position'),n=geometry.getAttribute('normal'),indices=geometry.index!.array;
  const keys=Array.from({length:p.count},(_,i)=>[p.getX(i),p.getY(i),p.getZ(i)].map(v=>Math.round(v*100000)).join(','));
  const edges=new Map<string,number>();
  for(let i=0;i<p.count;i++)assert.ok([p.getX(i),p.getY(i),p.getZ(i),n.getX(i),n.getY(i),n.getZ(i)].every(Number.isFinite));
  for(let i=0;i<indices.length;i+=3){
    const ids=[indices[i],indices[i+1],indices[i+2]];assert.equal(new Set(ids.map(j=>keys[j])).size,3);
    for(let j=0;j<3;j++){const a=keys[ids[j]],b=keys[ids[(j+1)%3]],key=[a,b].sort().join('|');edges.set(key,(edges.get(key)||0)+1);}
  }
  assert.ok([...edges.values()].every(count=>count===2),'Every welded edge must belong to two faces, including eroded corners');geometry.dispose();
});

test('nonuniform stratigraphic contacts preserve positive thickness across the full footprint',()=>{
  const bases=[1.15,.05,-1.1,-2.16,-3.25];
  for(let j=0;j<=40;j++)for(let i=0;i<=60;i++){
    const [x,z]=rockFootprint(i/60,j/40,9,6.1);
    const heights=bases.map((base,k)=>k===0?naturalSurface(x,z):contactHeight(base,k,x,z));
    for(let k=0;k<heights.length-1;k++)assert.ok(heights[k]-heights[k+1]>.4,'Folded and faulted layers must not invert or overlap');
  }
});

test('surface and contacts are reproducible and include nonuniform geological relief',()=>{
  const samples=Array.from({length:31},(_,i)=>{const [x,z]=rockFootprint(i/30,1,9,6.1);return [x,z,naturalSurface(x,z),contactHeight(-1.1,2,x,z)];});
  assert.deepEqual(samples,Array.from({length:31},(_,i)=>{const [x,z]=rockFootprint(i/30,1,9,6.1);return [x,z,naturalSurface(x,z),contactHeight(-1.1,2,x,z)];}));
  assert.ok(Math.max(...samples.map(v=>v[1]))-Math.min(...samples.map(v=>v[1]))>.3,'The exposed edge cannot be a straight rectangular wall');
  assert.ok(Math.max(...samples.map(v=>v[3]))-Math.min(...samples.map(v=>v[3]))>.6,'Contacts must show visible structural relief');
});
