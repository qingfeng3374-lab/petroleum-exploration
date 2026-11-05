<script lang="ts">
  import {onDestroy} from 'svelte';
  import {contours} from 'd3-contour';
  import {theme,tr} from '../services/preferences';
  import {runExperiment,controlSpec} from '../case-sdk/experiment';
  import {skeleton,directions} from '../case-sdk/algorithms';
  import {boundarySegments} from '../case-sdk/spatial';
  import type {CaseDef} from '../domain';
  export let id:string;
  const definitions=import.meta.glob<{default:CaseDef}>('../cases/地质勘察-*.case.ts');
  let canvas:HTMLCanvasElement, def:CaseDef|undefined, result:ReturnType<typeof runExperiment>|undefined;
  let noise=.35, param=5, split=48, inspect=830, loading=true, error=false, request=0, timer:ReturnType<typeof setTimeout>;
  const colors=['#ff9c45','#28c49b','#a98df5'];
  $: spec=controlSpec(def?.kind||'knn');
  $: if(id)loadCase(id);
  $: if(def)schedule(def,noise,param);
  $: if(canvas&&result&&def)draw(canvas,result,def,split,inspect,$theme);
  async function loadCase(caseId:string){const token=++request;loading=true;error=false;result=undefined;def=undefined;try{const modules=await Promise.all(Object.values(definitions).map(load=>load()));if(token!==request)return;const found=modules.find(m=>m.default.id===caseId)?.default;if(!found)throw Error('Case not found');noise=.35;param=controlSpec(found.kind).value;split=48;inspect=830;def=found;loading=false}catch{if(token===request){loading=false;error=true}}}
  function schedule(definition:CaseDef,n:number,p:number){clearTimeout(timer);timer=setTimeout(()=>{result=runExperiment(definition,{seed:18127,noise:n,param:p,small:false,threshold:2.2})},100)}
  onDestroy(()=>{request++;clearTimeout(timer)});
  function position(event:PointerEvent){if(!result||!def)return;const rect=canvas.getBoundingClientRect(),width=def.kind==='fracture'?640:960;const x=(event.clientX-rect.left)/rect.width*960;if(x>=width)return;inspect=Math.max(0,Math.min(result.test.samples.length-1,Math.floor((event.clientY-rect.top)/rect.height*result.test.height)*result.test.width+Math.min(result.test.width-1,Math.floor(x/width*result.test.width))))}
  function key(event:KeyboardEvent){if(!result)return;const deltas:Record<string,number>={ArrowLeft:-1,ArrowRight:1,ArrowUp:-result.test.width,ArrowDown:result.test.width};if(event.key in deltas){event.preventDefault();inspect=Math.max(0,Math.min(result.pred.length-1,inspect+deltas[event.key]))}}
  function draw(el:HTMLCanvasElement,r:ReturnType<typeof runExperiment>,d:CaseDef,cut:number,point:number,palette:string){
    const ctx=el.getContext('2d');if(!ctx)return;const W=960,H=520,w=r.test.width,h=r.test.height,plot=d.kind==='fracture'?640:W,sx=plot/w,sy=H/h,light=palette==='light';ctx.clearRect(0,0,W,H);ctx.fillStyle=light?'#eef3ed':'#101f22';ctx.fillRect(0,0,W,H);
    if(d.kind==='geo'){
      const values=r.scores!,max=Math.max(...values),levels=contours().size([w,h]).thresholds([.5,1,1.5,2,2.5,3,4,5,6])(values);
      for(const c of levels){ctx.beginPath();for(const polygon of c.coordinates)for(const ring of polygon){ring.forEach(([x,y],i)=>i?ctx.lineTo(x*sx,y*sy):ctx.moveTo(x*sx,y*sy));ctx.closePath()}ctx.fillStyle=`rgba(238,${Math.round(168-c.value/max*85)},54,${.045+c.value/max*.12})`;ctx.fill('evenodd');ctx.strokeStyle=light?'#bd6c2860':'#e8b67b66';ctx.lineWidth=1;ctx.stroke()}
      r.test.samples.forEach((s,i)=>{if(i%9)return;ctx.beginPath();ctx.arc((s.x+.5)*sx,(s.y+.5)*sy,r.pred[i]?4.5:2.8,0,Math.PI*2);ctx.fillStyle=r.pred[i]?'#f17e34':light?'#008568':'#44caa4';ctx.fill()});
    }else{
      r.test.samples.forEach((s,i)=>{const x=s.x*sx,y=s.y*sy,raw=s.f.map(v=>Math.max(0,Math.min(255,Math.round(v*255))));const gray=Math.max(0,Math.min(255,Math.round((r.test.image?.[i]??s.f[0])*255)));const original=d.kind==='knn'||d.kind==='map'?`rgb(${raw.join(',')})`:`rgb(${gray},${gray},${gray})`;const after=x>=plot*cut/100;ctx.fillStyle=original;if(d.kind==='knn'||d.kind==='map'){if(after)ctx.fillStyle=colors[r.pred[i]]}else if(d.kind==='line'&&after&&r.pred[i])ctx.fillStyle='#2ce8b0';ctx.fillRect(x,y,sx+.5,sy+.5)});
      if(d.kind==='map'){ctx.save();ctx.beginPath();ctx.rect(plot*cut/100,0,plot,H);ctx.clip();ctx.beginPath();for(const [x,y,a,b] of boundarySegments(r.pred,w)){ctx.moveTo(x*sx,y*sy);ctx.lineTo(a*sx,b*sy)}ctx.strokeStyle='#263c3d';ctx.lineWidth=1.5;ctx.stroke();ctx.restore()}
      if(d.kind==='fracture'){
        const thin=skeleton(r.pred,w),bins=directions(thin,w),max=Math.max(1,...bins);thin.forEach((v,i)=>{if(v){ctx.fillStyle='#57f0c2';ctx.fillRect(i%w*sx,Math.floor(i/w)*sy,sx,sy)}});
        const cx=805,cy=260;ctx.strokeStyle=light?'#82979477':'#6d8b8b66';ctx.lineWidth=1;for(const radius of [45,90,130]){ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.stroke()}for(let i=0;i<12;i++){const a=i*Math.PI/12,rad=25+Math.sqrt(bins[i]/max)*100;for(const mirror of [0,Math.PI]){ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,rad,a+mirror,a+mirror+Math.PI/12);ctx.closePath();ctx.fillStyle=i%2?'#a98df5bb':'#29c5a7bb';ctx.fill()}}ctx.beginPath();ctx.moveTo(cx-140,cy);ctx.lineTo(cx+140,cy);ctx.moveTo(cx,cy-140);ctx.lineTo(cx,cy+140);ctx.stroke();
      }else{ctx.fillStyle='#fffef1';ctx.fillRect(plot*cut/100-1,0,2,H)}
    }
    const p=r.test.samples[Math.min(point,r.pred.length-1)];ctx.strokeStyle=light?'#062f32':'#ffffff';ctx.lineWidth=2;ctx.strokeRect(p.x*sx-2,p.y*sy-2,sx+4,sy+4);
  }
  const titles:Record<string,string>={geo:'从背景分布中，找到异常信号。',knn:'拖动分界，观察岩性如何被识别。',map:'从图上颜色，走向空间边界。',line:'从影像纹理中，提取构造线索。',fracture:'让裂缝的方向，变得可读。'};
