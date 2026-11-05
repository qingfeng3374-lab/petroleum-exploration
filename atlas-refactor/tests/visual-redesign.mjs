import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
import { createHash } from 'node:crypto';

const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:5173/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[],results=[];
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',e=>errors.push(e.message));
page.setDefaultTimeout(12000);
const shot=async name=>page.screenshot({path:`docs/screenshots/redesign-${name}.png`});
const digest=async locator=>createHash('sha256').update(await locator.screenshot()).digest('hex');
try {
  await page.goto(base);await page.locator('.geo-viewport canvas').waitFor();
  await page.locator('.motion-toggle').click();
  await expect(page.locator('html')).toHaveClass(/motion-paused/);
  const terrain=page.locator('.geo-viewport canvas');
  await page.waitForTimeout(150);const before=await digest(terrain);
  await page.locator('.scene-controls button').first().click();await page.waitForTimeout(180);
  const after=await digest(terrain);if(before===after)throw Error('Explode did not redraw terrain');
  await page.locator('.geo-viewport').focus();await page.locator('.geo-viewport').press('ArrowRight');await page.waitForTimeout(100);
  if(after===await digest(terrain))throw Error('Keyboard rotation did not redraw terrain');
  await page.locator('.layer-picker button').nth(3).click();
  await expect(page.locator('.layer-readout small')).toContainText('BASEMENT');
  await page.locator('.scene-controls button').last().click();
  await shot('home-desktop');
  results.push({test:'terrain',webgl:true,explode:true,keyboard:true,layerSelection:true});

  await page.locator('.field-model').scrollIntoViewIfNeeded();await expect(page.locator('.field-model')).toHaveAttribute('data-ready','true');await page.locator('.field-hotspot').nth(2).click();
  await expect(page.locator('.field-selection h3')).toContainText('钻井');
  await page.locator('.atlas-explorer').scrollIntoViewIfNeeded();await shot('chain');
  await page.locator('.explorer-modes button').nth(1).click();
  await page.locator('.relation-methods button').nth(3).click();
  await expect(page.locator('.relation-methods button.selected b')).toHaveText('OPT');
  await page.locator('.atlas-explorer').scrollIntoViewIfNeeded();await shot('methods');
  await page.goto(base+'#/cases');
  await expect(page.locator('.experiment-preview')).toHaveAttribute('data-kind','geo');
  await page.locator('.case-workbench').scrollIntoViewIfNeeded();await shot('experiments');
  results.push({test:'home-navigation',stageSelection:true,methodSelection:true,caseSelection:true});

  await page.goto(base+'#/scene/g1?case=geology-lithology&tab=bg');
  let frame=page.frameLocator('iframe');
  await frame.locator('#background').waitFor({state:'visible'});
  await expect(frame.locator('body')).toHaveClass(/embedded/);
  await expect(frame.locator('html')).toHaveClass(/motion-paused/);
  await page.locator('.tabs a').nth(1).click();
  await frame.locator('#workflow').waitFor({state:'visible'});await page.waitForTimeout(250);await frame.locator('#play-steps').click();
  await expect(frame.locator('#play-steps')).toHaveAttribute('aria-pressed','true');
  await expect(frame.locator('#step-count')).toHaveText('02 / 05',{timeout:5000});
  await frame.locator('#play-steps').click();
  await frame.locator('#play-steps').scrollIntoViewIfNeeded();await shot('workflow');
  await page.locator('.tabs a').nth(2).click();
  await frame.locator('#demo').waitFor({state:'visible'});await page.waitForTimeout(250);await frame.locator('.comparison summary').click();await expect(frame.locator('.comparison')).toHaveAttribute('open','');
  await frame.locator('#compare-split').fill('72');
  const split=await frame.locator('#compare-stage').evaluate(el=>el.style.getPropertyValue('--split'));
  if(split!=='72%')throw Error('Comparison control failed');
  await frame.locator('#compare-stage').scrollIntoViewIfNeeded();const bounds=await frame.locator('#compare-stage').boundingBox();await frame.locator('#compare-stage').click({position:{x:bounds.width*.3,y:bounds.height*.5}});await expect(frame.locator('#compare-split')).toHaveValue('30');await shot('comparison');
  await frame.locator('#metrics').scrollIntoViewIfNeeded();await shot('metrics');
  results.push({test:'case-tools',workflowPlayback:true,compareSplit:true,compareDrag:true,embeddedMotion:true});

  await page.goto(base+'#/cases');
  await page.locator('.top>.primary').click();
  await expect(page.locator('.dialog')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  const trapped=await page.evaluate(()=>!!document.activeElement?.closest('.dialog'));
  if(!trapped)throw Error('Dialog focus escaped');
  await shot('import');await page.keyboard.press('Escape');
  await expect(page.locator('.dialog')).toHaveCount(0);
  await expect(page.locator('.top>.primary')).toBeFocused();
  results.push({test:'dialog',focusTrap:true,escape:true,returnFocus:true});

  for(const width of [390,768]){
    await page.setViewportSize({width,height:900});await page.goto(base);
    await page.locator('.geo-viewport canvas').waitFor();
    await shot(`home-${width}`);
    for(const selector of ['.atlas-explorer','.atlas-explorer','.lab-gateway'])await page.locator(selector).scrollIntoViewIfNeeded();
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`Home overflow ${width}`);
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`docs/screenshots/redesign-full-${width}.png`,fullPage:true});
    await page.goto(base+'#/scene/g4?case=geology-fractures&tab=demo');frame=page.frameLocator('iframe');
    await frame.locator('#map0').waitFor();
    await page.locator('iframe').scrollIntoViewIfNeeded();await frame.locator('#map0').scrollIntoViewIfNeeded();await shot(`case-${width}`);
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)||await frame.locator('html').evaluate(el=>el.scrollWidth>innerWidth))throw Error(`Case overflow ${width}`);
    results.push({test:'responsive',width,homeOverflow:false,caseOverflow:false});
  }
  const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:900}});
  const rp=await reduced.newPage();rp.on('pageerror',e=>errors.push(e.message));await rp.goto(base);await rp.locator('.geo-viewport canvas').waitFor();
  await expect(rp.locator('html')).toHaveClass(/motion-paused/);
  const animation=await rp.locator('.wave-glow').evaluate(el=>getComputedStyle(el).animationName);
  if(animation!=='none')throw Error('Reduced motion not respected');
  results.push({test:'reduced-motion',respected:true});await reduced.close();
  await page.setViewportSize({width:1440,height:1000});await page.goto(base);
  await page.locator('.geo-viewport canvas').waitFor();
  for(const selector of ['.atlas-explorer','.atlas-explorer','.lab-gateway','.closing-line'])await page.locator(selector).scrollIntoViewIfNeeded();
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'docs/screenshots/redesign-full-desktop.png',fullPage:true});
  if(errors.length)throw Error(errors.join('\n'));
  fs.writeFileSync('docs/visual-redesign-results.json',JSON.stringify({base,results,errors},null,2));
  console.log(JSON.stringify({results,errors},null,2));
}finally{await browser.close();}
