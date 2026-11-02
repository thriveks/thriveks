(function(){
'use strict';
const token=new URLSearchParams(location.search).get('_preview');
function previewUrl(path){if(!token||!path.startsWith('/'))return path;const url=new URL(path,location.origin);url.searchParams.set('_preview',token);return url.pathname+url.search+url.hash;}
function init(){
const nav=document.getElementById('site-nav'),button=document.getElementById('menu-toggle');
if(nav&&button){button.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false')}));}
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