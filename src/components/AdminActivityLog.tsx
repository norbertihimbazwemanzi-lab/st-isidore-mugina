import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, Clock, UserCheck, Search, Filter, 
  Trash2, Download, Printer, AlertCircle, CheckCircle2, 
  Key, UserPlus, FileText, Calendar, Image, Database, 
  RefreshCw, Globe, HelpCircle 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { AdminLogEntry, AdminActionCategory } from '../types';

interface AdminActivityLogProps {
  onClose?: () => void;
}

export const AdminActivityLog: React.FC<AdminActivityLogProps> = ({ onClose }) => {
  const { adminActivityLogs, clearActivityLogs, exportDataBackup, isBackendConnected } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showVercelGuide, setShowVercelGuide] = useState(false);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return adminActivityLogs.filter((log) => {
      const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !searchQuery ||
        log.title.toLowerCase().includes(q) ||
        log.description.toLowerCase().includes(q) ||
        log.adminName.toLowerCase().includes(q) ||
        (log.targetId && log.targetId.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [adminActivityLogs, categoryFilter, searchQuery]);

  // Export logs to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Admin Name', 'Category', 'Action Title', 'Description', 'Target ID'];
    const rows = adminActivityLogs.map((l) => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.adminName}"`,
      `"${l.category}"`,
      `"${l.title.replace(/"/g, '""')}"`,
      `"${l.description.replace(/"/g, '""')}"`,
      `"${l.targetId || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gs-mugina-admin-audit-log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryBadge = (category: AdminActionCategory) => {
    switch (category) {
      case 'enroll_student':
        return {
          icon: <UserPlus className="w-3.5 h-3.5 text-emerald-400" />,
          label: 'Student Enrolled',
          bg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300',
        };
      case 'update_marks':
        return {
          icon: <FileText className="w-3.5 h-3.5 text-cyan-400" />,
          label: 'Marks Updated',
          bg: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300',
        };
      case 'delete_student':
        return {
          icon: <Trash2 className="w-3.5 h-3.5 text-rose-400" />,
          label: 'Student Removed',
          bg: 'bg-rose-950/80 border-rose-500/40 text-rose-300',
        };
      case 'update_credentials':
        return {
          icon: <Key className="w-3.5 h-3.5 text-amber-400" />,
          label: 'Credentials Assigned',
          bg: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
        };
      case 'add_teacher':
      case 'edit_teacher':
      case 'delete_teacher':
        return {
          icon: <UserCheck className="w-3.5 h-3.5 text-purple-400" />,
          label: 'Faculty Staff',
          bg: 'bg-purple-950/80 border-purple-500/40 text-purple-300',
        };
      case 'publish_news':
      case 'delete_news':
        return {
          icon: <Globe className="w-3.5 h-3.5 text-blue-400" />,
          label: 'News Bulletin',
          bg: 'bg-blue-950/80 border-blue-500/40 text-blue-300',
        };
      case 'add_event':
      case 'delete_event':
        return {
          icon: <Calendar className="w-3.5 h-3.5 text-teal-400" />,
          label: 'School Calendar',
          bg: 'bg-teal-950/80 border-teal-500/40 text-teal-300',
        };
      case 'upload_media':
        return {
          icon: <Image className="w-3.5 h-3.5 text-pink-400" />,
          label: 'Media / Logo',
          bg: 'bg-pink-950/80 border-pink-500/40 text-pink-300',
        };
      case 'system_sync':
      default:
        return {
          icon: <Database className="w-3.5 h-3.5 text-amber-400" />,
          label: 'System & GSC',
          bg: 'bg-slate-800 border-slate-700 text-slate-300',
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Administrative Audit Trail & Security Log</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Headteacher Activity & Audit Log
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Immutable log tracking every administrative action performed by Headteacher <strong>Habiyaremye Charles</strong>, including student enrollment, mark modifications, credential assignment, and public portal bulletins.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowVercelGuide(!showVercelGuide)}
            className="px-3 py-2 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Learn how cross-computer sync works on Vercel"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Vercel Multi-Computer Guide</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all recorded administrative activity logs?')) {
                clearActivityLogs();
              }
            }}
            className="px-3 py-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Clear Log</span>
          </button>
        </div>
      </div>

      {/* Vercel Multi-Computer Sync Explanation Modal / Banner */}
      {showVercelGuide && (
        <div className="p-6 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 text-slate-200 space-y-4 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 text-indigo-300 font-bold text-sm">
              <Globe className="w-5 h-5 text-indigo-400" />
              <span>Why changes made on one computer don't immediately appear on other computers when hosted on Vercel:</span>
            </div>
            <button
              onClick={() => setShowVercelGuide(false)}
              className="text-slate-400 hover:text-white text-xs px-2 py-1"
            >
              ✕
            </button>
          </div>

          <div className="text-xs space-y-3 leading-relaxed text-slate-300">
            <p>
              <strong>1. Browser LocalStorage Scoping:</strong> By default in web applications, modifications made in your browser (enrolling students, updating marks) are stored inside your device's <code>localStorage</code>. Computer A and Computer B have physically isolated storage.
            </p>
            <p>
              <strong>2. Vercel Serverless Architecture:</strong> Vercel deploys static frontend files and stateless serverless functions. It does not provide a persistent writable hard drive that survives between visits.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
              <strong className="text-amber-300 block">How to publish changes to ALL computers worldwide:</strong>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>
                  <strong>Method 1 (Zero-Cost Git Push):</strong> Click <strong>"Export Data Backup"</strong> in the top-right of the Admin Suite to download the updated <code>gs-mugina-school-data.json</code>, place it into your project's repository, and push to GitHub. Vercel will automatically rebuild and deploy the new data to every user globally within 60 seconds.
                </li>
                <li>
                  <strong>Method 2 (Cloud Database):</strong> Connect a managed database (Firebase Firestore or PostgreSQL) so edits update centrally across every smartphone, laptop, and tablet instantly without re-deploying.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, student, teacher..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">All Action Categories ({adminActivityLogs.length})</option>
            <option value="enroll_student">Student Enrollment</option>
            <option value="update_marks">Academic Marks Updated</option>
            <option value="delete_student">Student Removed</option>
            <option value="update_credentials">Credentials & Passcodes</option>
            <option value="add_teacher">Staff / Teachers</option>
            <option value="publish_news">News & Bulletins</option>
            <option value="add_event">Calendar Events</option>
            <option value="upload_media">Media & Logos</option>
            <option value="system_sync">System & GSC Sync</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Action & Details</th>
                <th className="py-3 px-4">Target / ID</th>
                <th className="py-3 px-4 text-right">Authorized Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-semibold">No activity logs found</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {searchQuery ? 'Try clearing your search query.' : 'Administrative actions will automatically log here.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const badge = getCategoryBadge(log.category);
                  return (
                    <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                      {/* Timestamp */}
                      <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{log.timestamp}</span>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${badge.bg}`}>
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      {/* Title & Description */}
                      <td className="py-3 px-4 max-w-md">
                        <strong className="text-white block text-xs font-bold mb-0.5">
                          {log.title}
                        </strong>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {log.description}
                        </p>
                      </td>

                      {/* Target ID / Reg No */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {log.targetId ? (
                          <span className="font-mono text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                            {log.targetId}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-[11px]">—</span>
                        )}
                      </td>

                      {/* Admin Name */}
                      <td className="py-3 px-4 whitespace-nowrap text-right font-medium text-slate-300">
                        <span className="text-emerald-400 font-semibold text-[11px] block">
                          {log.adminName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ID: 280508200528
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
