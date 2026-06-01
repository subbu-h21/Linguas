import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { images } from "@/constants/images";

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 px-6 pt-4">
        {/* Header: mascot logo + app name */}
        <View className="row--center gap-2">
          <Image
            source={images.mascotLogo}
            className="w-9 h-9"
            resizeMode="contain"
          />
          <Text className="text-h3 font-poppins-bold text-primary">
            muolingo
          </Text>
        </View>

        {/* Heading */}
        <View className="mt-8">
          <Text className="text-h1 font-poppins-bold text-foreground">
            Your AI language
          </Text>
          <Text className="text-h1 font-poppins-bold text-primary">
            teacher.
          </Text>
        </View>

        {/* Subtitle */}
        <Text className="text-body-md font-poppins text-muted mt-3">
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>

        {/* Mascot + floating speech bubbles */}
        <View className="flex-1 mt-4">
          {/* Mascot centered via absolute fill */}
          <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
            <Image
              source={images.mascotWelcome}
              className="w-[300px] h-[300px]"
              resizeMode="contain"
            />
          </View>

          {/* Hello! bubble — left side */}
          <View
            className="absolute bg-background rounded-2xl px-4 py-2.5 border border-border"
            style={[styles.shadow, { top: 80, left: 0 }]}
          >
            <Text className="text-body-md font-poppins-semibold text-foreground">
              Hello!
            </Text>
          </View>

          {/* ¡Hola! bubble — upper right */}
          <View
            className="absolute bg-background rounded-2xl px-4 py-2.5 border border-border"
            style={[styles.shadow, { top: 20, right: 12 }]}
          >
            <Text className="text-body-md font-poppins-semibold text-foreground">
              ¡Hola!
            </Text>
          </View>

          {/* 你好! bubble — lower right */}
          <View
            className="absolute bg-background rounded-2xl px-4 py-2.5 border border-border"
            style={[styles.shadow, { top: 190, right: 4 }]}
          >
            <Text className="text-body-sm font-poppins-semibold text-red-600">
              你好!
            </Text>
          </View>
        </View>

        {/* Get Started button */}
        <View className="pb-8 pt-2">
          <TouchableOpacity
            className="btn--primary flex-row items-center justify-between px-6"
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <View className="w-5" />
            <Text className="btn__text--light">Get Started</Text>
            <Text className="text-background font-poppins-bold text-h4">›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
