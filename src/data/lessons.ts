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
