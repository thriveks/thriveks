(()=>{'use strict';
function init(){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-reel]').forEach(section=>{
    const viewport=section.querySelector('[data-reel-track]');
    const slides=[...section.querySelectorAll('[data-reel-card]')];
    const previous=section.querySelector('[data-reel-prev]');
    const next=section.querySelector('[data-reel-next]');
    const dots=section.querySelector('[data-reel-dots]');
    const toggle=section.querySelector('[data-reel-toggle]');
    if(!viewport||slides.length<2||!dots||!toggle)return;
    let selected=0,direction=1,userPaused=reduced,visible=!('IntersectionObserver' in window),hovered=false,focused=false,timer=null,scrolling=false,frame=0;
    function countVisible(){
      if(slides.length<2)return 1;
      const gap=slides[1].offsetLeft-slides[0].offsetLeft-slides[0].offsetWidth;
      return Math.max(1,Math.min(slides.length,Math.round((viewport.clientWidth+gap)/(slides[0].offsetWidth+gap))));
    }
    function maxStart(){return Math.max(0,slides.length-countVisible())}
    function mark(){[...dots.children].forEach((b,i)=>{b.classList.toggle('v9-current',i===selected);b.setAttribute('aria-current',i===selected?'true':'false')})}
    function rebuildDots(){
      const max=maxStart();selected=Math.min(selected,max);dots.replaceChildren();
      for(let i=0;i<=max;i++){const button=document.createElement('button');button.type='button';button.className='v9-dot';button.setAttribute('aria-label','Show projects starting at '+(i+1));button.addEventListener('click',()=>navigate(i,true));dots.appendChild(button)}
      mark();
    }
    function jump(i,animate){
      selected=Math.max(0,Math.min(maxStart(),i));mark();const left=slides[selected].offsetLeft-slides[0].offsetLeft;
      scrolling=true;viewport.scrollTo({left,behavior:animate&&!reduced?'smooth':'auto'});
      window.setTimeout(()=>{scrolling=false},500);
    }
    function stop(){if(timer!==null){clearInterval(timer);timer=null}}
    function mayPlay(){return !reduced&&!userPaused&&!document.hidden&&visible&&!hovered&&!focused&&maxStart()>0}
    function advance(){
      if(selected>=maxStart())direction=-1;
      else if(selected<=0)direction=1;
      jump(selected+direction,true);
    }
    function run(){stop();if(mayPlay())timer=window.setInterval(advance,4600)}
    function navigate(i,animate){jump(i,animate);run()}
    function paintToggle(){
      toggle.setAttribute('aria-pressed',userPaused?'true':'false');
      toggle.setAttribute('aria-label',reduced?'Automatic motion disabled by device preferences':userPaused?'Play automatic project slideshow':'Pause automatic project slideshow');
      section.querySelector('[data-reel-icon]').textContent=userPaused?'▶':'Ⅱ';
      section.querySelector('[data-reel-label]').textContent=reduced?'Reduced motion':userPaused?'Play motion':'Pause motion';
      toggle.disabled=reduced;
    }
    previous?.addEventListener('click',()=>navigate(selected===0?maxStart():selected-1,true));
    next?.addEventListener('click',()=>navigate(selected>=maxStart()?0:selected+1,true));
    toggle.addEventListener('click',()=>{userPaused=!userPaused;paintToggle();run()});
    viewport.addEventListener('mouseenter',()=>{hovered=true;stop()});
    viewport.addEventListener('mouseleave',()=>{hovered=false;run()});
    section.addEventListener('focusin',()=>{focused=true;stop()});
    section.addEventListener('focusout',event=>{if(!section.contains(event.relatedTarget)){focused=false;run()}});
    document.addEventListener('visibilitychange',run);
    if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;run()},{threshold:.15}).observe(section)}
    viewport.addEventListener('scroll',()=>{
      if(scrolling)return;
      if(frame)cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const left=viewport.scrollLeft;let best=0,dist=Infinity;
        for(let i=0;i<=maxStart();i++){const d=Math.abs(slides[i].offsetLeft-slides[0].offsetLeft-left);if(d<dist){dist=d;best=i}}
        selected=best;mark();
      })
    },{passive:true});
    window.addEventListener('resize',()=>{rebuildDots();jump(selected,false);run()},{passive:true});
    rebuildDots();paintToggle();run();
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();