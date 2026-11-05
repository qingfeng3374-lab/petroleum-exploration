<script lang="ts">
  export let name='arrow';
</script>
<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  {#if name==='download'}<path d="M12 3v12m-5-5 5 5 5-5M4 15v5h16v-5"/>
  {:else if name==='back'}<path d="m10 5-7 7 7 7M3 12h18"/>
  {:else if name==='book'}<path d="M12 5v16M3 4h5a4 4 0 0 1 4 3 4 4 0 0 1 4-3h5v15h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z"/>
  {:else if name==='grid'}<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  {:else if name==='up'}<path d="m5 11 7-7 7 7M12 4v17"/>
  {:else}<path d="M4 12h16m-6-6 6 6-6 6"/>{/if}
</svg>
