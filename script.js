function writeLog(msg, color = "#444") {

  const log = document.getElementById("log-box");
  const time = new Date().toLocaleTimeString();

  log.innerHTML += `
    <div style="color:${color}">
      [${time}] > ${msg}
    </div>
  `;

  log.scrollTop = log.scrollHeight;
}

async function runProPlayer() {

  const bingTarget = parseInt(document.getElementById("bing-target").value);
  const msnTarget = parseInt(document.getElementById("msn-target").value);

  const minD = parseInt(document.getElementById("minD").value);
  const maxD = parseInt(document.getElementById("maxD").value);

  const btn = document.getElementById("btn-execute");

  const msnStatus = document.getElementById("msn-status").value;
  const bingStatus = document.getElementById("bing-status").value;

  btn.disabled = false;

  btn.innerText = "STOP / MUAT ULANG 😎";
  btn.style.background = "#ef4444";

  btn.onclick = function () {

    if (confirm("Hentikan semua operasi?")) {
      location.reload();
    }

  };

  document.getElementById("bing-total").innerText = bingTarget;
  document.getElementById("msn-total").innerText = msnTarget;

  writeLog("MEMULAI OPERASI ELITE...", "#facc15");

  // MSN
  if (msnStatus === "ON" && msnTarget > 0) {

    writeLog("MEMULAI ENGINE MSN NEWS...", "#eab308");

    for (let i = 1; i <= msnTarget; i++) {

      let newsUrl =
        msnLinks[Math.floor(Math.random() * msnLinks.length)];

      writeLog(`[${i}/${msnTarget}] MEMBUKA MSN...`, "#eab308");

      const winMsn = window.open(newsUrl, "_blank");

      if (!winMsn) {

        writeLog("POP-UP DIBLOKIR!", "red");
        break;

      }

      await new Promise(r => setTimeout(r, 6000));

      winMsn.close();

      document.getElementById("msn-done").innerText =
        i < 10 ? "0" + i : i;

      await new Promise(r => setTimeout(r, 1500));

    }

  }

  // BING
  if (bingStatus === "ON" && bingTarget > 0) {

    writeLog("PINDAH KE ENGINE BING SEARCH...", "#fff");

    for (let i = 1; i <= bingTarget; i++) {

      let rawQ =
        islamicQueries[
          Math.floor(Math.random() * islamicQueries.length)
        ];

      let q = rawQ + " " + Math.floor(Math.random() * 999);

      let delay =
        Math.floor(Math.random() * (maxD - minD + 1)) + minD;

      writeLog(
        `[${i}/${bingTarget}] SEARCH: "${q}"`,
        "#fff"
      );

      const winBing = window.open(
        "https://www.bing.com/search?q=" +
        encodeURIComponent(q),
        "_blank"
      );

      if (!winBing) {

        writeLog("POP-UP DIBLOKIR!", "red");
        break;

      }

      let progress = 0;

      const step = 100 / (delay * 2);

      const bar = document.getElementById("progress-bar");

      for (let d = 0; d < delay * 2; d++) {

        progress += step;

        bar.style.width = progress + "%";

        await new Promise(r => setTimeout(r, 100));

      }

      winBing.close();

      document.getElementById("bing-done").innerText =
        i < 10 ? "0" + i : i;

      bar.style.width = "0%";

      await new Promise(r => setTimeout(r, 1000));

    }

  }

  writeLog("SEMUA TUGAS SELESAI!", "#22c55e");

}
