<script lang="ts">
  import {tr} from '../services/preferences';

  const items=[
    {id:'logs',name:'常规测井曲线',spec:'GR / SP / RT / DEN；本例参考采样间隔 0.125 m，单井 5,000–20,000 点。',purpose:'配套人工分层表；原案例参考规模为 30–50 口井。'},
    {id:'neighbors',name:'邻井分层与岩性',spec:'同区块邻井的分层与岩性解释；原案例参考规模为 20 口以上。',purpose:'用于层序与岩性的一致性检查。'},
    {id:'scheme',name:'地质分层方案',spec:'统一的分层标准、标志层与层位命名。',purpose:'明确目标层序，避免不同解释员的标签含义不一致。'},
    {id:'structure',name:'井位与构造图',spec:'区块井位、构造位置及深度基准信息。',purpose:'辅助复核候选界面的地质合理性。'},
    {id:'reports',name:'历史解释成果',spec:'已有解释报告、复核记录和相关成果。',purpose:'与本次结果交叉核对，保留解释依据。'}
  ];
  let checked:string[]=[];
  $: count=checked.length;
</script>

<div class="welllog-preparation">
  <p class="preparation-intro">{$tr('逐项确认你已有的数据。缺项可先记录并补齐；勾选只表示自行确认，不会自动验证数据质量。')}</p>
  <p class="preparation-scope">{$tr('下列井数、采样间隔和点数来自原案例的参考设定，不是所有分层项目的统一门槛。')}</p>
  <fieldset class="preparation-checklist">
    <legend>{$tr('数据准备清单')}</legend>
    <div class="preparation-status"><span role="status" aria-live="polite">{$tr('已确认')} <strong>{count} / {items.length}</strong> {$tr('项')}</span><button type="button" onclick={()=>checked=[]} disabled={!count}>{$tr('清空勾选')}</button></div>
    <progress max={items.length} value={count} aria-label={$tr('数据准备进度')}></progress>
    <div class="preparation-column-labels" aria-hidden="true"><span>{$tr('数据与参考规格')}</span><span>{$tr('用途与标注要求')}</span></div>
    {#each items as item}
      <label class="preparation-item" class:checked={checked.includes(item.id)}>
        <input type="checkbox" bind:group={checked} value={item.id} aria-label={$tr(item.name)} aria-describedby={`preparation-${item.id}-spec preparation-${item.id}-purpose`}/>
        <span class="preparation-data"><strong>{$tr(item.name)}</strong><span id={`preparation-${item.id}-spec`}>{$tr(item.spec)}</span></span>
        <span class="preparation-purpose" id={`preparation-${item.id}-purpose`}>{$tr(item.purpose)}</span>
      </label>
    {/each}
  </fieldset>
  <p class="preparation-session">{$tr('勾选仅在当前背景页有效；切换主题或语言会保留，离开此页或刷新后重置。')}</p>
  <div class="preparation-sources"><h3>{$tr('可参考的公开数据集')}</h3><a href="https://github.com/bolgebrygg/Force-2020-Machine-Learning-competition" target="_blank" rel="noopener noreferrer"><span>FORCE 2020<span class="source-detail">{$tr('岩性竞赛数据与说明')}</span></span><span aria-hidden="true">↗</span></a><a href="https://www.kgs.ku.edu/Magellan/Logs/" target="_blank" rel="noopener noreferrer"><span>Kansas Geological Survey<span class="source-detail">{$tr('公开测井 LAS 数据检索')}</span></span><span aria-hidden="true">↗</span></a></div>
</div>

<style>
  .preparation-intro{margin:0 0 14px;font-size:17px;line-height:1.9}
  .preparation-scope{font-size:16px;color:var(--muted);line-height:1.8;margin:0 0 26px;padding-left:16px;border-left:3px solid var(--gold)}
  .preparation-checklist{min-width:0;padding:0;border:0;margin:0}
  legend{padding:0;margin-bottom:14px;font-size:21px;font-weight:650;color:var(--ink)}
  .preparation-status{display:flex;align-items:center;justify-content:space-between;gap:15px;font-size:16px}
  .preparation-status strong{color:var(--gold);font:24px Consolas,monospace;margin:0 6px}
  .preparation-status button{font-size:16px;background:transparent;padding:8px 14px}
  progress{display:block;width:100%;height:7px;margin:18px 0 24px;border:0;border-radius:5px;appearance:none;background:var(--line);color:var(--mint);accent-color:var(--mint)}
  progress::-webkit-progress-bar{background:var(--line);border-radius:5px}
  progress::-webkit-progress-value{background:var(--mint);border-radius:5px;transition:width .2s}
  progress::-moz-progress-bar{background:var(--mint);border-radius:5px}
  :global(.motion-paused) progress::-webkit-progress-value{transition:none}
  @media(prefers-reduced-motion:reduce){progress::-webkit-progress-value{transition:none}}
  .preparation-column-labels{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:28px;padding:0 22px 14px 64px;color:var(--muted);font-size:15px}
  .preparation-item{display:grid;grid-template-columns:24px minmax(0,1.4fr) minmax(0,1fr);gap:20px 28px;align-items:start;padding:24px 22px 24px 12px;border-top:1px solid var(--line);cursor:pointer;transition:background .2s;font-size:16px;line-height:1.8;min-width:0}
  .preparation-item:last-child{border-bottom:1px solid var(--line)}
  .preparation-item:hover,.preparation-item.checked{background:var(--focus-wash)}
  .preparation-item:focus-within{outline:2px solid var(--gold);outline-offset:2px}
  .preparation-item input{width:22px;height:22px;margin:5px 0 0;accent-color:var(--mint);cursor:pointer}
  .preparation-data{display:flex;flex-direction:column;gap:6px;min-width:0}
  .preparation-data strong{font-size:18px;font-weight:650;color:var(--ink)}
  .preparation-data>span,.preparation-purpose{font-size:16px;color:var(--muted);overflow-wrap:anywhere}
  .preparation-purpose{padding-top:2px}
  .preparation-session{font-size:15px;line-height:1.8;color:var(--muted);margin:18px 0 30px}
  .preparation-sources{border-top:1px solid var(--line);padding-top:24px}
  .preparation-sources h3{font-size:21px;margin:0 0 10px}
  .preparation-sources>a{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:18px 0;border-bottom:1px solid var(--line);font-size:18px;color:var(--gold);line-height:1.6}
  .source-detail{display:block;font-size:16px;color:var(--muted);margin-top:3px}
  .preparation-sources>a:hover{text-decoration:underline;text-underline-offset:5px}
  @media(max-width:760px){.preparation-column-labels{display:none}.preparation-item{grid-template-columns:24px minmax(0,1fr);gap:8px 16px;padding:20px 8px}.preparation-item input{grid-row:1/3}.preparation-purpose{grid-column:2;padding-top:0}.preparation-status{flex-wrap:wrap}.preparation-intro,.preparation-scope{font-size:16px}.preparation-data strong{font-size:18px}.preparation-session{font-size:15px}.preparation-sources>a{font-size:17px}}
</style>
