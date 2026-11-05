<script lang="ts">
 import DOMPurify from 'dompurify';
 import {exportCasePackage} from '../services/export-case';
 import {tr} from '../services/preferences';
 import {auditCase} from '../services/case-audit';
 import {readFiles,validate,download} from '../services/packages';
 import {emptyMetadata,applyMetadata,createManualCase,type CaseMetadata,type CaseStep} from '../services/manual-case';
 import CaseFrame from './CaseFrame.svelte';
 export let stages:any[],scenes:any[],methods:Record<string,any>,existing:any[],motion=true;
 export let initialScene='';
 export let onclose:()=>void,onadd:(record:any)=>Promise<void>;
 let mode:'file'|'manual'='file',loaded:any=null,metadata:CaseMetadata={...emptyMetadata(),sceneId:initialScene,methods:[...(scenes.find(s=>s.id===initialScene)?.methods||[])]};
 let intro='',body='',demo='',steps:CaseStep[]=[{name:'',do:'',effect:'',trap:''}];
 let status='',preview=false,previewDemo=false,busy=false;
 const safe=(html:string)=>DOMPurify.sanitize(html);
 $: candidate=mode==='file'?(loaded?applyMetadata(loaded,metadata,scenes):null):createManualCase(metadata,{intro,html:safe(body),steps,demo},scenes);
 $: checks=candidate?auditCase(candidate,scenes,methods):[];
 $: errors=candidate?[...new Set([...validate(candidate.manifest,scenes,existing),...checks.filter(c=>c.level==='error').map(c=>c.detail)])]:[];
 $: if(candidate&&candidate.files.reduce((sum:number,file:any)=>sum+(file.size??new TextEncoder().encode(file.data).length),new TextEncoder().encode(JSON.stringify(candidate.manifest)).length)>6*1024*1024)errors=[...errors,'案例总大小超过 6 MiB'];
 async function inspect(files:File[]){if(!files.length)return;busy=true;status='';preview=false;previewDemo=false;try{loaded=await readFiles(files);const m=loaded.manifest;metadata={...emptyMetadata(),title:m.title||'',id:m.id||'',sceneId:m.sceneId||'',methods:m.methods||[],version:m.version||'1.0.0',updated:m.updated||emptyMetadata().updated};status='校验通过，可试跑或添加'}catch(error){status=error instanceof Error?error.message:String(error);loaded=null}finally{busy=false}}
 async function drop(event:DragEvent){event.preventDefault();const files:File[]=[];async function visit(entry:any,prefix=''){if(entry.isFile){const file=await new Promise<File>((resolve,reject)=>entry.file(resolve,reject));Object.defineProperty(file,'webkitRelativePath',{value:prefix+file.name});files.push(file)}else if(entry.isDirectory){const reader=entry.createReader();let batch:any[];do{batch=await new Promise((resolve,reject)=>reader.readEntries(resolve,reject));for(const child of batch)await visit(child,prefix+entry.name+'/')}while(batch.length)}}try{for(const item of Array.from(event.dataTransfer?.items||[])){const entry=item.webkitGetAsEntry?.();if(entry)await visit(entry)}if(!files.length)files.push(...Array.from(event.dataTransfer?.files||[]));await inspect(files)}catch(error){status=String(error)}}
 async function accept(){if(!candidate||errors.length||busy)return;busy=true;try{await onadd(candidate)}catch(error){status=String(error)}finally{busy=false}}
 function exportPackage(){if(candidate&&!errors.length)exportCasePackage(candidate)}
 function template(){download('case.json',JSON.stringify({id:'my-geology-case',sceneId:'g1',title:$tr('案例名称'),methods:['cv'],version:'1.0.0',updated:emptyMetadata().updated,tabs:{background:{lede:$tr('背景简介'),sections:[{title:$tr('背景内容'),html:'<p>...</p>'}]},workflow:{steps:[{name:$tr('步骤名称'),do:'...',effect:'...',trap:''}]},demo:{mode:'page',html:'demo/index.html'}}},null,2))}
</script>

