import {random,metrics as classificationMetrics} from '../case-sdk/algorithms';
import {ridge,logistic,nearest,pca,tfidf,dot,mean,rmse} from '../chapter-sdk/math';
import type {SceneCaseDef as Def,Settings,Sample,SceneResult as Result,Explanation} from './types';
import {runExtension} from './extension-models';
const clamp=(x:number,lo=0,hi=1)=>Math.max(lo,Math.min(hi,x));
const perturb=(r:()=>number)=>r()+r()+r()-1.5;
const materialize=(d:Def,x:number[])=>x.map((v,j)=>d.features[j].range[0]+v*(d.features[j].range[1]-d.features[j].range[0]));
const normalize=(d:Def,x:number[])=>x.map((v,j)=>(v-d.features[j].range[0])/(d.features[j].range[1]-d.features[j].range[0]));
const polynomial=(x:number[])=>[...x,...x.map(v=>v*v),...x.flatMap((v,j)=>x.slice(j+1).map(w=>v*w))];
const polyLabels=(d:Def)=>[...d.features.map(f=>f.name),...d.features.map(f=>f.name+'²'),...d.features.flatMap((f,j)=>d.features.slice(j+1).map(g=>f.name+' × '+g.name))];
const classification=(p:number[],b:number[],y:number[],classes:number):Result['metrics']=>[[{name:'独立测试宏 F1',ai:classificationMetrics(p,y,classes).macro,baseline:classificationMetrics(b,y,classes).macro,higher:true},{name:'独立测试准确率',ai:mean(p.map((v,i)=>+(v===y[i]))),baseline:mean(b.map((v,i)=>+(v===y[i]))),higher:true}]];
const regressionMetrics=(p:number[][],b:number[][],test:Sample[]):Result['metrics']=>p[0].map((_,j)=>[{name:'独立测试 RMSE',ai:rmse(p.map(r=>r[j]),test.map(r=>r.y[j])),baseline:rmse(b.map(r=>r[j]),test.map(r=>r.y[j])),higher:false}]);
const samples=(x:number[][],y:number[][]):Sample[]=>x.map((row,i)=>({x:row,y:y[i]}));
export function runScene(d:Def,s:Settings):Result {
 if(d.extension)return runExtension(d,s);
 switch(d.family){
  case 'raster':return raster(d,s);case 'shape':return shapes(d,s);case 'regression':case 'multi':case 'optimize':return regress(d,s);
  case 'anomaly':return anomalies(d,s);case 'denoise':return denoise(d,s);case 'repair':return repair(d,s);case 'boundary':return boundaries(d,s);
  case 'control':return d.sceneId==='co4'?valves(d,s):trajectory(d,s);case 'report':return report(d,s);case 'graph':return graph(d,s);
  case 'risk':case 'gas':case 'tank':return diagnostic(d,s);
  case 'classification':case 'tracking':throw Error('Missing extension specification: '+d.id);
 }
}
// Every response describes a different synthetic petroleum mechanism. None is a field-calibrated simulator.
export function response(id:string,x:number[]):number[]{const [a,b,c,e]=x;
 switch(id){
 case 's4':return [4+24*(1-a)+8*b-9*c+7*b*c];
 case 'd4':return [Math.max(0,120*(1-a)/(1+.8*b+.6*c))];
 case 'd5':return [90-100*(a-.58)**2-85*(b-.4)**2+16*a*b-18*c];
 case 'w2':return [3+24*(1-a)+11*b-8*c+6*b*c];
 case 'co3':return [20+75*a+35*b+30*c+45*a*b-25*e];
 case 'p4':return [clamp(1.2-.65*a-.25*b+.16*c-.12*a*b)*100];
 case 'wo5':return [8+30*a+42*b+18*c+32*a*b];
 case 'e5':return [100*Math.exp(-8*(a-.55)**2-5*(b-.45)**2)*(1-.65*c)*( .45+.55*e)];
 case 't2':return [Math.min(95,8+35*a+(4+15*b+7*c)*e+8*b*e*e)];
 case 't4':return [10+90*a-8*b+5*c+10*e-7*a*b];
 case 'c2':return [91-80*(a-.55)**2-110*(b-.48)**2+12*a*b-20*c];
 case 'c4':return [clamp(.92-.56*a+.4*b-.35*c-.28*a*a+.12*a*b)*100];
 case 'co2':return [60+45*a+25*b-35*a*a-15*b*b+8*a*b-12*c,clamp(.08+.55*a*a+.2*b-.12*c)];
 case 'pr3':return [50+60*a+48*b-60*a*a-65*b*b-28*a*b+8*c];
 case 'e3':return [25+65*a+50*b-45*a*a-35*b*b+20*a*b-30*c];
 case 'e4':return [30+80*a+35*b-65*a*a-30*b*b+14*a*b-18*c];
 case 't3':return [30+70*a+55*b-65*a*a-40*b*b-20*a*b-12*c];
 case 'r1':return [45+70*a+30*b-65*a*a-28*b*b+18*a*b-18*c];
 case 'p2':return [12+36*a-15*b-8*c+12*a*a,5+9*a-4*b+6*c-4*a*c];
 case 'e2':return [25+110*a-35*b+25*c+35*a*c,8+50*a+20*b-30*c+12*a*b];
 case 'r2':{const z=[8+10*a+5*b,10+12*b-5*c,35+22*a-15*a*a+10*c,28-12*a+5*b,18-8*a-5*b+8*c],total=z.reduce((v,w)=>v+w,0);return z.map(v=>100*v/total)}
 case 'r3':return [Math.max(0,180*(1-a)/(1+.9*b+.7*c+.4*e))];
 default:throw Error('Missing synthetic response '+id);
 }
}
function regress(d:Def,s:Settings):Result {
 const make=(seed:number,n:number,shift=false)=>{const r=random(seed);return Array.from({length:n},()=>{const z=d.features.map(()=>r());let y=response(d.sceneId,z).map((v,j)=>v+perturb(r)*s.noise*(d.sceneId==='co2'&&j===1?.04:5)+(shift?(d.sceneId==='co2'&&j===1?.15:6)*Math.sin(z[0]*8):0));if(d.sceneId==='r2'){const total=y.reduce((a,b)=>a+Math.max(.01,b),0);y=y.map(v=>Math.max(.01,v)/total*100)}return {x:materialize(d,z),y}})};
 const train=make(77123,200),cal=make(99187,70),test=make(s.seed,130,s.shift),phi=(r:Sample)=>polynomial(normalize(d,r.x)),fits=d.outputs.map((_,j)=>ridge(train.map(phi),train.map(r=>r.y[j]),s.parameter));
 const project=(v:number[])=>{if(d.sceneId!=='r2')return v;const total=v.reduce((a,b)=>a+Math.max(0,b),0)||1;return v.map(x=>100*Math.max(0,x)/total)};
 const baselineFor=(r:Sample)=>d.sceneId==='t4'?[r.x[0]]:train[0].y.map((_,j)=>mean(train.map(p=>p.y[j])));
 const prediction=test.map(r=>project(fits.map(f=>f.predict(phi(r))))),baseline=test.map(baselineFor);
 const q=d.outputs.map((_,j)=>{const errors=cal.map(r=>Math.abs(project(fits.map(f=>f.predict(phi(r))))[j]-r.y[j])).sort((a,b)=>a-b);return errors[Math.min(errors.length-1,Math.ceil((errors.length+1)*.9)-1)]});
 const baselineQ=d.outputs.map((_,j)=>{const errors=cal.map(r=>Math.abs(baselineFor(r)[j]-r.y[j])).sort((a,b)=>a-b);return errors[Math.min(errors.length-1,Math.ceil((errors.length+1)*.9)-1)]});
 const result:Result={train,test,prediction,baseline,classification:false,calibration:{n:cal.length,q,baselineQ},metrics:regressionMetrics(prediction,baseline,test),fit:{labels:polyLabels(d),values:fits[0].weights,note:'二次项与交互项系数仅由独立参考样本拟合。'},explain:(i,j)=>({labels:polyLabels(d),values:fits[j].contributions(phi(test[i])),base:fits[j].intercept,note:d.sceneId==='r2'?'贡献和给出归一化前收率；负值截断后总收率归一到100%。':'偏置加各标准化多项式贡献得到预测；统计关联不是因果关系。'})};
 result.fits=fits.map(f=>({labels:polyLabels(d),values:f.weights,note:result.fit.note}));
 result.metrics.forEach((m,j)=>m.push({name:'90% 校准区间实际覆盖率',ai:mean(test.map((r,i)=>+(Math.abs(prediction[i][j]-r.y[j])<=q[j]))),baseline:mean(test.map((r,i)=>+(Math.abs(baseline[i][j]-r.y[j])<=baselineQ[j]))),higher:true}));
 if(d.family==='optimize'){
  const predict=(x:number[])=>project(fits.map(f=>f.predict(polynomial(x))));
  result.grid=Array.from({length:441},(_,i)=>{const x=i%21/20,y=Math.floor(i/21)/20,z=[x,y,.5],p=predict(z),truth=response(d.sceneId,z)[0]+(s.shift?6*Math.sin(x*8):0);return {x,y,value:p[0],truth,risk:d.sceneId==='co2'?p[1]:.55*x+.45*y,allowed:.55*x+.45*y<=s.budget&&(d.sceneId!=='co2'||p[1]<=.45),pareto:false}});
  const candidates=result.grid.filter(p=>p.allowed);for(const a of candidates)a.pareto=!candidates.some(b=>b.value>=a.value&&b.risk<=a.risk&&(b.value>a.value||b.risk<a.risk));result.best=candidates.slice().sort((a,b)=>b.value-a.value)[0];
 }return result;
}
function anomalies(d:Def,s:Settings):Result {
 const make=(seed:number,n:number,isTest:boolean)=>{const r=random(seed);return Array.from({length:n},(_,i)=>{const a=Math.sin(i*.08),b=Math.cos(i*.043),flag=+(isTest&&(i>=48&&i<65||i>=112&&i<129)),polluted=!isTest&&s.shift&&i%4===0,shift=flag||polluted?1:0;
 const normal=d.sceneId==='d2'?[.8*a+.25*b,.4*a-.3*b,.7*a+.2*b,-.2*a+.6*b]:d.sceneId==='pr4'?[a+.2*b,.7*a-.4*b,-.25*a+.8*b,.4*a+.6*b]:[.5*a+.4*b,.8*a-.2*b,.2*a+.7*b,-.4*a+.5*b];
 const offsets=d.sceneId==='d2'?[.1,.8,-.6,.25]:d.sceneId==='pr4'?[.7,.1,.5,-.6]:[0,0,1,0];return {x:normal.map((v,j)=>v+perturb(r)*s.noise*.3+shift*offsets[j]),y:[flag]}})};
 const train=make(77123,230,false),test=make(s.seed,170,true),fit=pca(train.map(r=>r.x)),normalScores=train.map(r=>fit.score(r.x)).sort((a,b)=>a-b),threshold=normalScores[Math.floor(normalScores.length*.98)]*s.parameter,scores=test.map(r=>fit.score(r.x)),prediction=scores.map(v=>[+(v>threshold)]),baseline=test.map(r=>[+(Math.abs(r.x[0])>1.2)]);
 return {train,test,prediction,baseline,scores,threshold,classification:true,metrics:classification(prediction.flat(),baseline.flat(),test.map(r=>r.y[0]),2),fit:{labels:d.features.map(f=>f.name),values:fit.vectors[0],note:'第一主方向来自正常参考集；标签只用于测试，不进入PCA或阈值。'},explain:i=>({labels:d.features.map(f=>f.name),values:fit.residual(test[i].x),note:'各通道标准化重构残差的平方相加，再与正常参考分位数阈值比较。'})};
}
function raster(d:Def,s:Settings):Result {
 const width=48,height=36,make=(seed:number,shift:boolean)=>{const r=random(seed),values:number[]=[],truth:number[]=[];const offset=seed===77123?.1:.8;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const line=d.sceneId==='s1'?width*.52+Math.sin(y*.06+offset)*3:d.sceneId==='w3'?width*.5+Math.sin(y*.18+offset)*12:width*.5+Math.sin(y*.13+offset)*6;
  const mask=d.sceneId==='wo3'?((x-width*.65)**2/24+(y-height*.55)**2/40<1):Math.abs(x-line)<(d.sceneId==='s1'?1.7:1.3);
  const signal=d.sceneId==='s1'?.5+.24*Math.sin(y*.7+(x>line?1.8:0)):.67+.05*Math.sin(y*.5);
  truth.push(+mask);values.push(clamp(signal-(mask?.36:0)+perturb(r)*s.noise*.35+(shift?.17*Math.sin(x*.7):0)));
 }
 return {width,height,values,truth}}
 const ref=make(77123,false),image=make(s.seed,s.shift),features=(im:typeof ref,index:number)=>{const x=index%width,y=Math.floor(index/width),at=(a:number,b:number)=>im.values[clamp(b,0,height-1)*width+clamp(a,0,width-1)],centre=at(x,y),surround=mean([at(x-3,y),at(x+3,y),at(x,y-3),at(x,y+3)]);return [1-centre,surround-centre,Math.abs(at(x-1,y)-at(x+1,y)),Math.abs(at(x,y-1)-at(x,y+1))]};
 const train=ref.values.flatMap((_,i)=>i%3===0?[{x:features(ref,i),y:[ref.truth[i]]}]:[]),test=image.values.map((_,i)=>({x:features(image,i),y:[image.truth[i]],position:i})),model=logistic(train.map(r=>r.x),train.map(r=>r.y[0])),scores=test.map(r=>model.predict(r.x)),prediction=scores.map(v=>[+(v>s.parameter)]),baseline=test.map(r=>[+(r.x[0]>.55)]);
 return {train,test,prediction,baseline,scores,classification:true,image,loss:model.loss,metrics:classification(prediction.flat(),baseline.flat(),test.map(r=>r.y[0]),2),fit:{labels:d.features.map(f=>f.name),values:model.weights.slice(1),note:'逻辑回归从参考像素的真实观测特征学习权重，不读取目标图像掩膜。'},explain:i=>({labels:d.features.map(f=>f.name),values:model.contributions(test[i].x),base:model.weights[0],note:'贡献和为logit，经sigmoid形成像素分数；标注掩膜仅用于检验。'})};
}
function shapes(d:Def,s:Settings):Result {
 const build=(seed:number,n:number,shift=false)=>{const r=random(seed),curves:{x:number;y:number}[][]=[];const rows=Array.from({length:n},()=>{const label=Math.floor(r()*3),curve=Array.from({length:48},(_,i)=>{const a=i/47;
 if(d.sceneId==='pr1'){const theta=2*Math.PI*a,x=.5+.46*Math.cos(theta),y=.5+(label===0?.34*Math.sign(Math.sin(theta)):label===1?.22*Math.sin(theta)+.18*Math.cos(theta):.13*Math.sin(theta))+(label===1&&x<.35?-.18:0);return {x,y:y+perturb(r)*s.noise*.14+(shift?.15*Math.sin(theta*4):0)}}
 if(d.sceneId==='m3'){const profiles=[[.75,.32,.25],[.25,.72,.5],[.15,.27,.78]],p=profiles[label];return {x:a,y:clamp(p[Math.floor(a*2.99)]+perturb(r)*s.noise*.35+(shift?.18:0))}}
 return {x:a,y:.5+(label===0?.12*Math.sin(a*25):label===1?.3*Math.sin(a*10):.35*Math.sin(a*40)*Math.sin(a*6))+perturb(r)*s.noise*.3+(shift?.12*Math.sin(a*60):0)};
 });curves.push(curve);const y=curve.map(p=>p.y),f=d.sceneId==='pr1'?[Math.max(...y)-Math.min(...y),mean(y.slice(0,12))-mean(y.slice(24,36)),Math.abs(curve.reduce((a,p,i)=>a+p.x*(curve[(i+1)%48].y-p.y),0)),mean(y.slice(16,24))]:d.sceneId==='m3'?[mean(y.slice(0,16)),mean(y.slice(16,32)),mean(y.slice(32)),Math.max(...y)-Math.min(...y)]:[Math.sqrt(mean(y.map(v=>(v-.5)**2))),mean(y.slice(1).map((v,i)=>Math.abs(v-y[i]))),Math.abs(mean(y.slice(0,24))-mean(y.slice(24))),Math.max(...y)-Math.min(...y)];return {x:f,y:[label]}});return {rows,curves}};
 const a=build(77123,150),b=build(s.seed,105,s.shift),lookup=nearest(a.rows.map(r=>r.x),a.rows.map(r=>r.y[0]),Math.round(s.parameter)),hits=b.rows.map(r=>lookup(r.x)),prediction=hits.map(h=>[h.prediction]),baseline=b.rows.map(r=>[d.sceneId==='m3'?r.x.indexOf(Math.max(...r.x.slice(0,3))):r.x[0]>.5?0:1]);
 return {train:a.rows,test:b.rows,prediction,baseline,classification:true,shapes:b.curves,metrics:classification(prediction.flat(),baseline.flat(),b.rows.map(r=>r.y[0]),3),fit:{labels:d.classes,values:d.classes.map((_,j)=>a.rows.filter(r=>r.y[0]===j).length),note:'kNN保存参考形态的观测特征；不使用目标类别生成输入。'},explain:i=>({labels:d.classes,values:hits[i].votes,neighbours:hits[i].neighbours.map(n=>({index:n.index,distance:n.value,label:n.label})),note:'图形特征先按参考集标准化；距离最近的标注形态投票。'})};
}
function denoise(d:Def,s:Settings):Result {
 const width=40,height=44,make=(seed:number,shift=false)=>{const r=random(seed),truth=Array.from({length:width*height},(_,i)=>.5+.25*Math.sin(Math.floor(i/width)*.65+Math.sin(i%width*.1+seed*.01)*1.4)),values=truth.map((v,i)=>v+perturb(r)*s.noise*.75+(shift?.2*Math.sin(Math.floor(i/width)*.1+i%width*.8):0));return {width,height,values,truth}};
 const feature=(im:ReturnType<typeof make>,i:number)=>{const x=i%width,y=Math.floor(i/width);return [[0,0],[-1,0],[1,0],[0,-1],[0,1],[-2,0],[2,0],[0,-2],[0,2]].map(([dx,dy])=>im.values[clamp(y+dy,0,height-1)*width+clamp(x+dx,0,width-1)])};
 const a=make(77123),image=make(s.seed,s.shift),train=a.values.flatMap((_,i)=>i%2?[{x:feature(a,i),y:[a.truth[i]]}]:[]),test=image.values.map((_,i)=>({x:feature(image,i),y:[image.truth[i]],position:i})),fit=ridge(train.map(r=>r.x),train.map(r=>r.y[0]),s.parameter),prediction=test.map(r=>[fit.predict(r.x)]),baseline=test.map(r=>[mean(r.x.slice(0,5))]);
 return {train,test,prediction,baseline,classification:false,image,metrics:regressionMetrics(prediction,baseline,test),fit:{labels:d.features.map(f=>f.name),values:fit.weights,note:'去噪滤波系数由独立参考含噪—干净对学习，不读取目标干净图。'},explain:i=>({labels:d.features.map(f=>f.name),values:fit.contributions(test[i].x),base:fit.intercept,note:'邻域观测的加权贡献生成中心值；简单基线仅取五点均值。'})};
}
function repair(d:Def,s:Settings):Result {
 const make=(seed:number,n:number,shift=false)=>{const r=random(seed);return Array.from({length:n},(_,i)=>{const a=.5+.35*Math.sin(i*.075),b=.5+.3*Math.cos(i*.13),x=[a+perturb(r)*s.noise*.15,b+perturb(r)*s.noise*.15,Math.sin(i*.075)],target=35+55*a-22*b+perturb(r)*s.noise*8+(shift&&i>85?18:0);return {x,y:[target],position:i}})};
 const train=make(77123,220),full=make(s.seed,155,s.shift),masked=full.map((_,i)=>i>=28&&i<=49||i>=94&&i<=116),test=full.filter((_,i)=>masked[i]),model=ridge(train.map(r=>r.x),train.map(r=>r.y[0]),s.parameter),prediction=test.map(r=>[model.predict(r.x)]),baseline=test.map(r=>{let left=r.position!-1,right=r.position!+1;while(masked[left])left--;while(masked[right])right++;return [full[left].y[0]+(full[right].y[0]-full[left].y[0])*(r.position!-left)/(right-left)]});
 return {train,test,prediction,baseline,classification:false,series:[{values:full.map(r=>r.y[0]),masked}],metrics:regressionMetrics(prediction,baseline,test),fit:{labels:d.features.map(f=>f.name),values:model.weights,note:'用独立完整参考井拟合跨曲线回归；目标井缺失段不参与拟合。'},explain:i=>({labels:d.features.map(f=>f.name),values:model.contributions(test[i].x),base:model.intercept,note:'只读取仍可用的其他曲线和已知深度相位，缺失目标值不进入特征；插值只使用缺口外端点。'})};
}
function boundaries(d:Def,s:Settings):Result {
 const make=(seed:number,n:number,shift=false)=>{const r=random(seed),edges=seed===77123?[34,75,112,155,195]:[29,61,102,142],values=Array.from({length:n},(_,i)=>{const layer=edges.filter(e=>i>=e).length,levels=d.sceneId==='m4'?[.72,.31,.86,.42,.64,.2]:[.2,.72,.38,.86,.3,.6];return levels[layer]+perturb(r)*s.noise*.35+(shift?.17*Math.sin(i*.2):0)}),rows=values.map((_,i)=>{const avg=(start:number,end:number)=>mean(values.slice(clamp(start,0,n-1),clamp(end,1,n)));const left=avg(i-5,i),right=avg(i,i+5),wideLeft=avg(i-10,i),wideRight=avg(i,i+10);return {x:[Math.abs(right-left),Math.abs(wideRight-wideLeft),Math.abs(values[i]-values[Math.max(0,i-1)]),Math.abs((values[Math.min(n-1,i+2)]-values[Math.max(0,i-2)]))/4],y:[+(edges.some(e=>Math.abs(i-e)<=2))],position:i}});return {rows,values}};
 const a=make(77123,225),b=make(s.seed,170,s.shift),train=a.rows.slice(10,-10),test=b.rows.slice(10,-10),fit=logistic(train.map(r=>r.x),train.map(r=>r.y[0])),scores=test.map(r=>fit.predict(r.x)),prediction=scores.map(v=>[+(v>s.parameter)]),baseline=test.map(r=>[+(r.x[2]>.24)]);
 return {train,test,prediction,baseline,scores,classification:true,threshold:s.parameter,series:[{values:b.values}],loss:fit.loss,metrics:classification(prediction.flat(),baseline.flat(),test.map(r=>r.y[0]),2),fit:{labels:d.features.map(f=>f.name),values:fit.weights.slice(1),note:'已标注参考井的界面邻域训练窗口分类器；测试井标签不参与特征。'},explain:i=>({labels:d.features.map(f=>f.name),values:fit.contributions(test[i].x),base:fit.weights[0],note:'多尺度左右均值差有助于区分噪声与持续跳变；输出为界面邻域候选，不是地层定名。'})};
}
function graph(d:Def,s:Settings):Result {
 const make=(seed:number,n:number,shift=false)=>{const r=random(seed);return Array.from({length:n},()=>{const z=[r(),r(),r(),r()],label=z[0]<.34?0:z[0]<.67?1:2;return {x:materialize(d,z.map((v,j)=>clamp(v+(j&&shift?.15:0)+perturb(r)*s.noise*.08))),y:[label]}})};
 const train=make(77123,180),test=make(s.seed,120,s.shift),lookup=nearest(train.map(r=>r.x),train.map(r=>r.y[0]),Math.round(s.parameter));
 const candidates=(row:Sample)=>{const z=normalize(d,row.x),h=lookup(row.x);return d.classes.map((name,j)=>({name,allowed:j===0?z[0]<.48:j===1?z[0]>.22&&z[0]<.8:z[0]>.54,votes:h.votes[j]||0,reason:j===0?'小尺寸适配约束':j===1?'中等尺寸适配约束':'大尺寸适配约束'}))};
 const prediction=test.map(row=>{const c=candidates(row).map((v,j)=>({...v,j})).filter(v=>v.allowed).sort((a,b)=>b.votes-a.votes);return [c[0]?.j??-1]}),baseline=test.map(()=>[0]);
 return {train,test,prediction,baseline,classification:true,candidates:i=>candidates(test[i]),metrics:classification(prediction.flat(),baseline.flat(),test.map(r=>r.y[0]),3),fit:{labels:d.classes,values:d.classes.map((_,j)=>train.filter(r=>r.y[0]===j).length),note:'小型关系图保存尺寸适配边；历史记录标准化距离产生候选票数，不是假装运行大模型。'},explain:i=>{const hit=lookup(test[i].x);return {labels:d.classes,values:hit.votes,neighbours:hit.neighbours.map(n=>({index:n.index,distance:n.value,label:n.label})),note:'先按已公开的几何范围过滤，再用历史近邻票数排序；没有适配边的工具不能因高票被选中。'}}};
}
function trajectory(d:Def,s:Settings):Result {
 const ref=random(77123),train=Array.from({length:220},()=>{const state=ref()*4-2,action=ref()*2-1,drift=ref()*.4-.2;return {x:[state,action,drift],y:[-.12*state+.65*action+drift+perturb(ref)*s.noise*.02]}}),model=ridge(train.map(r=>r.x),train.map(r=>r.y[0]),s.parameter),r=random(s.seed),test:Sample[]=[],control:NonNullable<Result['control']>=[];let state=1.6,baselineState=1.6,previous=0;
 for(let i=0;i<60;i++){const drift=.1*Math.sin(i*.19)+(s.shift&&i>25?.22:0),candidates=Array.from({length:17},(_,j)=>-1+j/8).filter(a=>Math.abs(a-previous)<=s.budget+.05),action=candidates.sort((a,b)=>{const cost=(u:number)=>{const next=state+model.predict([state,u,drift]);return next*next+.08*u*u};return cost(a)-cost(b)})[0]??previous,disturbance=perturb(r)*s.noise*.08,next=state-.12*state+.65*action+drift+disturbance;baselineState=baselineState*.88+drift+disturbance;test.push({x:[state,action,drift],y:[0],position:i});control.push({state,action,next,baseline:baselineState,reward:-next*next});state=next;previous=action}
 const prediction=control.map(c=>[c.next]),baseline=control.map(c=>[c.baseline]);return {train,test,prediction,baseline,classification:false,control,metrics:regressionMetrics(prediction,baseline,test),fit:{labels:d.features.map(f=>f.name),values:model.weights,note:'参考响应样本识别工具面作用；控制器在动作变化约束下最小化预测误差和动作代价。'},explain:i=>({labels:d.features.map(f=>f.name),values:model.contributions(test[i].x),base:model.intercept,note:'贡献和为已辨识模型预测的下一步偏移变化；轨迹图为加入独立扰动后的真实模拟状态，不把两者混为一谈。'})};
}
function valves(d:Def,s:Settings):Result {
 const trainR=random(77123),q=Array.from({length:24},()=>[0,0,0]),stateId=(water:number,pressure:number)=>clamp(Math.floor(water*8),0,7)*3+clamp(Math.floor(pressure*3),0,2);
 const step=(water:number,pressure:number,action:number,disturbance:number)=>{const opening=action/2,oil=opening*pressure*(1-water),reward=oil-1.2*opening*water-.015*(action===0?1:0);return {water:clamp(water+.016*opening-.008*(1-opening)+disturbance),pressure:clamp(pressure+.025*(1-opening)-.015*opening,.15,1),reward}};
 const loss:number[]=[],train:Sample[]=[];for(let episode=0;episode<450;episode++){let water=.05+trainR()*.7,pressure=.5+trainR()*.5,total=0;for(let i=0;i<30;i++){const state=stateId(water,pressure),action=trainR()<.18?Math.floor(trainR()*3):q[state].indexOf(Math.max(...q[state])),next=step(water,pressure,action,perturb(trainR)*s.noise*.015),target=next.reward+.94*Math.max(...q[stateId(next.water,next.pressure)]);q[state][action]+=(.04+Math.min(.4,s.parameter))*(target-q[state][action]);if(episode<5)train.push({x:[water,pressure,action],y:[next.reward]});water=next.water;pressure=next.pressure;total+=next.reward}loss.push(total)}
 const r=random(s.seed),test:Sample[]=[],control:NonNullable<Result['control']>=[];let water=.25,pressure=.9,bw=water,bp=pressure;for(let i=0;i<45;i++){const state=stateId(water,pressure),allowed=[0,1,2].filter(a=>a/2<=s.budget+.4),action=allowed.sort((a,b)=>q[state][b]-q[state][a])[0]??0,disturbance=perturb(r)*s.noise*.02+(s.shift&&i>16?.035:0),next=step(water,pressure,action,disturbance),base=step(bw,bp,2,disturbance);test.push({x:[water,pressure,action],y:[next.reward],position:i});control.push({state,action,next:next.water,baseline:base.water,reward:next.reward});water=next.water;pressure=next.pressure;bw=base.water;bp=base.pressure}
 // Re-run the baseline with exactly the same disturbance stream for reward comparison.
 const rb=random(s.seed),baseline:number[][]=[];bw=.25;bp=.9;for(let i=0;i<45;i++){const b=step(bw,bp,2,perturb(rb)*s.noise*.02+(s.shift&&i>16?.035:0));baseline.push([b.reward]);bw=b.water;bp=b.pressure}
 return {train,test,prediction:test.map(r=>r.y),baseline,classification:false,control,qTable:q,loss,metrics:[[{name:'累计模拟净收益',ai:control.reduce((a,c)=>a+c.reward,0),baseline:baseline.reduce((a,r)=>a+r[0],0),higher:true},{name:'最终模拟含水比例',ai:water,baseline:bw,higher:false}]],fit:{labels:d.classes,values:q[stateId(.25,.9)],note:'Q表由450个合成训练回合更新；只比较同一模拟器内策略，不声称真实油藏最优。'},explain:i=>({labels:d.classes,values:q[control[i].state],note:'显示当前离散含水—压力状态的三个Q值；动作约束过滤后取最大Q值，回报包含产油与产水惩罚。'})};
}
const reportGroups=[['井深','米','深度'],['砂岩','泥岩','灰岩'],['油斑','气显示','水层'],['漏失','正常循环','异常压力']];
function report(d:Def,s:Settings):Result {
 const make=(seed:number,n:number)=>{const r=random(seed);return Array.from({length:n},()=>{const label=Math.floor(r()*4),tokens=[reportGroups[label][Math.floor(r()*3)],label===0?String(1000+Math.floor(r()*2500)):'记录'];if(r()<s.noise*.5)tokens.push(reportGroups[(label+1)%4][Math.floor(r()*3)]);return {x:[],y:[label],text:tokens.join(' ')}})};
 const train=make(77123,180),test=make(s.seed,100),fit=tfidf(train.map(r=>r.text!.split(' '))),encode=(text:string)=>{const aliases:Record<string,string>={well:'井深',depth:'井深',m:'米',sandstone:'砂岩',shale:'泥岩',limestone:'灰岩',oil:'油斑',gas:'气显示',water:'水层',loss:'漏失',normal:'正常循环',pressure:'异常压力',record:'记录'};return fit.encode(text.split(/\s+/).map(v=>aliases[v.toLowerCase()]||v))},vote=(text:string)=>{const v=encode(text),hits=fit.vectors.map((a,i)=>({index:i,value:dot(a,v),label:train[i].y[0]})).filter(n=>n.value>.01).sort((a,b)=>b.value-a.value).slice(0,Math.round(s.parameter)),votes=[0,0,0,0];hits.forEach(n=>votes[n.label]+=n.value);return {hits,votes,label:hits.length?votes.indexOf(Math.max(...votes)):-1,v}},prediction=test.map(r=>[vote(r.text!).label]),baseline=test.map(r=>[r.text!.includes('米')?0:1]);
 const source=s.document||(s.shift?'深部 2450\n碎屑岩 记录\n气显示 记录':'井深 2450 米\n砂岩 记录\n油斑 记录\n正常循环 记录'),lines=source.split(/\n/).filter(Boolean),report=lines.map(line=>{const hit=vote(line);return {field:hit.label<0?'未识别字段':d.classes[hit.label],value:line,source:line,confidence:hit.hits[0]?.value||0}});
 return {train,test,prediction,baseline,classification:true,source,report,metrics:classification(prediction.flat(),baseline.flat(),test.map(r=>r.y[0]),4),fit:{labels:fit.terms.slice(0,8),values:fit.idf.slice(0,8),note:'TF-IDF词表和权重只来自参考句；输出为可追溯的模板草稿，不生成无来源结论。'},explain:i=>{const h=vote(test[i].text!);return {labels:d.classes,values:h.votes,neighbours:h.hits.map(n=>({index:n.index,distance:1-n.value,label:n.label})),note:'按句检索参考字段并加权投票；草稿直接引用原句，缺失和未知字段保持未提供。'}}};
}
function diagnostic(d:Def,s:Settings):Result {
 const make=(seed:number,n:number,shift=false)=>{const r=random(seed),images:NonNullable<Result['images']>=[];const rows=Array.from({length:n},()=>{
  if(d.family==='gas'){const label=Math.floor(r()*3),centres=[[.74,.45,.3,.62],[.85,.14,.08,.5],[.16,.07,.05,.22]],x=centres[label].map((v,j)=>clamp(v+perturb(r)*s.noise*.3+(shift&&j===0?.2:0)));return {x:materialize(d,x),y:[label]}}
  if(d.family==='tank'){const level=.2+r()*.6,leak=r()>.6,width=30,height=26,values=Array.from({length:width*height},(_,i)=>{const x=i%width,y=Math.floor(i/width),wet=leak&&x>22&&y>15;return clamp((wet?.05:y/height>1-level?.25:.8)+perturb(r)*s.noise*.22+(shift?.2:0))}),visual=mean(Array.from({length:width},(_,x)=>{let count=0;for(let y=0;y<height;y++)if(values[y*width+x]<.5)count++;return count/height})),radar=clamp(level+(leak?.18:0)+perturb(r)*s.noise*.06),wet=values.filter((v,i)=>i%width>22&&Math.floor(i/width)>15&&v<.15).length/70;images.push({width,height,values});return {x:[visual,radar,Math.abs(visual-radar),wet],y:[+leak]}}
  const z=d.features.map(()=>r()),value=d.sceneId==='c3'?1.5*z[0]+1.1*z[1]-.8*z[2]+.7*z[3]-1.1:d.sceneId==='pr5'?1.4*z[0]+.9*z[1]+1.1*z[2]-.7*z[3]-1.2:1.2*z[0]+1.1*z[1]+.8*z[2]-.6*z[3]-1.1,y=+(value+perturb(r)*s.noise*.45>0);return {x:materialize(d,z.map((v,j)=>clamp(v+(shift&&j===0?.3:0)))),y:[y]};
 });return {rows,images}};
 const a=make(77123,190),b=make(s.seed,125,s.shift),train=a.rows,test=b.rows,binary=d.family!=='gas',model=binary?logistic(train.map(r=>r.x),train.map(r=>r.y[0])):undefined,lookup=nearest(train.map(r=>r.x),train.map(r=>r.y[0]),binary?5:Math.round(s.parameter)),hits=test.map(r=>lookup(r.x)),scores=test.map((r,i)=>binary?model!.predict(r.x):Math.max(...hits[i].votes)/Math.round(s.parameter)),prediction=scores.map((v,i)=>[binary?+(v>s.parameter):hits[i].prediction]),baseline=test.map(r=>[d.family==='tank'?+(r.x[2]>.12):d.family==='gas'?+(normalize(d,r.x)[0]>.5):+(normalize(d,r.x)[0]>.6)]);
 return {train,test,prediction,baseline,scores,classification:true,images:b.images.length?b.images:undefined,loss:model?.loss,metrics:classification(prediction.flat(),baseline.flat(),test.map(r=>r.y[0]),d.classes.length),fit:binary?{labels:d.features.map(f=>f.name),values:model!.weights.slice(1),note:'逻辑回归权重从多指标参考记录拟合；风险分数不是校准过的现场事故概率。'}:{labels:d.classes,values:d.classes.map((_,j)=>train.filter(r=>r.y[0]===j).length),note:'气测组分参考样本经过标准化，按实际多组分距离检索。'},explain:i=>binary?{labels:d.features.map(f=>f.name),values:model!.contributions(test[i].x),base:model!.weights[0],note:'多指标贡献相加形成logit，再映射为分数；与单指标规则在同一测试集比较。'}:{labels:d.classes,values:hits[i].votes,neighbours:hits[i].neighbours.map(n=>({index:n.index,distance:n.value,label:n.label})),note:'总烃、重烃比和峰形指标联合投票；单总烃峰高不能唯一判定流体性质。'}};
}
