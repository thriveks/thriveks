import { cp, mkdir, rm } from "node:fs/promises";
const items = ["404.html","index.html","work.html","technology.html","showcase.html","research.html","about.html","connect.html","apps.html","business.html","sponsor.html","volunteer.html","board.html","site.css","credit.css","motion.css","polish.css","edition.js","motion.js","assistant.js","favicon.svg","assets","WorkPilot","CodeCompanion","leavenworth-county-data-center-information","legacy-archive","_redirects","_headers","robots.txt"];
await rm("dist",{recursive:true,force:true});
await mkdir("dist",{recursive:true});
for(const item of items)await cp(item,"dist/"+item,{recursive:true});
console.log("ThriveKS V8 static site ready: dist/");
