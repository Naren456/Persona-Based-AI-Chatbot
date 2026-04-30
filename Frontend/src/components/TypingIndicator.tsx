import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { COLORS, SPACING } from "../constants/theme";

interface TypingIndicatorProps {
  personaName: string;
  color?: string;
}

const Dot = ({ delay }: { delay: number }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: opacity.value }],
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export const TypingIndicator = ({ personaName, color = COLORS.accent }: TypingIndicatorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Dot delay={0} />
        <Dot delay={200} />
        <Dot delay={400} />
      </View>
      <Text style={[styles.text, { color }]}>{personaName} is thinking...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    gap: SPACING.md,
  },
  bubble: {
    flexDirection: "row",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
});
