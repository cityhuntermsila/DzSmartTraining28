
import React from 'react';
import { TranslationSet } from '../types';

interface CardioPageProps {
  t: TranslationSet;
}

const CardioPage: React.FC<CardioPageProps> = ({ t }) => {
  const categories = [
    {
      title: "Perte de Poids",
      items: [
        "Cardio-training (3h40 à 4h / semaine)",
        "Circuit-training brûle-calories",
        "Programme Maigrir en Courant"
      ]
    },
    {
      title: "Équipements",
      items: [
        "Vélo Elliptique (Abdos/Fessiers)",
        "Rameur d'appartement (4 séances/sem)",
        "Vélo d'appartement (Vitesse/Endurance)"
      ]
    },
    {
      title: "Corde à Sauter",
      items: [
        "Programme Tonification (30 min)",
        "Endurance Cardio (8 semaines)",
        "Combo Corde & Squats"
      ]
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-[50vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070')] bg-cover bg-center grayscale opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-6xl md:text-8xl font-oswald font-black uppercase italic tracking-tighter mb-4">
            Cardio<span className="text-red-600">Training</span>
          </h1>
          <p className="text-xl text-red-500 font-bold uppercase tracking-widest">
            Améliorez votre endurance, brûlez les graisses.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-8">
              <h2 className="text-3xl font-oswald font-bold uppercase border-b-2 border-red-600 pb-2 inline-block">
                {cat.title}
              </h2>
              <ul className="space-y-4">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 group cursor-pointer hover:text-white transition-colors">
                    <span className="w-2 h-2 bg-red-600 group-hover:scale-150 transition-transform" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-zinc-900 border-y border-white/5">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-oswald font-black text-red-600 mb-2">3 ZONES</div>
            <p className="uppercase text-xs tracking-widest text-gray-500">De fréquence cardiaque</p>
          </div>
          <div>
            <div className="text-5xl font-oswald font-black text-red-600 mb-2">HIIT</div>
            <p className="uppercase text-xs tracking-widest text-gray-500">Haute Intensité</p>
          </div>
          <div>
            <div className="text-5xl font-oswald font-black text-red-600 mb-2">KARVONEN</div>
            <p className="uppercase text-xs tracking-widest text-gray-500">Méthode de calcul</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardioPage;
