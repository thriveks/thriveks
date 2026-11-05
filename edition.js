(function(){
'use strict';
const token=new URLSearchParams(location.search).get('_preview');
function previewUrl(path){if(!token||!path.startsWith('/'))return path;const url=new URL(path,location.origin);url.searchParams.set('_preview',token);return url.pathname+url.search+url.hash;}
function init(){
const nav=document.getElementById('site-nav'),button=document.getElementById('menu-toggle');
if(nav&&button){
 const groups=[...nav.querySelectorAll('.nav-group')];
 const isMobile=()=>window.matchMedia('(max-width:1100px)').matches;
 function closeGroups(except){groups.forEach(group=>{if(group!==except){group.open=false;group.querySelector('summary').setAttribute('aria-expanded','false')}})}
 function closeNav(restore=false){closeGroups();nav.classList.remove('open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open menu');if(restore)button.focus()}
 button.addEventListener('click',()=>{const open=!nav.classList.contains('open');if(!open)closeNav();else{nav.classList.add('open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Close menu')}});
 groups.forEach(group=>{
  const summary=group.querySelector('summary');
  group.addEventListener('toggle',()=>{summary.setAttribute('aria-expanded',String(group.open));if(group.open)closeGroups(group)});
  summary.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();closeGroups(group);group.open=true;summary.setAttribute('aria-expanded','true');const links=group.querySelectorAll('a');links[event.key==='ArrowDown'?0:links.length-1]?.focus()}});
  group.addEventListener('keydown',event=>{if(event.key==='Escape'&&group.open){event.preventDefault();event.stopPropagation();group.open=false;summary.setAttribute('aria-expanded','false');summary.focus()}});
  group.addEventListener('focusout',event=>{if(!group.contains(event.relatedTarget)&&!isMobile()){group.open=false;summary.setAttribute('aria-expanded','false')}});
 });
 nav.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();closeNav(isMobile())}});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeNav()));
 document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!button.contains(event.target))closeNav()});
 document.addEventListener('focusin',event=>{if(!nav.contains(event.target)&&event.target!==button)closeNav()});
 window.matchMedia('(max-width:1100px)').addEventListener('change',()=>closeNav());
}
document.querySelectorAll('a[href^="/"]').forEach(a=>a.setAttribute('href',previewUrl(a.getAttribute('href'))));
document.querySelectorAll('img[src^="/"]').forEach(img=>img.setAttribute('src',previewUrl(img.getAttribute('src'))));
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const form=document.getElementById('inquiry-form');
if(form)form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const body=['Name: '+String(d.get('name')||''),'Email: '+String(d.get('email')||''),'Topic: '+String(d.get('topic')||''),'','Message:',String(d.get('message')||'')].join('\n');location.href='mailto:dev@thriveks.com?subject='+encodeURIComponent('Thrive Local inquiry: '+String(d.get('topic')||'Community'))+'&body='+encodeURIComponent(body);});
const filters=document.querySelectorAll('[data-research-filter]'),entries=document.querySelectorAll('[data-topic]');
filters.forEach(button=>button.addEventListener('click',()=>{const key=button.getAttribute('data-research-filter');filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});entries.forEach(e=>e.hidden=key!=='all'&&e.dataset.topic!==key)}));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();