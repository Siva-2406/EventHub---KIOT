import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Search,
  LogOut,
  User as UserIcon,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Building2,
  GraduationCap,
  Calendar,
  Radio,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const {
    currentUser,
    currentPage,
    login,
    logout,
    navigateTo,
    searchQuery,
    setSearchQuery,
    unreadNotificationCount,
    smartRemindersEnabled,
    toggleSmartReminders,
    events,
    openLiveModal,
    sidebarOpen,
    toggleSidebar,
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifPreview, setShowNotifPreview] = useState(false);

  // Find if there's any active LIVE NOW event
  const liveEvent = events.find((e) => e.status === 'LIVE NOW');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage !== 'discovery') {
      navigateTo('discovery');
    }
  };

  const isWorkspace =
    currentUser &&
    currentPage !== 'landing' &&
    currentPage !== 'login';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Sidebar Toggle, Brand wordmark & college affiliation */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Universal Sidebar Open/Close Toggle Button */}
          {isWorkspace && (
            <button
              onClick={() => {
                toggleSidebar();
                if (onMobileMenuToggle) onMobileMenuToggle();
              }}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 border border-transparent hover:border-slate-200"
              title={sidebarOpen ? "Close sidebar menu" : "Open sidebar menu"}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-5 h-5 text-indigo-600 transition-transform" />
              ) : (
                <PanelLeft className="w-5 h-5 text-slate-700 transition-transform" />
              )}
              <span className="hidden sm:inline text-xs font-semibold text-slate-700 font-heading">
                {sidebarOpen ? 'Close Menu' : 'Menu'}
              </span>
            </button>
          )}

          <button
            onClick={() => {
              if (!currentUser) navigateTo('landing');
              else if (currentUser.role === 'STUDENT') navigateTo('student-dashboard');
              else if (currentUser.role === 'HOST') navigateTo('host-dashboard');
              else navigateTo('admin-dashboard');
            }}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:scale-105 transition-transform font-heading">
              E
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors font-heading">
                EventHub
              </span>
            </div>
          </button>

          {/* Quick KIOT badge */}
          <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-md font-sans">
            KIOT Campus & Partners
          </span>
        </div>

        {/* Zone 2: Search and primary navigation */}
        <div className="flex-1 max-w-lg hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons, workshops, symposiums..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all text-slate-800 placeholder-slate-400"
            />
          </form>
        </div>

        {/* Zone 3: Actions, Live Indicator, Notifications & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Now Quick Jump Button */}
          {liveEvent && (
            <button
              onClick={() => openLiveModal(liveEvent)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100/80 border border-red-200 text-red-700 text-xs font-semibold transition-colors"
              title="Join active live event"
            >
              <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span className="hidden md:inline">Live Now:</span>
              <span className="truncate max-w-[100px] font-bold">{liveEvent.title.split(' ')[0]}</span>
            </button>
          )}

          {currentUser ? (
            <>
              {/* Notifications Bell */}
              <button
                onClick={() => navigateTo('notifications')}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Notifications & Smart Reminders"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Quick Role Switcher for Hackathon Demo testing */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleDropdown((prev) => !prev)}
                  className="flex items-center gap-2 py-1 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs text-slate-700 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="hidden sm:inline font-semibold">{currentUser.role}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showRoleDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseLeave={() => setShowRoleDropdown(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Quick Switch Demo Role
                    </div>

                    <button
                      onClick={() => {
                        login('STUDENT');
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                        currentUser.role === 'STUDENT' ? 'text-indigo-600 font-semibold bg-indigo-50/50' : 'text-slate-700'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                      <div>
                        <p>Student Account</p>
                        <p className="text-[10px] text-slate-400 font-normal">Sivaperumal B (CSBS)</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        login('HOST');
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                        currentUser.role === 'HOST' ? 'text-indigo-600 font-semibold bg-indigo-50/50' : 'text-slate-700'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p>Host / Organizer</p>
                        <p className="text-[10px] text-slate-400 font-normal">Event Coordinator (KIOT)</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        login('ADMIN');
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                        currentUser.role === 'ADMIN' ? 'text-indigo-600 font-semibold bg-indigo-50/50' : 'text-slate-700'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <div>
                        <p>System Admin</p>
                        <p className="text-[10px] text-slate-400 font-normal">EventHub Admin</p>
                      </div>
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setShowRoleDropdown(false);
                          navigateTo('profile');
                        }}
                        className="w-full px-3 py-1.5 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowRoleDropdown(false);
                          logout();
                        }}
                        className="w-full px-3 py-1.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('login')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  login('STUDENT');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
              >
                Try Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
