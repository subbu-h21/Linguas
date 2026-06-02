import { useOAuth, useSignIn } from "@clerk/expo";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OTPModal from "@/components/OTPModal";
import SocialButton from "@/components/SocialButton";
import { images } from "@/constants/images";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startFacebookOAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpError, setOtpError] = useState("");

  const isLoading = fetchStatus === "fetching";

  const clearErrors = () => setEmailError("");

  const handleSignIn = async () => {
    const trimmed = email.trim();
    const eErr = trimmed ? "" : "Email is required";
    setEmailError(eErr);
    if (eErr) return;

    setEmail(trimmed);
    const { error } = await signIn.emailCode.sendCode({
      emailAddress: trimmed,
    });

    if (error) {
      setEmailError(error.message ?? "Could not send code. Check your email.");
      return;
    }

    setOtpVisible(true);
  };

  const handleVerify = async (code: string) => {
    setOtpError("");
    try {
      const { error: verifyError } = await signIn.emailCode.verifyCode({ code });
      if (verifyError) {
        setOtpError(verifyError.message || "Invalid code.");
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ decorateUrl }) => {
            router.replace(decorateUrl("/") as "/");
          },
        });
      } else {
        setOtpError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setOtpError(err?.message || "Verification failed. Please try again.");
    }
  };

  const handleResend = async () => {
    setOtpError("");
    try {
      const { error } = await signIn.emailCode.sendCode({
        emailAddress: email.trim(),
      });
      if (error) setOtpError(error.message || "Could not resend code.");
    } catch (err: any) {
      setOtpError(err?.message || "Could not resend code.");
    }
  };

  const handleGoogleOAuth = async () => {
    const { createdSessionId, setActive } = await startGoogleOAuth({
      redirectUrl: Linking.createURL("/", { scheme: "duolingoclone" }),
    });
    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
      router.replace("/");
    }
  };

  const handleFacebookOAuth = async () => {
    const { createdSessionId, setActive } = await startFacebookOAuth({
      redirectUrl: Linking.createURL("/", { scheme: "duolingoclone" }),
    });
    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="p-4 self-start"
        activeOpacity={0.7}
      >
        <Text className="text-[22px] font-poppins text-foreground">←</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={clearErrors}>
          {/* Title */}
          <Text className="text-h1 font-poppins-bold text-foreground mt-2">
            Welcome back
          </Text>
          <Text className="text-body-md font-poppins text-muted mt-1">
            Log in to continue your journey ✨
          </Text>

          {/* Mascot */}
          <View className="items-center py-5">
            <Image
              source={images.mascotWelcome}
              className="w-[150px] h-[150px]"
              resizeMode="contain"
            />
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <View
              style={[
                styles.inputContainer,
                emailError ? styles.inputContainerError : null,
              ]}
            >
              <Text className="text-caption font-poppins text-muted">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (emailError) setEmailError("");
                }}
                placeholder="alex@gmail.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInput}
              />
            </View>
            {emailError ? (
              <Text className="text-caption font-poppins text-error mt-1 px-1">
                {emailError}
              </Text>
            ) : null}
          </View>

          {/* Log In Button */}
          <TouchableOpacity
            className="btn--primary"
            onPress={handleSignIn}
            activeOpacity={0.85}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            <Text className="btn__text--light">
              {isLoading ? "Please wait…" : "Log In"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center gap-3 my-6">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-body-sm font-poppins text-muted">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Social Buttons */}
          <View className="gap-3">
            <SocialButton
              icon="G"
              iconBg="#FFFFFF"
              iconColor="#4285F4"
              label="Continue with Google"
              onPress={handleGoogleOAuth}
            />
            <SocialButton
              icon="f"
              iconBg="#1877F2"
              iconColor="#FFFFFF"
              label="Continue with Facebook"
              onPress={handleFacebookOAuth}
            />
            {/* Apple Sign In requires a native dev build — disabled until then */}
            <View style={{ opacity: 0.4 }} pointerEvents="none">
              <SocialButton
                icon="A"
                iconBg="#000000"
                iconColor="#FFFFFF"
                label="Continue with Apple"
              />
            </View>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-body-sm font-poppins text-muted">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/(auth)/sign-up")}
              activeOpacity={0.7}
            >
              <Text className="text-body-sm font-poppins-semibold text-primary">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </ScrollView>

      <OTPModal
        visible={otpVisible}
        email={email}
        onClose={() => setOtpVisible(false)}
        onVerify={handleVerify}
        error={otpError}
        onResend={handleResend}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  inputContainerError: {
    borderColor: "#FF4D4F",
  },
  textInput: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001132",
    paddingVertical: 4,
  },
});
