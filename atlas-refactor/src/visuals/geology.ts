/** Deterministic geological relief shared by surfaces, contacts and equipment placement. */
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const smooth=(x:number)=>x*x*(3-2*x);
function hash(x:number,y:number,z:number){const n=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return n-Math.floor(n);}
export function rockNoise(x:number,y:number,z:number){
  const i=Math.floor(x),j=Math.floor(y),k=Math.floor(z),u=smooth(x-i),v=smooth(y-j),w=smooth(z-k);
  return mix(mix(mix(hash(i,j,k),hash(i+1,j,k),u),mix(hash(i,j+1,k),hash(i+1,j+1,k),u),v),mix(mix(hash(i,j,k+1),hash(i+1,j,k+1),u),mix(hash(i,j+1,k+1),hash(i+1,j+1,k+1),u),v),w);
}
export function rockRelief(x:number,z:number){return rockNoise(x*.8,0,z*.8)*.57+rockNoise(x*2.1,2,z*2.1)*.25+rockNoise(x*5.4,3,z*5.4)*.12;}
export function geologicalFold(x:number,z:number){
  const fault=.31*Math.tanh((x+.48*z-.35)*11);
  return .42*Math.sin(x*.7+z*.38)+.19*Math.cos(z*1.1-x*.24)+.55*Math.exp(-((x+1.3)**2+z*z*.4)/7)-fault;
}
export function contactHeight(base:number,index:number,x:number,z:number){
  return base+geologicalFold(x,z)+.11*Math.sin(x*.88+z*.65+index*1.7)+.1*(rockNoise(x*.9,index*.4,z*.9)-.5);
}
export function naturalSurface(x:number,z:number){
  const ridge=Math.pow(1-Math.abs(Math.sin(x*.84+z*.45)),2)*.6;
  return contactHeight(1.15,0,x,z)+ridge+rockRelief(x,z)*.7+.65*Math.exp(-((x+2.6)**2+(z+1.2)**2)/1.4);
}
/** An eroded sample boundary; shared by every stratum to keep their contacts closed. */
export function rockFootprint(u:number,v:number,width:number,depth:number):[number,number]{
  const a=u*2-1,b=v*2-1,edgeX=Math.abs(a)**12,edgeZ=Math.abs(b)**12;
  const x=a*width*.5*(1-.17*Math.abs(b)**4)+edgeX*(.17*Math.sin(v*19)+.065*Math.sin(v*57));
  const z=b*depth*.5*(1-.14*Math.abs(a)**4)+edgeZ*(.13*Math.sin(u*23)+.06*Math.sin(u*61));
  return [x,z];
}
