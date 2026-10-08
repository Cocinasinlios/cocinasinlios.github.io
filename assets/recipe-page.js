(()=>{const r=window.CSL_RECIPE;if(!r)return;
function enhanceRecipeStructuredData(){
 const recipeLd=[...document.querySelectorAll('script[type="application/ld+json"]')].find(s=>s.textContent.includes('"@type":"Recipe"'));
 if(recipeLd){
   try{
     const data=JSON.parse(recipeLd.textContent);
     if(data.author&&typeof data.author==="object")data.author["@id"]="https://cocinasinlios.com/con-macarena#macarena";
     recipeLd.textContent=JSON.stringify(data);
   }catch(e){}
 }
 if(!document.querySelector('script[data-csl-breadcrumb]')){
   const bc=document.createElement("script");
   bc.type="application/ld+json";bc.dataset.cslBreadcrumb="1";
   bc.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Recetas","item":"https://cocinasinlios.com/recetas"},{"@type":"ListItem","position":2,"name":r.title}]});
   document.head.appendChild(bc);
 }
}
enhanceRecipeStructuredData();
const recipeFooter=document.querySelector("footer p");
if(recipeFooter)recipeFooter.textContent="Cocina real: ajusta cantidades y punto a tu casa. Si hay alergias o intolerancias, revisa siempre ingredientes y etiquetado.";
const recentKey="csl-recientes-v1";
try{
 let recent=JSON.parse(localStorage.getItem(recentKey)||"[]");
 if(!Array.isArray(recent))recent=[];
 recent=recent.filter(x=>x&&x.slug&&x.slug!==r.slug);
 recent.unshift({slug:r.slug,title:r.title,at:Date.now()});
 localStorage.setItem(recentKey,JSON.stringify(recent.slice(0,8)));
}catch(e){}

const CSL_FAMILY_MAP={"hummus-cremoso":"Básicos y salsas","pasta-pesto-tomate":"Pasta, arroz y cereales","tortitas-fruta":"Desayunos y dulce","bol-arroz-aprovechamiento":"Pasta, arroz y cereales","crema-verduras":"Sopas y cremas","huevos-verduras-pan":"Huevos y tortillas","merluza-vapor-verduras":"Pescado","gazpacho-andaluz":"Sopas y cremas","albondigas-tomate":"Pollo y carne","curry-garbanzos-verduras":"Legumbres","tortilla-ensalada":"Huevos y tortillas","pizza-verduras":"Horno y masas","pollo-horno-limon":"Pollo y carne","lentejas-rapidas":"Legumbres","pescado-papillote":"Pescado","pisto-huevo":"Verduras","avena-frutos-rojos":"Desayunos y dulce","bizcocho-yogur":"Desayunos y dulce","quiche-verduras":"Horno y masas","ensalada-garbanzos-mediterranea":"Legumbres","ensalada-lentejas-verduras":"Legumbres","pasta-calabacin-limon":"Pasta, arroz y cereales","pasta-tomate-atun":"Pasta, arroz y cereales","arroz-salteado-huevo-verduras":"Pasta, arroz y cereales","arroz-tomate-huevo":"Pasta, arroz y cereales","cuscus-garbanzos-verduras":"Pasta, arroz y cereales","fajitas-pollo-verduras":"Pollo y carne","quesadillas-frijoles-maiz":"Legumbres","shakshuka-rapida":"Huevos y tortillas","tortilla-calabacin":"Huevos y tortillas","pollo-limon-sarten":"Pollo y carne","pollo-curry-expres":"Pollo y carne","salmon-mostaza-horno":"Pescado","bacalao-tomate":"Pescado","tacos-pescado":"Pescado","berenjenas-rellenas":"Verduras","calabacines-rellenos":"Verduras","verduras-asadas-yogur":"Verduras","sopa-tomate-alubias":"Sopas y cremas","potaje-alubias-rapido":"Legumbres","sopa-ajo-huevo":"Sopas y cremas","crema-calabaza-zanahoria":"Sopas y cremas","ensalada-pasta-verano":"Pasta, arroz y cereales","patatas-asadas-rellenas":"Horno y masas","croquetas-pollo-aprovechamiento":"Pollo y carne","guacamole":"Básicos y salsas","salsa-tomate-casera":"Básicos y salsas","vinagreta-mostaza-limon":"Básicos y salsas","muffins-platano-avena":"Desayunos y dulce","crumble-manzana":"Desayunos y dulce"};
const family=CSL_FAMILY_MAP[r.slug]||null;
const CSL_FAMILY_TONE={"Básicos y salsas":"tone-sage","Pasta, arroz y cereales":"tone-mint","Desayunos y dulce":"tone-butter","Sopas y cremas":"tone-clay","Huevos y tortillas":"tone-butter","Pescado":"tone-mint","Pollo y carne":"tone-peach","Legumbres":"tone-sage","Verduras":"tone-mint","Horno y masas":"tone-peach"};
const fallbackTone=CSL_FAMILY_TONE[family]||"tone-sage";
if(family){
 const eyebrow=document.querySelector(".hero .eyebrow");if(eyebrow)eyebrow.textContent=family;
 const editorialHero=document.querySelector(".hero-photo.no-photo");
 if(editorialHero){
   editorialHero.classList.remove("tone-sage","tone-mint","tone-peach","tone-butter","tone-clay","tone-paper");
   editorialHero.classList.add(fallbackTone);
   const label=editorialHero.querySelector(".cover-copy small");if(label)label.textContent=family;
 }
 document.querySelectorAll(".related-card").forEach(a=>{const m=(a.getAttribute("href")||"").match(/\/recetas\/([^/]+)\//);const label=a.querySelector(".related-photo .cover-copy small");if(m&&label&&CSL_FAMILY_MAP[m[1]])label.textContent=CSL_FAMILY_MAP[m[1]]});
 const recipeLd=[...document.querySelectorAll('script[type="application/ld+json"]')].find(s=>s.textContent.includes('"@type":"Recipe"'));
 if(recipeLd){try{const j=JSON.parse(recipeLd.textContent);j.recipeCategory=family;recipeLd.textContent=JSON.stringify(j)}catch(e){}}
}
function applyRelatedRecipeImage(el,slug){
 if(!el||!slug)return;
 el.classList.remove("no-photo","tone-sage","tone-mint","tone-peach","tone-butter","tone-clay","tone-paper");
 el.innerHTML="";
 el.style.backgroundImage="url('/"+"assets/"+"recipes/"+encodeURIComponent(slug)+".webp')";
 el.style.backgroundSize="cover";
 el.style.backgroundPosition="center";
 el.style.backgroundRepeat="no-repeat";
 el.style.backgroundColor="#f3efe7";
}
document.querySelectorAll(".related-card").forEach(a=>{
 const m=(a.getAttribute("href")||"").match(/\/recetas\/([^/]+)\//);
 if(m)applyRelatedRecipeImage(a.querySelector(".related-photo"),m[1]);
});
const dynamicCookGuides={
"hummus-cremoso":{heat:"Sin cocción",time:"3–5 min de triturado; 20–30 min de reposo en frío es opcional",cue:"Debe quedar cremoso y uniforme, pero con cuerpo; corrige agua, limón y sal al final."},
"pasta-pesto-tomate":{heat:"Pasta en agua hirviendo; acabado con fuego bajo o apagado",time:"Cuece según el envase y retira la pasta aproximadamente 1 min antes del punto final",cue:"La pasta debe quedar al dente y la salsa ligada con un poco de agua de cocción, no aceitosa ni seca."},
"bol-arroz-aprovechamiento":{heat:"Sartén a fuego medio-alto",time:"5–8 min para calentar la base y saltear lo que lo necesite",cue:"El arroz debe quedar bien caliente y suelto; añade la salsa y los elementos crujientes al final."},
"gazpacho-andaluz":{heat:"Sin cocción",time:"2–4 min de triturado; enfría antes de servir",cue:"Debe quedar fino y fresco, con acidez y sal equilibradas; añade agua solo después de triturar."},
"lentejas-rapidas":{heat:"Sofrito a fuego medio; hervor suave al final",time:"10–15 min desde que añades caldo y lentejas",cue:"Las verduras deben estar tiernas y el caldo ligeramente ligado, sin reducirse en exceso."},
"avena-frutos-rojos":{heat:"Sin cocción en la versión fría",time:"20 min como mínimo; mejor varias horas o toda la noche",cue:"La avena debe estar hidratada y cremosa; ajusta con un poco más de líquido antes de servir si se ha espesado."},
"ensalada-garbanzos-mediterranea":{heat:"Sin cocción",time:"10 min de reposo tras aliñar, si puedes",cue:"El garbanzo debe estar bien escurrido y el aliño repartido; corrige acidez y sal después del reposo."},
"ensalada-lentejas-verduras":{heat:"Sin cocción",time:"5–10 min de reposo tras aliñar",cue:"Las lentejas deben quedar sueltas, no aguadas; prueba de nuevo después del reposo y corrige el aliño."},
"pasta-calabacin-limon":{heat:"Calabacín a fuego medio-alto; pasta en agua hirviendo",time:"Saltea el calabacín 5–7 min; cuece la pasta según el envase y retírala 1 min antes",cue:"El calabacín debe dorarse sin soltar demasiada agua y la pasta quedar ligada con limón, aceite y agua de cocción."},
"pasta-tomate-atun":{heat:"Salsa a fuego medio; pasta en agua hirviendo",time:"Cocina la salsa de tomate unos 10 min; pasta según el envase",cue:"El tomate debe perder el sabor crudo; añade el atún al final para que no se reseque."},
"arroz-tomate-huevo":{heat:"Sartén a fuego medio",time:"Tomate 10–15 min; arroz 3–5 min para calentarlo; huevo al punto que prefieras",cue:"La salsa debe estar concentrada, el arroz caliente y el huevo recién hecho al servir."},
"cuscus-garbanzos-verduras":{heat:"Líquido recién hervido para el cuscús; sartén a fuego medio-alto para la verdura",time:"Cuscús según el envase, normalmente unos minutos; verduras 6–8 min",cue:"El cuscús debe soltarse con tenedor y las verduras quedar tiernas pero con textura."},
"sopa-tomate-alubias":{heat:"Sofrito a fuego medio; hervor suave al final",time:"10 min de cocción desde que añades caldo y alubias",cue:"La sopa debe quedar sabrosa y ligeramente ligada; tritura solo una parte si quieres más cuerpo."},
"ensalada-pasta-verano":{heat:"Pasta en agua hirviendo",time:"Cuece según el envase y deja al dente",cue:"La pasta debe enfriarse sin apelmazarse y el aliño quedar integrado sin exceso de líquido."},
"guacamole":{heat:"Sin cocción",time:"5–10 min de preparación",cue:"El aguacate debe quedar cremoso pero con algo de textura; ajusta lima y sal justo antes de servir."},
"vinagreta-mostaza-limon":{heat:"Sin cocción",time:"1–2 min de batido",cue:"Debe verse homogénea y ligeramente emulsionada; prueba el equilibrio de ácido, grasa y sal sobre un alimento."}
};
const cookGuide=r.cook||dynamicCookGuides[r.slug];
if(cookGuide&&!document.querySelector(".cook-note")){
 const heroSection=document.querySelector(".hero");
 if(heroSection){
   const box=document.createElement("div");
   box.className="wrap cook-note";
   box.innerHTML='<div class="cook-bit"><small>Calor</small><b>'+cookGuide.heat+'</b></div><div class="cook-bit"><small>Tiempo</small><b>'+cookGuide.time+'</b></div><div class="cook-bit"><small>La señal</small><p>'+cookGuide.cue+'</p></div>';
   heroSection.insertAdjacentElement("afterend",box);
 }
}
const intro=document.querySelector(".hero .intro");
if(intro&&!document.querySelector(".recipe-byline")){
  const by=document.createElement("p");
  by.className="recipe-byline";
  by.innerHTML='Por <a rel="author" href="/con-macarena">Macarena</a> · <a href="/criterio-editorial">Criterio editorial</a>';
  intro.insertAdjacentElement("afterend",by);
}
if(![...document.querySelectorAll('script[type="application/ld+json"]')].some(s=>s.textContent.includes('"BreadcrumbList"'))){
  const ld=document.createElement("script");ld.type="application/ld+json";
  ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://cocinasinlios.com/"},{"@type":"ListItem","position":2,"name":"Recetas","item":"https://cocinasinlios.com/recetas"},{"@type":"ListItem","position":3,"name":r.title,"item":"https://cocinasinlios.com/recetas/"+r.slug+"/"}]});
  document.head.appendChild(ld);
}const nonDinner=new Set(["tortitas-fruta","gazpacho-andaluz","avena-frutos-rojos","bizcocho-yogur","guacamole","salsa-tomate-casera","vinagreta-mostaza-limon","muffins-platano-avena","crumble-manzana"]);if(nonDinner.has(r.slug)){document.getElementById("week")?.remove();document.getElementById("week2")?.closest(".next")?.remove()}const hero=document.querySelector(".hero-photo");if(hero){const showHeroFallback=()=>{const cat=document.querySelector(".hero .eyebrow")?.textContent||"Receta Sin Líos";const learn=document.querySelector(".learn h2")?.textContent||"Cocina con criterio";hero.style.backgroundImage="none";hero.classList.add("no-photo",fallbackTone);hero.innerHTML='<div class="cover-copy"><small>'+cat.replace(/[<>&]/g,"")+'</small><strong>'+r.title.replace(/[<>&]/g,"")+'</strong><span>'+learn.replace(/[<>&]/g,"")+'</span></div>'};const htmlImg=hero.querySelector("img");if(htmlImg){const validate=()=>{if(htmlImg.naturalWidth<600||htmlImg.naturalHeight<500)showHeroFallback()};if(htmlImg.complete)validate();else{htmlImg.addEventListener("load",validate,{once:true});htmlImg.addEventListener("error",showHeroFallback,{once:true})}}else{const bg=getComputedStyle(hero).backgroundImage;const m=bg&&bg.match(/url\(["']?(.*?)["']?\)/);if(m&&m[1]){const img=new Image();img.onload=()=>{if(img.naturalWidth<600||img.naturalHeight<500)showHeroFallback()};img.onerror=showHeroFallback;img.src=m[1];}else showHeroFallback()}}const k="csl-favoritos-v1";let f=[];try{f=JSON.parse(localStorage.getItem(k)||"[]")}catch(e){}const id=r.id||r.slug,b=document.getElementById("fav");function sync(){const on=f.includes(id)||f.includes(r.slug);if(b){b.textContent=on?"♥ Guardada":"♡ Guardar";b.classList.toggle("saved",on)}}sync();b?.addEventListener("click",()=>{const on=f.includes(id)||f.includes(r.slug);f=on?f.filter(x=>x!==id&&x!==r.slug):[...f,id];f=[...new Set(f)];try{localStorage.setItem(k,JSON.stringify(f))}catch(e){}sync()});function add(btn){try{localStorage.setItem("csl-idea-semana-v1",JSON.stringify({n:r.title,slug:r.slug,...r.plan}));btn.textContent="Añadida ✓";btn.classList.add("saved");setTimeout(()=>location.href="/plan-semana?idea=1",220)}catch(e){location.href="/plan-semana"}}document.getElementById("week")?.addEventListener("click",e=>add(e.currentTarget));document.getElementById("week2")?.addEventListener("click",e=>add(e.currentTarget));document.getElementById("share")?.addEventListener("click",async e=>{try{if(navigator.share)await navigator.share({title:r.title,text:r.intro,url:location.href});else{await navigator.clipboard.writeText(r.title+" · "+location.href);e.currentTarget.textContent="Enlace copiado ✓"}}catch(err){}})
function renderReuseNetwork(){
 const entry=window.CSL_REUSE_MAP?.[r.slug];if(!entry||document.querySelector(".csl-reuse-network"))return;
 const rel=entry.links||[],producer=rel.find(x=>x.type==="produces"&&x.recipes?.length),consumer=rel.find(x=>x.type==="uses"&&x.recipes?.length);
 const candidates=(producer?.recipes||consumer?.recipes||[]).slice(0,3);
 if(!candidates.length&&!entry.reuse?.length)return;
 const sec=document.createElement("section");sec.className="csl-reuse-network";
 let title="Que esta receta te ahorre trabajo mañana.";
 let copy="La idea no es guardar sobras sin plan: es dejar una parte lista para convertirla en otra comida.";
 let kicker="Haz que una receta empuje a la siguiente";
 if(producer){title="Haz un poco más hoy.";copy="Esta receta puede dejar "+producer.label+" listo para otra comida. Si ya tienes la cocina en marcha, aprovecha el trabajo.";kicker="Cocina una vez, transforma después"}
 else if(consumer){title="Si ya tienes "+consumer.label+", no empieces de cero.";copy="Esta receta puede aprovechar una base que ya tengas preparada. Ahí es donde cocinar antes empieza a devolverte tiempo.";kicker="Empieza desde lo que ya existe"}
 const cards=candidates.map(x=>'<a class="csl-reuse-link" href="/recetas/'+encodeURIComponent(x.slug)+'/"><small>'+(producer?'DESPUÉS PUEDES HACER':'PREPARA ANTES')+'</small><b>'+String(x.title||"").replace(/[<>&]/g,"")+'</b><span>'+(x.time||"Ver receta")+' →</span></a>').join("");
 const tip=(entry.reuse||[])[0];
 sec.innerHTML='<div class="wrap csl-reuse-box"><div class="csl-reuse-head"><div><div class="eyebrow">'+kicker+'</div><h2>'+title+'</h2></div><p>'+copy+'</p></div>'+(cards?'<div class="csl-reuse-links">'+cards+'</div>':'')+(tip?'<div class="csl-reuse-tip"><b>Mi criterio:</b> '+String(tip).replace(/[<>&]/g,"")+'</div>':'')+'</div>';
 const target=document.querySelector(".related-grid")?.closest(".section")||document.querySelector(".csl-continue")||document.querySelector("footer");
 target?.insertAdjacentElement("beforebegin",sec);
}
if(window.CSL_REUSE_MAP)renderReuseNetwork();else{const s=document.createElement("script");s.src="/assets/reuse-map.js";s.onload=renderReuseNetwork;document.head.appendChild(s)}
function renderIngredientPaths(){
 if(document.querySelector(".csl-ingredient-paths"))return;
 const hay=(String(r.title||"")+" "+(r.ingredients||[]).join(" ")).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const uses=(r.batch?.uses||[]).map(x=>x.key);
 const options=[];
 const add=(href,label)=>{if(!options.some(x=>x.href===href))options.push({href,label})};
 if(hay.includes("tomate"))add("/recetas-con-tomate","Más ideas con tomate");
 if(hay.includes("calabac"))add("/recetas-con-calabacin","Qué hacer con calabacín");
 if(hay.includes("huevo"))add("/que-cocinar-con-huevos","Más cenas con huevos");
 if(hay.includes("arroz"))add("/recetas-con-arroz","Qué hacer con arroz");
 if(hay.includes("garbanzo"))add("/que-hacer-con-garbanzos-cocidos","Qué hacer con garbanzos cocidos");
 if(uses.includes("pollo-cocinado"))add("/que-hacer-con-pollo-cocido","Qué hacer con pollo cocido");
 else if(hay.includes("pollo"))add("/recetas-con-pollo","Más ideas con pollo");
 if(!options.length)return;
 const sec=document.createElement("section");sec.className="csl-ingredient-paths";
 sec.innerHTML='<div class="wrap csl-ingredient-paths-box"><div class="csl-ingredient-paths-copy"><small>Si te queda ingrediente</small><b>No vuelvas a empezar de cero.</b></div><div class="csl-ingredient-links">'+options.slice(0,3).map(x=>'<a href="'+x.href+'">'+x.label+' →</a>').join("")+'</div></div>';
 const target=document.querySelector(".csl-continue")||document.querySelector("footer");
 target?.insertAdjacentElement("beforebegin",sec);
}
renderIngredientPaths();
const relatedSection=document.querySelector(".related-grid")?.closest(".section");
if(relatedSection&&!document.querySelector(".csl-continue")){
 const uses=(r.plan?.need||[]).slice(0,2).join(",");
 const sec=document.createElement("section");
 sec.className="section csl-continue";
 sec.innerHTML='<div class="wrap csl-continue-box"><div><div class="eyebrow">Sigue sin volver a empezar</div><h2>¿Qué necesitas después?</h2><p>La receta termina aquí; la organización no tiene por qué hacerlo.</p></div><div class="csl-continue-actions"><a class="btn primary" href="/que-cocino'+(uses?'?ingredientes='+encodeURIComponent(uses)+'&objetivo=aprovechar':'')+'">Resolver otra comida</a><a class="btn" href="/plan-semana">Organizar 5 cenas</a><a class="btn" href="/mi-rincon">Volver a Mi cocina</a></div></div>';
 relatedSection.insertAdjacentElement("afterend",sec);
}
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