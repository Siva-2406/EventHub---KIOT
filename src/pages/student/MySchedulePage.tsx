import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Clock,
  MapPin,
  AlertTriangle,
  Radio,
  Bell,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { formatDatePretty, parseTimeToMinutes, areEventsOverlapping } from '../../utils/time';

export const MySchedulePage: React.FC = () => {
  const {
    registeredEvents,
    conflicts,
    navigateTo,
    openLiveModal,
    smartRemindersEnabled,
    toggleSmartReminders,
  } = useApp();

  const [filterDate, setFilterDate] = useState<string>('all');

  // Sort registered events chronologically by date and start time
  const sortedEvents = [...registeredEvents].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime);
  });

  // Unique dates for date pill filter
  const dates = Array.from(new Set(sortedEvents.map((e) => e.date)));

  const displayedEvents =
    filterDate === 'all'
      ? sortedEvents
      : sortedEvents.filter((e) => e.date === filterDate);

  // Helper to check if an event is in conflict
  const isEventConflicted = (eventId: string) => {
    return conflicts.some((c) => c.event1.id === eventId || c.event2.id === eventId);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 font-heading">
            <Sparkles className="w-3.5 h-3.5" /> Personal Schedule
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            My Campus Timeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Integrated chronological itinerary synchronized across all your confirmed event registrations.
          </p>
        </div>

        <button
          onClick={toggleSmartReminders}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-xs font-semibold text-slate-700 transition-all flex items-center gap-2 self-start sm:self-auto font-heading shadow-xs"
        >
          <Bell className="w-3.5 h-3.5 text-indigo-600" />
          <span>Reminders: {smartRemindersEnabled ? 'Enabled' : 'Muted'}</span>
        </button>
      </div>

      {/* Prominent Conflict Warning Banner */}
      {conflicts.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-heading text-base font-extrabold text-amber-950">
                  Schedule Conflict Detected ({conflicts.length} Overlapping Schedule{conflicts.length > 1 ? 's' : ''})
                </h3>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-heading">
                  Action Recommended
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-sans">
                You have confirmed registrations for events whose running hours overlap on the same date.
                Review the highlighted time blocks below.
              </p>

              <div className="space-y-2 pt-1">
                {conflicts.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/90 border border-amber-300 rounded-xl text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{c.event1.title}</span>
                      <span className="font-mono text-amber-700">
                        {c.event1.startTime} - {c.event1.endTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-red-600">
                      <span>{c.event2.title}</span>
                      <span className="font-mono text-red-700">
                        {c.event2.startTime} - {c.event2.endTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
                      <span>Date: {c.event1.date}</span>
                      <span className="text-amber-700 font-semibold">Overlapping Time Window</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Filter Tabs */}
      {dates.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterDate('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterDate === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Dates ({sortedEvents.length})
          </button>
          {dates.map((d) => (
            <button
              key={d}
              onClick={() => setFilterDate(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterDate === d
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {formatDatePretty(d)}
            </button>
          ))}
        </div>
      )}

      {/* Chronological Timeline */}
      {displayedEvents.length > 0 ? (
        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {displayedEvents.map((evt) => {
            const hasConflict = isEventConflicted(evt.id);

            return (
              <div key={evt.id} className="relative group">
                {/* Timeline Dot Indicator */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-4 w-4 h-4 rounded-full border-2 border-white shadow-xs transition-transform group-hover:scale-125 ${
                    evt.status === 'LIVE NOW'
                      ? 'bg-red-600 ring-4 ring-red-100'
                      : hasConflict
                      ? 'bg-amber-500 ring-4 ring-amber-100'
                      : 'bg-indigo-600 ring-4 ring-indigo-50'
                  }`}
                />

                {/* Event Schedule Card */}
                <div
                  className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
                    hasConflict
                      ? 'border-amber-400 ring-2 ring-amber-200/60 bg-amber-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      {/* Badge bar */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {evt.status === 'LIVE NOW' ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                            LIVE NOW
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {formatDatePretty(evt.date)}
                          </span>
                        )}

                        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {evt.startTime} - {evt.endTime}
                        </span>

                        {hasConflict && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            Overlapping Time
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => navigateTo('event-details', { eventId: evt.id })}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        {evt.title}
                      </h3>

                      <p className="text-xs text-slate-500">{evt.description}</p>

                      <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {evt.venue}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span>Format: {evt.eventType}</span>
                        <span className="text-slate-400">·</span>
                        <span>{evt.college}</span>
                      </div>
                    </div>

                    <div className="flex items-center sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0">
                      {evt.status === 'LIVE NOW' && (
                        <button
                          onClick={() => openLiveModal(evt)}
                          className="px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          Join Live
                        </button>
                      )}

                      <button
                        onClick={() => navigateTo('event-details', { eventId: evt.id })}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Your Schedule is Empty</h3>
          <p className="text-xs text-slate-500">
            Register for campus workshops or hackathons to populate your personal timeline with automated conflict detection.
          </p>
          <button
            onClick={() => navigateTo('discovery')}
            className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-1"
          >
            Explore Events
          </button>
        </div>
      )}
    </div>
  );
};
