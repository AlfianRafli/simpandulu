'use client';
import { useState } from 'react';

export default function ClientTransit({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleOpenShopee = () => {
    // Trik 1: Coba paksa buka via Android Intent (Khusus Android)
    // Ini seringkali bisa bypass layar hitam TikTok
    const shopeeIntent = url.replace('https://', 'intent://').concat('#Intent;scheme=https;package=com.shopee.id;end');
    
    // Kita coba buka intent dulu, jika dalam 500ms tidak pindah, kita buka URL biasa
    const start = Date.now();
    window.location.href = shopeeIntent;

    setTimeout(() => {
      if (Date.now() - start < 1000) {
        window.location.href = url;
      }
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4 font-sans antialiased text-black">
      <div className="bg-white p-6 rounded-[2rem] shadow-xl max-w-[340px] w-full border border-gray-100">
        
        {/* Ikon Tas Belanja Animasi */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 bg-orange-100 rounded-3xl rotate-12"></div>
          <div className="absolute inset-0 bg-orange-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg shadow-orange-200">
            🛍️
          </div>
        </div>
        
        <h1 className="text-2xl font-black text-gray-900 mb-2 leading-tight">Konfirmasi Pesanan</h1>
        <p className="text-gray-500 text-sm mb-8 px-2">
          TikTok membatasi akses link belanja. Tekan tombol di bawah untuk lanjut ke aplikasi Shopee.
        </p>

        {/* Tombol Utama: Shopee */}
        <button 
          onClick={handleOpenShopee}
          className="w-full bg-[#ee4d2d] text-white font-extrabold py-4 rounded-2xl shadow-[0_8px_20px_rgba(238,77,45,0.3)] hover:scale-[1.02] active:scale-95 transition-all mb-4 text-lg"
        >
          KLIK DISINI KE SHOPEE
        </button>

        {/* Alternatif: Copy Link */}
        <button 
          onClick={handleCopy}
          className="w-full bg-white text-gray-700 font-bold py-3.5 rounded-2xl border-2 border-gray-100 hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
        >
          {copied ? '✅ Link Berhasil Disalin' : '🔗 Salin Link (Cadangan)'}
        </button>
        
        {/* PANDUAN PENTING UNTUK USER */}
        <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100 text-left">
          <p className="text-[11px] text-red-600 font-bold uppercase tracking-wider mb-2">PENTING: JIKA LAYAR HITAM</p>
          <ol className="text-[12px] text-gray-700 space-y-2 leading-relaxed">
            <li className="flex gap-2">
              <span className="bg-red-200 text-red-700 w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 font-black">1</span>
              <span>Klik ikon <b>Titik Tiga (•••)</b> di pojok kanan atas layar TikTok Anda.</span>
            </li>
            <li className="flex gap-2">
              <span className="bg-red-200 text-red-700 w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 font-black">2</span>
              <span>Pilih menu <span className="text-red-600 font-bold">"Buka di Browser"</span> untuk langsung ke Shopee.</span>
            </li>
          </ol>
        </div>

      </div>
      
      <p className="mt-6 text-[10px] text-gray-400 font-medium tracking-widest uppercase">SimpanDulu Aman & Terpercaya</p>
    </div>
  );
}

