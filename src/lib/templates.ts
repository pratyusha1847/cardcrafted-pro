import { CardTemplate } from "@/types/templates";

export const cardTemplates: CardTemplate[] = [
  {
    id: "modern-blue",
    name: "Modern Blue",
    description: "Professional blue gradient",
    colors: {
      primary: "#2563eb",
      secondary: "#7c3aed",
      accent: "#06b6d4",
      background: "#ffffff",
      text: "#1e293b",
      textLight: "#64748b",
    },
    gradientStart: "#2563eb",
    gradientEnd: "#7c3aed",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  {
    id: "elegant-purple",
    name: "Elegant Purple",
    description: "Sophisticated purple tones",
    colors: {
      primary: "#7c3aed",
      secondary: "#c026d3",
      accent: "#ec4899",
      background: "#ffffff",
      text: "#1e293b",
      textLight: "#64748b",
    },
    gradientStart: "#7c3aed",
    gradientEnd: "#c026d3",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  {
    id: "corporate-gray",
    name: "Corporate Gray",
    description: "Clean and minimal",
    colors: {
      primary: "#475569",
      secondary: "#64748b",
      accent: "#0ea5e9",
      background: "#ffffff",
      text: "#0f172a",
      textLight: "#64748b",
    },
    gradientStart: "#475569",
    gradientEnd: "#64748b",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  {
    id: "vibrant-orange",
    name: "Vibrant Orange",
    description: "Energetic and bold",
    colors: {
      primary: "#f97316",
      secondary: "#dc2626",
      accent: "#facc15",
      background: "#ffffff",
      text: "#1e293b",
      textLight: "#64748b",
    },
    gradientStart: "#f97316",
    gradientEnd: "#dc2626",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  {
    id: "fresh-green",
    name: "Fresh Green",
    description: "Natural and calming",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
      accent: "#14b8a6",
      background: "#ffffff",
      text: "#1e293b",
      textLight: "#64748b",
    },
    gradientStart: "#10b981",
    gradientEnd: "#059669",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  {
    id: "dark-premium",
    name: "Dark Premium",
    description: "Luxury dark theme",
    colors: {
      primary: "#1e293b",
      secondary: "#334155",
      accent: "#fbbf24",
      background: "#0f172a",
      text: "#f1f5f9",
      textLight: "#cbd5e1",
    },
    gradientStart: "#1e293b",
    gradientEnd: "#334155",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
];

export const getTemplateById = (id: string): CardTemplate => {
  return cardTemplates.find((t) => t.id === id) || cardTemplates[0];
};
