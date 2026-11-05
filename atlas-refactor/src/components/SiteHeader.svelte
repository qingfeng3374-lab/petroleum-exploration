<script lang="ts">
 import {onMount} from 'svelte';
 import {language,theme,tr} from '../services/preferences';
 export let route:string[]=[];export let motion=true;
 export let onadd:()=>void;export let onmotion:()=>void;
 let expanded=false,header:HTMLElement;
 $: current=route[0]||'';
 $: if(current!==undefined)expanded=false;
 onMount(()=>{const close=(event:PointerEvent)=>{if(!header.contains(event.target as Node))expanded=false};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close)});
 const menu=[['','探索总览'],['chain','作业链'],['cases','案例实验室'],['guide','协作接入']];
 function active(id:string,current:string){return id==='chain'?['chain','stage','method','matrix'].includes(current):id==='cases'?['cases','scene'].includes(current):id===current}
</script>
<svelte:window onkeydown={event=>{if(event.key==='Escape')expanded=false}}/>
<header class="top site-header" class:expanded bind:this={header}>
 <a href="#/" class="brand" aria-label={$tr('返回地图首页')}><svg viewBox="0 0 48 52" class="brand-icon" aria-hidden="true"><path d="M4 16L24 5L44 16L24 27Z M4 27L24 38L44 27 M4 38L24 49L44 38" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="16" r="3" fill="currentColor"/></svg><span>{$tr('石油勘探 · 智能图谱')}<small>{$tr('从地质线索，到智能实验')}</small></span></a>
 <div class="header-navigation" id="header-navigation">
  <nav aria-label={$tr('主导航')}>{#each menu as [id,label]}<a class:active={active(id,current)} aria-current={active(id,current)?'page':undefined} href={'#/'+id} onclick={()=>expanded=false}>{$tr(label)}</a>{/each}</nav>
  <div class="top-tools" aria-label={$tr('外观与语言')}>
   <button class="theme-toggle" title={$theme==='dark'?$tr('切换为亮色主题'):$tr('切换为暗色主题')} aria-label={$theme==='dark'?$tr('切换为亮色主题'):$tr('切换为暗色主题')} onclick={()=>$theme=$theme==='dark'?'light':'dark'}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">{#if $theme==='dark'}<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>{:else}<path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>{/if}</svg><span class="mobile-tool-label">{$tr($theme==='dark'?'亮色主题':'暗色主题')}</span></button>
   <button class="language-toggle" title={$language==='zh'?'Switch to English':'切换为中文'} aria-label={$language==='zh'?'Switch to English':'切换为中文'} onclick={()=>$language=$language==='zh'?'en':'zh'}>{$language==='zh'?'EN':'中文'}</button>
   <button class="motion-toggle" title={$tr(motion?'暂停装饰动效':'开启动效')} aria-label={$tr(motion?'暂停装饰动效':'开启动效')} aria-pressed={!motion} onclick={onmotion}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">{#if motion}<path d="M8 5v14M16 5v14"/>{:else}<path d="m8 5 11 7-11 7Z"/>{/if}</svg><span class="mobile-tool-label">{$tr(motion?'动效已开启':'动效已暂停')}</span></button>
  </div>
 </div>
 <button class="primary add-case" onclick={onadd}><span aria-hidden="true">＋</span>{$tr('添加案例')}</button>
 <div class="mobile-menu"><button aria-label={$tr('打开导航')} aria-controls="header-navigation" aria-expanded={expanded} onclick={()=>expanded=!expanded}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">{#if expanded}<path d="m5 5 14 14M19 5 5 19"/>{:else}<path d="M4 6h16M4 12h16M4 18h16"/>{/if}</svg></button></div>
</header>
