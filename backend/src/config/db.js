const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",  // Bisa juga pakai "127.0.0.1"
    user: "root",       // Gunakan user root
    password: "",       // Kosong karena tidak ada password
    database: "todolist_db", // Pastikan nama database sesuai
    port: 3306          // Port default MySQL(sesuaikan dengan port anda)
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

module.exports = db;
