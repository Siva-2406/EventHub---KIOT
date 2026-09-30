import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Calendar,
  Clock,
  MapPin,
  Radio,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

export const MyEventsPage: React.FC = () => {
  const {
    currentUser,
    events,
    registrations,
    cancelRegistration,
    navigateTo,
    openLiveModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'completed' | 'cancelled'>('upcoming');

  if (!currentUser) return null;

  // Filter registrations for this student
  const myRegs = registrations.filter((r) => r.userId === currentUser.id);

  // Match with event items
  const registeredItems = myRegs
    .map((reg) => {
      const evt = events.find((e) => e.id === reg.eventId);
      return evt ? { reg, event: evt } : null;
    })
    .filter(Boolean) as { reg: (typeof registrations)[0]; event: (typeof events)[0] }[];

  const upcomingList = registeredItems.filter(
    (item) => item.reg.status !== 'CANCELLED' && item.event.status === 'UPCOMING'
  );

  const liveList = registeredItems.filter(
    (item) => item.reg.status !== 'CANCELLED' && item.event.status === 'LIVE NOW'
  );

  const completedList = registeredItems.filter(
    (item) => item.reg.status !== 'CANCELLED' && item.event.status === 'COMPLETED'
  );

  const cancelledList = registeredItems.filter(
    (item) => item.reg.status === 'CANCELLED' || item.event.status === 'CANCELLED'
  );

  const currentDisplayList =
    activeTab === 'upcoming'
      ? upcomingList
      : activeTab === 'live'
      ? liveList
      : activeTab === 'completed'
      ? completedList
      : cancelledList;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Registered Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, manage attendance, and join live streams for your campus registrations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-xl">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'upcoming'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Upcoming</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-700">
            {upcomingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('live')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'live'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span>Live Now</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-100 text-red-700">
            {liveList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'completed'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Completed</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-700">
            {completedList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'cancelled'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Cancelled</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-700">
            {cancelledList.length}
          </span>
        </button>
      </div>

      {/* List Container */}
      {currentDisplayList.length > 0 ? (
        <div className="space-y-4">
          {currentDisplayList.map(({ reg, event }) => (
            <div
              key={reg.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {event.status === 'LIVE NOW' ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                      LIVE NOW
                    </span>
                  ) : event.status === 'COMPLETED' ? (
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Completed
                    </span>
                  ) : event.status === 'CANCELLED' || reg.status === 'CANCELLED' ? (
                    <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                      Cancelled
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Confirmed Enrollment
                    </span>
                  )}

                  <span className="text-xs text-slate-500">
                    {event.category} · {event.eventType}
                  </span>

                  {reg.attendance === 'PRESENT' && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Attendance Marked
                    </span>
                  )}
                </div>

                <h3
                  onClick={() => navigateTo('event-details', { eventId: event.id })}
                  className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  {event.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  {event.college} · {event.organizer}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    {formatDatePretty(event.date)}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {event.startTime} - {event.endTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {event.venue}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => navigateTo('event-details', { eventId: event.id })}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  View Details
                </button>

                {event.status === 'LIVE NOW' && (
                  <button
                    onClick={() => openLiveModal(event)}
                    className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    Join Live
                  </button>
                )}

                {event.status === 'COMPLETED' && (
                  <button
                    onClick={() => navigateTo('feedback')}
                    className="px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    Rate Session
                  </button>
                )}

                {reg.status !== 'CANCELLED' && event.status === 'UPCOMING' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to cancel your registration for "${event.title}"?`)) {
                        cancelRegistration(event.id);
                      }
                    }}
                    className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-red-600 transition-colors"
                  >
                    Cancel Registration
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No events in "{activeTab.toUpperCase()}"
          </h3>
          <p className="text-xs text-slate-500">
            You don't have any registered events matching this tab category right now.
          </p>
          <button
            onClick={() => navigateTo('discovery')}
            className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-1"
          >
            <span>Explore Events Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
