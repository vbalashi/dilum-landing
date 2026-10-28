import {realpath, readFile} from 'node:fs/promises';
import path from 'node:path';
const types={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml'};
export function editorialMedia(directory) {
 return {name:'private-editorial-media',apply:'serve',configureServer(server){
  if(!directory)return;
  server.middlewares.use('/images/',async(req,res,next)=>{
   if(!['GET','HEAD'].includes(req.method||''))return next();
   try{
    const base=await realpath(directory);
    const filename=await realpath(path.resolve(base,decodeURIComponent((req.url||'').split('?')[0]).replace(/^\/+/,'')));
    if(!filename.startsWith(base+path.sep)) {res.statusCode=404;res.end();return;}
    const type=types[path.extname(filename).toLowerCase()];
    if(!type)return next();
    res.setHeader('Content-Type',type);res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.end(req.method==='HEAD'?undefined:await readFile(filename));
   }catch{return next();}
  });
 }};
}
