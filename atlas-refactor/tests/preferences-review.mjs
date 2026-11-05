import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:5174/';
try{
await page.goto(base);await page.locator('.geo-viewport canvas').waitFor();await page.locator('.motion-toggle').click();
await page.locator('.theme-toggle').click();await page.waitForTimeout(300);await page.screenshot({path:'docs/screenshots/preferences-light-zh.png',fullPage:true});
await page.locator('.language-toggle').click();await page.waitForTimeout(300);await page.screenshot({path:'docs/screenshots/preferences-light-en.png',fullPage:true});
const untranslated=await page.evaluate(()=>{const w=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT),out=[];let n;while(n=w.nextNode())if(/[\u3400-\u9fff]/.test(n.textContent))out.push(n.textContent);return out});
const overflow=[];
for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});await page.waitForTimeout(100);overflow.push({width,excess:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)});if(width===390)await page.screenshot({path:'docs/screenshots/preferences-mobile-en.png',fullPage:true})}
await page.setViewportSize({width:1440,height:1000});await page.goto(base+'#/scene/g1?case=geology-lithology&tab=demo');const frame=page.frameLocator('iframe');await frame.locator('#demo').waitFor({state:'visible'});await page.waitForTimeout(1200);await page.screenshot({path:'docs/screenshots/preferences-demo-en.png'});
const caseText=await frame.locator('body').innerText();
await page.locator('.top>button').click();await page.getByRole('tab',{name:'Manual entry'}).click();await page.screenshot({path:'docs/screenshots/preferences-manual-en.png'});
await page.getByRole('button',{name:'Close the add-case dialog'}).click();await page.locator('.tabs a').first().click();await page.waitForTimeout(400);await page.screenshot({path:'docs/screenshots/preferences-background-en.png'});
await page.goto(base+'#/scene/w1?case=welllog-layer&tab=demo');await page.frameLocator('iframe').locator('#c-beta').waitFor();await page.waitForTimeout(1000);await page.locator('iframe').screenshot({path:'docs/screenshots/preferences-welllog-light-en.png'});await page.locator('.theme-toggle').click();await page.waitForTimeout(300);await page.locator('iframe').screenshot({path:'docs/screenshots/preferences-welllog-dark-en.png'});
console.log(JSON.stringify({errors,untranslated,overflow,untranslatedCase:caseText.split('\n').filter(x=>/[\u3400-\u9fff]/.test(x))},null,2));
}finally{await browser.close()}
