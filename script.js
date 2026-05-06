let running = false;

const words = ["kucing","mobil","game","film","teknologi"];

function randomQuery(){
  return words[Math.floor(Math.random()*words.length)] + " " + Math.floor(Math.random()*1000);
}

function randomDelay(min,max){
  return (Math.random()*(max-min)+min)*1000;
}

// ================= START =================
function start(){
  const max = parseInt(target.value);
  const min = parseInt(minDelay.value);
  const maxD = parseInt(maxDelay.value);

  localStorage.setItem("running", "true");
  localStorage.setItem("count", "0");
  localStorage.setItem("max", max);
  localStorage.setItem("min", min);
  localStorage.setItem("maxD", maxD);

  runLoop();
}

// ================= LOOP =================
function runLoop(){
  if(localStorage.getItem("running") !== "true") return;

  let count = parseInt(localStorage.getItem("count"));
  let max = parseInt(localStorage.getItem("max"));
  let min = parseInt(localStorage.getItem("min"));
  let maxD = parseInt(localStorage.getItem("maxD"));

  if(count >= max){
    localStorage.setItem("running", "false");
    return;
  }

  count++;
  localStorage.setItem("count", count);

  const delay = randomDelay(min,maxD);

  // buka Bing
  setTimeout(()=>{
    window.location.href = "https://www.bing.com/search?q=" + encodeURIComponent(randomQuery());
  }, 1000);

  // balik ke halaman utama
  setTimeout(()=>{
    window.location.href = window.location.origin;
  }, delay + 2000);
}

// ================= AUTO LANJUT =================
window.onload = function(){
  if(localStorage.getItem("running") === "true"){
    setTimeout(runLoop, 2000);
  }
};

// ================= STOP =================
function stop(){
  localStorage.setItem("running", "false");
}
