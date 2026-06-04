import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ─── Spanish › Unit 1 ────────────────────────────────────────────────────

  {
    id: "es-unit-1-lesson-1",
    unitId: "es-unit-1",
    languageId: "es",
    title: "Common Greetings",
    description: "Learn the most common Spanish greetings",
    order: 1,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/es-greet/80/80",
    goals: [
      { description: "Learn 5 common greetings in Spanish" },
      { description: "Understand when to use formal vs informal greetings" },
    ],
    vocab: [
      {
        word: "Hola",
        translation: "Hello",
        pronunciation: "OH-lah",
        example: "Hola, ¿cómo estás?",
      },
      {
        word: "Buenos días",
        translation: "Good morning",
        pronunciation: "BWEH-nos DEE-as",
        example: "Buenos días, señor García.",
      },
      {
        word: "Buenas tardes",
        translation: "Good afternoon",
        pronunciation: "BWEH-nas TAR-des",
        example: "Buenas tardes, ¿cómo te va?",
      },
      {
        word: "Buenas noches",
        translation: "Good night",
        pronunciation: "BWEH-nas NOH-ches",
        example: "Buenas noches, hasta mañana.",
      },
      {
        word: "Adiós",
        translation: "Goodbye",
        pronunciation: "ah-DYOS",
        example: "Adiós, nos vemos mañana.",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you say 'Good morning' in Spanish?",
        options: ["Buenas noches", "Buenos días", "Buenas tardes", "Adiós"],
        correctAnswer: "Buenos días",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "Hola", right: "Hello" },
          { left: "Adiós", right: "Goodbye" },
          { left: "Buenas noches", right: "Good night" },
        ],
      },
      {
        type: "multiple-choice",
        question: "What does 'Buenas tardes' mean?",
        options: ["Good morning", "Good night", "Good afternoon", "Hello"],
        correctAnswer: "Good afternoon",
      },
    ],
  },

  {
    id: "es-unit-1-lesson-2",
    unitId: "es-unit-1",
    languageId: "es",
    title: "Introducing Yourself",
    description: "Learn how to introduce yourself in Spanish",
    order: 2,
    type: "phrase",
    xpReward: 15,
    thumbnailUrl: "https://picsum.photos/seed/es-intro/80/80",
    goals: [
      { description: "Say your name in Spanish" },
      { description: "Ask someone their name" },
      { description: "Say where you are from" },
    ],
    phrases: [
      {
        phrase: "Me llamo ___.",
        translation: "My name is ___.",
        pronunciation: "meh YAH-moh",
        situation: "When introducing yourself to someone new",
      },
      {
        phrase: "¿Cómo te llamas?",
        translation: "What is your name?",
        pronunciation: "KOH-moh teh YAH-mas",
        situation: "When asking someone their name (informal)",
      },
      {
        phrase: "Soy de ___.",
        translation: "I am from ___.",
        pronunciation: "soy deh",
        situation: "When telling someone where you are from",
      },
      {
        phrase: "Mucho gusto.",
        translation: "Nice to meet you.",
        pronunciation: "MOO-choh GOOS-toh",
        situation: "When meeting someone for the first time",
      },
    ],
    activities: [
      {
        type: "fill-in-blank",
        sentence: "Me _____ María.",
        correctAnswer: "llamo",
        hint: "This word means 'my name is'",
      },
      {
        type: "multiple-choice",
        question: "How do you ask someone their name in Spanish?",
        options: [
          "¿Cómo estás?",
          "¿Cómo te llamas?",
          "¿De dónde eres?",
          "Mucho gusto.",
        ],
        correctAnswer: "¿Cómo te llamas?",
      },
      {
        type: "listen-select",
        audioText: "Mucho gusto.",
        options: [
          "Nice to meet you.",
          "Good morning.",
          "What is your name?",
          "Goodbye.",
        ],
        correctAnswer: "Nice to meet you.",
      },
    ],
  },

  {
    id: "es-unit-1-lesson-3",
    unitId: "es-unit-1",
    languageId: "es",
    title: "AI Teacher: Greetings Practice",
    description: "Practice greetings with your AI Spanish teacher",
    order: 3,
    type: "ai-teacher",
    xpReward: 20,
    thumbnailUrl: "https://picsum.photos/seed/es-ai1/80/80",
    goals: [
      { description: "Hold a short greeting conversation in Spanish" },
      { description: "Respond naturally to common greetings" },
    ],
    activities: [],
    aiTeacherPrompt: {
      lessonTopic: "Spanish greetings and introductions",
      targetVocab: [
        "Hola",
        "Buenos días",
        "Buenas tardes",
        "Adiós",
        "Me llamo",
        "¿Cómo te llamas?",
        "Mucho gusto",
      ],
      systemPrompt: `You are a friendly Spanish teacher named Sofia.
You are teaching a beginner student their very first Spanish lesson on greetings and introductions.

Keep the lesson conversational and encouraging. Start by greeting the student in Spanish, then gently guide them to respond.
Correct mistakes kindly. Celebrate small wins with enthusiasm.

Focus only on: Hola, Buenos días, Buenas tardes, Adiós, Me llamo, ¿Cómo te llamas?, Mucho gusto.

Speak mostly English with short Spanish phrases. Keep sentences simple and short.`,
    },
  },

  {
    id: "es-unit-1-lesson-4",
    unitId: "es-unit-1",
    languageId: "es",
    title: "Daily Expressions",
    description: "Essential polite phrases for everyday situations",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/es-daily/80/80",
    goals: [
      { description: "Learn polite phrases like please and thank you" },
      { description: "Respond appropriately in common situations" },
    ],
    vocab: [
      {
        word: "Gracias",
        translation: "Thank you",
        pronunciation: "GRAH-syahs",
        example: "Muchas gracias por tu ayuda.",
      },
      {
        word: "Por favor",
        translation: "Please",
        pronunciation: "por fah-VOR",
        example: "Un café, por favor.",
      },
      {
        word: "De nada",
        translation: "You're welcome",
        pronunciation: "deh NAH-dah",
        example: "De nada, fue un placer.",
      },
      {
        word: "Disculpe",
        translation: "Excuse me",
        pronunciation: "dees-KOOL-peh",
        example: "Disculpe, ¿dónde está el baño?",
      },
      {
        word: "Lo siento",
        translation: "I'm sorry",
        pronunciation: "loh SYEN-toh",
        example: "Lo siento mucho.",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you say 'Thank you' in Spanish?",
        options: ["Por favor", "Gracias", "De nada", "Lo siento"],
        correctAnswer: "Gracias",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "Por favor", right: "Please" },
          { left: "De nada", right: "You're welcome" },
          { left: "Lo siento", right: "I'm sorry" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "Un café, _____ favor.",
        correctAnswer: "por",
        hint: "The word before 'favor' when saying 'please'",
      },
    ],
  },

  {
    id: "es-unit-1-lesson-5",
    unitId: "es-unit-1",
    languageId: "es",
    title: "Feelings & Emotions",
    description: "Describe how you feel in Spanish",
    order: 5,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/es-feel/80/80",
    goals: [
      { description: "Say how you are feeling in Spanish" },
      { description: "Ask someone how they feel" },
    ],
    vocab: [
      {
        word: "Bien",
        translation: "Good / Well",
        pronunciation: "byen",
        example: "Estoy muy bien, gracias.",
      },
      {
        word: "Mal",
        translation: "Bad / Not well",
        pronunciation: "mahl",
        example: "Hoy me siento mal.",
      },
      {
        word: "Cansado",
        translation: "Tired",
        pronunciation: "kan-SAH-doh",
        example: "Estoy muy cansado hoy.",
      },
      {
        word: "Feliz",
        translation: "Happy",
        pronunciation: "feh-LEES",
        example: "Estoy muy feliz hoy.",
      },
      {
        word: "¿Cómo estás?",
        translation: "How are you?",
        pronunciation: "KOH-moh ehs-TAHS",
        example: "Hola, ¿cómo estás?",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you ask 'How are you?' in Spanish?",
        options: ["¿Cómo te llamas?", "¿Cómo estás?", "¿De dónde eres?", "¿Qué tal?"],
        correctAnswer: "¿Cómo estás?",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "Bien", right: "Good" },
          { left: "Cansado", right: "Tired" },
          { left: "Feliz", right: "Happy" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "Hoy estoy muy _____.",
        correctAnswer: "feliz",
        hint: "The Spanish word for 'happy'",
      },
    ],
  },

  {
    id: "es-unit-1-lesson-6",
    unitId: "es-unit-1",
    languageId: "es",
    title: "AI Teacher: Full Conversation",
    description: "Hold a full beginner conversation with your AI teacher",
    order: 6,
    type: "ai-teacher",
    xpReward: 25,
    thumbnailUrl: "https://picsum.photos/seed/es-ai2/80/80",
    goals: [
      { description: "Greet, introduce yourself, and describe your feelings" },
      { description: "Hold a 5-turn conversation in Spanish" },
    ],
    activities: [],
    aiTeacherPrompt: {
      lessonTopic: "Full beginner Spanish conversation",
      targetVocab: [
        "Hola", "Buenos días", "Me llamo", "¿Cómo estás?",
        "Bien", "Mal", "Feliz", "Gracias", "Mucho gusto",
      ],
      systemPrompt: `You are Sofia, a warm and encouraging Spanish teacher.
Guide the student through a complete beginner conversation covering:
1. Greetings (Hola, Buenos días)
2. Introductions (Me llamo, ¿Cómo te llamas?)
3. Feelings (¿Cómo estás?, Bien/Mal/Feliz)
4. Polite phrases (Gracias, De nada)

Correct gently, celebrate wins, and keep sentences short and simple.
Use English for explanations, Spanish for practice prompts.`,
    },
  },

  // ─── Spanish › Unit 2 ────────────────────────────────────────────────────

  {
    id: "es-unit-2-lesson-1",
    unitId: "es-unit-2",
    languageId: "es",
    title: "Numbers 1–10",
    description: "Count from one to ten in Spanish",
    order: 1,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/es-nums/80/80",
    goals: [
      { description: "Count from 1 to 10 in Spanish" },
      { description: "Recognize written Spanish numbers" },
    ],
    vocab: [
      { word: "uno", translation: "one", pronunciation: "OO-noh", example: "Tengo un gato." },
      { word: "dos", translation: "two", pronunciation: "dohs", example: "Hay dos libros." },
      { word: "tres", translation: "three", pronunciation: "trehs", example: "Tres amigos." },
      { word: "cuatro", translation: "four", pronunciation: "KWAH-troh", example: "Cuatro días." },
      { word: "cinco", translation: "five", pronunciation: "SEEN-koh", example: "Cinco minutos." },
      { word: "seis", translation: "six", pronunciation: "says", example: "Seis manzanas." },
      { word: "siete", translation: "seven", pronunciation: "SYEH-teh", example: "Siete días." },
      { word: "ocho", translation: "eight", pronunciation: "OH-choh", example: "Ocho horas." },
      { word: "nueve", translation: "nine", pronunciation: "NWEH-beh", example: "Nueve años." },
      { word: "diez", translation: "ten", pronunciation: "dyehs", example: "Diez euros." },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "What is 'cinco' in English?",
        options: ["four", "six", "five", "seven"],
        correctAnswer: "five",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "uno", right: "one" },
          { left: "tres", right: "three" },
          { left: "diez", right: "ten" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "Hay _____ libros en la mesa. (2)",
        correctAnswer: "dos",
        hint: "The Spanish word for two",
      },
    ],
  },

  {
    id: "es-unit-2-lesson-2",
    unitId: "es-unit-2",
    languageId: "es",
    title: "Colors",
    description: "Name common colors in Spanish",
    order: 2,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/es-colors/80/80",
    goals: [
      { description: "Name 6 common colors in Spanish" },
      { description: "Use colors to describe objects" },
    ],
    vocab: [
      { word: "rojo", translation: "red", pronunciation: "ROH-hoh", example: "La manzana es roja." },
      { word: "azul", translation: "blue", pronunciation: "ah-SOOL", example: "El cielo es azul." },
      { word: "verde", translation: "green", pronunciation: "BEHR-deh", example: "La hoja es verde." },
      { word: "amarillo", translation: "yellow", pronunciation: "ah-mah-REE-yoh", example: "El sol es amarillo." },
      { word: "blanco", translation: "white", pronunciation: "BLAHN-koh", example: "La nieve es blanca." },
      { word: "negro", translation: "black", pronunciation: "NEH-groh", example: "El gato es negro." },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "What color is 'azul'?",
        options: ["red", "green", "yellow", "blue"],
        correctAnswer: "blue",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "rojo", right: "red" },
          { left: "verde", right: "green" },
          { left: "negro", right: "black" },
        ],
      },
    ],
  },

  {
    id: "es-unit-2-lesson-3",
    unitId: "es-unit-2",
    languageId: "es",
    title: "Days of the Week",
    description: "Learn the seven days of the week in Spanish",
    order: 3,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/es-days/80/80",
    goals: [
      { description: "Name all 7 days of the week in Spanish" },
      { description: "Know that Spanish days start with lowercase" },
    ],
    vocab: [
      { word: "lunes", translation: "Monday", pronunciation: "LOO-nes", example: "El lunes tengo trabajo." },
      { word: "martes", translation: "Tuesday", pronunciation: "MAR-tes", example: "El martes voy al gym." },
      { word: "miércoles", translation: "Wednesday", pronunciation: "MYER-koh-les", example: "El miércoles hay clase." },
      { word: "jueves", translation: "Thursday", pronunciation: "HWEH-bes", example: "El jueves salimos." },
      { word: "viernes", translation: "Friday", pronunciation: "BYER-nes", example: "El viernes hay fiesta." },
      { word: "sábado", translation: "Saturday", pronunciation: "SAH-bah-doh", example: "El sábado descanso." },
      { word: "domingo", translation: "Sunday", pronunciation: "doh-MEEN-goh", example: "El domingo es familiar." },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "What is 'viernes' in English?",
        options: ["Monday", "Wednesday", "Friday", "Sunday"],
        correctAnswer: "Friday",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "lunes", right: "Monday" },
          { left: "sábado", right: "Saturday" },
          { left: "domingo", right: "Sunday" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "El _____ tengo trabajo. (Monday)",
        correctAnswer: "lunes",
        hint: "The first day of the working week in Spanish",
      },
    ],
  },

  {
    id: "es-unit-2-lesson-4",
    unitId: "es-unit-2",
    languageId: "es",
    title: "Food & Drinks",
    description: "Order food and drinks in Spanish",
    order: 4,
    type: "phrase",
    xpReward: 15,
    thumbnailUrl: "https://picsum.photos/seed/es-food/80/80",
    goals: [
      { description: "Name common food and drinks in Spanish" },
      { description: "Order at a café or restaurant" },
    ],
    phrases: [
      {
        phrase: "Quisiera un café.",
        translation: "I would like a coffee.",
        pronunciation: "kee-SYEH-rah oon kah-FEH",
        situation: "Ordering at a café",
      },
      {
        phrase: "¿Qué recomienda?",
        translation: "What do you recommend?",
        pronunciation: "keh reh-koh-MYEN-dah",
        situation: "Asking a waiter for a recommendation",
      },
      {
        phrase: "La cuenta, por favor.",
        translation: "The bill, please.",
        pronunciation: "lah KWEN-tah, por fah-VOR",
        situation: "Asking for the check",
      },
      {
        phrase: "Está delicioso.",
        translation: "It is delicious.",
        pronunciation: "ehs-TAH deh-lee-SYOH-soh",
        situation: "Complimenting the food",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you ask for the bill in Spanish?",
        options: ["Está delicioso.", "La cuenta, por favor.", "Quisiera un café.", "¿Qué recomienda?"],
        correctAnswer: "La cuenta, por favor.",
      },
      {
        type: "fill-in-blank",
        sentence: "Quisiera un _____. (coffee)",
        correctAnswer: "café",
        hint: "The Spanish word for coffee",
      },
      {
        type: "listen-select",
        audioText: "Está delicioso.",
        options: ["The bill, please.", "It is delicious.", "I would like coffee.", "What do you recommend?"],
        correctAnswer: "It is delicious.",
      },
    ],
  },

  {
    id: "es-unit-2-lesson-5",
    unitId: "es-unit-2",
    languageId: "es",
    title: "AI Teacher: Numbers & Food",
    description: "Practice numbers and ordering food with your AI teacher",
    order: 5,
    type: "ai-teacher",
    xpReward: 20,
    thumbnailUrl: "https://picsum.photos/seed/es-ai3/80/80",
    goals: [
      { description: "Count and use numbers in conversation" },
      { description: "Order food and drinks at a café" },
    ],
    activities: [],
    aiTeacherPrompt: {
      lessonTopic: "Spanish numbers and ordering food",
      targetVocab: ["uno", "dos", "tres", "café", "La cuenta", "Por favor", "Está delicioso"],
      systemPrompt: `You are Sofia, a friendly Spanish teacher.
Role-play a café scene. You are the waiter and the student is the customer.
Guide them to order using numbers and food vocabulary.
Correct gently, keep it fun and conversational.
Speak mostly English for explanations, Spanish for role-play.`,
    },
  },

  // ─── French › Unit 1 ─────────────────────────────────────────────────────

  {
    id: "fr-unit-1-lesson-1",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "Common Greetings",
    description: "Learn the most common French greetings",
    order: 1,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/fr-greet/80/80",
    goals: [
      { description: "Learn 5 common greetings in French" },
      { description: "Know when to use 'tu' vs 'vous'" },
    ],
    vocab: [
      {
        word: "Bonjour",
        translation: "Hello / Good morning",
        pronunciation: "bohn-ZHOOR",
        example: "Bonjour, comment ça va?",
      },
      {
        word: "Bonsoir",
        translation: "Good evening",
        pronunciation: "bohn-SWAHR",
        example: "Bonsoir, madame.",
      },
      {
        word: "Bonne nuit",
        translation: "Good night",
        pronunciation: "buhn NWEE",
        example: "Bonne nuit, dors bien.",
      },
      {
        word: "Au revoir",
        translation: "Goodbye",
        pronunciation: "oh ruh-VWAHR",
        example: "Au revoir, à demain!",
      },
      {
        word: "Salut",
        translation: "Hi / Bye (informal)",
        pronunciation: "sah-LOO",
        example: "Salut, ça va?",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you say 'Goodbye' in French?",
        options: ["Bonjour", "Salut", "Au revoir", "Bonsoir"],
        correctAnswer: "Au revoir",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "Bonjour", right: "Hello" },
          { left: "Bonne nuit", right: "Good night" },
          { left: "Salut", right: "Hi (informal)" },
        ],
      },
    ],
  },

  {
    id: "fr-unit-1-lesson-2",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "AI Teacher: Greetings Practice",
    description: "Practice French greetings with your AI teacher",
    order: 2,
    type: "ai-teacher",
    xpReward: 20,
    thumbnailUrl: "https://picsum.photos/seed/fr-ai1/80/80",
    goals: [
      { description: "Hold a short greeting conversation in French" },
      { description: "Use formal and informal greetings correctly" },
    ],
    activities: [],
    aiTeacherPrompt: {
      lessonTopic: "French greetings and introductions",
      targetVocab: ["Bonjour", "Bonsoir", "Au revoir", "Salut", "Comment ça va?", "Je m'appelle"],
      systemPrompt: `You are a warm and patient French teacher named Claire.
You are teaching a beginner student their very first French lesson on greetings.

Start with a simple greeting in French and guide the student to respond.
Correct mistakes kindly. Keep the tone light and encouraging.

Focus only on: Bonjour, Bonsoir, Au revoir, Salut, Comment ça va?, Je m'appelle.

Speak mostly English with short French phrases. Keep sentences simple and short.`,
    },
  },

  {
    id: "fr-unit-1-lesson-3",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "Introducing Yourself",
    description: "Learn how to introduce yourself in French",
    order: 3,
    type: "phrase",
    xpReward: 15,
    thumbnailUrl: "https://picsum.photos/seed/fr-intro/80/80",
    goals: [
      { description: "Say your name and where you are from in French" },
      { description: "Ask someone their name politely" },
    ],
    phrases: [
      {
        phrase: "Je m'appelle ___.",
        translation: "My name is ___.",
        pronunciation: "zhuh mah-PEL",
        situation: "When introducing yourself",
      },
      {
        phrase: "Comment vous appelez-vous?",
        translation: "What is your name? (formal)",
        pronunciation: "koh-MON voo za-puh-LAY-voo",
        situation: "Asking someone's name formally",
      },
      {
        phrase: "Je viens de ___.",
        translation: "I come from ___.",
        pronunciation: "zhuh VYAN duh",
        situation: "Saying where you are from",
      },
      {
        phrase: "Enchanté(e).",
        translation: "Nice to meet you.",
        pronunciation: "on-shon-TAY",
        situation: "When meeting someone for the first time",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you say 'My name is' in French?",
        options: ["Je viens de", "Au revoir", "Je m'appelle", "Enchanté"],
        correctAnswer: "Je m'appelle",
      },
      {
        type: "fill-in-blank",
        sentence: "Je m'_____ Marie.",
        correctAnswer: "appelle",
        hint: "The verb in 'my name is' in French",
      },
      {
        type: "listen-select",
        audioText: "Enchanté.",
        options: ["Goodbye.", "Nice to meet you.", "How are you?", "Good morning."],
        correctAnswer: "Nice to meet you.",
      },
    ],
  },

  {
    id: "fr-unit-1-lesson-4",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "Numbers 1–10",
    description: "Count from one to ten in French",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/fr-nums/80/80",
    goals: [
      { description: "Count from 1 to 10 in French" },
      { description: "Recognize written French numbers" },
    ],
    vocab: [
      { word: "un", translation: "one", pronunciation: "uhn", example: "J'ai un chien." },
      { word: "deux", translation: "two", pronunciation: "duh", example: "Deux cafés, s'il vous plaît." },
      { word: "trois", translation: "three", pronunciation: "trwah", example: "Trois amis." },
      { word: "quatre", translation: "four", pronunciation: "KAH-truh", example: "Quatre heures." },
      { word: "cinq", translation: "five", pronunciation: "sank", example: "Cinq minutes." },
      { word: "six", translation: "six", pronunciation: "sees", example: "Six personnes." },
      { word: "sept", translation: "seven", pronunciation: "set", example: "Sept jours." },
      { word: "huit", translation: "eight", pronunciation: "weet", example: "Huit heures." },
      { word: "neuf", translation: "nine", pronunciation: "nuhf", example: "Neuf ans." },
      { word: "dix", translation: "ten", pronunciation: "dees", example: "Dix euros." },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "What is 'cinq' in English?",
        options: ["four", "six", "five", "seven"],
        correctAnswer: "five",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "un", right: "one" },
          { left: "trois", right: "three" },
          { left: "dix", right: "ten" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "_____ cafés, s'il vous plaît. (2)",
        correctAnswer: "Deux",
        hint: "The French word for two",
      },
    ],
  },

  {
    id: "fr-unit-1-lesson-5",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "Daily Expressions",
    description: "Polite phrases you'll use every day in French",
    order: 5,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/fr-daily/80/80",
    goals: [
      { description: "Use please, thank you, and you're welcome in French" },
      { description: "Apologize and excuse yourself politely" },
    ],
    vocab: [
      {
        word: "Merci",
        translation: "Thank you",
        pronunciation: "mair-SEE",
        example: "Merci beaucoup!",
      },
      {
        word: "S'il vous plaît",
        translation: "Please (formal)",
        pronunciation: "seel voo PLAY",
        example: "Un café, s'il vous plaît.",
      },
      {
        word: "De rien",
        translation: "You're welcome",
        pronunciation: "duh RYAN",
        example: "De rien, avec plaisir.",
      },
      {
        word: "Pardon",
        translation: "Excuse me / Sorry",
        pronunciation: "par-DOHN",
        example: "Pardon, où est la gare?",
      },
      {
        word: "Je suis désolé(e)",
        translation: "I'm sorry",
        pronunciation: "zhuh swee day-zo-LAY",
        example: "Je suis désolée, je suis en retard.",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you say 'Thank you' in French?",
        options: ["De rien", "Pardon", "Merci", "S'il vous plaît"],
        correctAnswer: "Merci",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "S'il vous plaît", right: "Please" },
          { left: "De rien", right: "You're welcome" },
          { left: "Pardon", right: "Excuse me" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "Un café, s'il vous _____.",
        correctAnswer: "plaît",
        hint: "The last word in the French phrase for 'please'",
      },
    ],
  },

  {
    id: "fr-unit-1-lesson-6",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "AI Teacher: Full Conversation",
    description: "Hold a complete beginner conversation in French",
    order: 6,
    type: "ai-teacher",
    xpReward: 25,
    thumbnailUrl: "https://picsum.photos/seed/fr-ai2/80/80",
    goals: [
      { description: "Greet, introduce yourself, and be polite in French" },
      { description: "Hold a natural 5-turn conversation" },
    ],
    activities: [],
    aiTeacherPrompt: {
      lessonTopic: "Full beginner French conversation",
      targetVocab: ["Bonjour", "Je m'appelle", "Merci", "S'il vous plaît", "Au revoir", "Enchanté"],
      systemPrompt: `You are Claire, a warm French teacher.
Guide the student through a complete beginner French conversation:
1. Greetings (Bonjour, Salut)
2. Introductions (Je m'appelle, Enchanté)
3. Polite phrases (Merci, S'il vous plaît, De rien)
4. Goodbye (Au revoir)

Correct gently with encouragement. Use English for explanations, French for practice.`,
    },
  },

  // ─── Japanese › Unit 1 ───────────────────────────────────────────────────

  {
    id: "ja-unit-1-lesson-1",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "Common Greetings",
    description: "Learn the most common Japanese greetings",
    order: 1,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/ja-greet/80/80",
    goals: [
      { description: "Learn 5 common Japanese greetings" },
      { description: "Understand the importance of context in Japanese greetings" },
    ],
    vocab: [
      {
        word: "おはようございます",
        translation: "Good morning (formal)",
        pronunciation: "oh-hah-yoh go-zah-ee-mahs",
        example: "おはようございます、田中さん。",
      },
      {
        word: "こんにちは",
        translation: "Hello / Good afternoon",
        pronunciation: "kon-nee-chee-wah",
        example: "こんにちは、元気ですか？",
      },
      {
        word: "こんばんは",
        translation: "Good evening",
        pronunciation: "kon-ban-wah",
        example: "こんばんは、今日は寒いですね。",
      },
      {
        word: "さようなら",
        translation: "Goodbye (formal)",
        pronunciation: "sah-yoh-nah-rah",
        example: "さようなら、またね。",
      },
      {
        word: "ありがとう",
        translation: "Thank you",
        pronunciation: "ah-ree-gah-toh",
        example: "ありがとう、助かりました。",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "Which greeting means 'Good morning' in Japanese?",
        options: ["こんにちは", "こんばんは", "おはようございます", "さようなら"],
        correctAnswer: "おはようございます",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "こんにちは", right: "Hello" },
          { left: "ありがとう", right: "Thank you" },
          { left: "さようなら", right: "Goodbye" },
        ],
      },
    ],
  },

  {
    id: "ja-unit-1-lesson-2",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "AI Teacher: Greetings Practice",
    description: "Practice Japanese greetings with your AI teacher",
    order: 2,
    type: "ai-teacher",
    xpReward: 20,
    thumbnailUrl: "https://picsum.photos/seed/ja-ai1/80/80",
    goals: [
      { description: "Use Japanese greetings in context" },
      { description: "Understand when to use formal vs casual greetings" },
    ],
    activities: [],
    aiTeacherPrompt: {
      lessonTopic: "Japanese greetings and introductions",
      targetVocab: [
        "おはようございます",
        "こんにちは",
        "こんばんは",
        "さようなら",
        "ありがとう",
      ],
      systemPrompt: `You are a kind and encouraging Japanese teacher named Yuki.
You are teaching a beginner student their very first Japanese lesson on greetings.

Start by greeting the student in Japanese with romaji pronunciation in brackets.
Guide them gently to respond. Celebrate effort and correct mistakes kindly.

Focus only on: おはようございます, こんにちは, こんばんは, さようなら, ありがとう.

Always provide romaji (pronunciation) next to Japanese text.
Speak mostly English. Keep sentences very simple and short.`,
    },
  },

  {
    id: "ja-unit-1-lesson-3",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "Introducing Yourself",
    description: "Learn to introduce yourself in Japanese",
    order: 3,
    type: "phrase",
    xpReward: 15,
    thumbnailUrl: "https://picsum.photos/seed/ja-intro/80/80",
    goals: [
      { description: "Say your name using はじめまして and どうぞよろしく" },
      { description: "Ask someone's name politely" },
    ],
    phrases: [
      {
        phrase: "はじめまして。",
        translation: "Nice to meet you.",
        pronunciation: "ha-jee-meh-mah-shee-teh",
        situation: "When meeting someone for the first time",
      },
      {
        phrase: "わたしは ___ です。",
        translation: "I am ___.",
        pronunciation: "wah-tah-shee-wah ___ des",
        situation: "Stating your name formally",
      },
      {
        phrase: "おなまえは？",
        translation: "What is your name?",
        pronunciation: "oh-nah-mah-eh-wah",
        situation: "Asking someone's name politely",
      },
      {
        phrase: "どうぞよろしく。",
        translation: "Please be good to me. / Pleased to meet you.",
        pronunciation: "doh-zoh yo-ro-shee-koo",
        situation: "Ending a self-introduction",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "What does 'はじめまして' mean?",
        options: ["Good morning", "Nice to meet you", "Thank you", "Goodbye"],
        correctAnswer: "Nice to meet you",
      },
      {
        type: "fill-in-blank",
        sentence: "わたしは ___ です。",
        correctAnswer: "Yuki",
        hint: "Put your name where the blank is",
      },
      {
        type: "listen-select",
        audioText: "どうぞよろしく。",
        options: ["See you later.", "Please be good to me.", "I'm sorry.", "Thank you."],
        correctAnswer: "Please be good to me.",
      },
    ],
  },

  {
    id: "ja-unit-1-lesson-4",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "Numbers 1–10",
    description: "Count from one to ten in Japanese",
    order: 4,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/ja-nums/80/80",
    goals: [
      { description: "Count from 1 to 10 in Japanese" },
      { description: "Recognize hiragana and romaji number words" },
    ],
    vocab: [
      { word: "いち", translation: "one", pronunciation: "ee-chee", example: "いちじ (1 o'clock)" },
      { word: "に", translation: "two", pronunciation: "nee", example: "にじ (2 o'clock)" },
      { word: "さん", translation: "three", pronunciation: "sahn", example: "さんにん (3 people)" },
      { word: "し / よん", translation: "four", pronunciation: "shee / yohn", example: "よんじ (4 o'clock)" },
      { word: "ご", translation: "five", pronunciation: "goh", example: "ごじ (5 o'clock)" },
      { word: "ろく", translation: "six", pronunciation: "roh-koo", example: "ろくにん (6 people)" },
      { word: "しち / なな", translation: "seven", pronunciation: "shee-chee / nah-nah", example: "ななじ (7 o'clock)" },
      { word: "はち", translation: "eight", pronunciation: "hah-chee", example: "はちにん (8 people)" },
      { word: "く / きゅう", translation: "nine", pronunciation: "koo / kyoo", example: "くじ (9 o'clock)" },
      { word: "じゅう", translation: "ten", pronunciation: "joo", example: "じゅうにん (10 people)" },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you say 'five' in Japanese?",
        options: ["に", "さん", "ご", "ろく"],
        correctAnswer: "ご",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "いち", right: "one" },
          { left: "さん", right: "three" },
          { left: "じゅう", right: "ten" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "___にん (3 people)",
        correctAnswer: "さん",
        hint: "The Japanese word for three",
      },
    ],
  },

  {
    id: "ja-unit-1-lesson-5",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "Daily Expressions",
    description: "Polite phrases for everyday Japanese life",
    order: 5,
    type: "vocabulary",
    xpReward: 10,
    thumbnailUrl: "https://picsum.photos/seed/ja-daily/80/80",
    goals: [
      { description: "Say please, thank you, and sorry in Japanese" },
      { description: "Use polite expressions in daily situations" },
    ],
    vocab: [
      {
        word: "ありがとうございます",
        translation: "Thank you (formal)",
        pronunciation: "ah-ree-gah-toh go-zah-ee-mahs",
        example: "ありがとうございます、先生。",
      },
      {
        word: "おねがいします",
        translation: "Please (requesting)",
        pronunciation: "oh-neh-gah-ee shee-mahs",
        example: "コーヒーをおねがいします。",
      },
      {
        word: "すみません",
        translation: "Excuse me / Sorry",
        pronunciation: "soo-mee-mah-sen",
        example: "すみません、ちょっといいですか？",
      },
      {
        word: "ごめんなさい",
        translation: "I'm sorry",
        pronunciation: "go-men-nah-sah-ee",
        example: "ごめんなさい、おくれました。",
      },
      {
        word: "どういたしまして",
        translation: "You're welcome",
        pronunciation: "doh-ee-tah-shee-mah-shee-teh",
        example: "どういたしまして。",
      },
    ],
    activities: [
      {
        type: "multiple-choice",
        question: "How do you say 'Excuse me' in Japanese?",
        options: ["ありがとう", "すみません", "ごめんなさい", "どういたしまして"],
        correctAnswer: "すみません",
      },
      {
        type: "match-pair",
        pairs: [
          { left: "ありがとうございます", right: "Thank you (formal)" },
          { left: "ごめんなさい", right: "I'm sorry" },
          { left: "どういたしまして", right: "You're welcome" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "コーヒーを _____。(Please)",
        correctAnswer: "おねがいします",
        hint: "The Japanese word for 'please' when making a request",
      },
    ],
  },

  {
    id: "ja-unit-1-lesson-6",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "AI Teacher: Full Conversation",
    description: "Hold a complete beginner conversation in Japanese",
    order: 6,
    type: "ai-teacher",
    xpReward: 25,
    thumbnailUrl: "https://picsum.photos/seed/ja-ai2/80/80",
    goals: [
      { description: "Greet, introduce yourself, and be polite in Japanese" },
      { description: "Hold a 5-turn conversation with the teacher" },
    ],
    activities: [],
    aiTeacherPrompt: {
      lessonTopic: "Full beginner Japanese conversation",
      targetVocab: [
        "こんにちは", "はじめまして", "わたしは", "ありがとうございます",
        "すみません", "どうぞよろしく",
      ],
      systemPrompt: `You are Yuki, a kind and encouraging Japanese teacher.
Guide the student through a complete beginner conversation:
1. Greetings (こんにちは, おはようございます)
2. Introductions (はじめまして, わたしは ___ です, どうぞよろしく)
3. Polite expressions (ありがとうございます, すみません, ごめんなさい)

Always write Japanese with romaji in brackets for pronunciation.
Speak mostly English for explanations. Keep it simple and encouraging.`,
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons.filter((l) => l.unitId === unitId);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByLanguage(languageId: string): Lesson[] {
  return lessons.filter((l) => l.languageId === languageId);
}
