import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, SHADOWS } from "../constants/theme";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  accentColor?: string;
}

export const MessageInput = ({
  onSend,
  isLoading,
  placeholder = "Message...",
  accentColor = COLORS.accent,
}: MessageInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSend(text);
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.secondary}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={2000}
          editable={!isLoading}
        />
        <Pressable
          onPress={handleSend}
          disabled={!text.trim() || isLoading}
          style={({ pressed }) => [
            styles.sendButton,
            { backgroundColor: text.trim() ? "#ffffff" : "rgba(255, 255, 255, 0.1)" },
            pressed && { opacity: 0.8 },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.background} size="small" />
          ) : (
            <Ionicons 
              name="arrow-up" 
              size={20} 
              color={text.trim() ? COLORS.background : COLORS.secondary} 
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#2f2f2f",
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    maxWidth: 800,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    maxHeight: 200,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
});
