(()=>{
const path=location.pathname.replace(/\/$/,"")||"/";

const style=document.createElement("style");
style.textContent=`
.mag-photo,.card .photo,.day-photo,.hero-photo{position:relative}
.mag-photo:after,.card .photo:after,.day-photo:after,.hero-photo:after{content:"Cocina sin líos · @thermomixsinlios";position:absolute;right:9px;bottom:8px;z-index:4;background:rgba(20,25,21,.50);color:#fff;padding:4px 7px;border-radius:999px;font:700 8px/1.1 Inter,system-ui,sans-serif;letter-spacing:.25px;pointer-events:none}
.global-dock a.active,.dock a.active{background:rgba(255,255,255,.16)!important}
.csl-search-btn,.csl-save-btn{position:fixed;bottom:92px;z-index:121;width:48px;height:48px;border:0;border-radius:50%;background:#fffdfa;color:#26352c;box-shadow:0 12px 35px rgba(40,40,34,.18);font-size:20px;cursor:pointer;border:1px solid #e8dfd2}.csl-search-btn{right:18px}.csl-save-btn{right:74px}.csl-save-btn.saved{background:#f2df9d}
.csl-search{position:fixed;inset:0;z-index:200;background:rgba(24,28,24,.62);display:none;align-items:flex-start;justify-content:center;padding:9vh 18px 18px}
.csl-search.open{display:flex}.csl-search-box{width:min(720px,96vw);background:#fffdfa;border-radius:28px;padding:22px;box-shadow:0 25px 80px rgba(0,0,0,.28)}
.csl-search-top{display:flex;gap:10px}.csl-search input{width:100%;border:1px solid #e8dfd2;border-radius:999px;padding:14px 17px;font:inherit;outline:none}.csl-search-close{border:0;background:#f0e9df;border-radius:50%;width:46px;min-width:46px;font-size:20px;cursor:pointer}
.csl-search-results{display:grid;gap:8px;margin-top:14px;max-height:55vh;overflow:auto}.csl-search-results a{display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;padding:12px;border-radius:16px;text-decoration:none;color:#25251f}.csl-search-results a:hover{background:#eef5eb}.csl-search-results b{display:block}.csl-search-results small{color:#706f67}.csl-search-results em{font-style:normal;color:#8a8a82}
.csl-continue{position:fixed;left:18px;bottom:92px;z-index:110;width:min(370px,calc(100vw - 36px));background:rgba(255,253,250,.97);border:1px solid #e8dfd2;border-radius:21px;box-shadow:0 16px 48px rgba(40,40,34,.16);padding:7px;opacity:0;transform:translateY(12px);pointer-events:none;transition:.28s}
.csl-continue.show{opacity:1;transform:none;pointer-events:auto}.csl-continue a{display:grid;grid-template-columns:42px 1fr 20px;gap:10px;align-items:center;padding:9px 12px;color:#25251f;text-decoration:none}.csl-continue small{display:block;font-size:9px;text-transform:uppercase;letter-spacing:1.2px;color:#6d7068;font-weight:900}.csl-continue b{display:block;font-family:Georgia,serif;font-size:18px;line-height:1.05;margin:2px 0}.csl-continue p{font:11px/1.35 Inter,system-ui,sans-serif;color:#6d7068;margin:0}.csl-icon{font-size:23px}.csl-arrow{font-size:20px}.csl-x{position:absolute;right:6px;top:5px;border:0;background:transparent;font-size:18px;color:#777;cursor:pointer;z-index:2}
@media(max-width:580px){.csl-continue{bottom:88px}.csl-search-btn{bottom:91px;right:12px}.csl-save-btn{bottom:91px;right:68px}}
`;
document.head.appendChild(style);

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
 "/mi-rincon.html":["♡","Mi rincón","Tus favoritos y lo que has visto recientemente."]
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
 "/con-macarena.html":["/empieza-aqui.html","/explora.html","/recetas.html"],
 "/receta-hummus.html":["/academia.html","/glosario.html","/diagnostico.html"],
 "/receta-pasta-pesto.html":["/academia.html","/menu-semana.html","/glosario.html"],
 "/receta-tortitas.html":["/recetas.html","/academia.html","/que-cocino.html"],
 "/receta-gazpacho.html":["/glosario.html","/recetas.html","/diagnostico.html"],
 "/receta-merluza-varoma.html":["/diagnostico.html","/glosario.html","/menu-semana.html"],
 "/receta-masa-pizza.html":["/glosario.html","/recetas.html","/menu-semana.html"]
};

const journeys={
 estreno:["/con-macarena.html","/recetas.html","/dudas-rapidas.html","/academia.html","/glosario.html","/diagnostico.html"],
 valoro:["/encaja-tm7.html","/dudas-rapidas.html","/con-macarena.html","/empieza-aqui.html"],
 uso:["/que-cocino.html","/recetas.html","/academia.html","/glosario.html"],
 fallo:["/diagnostico.html","/academia.html","/glosario.html","/con-macarena.html"],
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
["👋","Con Macarena","Mi forma de acompañarte antes y después.","/con-macarena.html","macarena agente acompañamiento ayuda whatsapp"],
["♡","Mi rincón","Tus favoritos y páginas recientes.","/mi-rincon.html","favoritos guardados historial recientes"],
["🥣","Hummus exprés","Receta completa explicada.","/receta-hummus.html","hummus garbanzo picoteo triturar"],
["🌿","Pasta al pesto","Receta completa explicada.","/receta-pasta-pesto.html","pasta pesto cena salsa emulsión"],
["🥞","Tortitas","Receta completa explicada.","/receta-tortitas.html","tortitas desayuno dulce masa"],
["🍅","Gazpacho andaluz","Receta completa para aprender trituración y textura.","/receta-gazpacho.html","gazpacho tomate verano triturar velocidad"],
["🐟","Merluza al vapor","Receta completa para aprender circulación de vapor.","/receta-merluza-varoma.html","merluza pescado varoma vapor verduras"],
["🍕","Masa de pizza","Receta completa para aprender amasado y fermentación.","/receta-masa-pizza.html","pizza masa harina levadura amasar fermentar"]
];

const saveable=!["/mi-rincon.html","/uso-y-propiedad.html","/404.html"].includes(path);
if(saveable){
 const save=document.createElement("button");save.className="csl-save-btn";save.setAttribute("aria-label","Guardar en Mi rincón");save.textContent="♡";
 let favs=[];try{favs=JSON.parse(localStorage.getItem("csl_favs")||"[]")}catch(e){}
 if(favs.includes(path)){save.classList.add("saved");save.textContent="♥"}
 save.addEventListener("click",()=>{let x=[];try{x=JSON.parse(localStorage.getItem("csl_favs")||"[]")}catch(e){};if(x.includes(path)){x=x.filter(p=>p!==path);save.classList.remove("saved");save.textContent="♡"}else{x.push(path);save.classList.add("saved");save.textContent="♥"}localStorage.setItem("csl_favs",JSON.stringify(x.slice(-40)))});
 document.body.appendChild(save);
}
const sb=document.createElement("button");sb.className="csl-search-btn";sb.setAttribute("aria-label","Buscar en Cocina sin líos");sb.textContent="⌕";document.body.appendChild(sb);
const modal=document.createElement("div");modal.className="csl-search";modal.setAttribute("aria-hidden","true");
modal.innerHTML='<div class="csl-search-box"><div class="csl-search-top"><input type="search" placeholder="Busca: masa, TM7, cena, Varoma, Macarena..."><button class="csl-search-close" aria-label="Cerrar">×</button></div><div class="csl-search-results"></div></div>';
document.body.appendChild(modal);
const input=modal.querySelector("input"),results=modal.querySelector(".csl-search-results");
function draw(q=""){
 const v=q.trim().toLowerCase();
 const rows=searchData.filter(x=>!v||(x[1]+" "+x[2]+" "+x[4]).toLowerCase().includes(v)).slice(0,8);
 results.innerHTML=rows.map(x=>'<a href="'+x[3]+'"><span style="font-size:21px">'+x[0]+'</span><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span><em>→</em></a>').join("")||'<div style="padding:18px;color:#706f67">No encuentro eso todavía. Prueba otra palabra.</div>';
}
function openSearch(){modal.classList.add("open");modal.setAttribute("aria-hidden","false");draw(input.value);setTimeout(()=>input.focus(),40)}
function closeSearch(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
sb.addEventListener("click",openSearch);modal.querySelector(".csl-search-close").addEventListener("click",closeSearch);modal.addEventListener("click",e=>{if(e.target===modal)closeSearch()});input.addEventListener("input",()=>draw(input.value));
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openSearch()}if(e.key==="Escape")closeSearch()});
})();