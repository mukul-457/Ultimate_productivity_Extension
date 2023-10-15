const play_button = document.getElementById("playmusic");
const pause_button = document.getElementById("pausemusic");
const vid_ele = document.getElementById("videoId");
const load_button = document.getElementById("load-video");

play_button.addEventListener("click", (e) => {
  chrome.tabs.query({ title: "UPE Music" }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      from: "ytcontrols",
      action: "play",
    });
  });
});

pause_button.addEventListener("click", (e) => {
  chrome.tabs.query({ title: "UPE Music" }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      from: "ytcontrols",
      action: "pause",
    });
  });
});

load_button.addEventListener("click", (e) => {
  chrome.tabs.query({ title: "UPE Music" }, (tabs) => {
    var vid = vid_ele.value;
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "ytcontrols",
        action: "load",
        id: vid,
      });
    } else {
      chrome.tabs.create({ url: "YTPlayer/player.html" });
      setTimeout(
        chrome.tabs.sendMessage(tabs[0].id, {
          from: "ytcontrols",
          action: "load",
          id: vid,
        }),
        10000
      );
    }
  });
});
