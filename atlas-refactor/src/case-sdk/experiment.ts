import type {CaseDef} from '../domain';
import {generate,standardize,knn,centroid,logistic,kmeans,metrics,cleanComponents} from './algorithms';
import {cleanRegions} from './image-features';

export interface Settings {seed:number;noise:number;param:number;small:boolean;threshold:number}
export function controlSpec(kind:string){
  if(kind==='knn')return {label:'邻居数 k',min:1,max:11,step:1,value:5};
  if(kind==='geo')return {label:'背景中心数 K',min:1,max:6,step:1,value:3};
  if(kind==='map')return {label:'最小区域面积（像元）',min:1,max:80,step:1,value:8};
  return {label:'候选分数阈值',min:.1,max:.9,step:.05,value:.5};
}
export function runExperiment(def:CaseDef,settings:Settings){
  const {seed,noise,param,small,threshold}=settings;
  const trainData=generate(def.kind,77123,noise),test=generate(def.kind,seed,noise);
  const stride=small?61:13;
  const train=trainData.samples.filter((_,i)=>i%stride===0),labels=trainData.truth.filter((_,i)=>i%stride===0);
  const std=standardize(train,test.samples);
  let pred:number[],rawPred:number[]|undefined,loss:number[]|undefined,prob:number[]|undefined,scores:number[]|undefined,baseline:number[],history:number[][][]|undefined,weights:number[]|undefined,geoStd:any;
  if(def.kind==='knn'){
    pred=knn(std.train,labels,std.test,param);
    baseline=test.samples.map(p=>p.f[0]<.32?0:p.f[0]>.5?1:2);
  }else if(def.kind==='map'){
    rawPred=centroid(std.train,labels,std.test);
    pred=cleanRegions(rawPred,test.width,param);
    baseline=test.samples.map(p=>p.f[0]>.7?0:p.f[1]>.55?1:2);
  }else if(def.kind==='geo'){
    const bg=train.filter((_,i)=>labels[i]===0),st=standardize(bg,test.samples),km=kmeans(st.train,st.test,param);
    scores=km.scores;loss=km.loss;history=km.history;geoStd=st;
    pred=scores.map(s=>+(s>threshold));
    baseline=test.samples.map(p=>+(p.f[0]>1.1));
  }else{
    const fit=logistic(std.train,labels,std.test);
    prob=fit.prob;loss=fit.loss;weights=fit.weights;
    rawPred=prob.map(v=>+(v>param));
    pred=cleanComponents(rawPred,test.width,small?18:3);
    baseline=test.samples.map(p=>+(p.f[0]>.55));
  }
  const m=metrics(pred,test.truth,def.classes.length),bm=metrics(baseline,test.truth,def.classes.length);
  const counts=def.classes.map((_,c)=>pred.filter(v=>v===c).length);
  return {trainData,train,test,pred,rawPred,baseline,m,bm,loss,prob,scores,counts,std,labels,param,history,weights,geoStd,settings:{...settings}};
}
