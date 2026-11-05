<script lang="ts">
  import {tr} from '../services/preferences';
  import {exportCasePackage} from '../services/export-case';
  import ActionIcon from './ActionIcon.svelte';
  export let kase:any;
</script>
{#if kase.imported}<button class="action-button download-button" onclick={()=>exportCasePackage(kase)}><ActionIcon name="download"/><span>{$tr('下载案例包')}</span><span class="file-format">ZIP</span></button>
{:else if kase.url}<a class="action-button download-button" href={kase.url} download={kase.manifest.title+'.html'}><ActionIcon name="download"/><span>{$tr('下载案例')}</span><span class="file-format">HTML</span></a><a class="action-button secondary-button case-zip-download" href={kase.manifest.extensions?.atlas?.archive} download={kase.id+'.zip'}><ActionIcon name="download"/>{$tr('下载 ZIP')}</a>{:else if kase.id==='welllog-layer'}<a class="action-button download-button" href="case-archives/welllog-layer.zip" download="welllog-layer.zip"><ActionIcon name="download"/>{$tr('下载 ZIP')}</a>{/if}
