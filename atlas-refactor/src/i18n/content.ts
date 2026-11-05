import english from './atlas.en.json';
import welllog from './welllog.en.json';
import {translate,translatedObject,localizeMarkup,type Language} from './index';
export function localizeAtlas<T extends {stages:any[];methods:Record<string,any>}>(atlas:T,language:Language):T {
 if(language==='zh')return atlas;
 return {...atlas,methods:Object.fromEntries(Object.entries(atlas.methods).map(([id,m])=>{const [name,desc,signal]=(english.methods as any)[id];return [id,{...m,name,desc,signal}]})),stages:atlas.stages.map(stage=>({...stage,name:stage.en,blurb:(english.stages as any)[stage.id],scenes:stage.scenes.map((scene:any)=>{const [name,intro,point,problem,diffWhy,data]=(english.scenes as any)[scene.id];return {...scene,name,intro,point,problem,diffWhy,data,diff:translate(scene.diff,language)};})}))} as T;
}
export function localizeManifest<T>(manifest:T,language:Language):T {
 const result:any=translatedObject(manifest,language);
 const authored=result.extensions?.atlas?.english;if(language==='en'&&authored){result.title=authored.title;result.tabs.background.lede=authored.intro;}
 if(language==='en'&&result.id==='welllog-layer'){
  result.title=welllog.title;result.tabs.background.lede=welllog.intro;
  result.tabs.background.sections=welllog.sections.map((section,i)=>({...section,html:section.html+localizeMarkup((result.tabs.background.sections[i]?.html.match(/<svg[\s\S]*?<\/svg>/)||[])[0]||'',language)}));
  result.tabs.workflow={...result.tabs.workflow,title:welllog.workflow.title,steps:welllog.workflow.steps,metrics:{html:welllog.workflow.metrics}};
 }
 return result;
}
