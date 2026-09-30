(()=>{
const path=location.pathname.replace(/\/$/,"")||"/";

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
  ["/explora.html","Explora"],
  ["/que-cocino.html","Qué cocino"],
  ["/recetas.html","Recetas"],
  ["/plan-semana.html","Planifica"],
  ["/despensa-sin-lios.html","Despensa"],
  ["/mi-rincon.html","Mi cocina"],
  ["/con-macarena.html","Macarena"]
];
document.querySelectorAll("header .navlinks").forEach(n=>{
  n.innerHTML=desktopNav.map(x=>'<a href="'+x[0]+'">'+x[1]+'</a>').join("");
});

const dockNav=[
  ["/explora.html","✦","Explora"],
  ["/que-cocino.html","🎲","Qué cocino"],
  ["/plan-semana.html","🗓","Planifica"],
  ["/despensa-sin-lios.html","🥫","Despensa"],
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

// Minimal cookieless product instrumentation.
// Events are aggregated locally on this device. If a same-origin endpoint is configured
// later with <meta name="csl-analytics-endpoint" content="...">, the same anonymous
// event payload can be delivered with sendBeacon without changing page code.
const usageKey="csl-usage-v1";
function cleanValue(v){return String(v??"").slice(0,120).replace(/[<>]/g,"")}
function track(name,detail={}){
  const event={
    event:cleanValue(name),
    path,
    target:cleanValue(detail.target||""),
    source:document.referrer?(new URL(document.referrer,location.href).origin===location.origin?"internal":"external"):"direct",
    viewport:innerWidth<600?"mobile":innerWidth<950?"tablet":"desktop",
    ts:Date.now()
  };
  try{
    const usage=JSON.parse(localStorage.getItem(usageKey)||'{"counts":{},"recent":[]}');
    usage.counts=usage.counts||{};
    const key=event.event+"|"+event.path+(event.target?"|"+event.target:"");
    usage.counts[key]=(usage.counts[key]||0)+1;
    usage.recent=[event,...(usage.recent||[])].slice(0,80);
    localStorage.setItem(usageKey,JSON.stringify(usage));
  }catch(e){}
  const endpoint=document.querySelector('meta[name="csl-analytics-endpoint"]')?.content;
  if(endpoint&&endpoint.startsWith("/")&&navigator.sendBeacon){
    try{navigator.sendBeacon(endpoint,new Blob([JSON.stringify(event)],{type:"application/json"}))}catch(e){}
  }
}
window.CSLTrack=track;
track("page_view");

document.addEventListener("click",e=>{
  const el=e.target.closest("a,button");
  if(!el)return;
  if(el.matches("[data-fav],#fav"))return track("favorite_toggle");
  if(el.matches("[data-swap]"))return track("plan_swap");
  if(el.id==="save"&&path==="/plan-semana.html")return track("plan_save");
  if(el.id==="go"&&path==="/plan-semana.html")return track("plan_generate");
  if(el.id==="again"&&path==="/plan-semana.html")return track("plan_regenerate");
  if(el.id==="go"&&path==="/que-cocino.html")return track("meal_picker_generate");
  if(el.id==="again"&&path==="/que-cocino.html")return track("meal_picker_regenerate");
  if(el.matches(".week-add,#week,#week2"))return track("add_to_week");
  if(el.id==="share"||el.id==="shareIdeas"||el.id==="shareShopping")return track("share");
  if(el.id==="useSoonGo")return track("use_soon");
  if(el.tagName==="A"){
    const u=new URL(el.href,location.href);
    if(u.origin===location.origin){
      const target=u.pathname+(u.search||"");
      if(u.pathname==="/receta.html")return track("recipe_open",{target});
      if(["/que-cocino.html","/plan-semana.html","/despensa-sin-lios.html","/mi-rincon.html","/recetas.html"].includes(u.pathname))return track("tool_open",{target:u.pathname});
      return track("internal_nav",{target:u.pathname});
    }
  }
});

// Homepage continuity: surface saved local progress only when there is something useful to resume.
if(path==="/"){
  let pantry={},plan=null,favs=[],soon="",recent=[];
  try{pantry=JSON.parse(localStorage.getItem("csl-despensa-v1")||"{}")}catch(e){}
  try{plan=JSON.parse(localStorage.getItem("csl-plan-semana-v1")||"null")}catch(e){}
  try{favs=JSON.parse(localStorage.getItem("csl-favoritos-v1")||"[]")}catch(e){}
  try{soon=localStorage.getItem("csl-gastar-pronto-v1")||""}catch(e){}
  try{recent=JSON.parse(localStorage.getItem("csl-recent-recipes-v1")||"[]")}catch(e){}
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
})();