import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@clerk/expo";
import {
  CallingState,
  StreamCall,
  callManager,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
  type Call,
} from "@stream-io/video-react-native-sdk";

import { getLessonById } from "@/data/lessons";
import { getApiBaseUrl } from "@/lib/api";
import { images, placeholderImages } from "@/constants/images";
import type { Lesson } from "@/types/learning";

// ── Types ─────────────────────────────────────────────────────────────────────

type AgentStatus = "idle" | "connecting" | "connected" | "failed";

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

// Pill that shows current agent connection status
function AgentStatusPill({ status }: { status: AgentStatus }) {
  const configs: Record<
    AgentStatus,
    { label: string; color: string; bg: string; icon: keyof typeof Ionicons.glyphMap }
  > = {
    idle: {
      label: "AI Teacher",
      color: "#6B7280",
      bg: "#F3F4F6",
      icon: "person-circle-outline",
    },
    connecting: {
      label: "Connecting…",
      color: "#F59E0B",
      bg: "#FFFBEB",
      icon: "sync-outline",
    },
    connected: {
      label: "AI Teacher Live",
      color: "#10B981",
      bg: "#ECFDF5",
      icon: "person-circle",
    },
    failed: {
      label: "Agent unavailable",
      color: "#EF4444",
      bg: "#FEF2F2",
      icon: "warning-outline",
    },
  };

  const cfg = configs[status];
  return (
    <View
      className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full self-center"
      style={{ backgroundColor: cfg.bg }}
    >
      {status === "connecting" ? (
        <ActivityIndicator size="small" color={cfg.color} />
      ) : (
        <Ionicons name={cfg.icon} size={14} color={cfg.color} />
      )}
      <Text className="text-caption font-poppins-semibold" style={{ color: cfg.color }}>
        {cfg.label}
      </Text>
    </View>
  );
}

// ── Connecting / Loading screen ───────────────────────────────────────────────

