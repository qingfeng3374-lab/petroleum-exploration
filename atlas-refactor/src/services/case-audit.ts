import {validate} from './packages';
export function auditCase(record:any,scenes:any[],methods:Record<string,any>){
  const m=record.manifest,errors=validate(m,scenes);
  const result=errors.map(detail=>({level:'error',detail}));
  if(errors.length||!m||typeof m!=='object')return result;
  const unknown=(m.methods||[]).filter((id:string)=>!methods[id]);if(unknown.length)result.push({level:'error',detail:'未知技术类别：'+unknown.join(', ')});
  for(const [present,detail] of [[m.tabs?.background?.sections?.length,'专业背景'],[m.tabs?.workflow?.steps?.length,'案例流程'],[m.tabs?.demo,'案例演示'],[m.version,'版本'],[m.updated,'更新日期']] as [any,string][])result.push({level:present?'ok':'warn',detail:present?detail:'尚未提供：'+detail});
  if(record.imported){
    const files=record.files||[],demo=m.tabs?.demo;
    const find=(path:string)=>files.find((f:any)=>f.name===path||f.name.endsWith('/'+path)||f.name.split('/').pop()===path.split('/').pop());
    const html=files.find((f:any)=>/\.html?$/i.test(f.name)),script=files.find((f:any)=>/\.(m?js)$/i.test(f.name));
    const mode=demo?.mode&&demo.mode!=='auto'?demo.mode:html?'page':script?'module':demo?.builtin?'builtin':'none';
    if(demo&&mode==='page'&&!(demo.html?find(demo.html):html))result.push({level:'error',detail:'缺少演示入口文件：'+(demo.html||'index.html')});
    if(demo&&mode==='module'){
      const entry=demo.js?find(demo.js):script;
      if(!entry)result.push({level:'error',detail:'缺少演示脚本文件'});
      else if(typeof entry.data==='string')try{new Function(entry.data);if(!/\bmount\b|__CASE_MOUNT__/.test(entry.data))result.push({level:'warn',detail:'演示脚本尚未提供 mount 入口'})}catch{result.push({level:'error',detail:'演示脚本语法错误：'+entry.name})}
    }
    if(demo?.builtin&&demo.builtin!=='welllog-layer')result.push({level:'error',detail:'未知内置演示：'+demo.builtin});
    for(const file of files){
      if(!/\.(html?|css)$/i.test(file.name)||typeof file.data!=='string')continue;
      const pattern=/(?:src|href)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^"')]+)["']?\s*\)/gi;
      for(const match of file.data.matchAll(pattern)){const ref=(match[1]||match[2]||'').trim();if(!ref||/^(data:|https?:|mailto:|tel:|blob:|#|\/\/)/i.test(ref))continue;let path:string;try{path=decodeURIComponent(new URL(ref,'https://case.local/'+file.name).pathname.slice(1))}catch{continue}if(/\.[a-z0-9]{2,5}$/i.test(path)&&!find(path))result.push({level:'warn',detail:'包内资源缺失：'+file.name+' → '+ref})}
      if(/\.css$/i.test(file.name)&&(file.data.match(/{/g)||[]).length!==(file.data.match(/}/g)||[]).length)result.push({level:'warn',detail:'样式大括号不配对：'+file.name});
    }
    const size=files.reduce((sum:number,f:any)=>sum+(f.size||0),JSON.stringify(m).length);
    if(size>6*1024*1024)result.push({level:'error',detail:'案例总大小超过 6 MiB'});
  }
  return result;
}
