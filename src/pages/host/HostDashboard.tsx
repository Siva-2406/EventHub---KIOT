import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Calendar,
  Users,
  Radio,
  BarChart3,
  PlusCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

export const HostDashboard: React.FC = () => {
  const { events, registrations, navigateTo, openLiveModal } = useApp();

  // Host events
  const hostEvents = events.filter(
    (e) => e.organizerEmail === 'host@eventhub.demo' || e.organizer.includes('KIOT')
  );

  const upcomingCount = hostEvents.filter((e) => e.status === 'UPCOMING').length;
  const liveCount = hostEvents.filter((e) => e.status === 'LIVE NOW').length;
  const completedCount = hostEvents.filter((e) => e.status === 'COMPLETED').length;
  const totalRegs = hostEvents.reduce((acc, curr) => acc + curr.registeredCount, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 font-heading">
            <Building2 className="w-3.5 h-3.5" />
            Organizer Console · KIOT
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Host Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Manage your campus workshops, live stage streams, participant check-ins, and analytics.
          </p>
        </div>

        <button
          onClick={() => navigateTo('create-event')}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-indigo-200 flex items-center gap-2 self-start sm:self-auto font-heading"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <p className="text-xs text-slate-500 font-medium">Total Hosted</p>
          <p className="font-heading text-2xl font-black text-slate-900 mt-1 tabular-nums">
            {hostEvents.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Campus initiatives</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <p className="text-xs text-slate-500 font-medium">Upcoming Events</p>
          <p className="font-heading text-2xl font-black text-indigo-600 mt-1 tabular-nums">
            {upcomingCount}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Scheduled on calendar</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <p className="text-xs text-slate-500 font-medium">Live Right Now</p>
          <p className="font-heading text-2xl font-black text-red-600 mt-1 tabular-nums flex items-center gap-1.5">
            {liveCount}
            {liveCount > 0 && <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Active stage session</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Total Registrations</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">
            {totalRegs}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Enrolled attendees</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Attendance Rate</p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            81%
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Above regional benchmark</p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigateTo('create-event')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-left transition-all space-y-1 group"
        >
          <PlusCircle className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-slate-900">Create Event</p>
          <p className="text-[11px] text-slate-500">Draft or publish a session</p>
        </button>

        <button
          onClick={() => navigateTo('manage-events')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-left transition-all space-y-1 group"
        >
          <Calendar className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-slate-900">Manage Events</p>
          <p className="text-[11px] text-slate-500">Edit, reschedule, cancel</p>
        </button>

        <button
          onClick={() => navigateTo('participants')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-left transition-all space-y-1 group"
        >
          <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-slate-900">Attendee Records</p>
          <p className="text-[11px] text-slate-500">Mark check-in attendance</p>
        </button>

        <button
          onClick={() => navigateTo('host-analytics')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-left transition-all space-y-1 group"
        >
          <BarChart3 className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-slate-900">View Analytics</p>
          <p className="text-[11px] text-slate-500">Engagement & seat ratios</p>
        </button>
      </div>

      {/* Hosted Events Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Hosted Events</h2>
            <p className="text-xs text-slate-500">List of events owned by your organizer profile</p>
          </div>
          <button
            onClick={() => navigateTo('manage-events')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Manage All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Event Title</th>
                <th className="py-3 px-4">Date & Timing</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Registered / Capacity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {hostEvents.slice(0, 5).map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900 truncate max-w-xs">{evt.title}</p>
                    <p className="text-[11px] text-slate-400">{evt.category} · {evt.venue}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px]">
                    <p>{evt.date}</p>
                    <p className="text-slate-400">{evt.startTime}</p>
                  </td>
                  <td className="py-3 px-4">
                    {evt.status === 'LIVE NOW' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                        LIVE NOW
                      </span>
                    ) : evt.status === 'PENDING_VERIFICATION' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Pending Verification
                      </span>
                    ) : evt.status === 'COMPLETED' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        Upcoming
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold tabular-nums">
                      {evt.registeredCount} / {evt.capacity}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1">
                      ({Math.round((evt.registeredCount / evt.capacity) * 100)}%)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    {evt.status === 'LIVE NOW' && (
                      <button
                        onClick={() => openLiveModal(evt)}
                        className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold"
                      >
                        Join Live
                      </button>
                    )}
                    <button
                      onClick={() => navigateTo('event-details', { eventId: evt.id })}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold"
                    >
                      View
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
