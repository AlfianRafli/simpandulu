import { db } from '../../../db';
import { settings } from '../../../db/schema';
import { updateTheme } from '../../actions';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function ThemePage() {
  const currentThemeReq = await db.select().from(settings).where(eq(settings.key, 'theme'));
  const currentTheme = currentThemeReq[0]?.value || 'default';

  const themes = [
    { id: 'default', name: 'Default (Kuning)', bg: 'bg-yellow-400', text: 'text-black' },
    { id: 'dark', name: 'Pro Dark', bg: 'bg-gray-900', text: 'text-white' },
    { id: 'coffee', name: 'Coffee Cream', bg: 'bg-[#6F4E37]', text: 'text-[#F5F5DC]' },
    { id: 'minimalist', name: 'Minimalist', bg: 'bg-white', text: 'text-black' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Pengaturan Tema Website</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((t) => (
          <div key={t.id} className={`p-6 rounded-2xl border-2 transition ${currentTheme === t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
            <div className={`w-full h-20 rounded-xl mb-4 ${t.bg} flex items-center justify-center font-bold ${t.text} border`}>
              Tampilan {t.name}
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">{t.name}</span>
              <form action={async () => { 'use server'; await updateTheme(t.id); }}>
                <button className={`px-4 py-2 rounded-lg font-bold text-sm transition ${currentTheme === t.id ? 'bg-green-500 text-white cursor-default' : 'bg-gray-900 text-white hover:bg-black'}`}>
                  {currentTheme === t.id ? 'Aktif' : 'Pilih Tema'}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

