import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Radio,
  ArrowLeft,
  Share2,
  Mail,
  Phone,
  User as UserIcon,
  AlertTriangle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { formatDatePretty, areEventsOverlapping } from '../utils/time';

export const EventDetailsPage: React.FC = () => {
  const {
    selectedEventId,
    events,
    navigateTo,
    openRegisterModal,
    openLiveModal,
    isRegisteredForEvent,
    cancelRegistration,
    registeredEvents,
    showToast,
  } = useApp();

  const event = events.find((e) => e.id === selectedEventId) || events[0];

  if (!event) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Event Not Found</h2>
        <button
          onClick={() => navigateTo('discovery')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  const isRegistered = isRegisteredForEvent(event.id);
  const isFull = event.registeredCount >= event.capacity;
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  // Check if this event conflicts with any ALREADY registered events
  const conflictingWith = !isRegistered
    ? registeredEvents.find((e) =>
        areEventsOverlapping(
          e.date,
          e.startTime,
          e.endTime,
          event.date,
          event.startTime,
          event.endTime
        )
      )
    : undefined;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Event link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('discovery')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 py-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Discover Events
        </button>
      </div>

      {/* Hero Banner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Color accent header */}
        <div className={`h-24 sm:h-32 bg-gradient-to-r ${event.bannerColor || 'from-indigo-600 to-blue-700'} relative p-6 flex flex-col justify-end text-white`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold bg-black/20 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
              {event.category} · {event.eventType}
            </span>
            <button
              onClick={handleShare}
              className="p-1.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-lg text-white transition-colors"
              title="Share event"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2 flex-1">
              {/* Status and College */}
              <div className="flex items-center gap-2 flex-wrap">
                {event.status === 'LIVE NOW' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold text-xs bg-red-100 text-red-700 border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    LIVE NOW
                  </span>
                ) : event.status === 'COMPLETED' ? (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    Completed
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Upcoming
                  </span>
                )}

                {event.isExternal ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Verified External College Event
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Campus Event
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {event.title}
              </h1>

              <p className="text-sm font-semibold text-slate-700">{event.college}</p>
              <p className="text-xs text-slate-500">
                Organized by: <span className="font-medium text-slate-700">{event.organizer}</span>
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="lg:w-80 shrink-0 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4">
              {/* Seats Counter */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-1">
                  <span className="text-slate-500">Seats Capacity</span>
                  <span className="text-slate-900 font-bold tabular-nums">
                    {event.registeredCount} / {event.capacity} seats filled
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isFull ? 'bg-amber-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${percentFilled}%` }}
                  />
                </div>
                {isFull && (
                  <p className="text-[11px] text-amber-700 mt-1 font-medium">
                    Confirmed seats are currently full. Join the waitlist below.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {event.status === 'LIVE NOW' && (
                  <button
                    onClick={() => openLiveModal(event)}
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Radio className="w-4 h-4 animate-pulse" />
                    Join Live Auditorium
                  </button>
                )}

                {isRegistered ? (
                  <div className="space-y-2">
                    <div className="w-full py-2 px-3 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Registered & Scheduled ✓
                    </div>
                    <button
                      onClick={() => cancelRegistration(event.id)}
                      className="w-full py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors"
                    >
                      Cancel My Registration
                    </button>
                  </div>
                ) : event.status === 'COMPLETED' ? (
                  <button
                    onClick={() => navigateTo('feedback')}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-xl transition-colors"
                  >
                    Leave Event Feedback
                  </button>
                ) : (
                  <button
                    onClick={() => openRegisterModal(event)}
                    className={`w-full py-2.5 px-4 text-xs font-bold text-white rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      isFull
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    <span>{isFull ? 'Join Priority Waitlist' : 'Register Now'}</span>
                  </button>
                )}

                <button
                  onClick={() => navigateTo('my-schedule')}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  View My Schedule
                </button>
              </div>

              {/* Conflict warning preview if not yet registered */}
              {conflictingWith && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1 text-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Schedule Overlap Notice
                  </p>
                  <p className="text-[11px] text-amber-800/90 leading-relaxed">
                    Note: Registering for this event will clash with "{conflictingWith.title}" (
                    {conflictingWith.startTime} - {conflictingWith.endTime}) on {conflictingWith.date}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-500 font-medium">Date & Timing</p>
                <p className="font-bold text-slate-900">{formatDatePretty(event.date)}</p>
                <p className="text-slate-600 font-mono text-[11px]">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-500 font-medium">Venue & Location</p>
                <p className="font-bold text-slate-900">{event.venue}</p>
                <p className="text-slate-600">{event.eventType} Attendance</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-500 font-medium">Registration Deadline</p>
                <p className="font-bold text-slate-900">{formatDatePretty(event.registrationDeadline)}</p>
                <p className="text-slate-600">Free Campus Admission</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Content Tabs/Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Description, Agenda, Rules */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Event */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900">About this Event</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
          </div>

          {/* Schedule */}
          {event.schedule && event.schedule.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Event Schedule</h3>
              <div className="space-y-3">
                {event.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
                  >
                    <span className="font-mono font-semibold text-indigo-600 shrink-0 mt-0.5">
                      {item.time}
                    </span>
                    <span className="font-medium text-slate-800">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules & Guidelines */}
          {event.rules && event.rules.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900">Rules & Guidelines</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900">Eligibility & Requirements</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{event.eligibility}</p>
          </div>
        </div>

        {/* Right 1 Col: Speakers, Contact, Organizers */}
        <div className="space-y-6">
          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Featured Speakers</h3>
              <div className="space-y-3">
                {event.speakers.map((spk, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl space-y-1">
                    <p className="text-xs font-bold text-slate-900">{spk.name}</p>
                    <p className="text-xs font-medium text-indigo-600">{spk.role}</p>
                    <p className="text-[11px] text-slate-500">{spk.org}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900">Contact Organizer</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">{event.contact.name}</p>
              <div className="flex items-center gap-2 text-slate-500">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{event.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{event.contact.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
