# SimpanDulu - Platform Rekomendasi Afiliasi 🛒

SimpanDulu adalah platform *link-in-bio* dan katalog produk afiliasi (Shopee, dll) yang dirancang khusus untuk mengatasi pemblokiran *In-App Browser* dari platform sosial media seperti TikTok. Dibangun menggunakan Next.js App Router, Drizzle ORM, dan PostgreSQL, sistem ini dioptimalkan untuk deployment mandiri di VPS.

---

## ✨ Fitur Utama

- **In-App Browser Bypass**  
  Menggunakan sistem *Transit Page* dan *Android Intent Protocol* untuk memaksa pengunjung membuka aplikasi Shopee langsung tanpa terjebak layar hitam TikTok.

- **Dashboard Admin Lengkap**  
  Manajemen produk dan kategori secara penuh (*Create, Read, Update, Delete*).

- **Sistem Keamanan**  
  Autentikasi admin menggunakan JWT dan HTTP-Only Cookies.

- **Upload Gambar Lokal**  
  Penyimpanan gambar langsung di server tanpa layanan pihak ketiga seperti S3 atau Cloudinary.

- **Audit Logs Real-time**  
  Pencatatan otomatis seluruh aktivitas perubahan data di sistem.

- **Pencarian Cepat**  
  Pencarian produk berdasarkan nomor, nama, atau kategori secara cepat.

---

## 🚀 Teknologi yang Digunakan

| Bagian | Teknologi |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Deployment | VPS Ubuntu + PM2 + Cloudflared Tunnel |

## 🌐 Demo

🔗 https://simpandulu.raply.my.id/

---

# 🛠️ Deployment VPS Ubuntu dari Nol

Panduan ini diasumsikan untuk VPS Ubuntu kosong.

Aplikasi berjalan tanpa Nginx dan diekspos menggunakan Cloudflare Tunnel.

---

## 1. Persiapan Server

Update package dan install dependency dasar:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl git postgresql postgresql-contrib -y
```

Install Node.js LTS:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Cek versi:

```bash
node -v
npm -v
```

---

## 2. Setup PostgreSQL

Masuk ke PostgreSQL:

```bash
sudo -i -u postgres
psql
```

Buat database dan user:

```sql
CREATE DATABASE simpandulu_db;

CREATE USER admin_simpan 
WITH ENCRYPTED PASSWORD 'password_database_kalian';

GRANT ALL PRIVILEGES 
ON DATABASE simpandulu_db 
TO admin_simpan;
```

Keluar:

```sql
\q
```

Kembali ke user VPS:

```bash
exit
```

---

## 3. Clone Repository

```bash
git clone https://github.com/username-github-kalian/simpandulu.git
cd simpandulu
```

Install dependency:

```bash
npm install
```

---

## 4. Konfigurasi Environment

Buat file `.env`:

```bash
nano .env
```

Isi:

```env
# Database
DATABASE_URL="postgres://admin_simpan:password_database_kalian@127.0.0.1:5432/simpandulu_db"

# Password Admin Dashboard
ADMIN_PASSWORD="password_rahasia_bebas"

# JWT Secret
JWT_SECRET="kunci_rahasia_super_panjang_12345_xyz"
```

---

## 5. Setup Database & Upload Folder

Push schema database:

```bash
npx drizzle-kit push
```

Buat folder upload:

```bash
mkdir -p public/uploads
chmod -R 755 public/uploads
```

---

## 6. Build Aplikasi

```bash
npm run build
```

---

## 7. Jalankan dengan PM2

Install PM2:

```bash
sudo npm install -g pm2
```

Start aplikasi:

```bash
pm2 start npm --name "simpandulu" -- run start -- -p 3001
```

Simpan konfigurasi:

```bash
pm2 save
pm2 startup
```

Cek status:

```bash
pm2 status
```

Lihat log:

```bash
pm2 logs simpandulu
```

---

## 8. Cloudflare Tunnel

Gunakan Cloudflare Tunnel agar aplikasi online tanpa membuka port publik langsung.

### Langkah Setup

1. Buka Cloudflare Zero Trust Dashboard
2. Masuk ke:

```text
Networks > Tunnels
```

3. Klik:

```text
Create a Tunnel
```

4. Install connector di VPS menggunakan command dari Cloudflare

5. Tambahkan Public Hostname:

```text
simpandulu.domainanda.com
```

6. Service Configuration:

| Setting | Value |
|---|---|
| Type | HTTP |
| URL | localhost:3001 |

Selesai 🎉

---

# 📦 Struktur Penting

```text
/public/uploads    -> Penyimpanan gambar
/app                -> App Router Next.js
/components         -> UI Components
/lib                -> Helper & utilities
/drizzle            -> Schema database
```

---

# 🔐 Keamanan yang Disarankan

Tambahkan `.gitignore`:

```gitignore
node_modules
.next
.env
```

Jangan pernah upload:

- `.env`
- Database dump
- Credential VPS
- JWT Secret

---

# ⚡ Command Berguna

## Restart aplikasi

```bash
pm2 restart simpandulu
```

## Stop aplikasi

```bash
pm2 stop simpandulu
```

## Update project dari GitHub

```bash
git pull
npm install
npm run build
pm2 restart simpandulu
```

---

# 👤 Author

Dikembangkan oleh **Raply**
