import { Template } from "./types";

export type FitMode = "cover" | "contain";

interface ComposeMockupOptions {
  template: Template;
  userImageUrl: string;
  fitMode?: FitMode; // Varsayılan: "cover"
}

/**
 * Kullanıcı görselini template'in slot alanına yerleştirerek mockup oluşturur.
 * Tüm işlem client-side (tarayıcıda) gerçekleşir.
 *
 * @param options - Template ve kullanıcı görseli bilgileri
 * @returns Base64 encoded DataURL (PNG formatında)
 */
export async function composeMockup(
  options: ComposeMockupOptions
): Promise<string> {
  const { template, userImageUrl, fitMode = "cover" } = options;

  // 1. Template görselini yükle
  const templateImg = await loadImage(template.imagePath);

  // 2. Kullanıcı görselini yükle
  const userImg = await loadImage(userImageUrl);

  // 3. Canvas oluştur (template boyutunda)
  const canvas = document.createElement("canvas");
  canvas.width = templateImg.width;
  canvas.height = templateImg.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context not available");
  }

  // 4. Kullanıcı görselini slot'a yerleştir (önce bu çizilir, template üstte kalır)
  const { x, y, width, height } = template.slot;

  // Slot alanını clip et (taşmaları önle)
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();

  // Kullanıcı görselini slot'a sığdır (cover modunda tam doldurur)
  const fitted = fitImageToSlot(
    userImg.width,
    userImg.height,
    width,
    height,
    fitMode
  );

  ctx.drawImage(
    userImg,
    x + fitted.offsetX,
    y + fitted.offsetY,
    fitted.width,
    fitted.height
  );

  ctx.restore();

  // 5. Template'i çiz (üstte, transparent alanlar kullanıcı görselini gösterir)
  ctx.drawImage(templateImg, 0, 0);

  // 6. DataURL olarak döndür
  return canvas.toDataURL("image/png", 1.0);
}

/**
 * Image yükleme (Promise tabanlı)
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // CORS için
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Görseli slot'a sığdır
 * - cover: Slot tamamen doldurulur, taşan kısımlar kesilir (önerilen)
 * - contain: Görsel tamamen görünür, boşluk kalabilir
 */
function fitImageToSlot(
  imgWidth: number,
  imgHeight: number,
  slotWidth: number,
  slotHeight: number,
  mode: FitMode = "cover"
): { width: number; height: number; offsetX: number; offsetY: number } {
  const imgRatio = imgWidth / imgHeight;
  const slotRatio = slotWidth / slotHeight;

  let width: number;
  let height: number;
  let offsetX: number;
  let offsetY: number;

  if (mode === "cover") {
    // Cover: Slot'u tamamen doldur, taşanları kes
    if (imgRatio > slotRatio) {
      // Görsel daha geniş, yüksekliğe göre ölçekle
      height = slotHeight;
      width = slotHeight * imgRatio;
      offsetX = (slotWidth - width) / 2; // Yatayda ortala (negatif olabilir)
      offsetY = 0;
    } else {
      // Görsel daha uzun, genişliğe göre ölçekle
      width = slotWidth;
      height = slotWidth / imgRatio;
      offsetX = 0;
      offsetY = (slotHeight - height) / 2; // Dikeyde ortala (negatif olabilir)
    }
  } else {
    // Contain: Görselin tamamı görünsün, boşluk kalabilir
    if (imgRatio > slotRatio) {
      width = slotWidth;
      height = slotWidth / imgRatio;
      offsetX = 0;
      offsetY = (slotHeight - height) / 2;
    } else {
      height = slotHeight;
      width = slotHeight * imgRatio;
      offsetX = (slotWidth - width) / 2;
      offsetY = 0;
    }
  }

  return { width, height, offsetX, offsetY };
}
