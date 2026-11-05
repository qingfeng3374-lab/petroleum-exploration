import type {ChapterCaseDef as Def,Row,Settings,ChapterResult} from './types';
import {random,metrics} from '../case-sdk/algorithms';
import {mean,rmse,ridge,logistic,nearest,pca,tfidf,dot} from './math';
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const noise=(r:()=>number)=>r()+r()+r()-1.5;
const values=(d:Def,x:number[])=>x.map((v,i)=>d.features[i].range[0]+v*(d.features[i].range[1]-d.features[i].range[0]));
const normal=(d:Def,x:number[])=>x.map((v,i)=>(v-d.features[i].range[0])/(d.features[i].range[1]-d.features[i].range[0]));
export function makeRows(d:Def,seed:number,n:number,amount:number,shift=false):Row[]{const r=random(seed);return Array.from({length:n},(_,i)=>{let x=Array.from({length:d.features.length},()=>r()),y=0;
 if(d.task==='mudlogging'||d.task==='welllog'){y=Math.floor(r()*3);const centres=d.task==='welllog'?[[.24,.42,.24],[.8,.6,.64],[.18,.83,.3]]:[[.3,.72,.25],[.66,.28,.68],[.8,.55,.35]];x=centres[y].map(v=>clamp(v+noise(r)*amount*.48+(shift?.14:0)))}
 else if(d.task==='cementing'){y=+(r()>.5);x=[clamp((y?.76:.24)+noise(r)*amount*.6),clamp((y?.7:.3)+noise(r)*amount*.65),clamp((y?.64:.36)+noise(r)*amount*.7)];if(shift)x[0]=clamp(x[0]+.35)}
 else if(d.task==='completion'){y=x[1]>.61?2:x[2]>.5&&x[0]>.32?0:1;if(r()<amount*.13)y=Math.floor(r()*3);if(shift)x[2]=clamp(x[2]-.3)}
 else if(d.task==='drilling')y=15+45*x[0]+27*x[1]+15*x[2]-33*x[3]+noise(r)*amount*24+(shift?-22:0);
 else if(d.task==='refining')y=72+15*x[0]-9*x[1]+12*x[2]+6*x[3]+noise(r)*amount*10+(shift?10:0);
 else if(d.kind==='surrogate')y=objective(d,x)+noise(r)*amount*9+(shift?12*Math.sin(x[0]*8):0);
 return {x:values(d,x),y};})}
