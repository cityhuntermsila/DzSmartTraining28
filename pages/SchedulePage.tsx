
import React from 'react';
import { TranslationSet } from '../types';

const SchedulePage: React.FC<{ t: TranslationSet }> = ({ t }) => {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const times = ["06:00", "08:00", "12:00", "17:00", "19:00", "20:30"];
  
  const schedule = [
    { time: "06:00", day: "Lun", type: "HIIT", coach: "Sam" },
    { time: "08:00", day: "Mar", type: "Mobilité", coach: "Alex" },
    { time: "17:00", day: "Mer", type: "Bootcamp", coach: "Sam" },
    { time: "19:00", day: "Jeu", type: "Force", coach: "Mike" },
    { time: "06:00", day: "Ven", type: "Tabata", coach: "Alex" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-8 text-center">{t.schedule.title}</h1>
      
      <div className="overflow-x-auto bg-zinc-950 rounded-3xl border border-white/10 p-4">
        <table className="w-full text-left rtl:text-right border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 border-b border-white/5 bg-zinc-900/50 rounded-tl-2xl">{t.schedule.time}</th>
              {days.map(d => <th key={d} className="p-4 border-b border-white/5 font-black uppercase">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {times.map((time, idx) => (
              <tr key={time} className={idx % 2 === 0 ? 'bg-zinc-900/20' : ''}>
                <td className="p-4 font-bold border-r border-white/5">{time}</td>
                {days.map(day => {
                  const entry = schedule.find(s => s.time === time && s.day === day);
                  return (
                    <td key={day} className="p-2 border-r border-white/5 h-24">
                      {entry ? (
                        <div className="bg-red-600/20 border-l-2 border-red-600 p-2 rounded h-full">
                          <div className="text-xs font-black uppercase text-red-500">{entry.type}</div>
                          <div className="text-sm font-bold">{entry.coach}</div>
                          <button className="text-[10px] uppercase font-bold text-white/50 hover:text-white mt-1">{t.schedule.book}</button>
                        </div>
                      ) : (
                        <div className="opacity-10 text-[10px] italic">{t.schedule.noClass}</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePage;
