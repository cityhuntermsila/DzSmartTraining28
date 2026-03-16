

export interface TranslationSet {
  nav: {
    home: string;
    about: string;


    memberships: string;
    nutrition: string;
    contact: string;
    aiCoach: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta1: string;

  };
  home: {
    statsMembers: string;
    statsCoaches: string;
    statsSupport: string;
    statsGains: string;
    featuresTitle: string;
    featuresDesc: string;
    motivationTitle: string;
    motivationCta: string;
  };

  nutrition: {
    title: string;
    subtitle: string;
    formGoal: string;
    formPrefs: string;
    generateBtn: string;
    generating: string;
    emptyState: string;
    mealTypes: {
      breakfast: string;
      lunch: string;
      dinner: string;
      snacks: string;
    }
  };
  aiCoach: {
    title: string;
    subtitle: string;
    startBtn: string;
    finishBtn: string;
    feedbackInitial: string;
    feedbackScanning: string;
    feedbackExcellent: string;
    feedbackAdjust: string;
    timeAligned: string;
    vectorsTitle: string;
    objectiveTitle: string;
    objectiveDesc: string;
  };
  memberships: {
    title: string;
    subtitle: string;
    badge: string;
    popular: string;
    customTitle: string;
    customDesc: string;
    customBtn: string;
  };

  about: {
    title: string;
    p1: string;
    quote: string;
    teamTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    location: string;
    locationValue: string;
    phone: string;
    phoneValue: string;
    email: string;
    emailValue: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    newsletter: string;
    newsletterBtn: string;
    rights: string;
  };
  common: {
    back: string;
    next: string;
    submit: string;
    loading: string;
    currency: string;
  };
}



export interface UserHealthData {
  age: number;
  weight: number;
  height: number;
  heartRate: number;
  lastUpdated: string;
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
}
