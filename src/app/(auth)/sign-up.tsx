import { useOAuth, useSignUp } from "@clerk/expo";
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

export default function SignUp() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startFacebookOAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpError, setOtpError] = useState("");

  const isLoading = fetchStatus === "fetching";

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignUp = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    const eErr = trimmedEmail ? "" : "Email is required";
    const pErr = password.trim() ? "" : "Password is required";
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;

    setEmail(trimmedEmail);
    const { error } = await signUp.password({
      emailAddress: trimmedEmail,
      password,
    });

    // Let Clerk's errors.fields categorise field-level errors in the JSX —
    // no manual parsing needed here.
    if (error) return;

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setEmailError(sendError.message || "Could not send verification code.");
      return;
    }
    setOtpVisible(true);
  };

  const handleVerify = async (code: string) => {
    setOtpError("");
    try {
      const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code });
      if (verifyError) {
        setOtpError(verifyError.message || "Invalid code.");
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ decorateUrl }) => {
            router.replace(decorateUrl("/") as "/");
          },
        });
      } else {
        setOtpError("Verification failed. Please try again.");
      }
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Verification failed. Please try again.");
    }
  };

  const handleResend = async () => {
    setOtpError("");
    try {
      const { error } = await signUp.verifications.sendEmailCode();
      if (error) setOtpError(error.message || "Could not resend code.");
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Could not resend code.");
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
            Create your account
          </Text>
          <Text className="text-body-md font-poppins text-muted mt-1">
            Start your language journey today ✨
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
          <View className="mb-4">
            <View
              style={[
                styles.inputContainer,
                emailError || errors.fields.emailAddress
                  ? styles.inputContainerError
                  : null,
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
            {(emailError || errors.fields.emailAddress?.message) ? (
              <Text className="text-caption font-poppins text-error mt-1 px-1">
                {emailError || errors.fields.emailAddress?.message}
              </Text>
            ) : null}
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <View
              style={[
                styles.inputContainer,
                passwordError || errors.fields.password
                  ? styles.inputContainerError
                  : null,
              ]}
            >
              <Text className="text-caption font-poppins text-muted">
                Password
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  style={[styles.textInput, { flex: 1 }]}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  className="px-1"
                  activeOpacity={0.7}
                >
                  <Text className="text-[18px]">
                    {showPassword ? "🙈" : "👁"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {(passwordError || errors.fields.password?.message) ? (
              <Text className="text-caption font-poppins text-error mt-1 px-1">
                {passwordError || errors.fields.password?.message}
              </Text>
            ) : null}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            className="btn--primary"
            onPress={handleSignUp}
            activeOpacity={0.85}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            <Text className="btn__text--light">
              {isLoading ? "Please wait…" : "Sign Up"}
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

          {/* Sign In Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-body-sm font-poppins text-muted">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/(auth)/sign-in")}
              activeOpacity={0.7}
            >
              <Text className="text-body-sm font-poppins-semibold text-primary">
                Log in
              </Text>
            </TouchableOpacity>
          </View>

          {/* Required for Clerk bot protection */}
          <View nativeID="clerk-captcha" />
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
