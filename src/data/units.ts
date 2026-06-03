import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-unit-1",
    languageId: "es",
    title: "Greetings & Basics",
    description: "Say hello, goodbye, and introduce yourself",
    order: 1,
    totalLessons: 6,
  },
  {
    id: "es-unit-2",
    languageId: "es",
    title: "Numbers & Colors",
    description: "Count to ten and name common colors",
    order: 2,
    totalLessons: 5,
  },

  // French
  {
    id: "fr-unit-1",
    languageId: "fr",
    title: "Greetings & Basics",
    description: "Say hello, goodbye, and introduce yourself",
    order: 1,
    totalLessons: 6,
  },

  // Japanese
  {
    id: "ja-unit-1",
    languageId: "ja",
    title: "Greetings & Basics",
    description: "Say hello, goodbye, and introduce yourself",
    order: 1,
    totalLessons: 6,
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units.filter((u) => u.languageId === languageId);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((u) => u.id === id);
}
