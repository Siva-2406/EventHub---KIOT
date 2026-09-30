import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import {
  Building2,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Radio,
  CheckCircle2,
  ShieldCheck,
  Search,
  PlusCircle,
} from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

export const AdminEventManagementPage: React.FC = () => {
  const {
    events,
    deleteEvent,
    cancelEvent,
    approveEvent,
    verifyExternalEvent,
    updateEvent,
    navigateTo,
    openLiveModal,
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');

  const filteredEvents = events.filter((e) => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (collegeFilter === 'kiot' && e.isExternal) return false;
    if (collegeFilter === 'external' && !e.isExternal) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const mTitle = e.title.toLowerCase().includes(q);
      const mCollege = e.college.toLowerCase().includes(q);
      const mOrg = e.organizer.toLowerCase().includes(q);
      if (!mTitle && !mCollege && !mOrg) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus-Wide Event Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Central repository of all institutional seminars, workshops, and verified inter-college symposiums.
          </p>
        </div>

        <button
          onClick={() => navigateTo('create-event')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Campus Event</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search event title, organizer, college..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="LIVE NOW">Live Now</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="PENDING_VERIFICATION">Pending Verification</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <select
            value={collegeFilter}
            onChange={(e) => setCollegeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Campuses</option>
            <option value="kiot">KIOT Campus Only</option>
            <option value="external">External Colleges</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Event & Category</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Date & Timing</th>
                <th className="py-3 px-4">Seats Fill</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900 max-w-xs truncate">{evt.title}</p>
                    <p className="text-[11px] text-slate-400">
                      {evt.category} · {evt.eventType}
                    </p>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-800 truncate max-w-[180px]">
                      {evt.college}
                    </p>
                    {evt.isExternal && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-700 font-semibold">
                        <ShieldCheck className="w-3 h-3 text-blue-600" /> External Partner
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px]">
                    <p>{evt.date}</p>
                    <p className="text-slate-400">{evt.startTime}</p>
                  </td>

                  <td className="py-3 px-4 font-mono tabular-nums">
                    <span className="font-semibold text-slate-900">{evt.registeredCount}</span>
                    <span className="text-slate-400"> / {evt.capacity}</span>
                  </td>

                  <td className="py-3 px-4">
                    {evt.status === 'LIVE NOW' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                        LIVE NOW
                      </span>
                    ) : evt.status === 'PENDING_VERIFICATION' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    ) : evt.status === 'COMPLETED' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                        Completed
                      </span>
                    ) : evt.status === 'CANCELLED' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-700">
                        Cancelled
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        Upcoming
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    {evt.status === 'PENDING_VERIFICATION' && (
                      <button
                        onClick={() => approveEvent(evt.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px]"
                      >
                        Approve
                      </button>
                    )}

                    {evt.status === 'LIVE NOW' && (
                      <button
                        onClick={() => openLiveModal(evt)}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-[11px]"
                      >
                        Join Live
                      </button>
                    )}

                    <button
                      onClick={() => navigateTo('event-details', { eventId: evt.id })}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-[11px]"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete event "${evt.title}"?`)) {
                          deleteEvent(evt.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
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
