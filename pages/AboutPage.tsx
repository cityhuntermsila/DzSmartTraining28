
import React from 'react';
import { TranslationSet } from '../types';

const AboutPage: React.FC<{ t: TranslationSet }> = ({ t }) => {
  const team = [
    { n: "Bentallah Abdallah", r: "CEO", i: "/images/team-abdallah.jpg" },
    { n: "Tabbakh Mostefa", r: "CTO - Responsable Technologie", i: "/images/team-mostefa.jpg" },
    { n: "Hamalaoui Ameur", r: "CTO - Responsable Sport & Fitness", i: "/images/team-ameur.jpg" },
    { n: "Boussadia Oussama", r: "UI/UX Design", i: "/images/team-oussama.jpg" },
    { n: "Ghodbane Abdelmajid", r: "IA Engineer", i: "/images/team-abdelmajid.jpg" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="max-w-6xl mx-auto px-2 mb-24">
        <h2 className="text-4xl font-black uppercase mb-16 italic text-center">{t.about.teamTitle}</h2>
        
        {/* Responsive Flexbox Container: 2 per line on mobile, 3 on large screens */}
        <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-20">
          {team.map((m, i) => (
            <div 
              key={i} 
              className="w-[calc(50%-1rem)] sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] flex flex-col items-center text-center group"
            >
              <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6">
                <div className="absolute inset-0 bg-red-600 rounded-full translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 md:border-4 border-zinc-900 bg-zinc-800">
                  <img 
                    src={m.i} 
                    alt={m.n} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
              </div>
              <h3 className="text-base md:text-xl font-black uppercase tracking-tighter leading-tight mb-2">
                {m.n}
              </h3>
              <p className="text-red-500 font-bold text-[8px] md:text-[10px] uppercase tracking-widest leading-none">
                {m.r}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-white/5 pt-24">
        <div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-8 leading-none">
            {t.about.title}
          </h1>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            {t.about.p1}
          </p>
          <div className="bg-red-600/10 border-l-4 border-red-600 p-6 rounded-r-xl italic text-red-500 font-bold">
            "{t.about.quote}"
          </div>
        </div>
        <div className="relative">
          <img 
            src="/images/about-training.jpg" 
            alt="Training" 
            className="rounded-[40px] shadow-2xl skew-y-[-2deg]"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
