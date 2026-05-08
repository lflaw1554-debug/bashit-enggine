// TARUH DI PALING ATAS script.js
const linkMsnKamu = [
  'https://www.msn.com/en-gb/travel/news/holidaymakers-told-to-arrive-four-hours-early-or-miss-flights-in-ees-chaos/ss-AA22lkS6?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/news/uknews/starmer-under-threat-over-trojan-horse-plot-to-smuggle-rival-back-to-replace-him/ar-AA22wWGb?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/entertainment/tv/badenoch-starmer-s-finished-and-polanski-s-a-joke-we-re-the-only-serious-choice/ar-AA22xk97?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/entertainment/news/king-charles-allegedly-slams-top-dog-authority-prince-william-told-to-know-his-place/ar-AA22wXBc?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/travel/news/coventry-airport-to-close-after-90-years-with-all-flights-scrapped-within-weeks/ar-AA22wiSz?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/money/other/aldi-and-lidl-rule-could-be-forced-to-change-as-uk-supermarkets-demand-crackdown/ar-AA22wfrY?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/news/uknews/starmer-s-last-ditch-plea-as-labour-braces-for-local-election-disaster/ar-AA22yUxG?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/travel/news/uk-staycation-demand-rises-as-airlines-told-they-can-cancel-flights/ss-AA22qn5L?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/lifestyle/family-relationships/report-queen-camilla-s-ex-husband-now-right-hand-man-to-princess-anne/ss-AA22i4Ea?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/foodanddrink/other/binman-s-rule-to-anyone-recycling-tins-and-jars-with-labels-left-on/ar-AA1X2DRu?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/money/other/britain-sleepwalking-towards-jobless-generation-warn-retailers/ar-AA22AqRQ?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/news/uknews/keir-starmer-to-use-eu-reset-to-stave-off-leadership-challenge/ar-AA22zFsq?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/money/technology/all-gmail-users-urged-to-check-one-setting-now-as-important-warning-issued/ar-AA22ueZv?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
  'https://www.msn.com/en-gb/news/world/sky-news-halted-for-ultimate-humiliation-breaking-news-alert-for-donald-trump/ar-AA22vBj6?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp',
];

const keywordBingKamu = [
  'makanan sehat',
  'diet kuu', 
  'mudah'
];

let msnActive = false;
let bingActive = false;
let msnCounter = 0;
let bingCounter = 0;
let msnTimeout = null;
let bingTimeout = null;

// Helper update counter
function updateCounter(type, value) {
  document.getElementById(`current${type}`).innerText = String(value).padStart(2, '0');
}

// Toggle MSN
document.getElementById('toggleMsn').onclick = function() {
  msnActive = !msnActive; // FIX: pake spasi
  this.classList.toggle('active', msnActive);
  const status = document.getElementById('statusMsn');
  status.innerText = msnActive ? 'RUNNING' : 'READY';
  status.classList.toggle('ready', !msnActive);
  
  if (!msnActive) {
    clearTimeout(msnTimeout); // FIX: clearTimeout bukan clearInterval
    msnCounter = 0;
    updateCounter('Msn', 0);
  }
}

// Toggle Bing
document.getElementById('toggleBing').onclick = function() {
  bingActive = !bingActive; // FIX: pake spasi
  this.classList.toggle('active', bingActive);
  const status = document.getElementById('statusBing');
  status.innerText = bingActive ? 'RUNNING' : 'STANDBY';
  
  if (!bingActive) {
    clearTimeout(bingTimeout); // FIX: clearTimeout
    bingCounter = 0;
    updateCounter('Bing', 0);
  }
}

// Update angka total saat input berubah
document.getElementById('targetMsn').oninput = (e) => {
  document.getElementById('totalMsn').innerText = e.target.value.padStart(2, '0');
}
document.getElementById('targetBing').oninput = e => {
  document.getElementById('totalBing').innerText = e.target.value.padStart(2, '0');
}

// Fungsi runMsn
function runMsn() {
  const targetMsn = parseInt(document.getElementById('targetMsn').value);
  const minDelayMsn = parseInt(document.getElementById('minDelayMsn').value) * 1000;
  const maxDelayMsn = parseInt(document.getElementById('maxDelayMsn').value) * 1000;

  if (msnCounter >= targetMsn || !msnActive) {
    clearTimeout(msnTimeout);
    document.getElementById('statusMsn').innerText = 'COMPLETE';
    checkAllComplete();
    return;
  }
  
  const urlMsn = linkMsnKamu[msnCounter % linkMsnKamu.length];
  window.open(urlMsn, '_blank');
  
  msnCounter++;
  updateCounter('Msn', msnCounter);
  
  const delay = Math.random() * (maxDelayMsn - minDelayMsn) + minDelayMsn;
  msnTimeout = setTimeout(runMsn, delay);
}

// Fungsi runBing
function runBing() {
  const targetBing = parseInt(document.getElementById('targetBing').value);
  const minDelayBing = parseInt(document.getElementById('minDelayBing').value) * 1000;
  const maxDelayBing = parseInt(document.getElementById('maxDelayBing').value) * 1000;

  if (bingCounter >= targetBing || !bingActive) {
    clearTimeout(bingTimeout);
    document.getElementById('statusBing').innerText = 'COMPLETE';
    checkAllComplete();
    return;
  }
  
  const keyword = keywordBingKamu[bingCounter % keywordBingKamu.length];
  const urlBing = `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`;
  window.open(urlBing, '_blank');
  
  bingCounter++;
  updateCounter('Bing', bingCounter);
  
  const delay = Math.random() * (maxDelayBing - minDelayBing) + minDelayBing;
  bingTimeout = setTimeout(runBing, delay);
}

// Cek apakah semua udah selesai
function checkAllComplete() {
  const msnDone = !msnActive || msnCounter >= parseInt(document.getElementById('targetMsn').value);
  const bingDone = !bingActive || bingCounter >= parseInt(document.getElementById('targetBing').value);
  if (msnDone && bingDone) {
    document.getElementById('executeBtn').disabled = false;
  }
}

// Tombol Eksekusi - HANYA 1 KALI INI AJA
document.getElementById('executeBtn').onclick = () => {
  if (!msnActive && !bingActive) {
    alert('Aktifkan minimal 1 engine dulu!');
    return;
  }
  
  // Reset counter
  msnCounter = 0;
  bingCounter = 0;
  updateCounter('Msn', 0);
  updateCounter('Bing', 0);
  
  // Disable tombol
  document.getElementById('executeBtn').disabled = true;
  
  // Mulai jalan
  if (msnActive) runMsn();
  if (bingActive) runBing();
}
