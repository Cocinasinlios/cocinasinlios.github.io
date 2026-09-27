(()=>{
const path=location.pathname.replace(/\/$/,"")||"/";

const style=document.createElement("style");
style.textContent=`
.mag-photo,.card .photo,.day-photo,.hero-photo{position:relative}
.mag-photo:after,.card .photo:after,.day-photo:after,.hero-photo:after{content:"Cocina sin líos · @thermomixsinlios";position:absolute;right:9px;bottom:8px;z-index:4;background:rgba(20,25,21,.50);color:#fff;padding:4px 7px;border-radius:999px;font:700 8px/1.1 Inter,system-ui,sans-serif;letter-spacing:.25px;pointer-events:none}
.global-dock a.active,.dock a.active{background:rgba(255,255,255,.16)!important}
.csl-search-btn,.csl-save-btn{position:fixed;bottom:92px;z-index:121;width:48px;height:48px;border:0;border-radius:50%;background:#fffdfa;color:#26352c;box-shadow:0 12px 35px rgba(40,40,34,.18);font-size:20px;cursor:pointer;border:1px solid #e8dfd2}.csl-search-btn{right:18px}.csl-save-btn{right:74px}.csl-save-btn.saved{background:#f2df9d}.csl-search-btn:focus-visible,.csl-save-btn:focus-visible,.csl-search-close:focus-visible,.csl-search-results a:focus-visible,.csl-x:focus-visible{outline:3px solid #7f9a82;outline-offset:3px}
.csl-search{position:fixed;inset:0;z-index:200;background:rgba(24,28,24,.62);display:none;align-items:flex-start;justify-content:center;padding:9vh 18px 18px}
.csl-search.open{display:flex}.csl-search-box{width:min(720px,96vw);background:#fffdfa;border-radius:28px;padding:22px;box-shadow:0 25px 80px rgba(0,0,0,.28)}
.csl-search-top{display:flex;gap:10px}.csl-search input{width:100%;border:1px solid #e8dfd2;border-radius:999px;padding:14px 17px;font:inherit;outline:none}.csl-search-close{border:0;background:#f0e9df;border-radius:50%;width:46px;min-width:46px;font-size:20px;cursor:pointer}
.csl-search-results{display:grid;gap:8px;margin-top:14px;max-height:55vh;overflow:auto}.csl-search-results a{display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;padding:12px;border-radius:16px;text-decoration:none;color:#25251f}.csl-search-results a:hover{background:#eef5eb}.csl-search-results b{display:block}.csl-search-results small{color:#706f67}.csl-search-results em{font-style:normal;color:#8a8a82}
.csl-continue{position:fixed;left:18px;bottom:92px;z-index:110;width:min(370px,calc(100vw - 36px));background:rgba(255,253,250,.97);border:1px solid #e8dfd2;border-radius:21px;box-shadow:0 16px 48px rgba(40,40,34,.16);padding:7px;opacity:0;transform:translateY(12px);pointer-events:none;transition:.28s}
.csl-continue.show{opacity:1;transform:none;pointer-events:auto}.csl-continue a{display:grid;grid-template-columns:42px 1fr 20px;gap:10px;align-items:center;padding:9px 12px;color:#25251f;text-decoration:none}.csl-continue small{display:block;font-size:9px;text-transform:uppercase;letter-spacing:1.2px;color:#6d7068;font-weight:900}.csl-continue b{display:block;font-family:Georgia,serif;font-size:18px;line-height:1.05;margin:2px 0}.csl-continue p{font:11px/1.35 Inter,system-ui,sans-serif;color:#6d7068;margin:0}.csl-icon{font-size:23px}.csl-arrow{font-size:20px}.csl-x{position:absolute;right:6px;top:5px;border:0;background:transparent;font-size:18px;color:#777;cursor:pointer;z-index:2}
.csl-related{background:#fffdfa;padding:56px 0 72px;border-top:1px solid #e8dfd2}
.csl-related-inner{width:min(1080px,92vw);margin:auto}
.csl-related-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:20px}
.csl-related-head small{display:block;font:900 10px/1.2 Inter,system-ui,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:#687769}
.csl-related-head h2{font:500 38px/1.05 Georgia,serif;margin:6px 0 0;color:#25251f}
.csl-related-head p{max-width:460px;margin:0;color:#706f67;font:13px/1.5 Inter,system-ui,sans-serif}
.csl-related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.csl-related-card{display:flex;gap:14px;align-items:center;border:1px solid #e8dfd2;background:#fbf6ee;border-radius:21px;padding:17px;color:#25251f;text-decoration:none;transition:.2s}
.csl-related-card:hover{transform:translateY(-3px);background:#eef5eb}.csl-related-card:focus-visible{outline:3px solid #7f9a82;outline-offset:3px}
.csl-related-icon{font-size:30px;min-width:38px;text-align:center}
.csl-related-card b{display:block;font:500 21px/1.05 Georgia,serif}.csl-related-card span:last-child{display:block;margin-top:5px;color:#706f67;font:11px/1.35 Inter,system-ui,sans-serif}
@media(max-width:580px){
 .csl-continue{bottom:148px;left:12px;width:calc(100vw - 24px)}
 .csl-search-btn{bottom:91px;right:12px}
 .csl-save-btn{bottom:91px;right:68px}
 .wa-float{display:none!important}
 .csl-related-head{display:block}.csl-related-head p{margin-top:8px}.csl-related-grid{grid-template-columns:1fr}
}
`;
document.head.appendChild(style);

const standardDock=[
 ["/explora.html","✦","Explora"],
 ["/que-cocino.html","🎲","Qué cocino"],
 ["/recetas.html","🍝","Recetas"],
 ["/diagnostico.html","🧩","Rescate"],
 ["/mi-rincon.html","♡","Mi rincón"]
];
document.querySelectorAll(".global-dock,.dock").forEach(d=>{
 d.setAttribute("aria-label","Navegación rápida");
 d.innerHTML=standardDock.map(x=>'<a href="'+x[0]+'"><span>'+x[1]+'</span>'+x[2]+'</a>').join("");
});
document.querySelectorAll(".global-dock a,.dock a").forEach(a=>{
 const p=new URL(a.href,location.origin).pathname.replace(/\/$/,"")||"/";
 if(p===path){a.classList.add("active");a.setAttribute("aria-current","page")}
});

let seen=[];
try{
 seen=JSON.parse(localStorage.getItem("csl_seen")||"[]");
 if(!seen.includes(path)){seen.push(path);localStorage.setItem("csl_seen",JSON.stringify(seen.slice(-30)))}
}catch(e){}

const labels={
 "/empieza-aqui.html":["🧭","Empieza por tu situación","Te preparo una ruta corta según lo que necesitas."],
 "/explora.html":["✦","Explora sin orden","Elige por antojo, duda o curiosidad."],
 "/que-cocino.html":["🎲","¿Qué cocino hoy?","Tres ideas según tu tiempo y tus ganas."],
 "/recetas.html":["🍝","Sigue curioseando recetas","Entra por hambre, no por teoría."],
 "/diagnostico.html":["🧩","Rescate Sin Líos","Si algo falla, mira qué variable revisar."],
 "/academia.html":["🧠","Thermomix por dentro","Entiende el porqué mientras cocinas."],
 "/glosario.html":["📖","Glosario Sin Líos","Vuelve aquí cuando una palabra o concepto no te cuadre."],
 "/dudas-rapidas.html":["❓","Dudas rápidas","Respuestas claras a preguntas habituales."],
 "/menu-semana.html":["🗓","Menú de la semana","Cuando lo que necesitas es dejar de improvisar."],
 "/encaja-tm7.html":["✨","¿La TM7 encaja contigo?","Piensa en tu cocina real antes de decidir."],
 "/con-macarena.html":["👋","Con Macarena","Conoce cómo te acompañaría de verdad."],
 "/hablamos.html":["💬","Habla con Macarena","Empieza por tu situación y abre una conversación concreta."],
 "/mi-rincon.html":["♡","Mi rincón","Tus favoritos y lo que has visto recientemente."],
 "/receta-hummus.html":["🥣","Hummus exprés","Textura, cantidad y triturado."],
 "/receta-pasta-pesto.html":["🌿","Pasta al pesto","Emulsión y textura de salsa."],
 "/receta-tortitas.html":["🥞","Tortitas","Mezcla y reposo."],
 "/receta-gazpacho.html":["🍅","Gazpacho andaluz","Trituración, agua y textura."],
 "/receta-merluza-varoma.html":["🐟","Merluza al vapor","Vapor, circulación y grosor."],
 "/receta-masa-pizza.html":["🍕","Masa de pizza","Amasado, reposo y fermentación."],
 "/receta-bizcocho-yogur.html":["🍰","Bizcocho de yogur","Aireado y mezcla sin sobrebatir."],
 "/receta-pisto-manchego.html":["🍅","Pisto manchego","Troceado, giro inverso y concentración."]
};

const generic={
 "/":["/empieza-aqui.html","/explora.html","/que-cocino.html"],
 "/empieza-aqui.html":["/explora.html","/con-macarena.html"],
 "/explora.html":["/que-cocino.html","/glosario.html","/con-macarena.html"],
 "/que-cocino.html":["/recetas.html","/menu-semana.html","/academia.html"],
 "/recetas.html":["/que-cocino.html","/academia.html","/glosario.html"],
 "/diagnostico.html":["/academia.html","/glosario.html","/con-macarena.html"],
 "/academia.html":["/glosario.html","/diagnostico.html","/recetas.html"],
 "/glosario.html":["/dudas-rapidas.html","/academia.html","/diagnostico.html","/recetas.html"],
 "/dudas-rapidas.html":["/glosario.html","/encaja-tm7.html","/con-macarena.html"],
 "/menu-semana.html":["/recetas.html","/que-cocino.html","/explora.html"],
 "/encaja-tm7.html":["/con-macarena.html","/empieza-aqui.html","/explora.html"],
 "/con-macarena.html":["/hablamos.html","/empieza-aqui.html","/explora.html","/recetas.html"],
 "/hablamos.html":["/con-macarena.html","/encaja-tm7.html","/recetas.html"],
 "/receta-hummus.html":["/academia.html","/glosario.html","/diagnostico.html"],
 "/receta-pasta-pesto.html":["/academia.html","/menu-semana.html","/glosario.html"],
 "/receta-tortitas.html":["/recetas.html","/academia.html","/que-cocino.html"],
 "/receta-gazpacho.html":["/glosario.html","/recetas.html","/diagnostico.html"],
 "/receta-merluza-varoma.html":["/diagnostico.html","/glosario.html","/menu-semana.html"],
 "/receta-masa-pizza.html":["/glosario.html","/recetas.html","/menu-semana.html"],
 "/receta-bizcocho-yogur.html":["/glosario.html","/recetas.html","/diagnostico.html"],
 "/receta-pisto-manchego.html":["/glosario.html","/menu-semana.html","/recetas.html"]
};

const journeys={
 estreno:["/con-macarena.html","/recetas.html","/dudas-rapidas.html","/academia.html","/glosario.html","/diagnostico.html"],
 valoro:["/encaja-tm7.html","/dudas-rapidas.html","/con-macarena.html","/hablamos.html"],
 uso:["/que-cocino.html","/recetas.html","/academia.html","/glosario.html"],
 fallo:["/diagnostico.html","/academia.html","/glosario.html","/con-macarena.html","/hablamos.html"],
 orden:["/menu-semana.html","/que-cocino.html","/recetas.html","/explora.html"],
 aprender:["/academia.html","/glosario.html","/diagnostico.html","/recetas.html"]
};

let route=null;try{route=localStorage.getItem("csl_route")}catch(e){}
let candidates=(route&&journeys[route])?journeys[route]:generic[path]||["/empieza-aqui.html","/explora.html","/recetas.html"];
candidates=candidates.filter(p=>p!==path);
const next=candidates.find(p=>!seen.includes(p))||candidates[0];

let dismissed=false;try{dismissed=sessionStorage.getItem("csl_continue_dismissed")==="1"}catch(e){}
if(!dismissed&&next){
 const meta=labels[next]||["→","Sigue explorando","Hay más caminos desde aquí."];
 const box=document.createElement("aside");box.className="csl-continue";
 box.innerHTML='<button class="csl-x" aria-label="Cerrar">×</button><a href="'+next+'"><span class="csl-icon">'+meta[0]+'</span><div><small>'+(route?"Siguiente paso de tu ruta":"Sigue por aquí")+'</small><b>'+meta[1]+'</b><p>'+meta[2]+'</p></div><span class="csl-arrow">→</span></a>';
 document.body.appendChild(box);
 const show=()=>box.classList.add("show");
 setTimeout(show,8500);
 window.addEventListener("scroll",()=>{if(scrollY>document.documentElement.scrollHeight*.24)show()},{passive:true,once:true});
 box.querySelector(".csl-x").addEventListener("click",()=>{box.remove();try{sessionStorage.setItem("csl_continue_dismissed","1")}catch(e){}});
}

const searchData=[
["🧭","Empieza aquí","Elige tu situación y sigue una ruta corta.","/empieza-aqui.html","empezar inicio nueva thermomix tm7 ruta"],
["✦","Explora","Navega por antojo, duda o curiosidad.","/explora.html","explorar descubrir navegar"],
["🎲","Qué cocino hoy","Tres ideas según tiempo y ganas.","/que-cocino.html","cena comida hoy ideas rápido tiempo"],
["🍝","Recetas e ideas","Biblioteca visual de cocina real.","/recetas.html","recetas pasta hummus tortitas cena dulce"],
["🗓","Menú de la semana","Cenas, preparación y lista de compra.","/menu-semana.html","menu semana compra organizar cenas"],
["🧩","Rescate Sin Líos","Diagnostica qué revisar cuando algo falla.","/diagnostico.html","fallo liquido espeso carne masa varoma emulsión"],
["🧠","Thermomix por dentro","Aprende qué ocurre mientras cocinas.","/academia.html","velocidad temperatura cantidad vapor aprender"],
["📖","Glosario Sin Líos","Conceptos explicados en lenguaje normal.","/glosario.html","glosario velocidad tiempo temperatura giro inverso varoma emulsión amasar"],
["❓","Dudas rápidas","Respuestas claras a preguntas habituales sobre TM7, Cookidoo y uso diario.","/dudas-rapidas.html","dudas preguntas cookidoo tm7 manual agente cantidades varoma"],
["✨","¿La TM7 encaja contigo?","Recorrido para valorar tu caso.","/encaja-tm7.html","tm7 comprar decidir encaja demo"],
["👋","Con Macarena","Mi forma de acompañarte antes y después.","/con-macarena.html","macarena agente acompañamiento ayuda"],
["💬","Habla con Macarena","Elige tu situación y abre una conversación concreta.","/hablamos.html","contacto whatsapp demo valorar tm7 empezar duda macarena"],
["♡","Mi rincón","Tus favoritos y páginas recientes.","/mi-rincon.html","favoritos guardados historial recientes"],
["🥣","Hummus exprés","Receta completa explicada.","/receta-hummus.html","hummus garbanzo picoteo triturar"],
["🌿","Pasta al pesto","Receta completa explicada.","/receta-pasta-pesto.html","pasta pesto cena salsa emulsión"],
["🥞","Tortitas","Receta completa explicada.","/receta-tortitas.html","tortitas desayuno dulce masa"],
["🍅","Gazpacho andaluz","Receta completa para aprender trituración y textura.","/receta-gazpacho.html","gazpacho tomate verano triturar velocidad"],
["🐟","Merluza al vapor","Receta completa para aprender circulación de vapor.","/receta-merluza-varoma.html","merluza pescado varoma vapor verduras"],
["🍕","Masa de pizza","Receta completa para aprender amasado y fermentación.","/receta-masa-pizza.html","pizza masa harina levadura amasar fermentar"],
["🍰","Bizcocho de yogur","Receta completa para aprender aireado y mezcla sin sobrebatir.","/receta-bizcocho-yogur.html","bizcocho yogur dulce postre merienda airear mezclar hornear"],
["🍅","Pisto manchego","Receta completa para aprender troceado, giro inverso y concentración.","/receta-pisto-manchego.html","pisto manchego verduras tomate calabacin pimiento giro inverso batch cooking"]
];

const relatedRecipes={
 "/receta-hummus.html":["/receta-pisto-manchego.html","/receta-gazpacho.html","/receta-pasta-pesto.html"],
 "/receta-pasta-pesto.html":["/receta-hummus.html","/receta-pisto-manchego.html","/receta-masa-pizza.html"],
 "/receta-tortitas.html":["/receta-bizcocho-yogur.html","/receta-masa-pizza.html","/receta-hummus.html"],
 "/receta-gazpacho.html":["/receta-pisto-manchego.html","/receta-hummus.html","/receta-merluza-varoma.html"],
 "/receta-merluza-varoma.html":["/receta-pisto-manchego.html","/receta-gazpacho.html","/receta-pasta-pesto.html"],
 "/receta-masa-pizza.html":["/receta-pasta-pesto.html","/receta-pisto-manchego.html","/receta-hummus.html"],
 "/receta-bizcocho-yogur.html":["/receta-tortitas.html","/receta-masa-pizza.html","/receta-pisto-manchego.html"],
 "/receta-pisto-manchego.html":["/receta-merluza-varoma.html","/receta-gazpacho.html","/receta-masa-pizza.html"]
};
if(relatedRecipes[path]){
 const ordered=[...relatedRecipes[path]].sort((a,b)=>Number(seen.includes(a))-Number(seen.includes(b)));
 const cards=ordered.slice(0,3).map(p=>{
  const m=labels[p]||["→","Otra receta","Sigue cocinando"];
  return '<a class="csl-related-card" href="'+p+'"><span class="csl-related-icon">'+m[0]+'</span><span><b>'+m[1]+'</b><span>'+m[2]+'</span></span></a>';
 }).join("");
 const section=document.createElement("section");section.className="csl-related";
 section.innerHTML='<div class="csl-related-inner"><div class="csl-related-head"><div><small>Sigue cocinando</small><h2>De esta receta puedes saltar a otra idea.</h2></div><p>Te enseño primero recetas relacionadas que todavía no hayas visitado, para que cada página te abra un camino nuevo.</p></div><div class="csl-related-grid">'+cards+'</div></div>';
 const footer=document.querySelector("footer");
 if(footer)footer.parentNode.insertBefore(section,footer);
 else document.body.appendChild(section);
}

const saveable=!["/mi-rincon.html","/uso-y-propiedad.html","/404.html"].includes(path);
if(saveable){
 const save=document.createElement("button");save.className="csl-save-btn";save.setAttribute("aria-label","Guardar en Mi rincón");save.textContent="♡";
 let favs=[];try{favs=JSON.parse(localStorage.getItem("csl_favs")||"[]")}catch(e){}
 if(favs.includes(path)){save.classList.add("saved");save.textContent="♥";save.setAttribute("aria-pressed","true")}else{save.setAttribute("aria-pressed","false")}
 save.addEventListener("click",()=>{let x=[];try{x=JSON.parse(localStorage.getItem("csl_favs")||"[]")}catch(e){};if(x.includes(path)){x=x.filter(p=>p!==path);save.classList.remove("saved");save.textContent="♡";save.setAttribute("aria-pressed","false")}else{x.push(path);save.classList.add("saved");save.textContent="♥";save.setAttribute("aria-pressed","true")}try{localStorage.setItem("csl_favs",JSON.stringify(x.slice(-40)))}catch(e){}});
 document.body.appendChild(save);
}
const sb=document.createElement("button");sb.className="csl-search-btn";sb.setAttribute("aria-label","Buscar en Cocina sin líos");sb.textContent="⌕";document.body.appendChild(sb);
const modal=document.createElement("div");modal.className="csl-search";modal.setAttribute("aria-hidden","true");modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-labelledby","csl-search-title");
modal.innerHTML='<div class="csl-search-box"><div id="csl-search-title" style="font-family:Georgia,serif;font-size:24px;margin:0 0 12px">Buscar en Cocina sin líos</div><div class="csl-search-top"><input type="search" aria-label="Buscar en Cocina sin líos" placeholder="Busca: masa, TM7, cena, Varoma, Macarena..."><button class="csl-search-close" aria-label="Cerrar">×</button></div><div class="csl-search-results" aria-live="polite"></div></div>';
document.body.appendChild(modal);
const input=modal.querySelector("input"),results=modal.querySelector(".csl-search-results");
function draw(q=""){
 const v=q.trim().toLowerCase();
 const rows=searchData.filter(x=>!v||(x[1]+" "+x[2]+" "+x[4]).toLowerCase().includes(v)).slice(0,8);
 results.innerHTML=rows.map(x=>'<a href="'+x[3]+'"><span style="font-size:21px">'+x[0]+'</span><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span><em>→</em></a>').join("")||'<div style="padding:18px;color:#706f67">No encuentro eso todavía. Prueba otra palabra.</div>';
}
let searchReturnFocus=null;
function openSearch(){if(modal.classList.contains("open"))return;searchReturnFocus=document.activeElement;modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";draw(input.value);setTimeout(()=>input.focus(),40)}
function closeSearch(){if(!modal.classList.contains("open"))return;modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";if(searchReturnFocus&&typeof searchReturnFocus.focus==="function")searchReturnFocus.focus()}
sb.addEventListener("click",openSearch);modal.querySelector(".csl-search-close").addEventListener("click",closeSearch);modal.addEventListener("click",e=>{if(e.target===modal)closeSearch()});input.addEventListener("input",()=>draw(input.value));
document.addEventListener("keydown",e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openSearch()}
 if(e.key==="Escape"&&modal.classList.contains("open")){e.preventDefault();closeSearch()}
 if(e.key==="Tab"&&modal.classList.contains("open")){
  const items=[...modal.querySelectorAll('input,button,a[href]')].filter(x=>!x.disabled&&x.offsetParent!==null);
  if(!items.length)return;
  const first=items[0],last=items[items.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
});
})();