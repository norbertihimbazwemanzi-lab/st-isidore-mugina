import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Phone, CheckCheck, Sparkles, 
  Clock, ShieldCheck, GraduationCap, ArrowUpRight, HelpCircle,
  Minimize2, Maximize2, ExternalLink
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface ChatMessage {
  id: string;
  sender: 'parent' | 'school';
  text: string;
  timestamp: string;
  quickAction?: {
    label: string;
    sectionId?: string;
    phoneCall?: boolean;
  };
}

interface LiveChatWidgetProps {
  onNavigateToSection?: (sectionId: string) => void;
  onOpenPortal?: () => void;
  onOpenApply?: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onNavigateToSection,
  onOpenPortal,
  onOpenApply,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'school',
      text: 'Muraho! Welcome to GS St Isidore Mugina Parent Helpdesk. How can we help you today with admissions, school feeding (18,000 RWF), term dates, or student results?',
      timestamp: 'Just now',
    },
  ]);

  const quickPrompts = [
    { label: '🗓️ Term Dates', query: 'What are the current term dates and holiday schedule?' },
    { label: '🍲 School Lunch Fee', query: 'How much is the school feeding fee and how does lunch work?' },
    { label: '🎒 Supply Lists', query: 'What are the required school supplies and stationery?' },
    { label: '📝 Enroll 2026/27', query: 'How do I apply for 2026/27 admission?' },
    { label: '📊 Student Results', query: 'How can I check student term results and report cards?' },
    { label: '📞 Call Headteacher', query: 'How can I speak directly with Headteacher Habiyaremye Charles?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [isOpen, messages, isTyping]);

  const generateSchoolResponse = (query: string): { reply: string; quickAction?: ChatMessage['quickAction'] } => {
    const q = query.toLowerCase();

    if (q.includes('date') || q.includes('calendar') || q.includes('term') || q.includes('holiday')) {
      return {
        reply: 'Official MINEDUC Academic Calendar for 2025/2026:\n• Term 1: Sep 8 – Dec 19, 2025\n• Term 2 (Active Now): Jan 5 – Apr 3, 2026\n• Term 3: Apr 20 – Jul 10, 2026 (including PLE & NESA National Exams).',
        quickAction: { label: 'View Academic Calendar', sectionId: 'faq' },
      };
    }

    if (q.includes('lunch') || q.includes('feed') || q.includes('food') || q.includes('18000') || q.includes('meal')) {
      return {
        reply: 'The parental school feeding contribution is 18,000 RWF per term, subsidized by the Government of Rwanda. Every pupil receives hot balanced lunch daily (beans, maize posho/ugali, rice, and vegetables). Payment is receipted by Bursar Letitia (Comptable).',
        quickAction: { label: 'Calculate Fees & Lunch', sectionId: 'fees' },
      };
    }

    if (q.includes('supply') || q.includes('supplies') || q.includes('stationery') || q.includes('book') || q.includes('pen') || q.includes('uniform')) {
      return {
        reply: 'Standardized supplies include 96-page ruled exercise books (grid for Math, 4-line for languages), Oxford geometry set for P4–S3, scientific calculator for S1–S3, and pencils/pens. Uniform: Dark emerald-green V-neck sweater with school crest, white shirt/blouse, and khaki/charcoal trousers or skirt.',
        quickAction: { label: 'View Full Supply Checklist', sectionId: 'faq' },
      };
    }

    if (q.includes('result') || q.includes('mark') || q.includes('grade') || q.includes('report') || q.includes('bulletin')) {
      return {
        reply: 'You can check your child\'s verified term marks and download printable report cards instantly online! Enter your child\'s Student Registration Number (e.g., MUG-2026-P6A-08) in our Results Portal.',
        quickAction: { label: 'Open Results Portal', sectionId: 'portal' },
      };
    }

    if (q.includes('admission') || q.includes('apply') || q.includes('enroll') || q.includes('register')) {
      return {
        reply: 'Online admissions for 2026/2027 are open across Nursery (Baby-Top), Primary (P1-P6), and Secondary (S1-S3). Required documents: Birth certificate (Icyemezo cy\'amavuko), previous report card (Bulletin), transfer letter, and 2 passport photos.',
        quickAction: { label: 'Start Online Application', sectionId: 'admissions' },
      };
    }

    if (q.includes('headteacher') || q.includes('charles') || q.includes('director') || q.includes('principal') || q.includes('call') || q.includes('contact') || q.includes('phone')) {
      return {
        reply: 'Headteacher Habiyaremye Charles and Chief Bursar Letitia are available on campus in Mugina Sector. Direct official telephone line: 0788249507. Office hours: Monday–Friday from 7:30 AM to 5:00 PM.',
        quickAction: { label: 'Call 0788249507', phoneCall: true },
      };
    }

    if (q.includes('fee') || q.includes('pay') || q.includes('tuition') || q.includes('cost')) {
      return {
        reply: 'Tuition is free as GS St Isidore Mugina is a Government-Aided day school. The only required term contribution is the subsidized School Feeding fee (18,000 RWF/term) and minor PTA dues (2,000 RWF/term).',
        quickAction: { label: 'Explore Fee Breakdown', sectionId: 'fees' },
      };
    }

    // Default helpful guidance
    return {
      reply: `Thank you for your message! Our administration desk is at your service. For specific inquiries regarding student records, fees, or class placement, you can also speak directly with Headteacher Habiyaremye Charles at ${SCHOOL_INFO.phonePrimary}.`,
      quickAction: { label: 'Call Administration', phoneCall: true },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `parent-${Date.now()}`,
      sender: 'parent',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate authentic typing response time
    setTimeout(() => {
      const response = generateSchoolResponse(text);
      const schoolMessage: ChatMessage = {
        id: `school-${Date.now()}`,
        sender: 'school',
        text: response.reply,
        timestamp: 'Just now',
        quickAction: response.quickAction,
      };
      setMessages((prev) => [...prev, schoolMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleActionClick = (action: NonNullable<ChatMessage['quickAction']>) => {
    if (action.phoneCall) {
      window.location.href = `tel:${SCHOOL_INFO.phonePrimary}`;
      return;
    }

    if (action.sectionId) {
      if (action.sectionId === 'portal' && onOpenPortal) {
        onOpenPortal();
      } else if (action.sectionId === 'admissions' && onOpenApply) {
        onOpenApply();
      } else if (onNavigateToSection) {
        onNavigateToSection(action.sectionId);
      }
    }
  };

  return (
    <aside aria-label="Parent live chat" className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-white font-bold text-sm">
                  <GraduationCap className="w-5 h-5 text-emerald-200" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">GS St Isidore Mugina</h3>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Parent Helpdesk · Active</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={`https://wa.me/250788249507?text=${encodeURIComponent('Hello GS St Isidore Mugina, I am a parent with an inquiry:')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Continue on WhatsApp"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 text-xs">
            
            {/* Trust badge header notice */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 text-[11px] text-emerald-900 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Official Kamonyi District Administration Desk · Tel: <strong>0788249507</strong></span>
            </div>

            {/* Message History */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'parent' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs whitespace-pre-line leading-relaxed ${
                    msg.sender === 'parent'
                      ? 'bg-emerald-800 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Optional Quick Action inside bubble */}
                  {msg.quickAction && (
                    <button
                      onClick={() => handleActionClick(msg.quickAction!)}
                      className="mt-2 w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{msg.quickAction.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                    </button>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Real-time Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-white border border-slate-200 rounded-2xl w-fit rounded-tl-none animate-pulse">
                <span className="text-[11px] text-slate-500 font-medium">Administration is replying</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Carousel / Chips */}
          <div className="p-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium bg-white text-slate-700 border border-slate-300 hover:border-emerald-500 hover:text-emerald-900 transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question (e.g. fees, calendar, supplies)..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0 shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-full shadow-2xl hover:shadow-emerald-900/30 hover:scale-105 transition-all duration-200 cursor-pointer border border-emerald-600/30"
        aria-label="Open Parent Live Chat"
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MessageSquare className="w-5 h-5 text-white" />
          )}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-900 rounded-full animate-ping" />
          )}
        </div>

        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          {isOpen ? 'Close Live Desk' : 'Ask Live Desk'}
        </span>

        {!isOpen && unreadCount > 0 && (
          <span className="bg-amber-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

    </aside>
  );
};
