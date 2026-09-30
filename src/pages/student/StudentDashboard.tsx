import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  CalendarCheck,
  Radio,
  Clock,
  MapPin,
  ArrowRight,
  Compass,
  CalendarDays,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Users,
} from 'lucide-react';
import { SmartRemindersBanner } from '../../components/common/SmartRemindersBanner';
import { ConflictAlert } from '../../components/common/ConflictAlert';
import { EventCard } from '../../components/common/EventCard';
import { formatDatePretty } from '../../utils/time';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    events,
    registeredEvents,
    conflicts,
    navigateTo,
    openLiveModal,
  } = useApp();

  const liveEvent = events.find((e) => e.status === 'LIVE NOW');
  const externalEvents = events.filter((e) => e.isExternal && e.status !== 'DRAFT').slice(0, 3);
  const recommendedEvents = events
    .filter((e) => !e.isExternal && e.status === 'UPCOMING' && e.id !== 'evt-01')
    .slice(0, 3);

  return (
    <div className="space-y-8 pb-16">
      {/* Greeting & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            Knowledge Institute of Technology
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Good Morning, {currentUser?.name || 'Student'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            {currentUser?.department} · Roll No. 22CSB049 · Active Semester Schedule
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigateTo('discovery')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-indigo-200 font-heading"
          >
            <Compass className="w-3.5 h-3.5" />
            Explore Events
          </button>
          <button
            onClick={() => navigateTo('my-schedule')}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 active:scale-[0.98] border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 font-heading shadow-xs"
          >
            <CalendarDays className="w-3.5 h-3.5 text-indigo-600" />
            My Schedule
          </button>
        </div>
      </div>

      {/* Schedule Conflict Alert if any overlapping events exist */}
      <ConflictAlert conflicts={conflicts} />

      {/* Smart Timely Reminders Strip */}
      <SmartRemindersBanner />

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigateTo('my-events')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">My Registered</span>
            <CalendarCheck className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="font-heading text-2xl font-black text-slate-900 tabular-nums">
            {registeredEvents.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Active enrollments</p>
        </div>

        <div
          onClick={() => liveEvent && openLiveModal(liveEvent)}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Live Right Now</span>
            <Radio className="w-4 h-4 text-red-600 animate-pulse" />
          </div>
          <p className="text-2xl font-bold text-red-600 tabular-nums">
            {liveEvent ? '1 Active' : '0 Active'}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Seminar Hall 1 (Hybrid)</p>
        </div>

        <div
          onClick={() => navigateTo('my-schedule')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Schedule Status</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 tabular-nums">
            {conflicts.length > 0 ? (
              <span className="text-amber-600 text-lg flex items-center gap-1 font-bold">
                <AlertTriangle className="w-4 h-4" /> Conflict
              </span>
            ) : (
              'Synced'
            )}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {conflicts.length > 0 ? `${conflicts.length} overlapping slot` : 'No conflicts'}
          </p>
        </div>

        <div
          onClick={() => navigateTo('discovery')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>External Colleges</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 tabular-nums">
            {events.filter((e) => e.isExternal).length}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Sona, PSG, Kongu, KPR</p>
        </div>
      </div>

      {/* Featured LIVE NOW Hero card (if active) */}
      {liveEvent && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-600 text-white">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                🔴 LIVE NOW
              </span>
              <span className="text-xs text-slate-300">
                {liveEvent.college} · {liveEvent.venue}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {liveEvent.title}
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl line-clamp-2">
              {liveEvent.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {liveEvent.startTime} - {liveEvent.endTime}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                {liveEvent.registeredCount} / {liveEvent.capacity} Attendees
              </span>
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col gap-2">
            <button
              onClick={() => openLiveModal(liveEvent)}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Join Live Stage
            </button>
            <button
              onClick={() => navigateTo('event-details', { eventId: liveEvent.id })}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors text-center"
            >
              View Full Details
            </button>
          </div>
        </div>
      )}

      {/* Section 1: My Upcoming Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              My Registered Events ({registeredEvents.length})
            </h2>
            <p className="text-xs text-slate-500">Events you have confirmed attendance for</p>
          </div>
          <button
            onClick={() => navigateTo('my-events')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Manage All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {registeredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {registeredEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <CalendarCheck className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No registered events yet</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Browse campus events and reserve your seats with 1-click registration.
            </p>
            <button
              onClick={() => navigateTo('discovery')}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
            >
              Discover Events
            </button>
          </div>
        )}
      </div>

      {/* Section 2: Recommended For You */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Recommended For Your Department ({currentUser?.department?.split(' ')[0] || 'CSBS'})
            </h2>
            <p className="text-xs text-slate-500">Handpicked upcoming technical sessions on KIOT campus</p>
          </div>
          <button
            onClick={() => navigateTo('discovery')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            View More <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>

      {/* Section 3: Events Around You (Other Colleges) */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cross-Campus Exchange
            </span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
              Events Around You (Verified External Events)
            </h2>
            <p className="text-xs text-slate-500">
              Vetted hackathons and symposiums from Sona College, PSG Tech, and Kongu Engineering
            </p>
          </div>
          <button
            onClick={() => navigateTo('discovery')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            All External Events <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {externalEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>
    </div>
  );
};
