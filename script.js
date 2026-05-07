let modeAktif = 'berita'; // default tab berita

function gantiTab(mode) {
  modeAktif = mode;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  const placeholder = mode === 'berita' ? 'Cari berita MSN...' : 'Cari di web...';
  document.getElementById('keyword').placeholder = placeholder;
  document.getElementById('hasil').innerHTML = '';
}

async function cari() {
  const keyword = document.getElementById('keyword').value.trim();
  if (!keyword) {
    alert('Isi kata kunci dulu');
    return;
  }
  
  const hasilDiv = document.getElementById('hasil');
  const loadingDiv = document.getElementById('loading');
  
  loadingDiv.style.display = 'block';
  hasilDiv.innerHTML = '';

  // Panggil API sesuai tab yg aktif
  const endpoint = modeAktif === 'berita' ? '/api/berita' : '/api/web';

  try {
    const res = await fetch(${endpoint}?q=${encodeURIComponent(keyword)});
    const data = await res.json();

    if (data.error) {
      hasilDiv.innerHTML = <div class="error">Error: ${data.error}</div>;
      return;
    }

    if (data.length === 0) {
      hasilDiv.innerHTML = <div class="empty">Hasil untuk "${keyword}" tidak ditemukan</div>;
      return;
    }

    hasilDiv.innerHTML = <h2>Hasil ${modeAktif === 'berita' ? 'Berita MSN' : 'Web'} untuk "${keyword}"</h2>;
    
    data.forEach(item => {
      const tgl = item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
      }) : '';
      
      hasilDiv.innerHTML += 
        <article class="card">
          ${item.gambar ? <img src="${item.gambar}" alt="${item.judul}" class="thumb"> : ''}
          <div class="content">
            <h3><a href="${item.link}" target="_blank" rel="noopener">${item.judul}</a></h3>
            <p class="meta">${item.sumber} ${tgl ? '• ' + tgl : ''}</p>
            <p class="desc">${item.deskripsi}</p>
          </div>
        </article>
      ;
    });

  } catch (err) {
    hasilDiv.innerHTML = <div class="error">Gagal ambil data. Coba lagi.</div>;
  } finally {
    loadingDiv.style.display = 'none';
  }
}

window.addEventListener('load', cari);
document.getElementById('keyword').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') cari();
});
