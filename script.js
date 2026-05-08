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
