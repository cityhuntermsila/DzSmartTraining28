
import React, { useEffect } from 'react';
import { TranslationSet } from '../../types';

interface HeaderProps {
  t: TranslationSet;
  onNavigate: (page: string) => void;
  currentPage: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  t, onNavigate, currentPage, isMenuOpen, setIsMenuOpen 
}) => {
  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'aiCoach', label: t.nav.aiCoach },
    { id: 'nutrition', label: t.nav.nutrition },
    { id: 'contact', label: t.nav.contact },
    { id: 'memberships', label: t.nav.memberships },
    { id: 'about', label: t.nav.about },
  ];

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 h-20">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => handleNav('home')}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 flex items-center justify-center font-bold text-lg md:text-xl skew-x-[-12deg] group-hover:bg-white group-hover:text-red-600 transition-colors text-white">
              DZ
            </div>
            <span className="font-oswald text-lg md:text-2xl font-bold tracking-tighter text-white uppercase whitespace-nowrap">Smart Training</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-red-500 ${
                  currentPage === item.id ? 'text-red-500' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              className="lg:hidden p-2 text-white bg-zinc-900 rounded-lg border border-white/5"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
            >
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`lg:hidden fixed inset-0 bg-red-600 z-[100] transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col ${
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Top Bar */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white text-red-600 flex items-center justify-center font-bold text-xl skew-x-[-12deg]">
              DZ
            </div>
            <span className="font-oswald text-2xl font-bold tracking-tighter text-white uppercase">Smart Training</span>
          </div>
          
          <button 
            className="p-2 text-white"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fermer Menu"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links Container - Scrollable starting from the top */}
        <div className="flex-grow overflow-y-auto px-6 py-10">
          <nav className="flex flex-col items-center gap-4 sm:gap-6 pb-20">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{ transitionDelay: `${idx * 30}ms` }}
                className={`text-3xl sm:text-4xl md:text-5xl font-oswald font-black uppercase italic tracking-tighter transition-all duration-500 transform ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                } ${
                  currentPage === item.id ? 'text-black scale-105' : 'text-white hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
