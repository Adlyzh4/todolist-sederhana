document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskSection = document.getElementById("taskSection");
    const addTaskSection = document.getElementById("addTaskSection");

    let tasks = [];

    // Sidebar Navigation
    document.getElementById("showTasks").addEventListener("click", () => {
        taskSection.classList.remove("d-none");
        addTaskSection.classList.add("d-none");
    });

    document.getElementById("showAddTask").addEventListener("click", () => {
        taskSection.classList.add("d-none");
        addTaskSection.classList.remove("d-none");
    });

    // Tambah Tugas
    addTaskBtn.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            tasks.push(taskInput.value);
            renderTasks();
            taskInput.value = "";
        }
    });

    // Render Tugas dalam Bentuk Card
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const card = document.createElement("div");
            card.classList.add("col-md-6");
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <span>${task}</span>
                        <div>
                            <button class="btn-edit" onclick="editTask(${index})">✏ Edit</button>
                            <button class="btn-delete" onclick="deleteTask(${index})">🗑 Hapus</button>
                        </div>
                    </div>
                </div>
            `;
            taskList.appendChild(card);
        });
    }

    // Edit Tugas
    window.editTask = (index) => {
        const newTask = prompt("Edit tugas:", tasks[index]);
        if (newTask) {
            tasks[index] = newTask;
            renderTasks();
        }
    };

    // Hapus Tugas
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Tampilkan tugas saat halaman dimuat
    renderTasks();
});
