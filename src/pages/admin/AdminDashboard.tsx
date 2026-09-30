import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  FileCheck2,
  Users,
  Building,
  Radio,
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

export const AdminDashboard: React.FC = () => {
  const {
    events,
    users,
    registrations,
    approveEvent,
    rejectEvent,
    navigateTo,
    openLiveModal,
  } = useApp();

  const pendingEvents = events.filter((e) => e.status === 'PENDING_VERIFICATION');
  const liveEvents = events.filter((e) => e.status === 'LIVE NOW');
  const hosts = users.filter((u) => u.role === 'HOST');
  const students = users.filter((u) => u.role === 'STUDENT');

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1.5 font-heading">
            <ShieldCheck className="w-3.5 h-3.5" />
            Central Institutional Governance
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Campus-wide event verification, user authorization, cross-college partnerships, and compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('admin-verification')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-indigo-200 flex items-center gap-1.5 font-heading"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Review Pending ({pendingEvents.length})</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <p className="text-xs text-slate-500 font-medium">Total Users</p>
          <p className="font-heading text-2xl font-black text-slate-900 mt-1 tabular-nums">{users.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{students.length} students enrolled</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <p className="text-xs text-slate-500 font-medium">Club Hosts</p>
          <p className="font-heading text-2xl font-black text-slate-900 mt-1 tabular-nums">{hosts.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Authorized organizers</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <p className="text-xs text-slate-500 font-medium">Total Events</p>
          <p className="font-heading text-2xl font-black text-indigo-600 mt-1 tabular-nums">{events.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all campuses</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-amber-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <p className="text-xs text-slate-500 font-medium">Pending Approvals</p>
          <p className="font-heading text-2xl font-black text-amber-600 mt-1 tabular-nums">
            {pendingEvents.length}
          </p>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">Requires audit</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Live Broadcasts</p>
          <p className="text-2xl font-bold text-red-600 mt-1 tabular-nums">
            {liveEvents.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Stream stage active</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Total Signups</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">
            {registrations.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Verified admissions</p>
        </div>
      </div>

      {/* Pending Event Approvals Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Pending Verification Queue
              </h2>
              {pendingEvents.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {pendingEvents.length} Pending
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Organizers submit event proposals here. Once approved, events become visible on discovery feeds.
            </p>
          </div>

          <button
            onClick={() => navigateTo('admin-verification')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Full Review Panel <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingEvents.length > 0 ? (
          <div className="space-y-3">
            {pendingEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{evt.title}</span>
                    <span className="px-2 py-0.2 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                      {evt.category}
                    </span>
                  </div>
                  <p className="text-slate-600">
                    Host: <span className="font-semibold text-slate-800">{evt.organizer}</span> · {evt.college}
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">
                    Date: {evt.date} ({evt.startTime} - {evt.endTime}) · Venue: {evt.venue}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => approveEvent(evt.id)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Verify
                  </button>
                  <button
                    onClick={() => rejectEvent(evt.id, 'Please clarify laptop requirements and schedule.')}
                    className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-slate-200 rounded-lg font-semibold transition-colors"
                  >
                    Request Changes
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-500">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
            <p className="font-semibold text-slate-800">Verification Queue is Clear</p>
            <p className="text-slate-400">All submitted events have been reviewed and verified.</p>
          </div>
        )}
      </div>

      {/* Quick Admin Actions & System Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Administrative Controls</h2>
          <div className="space-y-2">
            <button
              onClick={() => navigateTo('admin-verification')}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                <span>Event Verification Center</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('admin-users')}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>User Directory & Statuses</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('admin-events')}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Building className="w-4 h-4 text-purple-600" />
                <span>Campus-Wide Event Roster</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('admin-analytics')}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Institutional Analytics</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* System Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Platform Audits</h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">
                  Verified External Event Approved: ByteCraft 2026
                </p>
                <p className="text-[11px] text-slate-500">Sona College of Technology · Salem District Hackathon</p>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">10 mins ago</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">
                  New Event Proposal: Cyber Security CTF 2026
                </p>
                <p className="text-[11px] text-slate-500">Submitted by KIOT Computing Club · Awaiting verification</p>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">35 mins ago</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">
                  Live Stage Initialized: MongoDB Tech Odyssey
                </p>
                <p className="text-[11px] text-slate-500">Seminar Hall 1 · Dr. A. Arunkumar streaming live</p>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
