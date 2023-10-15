chrome.storage.sync.get("BlockedURL", (data) => {
  if (data.BlockedURL !== undefined) {
    if (data.BlockedURL.some((b) => window.location.hostname.includes(b))) {
      let chld = document.body.children;
      for (let i = 0; i < chld.length; i++) {
        chld[i].style.display = "none";
      }
      var div = document.createElement("div");
      div.innerHTML = `
      <div class=Info style='display:flex;background:red; justify-content:center; '>
      <h1>This site is blocked By UPE chrome extension , to unblock go to extension's blocker page</h1>
      </div>
      `;
      document.body.prepend(div);
    }
  }
});
