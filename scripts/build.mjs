import { cp, mkdir, rm } from "node:fs/promises";
const items = ["index.html","work.html","technology.html","showcase.html","research.html","about.html","connect.html","site.css","edition.js","assistant.js","favicon.svg","assets","_headers","_redirects","robots.txt"];
await rm("dist",{recursive:true,force:true});
await mkdir("dist",{recursive:true});
for(const item of items)await cp(item,"dist/"+item,{recursive:true});
console.log("ThriveKS V8 static site ready: dist/");
