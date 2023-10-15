var iid;
chrome.alarms.onAlarm.addListener((alarm) => {
  if (typeof iid !== "undefined") {
    clearInterval(iid);
  }
  chrome.storage.sync.get(
    ["work_interval", "sh_br_interval", "lg_br_interval"],
    (res) => {
      if (
        !res.hasOwnProperty("work_interval") ||
        !res.hasOwnProperty("sh_br_interval") ||
        !res.hasOwnProperty("lg_br_interval")
      ) {
        this.registration.showNotification("ERROR !!", {
          body: "set work and break intervals from options page",
          icon: "logo1.png",
        });
      } else {
        if (alarm.name === "workAlarm") {
          chrome.storage.local.set({
            Timer: {
              Time: res.work_interval * 60,
              duration: res.work_interval * 60,
              Name: "workAlarm",
            },
          });
        } else if (alarm.name === "SBAlarm") {
          chrome.storage.local.set({
            Timer: {
              Time: res.sh_br_interval * 60,
              duration: res.sh_br_interval * 60,
              Name: "SBAlarm",
            },
          });
        } else if (alarm.name === "LBAlarm") {
          chrome.storage.local.set({
            Timer: {
              Time: res.lg_br_interval * 60,
              duration: res.lg_br_interval * 60,
              Name: "LBAlarm",
            },
          });
        }
        iid = setInterval(() => {
          chrome.storage.local.get("Timer", (res1) => {
            timer = res1.Timer;
            if (timer.Time === 0) {
              chrome.storage.local.remove("Timer");
              clearInterval(iid);
            } else {
              timer.Time -= 1;
              chrome.storage.local.set({ Timer: timer });
            }
          });
        }, 1000);
      }
    }
  );
});
