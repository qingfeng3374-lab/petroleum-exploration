

export async function exportCasePackage(candidate:any){
  const {zipSync,strToU8}=await import('fflate');
  const files:Record<string,Uint8Array>={'case.json':strToU8(JSON.stringify(candidate.manifest,null,2))};
  for(const file of candidate.files||[]){
    if(file.enc==='dataurl'){const encoded=file.data.split(',')[1]||'';files[file.name]=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0))}
    else files[file.name]=strToU8(file.data);
  }
  const bytes=zipSync(files),url=URL.createObjectURL(new Blob([bytes as BlobPart],{type:'application/zip'})),link=document.createElement('a');
  link.href=url;link.download=candidate.id+'.zip';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
