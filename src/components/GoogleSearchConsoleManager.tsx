import React, { useState } from 'react';
import { 
  Globe, CheckCircle2, Copy, ExternalLink, Download, 
  FileText, ShieldCheck, Search, HelpCircle, Save 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const GoogleSearchConsoleManager: React.FC = () => {
  const { logAdminAction } = useSchool();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [gscToken, setGscToken] = useState('gs-mugina-google-search-console-verification-2026-auth');
  const [customFileCode, setCustomFileCode] = useState('googledf542456e42b2609.html');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const siteDomain = 'https://gssidoremugina.rw';

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleSaveGsc = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('gs_mugina_custom_gsc_token', gscToken);
    } catch {}
    logAdminAction(
      'system_sync',
      'Google Search Console Token Updated',
      `Updated site verification token to "${gscToken}". Meta tag and sitemap synced.`,
      'GSC-SEO'
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDownloadVerificationFile = () => {
    const fileContent = `google-site-verification: ${customFileCode}`;
    const blob = new Blob([fileContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = customFileCode;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Google Search Console (GSC) & Search Indexation</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Google Search Console Host & Indexation Hub
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Configure site ownership verification for <strong>gssidoremugina.rw</strong> on Google Search Console, submit your sitemap to Googlebot, and monitor crawler access.
          </p>
        </div>

        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Google Search Console</span>
        </a>
      </div>

      {/* Verification Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Method 1: HTML Verification Tag */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Method 1: HTML Meta Tag (Recommended)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Google Search Console allows verifying your website by placing an official <code>&lt;meta name="google-site-verification"&gt;</code> tag in your homepage header.
          </p>

          <form onSubmit={handleSaveGsc} className="space-y-3">
            <div>
              <label className="block text-slate-400 text-xs mb-1 font-semibold">
                Google Site Verification Content Code:
              </label>
              <input
                type="text"
                value={gscToken}
                onChange={(e) => setGscToken(e.target.value)}
                placeholder="e.g. gs-mugina-google-search-console-verification-2026-auth"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => copyToClipboard(`<meta name="google-site-verification" content="${gscToken}" />`, 'tag')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedItem === 'tag' ? 'Copied Meta Tag!' : 'Copy Complete HTML Meta Tag'}</span>
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saveSuccess ? 'Saved & Synced!' : 'Update Token'}</span>
              </button>
            </div>
          </form>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 break-all">
            &lt;meta name="google-site-verification" content="{gscToken}" /&gt;
          </div>
        </div>

        {/* Method 2: HTML File Upload */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Method 2: HTML Verification File</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Download the Google verification file and serve it directly under your domain's public root directory (e.g. <code>/googledf542456e42b2609.html</code>).
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-400 text-xs mb-1 font-semibold">
                Google File Name Given by Search Console:
              </label>
              <input
                type="text"
                value={customFileCode}
                onChange={(e) => setCustomFileCode(e.target.value)}
                placeholder="e.g. google1234567890abcdef.html"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadVerificationFile}
                className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {customFileCode}</span>
              </button>

              <a
                href={`/${customFileCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test Live File</span>
              </a>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400">
            Path: <code>{siteDomain}/{customFileCode}</code>
          </div>
        </div>

      </div>

      {/* Crawl Assets: Sitemap & Robots.txt */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
          Search Crawling Assets & Indexing Endpoints
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Sitemap.xml */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>XML Sitemap</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                Live & Active
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Indexes all 18 classroom streams, PLE past papers, staff directory, fees structure, and results checker.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-slate-300 text-[11px]">
                {siteDomain}/sitemap.xml
              </span>
              <button
                onClick={() => copyToClipboard(`${siteDomain}/sitemap.xml`, 'sitemap')}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedItem === 'sitemap' ? 'Copied!' : 'Copy URL'}</span>
              </button>
            </div>
          </div>

          {/* Robots.txt */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-400 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Robots.txt Directive</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/50">
                Googlebot Allowed
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Instructs Googlebot and Bingbot to crawl all educational pages while protecting administrative security paths.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-slate-300 text-[11px]">
                {siteDomain}/robots.txt
              </span>
              <button
                onClick={() => copyToClipboard(`${siteDomain}/robots.txt`, 'robots')}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedItem === 'robots' ? 'Copied!' : 'Copy URL'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Step-by-Step GSC Guide */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
          <strong className="text-white block font-semibold">
            How to verify in 3 simple steps in Google Search Console:
          </strong>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
            <li>
              Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">search.google.com/search-console</a> and sign in with your Google account.
            </li>
            <li>
              Click <strong>"Add Property"</strong>, select <strong>"URL prefix"</strong>, and enter your domain (e.g. <code>https://gssidoremugina.rw</code>).
            </li>
            <li>
              Choose <strong>"HTML tag"</strong> or <strong>"HTML file"</strong> verification, click <strong>"Verify"</strong>, and submit <code>sitemap.xml</code> in the Sitemaps tab.
            </li>
          </ol>
        </div>
      </div>

    </div>
  );
};
