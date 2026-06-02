import { useAuth, useClerk } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();

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
        className="btn--primary px-8"
        onPress={() => signOut()}
        activeOpacity={0.85}
      >
        <Text className="btn__text--light">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
