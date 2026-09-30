import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem, EventCategory, EventType, EventStatus } from '../types';
import { EventCard } from '../components/common/EventCard';
import {
  Search,
  Filter,
  Radio,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

const CATEGORIES: ('All' | EventCategory)[] = [
  'All',
  'Technology',
  'Hackathon',
  'Workshop',
  'Seminar',
  'Symposium',
  'Web Expo',
  'Cultural',
  'Sports',
  'Career',
  'Entrepreneurship',
  'Club Events',
  'Department Events',
];

const COLLEGES = [
  'All Colleges',
  'Knowledge Institute of Technology (KIOT)',
  'Sona College of Technology',
  'PSG College of Technology',
  'Kongu Engineering College',
];

export const EventDiscoveryPage: React.FC = () => {
  const { events, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useApp();

  const [selectedCollege, setSelectedCollege] = useState('All Colleges');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [onlyExternal, setOnlyExternal] = useState(false);

  // Filter public visible events (omit DRAFT and PENDING_VERIFICATION)
  const visibleEvents = useMemo(() => {
    return events.filter(
      (e) => e.status !== 'DRAFT' && e.status !== 'PENDING_VERIFICATION'
    );
  }, [events]);

  const filteredEvents = useMemo(() => {
    return visibleEvents.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchCollege = item.college.toLowerCase().includes(q);
        const matchVenue = item.venue.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCat && !matchCollege && !matchVenue) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // College
      if (selectedCollege !== 'All Colleges' && item.college !== selectedCollege) {
        return false;
      }

      // Event Type
      if (selectedType !== 'All' && item.eventType !== selectedType) {
        return false;
      }

      // Status
      if (selectedStatus !== 'All' && item.status !== selectedStatus) {
        return false;
      }

      // Only External filter
      if (onlyExternal && !item.isExternal) {
        return false;
      }

      return true;
    });
  }, [
    visibleEvents,
    searchQuery,
    selectedCategory,
    selectedCollege,
    selectedType,
    selectedStatus,
    onlyExternal,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCollege('All Colleges');
    setSelectedType('All');
    setSelectedStatus('All');
    setOnlyExternal(false);
  };

  const liveEventsCount = visibleEvents.filter((e) => e.status === 'LIVE NOW').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              Centralized Campus Hub
            </span>
            <h1 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Discover Events
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
              Explore hackathons, workshops, and symposiums from KIOT and accredited partner campuses.
            </p>
          </div>

          {liveEventsCount > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold self-start sm:self-auto font-heading shadow-xs">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>{liveEventsCount} Event LIVE on Campus</span>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, workshops, hackathons, venues, or topics..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all text-slate-800 placeholder-slate-400 bg-slate-50/50"
          />
        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 font-heading ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dropdown Filters Row */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* College Filter */}
          <div>
            <label className="block text-slate-500 font-medium mb-1">Institution</label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:border-indigo-600"
            >
              {COLLEGES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Event Type Filter */}
          <div>
            <label className="block text-slate-500 font-medium mb-1">Format</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:border-indigo-600"
            >
              <option value="All">All Formats</option>
              <option value="Offline">In-Person (Offline)</option>
              <option value="Online">Virtual (Online)</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-slate-500 font-medium mb-1">Event Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:border-indigo-600"
            >
              <option value="All">All Statuses</option>
              <option value="LIVE NOW">🔴 Live Now</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Verified External Quick Toggle */}
          <div className="flex flex-col justify-end">
            <button
              onClick={() => setOnlyExternal((prev) => !prev)}
              className={`w-full py-1.5 px-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                onlyExternal
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>External Colleges Only</span>
            </button>
          </div>
        </div>

        {/* Active Filters count & reset button */}
        {(searchQuery ||
          selectedCategory !== 'All' ||
          selectedCollege !== 'All Colleges' ||
          selectedType !== 'All' ||
          selectedStatus !== 'All' ||
          onlyExternal) && (
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-800">{filteredEvents.length}</strong> matching events
            </span>
            <button
              onClick={resetFilters}
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No events matched your filters</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms, selecting "All Categories", or clearing institution filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
