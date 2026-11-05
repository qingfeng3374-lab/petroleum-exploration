interface Entry {index:number;parent:number|null;page:string}
const key='petroleum-atlas-navigation-v1';
const pageKey=(hash:string)=>{const [path,query]=hash.split('?');return path+(path.startsWith('#/scene/')?'?case='+(new URLSearchParams(query).get('case')||''):'')};

/** Mark only this app's history entries so Back can skip tabs and safely fall back on deep links. */
export function createNavigation(){
  const read=():Entry|undefined=>{const entry=history.state?.[key];return entry&&Number.isInteger(entry.index)&&typeof entry.page==='string'&&(entry.parent===null||Number.isInteger(entry.parent))?entry:undefined};
  const write=(entry:Entry)=>history.replaceState({...history.state,[key]:entry},'');
  let current=read()||{index:0,parent:null,page:pageKey(location.hash||'#/')};
  write(current);
  return {
    record(hash:string){const restored=read();if(restored){current=restored;return current.parent!==null}const page=pageKey(hash);current={index:current.index+1,parent:page===current.page?current.parent:current.index,page};write(current);return current.parent!==null},
    get canBack(){return current.parent!==null},
    back(fallback:string){
      if(current.parent!==null&&current.parent<current.index)history.go(current.parent-current.index);
      else{const oldURL=location.href;current={index:current.index,parent:null,page:pageKey(fallback)};history.replaceState({...history.state,[key]:current},'',fallback);window.dispatchEvent(new HashChangeEvent('hashchange',{oldURL,newURL:location.href}))}
    }
  };
}
