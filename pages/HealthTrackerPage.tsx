
import React, { useState } from 'react';
import { TranslationSet } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const dummyData = [
  { name: 'Week 1', weight: 85, hr: 72 },
  { name: 'Week 2', weight: 84.2, hr: 70 },
  { name: 'Week 3', weight: 83.5, hr: 68 },
  { name: 'Week 4', weight: 82.8, hr: 67 },
  { name: 'Week 5', weight: 82, hr: 66 },
  { name: 'Week 6', weight: 81.5, hr: 65 },
];

interface HealthTrackerPageProps {
  t: TranslationSet;
}

const HealthTrackerPage: React.FC<HealthTrackerPageProps> = ({ t }) => {
  const [stats, setStats] = useState({
    weight: 81.5,
    height: 180,
    age: 28,
    hr: 65
  });

  const bmi = (stats.weight / ((stats.height / 100) ** 2)).toFixed(1);
  const bmiCategory = parseFloat(bmi) < 18.5 ? 'Underweight' : parseFloat(bmi) < 25 ? 'Healthy' : parseFloat(bmi) < 30 ? 'Overweight' : 'Obese';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">Health Dashboard</h1>
          <p className="text-gray-400">Track your vital stats and visualize your journey.</p>
        </div>
        <div className="bg-red-600 px-6 py-4 rounded-xl skew-x-[-6deg]">
          <div className="skew-x-[6deg] text-center">
            <div className="text-xs font-bold uppercase tracking-widest opacity-80">Current BMI</div>
            <div className="text-4xl font-black">{bmi}</div>
            <div className="text-xs font-bold uppercase tracking-widest bg-black/20 rounded px-2 py-0.5 mt-1">{bmiCategory}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
          <h2 className="text-2xl font-bold mb-6 uppercase">Update Stats</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Weight (kg)</label>
              <input 
                type="number" 
                value={stats.weight} 
                onChange={(e) => setStats({...stats, weight: parseFloat(e.target.value)})}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Resting HR (BPM)</label>
              <input 
                type="number" 
                value={stats.hr}
                onChange={(e) => setStats({...stats, hr: parseFloat(e.target.value)})}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-xl font-bold"
              />
            </div>
            <button className="w-full bg-red-600 py-4 font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors">
              Save Progress
            </button>
          </div>
        </div>

        {/* Weight Chart */}
        <div className="lg:col-span-2 bg-zinc-900/50 p-8 rounded-2xl border border-white/5 min-h-[400px]">
          <h2 className="text-2xl font-bold mb-6 uppercase">Weight Evolution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#ef4444' }}
                />
                <Area type="monotone" dataKey="weight" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HR Chart */}
        <div className="lg:col-span-3 bg-zinc-900/50 p-8 rounded-2xl border border-white/5 min-h-[300px]">
          <h2 className="text-2xl font-bold mb-6 uppercase">Resting Heart Rate (BPM)</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="hr" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrackerPage;
