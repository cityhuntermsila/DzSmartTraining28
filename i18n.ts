
import { Language, TranslationSet } from './types';

export const translations: Record<Language, TranslationSet> = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      programs: 'Programmes',
      schedule: 'Planning',
      memberships: 'Abonnements',
      nutrition: 'Nutrition',
      contact: 'Contact',
      aiCoach: 'Coach IA'
    },
    hero: {
      title: 'LIBÉREZ L\'ATHLÈTE EN VOUS',
      subtitle: 'Rejoignez le bootcamp numérique le plus avancé à M\'sila. Entraînement réel. Guidage IA. Résultats prouvés.',
      cta1: 'Démarrer',
      cta2: 'Voir le Planning'
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
    programs: {
      title: 'Arsenal d\'Entraînement',
      subtitle: 'Choisissez votre arme. Chaque programme est soutenu par des données IA.',
      bookNow: 'Réserver'
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
      title: 'NIVEAU DE PUISSANCE',
      subtitle: 'Rejoignez le bootcamp le plus avancé d\'Algérie.',
      badge: 'Tarification M\'sila',
      popular: 'Populaire',
      customTitle: 'Besoin d\'un plan sur mesure ?',
      customDesc: 'Tarifs préférentiels pour les entreprises locales à M\'sila.',
      customBtn: 'Support Business →'
    },
    schedule: {
      title: 'Planning des Batailles',
      time: 'Heure',
      book: 'Réserver',
      noClass: 'Pas de cours'
    },
    about: {
      title: 'REDÉFINIR LES LIMITES.',
      p1: 'DZSmartTraining n\'est pas né dans un bureau confortable. Il est né de la sueur des bootcamps matinaux. Nous combinons l\'énergie brute de l\'entraînement traditionnel avec la précision technologique moderne.',
      quote: 'Nous ne suivons pas seulement les répétitions ; nous suivons l\'évolution. Notre but est de rendre le fitness plus intelligent pour M\'sila.',
      teamTitle: 'L\'Équipe Tactique'
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Prêt à rejoindre l\'élite ? Envoyez-nous un message ou rendez-nous visite à notre QG.',
      location: 'Localisation',
      phone: 'Appelez-nous',
      email: 'Email',
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
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      programs: 'البرامج',
      schedule: 'الجدول',
      memberships: 'العضوية',
      nutrition: 'التغذية',
      contact: 'اتصل بنا',
      aiCoach: 'مدرب الذكاء الاصطناعي'
    },
    hero: {
      title: 'أطلق العنان للرياضي الذي بداخلك',
      subtitle: 'انضم إلى المعسكر التدريبي الرقمي الأكثر تقدمًا في المسيلة. تدريب حقيقي. توجيه ذكي. نتائج مثبتة.',
      cta1: 'ابدأ التدريب',
      cta2: 'عرض الجدول'
    },
    home: {
      statsMembers: 'عضو',
      statsCoaches: 'مدرب خبير',
      statsSupport: 'دعم ذكي',
      statsGains: 'نتائج مضمونة',
      featuresTitle: 'جيل جديد من التدريب الرقمي',
      featuresDesc: 'نحن نستخدم أحدث التقنيات لضمان أن يكون تدريبك فعالاً وآمناً وشخصياً.',
      motivationTitle: 'لا أعذار. فقط تقدم.',
      motivationCta: 'انضم إلينا'
    },
    programs: {
      title: 'ترسانة التدريب',
      subtitle: 'اختر سلاحك. كل برنامج مدعوم ببيانات الذكاء الاصطناعي.',
      bookNow: 'احجز الآن'
    },
    nutrition: {
      title: 'مولد التغذية الذكي',
      subtitle: 'احصل على خطة وجبات مخصصة بناءً على أهدافك وتفضيلاتك.',
      formGoal: 'الهدف',
      formPrefs: 'تفضيلات النظام الغذائي',
      generateBtn: 'إنشاء الخطة',
      generating: 'الذكاء الاصطناعي يجهز خطتك...',
      emptyState: 'املأ النموذج لإنشاء خطة وجبات مخصصة لمدة 7 أيام.',
      mealTypes: {
        breakfast: 'فطور الصباح',
        lunch: 'الغداء',
        dinner: 'العشاء',
        snacks: 'وجبات خفيفة'
      }
    },
    aiCoach: {
      title: 'معلم اليوغا الذكي',
      subtitle: 'تحليل دقيق للهيكل العظمي مع تعليقات فورية.',
      startBtn: 'بدء الجلسة',
      finishBtn: 'إنهاء',
      feedbackInitial: 'قف أمام الكاميرا.',
      feedbackScanning: 'جارٍ بدء المسح...',
      feedbackExcellent: 'ممتاز. حافظ على هذه الوضعية.',
      feedbackAdjust: 'اضبط وضعيتك قليلاً...',
      timeAligned: 'الوقت المحقق',
      vectorsTitle: 'المقاييس التشريحية',
      objectiveTitle: 'هدف التدريب',
      objectiveDesc: 'حافظ على الدقة التشريحية لتشغيل مؤقت الممارسة.'
    },
    memberships: {
      title: 'مستوى القوة',
      subtitle: 'انضم إلى المعسكر التدريبي الأكثر تقدمًا في الجزائر.',
      badge: 'أسعار المسيلة',
      popular: 'الأكثر طلباً',
      customTitle: 'هل تحتاج إلى خطة مخصصة؟',
      customDesc: 'أسعار تفضيلية للشركات المحلية في المسيلة.',
      customBtn: 'دعم الأعمال ←'
    },
    schedule: {
      title: 'جدول المعارك',
      time: 'الوقت',
      book: 'حجز',
      noClass: 'لا توجد حصة'
    },
    about: {
      title: 'إعادة تعريف الحدود.',
      p1: 'DZSmartTraining لم يولد في مكتب مريح. لقد ولد في عرق وجرأة المعسكرات الصباحية. نحن نجمع بين الطاقة الخام للتدريب التقليدي ودقة التكنولوجيا الحديثة.',
      quote: 'نحن لا نتتبع التكرارات فحسب، بل نتتبع التطور. هدفنا هو جعل اللياقة البدنية أذكى وأسرع في المسيلة.',
      teamTitle: 'الفريق التكتيكي'
    },
    contact: {
      title: 'اتصل بنا',
      subtitle: 'مستعد للانضمام إلى النخبة؟ أرسل لنا رسالة أو زرنا في مقرنا بالمسيلة.',
      location: 'الموقع',
      phone: 'اتصل بنا',
      email: 'البريد الإلكتروني',
      formTitle: 'إرسال رسالة',
      formName: 'الاسم الكامل',
      formEmail: 'البريد الإلكتروني',
      formSubject: 'الموضوع',
      formMessage: 'الرسالة',
      formSubmit: 'إرسال الرسالة'
    },
    footer: {
      desc: 'بعيداً عن اللياقة البدنية، نحن نصنع الأساطير. تدريب عالي الأداء مع ذكاء اصطناعي متطور في المسيلة.',
      quickLinks: 'روابط سريعة',
      newsletter: 'النشرة الإخبارية',
      newsletterBtn: 'انطلق',
      rights: '© 2024 DZSmartTraining المسيلة. بني للأبطال.'
    },
    common: {
      back: 'رجوع',
      next: 'التالي',
      submit: 'إرسال',
      loading: 'جاري التحميل...',
      currency: 'د.ج'
    }
  }
};
