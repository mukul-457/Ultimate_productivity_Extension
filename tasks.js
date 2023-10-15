const ButtonAddTask = document.getElementById("addTask");
const dueDateButton = document.getElementById("taskDueDate");
const submitTask = document.getElementById("SubmitNewTask");

const TaskFormDiv = document.getElementById("AddTaskForm");
const AddButtonDiv = document.getElementById("AddButtonArea");
const TaskListDiv = document.getElementById("TaskArea");
const OverDueDiv = document.getElementById("OverDue");
const closeTaskForm = document.getElementById("CancelTaskAddition");

function updateTasks() {
  chrome.storage.sync.get("Tasks", (data) => {
    if (data.Tasks !== undefined) {
      var all_tasks = data.Tasks;
      today = new Date();
      today = today.setHours(0, 0, 0, 0);
      console.log("fetched tasks for display", all_tasks);
      var tasksHTML = "";
      for (const key in all_tasks) {
        console.log(`${all_tasks[key]} , ${key} , ${today}`);
        if (all_tasks[key] >= today) {
          console.log("will be adde");
          tasksHTML += addPending(all_tasks[key], key);
        }
      }
      TaskListDiv.innerHTML = tasksHTML;
    } else {
      console.log("no tasks added yet");
    }
    attachDoneListner();
    attachFocusListner();
  });
}

function addPending(date, name) {
  dateObj = new Date(date);
  day = dateObj.getDate().toString();
  month = dateObj.toLocaleString("default", { month: "short" });
  year = dateObj.getFullYear().toString();
  var fdate = day + " " + month + " " + year;

  var inner =
    `<div class="TaskField">
      <button class="TaskFocus">
      <span class="TaskDueField">` +
    fdate +
    `</span>
      <span class="TaskNameField">` +
    name +
    `</span>
      </button>
      <button class="CompleteTask">done</button>
      </div>`;

  return inner;
}

function attachFocusListner() {
  var taskfocusButtons = document.querySelectorAll(".TaskFocus");
  console.log("attch", taskfocusButtons);
  taskfocusButtons.forEach((fb) => {
    console.log("event triggered");
    fb.addEventListener("click", (e) => {
      BlockerArea.style.display = "None";
      MusicArea.style.display = "None";
      TaskArea.style.display = "None";
      TimerZone.style.display = "block";
    });
  });
}

function attachDoneListner() {
  var completeTasksButtons = document.querySelectorAll(".CompleteTask");
  completeTasksButtons.forEach((b) => {
    console.log(b);
    b.addEventListener("click", (e) => {
      console.log("marking task done");
      var name =
        e.target.parentElement.querySelectorAll(".TaskNameField")[0].innerHTML;
      console.log(name);
      chrome.storage.sync.get("Tasks", (data) => {
        all_tasks = data.Tasks;
        delete all_tasks[name];
        console.log(all_tasks);
        chrome.storage.sync.set({ Tasks: all_tasks });
        updateTasks();
      });
    });
  });
}

updateTasks();

ButtonAddTask.addEventListener("click", (event) => {
  ButtonAddTask.style.display = "None";
  TaskFormDiv.style.display = "block";
});

submitTask.addEventListener("click", (e) => {
  task_name = document.getElementById("taskName").value;
  due_date = new Date(dueDateButton.value);
  due_date = due_date.setHours(0, 0, 0, 0);
  chrome.storage.sync.get("Tasks", (data) => {
    var task_list = data.Tasks;
    if (task_list === undefined) {
      task_list = {};
    }
    task_list[task_name] = due_date;
    console.log("the task list is ", task_list);
    chrome.storage.sync.set({ Tasks: task_list });
  });
  updateTasks();
  attachDoneListner();
});

closeTaskForm.addEventListener("click", (e) => {
  TaskFormDiv.style.display = "None";
  ButtonAddTask.style.display = "block";
});
