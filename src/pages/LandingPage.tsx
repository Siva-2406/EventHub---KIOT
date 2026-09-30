import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CalendarCheck,
  BellRing,
  Calendar,
  Radio,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { EventCard } from '../components/common/EventCard';

export const LandingPage: React.FC = () => {
  const { navigateTo, login, events, openLiveModal } = useApp();

  const liveEvent = events.find((e) => e.status === 'LIVE NOW');
  const previewEvents = events.filter((e) => e.status !== 'DRAFT' && e.status !== 'PENDING_VERIFICATION').slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Main Institution Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Built for Knowledge Institute of Technology (KIOT) & Partner Campuses</span>
          </div>

          {/* Main Headlines */}
          <h1 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Every College Event. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              One Single Place.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Discover college events, register instantly, manage your schedule, get smart reminders, and never miss an important symposium, hackathon, or workshop again.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('discovery')}
              className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 font-heading"
            >
              <Compass className="w-4 h-4" />
              Explore Events
            </button>
            <button
              onClick={() => navigateTo('login')}
              className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 active:scale-[0.98] border border-slate-300 rounded-xl transition-all flex items-center justify-center gap-2 font-heading"
            >
              Sign In to EventHub
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Live Now Ticker banner if live event is active */}
          {liveEvent && (
            <div className="pt-4 max-w-xl mx-auto">
              <div
                onClick={() => openLiveModal(liveEvent)}
                className="bg-red-50 hover:bg-red-100/90 border border-red-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-ping shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
                      🔴 HAPPENING RIGHT NOW ON CAMPUS
                    </span>
                    <p className="text-sm font-bold text-slate-900 line-clamp-1">{liveEvent.title}</p>
                    <p className="text-xs text-slate-500">{liveEvent.venue} · {liveEvent.college}</p>
                  </div>
                </div>
                <button className="px-3.5 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shrink-0 shadow-xs">
                  Join Live
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Login Cards */}
          <div className="pt-6 border-t border-slate-200/80 max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              One-Click Demo Roles (No Password Required)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => login('STUDENT')}
                className="p-3 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Demo</span>
                </div>
                <p className="text-xs font-semibold text-slate-900">Sivaperumal B</p>
                <p className="text-[11px] text-slate-500">CSBS Dept · KIOT</p>
              </button>

              <button
                onClick={() => login('HOST')}
                className="p-3 bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Host / Organizer</span>
                </div>
                <p className="text-xs font-semibold text-slate-900">Event Coordinator</p>
                <p className="text-[11px] text-slate-500">Create & Manage Events</p>
              </button>

              <button
                onClick={() => login('ADMIN')}
                className="p-3 bg-white hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-2 text-purple-600 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Demo</span>
                </div>
                <p className="text-xs font-semibold text-slate-900">EventHub Admin</p>
                <p className="text-[11px] text-slate-500">Verify & Approve Events</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="bg-slate-900 text-white py-12 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">500+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Campus Events</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight tabular-nums">5,000+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Active Students</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight tabular-nums">50+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Clubs & Organizers</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight tabular-nums">10+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Partner Colleges</p>
          </div>
        </div>
      </section>

      {/* The 5 Key Pillars / Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Core Capabilities</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Engineered to Solve Campus Event Chaos
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            No more scattered WhatsApp forwards, lost poster timings, or clashing technical symposiums.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Centralized Event Discovery</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Every KIOT workshop, hackathon, seminar, and cultural fest consolidated with verified listings from partner institutions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Personal Schedule & Conflicts</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Automatic personal timeline generation with instant overlapping event conflict warnings to protect your calendar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-amber-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <BellRing className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Smart Event Reminders</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Proactive alerts for events starting tomorrow, in 1 hour, or 15 minutes, with flexible user toggles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-red-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">Live Event Broadcasting</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Instantly recognize ongoing sessions with 🔴 LIVE NOW markers, auditorium maps, and 1-click virtual stream access.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Verified External Events</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Explore officially vetted hackathons and symposiums from Sona College, PSG Tech, Kongu, and KPR Institute.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Organizer & Admin Governance</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              High-density host analytics, digital attendance check-ins, and institutional admin verification approvals.
            </p>
          </div>
        </div>
      </section>

      {/* How EventHub Works Section */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">The Student Journey</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              How EventHub Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mx-auto flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Discover</h4>
              <p className="text-xs text-slate-500">Filter events by department, college, and category.</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mx-auto flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Register</h4>
              <p className="text-xs text-slate-500">1-click seat reservation with live capacity counter.</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mx-auto flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Schedule</h4>
              <p className="text-xs text-slate-500">Automatic timeline sync with conflict warnings.</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mx-auto flex items-center justify-center">
                4
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Remind</h4>
              <p className="text-xs text-slate-500">Smart banners & push notifications before start time.</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mx-auto flex items-center justify-center">
                5
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Attend & Review</h4>
              <p className="text-xs text-slate-500">Join in person or live virtual stream & rate afterwards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Explore Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Trending Events on Campus
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Registered by students from KIOT, Sona, PSG, and partner colleges.
            </p>
          </div>
          <button
            onClick={() => navigateTo('discovery')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 self-start sm:self-auto"
          >
            View All ({events.length}) Events <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* Verified Partner College Badges */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center border-t border-slate-200/80 pt-12">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
          Verified Events from Accredited Campuses
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-600">
          <span className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
            Knowledge Institute of Technology (KIOT)
          </span>
          <span className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
            Sona College of Technology
          </span>
          <span className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
            PSG College of Technology
          </span>
          <span className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
            Kongu Engineering College
          </span>
          <span className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
            KPR Institute of Engineering
          </span>
        </div>
      </section>
    </div>
  );
};
