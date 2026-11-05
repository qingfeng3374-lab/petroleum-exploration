import {setupPresentation} from './presentation';
import css from './legacy-presentation.css?inline';
document.head.insertAdjacentHTML('beforeend',`<style>${css}</style>`);
const teaching=document.createElement('aside');teaching.className='classic-method-lesson';teaching.innerHTML='<h2>经典算法对照：动态规划分层</h2><p>这是结构优化算法，不是从标注样本训练的学习模型。</p><div><section><b>WHAT</b><p>使用动态规划最小化分段拟合误差与分层惩罚。</p></section><section><b>WHY</b><p>层界需要同时考虑段内一致性与层数，不能只逐点判断曲线高低。</p></section><section><b>HOW</b><p>GR 曲线 → 区间平方误差 → 全局最优分段 → 调节惩罚并对照层界。</p></section></div><p>曲线、层界和误差的联动用于检查结构约束的作用，不能当成真实地层解释结论。</p>';document.querySelector('main')!.prepend(teaching);
const teachingStyle=document.createElement('style');teachingStyle.textContent='.classic-method-lesson{padding:20px 0;border-bottom:1px solid var(--line,#71947d);margin-bottom:22px}.classic-method-lesson>div{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.classic-method-lesson p{font-size:17px!important;line-height:1.9}.classic-method-lesson b{font-size:21px;color:var(--gold,#e9b677)}.classic-method-lesson h2{font-size:26px}@media(max-width:700px){.classic-method-lesson>div{grid-template-columns:1fr}}';document.head.append(teachingStyle);
setupPresentation();
const resize=()=>parent.postMessage({atlas:true,type:'resize',h:document.querySelector('main')!.getBoundingClientRect().height+24},'*');
new ResizeObserver(resize).observe(document.body);
parent.postMessage({atlas:true,type:'ready'},'*');
