import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:5173/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[],results=[],shots='.visual-work/verified';fs.mkdirSync(shots,{recursive:true});
const page=await browser.newPage({viewport:{width:1580,height:1100},reducedMotion:'reduce'});page.setDefaultTimeout(20000);
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
const pixels=()=>page.locator('.geo-viewport canvas').evaluate(c=>c.toDataURL());
async function shot(name){await page.locator('.cinema-hero').screenshot({path:shots+'/'+name+'.png'});}
async function tool(selector){if(!await page.locator(selector).isVisible())await page.locator('.mobile-menu button').click();await page.locator(selector).click();if(await page.locator('.mobile-menu button').isVisible())await page.keyboard.press('Escape');}
try{
 await page.goto(base);await expect(page.locator('.cinematic-explorer')).toHaveAttribute('data-ready','true');await shot('home-dark');
 const first=await pixels();await page.getByRole('button',{name:'02 透视储层',exact:true}).click();await expect(page.locator('.cinematic-explorer')).toHaveAttribute('data-mode','reservoir');await expect.poll(pixels).not.toBe(first);await shot('reservoir');
 let before=await pixels();await page.getByRole('button',{name:'03 追踪井轨迹',exact:true}).click();await expect.poll(pixels).not.toBe(before);await shot('well-trajectory');
 before=await pixels();await page.locator('.geology-scene .scene-controls button').first().click();await expect.poll(pixels).not.toBe(before);await expect(page.locator('.cinematic-explorer')).toHaveAttribute('data-exploded','true');await shot('exploded');
 results.push({test:'three-distinct-real-3d-viewpoints-and-layer-separation',passed:true});
 before=await pixels();await page.locator('.geology-scene .scene-controls button').nth(3).click();await expect.poll(pixels).not.toBe(before);await expect(page.locator('.geo-viewport')).toHaveAttribute('data-effects','false');
 await page.locator('.geology-scene .scene-controls button').nth(3).click();await page.locator('.geology-scene .layer-picker button').nth(3).click();await expect(page.locator('.cinematic-explorer')).toHaveAttribute('data-selected','3');
 await page.locator('.geology-scene button[aria-label="重置三维视角"]').click();await expect(page.locator('.cinematic-explorer')).toHaveAttribute('data-mode','survey');
 await page.locator('.geo-viewport').focus();before=await pixels();await page.keyboard.press('ArrowLeft');await expect.poll(pixels).not.toBe(before);await page.keyboard.press('+');results.push({test:'effects-layer-selection-reset-and-keyboard-navigation',passed:true});
 await page.locator('.cinema-fullscreen').click();await expect.poll(()=>page.evaluate(()=>Boolean(document.fullscreenElement))).toBe(true);await page.screenshot({path:shots+'/fullscreen.png'});await page.evaluate(()=>document.exitFullscreen());await expect.poll(()=>page.evaluate(()=>Boolean(document.fullscreenElement))).toBe(false);results.push({test:'native-fullscreen-enters-and-restores-layout',passed:true});
 await tool('.theme-toggle');await shot('home-light');await tool('.language-toggle');
 for(const width of [390,768,1580,1920]){
  await page.setViewportSize({width,height:1100});await page.waitForTimeout(150);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow '+width);
  if(width<=900){const copy=await page.locator('.hero-actions').boundingBox(),scene=await page.locator('.geology-scene').boundingBox();assert.ok(scene.y>=copy.y+copy.height+10,'Translated copy overlaps the scene');}
  const chinese=(await page.locator('.cinema-hero').innerText()).split('\n').filter(s=>/[\u3400-\u9fff]/.test(s));assert.deepEqual(chinese,[]);
  const bounds=await page.locator('.geology-scene .scene-controls button').evaluateAll(nodes=>nodes.map(n=>{const b=n.getBoundingClientRect();return {left:b.left,right:b.right,width:b.width,height:b.height}}));assert.ok(bounds.every(b=>b.left>=0&&b.right<=width+1&&b.height>=44));
  await shot('english-'+width);results.push({test:'readable-bilingual-responsive-controls',width,passed:true});
 }
 await page.goto(base+'#/chain');await page.locator('.field-viewport').scrollIntoViewIfNeeded();await expect(page.locator('.field-model')).toHaveAttribute('data-ready','true');await expect(page.locator('.field-hotspot')).toHaveCount(13);await page.locator('.field-workspace').screenshot({path:shots+'/field-light-en.png'});
 await page.locator('.chapter-search input').fill('first');await expect(page.locator('.chapter-row.scene-node').first()).toBeVisible();results.push({test:'new-scene-keeps-chapter-search-and-13-stations',passed:true});
 const animated=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});animated.on('pageerror',e=>errors.push(e.message));await animated.goto(base);await expect(animated.locator('.cinematic-explorer')).toHaveAttribute('data-ready','true');const animatedPixels=()=>animated.locator('.geo-viewport canvas').evaluate(c=>c.toDataURL());const moving=await animatedPixels();await expect.poll(animatedPixels).not.toBe(moving);await animated.locator('.motion-toggle').click();await animated.waitForTimeout(180);const paused=await animatedPixels();await animated.waitForTimeout(250);assert.equal(await animatedPixels(),paused);await animated.close();results.push({test:'real-animation-and-stable-global-pause',passed:true});
 const fallback=await browser.newPage({reducedMotion:'reduce'});await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return String(type).includes('webgl')?null:original.call(this,type,...args)};});await fallback.goto(base);await expect(fallback.locator('.geo-fallback')).toContainText('未启用 WebGL');await fallback.locator('.hero-actions a').first().click();await expect(fallback).toHaveURL(/stage\/geology/);await fallback.close();results.push({test:'webgl-fallback-retains-primary-navigation',passed:true});
 assert.deepEqual(errors,[]);
}finally{fs.writeFileSync('.visual-work/cinematic-results.json',JSON.stringify({base,results,errors},null,2));console.log(JSON.stringify({results,errors},null,2));await browser.close();}
