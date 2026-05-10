import { db } from '../../../db';
import { products, categories } from '../../../db/schema';
import { updateProduct } from '../../actions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function UpdateProducts({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  // Wajib await untuk parameter URL di Next.js 15
  const resolvedParams = await searchParams;
  const allProducts = await db.select().from(products);
  const allCategories = await db.select().from(categories);

  // Cek produk mana yang sedang di-klik
  const selectedId = resolvedParams.id ? parseInt(resolvedParams.id) : null;
  const selectedProduct = selectedId ? allProducts.find(p => p.id === selectedId) : null;

  const inputStyle = "w-full border border-gray-300 px-4 py-2.5 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";

  // Mengaitkan ID produk ke Server Action
  const updateAction = selectedProduct ? updateProduct.bind(null, selectedProduct.id) : async () => {};

  return (
    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Kolom Kiri: Daftar Produk */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit md:col-span-1">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Pilih Produk</h2>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {allProducts.map((p) => (
            <Link href={`/admin/update?id=${p.id}`} key={p.id} className={`p-3 border rounded-xl cursor-pointer transition flex gap-3 items-center ${selectedId === p.id ? 'border-yellow-400 bg-yellow-50' : 'hover:border-yellow-400'}`}>
              <img src={p.imageUrl} className="w-10 h-10 object-cover rounded" alt="" />
              <div className="text-sm">
                <p className="font-bold text-black">#{p.productNo}</p>
                <p className="text-gray-500 line-clamp-1">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Kolom Kanan: Form Edit */}
      <div className="md:col-span-2">
        {selectedProduct ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Edit Produk: #{selectedProduct.productNo}</h2>
            <form action={updateAction} className="flex flex-col gap-5">
              <div>
                <label className={labelStyle}>Nomor Produk</label>
                <input name="productNo" type="number" defaultValue={selectedProduct.productNo} required className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>Judul / Nama Barang</label>
                <input name="title" defaultValue={selectedProduct.title} required className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>Kategori</label>
                <select name="categoryId" defaultValue={selectedProduct.categoryId || ''} required className="w-full border border-gray-300 px-4 py-2.5 rounded-lg bg-white text-black focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition">
                  {allCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelStyle}>Link Afiliasi Shopee</label>
                <input name="affiliateUrl" defaultValue={selectedProduct.affiliateUrl} required className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>Ganti Thumbnail (Opsional)</label>
                <input name="image" type="file" accept="image/*" className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:border-yellow-400" />
                <p className="text-xs text-gray-400 mt-1.5">Biarkan kosong jika tidak ingin mengubah gambar.</p>
              </div>
              <button type="submit" className="bg-yellow-400 text-black font-extrabold text-lg p-4 rounded-lg hover:bg-yellow-500 active:bg-yellow-600 transition shadow-md mt-4">
                Simpan Perubahan
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center p-10 text-center h-full">
            <p className="text-gray-400 font-medium">Klik produk di samping kiri untuk mulai mengedit data.</p>
          </div>
        )}
      </div>

    </div>
  );
}

