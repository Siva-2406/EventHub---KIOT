export type UserRole = 'STUDENT' | 'HOST' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  college: string;
  department?: string;
  phone?: string;
  avatar?: string;
  joinedDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export type EventCategory =
  | 'Technology'
  | 'Hackathon'
  | 'Workshop'
  | 'Seminar'
  | 'Symposium'
  | 'Web Expo'
  | 'Cultural'
  | 'Sports'
  | 'Club Events'
  | 'Department Events'
  | 'Career'
  | 'Entrepreneurship'
  | 'Community'
  | 'Other';

export type EventStatus =
  | 'LIVE NOW'
  | 'UPCOMING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DRAFT'
  | 'PENDING_VERIFICATION';

export type EventType = 'Online' | 'Offline' | 'Hybrid';

export interface Speaker {
  name: string;
  role: string;
  org: string;
  avatar?: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  college: string;
  isExternal: boolean;
  isVerified: boolean;
  category: EventCategory;
  status: EventStatus;
  eventType: EventType;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "10:00 AM"
  endTime: string; // e.g. "04:00 PM"
  venue: string;
  liveMeetingUrl?: string;
  capacity: number;
  registeredCount: number;
  waitlistCount: number;
  registrationDeadline: string;
  organizer: string;
  organizerEmail: string;
  eligibility: string;
  rules: string[];
  speakers: Speaker[];
  schedule: ScheduleItem[];
  bannerColor: string; // Tailwind gradient / accent class
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userCollege: string;
  userDept: string;
  registeredAt: string;
  status: 'CONFIRMED' | 'WAITLIST' | 'CANCELLED';
  attendance: 'PRESENT' | 'ABSENT' | 'PENDING';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'REMINDER' | 'SUCCESS' | 'WARNING' | 'INFO';
  read: boolean;
  timestamp: string;
  eventId?: string;
}

export interface FeedbackItem {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  submittedAt: string;
}

export interface ScheduleConflict {
  event1: EventItem;
  event2: EventItem;
  overlapDescription: string;
}
