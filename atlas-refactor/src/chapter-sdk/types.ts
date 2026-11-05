export interface ChapterCaseDef {
  id:string;sceneId:string;title:string;name:string;stage:string;engine:'chapter';
  kind:'firstbreak'|'classification'|'regression'|'forecast'|'anomaly'|'retrieval'|'surrogate';
  task:string;method:string;methods:string[];intro:string;concept:string;what:string;why:string;how:string;data:string;limit:string;
  features:{name:string;unit:string;range:[number,number]}[];classes:string[];
  steps:{name:string;do:string;effect:string;trap:string}[];visuals:string[];
  english:Record<string,any>;
}
export interface Row {x:number[];y:number;text?:string;tokens?:string[]}
export interface Settings {seed:number;noise:number;parameter:number;shift:boolean;budget:number;query:string}
export interface ChapterResult {
  train:Row[];test:Row[];prediction:number[];baseline:number[];scores:number[];
  metrics:{name:string;model:number;baseline:number;better:'higher'|'lower'}[];
  evidence:(index:number)=>{labels:string[];values:number[];base?:number;neighbours?:{index:number;value:number;label:number;text?:string}[];note:string};
  fitEvidence?:{labels:string[];values:number[];note:string};
  loss?:number[];threshold?:number;raw?:number[][];cut?:number;grid?:{x:number;y:number;prediction:number;truth:number;feasible:boolean}[];
  best?:{x:number;y:number;prediction:number;truth:number};queryPrediction?:number;vocabulary?:string[];
}
