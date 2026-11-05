/** Streaming extraction keeps the same 6 MiB budget as loose-file imports. */
export const PACKAGE_LIMIT=6*1024*1024;
export async function unpackArchive(bytes:Uint8Array){
  if(bytes.length>PACKAGE_LIMIT)throw Error('压缩包超过 6 MiB');
  if(bytes[0]!==0x50||bytes[1]!==0x4b)throw Error('不是有效的 ZIP 压缩包');
  const {Unzip,UnzipInflate}=await import('fflate');
  const files:{name:string;bytes:Uint8Array}[]=[],names=new Set<string>();let total=0,count=0,failure:Error|undefined;
  const decoder=new Unzip(entry=>{
    try{
      const original=entry.name.replace(/\\/g,'/');
      if(original.startsWith('/')||/^[a-z]:/i.test(original)||original.split('/').includes('..'))throw Error('压缩包包含不安全路径');
      const name=original.split('/').filter(p=>p&&p!=='.').join('/');
      if(!name||original.endsWith('/')||name.split('/').includes('__MACOSX')||name.endsWith('.DS_Store'))return;
      if(++count>256)throw Error('压缩包文件数量超过 256');
      if(names.has(name.toLowerCase()))throw Error('压缩包存在重复文件路径');names.add(name.toLowerCase());
      if((entry.originalSize||0)>PACKAGE_LIMIT-total)throw Error('压缩包解压后超过 6 MiB');
      const chunks:Uint8Array[]=[];let size=0;
      entry.ondata=(error,chunk,final)=>{
        if(failure)return;
        if(error){failure=Error('ZIP 解压失败：'+error.message);entry.terminate();return}
        total+=chunk.length;size+=chunk.length;
        if(total>PACKAGE_LIMIT){failure=Error('压缩包解压后超过 6 MiB');entry.terminate();return}
        chunks.push(chunk);
        if(final){const content=new Uint8Array(size);let offset=0;for(const part of chunks){content.set(part,offset);offset+=part.length}files.push({name,bytes:content})}
      };entry.start();
    }catch(error){failure=error as Error;entry.terminate()}
  });decoder.register(UnzipInflate);
  try{for(let at=0;at<bytes.length&&!failure;at+=512)decoder.push(bytes.subarray(at,Math.min(bytes.length,at+512)),at+512>=bytes.length)}catch(error){failure=error as Error}
  if(failure)throw failure;
  if(!files.length||files.length!==count)throw Error('压缩包为空、已损坏或使用了不支持的加密格式');
  return files;
}
export async function readArchive(file:File){
  return (await unpackArchive(new Uint8Array(await file.arrayBuffer()))).map(item=>{
    const copy=new File([item.bytes as BlobPart],item.name,{type:/\.html?$/i.test(item.name)?'text/html':/\.json$/i.test(item.name)?'application/json':''});
    Object.defineProperty(copy,'webkitRelativePath',{value:item.name});return copy;
  });
}
