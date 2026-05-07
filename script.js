async function mulaiOperasi() {
  const btn = document.querySelector('.eksekusi');
  btn.disabled = true;
  btn.textContent = 'MEMPROSES...';
  
  document.getElementById('hasil').innerHTML = '';

  // Jalankan MSN kalau toggle ON
  if (document.getElementById('toggle-msn').checked) {
    await prosesMSN();
  }

  // Jalankan Bing kalau toggle ON
  if (document.getElementById('toggle-bing').checked) {
    await prosesBing();
  }

  btn.disabled = false;
  btn.textContent = 'EKSEKUSI OPERASI';
}

async function prosesMSN() {
  const query = document.getElementById('query-msn').value;
  const situs = document.getElementById('situs-msn').value;
  const statusEl = document.querySelectorAll('.status');
  
  statusEl.textContent = 'MENCARI BERITA...';

  let siteQuery = 'site:msn.com';
  if (situs.trim()) {
    const situsArr = situs.split(',').map(s => site:${s.trim()}).join(' OR ');
    siteQuery = (site:msn.com OR ${situsArr});
  }

  const finalQuery = ${query} ${siteQuery};
  
  try {
    const res = await fetch(/api/berita?q=${encodeURIComponent(finalQuery)});
    const data = await res.json();
    
    document.getElementById('count-msn').textContent = String(data.length).padStart(2, '0');
    document.getElementById('total-msn').textContent = data.length;
    document.getElementById('prog-msn').style.width = '100%';
    
    tampilkanHasil(data, 'MSN');
    statusEl.textContent = 'SELESAI';
  } catch (e) {
    statusEl.textContent = 'ERROR';
  }
}

async function prosesBing() {
  const query = document.getElementById('query-bing').value;
  const situs = document.getElementById('situs-bing').value;
  const statusEl = document.getElementById('status-bing');
  
  statusEl.textContent = 'MENCARI WEB...';

  let finalQuery = query;
  if (situs.trim()) {
    const situsArr = situs.split(',').map(s => site:${s.trim()}).join(' OR ');
    finalQuery = ${query} (${situsArr});
  }
  
  try {
    const res = await fetch(/api/web?q=${encodeURIComponent(finalQuery)});
    const data = await res.json();
    
    document.getElementById('count-bing').textContent = String(data.length).padStart(2, '0');
    document.getElementById('total-bing').textContent = data.length;
    document.getElementById('prog-bing').style.width = '100%';
    
    tampilkanHasil(data, 'BING');
    statusEl.textContent = 'SELESAI';
  } catch (e) {
    statusEl.textContent = 'ERROR';
  }
}

function tampilkanHasil(data, tipe) {
  const hasilDiv = document.getElementById('hasil');
  hasilDiv.innerHTML += <h3 style="color:#ffc700;margin:20px 0 10px 0;">HASIL ${tipe}</h3>;
  
  data.forEach(item => {
    const tgl = item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '';
    hasilDiv.innerHTML += 
      <div class="card">
        <h3><a href="${item.link}" target="_blank">${item.judul}</a></h3>
        <p class="meta">${item.sumber} ${tgl ? '• ' + tgl : ''}</p>
        <p class="desc">${item.deskripsi}</p>
      </div>
    ;
  });
}
