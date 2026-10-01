(()=>{const r=window.CSL_RECIPE;if(!r)return;
const CSL_PHOTO_SPRITE_MAP={"gazpacho-andaluz":{"x":0,"y":0},"pollo-horno-limon":{"x":33.3333,"y":0},"albondigas-tomate":{"x":66.6667,"y":0},"lentejas-rapidas":{"x":100,"y":0},"merluza-vapor-verduras":{"x":0,"y":50},"salmon-mostaza-horno":{"x":33.3333,"y":50},"curry-garbanzos-verduras":{"x":66.6667,"y":50},"crema-calabaza-zanahoria":{"x":100,"y":50},"tortilla-calabacin":{"x":0,"y":100},"ensalada-garbanzos-mediterranea":{"x":33.3333,"y":100},"verduras-asadas-yogur":{"x":66.6667,"y":100},"bizcocho-yogur":{"x":100,"y":100}};const CSL_PHOTO_SPRITE="/assets/recipe-sprite-12.webp";
function applyRecipeSprite(el,pos){if(!el||!pos)return;el.classList.remove("no-photo","tone-sage","tone-mint","tone-peach","tone-butter","tone-clay","tone-paper");el.innerHTML="";el.style.backgroundImage="url('"+CSL_PHOTO_SPRITE+"')";el.style.backgroundSize="400% auto";el.style.backgroundPosition=pos.x+"% "+pos.y+"%";el.style.backgroundRepeat="no-repeat";el.style.backgroundColor="#f3efe7"}
document.querySelectorAll(".related-card").forEach(a=>{const m=(a.getAttribute("href")||"").match(/\/recetas\/([^/]+)\//);if(!m)return;const pos=CSL_PHOTO_SPRITE_MAP[m[1]];if(pos)applyRecipeSprite(a.querySelector(".related-photo"),pos)});
const intro=document.querySelector(".hero .intro");
if(intro&&!document.querySelector(".recipe-byline")){
  const by=document.createElement("p");
  by.className="recipe-byline";
  by.innerHTML='Por <a rel="author" href="/con-macarena.html">Macarena</a> · Cocina sin líos';
  intro.insertAdjacentElement("afterend",by);
}
if(![...document.querySelectorAll('script[type="application/ld+json"]')].some(s=>s.textContent.includes('"BreadcrumbList"'))){
  const ld=document.createElement("script");ld.type="application/ld+json";
  ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://cocinasinlios.com/"},{"@type":"ListItem","position":2,"name":"Recetas","item":"https://cocinasinlios.com/recetas.html"},{"@type":"ListItem","position":3,"name":r.title,"item":"https://cocinasinlios.com/recetas/"+r.slug+"/"}]});
  document.head.appendChild(ld);
}const nonDinner=new Set(["tortitas-fruta","gazpacho-andaluz","avena-frutos-rojos","bizcocho-yogur","guacamole","salsa-tomate-casera","vinagreta-mostaza-limon","muffins-platano-avena","crumble-manzana"]);if(nonDinner.has(r.slug)){document.getElementById("week")?.remove();document.getElementById("week2")?.closest(".next")?.remove()}const hero=document.querySelector(".hero-photo");if(hero){const bg=getComputedStyle(hero).backgroundImage;const lowRes=/\/(?:hummus|pasta|tortitas)\.webp/i.test(bg||"");if(lowRes){const cat=document.querySelector(".hero .eyebrow")?.textContent||"Receta Sin Líos";const learn=document.querySelector(".learn h2")?.textContent||"Cocina con criterio";hero.style.backgroundImage="none";hero.classList.add("no-photo","tone-sage");hero.innerHTML='<div class="cover-copy"><small>'+cat.replace(/[<>&]/g,"")+'</small><strong>'+r.title.replace(/[<>&]/g,"")+'</strong><span>'+learn.replace(/[<>&]/g,"")+'</span></div>';}if(!lowRes){const m=bg&&bg.match(/url\(["']?(.*?)["']?\)/);if(m&&m[1]){const img=new Image();img.onload=()=>{if(img.naturalWidth<600||img.naturalHeight<500){const cat=document.querySelector(".hero .eyebrow")?.textContent||"Receta Sin Líos";const learn=document.querySelector(".learn h2")?.textContent||"Cocina con criterio";hero.style.backgroundImage="none";hero.classList.add("no-photo","tone-sage");hero.innerHTML='<div class="cover-copy"><small>'+cat.replace(/[<>&]/g,"")+'</small><strong>'+r.title.replace(/[<>&]/g,"")+'</strong><span>'+learn.replace(/[<>&]/g,"")+'</span></div>';}};img.src=m[1];}}}const k="csl-favoritos-v1";let f=[];try{f=JSON.parse(localStorage.getItem(k)||"[]")}catch(e){}const id=r.id||r.slug,b=document.getElementById("fav");function sync(){const on=f.includes(id)||f.includes(r.slug);if(b){b.textContent=on?"♥ Guardada":"♡ Guardar";b.classList.toggle("saved",on)}}sync();b?.addEventListener("click",()=>{const on=f.includes(id)||f.includes(r.slug);f=on?f.filter(x=>x!==id&&x!==r.slug):[...f,id];f=[...new Set(f)];try{localStorage.setItem(k,JSON.stringify(f))}catch(e){}sync()});function add(btn){try{localStorage.setItem("csl-idea-semana-v1",JSON.stringify({n:r.title,slug:r.slug,...r.plan}));btn.textContent="Añadida ✓";btn.classList.add("saved");setTimeout(()=>location.href="/plan-semana.html?idea=1",220)}catch(e){location.href="/plan-semana.html"}}document.getElementById("week")?.addEventListener("click",e=>add(e.currentTarget));document.getElementById("week2")?.addEventListener("click",e=>add(e.currentTarget));document.getElementById("share")?.addEventListener("click",async e=>{try{if(navigator.share)await navigator.share({title:r.title,text:r.intro,url:location.href});else{await navigator.clipboard.writeText(r.title+" · "+location.href);e.currentTarget.textContent="Enlace copiado ✓"}}catch(err){}})
document.getElementById("print")?.addEventListener("click",()=>window.print());
const scaleButtons=[...document.querySelectorAll("[data-scale]")];
const ingEls=[...document.querySelectorAll("[data-ing-index]")];
const baseServings=Number(r.baseServings)||(()=>{const m=String(r.servings||"").match(/(\d+(?:[.,]\d+)?)/);return m?Number(m[1].replace(",", ".")):null})();
function servingsLabel(factor){
 if(!baseServings)return factor===.5?"Media receta":factor===1?"Receta original":"Doble receta";
 const n=baseServings*factor;
 if(Math.abs(n-Math.round(n))<.001)return "Para "+Math.round(n);
 if(Math.abs(n*2-Math.round(n*2))<.001)return "Para "+Math.floor(n)+"–"+Math.ceil(n);
 return "Para "+humanNum(n);
}
scaleButtons.forEach(b=>{const factor=Number(b.dataset.scale);b.textContent=servingsLabel(factor);b.setAttribute("aria-label",servingsLabel(factor)+" personas")});
const scaleGroup=document.querySelector(".scale-buttons");
if(scaleGroup)scaleGroup.setAttribute("aria-label","Número orientativo de personas");
const scaleHeading=document.querySelector(".scale-row > span");
if(scaleHeading)scaleHeading.textContent="¿Para cuántas personas?";
function roundTo(n,step){step=Number(step)||.25;return Math.round(n/step)*step}
function humanNum(n){if(n==null||Number.isNaN(Number(n)))return "";n=Number(n);if(Math.abs(n-Math.round(n))<.001)return String(Math.round(n));const q=Math.round(n*4)/4,whole=Math.floor(q),frac=Math.round((q-whole)*4),f=frac===1?"¼":frac===2?"½":frac===3?"¾":"";return (whole?String(whole):"")+f}
const countNames={"huevos":["huevo","huevos"],"cebolla":["cebolla","cebollas"],"puerro":["puerro","puerros"],"ajo":["diente de ajo","dientes de ajo"],"limón":["limón","limones"],"pepino":["pepino","pepinos"],"pimiento":["pimiento","pimientos"],"calabacín":["calabacín","calabacines"],"berenjena":["berenjena","berenjenas"],"patata":["patata","patatas"],"zanahoria":["zanahoria","zanahorias"],"tomate":["tomate","tomates"],"tomate cherry":["tomate cherry","tomates cherry"],"manzana":["manzana","manzanas"],"plátano":["plátano","plátanos"],"aguacate":["aguacate","aguacates"],"tortillas":["tortilla","tortillas"],"yogur":["yogur","yogures"],"merluza":["lomo de merluza","lomos de merluza"],"salmón":["lomo de salmón","lomos de salmón"],"bacalao":["lomo de bacalao","lomos de bacalao"],"filetes de pescado":["filete de pescado","filetes de pescado"],"conserva de pescado":["lata de pescado","latas de pescado"],"pan":["rebanada de pan","rebanadas de pan"],"maíz":["lata de maíz","latas de maíz"]};
function unitText(n,unit,key){const h=humanNum(n);if(unit==="g"||unit==="ml"||unit==="mg")return h+" "+unit;const names={cda:["cucharada","cucharadas"],cdta:["cucharadita","cucharaditas"],taza:["taza","tazas"]};if(names[unit])return h+" "+(n<=1?names[unit][0]:names[unit][1]);if(unit==="ud"){const k=countNames[key]||[key,key];return h+" "+(n<=1?k[0]:k[1])}return h+(unit?" "+unit:"")}
function scaledIngredient(ing,factor){
 if(!ing||ing.qty==null||factor===1)return ing?.text||"";
 const a=roundTo(Number(ing.qty)*factor,ing.round),b=ing.maxQty==null?null:roundTo(Number(ing.maxQty)*factor,ing.round);
 const amount=b!=null&&Math.abs(b-a)>.001?unitText(a,ing.unit,ing.key).replace(/\s[^\s]+$/,"")+"–"+unitText(b,ing.unit,ing.key):unitText(a,ing.unit,ing.key);
 if(ing.unit==="ud")return amount+(ing.optional?" · opcional":"");
 return amount+(amount?" de ":"")+ing.key+(ing.optional?" · opcional":"");
}
function applyScale(factor){
 scaleButtons.forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.scale)===factor)));
 ingEls.forEach((el,i)=>{const ing=r.ingredientData?.[i];if(ing)el.textContent=scaledIngredient(ing,factor)});
 const note=document.getElementById("scaleNote");if(note){const who=baseServings?servingsLabel(factor).toLowerCase()+" personas · ":"";note.textContent=who+(factor===1?"cantidades originales de la receta.":factor===.5?"cantidades ajustadas; revisa tiempos y tamaño de recipiente.":"cantidades ajustadas; no dupliques tiempos automáticamente y vigila capacidad y cocción.");}
}
scaleButtons.forEach(b=>b.addEventListener("click",()=>applyScale(Number(b.dataset.scale))));
if(scaleButtons.length)applyScale(1);

})();