</script>

<div class="experiment-preview" data-kind={def?.kind}>
  {#if loading||!result&&!error}<div class="preview-loading" role="status">{$tr('正在计算合成实验…')}</div>{:else if error}<p role="alert">{$tr('预览未能加载，请打开完整实验。')}</p>{/if}
  {#if def&&result}
  <div class="preview-title"><strong>{$tr(titles[def.kind])}</strong><span>{$tr('实时计算 · 合成数据')}</span></div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex a11y_no_noninteractive_element_interactions (This application supports two-dimensional pixel inspection with arrow keys.) -->
  <div class="preview-surface" onkeydown={key} tabindex="0" role="application" aria-label={$tr('实验计算结果；使用方向键检查像元')}>
    <canvas bind:this={canvas} width="960" height="520" onpointermove={position} onpointerdown={position} aria-hidden="true"></canvas>
    <div class="plot-captions"><span>{$tr(def.kind==='geo'?'背景距离与异常样点':def.kind==='fracture'?'裂缝骨架':'原始观测')}</span><span>{$tr(def.kind==='geo'?'等值线展示异常分数':def.kind==='fracture'?'方向玫瑰图 · 0–180°':'模型结果')}</span></div>
  </div>
  <div class="preview-controls">
    {#if !['geo','fracture'].includes(def.kind)}<label>{$tr('观测 / 结果分界')}<input type="range" min="0" max="100" bind:value={split} aria-label={$tr('观测与结果分界')}/><output>{split}%</output></label>{/if}
    <label>{$tr('数据噪声')}<input type="range" min=".05" max="1" step=".05" bind:value={noise} aria-label={$tr('预览数据噪声')}/><output>{noise.toFixed(2)}</output></label>
    <label>{$tr(spec.label)}<input type="range" min={spec.min} max={spec.max} step={spec.step} bind:value={param} aria-label={$tr('预览模型参数')}/><output>{param}</output></label>
  </div>
  <div class="preview-evidence"><div class="preview-legend">{#each def.classes as c,i}<span><i style:background={def.kind==='geo'?(i?'#f17e34':'#28c49b'):['line','fracture'].includes(def.kind)?(i?'#2ce8b0':'#747c7c'):colors[i]}></i>{$tr(c)}</span>{/each}</div><span>{$tr('合成测试 Macro-F1')} <b>{result.m.macro.toFixed(3)}</b></span></div>
  <div class="pixel-readout"><span>{$tr('像元')} ({result.test.samples[inspect].x}, {result.test.samples[inspect].y})</span><span>{$tr('预测')} · {$tr(def.classes[result.pred[inspect]])}</span><span>{$tr('真值')} · {$tr(def.classes[result.test.truth[inspect]])}</span><span>{$tr('移动指针或使用方向键检查')}</span></div>
  {/if}
</div>
