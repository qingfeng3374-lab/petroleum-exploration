<script lang="ts">
 import {tr as t} from '../services/preferences';
 export let stages:any[],methods:Record<string,any>,cases:any[];
 $: entries=Object.entries(methods);
 $: counts=stages.map(st=>entries.map(([id])=>st.scenes.filter((s:any)=>s.methods.includes(id)).length));
 $: max=Math.max(1,...counts.flat());
  $: scenes=stages.flatMap(st=>st.scenes);
  $: difficulties=['低','中','高'].map(label=>({label:$t(label),count:scenes.filter(s=>s.diff===$t(label)).length}));
  $: covered=scenes.filter(s=>cases.some(c=>c.manifest.sceneId===s.id)).length;
</script>
<div class="page-head"><span class="eyebrow">OPERATION × METHOD</span><h1>{$t('一张表，找到交集。')}</h1><p>{$t('颜色越深，关联场景越多。点击数字直接进入对应环节并按方法筛选；同一场景可以关联多种方法。')}</p></div>
<div class="matrix-summary"><div><span>{$t('难度分布')}</span><strong>{difficulties.map(d=>d.label+' '+d.count).join(' / ')}</strong><div class="difficulty-bar" aria-hidden="true">{#each difficulties as d,i}<i style:flex={d.count} style:background={['var(--mint)','var(--gold)','#ba7771'][i]}></i>{/each}</div></div><div><span>{$t('场景已覆盖')}</span><strong>{covered} / {scenes.length}<small>{(covered/Math.max(1,scenes.length)*100).toFixed(1)}%</small></strong></div><div><span>{$t('已接入案例 / 含演示')}</span><strong>{cases.length} / {cases.filter(c=>c.manifest.tabs.demo).length}</strong></div></div>
<div class="matrix-scroll"><table class="coverage-matrix"><caption>{$t('环节与智能方法关联场景数量')}</caption><thead><tr><th scope="col">{$t('作业环节')}</th>{#each entries as [id,m]}<th scope="col"><a href={'#/method/'+id}>{m.abbr}<span>{m.name}</span></a></th>{/each}<th scope="col">{$t('案例覆盖')}</th></tr></thead><tbody>{#each stages as stage,i}<tr><th scope="row"><a href={'#/stage/'+stage.id}>{stage.name}</a></th>{#each entries as [id],j}<td style:--strength={counts[i][j]/max}>{#if counts[i][j]}<a href={'#/stage/'+stage.id+'?method='+id} aria-label={stage.name+' / '+methods[id].name+' / '+counts[i][j]}>{counts[i][j]}</a>{:else}<span>—</span>{/if}</td>{/each}<td>{stage.scenes.filter((s:any)=>cases.some(c=>c.manifest.sceneId===s.id)).length} / {stage.scenes.length}</td></tr>{/each}</tbody><tfoot><tr><th scope="row">{$t('关联总数')}</th>{#each entries as [id],j}<td>{counts.reduce((sum,row)=>sum+row[j],0)}</td>{/each}<td>{cases.length} {$t('个案例')}</td></tr></tfoot></table></div>
