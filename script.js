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

// DATA
const islamicQueries = [
  "doa harian islami",
  "asmaul husna lengkap",
  "jadwal sholat bogor",
  "keutamaan tahajud",
  "kisah nabi muhammad",
  "cara zakat mal"
  "kata kata Hari ini"
  "cuaca hari ini"
  "harga emas"
  "rupiah saat ini"
  "perak hari ini"
  "pertandingan liga 1 hari ini"
];

const msnLinks = [
  "https://www.msn.com",
  "https://www.msn.com/en-gb/news/uknews/liberal-democrats-demand-investigation-into-zack-polanski-s-professional-background/ar-AA22xHIm?ocid=sapphireappshare",
  "https://www.msn.com/en-gb/money/other/iconic-uk-bank-with-five-million-customers-to-be-wiped-from-high-streets-after-two-centuries/ar-AA22w2pu?ocid=sapphireappshare",
  "https://www.msn.com/en-gb/lifestyle/lifestylegeneral/i-m-a-vet-and-these-10-dog-breeds-are-the-only-ones-i-d-ever-own/ss-AA1WqtlP?ocid=sapphireappshare"
  "https://www.msn.com/en-gb/lifestyle/lifestylegeneral/i-m-a-vet-and-these-10-dog-breeds-are-the-only-ones-i-d-ever-own/ss-AA1WqtlP?ocid=sapphireappshare"
  "https://www.msn.com/en-gb/news/uknews/graham-linehan-praised-as-he-overcomes-sadiq-khan-social-media-shut-out-with-glorious-takedown/ar-AA22vPuu?ocid=sapphireappshare"
  "https://www.msn.com/en-gb/news/world/trump-pays-tribute-after-ted-turner-death-with-shot-at-cnn/ar-AA22wDEo?ocid=sapphireappshare"
  "https://www.msn.com/en-gb/news/world/king-charles-us-trip-upside-down-union-jack-at-arlington-sparks-protocol-fury/ar-AA22wPfn?ocid=sapphireappshare"
  "https://www.msn.com/en-gb/news/other/taxi-for-keir-starmer-kemi-badenoch-lands-crushing-blow-to-labour-ahead-of-elections/ar-AA22x3iN?ocid=sapphireappshare"
  "https://www.msn.com/en-gb/health/other/sir-richard-branson-s-wife-s-cause-of-death-revealed-as-inquest-opens/ar-AA22waQI?ocid=sapphireappshare"
  "https://www.msn.com/en-gb/travel/news/simon-calder-says-six-words-to-anyone-planning-flights-out-of-uk/ar-AA22vkfI?ocid=sapphireappshare"
  "https://www.msn.com/en-gb/news/uknews/prince-harry-s-inheritance-wasted-duke-reportedly-slashes-staff-by-two-thirds-amid-money-fears/ar-AA22wylI?ocid=sapphireappshare"
];
async function runProPlayer() {

  const bingTarget =
    parseInt(document.getElementById("bing-target")?.value || 0);

  const msnTarget =
    parseInt(document.getElementById("msn-target")?.value || 0);

  const minD =
    parseInt(document.getElementById("minD")?.value || 5);

  const maxD =
    parseInt(document.getElementById("maxD")?.value || 10);

  const btn = document.getElementById("btn-execute");

  const msnStatus =
    document.getElementById("msn-status")?.value || "OFF";

  const bingStatus =
    document.getElementById("bing-status")?.value || "OFF";

  if (btn) {

    btn.innerText = "STOP / MUAT ULANG 😎";

    btn.style.background = "#ef4444";

    btn.onclick = function () {

      if (confirm("Hentikan semua operasi?")) {
        location.reload();
      }

    };

  }

  const bingTotal =
    document.getElementById("bing-total");

  const msnTotal =
    document.getElementById("msn-total");

  if (bingTotal) bingTotal.innerText = bingTarget;
  if (msnTotal) msnTotal.innerText = msnTarget;

  writeLog("MEMULAI OPERASI ELITE...", "#facc15");

  // MSN
  if (msnStatus === "ON" && msnTarget > 0) {

    writeLog("MEMULAI ENGINE MSN NEWS...", "#eab308");

    for (let i = 1; i <= msnTarget; i++) {

      let newsUrl =
        msnLinks[Math.floor(Math.random() * msnLinks.length)];

      writeLog(
        `[${i}/${msnTarget}] MEMBUKA MSN...`,
        "#eab308"
      );

      const winMsn = window.open(newsUrl, "_blank");

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

  // BING
  if (bingStatus === "ON" && bingTarget > 0) {

    writeLog("PINDAH KE ENGINE BING SEARCH...", "#fff");

    for (let i = 1; i <= bingTarget; i++) {
console.log(islamicQueries);
console.log(msnLinks);

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

      const bar =
        document.getElementById("progress-bar");

      for (let d = 0; d < delay * 2; d++) {

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

  writeLog("SEMUA TUGAS SELESAI!", "#22c55e");

  alert("OPERASI SELESAI!");
}

// BUTTON
document.addEventListener("DOMContentLoaded", () => {

  const btn =
    document.getElementById("btn-execute");

  if (btn) {

    btn.addEventListener("click", runProPlayer);

  }

});
