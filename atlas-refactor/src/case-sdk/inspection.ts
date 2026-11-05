import {neighbors,skeleton} from './algorithms';
import type {CaseDef} from '../domain';
import {toleranceScore} from './spatial';
const palette=['#d77736','#087e64','#844fa2'];
export function featureSpace(result:any,def:CaseDef){
  const samples=result.test.samples;
  const xs=samples.map((p:any)=>p.f[0]),ys=samples.map((p:any)=>p.f[1]);
  const xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(...ys),ymax=Math.max(...ys);
  const x=(v:number)=>45+(v-xmin)/(xmax-xmin||1)*360;
  const y=(v:number)=>185-(v-ymin)/(ymax-ymin||1)*160;
  return '<svg viewBox="0 0 440 230" aria-label="观测特征散点图"><path d="M45 20V185H410" stroke="#b9a98e" fill="none"/>'+samples.map((p:any,i:number)=>({p,i})).filter(({i}:any)=>i%7===0).map(({p,i}:any)=>'<circle data-pixel="'+i+'" tabindex="0" role="button" aria-label="检查像元 '+p.x+','+p.y+'" cx="'+x(p.f[0])+'" cy="'+y(p.f[1])+'" r="3" fill="'+palette[result.pred[i]]+'" opacity=".7"/>').join('')+'<text x="45" y="203" font-size="10">'+xmin.toFixed(2)+'</text><text x="380" y="203" font-size="10">'+xmax.toFixed(2)+'</text><text x="5" y="28" font-size="10">'+ymax.toFixed(2)+'</text><text x="5" y="185" font-size="10">'+ymin.toFixed(2)+'</text><text x="130" y="225" font-size="12">'+(result.test.image?'暗度 / 无量纲':'观测通道 1 / 无量纲')+'</text><text x="45" y="14" font-size="11">'+(result.test.image?'局部暗脊响应':'观测通道 2')+' · 按预测着色</text></svg>';
}
export function probeText(result:any,def:CaseDef,i:number){
  const p=result.test.samples[i],head='像元 ('+p.x+', '+p.y+') · 特征 ['+p.f.map((v:number)=>v.toFixed(2)).join(', ')+'] · 预测 '+def.classes[result.pred[i]]+' · 真值 '+def.classes[result.test.truth[i]];
  if(result.scores)return head+' · 距离异常分数 '+result.scores[i].toFixed(3)+'（非概率）';
  if(result.prob)return head+' · 分类分数 '+result.prob[i].toFixed(3)+'（未经概率校准）';
  if(def.kind==='knn')return head+' · 最近邻投票：'+neighbors(result.std.train,result.labels,result.std.test[i],result.param).map(n=>def.classes[n.label]+' / 距离 '+Math.sqrt(n.d).toFixed(2)).join('；');
  return head;
}
export function extraMetrics(result:any,kind:string){
  if(kind==='line'||kind==='fracture'){const t=toleranceScore(result.pred,result.test.truth,result.test.width);return '±2 像元容差：精确率 '+t.precision.toFixed(3)+' / 召回率 '+t.recall.toFixed(3)+'。这是邻域匹配，不代表独立线段识别准确率。'}
  if(kind==='geo'){const top=result.scores.map((v:number,i:number)=>({v,i})).sort((a:any,b:any)=>b.v-a.v).slice(0,20);return '前 20 个高分点的异常命中比例 Precision@20：'+(top.reduce((sum:number,p:any)=>sum+result.test.truth[p.i],0)/20).toFixed(3)+'。仅在本例保留合成真值时计算。'}
  if(kind==='map')return '面积合并修改 '+result.pred.filter((v:number,i:number)=>v!==result.rawPred[i]).length+' 个像元。最小面积 '+result.param+' 像元；扩大面积可能误合并真实小区域。';
  return '';
}
export function addInspection(result:any,def:CaseDef){
  let host=document.getElementById('inspection');
  if(!host){host=document.createElement('article');host.id='inspection';document.querySelector('#demo .two')!.after(host)}
  host.innerHTML='<p>'+extraMetrics(result,def.kind)+'</p><h3>把观测放进特征空间</h3><div class="two"><div>'+featureSpace(result,def)+'</div><div><p>点选散点可定位同一个像元。位置由两个观测特征决定，颜色来自预测；特征重叠意味着分类依据不足。</p>'+(result.scores?'<h3>优先复查的十个样点 · 点击定位</h3><div class="sample-list">'+result.scores.map((v:number,i:number)=>({v,i})).sort((a:any,b:any)=>b.v-a.v).slice(0,10).map((p:any)=>'<button data-pixel="'+p.i+'">('+p.i%result.test.width+', '+Math.floor(p.i/result.test.width)+') · '+p.v.toFixed(2)+'</button>').join('')+'</div>':'<p>各类 IoU：'+result.m.iou.map((v:number,i:number)=>def.classes[i]+' '+v.toFixed(3)).join('；')+'</p>')+'</div></div>';
}
export function highlightDirection(result:any,bin:number){
  const c=document.getElementById('map1') as HTMLCanvasElement,ctx=c.getContext('2d')!;
  const mask=skeleton(result.pred,result.test.width),w=result.test.width;ctx.fillStyle='#fff';
  mask.forEach((v:number,i:number)=>{if(!v)return;let xx=0,xy=0;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const j=i+dy*w+dx;if(j>=0&&j<mask.length&&Math.abs(j%w-i%w)<=2&&mask[j]){xx+=dx*dx-dy*dy;xy+=2*dx*dy}}const angle=(Math.atan2(xy,xx)/2+Math.PI)%Math.PI;if(Math.min(11,Math.floor(angle/Math.PI*12))===bin)ctx.fillRect(i%w*10,Math.floor(i/w)*10,8,8)});
}
export function clusterView(result:any,iteration:number){
  const samples=result.geoStd.test,centers=result.history[iteration];
  const all=[...samples.map((p:any)=>p.f),...result.history.flat()];
  const ranges=[0,1].map(j=>[Math.min(...all.map((p:any)=>p[j])),Math.max(...all.map((p:any)=>p[j]))]);
  const x=(v:number)=>30+(v-ranges[0][0])/(ranges[0][1]-ranges[0][0]||1)*380;
  const y=(v:number)=>150-(v-ranges[1][0])/(ranges[1][1]-ranges[1][0]||1)*130;
  return '<path d="M30 15V150H420" stroke="#b9a98e" fill="none"/>'+samples.filter((_:any,i:number)=>i%12===0).map((p:any)=>'<circle cx="'+x(p.f[0])+'" cy="'+y(p.f[1])+'" r="2" fill="#aa9a83" opacity=".4"/>').join('')+centers.map((c:number[],i:number)=>'<path d="M'+(x(c[0])-6)+' '+y(c[1])+'h12M'+x(c[0])+' '+(y(c[1])-6)+'v12" stroke="hsl('+i*65+' 70% 35%)" stroke-width="3"/>').join('')+'<text x="35" y="175" font-size="11">实际保存的第 '+(iteration+1)+' 次更新中心 · 标准化通道 1 / 2 投影</text>';
}
