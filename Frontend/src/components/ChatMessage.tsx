import React from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";
import { ChatMessage as ChatMessageType } from "../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  accentColor?: string;
}

export const ChatMessage = ({ message, accentColor = COLORS.accent }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const { width } = useWindowDimensions();
  const maxWidth = width > 800 ? 800 : width - 32;

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={[
        styles.container,
        !isUser && styles.assistantContainer,
      ]}
    >
      <View style={[styles.inner, { maxWidth }]}>
        <View style={[styles.avatar, { backgroundColor: isUser ? "#3b82f6" : accentColor }]}>
          <Ionicons 
            name={isUser ? "person" : "sparkles"} 
            size={16} 
            color="#ffffff" 
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.roleText}>{isUser ? "You" : "Mentor"}</Text>
          <Text style={styles.text}>{message.content}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.lg,
    width: "100%",
    alignItems: "center",
  },
  assistantContainer: {
    backgroundColor: "transparent",
  },
  inner: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
    width: "100%",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  roleText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  text: {
    ...TYPOGRAPHY.body,
    color: "#ececec",
  },
});
