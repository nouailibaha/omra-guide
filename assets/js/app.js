// ============================================
// OMRAH GUIDE APP - Main JavaScript
// ============================================

// App State
let currentStepIndex = 0;
let tawafCounter = 0;
let saiCounter = 0;
let isInCategoryView = true;
let completedCategories = new Set(); // Track completed categories
let categoryProgress = {}; // Track step progress per category
let isInIhram = false; // Track if user is in Ihram state
let ihramBannerDismissed = false; // Track if user manually dismissed banner

// Category Information
const categories = [
  {
    id: "A",
    icon: "🏠",
    title: "À la maison",
    subtitle: "Préparation avant le départ",
    stepCount: 5,
  },
  {
    id: "B",
    icon: "✈️",
    title: "Dans l'avion",
    subtitle: "Entrée en état d'Ihram",
    stepCount: 4,
  },
  {
    id: "C",
    icon: "🕌",
    title: "Entrer dans Masjid Al-Haram",
    subtitle: "Première visite au Masjid Al-Haram",
    stepCount: 3,
  },
  {
    id: "D",
    icon: "🕋",
    title: "À l'intérieur du Masjid: Al-Tawaf",
    subtitle: "Tourner autour de la Kaaba (7 fois)",
    stepCount: 9,
  },
  {
    id: "E",
    icon: "🚶",
    title: "À l'intérieur du Masjid: Al-Sa'i",
    subtitle: "Entre Safa et Marwa (7 fois)",
    stepCount: 3,
  },
  {
    id: "F",
    icon: "✂️",
    title: "Al-Halq",
    subtitle: "Se raser les cheveux",
    stepCount: 2,
  },
];

