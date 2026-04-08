
import React, { useState } from 'react';
import { TranslationSet, DailyPlan } from '../types';
import { generateNutritionPlan } from '../services/geminiService';

interface NutritionPageProps {
  t: TranslationSet;
}

const NutritionPage: React.FC<NutritionPageProps> = ({ t }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<DailyPlan[] | null>(null);
  const [formData, setFormData] = useState({
    weight: 80,
    height: 180,
    age: 25,
    gender: 'Masculin',
    activityLevel: 'Modéré',
    mealsPerDay: 3,
    goal: 'Perte de Poids',
    preferences: 'Halal, haute teneur en protéines'
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPlans(null); // Clear previous plans to show loading properly

    try {
      const data = await generateNutritionPlan(formData, 'fr');
      if (data && Array.isArray(data)) {
        setPlans(data);
      } else {
        throw new Error("Format de données invalide reçu de l'IA.");
      }
    } catch (err: any) {
      console.error("Nutrition Generation Error:", err);
      setError(`Erreur: ${err.message || JSON.stringify(err)}. Vérifiez la console (F12) et la clé API.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{t.nutrition.title}</h1>
        <p className="text-gray-400 text-xs max-w-xl mx-auto">{t.nutrition.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleGenerate} className="bg-zinc-900/80 p-6 rounded-2xl sticky top-24 border border-white/5 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.nutrition.formGoal}</label>
              <select
                className="w-full bg-black border border-white/10 rounded-lg p-3 font-bold text-white focus:ring-1 focus:ring-red-600 outline-none"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              >
                <option>Perte de Poids</option>
                <option>Prise de Muscle</option>
                <option>Maintien</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.nutrition.formPrefs}</label>
              <input
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-red-600 outline-none"
                value={formData.preferences}
                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                placeholder="Ex: Halal, Sans lactose"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Genre</label>
                <select
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-xs outline-none"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option>Masculin</option>
                  <option>Féminin</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Âge</label>
                <input
                  type="number"
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-xs outline-none"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Poids (kg)</label>
                <input
                  type="number"
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-xs outline-none"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Taille (cm)</label>
                <input
                  type="number"
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-xs outline-none"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Activité</label>
                <select
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-xs outline-none"
                  value={formData.activityLevel}
                  onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                >
                  <option>Sédentaire</option>
                  <option>Modéré</option>
                  <option>Actif</option>
                  <option>Très Actif</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Repas / Jour</label>
                <input
                  type="number"
                  min="2"
                  max="6"
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-xs outline-none"
                  value={formData.mealsPerDay}
                  onChange={(e) => setFormData({ ...formData, mealsPerDay: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 py-4 rounded-lg font-black uppercase tracking-widest disabled:opacity-50 hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  {t.common.loading}
                </span>
              ) : t.nutrition.generateBtn}
            </button>
          </form>
        </div>

        <div className="lg:col-span-3">
          {error && (
            <div className="bg-red-600/10 border border-red-600/20 p-6 rounded-2xl mb-8 flex items-center gap-4 text-red-500 animate-in fade-in duration-300">
              <span className="text-2xl">⚠️</span>
              <p className="font-bold">{error}</p>
            </div>
          )}

          {!plans && !loading && !error && (
            <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl">
              <div className="text-5xl mb-4 animate-pulse">🥗</div>
              <p className="text-gray-500 italic">{t.nutrition.emptyState}</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-96 bg-zinc-900/20 rounded-3xl border border-white/5">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-red-600/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-3xl">🍲</div>
              </div>
              <p className="font-black uppercase tracking-[0.2em] text-red-500 text-sm animate-pulse">{t.nutrition.generating}</p>
              <p className="text-xs text-gray-500 mt-2 italic">Analyse des besoins caloriques en cours...</p>
            </div>
          )}

          {plans && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
              {plans.map((dayPlan, idx) => (
                <div key={idx} className="bg-zinc-900/40 rounded-3xl p-8 border border-white/5 overflow-hidden relative group hover:bg-zinc-900/60 transition-colors">
                  <div className="absolute top-0 right-0 bg-red-600 px-6 py-2 font-black uppercase italic rounded-bl-3xl shadow-lg">
                    Jour {idx + 1}
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter italic">{dayPlan.day}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {['breakfast', 'lunch', 'dinner', 'snacks'].map((mealType) => {
                      const meal = (dayPlan as any)[mealType];
                      const mealLabel = (t.nutrition.mealTypes as any)[mealType];
                      return (
                        <div key={mealType} className="bg-black/40 p-5 rounded-2xl border border-white/5 group-hover:border-red-600/20 transition-colors">
                          <div className="text-[10px] font-black uppercase text-red-500 mb-2 tracking-widest">{mealLabel}</div>
                          <div className="font-bold mb-3 min-h-[48px] text-gray-100">{meal.name}</div>
                          <div className="flex justify-between items-center text-[10px] text-gray-500 border-t border-white/5 pt-3">
                            <span className="flex items-center gap-1 font-bold">🔥 {meal.calories} <span className="text-[8px] opacity-60">KCAL</span></span>
                            {meal.protein && <span className="flex items-center gap-1 font-bold">🥩 {meal.protein}g <span className="text-[8px] opacity-60">P</span></span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
