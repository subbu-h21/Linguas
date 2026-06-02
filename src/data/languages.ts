import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    learners: "28.4M",
    isSupported: true,
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    learners: "19.4M",
    isSupported: true,
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w320/jp.png",
    learners: "12.7M",
    isSupported: true,
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    learners: "8.1M",
    isSupported: false,
  },
  {
    id: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "https://flagcdn.com/w320/it.png",
    learners: "6.2M",
    isSupported: false,
  },
];

export const supportedLanguages = languages.filter((l) => l.isSupported);

export function getLanguageById(id: string): Language | undefined {
  return languages.find((l) => l.id === id);
}
