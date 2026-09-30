import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Users, CheckCircle2, Award, Calendar, Layers } from 'lucide-react';

export const HostAnalyticsPage: React.FC = () => {
  const { events } = useApp();

  const categories = [
    { name: 'Technology & Cloud', count: 185, percent: 85 },
    { name: 'Hands-on Workshops', count: 142, percent: 72 },
    { name: 'Hackathons & Coding', count: 120, percent: 92 },
    { name: 'Technical Symposiums', count: 310, percent: 78 },
    { name: 'Career & Placements', count: 138, percent: 92 },
  ];

  const popularEvents = [
    { title: 'National Technical Symposium: TECHFEST 2026', registered: 310, capacity: 400, rate: '78%' },
    { title: 'Web Expo 2026: Future of Modern Full-Stack', registered: 215, capacity: 250, rate: '86%' },
    { title: 'Inter-College Hackathon: ByteCraft', registered: 120, capacity: 120, rate: '100% (Waitlist)' },
    { title: 'MongoDB Tech Odyssey', registered: 87, capacity: 100, rate: '87%' },
    { title: 'AI & Machine Learning Workshop', registered: 68, capacity: 75, rate: '91%' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Host Event Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Quantitative engagement metrics, attendance conversion ratios, and seat capacity utilization.
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Registrations</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">342</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24% vs previous semester
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Average Attendance</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">81%</p>
          <p className="text-[11px] text-slate-500 mt-1">Checked in via EventHub badge</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Upcoming Sessions</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">6</p>
          <p className="text-[11px] text-slate-500 mt-1">Active registrations open</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Completed Events</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">14</p>
          <p className="text-[11px] text-slate-500 mt-1">Archived with student feedback</p>
        </div>
      </div>

      {/* Two-Column Analytics Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Engagement */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Registrations by Category
            </h2>
            <p className="text-xs text-slate-500">Student interest breakdown across event disciplines</p>
          </div>

          <div className="space-y-4">
            {categories.map((c) => (
              <div key={c.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-800">{c.name}</span>
                  <span className="text-slate-500 font-mono tabular-nums">{c.count} students ({c.percent}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Registration Velocity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Registration Velocity (Past 5 Weeks)
            </h2>
            <p className="text-xs text-slate-500">New student registrations per week across KIOT</p>
          </div>

          <div className="h-44 flex items-end justify-between gap-4 pt-4 px-2">
            {[
              { week: 'W1 Sep', value: 45, height: '35%' },
              { week: 'W2 Sep', value: 72, height: '55%' },
              { week: 'W3 Sep', value: 95, height: '70%' },
              { week: 'W4 Sep', value: 142, height: '95%' },
              { week: 'Current', value: 110, height: '80%' },
            ].map((col) => (
              <div key={col.week} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-bold text-slate-700 font-mono tabular-nums">
                  {col.value}
                </span>
                <div
                  className="w-full bg-indigo-500 hover:bg-indigo-600 rounded-t-lg transition-all"
                  style={{ height: col.height }}
                />
                <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                  {col.week}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Peak Day: Thursday (MongoDB & Web Expo Launch)</span>
            <span className="font-semibold text-emerald-600">89% Mobile Signups</span>
          </div>
        </div>
      </div>

      {/* Popular Events Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Top Performing Events by Enrollment
          </h2>
          <p className="text-xs text-slate-500">Ranked by registration count vs allocated seat capacity</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Event Title</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">Seat Fill Rate</th>
                <th className="py-3 px-4 text-right">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {popularEvents.map((evt, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {evt.title}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold tabular-nums">
                    {evt.registered}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 tabular-nums">
                    {evt.capacity}
                  </td>
                  <td className="py-3 px-4 font-semibold text-indigo-600">
                    {evt.rate}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      High Demand
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
