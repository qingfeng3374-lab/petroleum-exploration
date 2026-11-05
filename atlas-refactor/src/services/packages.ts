import {openDB} from 'idb';
import {readArchive} from './archive';
export const database=()=>openDB('petroleum-atlas',1,{upgrade(db){db.createObjectStore('packages',{keyPath:'id'})}});
export const load=async()=>{const db=await database();return db.getAll('packages')};
export const save=async(pkg:any)=>{const db=await database();await db.put('packages',pkg)};
export const remove=async(id:string)=>{const db=await database();await db.delete('packages',id)};
const object=(value:any)=>value!==null&&typeof value==='object'&&!Array.isArray(value);
export function validateStructure(m:any){
 const errors:string[]=[];
 if(!object(m))return ['缺少清单'];
 if(typeof m.id!=='string'||!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(m.id))errors.push('id 必须为英文小写、数字、连字符');
 if(typeof m.title!=='string'||!m.title.trim())errors.push('缺少标题');
 if(typeof m.sceneId!=='string')errors.push('sceneId 必须为文本');
 if(m.methods!==undefined&&(!Array.isArray(m.methods)||m.methods.some((v:any)=>typeof v!=='string'||!v.trim())))errors.push('methods 必须为技术 ID 字符串数组');
 for(const key of ['version','updated'])if(m[key]!==undefined&&typeof m[key]!=='string')errors.push(key+' 必须为文本');
 const bg=m.tabs?.background;
 if(!object(m.tabs)||!object(bg)||!Array.isArray(bg.sections)||!bg.sections.length)errors.push('缺少背景段落');
 else if(bg.sections.some((s:any)=>!object(s)||typeof s.title!=='string'||!(typeof s.html==='string'||typeof s.body==='string')))errors.push('背景段落必须包含文本标题和 HTML 或正文');
 if(bg?.lede!==undefined&&typeof bg.lede!=='string')errors.push('背景简介必须为文本');
 if(bg?.judge!==undefined&&(!Array.isArray(bg.judge)||bg.judge.some((v:any)=>!object(v))))errors.push('背景判断项必须为对象数组');
 const flow=m.tabs?.workflow;
 if(flow!==undefined&&(!object(flow)||flow.steps!==undefined&&(!Array.isArray(flow.steps)||flow.steps.some((s:any)=>!object(s)||typeof s.name!=='string'||['do','effect','trap'].some(key=>s[key]!==undefined&&typeof s[key]!=='string')))))errors.push('流程步骤格式不正确');
 const demo=m.tabs?.demo;
 if(demo!==undefined&&(!object(demo)||demo.mode!==undefined&&!['auto','page','module','builtin'].includes(demo.mode)||['html','js','css','builtin'].some(key=>demo[key]!==undefined&&typeof demo[key]!=='string')))errors.push('演示入口格式不正确');
 if(/<script/i.test(JSON.stringify(m)))errors.push('清单不得包含 script 标签');
 return errors;
}
export function validate(m:any,scenes:any[],existing:any[]=[]){const errors=validateStructure(m);if(!object(m))return errors;if(!scenes.some(s=>s.id===m.sceneId))errors.push('sceneId 不存在');if(existing.some(c=>c.id===m.id))errors.push('案例 id 重复，请先删除已有版本');return errors}
function parsedPackage(manifest:any,files:any[]){const errors=validateStructure(manifest);if(errors.length)throw Error(errors.join('；'));return {id:manifest.id,manifest,files,imported:true}}
export async function readFiles(files:File[]){if(files.length===1&&files.some(f=>/\.(rar|7z|tar|gz)$/i.test(f.name)))throw Error('当前支持 ZIP 压缩包，请将其他格式转换为 ZIP');if(files.length===1&&/\.zip$/i.test(files[0].name))files=await readArchive(files[0]);else if(files.some(f=>/\.zip$/i.test(f.name))&&!files.some(f=>/(^|\/)(case|[^/]+\.case)\.json$/i.test(f.name)))throw Error('请单独选择一个 ZIP 压缩包');if(files.reduce((s,f)=>s+f.size,0)>6*1024*1024)throw Error('案例总大小超过 6 MiB');const all=await Promise.all(files.map(async f=>({name:f.webkitRelativePath||f.name,size:f.size,mime:f.type,enc:/\.(html?|json|js|mjs|css|svg|csv|txt)$/i.test(f.name)?'text':'dataurl',data:/\.(html?|json|js|mjs|css|svg|csv|txt)$/i.test(f.name)?await f.text():await new Promise<string>((ok,bad)=>{const r=new FileReader();r.onload=()=>ok(String(r.result));r.onerror=bad;r.readAsDataURL(f)})})));if(all.filter(f=>!/(^|\/)(readme[^/]*|\.DS_Store)$/i.test(f.name)).length===1&&all.some(f=>/\.html?$/i.test(f.name))){const entry=all.find(f=>/\.html?$/i.test(f.name))!;const d=new DOMParser().parseFromString(entry.data,'text/html'),m=d.querySelector('#atlas-case-manifest');if(!m)throw Error('HTML 缺少 atlas-case-manifest 元信息');const manifest=JSON.parse(m.textContent!);return parsedPackage(manifest,[{...entry,name:'demo/index.html'}])}const manifests=all.filter(f=>/(^|\/)(case|[^/]+\.case)\.json$/i.test(f.name));if(manifests.length!==1)throw Error('需要唯一 case.json 或 *.case.json');const mf=manifests[0],prefix=mf.name.slice(0,mf.name.lastIndexOf('/')+1),manifest=JSON.parse(mf.data);return parsedPackage(manifest,all.filter(f=>f!==mf).map(f=>({...f,name:f.name.startsWith(prefix)?f.name.slice(prefix.length):f.name})))}
export function download(name:string,text:string,type='application/json'){const u=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
