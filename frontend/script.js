document.addEventListener("DOMContentLoaded", () => {
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");
    const taskDeadline = document.getElementById("taskDeadline");
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
        if (taskTitle.value.trim() !== "" && taskDescription.value.trim() !== "" && taskDeadline.value) {
            tasks.push({
                title: taskTitle.value,
                description: taskDescription.value,
                deadline: taskDeadline.value,
                done: false
            });
            renderTasks();
            showToast("Tugas berhasil ditambahkan!", "success");
            taskTitle.value = "";
            taskDescription.value = "";
            taskDeadline.value = "";
        }
    });

    // Render Tugas dalam Bentuk Card
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const card = document.createElement("div");
            card.classList.add("col-md-6", "col-lg-4");
    
            card.innerHTML = `
                <div class="card task-card">
                    <div class="card-header">${task.title}</div>
                    <div class="card-body">
                        <p>${task.description}</p>
                        <p><strong>Deadline:</strong> ${task.deadline}</p>
                        <span class="status ${task.done ? 'done' : 'not-done'}">
                            ${task.done ? 'Selesai' : 'Belum Selesai'}
                        </span>
                        <div class="task-buttons">
                            <button class="btn btn-success btn-sm" onclick="toggleStatus(${index})">✔ Selesai</button>
                            <button class="btn btn-warning btn-sm" data-bs-toggle="modal" onclick="editTask(${index})">✏ Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">🗑 Hapus</button>
                        </div>
                    </div>
                </div>
            `;
            taskList.appendChild(card);
        });
    }
    

    // Edit Tugas
    window.editTask = (index) => {
        const newTitle = prompt("Edit judul tugas:", tasks[index].title);
        const newDescription = prompt("Edit deskripsi tugas:", tasks[index].description);
        const newDeadline = prompt("Edit deadline (YYYY-MM-DD):", tasks[index].deadline);
        if (newTitle && newDescription && newDeadline) {
            tasks[index].title = newTitle;
            tasks[index].description = newDescription;
            tasks[index].deadline = newDeadline;
            renderTasks();
        }
    };

    // Hapus Tugas
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
        showToast("Tugas berhasil dihapus!", "success");
    };

    // Toggle Status
    window.toggleStatus = (index) => {
        tasks[index].done = !tasks[index].done;
        renderTasks();
    };

    let editIndex = -1; // Untuk menyimpan index tugas yang sedang diedit

    // Fungsi untuk membuka modal dan mengisi data tugas yang akan diedit
    window.editTask = (index) => {
        editIndex = index;
        document.getElementById("editTaskTitle").value = tasks[index].title;
        document.getElementById("editTaskDescription").value = tasks[index].description;
        document.getElementById("editTaskDeadline").value = tasks[index].deadline;
    
        // Menampilkan modal Bootstrap
        let editModal = new bootstrap.Modal(document.getElementById("editTaskModal"));
        editModal.show();
    };
    
    // Fungsi untuk menyimpan hasil edit
    document.getElementById("saveEditTask").addEventListener("click", () => {
        if (editIndex !== -1) {
            tasks[editIndex].title = document.getElementById("editTaskTitle").value;
            tasks[editIndex].description = document.getElementById("editTaskDescription").value;
            tasks[editIndex].deadline = document.getElementById("editTaskDeadline").value;
    
            renderTasks(); // Refresh tampilan tugas
            editIndex = -1; // Reset index tugas yang sedang diedit
    
            // Tutup modal setelah menyimpan
            let editModal = bootstrap.Modal.getInstance(document.getElementById("editTaskModal"));
            editModal.hide();
        }
        showToast("Tugas berhasil diubah!", "success");
    });

    // Fungsi untuk menampilkan toast
    function showToast(message, type = "success") {
        const toastElement = document.getElementById("taskToast");
        const toastBody = document.getElementById("toastMessage");

        // Ubah warna berdasarkan jenis notifikasi
        toastElement.className = `toast align-items-center text-white bg-${type} border-0`;
        toastBody.textContent = message;

        // Tampilkan toast
        let toast = new bootstrap.Toast(toastElement);
        toast.show();
    }

            

        // Tampilkan tugas saat halaman dimuat
        renderTasks();
    });
