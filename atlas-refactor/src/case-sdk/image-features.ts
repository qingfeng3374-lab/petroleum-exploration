import type {Dataset, Sample} from '../domain';

/** Derive all model features from the observed raster, without labels or latent geometry. */
export function extractImageFeatures(image:number[],width:number,height:number):Sample[]{
  if(image.length!==width*height)throw Error('Raster dimensions do not match');
  const at=(x:number,y:number)=>image[Math.max(0,Math.min(height-1,y))*width+Math.max(0,Math.min(width-1,x))];
  return image.map((value,i)=>{
    const x=i%width,y=Math.floor(i/width);let mean=0,xx=0,xy=0,yy=0;
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
      mean+=at(x+dx,y+dy);
      const gx=(at(x+dx+1,y+dy)-at(x+dx-1,y+dy))/2;
      const gy=(at(x+dx,y+dy+1)-at(x+dx,y+dy-1))/2;
      xx+=gx*gx;xy+=gx*gy;yy+=gy*gy;
    }
    const coherence=Math.sqrt((xx-yy)**2+4*xy*xy)/(xx+yy+1e-8);
    return {x,y,f:[1-value,Math.max(0,mean/9-value),coherence]};
  });
}

export function generateLineRaster(kind:string,r:()=>number,noise:number):Dataset{
  const width=48,height=40;
  // Latent geometry belongs only to the renderer and ground-truth generator.
  const lines=Array.from({length:kind==='fracture'?9:4},()=>({a:r()*Math.PI,b:r()*45}));
  const image:number[]=[],truth:number[]=[];
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    const d=Math.min(...lines.map(l=>Math.abs(x*Math.cos(l.a)+y*Math.sin(l.a)-l.b)));
    const label=+(d<.85),shadow=Math.abs(y-x*.35-8)<1.8;
    const darkLine=.64*Math.exp(-d*d/.85);
    const texture=.045*Math.sin(x*1.8+y*.8)+(r()-.5)*noise*.65;
    image.push(Math.max(0,Math.min(1,.82-darkLine-(shadow?noise*.4:0)+texture)));
    truth.push(label);
  }
  return {width,height,image,truth,samples:extractImageFeatures(image,width,height)};
}

/** Reassign small labelled components by their neighbouring class majority. Class 0 is a class. */
export function cleanRegions(labels:number[],width:number,minArea:number){
  const out=labels.slice(),seen=new Set<number>();
  for(let i=0;i<labels.length;i++){
    if(seen.has(i))continue;
    const group=[i],votes=new Map<number,number>();seen.add(i);
    for(let k=0;k<group.length;k++){
      const n=group[k];
      for(const j of [n-width,n+width,n%width?n-1:-1,n%width<width-1?n+1:-1]){
        if(j<0||j>=labels.length)continue;
        if(labels[j]!==labels[i])votes.set(labels[j],(votes.get(labels[j])||0)+1);
        else if(!seen.has(j)){seen.add(j);group.push(j)}
      }
    }
    if(group.length<minArea&&votes.size){
      const replacement=[...votes].sort((a,b)=>b[1]-a[1]||a[0]-b[0])[0][0];
      group.forEach(j=>out[j]=replacement);
    }
  }
  return out;
}
