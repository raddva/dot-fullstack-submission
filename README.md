# Sistem Manajemen Pemesanan Ruangan (Admin Panel)
## A. Penjelasan Project
> Aplikasi ini adalah sistem panel admin berbasis web yang dirancang untuk mengelola data pemesanan ruangan. Project ini dibangun menggunakan framework NestJS dengan bahasa pemrograman TypeScript. Berbeda dengan pendekatan REST API murni, aplikasi ini secara utuh menerapkan pola arsitektur MVC (Model-View-Controller) di mana sisi server langsung merender halaman HTML menggunakan template engine Handlebars (HBS).

Fitur utama dalam aplikasi ini meliputi:

- Autentikasi sesi (Login/Logout) menggunakan sistem Session dan perlindungan Guard.
- Keamanan data sandi admin menggunakan algoritma hashing Bcrypt.
- Operasi CRUD (Create, Read, Update, Delete) untuk data Ruangan dan Pemesanan.
- Pencarian data pesanan berdasarkan nama pemesan.
- Penanganan eror kustom yang dialihkan ke halaman antarmuka khusus (bukan respons JSON).

## B. Desain Database
Basis data dikelola menggunakan PostgreSQL dan TypeORM. Terdapat tiga entitas utama dalam sistem ini:
- Admins: Menyimpan kredensial pengguna untuk masuk ke dalam panel admin.
- Rooms: Menyimpan informasi ruangan beserta kapasitasnya.
- Bookings: Menyimpan detail pemesanan yang dilakukan.
- Terdapat relasi One-to-Many antara tabel rooms dan bookings. Satu ruangan dapat memiliki banyak riwayat pemesanan. Ketika sebuah ruangan dihapus, semua data pemesanan yang terkait dengan ruangan tersebut akan ikut terhapus secara otomatis (Cascade Delete).

![Desain Database](https://dbdiagram.io/d/Bookings-69cc774cfb2db18e3b501624)

## C. Dependency Utama
Project ini bergantung pada beberapa pustaka utama, antara lain:

- @nestjs/core & @nestjs/common (Core Foundations framework)
- typeorm & @nestjs/typeorm (ORM dan migrasi database)
- pg (Driver connect PostgreSQL)
- hbs (tampilan web)
- express-session (Pengelolaan session)
- bcrypt (enkripsi password)

## D. Panduan untuk Developer Selanjutnya
Bagian ini berisi instruksi dan informasi penting bagi developer yang ingin melanjutkan atau memelihara project ini.

1. Instalasi dan Persiapan Menjalankan Project
- Lakukan clone pada repositori ini.
- Buka terminal di direktori project dan jalankan perintah npm install untuk mengunduh semua package yang dibutuhkan.
- Buat database kosong di PostgreSQL (misalnya dengan nama booking_db).
- Salin file .env.example menjadi file baru bernama .env. Sesuaikan isian host, port, username, password, dan nama database dengan pengaturan PostgreSQL di komputer Anda. Pastikan juga Anda mengisi SESSION_SECRET dengan kalimat acak untuk keamanan sesi.

2. Migrasi Database
- Project ini tidak menggunakan sinkronisasi skema database otomatis demi keamanan. Untuk membentuk tabel di dalam database, jalankan perintah migrasi berikut: `npm run migration:run`
- Untuk menambahkan akun admin pertama kali, lakukan insert data langsung ke tabel admins melalui perangkat lunak manajemen database (seperti pgAdmin). Penting untuk diingat: kata sandi harus dienkripsi menjadi teks hash (menggunakan Bcrypt Generator standar dengan 10 rounds) sebelum dimasukkan ke dalam basis data.

3. Memulai Aplikasi
- Jalankan server aplikasi di lingkungan pengembangan menggunakan perintah: `npm run start:dev`
- Aplikasi dapat diakses melalui browser pada alamat `http://localhost:3000`. Akses ke jalur utama ini akan secara otomatis mengarahkan pengguna ke halaman login jika sesi belum terdaftar.

4. Struktur Kode MVC dan Penanganan Eror
- Model: Seluruh skema tabel diatur di dalam folder src/entities. Logika interaksi database dikelola di folder src/services.
- View: Berkas tampilan yang menggunakan ekstensi .hbs terletak di luar direktori sumber, tepatnya di dalam folder views pada root project.
- Controller: Pengatur lalu lintas rute HTTP dan pengembalian render halaman terdapat di folder src/controllers.
- Eror Handling: Aplikasi ini menggunakan filter eksepsi global (src/filters/http-exception.filter.ts) yang menangkap eror tingkat HTTP (seperti 404 atau 500) dan mencetaknya ke dalam tampilan HTML (views/error.hbs), sehingga pengguna tidak akan pernah melihat respons eror berupa teks JSON mentah.