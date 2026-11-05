<script lang="ts">
  import DOMPurify from 'dompurify';
  import WelllogPreparation from './WelllogPreparation.svelte';
  export let background:{lede:string;sections:{title:string;html?:string;body?:string}[]};
  const clean=(markup:string|undefined)=>DOMPurify.sanitize(markup||'');
</script>

<article class="paper welllog-background">
  <p>{background.lede}</p>
  {#each background.sections as section,i}
    <section class="background-section" data-section={i===2?'preparation':i}>
      <h2>{section.title}</h2>
      {#if i===2}<WelllogPreparation/>{:else}<div class="background-content">{@html clean(section.html||section.body)}</div>{/if}
    </section>
  {/each}
</article>

<style>
  .background-section{margin-top:38px;padding-top:28px;border-top:1px solid var(--line);min-width:0;scroll-margin-top:90px}
  .background-section h2{font-size:28px;margin:0 0 24px;line-height:1.5}
  .background-content{font-size:17px;line-height:1.9}
  .background-content :global(.figcap){display:flex;gap:14px;font-size:16px;line-height:1.9;color:var(--muted);margin:16px 0 25px}
  .background-content :global(.figcap>b){flex-shrink:0;color:var(--gold)}
  .background-content :global(.figure){background:#fffdf8;overflow:auto;border-radius:4px;padding:12px;margin:22px 0}
  .background-content :global(.figure svg){min-width:600px;width:100%}
  .background-content :global(.refs){display:flex;flex-wrap:wrap;gap:12px 24px;margin:12px 0 22px}
  .background-content :global(.ref){display:inline-flex;align-items:center;gap:10px;color:var(--gold);font-size:17px;padding:8px 0;border-bottom:1px solid var(--line)}
  .background-content :global(.small),.background-content :global(.kicker){font-size:16px}
  .background-content :global(.dtag){display:inline-block;background:var(--focus-wash);color:var(--mint);padding:6px 12px;font-size:17px}
  .background-content :global(.meter){display:flex;gap:5px;margin:16px 0}
  .background-content :global(.meter i){width:36px;height:5px;background:var(--line);border-radius:3px}
  .background-content :global(.meter i.on){background:var(--gold)}
  @media(max-width:600px){.background-section{margin-top:28px;padding-top:24px}.background-section h2{font-size:25px}.background-content :global(.figcap){display:block}.background-content :global(.figcap>b){display:block;margin-bottom:5px}.background-content :global(.figure){padding:8px}}
</style>
