import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],results=[];
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{if(window!==window.top)return;localStorage.setItem('atlas-language','en');localStorage.setItem('atlas-theme','light');localStorage.setItem('atlas-motion','off')});
try{
 await page.goto(base+'#/scene/w1?case=welllog-layer&tab=demo');const frame=page.frameLocator('iframe');
 await expect(frame.locator('.demo h3')).toHaveText('Divide a GR log into geological units');
 assert.equal(await frame.locator('html').evaluate(()=>document.characterSet),'UTF-8');
 for(const theme of ['light','dark']){
  if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.theme-toggle').click();
  await expect(frame.locator('html')).toHaveAttribute('data-theme',theme);
  const fills=await frame.locator('#logsvg>rect').first().evaluate(el=>({chart:getComputedStyle(el).fill,surface:getComputedStyle(document.documentElement).getPropertyValue('--paper-2').trim()}));
  assert.equal(fills.chart,theme==='light'?'rgb(238, 242, 220)':'rgb(26, 44, 33)');
  await page.locator('iframe').scrollIntoViewIfNeeded();await page.screenshot();await page.waitForTimeout(200);
  await page.screenshot({path:`docs/screenshots/preferences-welllog-${theme}-en.png`});
  results.push({theme,utf8:true,englishHeading:true,chartBackground:fills.chart});
 }
 for(const width of [390,768,1440]){await page.setViewportSize({width,height:1000});await page.waitForTimeout(120);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.ok(await frame.locator('html').evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));results.push({width,overflow:false})}
 assert.deepEqual(errors,[]);fs.writeFileSync('docs/legacy-appearance-results.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors},null,2));
}finally{await browser.close()}
