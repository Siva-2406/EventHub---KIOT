import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  User,
  UserRole,
  EventItem,
  Registration,
  NotificationItem,
  FeedbackItem,
  ScheduleConflict,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_EVENTS,
  INITIAL_REGISTRATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_FEEDBACK,
} from '../data/initialData';
import { areEventsOverlapping } from '../utils/time';

export type PageType =
  | 'landing'
  | 'login'
  | 'discovery'
  | 'event-details'
  | 'student-dashboard'
  | 'my-events'
  | 'my-schedule'
  | 'notifications'
  | 'feedback'
  | 'profile'
  | 'host-dashboard'
  | 'create-event'
  | 'manage-events'
  | 'participants'
  | 'host-analytics'
  | 'admin-dashboard'
  | 'admin-verification'
  | 'admin-users'
  | 'admin-events'
  | 'admin-analytics';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}

interface AppContextType {
  currentUser: User | null;
  currentPage: PageType;
  selectedEventId: string | null;
  liveModalEvent: EventItem | null;
  registerModalEvent: EventItem | null;
  toasts: ToastState[];
  users: User[];
  events: EventItem[];
  registrations: Registration[];
  notifications: NotificationItem[];
  feedback: FeedbackItem[];
  smartRemindersEnabled: boolean;
  searchQuery: string;
  selectedCategory: string;
  sidebarOpen: boolean;

  // Actions
  login: (role: UserRole, customEmail?: string) => void;
  logout: () => void;
  navigateTo: (page: PageType, payload?: { eventId?: string }) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  toggleSmartReminders: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openLiveModal: (event: EventItem) => void;
  closeLiveModal: () => void;
  openRegisterModal: (event: EventItem) => void;
  closeRegisterModal: () => void;
  showToast: (message: string, type?: ToastState['type']) => void;
  dismissToast: (id: string) => void;

  // Event & Registration ops
  registerForEvent: (
    eventId: string,
    details?: { name: string; college: string; dept: string }
  ) => { success: boolean; message: string; isWaitlist?: boolean };
  cancelRegistration: (eventId: string) => void;
  isRegisteredForEvent: (eventId: string) => boolean;
  getRegistrationForEvent: (eventId: string) => Registration | undefined;

  // Host/Admin Event management
  createEvent: (eventData: Partial<EventItem>, publishDirectly?: boolean) => EventItem;
  updateEvent: (eventId: string, eventData: Partial<EventItem>) => void;
  deleteEvent: (eventId: string) => void;
  cancelEvent: (eventId: string) => void;
  approveEvent: (eventId: string) => void;
  rejectEvent: (eventId: string, reason?: string) => void;
  verifyExternalEvent: (eventId: string) => void;

  // Attendee & User ops
  markAttendance: (
    registrationId: string,
    attendance: 'PRESENT' | 'ABSENT' | 'PENDING'
  ) => void;
  toggleUserStatus: (userId: string) => void;
  updateProfile: (details: Partial<User>) => void;

