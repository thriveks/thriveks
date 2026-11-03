const SOURCES = [
  { id: "county-commission", label: "Leavenworth County Commission records", url: "https://files.leavenworthcounty.gov/government/county_commission/agenda.php", category: "County records" },
  { id: "county-planning", label: "County Planning and Zoning records", url: "https://files.leavenworthcounty.gov/departments/planning___zoning/schedule/index.php", category: "County records" },
  { id: "county-video-feed", label: "Leavenworth County official meeting recordings", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCIoaDlW1ch-QLR_HsaQMJQQ", category: "Official County video feed" },
  { id: "county-meetings-independent", label: "Leavenworth County meeting coverage (independent)", url: "https://citizenportal.ai/feed/53898", category: "Independent meeting coverage" },
  { id: "developer-newsroom", label: "Project Bluestem developer newsroom", url: "https://bluestemdatacenter.com/newsroom/", category: "Developer statements" },
  { id: "developer-materials", label: "Project Bluestem developer materials", url: "https://bluestemdatacenter.com/materials/", category: "Developer statements" }
];
const KEY = "status:v1";
function clean(s) {
  return String(s ?? "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&amp;/gi,"&").replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&nbsp;/gi," ").replace(/\s+/g," ").trim();
}
function pickLinks(html, base) {
  const found = new Map();
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const raw = (m[1].match(/href\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (!raw) continue;
    try {
      const u = new URL(raw.replace(/&amp;/g,"&"), base);
      if (u.protocol !== "https:" && u.protocol !== "http:") continue;
      u.hash = "";
      const name = clean(m[2]).slice(0,180);
      if (!name || /^(read more|learn more|download|home)$/i.test(name)) continue;
      if (!found.has(u.href)) found.set(u.href, {title:name,url:u.href});
    } catch {}
  }
  return Array.from(found.values()).slice(0,200);
}
function readAtomTag(entry, key) {
  const open = '<' + key + '>';
  const close = '</' + key + '>';
  const i = entry.indexOf(open);
  if (i < 0) return '';
  const j = entry.indexOf(close, i + open.length);
  return j < 0 ? '' : entry.slice(i + open.length, j).replace(/&amp;/g, '&').trim();
}
function parseOfficialVideos(xml) {
  return xml.split('<entry>').slice(1).map(chunk => {
    const part = chunk.split('</entry>')[0];
    const id = readAtomTag(part, 'yt:videoId');
    if (id.length !== 11 || !/^[a-zA-Z0-9_-]+$/.test(id)) return null;
    return {id, title:readAtomTag(part,'title'), publishedAt:readAtomTag(part,'published'), url:'https://www.youtube.com/watch?v=' + id};
  }).filter(Boolean).slice(0, 20);
}
async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,"0")).join("");
}
async function inspect(source, old, now) {
  const state = {...(old || {}), id:source.id, label:source.label, url:source.url, category:source.category, lastAttemptAt:now};
  try {
    const response = await fetch(source.url, {
      method:"GET",
      headers:{"Accept":"text/html,application/xhtml+xml","User-Agent":"ThriveKS-SourceMonitor/1.0 (+https://thriveks.com)"},
      redirect:"follow",
      signal:AbortSignal.timeout(18000)
    });
    state.httpStatus = response.status;
    if (!response.ok) throw new Error("HTTP "+response.status);
    const type = response.headers.get("content-type") || "";
    if (!/text\/html|application\/xhtml|application\/xml|text\/xml|application\/atom\+xml/i.test(type)) throw new Error("Unsupported response type");
    const html = (await response.text()).slice(0,500000);
    if (html.length < 200) throw new Error("Response unexpectedly short");
    const links = pickLinks(html,source.url);
    let observed;
    if (source.id === "developer-newsroom") {
      const listed = links.filter(l=>l.url.startsWith("https://bluestemdatacenter.com/") &&
         !/\/(newsroom|faqs|contact|materials|privacy-policy)\/?$/i.test(new URL(l.url).pathname) &&
         l.title.length > 13);
      state.latestLinks = listed.slice(0,8);
      observed = listed.map(l=>l.url+" "+l.title).sort().join("\n");
    } else if(source.category === "County records") {
      const docs = links.filter(l=>/agenda|commission|minutes|planning|meeting|packet|2026|2027|pdf/i.test(l.url+" "+l.title));
      observed = docs.map(l=>l.url+" "+l.title).sort().join("\n");
      state.listedDocumentCount = docs.length;
    } else {
      observed = links.map(l=>l.url+" "+l.title).sort().join("\n");
    }
    if (observed.length < 25) observed = clean(html).slice(0,18000);
    const digest = await sha256(observed);
    state.lastSuccessfulCheckAt = now;
    state.checkStatus = "ok";
    state.error = null;
    if (old?.digest && old.digest !== digest) {
      state.lastChangedAt = now;
      state.changeDetected = true;
    } else if (!old?.digest) {
      state.changeDetected = false;
      state.lastChangedAt = null;
    }
    state.digest = digest;
  } catch(err) {
    state.checkStatus = "unavailable";
    state.error = String(err?.message || err).slice(0,140);
  }
  return state;
}
async function refresh(env) {
  const now = new Date().toISOString();
  const old = await env.SOURCE_STATE.get(KEY, "json") || {};
  const sources = await Promise.all(SOURCES.map(s => inspect(s, (old.sources || []).find(x=>x.id===s.id), now)));
  const data = {
    schemaVersion:1,
    lastAttemptAt:now,
    lastSuccessfulCheckAt:sources.some(s=>s.checkStatus==="ok")?now:(old.lastSuccessfulCheckAt||null),
    sources,
    methodology:"Automated checks only detect publication or listing changes. They do not verify claims, approve project actions, or replace the reviewed historical timeline.",
    editorialReviewDate:"2026-11-03"
  };
  await env.SOURCE_STATE.put(KEY, JSON.stringify(data));
  return data;
}
function respond(value,code=200) {
  return new Response(JSON.stringify(value), {
    status:code,
    headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*","Cache-Control":"public,max-age=300","X-Content-Type-Options":"nosniff"}
  });
}
export default {
  async fetch(request,env) {
    const u = new URL(request.url);
    if (request.method !== "GET") return respond({error:"GET only"},405);
    if (u.pathname === "/health") return respond({ok:true,monitor:"Project Bluestem",schedule:"Every six hours (UTC)"});
    if (u.pathname !== "/status") return respond({error:"Not found"},404);
    try {
      let data=await env.SOURCE_STATE.get(KEY,"json");
      if(!data || !Array.isArray(data.sources) || data.sources.length !== SOURCES.length) data=await refresh(env);
      return respond(data);
    } catch(err) {
      return respond({error:"Source monitoring temporarily unavailable",detail:String(err?.message||err).slice(0,120)},503);
    }
  },
  scheduled(_event,env,ctx) {
    ctx.waitUntil(refresh(env));
  }
};
