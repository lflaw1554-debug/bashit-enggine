const tgt =
    parseInt(
      document.getElementById("tgtB").value
    );

  const min =
    parseInt(
      document.getElementById("vMinB").value
    );

  const max =
    parseInt(
      document.getElementById("vMaxB").value
    );

  let count =
    parseInt(
      localStorage.getItem("countB")
    );

  if(count >= tgt){

    notify("ALL MISSIONS COMPLETED");

    document.getElementById("msgB").innerText =
      "COMPLETED";

    document.getElementById("finalNote").style.display =
      "block";

    localStorage.setItem("running", "false");

    return;

  }

  count++;

  localStorage.setItem("countB", count);

  cB = count;

  document.getElementById("doneB").innerText =
    String(count).padStart(2, "0");

  document.getElementById("fillB").style.width =
    (count / tgt * 100) + "%";

  const delay = randomDelay(min, max);

  const query = randomQuery();

  document.getElementById("msgB").innerText =
    "SEARCHING...";

  activeWin = window.open(
    "https://www.bing.com/search?q=" +
    encodeURIComponent(query),
    "_blank"
  );

  currentTimer = setTimeout(()=>{

    if(activeWin){

      activeWin.close();

    }

    runBing();

  }, delay);

}

// ================= PAUSE =================

function togglePause(){

  isPaused = !isPaused;

  const btn =
    document.getElementById("btnPause");

  if(isPaused){

    clearTimeout(currentTimer);
    clearTimeout(safetyTimer);

    if(activeWin){

      activeWin.close();

    }

    btn.innerText = "RESUME";

    notify("PAUSED");

  }else{

    btn.innerText = "HOLD";

    notify("RESUMED");

    if(document.getElementById("onM").checked){

      runMsn();

    }else{

      runBing();

    }

  }

}

// ================= THEME =================

function toggleTheme(){

  document.body.classList.toggle("light-mode");

  notify("THEME CHANGED");

}

// ================= SOUND =================

function toggleSound(){

  notify("SOUND TOGGLED");

}

// ================= LANGUAGE =================

function toggleLang(){

  notify("LANGUAGE CHANGED");

}

// ================= AUTO RESUME =================

window.onload = function(){

  // langsung tampil app utama
  const appFrame =
    document.getElementById("appFrame");

  if(appFrame){

    appFrame.style.display = "flex";

  }

  // sembunyikan login screen kalau masih ada
  const loginScreen =
    document.getElementById("loginScreen");

  if(loginScreen){

    loginScreen.style.display = "none";

  }

  if(
    localStorage.getItem("running")
    === "true"
  ){

    notify("RESTORING SESSION");

  }

};
