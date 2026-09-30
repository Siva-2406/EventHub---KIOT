import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Building2, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { events, registrations, users } = useApp();

  const collegeShare = [
    { name: 'Knowledge Institute of Technology (KIOT)', count: 2450, percentage: 68 },
    { name: 'Sona College of Technology', count: 480, percentage: 14 },
    { name: 'PSG College of Technology', count: 320, percentage: 9 },
    { name: 'Kongu Engineering College', count: 210, percentage: 6 },
    { name: 'KPR Institute of Engineering', count: 110, percentage: 3 },
  ];

  const deptParticipation = [
    { dept: 'Computer Science & Business Systems (CSBS)', count: 980, percent: 92 },
    { dept: 'Artificial Intelligence & Data Science (AI & DS)', count: 850, percent: 85 },
    { dept: 'Computer Science & Engineering (CSE)', count: 1120, percent: 89 },
    { dept: 'Electronics & Communication (ECE)', count: 720, percent: 65 },
    { dept: 'Mechanical Engineering', count: 450, percent: 52 },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Platform-Wide Governance Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Campus adoption metrics, institutional cross-registration flow, and departmental activity distributions.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Total Student Registrations</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">4,370</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +32% Year-over-Year
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Avg Verification Time</p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-1 tabular-nums">2.4 hrs</p>
          <p className="text-[11px] text-slate-500 mt-1">Proposal to discovery feed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Verified Partner Campuses</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">5</p>
          <p className="text-[11px] text-slate-500 mt-1">Active MOUs and exchange</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Conflict Resolution Rate</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1 tabular-nums">96.8%</p>
          <p className="text-[11px] text-slate-500 mt-1">Students adjusted overlapping slots</p>
        </div>
      </div>

      {/* Two-Column Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* College Share */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Cross-Campus Student Distribution
            </h2>
            <p className="text-xs text-slate-500">Attendee enrollment share by institution</p>
          </div>

          <div className="space-y-4 pt-2">
            {collegeShare.map((col) => (
              <div key={col.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-800 font-semibold">{col.name}</span>
                  <span className="text-slate-500 font-mono tabular-nums">{col.count} ({col.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${col.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Participation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              KIOT Departmental Engagement
            </h2>
            <p className="text-xs text-slate-500">Active participation rates across academic departments</p>
          </div>

          <div className="space-y-4 pt-2">
            {deptParticipation.map((dept) => (
              <div key={dept.dept} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-800 font-semibold">{dept.dept}</span>
                  <span className="text-slate-500 font-mono tabular-nums">{dept.count} registrations</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${dept.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
