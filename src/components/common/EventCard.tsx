import React from 'react';
import { EventItem } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Radio,
  ArrowRight,
  ShieldCheck,
  Building2,
  Globe2,
} from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

interface EventCardProps {
  event: EventItem;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, featured }) => {
  const { navigateTo, openLiveModal, openRegisterModal, isRegisteredForEvent } = useApp();
  const registered = isRegisteredForEvent(event.id);
  const isFull = event.registeredCount >= event.capacity;
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden group ${
        featured ? 'ring-2 ring-indigo-500/20' : ''
      }`}
    >
      {/* Top Banner & Metadata */}
      <div>
        {/* Banner strip */}
        <div className={`h-3 bg-gradient-to-r ${event.bannerColor || 'from-indigo-600 to-blue-700'} group-hover:h-3.5 transition-all duration-300`} />

        <div className="p-5 pb-3">
          {/* Status & College kicker */}
          <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
            {/* Status indicator */}
            {event.status === 'LIVE NOW' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-red-100 text-red-700 border border-red-200 shadow-xs font-heading">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                LIVE NOW
              </span>
            ) : event.status === 'COMPLETED' ? (
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md font-heading">
                Completed
              </span>
            ) : event.status === 'CANCELLED' ? (
              <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md font-heading">
                Cancelled
              </span>
            ) : event.status === 'PENDING_VERIFICATION' ? (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 font-heading">
                Pending Verification
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 font-heading">
                Upcoming
              </span>
            )}

            {/* Category text */}
            <span className="text-[11px] font-semibold text-slate-500 tracking-tight">
              {event.category} · {event.eventType}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => navigateTo('event-details', { eventId: event.id })}
            className="font-heading text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer leading-snug tracking-tight mb-2"
          >
            {event.title}
          </h3>

          {/* College & Verification Badge */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate font-semibold text-slate-700">{event.college}</span>
            {event.isExternal && (
              <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded font-heading">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                Verified External
              </span>
            )}
            {!event.isExternal && event.isVerified && (
              <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-heading">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                KIOT Event
              </span>
            )}
          </div>

          {/* Event description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Logistics: Date, Time, Venue */}
          <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-800 font-medium">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                {formatDatePretty(event.date)}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] tabular-nums">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {event.startTime} - {event.endTime}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate font-medium">{event.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Seats & Action Buttons */}
      <div className="p-5 pt-3 bg-slate-50/70 border-t border-slate-100 space-y-3">
        {/* Capacity Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500 flex items-center gap-1 font-medium">
              <Users className="w-3 h-3" />
              Seats
            </span>
            <span className="font-semibold text-slate-800 tabular-nums font-mono text-[11px]">
              {event.registeredCount} / {event.capacity} filled
              {isFull && <span className="text-amber-600 font-sans ml-1 font-bold">(Waitlist)</span>}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isFull ? 'bg-amber-500' : percentFilled > 80 ? 'bg-indigo-600' : 'bg-emerald-500'
              }`}
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => navigateTo('event-details', { eventId: event.id })}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-950 border border-slate-200 rounded-xl transition-all duration-200 text-center active:scale-[0.98]"
          >
            View Details
          </button>

          {event.status === 'LIVE NOW' ? (
            <button
              onClick={() => openLiveModal(event)}
              className="py-2 px-3 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-sm shadow-red-200 active:scale-[0.98] font-heading"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Join Live
            </button>
          ) : registered ? (
            <button
              disabled
              className="py-2 px-3 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-1 cursor-default"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Registered
            </button>
          ) : event.status === 'COMPLETED' ? (
            <button
              onClick={() => navigateTo('feedback')}
              className="py-2 px-3 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-[0.98]"
            >
              Feedback
            </button>
          ) : (
            <button
              onClick={() => openRegisterModal(event)}
              className={`py-2 px-3.5 text-xs font-bold text-white rounded-xl transition-all duration-200 flex items-center gap-1 shadow-sm active:scale-[0.98] font-heading ${
                isFull
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
              }`}
            >
              <span>{isFull ? 'Waitlist' : 'Register'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
