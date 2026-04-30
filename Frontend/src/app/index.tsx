import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from "../constants/theme";
import { useChat } from "../hooks/useChat";
import { ChatMessage } from "../components/ChatMessage";
import { MessageInput } from "../components/MessageInput";
import { PersonaSelector } from "../components/PersonaSelector";
import { SuggestionChips } from "../components/SuggestionChips";
import { TypingIndicator } from "../components/TypingIndicator";

export default function Index() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const [isSidebarVisible, setIsSidebarVisible] = useState(isDesktop);
  const scrollRef = useRef<ScrollView>(null);

  const {
    personas,
    activePersona,
    messages,
    isLoading,
    isInitialLoading,
    error,
    switchPersona,
    sendMessage,
  } = useChat();

  const handleContentSizeChange = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  if (isInitialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Initializing AI Mentors...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <View style={styles.main}>
        {/* Sidebar */}
        {isSidebarVisible && (
          <View style={[styles.sidebar, !isDesktop && styles.mobileSidebar]}>
            <View style={styles.sidebarHeader}>
              {!isDesktop && (
                <Pressable onPress={toggleSidebar} style={styles.closeSidebar}>
                  <Ionicons name="close" size={24} color="#ffffff" />
                </Pressable>
              )}
            </View>
            <PersonaSelector
              personas={personas}
              activeId={activePersona?.id || null}
              onSelect={switchPersona}
            />
          </View>
        )}

        {/* Chat Panel */}
        <View style={styles.chatPanel}>
          {activePersona?.backgroundImage && (
            <View style={StyleSheet.absoluteFill}>
              <Image
                source={{ uri: activePersona.backgroundImage }}
                style={styles.backgroundImage}
                resizeMode="cover"
              />
              <View style={styles.backgroundOverlay} />
            </View>
          )}
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {!isSidebarVisible && (
                <Pressable onPress={toggleSidebar} style={styles.iconButton}>
                  <Ionicons name="menu" size={24} color="#ffffff" />
                </Pressable>
              )}
              <View style={styles.headerInfo}>
                <Text style={styles.headerTitle}>
                  {activePersona?.name || "AI Mentor"}
                </Text>
                <Text style={styles.headerSubtitle}>{activePersona?.accent}</Text>
              </View>
            </View>
          </View>

          {/* Messages */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ScrollView
              ref={scrollRef}
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              onContentSizeChange={handleContentSizeChange}
            >
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  accentColor={activePersona?.color}
                />
              ))}
              {isLoading && (
                <TypingIndicator
                  personaName={activePersona?.name || "AI"}
                  color={activePersona?.color}
                />
              )}
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
            </ScrollView>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <View style={styles.bottomInner}>
                <SuggestionChips
                  suggestions={activePersona?.suggestions || []}
                  onSelect={sendMessage}
                  accentColor={activePersona?.color}
                />
                <MessageInput
                  onSend={sendMessage}
                  isLoading={isLoading}
                  accentColor={activePersona?.color}
                  placeholder={`Message ${activePersona?.name.split(" ")[0]}...`}
                />
                <Text style={styles.footerText}>
                  AI can provide inaccurate information. Verify before acting.
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.secondary,
    fontWeight: "700",
    letterSpacing: 1,
  },
  main: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 260,
    height: "100%",
    backgroundColor: COLORS.surface,
  },
  mobileSidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2000,
    ...SHADOWS.md,
  },
  sidebarHeader: {
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  closeSidebar: {
    padding: 4,
  },
  chatPanel: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    height: 56,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  headerInfo: {
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: SPACING.xl,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  bottomControls: {
    backgroundColor: "transparent",
  },
  bottomInner: {
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
    paddingBottom: Platform.OS === "ios" ? 0 : SPACING.lg,
  },
  footerText: {
    fontSize: 11,
    color: COLORS.secondary,
    textAlign: "center",
    marginTop: 8,
  },
  errorContainer: {
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    maxWidth: 800,
    alignSelf: "center",
    width: "90%",
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    opacity: 0.15,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
    opacity: 0.85,
  },
});
