import React from 'react';
import { ScheduleConflict } from '../../types';
import { AlertTriangle, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ConflictAlertProps {
  conflicts: ScheduleConflict[];
  onResolveClick?: () => void;
}

export const ConflictAlert: React.FC<ConflictAlertProps> = ({ conflicts, onResolveClick }) => {
  const { navigateTo } = useApp();

  if (!conflicts || conflicts.length === 0) return null;

  return (
    <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-4 sm:p-5 mb-6 text-amber-950">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-semibold text-base text-amber-900 tracking-tight">
              Schedule Conflict Detected ({conflicts.length})
            </h4>
            <button
              onClick={onResolveClick || (() => navigateTo('my-schedule'))}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-4 flex items-center gap-1"
            >
              View in My Schedule <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-amber-800/90 mt-1">
            You are registered for events that take place at the same time. You will need to prioritize or adjust attendance.
          </p>

          <div className="mt-3 space-y-2">
            {conflicts.map((conflict, idx) => (
              <div
                key={idx}
                className="bg-white/90 border border-amber-200/80 rounded-lg p-3 text-xs sm:text-sm text-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    <span>{conflict.event1.title}</span>
                    <span className="text-xs text-slate-500">
                      ({conflict.event1.startTime} - {conflict.event1.endTime})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                    <span>{conflict.event2.title}</span>
                    <span className="text-xs text-slate-500">
                      ({conflict.event2.startTime} - {conflict.event2.endTime})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {conflict.event1.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Overlapping
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
