
import React from 'react';
import { TranslationSet } from '../types';

interface PartnersPageProps {
  t: TranslationSet;
}

const PartnersPage: React.FC<PartnersPageProps> = ({ t }) => {
  const regions = [
    {
      name: "Wilaya de M'sila",
      color: "from-red-600 to-red-900",
      partners: [
        { name: "Univers Sport M'sila", type: "Équipement Sportif", location: "Cité Laroukat" },
        { name: "Hodna Elite Gym", type: "Salle de Fitness", location: "Centre Ville" },
        { name: "Healthy Corner", type: "Nutrition Health", location: "Près de l'Université" }
      ]
    },
    {
      name: "Wilaya de Sétif",
      color: "from-blue-600 to-blue-900",
      partners: [
        { name: "Sétifis Pro Nutrition", type: "Compléments Alimentaires", location: "Boulevard de l'ALN" },
        { name: "Park Mall Fitness", type: "Complexe Sportif", location: "Park Mall" },
        { name: "El Hidhab Sport", type: "Club Multisports", location: "Sétif Ouest" }
      ]
    },
    {
      name: "Wilaya de Bordj Bou Arreridj",
      color: "from-zinc-600 to-zinc-900",
      partners: [
        { name: "Biban CrossFit Box", type: "Crossfit & Mobilité", location: "BBA Sud" },
        { name: "BBA Sports Performance", type: "Centre de Récupération", location: "Centre" },
        { name: "BioLife BBA", type: "Boutique Bio & Sport", location: "Près du Stade" }
      ]
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-zinc-900/50 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-oswald font-black uppercase italic tracking-tighter mb-4">
            Nos <span className="text-red-600">Partenaires</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto uppercase tracking-[0.3em] font-light">
            Un réseau d'excellence à travers les Hauts Plateaux.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="space-y-32">
          {regions.map((region, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-4xl font-oswald font-black uppercase italic italic">{region.name}</h2>
                <div className="flex-grow h-[2px] bg-gradient-to-r from-red-600 to-transparent opacity-30" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {region.partners.map((partner, pIdx) => (
                  <div 
                    key={pIdx}
                    className="group bg-zinc-900 border border-white/5 p-8 relative overflow-hidden transition-all hover:-translate-y-2 hover:border-red-600/50"
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${region.color} opacity-5 group-hover:opacity-20 transition-opacity rotate-45 translate-x-12 -translate-y-12`} />
                    
                    <div className="mb-6">
                        <div className="w-16 h-1 bg-red-600 mb-4" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">
                            {partner.name}
                        </h3>
                        <p className="text-red-600 font-oswald text-sm uppercase tracking-widest">
                            {partner.type}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {partner.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-24 bg-white text-black text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase italic mb-8">Devenir Partenaire ?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Rejoignez l'écosystème DZSmartTraining et faites briller votre marque auprès de la plus grande communauté fitness de la région.
          </p>
          <button className="bg-black text-white px-12 py-5 font-black uppercase skew-x-[-12deg] hover:bg-red-600 transition-colors">
            Contactez notre Service B2B
          </button>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
