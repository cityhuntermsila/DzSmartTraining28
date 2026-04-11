
import React from 'react';
import { TranslationSet } from '../types';

interface RunningPageProps {
  t: TranslationSet;
}

const RunningPage: React.FC<RunningPageProps> = ({ t }) => {
  const levels = [
    {
      title: "Débutant",
      desc: "Apprendre à courir sans s'essouffler. Progression douce sur 12 semaines.",
      items: ["Fractionné doux", "Respiration", "Échauffement articulaire"]
    },
    {
      title: "Régulier",
      desc: "Améliorer sa vitesse et son endurance. Préparation aux 5km et 10km.",
      items: ["Seuils anaérobiques", "VMA", "Sorties longues"]
    },
    {
      title: "Experts",
      desc: "Optimisation de la foulée et performance pure. Préparation marathon.",
      items: ["Analyse de foulée IA", "Économie de course", "VMA spécifique"]
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=2069')] bg-cover bg-fixed opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-[15vw] font-oswald font-black uppercase italic tracking-tighter leading-[0.8] mb-8">
            Run<span className="text-red-600">ning</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-2xl font-light italic">
            "On n'a jamais fini d'apprendre à courir."
          </p>
          <div className="mt-12 flex gap-4">
            <button className="bg-red-600 px-8 py-4 font-bold uppercase italic hover:bg-white hover:text-red-600 transition-colors">
              Trouver mon plan
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {levels.map((level, i) => (
            <div key={i} className="relative group">
              <div className="absolute -top-12 left-0 text-8xl font-oswald font-black text-white/5 group-hover:text-red-600/10 transition-colors">
                0{i + 1}
              </div>
              <h3 className="text-4xl font-oswald font-black uppercase italic mb-6">
                Level: <span className="text-red-600">{level.title}</span>
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {level.desc}
              </p>
              <ul className="space-y-3">
                {level.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
                    <span className="w-1 h-1 bg-red-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Info Block */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-oswald font-black uppercase mb-6 italic">Maigrir en courant</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Le meilleur programme sportif pour perdre du poids associe une modification alimentaire à des exercices continus modérés ou intenses alternés (HIIT).
            </p>
            <button className="text-red-600 font-bold border-b border-red-600 pb-1 hover:text-white hover:border-white transition-colors">
              En savoir plus sur le brûlage de graisses
            </button>
          </div>
          <div className="bg-red-600 p-1">
             <div className="bg-black p-8 italic text-lg text-gray-300">
               "Les exercices et le contenu des séances de course à pied diffèrent si on est coureur débutant ou coureur régulier."
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RunningPage;
