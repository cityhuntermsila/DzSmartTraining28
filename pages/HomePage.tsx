
import React from 'react';
import { Language, TranslationSet } from '../types';

interface HomePageProps {
  lang: Language;
  t: TranslationSet;
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ t, onNavigate }) => {
  const features = [
    {
      id: 'aiCoach',
      title: 'AI Movement Coach',
      desc: 'Correction en temps réel via détection de pose.',
      icon: '⚡',
      accent: 'border-red-600'
    },
    {
      id: 'nutrition',
      title: 'Nutrition Intelligente',
      desc: 'Plans de repas personnalisés générés par IA.',
      icon: '🥗',
      accent: 'border-green-600'
    },
    {
      id: 'aiCoach',
      title: 'Entraîneur IA 24/7',
      desc: 'Un expert multilingue dans votre poche.',
      icon: '🤖',
      accent: 'border-yellow-600'
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.jpg" 
            alt="Bootcamp" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/40 rtl:bg-gradient-to-l" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none max-w-4xl">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-light italic">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('memberships')}
              className="bg-red-600 hover:bg-white hover:text-red-600 text-white font-black px-10 py-5 text-xl uppercase tracking-widest transition-all skew-x-[-12deg]"
            >
              <span className="block skew-x-[12deg]">{t.hero.cta1}</span>
            </button>
            <button 
              onClick={() => onNavigate('schedule')}
              className="border-2 border-white/50 hover:bg-white hover:text-black font-black px-10 py-5 text-xl uppercase tracking-widest transition-all skew-x-[-12deg]"
            >
              <span className="block skew-x-[12deg]">{t.hero.cta2}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Highlights */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-black text-red-600 mb-2">500+</div>
            <div className="text-sm uppercase tracking-widest text-gray-400">{t.home.statsMembers}</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-600 mb-2">15+</div>
            <div className="text-sm uppercase tracking-widest text-gray-400">{t.home.statsCoaches}</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-600 mb-2">24/7</div>
            <div className="text-sm uppercase tracking-widest text-gray-400">{t.home.statsSupport}</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-600 mb-2">100%</div>
            <div className="text-sm uppercase tracking-widest text-gray-400">{t.home.statsGains}</div>
          </div>
        </div>
      </section>

      {/* Advanced Modules Section */}
      <section className="py-32 bg-black px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 uppercase italic tracking-tighter">{t.home.featuresTitle}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t.home.featuresDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className={`group cursor-pointer bg-zinc-900/50 p-8 border-l-4 ${feature.accent} hover:bg-zinc-800 transition-all hover:-translate-y-2`}
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation Banner */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-red-600 skew-y-[-2deg] scale-110 -z-10" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-8xl font-black mb-8 italic uppercase leading-none">
            {t.home.motivationTitle}
          </h2>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-black text-white px-12 py-5 font-black uppercase text-xl hover:bg-zinc-900 transition-colors"
          >
            {t.home.motivationCta}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
