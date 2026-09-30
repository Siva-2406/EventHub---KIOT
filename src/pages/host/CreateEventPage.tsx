import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventCategory, EventType } from '../../types';
import { PlusCircle, Sparkles, ArrowLeft, Check, Calendar, Clock, MapPin, Users } from 'lucide-react';

const CATEGORIES: EventCategory[] = [
  'Technology',
  'Hackathon',
  'Workshop',
  'Seminar',
  'Symposium',
  'Web Expo',
  'Cultural',
  'Sports',
  'Career',
  'Entrepreneurship',
  'Club Events',
  'Department Events',
  'Other',
];

export const CreateEventPage: React.FC = () => {
  const { createEvent, currentUser, navigateTo } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<EventCategory>('Technology');
  const [college, setCollege] = useState(currentUser?.college || 'Knowledge Institute of Technology (KIOT)');
  const [organizer, setOrganizer] = useState(currentUser?.name || 'Department of Computing');
  const [eventType, setEventType] = useState<EventType>('Offline');
  const [date, setDate] = useState('2026-10-15');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('01:00 PM');
  const [venue, setVenue] = useState('Innovation Lab, KIOT Central Campus');
  const [capacity, setCapacity] = useState(100);
  const [registrationDeadline, setRegistrationDeadline] = useState('2026-10-14');
  const [liveMeetingUrl, setLiveMeetingUrl] = useState('');
  const [eligibility, setEligibility] = useState('Open to all engineering students.');
  const [rules, setRules] = useState('Valid ID card required.\nBring laptop for hands-on sessions.');
  const [speakerName, setSpeakerName] = useState('Guest Speaker');
  const [speakerRole, setSpeakerRole] = useState('Industry Expert');
  const [speakerOrg, setSpeakerOrg] = useState('Leading Tech Enterprise');

  const handleSave = (publishDirectly: boolean) => {
    if (!title.trim() || !venue.trim()) {
      alert('Please fill in required fields (Title, Venue, Date).');
      return;
    }

    createEvent(
      {
        title: title.trim(),
        description: description.trim(),
        category,
        college: college.trim(),
        organizer: organizer.trim(),
        eventType,
        date,
        startTime,
        endTime,
        venue: venue.trim(),
        capacity: Number(capacity) || 50,
        registrationDeadline,
        liveMeetingUrl: liveMeetingUrl.trim(),
        eligibility: eligibility.trim(),
        rules: rules
          .split('\n')
          .map((r) => r.trim())
          .filter(Boolean),
        speakers: speakerName.trim()
          ? [
              {
                name: speakerName.trim(),
                role: speakerRole.trim(),
                org: speakerOrg.trim(),
              },
            ]
          : [],
      },
      publishDirectly
    );

    if (currentUser?.role === 'ADMIN') {
      navigateTo('discovery');
    } else {
      navigateTo('manage-events');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <button
          onClick={() => navigateTo('host-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 py-1 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Campus Event
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Submit an event proposal. Once verified by administration, it will appear publicly across student discovery feeds.
        </p>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            1. Core Event Information
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Next-Gen DevOps & Cloud Architecture Bootcamp"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Event Description & Takeaways *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe syllabus, hands-on activities, prerequisites, and learning outcomes..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Format</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden bg-white"
              >
                <option value="Offline">In-Person (Offline)</option>
                <option value="Online">Virtual (Online)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Seats Capacity
              </label>
              <input
                type="number"
                min="10"
                max="2000"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Date, Venue & Timing */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            2. Logistics, Dates & Venue
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">End Time</label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="04:00 PM"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Physical Venue / Hall
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Seminar Hall 1, Main Block, KIOT"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Live Virtual Stream Link (Optional)
              </label>
              <input
                type="url"
                value={liveMeetingUrl}
                onChange={(e) => setLiveMeetingUrl(e.target.value)}
                placeholder="https://meet.eventhub.demo/kiot-session"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Speaker & Guidelines */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            3. Speaker & Event Guidelines
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Speaker Name</label>
              <input
                type="text"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                placeholder="Dr. S. K. Narayanan"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Speaker Role</label>
              <input
                type="text"
                value={speakerRole}
                onChange={(e) => setSpeakerRole(e.target.value)}
                placeholder="Staff Engineer"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Organization</label>
              <input
                type="text"
                value={speakerOrg}
                onChange={(e) => setSpeakerOrg(e.target.value)}
                placeholder="Google / Zoho / KIOT"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Eligibility</label>
              <input
                type="text"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Rules & Guidelines (One per line)
              </label>
              <textarea
                rows={2}
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Publish Event Proposal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
