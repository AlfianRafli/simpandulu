import { db } from '../../../db';
import { auditLogs } from '../../../db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic'; // Wajib agar log selalu update

export default async function AuditPage() {
  // Ambil log dari database, urutkan dari yang paling baru
  const logs = await db.query.auditLogs.findMany({
    orderBy: [desc(auditLogs.createdAt)],
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Audit Log</h2>
          <p className="text-gray-500 text-sm mt-1">Catatan semua aktivitas penambahan/perubahan data.</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
          {logs.length} Aktivitas
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} className="p-5 hover:bg-gray-50 transition flex flex-col md:flex-row md:items-start gap-4">
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap w-fit">
                {log.action}
              </div>
              <div>
                <p className="text-gray-800 font-medium">{log.details}</p>
                <p className="text-xs text-gray-400 mt-1.5">
                  {log.createdAt.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500">
            Belum ada aktivitas yang dicatat.
          </div>
        )}
      </div>
    </div>
  );
}

