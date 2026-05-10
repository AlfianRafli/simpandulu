'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ClientHome({ 
  initialCategories, 
  initialProducts, 
  theme = 'default' 
}: { 
  initialCategories: any[], 
  initialProducts: any[], 
  theme?: string 
}) {
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchInput);
  };

  const filteredProducts = initialProducts.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.categoryId?.toString() === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(activeSearch.toLowerCase()) || p.productNo.toString().includes(activeSearch);
    return matchCategory && matchSearch;
  });

  const currentCategoryName = selectedCategory === 'all' 
    ? 'SEMUA KATEGORI' 
    : initialCategories.find(c => c.id.toString() === selectedCategory)?.name || 'KATEGORI';

  // --- THEME CONFIGURATION ---
  const themeStyles: Record<string, any> = {
    default: {
      mainBg: 'bg-gray-100/50',
      containerBg: 'bg-white',
      headerBg: 'bg-white/95',
      cardBg: 'bg-white',
      textMain: 'text-gray-900',
      textMuted: 'text-gray-500',
      border: 'border-gray-200',
      accentBg: 'bg-yellow-400',
      accentHover: 'group-hover:bg-yellow-500 hover:bg-yellow-500',
      accentText: 'text-black',
      inputBg: 'bg-gray-50',
      inputText: 'text-black placeholder:text-gray-600',
    },
    dark: {
      mainBg: 'bg-gray-900',
      containerBg: 'bg-gray-950',
      headerBg: 'bg-gray-950/95',
      cardBg: 'bg-gray-900',
      textMain: 'text-white',
      textMuted: 'text-gray-400',
      border: 'border-gray-800',
      accentBg: 'bg-blue-600',
      accentHover: 'group-hover:bg-blue-700 hover:bg-blue-700',
      accentText: 'text-white',
      inputBg: 'bg-gray-800',
      inputText: 'text-white placeholder:text-gray-400',
    },
    coffee: {
      mainBg: 'bg-[#Ece0d1]',
      containerBg: 'bg-[#FDFBF7]',
      headerBg: 'bg-[#FDFBF7]/95',
      cardBg: 'bg-white',
      textMain: 'text-[#3E2723]',
      textMuted: 'text-[#8D6E63]',
      border: 'border-[#D7CCC8]',
      accentBg: 'bg-[#6F4E37]',
      accentHover: 'group-hover:bg-[#5A3E2B] hover:bg-[#5A3E2B]',
      accentText: 'text-[#FDFBF7]',
      inputBg: 'bg-white',
      inputText: 'text-[#3E2723] placeholder:text-[#8D6E63]',
    },
    minimalist: {
      mainBg: 'bg-gray-50',
      containerBg: 'bg-white',
      headerBg: 'bg-white/95',
      cardBg: 'bg-white',
      textMain: 'text-black',
      textMuted: 'text-gray-400',
      border: 'border-gray-200',
      accentBg: 'bg-black',
      accentHover: 'group-hover:bg-gray-800 hover:bg-gray-800',
      accentText: 'text-white',
      inputBg: 'bg-gray-50',
      inputText: 'text-black placeholder:text-gray-500',
    },
  };

  const style = themeStyles[theme] || themeStyles.default;

  return (
    <main className={`min-h-screen ${style.mainBg} pb-10 transition-colors duration-300`}>
      <div className={`max-w-5xl mx-auto ${style.containerBg} min-h-screen shadow-sm border-x ${style.border} relative transition-colors duration-300`}>
        
        {/* HEADER RESPONSIVE */}
        <header className={`p-4 md:p-6 border-b ${style.border} sticky top-0 z-30 ${style.headerBg} backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 transition-colors duration-300`}>
          <div className="flex items-center gap-3 p-3 md:p-0 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.png" alt="Logo SimpanDulu" className="w-12 h-12 object-contain shrink-0" />
            <div>
              <h1 className={`font-bold ${style.textMain} text-lg md:text-xl`}>SimpanDulu</h1>
              <p className={`text-xs ${style.textMuted}`}>Rekomendasi Barang Terbaik</p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-96 shrink-0">
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="🔍 Cari produk (cth: 1398, kemeja)..." 
              className={`w-full ${style.inputBg} border ${style.border} rounded-lg px-4 py-2.5 text-base ${style.inputText} focus:outline-none focus:ring-1 focus:ring-opacity-50 transition`}
            />
            <button type="submit" className={`${style.accentBg} ${style.accentText} px-5 py-2.5 rounded-lg font-bold text-sm ${style.accentHover} transition shadow-sm`}>
              CARI
            </button>
          </form>
        </header>

        {/* DROPDOWN KATEGORI RESPONSIVE */}
        <section className={`p-4 md:px-6 md:py-4 border-b ${style.border} ${style.mainBg} transition-colors duration-300`}>
          <div className="relative md:max-w-xs">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex justify-between items-center ${style.cardBg} border ${style.border} py-2.5 px-4 rounded-lg text-sm font-bold ${style.textMain} shadow-sm transition`}
            >
              <span>{currentCategoryName}</span>
              <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className={`absolute z-40 w-full mt-2 ${style.cardBg} border ${style.border} rounded-lg shadow-xl max-h-60 overflow-y-auto`}>
                <button
                  onClick={() => { setSelectedCategory('all'); setIsDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold ${style.textMain} hover:opacity-70 transition`}
                >
                  SEMUA KATEGORI
                </button>
                {initialCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id.toString()); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold ${style.textMuted} hover:${style.textMain} transition border-t ${style.border}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* PRODUCT GRID RESPONSIVE */}
        <section className="p-4 md:p-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                 <Link 
                  key={product.id} 
                  href={`/go/${product.id}`}
                  className={`flex flex-col rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group border ${style.border} ${style.cardBg}`}
                 >
		 <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
		   <Image 
		     src={product.imageUrl} 
		     alt={product.title} 
		     fill
		     sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
		     className="object-cover group-hover:scale-105 transition-transform duration-500" 
		   />
		 </div>
                  <div className="p-3 md:p-4">
                    <p className={`text-[13px] md:text-sm leading-snug ${style.textMuted} line-clamp-2`}>
                      <span className={`font-extrabold ${style.textMain}`}>{product.productNo}. </span>{product.title}
                    </p>
                    <div className={`mt-3 md:mt-4 inline-block w-full text-center ${style.accentBg} ${style.accentText} text-xs font-bold py-1.5 md:py-2 rounded-md ${style.accentHover} transition`}>
                      Lihat Barang
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🔍</div>
              <p className={`font-bold ${style.textMain}`}>Produk tidak ditemukan</p>
              <p className={`text-sm mt-1 ${style.textMuted}`}>Coba gunakan kata kunci lain.</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

