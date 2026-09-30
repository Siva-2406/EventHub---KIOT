import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, MapPin, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

export const RegistrationModal: React.FC = () => {
  const { registerModalEvent, closeRegisterModal, registerForEvent, currentUser } = useApp();
  const [name, setName] = useState(currentUser?.name || '');
  const [college, setCollege] = useState(currentUser?.college || 'Knowledge Institute of Technology (KIOT)');
  const [dept, setDept] = useState(currentUser?.department || 'Computer Science & Business Systems');
  const [submitting, setSubmitting] = useState(false);

  if (!registerModalEvent) return null;

  const event = registerModalEvent;
  const isFull = event.registeredCount >= event.capacity;
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      registerForEvent(event.id, { name, college, dept });
      setSubmitting(false);
      closeRegisterModal();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {isFull ? 'Waitlist Registration' : 'Confirm Registration'}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5 line-clamp-1">{event.title}</h3>
          </div>
          <button
            onClick={closeRegisterModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Event Quick Snapshot */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between text-slate-900 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                {formatDatePretty(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>

            {/* Capacity meter */}
            <div className="pt-2 border-t border-slate-200/60">
              <div className="flex justify-between items-center mb-1">
                <span className="flex items-center gap-1 text-slate-600">
                  <Users className="w-3.5 h-3.5" />
                  Capacity Status
                </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {event.registeredCount} / {event.capacity} seats filled
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isFull ? 'bg-amber-500' : percentFilled > 80 ? 'bg-indigo-600' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${percentFilled}%` }}
                />
              </div>
              {isFull && (
                <p className="mt-1.5 text-amber-700 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  All confirmed seats are filled. You will be placed on the priority waitlist.
                </p>
              )}
            </div>
          </div>

          {/* User Fields */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-colors"
                placeholder="Student Name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={currentUser?.email || ''}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College</label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeRegisterModal}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-all shadow-sm flex items-center gap-2 ${
                isFull
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {submitting
                ? 'Processing...'
                : isFull
                ? 'Confirm Waitlist'
                : 'Confirm Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
