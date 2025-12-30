
import React from 'react';
import { TranslationSet } from '../types';

const SuccessStoriesPage: React.FC<{ t: TranslationSet }> = ({ t }) => {
  const stories = [
    {
      name: "Mehdi K.",
      result: "-15kg in 12 weeks",
      quote: "The AI Coach fixed my squat form in the first week. I've never felt stronger.",
      img: "/images/success-mehdi.jpg"
    },
    {
      name: "Sara T.",
      result: "Muscle Gain + Strength",
      quote: "The nutrition plans are so easy to follow, especially with local food options.",
      img: "/images/success-sara.jpg"
    },
    {
      name: "Omar J.",
      result: "Elite Performance",
      quote: "Being able to track my heart rate and progress on the dashboard kept me motivated.",
      img: "/images/success-omar.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-16 text-center">Legends of the Tribe</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((s, i) => (
          <div key={i} className="bg-zinc-900/40 rounded-[40px] p-8 border border-white/5 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-red-600/30">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-1">{s.name}</h3>
            <div className="bg-red-600 px-4 py-1 rounded-full text-xs font-black uppercase mb-6 italic">
              {s.result}
            </div>
            <p className="text-gray-400 italic leading-relaxed">
              "{s.quote}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
