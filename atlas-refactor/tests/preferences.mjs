import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const base=(process.env.ATLAS_TEST_URL||'http://127.0.0.1:5173/').replace(/\/$/,'');
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},acceptDownloads:true});page.setDefaultTimeout(12000);
const errors=[],results=[],missing=[];page.on('pageerror',error=>errors.push(error.message));
const frame=()=>page.frameLocator('iframe');
const visibleChinese=async locator=>(await locator.innerText()).split('\n').filter(line=>/[\u3400-\u9fff]/.test(line));
const readExport=async()=>{const promise=page.waitForEvent('download');await frame().locator('#export').click();return JSON.parse(fs.readFileSync(await (await promise).path(),'utf8'))};
const setRange=async(locator,value)=>locator.evaluate((el,value)=>{el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}))},String(value));
try{
 await page.goto(base);await page.locator('.geo-viewport canvas').waitFor();await page.locator('.theme-toggle').click();await page.locator('.language-toggle').click();await page.reload();
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.locator('h1')).toContainText('earth.');
 assert.deepEqual(await visibleChinese(page.locator('main')),[]);results.push({test:'preference-persistence',passed:true});
 for(const theme of ['light','dark'])for(const language of ['en','zh']){
  if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.theme-toggle').click();
  if(await page.locator('html').getAttribute('lang')!==(language==='en'?'en':'zh-CN'))await page.locator('.language-toggle').click();
  for(const width of [390,768,1440]){await page.setViewportSize({width,height:1000});await page.waitForTimeout(100);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${theme}/${language}/${width}`)}
 }
 await page.locator('.language-toggle').click();await page.locator('.theme-toggle').click();
 const catalog=JSON.parse(fs.readFileSync('src/data/catalog.json','utf8')).filter(c=>c.extensions?.atlas?.engine==='geology');
 for(const item of catalog){
  await page.goto(`${base}/#/scene/${item.sceneId}?case=${item.id}&tab=demo`);await frame().locator('#demo').waitFor({state:'visible'});await expect(frame().locator('html')).toHaveAttribute('lang','en');
  await frame().locator('#fail1').click();await expect(frame().locator('#noise-out')).toHaveText('1.10');await frame().locator('#new').click();await expect(frame().locator('#seed')).toHaveText('20261024');
  await frame().locator('#map1').press('ArrowRight');const before=await readExport(),probe=await frame().locator('#probe').innerText();
  await page.locator('.language-toggle').click();await page.locator('.theme-toggle').click();await expect(frame().locator('html')).toHaveAttribute('lang','zh-CN');await expect(frame().locator('html')).toHaveAttribute('data-theme','dark');
  assert.deepEqual(await readExport(),before);await expect(frame().locator('#noise')).toHaveValue('1.1');
  await page.locator('.language-toggle').click();await page.locator('.theme-toggle').click();await expect(frame().locator('#probe')).toHaveText(probe);
  for(const tab of [0,1,2]){await page.locator('.tabs a').nth(tab).click();await page.waitForTimeout(80);if(tab===1){await frame().locator('[data-step]').last().click()}else if(tab===0){await frame().locator('[data-term]').first().click()}const text=await visibleChinese(frame().locator('body'));if(text.length)missing.push({case:item.id,tab,text})}
  await frame().locator('.comparison summary').click();await setRange(frame().locator('#compare-split'),72);await page.locator('.language-toggle').click();await expect(frame().locator('#compare-split')).toHaveValue('72');await expect(frame().locator('.comparison')).toHaveAttribute('open','');await page.locator('.language-toggle').click();
  for(const width of [390,768,1440]){await page.setViewportSize({width,height:1000});await page.waitForTimeout(100);assert.ok(await frame().locator('html').evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${item.id}/${width} iframe overflow`)}
  results.push({test:'case-preferences',id:item.id,parametersPreserved:true,exportsIdentical:true});
 }
 await page.goto(base+'/#/scene/w1?case=welllog-layer&tab=demo');await frame().locator('#c-beta').waitFor();await expect(frame().locator('html')).toHaveAttribute('lang','en');await expect(frame().locator('.demo h3')).toHaveText('Divide a GR log into geological units');assert.equal(await frame().locator('html').evaluate(()=>document.characterSet),'UTF-8');await setRange(frame().locator('#c-beta'),6);await page.locator('.theme-toggle').click();await page.locator('.language-toggle').click();await expect(frame().locator('#c-beta')).toHaveValue('6');await page.locator('.language-toggle').click();await page.waitForTimeout(100);const legacyText=await visibleChinese(frame().locator('body'));if(legacyText.length)missing.push({case:'welllog',text:legacyText});
 for(const tab of [0,1]){await page.locator('.tabs a').nth(tab).click();const text=await visibleChinese(page.locator('main'));if(text.length)missing.push({case:'welllog',tab,text})}results.push({test:'legacy-welllog-preferences',passed:true});
 await page.goto(base+'/#/cases');await page.locator('.top>button').click();await page.getByRole('tab',{name:'Manual entry'}).click();await expect(page.locator('.dialog .primary')).toBeDisabled();
 await page.locator('[name=title]').fill('Manual field experiment');await page.locator('[name=caseId]').fill('manual-field-test');await page.locator('[name=sceneId]').selectOption('g2');await page.locator('[name=intro]').fill('Synthetic observations for review');await page.locator('[name=background]').fill('<p>Manual background</p><img src="x" onerror="window.injected=true">');
 await page.locator('.workflow-edit-step input').fill('Review observations');await page.locator('.workflow-edit-step textarea').nth(0).fill('Compare field samples.');
 await page.locator('[name=demo]').fill('<!doctype html><html><meta charset="utf-8"><body><button id="manual-run" onclick="this.textContent=\'Result 42\'">Run demo</button></body></html>');
 await expect(page.locator('.dialog .primary')).toBeEnabled();await page.getByRole('button',{name:'Preview background',exact:true}).click();assert.equal(await page.evaluate(()=>window.injected),undefined);
 const exported=page.waitForEvent('download');await page.getByRole('button',{name:/Export this package/}).click();const archivePath=await (await exported).path();assert.ok(fs.statSync(archivePath).size>0);
 await page.locator('.dialog .primary').click();await expect(page).toHaveURL(/case=manual-field-test/);await expect(page.locator('.dialog')).toHaveCount(0);await expect(page.locator('.paper')).toContainText('Manual background');await page.reload();await expect(page.locator('.paper')).toContainText('Manual background');
 await page.locator('.tabs a').nth(1).click();await expect(page.locator('.paper')).toContainText('Compare field samples.');await page.locator('.tabs a').nth(2).click();await frame().locator('#manual-run').click();await expect(frame().locator('#manual-run')).toHaveText('Result 42');
 await page.locator('.top>button').click();const {unzipSync,strFromU8}=await import('fflate');const extracted=unzipSync(fs.readFileSync(archivePath));const manifest=JSON.parse(strFromU8(extracted['case.json']));assert.ok(!JSON.stringify(manifest).includes('onerror'));assert.deepEqual(manifest.methods,['opt']);
 await page.locator('input[type=file]').last().setInputFiles(Object.entries(extracted).map(([name,buffer])=>({name,mimeType:name.endsWith('.json')?'application/json':'text/html',buffer:Buffer.from(buffer)})));await expect(page.locator('.dialog .primary')).toBeDisabled();await page.locator('[name=caseId]').fill('manual-reimport-test');await page.locator('[name=title]').fill('Edited imported experiment');await page.locator('[name=version]').fill('2.0.0');await expect(page.locator('.dialog .primary')).toBeEnabled();await page.locator('.dialog .primary').click();await expect(page).toHaveURL(/case=manual-reimport-test/);await expect(page.locator('.case-switch')).toContainText('Edited imported experiment');await page.locator('.tabs a').nth(2).click();await expect(frame().locator('#manual-run')).toBeVisible();
 results.push({test:'manual-case',validation:true,sanitized:true,workflow:true,demo:true,persistence:true,zipExport:true,reimport:true,metadataEdit:true});
 const standalone=await browser.newPage();const file=fs.readdirSync('release/single').find(f=>f.includes('遥感'));
 await standalone.goto(pathToFileURL(path.resolve('release/single',file)).href);await standalone.locator('#language-toggle').click();await expect(standalone.locator('html')).toHaveAttribute('lang','en');await standalone.locator('#theme-toggle').click();await expect(standalone.locator('html')).toHaveAttribute('data-theme','light');await standalone.locator('[data-view=demo]').click();await standalone.locator('#fail1').click();await expect(standalone.locator('#noise-out')).toHaveText('1.10');await standalone.close();results.push({test:'standalone-preferences',passed:true});
 fs.writeFileSync('docs/preferences-results.json',JSON.stringify({base,results,missing,errors},null,2));console.log(JSON.stringify({results,missing,errors},null,2));assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
}finally{fs.writeFileSync('docs/preferences-results.json',JSON.stringify({base,results,missing,errors},null,2));await browser.close()}
