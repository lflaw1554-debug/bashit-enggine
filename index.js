export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // API 1: /api/berita -> khusus berita MSN
      if (url.pathname === "/api/berita") {
        const query = url.searchParams.get("q") || "indonesia";
        
        // FIX 1: Pake backtick + encode site:msn.com ke dalam query
        const fullQuery = `${query} site:msn.com`;
        const bingUrl = `https://api.bing.microsoft.com/v7.0/news/search?q=${encodeURIComponent(fullQuery)}&mkt=id-ID&count=12&sortBy=Date`;
        
        const bingRes = await fetch(bingUrl, {
          headers: { "Ocp-Apim-Subscription-Key": env.BING_API_KEY }
        });

        if (!bingRes.ok) {
          const errText = await bingRes.text();
          return jsonError(`Bing API error: ${bingRes.status} - ${errText}`, 500, corsHeaders);
        }
        
        const data = await bingRes.json();
        const hasil = data.value?.map(item => ({
          tipe: "berita",
          judul: item.name,
          sumber: "MSN",
          deskripsi: item.description,
          link: item.url,
          tanggal: item.datePublished,
          gambar: item.image?.thumbnail?.contentUrl || null
        })) || [];

        return new Response(JSON.stringify(hasil), {
          headers: {...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // API 2: /api/web -> pencarian web umum di Bing
      if (url.pathname === "/api/web") {
        const query = url.searchParams.get("q") || "microsoft";
        
        // FIX 2: Pake backtick juga
        const bingUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}&mkt=id-ID&count=10&responseFilter=Webpages`;
        
        const bingRes = await fetch(bingUrl, {
          headers: { "Ocp-Apim-Subscription-Key": env.BING_API_KEY }
        });

        if (!bingRes.ok) {
          const errText = await bingRes.text();
          return jsonError(`Bing API error: ${bingRes.status} - ${errText}`, 500, corsHeaders);
        }
        
        const data = await bingRes.json();
        const hasil = data.webPages?.value?.map(item => ({
          tipe: "web",
          judul: item.name,
          sumber: new URL(item.url).hostname.replace('www.',''),
          deskripsi: item.snippet,
          link: item.url,
          tanggal: item.dateLastCrawled || null
        })) || [];

        return new Response(JSON.stringify(hasil), {
          headers: {...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return env.ASSETS.fetch(request);
      
    } catch (err) {
      return jsonError(`Worker error: ${err.message}`, 500, corsHeaders);
    }
  }
}

function jsonError(msg, status, corsHeaders) {
  return new Response(JSON.stringify({ error: msg }), { 
    status, headers: {...corsHeaders, "Content-Type": "application/json" }
  });
}
