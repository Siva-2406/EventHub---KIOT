import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MessageSquareHeart, CheckCircle2, Calendar, Award } from 'lucide-react';
import { formatDatePretty } from '../../utils/time';

export const FeedbackPage: React.FC = () => {
  const { events, feedback, submitFeedback, currentUser } = useApp();

  const completedEvents = events.filter((e) => e.status === 'COMPLETED');

  const [selectedEventId, setSelectedEventId] = useState(
    completedEvents[0]?.id || ''
  );
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !selectedEventId) return;

    submitFeedback(selectedEventId, rating, comment.trim());
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Event Feedback & Ratings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Share your hands-on feedback on completed campus workshops, speakers, and hackathons.
        </p>
      </div>

      {/* Main Feedback Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
          <MessageSquareHeart className="w-4 h-4" />
          <span>Review Completed Event</span>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2 text-emerald-900">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-base">Thank you for your feedback!</h3>
            <p className="text-xs text-emerald-700">
              Your evaluation has been recorded and submitted to the event organizers and department faculty.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Completed Event
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:border-indigo-600 focus:bg-white"
              >
                {completedEvents.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.title} ({formatDatePretty(evt.date)}) — {evt.college}
                  </option>
                ))}
              </select>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Overall Session Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-slate-300 hover:text-amber-400 focus:outline-hidden transition-colors"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-slate-700">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Comments & Suggestions for Organizer
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like the most? What could the speaker or organizers improve?"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 focus:outline-hidden focus:border-indigo-600 focus:bg-white placeholder-slate-400"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Existing Feedback History */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Recent Campus Reviews & Feedback ({feedback.length})
        </h2>

        <div className="space-y-3">
          {feedback.map((fb) => {
            const evt = events.find((e) => e.id === fb.eventId);
            return (
              <div
                key={fb.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{fb.userName}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{evt?.title || 'Campus Event'}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          fb.rating >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="text-slate-400 font-mono ml-1 text-[11px]">
                      {fb.submittedAt}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{fb.comment}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
