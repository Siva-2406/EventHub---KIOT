import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Lock,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Info,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('student@eventhub.demo');
  const [password, setPassword] = useState('Student@123');
  const [showCredentials, setShowCredentials] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      login('ADMIN', email);
    } else if (email.includes('host')) {
      login('HOST', email);
    } else {
      login('STUDENT', email);
    }
  };

  const setDemoAccount = (role: 'STUDENT' | 'HOST' | 'ADMIN') => {
    if (role === 'STUDENT') {
      setEmail('student@eventhub.demo');
      setPassword('Student@123');
      login('STUDENT');
    } else if (role === 'HOST') {
      setEmail('host@eventhub.demo');
      setPassword('Host@123');
      login('HOST');
    } else if (role === 'ADMIN') {
      setEmail('admin@eventhub.demo');
      setPassword('Admin@123');
      login('ADMIN');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-700 mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
            E
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to EventHub
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            "Every College Event. One Place."
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-900">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>Instant Demo Logins (1-Click)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDemoAccount('STUDENT')}
              className="px-3 py-2.5 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 text-slate-800 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 shadow-xs group"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600 group-hover:text-white" />
              <span>Student Demo</span>
            </button>

            <button
              type="button"
              onClick={() => setDemoAccount('HOST')}
              className="px-3 py-2.5 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-200 text-slate-800 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 shadow-xs group"
            >
              <Building2 className="w-4 h-4 text-emerald-600 group-hover:text-white" />
              <span>Host Demo</span>
            </button>

            <button
              type="button"
              onClick={() => setDemoAccount('ADMIN')}
              className="px-3 py-2.5 bg-white hover:bg-purple-600 hover:text-white border border-purple-200 text-slate-800 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 shadow-xs group"
            >
              <ShieldCheck className="w-4 h-4 text-purple-600 group-hover:text-white" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                College Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all text-slate-900"
                  placeholder="student@eventhub.demo"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Collapsible Demo Accounts reference */}
          <div className="border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setShowCredentials((prev) => !prev)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <span>Demo Credentials Reference</span>
              {showCredentials ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showCredentials && (
              <div className="mt-3 space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 font-mono text-[11px]">
                <div>
                  <p className="font-bold text-slate-900 font-sans text-xs">Student Role:</p>
                  <p className="text-slate-500">Email: student@eventhub.demo</p>
                  <p className="text-slate-500">Password: Student@123</p>
                </div>
                <div className="pt-1.5 border-t border-slate-200/60">
                  <p className="font-bold text-slate-900 font-sans text-xs">Host / Organizer Role:</p>
                  <p className="text-slate-500">Email: host@eventhub.demo</p>
                  <p className="text-slate-500">Password: Host@123</p>
                </div>
                <div className="pt-1.5 border-t border-slate-200/60">
                  <p className="font-bold text-slate-900 font-sans text-xs">System Admin Role:</p>
                  <p className="text-slate-500">Email: admin@eventhub.demo</p>
                  <p className="text-slate-500">Password: Admin@123</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
