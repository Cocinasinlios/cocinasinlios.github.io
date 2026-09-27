(()=>{
const path=location.pathname.replace(/\/$/,"")||"/";
window.dataLayer=window.dataLayer||[];
function track(name,params={}){
 const safe={event:"csl_"+name,page_path:path};
 Object.entries(params||{}).forEach(([k,v])=>{if(v!==undefined&&v!==null&&String(v).length<180)safe[k]=String(v)});
 window.dataLayer.push(safe);
 try{window.dispatchEvent(new CustomEvent("csl:track",{detail:safe}))}catch(e){}
}
window.CSLTrack=track;
if(!document.querySelector('link[rel="icon"]')){const l=document.createElement("link");l.rel="icon";l.href="/assets/favicon.svg";l.type="image/svg+xml";document.head.appendChild(l)}
if(!document.querySelector('link[rel="manifest"]')){const m=document.createElement("link");m.rel="manifest";m.href="/site.webmanifest";document.head.appendChild(m)}

const style=document.createElement("style");
style.textContent=`
.mag-photo,.card .photo,.day-photo,.hero-photo{position:relative}
.mag-photo:after,.card .photo:after,.day-photo:after,.hero-photo:after{content:"Cocina sin líos · @thermomixsinlios";position:absolute;right:9px;bottom:8px;z-index:4;background:rgba(20,25,21,.50);color:#fff;padding:4px 7px;border-radius:999px;font:700 8px/1.1 Inter,system-ui,sans-serif;letter-spacing:.25px;pointer-events:none}
.global-dock,.dock{bottom:calc(14px + env(safe-area-inset-bottom))!important}.csl-search-btn,.csl-save-btn,.csl-continue{margin-bottom:env(safe-area-inset-bottom)}
.global-dock a.active,.dock a.active{background:rgba(255,255,255,.16)!important}
.csl-skip{position:fixed;left:12px;top:10px;z-index:500;transform:translateY(-150%);background:#2b3a30;color:white;padding:10px 14px;border-radius:999px;font:900 12px/1 Inter,system-ui,sans-serif;text-decoration:none}.csl-skip:focus{transform:none;outline:3px solid #f2df9d;outline-offset:2px}
.csl-author-strip{background:#fffdfa;border-bottom:1px solid #e8dfd2;color:#485249}
.csl-author-inner{width:min(1120px,92vw);margin:auto;min-height:38px;display:flex;align-items:center;gap:9px;font:800 10px/1.2 Inter,system-ui,sans-serif;letter-spacing:.2px}
.csl-author-mark{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:#f2df9d;color:#2b3a30;font:italic 500 13px/1 Georgia,serif}
.csl-author-inner a{text-decoration:none;color:#2b3a30;border-bottom:1px solid rgba(43,58,48,.35)}
.csl-legal-links{width:min(1120px,92vw);margin:18px auto 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);display:flex;flex-wrap:wrap;gap:12px;font:700 10px/1.3 Inter,system-ui,sans-serif;color:#aebbb3}.csl-legal-links a{color:#dce5df;text-decoration:none}.csl-legal-links a:hover{text-decoration:underline}
.csl-search-btn,.csl-save-btn{position:fixed;bottom:92px;z-index:121;width:48px;height:48px;border:0;border-radius:50%;background:#fffdfa;color:#26352c;box-shadow:0 12px 35px rgba(40,40,34,.18);font-size:20px;cursor:pointer;border:1px solid #e8dfd2}.csl-search-btn{right:18px}.csl-save-btn{right:74px}.csl-save-btn.saved{background:#f2df9d}.csl-search-btn:focus-visible,.csl-save-btn:focus-visible,.csl-search-close:focus-visible,.csl-search-results a:focus-visible,.csl-x:focus-visible{outline:3px solid #7f9a82;outline-offset:3px}
.csl-search{position:fixed;inset:0;z-index:200;background:rgba(24,28,24,.62);display:none;align-items:flex-start;justify-content:center;padding:9vh 18px 18px}
.csl-search.open{display:flex}.csl-search-box{width:min(720px,96vw);background:#fffdfa;border-radius:28px;padding:22px;box-shadow:0 25px 80px rgba(0,0,0,.28)}
.csl-search-top{display:flex;gap:10px}.csl-search input{width:100%;border:1px solid #e8dfd2;border-radius:999px;padding:14px 17px;font:inherit;outline:none}.csl-search-close{border:0;background:#f0e9df;border-radius:50%;width:46px;min-width:46px;font-size:20px;cursor:pointer}
.csl-search-results{display:grid;gap:8px;margin-top:14px;max-height:55vh;overflow:auto}.csl-search-results a{display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;padding:12px;border-radius:16px;text-decoration:none;color:#25251f}.csl-search-results a:hover{background:#eef5eb}.csl-search-results b{display:block}.csl-search-results small{color:#706f67}.csl-search-results em{font-style:normal;color:#8a8a82}
.csl-continue{position:fixed;left:18px;bottom:92px;z-index:110;width:min(370px,calc(100vw - 36px));background:rgba(255,253,250,.97);border:1px solid #e8dfd2;border-radius:21px;box-shadow:0 16px 48px rgba(40,40,34,.16);padding:7px;opacity:0;transform:translateY(12px);pointer-events:none;transition:.28s}
.csl-continue.show{opacity:1;transform:none;pointer-events:auto}.csl-continue a{display:grid;grid-template-columns:42px 1fr 20px;gap:10px;align-items:center;padding:9px 12px;color:#25251f;text-decoration:none}.csl-continue small{display:block;font-size:9px;text-transform:uppercase;letter-spacing:1.2px;color:#6d7068;font-weight:900}.csl-continue b{display:block;font-family:Georgia,serif;font-size:18px;line-height:1.05;margin:2px 0}.csl-continue p{font:11px/1.35 Inter,system-ui,sans-serif;color:#6d7068;margin:0}.csl-icon{font-size:23px}.csl-arrow{font-size:20px}.csl-x{position:absolute;right:6px;top:5px;border:0;background:transparent;font-size:18px;color:#777;cursor:pointer;z-index:2}
.csl-macarena{background:#2b3a30;color:white;padding:54px 0;border-top:1px solid rgba(255,255,255,.08)}
.csl-macarena-inner{width:min(1080px,92vw);margin:auto;display:grid;grid-template-columns:88px 1fr auto;gap:22px;align-items:center}
.csl-macarena-mark{width:76px;height:76px;border-radius:50%;display:grid;place-items:center;background:#f2df9d;color:#2b3a30;font:italic 500 38px/1 Georgia,serif;box-shadow:inset 0 0 0 7px rgba(255,255,255,.35)}
.csl-macarena-copy small{display:block;font:900 10px/1.2 Inter,system-ui,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:#b9c9bc}
.csl-macarena-copy h2{font:500 34px/1.04 Georgia,serif;margin:6px 0 9px;color:white}.csl-macarena-copy p{margin:0;color:#dce5df;font:14px/1.55 Inter,system-ui,sans-serif;max-width:760px}
.csl-macarena-sign{display:block;margin-top:10px;color:#f2df9d;font:italic 500 18px/1.2 Georgia,serif}
.csl-macarena-actions{display:flex;gap:8px;flex-direction:column;min-width:190px}.csl-macarena-actions a{display:inline-flex;justify-content:center;border-radius:999px;padding:10px 13px;font:900 11px/1.2 Inter,system-ui,sans-serif;text-decoration:none}.csl-macarena-actions a:first-child{background:white;color:#2b3a30}.csl-macarena-actions a:last-child{border:1px solid rgba(255,255,255,.3);color:white}.csl-macarena-actions a:focus-visible{outline:3px solid #f2df9d;outline-offset:3px}
.csl-loop{background:#efe5d8;padding:48px 0;border-top:1px solid #e8dfd2}
.csl-loop-inner{width:min(1080px,92vw);margin:auto}
.csl-loop-head{margin-bottom:17px}.csl-loop-head small{display:block;font:900 10px/1.2 Inter,system-ui,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:#687769}.csl-loop-head h2{font:500 36px/1.05 Georgia,serif;margin:6px 0 8px;color:#25251f}.csl-loop-head p{max-width:720px;margin:0;color:#706f67;font:13px/1.5 Inter,system-ui,sans-serif}
.csl-loop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}.csl-loop-card{display:block;background:#fffdfa;border:1px solid #e8dfd2;border-radius:20px;padding:18px;color:#25251f;text-decoration:none}.csl-loop-card:hover{background:#eef5eb}.csl-loop-card:focus-visible{outline:3px solid #7f9a82;outline-offset:3px}.csl-loop-card small{display:block;font:900 9px/1.2 Inter,system-ui,sans-serif;text-transform:uppercase;letter-spacing:1.1px;color:#687769}.csl-loop-card b{display:block;font:500 22px/1.05 Georgia,serif;margin:5px 0}.csl-loop-card span{font:11px/1.35 Inter,system-ui,sans-serif;color:#706f67}
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
.csl-toast{position:fixed;left:50%;bottom:156px;transform:translate(-50%,12px);z-index:260;background:#2b3a30;color:white;border-radius:999px;padding:10px 15px;font:800 12px/1.2 Inter,system-ui,sans-serif;box-shadow:0 14px 40px rgba(0,0,0,.2);opacity:0;pointer-events:none;transition:.22s;white-space:nowrap}.csl-toast.show{opacity:1;transform:translate(-50%,0)}
.csl-search-empty{padding:18px;color:#706f67}.csl-search-empty p{margin:0 0 12px}.csl-search-empty-links{display:flex;gap:8px;flex-wrap:wrap}.csl-search-empty a{display:inline-flex;border-radius:999px;background:#eef5eb;color:#2b3a30;padding:8px 11px;font-weight:900;text-decoration:none}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}.csl-continue,.csl-toast,.csl-related-card{transition:none!important}}
@media(max-width:580px){body{padding-bottom:calc(82px + env(safe-area-inset-bottom))!important}
 .csl-continue{bottom:148px;left:12px;width:calc(100vw - 24px)}
 .csl-search-btn{bottom:91px;right:12px}
 .csl-save-btn{bottom:91px;right:68px}
 .wa-float{display:none!important}
 .csl-related-head{display:block}.csl-related-head p{margin-top:8px}.csl-related-grid{grid-template-columns:1fr}.csl-loop-grid{grid-template-columns:1fr}.csl-macarena-inner{grid-template-columns:1fr;text-align:left}.csl-macarena-actions{min-width:0;flex-direction:row;flex-wrap:wrap}
}
`;
document.head.appendChild(style);
if(document.querySelector("main")){if(!document.querySelector("main").id)document.querySelector("main").id="contenido";const skip=document.createElement("a");skip.className="csl-skip";skip.href="#contenido";skip.textContent="Saltar al contenido";document.body.prepend(skip)}

const authorStripPages={
 recipe:"Receta explicada por Macarena · qué observar, qué aprender y qué mirar si cambia",
 learn:"Método Sin Líos · explicado por Macarena en lenguaje normal",
 useful:"Selección de Macarena · cocina real, práctica y sin complicarla",
 decide:"Con Macarena al otro lado · primero tu cocina, después la decisión"
};
const recipeAuthorPages=Object.keys({
 "/receta-hummus.html":1,"/receta-pasta-pesto.html":1,"/receta-tortitas.html":1,"/receta-gazpacho.html":1,
 "/receta-merluza-varoma.html":1,"/receta-masa-pizza.html":1,"/receta-bizcocho-yogur.html":1,"/receta-pisto-manchego.html":1
});
const learnAuthorPages=["/academia.html","/aprende-cocinando.html","/mapa-sin-lios.html","/adapta-sin-lios.html","/glosario.html","/diagnostico.html","/dudas-rapidas.html"];
const usefulAuthorPages=["/explora.html","/que-cocino.html","/recetas.html","/cenas-faciles-thermomix.html","/menu-semana.html","/organiza-sin-lios.html","/primeros-dias-tm7.html","/empieza-aqui.html"];
const decideAuthorPages=["/encaja-tm7.html"];
let authorStripText=null;
if(recipeAuthorPages.includes(path))authorStripText=authorStripPages.recipe;
else if(learnAuthorPages.includes(path))authorStripText=authorStripPages.learn;
else if(usefulAuthorPages.includes(path))authorStripText=authorStripPages.useful;
else if(decideAuthorPages.includes(path))authorStripText=authorStripPages.decide;
if(authorStripText){
 const strip=document.createElement("div");strip.className="csl-author-strip";
 strip.innerHTML='<div class="csl-author-inner"><span class="csl-author-mark" aria-hidden="true">M</span><span>'+authorStripText+'</span><a href="/con-macarena.html">Quién está detrás</a></div>';
 const header=document.querySelector("header");
 if(header)header.insertAdjacentElement("afterend",strip);
}

if(document.querySelector("footer")&&!["/privacidad.html","/cookies.html"].includes(path)){
 const legal=document.createElement("div");legal.className="csl-legal-links";legal.dataset.cslLegalInjected="1";
 legal.innerHTML='<a href="/privacidad.html">Privacidad</a><a href="/cookies.html">Cookies</a><a href="/uso-y-propiedad.html">Uso y propiedad</a>';
 document.querySelector("footer").appendChild(legal);
}
document.addEventListener("click",e=>{
 const a=e.target.closest("a[href]");if(!a)return;
 const href=a.getAttribute("href")||"";
 if(href.startsWith("/hablamos.html"))track("contact_start",{source:path,target:"hablamos"});
 else if(href.startsWith("/receta-"))track("recipe_open",{target:href.split("?")[0]});
 else if(href.startsWith("/metodo-sin-lios.html")||href.startsWith("/adapta-sin-lios.html")||href.startsWith("/organiza-sin-lios.html")||href.startsWith("/mapa-sin-lios.html"))track("method_step",{target:href.split("?")[0]});
 else if(href.startsWith("https://wa.me/"))track("whatsapp_open",{source:path});
});
const csl_legal_injected=true;

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
 "/aprende-cocinando.html":["🍳","Aprende cocinando","Ocho recetas para entender ocho ideas reutilizables."],
 "/mapa-sin-lios.html":["🧭","Mapa Sin Líos","Entra por un síntoma o por lo que quieres conseguir."],
 "/adapta-sin-lios.html":["🔧","Adapta Sin Líos","Cambia una receta con una variable cada vez y observa el efecto."],
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
 "/diagnostico.html":["/mapa-sin-lios.html","/academia.html","/glosario.html","/con-macarena.html"],
 "/academia.html":["/aprende-cocinando.html","/glosario.html","/diagnostico.html","/recetas.html"],
 "/aprende-cocinando.html":["/mapa-sin-lios.html","/recetas.html","/academia.html","/glosario.html","/diagnostico.html"],
 "/mapa-sin-lios.html":["/diagnostico.html","/adapta-sin-lios.html","/aprende-cocinando.html","/glosario.html","/recetas.html"],
 "/adapta-sin-lios.html":["/mapa-sin-lios.html","/diagnostico.html","/glosario.html","/menu-semana.html"],
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
 aprender:["/academia.html","/aprende-cocinando.html","/glosario.html","/diagnostico.html","/recetas.html"]
};

let route=null;try{route=localStorage.getItem("csl_route")}catch(e){}
let candidates=(route&&journeys[route])?journeys[route]:generic[path]||["/empieza-aqui.html","/explora.html","/recetas.html"];
candidates=candidates.filter(p=>p!==path);
const next=candidates.find(p=>!seen.includes(p))||candidates[0];

let dismissed=false;try{dismissed=sessionStorage.getItem("csl_continue_dismissed")==="1"}catch(e){}
if(!dismissed&&next){
 const meta=labels[next]||["→","Sigue explorando","Hay más caminos desde aquí."];
 const box=document.createElement("aside");box.className="csl-continue";
 box.innerHTML='<button type="button" class="csl-x" aria-label="Cerrar">×</button><a href="'+next+'"><span class="csl-icon">'+meta[0]+'</span><div><small>'+(route?"El siguiente paso que te propongo":"Yo seguiría por aquí")+'</small><b>'+meta[1]+'</b><p>'+meta[2]+'</p></div><span class="csl-arrow">→</span></a>';
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
["🧩","Método Sin Líos","La forma de Macarena de entender, cocinar, corregir, adaptar y organizar.","/metodo-sin-lios.html","metodo sin lios entiende cocina corrige adapta organiza macarena criterio"],
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

const recipeLearning={
 "/receta-hummus.html":{concept:["Viscosidad y triturado","/glosario.html?q=viscosidad","Entiende por qué una mezcla espesa circula distinto."],rescue:["Está demasiado espeso","/diagnostico.html?problema=espesa","Si la textura se bloquea, empieza por proporción y circulación."]},
 "/receta-pasta-pesto.html":{concept:["Emulsionar","/glosario.html?q=emulsionar","Agua, grasa y movimiento tienen que encontrar equilibrio."],rescue:["No ha ligado","/diagnostico.html?problema=emulsion","Separa primero proporción, incorporación y movimiento."]},
 "/receta-tortitas.html":{concept:["Mezclar y reposar","/glosario.html?q=mezclar","Parar también forma parte de la receta."],rescue:["La masa está rara","/diagnostico.html?problema=masa","Harina, hidratación y reposo pueden cambiar el resultado."]},
 "/receta-gazpacho.html":{concept:["Triturar y viscosidad","/glosario.html?q=triturar","Textura fina no depende solo de subir velocidad."],rescue:["Ha quedado líquido","/diagnostico.html?problema=liquida","Antes de corregir, identifica de dónde viene el agua."]},
 "/receta-merluza-varoma.html":{concept:["Vapor y circulación","/glosario.html?q=vapor","El vapor necesita camino para llegar a todas las piezas."],rescue:["Varoma desigual","/diagnostico.html?problema=vapor","Mira colocación, tamaño y paso del vapor antes de añadir tiempo."]},
 "/receta-masa-pizza.html":{concept:["Amasar y fermentar","/glosario.html?q=amasar","La máquina trabaja la masa; el tiempo hace otra parte."],rescue:["La masa está rara","/diagnostico.html?problema=masa","Revisa harina, hidratación, temperatura y reposo."]},
 "/receta-bizcocho-yogur.html":{concept:["Mezclar sin sobrebatir","/glosario.html?q=mezclar","Cuando entra la harina, más movimiento no siempre ayuda."],rescue:["Bizcocho compacto o hundido","/diagnostico.html?problema=masa","Aísla mezcla, estructura y cocción antes de cambiar varias cosas."]},
 "/receta-pisto-manchego.html":{concept:["Giro inverso y troceado","/glosario.html?q=giro%20inverso","Conservar trozos depende de más de una variable."],rescue:["Trozos demasiado deshechos","/diagnostico.html?problema=picado","Mira tamaño inicial, movimiento y tiempo."]}
};
if(recipeLearning[path]){
 const x=recipeLearning[path],loop=document.createElement("section");loop.className="csl-loop";loop.setAttribute("aria-labelledby","csl-loop-title");
 loop.innerHTML='<div class="csl-loop-inner"><div class="csl-loop-head"><small>La receta no termina en el plato</small><h2 id="csl-loop-title">Entiende → corrige → reutiliza lo aprendido.</h2><p>Este es el recorrido Sin Líos: cocinar algo concreto, entender una variable y saber dónde mirar si el resultado cambia.</p></div><div class="csl-loop-grid"><a class="csl-loop-card" href="'+x.concept[1]+'"><small>1 · Entiende</small><b>'+x.concept[0]+'</b><span>'+x.concept[2]+'</span></a><a class="csl-loop-card" href="'+x.rescue[1]+'"><small>2 · Corrige</small><b>'+x.rescue[0]+'</b><span>'+x.rescue[2]+'</span></a><a class="csl-loop-card" href="/mapa-sin-lios.html"><small>3 · Reutiliza</small><b>Mapa Sin Líos</b><span>Parte de un síntoma u objetivo y aplica la misma lógica en otra preparación.</span></a></div></div>';
 const footer=document.querySelector("footer");
 if(footer)footer.parentNode.insertBefore(loop,footer);
 else document.body.appendChild(loop);
}

const recipeVoice={
 "/receta-hummus.html":{kicker:"Mi consejo en esta receta",title:"No persigas la textura solo subiendo velocidad.",text:"En una mezcla espesa yo miraría antes la proporción, la humedad y cómo está circulando. Quiero que el hummus te enseñe a observar, no solo a obedecer un número.",motivo:"duda"},
 "/receta-pasta-pesto.html":{kicker:"Mi consejo en esta receta",title:"Una salsa ligada no se arregla a fuerza de velocidad.",text:"Aquí quiero que te fijes en cómo se encuentran agua, grasa y movimiento. Cuando entiendes eso, el pesto deja de ser una receta aislada y se convierte en una idea que reutilizas.",motivo:"duda"},
 "/receta-tortitas.html":{kicker:"Mi consejo en esta receta",title:"A veces cocinar bien consiste en saber cuándo parar.",text:"Con las tortitas quiero que veas que mezclar más no siempre mejora nada. El reposo también trabaja, aunque tú no estés tocando ningún botón.",motivo:"duda"},
 "/receta-gazpacho.html":{kicker:"Mi consejo en esta receta",title:"Una textura fina no depende solo de ir más rápido.",text:"Yo aquí quiero que mires también agua, cantidad y tiempo. Si aprendes a leer esas tres cosas, entiendes mucho mejor por qué dos gazpachos pueden comportarse distinto.",motivo:"duda"},
 "/receta-merluza-varoma.html":{kicker:"Mi consejo en esta receta",title:"En el Varoma, antes de añadir tiempo, mira el camino del vapor.",text:"Colocación, grosor y espacio importan muchísimo. Quiero que pienses en por dónde tiene que circular el vapor antes de asumir que la solución es cocinar más.",motivo:"duda"},
 "/receta-masa-pizza.html":{kicker:"Mi consejo en esta receta",title:"La máquina amasa. El tiempo termina parte del trabajo.",text:"Una masa no se juzga solo al salir del vaso. Quiero que observes hidratación, reposo y fermentación antes de decidir que algo ha salido mal.",motivo:"duda"},
 "/receta-bizcocho-yogur.html":{kicker:"Mi consejo en esta receta",title:"Cuando entra la harina, más movimiento no significa mejor mezcla.",text:"Primero buscamos aire; después queremos conservarlo. Esa diferencia es pequeña, pero cambia la forma de entender muchos bizcochos.",motivo:"duda"},
 "/receta-pisto-manchego.html":{kicker:"Mi consejo en esta receta",title:"El giro inverso ayuda, pero no trabaja solo.",text:"Tamaño de los trozos, tiempo y movimiento siguen contando. Quiero que el pisto te enseñe a mirar el conjunto y no a confiar en un único ajuste.",motivo:"duda"}
};
const macarenaVoice={
 learn:{kicker:"Así trabajo yo",title:"No quiero que memorices botones.",text:"Prefiero ayudarte a entender qué mirar, qué cambia una textura y por qué una receta puede comportarse distinto. Para mí, acompañarte es enseñarte criterio, no darte una colección de órdenes.",motivo:"duda"},
 useful:{kicker:"Esto también soy yo",title:"Quiero quitarte ruido, no darte más deberes.",text:"Me gusta la cocina práctica, apetecible y realista. Si esta web te ahorra una decisión, te da una idea o consigue que abras la nevera con menos pereza, ya está haciendo parte de mi trabajo.",motivo:"uso"},
 decide:{kicker:"Antes de hablar de comprar",title:"Primero quiero entender tu cocina.",text:"Cuántos sois, qué cocinas, qué te cuesta y qué esperas resolver. Prefiero que la conversación empiece por ti y no por una máquina.",motivo:"valoro"}
};
const recipePages=Object.keys(recipeLearning);
const learnPages=["/academia.html","/aprende-cocinando.html","/mapa-sin-lios.html","/glosario.html","/diagnostico.html","/dudas-rapidas.html"];
const usefulPages=["/explora.html","/que-cocino.html","/recetas.html","/menu-semana.html","/empieza-aqui.html"];
const decidePages=["/encaja-tm7.html"];
let voice=null;
if(recipePages.includes(path))voice=recipeVoice[path];
else if(learnPages.includes(path))voice=macarenaVoice.learn;
else if(usefulPages.includes(path))voice=macarenaVoice.useful;
else if(decidePages.includes(path))voice=macarenaVoice.decide;
if(voice){
 const contactHref="/hablamos.html?motivo="+encodeURIComponent(voice.motivo||"duda")+(recipePages.includes(path)?"&origen="+encodeURIComponent(labels[path]?.[1]||"una receta"):"");
 const section=document.createElement("section");section.className="csl-macarena";section.setAttribute("aria-labelledby","csl-macarena-title");
 section.innerHTML='<div class="csl-macarena-inner"><div class="csl-macarena-mark" aria-hidden="true">M</div><div class="csl-macarena-copy"><small>'+voice.kicker+'</small><h2 id="csl-macarena-title">'+voice.title+'</h2><p>'+voice.text+'</p><span class="csl-macarena-sign">Macarena · Cocina sin líos</span></div><div class="csl-macarena-actions"><a href="/con-macarena.html">Cómo te acompañaría</a><a href="'+contactHref+'">'+(voice.motivo==="valoro"?"Te cuento mi caso":"Te cuento lo que me pasa")+'</a></div></div>';
 const footer=document.querySelector("footer");
 if(footer)footer.parentNode.insertBefore(section,footer);
 else document.body.appendChild(section);
}

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
 const section=document.createElement("section");section.className="csl-related";section.setAttribute("aria-labelledby","csl-related-title");
 section.innerHTML='<div class="csl-related-inner"><div class="csl-related-head"><div><small>Sigue cocinando</small><h2 id="csl-related-title">De esta receta puedes saltar a otra idea.</h2></div><p>Te enseño primero recetas relacionadas que todavía no hayas visitado, para que cada página te abra un camino nuevo.</p></div><div class="csl-related-grid">'+cards+'</div></div>';
 const footer=document.querySelector("footer");
 if(footer)footer.parentNode.insertBefore(section,footer);
 else document.body.appendChild(section);
}

const toast=document.createElement("div");toast.className="csl-toast";toast.setAttribute("role","status");toast.setAttribute("aria-live","polite");document.body.appendChild(toast);let toastTimer=null;
function announce(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1800)}