// All Omrah Steps with detailed information
const omrahSteps = [
  // ========== SECTION A: À LA MAISON ==========
  {
    section: "A",
    sectionTitle: "À la maison",
    sectionSubtitle: "Préparation avant le départ",
    sectionIcon: "🏠",
    step: 1,
    title: "Ghusl (Douche)",
    description:
      "Prends une douche complète. C'est une Sunnah recommandée avant d'entrer en état d'Ihram.",
  },
  {
    section: "A",
    sectionTitle: "À la maison",
    sectionSubtitle: "Préparation avant le départ",
    sectionIcon: "🏠",
    step: 2,
    title: "Épilation",
    description: "Enlève les poils en faisant ta douche.",
  },
  {
    section: "A",
    sectionTitle: "À la maison",
    sectionSubtitle: "Préparation avant le départ",
    sectionIcon: "🏠",
    step: 3,
    title: "Application du parfum",
    description:
      "<strong>Important :</strong> Applique du parfum <strong>uniquement sur ton corps</strong>, PAS sur les vêtements d'Ihram. Le parfum sur le corps est recommandé avant l'Ihram.",
    alert: {
      title: "⚠️ Attention",
      items: ["Ne mets PAS de parfum sur les vêtements d'Ihram"],
    },
  },
  {
    section: "A",
    sectionTitle: "À la maison",
    sectionSubtitle: "Préparation avant le départ",
    sectionIcon: "🏠",
    step: 4,
    title: "Porter les vêtements d'Ihram",
    description: "Revêts tes vêtements d'Ihram.",
  },
  {
    section: "A",
    sectionTitle: "À la maison",
    sectionSubtitle: "Préparation avant le départ",
    sectionIcon: "🏠",
    step: 5,
    title: "Départ vers l'aéroport",
    description: "Dirige-toi vers l'aéroport et prends ton vol.",
  },
  // ========== SECTION B: DANS L'AVION ==========
  {
    section: "B",
    sectionTitle: "Dans l'avion",
    sectionSubtitle: "Entrée en état d'Ihram",
    sectionIcon: "✈️",
    step: 1,
    title: "Écouter l'annonce du pilote",
    description:
      "Écoute attentivement le pilote. Il annoncera quand l'avion approche du Miqat (point de passage obligatoire). C'est à ce moment que tu devras entrer en état d'Ihram.",
  },
  {
    section: "B",
    sectionTitle: "Dans l'avion",
    sectionSubtitle: "Entrée en état d'Ihram",
    sectionIcon: "✈️",
    step: 2,
    title: "Prononcer la Niyyah (intention)",
    description:
      "Une fois l'annonce faite, prononce l'intention de la Omrah avec cette invocation :",
    duaa: {
      arabic:
        "لَبَّيْكَ اللَّهُمَّ عُمْرَةً، فَإِنْ حَبَسَنِي حَابِسٌ فَمَحِلِّي حَيْثُ حَبَسْتَنِي",
      transliteration:
        "Labbayka Allahumma 'Umrah, Fa In habasani habison fa mahilli haythou habastani",
      translation:
        "Me voici, Ô Allah, pour la Omrah. Si quelque chose m'empêche, ma sortie d'Ihram sera là où Tu m'as empêché.",
      meaning:
        "Cette invocation exprime ton intention de faire la Omrah et demande à Allah de te faciliter. La deuxième partie est une précaution : si tu es empêché (par maladie ou autre), tu pourras sortir de l'état d'Ihram sans pénalité.",
    },
  },
  {
    section: "B",
    sectionTitle: "Dans l'avion",
    sectionSubtitle: "Entrée en état d'Ihram",
    sectionIcon: "✈️",
    step: 3,
    title: "Réciter la Talbiyah",
    description:
      "Continue à répéter cette invocation sacrée jusqu'à ce que tu voies la Kaaba :",
    duaa: {
      arabic:
        "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
      transliteration:
        "Labbayka Allahumma labbayk, labbayka la sharika laka labbayk, innal hamda wan-ni'mata laka wal-mulk la sharika lak",
      translation:
        "Me voici, Ô Allah, me voici. Me voici, Tu n'as pas d'associé, me voici. Certes, la louange, les bienfaits et la royauté T'appartiennent. Tu n'as pas d'associé.",
      meaning:
        "La Talbiyah est le cri du pèlerin proclamant sa réponse à l'appel d'Allah. Elle affirme l'Unicité d'Allah (Tawhid) et reconnaît que toute louange et tout bienfait viennent de Lui seul. C'est l'une des plus belles invocations de la Omrah.",
    },
  },
  {
    section: "B",
    sectionTitle: "Dans l'avion",
    sectionSubtitle: "Entrée en état d'Ihram",
    sectionIcon: "✈️",
    step: 4,
    title: "⚠️ INTERDICTIONS en Ihram",
    description:
      "À partir de maintenant, tu es en état d'Ihram. Certains actes sont strictement interdits :",
    alert: {
      title: "🚫 NE FAIS PAS :",
      items: [
        "Toucher tes cheveux ou ta barbe (risque de faire tomber des poils)",
        "Mettre du parfum ou utiliser des lingettes parfumées",
        "Porter quoi que ce soit sur ta tête (pour les hommes)",
        "Couper tes ongles ou tes cheveux",
        "Avoir des relations intimes",
      ],
    },
    info: {
      title: "📝 Conseil important",
      text: "Continue à répéter la Talbiyah régulièrement. Tu es maintenant en état sacré d'Ihram jusqu'à la fin de ta Omrah.",
    },
  },

  // ========== SECTION C: ENTRER DANS LA MOSQUÉE ==========
  {
    section: "C",
    sectionTitle: "Entrer dans Masjid Al-Haram",
    sectionSubtitle: "Première visite à la mosquée sacrée",
    sectionIcon: "🕌",
    step: 1,
    title: "Trouver une porte d'entrée",
    description:
      "Une fois arrivé à l'hôtel, dirige-toi vers la Mosquée Sacrée. Voici les principales portes d'entrée :",
    info: {
      title: "🚪 Portes principales",
      list: [
        "Porte Al-Umrah (62/63) - La plus proche de l'hôtel Mercure Hibatullah",
        "Porte Fahd (79)",
        "Porte du Roi Abdulaziz (1)",
        "Porte Al-Fath (45)",
        "Porte du Roi Abdullah (100)",
      ],
    },
    googleMaps: {
      label: "📍 Ouvrir Porte Al-Umrah (62/63) sur Google Maps",
      url: "https://maps.app.goo.gl/mqdUdCuM2pRzgJXM6",
    },
  },
  {
    section: "C",
    sectionTitle: "Entrer dans Masjid Al-Haram",
    sectionSubtitle: "Première visite à la mosquée sacrée",
    sectionIcon: "🕌",
    step: 2,
    title: "Invocation en entrant dans la mosquée",
    description:
      "En entrant dans la Mosquée Sacrée, prononce cette invocation avec humilité :",
    duaa: {
      arabic:
        "أَعُوذُ بِاللهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. الْحَمْدُ لِلَّهِ، اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي وَافْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      transliteration:
        "Aoudhou Billahi Al-Adhim wa biwajhihi al-Karim wa Soultanihi al-Qadim mina al-Shaytan al-Rajim. Al-Hamdoulillah, Allahumma Salli wa Sallim 'ala Mohammed wa 'ala Ali Mohammed, Allahumma Ighfir li dhounoubi wa Iftah li Abwaba Rahmatik",
      translation:
        "Je cherche refuge auprès d'Allah le Très Grand, par Sa Face Généreuse et Son Pouvoir Éternel, contre Satan le lapidé. Louange à Allah, Ô Allah, accorde Tes bénédictions et Ta paix à Mohammed et à la famille de Mohammed. Ô Allah, pardonne mes péchés et ouvre-moi les portes de Ta Miséricorde.",
      meaning:
        "Cette invocation demande la protection d'Allah contre Satan, invoque les bénédictions sur le Prophète ﷺ, et sollicite le pardon et la miséricorde d'Allah. C'est une préparation spirituelle pour entrer dans le lieu le plus sacré de la Terre.",
    },
  },
  {
    section: "C",
    sectionTitle: "Entrer dans Masjid Al-Haram",
    sectionSubtitle: "Première visite à la mosquée sacrée",
    sectionIcon: "🕌",
    step: 3,
    title: "Se diriger vers la Kaaba",
    description: "Dirige-toi maintenant vers la Kaaba.",
  },

  // ========== SECTION D: AL-TAWAF ==========
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Tourner autour de la Kaaba (7 fois)",
    sectionIcon: "🕋",
    step: 1,
    title: "Voir la Kaaba - Arrêter la Talbiyah",
    description:
      'Dès que tu vois la Kaaba, <strong>arrête de dire "Labbayka Allahumma Labbayk"</strong>. Contemple la Kaaba avec humilité et fais des invocations personnelles.',
  },
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Tourner autour de la Kaaba (7 fois)",
    sectionIcon: "🕋",
    step: 2,
    title: "Repérer la lumière verte",
    description:
      "Cherche la <strong>lumière verte</strong> qui indique Al-Hajar Al-Aswad (la Pierre Noire) dans le coin droit de la Kaaba. C'est le point de départ du Tawaf.",
  },
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Tourner autour de la Kaaba (7 fois)",
    sectionIcon: "🕋",
    step: 3,
    title: "Commencer le Tawaf",
    description:
      "Une fois que le coin droit de la Kaaba (Al-Hajar Al-Aswad) est sur ton épaule droite, lève la main droite vers ce coin, salue-le et dis :",
    duaa: {
      arabic: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
      transliteration: "Bismillah, Allahu Akbar",
      translation: "Au nom d'Allah, Allah est le Plus Grand",
      meaning:
        "Cette formule marque le début de chaque tour du Tawaf. Elle glorifie Allah et commence chaque circuit avec Son nom. Répète cette formule à CHAQUE fois que tu reviens au niveau d'Al-Hajar Al-Aswad (la lumière verte).",
    },
    info: {
      title: "🔄 Utilise le compteur",
      text: "Utilise le compteur ci-dessous pour suivre tes 7 tours. Durant le Tawaf, tu peux faire des invocations personnelles ou lire le Coran. Reste concentré et présent.",
    },
    alert: {
      title: "📝 À chaque tour",
      items: [
        "Lève la main droite vers Al-Hajar Al-Aswad",
        "Dis : Bismillah, Allahu Akbar",
        "Clique sur '+' dans le compteur",
      ],
    },
    counter: "tawaf",
  },
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Tourner autour de la Kaaba (7 fois)",
    sectionIcon: "🕋",
    step: 4,
    title: "Après les 7 tours - Maqam Ibrahim",
    description:
      "Une fois les 7 tours terminés, dirige-toi vers <strong>Maqam Ibrahim</strong> (la station d'Abraham) pour accomplir 2 rakaat de prière.",
  },
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Après le Tawaf",
    sectionIcon: "🕋",
    step: 6,
    title: "En marchant vers Maqam Ibrahim",
    description:
      "En te dirigeant vers Maqam Ibrahim, récite ce verset du Coran :",
    duaa: {
      arabic: "وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى",
      transliteration: "Wattakhidhou min maqami Ibrahima musalla",
      translation:
        "Et adoptez pour lieu de prière, ce lieu où Abraham se tint debout",
      meaning:
        "Ce verset (Sourate Al-Baqara, 2:125) rappelle que c'est une obligation de prier derrière Maqam Ibrahim après le Tawaf, suivant le commandement d'Allah.",
    },
  },
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Après le Tawaf",
    sectionIcon: "🕋",
    step: 7,
    title: "Prière de 2 rakaat",
    description:
      "Derrière ou proche de Maqam Ibrahim, accomplis 2 rakaat de prière :",
    info: {
      title: "🙏 Comment prier",
      list: [
        "<strong>1ère rakaa :</strong> Après Al-Fatiha, récite Sourate Al-Kafiroun (109)",
        "<strong>2ème rakaa :</strong> Après Al-Fatiha, récite Sourate Al-Ikhlas (112)",
      ],
    },
  },
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Après le Tawaf",
    sectionIcon: "🕋",
    step: 7,
    title: "Boire de l'eau Zamzam",
    description:
      "Après la prière, dirige-toi vers les fontaines d'eau Zamzam pour boire. C'est une eau bénie et il est recommandé d'en boire après le Tawaf.",
  },
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Après le Tawaf",
    sectionIcon: "🕋",
    step: 8,
    title: "Invocation en buvant Zamzam",
    description: "En buvant l'eau de Zamzam, fais cette invocation :",
    duaa: {
      arabic:
        "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ",
      transliteration:
        "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan wasi'an, wa shifa'an min kulli da'",
      translation:
        "Ô Allah, je Te demande une science utile, une subsistance large, et une guérison de toute maladie",
      meaning:
        "Le Prophète ﷺ a dit : \"L'eau de Zamzam est pour ce pour quoi on la boit.\" Cette invocation demande à Allah des bienfaits dans la connaissance, la subsistance et la santé. Tu peux faire d'autres invocations personnelles.",
    },
  },
  {
    section: "D",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Tawaf",
    sectionSubtitle: "Après le Tawaf",
    sectionIcon: "🕋",
    step: 9,
    title: "Se diriger vers Al-Sa'i",
    description:
      "Maintenant, dirige-toi vers <strong>Al-Safa</strong> pour commencer le Sa'i (les allers-retours entre Safa et Marwa) Y'en a plusieurs etage pour la Safa & Marwa, rentre dans celui qu'il ya moins du monde.",
  },

  // ========== SECTION E: AL-SA'I ==========
  {
    section: "E",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Sa'i",
    sectionSubtitle: "Les allers-retours entre Safa et Marwa (7 fois)",
    sectionIcon: "🚶",
    step: 1,
    title: "Se rendre à Al-Safa",
    description:
      "Dirige-toi vers la colline d'Al-Safa. En t'approchant, récite ce verset du Coran :",
    duaa: {
      arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
      transliteration: "Inna Al-Safa wal-Marwa min sha'a'iri Allah",
      translation: "Certes, Al-Safa et Al-Marwa sont parmi les rites d'Allah",
      meaning:
        "Ce verset (Sourate Al-Baqara, 2:158) confirme que le Sa'i entre Safa et Marwa est l'un des rites sacrés prescrits par Allah, commémorant la recherche d'eau par Hajar (la femme d'Abraham).",
    },
    info: {
      title: "📝 Puis dis",
      text: "Abdaou bima badaa Allah bihi (Je commence par ce qu'Allah a commencé)",
    },
  },
  {
    section: "E",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Sa'i",
    sectionSubtitle: "Les allers-retours entre Safa et Marwa (7 fois)",
    sectionIcon: "🚶",
    step: 2,
    title: "Sur Al-Safa - Invocations",
    description:
      "Une fois monté sur Al-Safa, tourne-toi vers la Kaaba et répète cette invocation <strong>3 fois</strong> puis tu as le droit d'invoker Allah avec ce que tu veux :",
    duaa: {
      arabic:
        "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
      transliteration:
        "La ilaha illa Allah wahdahu la sharika lah, lahul mulk wa lahul hamd wa huwa 'ala kulli shay'in qadir. La ilaha illa Allah wahdah, anjaza wa'dah, wa nasara 'abdah, wa hazamal ahzaba wahdah",
      translation:
        "Il n'y a de divinité digne d'adoration qu'Allah, Seul sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose. Il n'y a de divinité qu'Allah Seul, Il a tenu Sa promesse, a secouru Son serviteur, et a vaincu les coalisés à Lui Seul.",
      meaning:
        "Cette invocation puissante affirme l'Unicité d'Allah (Tawhid) et célèbre Sa victoire et Sa puissance. Elle rappelle que c'est Allah seul qui accorde la victoire et accomplit Ses promesses. Répète-la 3 fois sur Al-Safa.",
    },
  },
  {
    section: "E",
    sectionTitle: "À l'intérieur d'Al-Haram : Al-Sa'i",
    sectionSubtitle: "Les allers-retours entre Safa et Marwa (7 fois)",
    sectionIcon: "🚶",
    step: 3,
    title: "Commencer le Sa'i - 7 trajets",
    description:
      "Maintenant, commence à marcher de Safa vers Marwa. Un trajet complet compte pour 1. Fais 7 trajets au total. Chaque fois que tu atteins Al-Safa ou Al-Marwa, répète cette invocation <strong>3 fois</strong> :",
    duaa: {
      arabic:
        "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
      transliteration:
        "La ilaha illa Allah wahdahu la sharika lah, lahul mulk wa lahul hamd wa huwa 'ala kulli shay'in qadir. La ilaha illa Allah wahdah, anjaza wa'dah, wa nasara 'abdah, wa hazamal ahzaba wahdah",
      translation:
        "Il n'y a de divinité digne d'adoration qu'Allah, Seul sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose. Il n'y a de divinité qu'Allah Seul, Il a tenu Sa promesse, a secouru Son serviteur, et a vaincu les coalisés à Lui Seul.",
      meaning:
        "Répète cette invocation 3 fois à CHAQUE fois que tu atteins Al-Safa ou Al-Marwa. Durant les allers-retours, tu peux faire des invocations personnelles, lire le Coran ou du dhikr.",
    },
    info: {
      title: "🔢 Les 7 trajets",
      list: [
        "1. Safa → Marwa",
        "2. Marwa → Safa",
        "3. Safa → Marwa",
        "4. Marwa → Safa",
        "5. Safa → Marwa",
        "6. Marwa → Safa",
        "7. Safa → Marwa (dernier trajet)",
      ],
    },
    alert: {
      title: "🏃 Note pour les hommes",
      items: [
        "Entre les deux lumières vertes, les hommes doivent marcher rapidement (jogging léger). Les femmes marchent normalement.",
      ],
    },
    counter: "sai",
  },

  // ========== SECTION F: AL-HALQ ==========
  {
    section: "F",
    sectionTitle: "En dehors d'Al-Haram : Al-Halq",
    sectionSubtitle: "Se raser ou couper les cheveux",
    sectionIcon: "✂️",
    step: 1,
    title: "Se rendre au salon de coiffure",
    description:
      'Sors de la mosquée et dirige-toi vers un salon de coiffure, "30 Degree Barbershop".',
    info: {
      title: "Fin de la Omrah",
      text: "✅",
    },
    googleMaps: {
      label: "Ouvrir 30 Degree Barbershop sur Google Maps",
      url: "https://maps.app.goo.gl/rDmyZYSsmZMpm6E4A",
    },
  },
  {
    section: "F",
    sectionTitle: "En dehors d'Al-Haram : Al-Halq",
    sectionSubtitle: "Se raser ou couper les cheveux",
    sectionIcon: "✂️",
    step: 2,
    title: "🎊 Mabrouk!",
    description:
      "<strong style='font-size: 1.3rem;'>🎉 Al Hamdoulileh ! Qu'Allah accepte ta Omra le couz et fasse qu'elle soit parmi les Omrah acceptées.",
  },
];

