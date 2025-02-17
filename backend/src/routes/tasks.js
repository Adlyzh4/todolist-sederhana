const express = require("express");
const db = require("../config/db");
const router = express.Router();

// 🔹 Ambil semua tugas
router.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tasks", (err, results) => {
        if (err) {
            console.error("❌ Error fetching tasks:", err);
            return res.status(500).json({ error: "Failed to fetch tasks" });
        }
        res.json(results);
    });
});

// 🔹 Tambah tugas baru
router.post("/tasks", (req, res) => {
    const { title, description, deadline, status } = req.body;
    if (!title || !description || !deadline) {
        return res.status(400).json({ error: "Mohon isi semua data!" });
    }

    const query = "INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)";
    db.query(query, [title, description, deadline, status || "pending"], (err, result) => {
        if (err) {
            console.error("❌ Error adding task:", err);
            return res.status(500).json({ error: "Failed to add task" });
        }
        res.status(201).json({ message: "Tugas berhasil ditambahkan!" });
    });
});

// 🔹 Ambil tugas berdasarkan ID
router.get("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM tasks WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("❌ Error fetching task:", err);
            return res.status(500).json({ error: "Failed to fetch task" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Tugas tidak ditemukan!" });
        }
        res.json(results[0]);
    });
});

// 🔹 Update tugas (Edit judul, deskripsi, deadline, status)
router.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, deadline, status } = req.body;

    const query = "UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ?";
    db.query(query, [title, description, deadline, status, id], (err, result) => {
        if (err) {
            console.error("❌ Error updating task:", err);
            return res.status(500).json({ error: "Failed to update task" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Tugas tidak ditemukan!" });
        }
        res.json({ message: "Tugas berhasil diperbarui!" });
    });
});

// 🔹 Ganti status tugas tanpa mengubah data lain
router.patch("/tasks/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
        return res.status(400).json({ error: "Status tidak valid!" });
    }

    const query = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error("❌ Error updating task status:", err);
            return res.status(500).json({ error: "Failed to update task status" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Tugas tidak ditemukan!" });
        }
        res.json({ message: "Status tugas berhasil diperbarui!" });
    });
});

// 🔹 Hapus tugas berdasarkan ID
router.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM tasks WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("❌ Error deleting task:", err);
            return res.status(500).json({ error: "Failed to delete task" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Tugas tidak ditemukan!" });
        }
        res.json({ message: "Tugas berhasil dihapus!" });
    });
});

module.exports = router;
