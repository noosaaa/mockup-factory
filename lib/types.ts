// Mockup tipi
export type MockupType = "web" | "mobile";

// Slot koordinatları (görsel yerleştirme alanı)
export interface Slot {
  x: number; // Soldan uzaklık (px)
  y: number; // Yukarıdan uzaklık (px)
  width: number; // Alan genişliği (px)
  height: number; // Alan yüksekliği (px)
}

// Template tanımı
export interface Template {
  id: string; // Benzersiz kimlik: "web-browser-light"
  label: string; // Kullanıcıya gösterilen ad
  type: MockupType; // "web" veya "mobile"
  imagePath: string; // "/templates/web-browser-light.png"
  slot: Slot; // Görsel yerleştirme koordinatları
  thumbnail?: string; // Opsiyonel küçük önizleme
}

// Wizard adımları
export type WizardStep = 1 | 2 | 3 | 4;

// Wizard state
export interface WizardState {
  currentStep: WizardStep;
  selectedType: MockupType | null;
  uploadedImage: File | null;
  uploadedImageUrl: string | null; // ObjectURL (bellek)
  selectedTemplate: Template | null;
  resultImageUrl: string | null; // Canvas çıktısı (DataURL)
}

// Wizard actions
export interface WizardActions {
  goToStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  selectType: (type: MockupType) => void;
  uploadImage: (file: File) => void;
  selectTemplate: (template: Template) => void;
  setResultUrl: (url: string) => void;
  reset: () => void;
}
