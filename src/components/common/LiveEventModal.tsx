import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Radio,
  Users,
  MessageSquare,
  Send,
  Calendar,
  MapPin,
  Mic,
  Maximize2,
  ThumbsUp,
  HelpCircle,
  Share2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  dept: string;
  text: string;
  time: string;
  isHost?: boolean;
}

export const LiveEventModal: React.FC = () => {
  const { liveModalEvent, closeLiveModal, currentUser, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'chat' | 'agenda' | 'qa'>('chat');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Dr. A. Arunkumar',
      dept: 'Speaker / Host',
      text: 'Welcome everyone! We are currently covering $lookup and vector indexing on Atlas.',
      time: '10:14 AM',
      isHost: true,
    },
    {
      id: '2',
      sender: 'Priyanka R',
      dept: 'AI & DS',
      text: 'Can we use cosine similarity with dimensions > 1536?',
      time: '10:18 AM',
    },
    {
      id: '3',
      sender: 'Karthik Raja',
      dept: 'CSE',
      text: 'The query execution plan demo is really clear! Thanks sir.',
      time: '10:21 AM',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [pollVoted, setPollVoted] = useState<string | null>(null);
  const [pollCounts, setPollCounts] = useState({ yes: 48, exploring: 64, new: 30 });
  const [handRaised, setHandRaised] = useState(false);

  if (!liveModalEvent) return null;

  const event = liveModalEvent;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: currentUser?.name || 'Student Participant',
      dept: currentUser?.department?.slice(0, 10) || 'Student',
      text: inputMsg.trim(),
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  const handleVote = (option: 'yes' | 'exploring' | 'new') => {
    if (pollVoted) return;
    setPollVoted(option);
    setPollCounts((prev) => ({ ...prev, [option]: prev[option] + 1 }));
    showToast('Your response has been recorded in the live poll!', 'success');
  };

  const toggleHand = () => {
    setHandRaised((prev) => {
      const next = !prev;
      showToast(next ? 'Hand raised! The host will be notified.' : 'Hand lowered.', 'info');
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 text-slate-100 rounded-2xl max-w-6xl w-full h-[90vh] max-h-[820px] shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Bar */}
        <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              LIVE NOW
            </span>
            <div className="hidden sm:block">
              <h2 className="text-sm font-semibold text-white tracking-tight line-clamp-1">{event.title}</h2>
              <p className="text-xs text-slate-400">{event.college} · {event.venue}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="tabular-nums font-mono">142</span> online
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Live stream link copied to clipboard!', 'info');
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeLiveModal}
              className="px-3 py-1 text-xs font-semibold bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              Leave Session
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Stream & Stage Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col bg-slate-950 overflow-y-auto">
            {/* Virtual Stream Window */}
            <div className="relative aspect-video w-full bg-slate-900 border-b border-slate-800 flex items-center justify-center overflow-hidden group">
              {/* Simulated Live Stream Display */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/40 flex flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs">
                    <p className="font-semibold text-white">Session 2: Real-Time Aggregation & Vector Pipelines</p>
                    <p className="text-[11px] text-slate-400">Dr. A. Arunkumar · Chief Architect, MongoDB Network</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/80 text-red-400 border border-red-800/60">
                      REC 01:24:18
                    </span>
                  </div>
                </div>

                {/* Simulated Presentation Graphic */}
                <div className="my-auto text-center space-y-3 max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                    <Radio className="w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Active Live Broadcast</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Broadcasting simultaneously from KIOT Seminar Hall 1 & Central Media Gateway
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                    <Mic className="w-3.5 h-3.5 text-emerald-400" /> Presenter Audio Stream Active (High-Fidelity)
                  </div>
                </div>

                {/* Bottom Stream Controls Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleHand}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                        handRaised
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {handRaised ? 'Hand Raised' : 'Raise Hand'}
                    </button>
                    <span className="text-[11px] text-slate-500">1080p 60fps</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-emerald-400 font-mono">Stream Quality: Optimal</span>
                    <Maximize2 className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Context & Poll */}
            <div className="p-5 space-y-4">
              {/* Live Interactive Poll */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Live Auditorium Poll
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {pollCounts.yes + pollCounts.exploring + pollCounts.new} votes
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-200 mb-3">
                  Have you integrated MongoDB Vector Search or Atlas Search into your projects?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleVote('yes')}
                    disabled={!!pollVoted}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      pollVoted === 'yes'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span>Yes, in production/hackathons</span>
                      <span className="font-mono">{pollCounts.yes}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleVote('exploring')}
                    disabled={!!pollVoted}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      pollVoted === 'exploring'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span>Currently learning / exploring</span>
                      <span className="font-mono">{pollCounts.exploring}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleVote('new')}
                    disabled={!!pollVoted}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      pollVoted === 'new'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span>Brand new to NoSQL</span>
                      <span className="font-mono">{pollCounts.new}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Physical Venue Info */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h5 className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    Physical Venue: {event.venue}
                  </h5>
                  <p className="text-slate-400 mt-0.5">
                    Attendees on campus are seated in Halls 1 & 2. Badges available at Registration Desk A.
                  </p>
                </div>
                <div className="text-right text-slate-400 font-mono text-[11px]">
                  <span>Timing: {event.startTime} - {event.endTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Chat / Q&A / Agenda (4 cols) */}
          <div className="lg:col-span-4 border-l border-slate-800 bg-slate-900 flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
                  activeTab === 'chat'
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab('agenda')}
                className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
                  activeTab === 'agenda'
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Agenda
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
                  activeTab === 'qa'
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Speakers ({event.speakers.length})
              </button>
            </div>

            {/* Tab 1: Live Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-semibold ${
                            msg.isHost ? 'text-amber-400' : 'text-indigo-400'
                          }`}
                        >
                          {msg.sender}
                        </span>
                        <span className="text-[10px] text-slate-500">({msg.dept})</span>
                        <span className="text-[10px] text-slate-600 ml-auto">{msg.time}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed bg-slate-800/40 p-2 rounded-lg border border-slate-800">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/80 flex gap-2">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Ask a question or post in live chat..."
                    className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 text-xs rounded-lg focus:outline-hidden focus:border-indigo-500 text-white placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Agenda */}
            {activeTab === 'agenda' && (
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Full Session Schedule
                </h4>
                {event.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs ${
                      idx === 1
                        ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-200'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] font-semibold">{item.time}</span>
                      {idx === 1 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white">
                          NOW
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-slate-200">{item.activity}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Speakers */}
            {activeTab === 'qa' && (
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Session Presenters
                </h4>
                {event.speakers.map((spk, idx) => (
                  <div key={idx} className="p-3 bg-slate-800/40 border border-slate-800 rounded-lg text-xs space-y-1">
                    <p className="font-semibold text-white text-sm">{spk.name}</p>
                    <p className="text-indigo-400 font-medium">{spk.role}</p>
                    <p className="text-slate-400">{spk.org}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
