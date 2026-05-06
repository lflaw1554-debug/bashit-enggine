let running = false;

const words = ["liga inggris","liga 1","mobil terbaru","cuaca","harga emas harta dinata","harga emas antam"];

const newsUrls = [
  "https://www.bing.com/news",
  "https://www.bing.com/news/search?q=teknologi",
  "https://www.bing.com/news/search?q=game"
];

function randomQuery(){
  return words[Math.floor(Math.random()*words.length)] + " " + Math.floor(Math.random()*1000);
}

function randomDelay(min,max){
  return (Math.random()*(max-min)+min)*1000;
}

function start(){
  running = true;
  startBing();
  startNews();
}

function stop(){
  running = false;
}

/* ================= BING ================= */
function startBing(){
  if(!engineToggle.checked) return;

  let count = 0;
  const max = parseInt(target.value);
  const min = parseInt(minDelay.value);
  const maxD = parseInt(maxDelay.value);

  function loop(){
    if(!running || count >= max) return;

    count++;
    progress.innerText = count + " / " + max;

    const delay = randomDelay(min,maxD);

    // buka search
    window.location.href = "https://www.bing.com/search?q=" + encodeURIComponent(randomQuery());

    // balik ke halaman utama
    setTimeout(() => {
      window.location.href = window.location.origin;
    }, delay);

    // ulang
    setTimeout(loop, delay + 2000);
  }

  loop();
}

/* ================= NEWS ================= */
function startNews(){
  if(!newsToggle.checked) return;

  let count = 0;
  const max = parseInt(newsTarget.value);
  const min = parseInt(newsMinDelay.value);
  const maxD = parseInt(newsMaxDelay.value);

  function loop(){
    if(!running || count >= max) return;

    count++;
    newsProgress.innerText = count + " / " + max;

    const delay = randomDelay(min,maxD);

    window.location.href = newsUrls[Math.floor(Math.random()*newsUrls.length)];

    setTimeout(() => {
      window.location.href = window.location.origin;
    }, delay);

    setTimeout(loop, delay + 2000);
  }

  loop();
}
