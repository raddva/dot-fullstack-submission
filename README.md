# Sistem Manajemen Pemesanan Ruangan (Admin Panel)
## A. Project Overview
> Aplikasi ini merupakan admin panel berbasis web untuk manajemen pemesanan ruangan. Dibangun menggunakan framework **NestJS (TypeScript)**, project ini tidak menggunakan pendekatan pure REST API, melainkan mengadopsi arsitektur **MVC (Model-View-Controller)** di mana server-side rendering (SSR) langsung ditangani menggunakan template engine **Handlebars (HBS)**.

Key Features:
- Session-based Authentication: Alur Login/Logout yang dilindungi menggunakan NestJS Guards.
- Password Hashing: Menggunakan Bcrypt untuk enkripsi dan keamanan kredensial admin.
- CRUD Operations: Manajemen data Ruangan (Rooms) dan Pemesanan (Bookings).
- Search Functionality: Pencarian data booking berdasarkan nama pemesan.
- Custom Error Handling: Mengalihkan HTTP exception ke halaman view khusus, sehingga user tidak melihat raw JSON error.

## B. Database
Database dikelola menggunakan PostgreSQL dan TypeORM. Terdapat tiga entity utama di dalam sistem:
- admins: Menyimpan kredensial user untuk akses ke admin panel.
- rooms: Menyimpan data ruangan beserta kapasitasnya.
- bookings: Menyimpan detail riwayat booking.
- Relasi: Terdapat relasi One-to-Many antara tabel rooms dan bookings. Satu ruangan bisa memiliki banyak booking. Jika sebuah ruangan dihapus, seluruh data booking yang memiliki relasi dengan ruangan tersebut akan ikut terhapus otomatis (Cascade Delete).

Ref: [DBDIAGRAM](https://dbdiagram.io/d/Bookings-69cc774cfb2db18e3b501624)

## C. Tech Stack & Dependencies
Project ini bergantung pada beberapa pustaka utama, antara lain:

- @nestjs/core & @nestjs/common (Core framework)
- typeorm & @nestjs/typeorm (ORM dan migrasi database)
- pg (Driver connect PostgreSQL)
- hbs (Handlebars template engine untuk views)
- express-session (Session management)
- bcrypt (encrypt password)

## D. Developer Guide
Instruksi berikut ditujukan untuk proses setup, instalasi, dan pemeliharaan project.

1. Instalasi dan Persiapan Menjalankan Project
- Clone repositori ini.
- Buka terminal di direktori project dan jalankan perintah npm install untuk mengunduh semua package yang dibutuhkan.
- Buat database kosong di PostgreSQL (misalnya dengan nama booking_db).
- Salin file .env.example menjadi file baru bernama .env. Sesuaikan isian host, port, username, password, dan nama database dengan pengaturan PostgreSQL di komputer Anda. Pastikan juga Anda mengisi SESSION_SECRET dengan kalimat acak untuk keamanan sesi.

2. Migrasi Database
- Project ini tidak menggunakan sinkronisasi skema database otomatis demi keamanan. Untuk membentuk tabel di dalam database, jalankan perintah migrasi berikut: `npm run migration:run`
- Untuk menambahkan akun admin pertama kali, lakukan insert data langsung ke tabel admins melalui perangkat lunak manajemen database (seperti pgAdmin). Penting untuk diingat: kata sandi harus dienkripsi menjadi teks hash (menggunakan Bcrypt Generator standar dengan 10 rounds) sebelum dimasukkan ke dalam basis data.

3. Running the App
- Start development server: `npm run start:dev`
- Buka `http://localhost:3000` di browser. Unauthenticated users akan otomatis di-redirect ke halaman login.

4. Struktur Kode MVC dan Penanganan Eror
- Models: Skema definisi database (Entities) berada di folder `src/entities/`, sedangkan business logic dikelola di `src/services/`.
- Views: Berkas tampilan `.hbs` diletakkan di luar direktori `src`, tepatnya di folder `views/` pada root project.
- Controllers: Routing HTTP dan rendering view ditangani oleh folders di dalam `src/controllers/`.
- Error Handling: Menggunakan Global Exception Filter (`src/filters/http-exception.filter.ts`). Filter ini bertugas menangkap HTTP exceptions (seperti `404 Not Found` atau `500 Internal Server Error`) dan me-render-nya ke `views/error.hbs`. Tujuannya agar aplikasi tidak pernah me-return JSON exception ke end-user.
