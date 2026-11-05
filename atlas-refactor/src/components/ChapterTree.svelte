<script lang="ts">
  import {tick} from 'svelte';
  import {tr} from '../services/preferences';
  import {chapters} from '../field/knowledge';
  import {chapterData,chapterLayout,type ChapterNode} from '../field/chapters';
  export let stages:any[],methods:Record<string,any>,selected=0,motion=true;
  export let onselect:(index:number)=>void;
  let expanded=new Set<string>(['discover']),query='',previous=-1,scroll:HTMLDivElement;
  $: data=chapterData(stages,$tr);
  $: layout=chapterLayout(data,expanded,query);
  $: selectedId=stages[selected]?.id||'';
  $: if(selected!==previous){previous=selected;query='';const group=chapters.find(c=>c.indices.includes(selected));expanded=new Set([...expanded,group?.id||'discover','stage-'+selectedId]);reveal(selectedId)}
  async function reveal(id:string){await tick();if(!scroll)return;const row=scroll.querySelector<HTMLElement>('[data-node="stage-'+id+'"]');if(row){const top=Number(row.dataset.row)*58;if(top<scroll.scrollTop||top+116>scroll.scrollTop+scroll.clientHeight)scroll.scrollTo({top:Math.max(0,top-58),behavior:motion?'smooth':'instant'})}}
  function toggle(node:ChapterNode){const next=new Set(expanded);next.has(node.id)?next.delete(node.id):next.add(node.id);expanded=next;if(node.kind==='stage')onselect(node.index!)}
  function expandAll(){expanded=new Set([...(data.children||[]).map(c=>c.id),...stages.map(s=>'stage-'+s.id)])}
  function collapse(){expanded=new Set();query=''}
  function keyboard(event:KeyboardEvent){const target=(event.target as HTMLElement).closest<HTMLElement>('[data-node]');if(!target)return;const index=layout.rows.findIndex(n=>n.data.id===target.dataset.node),node=layout.rows[index];if(!node)return;let id='';if(event.key==='ArrowDown')id=layout.rows[Math.min(index+1,layout.rows.length-1)].data.id;else if(event.key==='ArrowUp')id=layout.rows[Math.max(0,index-1)].data.id;else if(event.key==='Home')id=layout.rows[0]?.data.id;else if(event.key==='End')id=layout.rows.at(-1)?.data.id||'';else if(event.key==='ArrowRight'&&node.data.children?.length){if(!expanded.has(node.data.id))toggle(node.data);else id=layout.rows[index+1]?.data.id||''}else if(event.key==='ArrowLeft'){if(expanded.has(node.data.id))toggle(node.data);else id=node.parentId||''}else return;event.preventDefault();tick().then(()=>{if(id)scroll.querySelector<HTMLElement>('[data-node="'+id+'"]')?.focus()})}
</script>

<aside class="field-chapters" aria-label={$tr('可展开的作业章节')}>
  <div class="chapter-heading"><div><span class="eyebrow">THE FIELD, CHAPTER BY CHAPTER</span><h3>{$tr('把作业链，逐章展开。')}</h3></div><span class="chapter-total">{stages.length}<small>{$tr('环节')}</small></span></div>
  <p class="chapter-intro">{$tr('点击环节定位三维现场，展开场景进入具体问题。')}</p>
  <label class="chapter-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input aria-label={$tr('搜索章节或场景')} placeholder={$tr('搜索章节或场景')} bind:value={query}/>{#if query}<button aria-label={$tr('清除搜索')} onclick={()=>query=''}>×</button>{/if}</label>
  <div class="chapter-toolbar"><span role="status">{query?layout.total:stages.reduce((n,s)=>n+s.scenes.length,0)} {$tr('个场景')}</span><div><button onclick={expandAll}>{$tr('全部展开')}</button><span>/</span><button onclick={collapse}>{$tr('收起')}</button></div></div>
  <!-- svelte-ignore a11y_no_static_element_interactions (Delegated arrow-key navigation between native buttons and links.) -->
  <div class="chapter-scroll" bind:this={scroll} onkeydown={keyboard}>
    <div class="chapter-tree" role="tree" aria-label={$tr('阶段、环节与场景')} style:height={layout.height+'px'} data-layout="d3-hierarchy">
      <svg class="chapter-branches" aria-hidden="true" width="100%" height={layout.height}>{#each layout.links as link}<path class:active={link.stageId===selectedId} d={link.path}/>{/each}{#each layout.rows as row}<circle cx={row.x} cy={row.y} r={row.data.kind==='chapter'?5:3.5} class:active={row.data.stageId===selectedId}/>{/each}</svg>
      {#each layout.rows as row,i}{@const node=row.data}{#if node.kind==='scene'}<a class="chapter-row scene-node" title={node.name} role="treeitem" aria-selected="false" aria-level={row.depth} href={'#/scene/'+node.id.slice(6)} data-node={node.id} data-row={i} style:left={row.x+12+'px'} style:top={i*58+'px'}><span>{node.name}<small>{node.methods?.map(id=>methods[id]?.abbr||id).join(' / ')}</small></span><b>↗</b></a>{:else}<button class="chapter-row" class:chapter-node={node.kind==='chapter'} class:stage-node={node.kind==='stage'} class:selected={node.kind==='stage'&&node.stageId===selectedId} role="treeitem" aria-level={row.depth} aria-expanded={query?true:expanded.has(node.id)} aria-selected={node.stageId===selectedId} data-node={node.id} data-row={i} style:left={row.x+12+'px'} style:top={i*58+'px'} onclick={()=>toggle(node)}><span class="chapter-chevron">{query||expanded.has(node.id)?'−':'＋'}</span><span>{#if node.index!==undefined}<small class="chapter-index">{String(node.index+1).padStart(2,'0')}</small>{/if}{node.name}</span><small class="chapter-count">{node.count}</small></button>{/if}{/each}
    </div>
    {#if !layout.rows.length}<p class="chapter-empty">{$tr('暂无匹配场景，试试其他关键词。')}</p>{/if}
  </div>
  <div class="chapter-footnote"><i></i>{$tr('选择与三维场景实时联动')}</div>
</aside>