<div class="backdrop"><div class="dialog" role="dialog" aria-modal="true" aria-label={$tr('添加案例')} tabindex="-1">
 <div class="section-head"><div><span class="eyebrow">CONTRIBUTE / FIELD LAB</span><h2>{$tr('接入你的智能化案例')}</h2></div><button onclick={onclose} aria-label={$tr('关闭添加案例窗口')}>{$tr('关闭 ✕')}</button></div>
 <p>{$tr('手动填写名称、分类及内容，无需预先制作 case.json。也可先导入文件，再调整原有表单字段。')}</p>
 <div class="import-tabs" role="tablist" aria-label={$tr('添加案例')}><button role="tab" aria-selected={mode==='file'} class:active={mode==='file'} onclick={()=>{mode='file';preview=false;previewDemo=false;status=''}}>{$tr('文件导入')}</button><button role="tab" aria-selected={mode==='manual'} class:active={mode==='manual'} onclick={()=>{mode='manual';preview=false;previewDemo=false;status=''}}>{$tr('手动添加')}</button></div>
 {#if mode==='file'}<div class="drop" role="region" aria-label={$tr('案例拖放区')} ondragover={e=>e.preventDefault()} ondrop={drop}><b>{$tr('将案例拖到这里')}</b><span>{$tr('支持 ZIP 压缩包、完整文件夹或单文件 HTML。所有计算和保存均在本机完成。')}</span><div class="related"><label class="file-label">{$tr('导入 ZIP 压缩包')}<input type="file" accept=".zip,application/zip" aria-label={$tr('选择 ZIP 压缩包')} onchange={e=>inspect(Array.from(e.currentTarget.files||[]))}></label><label class="file-label">{$tr('选择文件夹')}<input type="file" webkitdirectory={true} multiple onchange={e=>inspect(Array.from(e.currentTarget.files||[]))}></label><label class="file-label">{$tr('选择文件 / 单 HTML')}<input type="file" multiple onchange={e=>inspect(Array.from(e.currentTarget.files||[]))}></label></div><button class="template-download action-button secondary-button" onclick={template}>{$tr('下载清单模板')} ↓</button></div>{/if}
 {#if mode==='manual'||loaded}
 <div class="case-form">
  <label>{$tr('案例名称')} <span>*</span><input name="title" maxlength="100" required bind:value={metadata.title}></label>
  <label>{$tr('案例 ID')} <span>*</span><input name="caseId" maxlength="80" required pattern="[a-z0-9]+(-[a-z0-9]+)*" bind:value={metadata.id}><small>{$tr('小写字母、数字、连字符，全站唯一。')}</small></label>
  <label class="wide">{$tr('所属场景')} <span>*</span><select name="sceneId" required bind:value={metadata.sceneId}><option value="">{$tr('— 选择场景 —')}</option>{#each stages as stage}<optgroup label={stage.name}>{#each stage.scenes as scene}<option value={scene.id}>{scene.id.toUpperCase()} · {scene.name}</option>{/each}</optgroup>{/each}</select></label>
  <fieldset class="wide"><legend>{$tr('涉及的 AI 技术')}</legend><div class="method-checks">{#each Object.entries(methods) as [id,method]}<label><input type="checkbox" bind:group={metadata.methods} value={id}>{method.name}</label>{/each}</div><small>{$tr('不勾选则继承所属场景的方法。')}</small></fieldset>
  <label>{$tr('版本')}<input name="version" bind:value={metadata.version}></label><label>{$tr('更新日期')}<input name="updated" type="date" bind:value={metadata.updated}></label>
 </div>
 {#if mode==='file'}<p class="notice">{$tr('表单中的名称、ID、场景、方法、版本和日期会覆盖导入清单中的对应字段。')}</p><details><summary>{$tr('文件清单')} · {loaded.files.length}</summary>{#each loaded.files as file}<div class="resource-row">{file.name}</div>{/each}</details>
 {:else}<div class="case-form">
  <label class="wide">{$tr('背景简介')}<textarea name="intro" rows="2" bind:value={intro}></textarea></label>
  <label class="wide">{$tr('背景内容')} <span>*</span><textarea name="background" rows="5" required bind:value={body}></textarea><small>{$tr('可填写纯文本或安全 HTML。')}</small></label>
  <fieldset class="wide workflow-editor"><legend>{$tr('流程步骤')}</legend>{#each steps as item,i}<div class="workflow-edit-step"><div class="step-editor-heading"><b>{String(i+1).padStart(2,'0')}</b><button onclick={()=>steps=steps.filter((_,index)=>index!==i)}>{$tr('删除步骤')}</button></div><label>{$tr('步骤名称')}<input bind:value={item.name}></label><label>{$tr('操作内容')}<textarea rows="2" bind:value={item.do}></textarea></label><label>{$tr('预期结果')}<textarea rows="2" bind:value={item.effect}></textarea></label><label>{$tr('注意事项')}<textarea rows="2" bind:value={item.trap}></textarea></label></div>{/each}<button onclick={()=>steps=[...steps,{name:'',do:'',effect:'',trap:''}]}>{$tr('＋ 添加步骤')}</button></fieldset>
  <label class="wide">{$tr('演示 HTML（可选）')}<textarea class="code-input" name="demo" rows="6" spellcheck={false} bind:value={demo}></textarea><small>{$tr('独立演示页代码，可包含脚本；保存后在沙箱中运行。')}</small></label>
 </div>{/if}
 {/if}
 <div class="validation" aria-live="polite"><h3>{$tr('校验结果')}</h3>{#if errors.length}{#each errors as error}<p class="error">{$tr(error)}</p>{/each}{:else}<p role="status">{$tr(status||(!candidate?'尚未选择文件':'校验通过，可试跑或添加'))}</p>{/if}{#each checks.filter(c=>c.level==='warn') as check}<p class="validation-reminder">! {$tr(check.detail)}</p>{/each}</div>
 {#if candidate}<div class="import-actions"><button disabled={!!errors.length||busy} onclick={()=>{preview=!preview;previewDemo=false}}>{$tr(preview?'收起预览':'预览背景')}</button>{#if candidate.manifest.tabs.demo}<button disabled={!!errors.length||busy} onclick={()=>{previewDemo=!previewDemo;preview=false}}>{$tr('▶ 试跑示范')}</button>{/if}<button disabled={!!errors.length||busy} onclick={exportPackage}>{$tr('导出当前案例包')} ↓</button><button class="primary" disabled={!!errors.length||busy} onclick={accept}>{$tr('校验并添加')}</button></div>
 {#if preview}<article class="paper manual-preview"><h2>{candidate.manifest.title}</h2><p>{candidate.manifest.tabs.background.lede}</p>{#each candidate.manifest.tabs.background.sections as section}<h3>{section.title}</h3><div class="background-copy">{@html safe(section.html||section.body||'')}</div>{/each}</article>{/if}
 {#if previewDemo}{#key JSON.stringify(candidate)}<CaseFrame kase={candidate} tab="demo" {motion}/>{/key}{/if}
 {/if}
</div></div>
