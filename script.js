
// --------------------ye Editable heading hai-------------------
document.addEventListener("DOMContentLoaded", () => {
  const pageTitle = document.getElementById("pageTitle");

  if (pageTitle) {
    pageTitle.setAttribute("contenteditable", "true");

    // Jab Enter press ho  blur & save
    pageTitle.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // new line na bane
        pageTitle.blur();   // edit mode se bahar
      }
    });
  }
});

// -----------------todo listing---------------------
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskBoard = document.getElementById("taskBoard");
  const editModeBtn = document.getElementById("editModeBtn");

  let editMode = false;
  let selectedNote = null;

  // Toggle Edit Mode
  editModeBtn.addEventListener("click", () => {
    editMode = !editMode;
    document.querySelectorAll(".note-options").forEach(opt => {
      if (editMode) {
        opt.classList.add("show");
        editModeBtn.textContent = "❌ Exit";
        editModeBtn.classList.remove("bg-purple-600");
        editModeBtn.classList.add("bg-red-600");
      } else {
        opt.classList.remove("show");
        editModeBtn.textContent = "✏ Edit";
        editModeBtn.classList.remove("bg-red-600");
        editModeBtn.classList.add("bg-purple-600");
      }
    });
  });

  // Add Task
  addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
      createSticky(taskInput.value);
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
  });

  // Create Sticky Note
  function createSticky(text) {
    const note = document.createElement("div");
    note.className = "sticky-note";
    note.tabIndex = 0;
    note.onclick = () => { selectedNote = note; };

    const taskText = document.createElement("span");
    taskText.textContent = text;
    taskText.className = "font-semibold text-white break-words";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = text;
    editInput.className =
      "hidden px-2 py-1 rounded-md border border-neutral-400 text-black w-full";

    const options = document.createElement("div");
    options.className = "note-options flex gap-2 mt-2";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏";
    editBtn.className = "icon-btn w-9 h-9 flex items-center justify-center rounded-full bg-pink-500 text-white";
    let editing = false;

    const toggleEdit = () => {
      if (!editing) {
        taskText.classList.add("hidden");
        editInput.classList.remove("hidden");
        editBtn.innerHTML = "💾";
        editInput.focus();
        editing = true;
      } else {
        taskText.textContent = editInput.value;
        taskText.classList.remove("hidden");
        editInput.classList.add("hidden");
        editBtn.innerHTML = "✏";
        editing = false;
      }
    };

    editBtn.onclick = toggleEdit;
    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") toggleEdit();
    });

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑";
    delBtn.className = "icon-btn w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white";
    delBtn.onclick = () => deleteNote();

    const deleteNote = () => {
      note.classList.add("opacity-0", "scale-90");
      setTimeout(() => note.remove(), 300);
    };

    options.appendChild(editBtn);
    options.appendChild(delBtn);

    note.appendChild(taskText);
    note.appendChild(editInput);
    note.appendChild(options);
    taskBoard.appendChild(note);

    note.addEventListener("keydown", (e) => {
      if (e.key === "Delete") deleteNote();
    });
  }
});


// --------------------ye rose wala cursor hai---------------
const roseCursor = document.getElementById("roseCursor");
let lastSparkle = 0;
const delay = 120; // gap between sparkles (ms)

document.addEventListener("mousemove", (e) => {
  // Move rose cursor
  roseCursor.style.left = e.pageX + "px";
  roseCursor.style.top = e.pageY + "px";

  // Add sparkle trail with delay
  const now = Date.now();
  if (now - lastSparkle > delay) {
    lastSparkle = now;

    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.textContent = "✨";

    sparkle.style.left = e.pageX + "px";
    sparkle.style.top = e.pageY + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  }
});

