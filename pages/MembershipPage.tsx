
import React from 'react';
import { TranslationSet } from '../types';

const MembershipPage: React.FC<{ t: TranslationSet }> = ({ t }) => {
  const plans = [
    {
      name: "Gratuit",
      price: 0,
      features: [
        "Coach IA (Plan Yoga)",
        "Communauté",
        "Suivi basique",
        "Exercices",
      ],
      accent: "border-gray-600",
      buttonText: "Gratuit"
    },
    {
      name: "Rookie",
      price: 499,
      popular: true,
      features: [
        "Coach IA (Multi)",
        "Illimité",
        "Nutrition IA",
        "Groupes",
      ],
      accent: "border-red-600",
      buttonText: "Rejoindre"
    },
    {
      name: "Elite",
      price: 899,
      features: [
        "Coach IA (Full)",
        "Check-up 1-on-1",
        "Lab Perf",
        "Pass Invité",
      ],
      accent: "border-yellow-600",
      buttonText: "Elite"
    },
    {
      name: "Business",
      price: "Devis",
      features: [
        "Multi-comptes",
        "Analytics",
        "Support 24/7",
        "API Perf",
      ],
      accent: "border-purple-600",
      buttonText: "Contact"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10 md:mb-16">
        <div className="inline-block bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4 skew-x-[-12deg]">
          <span className="block skew-x-[12deg]">{t.memberships.badge}</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 leading-none">
          CHOISISSEZ VOTRE <br/><span className="text-red-600 text-3xl md:text-7xl">{t.memberships.title}</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium text-sm md:text-base">
          {t.memberships.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6 items-stretch">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`relative bg-zinc-900/40 p-4 md:p-8 rounded-[24px] md:rounded-[40px] border-t-4 md:border-t-8 ${plan.accent} border-x border-b border-white/5 flex flex-col hover:bg-zinc-900/60 transition-all duration-500 group`}
          >
            {plan.popular && (
              <div className="absolute -top-3 md:-top-5 left-1/2 -translate-x-1/2 bg-red-600 px-2 md:px-6 py-1 text-[8px] md:text-[10px] font-black uppercase rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)] whitespace-nowrap">
                {t.memberships.popular}
              </div>
            )}
            
            <div className="mb-4 md:mb-10 text-center md:text-left">
              <h2 className="text-lg md:text-2xl font-black uppercase mb-1 md:mb-4 italic group-hover:text-red-500 transition-colors truncate">{plan.name}</h2>
              <div className="flex items-baseline justify-center md:justify-start gap-1">
                {typeof plan.price === 'number' ? (
                  <>
                    <span className="text-2xl md:text-5xl font-black tracking-tighter">{plan.price}</span>
                    <div className="flex flex-col">
                      <span className="text-red-500 font-black text-[8px] md:text-xs uppercase leading-none">{t.common.currency}</span>
                      <span className="text-gray-500 font-bold text-[7px] md:text-[10px] uppercase leading-none">/m</span>
                    </div>
                  </>
                ) : (
                  <span className="text-xl md:text-3xl font-black tracking-tighter uppercase whitespace-nowrap">{plan.price}</span>
                )}
              </div>
            </div>
            
            <div className="w-full h-px bg-white/5 mb-4 md:mb-10" />

            <ul className="space-y-2 md:space-y-4 mb-6 md:mb-12 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-[10px] md:text-xs font-medium text-gray-400">
                  <span className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center text-[6px] md:text-[8px] font-bold">✓</span>
                  <span className="line-clamp-1">{f}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-xs transition-all shadow-xl active:scale-95 ${
              plan.popular 
                ? 'bg-red-600 text-white hover:bg-white hover:text-red-600 shadow-red-900/20' 
                : (plan.name === 'Business' ? 'bg-purple-600 text-white hover:bg-white hover:text-purple-600' : 'bg-white text-black hover:bg-red-600 hover:text-white')
            }`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-20 p-6 md:p-10 bg-zinc-950 rounded-[30px] md:rounded-[40px] border border-white/5 text-center">
        <h3 className="text-lg md:text-xl font-bold uppercase mb-4">{t.memberships.customTitle}</h3>
        <p className="text-gray-400 text-xs md:text-sm mb-6 md:mb-8">{t.memberships.customDesc}</p>
        <button className="text-red-500 font-black uppercase tracking-widest text-[10px] md:text-xs hover:text-white transition-colors">
          {t.memberships.customBtn}
        </button>
      </div>
    </div>
  );
};

export default MembershipPage;
