'use server'

import { db } from '../db';
import { products, categories, auditLogs, settings } from '../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { redirect } from 'next/navigation';
import { randomUUID } from 'crypto';

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password');
  if (password !== process.env.ADMIN_PASSWORD) return { error: 'Password salah bang!' };

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ role: 'admin' }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('24h').sign(secret);
  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 60 * 60 * 24 });
  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  redirect('/login');
}

// --- FUNGSI PRODUK ---
export async function addProduct(formData: FormData) {
  const file = formData.get('image') as File;
  const title = formData.get('title') as string;
  const productNo = Number(formData.get('productNo'));
  const affiliateUrl = formData.get('affiliateUrl') as string;
  const categoryId = Number(formData.get('categoryId'));

  const bytes = await file.arrayBuffer();
  const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  await writeFile(join(process.cwd(), 'public/uploads', uniqueName), Buffer.from(bytes));
  
  await db.insert(products).values({ productNo, title, imageUrl: `/api/images/${uniqueName}`, affiliateUrl, categoryId });
  
  // CATAT KE AUDIT LOG
  await db.insert(auditLogs).values({ action: 'TAMBAH', details: `Produk baru: #${productNo} - ${title}` });
  revalidatePath('/'); revalidatePath('/admin/audit');
}

export async function updateProduct(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const productNo = Number(formData.get('productNo'));
  const affiliateUrl = formData.get('affiliateUrl') as string;
  const categoryId = Number(formData.get('categoryId'));
  const file = formData.get('image') as File;

  let imageUrl;
  if (file && file.size > 0) {
    // 1. Ambil data produk lama untuk mengetahui nama file gambar lamanya
    const oldProduct = await db.select().from(products).where(eq(products.id, id));
    
    // 2. Hapus gambar lama dari SSD VPS
    if (oldProduct.length > 0 && oldProduct[0].imageUrl) {
      const oldFilename = oldProduct[0].imageUrl.split('/').pop();
      if (oldFilename) {
        try { await unlink(join(process.cwd(), 'public/uploads', oldFilename)); } catch (e) { /* Abaikan jika file tidak ditemukan */ }
      }
    }

    // 3. Simpan gambar baru
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    await writeFile(join(process.cwd(), 'public/uploads', uniqueName), Buffer.from(await file.arrayBuffer()));
    imageUrl = `/api/images/${uniqueName}`;
  }

  await db.update(products).set({ title, productNo, affiliateUrl, categoryId, ...(imageUrl && { imageUrl }) }).where(eq(products.id, id));
  await db.insert(auditLogs).values({ action: 'UPDATE', details: `Memperbarui data produk: #${productNo}` });
  revalidatePath('/'); revalidatePath('/admin/update'); revalidatePath('/admin/audit');
}

export async function deleteProduct(id: number) {
  // 1. Ambil data produk sebelum dihapus
  const targetProduct = await db.select().from(products).where(eq(products.id, id));
  
  // 2. Hapus gambar dari SSD VPS
  if (targetProduct.length > 0 && targetProduct[0].imageUrl) {
    const filename = targetProduct[0].imageUrl.split('/').pop();
    if (filename) {
      try { await unlink(join(process.cwd(), 'public/uploads', filename)); } catch (e) { /* Abaikan */ }
    }
  }

  // 3. Hapus data dari database
  await db.delete(products).where(eq(products.id, id));
  await db.insert(auditLogs).values({ action: 'HAPUS', details: `Menghapus produk ID: ${id}` });
  revalidatePath('/'); revalidatePath('/admin/delete'); revalidatePath('/admin/update'); revalidatePath('/admin/audit');
}

// --- FUNGSI KATEGORI ---
export async function addCategory(name: string, slug: string) {
  await db.insert(categories).values({ name, slug });
  await db.insert(auditLogs).values({ action: 'KATEGORI', details: `Kategori ditambah: ${name}` });
  revalidatePath('/'); revalidatePath('/admin/categories'); revalidatePath('/admin/audit');
}

export async function deleteCategory(id: number) {
  await db.delete(categories).where(eq(categories.id, id));
  await db.insert(auditLogs).values({ action: 'HAPUS KAT', details: `Kategori dihapus ID: ${id}` });
  revalidatePath('/'); revalidatePath('/admin/categories'); revalidatePath('/admin/audit');
}

// --- FUNGSI TEMA ---
export async function updateTheme(themeName: string) {
  // Cek apakah key 'theme' sudah ada
  const existing = await db.select().from(settings).where(eq(settings.key, 'theme'));
  
  if (existing.length > 0) {
    await db.update(settings).set({ value: themeName }).where(eq(settings.key, 'theme'));
  } else {
    await db.insert(settings).values({ key: 'theme', value: themeName });
  }

  // Catat ke audit log
  await db.insert(auditLogs).values({ 
    action: 'THEME', 
    details: `Mengubah tema website menjadi: ${themeName}` 
  });

  revalidatePath('/');
  revalidatePath('/admin/themes');
}
