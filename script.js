const hasilDiv = document.getElementById('hasil');
const loadingDiv = document.getElementById('loading');
const keywordInput = document.getElementById('keyword');

async function cariBerita() {
  const keyword = keywordInput.value.trim();
  if (!keyword) {
    alert('Isi kata kunci dulu ya');
    return;
  }
  
  loadingDiv.style.display = 'block';
  hasilDiv.innerHTML = '';

  try {
    const res = await fetch(/api/berita?q=${encodeURIComponent(keyword)});
    const data = await res.json();

    if (data.error) {
      hasilDiv.innerHTML = <div class="error">Error: ${data.error}</div>;
      return;
    }

    if (data.length === 0) {
      hasilDiv.innerHTML = <div class="empty">Berita tentang "${keyword}" tidak ditemukan 😢</div>;
      return;
    }

    hasilDiv.innerHTML = <h2>Hasil untuk "${keyword}"</h2>;
    
    data.forEach(item => {
      const tgl = new Date(item.tanggal).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      
      hasilDiv.innerHTML += 
        <article class="card">
          ${item.gambar ? <img src="${item.gambar}" alt="${item.judul}" class="thumb"> : ''}
          <div class="content">
            <h3><a href="${item.link}" target="_blank" rel="noopener">${item.judul}</a></h3>
            <p class="meta">${item.sumber} • ${tgl}</p>
            <p class="desc">${item.deskripsi}</p>
          </div>
        </article>
      ;
    });

  } catch (err) {
    hasilDiv.innerHTML = <div class="error">Gagal ambil data. Cek koneksi kamu.</div>;
  } finally {
    loadingDiv.style.display = 'none';
  }
}

// Auto cari pas web dibuka
window.addEventListener('load', cariBerita);

// Enter buat cari
keywordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') cariBerita();
});
