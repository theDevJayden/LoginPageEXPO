# React Native

React Native adalah framework yang dikembangkan oleh Facebook. Ia bersifat hybrid, jadi bisa dipakai di beberapa perangkat seperti IoS, Android, dan web. React menggabungkan JavaScript/TypeScript dengan React. React Native tidak mengubah kode JavaScript/TypeScript menjadi sebuah code native (Code native berarti hanya bisa jalan di satu perangkat), namun ia menjalankan JavaScript/TypeScript di samping UI Native secara berdampingan.

## Komponen Utama dalam Arsitektur React Native

- **JavaScript/TypeScript Thread** : Tempat dimana semua logika aplikasi, management state, request API, dan event listener dijalankan
- **Native UI Thread** : Untuk merender UI diberbagai platform (seperti IoS dan Android) dan menangani interaksi pengguna.
- **JavaScript Interface** : Menjadi jembatan yang membuat JavaScript/TypeScript dapat memanggil method native secara langsung.

## Keunggulan

- **Cross Platform** : React Native dapat berjalan di berbagai perangkat menggunakan satu basis code, menyederhanakan proses development.
- **Fast Refresh** : Membuat perubahan yang dilakukan didalam code langsung terlihat pada emulator / HP saat itu juga.
- **Pencegahan Error** : Menangkap kesalahan penulisan, NULL, atau kesalahan passing langsung di editor sebelum aplikasi dijalankan.

## Komponen

Kita memecah code menjadi beberapa potongan kecil agar kita dapat memakai ulang code tersebut. Hal ini dapat menghemat waktu, karena tampilan fitur ataupun navbar dapat dipakai ulang di halaman - halaman lain. Contoh dalam code saya adalah pada `home.tsx` dan `expense-income.tsx`, dimana mereka sama sama menampilkan kartu untuk melihat expense dan income. Maka saya pakai ulang komponen memakai code ini :

```tsx
import MonthlyOverviewCard from '../components/MonthlyOverviewCard';
```

## Props

Objek argumen pertama dari fungi komponen. Ia memiliki alur dari parent menuju child. Jadi child tidak bisa mengubah data secara sembarangan. Kalau ingin mengubah data harus mengirimkannya ke parent. Child dalam props biasanya bertujuan untuk menambilkan data.

Contoh code :

```tsx
type MonthlyOverviewCardProps = {
  income: number;
  expenses: number;
  savings: number;
};

export default function MonthlyOverviewCard({ income, expenses, savings }:
MonthlyOverviewCardProps) {
```

## State

Ia adalah memori jangka pendek komponen, dimana data internal dalam layar berubah karena adanya interaksi pengguna. Ketika state dalam react berubah, otomatis tampilan layar berubah tanpa harus di refresh.

Contoh :

```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
```

## Navigation

Navigasi mengatuir bagaimana satu layar bisa berpindah ke file lain. Dalam proyek saya menggunakan Expo Router, dan memakai file based routing, yang jelas terlihat pada `src/app`, folder tersebut dipetakan menjadi route dan navigator.

Contoh :

```tsx
router.replace('/home');
```

Artinya setelah berhasil login, sistem membuka homepage dan menutup login page.

---

## Permasalahan

Banyak anak muda sekarang yang sulit mengatur keuangan, apalagi dengan maraknya e-money dan online banking, yang membuat orang-orang sering bingung kemana perginya uang mereka karena tidak ada catatan jelas, sedangkan mencatat di dalam excel tidak memberikan visualisasi yang jelas ataupun menarik.

## Target Pengguna

Mahasiswa, orang baru bekerja, anak kos yang sudah harus mulai mandiri memikirkan keuangan sendiri, namun gagal terus akibat tidak ada visualisasi yang jelas.

## Kebutuhan Pengguna

- Pengguna harus melihat persentase budget yang telah digunakan.
- Pengguna harus bisa mencatat pemasukan dan pengeluaran finansial mereka.
- Pengguna dapat melihat riwayat pengeluaran dan pemasukan mereka.
- Pengguna harus bisa melihat visualisasi data pengeluaran mereka sesuai kategori pengeluaran.
- Pengguna harus bisa melihat total pengeluaran dan pemasukan mereka.

## Keputusan Desain

- **Warna Utama** : Warna utama saya adalah hijau tua, karena warna tersebut memberikan kesan yang lebih peaceful, meyakinkan pengguna bahwa dengan mengatur keuangan mereka dengan baik, hidup menjadi lebih tenang.
- **Logo pada Tombol** : Logo pada tombol di dalam aplikasi memiliki desain yang minimalis, untuk memberikan kesan bahwa aplikasi nya simpel dan modern, serta sebagai petunjuk agar pengguna tahu kegunaan tombol.
- **Donut Chart** : Digunakan karena desainnya yang memungkinkan untuk melihat persentase dengan visualisasi yang lebih enak dan terlihat.

## Cara menjalankan aplikasi

1. **Instalasi Library / Dependensi:**
   Jalankan perintah berikut untuk mengunduh semua library yang diperlukan (Expo, Expo Router, NativeWind, AsyncStorage, dll):
   ```bash
   npm install
   ```

2. **Jalankan Aplikasi:**
   Ketik perintah berikut untuk menyalakan development server Expo:
   ```bash
   npx expo start
   ```
   * Scan QR Code lewat aplikasi **Expo Go** di HP (Android/iOS), atau tekan `a` untuk Android Emulator / `w` untuk Browser Web.

## Rencana Lanjutan

- Menambahkan firebase sebagai database aplikasi (Untuk sekarang data masih tersimpan dalam asyncstorage (lokal))
- Validasi input pada register.
- Tombol logout.
- Fitur debt tracker.

## Video Demo
https://drive.google.com/file/d/1YsUDL8gUDNxvSHSeJ0_Cqu5OqaTGCHeb/view?usp=sharing 

## Foto Produk
![1](https://drive.google.com/file/d/1qMjjv6GjgatOMtptxx0m3StfJch3umFa/view?usp=drive_link)
![2](https://drive.google.com/file/d/15MWhjVLylLib93SU5bR5ylnKDBsuL8ZD/view?usp=drive_link)
![3](https://drive.google.com/file/d/1DKJo75kGkOJNsOC3AFVXjys6x93m8c7b/view?usp=drive_link)
![4](https://drive.google.com/file/d/1Mty5DpYG2697-MhOqdpwHX54lrKswGYv/view?usp=drive_link)
![5](https://drive.google.com/file/d/1XAQjsim5800BfsRQekCT_Xz7DAAkuXka/view?usp=drive_link)