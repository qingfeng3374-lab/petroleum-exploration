<script lang="ts">
  import {tr} from '../services/preferences';
  import ExperimentPreview from './ExperimentPreview.svelte';
  import CaseFrame from './CaseFrame.svelte';
  import CaseDownload from './CaseDownload.svelte';
  import ActionIcon from './ActionIcon.svelte';
  export let stages:any[]=[];
  let filter='';
  let search='';
  $: visible=cases.filter(c=>(!filter||stages.find(st=>st.scenes.some((s:any)=>s.id===c.manifest.sceneId))?.id===filter)&&(!search.trim()||(c.manifest.title+' '+c.id+' '+c.manifest.sceneId+' '+c.manifest.tabs.background?.lede).toLowerCase().includes(search.trim().toLowerCase())));
  export let cases:any[]=[];export let motion=true;export let onremove:(c:any)=>void;
  export let selected='geology-geochem';
  $: active=visible.find(c=>c.id===selected)||visible[0];
  const builtinIds=['geology-geochem','geology-map-elements','geology-lineament','geology-lithology','geology-fractures'];
  const symbols:Record<string,string>={'geology-geochem':'◉','geology-map-elements':'▧','geology-lineament':'╱','geology-lithology':'≋','geology-fractures':'✳','welllog-layer':'∿'};
</script>
<div class="laboratory-workspace">
  <aside class="case-index" aria-label={$tr('案例索引')}><div class="case-index-heading"><span>{$tr('选择实验')}</span><b>{String(visible.length).padStart(2,'0')}</b></div><select class="case-operation-filter" aria-label={$tr('筛选案例环节')} bind:value={filter}><option value="">{$tr('全部环节')}</option>{#each stages as st}<option value={st.id}>{st.name}</option>{/each}</select><input class="case-search" type="search" aria-label={$tr('场景名称或案例关键词')} placeholder={$tr('场景名称或案例关键词')} bind:value={search}/><div class="case-index-entries">{#each visible as c,i}<article class="lab-card case-index-entry" class:selected={active?.id===c.id} data-case-id={c.id}><button class="case-selector" aria-pressed={active?.id===c.id} onclick={()=>selected=c.id}><span class="case-symbol" aria-hidden="true">{symbols[c.id]||'＋'}</span><span><small>{String(i+1).padStart(2,'0')} / {c.imported?$tr('本地导入'):(c.manifest.methods||[]).map((m:string)=>m.toUpperCase()).join(' · ')}</small><strong>{c.manifest.title}</strong></span><span class="case-selected-arrow" aria-hidden="true">↗</span></button><button class="quiet" onclick={()=>onremove(c)} aria-label={$tr('移除')+' '+c.manifest.title}>{$tr('移除')}</button></article>{/each}</div><p>{$tr('按作业环节选择实验，观察数据如何经过学习、推断与复核形成结果。')}</p></aside>
  {#if active}<section class="case-workbench" aria-label={$tr('当前实验')}><div class="workbench-heading"><div><span class="eyebrow">{$tr(active.imported?'本地导入':'内置案例')} / {active.manifest.version}</span><h2>{active.manifest.title}</h2></div><div class="workbench-actions"><a class="primary" href={`#/scene/${active.manifest.sceneId}?case=${active.id}&tab=demo`}>{$tr('进入完整实验')} <ActionIcon/></a><CaseDownload kase={active}/></div></div><p class="workbench-intro">{active.manifest.tabs.background?.lede||$tr('经典动态规划分层教学示范。')}</p>
  {#key active.id}{#if !active.imported&&builtinIds.includes(active.id)}<ExperimentPreview id={active.id}/>{:else if active.id==='welllog-layer'||!active.imported&&['chapter','scene'].includes(active.manifest.extensions?.atlas?.engine)}<div class="welllog-workbench"><CaseFrame kase={active} tab="demo" {motion}/></div>{:else}<div class="imported-workbench"><span class="case-symbol">＋</span><h3>{$tr('你的案例，已加入探索。')}</h3><p>{$tr('导入内容使用作者原文。')}</p><a class="action-button secondary-button" href={`#/scene/${active.manifest.sceneId}?case=${active.id}&tab=bg`}><ActionIcon name="book"/>{$tr('阅读背景与流程')}</a></div>{/if}{/key}
  <div class="workbench-footer"><a href={`#/scene/${active.manifest.sceneId}?case=${active.id}&tab=bg`}>{$tr('阅读背景与流程')} →</a><span>{$tr('预览用于教学探索，结果不代表真实区块。')}</span></div></section>{:else}<div class="empty-result"><h2>{$tr('暂无案例')}</h2><p>{$tr('通过导航栏添加案例，或恢复已隐藏的内置案例。')}</p></div>{/if}
</div>
