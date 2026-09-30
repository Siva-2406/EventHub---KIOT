import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, ShieldCheck, GraduationCap, Building2, CheckCircle2, XCircle } from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const { users, toggleUserStatus } = useApp();

  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      const matchDept = u.department?.toLowerCase().includes(q) || false;
      const matchCollege = u.college.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchDept && !matchCollege) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus User Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Authorized students, club coordinators, faculty advisors, and central administrators across KIOT.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, department, college..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({users.length})
          </button>
          <button
            onClick={() => setRoleFilter('STUDENT')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleFilter === 'STUDENT' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setRoleFilter('HOST')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleFilter === 'HOST' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Hosts
          </button>
          <button
            onClick={() => setRoleFilter('ADMIN')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleFilter === 'ADMIN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Admins
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Institution & Dept</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{u.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'STUDENT'
                          ? 'bg-blue-50 text-blue-700'
                          : u.role === 'HOST'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {u.role === 'STUDENT' && <GraduationCap className="w-3 h-3" />}
                      {u.role === 'HOST' && <Building2 className="w-3 h-3" />}
                      {u.role === 'ADMIN' && <ShieldCheck className="w-3 h-3" />}
                      {u.role}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-800 truncate max-w-[200px]">
                      {u.college}
                    </p>
                    <p className="text-[11px] text-slate-400">{u.department || 'General'}</p>
                  </td>

                  <td className="py-3 px-4 text-slate-500 tabular-nums">
                    {u.joinedDate}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                        u.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {u.status === 'ACTIVE' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {u.status === 'INACTIVE' && <XCircle className="w-3 h-3 text-slate-500" />}
                      {u.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        u.status === 'ACTIVE'
                          ? 'bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
