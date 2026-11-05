<script lang="ts">
  import {onMount} from 'svelte';
  import {theme,tr} from '../services/preferences';
  import type {CoreMode,createCoreLab} from '../visuals/core-lab';
  export let motion=true;
  let host:HTMLDivElement,api:ReturnType<typeof createCoreLab>|undefined,mode:CoreMode='surface',ready=false,failed=false;
  $: if(api&&mode&&motion!==undefined&&$theme)api.wake();
  onMount(()=>{
    let disposed=false,started=false;
    const observer=new IntersectionObserver(async([entry])=>{
      if(!entry.isIntersecting||started)return;started=true;observer.disconnect();
      try{const {createCoreLab}=await import('../visuals/core-lab');if(disposed)return;api=createCoreLab(host,()=>({mode,motion,theme:$theme}));ready=true;}catch{failed=true;}
    },{rootMargin:'150px'});observer.observe(host);
    return()=>{disposed=true;observer.disconnect();api?.dispose();};
  });
</script>
<div class="core-lab" data-ready={ready} data-mode={mode}>
  <div class="core-lab-heading"><span><i></i> {$tr('岩心观测台')}</span><span>CORE / 01</span></div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Orbit supports keyboard and pointer interaction.) -->
  <div class="core-lab-viewport" bind:this={host} role="application" tabindex="0" aria-label={$tr('三维岩心：拖动旋转，方向键调整视角')}></div>
  {#if !ready}<div class="core-lab-fallback"><svg viewBox="0 0 320 150" aria-hidden="true"><path d="M60 40H260Q290 40 290 75T260 110H60Z" fill="#9d896d"/><ellipse cx="60" cy="75" rx="27" ry="35" fill="#c3ac86"/><path d="M140 43V107M210 43V107" stroke="#4b453b" stroke-width="4"/></svg><p>{$tr(failed?'岩心概念示意 · 当前设备未启用WebGL':'正在准备岩心观测台…')}</p></div>{/if}
  <div class="core-lab-tools" role="group" aria-label={$tr('岩心观察方式')}>{#each [['surface','岩心表面'],['pores','孔隙透视'],['split','分段观察']] as [id,label]}<button class:active={mode===id} aria-pressed={mode===id} onclick={()=>mode=id as CoreMode}>{$tr(label)}</button>{/each}</div>
  <p class="core-lab-explanation">{$tr(mode==='surface'?'观察风化、颗粒与裂隙，从实体岩心建立地质认识。':mode==='pores'?'亮色体表示孔隙空间，连线表示孔喉，观察储集空间与流动通道。':'展开岩心分段，对照各段的纹理与内部结构。')}</p>
  <div class="core-lab-foot"><span>↔ {$tr('拖动旋转 · 滚轮缩放')}</span><span>{$tr('概念演示 · 非真实CT数据')}</span></div>
</div>
