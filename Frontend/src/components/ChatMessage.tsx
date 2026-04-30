import React from "react";
import { StyleSheet, View, Text, useWindowDimensions, Platform } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
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
          <Markdown style={markdownStyles}>
            {message.content}
          </Markdown>
        </View>
      </View>
    </Animated.View>
  );
};

const markdownStyles = StyleSheet.create({
  body: {
    ...TYPOGRAPHY.body,
    color: "#ececec",
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 8,
  },
  strong: {
    color: "#ffffff",
    fontWeight: "800",
  },
  code_inline: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    paddingHorizontal: 4,
    color: "#ffffff",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  fence: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  code_block: {
    color: "#ffffff",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 13,
  },
  link: {
    color: COLORS.accent,
    textDecorationLine: "underline",
  },
  list_item: {
    marginBottom: 4,
  },
  bullet_list: {
    marginBottom: 8,
  },
  ordered_list: {
    marginBottom: 8,
  },
});

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
});
