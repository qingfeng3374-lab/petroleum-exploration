export type Family='raster'|'shape'|'regression'|'anomaly'|'optimize'|'control'|'denoise'|'repair'|'boundary'|'report'|'graph'|'multi'|'risk'|'gas'|'tank'|'classification'|'tracking';
export interface SceneCaseDef {
 id:string;sceneId:string;name:string;title:string;stage:string;stageId:string;engine:'scene';family:Family;
 method:string;methods:string[];intro:string;concept:string;what:string;why:string;how:string;data:string;limit:string;
 features:{name:string;unit:string;range:[number,number]}[];classes:string[];outputs:{name:string;unit:string}[];
 steps:{name:string;do:string;effect:string;trap:string}[];visuals:string[];english:Record<string,any>;
 extension?:{key:string;task:'regression'|'classification'|'waveform'|'robust'|'tracking'|'design'|'selection';projection?:'simplex'|'ordered'|'percent';constraint?:{weights:[number,number];secondMax?:number;sumMax?:number}};
 references?:{title:string;url:string;note:string}[];
}
export interface Settings {seed:number;noise:number;parameter:number;shift:boolean;budget:number;document:string}
export interface Sample {x:number[];y:number[];position?:number;text?:string}
export interface Explanation {labels:string[];values:number[];base?:number;note:string;neighbours?:{index:number;distance:number;label:number}[]}
export interface Raster {width:number;height:number;values:number[];truth?:number[]}
export interface GraphCandidate {name:string;allowed:boolean;votes:number;reason:string}
export interface SceneResult {
 train:Sample[];test:Sample[];prediction:number[][];baseline:number[][];scores?:number[];classification:boolean;
 metrics:{name:string;ai:number;baseline:number;higher:boolean}[][];
 explain:(index:number,output:number)=>Explanation;fit:Explanation;fits?:Explanation[];loss?:number[];
 image?:Raster;images?:Raster[];shapes?:{x:number;y:number}[][];series?:{values:number[];masked?:boolean[]}[];
 grid?:{x:number;y:number;value:number;truth:number;risk:number;allowed:boolean;pareto:boolean}[];
 best?:{x:number;y:number;value:number;truth:number};threshold?:number;
 candidates?:(index:number)=>GraphCandidate[];source?:string;report?:{field:string;value:string;source:string;confidence:number}[];
 control?:{state:number;action:number;next:number;baseline:number;reward:number}[];qTable?:number[][];calibration?:{n:number;q:number[];baselineQ?:number[]} ;
 frequency?:{bins:number[];power:number[][]};points?:{x:number;y:number}[];
 design?:{secondaryName:string;weights:[number,number];secondMax?:number;sumMax?:number};
}
