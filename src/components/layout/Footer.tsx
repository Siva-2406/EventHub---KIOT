import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                E
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">EventHub</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Every College Event. One Place.</p>
            <p className="text-xs text-slate-400">
              Designed for Knowledge Institute of Technology (KIOT) and verified partner institutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => navigateTo('landing')}
              className="hover:text-indigo-600 transition-colors"
            >
              About EventHub
            </button>
            <button
              onClick={() => navigateTo('discovery')}
              className="hover:text-indigo-600 transition-colors"
            >
              Explore Events
            </button>
            <button
              onClick={() => navigateTo('feedback')}
              className="hover:text-indigo-600 transition-colors"
            >
              Submit Feedback
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                alert('For campus event queries: eventhub@kiot.ac.in | Student Affairs Desk, KIOT Salem');
              }}
              className="hover:text-indigo-600 transition-colors"
            >
              Contact Desk
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400 font-normal">Privacy & Terms</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 EventHub. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">
            "Discover. Register. Schedule. Never Miss an Event."
          </p>
        </div>
      </div>
    </footer>
  );
};