// DOM Elements
let categoryView, categoryGrid, stepView;
let stepCard, stepNumber, stepContent, sectionHeader;
let sectionTitle, sectionSubtitle, sectionIcon;
let currentSectionEl, progressPercent, progressFill;
let prevBtn,
  nextBtn,
  nextBtnText,
  resetBtn,
  backToCategoriesBtn,
  resetCategoryBtn;
let counterSection, counterLabel, counterValue, counterMinus, counterPlus;
let modalOverlay, modalIcon, modalTitle, modalMessage, modalButtons;
let ihramWarningBanner, ihramWarningClose;

// Initialize App
function initApp() {
  // Get DOM elements
  categoryView = document.getElementById("categoryView");
  categoryGrid = document.getElementById("categoryGrid");
  stepView = document.getElementById("stepView");
  stepCard = document.getElementById("stepCard");
  stepNumber = document.getElementById("stepNumber");
  stepContent = document.getElementById("stepContent");
  sectionHeader = document.getElementById("sectionHeader");
  sectionTitle = document.getElementById("sectionTitle");
  sectionSubtitle = document.getElementById("sectionSubtitle");
  sectionIcon = document.querySelector(".section-icon");
  currentSectionEl = document.getElementById("currentSection");
  progressPercent = document.getElementById("progressPercent");
  progressFill = document.getElementById("progressFill");
  prevBtn = document.getElementById("prevBtn");
  nextBtn = document.getElementById("nextBtn");
  nextBtnText = document.getElementById("nextBtnText");
  resetBtnCategory = document.getElementById("resetBtnCategory");
  backToCategoriesBtn = document.getElementById("backToCategoriesBtn");
  resetCategoryBtn = document.getElementById("resetCategoryBtn");
  counterSection = document.getElementById("counterSection");
  counterLabel = document.getElementById("counterLabel");
  counterValue = document.getElementById("counterValue");
  counterMinus = document.getElementById("counterMinus");
  counterPlus = document.getElementById("counterPlus");
  modalOverlay = document.getElementById("modalOverlay");
  modalIcon = document.getElementById("modalIcon");
  modalTitle = document.getElementById("modalTitle");
  modalMessage = document.getElementById("modalMessage");
  modalButtons = document.getElementById("modalButtons");
  ihramWarningBanner = document.getElementById("ihramWarningBanner");
  ihramWarningClose = document.getElementById("ihramWarningClose");

  loadProgress();
  initializeCategoryProgress();
  renderCategoryView();

  // Show correct view based on saved state
  if (isInCategoryView) {
    showCategoryView();
  } else {
    showStepView();
  }

  // Event Listeners
  prevBtn.addEventListener("click", previousStep);
  nextBtn.addEventListener("click", nextStep);
  if (resetBtnCategory) {
    resetBtnCategory.addEventListener("click", resetProgress);
  }
  backToCategoriesBtn.addEventListener("click", showCategoryView);
  resetCategoryBtn.addEventListener("click", resetCurrentCategory);
  counterMinus.addEventListener("click", decrementCounter);
  counterPlus.addEventListener("click", incrementCounter);
  ihramWarningClose.addEventListener("click", () => {
    ihramBannerDismissed = true;
    ihramWarningBanner.classList.add("hidden");
    saveProgress();
  });

  // Update online/offline status
  updateOnlineStatus();
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
}

