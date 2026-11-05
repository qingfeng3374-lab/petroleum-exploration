<script lang="ts">
  import {onMount} from 'svelte';
  import {language,theme,tr} from '../services/preferences';
  import type {createExploration,ExplorationMode} from '../visuals/exploration';
  export let motion=true;
  let viewport:HTMLDivElement,root:HTMLDivElement,fullscreen=false,ready=false,failed=false,exploded=false,scanning=false,rotating=true,effects=true,selected=1;
  let mode:ExplorationMode='survey',api:ReturnType<typeof createExploration>|undefined;
  const layers=[
    {name:'地表覆盖',en:'SURFACE',color:'#b1a287',detail:'遥感与地表调查提供线索，地下解释仍需要多源观测。'},
    {name:'泥岩盖层',en:'SEAL ROCK',color:'#879080',detail:'致密盖层影响流体运移，与下伏储层共同构成成藏条件。'},
    {name:'砂岩储层',en:'RESERVOIR',color:'#d2a66e',detail:'发光粒子示意岩石孔隙中的油气，井筒与射孔连接储层。'},
    {name:'深部基底',en:'BASEMENT',color:'#908a7b',detail:'地震反射与井中观测共同约束地下结构，模型仅作概念演示。'}
  ];
  $: if(api&&$theme&&$language&&motion!==undefined&&selected>=0&&mode&&exploded!==undefined&&scanning!==undefined&&rotating!==undefined&&effects!==undefined)api.wake();
  onMount(()=>{
    let disposed=false;
    const full=()=>fullscreen=document.fullscreenElement===root;document.addEventListener('fullscreenchange',full);
    (async()=>{try{const {createExploration}=await import('../visuals/exploration');if(disposed)return;api=createExploration(viewport,()=>({motion,theme:$theme,selected,exploded,scanning,rotating,effects,mode}),value=>selected=value);ready=true;}catch(error){console.error('Exploration scene could not start',error);failed=true;}})();
    return()=>{disposed=true;document.removeEventListener('fullscreenchange',full);api?.dispose();};
  });
  function choose(id:ExplorationMode){mode=id;if(id==='reservoir')selected=2;}
  function reset(){mode='survey';exploded=false;selected=1;rotating=true;api?.reset();}
  async function toggleFullscreen(){try{if(fullscreen)await document.exitFullscreen();else await root.requestFullscreen();}catch{root.scrollIntoView({block:'center',behavior:'instant'});}}
</script>

<div class="geology-scene cinematic-explorer" bind:this={root} data-ready={ready} data-mode={mode} data-exploded={exploded} data-selected={selected}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (WebGL orbit is keyboard and pointer accessible.) -->
  <div class="geo-viewport" bind:this={viewport} role="application" tabindex="0" aria-label={$tr('三维地层：拖动或使用方向键旋转，点击层位查看说明')}></div>
  <div class="cinema-shade" aria-hidden="true"></div>
  {#if !ready}<div class="geo-fallback"><div class="loading-orbit" aria-hidden="true"></div><span>{$tr(failed?'二维概念剖面 · 当前设备未启用 WebGL':'正在构建三维地层…')}</span><svg viewBox="0 0 500 400" aria-hidden="true">{#each [...layers].reverse() as layer,i}<path d={`M40 ${220-i*40}L270 ${130-i*40}L460 ${210-i*40}L230 ${320-i*40}Z M40 ${220-i*40}V${250-i*40}L230 ${350-i*40}L460 ${240-i*40}V${210-i*40}L230 ${320-i*40}Z`} fill={layer.color}/>{/each}</svg></div>{/if}
  <div class="cinema-status"><span><i></i> {$tr('地下观测舱')}</span><button class="cinema-fullscreen" aria-pressed={fullscreen} onclick={toggleFullscreen}>⛶ {$tr(fullscreen?'退出全屏':'全屏探索')}</button></div>
  <div class="cinema-coordinate" aria-hidden="true"><span>SUBSURFACE INTELLIGENCE</span><span>VOLUME 01 — PETROLEUM SYSTEM</span></div>
  <div class="cinema-modes" role="group" aria-label={$tr('勘探镜头')}>
    {#each [['survey','勘探全景'],['reservoir','透视储层'],['well','追踪井轨迹']] as [id,label],i}<button class:active={mode===id} aria-pressed={mode===id} onclick={()=>choose(id as ExplorationMode)}><span>0{i+1}</span>{$tr(label)}</button>{/each}
  </div>
  <div class="cinema-depth" aria-hidden="true"><span>SURFACE</span><div>{#each Array(17) as _,i}<i class:major={i%4===0}></i>{/each}</div><span>DEEP EARTH</span></div>
  <div class="cinema-bottom">
    <div class="layer-picker" aria-label={$tr('选择地层')}>{#each layers as layer,i}<button aria-pressed={selected===i} class:active={selected===i} style:--layer={layer.color} onclick={()=>selected=i}><i></i><span>{$tr(layer.name)}</span></button>{/each}</div>
    <div class="layer-readout"><span class="readout-index">0{selected+1}</span><div><small>{layers[selected].en}</small><p>{$tr(layers[selected].detail)}</p></div></div>
    <div class="scene-controls"><button class:active={exploded} aria-pressed={exploded} onclick={()=>exploded=!exploded}>⤢ {$tr(exploded?'合拢地层':'展开地层')}</button><button class:active={scanning} aria-pressed={scanning} onclick={()=>scanning=!scanning}>⌁ {$tr('地震扫描')}</button><button class:active={rotating} aria-pressed={rotating} onclick={()=>rotating=!rotating}>↻ {$tr('环绕镜头')}</button><button class:active={effects} aria-pressed={effects} onclick={()=>effects=!effects}>✧ {$tr('电影特效')}</button><button aria-label={$tr('重置三维视角')} onclick={reset}>{$tr('重置')}</button></div>
    <div class="scene-foot"><span>↔ {$tr('拖动旋转 · 滚轮缩放')}</span><span>{$tr('概念模型 / 非真实剖面')}</span></div>
  </div>
</div>
