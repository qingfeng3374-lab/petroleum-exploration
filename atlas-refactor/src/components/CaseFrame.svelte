<script lang="ts">
import {onMount} from 'svelte';
import {language,theme} from '../services/preferences';
export let kase:any;export let tab='bg';export let motion=true;let frame:HTMLIFrameElement;let srcdoc='';let blob='';let height=1100;let ready=false;
const views:any={bg:'background',flow:'workflow',demo:'demo'};
function send(){frame?.contentWindow?.postMessage({atlas:true,type:'set-preferences',language:$language,theme:$theme},'*');frame?.contentWindow?.postMessage({atlas:true,type:'set-view',view:views[tab]||tab},'*');frame?.contentWindow?.postMessage({atlas:true,type:'set-motion',motion},'*')}
$: if(tab&&ready)send();
$: if(ready)frame?.contentWindow?.postMessage({atlas:true,type:'set-motion',motion},'*');
$: if(ready)frame?.contentWindow?.postMessage({atlas:true,type:'set-preferences',language:$language,theme:$theme},'*');
$: if(srcdoc){if(blob)URL.revokeObjectURL(blob);blob=URL.createObjectURL(new Blob([srcdoc],{type:'text/html'}));}
onMount(()=>{let handle:any;let cancelled=false;const receive=(e:MessageEvent)=>{if(e.source!==frame?.contentWindow)return;if(e.data?.atlas&&e.data.type==='ready'){ready=true;send()}if(e.data?.atlas&&e.data.type==='resize')height=Math.max(400,Math.min(9000,Number(e.data.h)||1100))};window.addEventListener('message',receive);if(kase.url){}else{
const host=(window as any).CaseDemoHost;
const cfg=kase.manifest.tabs.demo;
if(cfg?.builtin){srcdoc=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="${new URL('legacy/assets/core/tokens.css',document.baseURI)}"><link rel="stylesheet" href="${new URL('legacy/assets/core/ui.css',document.baseURI)}"></head><body><main><div id="demo"></div></main><script src="${new URL('legacy/assets/cases/welllog-layer.demo.js',document.baseURI)}"><\/script><script>WelllogLayerDemo(document.getElementById('demo'))<\/script><script src="${new URL('cases/legacy-presentation.js',document.baseURI)}"><\/script></body></html>`}
else if(host.resolveMode({files:kase.files,demo:cfg})==='page')srcdoc=host.buildPageDoc?host.buildPageDoc({files:kase.files,demo:cfg,meta:kase.manifest},'compat'):'';
if(!srcdoc&&cfg&&!cfg.builtin){const files=JSON.stringify(kase.files).replace(/</g,'\\u003c'),config=JSON.stringify(cfg).replace(/</g,'\\u003c');srcdoc=`<!doctype html><html><head><meta charset="utf-8"></head><body><div id="host"></div><script src="${new URL('legacy/assets/core/case-demo-host.js',document.baseURI)}"><\/script><script>var h=CaseDemoHost.create(document.getElementById('host'),{files:${files},demo:${config}},{});window.addEventListener('pagehide',function(){h.destroy()})<\/script></body></html>`}
}return()=>{cancelled=true;if(blob)URL.revokeObjectURL(blob);handle?.destroy?.();window.removeEventListener('message',receive)}});
</script>
{#if kase.url}<iframe bind:this={frame} onload={()=>{ready=true;send()}} title={kase.manifest.title} src={kase.url} sandbox="allow-scripts allow-downloads" style:height={height+'px'}></iframe>{:else}<iframe bind:this={frame} onload={()=>{ready=true;send()}} title={kase.manifest.title} src={blob} sandbox="allow-scripts allow-downloads" style:height={height+'px'}></iframe>{/if}
<style>iframe{width:100%;border:1px solid var(--line);border-radius:4px;background:var(--surface);display:block;min-height:500px;box-shadow:0 20px 50px #0002}</style>
