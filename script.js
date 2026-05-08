const msnLinks = [

  "https://www.msn.com/en-gb/travel/news/holidaymakers-told-to-arrive-four-hours-early-or-miss-flights-in-ees-chaos/ss-AA22lkS6?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/news/uknews/starmer-under-threat-over-trojan-horse-plot-to-smuggle-rival-back-to-replace-him/ar-AA22wWGb?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/entertainment/tv/badenoch-starmer-s-finished-and-polanski-s-a-joke-we-re-the-only-serious-choice/ar-AA22xk97?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/entertainment/news/king-charles-allegedly-slams-top-dog-authority-prince-william-told-to-know-his-place/ar-AA22wXBc?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/travel/news/coventry-airport-to-close-after-90-years-with-all-flights-scrapped-within-weeks/ar-AA22wiSz?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/money/other/aldi-and-lidl-rule-could-be-forced-to-change-as-uk-supermarkets-demand-crackdown/ar-AA22wfrY?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/news/uknews/starmer-s-last-ditch-plea-as-labour-braces-for-local-election-disaster/ar-AA22yUxG?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/travel/news/uk-staycation-demand-rises-as-airlines-told-they-can-cancel-flights/ss-AA22qn5L?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/lifestyle/family-relationships/report-queen-camilla-s-ex-husband-now-right-hand-man-to-princess-anne/ss-AA22i4Ea?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/foodanddrink/other/binman-s-rule-to-anyone-recycling-tins-and-jars-with-labels-left-on/ar-AA1X2DRu?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/money/other/britain-sleepwalking-towards-jobless-generation-warn-retailers/ar-AA22AqRQ?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/news/uknews/keir-starmer-to-use-eu-reset-to-stave-off-leadership-challenge/ar-AA22zFsq?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/money/technology/all-gmail-users-urged-to-check-one-setting-now-as-important-warning-issued/ar-AA22ueZv?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
  
  "https://www.msn.com/en-gb/news/world/sky-news-halted-for-ultimate-humiliation-breaking-news-alert-for-donald-trump/ar-AA22vBj6?cvid=69fc548eb56e4d098c433a606fdef345&ocid=sappandhp",
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
