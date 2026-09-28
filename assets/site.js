(()=>{
const CSL_HQ_PRO=["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",/*PRO_CHUNK_NEXT*/];
const CSL_HQ_COOK=[/*COOK_CHUNK_NEXT*/];
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
.global-dock,.dock{bottom:calc(10px + env(safe-area-inset-bottom))!important;padding:5px!important;gap:2px!important;border-radius:18px!important;max-width:min(470px,calc(100vw - 28px))!important}.global-dock a,.dock a{min-width:62px!important;padding:6px 7px!important;border-radius:13px!important;font-size:9px!important}.global-dock a span,.dock a span{font-size:15px!important;margin-bottom:1px!important}.csl-search-btn,.csl-save-btn,.csl-continue{margin-bottom:env(safe-area-inset-bottom)}@media(max-width:700px){.global-dock,.dock{left:10px!important;right:10px!important;transform:none!important;max-width:none!important;width:auto!important}.global-dock a,.dock a{min-width:0!important;flex:1!important;padding:6px 3px!important}}
.global-dock a.active,.dock a.active{background:rgba(255,255,255,.16)!important}
.csl-skip{position:fixed;left:12px;top:10px;z-index:500;transform:translateY(-150%);background:#2b3a30;color:white;padding:10px 14px;border-radius:999px;font:900 12px/1 Inter,system-ui,sans-serif;text-decoration:none}.csl-skip:focus{transform:none;outline:3px solid #f2df9d;outline-offset:2px}
.csl-author-strip{background:#fffdfa;border-bottom:1px solid #e8dfd2;color:#485249}
.csl-author-inner{width:min(1120px,92vw);margin:auto;min-height:38px;display:flex;align-items:center;gap:9px;font:800 10px/1.2 Inter,system-ui,sans-serif;letter-spacing:.2px}
.csl-author-mark{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:#f2df9d;color:#2b3a30;font:italic 500 13px/1 Georgia,serif}
.csl-author-inner a{text-decoration:none;color:#2b3a30;border-bottom:1px solid rgba(43,58,48,.35)}
.csl-legal-links{width:min(1120px,92vw);margin:18px auto 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);display:flex;flex-wrap:wrap;gap:12px;font:700 10px/1.3 Inter,system-ui,sans-serif;color:#aebbb3}.csl-legal-links a{color:#dce5df;text-decoration:none}.csl-legal-links a:hover{text-decoration:underline}
.csl-brand-logo{display:block;width:188px;max-height:60px;height:auto}.csl-brand-wordmark{display:flex!important;align-items:center!important;min-width:188px}.csl-brand-wordmark small{display:none!important}@media(max-width:900px){.csl-brand-logo{width:172px}.csl-brand-wordmark{min-width:172px}}@media(max-width:560px){.csl-brand-logo{width:150px}.csl-brand-wordmark{min-width:150px}}
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
@media(min-width:800px){.global-dock,.dock,.csl-continue{display:none!important}.csl-search-btn,.csl-save-btn{bottom:18px!important}.csl-search-btn{right:18px!important}.csl-save-btn{right:74px!important}}\n@media(max-width:580px){body{padding-bottom:calc(82px + env(safe-area-inset-bottom))!important}
 .csl-continue{bottom:148px;left:12px;width:calc(100vw - 24px)}
 .csl-search-btn{bottom:91px;right:12px}
 .csl-save-btn{bottom:91px;right:68px}
 .wa-float{display:none!important}
 .csl-related-head{display:block}.csl-related-head p{margin-top:8px}.csl-related-grid{grid-template-columns:1fr}.csl-loop-grid{grid-template-columns:1fr}.csl-macarena-inner{grid-template-columns:1fr;text-align:left}.csl-macarena-actions{min-width:0;flex-direction:row;flex-wrap:wrap}
}
`;
document.head.appendChild(style);
document.querySelectorAll("header .brand").forEach(a=>{a.classList.add("csl-brand-wordmark");a.setAttribute("aria-label","Cocina sin líos con Macarena");a.innerHTML='<img class="csl-brand-logo" src="/assets/logo-cocina-sin-lios.svg" alt="Cocina sin líos con Macarena">'});

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
const usefulAuthorPages=["/explora.html","/que-cocino.html","/recetas.html","/cenas-faciles-thermomix.html","/menu-semana.html","/organiza-sin-lios.html","/despensa-sin-lios.html","/primeros-dias-tm7.html","/empieza-aqui.html"];
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
 else if(href.startsWith("/metodo-sin-lios.html")||href.startsWith("/adapta-sin-lios.html")||href.startsWith("/organiza-sin-lios.html")||href.startsWith("/despensa-sin-lios.html")||href.startsWith("/mapa-sin-lios.html"))track("method_step",{target:href.split("?")[0]});
 else if(href.startsWith("https://wa.me/"))track("whatsapp_open",{source:path});
});
const csl_legal_injected=true;

const standardDock=[
 ["/explora.html","✦","Explora"],
 ["/que-cocino.html","🎲","Qué cocino"],
 ["/recetas.html","🍝","Recetas"],
 ["/despensa-sin-lios.html","🥫","Despensa"],
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
 "/despensa-sin-lios.html":["🥫","Despensa Sin Líos","Una base corta, congelador y tarros que te ahorran decisiones."],
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
 "/receta-pisto-manchego.html":["🍅","Pisto manchego","Troceado, giro inverso y concentración."],
 "/receta-salsa-tomate.html":["🍅","Salsa de tomate","Troceado, sofrito y concentración."]
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
 "/menu-semana.html":["/recetas.html","/despensa-sin-lios.html","/que-cocino.html","/explora.html"],
 "/despensa-sin-lios.html":["/que-cocino.html","/organiza-sin-lios.html","/menu-semana.html","/con-macarena.html"],
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
 "/receta-pisto-manchego.html":["/glosario.html","/menu-semana.html","/recetas.html"],
 "/receta-salsa-tomate.html":["/organiza-sin-lios.html","/textura-liquida-espesa-thermomix.html","/glosario.html","/recetas.html"]
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
 setTimeout(show,18000);
 window.addEventListener("scroll",()=>{if(scrollY>document.documentElement.scrollHeight*.38)show()},{passive:true,once:true});
 box.querySelector(".csl-x").addEventListener("click",()=>{box.remove();try{sessionStorage.setItem("csl_continue_dismissed","1")}catch(e){}});
}

const searchData=[
["🧭","Empieza aquí","Elige tu situación y sigue una ruta corta.","/empieza-aqui.html","empezar inicio nueva thermomix tm7 ruta"],
["✦","Explora","Navega por antojo, duda o curiosidad.","/explora.html","explorar descubrir navegar"],
["🎲","Qué cocino hoy","Tres ideas según tiempo y ganas.","/que-cocino.html","cena comida hoy ideas rápido tiempo"],
["🍝","Recetas e ideas","Biblioteca visual de cocina real.","/recetas.html","recetas pasta hummus tortitas cena dulce"],
["🗓","Menú de la semana","Cenas, preparación y lista de compra.","/menu-semana.html","menu semana compra organizar cenas"],
["🥫","Despensa Sin Líos","Checklist, congelador y tarros que te ayudan a resolver comidas.","/despensa-sin-lios.html","despensa ingredientes básicos congelador tarros especias ajo cebolla setas fondo cocina"],
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
["🍅","Pisto manchego","Receta completa para aprender troceado, giro inverso y concentración.","/receta-pisto-manchego.html","pisto manchego verduras tomate calabacin pimiento giro inverso batch cooking"],
["🍅","Salsa de tomate casera","Receta base para aprender troceado, sofrito y concentración.","/receta-salsa-tomate.html","salsa tomate thermomix sofrito basico organizar pasta pizza concentrar"]
];

const recipeLearning={
 "/receta-hummus.html":{concept:["Viscosidad y triturado","/glosario.html?q=viscosidad","Entiende por qué una mezcla espesa circula distinto."],rescue:["Está demasiado espeso","/diagnostico.html?problema=espesa","Si la textura se bloquea, empieza por proporción y circulación."]},
 "/receta-pasta-pesto.html":{concept:["Emulsionar","/glosario.html?q=emulsionar","Agua, grasa y movimiento tienen que encontrar equilibrio."],rescue:["No ha ligado","/diagnostico.html?problema=emulsion","Separa primero proporción, incorporación y movimiento."]},
 "/receta-tortitas.html":{concept:["Mezclar y reposar","/glosario.html?q=mezclar","Parar también forma parte de la receta."],rescue:["La masa está rara","/diagnostico.html?problema=masa","Harina, hidratación y reposo pueden cambiar el resultado."]},
 "/receta-gazpacho.html":{concept:["Triturar y viscosidad","/glosario.html?q=triturar","Textura fina no depende solo de subir velocidad."],rescue:["Ha quedado líquido","/diagnostico.html?problema=liquida","Antes de corregir, identifica de dónde viene el agua."]},
 "/receta-merluza-varoma.html":{concept:["Vapor y circulación","/glosario.html?q=vapor","El vapor necesita camino para llegar a todas las piezas."],rescue:["Varoma desigual","/diagnostico.html?problema=vapor","Mira colocación, tamaño y paso del vapor antes de añadir tiempo."]},
 "/receta-masa-pizza.html":{concept:["Amasar y fermentar","/glosario.html?q=amasar","La máquina trabaja la masa; el tiempo hace otra parte."],rescue:["La masa está rara","/diagnostico.html?problema=masa","Revisa harina, hidratación, temperatura y reposo."]},
 "/receta-bizcocho-yogur.html":{concept:["Mezclar sin sobrebatir","/glosario.html?q=mezclar","Cuando entra la harina, más movimiento no siempre ayuda."],rescue:["Bizcocho compacto o hundido","/diagnostico.html?problema=masa","Aísla mezcla, estructura y cocción antes de cambiar varias cosas."]},
 "/receta-pisto-manchego.html":{concept:["Giro inverso y troceado","/glosario.html?q=giro%20inverso","Conservar trozos depende de más de una variable."],rescue:["Trozos demasiado deshechos","/diagnostico.html?problema=picado","Mira tamaño inicial, movimiento y tiempo."]},
 "/receta-salsa-tomate.html":{concept:["Evaporación y concentración","/glosario.html?q=evaporacion","Una base cambia cuando el agua sale y el sabor se concentra."],rescue:["Ha quedado demasiado líquida","/diagnostico.html?problema=liquida","Mira agua, cantidad y concentración antes de corregir."]}
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
 "/receta-pisto-manchego.html":{kicker:"Mi consejo en esta receta",title:"El giro inverso ayuda, pero no trabaja solo.",text:"Tamaño de los trozos, tiempo y movimiento siguen contando. Quiero que el pisto te enseñe a mirar el conjunto y no a confiar en un único ajuste.",motivo:"duda"},
 "/receta-salsa-tomate.html":{kicker:"Mi consejo en esta receta",title:"Una buena base te enseña a cocinar por fases.",text:"Primero cortas, después desarrollas sabor y luego dejas que el conjunto se concentre. Quiero que empieces a reconocer esa lógica en muchas otras recetas.",motivo:"duda"}
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
 "/receta-pisto-manchego.html":["/receta-salsa-tomate.html","/receta-merluza-varoma.html","/receta-gazpacho.html"],
 "/receta-salsa-tomate.html":["/receta-pisto-manchego.html","/receta-pasta-pesto.html","/receta-masa-pizza.html"]
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