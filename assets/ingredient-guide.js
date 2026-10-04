(()=>{const cfg=window.CSL_GUIDE||{},recipes=window.CSL_RECIPES||[],slugs=cfg.slugs||[];const by=Object.fromEntries(recipes.map(r=>[r.slug,r]));const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));const cat=r=>r.family||r.category;function tone(r){const t=r.tags||[];return t.includes("dulce")?"tone-butter":t.includes("ligera")?"tone-sage":t.includes("comfort")?"tone-peach":t.includes("vegetal")?"tone-mint":t.includes("aprovechar")?"tone-clay":"tone-paper"}function visual(r){if(r.image&&r.image.startsWith("/assets/recipes/"))return '<div class="photo"><img src="'+esc(r.image)+'" alt="'+esc(r.title)+'" loading="lazy" decoding="async" width="1200" height="900"></div>';return '<div class="photo editorial '+tone(r)+'"><div class="cover-copy"><small>'+esc(cat(r))+'</small><strong>'+esc(r.title)+'</strong></div></div>'}const chosen=slugs.map(s=>by[s]).filter(Boolean),grid=document.getElementById("guideGrid");if(grid)grid.innerHTML=chosen.map(r=>'<article class="card">'+visual(r)+'<div class="body"><small>'+esc(r.time)+' · '+esc(r.difficulty)+'</small><h3>'+esc(r.title)+'</h3><p>'+esc(r.intro)+'</p><a class="btn primary" href="/recetas/'+encodeURIComponent(r.slug)+'/">Ver receta →</a></div></article>').join("");const n=document.getElementById("guideCount");if(n)n.textContent=chosen.length+" ideas seleccionadas";
const guides=[
 ["/que-cocinar-con-huevos.html","Huevos"],
 ["/recetas-con-tomate.html","Tomate"],
 ["/recetas-con-calabacin.html","Calabacín"],
 ["/recetas-con-pollo.html","Pollo"],
 ["/recetas-con-arroz.html","Arroz"]
];
const current=location.pathname;
const footer=document.querySelector("footer");
if(footer){
 const sec=document.createElement("section");
 sec.className="csl-guide-more";
 sec.innerHTML='<div class="wrap"><div class="kicker">Sigue por lo que tienes</div><h2>Otro ingrediente, otra salida.</h2><div class="csl-guide-links">'+guides.filter(g=>g[0]!==current).map(g=>'<a href="'+g[0]+'">'+g[1]+' →</a>').join("")+'</div></div>';
 footer.parentNode.insertBefore(sec,footer);
}
})();