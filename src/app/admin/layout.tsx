import { ReactNode } from 'react';
import Link from 'next/link';
import { logoutAdmin } from '../actions';

// Icon-icon SVG yang sudah di-update
const Icons = {
  Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  Edit: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Grid: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Clipboard: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  Logout: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  Color: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Class styling agar tidak kepanjangan ditulis berulang-ulang
  const navLinkStyle = "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap";

  return (
    <div className="min-h-screen bg-gray-100/50 flex flex-col antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
          
          {/* LOGO */}
          <Link href="/admin" className="flex items-center gap-2 w-fit">
            <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black text-sm shrink-0">SD</div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              SimpanDulu <span className="text-xs font-medium text-gray-400">Admin</span>
            </h1>
          </Link>

          {/* NAV LINKS (Bisa di-scroll nyamping kalau di HP biar gak numpuk) */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
            <Link href="/admin" className={navLinkStyle}>
              <Icons.Plus /> <span className="hidden lg:inline">Add Item</span>
            </Link>
            
            <Link href="/admin/update" className={navLinkStyle}>
              <Icons.Edit /> <span className="hidden lg:inline">Update Item</span>
            </Link>
            
            <Link href="/admin/delete" className={navLinkStyle}>
              <Icons.Trash /> <span className="hidden lg:inline">Delete Item</span>
            </Link>

            <Link href="/admin/categories" className={navLinkStyle}>
              <Icons.Grid /> <span className="hidden lg:inline">Categories</span>
            </Link>

            <Link href="/admin/audit" className={navLinkStyle}>
              <Icons.Clipboard /> <span className="hidden lg:inline">Audit</span>
            </Link>

	    <Link href="/admin/themes" className={navLinkStyle}>
	      <Icons.Color /> <span className="hidden lg:inline">Themes</span>
	    </Link>
            
            <div className="w-px h-5 bg-gray-200 mx-2 shrink-0"></div>

            <form action={logoutAdmin}>
              <button type="submit" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition whitespace-nowrap">
                <Icons.Logout /> <span className="hidden lg:inline">Keluar</span>
              </button>
            </form>
          </nav>

        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* CSS Tambahan untuk menyembunyikan scrollbar di menu HP */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