export function objective(d:Def,x:number[]){return d.task==='perforation'?55+32*x[0]+36*x[1]-30*x[0]**2-27*x[1]**2+9*x[0]*x[1]+5*x[2]:45+65*x[0]+48*x[1]-58*x[0]**2-42*x[1]**2+14*x[0]*x[1]+7*x[2]}
const polynomial=(x:number[])=>[...x,...x.map(v=>v*v),x[0]*x[1],x[0]*x[2],x[1]*x[2]];
function score(prediction:number[],baseline:number[],truth:number[],classes:number):ChapterResult['metrics']{return [{name:'独立测试宏 F1',model:metrics(prediction,truth,classes).macro,baseline:metrics(baseline,truth,classes).macro,better:'higher'}]}
export function runChapter(d:Def,s:Settings):ChapterResult {
 if(d.kind==='firstbreak')return firstbreak(d,s);
 if(d.kind==='forecast')return forecast(d,s);
 if(d.kind==='anomaly')return anomaly(d,s);
 if(d.kind==='retrieval')return retrieval(d,s);
 const train=makeRows(d,77123,180,s.noise),test=makeRows(d,s.seed,120,s.noise,s.shift),x=train.map(r=>r.x),y=train.map(r=>r.y);
 if(d.kind==='classification'){
   const binary=d.task==='cementing',model=binary?logistic(x,y):undefined,lookup=nearest(x,y,Math.max(1,Math.round(s.parameter))),neighbours=test.map(r=>lookup(r.x));
   const scores=test.map((r,i)=>binary?model!.predict(r.x):Math.max(...neighbours[i].votes)/Math.max(1,Math.round(s.parameter))),prediction=scores.map((p,i)=>binary?+(p>s.parameter):neighbours[i].prediction);
   const baseline=test.map(row=>{const z=normal(d,row.x);return d.task==='welllog'?(z[0]>.55?1:0):d.task==='completion'?(z[1]>.6?2:1):binary?+(z[0]>.5):z[0]<.48?0:z[0]>.73?2:1});
   return {train,test,prediction,baseline,scores,loss:model?.loss,fitEvidence:binary?{labels:d.features.map(f=>f.name),values:model!.weights.slice(1),note:'实际训练的逻辑回归权重，不是手填的重要性。'}:{labels:d.classes,values:d.classes.map((_,c)=>y.filter(v=>v===c).length),note:'kNN 保存参考样本，图示各类参考数量。'},metrics:score(prediction,baseline,test.map(r=>r.y),d.classes.length),evidence:i=>binary?{labels:d.features.map(f=>f.name),values:model!.contributions(test[i].x),base:model!.weights[0],note:'条形表示特征对模型 logit 的贡献；不是因果贡献。'}:{labels:d.classes,values:neighbours[i].votes,neighbours:neighbours[i].neighbours,note:'实际标准化特征距离与近邻投票；投票比例不是校准概率。'}};
 }
 const phi=(row:Row)=>d.kind==='surrogate'?polynomial(normal(d,row.x)):row.x,fit=ridge(train.map(phi),y,s.parameter),prediction=test.map(r=>fit.predict(phi(r))),baseline=test.map(()=>mean(y));
 const result:ChapterResult={train,test,prediction,baseline,scores:prediction,fitEvidence:{labels:d.kind==='surrogate'?d.features.map(f=>f.name).concat(d.features.map(f=>f.name+'²'),['交互 1×2','交互 1×3','交互 2×3']):d.features.map(f=>f.name),values:fit.weights,note:'实际岭回归系数，特征标准化仅来自参考数据。'},metrics:[{name:'独立测试 RMSE',model:rmse(prediction,test.map(r=>r.y)),baseline:rmse(baseline,test.map(r=>r.y)),better:'lower'}],evidence:i=>{const c=fit.contributions(phi(test[i]));return {labels:d.features.map(f=>f.name),base:fit.intercept,values:d.kind==='surrogate'?c.slice(0,3).map((v,j)=>v+c[j+3]+c.slice(6).reduce((a,w,k)=>a+([0,1].includes(j)&&k===0||[0,2].includes(j)&&k===1||[1,2].includes(j)&&k===2?w/2:0),0)):c,note:'特征贡献加上训练均值形成预测；统计关联不等于因果作用。'}}};
 if(d.kind==='surrogate'){
   result.grid=Array.from({length:21*21},(_,i)=>{const a=i%21/20,b=Math.floor(i/21)/20,x=[a,b,.5];return {x:a,y:b,prediction:fit.predict(polynomial(x)),truth:objective(d,x)+(s.shift?12*Math.sin(x[0]*8):0),feasible:a*.55+b*.45<=s.budget}});
   result.best=result.grid.filter(p=>p.feasible).sort((a,b)=>b.prediction-a.prediction)[0];
 }return result;
}
function firstbreak(d:Def,s:Settings):ChapterResult {
 const generate=(seed:number,traces:number)=>{const r=random(seed),rows:Row[]=[],raw:number[][]=[],arrivals:number[]=[];for(let t=0;t<traces;t++){const arrival=28+Math.floor(r()*35),wave=Array.from({length:100},(_,i)=>noise(r)*(.03+s.noise*.2)+(i>=arrival?.35*Math.sin((i-arrival)*1.25)*Math.min(1,(i-arrival+1)/5):0));if(s.shift&&seed===s.seed)for(let i=9;i<14;i++)wave[i]+=.55;raw.push(wave);arrivals.push(arrival);for(let i=8;i<100;i++){const short=mean(wave.slice(i-3,i+1).map(v=>v*v)),long=mean(wave.slice(Math.max(0,i-15),i+1).map(v=>v*v));rows.push({x:[short,Math.abs(wave[i]-wave[i-1]),short/(long+.0001)],y:+(i>=arrival)})}}return {rows,raw,arrivals}};
 const reference=generate(77123,14),target=generate(s.seed,6),fit=logistic(reference.rows.map(r=>r.x),reference.rows.map(r=>r.y)),scores=target.rows.map(r=>fit.predict(r.x)),prediction=scores.map(v=>+(v>s.parameter)),baseline=target.rows.map(r=>+(r.x[2]>2.2));
 const pick=(values:number[],t:number,consecutive:number)=>{for(let i=consecutive-1;i<92;i++)if(values.slice(t*92+i-consecutive+1,t*92+i+1).every(Boolean))return i+9-consecutive;return 100},mae=(p:number[],count:number)=>mean(target.arrivals.map((a,t)=>Math.abs(pick(p,t,count)-a)));
 return {train:reference.rows,test:target.rows,prediction,baseline,scores,raw:target.raw,loss:fit.loss,fitEvidence:{labels:d.features.map(f=>f.name),values:fit.weights.slice(1),note:'实际训练的逻辑回归权重，不是手填的重要性。'},metrics:[{name:'初至平均绝对误差（采样点）',model:mae(prediction,3),baseline:mae(baseline,1),better:'lower'}],evidence:i=>({labels:d.features.map(f=>f.name),values:fit.contributions(target.rows[i].x),base:fit.weights[0],note:'能量、振幅变化与能量比共同进入逻辑回归；连续三点越阈值形成拾取。'})};
}
function forecast(d:Def,s:Settings):ChapterResult {
 const r=random(s.seed),series:number[]=[];for(let i=0;i<170;i++)series.push((i?series[i-1]*.965:100)+1.2+.7*Math.sin(i*.12)+noise(r)*s.noise*5+(s.shift&&i>110?-1.8:0));
 const rows=Array.from({length:166},(_,i)=>{const t=i+4;return {x:[series[t-1],series[t-2],series[t-3],Math.sin(t*.12)],y:series[t]}}),cut=100,train=rows.slice(0,cut),test=rows.slice(cut),fit=ridge(train.map(r=>r.x),train.map(r=>r.y-r.x[0]),s.parameter),prediction=test.map(r=>r.x[0]+fit.predict(r.x)),baseline=test.map(r=>r.x[0]);
 return {train,test,prediction,baseline,scores:prediction,raw:[series],cut,fitEvidence:{labels:d.features.map(f=>f.name),values:fit.weights,note:'时间靠前的参考窗口拟合产量变化系数。'},metrics:[{name:'滚动一步预测 RMSE',model:rmse(prediction,test.map(r=>r.y)),baseline:rmse(baseline,test.map(r=>r.y)),better:'lower'}],evidence:i=>({labels:d.features.map(f=>f.name),values:fit.contributions(test[i].x),base:test[i].x[0]+fit.intercept,note:'只用已发生观测和预先给定的合成周期，预测变化后叠加昨日量；不读取未来产量。'})};
}
function anomaly(d:Def,s:Settings):ChapterResult {
 const generate=(seed:number,n:number,test:boolean)=>{const r=random(seed);return Array.from({length:n},(_,i)=>{const a=Math.sin(i*.11)+noise(r)*.1,b=Math.cos(i*.037),y=+(test&&(i>42&&i<61||i>108&&i<126));let x=[a+.3*b,.8*a-.2*b,.2*a+.8*b,-.3*a+.7*b].map(v=>v+noise(r)*s.noise*.15);if(y)x=x.map((v,j)=>v+[.1,-.55,1.0,-.25][j]);if(s.shift&&!test&&i%5===0)x=x.map((v,j)=>v+[.1,-.55,1,-.25][j]);return {x,y}})};
 const train=generate(77123,210,false),test=generate(s.seed,160,true),fit=pca(train.map(r=>r.x)),training=train.map(r=>fit.score(r.x)).sort((a,b)=>a-b),threshold=training[Math.floor(training.length*.98)]*s.parameter,scores=test.map(r=>fit.score(r.x)),prediction=scores.map(v=>+(v>threshold)),baseline=test.map(r=>+(Math.abs(r.x[2])>1.1));
 return {train,test,prediction,baseline,scores,threshold,fitEvidence:{labels:d.features.map(f=>f.name),values:fit.vectors[0],note:'正常参考数据拟合的第一主方向载荷。'},metrics:score(prediction,baseline,test.map(r=>r.y),2),evidence:i=>({labels:d.features.map(f=>f.name),values:fit.residual(test[i].x),note:'各传感器标准化重构残差的平方相加得到异常分数；异常不等于已证实泄漏。'})};
}
const symptomGroups=[['压力下降','环空异常','油管漏失','压差变化'],['结蜡','产量递减','含蜡','温度下降'],['泵效下降','示功异常','负荷波动','供液不足']];
function retrieval(d:Def,s:Settings):ChapterResult {
 const generate=(seed:number,n:number)=>{const r=random(seed);return Array.from({length:n},()=>{const y=Math.floor(r()*3),group=symptomGroups[y],tokens=[group[Math.floor(r()*group.length)],group[Math.floor(r()*group.length)],'井史','复核'];if(r()<s.noise*.7)tokens.push(symptomGroups[(y+1)%3][Math.floor(r()*4)]);if(s.shift&&seed===77123)for(let i=0;i<tokens.length;i++)if(!['井史','复核'].includes(tokens[i]))tokens[i]='旧术语_'+tokens[i];return {x:[],y,tokens,text:tokens.join(' ')}})};
 const train=generate(77123,60),test=generate(s.seed,30),fit=tfidf(train.map(r=>r.tokens!)),search=(tokens:string[])=>{const v=fit.encode(tokens),neighbours=fit.vectors.map((row,index)=>({index,value:dot(row,v),label:train[index].y,text:train[index].text})).filter(n=>n.value>0).sort((a,b)=>b.value-a.value).slice(0,Math.max(1,Math.round(s.parameter))),votes=[0,0,0];neighbours.forEach(n=>votes[n.label]+=n.value);return {neighbours,votes,prediction:neighbours.length?votes.indexOf(Math.max(...votes)):-1,contributions:fit.terms.map((_,j)=>neighbours.reduce((sum,n)=>sum+v[j]*fit.vectors[n.index][j],0))}};
 const hits=test.map(r=>search(r.tokens!)),prediction=hits.map(h=>h.prediction),baseline=test.map(r=>r.tokens?.includes('产量递减')?1:r.tokens?.includes('泵效下降')?2:0),query=search(s.query.trim().split(/\s+/).filter(Boolean));
 return {train,test,prediction,baseline,scores:hits.map(h=>Math.max(0,...h.neighbours.map(n=>n.value))),queryPrediction:query.prediction,vocabulary:fit.terms,fitEvidence:{labels:fit.terms,values:fit.idf,note:'只用历史语料拟合的逆文档频率 IDF。'},metrics:score(prediction,baseline,test.map(r=>r.y),3),evidence:()=>({labels:fit.terms,values:query.contributions,neighbours:query.neighbours,note:'TF-IDF 权重只在历史语料拟合，余弦相似度用于检索；没有匹配词时不生成方案。'})};
}
