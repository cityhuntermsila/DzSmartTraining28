
import React from 'react';
import { TranslationSet } from '../types';

interface FitnessPageProps {
  t: TranslationSet;
}

const FitnessPage: React.FC<FitnessPageProps> = ({ t }) => {
  const programs = [
    {
      title: "5 Niveaux de Forme",
      desc: "Découvrez nos programmes sportifs personnalisés gratuits et choisissez celui qui convient le mieux à votre niveau actuel pour optimiser votre fitness.",
      icon: "⚡"
    },
    {
      title: "15 Exercices avec Haltères",
      desc: "Programme simple comprenant 15 mouvements de base et 5 enchaînements complexes pour s'entraîner efficacement chez soi.",
      icon: "💪"
    },
    {
      title: "23 Exercices Ballon de Gym",
      desc: "Renforcement musculaire ciblé pour gagner en tonicité et explosivité sans augmenter excessivement le volume musculaire.",
      icon: "⚽"
    },
    {
      title: "Ré-activation des Fessiers",
      desc: "11 exercices spécifiques pour lutter contre l'amnésie des fessiers due à une position assise prolongée. Redonnez du galbe à votre silhouette.",
      icon: "🍑"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/10 -skew-x-12 translate-x-32" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-7xl md:text-9xl font-oswald font-black uppercase italic tracking-tighter leading-none mb-8">
            Fit<span className="text-red-600">ness</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-xl font-light uppercase tracking-[0.2em]">
            Tonification, souplesse et bien-être. Établissez les bases d'un corps sain.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, idx) => (
            <div key={idx} className="bg-zinc-900 border-l-4 border-red-600 p-8 hover:bg-zinc-800 transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {prog.icon}
              </div>
              <h3 className="text-2xl font-oswald font-bold uppercase mb-4 tracking-tight">
                {prog.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {prog.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Motivation Banner */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-4xl md:text-5xl font-oswald font-black uppercase italic tracking-tighter text-black">
            Prêt à transformer votre corps ?
          </h2>
          <button className="bg-black text-white px-10 py-4 font-bold uppercase italic skew-x-[-12deg] hover:bg-white hover:text-black transition-colors">
            Commencer maintenant
          </button>
        </div>
      </section>
    </div>
  );
};

export default FitnessPage;
