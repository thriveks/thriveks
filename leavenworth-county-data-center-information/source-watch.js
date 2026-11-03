(function(){
"use strict";
var ENDPOINT="https://thriveks-bluestem-watch.thriveks.workers.dev/status";
var ALLOWED=new Set(["bluestemdatacenter.com","files.leavenworthcounty.gov","citizenportal.ai","www.citizenportal.ai"]);
function txt(parent,tag,value,cls){
  var el=document.createElement(tag);
  if(cls)el.className=cls;
  el.textContent=String(value||"");
  parent.appendChild(el);
  return el;
}
function date(iso){
  if(!iso)return "Not yet verified";
  var dt=new Date(iso);
  if(isNaN(dt.getTime()))return "Unknown";
  return new Intl.DateTimeFormat("en-US",{dateStyle:"medium",timeStyle:"short",timeZone:"America/Chicago"}).format(dt)+" CT";
}
function link(parent,label,url){
  try{
    var parsed=new URL(url);
    if(parsed.protocol!=="https:"||!ALLOWED.has(parsed.hostname))return;
    var a=txt(parent,"a",label);
    a.href=parsed.href;
    a.target="_blank";
    a.rel="noopener noreferrer";
  }catch(_){}
}
function render(data){
  var host=document.getElementById("bluestem-source-watch-body");
  if(!host)return;
  host.replaceChildren();
  var sources=Array.isArray(data.sources)?data.sources:[];
  var ok=sources.filter(function(s){return s.checkStatus==="ok";}).length;
  txt(host,"p","Latest automatic check: "+date(data.lastAttemptAt)+". "+ok+" of "+sources.length+" source collections accessible.", "source-watch-meta");
  var grid=txt(host,"div","","source-watch-grid");
  sources.forEach(function(s){
    var item=txt(grid,"div","","source-watch-source");
    txt(item,"strong",s.label);
    var msg=s.checkStatus==="ok"?"Source listing checked": "Automated access unavailable";
    if(s.changeDetected&&s.checkStatus==="ok")msg+="; change detected — editorial review needed";
    txt(item,"small",msg);
    link(item,"Open source",s.url);
  });
  var developer=sources.find(function(s){return s.id==="developer-newsroom";});
  if(developer&&Array.isArray(developer.latestLinks)&&developer.latestLinks.length){
    txt(host,"h3","Developer newsroom: latest visible posts","source-watch-heading");
    var list=txt(host,"ul","","source-watch-feed");
    developer.latestLinks.slice(0,6).forEach(function(entry){
      var item=txt(list,"li","");
      link(item,entry.title,entry.url);
    });
    txt(host,"p","These are developer/newsroom publications, not verified County decisions.","source-watch-meta");
  }
  if(ok!==sources.length)txt(host,"p","Some official sources cannot currently be checked automatically. The absence of a detected change does not establish that the County has taken no new action. Review the County documents and meeting recordings directly.","source-watch-note");
  if(sources.some(function(s){return s.changeDetected;}))txt(host,"p","One or more monitored source listings changed. The historical timeline will remain unchanged until the underlying record is reviewed and cited.","source-watch-note");
  txt(host,"p","Research conclusions last editorially reviewed: November 3, 2026. Automated checks are not a substitute for verification.","source-watch-meta");
}
async function run(){
  var host=document.getElementById("bluestem-source-watch-body");
  if(!host)return;
  try{
    var response=await fetch(ENDPOINT,{cache:"no-store"});
    if(!response.ok)throw new Error("Monitoring service unavailable");
    var data=await response.json();
    if(data.error||!data.sources)throw new Error("Monitoring service unavailable");
    render(data);
  }catch(_){
    host.replaceChildren();
    txt(host,"p","Automatic source checks are currently unavailable. Use the linked original records below; the historical timeline remains available.","source-watch-note");
  }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true});else run();
})();