import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import { getLanguageById } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images, placeholderImages } from "@/constants/images";

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

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguageId } = useLanguageStore();
  const { xp, dailyGoalXp, streak, completedLessonIds } = useProgressStore();

  const language = selectedLanguageId ? getLanguageById(selectedLanguageId) : null;
  const units = selectedLanguageId ? getUnitsByLanguage(selectedLanguageId) : [];
  const currentUnit = units[0] ?? null;
  const lessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];

  const firstName = user?.firstName ?? "Friend";
  const greeting = getGreeting(selectedLanguageId, firstName);
  const progressPercent = Math.min((xp / dailyGoalXp) * 100, 100);

  const planItems: PlanItem[] = [
    {
      id: "1",
      title: "Lesson",
      subtitle: lessons[0]?.title ?? "Common Greetings",
      icon: "book-outline",
      iconBg: "#EEF2FF",
      iconColor: "#6C4EF5",
      lessonId: lessons[0]?.id ?? "",
    },
    {
      id: "2",
      title: "AI Conversation",
      subtitle: "Talk about your day",
      icon: "headset-outline",
      iconBg: "#EEF2FF",
      iconColor: "#6C4EF5",
      lessonId: lessons[2]?.id ?? "",
    },
    {
      id: "3",
      title: "New words",
      subtitle: `${lessons[1]?.vocab?.length ?? 10} words`,
      icon: "chatbubble-outline",
      iconBg: "#FFF0F0",
      iconColor: "#FF6B6B",
      lessonId: lessons[1]?.id ?? "",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <View className="row--between mb-5">
          <View className="row gap-3">
            <View style={styles.flagContainer}>
              <Image
                source={{ uri: language?.flag ?? "https://flagcdn.com/w160/us.png" }}
                style={styles.flagImage}
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
            <TouchableOpacity hitSlop={8}>
              <Ionicons name="notifications-outline" size={22} color="#001132" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Daily Goal Card ─────────────────────────────────────────────── */}
        <View className="bg-background rounded-2xl p-4 mb-4 row--between" style={styles.shadow}>
          <View style={styles.dailyGoalContent}>
            <Text className="text-caption font-poppins text-muted mb-1">Daily goal</Text>
            <View className="row items-baseline gap-1 mb-3">
              <Text className="text-h2 font-poppins-bold text-foreground">{xp}</Text>
              <Text className="text-body-md font-poppins text-muted">/ {dailyGoalXp} XP</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` as `${number}%` }]} />
            </View>
          </View>
          <Image
            source={images.treasure}
            style={styles.treasureImage}
            contentFit="contain"
          />
        </View>

        {/* ── Continue Learning Card ──────────────────────────────────────── */}
        {language && currentUnit && (
          <View style={styles.continueCard} className="mb-5">
            <View style={styles.continueCardInner}>
              <View style={styles.continueCardContent}>
                <Text style={styles.continueLabelText}>Continue learning</Text>
                <Text style={styles.continueLanguageText}>{language.name}</Text>
                <Text style={styles.continueUnitText}>A1 · {currentUnit.title}</Text>
                <TouchableOpacity style={styles.continueButton}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={images.palace}
                style={styles.continueImage}
                contentFit="contain"
              />
            </View>
          </View>
        )}

        {/* ── Today's Plan ────────────────────────────────────────────────── */}
        <View className="section-header">
          <Text className="section-header__title">{"Today's plan"}</Text>
          <TouchableOpacity>
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
                      style={[styles.planIconBox, { backgroundColor: item.iconBg }]}
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
                    <View style={styles.emptyCircle} />
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
        <View style={styles.nextUpCard}>
          <View className="row--between">
            <View className="flex-1">
              <Text className="text-caption font-poppins text-muted">Next up</Text>
              <Text className="text-body-lg font-poppins-semibold text-foreground">
                AI Video Call
              </Text>
              <Text className="text-caption font-poppins text-muted">Practice speaking</Text>
            </View>
            <View className="row gap-3 items-center">
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: placeholderImages.aiTeacherAvatar }}
                  style={styles.avatarImage}
                  contentFit="cover"
                />
              </View>
              <TouchableOpacity style={styles.videoButton}>
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
  flagContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: "hidden",
  },
  flagImage: {
    width: 38,
    height: 38,
  },
  dailyGoalContent: {
    flex: 1,
    paddingRight: 12,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#F0EFFE",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#FF8A00",
    borderRadius: 4,
  },
  treasureImage: {
    width: 90,
    height: 90,
  },
  continueCard: {
    backgroundColor: "#6C4EF5",
    borderRadius: 20,
    overflow: "hidden",
    minHeight: 160,
  },
  continueCardInner: {
    flexDirection: "row",
  },
  continueCardContent: {
    flex: 1,
    padding: 20,
    paddingRight: 8,
  },
  continueLabelText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 4,
  },
  continueLanguageText: {
    fontFamily: "Poppins-Bold",
    fontSize: 26,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  continueUnitText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 18,
  },
  continueButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 9,
    alignSelf: "flex-start",
  },
  continueButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#6C4EF5",
  },
  continueImage: {
    width: 120,
    height: 175,
    alignSelf: "flex-end",
  },
  planIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  nextUpCard: {
    backgroundColor: "#F0FBF5",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1F5E3",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  videoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#21C16B",
    alignItems: "center",
    justifyContent: "center",
  },
});
