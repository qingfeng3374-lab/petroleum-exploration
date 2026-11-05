import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:5173/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1050},reducedMotion:'reduce'});
page.setDefaultTimeout(12000);
const errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));
async function tool(selector){if(!await page.locator(selector).isVisible())await page.locator('.mobile-menu button').click();await page.locator(selector).click();if(await page.locator('.mobile-menu button').isVisible())await page.keyboard.press('Escape')}
async function shot(name){await page.screenshot();await page.screenshot({path:`docs/screenshots/fix-${name}.png`})}
const boxes=()=>page.locator('.preparation-item input');
try{
 await page.goto(base+'#/chain');await tool('.theme-toggle');await page.locator('.field-model').scrollIntoViewIfNeeded();await expect(page.locator('.field-model')).toHaveAttribute('data-ready','true');await expect(page.locator('.field-hotspot')).toHaveCount(13);await page.locator('.field-model').screenshot({path:'docs/screenshots/fix-panorama.png'});
 await page.goto(base+'#/scene/w1?case=welllog-layer&tab=bg');await expect(boxes()).toHaveCount(5);await expect(page.locator('.preparation-status strong')).toHaveText('0 / 5');
 await page.locator('.preparation-item').first().click();await expect(boxes().first()).toBeChecked();await expect(page.locator('progress')).toHaveAttribute('value','1');
 await boxes().nth(1).focus();await page.keyboard.press('Space');await expect(page.locator('.preparation-status strong')).toHaveText('2 / 5');await expect(page.locator('progress')).toHaveAttribute('value','2');
 await page.locator('.background-section[data-section=preparation]').evaluate(e=>e.scrollIntoView({block:'start'}));await shot('preparation-light-zh');
 await tool('.language-toggle');await expect(boxes().first()).toBeChecked();await expect(boxes().nth(1)).toBeChecked();assert.ok(!/[\u3400-\u9fff]/.test(await page.locator('.welllog-background').innerText()));await tool('.theme-toggle');await expect(page.locator('.preparation-status strong')).toHaveText('2 / 5');
 await page.locator('.background-section[data-section=preparation]').evaluate(e=>e.scrollIntoView({block:'start'}));await shot('preparation-dark-en');results.push({test:'mouse-keyboard-and-preferences',passed:true});
 for(let i=2;i<5;i++)await boxes().nth(i).check();await expect(page.locator('progress')).toHaveAttribute('value','5');await page.getByRole('button',{name:'Clear selections'}).click();await expect(page.locator('.preparation-status strong')).toHaveText('0 / 5');await expect(page.getByRole('button',{name:'Clear selections'})).toBeDisabled();
 const urls=await page.locator('.preparation-sources a').evaluateAll(a=>a.map(e=>({href:e.href,target:e.target,rel:e.rel})));
 assert.deepEqual(urls.map(x=>x.href),['https://github.com/bolgebrygg/Force-2020-Machine-Learning-competition','https://www.kgs.ku.edu/Magellan/Logs/']);assert.ok(urls.every(x=>x.target==='_blank'&&x.rel.includes('noopener')));results.push({test:'clear-and-dataset-links',passed:true});
 for(const language of ['en','zh']){if(language==='zh')await tool('.language-toggle');for(const width of [390,768,1440]){await page.setViewportSize({width,height:1000});await boxes().first().check();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));const small=await page.locator('.welllog-preparation').evaluate(el=>[...el.querySelectorAll('*')].filter(e=>e.getClientRects().length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(e).fontSize)<15).map(e=>e.textContent));assert.deepEqual(small,[]);if(width===390){await page.locator('.background-section[data-section=preparation]').evaluate(e=>e.scrollIntoView({block:'start'}));await shot(`preparation-mobile-${language}`)}results.push({test:'readable-responsive',language,width,passed:true})}}
 await page.reload();await expect(page.locator('.preparation-status strong')).toHaveText('0 / 5');await boxes().first().check();await page.locator('.tabs a').nth(1).click();await expect(page.locator('.preparation-checklist')).toHaveCount(0);await page.locator('.tabs a').first().click();await expect(page.locator('.preparation-status strong')).toHaveText('0 / 5');await page.locator('.tabs a').last().click();await page.frameLocator('iframe').locator('#logsvg').waitFor();results.push({test:'view-lifetime-and-legacy-demo',passed:true});assert.deepEqual(errors,[]);
}finally{fs.writeFileSync('docs/preparation-results.json',JSON.stringify({base,results,errors},null,2));console.log(JSON.stringify({results,errors},null,2));await browser.close()}
