// ============================================================
// planner.js - Academic Planner page logic
// Demonstrates: arrays & functions, DOM manipulation,
// event handling, dynamic content updates.
// State lives only in memory for this browser tab.
// ============================================================

(function () {
  /** @type {{id: number, text: string, done: boolean}[]} */
  let tasks = [];
  let nextId = 1;

  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const list = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");
  const stats = document.getElementById("stats");
  const statTotal = document.getElementById("stat-total");
  const statDone = document.getElementById("stat-done");
  const statPending = document.getElementById("stat-pending");

  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    tasks.push({ id: nextId++, text: trimmed, done: false });
    render();
  }

  function toggleTask(id) {
    tasks = tasks.map(function (t) {
      return t.id === id ? Object.assign({}, t, { done: !t.done }) : t;
    });
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) {
      return t.id !== id;
    });
    render();
  }

  function buildTaskNode(task) {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");
    li.dataset.id = String(task.id);

    const check = document.createElement("button");
    check.className = "task__check";
    check.type = "button";
    check.setAttribute(
      "aria-label",
      task.done ? "Mark as not done" : "Mark as done",
    );
    check.textContent = task.done ? "✓" : "";
    check.addEventListener("click", function () {
      toggleTask(task.id);
    });

    const text = document.createElement("span");
    text.className = "task__text";
    text.textContent = task.text;

    const del = document.createElement("button");
    del.className = "task__del";
    del.type = "button";
    del.setAttribute("aria-label", "Delete task: " + task.text);
    del.textContent = "✕";
    del.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(del);
    return li;
  }

  function render() {
    list.innerHTML = "";
    tasks.forEach(function (task) {
      list.appendChild(buildTaskNode(task));
    });

    const hasTasks = tasks.length > 0;
    emptyState.style.display = hasTasks ? "none" : "block";
    stats.style.display = hasTasks ? "flex" : "none";

    const doneCount = tasks.filter(function (t) {
      return t.done;
    }).length;
    statTotal.textContent = String(tasks.length);
    statDone.textContent = String(doneCount);
    statPending.textContent = String(tasks.length - doneCount);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask(input.value);
    input.value = "";
    input.focus();
  });

  [
    "Push COS 106 term project to GitHub",
    "Review NeetCode 250 Sliding Window",
  ].forEach(addTask);
})();
