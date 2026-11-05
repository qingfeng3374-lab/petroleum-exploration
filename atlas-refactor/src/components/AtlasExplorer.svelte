<script lang="ts">
  import {linkHorizontal} from 'd3-shape';
  import {tr} from '../services/preferences';
  import FieldScene from './FieldScene.svelte';
  import ChapterTree from './ChapterTree.svelte';
  export let stages:any[],scenes:any[],methods:Record<string,any>;
  export let motion=true;
  let mode='landscape',selected=0,selectedMethod='cv';
  const flow=linkHorizontal<any,any>().x(d=>d[0]).y(d=>d[1]);
  $: entries=Object.entries(methods);
  $: if(!methods[selectedMethod])selectedMethod=entries[0]?.[0]||'cv';
  $: stage=stages[selected]||stages[0];
  $: selectedScenes=stage.scenes.filter((s:any)=>s.methods.includes(selectedMethod));
  $: connections=entries.flatMap(([id],mi)=>stages.map((st,si)=>({id,mi,si,count:st.scenes.filter((s:any)=>s.methods.includes(id)).length}))).filter(c=>c.count);
  $: methodCount=scenes.filter(s=>s.methods.includes(selectedMethod)).length;
  function chooseMethod(id:string){selectedMethod=id;const next=stages.findIndex(st=>st.scenes.some((s:any)=>s.methods.includes(id)));if(!stage.scenes.some((s:any)=>s.methods.includes(id)))selected=Math.max(0,next)}
</script>

<section class="atlas-explorer" class:still={!motion} id="explore-chain">
  <div class="atlas-heading"><div><span class="eyebrow">EXPLORE THE FIELD</span><h2>{$tr('穿行于地上与地下。')}</h2><p>{$tr('旋转作业场，展开章节，找到你想探索的问题。')}</p></div><a class="action-button secondary-button matrix-shortcut" href="#/matrix">{$tr('环节与方法矩阵')} ↗</a><div class="explorer-modes" role="group" aria-label={$tr('探索视图')}><button class:active={mode==='landscape'} aria-pressed={mode==='landscape'} onclick={()=>mode='landscape'}>{$tr('作业全景')}</button><button class:active={mode==='methods'} aria-pressed={mode==='methods'} onclick={()=>mode='methods'}>{$tr('方法关联')}</button></div></div>
  {#if mode==='landscape'}
    <div class="field-workspace"><FieldScene {stages} {selected} {motion} onselect={index=>selected=index}/><ChapterTree {stages} {methods} {selected} {motion} onselect={index=>selected=index}/></div>
  {:else}
    <div class="map-legend"><span><i></i>{$tr('连线粗细表示关联场景数量')}</span><span class="map-scroll-hint">{$tr('横向滑动查看全景')} ↔</span><span class="map-data-label">{$tr('概念地图 · 非实际地理位置')}</span></div>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard focus enables native horizontal scrolling.) -->
    <div class="atlas-map-scroll" tabindex="0" role="region" aria-label={$tr('可横向滚动的交互地图')}><div class="relation-map">
      <svg viewBox="0 0 1080 660" aria-hidden="true"><g class="relation-lines">{#each connections as c}<path class:highlight={c.id===selectedMethod} class:target={c.id===selectedMethod&&c.si===selected} d={flow({source:[245,85+c.mi*(600/Math.max(5,entries.length))],target:[790,42+c.si*48]})||''} stroke-width={Math.max(1,c.count*2.8)}/>{/each}</g></svg>
      <div class="relation-methods">{#each entries as [id,m],i}<button class:selected={id===selectedMethod} aria-pressed={id===selectedMethod} onclick={()=>chooseMethod(id)} style:top={85+i*(600/Math.max(5,entries.length))+'px'}><b>{m.abbr}</b><span>{m.name}</span></button>{/each}</div>
      <div class="relation-stages">{#each stages as st,i}<button class:selected={selected===i} class:connected={st.scenes.some((s:any)=>s.methods.includes(selectedMethod))} aria-pressed={selected===i} onclick={()=>selected=i} style:top={42+i*48+'px'}><span>{st.name}</span><b>{st.scenes.filter((s:any)=>s.methods.includes(selectedMethod)).length}</b></button>{/each}</div>
    </div></div>
    <div class="field-detail" aria-live="polite"><div class="field-context"><span class="eyebrow">{methods[selectedMethod].abbr+' / '+$tr('方法与现场')}</span><h3>{stage.name}<span>↗</span></h3><p>{methods[selectedMethod].desc}</p><a class="action-button secondary-button" href={'#/method/'+selectedMethod}>{$tr('查看全部关联场景')+' · '+methodCount} →</a></div>
    <div class="field-scenes"><div class="field-scenes-title">{$tr('在这里，智能方法能做什么？')} <span>{selectedScenes.length}</span></div>{#each selectedScenes.slice(0,4) as s,i}<a href={'#/scene/'+s.id}><span class="scene-ordinal">{String(i+1).padStart(2,'0')}</span><span>{s.name}</span><b>↗</b></a>{/each}{#if selectedScenes.length>4}<a class="all-stage-scenes" href={'#/stage/'+stage.id}>{$tr('查看这个环节的全部场景')} →</a>{/if}{#if !selectedScenes.length}<p>{$tr('这个环节暂无该方法的场景，试试其他连线。')}</p>{/if}</div></div>
  {/if}
</section>
