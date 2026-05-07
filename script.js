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
