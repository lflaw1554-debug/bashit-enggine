function writeLog(msg, color = "#444") {

  const log = document.getElementById("log-box");

  if (!log) return;

  const time = new Date().toLocaleTimeString();

  log.innerHTML += `
    <div style="color:${color}">
      [${time}] > ${msg}
    </div>
  `;

  log.scrollTop = log.scrollHeight;
}

// ======================
// DATA
// ======================

const msnLinks = [
  "https://www.msn.com",
  "https://www.msn.com/en-gb/travel/news/holidaymakers-told-to-arrive-four-hours-early-or-miss-flights-in-ees-chaos/ss-AA22lkS6",
  "https://www.msn.com/en-gb/news/uknews/starmer-under-threat-over-trojan-horse-plot-to-smuggle-rival-back-to-replace-him/ar-AA22wWGb",
  "https://www.msn.com/en-gb/entertainment/tv/badenoch-starmer-s-finished-and-polanski-s-a-joke-we-re-the-only-serious-choice/ar-AA22xk97",
  "https://www.msn.com/en-gb/entertainment/news/king-charles-allegedly-slams-top-dog-authority-prince-william-told-to-know-his-place/ar-AA22wXBc",
  "https://www.msn.com/en-gb/travel/news/coventry-airport-to-close-after-90-years-with-all-flights-scrapped-within-weeks/ar-AA22wiSz"
];

const islamicQueries = [
  "islam itu indah",
  "bagaimana cara bikin kue",
  "resep rawon",
  "rendang dari mana",
  "mobil",
  "teknologi terbaru",
  "cara membuat kopi",
  "tips sehat",
  "wisata indonesia"
];

// ======================
// MAIN FUNCTION
// ======================

async function runProPlayer() {

  const bingTarget =
    parseInt(document.getElementById("bing-target")?.value || 0);

  const msnTarget =
    parseInt(document.getElementById("msn-target")?.value || 0);

  const minD =
    parseInt(document.getElementById("minD")?.value || 5);

  const maxD =
    parseInt(document.getElementById("maxD")?.value || 10);

  const btn =
    document.getElementById("btn-execute");

  const msnStatus =
    document.getElementById("msn-status")?.value || "OFF";

  const bingStatus =
    document.getElementById("bing-status")?.value || "OFF";

  // ======================
  // BUTTON STOP
  // ======================

  if (btn) {

    btn.innerText = "STOP / MUAT ULANG 😎";

    btn.style.background = "#ef4444";

    btn.onclick = function () {

      if (confirm("Hentikan semua operasi?")) {
        location.reload();
      }

    };

  }

  // ======================
  // COUNTER
  // ======================

  const bingTotal =
    document.getElementById("bing-total");

  const msnTotal =
    document.getElementById("msn-total");

  if (bingTotal) bingTotal.innerText = bingTarget;
  if (msnTotal) msnTotal.innerText = msnTarget;

  writeLog("MEMULAI OPERASI...", "#facc15");

  // ======================
  // MSN ENGINE
  // ======================

  if (msnStatus === "ON" && msnTarget > 0) {

    writeLog("MEMULAI MSN NEWS...", "#eab308");

    for (let i = 1; i <= msnTarget; i++) {

      let newsUrl =
        msnLinks[
          Math.floor(Math.random() * msnLinks.length)
        ];

      writeLog(
        `[${i}/${msnTarget}] MEMBUKA MSN`,
        "#eab308"
      );

      const winMsn =
        window.open(newsUrl, "_blank");

      if (!winMsn) {

        writeLog("POP-UP DIBLOKIR!", "red");
        break;

      }

      await new Promise(r => setTimeout(r, 6000));

      winMsn.close();

      const msnDone =
        document.getElementById("msn-done");

      if (msnDone) {

        msnDone.innerText =
          i < 10 ? "0" + i : i;

      }

      await new Promise(r => setTimeout(r, 1500));

    }

  }

  // ======================
  // BING ENGINE
  // ======================

  if (bingStatus === "ON" && bingTarget > 0) {

    writeLog("PINDAH KE BING SEARCH...", "#ffffff");

    for (let i = 1; i <= bingTarget; i++) {

      // QUERY RANDOM TANPA ANGKA
      let q =
        islamicQueries[
          Math.floor(Math.random() * islamicQueries.length)
        ];

      // DELAY RANDOM
      let delay =
        Math.floor(
          Math.random() * (maxD - minD + 1)
        ) + minD;

      writeLog(
        `[${i}/${bingTarget}] SEARCH: "${q}"`,
        "#ffffff"
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

      // ======================
      // PROGRESS BAR
      // ======================

      let progress = 0;

      const step =
        100 / (delay * 10);

      const bar =
        document.getElementById("progress-bar");

      for (let d = 0; d < delay * 10; d++) {

        progress += step;

        if (bar) {
          bar.style.width = progress + "%";
        }

        await new Promise(r => setTimeout(r, 100));

      }

      winBing.close();

      const bingDone =
        document.getElementById("bing-done");

      if (bingDone) {

        bingDone.innerText =
          i < 10 ? "0" + i : i;

      }

      if (bar) {
        bar.style.width = "0%";
      }

      await new Promise(r => setTimeout(r, 1000));

    }

  }

  // ======================
  // DONE
  // ======================

  writeLog("SEMUA TUGAS SELESAI!", "#22c55e");

  alert("OPERASI SELESAI!");

}

// ======================
// BUTTON START
// ======================

document.addEventListener("DOMContentLoaded", () => {

  const btn =
    document.getElementById("btn-execute");

  if (btn) {

    btn.addEventListener(
      "click",
      runProPlayer
    );

  }

});
