document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();
    setupNavigation();
});

// Ambil data tugas dari server
const fetchTasks = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tasks = await response.json();

        if (!Array.isArray(tasks)) {
            throw new Error("Data yang diterima bukan array.");
        }

        renderTasks(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        showToast("Gagal mengambil tugas. Coba lagi nanti.", "danger");
    }
};

// Render daftar tugas dalam bentuk card
const renderTasks = (tasks) => {
    const taskContainer = document.getElementById("taskList");
    taskContainer.innerHTML = ""; // Kosongkan container sebelum render ulang

    if (tasks.length === 0) {
        taskContainer.innerHTML = `<p class="text-center">Belum ada tugas.</p>`;
        return;
    }

    tasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("col-md-4", "mb-3");

        // Tombol status dengan warna sesuai status
        const statusBtnClass = task.status === "completed" ? "btn-success" : "btn-warning";
        const statusText = task.status === "completed" ? "Selesai" : "Pending";

        const formatDate = (dateString) => {
            const options = { day: "2-digit", month: "long", year: "numeric" };
            return new Date(dateString).toLocaleDateString("id-ID", options);
        };
        

        taskCard.innerHTML = `
            <div class="card shadow-sm border-0 rounded-3 task-card">
                <div class="card-body position-relative p-4">
                    <button class="btn btn-close position-absolute top-0 end-0 mt-2 me-2" 
                            aria-label="Close" onclick="deleteTask(${task.id})"></button>
                    
                    <h5 class="card-title fw-bold text-primary">${task.title}</h5>
                    <p class="card-text text-muted">${task.description}</p>
                    
                    <div class="d-flex justify-content-between align-items-center">
                    <p class="text-secondary mb-1">
                        <i class="bi bi-calendar-event"></i> <strong>Deadline:</strong>
                        <span class="text-muted"> ${formatDate(task.deadline)}</span>
                    </p>
                    </div>
                    <div class="d-flex justify-content-start align-items-center">
                        <span class="badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning'}">
                            ${task.status === "completed" ? "Selesai ✅" : "Belum Selesai ⏳"}
                        </span>
                    </div>
                    
                    <div class="d-grid gap-2 mt-3">
                        <button class="btn ${statusBtnClass} w-100" 
                                onclick="toggleStatus(${task.id}, '${task.status}')">
                            ${statusText}
                        </button>
                        <button class="btn btn-outline-primary w-100" onclick="editTask(${task.id})">
                            ✏️ Edit
                        </button>
                    </div>
                </div>
            </div>
        `;
        taskContainer.appendChild(taskCard);
    });
};

// Fungsi untuk mengganti status tugas
const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";

    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
            throw new Error("Gagal memperbarui status tugas.");
        }

        fetchTasks(); // Refresh daftar tugas
        showToast(`Status tugas diperbarui menjadi ${newStatus}!`, "info");
    } catch (error) {
        console.error("Error updating status:", error);
        showToast("Gagal memperbarui status tugas.", "danger");
    }
};


// Navigasi antara daftar tugas dan tambah tugas
const setupNavigation = () => {
    document.getElementById("showTasks").addEventListener("click", () => {
        document.getElementById("taskSection").classList.remove("d-none");
        document.getElementById("addTaskSection").classList.add("d-none");
    });

    document.getElementById("showAddTask").addEventListener("click", () => {
        document.getElementById("taskSection").classList.add("d-none");
        document.getElementById("addTaskSection").classList.remove("d-none");
    });
};

// Tambah tugas baru
const addTask = async () => {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const deadline = document.getElementById("taskDeadline").value.trim();

    if (!title || !description || !deadline) {
        showToast("Harap isi semua bidang!", "warning");
        return;
    }

    const newTask = { title, description, deadline, status: "pending" };

    try {
        const response = await fetch("http://localhost:5000/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        const responseData = await response.json(); // Ambil response dalam bentuk JSON

        if (!response.ok) {
            console.error("Server responded with an error:", responseData);
            throw new Error(responseData.message || "Gagal menambahkan tugas.");
        }

        showToast("Tugas berhasil ditambahkan!", "success");
        document.getElementById("task-form").reset();
        fetchTasks(); // Refresh daftar tugas
    } catch (error) {
        console.error("Error adding task:", error);
        showToast("Gagal menambahkan tugas. Coba lagi nanti.", "danger");
    }
};


// Edit tugas
const editTask = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
        if (!response.ok) {
            throw new Error("Gagal mengambil data tugas.");
        }
        const task = await response.json();

        document.getElementById("edit-task-id").value = task.id;
        document.getElementById("edit-task-title").value = task.title;
        document.getElementById("edit-task-desc").value = task.description;
        document.getElementById("edit-task-deadline").value = task.deadline;
        document.getElementById("edit-task-status").value = task.status;

        new bootstrap.Modal(document.getElementById("editTaskModal")).show();
    } catch (error) {
        console.error("Error fetching task for edit:", error);
        showToast("Gagal mengambil data tugas untuk diedit.", "danger");
    }
};

// Update tugas
const updateTask = async () => {
    const id = document.getElementById("edit-task-id").value;
    const title = document.getElementById("edit-task-title").value.trim();
    const description = document.getElementById("edit-task-desc").value.trim();
    const deadline = document.getElementById("edit-task-deadline").value.trim();
    const status = document.getElementById("edit-task-status").value;

    if (!title || !description || !deadline) {
        showToast("Harap isi semua bidang!", "warning");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, deadline, status }),
        });

        if (!response.ok) {
            throw new Error("Gagal memperbarui tugas.");
        }

        fetchTasks();
        showToast("Tugas berhasil diperbarui!", "info");
        bootstrap.Modal.getInstance(document.getElementById("editTaskModal")).hide();
    } catch (error) {
        console.error("Error updating task:", error);
        showToast("Gagal memperbarui tugas. Coba lagi nanti.", "danger");
    }
};

// Hapus tugas
const deleteTask = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus tugas ini?")) return;

    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error("Gagal menghapus tugas.");
        }

        fetchTasks();
        showToast("Tugas berhasil dihapus!", "danger");
    } catch (error) {
        console.error("Error deleting task:", error);
        showToast("Gagal menghapus tugas. Coba lagi nanti.", "danger");
    }
};

// Menampilkan notifikasi toast
const showToast = (message, type = "success") => {
    const toastElement = document.getElementById("taskToast");
    const toastBody = document.getElementById("toastMessage");

    toastElement.className = `toast align-items-center text-white bg-${type} border-0`;
    toastBody.textContent = message;

    new bootstrap.Toast(toastElement).show();
};
