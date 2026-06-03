export type LessonType = "vocabulary" | "phrase" | "ai-teacher";

export type ActivityType =
  | "multiple-choice"
  | "match-pair"
  | "fill-in-blank"
  | "listen-select";

export interface VocabItem {
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
}

export interface Phrase {
  phrase: string;
  translation: string;
  pronunciation: string;
  situation: string;
}

export interface MultipleChoiceActivity {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface MatchPairActivity {
  type: "match-pair";
  pairs: { left: string; right: string }[];
}

export interface FillInBlankActivity {
  type: "fill-in-blank";
  sentence: string;
  correctAnswer: string;
  hint?: string;
}

export interface ListenSelectActivity {
  type: "listen-select";
  audioText: string;
  options: string[];
  correctAnswer: string;
}

export type Activity =
  | MultipleChoiceActivity
  | MatchPairActivity
  | FillInBlankActivity
  | ListenSelectActivity;

export interface LessonGoal {
  description: string;
}

export interface AITeacherPrompt {
  systemPrompt: string;
  lessonTopic: string;
  targetVocab: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  type: LessonType;
  xpReward: number;
  thumbnailUrl?: string;
  goals: LessonGoal[];
  vocab?: VocabItem[];
  phrases?: Phrase[];
  activities: Activity[];
  aiTeacherPrompt?: AITeacherPrompt;
}

export interface Unit {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  totalLessons: number;
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  learners?: string;
  isSupported: boolean;
}
