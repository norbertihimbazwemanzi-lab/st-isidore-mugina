import React, { useState } from 'react';
import { 
  Search, BookOpen, Download, FileText, CheckCircle2, 
  Eye, X, Library, AlertCircle, Plus, Upload, Printer, 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, 
  Sparkles, Check, Trash2, Calendar, User, Tag, Lock, ShieldCheck 
} from 'lucide-react';
import { EResource, PDFDocumentPage } from '../types';
import { useSchool } from '../context/SchoolContext';
import { SCHOOL_INFO } from '../data/schoolData';

export const ELearningHub: React.FC = () => {
  const { 
    libraryDocuments, 
    addLibraryDocument, 
    deleteLibraryDocument, 
    isAdminAuthenticated,
    currentAuthenticatedStaff,
  } = useSchool();

  const isStaffLoggedIn = isAdminAuthenticated || !!currentAuthenticatedStaff;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeReadingDoc, setActiveReadingDoc] = useState<EResource | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // New Document Form State
  const [docForm, setDocForm] = useState({
    title: '',
    code: '',
    level: 'Primary 6 (PLE)',
    category: 'past_papers' as 'past_papers' | 'literacy' | 'notes' | 'curriculum',
    subject: 'Mathematics',
    year: '2026',
    description: '',
    uploadedBy: 'Headteacher Habiyaremye Charles',
    pageHeading: 'SECTION 1: CORE EXERCISES & SOLUTIONS',
    pageText: '',
    pdfDataUrl: '' as string,
    fileName: '',
    fileSize: '2.4 MB',
  });

  const categories = [
    { id: 'all', label: 'All Educational Documents' },
    { id: 'past_papers', label: 'PLE & S3 National Exams' },
    { id: 'literacy', label: 'National Library Decodable Readers' },
    { id: 'notes', label: 'CBC Revision Handouts' },
    { id: 'curriculum', label: 'Syllabus & Worksheets' },
  ];

  const filteredResources = libraryDocuments.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenReader = (doc: EResource) => {
    setActiveReadingDoc(doc);
    setCurrentPageIndex(0);
    setZoomLevel(100);
  };

  const handleCloseReader = () => {
    setActiveReadingDoc(null);
    setCurrentPageIndex(0);
    setZoomLevel(100);
  };

  const handleDownload = (resource: EResource) => {
    // If it has a real PDF Data URL, download it directly
    if (resource.pdfDataUrl) {
      const link = document.createElement('a');
      link.href = resource.pdfDataUrl;
      link.download = `${resource.code || 'document'}_${resource.title.replace(/\s+/g, '_')}.pdf`;
      link.click();
    } else {
      // Create a downloadable HTML document version of the reading material
      const docHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${resource.title}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            .header { border-bottom: 2px solid #059669; padding-bottom: 15px; margin-bottom: 25px; }
            .badge { background: #ecfdf5; color: #047857; font-weight: bold; padding: 3px 8px; border-radius: 4px; font-size: 12px; }
            h1 { font-size: 22px; color: #064e3b; margin: 10px 0; }
            .page-block { margin-bottom: 40px; page-break-after: always; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
            .heading { font-size: 15px; font-weight: bold; color: #0f172a; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
            pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div><span class="badge">GS ST ISIDORE MUGINA · DIGITAL LIBRARY</span></div>
            <h1>${resource.title}</h1>
            <p><strong>Code:</strong> ${resource.code} | <strong>Level:</strong> ${resource.level} | <strong>Subject:</strong> ${resource.subject} | <strong>Year:</strong> ${resource.year}</p>
          </div>
          ${resource.pages && resource.pages.length > 0 ? resource.pages.map(p => `
            <div class="page-block">
              <div class="heading">Page ${p.pageNumber}: ${p.heading || ''}</div>
              <pre>${p.text}</pre>
            </div>
          `).join('') : `<p>${resource.description}</p>`}
        </body>
        </html>
      `;
      const blob = new Blob([docHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resource.code || 'document'}_${resource.title.replace(/\s+/g, '_')}.html`;
      link.click();
      URL.revokeObjectURL(url);
    }

    setDownloadSuccessToast(`"${resource.title}" (${resource.fileSize}) is saved to your device!`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 4500);
  };

  const handlePrintDocument = () => {
    window.print();
  };

  // Handle local PDF file upload
  const handlePdfFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const reader = new FileReader();
    reader.onload = () => {
      setDocForm(prev => ({
        ...prev,
        pdfDataUrl: reader.result as string,
        fileName: file.name,
        fileSize: sizeInMb,
        title: prev.title || file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleInsertDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title.trim()) return;

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateFormatted = new Date().toLocaleDateString('en-US', options);

    const generatedCode = docForm.code.trim() || 
      `${docForm.level.slice(0, 2).toUpperCase()}-${docForm.subject.slice(0, 3).toUpperCase()}-${new Date().getFullYear().toString().slice(-2)}`;

    // Prepare pages
    const pagesArray: PDFDocumentPage[] = [];
    if (docForm.pageText.trim()) {
      pagesArray.push({
        pageNumber: 1,
        heading: docForm.pageHeading || 'PAGE 1: PEDAGOGICAL NOTES & QUESTIONS',
        text: docForm.pageText.trim(),
      });
    } else {
      pagesArray.push({
        pageNumber: 1,
        heading: 'OFFICIAL DOCUMENT SUMMARY & INSTRUCTIONS',
        text: docForm.description || 'Full PDF document uploaded to the GS St Isidore Mugina digital repository.',
      });
    }

    addLibraryDocument({
      title: docForm.title.trim(),
      code: generatedCode,
      level: docForm.level,
      category: docForm.category,
      subject: docForm.subject,
      fileSize: docForm.fileSize || '2.5 MB',
      year: docForm.year || '2026',
      description: docForm.description.trim() || `Official educational document for ${docForm.level} ${docForm.subject}.`,
      uploadedBy: docForm.uploadedBy || 'Headteacher Habiyaremye Charles',
      uploadDate: dateFormatted,
      pages: pagesArray,
      pdfDataUrl: docForm.pdfDataUrl || undefined,
    });

    // Reset and close
    setIsInsertModalOpen(false);
    setDocForm({
      title: '',
      code: '',
      level: 'Primary 6 (PLE)',
      category: 'past_papers',
      subject: 'Mathematics',
      year: '2026',
      description: '',
      uploadedBy: 'Headteacher Habiyaremye Charles',
      pageHeading: 'SECTION 1: CORE EXERCISES & SOLUTIONS',
      pageText: '',
      pdfDataUrl: '',
      fileName: '',
      fileSize: '2.4 MB',
    });
  };

  const currentDocPages = activeReadingDoc?.pages || [];
  const activePage = currentDocPages[currentPageIndex];

  return (
    <section id="elearning" className="py-16 sm:py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with National Library Reference & Insert Document Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <Library className="w-4 h-4 text-emerald-400" />
              <span>National Library & REB Digital Repository</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Pre-Primary · Primary · Ordinary Level</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Digital Library & PDF Reading Room
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Serving students and teachers of <strong>GS St Isidore Mugina</strong>. Browse past national PLE and S3 exam papers, read decodable books curated with the <strong>National Library Services (Rwanda Cultural Heritage Academy)</strong>, and open PDF documents directly on screen.
            </p>
          </div>

          {/* Action Button: Staff-Protected Upload Area */}
          <div className="shrink-0 flex flex-wrap items-center gap-2.5">
            {isStaffLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-600/50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Faculty: <strong>{currentAuthenticatedStaff ? currentAuthenticatedStaff.name : 'Headteacher Admin'}</strong></span>
                </span>
                <button
                  onClick={() => {
                    if (currentAuthenticatedStaff) {
                      setDocForm(prev => ({
                        ...prev,
                        uploadedBy: currentAuthenticatedStaff.name,
                      }));
                    }
                    setIsInsertModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-emerald-400/40 hover:scale-[1.02]"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Lesson Plan / Guide (PDF)</span>
                </button>
              </div>
            ) : (
              <a
                href="#staff"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-2 shadow-xs"
                title="Only teachers and staff with official credentials can upload curriculum resources"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Staff Login to Upload Plans</span>
              </a>
            )}
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by exam code (e.g. PLE, S3-SCI), subject, or grade level..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 text-sm text-white placeholder-slate-400 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Download Toast Notification */}
        {downloadSuccessToast && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-900/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{downloadSuccessToast}</span>
            </div>
            <button
              onClick={() => setDownloadSuccessToast(null)}
              className="text-emerald-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-6 flex flex-col justify-between hover:border-emerald-500/60 transition-all hover:bg-slate-800/90 group"
            >
              <div>
                {/* Metadata Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-mono text-emerald-400 font-semibold">{res.code}</span>
                  <span>{res.year} · {res.fileSize}</span>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-700/40 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {res.title}
                    </h3>
                    <div className="text-[11px] text-slate-400 mt-1 font-medium">
                      Level: <span className="text-slate-200">{res.level}</span> · Subject: <span className="text-slate-200">{res.subject}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4 line-clamp-2">
                  {res.description}
                </p>

                {res.uploadedBy && (
                  <div className="text-[10px] text-slate-400 mb-3 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-slate-500" />
                    <span>Uploaded by: <strong className="text-slate-300">{res.uploadedBy}</strong></span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                  {res.downloads.toLocaleString()} reads
                </span>

                <div className="flex items-center gap-2">
                  {/* Primary "Click to Open & Read" Button */}
                  <button
                    onClick={() => handleOpenReader(res)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    title="Click to Open and Read this PDF Document"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open & Read</span>
                  </button>

                  <button
                    onClick={() => handleDownload(res)}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white transition-colors cursor-pointer"
                    title="Download document to device"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  {(isAdminAuthenticated || (currentAuthenticatedStaff && res.uploadedBy?.includes(currentAuthenticatedStaff.name))) && (
                    <button
                      onClick={() => deleteLibraryDocument(res.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/50 transition-colors"
                      title="Remove document from library"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white mb-1">No learning resources found</h4>
            <p className="text-xs text-slate-400">
              Try searching with another keyword or insert a new PDF document.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-3 py-1.5 text-xs text-emerald-400 border border-emerald-500/50 rounded-lg hover:bg-emerald-950 cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. INTERACTIVE PDF DOCUMENT READER MODAL (OPEN IT THEN READ)              */}
      {/* ========================================================================= */}
      {activeReadingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full h-[94vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
            
            {/* Top Reader Toolbar */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                    <span>{activeReadingDoc.code}</span>
                    <span>·</span>
                    <span>{activeReadingDoc.level}</span>
                    <span>·</span>
                    <span>{activeReadingDoc.subject}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl">
                    {activeReadingDoc.title}
                  </h3>
                </div>
              </div>

              {/* Reader Controls: Page switcher, Zoom, Print, Download, Close */}
              <div className="flex items-center gap-2">
                {/* Page Navigation if multiple pages exist */}
                {currentDocPages.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 text-xs">
                    <button
                      onClick={() => setCurrentPageIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentPageIndex === 0}
                      className="p-1 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[11px] text-slate-300">
                      Page {currentPageIndex + 1} of {currentDocPages.length}
                    </span>
                    <button
                      onClick={() => setCurrentPageIndex(prev => Math.min(currentDocPages.length - 1, prev + 1))}
                      disabled={currentPageIndex === currentDocPages.length - 1}
                      className="p-1 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-1.5 py-1 rounded-lg border border-slate-700 text-xs">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
                    className="p-1 text-slate-300 hover:text-white cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] w-9 text-center text-slate-400">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(140, prev + 10))}
                    className="p-1 text-slate-300 hover:text-white cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Print button */}
                <button
                  onClick={handlePrintDocument}
                  className="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  title="Print this document"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                {/* Download PDF button */}
                <button
                  onClick={() => handleDownload(activeReadingDoc)}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Save PDF file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                {/* Close Reader */}
                <button
                  onClick={handleCloseReader}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  aria-label="Close Reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Reading View Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950 flex flex-col items-center">
              
              {/* If actual uploaded PDF data URL exists, show rich embedded iframe/viewer */}
              {activeReadingDoc.pdfDataUrl ? (
                <div className="w-full h-full max-w-4xl bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
                  <iframe
                    src={activeReadingDoc.pdfDataUrl}
                    title={activeReadingDoc.title}
                    className="w-full flex-1 border-none bg-white min-h-[600px]"
                  />
                </div>
              ) : (
                /* Crisp A4 Document Paper Sheet for Structured Syllabus & Past Papers */
                <div 
                  className="w-full max-w-3xl bg-white text-slate-900 rounded-xl shadow-2xl p-6 sm:p-12 transition-all duration-200 border border-slate-300 font-sans"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                >
                  {/* Official Header on every page */}
                  <div className="pb-4 mb-6 border-b-2 border-emerald-800 text-center">
                    <div className="text-[10px] tracking-widest text-slate-600 font-bold uppercase">
                      REPUBLIC OF RWANDA · RWANDA BASIC EDUCATION BOARD (REB) / NESA
                    </div>
                    <div className="text-xs font-bold text-emerald-900 mt-0.5">
                      GROUPE SCOLAIRE SAINT ISIDORE MUGINA · DIGITAL LIBRARY REPOSITORY
                    </div>
                    <div className="text-[11px] text-slate-500">
                      National Library Services Partnership · Kamonyi District
                    </div>

                    <div className="mt-3 py-1 px-3 bg-emerald-50 border border-emerald-200 rounded inline-block">
                      <span className="text-xs font-mono font-bold text-emerald-950">
                        {activeReadingDoc.code} · {activeReadingDoc.subject} ({activeReadingDoc.level})
                      </span>
                    </div>
                  </div>

                  {/* Document Title & Abstract */}
                  <div className="mb-6">
                    <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                      {activeReadingDoc.title}
                    </h1>
                    <p className="text-xs text-slate-600 mt-1">
                      {activeReadingDoc.description}
                    </p>
                  </div>

                  {/* Current Active Page Content */}
                  {activePage ? (
                    <div className="space-y-4">
                      {activePage.heading && (
                        <div className="p-2.5 bg-slate-100 border-l-4 border-emerald-600 text-xs font-bold text-slate-900 uppercase tracking-wide">
                          {activePage.heading}
                        </div>
                      )}

                      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-wrap bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono">
                        {activePage.text}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-slate-50 rounded-xl text-slate-700 text-xs">
                      <p>{activeReadingDoc.description}</p>
                    </div>
                  )}

                  {/* Page Footer */}
                  <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                    <span>GS St Isidore Mugina · E-Learning & Reading Program</span>
                    <span className="font-mono">
                      Page {currentPageIndex + 1} of {currentDocPages.length || 1}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Reader Footer Quick Navigation Bar */}
            {currentDocPages.length > 1 && (
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs px-6 shrink-0">
                <button
                  onClick={() => setCurrentPageIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentPageIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Page</span>
                </button>

                <div className="flex items-center gap-1">
                  {currentDocPages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPageIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                        currentPageIndex === idx
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPageIndex(prev => Math.min(currentDocPages.length - 1, prev + 1))}
                  disabled={currentPageIndex === currentDocPages.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 cursor-pointer flex items-center gap-1"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INSERT / UPLOAD PDF DOCUMENT MODAL                                     */}
      {/* ========================================================================= */}
      {isInsertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
            
            <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Insert PDF Document into Digital Library
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload a syllabus paper, PLE/S3 national exams, or decodable storybooks for students to read.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsInsertModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInsertDocumentSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              
              {/* PDF File Picker (Upload Real PDF) */}
              <div className="p-4 rounded-xl bg-slate-800/70 border-2 border-dashed border-emerald-600/50 hover:border-emerald-500 transition-colors">
                <label className="block text-slate-300 font-semibold mb-1">
                  Upload PDF File from Computer / Phone (.pdf)
                </label>
                <input
                  type="file"
                  accept="application/pdf, .pdf"
                  onChange={handlePdfFileUpload}
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                />
                {docForm.fileName && (
                  <div className="mt-2 text-emerald-400 flex items-center gap-1.5 font-mono text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Loaded PDF: <strong>{docForm.fileName}</strong> ({docForm.fileSize})</span>
                  </div>
                )}
                <p className="text-[10px] text-slate-500 mt-1">
                  Once uploaded, students can click this document to immediately open and read it on the screen.
                </p>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Document Title *</label>
                <input
                  type="text"
                  required
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  placeholder="e.g. Primary 6 Mathematics National Examination 2026 Revision Guide"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Subject *</label>
                  <input
                    type="text"
                    required
                    value={docForm.subject}
                    onChange={(e) => setDocForm({ ...docForm, subject: e.target.value })}
                    placeholder="e.g. Mathematics"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Educational Level *</label>
                  <select
                    value={docForm.level}
                    onChange={(e) => setDocForm({ ...docForm, level: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Nursery (Baby to Top)">Nursery (Baby to Top)</option>
                    <option value="Primary 1 & 2">Primary 1 & 2</option>
                    <option value="Primary 3 & 4">Primary 3 & 4</option>
                    <option value="Primary 5">Primary 5</option>
                    <option value="Primary 6 (PLE)">Primary 6 (PLE Candidates)</option>
                    <option value="Senior 1 (S1)">Senior 1 (S1)</option>
                    <option value="Senior 2 (S2)">Senior 2 (S2)</option>
                    <option value="Senior 3 (S3)">Senior 3 (NESA Candidates)</option>
                    <option value="All Levels">All School Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Category *</label>
                  <select
                    value={docForm.category}
                    onChange={(e) => setDocForm({ ...docForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="past_papers">PLE & S3 National Exams</option>
                    <option value="literacy">National Library Decodable Stories</option>
                    <option value="notes">CBC Revision Handouts</option>
                    <option value="curriculum">Syllabus & Worksheets</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Document Summary & Objectives</label>
                <textarea
                  rows={2}
                  value={docForm.description}
                  onChange={(e) => setDocForm({ ...docForm, description: e.target.value })}
                  placeholder="Provide an overview of the concepts, exam questions, or reading material covered..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              {/* Text / Questions input if not using an external PDF */}
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">
                  Document Reading Content (Pages & Practice Questions)
                </label>
                <input
                  type="text"
                  value={docForm.pageHeading}
                  onChange={(e) => setDocForm({ ...docForm, pageHeading: e.target.value })}
                  placeholder="Section Heading (e.g. PART A: MATHEMATICAL FORMULAS & WORKED EXAMPLES)"
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-t-lg text-white text-xs font-semibold"
                />
                <textarea
                  rows={4}
                  value={docForm.pageText}
                  onChange={(e) => setDocForm({ ...docForm, pageText: e.target.value })}
                  placeholder="Type or paste the exam questions, solutions, or Rwandan storybook text here for students to read..."
                  className="w-full px-3 py-2 bg-slate-900 border border-t-0 border-slate-700 rounded-b-lg text-white font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Author / Contributor</label>
                  <input
                    type="text"
                    value={docForm.uploadedBy}
                    onChange={(e) => setDocForm({ ...docForm, uploadedBy: e.target.value })}
                    placeholder="e.g. Habiyaremye Charles (Headteacher)"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={docForm.year}
                    onChange={(e) => setDocForm({ ...docForm, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsInsertModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert into Digital Library</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
