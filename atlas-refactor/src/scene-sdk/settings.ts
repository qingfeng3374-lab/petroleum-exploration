import type {SceneCaseDef,Settings} from './types';
export function defaultParameter(d:SceneCaseDef){return ['raster','risk','boundary','tank'].includes(d.family)?.5:['shape','gas','graph','report','classification'].includes(d.family)?5:d.family==='anomaly'?2:.05}
export const initialSettings=(d:SceneCaseDef):Settings=>({seed:20261104,noise:.25,parameter:defaultParameter(d),shift:false,budget:.65,document:''});
