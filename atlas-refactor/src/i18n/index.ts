import ui from './ui.en.json';
import caseText from './cases.en.json';
import legacy from './legacy.en.json';
import experience from './experience.en.json';
import preparation from './preparation.en.json';
import actions from './actions.en.json';
import workspace from './workspace.en.json';
import directions from './directions.en.json';
import field from './field.en.json';
import ai from './ai.en.json';
import lessons from './lessons.en.json';
import scenes from './scenes.en.json';
import research from './research.en.json';
import review from './review.en.json';
import cinematic from './cinematic.en.json';
export type Language='zh'|'en';
export type Theme='dark'|'light';
const dictionary:Record<string,string>={...ui,...caseText,...legacy,...experience,...preparation,...actions,...workspace,...directions,...field,...ai,...lessons,...scenes,...research,...review,...cinematic};
function buildFragmentPattern(){const fragments=Object.keys(dictionary).filter(key=>key.length>=2&&/[\u3400-\u9fff]/.test(key)).sort((a,b)=>b.length-a.length);return new RegExp(fragments.map(key=>key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');}
let fragmentPattern=buildFragmentPattern();
/** Each independently bundled case registers its authored bilingual text. */
export function registerTranslations(pairs:Record<string,string>){Object.assign(dictionary,pairs);fragmentPattern=buildFragmentPattern()}
export function translate(text:unknown,language:Language):string {
  const value=String(text??'');
  if(language==='zh')return value;
  if(dictionary[value]!==undefined)return dictionary[value];
  const key=value.trim();
  return dictionary[key]!==undefined?value.replace(key,dictionary[key]):value.replace(fragmentPattern,key=>dictionary[key]);
}
export function translatedObject<T>(value:T,language:Language):T {
  if(language==='zh')return value;
  if(typeof value==='string')return translate(value,language) as T;
  if(Array.isArray(value))return value.map(v=>translatedObject(v,language)) as T;
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,translatedObject(v,language)])) as T;
  return value;
}
export function localizeMarkup(markup:string,language:Language):string {
  if(language==='zh')return markup;
  const template=document.createElement('template');template.innerHTML=markup;
  const walker=document.createTreeWalker(template.content,NodeFilter.SHOW_TEXT);
  let node:Node|null;while((node=walker.nextNode())){if(!node.parentElement?.closest('script,style,code,pre'))node.textContent=translate(node.textContent,language);}
  template.content.querySelectorAll('[aria-label],[title],[placeholder]').forEach(el=>{for(const key of ['aria-label','title','placeholder'])if(el.hasAttribute(key))el.setAttribute(key,translate(el.getAttribute(key),language));});
  return template.innerHTML;
}
