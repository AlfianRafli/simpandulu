// --- src/app/admin/page.tsx ---
import { db } from '../../db';
import { categories } from '../../db/schema';
import { addProduct } from '../actions';

export const dynamic = 'force-dynamic'; 

export default async function AdminPage() {
  // Ambil data kategori
  const allCategories = await db.select().from(categories);

  // Deklarasi style dipindah ke SINI (sebelum return)
  const inputStyle = "w-full border border-gray-300 px-4 py-2.5 rounded-lg text-black placeholder:text-black focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Admin: <span className='text-gray-400 font-medium text-xl'>Tambah Barang</span></h2>
        <p className="text-gray-500 mt-2">Isi formulir di bawah ini untuk menambahkan barang afiliasi baru.</p>
      </div>
      
      <form action={addProduct} className="flex flex-col gap-6">
        <div>
          <label className={labelStyle}>Nomor Produk</label>
          <input name="productNo" type="number" required placeholder="Contoh: 1398" className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Judul / Nama Barang</label>
          <input name="title" required placeholder="Contoh: Kemeja Flanel Kotak..." className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Kategori</label>
          <select name="categoryId" required className="w-full border border-gray-300 px-4 py-2.5 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition">
            <option value="">-- Pilih Kategori --</option>
            {allCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelStyle}>Link Afiliasi Shopee</label>
          <input name="affiliateUrl" required placeholder="https://shope.ee/..." className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Upload Thumbnail (Gambar)</label>
          <input name="image" type="file" accept="image/*" required className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm focus:outline-none focus:border-yellow-400" />
          <p className="text-xs text-gray-400 mt-1.5">File harus berupa gambar (JPG, PNG).</p>
        </div>

        <button type="submit" className="bg-yellow-400 text-black font-extrabold text-lg p-4 rounded-lg hover:bg-yellow-500 active:bg-yellow-600 transition shadow-md hover:shadow-lg mt-6">
          + Simpan Barang ke Database
        </button>
      </form>
    </div>
  );
}

