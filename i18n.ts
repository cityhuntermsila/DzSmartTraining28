
import { TranslationSet } from './types';

export const translations: Record<string, TranslationSet> = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',


      memberships: 'Abonnements',
      nutrition: 'prototype Nutrition',
      contact: 'Contact',
      aiCoach: 'Prototype Coach IA'
    },
    hero: {
      title: 'LIBÉREZ L\'ATHLÈTE EN VOUS',
      subtitle: 'Rejoignez le bootcamp numérique le plus avancé à M\'sila. Entraînement réel. Guidage IA. Résultats prouvés.',
      cta1: 'Démarrer',

    },
    home: {
      statsMembers: 'Membres',
      statsCoaches: 'Coachs Experts',
      statsSupport: 'Support IA',
      statsGains: 'Gains Assurés',
      featuresTitle: 'Coaching Digital Nouvelle Génération',
      featuresDesc: 'Nous utilisons des technologies de pointe pour garantir que votre entraînement est efficace, sûr et personnalisé.',
      motivationTitle: 'PAS D\'EXCUSES. SEULEMENT DU PROGRÈS.',
      motivationCta: 'Rejoindre la Tribu'
    },

    nutrition: {
      title: 'Générateur de Nutrition IA',
      subtitle: 'Obtenez un plan de repas personnalisé basé sur vos objectifs et préférences.',
      formGoal: 'Objectif',
      formPrefs: 'Préférences Alimentaires',
      generateBtn: 'Générer le Plan',
      generating: 'L\'IA prépare votre plan...',
      emptyState: 'Remplissez le formulaire pour créer votre plan de 7 jours.',
      mealTypes: {
        breakfast: 'Petit-Déjeuner',
        lunch: 'Déjeuner',
        dinner: 'Dîner',
        snacks: 'Collations'
      }
    },
    aiCoach: {
      title: 'Sensei Yoga IA',
      subtitle: 'Analyse squelettique de précision avec retour en temps réel.',
      startBtn: 'Démarrer la Session',
      finishBtn: 'Terminer',
      feedbackInitial: 'Placez-vous devant la caméra.',
      feedbackScanning: 'Initialisation du scan...',
      feedbackExcellent: 'Excellent. Tenez cette position.',
      feedbackAdjust: 'Ajustez légèrement votre pose...',
      timeAligned: 'Temps Aligné',
      vectorsTitle: 'Vecteurs Anatomiques',
      objectiveTitle: 'Objectif d\'Entraînement',
      objectiveDesc: 'Maintenez la précision anatomique pour déclencher le minuteur.'
    },
    memberships: {
      title: 'Abonnements',
      subtitle: 'Rejoignez le bootcamp le plus avancé d\'Algérie.',
      badge: 'Tarification M\'sila',
      popular: 'Populaire',
      customTitle: 'Besoin d\'un plan sur mesure ?',
      customDesc: 'Tarifs préférentiels pour les entreprises locales à M\'sila.',
      customBtn: 'Support Business →'
    },

    about: {
      title: 'REDÉFINIR LES LIMITES.',
      p1: 'DZSmartTraining n\'est pas né dans un bureau confortable. Il est né de la sueur des bootcamps matinaux. Nous combinons l\'énergie brute de l\'entraînement traditionnel avec la précision technologique moderne.',
      quote: 'Nous ne suivons pas seulement les répétitions ; nous suivons l\'évolution. Notre but est de rendre le fitness plus identifier pour M\'sila.',
      teamTitle: 'L\'Équipe Tactique'
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Prêt à rejoindre l\'élite ? Envoyez-nous un message ou rendez-nous visite à notre QG.',
      name: 'Oussama Boussadia',
      location: 'Localisation',
      locationValue: 'Cité laroukat, M\'sila, Algérie, 28000',
      phone: 'Appelez-nous',
      phoneValue: '0658879345',
      email: 'Email',
      emailValue: 'bb075398@gmail.com',
      formTitle: 'Envoyer un Message',
      formName: 'Nom Complet',
      formEmail: 'Email',
      formSubject: 'Sujet',
      formMessage: 'Message',
      formSubmit: 'Déployer le Message'
    },
    footer: {
      desc: 'Au-delà du fitness, nous forgeons des légendes. Un entraînement haute performance combiné à une IA de pointe à M\'sila.',
      quickLinks: 'Liens Rapides',
      newsletter: 'Newsletter',
      newsletterBtn: 'GO',
      rights: '© 2024 DZSmartTraining M\'sila. Conçu pour les champions.'
    },
    common: {
      back: 'Retour',
      next: 'Suivant',
      submit: 'Envoyer',
      loading: 'Chargement...',
      currency: 'DZD'
    }
  }
};
