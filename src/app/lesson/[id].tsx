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
}: {
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  onPress: () => void;
  variant?: "dark" | "danger";
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.controlBtn,
        variant === "danger" ? styles.controlBtnDanger : styles.controlBtnDark,
      ]}
    >
      {label ? (
        <Text style={styles.controlBtnLabel}>{label}</Text>
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
    <View style={styles.metricCard}>
      <Text className="text-caption font-poppins text-muted mb-1">{label}</Text>
      <Text
        className="text-body-sm font-poppins-semibold"
        style={{ color }}
      >
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
            <Text className="text-caption font-poppins text-muted">12</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={20} color="#001132" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Teacher area ─────────────────────────────────────────────── */}
      <View style={styles.teacherArea}>
        {/* Mascot as teacher avatar */}
        <Image
          source={images.mascotWelcome}
          style={styles.mascot}
          contentFit="contain"
        />

        {/* User picture-in-picture */}
        <View style={styles.pip}>
          <Image
            source={{ uri: placeholderImages.aiTeacherAvatar }}
            style={styles.pipImage}
            contentFit="cover"
          />
        </View>

        {/* Teacher response bubble */}
        <View style={styles.bubble}>
          <Text
            className="text-body-sm font-poppins text-foreground"
            style={{ flex: 1 }}
          >
            {teacherMessage}
          </Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.speakerBtn}>
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
        <ControlButton icon="videocam-off" onPress={() => {}} />
        <ControlButton
          icon={micOn ? "mic" : "mic-off"}
          onPress={() => setMicOn(!micOn)}
        />
        <ControlButton
          label="Aá"
          onPress={() => setSubtitlesOn(!subtitlesOn)}
        />
        <ControlButton
          icon="call"
          onPress={() => router.back()}
          variant="danger"
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  teacherArea: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: "#E8EAFF",
    overflow: "hidden",
    position: "relative",
  },
  mascot: {
    width: "100%",
    height: "100%",
  },
  pip: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 72,
    height: 88,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
  },
  pipImage: {
    width: "100%",
    height: "100%",
  },
  bubble: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  speakerBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6C4EF5",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    flexShrink: 0,
  },
  controlBtn: {
    width: 62,
    height: 62,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  controlBtnDark: {
    backgroundColor: "#1C1E35",
  },
  controlBtnDanger: {
    backgroundColor: "#FF4545",
  },
  controlBtnLabel: {
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
});