// ============================================
// MODERN MODAL SYSTEM
// ============================================
function showModal(options) {
  const { icon, title, message, buttons } = options;

  modalIcon.textContent = icon;
  modalTitle.textContent = title;
  modalMessage.innerHTML = message;
  modalButtons.innerHTML = "";

  buttons.forEach((btn) => {
    const button = document.createElement("button");
    button.className = `btn ${btn.className || "btn-primary"}`;
    button.textContent = btn.text;
    button.onclick = () => {
      hideModal();
      if (btn.onClick) btn.onClick();
    };
    modalButtons.appendChild(button);
  });

  modalOverlay.classList.remove("hidden");
  setTimeout(() => modalOverlay.classList.add("show"), 10);
}

function hideModal() {
  modalOverlay.classList.remove("show");
  setTimeout(() => modalOverlay.classList.add("hidden"), 300);
}

// Initialize category progress tracking
function initializeCategoryProgress() {
  categories.forEach((cat) => {
    if (!categoryProgress[cat.id]) {
      categoryProgress[cat.id] = { completed: 0, total: cat.stepCount };
    }
  });
}

// Calculate category completion percentage
function getCategoryProgress(sectionId) {
  const sectionSteps = omrahSteps.filter((step) => step.section === sectionId);
  const completed = categoryProgress[sectionId]?.completed || 0;
  const total = sectionSteps.length;
  return Math.round((completed / total) * 100);
}

