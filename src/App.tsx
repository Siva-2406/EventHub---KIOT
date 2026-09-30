import React, { useState } from 'react';
import { AppProvider, useApp, PageType } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';
import { RegistrationModal } from './components/common/RegistrationModal';
import { LiveEventModal } from './components/common/LiveEventModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { EventDiscoveryPage } from './pages/EventDiscoveryPage';
import { EventDetailsPage } from './pages/EventDetailsPage';

// Student
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MyEventsPage } from './pages/student/MyEventsPage';
import { MySchedulePage } from './pages/student/MySchedulePage';
import { NotificationsPage } from './pages/student/NotificationsPage';
import { FeedbackPage } from './pages/student/FeedbackPage';
import { ProfilePage } from './pages/student/ProfilePage';

// Host
import { HostDashboard } from './pages/host/HostDashboard';
import { CreateEventPage } from './pages/host/CreateEventPage';
import { ManageEventsPage } from './pages/host/ManageEventsPage';
import { AttendeeManagementPage } from './pages/host/AttendeeManagementPage';
import { HostAnalyticsPage } from './pages/host/HostAnalyticsPage';

// Admin
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { EventVerificationPage } from './pages/admin/EventVerificationPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { AdminEventManagementPage } from './pages/admin/AdminEventManagementPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

const AppContent: React.FC = () => {
  const { currentPage, currentUser, sidebarOpen, toggleSidebar } = useApp();

  // Pages that display inside the authenticated workspace layout with sidebar
  const isWorkspace =
    currentUser &&
    currentPage !== 'landing' &&
    currentPage !== 'login';

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'discovery':
        return <EventDiscoveryPage />;
      case 'event-details':
        return <EventDetailsPage />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'my-events':
        return <MyEventsPage />;
      case 'my-schedule':
        return <MySchedulePage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'profile':
        return <ProfilePage />;
      case 'host-dashboard':
        return <HostDashboard />;
      case 'create-event':
        return <CreateEventPage />;
      case 'manage-events':
        return <ManageEventsPage />;
      case 'participants':
        return <AttendeeManagementPage />;
      case 'host-analytics':
        return <HostAnalyticsPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-verification':
        return <EventVerificationPage />;
      case 'admin-users':
        return <UserManagementPage />;
      case 'admin-events':
        return <AdminEventManagementPage />;
      case 'admin-analytics':
        return <AdminAnalyticsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Top Header Navbar */}
      <Navbar onMobileMenuToggle={toggleSidebar} />

      {/* Main Workspace / Viewport */}
      {isWorkspace ? (
        <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
          {/* Role-Specific Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <main
            className={`flex-1 min-w-0 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${
              sidebarOpen ? 'md:pl-64' : 'md:pl-0'
            }`}
          >
            <div className="max-w-6xl mx-auto">{renderCurrentPage()}</div>
          </main>
        </div>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {renderCurrentPage()}
        </main>
      )}

      {/* Global Modals & Notifications */}
      <RegistrationModal />
      <LiveEventModal />
      <ToastContainer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
