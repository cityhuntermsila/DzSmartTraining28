import { GoogleGenerativeAI } from "@google/generative-ai";

const getGenAI = () => new GoogleGenerativeAI(process.env.API_KEY || '');

export const chatWithCoach = async (message: string, lang: string) => {
  const apiKey = process.env.API_KEY;
  console.log("DEBUG: API Key present?", !!apiKey, "Length:", apiKey?.length);

  if (!apiKey) {
    return "Error: API Key is missing. Check .env.local and reload.";
  }

  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are an elite fitness coach and nutritionist for DZSmartTraining bootcamp located in M'sila, Algeria. 
      Your tone is motivational, professional, and slightly intense (athletic coach vibe).
      Always respond in ${lang === 'ar' ? 'Arabic' : 'French'}.
      Use Algerian cultural context when discussing food (e.g., local ingredients found in M'sila like dates, semolina, local olive oil).
      Never give medical diagnoses. If someone mentions injury or severe pain, tell them to see a doctor.
      Keep answers concise and action-oriented.`
  });

  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (e) {
    console.error("DEBUG: Chat Error", e);
    throw e;
  }
};

export const generateNutritionPlan = async (userData: any, lang: string) => {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  const prompt = `Génère un plan de repas complet de 7 jours pour un utilisateur à M'sila, Algérie avec ces données :
    - Objectif : ${userData.goal}
    - Poids : ${userData.weight}kg
    - Taille : ${userData.height}cm
    - Âge : ${userData.age}
    - Préférences : ${userData.preferences}
    - Langue : ${lang === 'ar' ? 'arabe' : 'français'}
    
    IMPORTANT : Ta réponse doit être UNIQUEMENT un tableau JSON valide de 7 objets.
    Format attendu pour chaque jour:
    [
      {
        "day": "Jour 1",
        "breakfast": { "name": "...", "calories": 0, "protein": 0, "carbs": 0, "fat": 0 },
        "lunch": { "name": "...", "calories": 0 },
        "dinner": { "name": "...", "calories": 0 },
        "snacks": { "name": "...", "calories": 0 }
      },
      ...
    ]`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');

    if (firstBracket === -1 || lastBracket === -1) {
      throw new Error("Aucun tableau JSON trouvé dans la réponse.");
    }

    const jsonString = text.substring(firstBracket, lastBracket + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erreur critique de parsing Nutrition:", error, "Contenu reçu:", text);
    throw new Error("Format de données invalide reçu de l'IA.");
  }
};
