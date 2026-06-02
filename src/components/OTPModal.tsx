import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface OTPModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  error?: string;
  onResend?: () => Promise<void>;
}

export default function OTPModal({
  visible,
  email,
  onClose,
  onVerify,
  error,
  onResend,
}: OTPModalProps) {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Clear code and refocus when an error is set
  useEffect(() => {
    if (error) {
      setCode("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [error]);

  // Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      setCode("");
      setIsVerifying(false);
    }
  }, [visible]);

  const handleChangeText = async (text: string) => {
    if (isVerifying) return;
    const digits = text.replace(/\D/g, "").slice(0, 6);
    setCode(digits);

    if (digits.length === 6) {
      Keyboard.dismiss();
      setIsVerifying(true);
      await onVerify(digits);
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setCode("");
    setIsVerifying(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      onShow={() => {
        setTimeout(() => inputRef.current?.focus(), 150);
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.backdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ width: "100%" }}
          >
            <TouchableWithoutFeedback>
              <View className="bg-background rounded-t-2xl p-8 pb-12">
                {/* Invisible input that owns the number pad */}
                <TextInput
                  ref={inputRef}
                  value={code}
                  onChangeText={handleChangeText}
                  keyboardType="number-pad"
                  maxLength={6}
                  style={styles.hiddenInput}
                  caretHidden
                  editable={!isVerifying}
                />

                {/* Header */}
                <View className="items-center mb-8">
                  <Text className="text-h2 font-poppins-bold text-foreground mb-2">
                    Check your email
                  </Text>
                  <Text className="text-body-md font-poppins text-muted text-center">
                    We sent a 6-digit code to{"\n"}
                    <Text className="font-poppins-semibold text-foreground">
                      {email || "your email"}
                    </Text>
                  </Text>
                </View>

                {/* OTP digit boxes */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => !isVerifying && inputRef.current?.focus()}
                  className="flex-row justify-center gap-3 mb-4"
                >
                  {Array.from({ length: 6 }).map((_, i) => {
                    const isFocused = i === code.length && code.length < 6;
                    const isFilled = !!code[i];
                    return (
                      <View
                        key={i}
                        className={`w-12 h-14 rounded-xl border-2 items-center justify-center ${
                          isFocused || isFilled
                            ? "border-primary bg-background"
                            : "border-border bg-surface"
                        }`}
                      >
                        <Text className="text-h2 font-poppins-bold text-foreground">
                          {code[i] ?? ""}
                        </Text>
                      </View>
                    );
                  })}
                </TouchableOpacity>

                {/* Error message */}
                {error ? (
                  <Text className="text-body-sm font-poppins text-error text-center mb-4">
                    {error}
                  </Text>
                ) : (
                  <View className="mb-4" />
                )}

                {/* Resend */}
                <TouchableOpacity
                  onPress={onResend}
                  disabled={!onResend || isVerifying}
                  activeOpacity={0.7}
                >
                  <Text className="text-body-sm font-poppins text-muted text-center">
                    Didn't receive a code?{" "}
                    <Text className="font-poppins-semibold text-primary">
                      Resend
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 1,
    width: 1,
    top: 0,
    left: 0,
  },
});
