import {translate,type Language,type Theme} from '../i18n';

/** Translate the presentation in place so parameters, canvases and playback keep their state. */
export function setupPresentation(){
 // Off-screen iframes can defer ResizeObserver notifications in Chromium.
 // Measure on viewport resize too, so a mobile reflow cannot retain desktop height.
 const reportSize=()=>parent.postMessage({atlas:true,type:'resize',h:document.querySelector('main')!.getBoundingClientRect().height+30},'*');
 window.addEventListener('resize',reportSize);
 const read=(key:string,fallback:string)=>{try{return localStorage.getItem(key)||fallback}catch{return fallback}};
 let language:Language=read('atlas-language','zh')==='en'?'en':'zh';
 let theme:Theme=read('atlas-theme','dark')==='light'?'light':'dark';
 const originals=new WeakMap<Node,string>();
 const attributes=new WeakMap<Element,Record<string,string>>();
 const controls=document.createElement('nav');controls.id='appearance';controls.setAttribute('aria-label','外观与语言');
 controls.innerHTML='<button id="theme-toggle" type="button"></button><button id="language-toggle" type="button">EN / 中文</button>';
 document.querySelector('main')!.prepend(controls);
 const observer=new MutationObserver(records=>{
   for(const record of records)if(record.type==='characterData')originals.delete(record.target);
   refresh();
 });
 function refresh(){
   observer.disconnect();
   document.documentElement.lang=language==='en'?'en':'zh-CN';document.documentElement.dataset.theme=theme;
   const themeButton=controls.querySelector('#theme-toggle')!;
   themeButton.textContent=theme==='dark'?'☀ 亮色主题':'☾ 暗色主题';
   const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
   let node:Node|null;while((node=walker.nextNode())){
     if(node.parentElement?.closest('script,style,code,pre'))continue;
     if(!originals.has(node))originals.set(node,node.textContent||'');
     const text=translate(originals.get(node),language);if(node.textContent!==text)node.textContent=text;
   }
   document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(el=>{
     if(!attributes.has(el))attributes.set(el,Object.fromEntries(['aria-label','title','placeholder'].filter(k=>el.hasAttribute(k)).map(k=>[k,el.getAttribute(k)!])));
     for(const [key,text] of Object.entries(attributes.get(el)!))el.setAttribute(key,translate(text,language));
   });
   document.title=translate(document.querySelector('h1')?.textContent||document.title,language);
   observer.observe(document.body,{subtree:true,childList:true,characterData:true});
 }
 function persist(){try{localStorage.setItem('atlas-language',language);localStorage.setItem('atlas-theme',theme)}catch{/* Sandboxed cases receive preferences from their parent. */}}
 (controls.querySelector('#theme-toggle') as HTMLButtonElement).onclick=()=>{theme=theme==='dark'?'light':'dark';persist();refresh()};
 (controls.querySelector('#language-toggle') as HTMLButtonElement).onclick=()=>{language=language==='zh'?'en':'zh';persist();refresh()};
 const receive=(event:MessageEvent)=>{if(event.source!==parent||!event.data?.atlas)return;
   if(event.data.type==='set-view'){controls.hidden=true;return}
   if(event.data.type!=='set-preferences')return;
   const nextLanguage=event.data.language==='en'?'en':'zh',nextTheme=event.data.theme==='light'?'light':'dark';
   if(language===nextLanguage&&theme===nextTheme)return;
   language=nextLanguage;theme=nextTheme;refresh();
 };
 window.addEventListener('message',receive);refresh();
 window.addEventListener('pagehide',()=>{observer.disconnect();window.removeEventListener('message',receive);window.removeEventListener('resize',reportSize)},{once:true});
}
