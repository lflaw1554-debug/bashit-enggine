console.log("SCRIPT MASUK");

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

// ================= DATA =================

const islamicQueries = [
  "doa harian islami",
  "asmaul husna lengkap",
  "jadwal sholat bogor",
  "keutamaan tahajud",
  "kisah nabi muhammad",
  "cara zakat mal",
  "kata kata Hari ini",
  "cuaca hari ini",
  "harga emas",
  "rupiah saat ini",
  "perak hari ini",
  "pertandingan liga 1 hari ini"
];

const msnLinks = [
  "https://www.msn.com",

  "https://www.msn.com/en-gb/news/uknews/liberal-democrats-demand-investigation-into-zack-polanski-s-professional-background/ar-AA22xHIm?ocid=sapphireappshare",

  "https://www.msn.com/en-gb/money/other/iconic-uk-bank-with-five-million-customers-to-be-wiped-from-high-streets-after-two-centuries/ar-AA22w2pu?ocid=sapphireappshare",

  "https://www.msn.com/en-gb/lifestyle/lifestylegeneral/i-m-a-vet-and-these-10-dog-breeds-are-the-only-ones-i-d-ever-own/ss-AA1WqtlP?ocid=sapphireappshare",

  "https://www.msn.com/en-gb/news/uknews/graham-linehan-praised-as-he-overcomes-sadiq-khan-social-media-shut-out-with-glorious-takedown/ar-AA22vPuu?ocid=sapphireappshare",

  "https://www.msn.com/en-gb/news/world/trump-pays-tribute-after-ted-turner-death-with-shot-at-cnn/ar-AA22wDEo?ocid=sapphireappshare"
];

// ================= MAIN =================

async function runProPlayer() {

  writeLog("MEMULAI OPERASI...", "#22c55e");

  const bingTarget =
    parseInt(document.getElementById("bing-target").value);

  const msnTarget =
    parseInt(document.getElementById("msn-target").value);

  const minD =
    parseInt(document.getElementById("minD").value);

  const maxD =
    parseInt(document.getElementById("maxD").value);

  const msnStatus =
    document.getElementById("msn-status").value;

  const bingStatus =
    document.getElementById("bing-status").value;

  // MSN
  if (msnStatus === "ON") {

    for (let i = 1; i <= msnTarget; i++) {

      const url =
        msnLinks[
          Math.floor(Math.random() * msnLinks.length)
        ];

      writeLog(
        `[${i}/${msnTarget}] MEMBUKA MSN`,
        "#eab308"
      );

      const win =
        window.open(url, "_blank");

      await new Promise(r =>
        setTimeout(r, 4000)
      );

      if (win) {
        win.close();
      }

      document.getElementById("msn-done").innerText =
        i.toString().padStart(2, "0");

    }

  }

  // BING
  if (bingStatus === "ON") {

    for (let i = 1; i <= bingTarget; i++) {

      const q =
        islamicQueries[
          Math.floor(Math.random() * islamicQueries.length)
        ];

      const delay =
        Math.floor(
          Math.random() * (maxD - minD + 1)
        ) + minD;

      writeLog(
        `[${i}/${bingTarget}] SEARCH ${q}`,
        "#60a5fa"
      );

      const win =
        window.open(
          "https://bing.com/search?q=" +
          encodeURIComponent(q),
          "_blank"
        );

      let progress = 0;

      const bar =
        document.getElementById("progress-bar");

      const interval = setInterval(() => {

        progress += 100 / delay;

        if (bar) {
          bar.style.width = progress + "%";
        }

      }, 1000);

      await new Promise(r =>
        setTimeout(r, delay * 1000)
      );

      clearInterval(interval);

      if (win) {
        win.close();
      }

      if (bar) {
        bar.style.width = "0%";
      }

      document.getElementById("bing-done").innerText =
        i.toString().padStart(2, "0");

    }

  }

  writeLog("SELESAI!", "#22c55e");

  alert("OPERASI SELESAI");

}

// ================= BUTTON =================

document.addEventListener("DOMContentLoaded", () => {

  console.log("DOM READY");

  const btn =
    document.getElementById("btn-execute");

  if (btn) {

    console.log("BUTTON KETEMU");

    btn.onclick = runProPlayer;

  } else {

    console.log("BUTTON TIDAK ADA");

  }

});
