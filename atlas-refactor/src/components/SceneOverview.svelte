<script lang="ts">
 import {tr} from '../services/preferences';
 export let scene:any,stages:any[],methods:Record<string,any>;export let onadd:()=>void;export let pending=true;
 let checked:string[]=[];
 $: rows=Array.isArray(scene.data)?scene.data:scene.data?[[scene.data,'','']]:[];
 $: if(scene.id)checked=[];
</script>
<article class="scene-overview">
 {#if pending}<div class="pending-banner"><div><span class="eyebrow">{$tr('案例待接入')}</span><h2>{$tr('先了解方向，再决定如何验证。')}</h2><p>{$tr('业务与数据条件已收录，完整案例流程及演示正在等待补充。')}</p></div><button class="primary" onclick={onadd}>{$tr('为此场景添加案例')} ＋</button></div>{/if}
 <div class="scene-sections"><section><span class="section-no">01 / {$tr('业务')}</span><h2>{$tr('当前做法与问题')}</h2><p>{scene.problem||scene.intro}</p></section><section><span class="section-no">02 / AI</span><h2>{$tr('AI 能做什么')}</h2><p>{scene.point}</p><div class="tags">{#each scene.methods as id}<a href={'#/method/'+id}>{methods[id]?.name}</a>{/each}</div></section></div>
 <section class="scene-data-section"><span class="section-no">03 / {$tr('数据')}</span><h2>{$tr('你需要准备什么')}</h2><p class="muted-copy">{$tr('逐项确认数据类型、参考规模和标注需求；清单中的规模来自场景设定，需结合具体任务调整。')}</p><div class="data-check-heading"><span>{$tr('数据准备清单')}</span><strong>{checked.length} / {rows.length}</strong></div>{#each rows as row,i}<label class="scene-data-row"><input type="checkbox" value={String(i)} bind:group={checked}/><span><strong>{row[0]}</strong><span>{row[1]}</span></span><span><small>{$tr('标注与要求')}</small>{row[2]||$tr('按具体任务确认')}</span></label>{/each}{#if !rows.length}<p>{$tr('数据规格待补充')}</p>{/if}</section>
 <section class="scene-directions"><span class="section-no">04 / {$tr('判断')}</span><h2>{$tr('技术难度与参考方向')}</h2><div class="difficulty-scale"><strong>{scene.diff}</strong><span>{scene.diffWhy}</span></div><div class="reference-links">{#each scene.refs||[] as ref,i}<a class="action-button secondary-button" href={'#/method/'+scene.methods[i%scene.methods.length]}>{$tr(ref)} ↗</a>{/each}</div>{#if scene.datasets?.length}<h3>{$tr('相关公开数据集')}</h3><ul>{#each scene.datasets as d}<li>{$tr(d)}</li>{/each}</ul>{/if}{#if scene.cross?.length}<h3>{$tr('交叉环节')}</h3><div class="related">{#each scene.cross as name}{@const target=stages.find(s=>s.name===name||s.id===name||s.originalName===name)}{#if target}<a href={'#/stage/'+target.id}>{target.name} ↗</a>{:else}<span>{$tr(name)}</span>{/if}{/each}</div>{/if}</section>
</article>
