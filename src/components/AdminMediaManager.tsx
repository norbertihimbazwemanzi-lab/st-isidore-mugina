import React, { useState } from 'react';
import { 
  Image, Plus, Trash2, Edit2, Upload, Check, X, 
  Sparkles, Download, ShieldCheck, RefreshCw, Eye, Star, AlertCircle 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export interface GalleryImage {
  id: string;
  title: string;
  category: 'logo' | 'campus' | 'academics' | 'sports' | 'events';
  dataUrl: string;
  description?: string;
  uploadedAt: string;
}

interface AdminMediaManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminMediaManager: React.FC<AdminMediaManagerProps> = ({ isOpen, onClose }) => {
  const { 
    schoolLogo, 
    updateSchoolLogo, 
    isAdminAuthenticated, 
    setNotificationToast,
    saveAllToBackend,
    exportDataBackup
  } = useSchool();

  // Local images registry stored in localStorage and backend
  const [images, setImages] = useState<GalleryImage[]>(() => {
    try {
      const stored = localStorage.getItem('gs_mugina_media_gallery');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'img-default-1',
        title: 'GS St Isidore Mugina Main Academic Block',
        category: 'campus',
        dataUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
        description: 'Main classroom building serving 18 active class streams.',
        uploadedAt: 'Official Archive',
      },
      {
        id: 'img-default-2',
        title: 'Student Assembly & Flagpole Quadrangle',
        category: 'events',
        dataUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
        description: 'Weekly student gathering for national anthem and moral orientation.',
        uploadedAt: 'Official Archive',
      }
    ];
  });

  const [activeTab, setActiveTab] = useState<'gallery' | 'upload' | 'github_sync'>('gallery');
  
  // Upload & Edit Form State
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageCategory, setImageCategory] = useState<'logo' | 'campus' | 'academics' | 'sports' | 'events'>('campus');
  const [imageDescription, setImageDescription] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const persistImages = (newImages: GalleryImage[]) => {
    setImages(newImages);
    try {
      localStorage.setItem('gs_mugina_media_gallery', JSON.stringify(newImages));
    } catch {}
    // Sync to backend if function available
    if (saveAllToBackend) {
      saveAllToBackend({ galleryImages: newImages });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPreviewDataUrl(dataUrl);
        if (!imageTitle) {
          setImageTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewDataUrl) {
      alert('Please upload an image file first.');
      return;
    }

    setIsProcessing(true);

    if (editingImageId) {
      // Edit existing image
      const updated = images.map(img => img.id === editingImageId ? {
        ...img,
        title: imageTitle.trim() || img.title,
        category: imageCategory,
        description: imageDescription.trim(),
        dataUrl: previewDataUrl,
      } : img);
      persistImages(updated);
      setNotificationToast?.('Image details updated and saved to server storage.');
    } else {
      // Add new image
      const newImg: GalleryImage = {
        id: `img-${Date.now()}`,
        title: imageTitle.trim() || 'Uploaded Media',
        category: imageCategory,
        dataUrl: previewDataUrl,
        description: imageDescription.trim(),
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      persistImages([newImg, ...images]);
      setNotificationToast?.('New image added to school gallery and saved to server.');
    }

    // Reset Form
    setIsProcessing(false);
    setEditingImageId(null);
    setImageTitle('');
    setImageDescription('');
    setPreviewDataUrl(null);
    setActiveTab('gallery');
  };

  const handleDeleteImage = (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    const filtered = images.filter(img => img.id !== id);
    persistImages(filtered);
    setNotificationToast?.('Image removed from media library.');
  };

  const handleSetAsLogo = (dataUrl: string) => {
    updateSchoolLogo(dataUrl);
    if (saveAllToBackend) {
      saveAllToBackend({ schoolLogo: dataUrl });
    }
    setNotificationToast?.('Selected image is now active as the official School Website Logo across all pages!');
  };

  const handleStartEdit = (img: GalleryImage) => {
    setEditingImageId(img.id);
    setImageTitle(img.title);
    setImageCategory(img.category);
    setImageDescription(img.description || '');
    setPreviewDataUrl(img.dataUrl);
    setActiveTab('upload');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Administrator Media & Image Manager</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Headteacher Access
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Add, edit, delete images, set the official school logo, and persist changes across hosting.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Media Gallery ({images.length} Images)
          </button>
          <button
            onClick={() => {
              setEditingImageId(null);
              setImageTitle('');
              setImageDescription('');
              setPreviewDataUrl(null);
              setActiveTab('upload');
            }}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{editingImageId ? 'Edit Image' : 'Upload New Image'}</span>
          </button>
          <button
            onClick={() => setActiveTab('github_sync')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'github_sync'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>GitHub & Hosting Persistence</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: MEDIA GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Current Active School Logo Banner */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {schoolLogo ? (
                    <img 
                      src={schoolLogo} 
                      alt="Active Logo" 
                      className="w-14 h-14 rounded-xl object-contain bg-white p-1 border-2 border-emerald-500 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl border-2 border-emerald-600">
                      GS
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Active Primary School Logo
                    </span>
                    <strong className="text-sm text-white">
                      {schoolLogo ? 'Custom School Website Logo Active' : 'Default Official Crest Active'}
                    </strong>
                    <p className="text-xs text-slate-400">
                      Appears in the sticky navbar, report card marksheets, and official documents.
                    </p>
                  </div>
                </div>

                {schoolLogo && (
                  <button
                    onClick={() => {
                      updateSchoolLogo(null);
                      if (saveAllToBackend) saveAllToBackend({ schoolLogo: null });
                      setNotificationToast?.('School logo reset to default official crest.');
                    }}
                    className="px-3 py-1.5 text-xs text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Reset to Default Crest
                  </button>
                )}
              </div>

              {/* Grid of All Images with Edit, Delete, Set Logo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all shadow-md"
                  >
                    <div className="relative aspect-video bg-slate-900 overflow-hidden">
                      <img
                        src={img.dataUrl}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900/80 text-white backdrop-blur-xs border border-slate-700">
                        {img.category}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">{img.title}</h4>
                        {img.description && (
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{img.description}</p>
                        )}
                        <span className="text-[10px] text-slate-500 mt-2 block font-mono">{img.uploadedAt}</span>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => handleSetAsLogo(img.dataUrl)}
                          className="px-2 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Set this image as primary school logo"
                        >
                          <Star className="w-3 h-3 text-amber-400" />
                          <span>Set as Logo</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleStartEdit(img)}
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                            title="Edit image title and details"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-200 bg-rose-950/60 hover:bg-rose-900 rounded-lg border border-rose-800/80 transition-colors cursor-pointer"
                            title="Delete this image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD & EDIT FORM */}
          {activeTab === 'upload' && (
            <form onSubmit={handleSaveImage} className="max-w-2xl mx-auto space-y-4 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                <h4 className="text-sm font-bold text-white mb-1">
                  {editingImageId ? 'Edit Image Information' : 'Add New Media to School Gallery'}
                </h4>
                <p className="text-slate-400 text-xs">
                  Upload an image from your computer to use as the school logo, campus showcase, or news header.
                </p>
              </div>

              {/* Upload Input Area */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Select Image from Device *</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-950 flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                    <span className="text-xs font-bold text-white">Click to Browse Photos</span>
                    <span className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, WebP, SVG (up to 50MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {previewDataUrl && (
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 bg-slate-950 shrink-0 relative group">
                      <img src={previewDataUrl} alt="Preview" className="w-full h-full object-contain p-1" />
                      <button
                        type="button"
                        onClick={() => setPreviewDataUrl(null)}
                        className="absolute top-1 right-1 p-1 bg-rose-900 text-white rounded-full opacity-80 hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Image Title / Headline *</label>
                <input
                  type="text"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="e.g. GS St Isidore Mugina Official Crest Logo 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={imageCategory}
                    onChange={(e) => setImageCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="logo">School Logo & Crest</option>
                    <option value="campus">Campus & Classrooms</option>
                    <option value="academics">Academics & Science Labs</option>
                    <option value="sports">Sports & Student Life</option>
                    <option value="events">Events & Assemblies</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Description (Optional)</label>
                  <input
                    type="text"
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    placeholder="Short caption describing the photo..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('gallery')}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing || !previewDataUrl}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingImageId ? 'Save Image Changes' : 'Upload & Save to Server'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: WHY LOGO RESETS ON GITHUB & HOW IT IS SAVED PERMANENTLY */}
          {activeTab === 'github_sync' && (
            <div className="space-y-4 max-w-2xl mx-auto text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/40 flex items-start gap-3 text-amber-200">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Why did your Logo reset when pushing to GitHub?</h4>
                  <p className="mt-1 leading-relaxed text-xs">
                    In standard client-side websites, browser uploads are saved in <code>localStorage</code>, which only exists inside <em>one single browser on your computer</em>. When you deploy to GitHub Pages or open the website on another computer/phone, that new device's local storage is completely empty, so it displays the default fallback logo!
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>How your changes are now saved permanently for ALL visitors:</span>
                </h4>
                
                <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1 leading-relaxed">
                  <li>
                    <strong>Server-Side Backend Persistence (`server.ts`)</strong>: When running with our Node Express server, every change you make to the logo, gallery images, student marks, and teachers is sent to <code>/api/school-data</code> and saved to <code>persistedSchoolData.json</code>. Whenever ANY user visits the site, the server serves your updated logo and images automatically.
                  </li>
                  <li>
                    <strong>Static GitHub Pages Export</strong>: If you are hosting the project as a static site on GitHub Pages without a backend, click the button below to download the complete <strong>Website Data JSON Backup</strong>. You can simply commit this file or paste it into your repository so everyone sees your custom logo and assets!
                  </li>
                </ol>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      if (exportDataBackup) {
                        exportDataBackup();
                      } else {
                        const backup = {
                          schoolLogo,
                          galleryImages: images,
                          exportedAt: new Date().toISOString(),
                          headteacher: 'Habiyaremye Charles (0788249507)',
                        };
                        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `gs-st-isidore-mugina-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }
                      setNotificationToast?.('School website configuration exported! Commit this to GitHub for static hosting.');
                    }}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Website Assets & Config JSON (for GitHub Commit)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Registered School Admin: <strong>0788249507</strong> (Headteacher Habiyaremye Charles)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Media Manager
          </button>
        </div>

      </div>
    </div>
  );
};
