<script lang="ts">
import {language,theme,tr} from "../services/preferences";
  export let kind = 'lithology';
  export let compact = false;
  $: type = kind.includes('geochem')?'geo':kind.includes('lineament')?'line':kind.includes('fracture')?'fracture':kind.includes('map')?'map':kind.includes('welllog')?'log':'rock';
  const points = Array.from({length:72},(_,i)=>({x:32+(i*73%495),y:35+(i*47%250),r:3+i%4}));
  const contours = Array.from({length:13},(_,i)=>`M${-100+i*9} ${35+i*24} C${80+i*9} ${-90+i*23},${150+i*13} ${240+i*6},${290+i*14} ${90+i*14} S${440+i*8} ${-20+i*24},${640+i*6} ${140+i*20}`);
</script>
<div class="case-visual" class:compact data-kind={type}>
  <svg viewBox="0 0 600 340" role="img" aria-label={$tr("案例方法概念预览，非实际计算结果")}>
    <path d="M0 85H600M0 170H600M0 255H600M100 0V340M200 0V340M300 0V340M400 0V340M500 0V340" stroke="currentColor" opacity=".09"/>
    {#if type==='geo'}
      {#each [105,80,55,30] as r}<ellipse cx="360" cy="145" rx={r*1.5} ry={r} fill="none" stroke="#e5ab57" opacity=".5" transform="rotate(-25 360 145)"/>{/each}
      {#each points as p,i}<circle cx={p.x} cy={p.y} r={p.r} fill={i%5===0?'#f5b35e':'#57a58d'} opacity={.45+i%4*.15}/>{/each}
      <circle class="signal-pulse" cx="360" cy="145" r="15" fill="none" stroke="#fbc173"/><path d="M375 132L444 65H545" stroke="#fbc173" fill="none"/><text x="445" y="53">ANOMALY ?</text>
    {:else if type==='line'||type==='fracture'}
      {#each contours as d,i}<path {d} fill="none" stroke={i%3===0?'#bba27e':'#526d57'} stroke-width={i%3===0?5:2} opacity=".45"/>{/each}
      {#each [0,1,2,3,4,5,6] as i}<path class="trace-line" d={`M${70+i*65} ${10+i%3*35}L${125+i*48} 145L${90+i*62} 325`} fill="none" stroke={type==='line'?'#8de0ae':'#d4b1e4'} stroke-width="2" stroke-dasharray="7 4" style:animation-delay={`${i*.15}s`}/>{/each}
      <circle cx="315" cy="165" r="52" fill="none" stroke="#f0c278"/><path d="M250 165H380M315 100V230" stroke="#f0c278" opacity=".6"/>
    {:else if type==='map'}
      <path d="M0 0H260L210 80L300 140L220 230L120 340H0Z" fill="#a27e49" opacity=".8"/><path d="M260 0H440L370 110L450 170L340 340H120L220 230L300 140L210 80Z" fill="#3d836a" opacity=".8"/><path d="M440 0H600V340H340L450 170L370 110Z" fill="#8e6a98" opacity=".8"/>
      {#each contours as d}<path {d} fill="none" stroke="#f7dca1" opacity=".25"/>{/each}
      <path class="trace-line" d="M260 0L210 80L300 140L220 230L120 340M440 0L370 110L450 170L340 340" fill="none" stroke="#fce4b3" stroke-width="3" stroke-dasharray="10 5"/>
    {:else if type==='log'}
      {#each [0,1,2,3] as j}<path d={'M'+Array.from({length:65},(_,i)=>`${80+j*135+Math.sin(i*.7+j)*22+Math.cos(i*1.9)*12},${i*5}`).join('L')} fill="none" stroke={['#edaa65','#72c2a3','#b298ca','#d6c88c'][j]} stroke-width="2"/>{/each}
      <path d="M30 95H570M30 185H570M30 270H570" stroke="#f0c278" stroke-dasharray="6 6"/>
    {:else}
      {#each contours as d,i}<path {d} fill="none" stroke={['#df9e5d','#88ad79','#ae8cae'][Math.floor(i/5)]} stroke-width="22" opacity={.58+i%3*.1}/>{/each}
      <path class="trace-line" d="M225 15L192 92L270 160L240 240L285 330" stroke="#fce8c6" stroke-width="2" stroke-dasharray="8 4" fill="none"/>
      <rect x="325" y="110" width="105" height="90" fill="#0b1a12" opacity=".45" stroke="#dbe9ca"/><path d="M340 155H415M377 123V188" stroke="#e7efd9"/>
    {/if}
    <path d="M18 40V18H40M560 18H582V40M18 300V322H40M560 322H582V300" stroke="#b8cfb4" fill="none"/>
    <text x="30" y="310">{type==='geo'?'MULTI-ELEMENT / CLUSTER':type==='line'?'STRUCTURE / EXTRACTION':type==='fracture'?'FRACTURE / ORIENTATION':type==='map'?'SEGMENTATION / BOUNDARY':type==='log'?'WELL LOG / LAYERING':'SPECTRUM / CLASSIFICATION'}</text>
  </svg>
  <div class="visual-scan"></div><span class="visual-label">{$tr("方法概念预览")}</span>
</div>
