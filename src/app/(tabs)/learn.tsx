import { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import { getLanguageById } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images } from "@/constants/images";
import type { Lesson } from "@/types/learning";

type LessonStatus = "completed" | "in-progress" | "not-started";

function getLessonTypeIcon(type: Lesson["type"]) {
  if (type === "ai-teacher") return "headset-outline";
  if (type === "phrase") return "chatbubble-outline";
  return "book-outline";
}

// ── LessonRow ─────────────────────────────────────────────────────────────────

type LessonRowProps = {
  lesson: Lesson;
  status: LessonStatus;
  showDivider: boolean;
  onPress: () => void;
};

function LessonRow({ lesson, status, showDivider, onPress }: LessonRowProps) {
  const isInProgress = status === "in-progress";
  const isCompleted = status === "completed";
  const isLocked = status === "not-started";

  return (
    <View>
      {showDivider && <View className="divider mx-4" />}
      <TouchableOpacity
        style={[styles.lessonRow, isInProgress && styles.lessonRowActive]}
        activeOpacity={isLocked ? 1 : 0.7}
        onPress={isLocked ? undefined : onPress}
      >
        {/* Left: lesson info */}
        <View className="flex-1 pr-3">
          <View className="row gap-1.5 mb-0.5">
            <Ionicons
              name={getLessonTypeIcon(lesson.type)}
              size={11}
              color="#9CA3AF"
            />
            <Text className="text-caption font-poppins text-muted">
              Lesson {lesson.order}
            </Text>
          </View>
          <Text className="text-body-md font-poppins-semibold text-foreground">
            {lesson.title}
          </Text>
          {isInProgress ? (
            <View className="self-start rounded-full px-2.5 py-0.5 mt-1.5 bg-[#EEF0FE]">
              <Text className="text-caption font-poppins-semibold text-primary">
                In progress
              </Text>
            </View>
          ) : (
            <Text className="text-caption font-poppins text-muted mt-0.5">
              {lesson.xpReward} XP
              {lesson.activities.length > 0
                ? ` • ${lesson.activities.length} activities`
                : ""}
            </Text>
          )}
        </View>

        {/* Right: status indicator */}
        {isCompleted && (
          <Ionicons name="checkmark-circle" size={34} color="#21C16B" />
        )}
        {isInProgress && (
          <Image
            source={{ uri: lesson.thumbnailUrl }}
            style={styles.thumbnail}
            contentFit="cover"
          />
        )}
        {isLocked && (
          <View style={styles.lockBubble}>
            <Ionicons name="lock-closed" size={13} color="#9CA3AF" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function LearnScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");

  const { selectedLanguageId, hasHydrated } = useLanguageStore();
  const { completedLessonIds } = useProgressStore();

  const language =
    hasHydrated && selectedLanguageId
      ? getLanguageById(selectedLanguageId)
      : null;
  const units =
    hasHydrated && selectedLanguageId
      ? getUnitsByLanguage(selectedLanguageId)
      : [];
  const currentUnit = units[0] ?? null;
  const lessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];

  const completedCount = lessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;

  const inProgressId =
    lessons.find((l) => !completedLessonIds.includes(l.id))?.id ?? null;

  function getStatus(lessonId: string, unitInProgressId: string | null): LessonStatus {
    if (completedLessonIds.includes(lessonId)) return "completed";
    if (lessonId === unitInProgressId) return "in-progress";
    return "not-started";
  }

  if (!hasHydrated) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }} edges={["top"]}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-md font-poppins text-muted">Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!language || !currentUnit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }} edges={["top"]}>
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="globe-outline" size={48} color="#D1D5DB" />
          <Text className="text-body-lg font-poppins-semibold text-foreground text-center mt-4 mb-2">
            No language selected
          </Text>
          <Text className="text-body-md font-poppins text-muted text-center">
            Go to the Home tab and pick a language to start learning.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const progressPercent =
    lessons.length > 0
      ? Math.round((completedCount / lessons.length) * 100)
      : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Unit Banner ─────────────────────────────────────────────────── */}
        <View style={[styles.banner, styles.shadow]} className="rounded-2xl overflow-hidden mb-4">
          {/* Top row: text + building illustration */}
          <View className="flex-row items-end">
            <View className="flex-1 p-5 pb-3">
              {/* Unit badge */}
              <View className="self-start rounded-full px-3 py-1 mb-2 bg-primary/10">
                <Text className="text-caption font-poppins-semibold text-primary uppercase tracking-widest">
                  Unit {currentUnit.order}
                </Text>
              </View>

              <Text className="text-h3 font-poppins-bold text-foreground">
                {currentUnit.title}
              </Text>
              <Text className="text-body-sm font-poppins text-muted mt-1">
                {currentUnit.description}
              </Text>

              {/* Progress */}
              <View className="row gap-2 mt-3">
                <View className="flex-1 h-1.5 rounded-full overflow-hidden bg-primary/10">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${progressPercent}%` as `${number}%` }}
                  />
                </View>
                <Text className="text-caption font-poppins-semibold text-primary">
                  {completedCount}/{lessons.length}
                </Text>
              </View>
            </View>

            {/* Palace / scene illustration */}
            <Image
              source={images.palace}
              style={{ width: 120, height: 148, alignSelf: "flex-end" }}
              contentFit="contain"
            />
          </View>

          {/* Mascot row */}
          <View className="items-center pb-4" style={{ marginTop: -8 }}>
            <Image
              source={images.mascotWelcome}
              style={{ width: 88, height: 88 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* ── Tabs + Lesson List ──────────────────────────────────────────── */}
        <View className="bg-background rounded-2xl overflow-hidden" style={styles.shadow}>
          {/* Tab bar */}
          <View className="flex-row">
            {(["lessons", "practice"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, isActive && styles.tabActive]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-body-md font-poppins-semibold ${
                      isActive ? "text-primary" : "text-muted"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="divider" />

          {activeTab === "lessons" ? (
            <>
              {lessons.map((lesson, index) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  status={getStatus(lesson.id, inProgressId)}
                  showDivider={index > 0}
                  onPress={() => router.push(`/lesson/${lesson.id}`)}
                />
              ))}
            </>
          ) : (
            /* Practice tab — placeholder */
            <View className="py-14 items-center px-6">
              <Ionicons name="barbell-outline" size={44} color="#D1D5DB" />
              <Text className="text-body-md font-poppins-semibold text-foreground mt-4">
                Practice coming soon
              </Text>
              <Text className="text-body-sm font-poppins text-muted text-center mt-1">
                Timed drills and review exercises will appear here.
              </Text>
            </View>
          )}
        </View>

        {/* ── Other units (if language has more) ──────────────────────────── */}
        {units.slice(1).map((unit) => {
          const unitLessons = getLessonsByUnit(unit.id);
          const unitCompleted = unitLessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;
          const unitInProgressId =
            unitLessons.find((l) => !completedLessonIds.includes(l.id))?.id ?? null;

          return (
            <View
              key={unit.id}
              className="bg-background rounded-2xl overflow-hidden mt-4"
              style={styles.shadow}
            >
              {/* Unit label row */}
              <View className="flex-row items-center justify-between px-4 py-3 border-b border-border">
                <View>
                  <Text className="text-caption font-poppins text-muted">
                    Unit {unit.order}
                  </Text>
                  <Text className="text-body-md font-poppins-semibold text-foreground">
                    {unit.title}
                  </Text>
                </View>
                <Text className="text-caption font-poppins-semibold text-primary">
                  {unitCompleted}/{unitLessons.length}
                </Text>
              </View>

              {unitLessons.map((lesson, index) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  status={getStatus(lesson.id, unitInProgressId)}
                  showDivider={index > 0}
                  onPress={() => router.push(`/lesson/${lesson.id}`)}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  banner: {
    backgroundColor: "#ECE9FD",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2.5,
    borderBottomColor: "#6C4EF5",
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  lessonRowActive: {
    backgroundColor: "#F9F8FF",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  lockBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
});
