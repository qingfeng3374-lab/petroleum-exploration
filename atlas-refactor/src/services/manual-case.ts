export type CaseMetadata={title:string;id:string;sceneId:string;methods:string[];version:string;updated:string};
export type CaseStep={name:string;do:string;effect:string;trap:string};
export const emptyMetadata=():CaseMetadata=>({title:'',id:'',sceneId:'',methods:[],version:'1.0.0',updated:new Date().toLocaleDateString('sv-SE')});
export function applyMetadata(record:any,metadata:CaseMetadata,scenes:any[]){
 const fields={...metadata,title:metadata.title.trim(),id:metadata.id.trim(),methods:metadata.methods.length?[...metadata.methods]:[...(scenes.find(s=>s.id===metadata.sceneId)?.methods||[])]};
 return {...record,id:fields.id,imported:true,manifest:{...record.manifest,...fields}};
}
export function createManualCase(metadata:CaseMetadata,content:{intro:string;html:string;steps:CaseStep[];demo:string},scenes:any[]){
 const hasBackground=content.html.replace(/<[^>]*>/g,'').trim()||/<(?:img|svg)\b/i.test(content.html);
 const demo=content.demo.trim();
 const backgroundHTML=/<[a-z][^>]*>/i.test(content.html)?content.html:'<p>'+content.html.replace(/\n/g,'<br>')+'</p>';
 const record={manifest:{tabs:{background:{label:'专业背景',lede:content.intro.trim(),sections:hasBackground?[{title:metadata.title.trim(),html:backgroundHTML}]:[]},workflow:{label:'案例流程',title:metadata.title.trim(),steps:content.steps.filter(s=>Object.values(s).some(v=>v.trim()))},...(demo?{demo:{mode:'page',html:'demo/index.html'}}:{})}},files:demo?[{name:'demo/index.html',enc:'text',mime:'text/html',size:new TextEncoder().encode(demo).length,data:demo}]:[]};
 return applyMetadata(record,metadata,scenes);
}
