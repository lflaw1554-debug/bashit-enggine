const linkMsnKamu = [
  'https://www.msn.com/en-gb/travel/news/holidaymakers-told-to-arrive-four-hours-early-or-miss-flights-in-ees-chaos/ss-AA22lkS6',
  'https://www.msn.com/en-gb/news/uknews/starmer-under-threat-over-trojan-horse-plot-to-smuggle-rival-back-to-replace-him/ar-AA22wWGb',
  'https://www.msn.com/en-gb/entertainment/tv/badenoch-starmer-s-finished-and-polanski-s-a-joke-we-re-the-only-serious-choice/ar-AA22xk97'
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

function updateCounter(type, value) {
  document.getElementById(`current${type}`).innerText = String(value).padStart(2, '0');
}

document.getElementById('toggleMsn').onclick = function() {
  msnActive = !msnActive;
  this.classList.toggle('active', msnActive);
  const status = document.getElementById('statusMsn');
  status.innerText = msnActive ? 'RUNNING' : 'READY';
  status.classList.toggle('ready', !msnActive);
  
  if (!msnActive) {
    clearTimeout(msnTimeout);
    msnCounter = 0;
    updateCounter('Msn', 0);
  }
}

document.getElementById('toggleBing').onclick = function() {
  bingActive = !bingActive;
  this.classList.toggle('active', bingActive);
  const status = document.getElementById('statusBing');
  status.innerText = bingActive ? 'RUNNING' : 'STANDBY';
  
  if (!bingActive) {
    clearTimeout(bingTimeout);
    bingCounter = 0;
    updateCounter('Bing', 0);
  }
}

document.getElementById('targetMsn').oninput = (e) => {
  document.getElementById('totalMsn').innerText = e.target.value.padStart(2, '0');
}
document.getElementById('targetBing').oninput = e => {
  document.getElementById('totalBing').innerText = e.target.value.padStart(2, '0');
}

function runMsn() {
  const targetMsn = parseInt(document.getElementById('targetMsn').value);
  const minDelayMsn = parseInt(document.getElementById('minDelayMsn').value) * 1000;
  const maxDelayMsn = parseInt(document.getElementById('maxDelayMsn').value) * 1000;

  if (msnCounter >= targetMsn || !msnActive) {
    clearTimeout(msnTimeout);
    document.getElementById('statusMsn').innerText = 'COMPLETE';
    return;
  }
  
  const urlMsn = linkMsnKamu[msnCounter % linkMsnKamu.length];
  window.open(urlMsn, '_blank');
  
  msnCounter++;
  updateCounter('Msn', msnCounter);
  
  const delay = Math.random() * (maxDelayMsn - minDelayMsn) + minDelayMsn;
  msnTimeout = setTimeout(runMsn, delay);
}

function runBing() {
  const targetBing = parseInt(document.getElementById('targetBing').value);
  const minDelayBing = parseInt(document.getElementById('minDelayBing').value) * 1000;
  const maxDelayBing = parseInt(document.getElementById('maxDelayBing').value) * 1000;

  if (bingCounter >= targetBing || !bingActive) {
    clearTimeout(bingTimeout);
    document.getElementById('statusBing').innerText = 'COMPLETE';
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

document.getElementById('executeBtn').onclick = () => {
  if (!msnActive && !bingActive) {
    alert('Aktifkan minimal 1 engine dulu!');
    return;
  }
  
  msnCounter = 0;
  bingCounter = 0;
  updateCounter('Msn', 0);
  updateCounter('Bing', 0);
  
  if (msnActive) runMsn();
  if (bingActive) runBing();
}
