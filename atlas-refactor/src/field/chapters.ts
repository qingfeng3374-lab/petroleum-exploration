import {hierarchy} from 'd3-hierarchy';
import {linkHorizontal} from 'd3-shape';
import {chapters} from './knowledge';
export interface ChapterNode {id:string;name:string;kind:'root'|'chapter'|'stage'|'scene';count?:number;index?:number;stageId?:string;methods?:string[];children?:ChapterNode[]}
export function chapterData(stages:any[],translate:(s:string)=>string):ChapterNode {
  return {id:'root',name:'',kind:'root',children:chapters.map(group=>({id:group.id,name:translate(group.name),kind:'chapter',count:group.indices.reduce((n,i)=>n+(stages[i]?.scenes.length||0),0),children:group.indices.flatMap(i=>{const stage=stages[i];return stage?[{id:'stage-'+stage.id,name:stage.name,kind:'stage' as const,index:i,stageId:stage.id,count:stage.scenes.length,children:stage.scenes.map((s:any)=>({id:'scene-'+s.id,name:s.name,kind:'scene',stageId:stage.id,index:i,methods:s.methods}))}]:[]})}))};
}
export function chapterLayout(data:ChapterNode,expanded:Set<string>,query='') {
  const term=query.trim().toLocaleLowerCase();
  function prune(n:ChapterNode,inherited=false):ChapterNode|undefined {const matched=inherited||n.name.toLocaleLowerCase().includes(term),children=n.children?.flatMap(c=>{const kept=prune(c,matched);return kept?[kept]:[]});return matched||children?.length?{...n,children}:undefined}
  const children=(n:ChapterNode):ChapterNode[]|undefined=>{
    if(!n.children)return;
    if(term)return n.children;
    return n.kind==='root'||expanded.has(n.id)?n.children:undefined;
  };
  const root=hierarchy(term?prune(data)||{...data,children:[]}:data,children);const rows: {data:ChapterNode;depth:number;x:number;y:number;parentId?:string}[]=[];
  root.eachBefore(n=>{if(n.depth)rows.push({data:n.data,depth:n.depth,x:20+(n.depth-1)*24,y:rows.length*58+29,parentId:n.parent?.data.id})});
  const byId=new Map(rows.map(row=>[row.data.id,row]));
  const link=linkHorizontal<any,any>().x(n=>n.x).y(n=>n.y);
  const links=rows.flatMap(row=>{const parent=byId.get(row.parentId||'');return parent?[{id:row.data.id,path:link({source:parent,target:row})||'',stageId:row.data.stageId}]:[]});
  return {rows,links,height:Math.max(116,rows.length*58),total:rows.filter(n=>n.data.kind==='scene').length};
}
