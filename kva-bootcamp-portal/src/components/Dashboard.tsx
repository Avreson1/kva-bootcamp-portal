import React, { useEffect, useState } from 'react';
import { supabase, handleExcelExport } from '../lib/supabase';
import { PLATOONS, DISCIPLESHIP_GROUPS, Participant } from '../constants';
import { Download, Users, RefreshCw } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from('participants').select('*').order('id', { ascending: false });
    if (data) setParticipants(data as Participant[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-white">Monitoring & Metrics Dashboard</h2>
          <p className="text-sm text-slate-400">Total Registered: {participants.length} Attendees</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchData}
            className="p-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExcelExport}
            className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition"
          >
            <Download className="w-5 h-5" />
            <span>Export Roster (.xlsx)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(PLATOONS).map(([idStr, platoon]) => {
          const id = Number(idStr);
          const count = participants.filter(p => p.platoon_id === id).length;
          return (
            <div key={id} className="p-4 bg-slate-800 rounded-xl border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-2" style={{ backgroundColor: platoon.color }} />
              <div className="pl-3">
                <p className="text-xs font-bold uppercase text-slate-400">Platoon {id}</p>
                <h4 className="text-base font-bold text-white truncate">{platoon.name}</h4>
                <div className="mt-2 text-2xl font-black text-slate-100">{count} <span className="text-xs font-normal text-slate-400">members</span></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 font-bold text-white flex items-center justify-between">
          <span>Recent Entries</span>
          <Users className="w-5 h-5 text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="p-4">Camp ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email / Phone</th>
                <th className="p-4">Platoon</th>
                <th className="p-4">Discipleship Unit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {participants.map(p => (
                <tr key={p.id} className="hover:bg-slate-700/30">
                  <td className="p-4 font-mono font-bold text-emerald-400">{p.camp_no}</td>
                  <td className="p-4 font-semibold text-white">{p.full_name}</td>
                  <td className="p-4 text-xs">
                    <div>{p.email_address}</div>
                    <div className="text-slate-500">{p.phone_number}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${PLATOONS[p.platoon_id]?.color}25`, color: PLATOONS[p.platoon_id]?.color }}>
                      {PLATOONS[p.platoon_id]?.name}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-300">
                    {DISCIPLESHIP_GROUPS[p.discipleship_id]}
                  </td>
                </tr>
              ))}
              {participants.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">No participant records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};