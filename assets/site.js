(()=>{
const path=location.pathname.replace(/\/$/,"")||"/";
if(!document.querySelector('link[rel="icon"]')){const l=document.createElement("link");l.rel="icon";l.href="/assets/favicon.svg";l.type="image/svg+xml";document.head.appendChild(l)}
if(!document.querySelector('link[rel="manifest"]')){const m=document.createElement("link");m.rel="manifest";m.href="/site.webmanifest";document.head.appendChild(m)}
document.querySelectorAll("header .brand").forEach(a=>{a.setAttribute("aria-label","Cocina sin líos con Macarena");a.innerHTML='<img src="/assets/logo-cocina-sin-lios.svg" alt="Cocina sin líos con Macarena">'});
const nav=[["/explora.html","✦","Explora"],["/que-cocino.html","🎲","Qué cocino"],["/plan-semana.html","🗓","Planifica"],["/despensa-sin-lios.html","🥫","Despensa"],["/mi-rincon.html","♡","Mi cocina"]];
document.querySelectorAll(".global-dock,.dock").forEach(d=>{d.setAttribute("aria-label","Navegación rápida");d.innerHTML=nav.map(x=>'<a href="'+x[0]+'"><span>'+x[1]+'</span>'+x[2]+'</a>').join("")});
document.querySelectorAll(".global-dock a,.dock a").forEach(a=>{const p=new URL(a.href,location.origin).pathname.replace(/\/$/,"")||"/";if(p===path){a.classList.add("active");a.setAttribute("aria-current","page")}});
if(document.querySelector("footer")&&!["/privacidad.html","/cookies.html","/uso-y-propiedad.html"].includes(path)){const x=document.createElement("div");x.className="csl-legal-links";x.innerHTML='<a href="/privacidad.html">Privacidad</a> · <a href="/cookies.html">Cookies</a> · <a href="/uso-y-propiedad.html">Uso y propiedad</a>';x.style.cssText="font-size:11px;margin-top:18px;opacity:.8";document.querySelector("footer").appendChild(x)}
})();