const msnLinks = [

  "https://www.msn.com/en-gb/news",

  "https://www.msn.com/en-gb/travel",

  "https://www.msn.com/en-gb/money"

];

function writeLog(msg){

  const log =
    document.getElementById("log-box");

  const time =
    new Date().toLocaleTimeString();

  log.innerHTML += `
    <div>
      [${time}] ${msg}
    </div>
  `;

  log.scrollTop =
    log.scrollHeight;

}

function sleep(ms){

  return new Promise(
    r => setTimeout(r, ms)
  );

}

async function progress(sec){

  const bar =
    document.getElementById(
      "progress-bar"
    );

  for(let i=0;i<=100;i++){

    bar.style.width =
      i + "%";

    await sleep(sec * 10);

  }

  bar.style.width = "0%";

}

async function startDemo(){

  const searchTarget =
    parseInt(
      document.getElementById(
        "search-target"
      ).value
    );

  const msnTarget =
    parseInt(
      document.getElementById(
        "msn-target"
      ).value
    );

  const queries =
    document
      .getElementById("query-box")
      .value
      .split("\n")
      .map(v => v.trim())
      .filter(v => v);

  let done = 0;

  // SEARCH

  for(let i=0;i<searchTarget;i++){

    const q =
      queries[
        Math.floor(
          Math.random() *
          queries.length
        )
      ];

    writeLog(
      "MEMBUKA SEARCH: " + q
    );

    window.open(
      "https://www.bing.com/search?q=" +
      encodeURIComponent(q),
      "_blank"
    );

    await progress(30);

    done++;

    document.getElementById(
      "counter"
    ).innerText =
      done
      .toString()
      .padStart(2,"0");

  }

  // MSN

  for(let i=0;i<msnTarget;i++){

    const link =
      msnLinks[
        Math.floor(
          Math.random() *
          msnLinks.length
        )
      ];

    writeLog(
      "MEMBUKA MSN NEWS"
    );

    window.open(
      link,
      "_blank"
    );

    await progress(30);

    done++;

    document.getElementById(
      "counter"
    ).innerText =
      done
      .toString()
      .padStart(2,"0");

  }

  writeLog(
    "SELESAI"
  );

  alert(
    "Dashboard selesai digunakan"
  );

}

document
  .getElementById("start-btn")
  .addEventListener(
    "click",
    startDemo
  );