const saveable=!["/mi-rincon.html","/uso-y-propiedad.html","/404.html","/hablamos.html"].includes(path);
if(saveable){
 const save=document.createElement("button");save.type="button";save.className="csl-save-btn";save.setAttribute("aria-label","Guardar en Mi rincón");save.textContent="♡";
 let favs=[];try{favs=JSON.parse(localStorage.getItem("csl_favs")||"[]")}catch(e){}
 if(favs.includes(path)){save.classList.add("saved");save.textContent="♥";save.setAttribute("aria-pressed","true")}else{save.setAttribute("aria-pressed","false")}
 save.addEventListener("click",()=>{let x=[];try{x=JSON.parse(localStorage.getItem("csl_favs")||"[]")}catch(e){};if(x.includes(path)){x=x.filter(p=>p!==path);save.classList.remove("saved");save.textContent="♡";save.setAttribute("aria-pressed","false");announce("Quitado de Mi rincón");track("favorite_remove",{content:path})}else{x.push(path);save.classList.add("saved");save.textContent="♥";save.setAttribute("aria-pressed","true");announce("Guardado en Mi rincón");track("favorite_add",{content:path})}try{localStorage.setItem("csl_favs",JSON.stringify(x.slice(-40)))}catch(e){announce("No he podido guardar este cambio en el navegador")}});
 document.body.appendChild(save);
}
const sb=document.createElement("button");sb.type="button";sb.className="csl-search-btn";sb.setAttribute("aria-label","Buscar en Cocina sin líos");sb.textContent="⌕";document.body.appendChild(sb);
const modal=document.createElement("div");modal.className="csl-search";modal.setAttribute("aria-hidden","true");modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-labelledby","csl-search-title");
modal.innerHTML='<div class="csl-search-box"><div id="csl-search-title" style="font-family:Georgia,serif;font-size:24px;margin:0 0 12px">¿Qué estás buscando? Yo te llevo.</div><div class="csl-search-top"><input type="search" aria-label="Buscar en Cocina sin líos" placeholder="Busca: masa, TM7, cena, Varoma, Macarena..."><button type="button" class="csl-search-close" aria-label="Cerrar">×</button></div><div class="csl-search-results" aria-live="polite"></div></div>';
document.body.appendChild(modal);
const input=modal.querySelector("input"),results=modal.querySelector(".csl-search-results");
function draw(q=""){
 const v=q.trim().toLowerCase();
 const rows=searchData.filter(x=>!v||(x[1]+" "+x[2]+" "+x[4]).toLowerCase().includes(v)).slice(0,8);
 results.innerHTML=(rows.length?'<div style="padding:4px 12px 2px;color:#706f67;font-size:11px;font-weight:800">'+rows.length+' '+(rows.length===1?'resultado':'resultados')+'</div>':'')+rows.map(x=>'<a href="'+x[3]+'"><span style="font-size:21px">'+x[0]+'</span><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span><em>→</em></a>').join("")||'<div class="csl-search-empty"><p>No lo encuentro por ese nombre. Prueba otra palabra o cuéntame directamente qué necesitas.</p><div class="csl-search-empty-links"><a href="/dudas-rapidas.html">Ver dudas rápidas</a><a href="/hablamos.html?motivo=duda">Preguntar a Macarena</a></div></div>';
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