const tasks = [
  { id: 1, title: "Design homepage layout", status: "todo", priority: "High", tag: "Design" },
  { id: 2, title: "Setup database schema", status: "todo", priority: "Medium", tag: "Backend" },
  { id: 3, title: "Create API REST routes", status: "in-progress", priority: "High", tag: "Backend" },
  { id: 4, title: "Write unit tests", status: "done", priority: "Low", tag: "Testing" },
  { id: 5, title: "Implement user authentication", status: "todo", priority: "High", tag: "Security" },
  { id: 6, title: "Design login page UI", status: "in-progress", priority: "Medium", tag: "Design" },
  { id: 7, title: "Fix navigation bug on mobile", status: "todo", priority: "Low", tag: "Bugfix" },
  { id: 8, title: "Optimize database queries", status: "done", priority: "High", tag: "Performance" },
  { id: 9, title: "Deploy application to server", status: "todo", priority: "High", tag: "DevOps" },
  { id: 10, title: "Write user documentation", status: "done", priority: "Low", tag: "Docs" }
];

const boardContainer = document.getElementById("kanban-board");

function render() {
  boardContainer.textContent = "";

  const columns = [
    { key: "todo", title: "To do" },
    { key: "in-progress", title: "In progress (Max 3)" },
    { key: "done", title: "Done" }
  ];

  for (const col of columns) {
    const colDiv = document.createElement("div");
    colDiv.className = "column";
    colDiv.dataset.status = col.key;

    const h2 = document.createElement("h2");
    h2.textContent = col.title;
    colDiv.appendChild(h2);

    const taskList = document.createElement("div");
    taskList.className = "task-list";

    const colTasks = tasks.filter(t => t.status === col.key);
    for (const task of colTasks) {
      const card = document.createElement("div");
      card.className = "task-card";
      card.dataset.id = task.id;

      const titleSpan = document.createElement("span");
      titleSpan.textContent = task.title;
      card.appendChild(titleSpan);

      const moveBtn = document.createElement("button");
      moveBtn.textContent = "Move";
      moveBtn.className = "move-btn";
      card.appendChild(moveBtn);

      taskList.appendChild(card);
    }

    colDiv.appendChild(taskList);
    boardContainer.appendChild(colDiv);
  }
}

boardContainer.addEventListener("click", e => {
  if (!e.target.classList.contains("move-btn")) return;

  const card = e.target.closest(".task-card");
  const taskId = Number(card.dataset.id);
  const task = tasks.find(t => t.id === taskId);

  if (task.status === "todo") {
    const inProgressCount = tasks.filter(t => t.status === "in-progress").length;
    if (inProgressCount >= 3) {
      alert("In Progress column cannot exceed 3 cards!");
      return;
    }
    task.status = "in-progress";
  } else if (task.status === "in-progress") {
    task.status = "done";
  } else if (task.status === "done") {
    task.status = "todo";
  }

  render();
});

render();