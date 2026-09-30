import React from 'react';
import { useApp, PageType } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  CalendarDays,
  Bell,
  MessageSquareHeart,
  User as UserIcon,
  PlusCircle,
  FileCheck2,
  Users,
  BarChart3,
  ShieldCheck,
  Building,
  RotateCcw,
  Sparkles,
  Radio,
  X,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const {
    currentUser,
    currentPage,
    navigateTo,
    events,
    unreadNotificationCount,
    smartRemindersEnabled,
    toggleSmartReminders,
    resetDemoData,
    conflicts,
    sidebarOpen,
    setSidebarOpen,
  } = useApp();

  if (!currentUser) return null;

  // Sync effective open state
  const isOpen = mobileOpen !== undefined ? (mobileOpen || sidebarOpen) : sidebarOpen;

  const handleClose = () => {
    setSidebarOpen(false);
    if (onMobileClose) onMobileClose();
  };

  const pendingVerificationCount = events.filter(
    (e) => e.status === 'PENDING_VERIFICATION'
  ).length;

  const handleNav = (page: PageType) => {
    navigateTo(page);
    // Auto close on small screens to give full view of page
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      handleClose();
    }
  };

  const navItemClass = (page: PageType) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
      currentPage === page
        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 hover:translate-x-0.5'
    }`;

  const renderNavLinks = () => {
    if (currentUser.role === 'STUDENT') {
      return (
        <>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Student Space
          </div>
          <button
            onClick={() => handleNav('student-dashboard')}
            className={navItemClass('student-dashboard')}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNav('discovery')}
            className={navItemClass('discovery')}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Discover Events</span>
          </button>

          <button
            onClick={() => handleNav('my-events')}
            className={navItemClass('my-events')}
          >
            <CalendarCheck className="w-4 h-4 shrink-0" />
            <span>My Events</span>
          </button>

          <button
            onClick={() => handleNav('my-schedule')}
            className={navItemClass('my-schedule')}
          >
            <CalendarDays className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">My Schedule</span>
            {conflicts.length > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                Conflict
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('notifications')}
            className={navItemClass('notifications')}
          >
            <Bell className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Notifications</span>
            {unreadNotificationCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white tabular-nums">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('feedback')}
            className={navItemClass('feedback')}
          >
            <MessageSquareHeart className="w-4 h-4 shrink-0" />
            <span>Feedback</span>
          </button>

          <button
            onClick={() => handleNav('profile')}
            className={navItemClass('profile')}
          >
            <UserIcon className="w-4 h-4 shrink-0" />
            <span>Profile</span>
          </button>
        </>
      );
    }

    if (currentUser.role === 'HOST') {
      return (
        <>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Host & Organizer Console
          </div>
          <button
            onClick={() => handleNav('host-dashboard')}
            className={navItemClass('host-dashboard')}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => handleNav('create-event')}
            className={navItemClass('create-event')}
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span>Create Event</span>
          </button>

          <button
            onClick={() => handleNav('manage-events')}
            className={navItemClass('manage-events')}
          >
            <Building className="w-4 h-4 shrink-0" />
            <span>My Hosted Events</span>
          </button>

          <button
            onClick={() => handleNav('participants')}
            className={navItemClass('participants')}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Attendee Records</span>
          </button>

          <button
            onClick={() => handleNav('host-analytics')}
            className={navItemClass('host-analytics')}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>Event Analytics</span>
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Campus
          </div>
          <button
            onClick={() => handleNav('discovery')}
            className={navItemClass('discovery')}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Public Catalog</span>
          </button>

          <button
            onClick={() => handleNav('profile')}
            className={navItemClass('profile')}
          >
            <UserIcon className="w-4 h-4 shrink-0" />
            <span>Organizer Profile</span>
          </button>
        </>
      );
    }

    if (currentUser.role === 'ADMIN') {
      return (
        <>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Administration
          </div>
          <button
            onClick={() => handleNav('admin-dashboard')}
            className={navItemClass('admin-dashboard')}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Admin Console</span>
          </button>

          <button
            onClick={() => handleNav('admin-verification')}
            className={navItemClass('admin-verification')}
          >
            <FileCheck2 className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Event Verification</span>
            {pendingVerificationCount > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                {pendingVerificationCount} Pending
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('admin-events')}
            className={navItemClass('admin-events')}
          >
            <Building className="w-4 h-4 shrink-0" />
            <span>Manage All Events</span>
          </button>

          <button
            onClick={() => handleNav('admin-users')}
            className={navItemClass('admin-users')}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>User Directory</span>
          </button>

          <button
            onClick={() => handleNav('admin-analytics')}
            className={navItemClass('admin-analytics')}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>Platform Analytics</span>
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Explorer
          </div>
          <button
            onClick={() => handleNav('discovery')}
            className={navItemClass('discovery')}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Public Catalog</span>
          </button>

          <button
            onClick={() => handleNav('profile')}
            className={navItemClass('profile')}
          >
            <UserIcon className="w-4 h-4 shrink-0" />
            <span>Admin Profile</span>
          </button>
        </>
      );
    }
  };

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 top-16 z-30 bg-slate-950/40 backdrop-blur-xs md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white/98 backdrop-blur-md border-r border-slate-200/80 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-xl md:shadow-none' : '-translate-x-full pointer-events-none'
        }`}
        aria-label="Sidebar Navigation"
      >
        <div className="space-y-1 overflow-y-auto pr-1">
          {/* Sidebar Top Header with explicit Close Affordance */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading">
              Navigation Menu
            </span>
            <button
              onClick={handleClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-xs"
              title="Close sidebar"
              aria-label="Close sidebar"
            >
              <span className="text-[11px] font-medium text-slate-400">Close</span>
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* User Brief Bar */}
          <div className="p-3 mb-3 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 font-heading">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate font-heading">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 truncate">
                {currentUser.role} · {currentUser.department?.split(' ')[0] || 'KIOT'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          {renderNavLinks()}
        </div>

        {/* Bottom Utility Box */}
        <div className="pt-4 border-t border-slate-200/80 space-y-3">
          {/* Smart Reminders Toggle */}
          <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Smart Reminders
              </span>
              <span className="text-[10px] text-slate-500 block">
                {smartRemindersEnabled ? 'Active (Push & Banner)' : 'Disabled'}
              </span>
            </div>
            <button
              onClick={toggleSmartReminders}
              className="text-indigo-600 hover:text-indigo-800 transition-colors p-1"
              title="Toggle smart reminders"
            >
              {smartRemindersEnabled ? (
                <ToggleRight className="w-6 h-6 text-indigo-600" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-400" />
              )}
            </button>
          </div>

          {/* Campus Tag & Reset Button */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>KIOT Campus</span>
            <button
              onClick={resetDemoData}
              className="hover:text-indigo-600 flex items-center gap-1 transition-colors"
              title="Reset state to initial sample demo"
            >
              <RotateCcw className="w-3 h-3" /> Reset Demo
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
