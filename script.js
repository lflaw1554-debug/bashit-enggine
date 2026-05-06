let running = false;

const defaultWords = [
  "kucing","anjing","mobil","gunung","film","musik","bola"
];

const newsUrls = [
  "https://www.bing.com/news",
  "https://www.bing.com/news/search?q=teknologi",
  "https://www.bing.com/news/search?q=gaming",
  "https://www.bing.com/news/search?q=crypto"
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
    if(!running || count>=max) return;

    count++;
    progress.innerText = count+" / "+max;

    window.open("https://www.bing.com/search?q="+encodeURIComponent(randomQuery()));

    setTimeout(loop, randomDelay(min,maxD));
  }
  loop();
}

// NEWS
function startNews(){
  if(!document.getElementById("newsToggle").checked) return;

  let count = 0;
  const max = parseInt(newsTarget.value);
  const min = parseInt(newsMinDelay.value);
  const maxD = parseInt(newsMaxDelay.value);

  function loop(){
    if(!running || count>=max) return;

    count++;
    newsProgress.innerText = count+" / "+max;

    window.open(newsUrls[Math.floor(Math.random()*newsUrls.length)]);

    setTimeout(loop, randomDelay(min,maxD));
  }
  loop();
}