export const COLORS = {
  primary: "#10a37f", // ChatGPT Green
  secondary: "#acacbe", // Neutral gray
  accent: "#10a37f",
  background: "#212121", // ChatGPT dark background
  surface: "#171717", // Sidebar/Surface
  border: "rgba(255, 255, 255, 0.1)",
  error: "#ef4444",
  success: "#10a37f",
  text: {
    primary: "#ececec",
    secondary: "#b4b4b4",
    inverse: "#ffffff",
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#ffffff",
  },
  h2: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#ffffff",
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: "#ececec",
  },
  caption: {
    fontSize: 12,
    color: "#b4b4b4",
    fontWeight: "500" as const,
  },
};

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
};
