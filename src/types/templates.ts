export type PhotoShape = "circle" | "rounded" | "square";

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
  };
  gradientStart: string;
  gradientEnd: string;
  fontFamily: string;
}

export interface CardStyle {
  templateId: string;
  photoShape: PhotoShape;
  customColors?: Partial<CardTemplate['colors']>;
  customBackground?: string;
  customFont?: string;
}
