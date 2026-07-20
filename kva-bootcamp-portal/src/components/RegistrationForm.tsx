import React, { useState } from 'react';
import { registerParticipant } from '../lib/supabase';
import { PLATOONS, DISCIPLESHIP_GROUPS, Participant } from '../constants';
import { CheckCircle, UserPlus, ShieldAlert } from 'lucide-react';

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    mothersName: '',
    emailAddress: '',
    churchAttended: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<Participant | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const participant = await registerParticipant(formData);
      setResult(participant);
      setFormData({ fullName: '', phoneNumber: '', mothersName: '', emailAddress: '', churchAttended: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <UserPlus className="w-8 h-8 text-emerald-400" />
        <h2 className="text-2xl font-bold text-white">Participant Intake Form</h2>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center space-x-3 text-red-200">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {result ? (
        <div className="p-6 bg-slate-900 rounded-lg border border-emerald-500/30 text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Registration Successful!</h3>
          <p className="text-slate-400">Assigned Camp Identification:</p>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-wider">{result.camp_no}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-6 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-lg bg-slate-800/80 border-l-4" style={{ borderColor: PLATOONS[result.platoon_id]?.color }}>
              <span className="text-xs uppercase font-bold text-slate-400">Assigned Platoon</span>
              <p className="text-lg font-semibold text-white">{PLATOONS[result.platoon_id]?.name}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/80 border-l-4 border-indigo-500">
              <span className="text-xs uppercase font-bold text-slate-400">Discipleship Unit</span>
              <p className="text-sm font-semibold text-white">{DISCIPLESHIP_GROUPS[result.discipleship_id]}</p>
            </div>
          </div>

          <button
            onClick={() => setResult(null)}
            className="mt-6 w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold text-white transition"
          >
            Register Another Participant
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="+234..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.emailAddress}
                onChange={e => setFormData({ ...formData, emailAddress: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Church Attended *</label>
            <input
              type="text"
              required
              value={formData.churchAttended}
              onChange={e => setFormData({ ...formData, churchAttended: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Living Faith Church"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Mother's Name <span className="text-slate-500 text-xs">(If WOGIN Member)</span>
            </label>
            <input
              type="text"
              value={formData.mothersName}
              onChange={e => setFormData({ ...formData, mothersName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              placeholder="Optional"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold text-white transition disabled:opacity-50"
          >
            {loading ? "Processing Allocation..." : "Submit Registration"}
          </button>
        </form>
      )}
    </div>
  );
};