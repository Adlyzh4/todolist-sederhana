# Aplikasi To-Do List

## Gambaran Umum
Ini adalah aplikasi To-Do List full-stack yang dibangun dengan Node.js, Express, MySQL untuk backend, dan JavaScript, HTML, serta CSS untuk frontend. Aplikasi ini memungkinkan pengguna untuk membuat, membaca, memperbarui, dan menghapus tugas.

## Fitur
- **Buat Tugas**: Tambahkan tugas baru dengan judul, deskripsi, dan tenggat waktu.
- **Lihat Tugas**: Lihat semua tugas dalam format daftar.
- **Perbarui Tugas**: Edit detail tugas dan perbarui statusnya.
- **Hapus Tugas**: Hapus tugas dari daftar.
- **Desain Responsif**: Aplikasi ini ramah seluler dan bekerja dengan baik di berbagai perangkat.

## Teknologi yang Digunakan
- **Backend**: Node.js, Express, MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Dependencies**: 
  - `body-parser`
  - `cors`
  - `date-fns`
  - `dotenv`
  - `express`
  - `mysql2`

## Memulai

### Prasyarat
- Node.js dan npm terinstal di mesin Anda
- Server MySQL berjalan

### Instalasi

1. **Klon repositori:**
    ```sh
    git clone https://github.com/yourusername/todo-list.git
    cd todo-list
    ```

2. **Setup Backend:**
    ```sh
    cd backend
    npm install
    ```

3. **Setup Frontend:**
    ```sh
    cd ../frontend
    npm install
    ```

4. **Setup Database:**
    - Buat database MySQL dengan nama `todolist_db`.
    - Impor skema database dari [db.js](http://_vscodecontentref_/0).

5. **Variabel Lingkungan:**
    - Buat file [.env](http://_vscodecontentref_/1) di direktori [backend](http://_vscodecontentref_/2) dan tambahkan:
        ```env
        DB_HOST=localhost
        DB_USER=root
        DB_PASS=
        DB_NAME=todolist_db
        PORT=5000
        ```

### Menjalankan Aplikasi

1. **Jalankan Server Backend:**
    ```sh
    cd backend
    npx nodemon src/server.js
    ```

2. **Buka Frontend:**
    - Buka [index.html](http://_vscodecontentref_/3) di browser Anda.

## Endpoint API

### Tugas
- **GET /api/tasks**: Ambil semua tugas
- **POST /api/tasks**: Buat tugas baru
- **GET /api/tasks/:id**: Ambil tugas berdasarkan ID
- **PUT /api/tasks/:id**: Perbarui tugas berdasarkan ID
- **PATCH /api/tasks/:id/status**: Perbarui status tugas berdasarkan ID
- **DELETE /api/tasks/:id**: Hapus tugas berdasarkan ID

## Kontribusi
Kontribusi sangat diterima! Silakan fork repositori dan buat pull request dengan perubahan Anda.

## Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT.

## Kontak
Untuk pertanyaan atau umpan balik, silakan hubungi Adlsyha di [your-email@example.com].

---

Selamat coding! 🚀