function ConnectingView({
  lesson,
  onBack,
}: {
  lesson: Lesson;
  onBack: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View className="flex-row items-center px-5 pt-2 pb-3">
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} className="mr-3">
          <Ionicons name="chevron-back" size={26} color="#001132" />
        </TouchableOpacity>
        <Text
          className="text-h4 font-poppins-semibold text-foreground"
          numberOfLines={1}
        >
          {lesson.title}
        </Text>
      </View>

      <View className="flex-1 items-center justify-center gap-5">
        <Image
          source={images.mascotWelcome}
          style={{ width: 120, height: 120 }}
          contentFit="contain"
        />
        <ActivityIndicator size="large" color="#4D88FF" />
        <Text className="text-body-md font-poppins-semibold text-foreground">
          Connecting…
        </Text>
        <Text className="text-body-sm font-poppins text-muted text-center px-10">
          Setting up your lesson session
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ── Error screen ─────────────────────────────────────────────────────────────

function ErrorView({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View className="flex-1 items-center justify-center px-8 gap-4">
        <Ionicons name="warning-outline" size={52} color="#FF4545" />
        <Text className="text-h4 font-poppins-semibold text-foreground text-center">
          Connection Failed
        </Text>
        <Text className="text-body-sm font-poppins text-muted text-center">
          {message}
        </Text>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.8}
          className="bg-primary rounded-2xl px-10 py-3 mt-2"
        >
          <Text className="text-white font-poppins-semibold text-body-sm">
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Inner call UI (inside <StreamCall> context) ───────────────────────────────

function LessonCallUI({ lesson }: { lesson: Lesson }) {
  const call = useCall();
  const router = useRouter();
  const { user } = useUser();
  const {
    useCallCallingState,
    useMicrophoneState,
    useCameraState,
    useParticipants,
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  const { status: micStatus, microphone, isSpeakingWhileMuted } =
    useMicrophoneState();
  const { status: camStatus, camera } = useCameraState();
  const participants = useParticipants();
  const [subtitlesOn, setSubtitlesOn] = useState(false);

  // ── Agent state ──────────────────────────────────────────────────────────
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const sessionIdRef = useRef<string | null>(null);
  const agentStartedRef = useRef(false);

  const callId = `lesson-${lesson.id}`;

  const stopAgent = useCallback(async () => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;
    sessionIdRef.current = null;

    try {
      const baseUrl = getApiBaseUrl();
      await fetch(`${baseUrl}/api/agent-stop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callId, sessionId }),
      });
    } catch (err) {
      console.error("Failed to stop agent:", err);
    }
  }, [callId]);

  // Start the agent once the Stream call is fully joined
  useEffect(() => {
    if (callingState !== CallingState.JOINED || agentStartedRef.current) return;
    agentStartedRef.current = true;

    const startAgent = async () => {
      setAgentStatus("connecting");
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/api/agent-start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callId,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            languageId: lesson.languageId,
            goals: lesson.goals.map((g) => g.description),
            vocab:
              lesson.vocab?.map((v) => `${v.word}: ${v.translation}`) ?? [],
            phrases:
              lesson.phrases?.map((p) => `${p.phrase}: ${p.translation}`) ??
              [],
            aiTeacherPrompt: lesson.aiTeacherPrompt,
          }),
        });

        if (!res.ok) throw new Error(`agent-start failed: ${res.status}`);
        const data = (await res.json()) as { sessionId: string };
        sessionIdRef.current = data.sessionId;
        setAgentStatus("connected");
      } catch (err) {
        console.error("Failed to start agent:", err);
        setAgentStatus("failed");
      }
    };

    startAgent();
  }, [callingState, callId, lesson]);

  // Stop agent when this component unmounts (covers all exit paths)
  useEffect(() => {
    return () => {
      stopAgent();
    };
  }, [stopAgent]);

  // Start the in-call audio manager with speaker output so the AI teacher's
  // voice plays through the loudspeaker instead of the earpiece.
  useEffect(() => {
    callManager.start({ deviceEndpointType: "speaker" });
    return () => {
      callManager.stop();
    };
  }, []);

  // Navigate back when the call ends externally
  const hasEnded = callingState === CallingState.LEFT;
  useEffect(() => {
    if (hasEnded) router.back();
  }, [hasEnded, router]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleMicToggle = async () => {
    try {
      await microphone.toggle();
    } catch (err) {
      console.error("Mic toggle failed", err);
    }
  };

  const handleCameraToggle = async () => {
    try {
      await camera.toggle();
    } catch (err) {
      console.error("Camera toggle failed", err);
    }
  };

  const handleHangUp = async () => {
    // Stop the agent before leaving so it isn't left waiting alone
    await stopAgent();
    if (call && call.state.callingState !== CallingState.LEFT) {
      await call.leave().catch(console.error);
    }
    router.back();
  };

  // ── Derived state ─────────────────────────────────────────────────────────

  const isMuted = micStatus !== "enabled";
  const isCameraOn = camStatus === "enabled";
  const isReconnecting = callingState === CallingState.RECONNECTING;
  const isOffline = callingState === CallingState.OFFLINE;
  const hasError = callingState === CallingState.RECONNECTING_FAILED;

  const teacherMessage = buildTeacherMessage(lesson);
  const goalText = lesson.goals[0]?.description ?? lesson.description;

  const isJoined = callingState === CallingState.JOINED;
  const statusColor =
    isReconnecting || isOffline || hasError ? "#FF4545" : "#21C16B";
  const statusText = hasError
    ? "Error"
    : isOffline
    ? "Offline"
    : isReconnecting
    ? "Reconnecting…"
    : isJoined
    ? "Online"
    : "Joining…";

  const userAvatar = user?.imageUrl ?? placeholderImages.aiTeacherAvatar;
  const userName = user?.firstName ?? user?.fullName ?? "You";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* ── Header ───────────────────────────────────────────── */}
      <View className="flex-row items-center px-5 pt-2 pb-3">
        <TouchableOpacity
          onPress={handleHangUp}
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
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColor }}
            />
            <Text
              className="text-caption font-poppins"
              style={{ color: statusColor }}
            >
              {statusText}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <Ionicons name="people-outline" size={18} color="#6B7280" />
            <Text className="text-caption font-poppins text-muted">
              {participants.length}
            </Text>
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

      {/* ── Reconnecting / offline / error banner ────────────── */}
      {(isReconnecting || isOffline || hasError) && (
        <View
          className="mx-4 mb-2 rounded-xl px-4 py-2.5 flex-row items-center gap-2"
          style={{ backgroundColor: "#FFF1F0" }}
        >
          <Ionicons
            name={isReconnecting ? "sync-outline" : "wifi-outline"}
            size={16}
            color="#FF4545"
          />
          <Text
            className="text-caption font-poppins-semibold flex-1"
            style={{ color: "#FF4545" }}
          >
            {hasError
              ? "Connection lost — go back and try again"
              : isReconnecting
              ? "Reconnecting to lesson…"
              : "No internet connection"}
          </Text>
        </View>
      )}

      {/* ── Teacher area ──────────────────────────────────────── */}
      <View className="flex-1 mx-4 rounded-3xl bg-[#E8EAFF] overflow-hidden">
        <Image
          source={images.mascotWelcome}
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
        />

        {/* Agent status pill — overlaid at the top-left of the teacher area */}
        <View className="absolute top-3 left-3">
          <AgentStatusPill status={agentStatus} />
        </View>

        {/* User picture-in-picture */}
        <View
          className="absolute top-3 right-3 overflow-hidden rounded-2xl border-[2.5px] border-white"
          style={{ width: 72, height: 88 }}
        >
          <Image
            source={{ uri: userAvatar }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
          <View
            className="absolute bottom-0 left-0 right-0 py-0.5 px-1"
            style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          >
            <Text
              className="text-white font-poppins text-center"
              style={{ fontSize: 9 }}
              numberOfLines={1}
            >
              {userName}
            </Text>
          </View>
          {isMuted && (
            <View className="absolute top-1.5 left-1.5 bg-[#FF4545] rounded-full w-4 h-4 items-center justify-center">
              <Ionicons name="mic-off" size={9} color="#fff" />
            </View>
          )}
        </View>

        {/* Teacher response bubble */}
        <View
          className="absolute bottom-3.5 left-3.5 right-3.5 flex-row items-center bg-white rounded-2xl px-3.5 py-3"
          style={styles.bubbleShadow}
        >
          <Text className="text-body-sm font-poppins text-foreground flex-1">
            {agentStatus === "connecting"
              ? "Your AI teacher is joining the call…"
              : agentStatus === "failed"
              ? "AI teacher unavailable — you can still practice on your own."
              : teacherMessage}
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

      {/* ── Speaking-while-muted hint ──────────────────────────── */}
      {isSpeakingWhileMuted && (
        <View
          className="mx-4 mt-2 rounded-xl px-4 py-2 flex-row items-center justify-center gap-2"
          style={{ backgroundColor: "#FFF3E0" }}
        >
          <Ionicons name="mic-off" size={14} color="#FF9800" />
          <Text
            className="text-caption font-poppins-semibold"
            style={{ color: "#FF9800" }}
          >
            {"You're muted — tap mic to unmute"}
          </Text>
        </View>
      )}

      {/* ── Lesson goal ───────────────────────────────────────── */}
      <Text
        className="text-caption font-poppins text-muted text-center px-8 mt-3"
        numberOfLines={2}
      >
        {goalText}
      </Text>

      {/* ── Controls ─────────────────────────────────────────── */}
      <View className="flex-row justify-center gap-4 mt-5 px-6">
        <ControlButton
          icon={isCameraOn ? "videocam" : "videocam-off"}
          onPress={handleCameraToggle}
          isActive={isCameraOn}
          accessibilityLabel={isCameraOn ? "Turn camera off" : "Turn camera on"}
          accessibilityState={{ selected: isCameraOn }}
        />
        <ControlButton
          icon={isMuted ? "mic-off" : "mic"}
          onPress={handleMicToggle}
          isActive={!isMuted}
          accessibilityLabel={isMuted ? "Unmute microphone" : "Mute microphone"}
          accessibilityState={{ selected: !isMuted }}
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
          onPress={handleHangUp}
          variant="danger"
          accessibilityLabel="Hang up"
        />
      </View>

      {/* ── Session metrics ───────────────────────────────────── */}
      <View className="flex-row gap-3 px-4 mt-5 mb-6">
        <MetricCard label="Speaking" value="Excellent" color="#21C16B" />
        <MetricCard label="Pronunciation" value="Great" color="#4D88FF" />
        <MetricCard label="Grammar" value="Good" color="#FFCB00" />
      </View>
    </SafeAreaView>
  );
}

// ── Outer screen: manages call lifecycle ─────────────────────────────────────

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(id);
  const client = useStreamVideoClient();

  const [call, setCall] = useState<Call | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callRef = useRef<Call | null>(null);

  useEffect(() => {
    if (!client || !lesson) return;

    let cancelled = false;

    const joinCall = async () => {
      setIsConnecting(true);
      setError(null);

      try {
        const callId = `lesson-${id}`;
        // Use audio_room so Stream enforces audio-only call settings
        // and the agent admin role can publish without extra capability grants
        const c = client.call("audio_room", callId, { reuseInstance: true });
        c.setDisconnectionTimeout(60);

        await c.join({
          create: true,
          data: {
            custom: {
              lessonId: id,
              lessonTitle: lesson.title,
              languageId: lesson.languageId,
            },
          },
        });

        // Audio-only by default — user can re-enable camera via controls
        await c.camera.disable().catch(() => {});

        if (!cancelled) {
          callRef.current = c;
          setCall(c);
          setIsConnecting(false);
        }
      } catch (err) {
        console.error("Failed to join lesson call:", err);
        if (!cancelled) {
          setError(
            "Could not connect to the lesson. Check your connection and try again."
          );
          setIsConnecting(false);
        }
      }
    };

    joinCall();

    return () => {
      cancelled = true;
      const c = callRef.current;
      if (c && c.state.callingState !== CallingState.LEFT) {
        c.leave().catch(console.error);
      }
      callRef.current = null;
      setCall(null);
    };
  }, [client, id, lesson]);

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

  if (error) {
    return <ErrorView message={error} onBack={() => router.back()} />;
  }

  if (isConnecting || !call) {
    return <ConnectingView lesson={lesson} onBack={() => router.back()} />;
  }

  return (
    <StreamCall call={call}>
      <LessonCallUI lesson={lesson} />
    </StreamCall>
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