  // Feedback & Notifications
  submitFeedback: (eventId: string, rating: number, comment: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  resetDemoData: () => void;

  // Computed data
  registeredEvents: EventItem[];
  conflicts: ScheduleConflict[];
  unreadNotificationCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from LocalStorage or fall back
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eventhub_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS[0];
      }
    }
    return INITIAL_USERS[0]; // Default logged in as Student for effortless immediate exploration
  });

  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [liveModalEvent, setLiveModalEvent] = useState<EventItem | null>(null);
  const [registerModalEvent, setRegisterModalEvent] = useState<EventItem | null>(null);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [smartRemindersEnabled, setSmartRemindersEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('eventhub_reminders_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eventhub_sidebar_open');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.innerWidth >= 768;
    }
    return true;
  });

  const toggleSidebar = () => {
    setSidebarOpenState((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('eventhub_sidebar_open', String(next));
      }
      return next;
    });
  };

  const setSidebarOpen = (open: boolean) => {
    setSidebarOpenState(open);
    if (typeof window !== 'undefined') {
      localStorage.setItem('eventhub_sidebar_open', String(open));
    }
  };

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('eventhub_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('eventhub_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('eventhub_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('eventhub_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [feedback, setFeedback] = useState<FeedbackItem[]>(() => {
    const saved = localStorage.getItem('eventhub_feedback');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
  });

  // Sync to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eventhub_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eventhub_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('eventhub_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventhub_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('eventhub_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('eventhub_feedback', JSON.stringify(feedback));
  }, [feedback]);

  useEffect(() => {
    localStorage.setItem('eventhub_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('eventhub_reminders_enabled', JSON.stringify(smartRemindersEnabled));
  }, [smartRemindersEnabled]);

  // Toast dispatch
  const showToast = (message: string, type: ToastState['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Login handler
  const login = (role: UserRole, customEmail?: string) => {
    const target = users.find((u) => {
      if (customEmail) return u.email.toLowerCase() === customEmail.toLowerCase();
      return u.role === role;
    });

    if (target) {
      setCurrentUser(target);
      showToast(`Welcome back, ${target.name}!`, 'success');
      if (role === 'STUDENT') setCurrentPage('student-dashboard');
      else if (role === 'HOST') setCurrentPage('host-dashboard');
      else if (role === 'ADMIN') setCurrentPage('admin-dashboard');
    } else {
      showToast('Invalid credentials provided.', 'danger');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
    showToast('Logged out successfully.', 'info');
  };

  // Route / Page Navigation Guard
  const navigateTo = (page: PageType, payload?: { eventId?: string }) => {
    if (payload?.eventId) {
      setSelectedEventId(payload.eventId);
    }

    // Role Guard
    const studentOnly: PageType[] = [
      'student-dashboard',
      'my-events',
      'my-schedule',
      'feedback',
    ];
    const hostOnly: PageType[] = [
      'host-dashboard',
      'create-event',
      'manage-events',
      'participants',
      'host-analytics',
    ];
    const adminOnly: PageType[] = [
      'admin-dashboard',
      'admin-verification',
      'admin-users',
      'admin-events',
      'admin-analytics',
    ];

    if (!currentUser && (studentOnly.includes(page) || hostOnly.includes(page) || adminOnly.includes(page))) {
      showToast('Please sign in to access this page.', 'warning');
      setCurrentPage('login');
      return;
    }

    if (currentUser?.role === 'STUDENT') {
      if (hostOnly.includes(page) || adminOnly.includes(page)) {
        showToast('Access Denied: Organizer/Admin permissions required.', 'danger');
        setCurrentPage('student-dashboard');
        return;
      }
    } else if (currentUser?.role === 'HOST') {
      if (adminOnly.includes(page)) {
        showToast('Access Denied: Admin permissions required.', 'danger');
        setCurrentPage('host-dashboard');
        return;
      }
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSmartReminders = () => {
    setSmartRemindersEnabled((prev) => {
      const next = !prev;
      showToast(next ? 'Smart reminders enabled' : 'Smart reminders disabled', 'info');
      return next;
    });
  };

  const openLiveModal = (event: EventItem) => setLiveModalEvent(event);
  const closeLiveModal = () => setLiveModalEvent(null);
  const openRegisterModal = (event: EventItem) => setRegisterModalEvent(event);
  const closeRegisterModal = () => setRegisterModalEvent(null);

  // Compute registered events for current student
  const registeredEvents = useMemo(() => {
    if (!currentUser) return [];
    const myConfirmedRegs = registrations.filter(
      (r) => r.userId === currentUser.id && r.status === 'CONFIRMED'
    );
    const eventIds = new Set(myConfirmedRegs.map((r) => r.eventId));
    return events.filter((e) => eventIds.has(e.id));
  }, [currentUser, registrations, events]);

  // Schedule Conflict Detection
  const conflicts = useMemo(() => {
    const list: ScheduleConflict[] = [];
    if (registeredEvents.length < 2) return list;

    for (let i = 0; i < registeredEvents.length; i++) {
      for (let j = i + 1; j < registeredEvents.length; j++) {
        const e1 = registeredEvents[i];
        const e2 = registeredEvents[j];

        if (
          areEventsOverlapping(
            e1.date,
            e1.startTime,
            e1.endTime,
            e2.date,
            e2.startTime,
            e2.endTime
          )
        ) {
          list.push({
            event1: e1,
            event2: e2,
            overlapDescription: `${e1.title} (${e1.startTime} - ${e1.endTime}) overlaps with ${e2.title} (${e2.startTime} - ${e2.endTime}) on ${e1.date}.`,
          });
        }
      }
    }
    return list;
  }, [registeredEvents]);

  // Register for event
  const registerForEvent = (
    eventId: string,
    details?: { name: string; college: string; dept: string }
  ) => {
    if (!currentUser) {
      showToast('Please login to register for this event.', 'warning');
      setCurrentPage('login');
      return { success: false, message: 'Not logged in' };
    }

    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return { success: false, message: 'Event not found' };

    // Check duplicate
    const existing = registrations.find(
      (r) => r.eventId === eventId && r.userId === currentUser.id && r.status !== 'CANCELLED'
    );
    if (existing) {
      showToast('You are already registered for this event.', 'warning');
      return { success: false, message: 'Already registered' };
    }

    const isFull = targetEvent.registeredCount >= targetEvent.capacity;
    const regStatus = isFull ? 'WAITLIST' : 'CONFIRMED';

    const newReg: Registration = {
      id: `reg-${Date.now()}`,
      eventId,
      userId: currentUser.id,
      userName: details?.name || currentUser.name,
      userEmail: currentUser.email,
      userCollege: details?.college || currentUser.college,
      userDept: details?.dept || currentUser.department || 'General',
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: regStatus,
      attendance: 'PENDING',
    };

    setRegistrations((prev) => [newReg, ...prev]);

    // Update counts
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            registeredCount: isFull ? e.registeredCount : e.registeredCount + 1,
            waitlistCount: isFull ? e.waitlistCount + 1 : e.waitlistCount,
          };
        }
        return e;
      })
    );

    // Create Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: isFull ? 'Added to Event Waitlist' : 'Registration Successful!',
      message: isFull
        ? `You joined the waitlist for "${targetEvent.title}". We will notify you if a slot opens.`
        : `You are confirmed for "${targetEvent.title}". Added to My Events & Schedule.`,
      type: isFull ? 'INFO' : 'SUCCESS',
      read: false,
      timestamp: 'Just now',
      eventId,
    };
    setNotifications((prev) => [notif, ...prev]);

    // Check if this new registration causes a schedule conflict
    if (!isFull) {
      const overlappingWith = registeredEvents.find((e) =>
        areEventsOverlapping(
          e.date,
          e.startTime,
          e.endTime,
          targetEvent.date,
          targetEvent.startTime,
          targetEvent.endTime
        )
      );

      if (overlappingWith) {
        const conflictNotif: NotificationItem = {
          id: `notif-conflict-${Date.now()}`,
          userId: currentUser.id,
          title: '⚠ Schedule Conflict Detected',
          message: `"${targetEvent.title}" (${targetEvent.startTime} - ${targetEvent.endTime}) overlaps with "${overlappingWith.title}" on ${targetEvent.date}. Check My Schedule.`,
          type: 'WARNING',
          read: false,
          timestamp: 'Just now',
          eventId,
        };
        setNotifications((prev) => [conflictNotif, ...prev]);
        showToast(
          `Registered, but note: schedule overlaps with "${overlappingWith.title}"!`,
          'warning'
        );
      } else {
        showToast(`Registered for ${targetEvent.title}!`, 'success');
      }
    } else {
      showToast(`Added to waitlist for ${targetEvent.title}.`, 'info');
    }

    return {
      success: true,
      message: isFull ? 'Added to Waitlist' : 'Registration Confirmed',
      isWaitlist: isFull,
    };
  };

  // Cancel registration
  const cancelRegistration = (eventId: string) => {
    if (!currentUser) return;
    const targetEvent = events.find((e) => e.id === eventId);

    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.eventId === eventId && r.userId === currentUser.id && r.status !== 'CANCELLED') {
          return { ...r, status: 'CANCELLED' };
        }
        return r;
      })
    );

    // Free up seat
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            registeredCount: Math.max(0, e.registeredCount - 1),
          };
        }
        return e;
      })
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Registration Cancelled',
      message: `Your registration for "${targetEvent?.title || 'the event'}" has been cancelled.`,
      type: 'INFO',
      read: false,
      timestamp: 'Just now',
      eventId,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('Registration cancelled.', 'info');
  };

  const isRegisteredForEvent = (eventId: string) => {
    if (!currentUser) return false;
    return registrations.some(
      (r) => r.eventId === eventId && r.userId === currentUser.id && r.status === 'CONFIRMED'
    );
  };

  const getRegistrationForEvent = (eventId: string) => {
    if (!currentUser) return undefined;
    return registrations.find(
      (r) => r.eventId === eventId && r.userId === currentUser.id && r.status !== 'CANCELLED'
    );
  };

  // Host / Admin operations
  const createEvent = (
    eventData: Partial<EventItem>,
    publishDirectly: boolean = false
  ): EventItem => {
    const isHost = currentUser?.role === 'HOST';
    const isAdmin = currentUser?.role === 'ADMIN';

    // Status logic:
    // If Admin: can directly publish as UPCOMING / LIVE NOW and isVerified = true.
    // If Host: if publishDirectly, set to PENDING_VERIFICATION for admin approval, else DRAFT.
    let initialStatus: EventItem['status'] = 'DRAFT';
    let isVerified = false;

    if (isAdmin) {
      initialStatus = eventData.status || (publishDirectly ? 'UPCOMING' : 'DRAFT');
      isVerified = true;
    } else if (isHost) {
      initialStatus = publishDirectly ? 'PENDING_VERIFICATION' : 'DRAFT';
      isVerified = false;
    }

    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      title: eventData.title || 'Untitled Event',
      description: eventData.description || '',
      college: eventData.college || currentUser?.college || 'Knowledge Institute of Technology (KIOT)',
      isExternal: eventData.isExternal || false,
      isVerified,
      category: eventData.category || 'Technology',
      status: initialStatus,
      eventType: eventData.eventType || 'Offline',
      date: eventData.date || new Date().toISOString().slice(0, 10),
      startTime: eventData.startTime || '10:00 AM',
      endTime: eventData.endTime || '12:00 PM',
      venue: eventData.venue || 'Campus Auditorium',
      liveMeetingUrl: eventData.liveMeetingUrl || '',
      capacity: Number(eventData.capacity) || 100,
      registeredCount: 0,
      waitlistCount: 0,
      registrationDeadline: eventData.registrationDeadline || eventData.date || '',
      organizer: eventData.organizer || currentUser?.name || 'Event Organizer',
      organizerEmail: eventData.organizerEmail || currentUser?.email || 'host@eventhub.demo',
      eligibility: eventData.eligibility || 'Open to all college students',
      rules: eventData.rules && eventData.rules.length > 0 ? eventData.rules : ['Valid ID card required.'],
      speakers: eventData.speakers || [],
      schedule: eventData.schedule || [
        { time: `${eventData.startTime || '10:00 AM'} - ${eventData.endTime || '12:00 PM'}`, activity: 'Session & Hands-on' },
      ],
      bannerColor: eventData.bannerColor || 'from-indigo-600 to-blue-800',
      contact: eventData.contact || {
        name: currentUser?.name || 'Coordinator',
        phone: currentUser?.phone || '+91 98765 43210',
        email: currentUser?.email || 'host@eventhub.demo',
      },
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setEvents((prev) => [newEvent, ...prev]);

    if (initialStatus === 'PENDING_VERIFICATION') {
      showToast('Event submitted for Admin verification!', 'success');
    } else if (initialStatus === 'UPCOMING') {
      showToast('Event published successfully!', 'success');
    } else {
      showToast('Draft event saved.', 'info');
    }

    return newEvent;
  };

  const updateEvent = (eventId: string, eventData: Partial<EventItem>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, ...eventData } : e))
    );
    showToast('Event updated successfully.', 'success');
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setRegistrations((prev) => prev.filter((r) => r.eventId !== eventId));
    showToast('Event deleted.', 'info');
  };

  const cancelEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status: 'CANCELLED' } : e))
    );
    showToast('Event marked as cancelled.', 'warning');
  };

  const approveEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            status: 'UPCOMING',
            isVerified: true,
          };
        }
        return e;
      })
    );
    showToast('Event verified and approved for public discovery!', 'success');
  };

  const rejectEvent = (eventId: string, reason?: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            status: 'DRAFT',
            isVerified: false,
          };
        }
        return e;
      })
    );
    showToast(reason ? `Event changes requested: ${reason}` : 'Event rejected.', 'warning');
  };

  const verifyExternalEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, isVerified: true } : e))
    );
    showToast('External college event verified.', 'success');
  };

  const markAttendance = (
    registrationId: string,
    attendance: 'PRESENT' | 'ABSENT' | 'PENDING'
  ) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === registrationId ? { ...r, attendance } : r))
    );
    showToast(`Attendance updated to ${attendance}.`, 'success');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    showToast('User account status updated.', 'info');
  };

  const updateProfile = (details: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...details };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showToast('Profile updated successfully!', 'success');
  };

  const submitFeedback = (eventId: string, rating: number, comment: string) => {
    if (!currentUser) return;
    const newFb: FeedbackItem = {
      id: `fb-${Date.now()}`,
      eventId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setFeedback((prev) => [newFb, ...prev]);
    showToast('Thank you for your feedback!', 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem('eventhub_current_user');
    localStorage.removeItem('eventhub_events');
    localStorage.removeItem('eventhub_registrations');
    localStorage.removeItem('eventhub_notifications');
    localStorage.removeItem('eventhub_feedback');
    localStorage.removeItem('eventhub_users');
    setCurrentUser(INITIAL_USERS[0]);
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setFeedback(INITIAL_FEEDBACK);
    setUsers(INITIAL_USERS);
    setCurrentPage('student-dashboard');
    showToast('Demo data restored to initial state.', 'info');
  };

  const unreadNotificationCount = useMemo(() => {
    if (!currentUser) return 0;
    return notifications.filter((n) => n.userId === currentUser.id && !n.read).length;
  }, [currentUser, notifications]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentPage,
        selectedEventId,
        liveModalEvent,
        registerModalEvent,
        toasts,
        users,
        events,
        registrations,
        notifications,
        feedback,
        smartRemindersEnabled,
        searchQuery,
        selectedCategory,
        sidebarOpen,
        login,
        logout,
        navigateTo,
        setSearchQuery,
        setSelectedCategory,
        toggleSmartReminders,
        toggleSidebar,
        setSidebarOpen,
        openLiveModal,
        closeLiveModal,
        openRegisterModal,
        closeRegisterModal,
        showToast,
        dismissToast,
        registerForEvent,
        cancelRegistration,
        isRegisteredForEvent,
        getRegistrationForEvent,
        createEvent,
        updateEvent,
        deleteEvent,
        cancelEvent,
        approveEvent,
        rejectEvent,
        verifyExternalEvent,
        markAttendance,
        toggleUserStatus,
        updateProfile,
        submitFeedback,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        resetDemoData,
        registeredEvents,
        conflicts,
        unreadNotificationCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
