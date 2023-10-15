const work_field = document.getElementById("work");
const sb_field = document.getElementById("shortBreak");
const lb_field = document.getElementById("longBreak");

const sbutton = document.getElementById("submitName");

sbutton.addEventListener("click", () => {
  const work_interval = work_field.value;
  const sh_br_interval = sb_field.value;
  const lg_br_interval = lb_field.value;
  chrome.storage.sync.set(
    { work_interval, sh_br_interval, lg_br_interval },
    () => {
      console.log(
        `set wi to ${work_interval} , sb to ${sh_br_interval}, lb to ${lg_br_interval}`
      );
    }
  );
});
