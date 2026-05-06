let running = false;

const defaultWords = [
  "kucing","anjing","mobil","gunung","film","musik","bola"
];

const newsUrls = [
  "https://www.bing.com/news",
  "https://www.msn.com/id-id/berita/other/mbg-rp-55-triliun-jadi-kunci-jaga-pertumbuhan-ekonomi/ar-AA22tRpk",
  "https://www.msn.com/en-gb/news/uknews/don-t-believe-polanski-promises-says-starmer-on-london-elections/ar-AA22uvOk?ocid=sapphireappshare",
  "https://www.msn.com/en-gb/news/uknews/starmer-set-for-catastrophic-week-as-labour-vote-collapses/ar-AA22rRTJ?ocid=sapphireappshare"
];

function getWords(){
  const input = document.getElementById("customWords").value;
  if(input.trim() === "") return defaultWords;
  return input.split(",");
}

function randomQuery(){
  const words = getWords();
  const extra = ["2025","viral","terbaru","review"];
  return words[Math.floor(Math.random()*words.length)] + " " +
         extra[Math.floor(Math.random()*extra.length)];
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

// BING
function startBing(){
  if(!document.getElementById("engineToggle").checked) return;

  let count = 0;
  const max = parseInt(target.value);
  const min = parseInt(minDelay.value);
  const maxD = parseInt(maxDelay.value);

  function loop(){
    if(!running || count >= max) return;

    count++;
    progress.innerText = count + " / " + max;

    const delay = randomDelay(min, maxD);

    // pindah ke Bing
    window.location.href = "https://www.bing.com/search?q=" + encodeURIComponent(randomQuery());

    // balik lagi ke halaman utama
    setTimeout(() => {
      window.location.href = window.location.origin;
    }, delay);

    // ulang lagi
    setTimeout(loop, delay + 2000);
  }

  loop();
}
