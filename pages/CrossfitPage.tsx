
import React from 'react';
import { TranslationSet } from '../types';

interface CrossfitPageProps {
  t: TranslationSet;
}

const CrossfitPage: React.FC<CrossfitPageProps> = ({ t }) => {
  const programs = [
    {
      title: "100 exemples de metcon",
      desc: "Metcon est l'abréviation de metabolic conditioning. Ce programme propose 100 séances de mise en forme intense pour améliorer votre condition métabolique.",
      level: "Mixte",
      duration: "Variable"
    },
    {
      title: "Préparation des OPENS",
      desc: "40 séances sur 8 semaines. Programme exigeant pour pratiquants intermédiaires et avancés souhaitant performer lors des compétitions mondiales de CrossFit.",
      level: "Intermédiaire / Avancé",
      duration: "8 semaines"
    },
    {
      title: "Musculation Isométrique",
      desc: "15 exercices de maintien, gainage et préhension pour améliorer votre grip, votre hollow et votre muscle-up.",
      level: "Tous niveaux",
      duration: "Complémentaire"
    },
    {
      title: "Pectoraux-Bras-Dos",
      desc: "Programme axé sur la prise de volume musculaire pouvant être suivi à domicile avec un kit d'haltères et une barre de traction.",
      level: "Intermédiaire",
      duration: "6-8 semaines"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-black z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-oswald font-black uppercase italic tracking-tighter mb-4 animate-fade-in">
            Cross<span className="text-red-600">Fit</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto uppercase tracking-widest font-light">
            Dépassez vos limites avec nos programmes de conditionnement métabolique.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((prog, index) => (
            <div 
              key={index}
              className="group relative bg-zinc-900/50 border border-white/10 p-8 hover:border-red-600/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 translate-x-16 -translate-y-16" />
              
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-red-600 px-3 py-1 border border-red-600/30">
                  {prog.level}
                </span>
                <span className="text-gray-500 text-sm font-light italic">
                  {prog.duration}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase mb-4 group-hover:text-red-500 transition-colors">
                {prog.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                {prog.desc}
              </p>

              <button className="flex items-center gap-2 text-white font-bold uppercase tracking-tighter group/btn">
                <span className="w-10 h-[2px] bg-red-600 group-hover/btn:w-16 transition-all" />
                Découvrir le programme
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-oswald font-black uppercase mb-12 italic tracking-tight">Règles d'or de l'entraînement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Surcharge adaptée",
              "Progression générale vers spécifique",
              "Quantité vers Qualité",
              "Période d'affûtage"
            ].map((rule, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-600 flex items-center justify-center font-bold text-xl mb-4 skew-x-[-12deg]">
                  0{i + 1}
                </div>
                <p className="font-bold uppercase tracking-tighter">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrossfitPage;
