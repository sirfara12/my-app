import Link from "next/link";
export default function Home() {
  return (
    <div>
      <p>Nama : Sirfaratih</p>
      <p>NIM : 2341720072</p>
      <p>Program Studi: D4 Teknik Informatika</p>
       <br />

      <Link href="/">
        <button>Kembali ke Halaman Utama</button>
      </Link>
     
    </div>
  );
}
