import { useAuth, useClerk } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  // Home placeholder — replace with tabs screen when ready
  return (
    <View className="flex-1 justify-center items-center gap-6">
      <Text className="text-h1 font-poppins-bold text-primary">muolingo.</Text>
      <Text className="text-body-md font-poppins text-muted">
        Home screen coming soon!
      </Text>
      <TouchableOpacity
        className="btn--outline"
        onPress={() => router.push("/language-selection")}
        activeOpacity={0.85}
      >
        <Text className="btn__text--primary">Choose a Language</Text>
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
