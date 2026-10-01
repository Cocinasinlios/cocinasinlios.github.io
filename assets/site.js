(()=>{
const path=location.pathname.replace(/\/$/,"")||"/";

if(!document.querySelector('link[href="/assets/premium.css"]')){
  const p=document.createElement("link");
  p.rel="stylesheet"; p.href="/assets/premium.css";
  document.head.appendChild(p);
}

const main=document.querySelector("main");
if(main){
  if(!main.id)main.id="main-content";
  if(!document.querySelector(".csl-skip-link")){
    const skip=document.createElement("a");
    skip.className="csl-skip-link";skip.href="#"+main.id;skip.textContent="Saltar al contenido";
    document.body.prepend(skip);
  }
}
document.querySelectorAll("header .navlinks").forEach(n=>n.setAttribute("aria-label","Navegación principal"));

if(!document.querySelector('link[rel="icon"]')){
  const l=document.createElement("link");
  l.rel="icon"; l.href="/assets/favicon.svg"; l.type="image/svg+xml";
  document.head.appendChild(l);
}
if(!document.querySelector('link[rel="manifest"]')){
  const m=document.createElement("link");
  m.rel="manifest"; m.href="/site.webmanifest";
  document.head.appendChild(m);
}

document.querySelectorAll("header .brand").forEach(a=>{
  a.setAttribute("aria-label","Cocina sin líos con Macarena");
  a.innerHTML='<img src="/assets/logo-cocina-sin-lios.svg" alt="Cocina sin líos con Macarena">';
});

const desktopNav=[
  ["/que-cocino.html","Qué cocino"],
  ["/plan-semana.html","Planifica"],
  ["/recetas.html","Recetas"],
  ["/mi-rincon.html","Mi cocina"]
];
document.querySelectorAll("header .navlinks").forEach(n=>{
  n.innerHTML=desktopNav.map(x=>'<a href="'+x[0]+'">'+x[1]+'</a>').join("");
});

const dockNav=[
  ["/que-cocino.html","✦","Hoy"],
  ["/plan-semana.html","🗓","Semana"],
  ["/recetas.html","⌕","Recetas"],
  ["/mi-rincon.html","♡","Mi cocina"]
];
document.querySelectorAll(".global-dock,.dock").forEach(d=>{
  d.setAttribute("aria-label","Navegación rápida");
  d.innerHTML=dockNav.map(x=>'<a href="'+x[0]+'"><span>'+x[1]+'</span>'+x[2]+'</a>').join("");
});

document.querySelectorAll("header .navlinks a,.global-dock a,.dock a").forEach(a=>{
  const p=new URL(a.href,location.origin).pathname.replace(/\/$/,"")||"/";
  if(p===path){
    a.classList.add("active");
    a.setAttribute("aria-current","page");
  }
});

// Keep secondary destinations available without overloading the primary navigation.
if(document.querySelector("footer")&&!document.querySelector("footer .csl-secondary-nav")){
  const s=document.createElement("div");
  s.className="csl-secondary-nav";
  s.innerHTML='<a href="/explora.html">Explora</a> · <a href="/despensa-sin-lios.html">Despensa</a> · <a href="/con-macarena.html">Macarena</a>';
  s.style.cssText="font-size:11px;margin-top:14px;opacity:.88";
  document.querySelector("footer .wrap,footer")?.appendChild(s);
}

// Avoid duplicating legal links on pages that already render them.
if(document.querySelector("footer") &&
   !document.querySelector("footer .footerlinks") &&
   !document.querySelector("footer .csl-legal-links") &&
   !["/privacidad.html","/cookies.html","/uso-y-propiedad.html"].includes(path)){
  const x=document.createElement("div");
  x.className="csl-legal-links";
  x.innerHTML='<a href="/privacidad.html">Privacidad</a> · <a href="/cookies.html">Cookies</a> · <a href="/uso-y-propiedad.html">Uso y propiedad</a>';
  x.style.cssText="font-size:11px;margin-top:18px;opacity:.8";
  document.querySelector("footer .wrap,footer")?.appendChild(x);
}

// Homepage continuity: surface saved local progress only when there is something useful to resume.
if(path==="/"){
  let pantry={},plan=null,favs=[],soon="";
  try{pantry=JSON.parse(localStorage.getItem("csl-despensa-v1")||"{}")}catch(e){}
  try{plan=JSON.parse(localStorage.getItem("csl-plan-semana-v1")||"null")}catch(e){}
  try{favs=JSON.parse(localStorage.getItem("csl-favoritos-v1")||"[]")}catch(e){}
  try{soon=localStorage.getItem("csl-gastar-pronto-v1")||""}catch(e){}
 
  const pantryCount=Object.values(pantry).filter(Boolean).length;
  const cards=[];
  if(plan?.meals?.length){
    cards.push('<a class="resume-card" href="/mi-rincon.html"><small>SEMANA</small><b>'+plan.meals.length+' cenas guardadas</b><span>Ver plan y lista de compra →</span></a>');
  }
  if(pantryCount){
    cards.push('<a class="resume-card" href="/despensa-sin-lios.html#checklist"><small>DESPENSA</small><b>'+pantryCount+' básicos marcados</b><span>Seguir completando →</span></a>');
  }
  if(favs.length){
    cards.push('<a class="resume-card" href="/mi-rincon.html"><small>FAVORITOS</small><b>'+favs.length+' idea'+(favs.length===1?'':'s')+' guardada'+(favs.length===1?'':'s')+'</b><span>Volver a ellas →</span></a>');
  }
  if(soon.trim()){
    cards.push('<a class="resume-card" href="/que-cocino.html?gastar='+encodeURIComponent(soon.trim())+'"><small>GASTAR PRONTO</small><b>'+soon.trim().replace(/[<>&"]/g,"")+'</b><span>Buscar una salida →</span></a>');
  }
  if(recent.length){
    const last=typeof recent[0]==="string"?recent[0]:recent[0]?.slug;
    cards.push('<a class="resume-card" href="'+(last?'/recetas/'+encodeURIComponent(last)+'/':'/recetas.html')+'"><small>RECIENTE</small><b>'+recent.length+' receta'+(recent.length===1?'':'s')+' vista'+(recent.length===1?'':'s')+'</b><span>Retomar la última →</span></a>');
  }
  const section=document.getElementById("csl-resume");
  const grid=document.getElementById("csl-resume-grid");
  if(section&&grid&&cards.length){
    grid.innerHTML=cards.slice(0,4).join("");
    section.hidden=false;
  }
}

// csl-scroll-polish
const header=document.querySelector("header");
const setHeader=()=>header?.classList.toggle("csl-scrolled",scrollY>12);
setHeader();addEventListener("scroll",setHeader,{passive:true});

const revealTargets=document.querySelectorAll(".card,.step,.learn-card,.principle,.route,.box,.info,.statusbox,.related-card,.resume-card,[data-reveal]");
revealTargets.forEach((el,i)=>{el.classList.add("csl-reveal");el.dataset.delay=String(i%4)});
if("IntersectionObserver" in window){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("csl-in");io.unobserve(e.target)}}),{threshold:.08,rootMargin:"0px 0px -35px"});
 revealTargets.forEach(el=>io.observe(el));
}else revealTargets.forEach(el=>el.classList.add("csl-in"));
})();