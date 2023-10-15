var iframe = document.getElementsByTagName("iframe")[0].contentWindow;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.from === "ytcontrols") {
    if (message.action === "load") {
      iframe.postMessage(
        JSON.stringify({
          event: "command",
          func: "loadVideoById",
          args: [message.id],
        }),
        "*"
      );
      iframe.postMessage(
        JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [100],
        }),
        "*"
      );
    } else if (message.action === "play") {
      iframe.postMessage(
        JSON.stringify({ event: "command", func: "playVideo" }),
        "*"
      );
    } else if (message.action === "pause") {
      iframe.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo" }),
        "*"
      );
    }
  }
});
