<script lang="ts">
  import {tr} from '../services/preferences';
  import ActionIcon from './ActionIcon.svelte';
  export let items:{label:string;href?:string}[]=[];
  export let backLabel='返回上一页';
  export let onback:()=>void;
</script>
<div class="page-navigation">
  <button class="action-button back-button" onclick={onback}><ActionIcon name="back"/><span>{$tr(backLabel)}</span></button>
  <nav class="breadcrumb-nav" aria-label={$tr('当前位置')}><ol>{#each items as item}<li>{#if item.href}<a href={item.href}>{item.label}</a>{:else}<span aria-current="page">{item.label}</span>{/if}</li>{/each}</ol></nav>
</div>
