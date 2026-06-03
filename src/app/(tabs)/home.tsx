import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";

import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import { getLanguageById } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images, placeholderImages } from "@/constants/images";
import type { Lesson } from "@/types/learning";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface PlanItem {
  id: string;
  title: string;
  subtitle: string;
  icon: IoniconName;
  iconBg: string;
  iconColor: string;
  lessonId: string;
}

function getGreeting(languageId: string | null, firstName: string): string {
  if (languageId === "es") return `¡Hola, ${firstName}!`;
  if (languageId === "fr") return `Bonjour, ${firstName}!`;
  if (languageId === "ja") return `こんにちは, ${firstName}!`;
  return `Hello, ${firstName}!`;
}

function buildPlanItems(lessons: Lesson[]): PlanItem[] {
  const firstLesson = lessons.find((l) => l.type === "vocabulary" || l.type === "phrase");
  const aiLesson = lessons.find((l) => l.type === "ai-teacher");
  const vocabLesson = lessons.find((l) => l.type === "vocabulary");

  return [
    {
      id: "lesson",
      title: "Lesson",
      subtitle: firstLesson?.title ?? "Common Greetings",
      icon: "book-outline",
      iconBg: "#EEF2FF",
      iconColor: "#6C4EF5",
      lessonId: firstLesson?.id ?? "",
    },
    {
      id: "ai-conversation",
      title: "AI Conversation",
      subtitle: "Talk about your day",
      icon: "headset-outline",
      iconBg: "#EEF2FF",
      iconColor: "#6C4EF5",
      lessonId: aiLesson?.id ?? "",
    },
    {
      id: "new-words",
      title: "New words",
      subtitle: `${vocabLesson?.vocab?.length ?? 10} words`,
      icon: "chatbubble-outline",
      iconBg: "#FFF0F0",
      iconColor: "#FF6B6B",
      lessonId: vocabLesson?.id ?? "",
    },
  ];
}

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { selectedLanguageId, hasHydrated } = useLanguageStore();
  const { xp, dailyGoalXp, streak, completedLessonIds } = useProgressStore();

  // Wait for AsyncStorage rehydration before reading persisted language
  const language = hasHydrated && selectedLanguageId ? getLanguageById(selectedLanguageId) : null;
  const units = hasHydrated && selectedLanguageId ? getUnitsByLanguage(selectedLanguageId) : [];
  const currentUnit = units[0] ?? null;
  const lessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];

  const firstName = user?.firstName ?? "Friend";
  const greeting = hasHydrated ? getGreeting(selectedLanguageId, firstName) : `Hello, ${firstName}!`;
  const progressPercent = Math.min((xp / dailyGoalXp) * 100, 100);
  const planItems = buildPlanItems(lessons);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <View className="row--between mb-5">
          <View className="row gap-3">
            <View className="w-[38px] h-[38px] rounded-full overflow-hidden">
              <Image
                source={{ uri: language?.flag ?? "https://flagcdn.com/w160/us.png" }}
                style={{ width: 38, height: 38 }}
                contentFit="cover"
              />
            </View>
            <Text className="text-h4 font-poppins-bold text-foreground">
              {greeting} 👋
            </Text>
          </View>

          <View className="row gap-4">
            <View className="row gap-1">
              <Ionicons name="flame" size={20} color="#FF8A00" />
              <Text className="text-body-md font-poppins-bold text-foreground">
                {streak}
              </Text>
            </View>
            {/* No notification route yet — non-interactive placeholder */}
            <View hitSlop={8}>
              <Ionicons name="notifications-outline" size={22} color="#001132" />
            </View>
          </View>
        </View>

        {/* ── Daily Goal Card ─────────────────────────────────────────────── */}
        <View className="bg-background rounded-2xl p-4 mb-4 row--between" style={styles.shadow}>
          <View className="flex-1 pr-3">
            <Text className="text-caption font-poppins text-muted mb-1">Daily goal</Text>
            <View className="row items-baseline gap-1 mb-3">
              <Text className="text-h2 font-poppins-bold text-foreground">{xp}</Text>
              <Text className="text-body-md font-poppins text-muted">/ {dailyGoalXp} XP</Text>
            </View>
            <View className="h-2 rounded overflow-hidden bg-[#F0EFFE]">
              <View
                className="h-2 bg-streak rounded"
                style={{ width: `${progressPercent}%` as `${number}%` }}
              />
            </View>
          </View>
          <Image
            source={images.treasure}
            style={{ width: 90, height: 90 }}
            contentFit="contain"
          />
        </View>

        {/* ── Continue Learning Card ──────────────────────────────────────── */}
        {language && currentUnit && (
          <View className="rounded-[20px] overflow-hidden bg-primary mb-5 min-h-[160px]">
            <View className="flex-row">
              <View className="flex-1 p-5 pr-2">
                <Text className="text-caption font-poppins text-white/75 mb-1">
                  Continue learning
                </Text>
                <Text className="text-[26px] font-poppins-bold text-white mb-0.5">
                  {language.name}
                </Text>
                <Text className="text-body-sm font-poppins text-white/85 mb-[18px]">
                  A1 · {currentUnit.title}
                </Text>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => router.push("/(tabs)/learn")}
                >
                  <Text className="text-body-md font-poppins-semibold text-primary">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={images.palace}
                style={{ width: 120, height: 175, alignSelf: "flex-end" }}
                contentFit="contain"
              />
            </View>
          </View>
        )}

        {/* ── Today's Plan ────────────────────────────────────────────────── */}
        <View className="section-header">
          <Text className="section-header__title">{"Today's plan"}</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/learn")}>
            <Text className="section-header__action">View all</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-background rounded-2xl mb-4" style={styles.shadow}>
          {planItems.map((item, index) => {
            const completed = completedLessonIds.includes(item.lessonId);
            return (
              <View key={item.id}>
                <View className="row--between px-4 py-3">
                  <View className="row gap-3 flex-1">
                    <View
                      className="w-11 h-11 rounded-xl items-center justify-center"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <Ionicons name={item.icon} size={20} color={item.iconColor} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-body-md font-poppins-semibold text-foreground">
                        {item.title}
                      </Text>
                      <Text className="text-caption font-poppins text-muted">
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  {completed ? (
                    <Ionicons name="checkmark-circle" size={22} color="#21C16B" />
                  ) : (
                    <View className="w-[22px] h-[22px] rounded-full border-2 border-border" />
                  )}
                </View>
                {index < planItems.length - 1 && (
                  <View className="divider mx-4" />
                )}
              </View>
            );
          })}
        </View>

        {/* ── Next Up Card ────────────────────────────────────────────────── */}
        <View className="rounded-2xl p-4 border border-[#D1F5E3] bg-[#F0FBF5]">
          <View className="row--between">
            <View className="flex-1">
              <Text className="text-caption font-poppins text-muted">Next up</Text>
              <Text className="text-body-lg font-poppins-semibold text-foreground">
                AI Video Call
              </Text>
              <Text className="text-caption font-poppins text-muted">Practice speaking</Text>
            </View>
            <View className="row gap-3 items-center">
              <View className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <Image
                  source={{ uri: placeholderImages.aiTeacherAvatar }}
                  style={{ width: 50, height: 50 }}
                  contentFit="cover"
                />
              </View>
              <TouchableOpacity
                style={styles.videoButton}
                onPress={() => router.push("/(tabs)/ai-teacher")}
              >
                <Ionicons name="videocam" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ScrollView contentContainerStyle — must use StyleSheet (exception rule)
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  // iOS/Android shadow — platform-specific syntax (exception rule)
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  // TouchableOpacity style prop (exception rule)
  continueButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 9,
    alignSelf: "flex-start",
  },
  // TouchableOpacity style prop (exception rule)
  videoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#21C16B",
    alignItems: "center",
    justifyContent: "center",
  },
});
