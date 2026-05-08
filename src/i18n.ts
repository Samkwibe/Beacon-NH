import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: { getHelp: "Get Help", communities: "Communities", services: "Services", stories: "Stories", events: "Events", resources: "Resources", donate: "Donate", selectLanguage: "Select your language" },
      hero: { city: "Manchester, New Hampshire", titleLine1: "Guiding", titleLine2: "Families", titleLine3: "To Safety", sub: "Beacon NH connects refugees and asylum seekers with free housing, legal aid, language support, and community — right here in Manchester, NH.", btnPrimary: "Find Help Now →", btnSecondary: "Hear Our Stories", watchStory: "Watch Our Story", stat1Num: "7,500+", stat1Label: "Refugees in NH", stat2Num: "10", stat2Label: "Languages", stat3Num: "800+", stat3Label: "Families Helped", stat4Num: "Free", stat4Label: "All Services" },
      services: {
        eyebrow: "Core Services", titleLine1: "We Are Here", titleLine2: "To Help You", sub: "All services are 100% free, confidential, and available in multiple languages.",
        housingTitle: "Emergency Housing", housingDesc: "Immediate shelter placement and long-term housing assistance for newly arrived families.",
        legalTitle: "Immigration Legal Aid", legalDesc: "Free legal representation for asylum seekers, work permits, and status adjustments.",
        eduTitle: "Language & Education", eduDesc: "ESOL English classes for adults, school enrollment for children, and tutoring.",
        jobsTitle: "Employment", jobsDesc: "Resume building, interview prep, and direct connections with local NH employers.",
        healthTitle: "Mental Wellbeing", healthDesc: "Culturally-sensitive counseling and trauma support groups in your native language.",
        foodTitle: "Food & Basic Needs", foodDesc: "Weekly food pantry access, winter clothing, and essential household items."
      }
    }
  },
  ar: {
    translation: {
      nav: { getHelp: "احصل على المساعدة", communities: "المجتمعات", services: "الخدمات", stories: "قصص", events: "الفعاليات", resources: "الموارد", donate: "تبرع", selectLanguage: "اختر لغتك" },
      hero: { city: "مانشستر، نيو هامبشاير", titleLine1: "توجيه", titleLine2: "العائلات", titleLine3: "إلى بر الأمان", sub: "تربط منارة نيو هامبشاير اللاجئين وطالبي اللجوء بالسكن المجاني، المساعدة القانونية، الدعم اللغوي، والمجتمع - هنا في مانشستر، نيو هامبشاير.", btnPrimary: "احصل على المساعدة الآن →", btnSecondary: "استمع إلى قصصنا", watchStory: "شاهد قصتنا", stat1Num: "7,500+", stat1Label: "لاجئ في نيو هامبشاير", stat2Num: "10", stat2Label: "لغات", stat3Num: "800+", stat3Label: "عائلات تمت مساعدتها", stat4Num: "مجاناً", stat4Label: "جميع الخدمات" },
      services: {
        eyebrow: "الخدمات الأساسية", titleLine1: "نحن هنا", titleLine2: "لمساعدتك", sub: "جميع الخدمات مجانية بنسبة 100٪ وسرية ومتاحة بلغات متعددة.",
        housingTitle: "الإسكان الطارئ", housingDesc: "توفير المأوى الفوري والمساعدة السكنية طويلة الأمد للعائلات الوافدة حديثًا.",
        legalTitle: "المساعدة القانونية للهجرة", legalDesc: "تمثيل قانوني مجاني لطالبي اللجوء، تصاريح العمل، وتعديل الأوضاع.",
        eduTitle: "اللغة والتعليم", eduDesc: "دروس اللغة الإنجليزية للكبار، تسجيل الأطفال في المدارس، والدروس الخصوصية.",
        jobsTitle: "التوظيف", jobsDesc: "بناء السيرة الذاتية، التحضير للمقابلات، والربط المباشر مع أصحاب العمل المحليين.",
        healthTitle: "الصحة النفسية", healthDesc: "استشارات تراعي الثقافة ومجموعات دعم الصدمات بلغتك الأم.",
        foodTitle: "الغذاء والاحتياجات الأساسية", foodDesc: "الوصول الأسبوعي إلى مخزن الطعام، الملابس الشتوية، والأدوات المنزلية الأساسية."
      }
    }
  },
  fr: {
    translation: {
      nav: { getHelp: "Obtenir de l'aide", communities: "Communautés", services: "Services", stories: "Histoires", events: "Événements", resources: "Ressources", donate: "Faire un don", selectLanguage: "Choisissez votre langue" },
      hero: { city: "Manchester, New Hampshire", titleLine1: "Guider", titleLine2: "les Familles", titleLine3: "Vers la Sécurité", sub: "Beacon NH met en relation les réfugiés et les demandeurs d'asile avec des logements gratuits, une aide juridique, un soutien linguistique et la communauté — ici même à Manchester, NH.", btnPrimary: "Trouver de l'aide →", btnSecondary: "Écoutez nos histoires", watchStory: "Regardez notre histoire", stat1Num: "7 500+", stat1Label: "Réfugiés au NH", stat2Num: "10", stat2Label: "Langues", stat3Num: "800+", stat3Label: "Familles aidées", stat4Num: "Gratuit", stat4Label: "Tous les services" },
      services: {
        eyebrow: "Services Principaux", titleLine1: "Nous Sommes Là", titleLine2: "Pour Vous Aider", sub: "Tous les services sont 100 % gratuits, confidentiels et disponibles en plusieurs langues.",
        housingTitle: "Logement d'Urgence", housingDesc: "Placement immédiat en refuge et aide au logement à long terme pour les familles nouvellement arrivées.",
        legalTitle: "Aide Juridique", legalDesc: "Représentation légale gratuite pour les demandeurs d'asile, permis de travail et régularisations.",
        eduTitle: "Langue & Éducation", eduDesc: "Cours d'anglais pour adultes, inscription scolaire pour enfants et tutorat.",
        jobsTitle: "Emploi", jobsDesc: "Création de CV, préparation aux entretiens et connexions avec les employeurs locaux.",
        healthTitle: "Bien-être Mental", healthDesc: "Conseils sensibles à la culture et groupes de soutien en traumatologie dans votre langue maternelle.",
        foodTitle: "Nourriture & Besoins de Base", foodDesc: "Accès hebdomadaire à la banque alimentaire, vêtements d'hiver et articles ménagers essentiels."
      }
    }
  },
  uk: {
    translation: {
      nav: { getHelp: "Отримати допомогу", communities: "Спільноти", services: "Послуги", stories: "Історії", events: "Події", resources: "Ресурси", donate: "Пожертвувати", selectLanguage: "Виберіть свою мову" },
      hero: { city: "Манчестер, Нью-Гемпшир", titleLine1: "Спрямовуємо", titleLine2: "Сім'ї", titleLine3: "До Безпеки", sub: "Beacon NH зв'язує біженців та шукачів притулку з безкоштовним житлом, юридичною допомогою, мовною підтримкою та спільнотою — прямо тут, у Манчестері.", btnPrimary: "Знайти допомогу зараз →", btnSecondary: "Слухати наші історії", watchStory: "Дивитися нашу історію", stat1Num: "7,500+", stat1Label: "Біженців у NH", stat2Num: "10", stat2Label: "Мов", stat3Num: "800+", stat3Label: "Сімей отримали допомогу", stat4Num: "Безкоштовно", stat4Label: "Всі послуги" },
      services: {
        eyebrow: "Основні послуги", titleLine1: "Ми тут", titleLine2: "Щоб допомогти вам", sub: "Всі послуги на 100% безкоштовні, конфіденційні та доступні багатьма мовами.",
        housingTitle: "Екстрене житло", housingDesc: "Негайне розміщення в притулку та довгострокова допомога з житлом для новоприбулих сімей.",
        legalTitle: "Юридична допомога", legalDesc: "Безкоштовне юридичне представництво для шукачів притулку, дозволи на роботу.",
        eduTitle: "Мова та освіта", eduDesc: "Уроки англійської для дорослих, запис дітей до школи та репетиторство.",
        jobsTitle: "Працевлаштування", jobsDesc: "Створення резюме, підготовка до інтерв'ю та прямі зв'язки з місцевими роботодавцями.",
        healthTitle: "Психічне здоров'я", healthDesc: "Психологічні консультації та групи підтримки рідною мовою.",
        foodTitle: "Їжа та базові потреби", foodDesc: "Щотижневий доступ до продовольчого банку, зимовий одяг та товари для дому."
      }
    }
  },
  sw: {
    translation: {
      nav: { getHelp: "Pata Msaada", communities: "Jamii", services: "Huduma", stories: "Hadithi", events: "Matukio", resources: "Rasilimali", donate: "Changia", selectLanguage: "Chagua lugha yako" },
      hero: { city: "Manchester, New Hampshire", titleLine1: "Kuongoza", titleLine2: "Familia", titleLine3: "Kwenye Usalama", sub: "Beacon NH inaunganisha wakimbizi na watafuta hifadhi na makazi ya bure, msaada wa kisheria, msaada wa lugha, na jamii - hapa Manchester, NH.", btnPrimary: "Pata Msaada Sasa →", btnSecondary: "Sikiliza Hadithi Zetu", watchStory: "Tazama Hadithi Yetu", stat1Num: "7,500+", stat1Label: "Wakimbizi NH", stat2Num: "10", stat2Label: "Lugha", stat3Num: "800+", stat3Label: "Familia Zilizosaidiwa", stat4Num: "Bure", stat4Label: "Huduma Zote" },
      services: {
        eyebrow: "Huduma Kuu", titleLine1: "Tuko Hapa", titleLine2: "Kukusaidia", sub: "Huduma zote ni za bure 100%, ni siri, na zinapatikana kwa lugha nyingi.",
        housingTitle: "Makazi ya Dharura", housingDesc: "Makazi ya haraka na msaada wa makazi ya muda mrefu kwa familia mpya.",
        legalTitle: "Msaada wa Kisheria", legalDesc: "Msaada wa kisheria wa bure kwa watafuta hifadhi, vibali vya kazi, na marekebisho ya hali.",
        eduTitle: "Lugha na Elimu", eduDesc: "Madarasa ya Kiingereza kwa watu wazima, uandikishaji shule kwa watoto, na mafunzo.",
        jobsTitle: "Ajira", jobsDesc: "Kujenga wasifu, maandalizi ya mahojiano, na mawasiliano na waajiri wa ndani.",
        healthTitle: "Afya ya Akili", healthDesc: "Ushauri wa kitamaduni na vikundi vya msaada kwa lugha yako ya asili.",
        foodTitle: "Chakula na Mahitaji", foodDesc: "Chakula cha kila wiki, nguo za baridi, na vitu muhimu vya nyumbani."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
