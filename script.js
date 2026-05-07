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
  "cara zakat mal",
  "kata kata hari ini",
  "cuaca hari ini",
  "harga emas",
  "rupiah saat ini",
  "perak hari ini",
  "pertandingan liga 1 hari ini"
];

const msnLinks = [
  "https://www.msn.com",
  "https://www.msn.com/en-gb/news",
  "https://www.msn.com/en-gb/money",
  "https://www.msn.com/en-gb/health",
  "https://www.msn.com/en-gb/travel"
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

  const btn =
    document.getElementById("btn-execute");

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
    document
