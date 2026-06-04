import "../../global.css";

import { ClerkProvider, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { PostHogProvider } from "posthog-react-native";
import {
  StreamVideo,
  StreamVideoClient,
  type User as StreamUser,
  type DeepPartial,
  type Theme,
} from "@stream-io/video-react-native-sdk";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getApiBaseUrl } from "@/lib/api";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const streamApiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST;

// Bridges device safe-area insets into the StreamVideo theme so call UI
// components respect notches and system bars automatically.
function VideoWithInsets({
  client,
  children,
}: {
  client: StreamVideoClient;
  children: React.ReactNode;
}) {
  const { top, right, bottom, left } = useSafeAreaInsets();
  // Cast needed: DeepPartial<Theme>'s index signature conflicts with number types in strict TS
  const theme = { variants: { insets: { top, right, bottom, left } } } as DeepPartial<Theme>;
  return (
    <StreamVideo client={client} style={theme}>
      {children}
    </StreamVideo>
  );
}

// Creates and maintains one StreamVideoClient per authenticated Clerk user.
// Mounts <StreamVideo> only when the client is ready; renders children
// without it when the user is signed out (auth screens don't need calls).
function StreamVideoSetup({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [client, setClient] = useState<StreamVideoClient | undefined>();

  useEffect(() => {
    if (!user) return;

    const streamUser: StreamUser = {
      id: user.id,
      name:
        user.fullName ??
        user.firstName ??
        user.primaryEmailAddress?.emailAddress ??
        user.id,
      image: user.imageUrl ?? undefined,
    };

    const tokenProvider = async (): Promise<string> => {
      const baseUrl = getApiBaseUrl();
      const params = new URLSearchParams({ userId: user.id });
      if (streamUser.name) params.set("userName", streamUser.name);
      if (user.imageUrl) params.set("userImage", user.imageUrl);

      const res = await fetch(`${baseUrl}/api/stream-token?${params}`);
      if (!res.ok) throw new Error(`Stream token fetch failed: ${res.status}`);
      const data = (await res.json()) as { token: string };
      return data.token;
    };

    const c = new StreamVideoClient({
      apiKey: streamApiKey,
      user: streamUser,
      tokenProvider,
    });
    setClient(c);

    return () => {
      c.disconnectUser().catch(console.error);
      setClient(undefined);
    };
  }, [user?.id]);

  if (!client) return <>{children}</>;
  return <VideoWithInsets client={client}>{children}</VideoWithInsets>;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const app = (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <StreamVideoSetup>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="language-selection" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="lesson/[id]" options={{ headerShown: false }} />
        </Stack>
      </StreamVideoSetup>
    </ClerkProvider>
  );

  if (!posthogApiKey) {
    return app;
  }

  return (
    <PostHogProvider apiKey={posthogApiKey} options={{ host: posthogHost }}>
      {app}
    </PostHogProvider>
  );
}
