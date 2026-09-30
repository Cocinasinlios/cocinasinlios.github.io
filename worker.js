const EVENTS=new Set([
  "page_view","favorite_toggle","plan_swap","plan_save","plan_generate","plan_regenerate",
  "meal_picker_generate","meal_picker_regenerate","add_to_week","share","use_soon",
  "recipe_open","tool_open","internal_nav"
]);
const SOURCE=new Set(["direct","internal","external"]);
const VIEWPORT=new Set(["mobile","tablet","desktop"]);
function clean(value,max=120){return String(value??"").slice(0,max).replace(/[<>]/g,"")}
export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(url.pathname!=="/__csl/events") return env.ASSETS.fetch(request);
    if(request.method!=="POST") return new Response(null,{status:405,headers:{"Allow":"POST","Cache-Control":"no-store"}});
    const origin=request.headers.get("origin");
    if(origin&&origin!==url.origin) return new Response(null,{status:403,headers:{"Cache-Control":"no-store"}});
    const length=Number(request.headers.get("content-length")||0);
    if(length>4096) return new Response(null,{status:413,headers:{"Cache-Control":"no-store"}});
    let body;
    try{body=await request.json()}catch(e){return new Response(null,{status:400,headers:{"Cache-Control":"no-store"}})}
    const event=clean(body.event,40);
    if(!EVENTS.has(event)) return new Response(null,{status:204,headers:{"Cache-Control":"no-store"}});
    const path=clean(body.path,160).startsWith("/")?clean(body.path,160):"/";
    const target=clean(body.target,160);
    const source=SOURCE.has(body.source)?body.source:"direct";
    const viewport=VIEWPORT.has(body.viewport)?body.viewport:"desktop";
    env.ANALYTICS.writeDataPoint({
      blobs:[event,path,target,source,viewport],
      doubles:[1],
      indexes:["csl-v1"]
    });
    return new Response(null,{status:204,headers:{"Cache-Control":"no-store"}});
  }
};
