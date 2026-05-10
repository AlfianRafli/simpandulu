import { db } from '../db';
import { categories, products, settings } from '../db/schema';
import ClientHome from './ClientHome';
import { eq, ilike, or, and, sql, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string, search?: string, category?: string }> }) {
  const params = await searchParams;
  
  // Parameter dari URL
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const category = params.category || 'all';
  
  const limit = 50; // Maksimal 50 data per halaman
  const offset = (page - 1) * limit;

  // Bangun kondisi pencarian database (Where Clause)
  const conditions = [];
  if (category !== 'all') conditions.push(eq(products.categoryId, parseInt(category)));
  if (search) {
    conditions.push(
      or(
        ilike(products.title, `%${search}%`),
        sql`${products.productNo}::text ILIKE ${`%${search}%`}`
      )
    );
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 1. Ambil Produk Sesuai Halaman (Hanya 50 Data)
  const paginatedProducts = await db.select()
    .from(products)
    .where(whereClause)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(products.id)); // Tampilkan yang terbaru

  // 2. Hitung Total Data untuk Pagination
  const countResult = await db.select({ count: sql<number>`count(*)` }).from(products).where(whereClause);
  const totalItems = Number(countResult[0].count);
  const totalPages = Math.ceil(totalItems / limit);

  // Ambil Tema dan Kategori
  const themeReq = await db.select().from(settings).where(eq(settings.key, 'theme'));
  const currentTheme = themeReq[0]?.value || 'default';
  const allCategories = await db.select().from(categories);

  return (
    <ClientHome 
      initialCategories={allCategories} 
      products={paginatedProducts} 
      theme={currentTheme}
      currentPage={page}
      totalPages={totalPages}
      currentSearch={search}
      currentCategory={category}
    />
  );
}
