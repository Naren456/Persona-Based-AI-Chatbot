import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "../constants/theme";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const MessageInput = ({
  onSend,
  isLoading,
  placeholder = "Message...",
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
          style={[styles.input, { outlineStyle: "none" } as any]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.secondary}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={2000}
          editable={!isLoading}
          onKeyPress={(e: any) => {
            if (e.nativeEvent.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Pressable
          onPress={handleSend}
          disabled={!text.trim() || isLoading}
          style={({ pressed }) => [
            styles.sendButton,
            { backgroundColor: text.trim() ? COLORS.primary : "rgba(255, 255, 255, 0.05)" },
            pressed && { opacity: 0.8 },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Ionicons 
              name="arrow-up" 
              size={20} 
              color={text.trim() ? "#ffffff" : COLORS.secondary} 
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
    borderRadius: 16,
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
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 4,
  },
});
