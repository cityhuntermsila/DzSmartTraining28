
import React, { useState, useEffect, useMemo } from 'react';
import { translations } from './i18n';
import { Language } from './types';

// Pages
import HomePage from './pages/HomePage';
import ProgramsPage from './pages/ProgramsPage';
import NutritionPage from './pages/NutritionPage';
import AICoachPage from './pages/AICoachPage';
import MembershipPage from './pages/MembershipPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SchedulePage from './pages/SchedulePage';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AIChatWidget from './components/ai/AIChatWidget';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = useMemo(() => translations[lang], [lang]);
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage lang={lang} t={t} onNavigate={setCurrentPage} />;
      case 'programs': return <ProgramsPage t={t} />;
      case 'nutrition': return <NutritionPage t={t} lang={lang} />;
      case 'aiCoach': return <AICoachPage t={t} />;
      case 'memberships': return <MembershipPage t={t} />;
      case 'contact': return <ContactPage t={t} />;
      case 'about': return <AboutPage t={t} />;
      case 'schedule': return <SchedulePage t={t} />;
      default: return <HomePage lang={lang} t={t} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : ''}`}>
      <Header 
        lang={lang} 
        setLang={setLang} 
        t={t} 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <main className="flex-grow pt-20">
        {renderPage()}
      </main>

      <Footer t={t} onNavigate={setCurrentPage} />

      {/* Persistent AI Chatbot */}
      <AIChatWidget lang={lang} />
    </div>
  );
};

export default App;
