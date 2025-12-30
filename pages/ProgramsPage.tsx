
import React from 'react';
import { TranslationSet } from '../types';

const ProgramsPage: React.FC<{ t: TranslationSet }> = ({ t }) => {
  const programs = [
    {
      title: "Bootcamp Intérieur Elite",
      desc: "Entraînement par intervalles à haute intensité dans nos installations de pointe.",
      img: "/images/program-indoor.jpg",
      tag: "Populaire"
    },
    {
      title: "Survie en Plein Air",
      desc: "La nature rencontre la sueur. Séances d'entraînement dans les parcs locaux.",
      img: "/images/program-outdoor.jpg",
      tag: "Frais"
    },
    {
      title: "Transformation Corporelle",
      desc: "Programme intensif de 12 semaines avec des résultats garantis.",
      img: "/images/program-transformation.jpg",
      tag: "Hardcore"
    },
    {
      title: "Combat Personnel",
      desc: "Concentration individuelle sur vos limites physiques et vos forces.",
      img: "/images/program-combat.jpg",
      tag: "Sur Mesure"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">{t.programs.title}</h1>
        <p className="text-gray-400">{t.programs.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((p, i) => (
          <div key={i} className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/5">
            <img 
              src={p.img} 
              alt={p.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute top-6 left-6 bg-red-600 px-4 py-1 font-black uppercase italic rounded-md text-xs">
              {p.tag}
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl font-black uppercase italic mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm mb-6 max-w-sm line-clamp-2">{p.desc}</p>
              <button className="bg-white text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors">
                {t.programs.bookNow}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
