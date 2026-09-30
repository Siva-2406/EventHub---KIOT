import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Radio,
  PlusCircle,
  Trash2,
  XCircle,
  CheckCircle2,
  ExternalLink,
  Edit3,
} from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

export const ManageEventsPage: React.FC = () => {
  const {
    events,
    currentUser,
    navigateTo,
    cancelEvent,
    deleteEvent,
    updateEvent,
    openLiveModal,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter host events
  const hostEvents = events.filter(
    (e) => e.organizerEmail === 'host@eventhub.demo' || e.organizer.includes('KIOT')
  );

  const filteredEvents = hostEvents.filter((e) => {
    if (statusFilter === 'all') return true;
    return e.status === statusFilter;
  });

  const toggleLiveStatus = (evt: EventItem) => {
    if (evt.status === 'LIVE NOW') {
      updateEvent(evt.id, { status: 'COMPLETED' });
    } else {
      updateEvent(evt.id, { status: 'LIVE NOW' });
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manage Hosted Events
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish draft sessions, simulate live stages, reschedule timings, and oversee registration quotas.
          </p>
        </div>

        <button
          onClick={() => navigateTo('create-event')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Event</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
        {['all', 'UPCOMING', 'LIVE NOW', 'PENDING_VERIFICATION', 'COMPLETED', 'CANCELLED', 'DRAFT'].map(
          (st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'all'
                ? `All (${hostEvents.length})`
                : st === 'PENDING_VERIFICATION'
                ? 'Pending Review'
                : st}
            </button>
          )
        )}
      </div>

      {/* Events Table / Card list */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-3">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {evt.status === 'LIVE NOW' ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                      LIVE NOW
                    </span>
                  ) : evt.status === 'PENDING_VERIFICATION' ? (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Pending Admin Verification
                    </span>
                  ) : evt.status === 'COMPLETED' ? (
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Completed
                    </span>
                  ) : evt.status === 'CANCELLED' ? (
                    <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                      Cancelled
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Published (Upcoming)
                    </span>
                  )}

                  <span className="text-xs text-slate-500 font-medium">
                    {evt.category} · {evt.eventType}
                  </span>

                  <span className="text-xs font-semibold text-slate-700 tabular-nums">
                    {evt.registeredCount} / {evt.capacity} registered
                  </span>
                </div>

                <h3
                  onClick={() => navigateTo('event-details', { eventId: evt.id })}
                  className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  {evt.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    {formatDatePretty(evt.date)}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {evt.startTime} - {evt.endTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {evt.venue}
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 flex-wrap shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                {/* Live toggle */}
                <button
                  onClick={() => toggleLiveStatus(evt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    evt.status === 'LIVE NOW'
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-900'
                      : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                  }`}
                  title="Toggle event live status for testing"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>{evt.status === 'LIVE NOW' ? 'End Broadcast' : 'Set Live Now'}</span>
                </button>

                <button
                  onClick={() => navigateTo('event-details', { eventId: evt.id })}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  View
                </button>

                {evt.status !== 'CANCELLED' && evt.status !== 'COMPLETED' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Mark "${evt.title}" as cancelled?`)) {
                        cancelEvent(evt.id);
                      }
                    }}
                    className="px-2.5 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                  >
                    Cancel Event
                  </button>
                )}

                <button
                  onClick={() => {
                    if (window.confirm(`Permanently delete "${evt.title}"?`)) {
                      deleteEvent(evt.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <p className="text-sm font-semibold text-slate-800">No hosted events found</p>
          <p className="text-xs text-slate-500">
            Create an event or clear your status filters.
          </p>
        </div>
      )}
    </div>
  );
};
