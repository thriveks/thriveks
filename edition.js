(function(){
'use strict';
const token=new URLSearchParams(location.search).get('_preview');
function previewUrl(path){if(!token||!path.startsWith('/'))return path;const url=new URL(path,location.origin);url.searchParams.set('_preview',token);return url.pathname+url.search+url.hash;}
function init(){
const nav=document.getElementById('site-nav'),button=document.getElementById('menu-toggle');
if(nav&&button){
 const groups=[...nav.querySelectorAll('.nav-group')];
 const breakpoint=window.matchMedia('(max-width:1100px)');
 function setGroup(group,open){
  group.classList.toggle('is-open',open);
  group.querySelector('.nav-toggle').setAttribute('aria-expanded',String(open));
  group.querySelector('.nav-panel').hidden=!open;
 }
 function closeGroups(except){groups.forEach(group=>{if(group!==except)setGroup(group,false)})}
 function syncOverlay(){document.body.classList.toggle('navigation-open',nav.classList.contains('open')||groups.some(g=>g.classList.contains('is-open')))}
 function closeNav(restore=false){closeGroups();nav.classList.remove('open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open menu');syncOverlay();if(restore)button.focus()}
 button.addEventListener('click',()=>{const open=!nav.classList.contains('open');closeNav();if(open){nav.classList.add('open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Close menu');syncOverlay()}});
 groups.forEach(group=>{
  const toggle=group.querySelector('.nav-toggle');
  toggle.addEventListener('click',()=>{const open=!group.classList.contains('is-open');closeGroups();setGroup(group,open);syncOverlay()});
  toggle.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();closeGroups(group);setGroup(group,true);syncOverlay();const links=group.querySelectorAll('a');links[event.key==='ArrowDown'?0:links.length-1]?.focus()}});
  group.addEventListener('keydown',event=>{if(event.key==='Escape'&&group.classList.contains('is-open')){event.preventDefault();event.stopPropagation();setGroup(group,false);syncOverlay();toggle.focus()}});
 });
 nav.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();closeNav(breakpoint.matches)}});
 // Focusout is intentionally not used: Safari may blur a button before a link's click.
 // Focusin has a concrete new target, so it cannot dismiss a panel during a valid click.
 document.addEventListener('focusin',event=>{
  if(!nav.contains(event.target)&&event.target!==button){closeNav();return}
  const group=event.target.closest('.nav-group');
  closeGroups(group);syncOverlay();
 });
 document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!button.contains(event.target))closeNav()});
 // Preserve native link activation; cleanup occurs after the click's default navigation.
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setTimeout(()=>closeNav(),0)));
 breakpoint.addEventListener('change',()=>closeNav());
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