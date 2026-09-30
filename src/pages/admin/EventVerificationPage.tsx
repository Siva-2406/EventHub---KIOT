import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Users,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

export const EventVerificationPage: React.FC = () => {
  const {
    events,
    approveEvent,
    rejectEvent,
    verifyExternalEvent,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'external' | 'all'>('pending');
  const [inspectEvent, setInspectEvent] = useState<EventItem | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);

  const pendingEvents = events.filter((e) => e.status === 'PENDING_VERIFICATION');
  const externalEvents = events.filter((e) => e.isExternal);
  const allEvents = events;

  const handleConfirmReject = (eventId: string) => {
    rejectEvent(eventId, rejectReason.trim() || 'General guidelines revision requested.');
    setShowRejectModal(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus Event Verification Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, vet, and officially authorize event proposals submitted by campus organizers and partner universities.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-md text-xs font-semibold">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'pending'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Pending Approvals</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">
            {pendingEvents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('external')}
          className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'external'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>External Colleges</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-800">
            {externalEvents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 rounded-lg transition-colors ${
            activeTab === 'all'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Events ({allEvents.length})
        </button>
      </div>

      {/* Pending Queue List */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingEvents.length > 0 ? (
            pendingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-amber-200 shadow-xs p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                      Pending Audit
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {evt.category} · {evt.eventType}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-medium text-slate-500">
                      Submitted on {evt.createdAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {evt.organizer} ({evt.college})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      {formatDatePretty(evt.date)} ({evt.startTime} - {evt.endTime})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {evt.venue}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      Capacity: {evt.capacity} students
                    </span>
                  </div>
                </div>

                {/* Audit Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    onClick={() => setInspectEvent(evt)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Inspect
                  </button>

                  <button
                    onClick={() => setShowRejectModal(evt.id)}
                    className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Request Changes
                  </button>

                  <button
                    onClick={() => approveEvent(evt.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">All Proposals Verified</h3>
              <p className="text-xs text-slate-500">
                No new events awaiting institutional verification. Newly submitted events from organizers will appear here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* External College Events Tab */}
      {activeTab === 'external' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Inter-College Exchange & Accreditation</p>
              <p className="text-blue-900/90 mt-0.5">
                Events from partner institutions (Sona College, PSG Tech, Kongu, KPR) are vetted by the admin council before being labeled with the "✓ Verified External Event" trust badge.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Verified External
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{evt.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{evt.description}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{evt.college}</span>
                  <button
                    onClick={() => navigateTo('event-details', { eventId: evt.id })}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Events Tab */}
      {activeTab === 'all' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">College</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {allEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 max-w-xs truncate">
                      {evt.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{evt.college}</td>
                    <td className="py-3 px-4 font-mono text-[11px]">{evt.date}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {evt.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {evt.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigateTo('event-details', { eventId: evt.id })}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700 text-[11px]"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inspect Event Modal */}
      {inspectEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{inspectEvent.title}</h3>
              <button
                onClick={() => setInspectEvent(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p>
                <strong>Organizer:</strong> {inspectEvent.organizer} ({inspectEvent.organizerEmail})
              </p>
              <p>
                <strong>College:</strong> {inspectEvent.college}
              </p>
              <p>
                <strong>Description:</strong> {inspectEvent.description}
              </p>
              <p>
                <strong>Schedule:</strong> {inspectEvent.date} from {inspectEvent.startTime} to {inspectEvent.endTime}
              </p>
              <p>
                <strong>Venue:</strong> {inspectEvent.venue}
              </p>
              <p>
                <strong>Capacity:</strong> {inspectEvent.capacity} seats
              </p>
              <p>
                <strong>Eligibility:</strong> {inspectEvent.eligibility}
              </p>
              <div>
                <strong>Rules & Guidelines:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  {inspectEvent.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setInspectEvent(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  approveEvent(inspectEvent.id);
                  setInspectEvent(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Approve Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject / Request Changes Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Request Changes / Rejection Note</h3>
            <p className="text-xs text-slate-500">
              Provide feedback to the host on what needs revision before approval.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Please clarify speaker credentials and software requirements..."
              className="w-full p-3 text-xs border border-slate-300 rounded-xl outline-hidden focus:border-indigo-600"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowRejectModal(null)}
                className="px-3 py-1.5 text-xs text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmReject(showRejectModal)}
                className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
