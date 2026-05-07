export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS biar bisa diakses dari browser
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // API: /api/berita?q=keyword
    if (url.pathname === "/api/berita") {
      const query = url.searchParams.get("q") || "berita indonesia";
      
      const bingRes = await fetch(https://api.bing.microsoft.com/v7.0/news/search?q=${encodeURIComponent(query)}&mkt=id-ID&count=10&sortBy=Date, {
        headers: { "Ocp-Apim-Subscription-Key": env.BING_API_KEY }
      });

      if (!bingRes.ok) {
        return new Response(JSON.stringify({ error: "Gagal ambil data dari Bing API" }), { 
          status: 500, headers: {...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      const data = await bingRes.json();
      const hasil = data.value?.map(item => ({
        judul: item.name,
        sumber: item.provider[0].name,
        deskripsi: item.description,
        link: item.url,
        tanggal: item.datePublished,
        gambar: item.image?.thumbnail?.contentUrl || null
      })) || [];

      return new Response(JSON.stringify(hasil), {
        headers: {...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Selain /api/berita, tampilkan file static: index.html, style.css, dll
    return env.ASSETS.fetch(request);
  }
}
