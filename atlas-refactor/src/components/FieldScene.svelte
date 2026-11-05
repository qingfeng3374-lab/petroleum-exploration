<script lang="ts">
  import {onMount} from 'svelte';
  import {theme,tr} from '../services/preferences';
  import {rockLayers,stations} from '../field/knowledge';
  import type {Projection,createFieldScene} from '../field/scene';
  export let stages:any[],selected=0,motion=true;
  export let onselect:(index:number)=>void;
  let viewport:HTMLDivElement,ready=false,failed=false,exploded=false,effects=true,scanning=false,orbit=false;
  let view:'all'|'surface'|'underground'='all',points:Projection[]=[];
  let api:ReturnType<typeof createFieldScene>|undefined;
  $: if(api&&stages.length&&selected>=0&&$theme&&motion!==undefined&&exploded!==undefined&&view&&effects!==undefined&&scanning!==undefined&&orbit!==undefined)api.wake();
  $: station=stations[selected]||stations[0];
  onMount(()=>{
    let disposed=false,started=false;
    const observer=new IntersectionObserver(async([entry])=>{
      if(!entry.isIntersecting||started)return;started=true;observer.disconnect();
      try{const {createFieldScene}=await import('../field/scene');if(disposed)return;api=createFieldScene(viewport,{state:()=>({selected,motion,theme:$theme,exploded,view,effects,scanning,orbit}),labels:()=>stages.map(s=>s.name),onproject:value=>{points=value;ready=true},onselect})}catch{failed=true}
    },{rootMargin:'280px'});observer.observe(viewport);
    return()=>{disposed=true;observer.disconnect();api?.dispose()};
  });
</script>

<div class="field-model" data-ready={ready} data-exploded={exploded} data-view={view} data-selected={selected}>
  <div class="field-model-topline"><span><i></i> {$tr('地上 × 地下 · 三维作业场')}</span><span>3D FIELD ATLAS</span></div>
  <div class="field-model-controls"><div role="group" aria-label={$tr('三维视角')}>{#each [['all','全景'],['surface','地表设施'],['underground','地下剖面']] as [id,label]}<button class:active={view===id} aria-pressed={view===id} disabled={failed} onclick={()=>view=id as typeof view}>{$tr(label)}</button>{/each}</div><button class:active={exploded} aria-pressed={exploded} disabled={failed} onclick={()=>exploded=!exploded}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m3 8 9-5 9 5-9 5Z M3 12l9 5 9-5 M3 16l9 5 9-5"/></svg>{$tr('分层展开')}</button></div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (The canvas supports keyboard orbit, zoom and reset.) -->
  <div class="field-viewport" bind:this={viewport} tabindex="0" role="application" aria-label={$tr('三维作业场：拖动旋转，滚轮缩放，方向键旋转，点击编号选择环节')}>
    {#if ready}<svg class="field-leaders" aria-hidden="true">{#each points.filter(p=>p.visible) as p}<path class:selected={p.index===selected} d={`M${p.anchorX},${p.anchorY}L${p.x},${p.y}`} /><circle cx={p.anchorX} cy={p.anchorY} r={p.index===selected?4:2}/>{/each}</svg>{/if}
    <div class="field-hotspots">{#each points.filter(p=>p.visible) as p}{@const stage=stages[p.index]}<button class="field-hotspot" class:selected={p.index===selected} style:left={p.x+'px'} style:top={p.y+'px'} style:width={p.labelWidth+'px'} style:--station-color={stations[p.index].color} data-stage-index={p.index} aria-pressed={p.index===selected} aria-label={String(p.index+1).padStart(2,'0')+' '+stage.name} title={stage.name} onclick={()=>onselect(p.index)}><span>{String(p.index+1).padStart(2,'0')}</span><b>{stage.name}</b></button>{/each}</div>
    {#if !ready}<div class="field-loading"><svg viewBox="0 0 240 150" aria-hidden="true">{#each rockLayers as layer,i}<path d={`M25 ${42+i*16}L130 ${12+i*16}L215 ${45+i*16}L110 ${78+i*16}Z`} fill={layer.color}/>{/each}</svg><p>{$tr(failed?'当前设备未启用 WebGL，仍可使用章节树浏览。':'正在搭建地层与作业设施…')}</p></div>{/if}
    <div class="field-camera-tools"><button disabled={failed} aria-label={$tr('放大三维模型')} title={$tr('放大三维模型')} onclick={()=>api?.zoom(.15)}>＋</button><button disabled={failed} aria-label={$tr('缩小三维模型')} title={$tr('缩小三维模型')} onclick={()=>api?.zoom(-.15)}>−</button><button disabled={failed} aria-label={$tr('重置三维视角')} title={$tr('重置三维视角')} onclick={()=>{view='all';exploded=false;api?.reset()}}>⌂</button></div>
    <div class="field-orbit-hint">↔ {$tr('拖动旋转')} <span>·</span> ⊕ {$tr('滚轮缩放')}</div>
  </div>
  <div class="field-effects"><span>DIGITAL OILFIELD / LIVE SIMULATION</span><div><button class:active={scanning} aria-pressed={scanning} onclick={()=>scanning=!scanning}>⌁ {$tr('地震扫描')}</button><button class:active={orbit} aria-pressed={orbit} onclick={()=>orbit=!orbit}>↻ {$tr('环绕镜头')}</button><button class:active={effects} aria-pressed={effects} onclick={()=>effects=!effects}>✧ {$tr('电影特效')}</button></div></div>
  <div class="field-rock-key">{#each rockLayers as layer}<span><i style:background={layer.color}></i>{$tr(layer.name)}</span>{/each}</div>
  <div class="field-selection" aria-live="polite"><span class="field-selection-number">{String(selected+1).padStart(2,'0')}</span><div><div><h3>{stages[selected]?.name}</h3><span>{$tr(station.concept)}</span></div><p>{$tr(station.detail)}</p><a href={'#/stage/'+stages[selected]?.id}>{$tr('深入这个环节')} · {stages[selected]?.scenes.length} {$tr('个场景')} ↗</a></div></div>
  <div class="field-science-note"><span>{$tr('概念剖面 · 非真实尺度')}</span><p>{$tr('油气储于岩石孔隙与裂缝；同一井筒的不同作业阶段在图中并列示意。')}</p><details class="field-reading"><summary>{$tr('阅读地质与工程依据')}</summary><div><a href="https://glossary.slb.com/terms/p/petroleum_system" target="_blank" rel="noopener noreferrer">{$tr('石油系统：生、储、盖与成藏')} ↗</a><a href="https://glossary.slb.com/terms/r/reservoir" target="_blank" rel="noopener noreferrer">{$tr('储层与岩石孔隙')} ↗</a><a href="https://glossary.slb.com/terms/c/cementing" target="_blank" rel="noopener noreferrer">{$tr('固井与井筒封隔')} ↗</a></div></details></div>
</div>
