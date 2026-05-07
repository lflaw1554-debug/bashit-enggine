// TARUH DI PALING ATAS script.js
const linkMsnKamu = [
  'https://website-kamu.com/berita-1',
  'https://website-kamu.com/berita-2', 
  'https://website-kamu.com/berita-3',
  'https://website-kamu.com/berita-4'
];

const keywordBingKamu = [
  'produk unggulan kamu',
  'artikel terbaru website kamu',
  'promo website kamu'
];

// Terus di dalam fungsi runMsn(), ganti bagian ini:
function runMsn() {
  if (msnCounter >= targetMsn || !msnActive) {
    clearInterval(msnInterval);
    document.getElementById('statusMsn').innerText = 'COMPLETE';
    return;
  }
  
  // >>> INI CARA BUKA LINK MSN KAMU <<<
  const urlMsn = linkMsnKamu[msnCounter % linkMsnKamu.length];
  window.open(urlMsn, '_blank');
  
  msnCounter++;
  updateCounter('Msn', msnCounter);
  const delay = Math.random() * (maxDelayMsn - minDelayMsn) + minDelayMsn;
  msnInterval = setTimeout(runMsn, delay);
}

// Di dalam fungsi runBing(), ganti bagian ini:
function runBing() {
  if (bingCounter >= targetBing || !bingActive) {
    clearInterval(bingInterval);
    document.getElementById('statusBing').innerText = 'COMPLETE';
    return;
  }
  
  // >>> INI CARA BUKA PENCARIAN DI WEB KAMU <<<
  const keyword = keywordBingKamu[bingCounter % keywordBingKamu.length];
  const urlBing = `https://website-kamu.com/search?q=${encodeURIComponent(keyword)}`;
  window.open(urlBing, '_blank');
  
  bingCounter++;
  updateCounter('Bing', bingCounter);
  const delay = Math.random() * (maxDelayBing - minDelayBing) + minDelayBing;
  bingInterval = setTimeout(runBing, delay);
}
let msnActive = false;
let bingActive = false;

// Toggle MSN
document.getElementById('toggleMsn').onclick = function() {
  msnActive =!msnActive;
  this.classList.toggle('active', msnActive);
  document.getElementById('statusMsn').innerText = msnActive? 'RUNNING' : 'READY';
}

// Toggle Bing
document.getElementById('toggleBing').onclick = function() {
  bingActive =!bingActive;
  this.classList.toggle('active', bingActive);
  document.getElementById('statusBing').innerText = bingActive? 'RUNNING' : 'STANDBY';
}

// Update angka total saat input berubah
document.getElementById('targetMsn').oninput = (e) => {
  document.getElementById('totalMsn').innerText = e.target.value.padStart(2, '0');
}

// Tombol Eksekusi
document.getElementById('executeBtn').onclick = () => {
  if (!msnActive &&!bingActive) {
    alert('Aktifkan minimal 1 engine dulu!');
    return;
  }
  // Di sini kamu isi logika bot kamu sendiri
  console.log('Mulai eksekusi...');
}
