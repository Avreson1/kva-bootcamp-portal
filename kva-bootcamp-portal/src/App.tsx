import React, { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import { Shield, Lock, Compass } from 'lucide-react';

type Role = 'NONE' | 'ROLE_STAFF' | 'ROLE_MONITOR';

export const App: React.FC = () => {
  const [role, setRole] = useState<Role>('NONE');
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Access PINs
  const STAFF_PIN = '1234';
  const MONITOR_PIN = '8888';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === STAFF_PIN) {
      setRole('ROLE_STAFF');
      setErrorMsg('');
    } else if (pinInput === MONITOR_PIN) {
      setRole('ROLE_MONITOR');
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Security Key. Please check with camp administration.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="bg-slate-800 border-b border-slate-700 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Compass className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">KVA Bootcamp 2026</h1>
              <p className="text-xs text-slate-400">Master Allocation Gateway</p>
            </div>
          </div>
          {role !== 'NONE' && (
            <button
              onClick={() => { setRole('NONE'); setPinInput(''); }}
              className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 font-semibold"
            >
              Lock Terminal
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {role === 'NONE' ? (
          <div className="max-w-md mx-auto my-16 p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="p-3 bg-slate-900 w-fit mx-auto rounded-full border border-slate-700">
                <Lock className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Access Portal Verification</h2>
              <p className="text-sm text-slate-400">Enter access PIN to load role interface</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                placeholder="Enter 4-Digit Access PIN"
                className="w-full text-center text-2xl tracking-widest bg-slate-900 border border-slate-700 rounded-lg py-3 text-white focus:outline-none focus:border-emerald-500"
              />
              {errorMsg && <p className="text-xs text-red-400 text-center">{errorMsg}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold text-white transition"
              >
                Authenticate
              </button>
            </form>

            <div className="border-t border-slate-700/60 pt-4 text-xs text-slate-500 space-y-1">
              <p className="flex items-center space-x-1"><Shield className="w-3.5 h-3.5 text-slate-400 inline" /> <span><b>Staff Access Key (1234):</b> Registration Desk</span></p>
              <p className="flex items-center space-x-1"><Shield className="w-3.5 h-3.5 text-slate-400 inline" /> <span><b>Monitor Access Key (8888):</b> Overview & Exports</span></p>
            </div>
          </div>
        ) : role === 'ROLE_STAFF' ? (
          <RegistrationForm />
        ) : (
          <Dashboard />
        )}
      </main>

      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Kingdom Vanguard Africa (KVA) © 2026. All System Logistics Operations Encrypted.
      </footer>
    </div>
  );
};

export default App;