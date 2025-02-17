const db = require("../config/db");

// Ambil semua tugas
exports.getAllTasks = async (req, res) => {
    try {
        const [tasks] = await db.query("SELECT * FROM tasks ORDER BY created_at DESC");
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tambah tugas baru
exports.createTask = async (req, res) => {
    const { title, description, deadline } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO tasks (title, description, deadline) VALUES (?, ?, ?)",
            [title, description, deadline]
        );
        res.json({ id: result[0].insertId, title, description, deadline, status: "pending" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update tugas
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, deadline, status } = req.body;
    try {
        await db.query(
            "UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ?",
            [title, description, deadline, status, id]
        );
        res.json({ message: "Tugas diperbarui!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Hapus tugas
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM tasks WHERE id = ?", [id]);
        res.json({ message: "Tugas dihapus!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
