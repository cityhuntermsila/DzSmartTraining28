
import React, { useState, useEffect } from 'react';
import { translations } from './i18n';

// Pages
import HomePage from './pages/HomePage';

import NutritionPage from './pages/NutritionPage';
import AICoachPage from './pages/AICoachPage';
import MembershipPage from './pages/MembershipPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';


// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AIChatWidget from './components/ai/AIChatWidget';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = translations.fr;

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'fr';
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage t={t} onNavigate={setCurrentPage} />;

      case 'nutrition': return <NutritionPage t={t} />;
      case 'aiCoach': return <AICoachPage t={t} onNavigate={setCurrentPage} />;
      case 'memberships': return <MembershipPage t={t} />;
      case 'contact': return <ContactPage t={t} />;
      case 'about': return <AboutPage t={t} />;

      default: return <HomePage t={t} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
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
      <AIChatWidget />
    </div>
  );
};

export default App;
