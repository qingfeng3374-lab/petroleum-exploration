import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:5173/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
page.setDefaultTimeout(15000);
const errors=[],results=[],fontIssues=[];page.on('pageerror',e=>errors.push(e.message));
const shot=async name=>{await page.screenshot();await page.screenshot({path:`docs/screenshots/field-${name}.png`})};
const canvasData=async()=>page.locator('.preview-surface canvas').evaluate(c=>c.toDataURL());
const setRange=async(locator,n)=>locator.evaluate((e,n)=>{e.value=String(n);e.dispatchEvent(new Event('input',{bubbles:true}))},n);
const overflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page horizontal overflow');
const chinese=async()=>assert.deepEqual((await page.locator('main').innerText()).split('\n').filter(s=>/[\u3400-\u9fff]/.test(s)),[],'untranslated Chinese');
async function fonts(label){const issues=await page.locator('main').evaluate(el=>[...el.querySelectorAll('*')].filter(e=>e.getClientRects().length&&!e.closest('svg,canvas,.depth-scale')&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(e).fontSize)<14).map(e=>({text:e.innerText?.slice(0,80),size:getComputedStyle(e).fontSize})));if(issues.length)fontIssues.push({label,issues})}
async function toggle(selector){if(!await page.locator(selector).isVisible())await page.locator('.mobile-menu button').click();await page.locator(selector).click();if(await page.locator('.mobile-menu button').isVisible()&&await page.locator('.mobile-menu button').getAttribute('aria-expanded')==='true')await page.keyboard.press('Escape')}
try{
 await page.goto(base);await page.locator('.geo-viewport canvas').waitFor();await shot('home-dark');
 await page.locator('.field-model').scrollIntoViewIfNeeded();await expect(page.locator('.field-model')).toHaveAttribute('data-ready','true');await expect(page.locator('.field-hotspot')).toHaveCount(13);await page.locator('.field-hotspot').nth(2).click();await expect(page.locator('.field-selection h3')).toContainText('钻井');await page.locator('.atlas-explorer').evaluate(e=>e.scrollIntoView({block:'start'}));await shot('panorama-dark');
 await page.locator('.explorer-modes button').nth(1).click();await page.locator('.relation-methods button').nth(3).click();
 const source=JSON.parse(fs.readFileSync('src/data/atlas.json','utf8')),method=Object.keys(source.methods)[3];
 const expected=source.stages.map(st=>st.scenes.filter(s=>s.methods.includes(method)).length);
 assert.deepEqual(await page.locator('.relation-stages button b').allTextContents(),expected.map(String));
 await shot('connections-dark');results.push({test:'panorama-and-method-connections',stages:13,countsMatchSource:true});
 await toggle('.theme-toggle');await shot('connections-light');await page.locator('.explorer-modes button').first().click();await page.locator('.atlas-explorer').evaluate(e=>e.scrollIntoView({block:'start'}));await shot('panorama-light');await fonts('home-light');
 await page.goto(base+'#/cases');await page.locator('.preview-surface canvas').waitFor();await expect(page.locator('.case-index-entry')).toHaveCount(JSON.parse(fs.readFileSync('src/data/catalog.json','utf8')).length+1);await expect(page.locator('.case-visual')).toHaveCount(0);await shot('laboratory-light');
 const catalog=JSON.parse(fs.readFileSync('src/data/catalog.json','utf8')).filter(c=>c.extensions?.atlas?.engine==='geology'),views=[];
 for(const c of catalog){await page.locator(`[data-case-id="${c.id}"] .case-selector`).click();await expect(page.locator('.workbench-heading h2')).toHaveText(c.title);await page.locator('.preview-surface canvas').waitFor();await page.waitForTimeout(150);const before=await canvasData();views.push(before);await setRange(page.locator('.preview-controls input[aria-label="预览数据噪声"]'),.95);await expect.poll(canvasData).not.toBe(before);const probe=await page.locator('.pixel-readout').innerText();await page.locator('.preview-surface').focus();await page.keyboard.press('ArrowRight');assert.notEqual(await page.locator('.pixel-readout').innerText(),probe);await page.locator('.preview-title').scrollIntoViewIfNeeded();await shot(c.id);results.push({test:'live-case-preview',id:c.id,noiseChangesComputedImage:true,keyboardInspection:true})}
 assert.equal(new Set(views).size,5);await fonts('laboratory-light');
 await toggle('.language-toggle');await chinese();await toggle('.theme-toggle');await shot('laboratory-dark-en');
 for(const width of [390,768,1440]){await page.setViewportSize({width,height:960});for(const path of ['','#/chain','#/cases','#/stage/geology','#/guide']){await page.goto(base+path);await page.locator('main').waitFor();if(path==='#/cases')await page.locator('.preview-surface canvas').waitFor();await overflow();await chinese();await fonts(`${width}:${path}`)}await page.goto(base+'#/cases');await page.locator('.preview-surface canvas').waitFor();await shot(`library-en-${width}`);results.push({test:'responsive-english',width,overflow:false})}
 await page.setViewportSize({width:390,height:900});await page.goto(base);await page.locator('.mobile-menu button').click();await expect(page.locator('nav')).toBeVisible();await shot('mobile-navigation');await page.locator('.site-header nav a').nth(2).click();await expect(page.locator('.mobile-menu button')).toHaveAttribute('aria-expanded','false');await toggle('.language-toggle');await toggle('.theme-toggle');await page.locator('.preview-surface canvas').waitFor();await shot('library-mobile-light');await fonts('mobile-zh');
 await page.locator('[data-case-id="welllog-layer"] .case-selector').click();await page.frameLocator('iframe').locator('#logsvg').waitFor();await overflow();results.push({test:'mobile-navigation-and-welllog',passed:true});
 assert.deepEqual(errors,[]);assert.deepEqual(fontIssues,[]);
}finally{fs.writeFileSync('docs/field-experience-results.json',JSON.stringify({base,results,fontIssues,errors},null,2));console.log(JSON.stringify({results,fontIssues,errors},null,2));await browser.close()}
