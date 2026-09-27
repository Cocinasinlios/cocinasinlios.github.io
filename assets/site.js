(()=>{
const path=location.pathname.replace(/\/$/,"")||"/";
const docks=document.querySelectorAll(".global-dock a,.dock a");
docks.forEach(a=>{
  const p=new URL(a.href,location.origin).pathname.replace(/\/$/,"")||"/";
  if(p===path){a.classList.add("active");a.setAttribute("aria-current","page")}
});
try{
  const seen=JSON.parse(localStorage.getItem("csl_seen")||"[]");
  if(!seen.includes(path)){seen.push(path);localStorage.setItem("csl_seen",JSON.stringify(seen.slice(-20)))}
}catch(e){}

const map={
 "/":["/explora.html","/que-cocino.html"],
 "/explora.html":["/que-cocino.html","/con-macarena.html"],
 "/que-cocino.html":["/recetas.html","/menu-semana.html"],
 "/recetas.html":["/que-cocino.html","/academia.html"],
 "/diagnostico.html":["/academia.html","/con-macarena.html"],
 "/academia.html":["/diagnostico.html","/recetas.html"],
 "/menu-semana.html":["/recetas.html","/que-cocino.html"],
 "/con-macarena.html":["/explora.html","/recetas.html"],
 "/receta-hummus.html":["/academia.html","/diagnostico.html"],
 "/receta-pasta-pesto.html":["/academia.html","/menu-semana.html"],
 "/receta-tortitas.html":["/recetas.html","/que-cocino.html"]
};
const labels={
 "/explora.html":["✦","Explora sin orden","Elige por antojo, duda o curiosidad."],
 "/que-cocino.html":["🎲","¿Qué cocino hoy?","Tres ideas según tu tiempo y tus ganas."],
 "/recetas.html":["🍝","Sigue curioseando recetas","Entra por hambre, no por teoría."],
 "/diagnostico.html":["🧩","Rescate Sin Líos","Si algo falla, mira qué variable revisar."],
 "/academia.html":["🧠","Thermomix por dentro","Entiende el porqué mientras cocinas."],
 "/menu-semana.html":["🗓","Menú de la semana","Cuando lo que necesitas es dejar de improvisar."],
 "/con-macarena.html":["👋","Con Macarena","Conoce cómo te acompañaría de verdad."]
};
const recs=map[path]||["/explora.html","/recetas.html"];
let dismissed=false;
try{dismissed=sessionStorage.getItem("csl_continue_dismissed")==="1"}catch(e){}
if(!dismissed && recs.length){
 const next=recs[0], meta=labels[next]||["→","Sigue explorando","Hay más caminos desde aquí."];
 const box=document.createElement("aside");
 box.className="csl-continue";
 box.innerHTML='<button class="csl-x" aria-label="Cerrar">×</button><a href="'+next+'"><span class="csl-icon">'+meta[0]+'</span><div><small>Sigue por aquí</small><b>'+meta[1]+'</b><p>'+meta[2]+'</p></div><span class="csl-arrow">→</span></a>';
 const style=document.createElement("style");
 style.textContent='.global-dock a.active,.dock a.active{background:rgba(255,255,255,.16)!important}.csl-continue{position:fixed;left:18px;bottom:92px;z-index:110;width:min(360px,calc(100vw - 36px));background:rgba(255,253,250,.97);border:1px solid #e8dfd2;border-radius:21px;box-shadow:0 16px 48px rgba(40,40,34,.16);padding:7px;opacity:0;transform:translateY(12px);pointer-events:none;transition:.28s}.csl-continue.show{opacity:1;transform:none;pointer-events:auto}.csl-continue a{display:grid;grid-template-columns:42px 1fr 20px;gap:10px;align-items:center;padding:9px 12px;color:#25251f;text-decoration:none}.csl-continue small{display:block;font-size:9px;text-transform:uppercase;letter-spacing:1.2px;color:#6d7068;font-weight:900}.csl-continue b{display:block;font-family:Georgia,serif;font-size:18px;line-height:1.05;margin:2px 0}.csl-continue p{font:11px/1.35 Inter,system-ui,sans-serif;color:#6d7068;margin:0}.csl-icon{font-size:23px}.csl-arrow{font-size:20px}.csl-x{position:absolute;right:6px;top:5px;border:0;background:transparent;font-size:18px;color:#777;cursor:pointer;z-index:2}@media(max-width:580px){.csl-continue{bottom:88px}}';
 document.head.appendChild(style);document.body.appendChild(box);
 const show=()=>box.classList.add("show");
 setTimeout(show,9000);
 window.addEventListener("scroll",()=>{if(scrollY>document.documentElement.scrollHeight*.28)show()},{passive:true,once:true});
 box.querySelector(".csl-x").addEventListener("click",()=>{box.remove();try{sessionStorage.setItem("csl_continue_dismissed","1")}catch(e){}});
}
})();