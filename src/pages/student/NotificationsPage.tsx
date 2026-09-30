import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCheck,
  Trash2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Info,
  Radio,
  ArrowRight,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    navigateTo,
    events,
    openLiveModal,
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  if (!currentUser) return null;

  const userNotifs = notifications.filter((n) => n.userId === currentUser.id);

  const filteredNotifs = userNotifs.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = userNotifs.filter((n) => !n.read).length;

  const handleNotificationClick = (item: (typeof notifications)[0]) => {
    markNotificationRead(item.id);
    if (item.eventId) {
      const evt = events.find((e) => e.id === item.eventId);
      if (evt && evt.status === 'LIVE NOW') {
        openLiveModal(evt);
      } else if (evt) {
        navigateTo('event-details', { eventId: item.eventId });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Notifications & Smart Reminders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time schedule alerts, start-time reminders, and registration updates.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Mark All Read</span>
            </button>
          )}

          {userNotifs.length > 0 && (
            <button
              onClick={clearNotifications}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-xs text-xs font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All ({userNotifs.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            filter === 'unread' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            filter === 'read' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Read ({userNotifs.length - unreadCount})
        </button>
      </div>

      {/* Notification List */}
      {filteredNotifs.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                !item.read
                  ? 'bg-white border-indigo-200 shadow-xs hover:border-indigo-400'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-white'
              }`}
            >
              {/* Type icon */}
              <div
                className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  item.type === 'REMINDER'
                    ? 'bg-amber-100 text-amber-700'
                    : item.type === 'SUCCESS'
                    ? 'bg-emerald-100 text-emerald-700'
                    : item.type === 'WARNING'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {item.type === 'REMINDER' && <Bell className="w-4 h-4" />}
                {item.type === 'SUCCESS' && <CheckCircle2 className="w-4 h-4" />}
                {item.type === 'WARNING' && <AlertTriangle className="w-4 h-4" />}
                {item.type === 'INFO' && <Info className="w-4 h-4" />}
              </div>

              {/* Message content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm tracking-tight ${
                        !item.read ? 'font-bold text-slate-900' : 'font-medium text-slate-700'
                      }`}
                    >
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap tabular-nums">
                    {item.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>

                {item.eventId && (
                  <div className="pt-1.5 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800">
                    <span>View Event Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Notifications</h3>
          <p className="text-xs text-slate-500">
            You're all caught up! New reminders and schedule alerts will appear here.
          </p>
        </div>
      )}
    </div>
  );
};
