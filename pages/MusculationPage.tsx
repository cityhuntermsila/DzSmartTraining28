
import React from 'react';
import { TranslationSet } from '../types';

interface MusculationPageProps {
  t: TranslationSet;
}

const MusculationPage: React.FC<MusculationPageProps> = ({ t }) => {
  const objectives = [
    {
      title: "Rendement",
      desc: "Prise de masse, explosivité et force brute.",
      icon: "🔥"
    },
    {
      title: "Esthétique",
      desc: "Ventre plat, dos musclé, fessiers toniques et bombés.",
      icon: "✨"
    },
    {
      title: "Santé",
      desc: "Augmenter le métabolisme de base et la densité osseuse.",
      icon: "❤️"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 pb-20">
          <h1 className="text-7xl md:text-9xl font-oswald font-black uppercase italic tracking-tighter leading-none">
            Muscu<span className="text-red-600">lation</span>
          </h1>
          <p className="text-2xl text-gray-400 mt-4 uppercase tracking-widest font-light">
            Forgez le corps que vous méritez.
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {objectives.map((obj, i) => (
            <div key={i} className="group p-10 bg-zinc-900/50 border border-white/5 hover:border-red-600 transition-all text-center">
              <div className="text-5xl mb-6 group-hover:scale-125 transition-transform inline-block">
                {obj.icon}
              </div>
              <h3 className="text-3xl font-oswald font-black uppercase mb-4 italic">
                {obj.title}
              </h3>
              <p className="text-gray-400">
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Block */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-oswald font-black uppercase mb-8">Nos Programmes</h2>
          <div className="space-y-6 text-left">
            {[
              "Renforcement musculaire du dos (Postural)",
              "Musculation au poids du corps",
              "Force et Puissance sans prise de masse",
              "Circuit Training tonification générale"
            ].map((prog, idx) => (
              <div key={idx} className="flex items-center justify-between p-6 bg-zinc-900 border-l-4 border-red-600">
                <span className="text-xl font-bold uppercase italic">{prog}</span>
                <button className="text-red-600 font-black">→</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MusculationPage;