// Update category progress
function updateCategoryProgress(sectionId, completed) {
  if (!categoryProgress[sectionId]) {
    const sectionSteps = omrahSteps.filter(
      (step) => step.section === sectionId,
    );
    categoryProgress[sectionId] = { completed: 0, total: sectionSteps.length };
  }
  categoryProgress[sectionId].completed = completed;
  saveProgress();
}

// Render Category View
function renderCategoryView() {
  categoryGrid.innerHTML = "";

  categories.forEach((category) => {
    const card = document.createElement("div");
    const isCompleted = completedCategories.has(category.id);
    const progress = getCategoryProgress(category.id);
    card.className = `category-card ${isCompleted ? "completed" : ""}`;
    card.onclick = () => selectCategory(category.id);

    card.innerHTML = `
      <div class="category-progress-ring">
        <svg class="progress-ring" width="70" height="70">
          <circle class="progress-ring-circle-bg" cx="35" cy="35" r="30"></circle>
          <circle class="progress-ring-circle" cx="35" cy="35" r="30" 
            style="stroke-dashoffset: ${188.5 - (188.5 * progress) / 100};"></circle>
        </svg>
        <div class="category-icon-inner">${category.icon}</div>
        <div class="progress-percentage">${progress}%</div>
      </div>
      <div class="category-content">
        <div class="category-title">
          ${category.title}
          ${isCompleted ? '<span class="completion-badge">✓</span>' : ""}
        </div>
        <div class="category-subtitle">${category.subtitle}</div>
        <div class="category-step-count">${category.stepCount} étapes</div>
      </div>
      <div class="category-arrow">→</div>
    `;

    categoryGrid.appendChild(card);
  });
}

