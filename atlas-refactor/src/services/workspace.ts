import {writable,get} from 'svelte/store';
import atlas from '../data/atlas.json';
import {database,validate} from './packages';

export interface Workspace {methods:Record<string,any>;scenes:{upserts:Record<string,any>;deleted:string[]}}
const KEY='atlas-workspace-v1';
export const emptyWorkspace=():Workspace=>({methods:{},scenes:{upserts:{},deleted:[]}});
const read=(key:string,fallback:any)=>{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}};
const record=(value:any)=>value!==null&&typeof value==='object'&&!Array.isArray(value);
export function validWorkspace(value:any):value is Workspace {
 return record(value)&&record(value.methods)&&Object.values(value.methods).every(record)&&record(value.scenes)&&record(value.scenes.upserts)&&Object.values(value.scenes.upserts).every((row:any)=>record(row)&&(row.methods===undefined||Array.isArray(row.methods)&&row.methods.every((id:any)=>typeof id==='string')))&&Array.isArray(value.scenes.deleted)&&value.scenes.deleted.every((id:any)=>typeof id==='string');
}
function initial(){const saved=read(KEY,null);if(validWorkspace(saved))return saved;const state=emptyWorkspace(),legacy={methods:read('atlas.methods.user.v1',{}),scenes:read('atlas.scenes.user.v1',state.scenes)};if(validWorkspace(legacy)){state.methods=legacy.methods;state.scenes=legacy.scenes}const overrides=read('atlas-data-overrides',{});if(record(overrides))for(const [id,patch] of Object.entries(overrides))if(record(patch))state.scenes.upserts[id]={...state.scenes.upserts[id],...patch as any,id};return state}
export const workspace=writable<Workspace>(initial());
export function applyWorkspace<T extends {methods:Record<string,any>;stages:any[]}>(base:T,state:Workspace):T{
  const methods={...base.methods};for(const [id,m] of Object.entries(state.methods))if(m.deleted)delete methods[id];else methods[id]={...m,key:id};
  const originals=new Map(base.stages.flatMap(st=>st.scenes.map(s=>[s.id,{...s,stageId:st.id}])));
  const rows=[...originals.values()].filter((s:any)=>!state.scenes.deleted.includes(s.id)&&!state.scenes.upserts[s.id]);
  for(const [id,patch] of Object.entries(state.scenes.upserts)){if(state.scenes.deleted.includes(id))continue;rows.push({...originals.get(id) as any,...patch,id,__local:true})}
  return {...base,methods,stages:base.stages.map(st=>({...st,scenes:rows.filter((s:any)=>s.stageId===st.id).map((s:any)=>({...s,stageName:st.name,methods:(s.methods||[]).filter((id:string)=>methods[id]),data:s.data||[],refs:s.refs||[],datasets:s.datasets||[],cross:s.cross||[]}))}))};
}
export function commitWorkspace(next:Workspace){localStorage.setItem(KEY,JSON.stringify(next));workspace.set(next)}
export function saveMethod(value:any){if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value.key)||!value.name.trim()||!value.abbr.trim())throw Error('技术 ID、名称和缩写不能为空，ID 只允许小写字母、数字与连字符。');const next=structuredClone(get(workspace));next.methods[value.key]={...value};commitWorkspace(next)}
export function deleteMethod(id:string,scenes:any[],cases:any[]){if(scenes.some(s=>s.methods.includes(id))||cases.some(c=>c.manifest.methods?.includes(id)))throw Error('该技术仍被场景或案例引用，请先调整关联。');const next=structuredClone(get(workspace));next.methods[id]={...applyWorkspace(atlas,next).methods[id],deleted:true};commitWorkspace(next)}
export function saveScene(value:any,source:any){if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value.id)||!value.name.trim())throw Error('场景 ID 与名称不能为空，ID 只允许小写字母、数字与连字符。');if(!source.stages.some((s:any)=>s.id===value.stageId)||!value.methods.length||value.methods.some((id:string)=>!source.methods[id]))throw Error('请选择有效环节及至少一种技术。');const next=structuredClone(get(workspace));next.scenes.upserts[value.id]={...value};next.scenes.deleted=next.scenes.deleted.filter(id=>id!==value.id);commitWorkspace(next)}
export function deleteScene(id:string,cases:any[]){if(cases.some(c=>c.manifest.sceneId===id))throw Error('该场景仍有关联案例，请先移动或移除案例。');const next=structuredClone(get(workspace));next.scenes.deleted=[...new Set([...next.scenes.deleted,id])];commitWorkspace(next)}
export function restoreScene(id:string){const next=structuredClone(get(workspace));if(!next.scenes.deleted.includes(id))delete next.scenes.upserts[id];next.scenes.deleted=next.scenes.deleted.filter(x=>x!==id);commitWorkspace(next)}
export function restoreMethod(id:string){const next=structuredClone(get(workspace));if(next.methods[id]?.deleted&&next.methods[id]?.abbr)delete next.methods[id].deleted;else delete next.methods[id];commitWorkspace(next)}
export async function restoreBackup(input:any,currentHidden:string[]){
  const records=Array.isArray(input)?input:input.packages||[];
  if(!Array.isArray(records))throw Error('备份格式不正确');
  const state:Workspace=structuredClone(input.workspace||get(workspace));
  if(input.overrides)for(const [id,patch] of Object.entries(input.overrides))state.scenes.upserts[id]={...state.scenes.upserts[id],...patch as any,id};
  if(!validWorkspace(state))throw Error('内容备份格式不正确');
  const nextAtlas=applyWorkspace(atlas,state),scenes=nextAtlas.stages.flatMap(st=>st.scenes);
  for(const scene of scenes){const original=atlas.stages.flatMap(st=>st.scenes).find(s=>s.id===scene.id);const references=state.scenes.upserts[scene.id]?.methods||original?.methods||[];if(!references.length||references.some((id:string)=>!Object.hasOwn(nextAtlas.methods,id)))throw Error('备份存在无效场景关联')}
  for(const [id,patch] of Object.entries(state.scenes.upserts)){if(state.scenes.deleted.includes(id))continue;const row=scenes.find(s=>s.id===id);if(!row||!(patch.methods||row.methods)?.every((id:string)=>nextAtlas.methods[id]))throw Error('备份存在无效场景关联')}
  for(const record of records){const errors=validate(record.manifest,scenes);if(record.id!==record.manifest?.id||!Array.isArray(record.files)||errors.length)throw Error('备份存在无效案例：'+(record.id||'')+' '+errors.join('；'))}
  const hidden=input.hidden??currentHidden;if(!Array.isArray(hidden)||hidden.some((id:any)=>typeof id!=='string'))throw Error('隐藏名单格式不正确');
  const db=await database();const merged=new Map((await db.getAll('packages')).map(record=>[record.id,record]));for(const record of records)merged.set(record.id,record);for(const record of merged.values()){if(!scenes.some(s=>s.id===record.manifest.sceneId)||(record.manifest.methods||[]).some((id:string)=>!Object.hasOwn(nextAtlas.methods,id)))throw Error('备份存在无效案例：'+record.id)}
  const tx=db.transaction('packages','readwrite'),before=localStorage.getItem(KEY),oldHidden=localStorage.getItem('atlas-hidden');
  try{for(const record of records)tx.store.put(record);localStorage.setItem(KEY,JSON.stringify(state));localStorage.setItem('atlas-hidden',JSON.stringify(hidden));await tx.done;workspace.set(state);return hidden as string[]}
  catch(error){try{tx.abort()}catch{}await tx.done.catch(()=>{});if(before===null)localStorage.removeItem(KEY);else localStorage.setItem(KEY,before);if(oldHidden===null)localStorage.removeItem('atlas-hidden');else localStorage.setItem('atlas-hidden',oldHidden);throw error}
}
export function legacyBackup(){const v2=read('atlas.casepack.v2',[]),v1=read('atlas.casepack.v1',[]);const packages=[...v2,...v1].filter((r,i,all)=>r.pkg&&r.meta&&all.findIndex(x=>x.meta?.id===r.meta.id)===i).map(r=>({id:r.meta.id,manifest:{...r.pkg,...r.meta},files:r.files||[],imported:true}));const state=structuredClone(get(workspace));Object.assign(state.methods,read('atlas.methods.user.v1',{}));const edits=read('atlas.scenes.user.v1',{upserts:{},deleted:[]});Object.assign(state.scenes.upserts,edits.upserts);state.scenes.deleted=[...new Set([...state.scenes.deleted,...edits.deleted])];return {packages,workspace:state,hidden:read('atlas.case.blocked.v1',[])}}
