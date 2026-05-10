import { db } from '../../../db';
import { categories } from '../../../db/schema';
import { addCategory, deleteCategory } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  // Ambil semua data kategori dari database
  const allCategories = await db.select().from(categories);

  // Fungsi Action untuk Form Tambah Kategori
  async function handleAdd(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    if (!name) return;
    
    // Membuat slug otomatis (contoh: "Coffee Maker" -> "coffee-maker")
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Kirim ke database melalui actions.ts
    await addCategory(name, slug);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* BAGIAN TAMBAH KATEGORI */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tambah Kategori Baru</h2>
        
        {/* Ini form action-nya yang memanggil fungsi handleAdd di atas */}
        <form action={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            name="name" 
            placeholder="Nama Kategori (cth: Kemeja)" 
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition bg-white"
          />
          <button 
            type="submit" 
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition whitespace-nowrap shrink-0 shadow-sm"
          >
            Tambah
          </button>
        </form>
      </div>

      {/* BAGIAN DAFTAR KATEGORI */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-700">Nama Kategori</th>
                <th className="p-4 font-semibold text-gray-700">Slug</th>
                <th className="p-4 font-semibold text-gray-700 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-900">{cat.name}</td>
                  <td className="p-4 text-gray-500 text-sm">{cat.slug}</td>
                  <td className="p-4 text-right">
                    {/* Action untuk Hapus Kategori */}
                    <form action={async () => {
                      'use server';
                      await deleteCategory(cat.id);
                    }}>
                      <button type="submit" className="text-red-500 hover:text-red-700 font-bold text-sm px-3 py-1.5 rounded-md hover:bg-red-50 transition">
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {allCategories.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    Belum ada kategori yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

