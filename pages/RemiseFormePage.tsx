
import React from 'react';
import { TranslationSet } from '../types';

interface RemiseFormePageProps {
  t: TranslationSet;
}

const RemiseFormePage: React.FC<RemiseFormePageProps> = ({ t }) => {
  const sections = [
    {
      title: "Santé et Prévention",
      desc: "Retrouvez votre aisance corporelle grâce à nos programmes spécifiques.",
      links: [
        "12 exercices contre le mal de dos",
        "Prévention blessures cheville et pied",
        "Reprise sportive après blessure genou"
      ]
    },
    {
      title: "Remise en Forme",
      desc: "Reprenez une activité physique en douceur mais avec efficacité.",
      links: [
        "Reprise après inactivité prolongée",
        "Défi sportif 100 jours (30 min / jour)",
        "Entraînement fonctionnel (Aide-soignants)"
      ]
    },
    {
      title: "Préparation Spéciale",
      desc: "Ciblez vos besoins pour des événements spécifiques.",
      links: [
        "Concours Officier Armée de Terre",
        "Préparation physique Ski Alpin",
        "Triathlon Débutant (12 semaines)"
      ]
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="bg-zinc-900 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-oswald font-black uppercase italic tracking-tighter mb-6">
            Remise en <span className="text-red-600">Forme</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Équilibre, santé et récupération. Des programmes adaptés à chaque étape de votre vie sportive, de la reprise après blessure à la préparation de concours exigeants.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-zinc-950 border border-white/5 p-10 hover:border-red-600/30 transition-colors">
              <h2 className="text-2xl font-oswald font-black uppercase mb-4 text-red-600">
                {section.title}
              </h2>
              <p className="text-gray-500 text-sm mb-8 italic">
                {section.desc}
              </p>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i} className="flex items-center gap-2 group cursor-pointer">
                    <svg className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-black text-center border-t border-white/5">
        <div className="container mx-auto px-4">
          <blockquote className="text-2xl md:text-3xl font-oswald italic text-gray-400 max-w-4xl mx-auto">
            "Une remise en forme efficace dépend davantage de l'intensité que du volume d'entraînement. La progressivité est la clé du succès."
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default RemiseFormePage;
