import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Sparkles, Clock, ArrowRight, ToggleLeft, ToggleRight, X } from 'lucide-react';

export const SmartRemindersBanner: React.FC = () => {
  const {
    smartRemindersEnabled,
    toggleSmartReminders,
    events,
    registeredEvents,
    navigateTo,
    openLiveModal,
  } = useApp();

  if (!smartRemindersEnabled) {
    return (
      <div className="bg-slate-100/90 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between text-xs text-slate-600 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-400" />
          <span>Smart event reminders are currently muted.</span>
        </div>
        <button
          onClick={toggleSmartReminders}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          Enable Reminders
        </button>
      </div>
    );
  }

  // Generate smart timely reminder items based on real events
  const reminders: { id: string; title: string; subtitle: string; urgency: 'high' | 'medium' | 'info'; actionText: string; onClick: () => void }[] = [];

  const liveEvent = events.find((e) => e.status === 'LIVE NOW');
  if (liveEvent) {
    reminders.push({
      id: 'live',
      title: `LIVE NOW: ${liveEvent.title}`,
      subtitle: `Ongoing in ${liveEvent.venue}. Interactive session in progress.`,
      urgency: 'high',
      actionText: 'Join Live Stream',
      onClick: () => openLiveModal(liveEvent),
    });
  }

  // Tomorrow or upcoming event reminder
  const tomorrowEvent = events.find((e) => e.id === 'evt-10'); // Career seminar
  if (tomorrowEvent) {
    reminders.push({
      id: 'tomorrow',
      title: `Tomorrow: ${tomorrowEvent.title}`,
      subtitle: `Starts at ${tomorrowEvent.startTime} · ${tomorrowEvent.venue}`,
      urgency: 'medium',
      actionText: 'View Details',
      onClick: () => navigateTo('event-details', { eventId: tomorrowEvent.id }),
    });
  }

  const upcomingRegistered = registeredEvents.find((e) => e.status === 'UPCOMING');
  if (upcomingRegistered && upcomingRegistered.id !== tomorrowEvent?.id) {
    reminders.push({
      id: 'registered-reminder',
      title: `Starting soon: ${upcomingRegistered.title}`,
      subtitle: `${upcomingRegistered.date} at ${upcomingRegistered.startTime} · Check your checklist`,
      urgency: 'info',
      actionText: 'My Schedule',
      onClick: () => navigateTo('my-schedule'),
    });
  }

  if (reminders.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span className="font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Smart Reminders
        </span>
        <button
          onClick={toggleSmartReminders}
          className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 text-[11px]"
        >
          <span>Mute</span>
          <ToggleRight className="w-4 h-4 text-indigo-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reminders.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
              item.urgency === 'high'
                ? 'bg-red-50/80 border-red-200 text-red-950'
                : item.urgency === 'medium'
                ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                {item.urgency === 'high' && (
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0"></span>
                )}
                <p className="font-bold truncate text-slate-900">{item.title}</p>
              </div>
              <p className="text-[11px] text-slate-600 truncate">{item.subtitle}</p>
            </div>

            <button
              onClick={item.onClick}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1 ${
                item.urgency === 'high'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <span>{item.actionText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
