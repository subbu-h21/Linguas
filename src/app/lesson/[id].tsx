import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { getLessonById } from "@/data/lessons";
import { images, placeholderImages } from "@/constants/images";
import type { Lesson } from "@/types/learning";

// ── Helpers ───────────────────────────────────────────────────────────────────

// Viewer count shown in the header — placeholder until real session data exists
const VIDEO_VIEWER_COUNT = 12;

const GREETINGS: Record<string, { hello: string; begin: string }> = {
  es: { hello: "¡Hola!", begin: "¡Muy bien! Let's begin the lesson 👏" },
  fr: { hello: "Bonjour!", begin: "Très bien! Let's begin the lesson 👏" },
  ja: { hello: "こんにちは!", begin: "よし！Let's begin the lesson 👏" },
};

function buildTeacherMessage(lesson: Lesson): string {
  const { hello, begin } = GREETINGS[lesson.languageId] ?? {
    hello: "Hello!",
    begin: "Great! Let's begin the lesson 👏",
  };

  if (lesson.aiTeacherPrompt) {
    return `${hello} Ready to practice ${lesson.aiTeacherPrompt.lessonTopic}? 👋`;
  }
  if (lesson.vocab?.[0]) {
    const v = lesson.vocab[0];
    return `Let's start with "${v.word}" — ${v.translation} (${v.pronunciation})`;
  }
  if (lesson.phrases?.[0]) {
    return `Try saying: "${lesson.phrases[0].phrase}"`;
  }
  return begin;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ControlButton({
  icon,
  label,
  onPress,
  variant = "dark",
  isActive = false,
  accessibilityLabel,
  accessibilityState,
}: {
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  onPress: () => void;
  variant?: "dark" | "danger";
  isActive?: boolean;
  accessibilityLabel?: string;
  accessibilityState?: { selected?: boolean; disabled?: boolean };
}) {
  const bgClass =
    variant === "danger"
      ? "bg-[#FF4545]"
      : isActive
      ? "bg-primary"
      : "bg-[#1C1E35]";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      className={`w-[62px] h-[62px] rounded-[18px] items-center justify-center ${bgClass}`}
    >
      {label ? (
        <Text className="text-white font-poppins-semibold text-lg">{label}</Text>
      ) : icon ? (
        <Ionicons name={icon} size={22} color="#FFFFFF" />
      ) : null}
    </TouchableOpacity>
  );
}

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View
      className="flex-1 bg-white rounded-2xl py-3 px-2.5 items-center border border-[#F0F0F0]"
      style={styles.metricShadow}
    >
      <Text className="text-caption font-poppins text-muted mb-1">{label}</Text>
      <Text className="text-body-sm font-poppins-semibold" style={{ color }}>
        {value}
      </Text>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(id);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [subtitlesOn, setSubtitlesOn] = useState(false);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-md font-poppins text-muted">
            Lesson not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const teacherMessage = buildTeacherMessage(lesson);
  const goalText = lesson.goals[0]?.description ?? lesson.description;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-5 pt-2 pb-3">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Back"
          accessibilityRole="button"
          className="mr-3"
        >
          <Ionicons name="chevron-back" size={26} color="#001132" />
        </TouchableOpacity>

        <View className="flex-1">
          <Text
            className="text-h4 font-poppins-semibold text-foreground"
            numberOfLines={1}
          >
            {lesson.title}
          </Text>
          <View className="flex-row items-center gap-1.5 mt-0.5">
            <View className="w-2 h-2 rounded-full bg-success" />
            <Text
              className="text-caption font-poppins"
              style={{ color: "#21C16B" }}
            >
              Online
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <Ionicons name="videocam-outline" size={18} color="#6B7280" />
            <Text className="text-caption font-poppins text-muted">{VIDEO_VIEWER_COUNT}</Text>
          </View>
          <TouchableOpacity
            disabled
            activeOpacity={1}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
            accessibilityState={{ disabled: true }}
          >
            <Ionicons name="notifications-outline" size={20} color="#001132" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Teacher area ─────────────────────────────────────────────── */}
      <View className="flex-1 mx-4 rounded-3xl bg-[#E8EAFF] overflow-hidden">
        {/* Mascot as teacher avatar */}
        <Image
          source={images.mascotWelcome}
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
        />

        {/* User picture-in-picture */}
        <View className="absolute top-3 right-3 w-[72px] h-[88px] rounded-2xl overflow-hidden border-[2.5px] border-white">
          <Image
            source={{ uri: placeholderImages.aiTeacherAvatar }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </View>

        {/* Teacher response bubble */}
        <View
          className="absolute bottom-3.5 left-3.5 right-3.5 flex-row items-center bg-white rounded-2xl px-3.5 py-3"
          style={styles.bubbleShadow}
        >
          <Text className="text-body-sm font-poppins text-foreground flex-1">
            {teacherMessage}
          </Text>
          <TouchableOpacity
            disabled
            activeOpacity={1}
            accessibilityLabel="Play audio"
            accessibilityRole="button"
            accessibilityState={{ disabled: true }}
            className="w-8 h-8 rounded-full bg-primary items-center justify-center ml-3 shrink-0"
          >
            <Ionicons name="volume-high" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Lesson goal ──────────────────────────────────────────────── */}
      <Text
        className="text-caption font-poppins text-muted text-center px-8 mt-3"
        numberOfLines={2}
      >
        {goalText}
      </Text>

      {/* ── Controls ─────────────────────────────────────────────────── */}
      <View className="flex-row justify-center gap-4 mt-5 px-6">
        <ControlButton
          icon={cameraOn ? "videocam" : "videocam-off"}
          onPress={() => setCameraOn(!cameraOn)}
          accessibilityLabel={cameraOn ? "Turn camera off" : "Turn camera on"}
          accessibilityState={{ selected: cameraOn }}
        />
        <ControlButton
          icon={micOn ? "mic" : "mic-off"}
          onPress={() => setMicOn(!micOn)}
          accessibilityLabel="Toggle microphone"
          accessibilityState={{ selected: micOn }}
        />
        <ControlButton
          label="Aá"
          onPress={() => setSubtitlesOn(!subtitlesOn)}
          isActive={subtitlesOn}
          accessibilityLabel="Toggle subtitles"
          accessibilityState={{ selected: subtitlesOn }}
        />
        <ControlButton
          icon="call"
          onPress={() => router.back()}
          variant="danger"
          accessibilityLabel="Hang up"
        />
      </View>

      {/* ── Session metrics ──────────────────────────────────────────── */}
      <View className="flex-row gap-3 px-4 mt-5 mb-6">
        <MetricCard label="Speaking" value="Excellent" color="#21C16B" />
        <MetricCard label="Pronunciation" value="Great" color="#4D88FF" />
        <MetricCard label="Grammar" value="Good" color="#FFCB00" />
      </View>
    </SafeAreaView>
  );
}

// Only shadows and SafeAreaView remain here — everything else is NativeWind
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  bubbleShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  metricShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
});
