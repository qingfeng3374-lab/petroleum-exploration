export interface CaseDef {id:string;sceneId:string;title:string;name:string;kind:'knn'|'line'|'geo'|'map'|'fracture';method:string;intro:string;concept:string;limit:string;data:string;steps:{name:string;do:string;effect:string;trap:string}[];classes:string[];teaching?:Teaching;lesson?:{what:string;why:string;how:string;visuals:string[]}}
export interface Sample {x:number;y:number;f:number[]}
export interface Teaching {controlLabel:string;controlNote:string;terms:string[][];stepNotes:string[]}
export interface Dataset {samples:Sample[];truth:number[];width:number;height:number;image?:number[]}