// Check if user is currently in Ihram state based on progress
function checkIhramState() {
  // Find the index of Section B Step 2 (Niyyah - when entering Ihram)
  const ihramStepIndex = omrahSteps.findIndex(
    (step) => step.section === "B" && step.step === 2,
  );
  // Find the index of first step in Section F (Al-Halq - exit Ihram)
  const halqStartIndex = omrahSteps.findIndex((step) => step.section === "F");

  // User is in Ihram if they've COMPLETED the Niyyah step (currentStepIndex > ihramStepIndex)
  // and haven't reached Section F yet
  return currentStepIndex > ihramStepIndex && currentStepIndex < halqStartIndex;
}

// Select a category
function selectCategory(sectionId) {
  // Find the first step of this section
  const firstStepIndex = omrahSteps.findIndex(
    (step) => step.section === sectionId,
  );
  if (firstStepIndex !== -1) {
    // Check if current step is already in this category
    const currentStep = omrahSteps[currentStepIndex];
    const isInSameCategory = currentStep && currentStep.section === sectionId;

    // Only reset to first step if not already in this category
    if (!isInSameCategory) {
      currentStepIndex = firstStepIndex;
    }
    // Otherwise, keep currentStepIndex to resume where user left off

    saveProgress();
    showStepView();
  }
}

// Show Category View
function showCategoryView() {
  isInCategoryView = true;
  categoryView.classList.remove("hidden");
  stepView.classList.add("hidden");
  renderCategoryView(); // Re-render to show updated progress

  // Update Ihram state based on current progress
  isInIhram = checkIhramState();

  // Show Ihram warning banner if in Ihram state and not dismissed
  if (isInIhram && !ihramBannerDismissed) {
    ihramWarningBanner.classList.remove("hidden");
  } else {
    ihramWarningBanner.classList.add("hidden");
  }

  saveProgress(); // Save the view state
}

// Show Step View
function showStepView() {
  isInCategoryView = false;
  categoryView.classList.add("hidden");
  stepView.classList.remove("hidden");
  renderStep();
  updateProgress();
  saveProgress(); // Save the view state
}

