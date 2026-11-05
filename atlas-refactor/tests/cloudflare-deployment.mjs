import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';

const base=(process.env.ATLAS_TEST_URL||'http://127.0.0.1:8787/').replace(/\/?$/,'/');
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
page.setDefaultTimeout(20000);
try{
  const home=await page.goto(base),html=await home.text();expect(home.status()).toBe(200);
  expect(html).not.toMatch(/src=["'][^"']*\/src\/main\.ts/);
  const compiled=await page.locator('script[type="module"][src]').getAttribute('src');
  const js=await page.request.get(new URL(compiled,base).href);
  expect(js.status()).toBe(200);expect(js.headers()['content-type']).toMatch(/javascript/);
  await expect(page.locator('.cinematic-explorer')).toHaveAttribute('data-ready','true');
  await expect(page.locator('.hero-stats')).toContainText('102');checks.push('compiled JS and 3D homepage load');
  fs.mkdirSync('.wrangler',{recursive:true});await page.screenshot({path:'.wrangler/deployment-home.png'});
  for(const asset of ['favicon.svg','legacy/assets/core/case-demo-host.js','case-archives/geology-lithology.zip','examples/firstbreak-pick-case.zip']){
    const response=await page.request.get(new URL(asset,base).href);expect(response.status()).toBe(200);expect((await response.body()).length).toBeGreaterThan(20);
  }
  expect((await page.request.get(new URL('src/main.ts',base).href)).status()).toBe(404);checks.push('public assets served; source entry is not published');
  await page.goto(base+'#/scene/g1?case=geology-lithology&tab=bg');const frame=page.frameLocator('iframe');
  await expect(frame.locator('#background')).toBeVisible();await page.locator('.tabs a').nth(1).click();await expect(frame.locator('#workflow')).toBeVisible();
  await page.locator('.tabs a').nth(2).click();await expect(frame.locator('#metrics strong').first()).toHaveText('1.000');
  await page.locator('.theme-toggle').click();await expect(frame.locator('html')).toHaveAttribute('data-theme','light');checks.push('case iframe, three tabs, computation and theme');
  await page.goto(base+'#/scene/w1?case=welllog-layer&tab=demo');await expect(page.frameLocator('iframe').locator('#logsvg')).toBeVisible();checks.push('classic well-log case and legacy script');
  await page.goto(base+'legacy/index.html');await expect(page.locator('body')).not.toBeEmpty();checks.push('legacy entry and directory-relative resources load');
  expect(errors).toEqual([]);
  const result={base,checks,errors};fs.writeFileSync('.wrangler/deployment-test-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}finally{await browser.close()}
