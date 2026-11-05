import {derived,writable} from 'svelte/store';
import {translate,type Language,type Theme} from '../i18n';
export function readPreference(key:string,fallback:string){try{return localStorage.getItem(key)||fallback}catch{return fallback}}
export function readStringList(key:string){try{const value=JSON.parse(readPreference(key,'[]'));return Array.isArray(value)?value.filter((item):item is string=>typeof item==='string'):[]}catch{return []}}
export function savePreference(key:string,value:string){try{localStorage.setItem(key,value)}catch{/* Preferences remain usable for this session. */}}
export const language=writable<Language>(readPreference('atlas-language','zh')==='en'?'en':'zh');
export const theme=writable<Theme>(readPreference('atlas-theme','dark')==='light'?'light':'dark');
export const tr=derived(language,lang=>(value:unknown)=>translate(value,lang));
language.subscribe(value=>{savePreference('atlas-language',value);document.documentElement.lang=value==='en'?'en':'zh-CN';});
theme.subscribe(value=>{savePreference('atlas-theme',value);document.documentElement.dataset.theme=value;document.documentElement.style.colorScheme=value;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',value==='light'?'#f6f9f4':'#070f19');});
