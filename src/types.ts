export type Lang = 'fa' | 'en';

export type RouteView =
  | { type: 'home' }
  | { type: 'rug'; slug: 'kld-isf-25q' | 'kld-isf-07p' }
  | { type: 'typography'; index?: number };

export interface LocalizedText {
  fa: string;
  en: string;
}

export interface RugSwatch {
  hex: string;
  name: LocalizedText;
}

export interface RugHeadlinePoint {
  title: LocalizedText;
  note: LocalizedText;
}

export interface RugIdentityTheme {
  primary: string;
  secondary: string;
  softWash: string;
  borderTint: string;
  badgeBg: string;
  badgeText: string;
  // Bespoke atmospheric theme tokens derived from the rug's own pigments
  bgDeep: string;
  bgSurface: string;
  bgOverlayTop: string;
  bgOverlayMid: string;
  inkPrimary: string;
  inkMuted: string;
  accent: string;
  accentSecondary: string;
  hairline: string;
  buttonGradient?: string;
  buttonText?: string;
  glowRadial?: string;
}

export interface RugCloseUp {
  id: string;
  src: string;
  title: LocalizedText;
  caption: LocalizedText;
  focusTag: LocalizedText;
}

export interface RugPiece {
  slug: 'kld-isf-25q' | 'kld-isf-07p' | string;
  hasDedicatedPage: boolean;
  archiveCode: string;
  editionLabel: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  image: string;
  editorialBgImage?: string;
  closeUpGallery?: RugCloseUp[];
  aspectRatio: 'square' | 'portrait' | 'landscape';
  valuationToman: string;
  valuationUsd: string;
  category: LocalizedText;
  origin: LocalizedText;
  dimensions: LocalizedText;
  areaLabel: LocalizedText;
  material: LocalizedText;
  knotDensity: LocalizedText;
  rajEstimate: LocalizedText;
  weavingDuration: LocalizedText;
  signatureNote: LocalizedText;
  swatches: RugSwatch[];
  threeHighlights: RugHeadlinePoint[];
  highlights: {
    fa: string[];
    en: string[];
  };
  theme: RugIdentityTheme;
}
