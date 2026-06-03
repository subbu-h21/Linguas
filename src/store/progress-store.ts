import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProgressState = {
  xp: number;
  dailyGoalXp: number;
  streak: number;
  completedLessonIds: string[];
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  resetDailyXP: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      xp: 15,
      dailyGoalXp: 20,
      streak: 12,
      completedLessonIds: ["es-unit-1-lesson-1"],
      addXP: (amount) =>
        set((state) => ({
          xp: Math.min(state.xp + amount, state.dailyGoalXp),
        })),
      completeLesson: (id) =>
        set((state) => ({
          completedLessonIds: state.completedLessonIds.includes(id)
            ? state.completedLessonIds
            : [...state.completedLessonIds, id],
        })),
      resetDailyXP: () => set({ xp: 0 }),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
