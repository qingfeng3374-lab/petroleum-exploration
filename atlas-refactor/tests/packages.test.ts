import {test} from 'node:test';import assert from 'node:assert/strict';import {validate} from '../src/services/packages';
const scenes=[{id:'g1'}];const manifest={id:'a-test',sceneId:'g1',title:'case',tabs:{background:{sections:[{title:'background',html:'<p>text</p>'}]}}};
test('historical background-only manifests remain valid',()=>assert.deepEqual(validate(manifest,scenes),[]));
test('unknown scene, duplicate id and embedded scripts rejected',()=>{assert.ok(validate({...manifest,sceneId:'unknown'},scenes).length);assert.ok(validate(manifest,scenes,[{id:'a-test'}]).length);assert.ok(validate({...manifest,tabs:{background:{sections:[{html:'<script>x</script>'}]}}},scenes).length)});
