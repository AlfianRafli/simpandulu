import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: Request,
  // 1. Beri tahu TypeScript bahwa params adalah Promise
  { params }: { params: Promise<{ filename: string }> } 
) {
  // 2. Wajib gunakan await untuk membuka isi params di Next.js versi terbaru
  const resolvedParams = await params;
  const filename = resolvedParams.filename;
  
  const filePath = join(process.cwd(), 'public/uploads', filename);

  try {
    const fileBuffer = await readFile(filePath);
    
    const ext = filename.split('.').pop()?.toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === 'png') contentType = 'image/png';
    else if (ext === 'webp') contentType = 'image/webp';
    else if (ext === 'gif') contentType = 'image/gif';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Gambar tidak ditemukan', { status: 404 });
  }
}

