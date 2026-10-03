import React, { useState } from 'react';
import { 
  Menu, X, GraduationCap, UserCheck, ArrowRight, 
  Lock, Key, Image, ShieldCheck 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPortal: () => void;
  onOpenApply: () => void;
  onOpenLogin?: () => void;
  onOpenMediaManager?: () => void;
  onOpenAdminSuite?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPortal,
  onOpenApply,
  onOpenLogin,
  onOpenMediaManager,
  onOpenAdminSuite,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { schoolLogo, isAdminAuthenticated, currentAuthenticatedStaff } = useSchool();

  // Navigation Links matching user specification:
  // home, about, classes, e-learning, school fees, staff, admission, faq, contact, result portal, apply online
  const primaryNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'streams', label: 'Classes' },
    { id: 'elearning', label: 'E-Learning' },
    { id: 'performance-trends', label: 'Trends' },
    { id: 'fees', label: 'School Fees' },
    { id: 'staff', label: 'Staff' },
    { id: 'admissions', label: 'Admission' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* School Brand / Wordmark with Custom School Website Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 group cursor-pointer shrink-0 mr-2"
          >
            {schoolLogo ? (
              <img
                src={schoolLogo}
                alt="GS St Isidore Mugina Logo"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-contain bg-white shadow-sm border border-emerald-600/30 group-hover:scale-105 transition-transform p-0.5"
              />
            ) : (
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white flex items-center justify-center shadow-sm border border-emerald-600/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-emerald-100" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                GS St Isidore Mugina
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Mugina Sector · Kamonyi
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links: Home, About, Classes, E-Learning, School Fees, Staff, Admission, FAQ, Contact */}
          <nav className="hidden xl:flex items-center gap-3 2xl:gap-4 text-xs lg:text-[13px] font-medium text-slate-600">
            {primaryNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 relative transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === link.id
                    ? 'text-emerald-800 font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Links & Authentication Controls */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Admin Active Controls */}
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-1.5">
                {onOpenMediaManager && (
                  <button
                    onClick={onOpenMediaManager}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
                    title="Upload and edit images, school logo, and export to GitHub"
                  >
                    <Image className="w-3.5 h-3.5 text-amber-700" />
                    <span>Media & Logo</span>
                  </button>
                )}
                {onOpenAdminSuite && (
                  <button
                    onClick={onOpenAdminSuite}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
                    title="Headteacher Administration Suite"
                  >
                    <Key className="w-3.5 h-3.5 text-slate-950" />
                    <span>Admin Active</span>
                  </button>
                )}
              </div>
            ) : (
              /* Universal Login Trigger */
              onOpenLogin && (
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                  title="Universal Login for Admin, Teachers, and Students"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                  <span>Login</span>
                </button>
              )
            )}

            {/* Result Portal */}
            <button
              onClick={() => {
                setActiveTab('portal');
                onOpenPortal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              title="Access Official Student Terminal Results"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Result Portal</span>
            </button>
            
            {/* Apply Online */}
            <button
              onClick={() => {
                setActiveTab('admissions');
                onOpenApply();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap hover:scale-[1.02]"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3 h-3 text-emerald-200" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 xl:hidden">
            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                className="px-2 py-1 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-300 rounded-md flex items-center gap-1"
              >
                <Lock className="w-3 h-3 text-slate-600" />
                <span>{isAdminAuthenticated ? 'Admin' : 'Login'}</span>
              </button>
            )}

            <button
              onClick={onOpenPortal}
              className="lg:hidden px-2.5 py-1 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-300 rounded-md"
            >
              Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with all 11 items in exact sequence:
          Home, About, Classes, E-Learning, School Fees, Staff, Admission, FAQ, Contact, Result Portal, Apply Online */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {primaryNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-emerald-50 text-emerald-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Admin Controls in Mobile Drawer */}
          {isAdminAuthenticated && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-amber-900 block">Administrator Tools:</span>
              <div className="grid grid-cols-2 gap-2">
                {onOpenMediaManager && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMediaManager();
                    }}
                    className="p-2 bg-white text-slate-900 font-semibold rounded-lg border border-amber-300 text-center flex items-center justify-center gap-1"
                  >
                    <Image className="w-3.5 h-3.5 text-amber-600" />
                    <span>Media & Logo</span>
                  </button>
                )}
                {onOpenAdminSuite && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdminSuite();
                    }}
                    className="p-2 bg-amber-400 text-slate-950 font-bold rounded-lg text-center flex items-center justify-center gap-1"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Admin Suite</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Mobile Bottom Action Items: Result Portal & Apply Online */}
          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab('portal');
                onOpenPortal();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Result Portal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab('admissions');
                onOpenApply();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3 h-3 text-emerald-200" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
