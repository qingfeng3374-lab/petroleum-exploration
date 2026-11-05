import {conceptSVG} from '../src/case-sdk/visuals.ts';
import {concept as chapterConcept} from '../src/chapter-sdk/visuals.ts';
import {concept as sceneConcept,esc as escapeMarkup} from '../src/scene-sdk/visuals.ts';
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import {build} from 'esbuild';import {zipSync,strToU8} from 'fflate';
const root=process.cwd(),write=(p,s)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,s)};
const context={window:null,localStorage:{getItem:()=>null,setItem:()=>{}},console};context.window=context;vm.createContext(context);
vm.runInContext(fs.readFileSync('public/legacy/assets/data.js','utf8'),context);
const atlas=JSON.parse(JSON.stringify(context.ATLAS));write('src/data/atlas.json',JSON.stringify({meta:atlas.meta,methods:atlas.methods,stages:atlas.stages},null,2));
for(const f of ['registry.js','kit.js'])vm.runInContext(fs.readFileSync('public/legacy/assets/core/'+f,'utf8'),context);
vm.runInContext(fs.readFileSync('public/legacy/assets/cases/welllog-layer.case.js','utf8'),context);
const welllog=JSON.parse(JSON.stringify(context.Cases.get('welllog-layer')));welllog.tabs.demo={builtin:'welllog-layer'};write('src/data/welllog.json',JSON.stringify(welllog));
const bridge=await build({entryPoints:['src/case-sdk/legacy-presentation.ts'],bundle:true,write:false,format:'iife',loader:{'.css':'text'},minify:true});write('public/cases/legacy-presentation.js',bridge.outputFiles[0].text);
const exampleRoot='public/legacy/firstbreak-pick-case',exampleFiles={};for(const name of fs.readdirSync(exampleRoot,{recursive:true})){const filename=path.join(exampleRoot,name);if(fs.statSync(filename).isFile())exampleFiles[name.split(path.sep).join('/')]=fs.readFileSync(filename)}write('public/examples/firstbreak-pick-case.zip',zipSync(exampleFiles));
write('public/case-archives/welllog-layer.zip',zipSync({'case.json':strToU8(JSON.stringify(welllog,null,2))}));
const entries=fs.readdirSync('src/cases').filter(x=>x.endsWith('.case.ts')),catalog=[];
for(const file of entries){
 const source=fs.readFileSync('src/cases/'+file,'utf8'),match=source.match(/export default ([\s\S]*?) satisfies (?:CaseDef|ChapterCaseDef|SceneCaseDef);/);
 if(!match)throw Error('Invalid case definition: '+file);
 const obj=JSON.parse(match[1]),scene=obj.engine==='scene',chapter=obj.engine==='chapter'||scene,runtime=scene?'scene-sdk':chapter?'chapter-sdk':'case-sdk';
 const bundle=await build({stdin:{contents:`import def from './src/cases/${file}';import {start} from './src/${runtime}/runtime';start(def);`,resolveDir:root},bundle:true,write:false,format:'iife',loader:{'.css':'text'},minify:true});
 const fig=scene?sceneConcept(obj):chapter?chapterConcept(obj):'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 290">'+conceptSVG(obj.kind)+'</svg>';
 const lesson=chapter?obj:obj.lesson;
 const manifest={id:obj.id,sceneId:obj.sceneId,title:obj.title,methods:obj.methods||[obj.kind==='geo'?'opt':'cv'],version:'4.0.0',updated:'2026-11-04',extensions:{atlas:{version:1,engine:scene?'scene':chapter?'chapter':'geology',...(obj.extension?{research:obj.extension.key}:{}),archive:`case-archives/${obj.id}.zip`,views:['background','workflow','demo'],...(chapter?{english:{title:obj.english.title,intro:obj.english.intro}}:{})}},tabs:{
  background:{label:'专业背景',lede:obj.intro,judge:[{label:'方法',value:obj.method},{label:'数据',value:'可复现合成数据'},{label:'输出',value:'待复核候选'},{label:'难度',value:'中'}],sections:[
   {title:'当前做法与问题',html:`<p>${obj.intro}</p>${fig}`},
   {title:'WHAT · 使用什么 AI',html:`<p>${lesson.what}</p>`},
   {title:'WHY · 为什么适用',html:`<p>${lesson.why}</p>`},
   {title:'HOW · 如何起作用',html:`<p>${lesson.how}</p>`},
   {title:'可视化的作用',html:'<ul>'+lesson.visuals.map(s=>'<li>'+s+'</li>').join('')+'</ul>'},
   {title:'需要准备什么',html:`<p>${obj.data}</p>`},{title:'难度与参考方向',html:`<p>${obj.limit}</p>`},...(obj.references?.length?[{title:'知识来源与教学实现',html:'<ol>'+obj.references.map(r=>`<li><a href="${escapeMarkup(r.url)}" target="_blank" rel="noopener noreferrer">${escapeMarkup(r.title)}</a><p>${escapeMarkup(r.note)}</p></li>`).join('')+'</ol>'}]:[])
  ]},
  workflow:{title:obj.title+'的处理流程',lead:['教学情境：所有结果由本地合成观测计算。'],steps:obj.steps,metrics:{title:'计算与可视化证据',html:lesson.visuals.map(s=>'<p>'+s+'</p>').join('')},fails:[{name:'强干扰或分布变化',why:obj.limit},{name:'参考数据不合适',why:'结合独立检验与基线复核，不能只看训练效果。'}]},
  demo:{mode:'page',html:'demo/index.html',label:'案例演示',height:1400}
 }};
 const json=JSON.stringify(manifest).replace(/</g,'\\u003c');
 const html=`<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${obj.title}</title></head><body><script type="application/json" id="atlas-case-manifest">${json}</script><script>${bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
 write(`release/single/${obj.name}.html`,html);write(`public/cases/${obj.id}.html`,html);
 write(`release/legacy/${obj.name}/case.json`,JSON.stringify(manifest,null,2));write(`release/legacy/${obj.name}/demo/index.html`,html);
 const archive=zipSync({'case.json':strToU8(JSON.stringify(manifest,null,2)),'demo/index.html':strToU8(html)});
 write(`release/archives/${obj.name}.zip`,archive);write(`public/case-archives/${obj.id}.zip`,archive);
 catalog.push({...manifest,url:`cases/${obj.id}.html`,name:obj.name});
}
write('src/data/catalog.json',JSON.stringify(catalog,null,2));
console.log(`Migrated ${atlas.stages.length} stages / ${atlas.stages.reduce((n,s)=>n+s.scenes.length,0)} scenes; built ${catalog.length} self-contained AI cases.`);
