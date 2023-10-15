chrome.storage.sync.get(["BlockedURL", "Tasks"], (data) => {
  if (data.BlockedURL !== undefined) {
    var urls = data.BlockedURL;
    urls.forEach((url) => {
      var urlele = document.createElement("div");
      urlele.innerHTML =
        `<span class="url-name">` +
        url +
        `</span>
          <button class="remove-url">remove<button>`;
      urlele.id = "blocked-url";
      document.getElementById("blocked").append(urlele);
    });
  }
  const removeButtons = document.querySelectorAll(".remove-url");
  console.log(removeButtons);
  removeButtons.forEach((rb) => rb.addEventListener("click", removeBlocked));
});

function removeBlocked(e) {
  chrome.storage.sync.get("BlockedURL", (data) => {
    var arr = data.BlockedURL;
    to_remove = e.target.parentElement.querySelector("span").innerHTML;
    arr = arr.filter((val) => {
      val !== to_remove;
    });
    console.log("array after delete");
    console.log(arr);
    chrome.storage.sync.set({ BlockedURL: arr });
  });
  window.location.reload();
}

// SBButtons.forEach((el) =>
//   el.addEventListener("click", (event) => {
//     chrome.alarms.create("SBAlarm", {
//       when: Date.now(),
//     });
//   })
// );

document.getElementById("Block-the-website").addEventListener("click", (e) => {
  var hostname = document.getElementById("WebsiteToBlock").value;
  chrome.storage.sync.get("BlockedURL", (data) => {
    if (data.BlockedURL !== undefined) {
      arr = data.BlockedURL;
      if (!arr.includes(hostname)) {
        arr.push(hostname);
        chrome.storage.sync.set({ BlockedURL: arr });
        console.log("added");
      }
    } else {
      chrome.storage.sync.set({ BlockedURL: [hostname] });
      console.log("initiated");
    }
  });
  window.location.reload();
});
