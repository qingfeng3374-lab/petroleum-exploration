import {random,metrics as confusion} from '../case-sdk/algorithms';
import {ridge,logistic,nearest,mean,rmse} from '../chapter-sdk/math';
import type {SceneCaseDef as Def,Settings,Sample,SceneResult as Result} from './types';
const clamp=(v:number,lo=0,hi=1)=>Math.max(lo,Math.min(hi,v));
const perturb=(r:()=>number)=>r()+r()+r()-1.5;
const bell=(v:number)=>Math.exp(-v*v);
const median=(a:number[])=>{const s=a.slice().sort((x,y)=>x-y),i=Math.floor(s.length/2);return s.length%2?s[i]:(s[i-1]+s[i])/2};
const phi=(x:number[])=>[...x,...x.map(v=>v*v),...x.flatMap((v,j)=>x.slice(j+1).map(w=>v*w))];
const labels=(d:Def)=>[...d.features.map(f=>f.name),...d.features.map(f=>f.name+'²'),...d.features.flatMap((f,j)=>d.features.slice(j+1).map(g=>f.name+' × '+g.name))];
const classification=(p:number[][],b:number[][],test:Sample[],n:number):Result['metrics']=>[[{name:'独立测试宏 F1',ai:confusion(p.flat(),test.map(r=>r.y[0]),n).macro,baseline:confusion(b.flat(),test.map(r=>r.y[0]),n).macro,higher:true},{name:'独立测试准确率',ai:mean(p.map((v,i)=>+(v[0]===test[i].y[0]))),baseline:mean(b.map((v,i)=>+(v[0]===test[i].y[0]))),higher:true}]];
export function runExtension(d:Def,s:Settings):Result {
 switch(d.extension!.task){case 'regression':case 'design':return regress(d,s);case 'classification':case 'waveform':case 'selection':return classify(d,s);case 'robust':return robust(d,s);case 'tracking':return tracking(d,s)}
}
// These functions are independently authored teaching generators, not equations attributed to a cited field study.
export function extensionResponse(key:string,x:number[]):number[]{const [a,b,c,e]=x;switch(key){
 case 'velocity':return [1.5+3*a];
 case 'mse':return [15+30*a+55*b*c/(.2+e)];
 case 'gas-baseline':return [Math.max(0,25+55*a-26*b-16*c+10*a*c)];
 case 'cuttings-mixture':return [100*a,100*(1-a)*b,100*(1-a)*(1-b)];
 case 'lag-depth':return [15+90*a/(.4+b)+22*c-18*e];
 case 'shale':return [100*clamp(.08+.65*a+.24*b-.18*c+.18*a*b)];
 case 'cement-time':return [35+105*(1-a)+65*b-20*c+22*a*b];
 case 'inflow':{const z=[.2+2*a, .2+1.7*b, .2+1.5*c],sum=z.reduce((a,b)=>a+b,0);return z.map(v=>100*v/sum)}
 case 'underbalance':return [20+75*a-40*a*a-25*b+16*c+14*a*c];
 case 'charge-tradeoff':return [15+55*a+22*b-15*b*b-18*c,15+55*a*a+18*b+12*c];
 case 'watercut':return [100*clamp(.12+.52*a+.2*b-.28*c+.26*a*b)];
 case 'gaslift':return [25+85*a+45*b-76*a*a-35*b*b-18*c+12*a*b,10+50*a+18*b];
 case 'pump-energy':return [18+35*a+28*b+25*a*b+20*c-15*e];
 case 'leak-depth':return [10+85*a];
 case 'tubing-pit':return [4+60*a-12*b+9*c+10*a*b];
 case 'polymer':return [100*clamp((.3+.7*a)*Math.exp(-.65*b-.55*c-.4*e))];
 case 'co2':return [25+60/(1+Math.exp(-8*(a-.5)))+18*b-14*c-20*b*b,10+55*a+24*b];
 case 'fouling':return [5+52*a+24*b+22*a*b-15*c+10*e];
 case 'blending':{const z=Math.max(0,1-a-b);return [72+24*a+16*b+7*z+14*a*b-5*c,8+45*a+22*b+10*z]}
 case 'distillation':return [65+80*a+20*b,155+105*a+30*b+12*c,270+120*a+45*b+22*c];
 default:throw Error('Unknown extension response '+key);
}}
function project(d:Def,v:number[]){if(d.extension?.projection==='simplex'){const z=v.map(x=>Math.max(0,x)),sum=z.reduce((a,b)=>a+b,0)||1;return z.map(x=>100*x/sum)}if(d.extension?.projection==='ordered')return v.map((value,i)=>Math.max(value,...v.slice(0,i)));if(d.extension?.projection==='percent')return v.map(v=>clamp(v,0,100));return v}
function regress(d:Def,s:Settings):Result {
 const key=d.extension!.key;
 const observe=(z:number[],r:()=>number)=>{
  if(key==='velocity'){const v=extensionResponse(key,z)[0],t0=.5+z[1],n=()=>perturb(r)*s.noise*.025;return [t0+n(),Math.sqrt(t0*t0+1/(v*v))+n(),Math.sqrt(t0*t0+4/(v*v))+n(),z[2]]}
  if(key==='cuttings-mixture'){const f=extensionResponse(key,z).map(v=>v/100);return [.75*f[0]+.2*f[1]+.35*f[2],.25*f[0]+.7*f[1]+.35*f[2],.2*f[0]+.3*f[1]+.75*f[2]].map(v=>v+perturb(r)*s.noise*.06)}
  if(key==='leak-depth'){const location=z[0],at=(a:number)=>bell((a-location)/.23);return [.2,.4,.6,.8].map(t=>at(t)+perturb(r)*s.noise*.07)}
  return z;
 };
 const make=(seed:number,n:number,shift=false)=>{const r=random(seed);return Array.from({length:n},()=>{const z=d.features.map(()=>r());if(key==='cuttings-mixture')while(z.length<3)z.push(r());if(key==='blending'&&z[0]+z[1]>1){z[0]=1-z[0];z[1]=1-z[1]}const y=project(d,extensionResponse(key,z).map((v,j)=>v+perturb(r)*s.noise*(key==='velocity'?.08:2)+(shift?(key==='velocity'?.25:5)*Math.sin(z[0]*8):0)));return {x:observe(z,r).map((v,j)=>v+(shift&&j===0?.07:0)),y}})};
 const train=make(77123,220),cal=make(99187,70),test=make(s.seed,125,s.shift),fits=d.outputs.map((_,j)=>ridge(train.map(r=>phi(r.x)),train.map(r=>r.y[j]),s.parameter)),predict=(row:Sample)=>project(d,fits.map(f=>f.predict(phi(row.x)))),prediction=test.map(predict),baselineFor=(row:Sample)=>key==='shale'?[row.x[0]*100]:d.outputs.map((_,j)=>mean(train.map(r=>r.y[j]))),baseline=test.map(baselineFor),q=d.outputs.map((_,j)=>{const errors=cal.map(r=>Math.abs(predict(r)[j]-r.y[j])).sort((a,b)=>a-b);return errors[Math.min(errors.length-1,Math.ceil((errors.length+1)*.9)-1)]});
 const baselineQ=d.outputs.map((_,j)=>{const errors=cal.map(r=>Math.abs(baselineFor(r)[j]-r.y[j])).sort((a,b)=>a-b);return errors[Math.min(errors.length-1,Math.ceil((errors.length+1)*.9)-1)]});
 const fitRecords=fits.map(f=>({labels:labels(d),values:f.weights,note:'参考样本学习二次项与交互系数；独立校准记录不参与拟合。'}));
 const result:Result={train,test,prediction,baseline,classification:false,calibration:{n:cal.length,q,baselineQ},metrics:d.outputs.map((_,j)=>[{name:'独立测试 RMSE',ai:rmse(prediction.map(r=>r[j]),test.map(r=>r.y[j])),baseline:rmse(baseline.map(r=>r[j]),test.map(r=>r.y[j])),higher:false},{name:'90% 校准区间实际覆盖率',ai:mean(test.map((r,i)=>+(Math.abs(prediction[i][j]-r.y[j])<=q[j]))),baseline:mean(test.map((r,i)=>+(Math.abs(baseline[i][j]-r.y[j])<=baselineQ[j]))),higher:true}]),fit:fitRecords[0],fits:fitRecords,explain:(i,j)=>({labels:labels(d),values:fits[j].contributions(phi(test[i].x)),base:fits[j].intercept,note:d.extension?.projection?'贡献和为约束投影前的预测；界面另列最终非负、单调或比例约束结果。':'偏置加当前多项式贡献得到预测；系数来自参考集，关联不等于因果。'})};
 if(d.extension!.task==='design'){
  const constraint=d.extension!.constraint!,weights=constraint.weights;
  result.grid=Array.from({length:441},(_,i)=>{const x=i%21/20,y=Math.floor(i/21)/20,z=[x,y,.5],p=project(d,fits.map(f=>f.predict(phi(z)))),truth=extensionResponse(key,z)[0]+(s.shift?5*Math.sin(x*8):0),cost=weights[0]*x+weights[1]*y;return {x,y,value:p[0],truth,risk:p[1],allowed:cost<=s.budget&&(constraint.secondMax===undefined||p[1]<=constraint.secondMax)&&(constraint.sumMax===undefined||x+y<=constraint.sumMax),pareto:false}});
  const feasible=result.grid.filter(g=>g.allowed);for(const g of feasible)g.pareto=!feasible.some(q=>q.value>=g.value&&q.risk<=g.risk&&(q.value>g.value||q.risk<g.risk));result.best=feasible.slice().sort((a,b)=>b.value-a.value)[0];result.design={secondaryName:d.outputs[1].name,...constraint};
 }
 return result;
}
const trigCache=new Map<number,{cos:number[][];sin:number[][]}>();
/** Direct real DFT for small 64-sample teaching windows; no FFT complexity claim. */
export function powerSpectrum(values:number[]){const n=values.length;if(!trigCache.has(n))trigCache.set(n,{cos:Array.from({length:n/2},(_,k)=>values.map((_,i)=>Math.cos(2*Math.PI*k*i/n))),sin:Array.from({length:n/2},(_,k)=>values.map((_,i)=>Math.sin(2*Math.PI*k*i/n)))});const basis=trigCache.get(n)!,mu=mean(values);return basis.cos.map((row,k)=>{let real=0,imag=0;values.forEach((v,i)=>{real+=(v-mu)*row[i];imag+=(v-mu)*basis.sin[k][i]});return (real*real+imag*imag)/(n*n)})}
function signal(key:string,label:number,r:()=>number,noise:number,shift:boolean){const phase=r()*Math.PI*2;
 return Array.from({length:64},(_,i)=>{const t=i/63;let v=0;
  if(key==='mineral'){const centre=[14,33,48][label];v=.78-.45*bell((i-centre)/5)+.05*t}
  else if(key==='avo'){const a=[.16,-.13,.2][label],b=[-.25,-.42,.13][label],angle=t*.65;v=a+b*Math.sin(angle)**2+.03*Math.sin(angle)**4}
  else if(key==='nmr'){v=bell((i-[12,46,26][label])/[6,8,14][label])+(label===2?.5*bell((i-48)/6):0)}
  else if(key==='seal'){v=.9*Math.exp(-t*[.25,1.3,3.6][label])+.06*Math.sin(t*3)}
  else if(key==='falloff'){v=label===0?1-.3*Math.sqrt(t):label===1?1-.35*t-.22*Math.max(0,t-.45):Math.exp(-2.3*t)}
  else if(key==='vdl'){const early=bell((i-14)/7)*Math.sin(i*1.7),late=bell((i-45)/10)*Math.sin(i*.8);v=[.18,.9,.6][label]*early+[.8,.12,.5][label]*late}
  else if(key==='shot-acoustic'){v=(label===0?.9:label===1?.3:.06)*bell((i-22)/5)*Math.sin(i*1.8)+.03*Math.sin(i*.2)}
  else {const frequencies=key==='torsion'?[8,2,17]:[6,2,20],k=frequencies[label];v=.55*Math.sin(2*Math.PI*k*t+phase)+(label===1?.2*Math.sin(2*Math.PI*6*t+phase):.07*Math.sin(2*Math.PI*13*t));if(key==='torsion'&&label===1)v=.55*Math.tanh(v*5)}
  return v+perturb(r)*noise*(key==='avo'?.08:.18)+(shift?.15*Math.sin(i*.6)+.1*t:0)
 })
}
function waveformFeatures(key:string,v:number[],spectrum:number[]){
 if(['torsion','compressor','shot-acoustic'].includes(key)){const total=spectrum.reduce((a,b)=>a+b,0)+1e-9;return [spectrum.slice(1,5).reduce((a,b)=>a+b,0)/total,spectrum.slice(5,13).reduce((a,b)=>a+b,0)/total,spectrum.slice(13).reduce((a,b)=>a+b,0)/total,Math.max(...v.map(Math.abs))/Math.sqrt(mean(v.map(x=>x*x))+1e-8)]}
 if(key==='mineral')return [1-mean(v.slice(8,20)),1-mean(v.slice(27,39)),1-mean(v.slice(42,54)),mean(v)];
 if(key==='nmr'){const total=v.reduce((a,b)=>a+Math.max(0,b),0)+1e-9;return [v.slice(0,21).reduce((a,b)=>a+Math.max(0,b),0)/total,v.slice(21,42).reduce((a,b)=>a+Math.max(0,b),0)/total,v.slice(42).reduce((a,b)=>a+Math.max(0,b),0)/total,v.reduce((a,b,i)=>a+i*Math.max(0,b),0)/total/63]}
 if(key==='avo'){const x=v.map((_,i)=>Math.sin(i/63*.65)**2),mx=mean(x),my=mean(v),den=x.reduce((s,a)=>s+(a-mx)**2,0),b=x.reduce((s,a,i)=>s+(a-mx)*(v[i]-my),0)/den,a=my-b*mx;return [a,b,Math.sqrt(mean(v.map((y,i)=>(y-a-b*x[i])**2))),v.at(-1)!-v[0]]}
 if(key==='vdl'){const e=mean(v.slice(0,28).map(x=>x*x)),late=mean(v.slice(32).map(x=>x*x));return [e,late,late/(e+.02),Math.max(...v.map(Math.abs))]}
 return [mean(v.slice(0,16)),mean(v.slice(24,40)),mean(v.slice(48)),mean(v.slice(1).map((x,i)=>Math.abs(x-v[i])))];
}
function symbol(r:()=>number,kind:number,noise:number,shift:boolean){const width=26,height=26,cx=13+(r()-.5)*3,cy=13+(r()-.5)*3,radius=7+r()*2,values=Array.from({length:width*height},(_,i)=>{const x=(i%width-cx)/radius,y=(Math.floor(i/width)-cy)/radius,inside=kind===0?x*x+y*y<1:kind===1?y>-.9&&y<.9&&Math.abs(x)<(y+.95)*.55:Math.abs(x)<.3&&Math.abs(y)<1||Math.abs(y)<.3&&Math.abs(x)<1;let v=inside?1:0;if(r()<noise*.045)v=1-v;return clamp(v+perturb(r)*noise*.08+(shift?.65*(i%width)/width:0))});
 const mask=values.map(v=>+(v>.5)),area=mask.reduce((a,b)=>a+b,0),edges=mask.reduce((a,v,i)=>a+(v?[[1,0],[-1,0],[0,1],[0,-1]].filter(([dx,dy])=>{const x=i%width+dx,y=Math.floor(i/width)+dy;return x<0||x>=width||y<0||y>=height||!mask[y*width+x]}).length:0),0);
 // Extract the centroid and scale from observed foreground pixels, never generator parameters.
 const count=Math.max(1,area),mx=mask.reduce((sum,v,i)=>sum+v*(i%width),0)/count,my=mask.reduce((sum,v,i)=>sum+v*Math.floor(i/width),0)/count;
 const moment=mask.reduce((sum,v,i)=>sum+v*((i%width-mx)**2+(Math.floor(i/width)-my)**2),0)/(count*count);
 return {image:{width,height,values},features:[area/(width*height),edges/count,4*Math.PI*area/(edges*edges+1e-6),moment]};
}
function classify(d:Def,s:Settings):Result {
 const key=d.extension!.key,isWave=d.extension!.task==='waveform',isSelection=d.extension!.task==='selection';
 const make=(seed:number,n:number,shift=false)=>{const r=random(seed),shapes:NonNullable<Result['shapes']>=[],images:NonNullable<Result['images']>=[],powers:number[][]=[];
  const rows=Array.from({length:n},()=>{let label=Math.floor(r()*3),x:number[]=[];
   if(isWave){const v=signal(key,label,r,s.noise,shift),p=powerSpectrum(v);shapes.push(v.map((y,i)=>({x:i,y})));powers.push(p);x=waveformFeatures(key,v,p)}
   else if(key==='symbols'){const generated=symbol(r,label,s.noise,shift);images.push(generated.image);x=generated.features}
   else if(key==='fluid'){const c=[[.72,.52,.22,.45],[.8,.3,.75,.28],[.2,.65,.35,.7]][label];x=c.map(v=>v+perturb(r)*s.noise*.4+(shift?.18:0))}
   else if(key==='cement-contamination'){const c=[[.5,.35,.75,.3],[.8,.65,.3,.6],[.25,.8,.55,.75]][label];x=c.map(v=>v+perturb(r)*s.noise*.4+(shift?.15:0))}
   else {x=d.features.map(()=>r());if(key==='hole-cleaning'){const risk=.6*(1-x[0])+.3*x[1]+.5*x[2]-.15*x[3];label=risk<.4?0:risk<.7?1:2}else if(key==='screen'){x[1]=Math.max(x[0],x[1]);label=x[0]<.3?0:x[0]>.65&&x[1]>.5?2:1}else if(key==='sand-release'){label=x[0]<.4?0:x[1]>.6&&x[3]>.2?2:1}else throw Error('Unknown classification '+key);x=x.map((v,j)=>clamp(v+perturb(r)*s.noise*.06+(shift&&j===0?.23:0)))}
   return {x,y:[label]}
  });return {rows,shapes,images,powers}
 };
 const a=make(77123,180),b=make(s.seed,115,s.shift),lookup=nearest(a.rows.map(r=>r.x),a.rows.map(r=>r.y[0]),Math.max(1,Math.round(s.parameter))),hits=b.rows.map(r=>lookup(r.x)),allowed=(row:Sample,j:number)=>key==='screen'?j===0?row.x[0]<.52:j===1?row.x[0]>.18&&row.x[0]<.86:row.x[0]>.45&&row.x[1]>.4:key==='sand-release'?j===0?row.x[0]<.6:j===1?true:row.x[1]>.4&&row.x[3]>.2:true;
 const prediction=hits.map((h,i)=>[h.votes.map((v,j)=>({v,j})).filter(c=>allowed(b.rows[i],c.j)).sort((a,b)=>b.v-a.v)[0]?.j??-1]),baseline=b.rows.map(row=>[key==='hole-cleaning'?clamp(Math.floor((1-row.x[0])*3),0,2):key==='symbols'?row.x[0]>.3?0:1:key==='fluid'?row.x[0]>.5?0:2:1]);
 return {train:a.rows,test:b.rows,prediction,baseline,classification:true,shapes:b.shapes.length?b.shapes:undefined,images:b.images.length?b.images:undefined,frequency:['torsion','compressor','shot-acoustic'].includes(key)?{bins:b.powers[0].map((_,i)=>i),power:b.powers}:undefined,metrics:classification(prediction,baseline,b.rows,3),fit:{labels:d.classes,values:d.classes.map((_,j)=>a.rows.filter(r=>r.y[0]===j).length),note:'参考观测特征经过标准化；预测票数与近邻距离由实际检索得到。'},candidates:isSelection?i=>d.classes.map((name,j)=>({name,allowed:allowed(b.rows[i],j),votes:hits[i].votes[j]||0,reason:'公开的教学适配约束'})):undefined,explain:i=>({labels:d.classes,values:hits[i].votes,neighbours:hits[i].neighbours.map(n=>({index:n.index,distance:n.value,label:n.label})),note:isSelection?'先过滤不满足适配条件的候选，再按参考近邻票数排序。':'输入特征来自当前波形、图形或观测指标；标准化和邻居标签仅来自参考集。'})};
}
function robust(d:Def,s:Settings):Result {
 const key=d.extension!.key;
 const make=(seed:number,n:number,target:boolean)=>{const r=random(seed),points:NonNullable<Result['points']>=[];const rows=Array.from({length:n},(_,i)=>{const x=r(),y=r();points.push({x,y});const flag=+(target&&(key==='geochem-background'?(x-.65)**2+(y-.4)**2<.03:i>=42&&i<65||i>=105&&i<125)),polluted=!target&&s.shift&&i%5===0,v=perturb(r)*s.noise*.12;let data:number[];
  if(key==='station-balance'){const input=1+.3*Math.sin(i*.12),storage=.06*Math.cos(i*.09),leak=(flag||polluted)?.18:0;data=[input,input-storage-leak+v,storage,leak*.7+perturb(r)*s.noise*.08]}
  else if(key==='geochem-background')data=[.3+v,.4+perturb(r)*s.noise*.12,.25+perturb(r)*s.noise*.1].map((v,j)=>v+(flag||polluted?[.4,.3,.5][j]:0));
  else data=[.3+v,.4+perturb(r)*s.noise*.1,.2+perturb(r)*s.noise*.1,.5+perturb(r)*s.noise*.1].map((v,j)=>v+(flag||polluted?[.35,.1,.28,-.1][j]:0));return {x:data,y:[flag]}});return {rows,points}};
 const a=make(77123,210,false),b=make(s.seed,155,true),features=(r:Sample)=>key==='station-balance'?[r.x[0]-r.x[1]-r.x[2],r.x[3]]:r.x,names=key==='station-balance'?['主站守恒残差','冗余站残差']:d.features.map(f=>f.name),mu=features(a.rows[0]).map((_,j)=>median(a.rows.map(r=>features(r)[j]))),sd=mu.map((v,j)=>Math.max(.001,1.4826*median(a.rows.map(r=>Math.abs(features(r)[j]-v))))),contribution=(r:Sample)=>features(r).map((v,j)=>((v-mu[j])/sd[j])**2),score=(r:Sample)=>contribution(r).reduce((a,b)=>a+b,0),reference=a.rows.map(score).sort((a,b)=>a-b),threshold=reference[Math.floor(reference.length*.98)]*s.parameter,scores=b.rows.map(score),prediction=scores.map(v=>[+(v>threshold)]),baseline=b.rows.map(r=>[key==='station-balance'?+(Math.abs(r.x[0]-r.x[1])>.14):+(r.x[0]>.6)]);
 return {train:a.rows,test:b.rows,prediction,baseline,scores,threshold,classification:true,points:key==='geochem-background'?b.points:undefined,metrics:classification(prediction,baseline,b.rows,2),fit:{labels:names,values:sd,note:'正常参考样本估计中位数与1.4826倍MAD，阈值仅由参考分数分位数得到。'},explain:i=>({labels:names,values:contribution(b.rows[i]),note:'各项稳健标准化残差平方相加形成分数；这是正常背景偏离，不是已确认事故。'})};
}
function tracking(d:Def,s:Settings):Result {
 const width=42,height=34;
 const make=(seed:number,shift=false)=>{const r=random(seed),centre=Array.from({length:width},(_,x)=>Math.round(14+4*Math.sin(x*.14+seed*.001))),truth:number[]=[],values=Array.from({length:width*height},(_,i)=>{const x=i%width,y=Math.floor(i/width),distance=y-centre[x];truth.push(+(distance===0));return Math.exp(-distance*distance/3)+1.18*Math.exp(-((y-25)**2)/2)*(x%13<5?1:0)+perturb(r)*s.noise*.45+(shift?.3*Math.sin(x*.3+y*.6):0)});return {width,height,values,truth,centre}};
 const features=(im:ReturnType<typeof make>,i:number)=>{const x=i%width,y=Math.floor(i/width),at=(a:number,b:number)=>im.values[clamp(b,0,height-1)*width+clamp(a,0,width-1)],v=at(x,y);return [v,v-(at(x,y-3)+at(x,y+3))/2,Math.abs(at(x,y-1)-at(x,y+1)),mean([at(x-1,y),v,at(x+1,y)])]};
 const a=make(77123),image=make(s.seed,s.shift),train=a.values.map((_,i)=>({x:features(a,i),y:[+((Math.floor(i/width)-a.centre[i%width])**2<=1)]})),test=image.values.map((_,i)=>({x:features(image,i),y:[image.truth[i]]})),model=logistic(train.map(r=>r.x),train.map(r=>r.y[0])),scores=test.map(r=>model.predict(r.x)),cost=Array.from({length:width},()=>Array(height).fill(Infinity)),back=Array.from({length:width},()=>Array(height).fill(0)),baselineRow:number[]=Array(width).fill(0);
 for(let y=0;y<height;y++)cost[0][y]=-Math.log(scores[y*width]+1e-8);for(let x=1;x<width;x++)for(let y=0;y<height;y++)for(let previous=Math.max(0,y-3);previous<=Math.min(height-1,y+3);previous++){const value=cost[x-1][previous]-Math.log(scores[y*width+x]+1e-8)+s.parameter*(y-previous)**2;if(value<cost[x][y]){cost[x][y]=value;back[x][y]=previous}}
 const path=Array(width).fill(0);path[width-1]=cost[width-1].indexOf(Math.min(...cost[width-1]));for(let x=width-1;x>0;x--)path[x-1]=back[x][path[x]];for(let x=0;x<width;x++){const col=Array.from({length:height},(_,y)=>image.values[y*width+x]);baselineRow[x]=col.indexOf(Math.max(...col))}
 const prediction=test.map((_,i)=>[+(Math.floor(i/width)===path[i%width])]),baseline=test.map((_,i)=>[+(Math.floor(i/width)===baselineRow[i%width])]);return {train,test,prediction,baseline,scores,classification:true,image,loss:model.loss,metrics:[[{name:'层位平均绝对偏差',ai:mean(path.map((v,i)=>Math.abs(v-image.centre[i]))),baseline:mean(baselineRow.map((v,i)=>Math.abs(v-image.centre[i]))),higher:false}]],fit:{labels:d.features.map(f=>f.name),values:model.weights.slice(1),note:'参考波形特征训练像素分数；动态规划再最小化分数代价与层位跳跃惩罚。'},explain:i=>({labels:d.features.map(f=>f.name),values:model.contributions(test[i].x),base:model.weights[0],note:'贡献解释局部logit；最终路径还受相邻道连续性约束，不能把局部分数当最终路径。'})};
}
