import { useRef, useState } from "react";
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
import { useRouter } from "expo-router";

interface OTPModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
}

export default function OTPModal({ visible, email, onClose }: OTPModalProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleChangeText = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 6);
    setCode(digits);
    if (digits.length === 6) {
      Keyboard.dismiss();
      setTimeout(() => {
        router.replace("/");
      }, 300);
    }
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      onShow={() => {
        // Wait for the slide animation to finish before focusing, otherwise
        // the keyboard may not appear on Android or may animate oddly on iOS.
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
              <View style={styles.sheet}>
                {/* Invisible input that owns the number pad — must have non-zero size to be focusable */}
                <TextInput
                  ref={inputRef}
                  value={code}
                  onChangeText={handleChangeText}
                  keyboardType="number-pad"
                  maxLength={6}
                  style={styles.hiddenInput}
                  caretHidden
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

                {/* OTP digit boxes — tap to focus hidden input */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => inputRef.current?.focus()}
                  className="flex-row justify-center gap-3 mb-8"
                >
                  {Array.from({ length: 6 }).map((_, i) => {
                    const isFocused = i === code.length && code.length < 6;
                    const isFilled = !!code[i];
                    return (
                      <View
                        key={i}
                        style={[
                          styles.digitBox,
                          isFocused || isFilled
                            ? styles.digitBoxActive
                            : styles.digitBoxIdle,
                        ]}
                      >
                        <Text style={styles.digitText}>{code[i] ?? ""}</Text>
                      </View>
                    );
                  })}
                </TouchableOpacity>

                {/* Resend */}
                <Text className="text-body-sm font-poppins text-muted text-center">
                  Didn't receive a code?{" "}
                  <Text className="font-poppins-semibold text-primary">
                    Resend
                  </Text>
                </Text>
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
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 32,
    paddingBottom: 48,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 1,
    width: 1,
    top: 0,
    left: 0,
  },
  digitBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  digitBoxActive: {
    borderColor: "#6C4EF5",
    backgroundColor: "#FFFFFF",
  },
  digitBoxIdle: {
    borderColor: "#E5E7EB",
    backgroundColor: "#F6F7FB",
  },
  digitText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#001132",
  },
});
