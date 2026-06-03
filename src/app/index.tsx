import { useAuth, useClerk } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { getLanguageById } from "@/data/languages";
import {
  clearLanguageSelectionStorage,
  useLanguageStore,
} from "@/store/language-store";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();
  const { hasHydrated, selectedLanguageId } = useLanguageStore();
  const selectedLanguage = selectedLanguageId
    ? getLanguageById(selectedLanguageId)
    : undefined;

  if (!isLoaded || !hasHydrated) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  function handleClearStorage() {
    clearLanguageSelectionStorage();
    router.replace("/language-selection");
  }

  // Home placeholder — replace with tabs screen when ready
  return (
    <View className="flex-1 justify-center items-center gap-6">
      <Text className="text-h1 font-poppins-bold text-primary">muolingo.</Text>
      <Text className="text-body-md font-poppins text-muted">
        Home screen coming soon!
      </Text>
      <Text className="text-body-lg font-poppins-semibold text-foreground">
        Selected language: {selectedLanguage?.name}
      </Text>
      <TouchableOpacity
        className="btn--outline"
        onPress={() => router.push("/language-selection")}
        activeOpacity={0.85}
      >
        <Text className="btn__text--primary">Choose a Language</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="btn--outline"
        onPress={handleClearStorage}
        activeOpacity={0.85}
      >
        <Text className="btn__text--primary">Clear Async Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="btn--primary px-8"
        onPress={() => signOut()}
        activeOpacity={0.85}
      >
        <Text className="btn__text--light">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
