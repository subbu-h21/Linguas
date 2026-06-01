// trigger coderabbit review
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-6">
      <Text className="text-h1 font-bold text-primary">muolingo.</Text>
      <Link href="/onboarding" asChild>
        <TouchableOpacity className="btn--primary px-8">
          <Text className="btn__text--light">Start Onboarding</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
