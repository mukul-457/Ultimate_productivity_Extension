const TimeElement = document.getElementById("currtime");
const timerEle = document.getElementById("timer");

const startButtons = document.querySelectorAll(".StartWork");
const SBButtons = document.querySelectorAll(".ShortBreak");
const LBButtons = document.querySelectorAll(".LongBreak");

const TaskArea = document.getElementById("Tasks");
const MusicArea = document.getElementById("player");
const BlockerArea = document.getElementById("blocker");
const TimerZone = document.getElementById("TimerProgress");
// chrome.tabs.create({ url: "YTPlayer/player.html" });

// document.getElementById("Block-the-website").addEventListener("click", (e) => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     console.log(tabs[0]);
//     chrome.tabs.sendMessage(tabs[0].id, { from: "mukul", sub: "let talk" });
//   });
// });

document.getElementById("mainview").addEventListener("click", (e) => {
  TimerZone.style.display = "None";
  BlockerArea.style.display = "None";
  MusicArea.style.display = "None";
  TaskArea.style.display = "block";
});

document.getElementById("musicplayer").addEventListener("click", (e) => {
  TimerZone.style.display = "None";
  BlockerArea.style.display = "None";
  TaskArea.style.display = "None";
  MusicArea.style.display = "block";
});

document.getElementById("webblocker").addEventListener("click", (e) => {
  TimerZone.style.display = "None";
  TaskArea.style.display = "None";
  MusicArea.style.display = "None";
  BlockerArea.style.display = "block";
});

fetch("https://zenquotes.io/api/today")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    document.getElementById("QuoteArea").innerHTML = data[0].h;
    console.log(data);
  });

startButtons.forEach((el) =>
  el.addEventListener("click", (event) => {
    chrome.alarms.create("workAlarm", {
      when: Date.now(),
    });
    // startTimer(10);
  })
);

SBButtons.forEach((el) =>
  el.addEventListener("click", (event) => {
    chrome.alarms.create("SBAlarm", {
      when: Date.now(),
    });
  })
);

LBButtons.forEach((el) =>
  el.addEventListener("click", (event) => {
    chrome.alarms.create("LBAlarm", {
      when: Date.now(),
    });
  })
);

function update() {
  chrome.storage.local.get(["Timer"], (res) => {
    if (res.hasOwnProperty("Timer")) {
      console.log(res.Timer);
      // timerEle.textContent = `The timer is at ${res.Timer.Time}`;
      var minutes = Math.floor(res.Timer.Time / 60);
      var seconds = res.Timer.Time % 60;
      document.getElementById(
        "counterText"
      ).innerHTML = `${minutes}:${seconds}`;
      var i = res.Timer.duration - res.Timer.Time;
      var k = (i / res.Timer.duration) * 100;
      var l = 100 - k;
      document.getElementById("c1").style.strokeDasharray = [l, k];
      document.getElementById("c2").style.strokeDasharray = [k, l];
      document.getElementById("c1").style.strokeDashoffset = l;
    } else {
      // timerEle.textContent = "No Timer running";
      document.getElementById("c1").style.strokeDasharray = [100, 0];
      document.getElementById("c2").style.strokeDasharray = [0, 100];
      document.getElementById("c1").style.strokeDashoffset = 100;
      document.getElementById("counterText").innerHTML = 0;
    }
  });
  // const date = new Date().toLocaleTimeString();
  // TimeElement.textContent = `${date}`;
}

update();
setInterval(update, 1000);
