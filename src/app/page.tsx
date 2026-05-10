import { db } from '../db';
import { products, categories, auditLogs, settings } from '../db/schema';
import ClientHome from './ClientHome';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Ambil data dari PostgreSQL secara aman di Server
  const allCategories = await db.select().from(categories);
  const allProducts = await db.select().from(products);
  const themeReq = await db.select().from(settings).where(eq(settings.key, 'theme'));
  const currentTheme = themeReq[0]?.value || 'default';

  // 2. Lempar data tersebut ke komponen UI di sisi Client
  return <ClientHome initialCategories={allCategories} initialProducts={allProducts} theme={currentTheme} />;
}

