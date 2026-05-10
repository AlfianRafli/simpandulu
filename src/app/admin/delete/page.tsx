import { db } from '../../../db';
import { products } from '../../../db/schema';
import { deleteProduct } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function DeleteProducts() {
  const allProducts = await db.select().from(products);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold">Hapus Produk</h2>
        <p className="text-gray-500 text-sm">Hati-hati, data yang dihapus tidak bisa dikembalikan.</p>
      </div>
      <div className="divide-y divide-gray-100">
        {allProducts.map((p) => (
          <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <img src={p.imageUrl} alt="" className="w-12 h-12 rounded object-cover border" />
              <div>
                <p className="font-bold text-gray-800">#{p.productNo} - {p.title}</p>
                <p className="text-xs text-gray-400 truncate max-w-[200px]">{p.affiliateUrl}</p>
              </div>
            </div>
            <form action={async () => {
              'use server'
              await deleteProduct(p.id);
            }}>
              <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition">Hapus</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

