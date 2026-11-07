
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // 1 Tab Label: "PUCC Apply"
  const [activeTab, setActiveTab] = useState<'PUCC Apply'>('PUCC Apply');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navigation Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-[60] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo & Title */}
            <div 
              className="flex items-center space-x-3.5 cursor-pointer group" 
              onClick={() => setActiveTab('PUCC Apply')}
            >
              <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight block uppercase leading-none">
                  Digital World Cyber- Retail WebSpace
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
                  authorized terminal
                </span>
              </div>
            </div>
            
            {/* Header Right Actions */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-all"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Single Tab Bar: 1 Tab Label Named "PUCC Apply" */}
          <div className="flex items-center border-t border-slate-100 dark:border-slate-800/80 pt-2 pb-3">
            <button
              onClick={() => setActiveTab('PUCC Apply')}
              className={`group relative flex items-center space-x-2.5 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                activeTab === 'PUCC Apply'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-500/50'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>PUCC Apply</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 p-6 bg-gradient-to-r from-emerald-600/10 via-slate-100 dark:via-slate-900 to-transparent dark:from-emerald-950/30 rounded-3xl border border-emerald-500/20 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Terminal Active
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  PUCC Apply <span className="text-emerald-600 dark:text-emerald-400">Workspace</span>
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">
                  Digital World Cyber- Retail WebSpace • Compliance Terminal
                </p>
              </div>

              {/* Cloud Access Tab - Top Right Side */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/80 dark:bg-slate-900/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-2 px-2">
                  <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
                  </svg>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    Cloud Access
                  </span>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
                  <a 
                    href="https://drive.google.com/drive/folders/1O0w28J85auqykHLDcwdz-DwiDrE1B2Vu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md group"
                    title="Open PUCC Certificate Cloud Folder"
                  >
                    <span>PUCC Certificate Cloud</span>
                    <svg className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7.71 3.502L1.15 15l3.43 6h13.14l3.43-6L14.59 3.502H7.71z"/></svg>
                  </a>

                  <a 
                    href="https://drive.google.com/drive/folders/1DvNKgjmB_3aEIxoAnrF1wUio8OHoHupl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md group"
                    title="Open DL/ RC/ PAN/ Voter Data Folder"
                  >
                    <span>DL/ RC/ PAN/ Voter Data</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>
            </div>

            <Dashboard />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
              Digital World Cyber- Retail WebSpace • PUCC Apply System
            </p>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © 2024 Authorized Digital Systems • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