// Render Current Step
function renderStep(shouldScroll = true) {
  const step = omrahSteps[currentStepIndex];

  // Update section header
  sectionIcon.textContent = step.sectionIcon;
  sectionTitle.textContent = step.sectionTitle;
  sectionSubtitle.textContent = step.sectionSubtitle;
  currentSectionEl.textContent = step.section;

  // Update step number
  stepNumber.textContent = `Étape ${currentStepIndex + 1}/${omrahSteps.length}`;

  // Build step content HTML
  let contentHTML = `
        <h3 class="step-title">${step.title}</h3>
        <div class="step-description">${step.description}</div>
    `;

  // Add Duaa if present
  if (step.duaa) {
    contentHTML += `
            <div class="duaa-section">
                <div class="duaa-label">🤲 Invocation</div>
                <div class="duaa-arabic">${step.duaa.arabic}</div>
                <div class="duaa-transliteration">${step.duaa.transliteration}</div>
                <div class="duaa-translation"><strong>Traduction :</strong> ${step.duaa.translation}</div>
                <div class="duaa-meaning"><strong>💡 Signification :</strong> ${step.duaa.meaning}</div>
            </div>
        `;
  }

  // Add Alert if present
  if (step.alert) {
    contentHTML += `
            <div class="alert-box">
                <div class="alert-title">${step.alert.title}</div>
                <ul class="alert-list">
                    ${step.alert.items.map((item) => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        `;
  }

  // Add Info Box if present
  if (step.info) {
    contentHTML += `
            <div class="info-box">
                <div class="info-title">${step.info.title}</div>
                ${step.info.text ? `<p>${step.info.text}</p>` : ""}
                ${step.info.list ? `<ul class="info-list">${step.info.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
            </div>
        `;
  }

  // Add Google Maps button if present
  if (step.googleMaps) {
    contentHTML += `
            <a href="${step.googleMaps.url}" target="_blank" rel="noopener noreferrer" class="location-btn">
                📍 ${step.googleMaps.label}
            </a>
        `;
  }

  stepContent.innerHTML = contentHTML;

  // Handle Counter
  if (step.counter) {
    counterSection.classList.remove("hidden");
    if (step.counter === "tawaf") {
      counterLabel.textContent = "🕋 Tours du Tawaf effectués";
      counterValue.textContent = `${tawafCounter}/7`;
      counterMinus.disabled = tawafCounter === 0;
      counterPlus.disabled = tawafCounter === 7;
    } else if (step.counter === "sai") {
      counterLabel.textContent = "🚶 Trajets du Sa'i effectués";
      counterValue.textContent = `${saiCounter}/7`;
      counterMinus.disabled = saiCounter === 0;
      counterPlus.disabled = saiCounter === 7;
    }
  } else {
    counterSection.classList.add("hidden");
  }

  // Update navigation buttons
  prevBtn.disabled = currentStepIndex === 0;

  // Check if we can proceed to next step
  const canProceed = canProceedToNextStep();
  nextBtn.disabled = !canProceed;

  if (currentStepIndex === omrahSteps.length - 1) {
    nextBtnText.textContent = "🎉 Terminer";
  } else {
    nextBtnText.textContent = "Suivant →";
  }

  // Scroll to top smoothly only if requested
  if (shouldScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Animate card
  stepCard.style.animation = "none";
  setTimeout(() => {
    stepCard.style.animation = "fadeIn 0.5s ease";
  }, 10);
}

// Check if can proceed to next step
function canProceedToNextStep() {
  const step = omrahSteps[currentStepIndex];

  if (step.counter === "tawaf") {
    return tawafCounter === 7;
  } else if (step.counter === "sai") {
    return saiCounter === 7;
  }

  return true;
}

// Counter Functions
function incrementCounter() {
  const step = omrahSteps[currentStepIndex];

  if (step.counter === "tawaf" && tawafCounter < 7) {
    tawafCounter++;
    saveProgress();
    renderStep(false); // Don't scroll on counter change
  } else if (step.counter === "sai" && saiCounter < 7) {
    saiCounter++;
    saveProgress();
    renderStep(false); // Don't scroll on counter change
  }
}

function decrementCounter() {
  const step = omrahSteps[currentStepIndex];

  if (step.counter === "tawaf" && tawafCounter > 0) {
    tawafCounter--;
    saveProgress();
    renderStep(false); // Don't scroll on counter change
  } else if (step.counter === "sai" && saiCounter > 0) {
    saiCounter--;
    saveProgress();
    renderStep(false); // Don't scroll on counter change
  }
}

// Navigation Functions
function nextStep() {
  if (currentStepIndex < omrahSteps.length - 1 && canProceedToNextStep()) {
    const currentSection = omrahSteps[currentStepIndex].section;
    const nextSection = omrahSteps[currentStepIndex + 1].section;

    // Check if we're moving to a new section
    if (currentSection !== nextSection) {
      // Mark current category as completed
      completedCategories.add(currentSection);
      const sectionSteps = omrahSteps.filter(
        (step) => step.section === currentSection,
      );
      updateCategoryProgress(currentSection, sectionSteps.length);
      saveProgress();

      // Show modern completion modal
      showModal({
        icon: "✅",
        title: `Section ${currentSection} terminée !`,
        message: `<strong>${omrahSteps[currentStepIndex].sectionTitle}</strong> est maintenant complétée.<br><br>Choisissez la section suivante à consulter.`,
        buttons: [
          {
            text: "Retour aux sections",
            className: "btn-primary",
            onClick: () => showCategoryView(),
          },
        ],
      });
    } else {
      // Continue within same category
      currentStepIndex++;
      const currentSection = omrahSteps[currentStepIndex].section;
      const completedInSection = omrahSteps
        .slice(0, currentStepIndex + 1)
        .filter((s) => s.section === currentSection).length;
      updateCategoryProgress(currentSection, completedInSection);

      saveProgress();
      renderStep();
      updateProgress();
    }
  } else if (currentStepIndex === omrahSteps.length - 1) {
    // Last step - mark final category as complete
    const currentSection = omrahSteps[currentStepIndex].section;
    completedCategories.add(currentSection);
    const sectionSteps = omrahSteps.filter(
      (step) => step.section === currentSection,
    );
    updateCategoryProgress(currentSection, sectionSteps.length);
    saveProgress();

    // Omrah completed - show modern modal
    showModal({
      icon: "🎉",
      title: "Félicitations !",
      message:
        "<strong>Al Hamdoulileh Votre Omrah est terminée !</strong><br><br>",
      buttons: [
        {
          text: "Réinitialiser tout",
          className: "btn-primary",
          onClick: () => {
            currentStepIndex = 0;
            tawafCounter = 0;
            saiCounter = 0;
            completedCategories = new Set();
            categoryProgress = {};
            isInIhram = false;
            ihramBannerDismissed = false;
            localStorage.removeItem("omrahProgress");
            sessionStorage.removeItem("omrahProgress");
            initializeCategoryProgress();
            showCategoryView();
            renderCategoryView();
          },
        },
        {
          text: "Retour aux sections",
          className: "btn-secondary",
          onClick: () => showCategoryView(),
        },
      ],
    });
  }
}

function previousStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    saveProgress();
    renderStep();
    updateProgress();
  }
}

// Progress Functions
function updateProgress() {
  const progress = ((currentStepIndex + 1) / omrahSteps.length) * 100;
  progressPercent.textContent = `${Math.round(progress)}%`;
  progressFill.style.width = `${progress}%`;
}

// Local Storage Functions
function saveProgress() {
  try {
    const progressData = {
      currentStepIndex,
      tawafCounter,
      saiCounter,
      isInCategoryView,
      completedCategories: Array.from(completedCategories),
      categoryProgress,
      isInIhram,
      ihramBannerDismissed,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem("omrahProgress", JSON.stringify(progressData));
    // Also save to sessionStorage as backup
    sessionStorage.setItem("omrahProgress", JSON.stringify(progressData));
  } catch (e) {
    console.error("Error saving progress:", e);
  }
}

function loadProgress() {
  try {
    // Try localStorage first, then sessionStorage as fallback
    let saved = localStorage.getItem("omrahProgress");
    if (!saved) {
      saved = sessionStorage.getItem("omrahProgress");
    }

    if (saved) {
      const progressData = JSON.parse(saved);
      currentStepIndex = progressData.currentStepIndex || 0;
      tawafCounter = progressData.tawafCounter || 0;
      saiCounter = progressData.saiCounter || 0;
      isInCategoryView =
        progressData.isInCategoryView !== undefined
          ? progressData.isInCategoryView
          : true;
      completedCategories = new Set(progressData.completedCategories || []);
      categoryProgress = progressData.categoryProgress || {};
      isInIhram = progressData.isInIhram || false;
      ihramBannerDismissed = progressData.ihramBannerDismissed || false;
    }
  } catch (e) {
    console.error("Error loading progress:", e);
    // Reset to defaults if there's an error
    currentStepIndex = 0;
    tawafCounter = 0;
    saiCounter = 0;
    isInCategoryView = true;
    completedCategories = new Set();
    categoryProgress = {};
  }
}

function resetProgress() {
  showModal({
    icon: "⚠️",
    title: "Confirmer la réinitialisation",
    message:
      "Es-tu sûr de vouloir réinitialiser toute ta progression ?<br><br>Toutes les données seront supprimées.",
    buttons: [
      {
        text: "Annuler",
        className: "btn-secondary",
        onClick: null,
      },
      {
        text: "Réinitialiser",
        className: "btn-danger",
        onClick: () => {
          currentStepIndex = 0;
          tawafCounter = 0;
          saiCounter = 0;
          completedCategories = new Set();
          categoryProgress = {};
          isInIhram = false;
          ihramBannerDismissed = false;
          localStorage.removeItem("omrahProgress");
          sessionStorage.removeItem("omrahProgress");
          // Reset UI without page reload (works offline)
          initializeCategoryProgress();
          showCategoryView();
          renderCategoryView();
          hideModal();
        },
      },
    ],
  });
}

// Reset only current category
function resetCurrentCategory() {
  const currentSection = omrahSteps[currentStepIndex].section;
  const sectionName = omrahSteps[currentStepIndex].sectionTitle;

  showModal({
    icon: "⚠️",
    title: "Réinitialiser cette section",
    message: `Es-tu sûr de vouloir réinitialiser la section <strong>${currentSection}: ${sectionName}</strong> ?<br><br>Tu seras ramené au début de cette section.`,
    buttons: [
      {
        text: "Annuler",
        className: "btn-secondary",
        onClick: null,
      },
      {
        text: "Réinitialiser",
        className: "btn-danger",
        onClick: () => {
          // Find first step of current section
          const firstStepIndex = omrahSteps.findIndex(
            (step) => step.section === currentSection,
          );

          // Reset section progress
          if (currentSection === "D") {
            tawafCounter = 0;
          } else if (currentSection === "E") {
            saiCounter = 0;
          }

          // Reset category progress and completion
          completedCategories.delete(currentSection);
          if (categoryProgress[currentSection]) {
            categoryProgress[currentSection].completed = 0;
          }

          // Go to first step of this section
          currentStepIndex = firstStepIndex;
          saveProgress();
          renderStep();
          updateProgress();
        },
      },
    ],
  });
}

// Online/Offline Status
function updateOnlineStatus() {
  const indicator = document.getElementById("offlineIndicator");
  const statusText = indicator.querySelector(".status-text");

  if (navigator.onLine) {
    statusText.textContent = "En ligne";
  } else {
    statusText.textContent = "Hors ligne";
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
