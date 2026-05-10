import { db } from '../../../db';
import { products } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import ClientTransit from './ClientTransit';

export const dynamic = 'force-dynamic';

export default async function GoPage({ params }: { params: Promise<{ id: string }> }) {
  // Wajib await untuk parameter di Next.js versi terbaru
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  
  const productList = await db.select().from(products).where(eq(products.id, id));
  const product = productList[0];

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-xl">Produk tidak ditemukan.</div>;
  }

  // Oper link Shopee ke komponen Client
  return <ClientTransit url={product.affiliateUrl} />;
}

