import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, CheckCircle2, XCircle, Clock, Trash2, Filter } from 'lucide-react';

export const AttendeeManagementPage: React.FC = () => {
  const { registrations, events, markAttendance } = useApp();

  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [attendanceFilter, setAttendanceFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredRegistrations = registrations.filter((reg) => {
    if (selectedEventId !== 'all' && reg.eventId !== selectedEventId) return false;
    if (attendanceFilter !== 'all' && reg.attendance !== attendanceFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = reg.userName.toLowerCase().includes(q);
      const matchEmail = reg.userEmail.toLowerCase().includes(q);
      const matchDept = reg.userDept.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchDept) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Attendee Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track participant check-ins, record live session presence, and verify registered college credentials.
        </p>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search attendee name, email, department..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Events</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>

          <select
            value={attendanceFilter}
            onChange={(e) => setAttendanceFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="PENDING">Pending Check-in</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Attendee</th>
                <th className="py-3 px-4">College & Dept</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Registered At</th>
                <th className="py-3 px-4">Quota Status</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRegistrations.map((reg) => {
                const event = events.find((e) => e.id === reg.eventId);
                return (
                  <tr key={reg.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{reg.userName}</p>
                      <p className="text-[11px] text-slate-500">{reg.userEmail}</p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-800 truncate max-w-[180px]">
                        {reg.userCollege}
                      </p>
                      <p className="text-[11px] text-slate-400">{reg.userDept}</p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-800 truncate max-w-xs">
                        {event?.title || 'Campus Event'}
                      </p>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {reg.registeredAt}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          reg.status === 'CONFIRMED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : reg.status === 'WAITLIST'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          reg.attendance === 'PRESENT'
                            ? 'bg-emerald-100 text-emerald-800'
                            : reg.attendance === 'ABSENT'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {reg.attendance === 'PRESENT' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {reg.attendance === 'ABSENT' && <XCircle className="w-3 h-3 text-red-600" />}
                        {reg.attendance === 'PENDING' && <Clock className="w-3 h-3 text-slate-400" />}
                        {reg.attendance}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => markAttendance(reg.id, 'PRESENT')}
                        className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[11px]"
                        title="Mark Present"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => markAttendance(reg.id, 'ABSENT')}
                        className="px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-[11px]"
                        title="Mark Absent"
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRegistrations.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No attendees matching the selected event or search query.
          </div>
        )}
      </div>
    </div>
  );
};
