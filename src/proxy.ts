import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  // Jika mencoba akses /admin tanpa token, lempar ke /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verifikasi keaslian token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next(); // Lolos, silakan masuk
  } catch (error) {
    // Token palsu atau kadaluarsa, lempar ke /login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Beri tahu Next.js, middleware ini HANYA menjaga rute /admin
export const config = {
  matcher: '/admin/:path*',
};

