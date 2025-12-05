import { Template, MockupType } from "./types";

export const templates: Template[] = [
  // Web Templates
  {
    id: "web-browser-light",
    label: "Browser Light",
    type: "web",
    imagePath: "/templates/web-browser-light.png",
    slot: { x: 0, y: 72, width: 1920, height: 1008 },
  },
  {
    id: "web-browser-dark",
    label: "Browser Dark",
    type: "web",
    imagePath: "/templates/web-browser-dark.png",
    slot: { x: 0, y: 72, width: 1920, height: 1008 },
  },
  // Mobile Templates
  {
    id: "mobile-iphone",
    label: "iPhone Mockup",
    type: "mobile",
    imagePath: "/templates/mobile-iphone.png",
    slot: { x: 26, y: 26, width: 390, height: 844 },
  },
  {
    id: "mobile-android",
    label: "Android Mockup",
    type: "mobile",
    imagePath: "/templates/mobile-android.png",
    slot: { x: 18, y: 18, width: 412, height: 915 },
  },
];

// Helper: Tipe göre template'leri filtrele
export const getTemplatesByType = (type: MockupType): Template[] => {
  return templates.filter((t) => t.type === type);
};

// Helper: ID'ye göre template bul
export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

// Helper: Web template'leri
export const getWebTemplates = (): Template[] => {
  return getTemplatesByType("web");
};

// Helper: Mobile template'leri
export const getMobileTemplates = (): Template[] => {
  return getTemplatesByType("mobile");
};
