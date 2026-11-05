<script lang="ts">
import {tr} from "../services/preferences";
  import { onMount } from 'svelte';
  
  import GeologyScene from '../components/GeologyScene.svelte';
  import CoreLab from '../components/CoreLab.svelte';
  import AtlasExplorer from '../components/AtlasExplorer.svelte';
  export let scenes:any[], stages:any[], cases:any[], source:{methods:Record<string,any>};
  export let motion=true;
  let section:HTMLElement;
  let reduced=false;
  const wave=Array.from({length:180},(_,i)=>`${i*8},${35+Math.sin(i*.45)*Math.sin(i*.077)*22}`).join(' ');
  onMount(()=>{const preference=matchMedia('(prefers-reduced-motion: reduce)');reduced=preference.matches;const change=()=>reduced=preference.matches;preference.addEventListener('change',change);const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:.08});section.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));return()=>{observer.disconnect();preference.removeEventListener('change',change);};});
</script>

<div class="home-experience" bind:this={section}>
  <section class="hero cinema-hero">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-copy">
      <div class="eyebrow"><span class="live-dot"></span> PETROLEUM INTELLIGENCE ATLAS</div>
      <h1>{$tr("读懂")}<span class="hollow-word">{$tr("地下。")}</span><br><span class="accent-word">{$tr("预见")}</span>{$tr("可能。")}</h1>
      <div class="hero-subtitle"><span class="vertical-rule"></span><div><strong>{$tr("石油勘探开发的智能化可能性地图")}</strong><p>{$tr("穿过岩层，连接数据与地质。")}<br>{$tr("沿着作业链，探索智能方法的每一个切入点。")}</p></div></div>
      <div class="hero-actions"><a class="primary" href="#/stage/geology"><span>{$tr("开启地质探索")}</span><span>↗</span></a><a class="text-action action-button secondary-button" href="#/cases"><i>▷</i> {$tr("进入案例实验室")}</a></div>
      <div class="hero-coordinates"><span>OBSERVE → UNDERSTAND → EXPERIMENT</span><span>{$tr("从观测，到理解，再到验证")}</span></div>
      <div class="cinema-chapter"><span>01 — 13</span><i></i><span>{$tr('从地表线索，抵达地下答案。')}</span></div>
    </div>
    <GeologyScene {motion}/>
    <div class="hero-bottom"><a class="scroll-cue" href="#explore-chain" onclick={e=>{e.preventDefault();document.getElementById('explore-chain')?.scrollIntoView({behavior:motion&&!reduced?'smooth':'instant'});}}><span>↓</span> {$tr("向下探索")} <small>SCROLL TO DISCOVER</small></a><div class="hero-stats"><div><b>{String(stages.length).padStart(2,'0')}</b><span>{$tr("作业环节")}</span></div><i>/</i><div><b>{scenes.length}</b><span>{$tr("候选场景")}</span></div><i>/</i><div><b>{String(cases.filter(c=>c.manifest.tabs.demo).length).padStart(2,'0')}</b><span>{$tr("可运行实验")}</span></div></div><span class="hero-note">{$tr("交互式地质概念模型")}<br>{$tr("探索从第一层开始")}</span></div>
  </section>
  <div class="signal-strip" aria-hidden="true"><span>SEISMIC SIGNAL</span><svg viewBox="0 0 1440 70" preserveAspectRatio="none"><polyline points={wave} fill="none" stroke="currentColor" stroke-width="1"/><polyline class="wave-glow" points={wave} fill="none" stroke="#eab777" stroke-width="2" stroke-dasharray="75 1300"/></svg><span>{$tr("深处，自有线索。")}</span></div>

  <AtlasExplorer {stages} {scenes} methods={source.methods} {motion}/>
  <section class="lab-gateway" data-reveal><div><span class="eyebrow">THE EXPERIMENT LAB</span><h2>{$tr('从岩心，走进智能实验。')}</h2><p>{$tr('旋转观察岩心，透视孔隙结构，再进入案例检验智能方法。')}</p><a href="#/cases" class="primary">{$tr('进入案例实验室')} ↗</a></div><CoreLab {motion}/></section>
  <section class="closing-line" data-reveal><span class="eyebrow">THE NEXT POSSIBILITY IS YOURS</span><h2>{$tr("下一种可能，")}<span>{$tr("由你发现。")}</span></h2><a class="arrow-link action-button secondary-button" href="#/guide">{$tr("带着你的案例加入探索")} <span>↗</span></a><span class="contour-decoration" aria-hidden="true">◎</span></section>
</div>
