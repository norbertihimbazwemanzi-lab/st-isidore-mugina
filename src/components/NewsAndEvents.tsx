import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Bell, Key, Plus, X } from 'lucide-react';
import { NewsItem } from '../types';
import { useSchool } from '../context/SchoolContext';

interface NewsAndEventsProps {
  onOpenAdminSuite?: () => void;
}

export const NewsAndEvents: React.FC<NewsAndEventsProps> = ({ onOpenAdminSuite }) => {
  const { news, events, isAdminAuthenticated } = useSchool();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* News & Bulletins (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                  <Bell className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Campus Bulletins</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Latest School News
                </h3>
              </div>

              {onOpenAdminSuite && (
                <button
                  onClick={onOpenAdminSuite}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Key className="w-3 h-3 text-slate-900" />
                  <span>{isAdminAuthenticated ? 'Publish News / Events' : 'Headteacher: Publish (Code)'}</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-emerald-800">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.date}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">By <strong>{item.author}</strong></span>
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="text-emerald-800 hover:text-emerald-950 font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Statement</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Calendar & Upcoming Events (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Term Calendar</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Upcoming Events
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex gap-4"
                >
                  {/* Event Date Block */}
                  <div className="w-14 h-16 rounded-xl bg-emerald-800 text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                      {evt.date.includes(',') ? evt.date.split(',')[1]?.trim().split(' ')[0] || '2026' : 'EVENT'}
                    </span>
                    <span className="text-base sm:text-lg font-black font-mono">
                      {evt.date.includes(' ') ? evt.date.split(' ')[2]?.replace(',', '') || evt.date.split(' ')[1] || '15' : '15'}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="text-[11px] font-semibold text-emerald-800 uppercase mb-1">
                      {evt.category}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-slate-600 mb-2 font-normal line-clamp-2">
                      {evt.description}
                    </p>
                    <div className="flex flex-col text-[11px] text-slate-500 gap-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {evt.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {evt.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Term Dates Summary Quick Table */}
              <div className="p-5 rounded-2xl bg-emerald-950 text-white">
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
                  2026 Academic Term Dates (MINEDUC)
                </div>
                <div className="space-y-2 text-xs divide-y divide-emerald-800/60">
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">Term 1:</span>
                    <span className="font-mono text-emerald-200">Jan 8 - Apr 4, 2026</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">Term 2:</span>
                    <span className="font-mono text-emerald-200">Apr 21 - Jul 18, 2026</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">Term 3:</span>
                    <span className="font-mono text-emerald-200">Aug 10 - Nov 6, 2026</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">National Exams:</span>
                    <span className="font-mono text-amber-300">Nov 16 - Nov 30, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
                  <span>{selectedNews.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedNews.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedNews.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              <p className="font-medium text-slate-900">
                {selectedNews.summary}
              </p>
              <p>
                {selectedNews.content}
              </p>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                Published by: <strong className="text-slate-800">{selectedNews.author}</strong> · GS St Isidore Mugina, Kamonyi
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
              >
                Close Bulletin
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
