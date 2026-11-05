<script lang="ts">
 import {tr} from '../services/preferences';
 export let scene:any,scenes:any[],methods:Record<string,any>;
 $: sameStage=scenes.filter(s=>s.stageId===scene.stageId&&s.id!==scene.id);
 $: sameMethods=scenes.filter(s=>s.stageId!==scene.stageId&&s.methods.some((id:string)=>scene.methods.includes(id))).slice(0,6);
</script>
<section class="section related-exploration"><h2>{$tr('继续探索')}</h2><div class="related-columns"><div><h3>{$tr('同环节场景')} · {scene.stageName}</h3>{#each sameStage as s}<a href={'#/scene/'+s.id}>{s.name}<span>↗</span></a>{/each}</div><div><h3>{$tr('同方法 · 跨环节')}</h3>{#each sameMethods as s}<a href={'#/scene/'+s.id}><span>{s.name}<small>{s.stageName} · {s.methods.filter((id:string)=>scene.methods.includes(id)).map((id:string)=>methods[id]?.abbr).join(' / ')}</small></span><span>↗</span></a>{/each}</div></div></section>
