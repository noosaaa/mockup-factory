import { Template } from "./types";

interface ComposeMockupOptions {
  template: Template;
  userImageUrl: string;
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
  const { template, userImageUrl } = options;

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

  // Kullanıcı görselini slot'a sığdır (aspect ratio koruyarak)
  const fitted = fitImageToSlot(userImg.width, userImg.height, width, height);

  ctx.drawImage(
    userImg,
    x + fitted.offsetX,
    y + fitted.offsetY,
    fitted.width,
    fitted.height
  );

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
 * Görseli slot'a sığdır (aspect ratio koruyarak, ortalayarak)
 */
function fitImageToSlot(
  imgWidth: number,
  imgHeight: number,
  slotWidth: number,
  slotHeight: number
): { width: number; height: number; offsetX: number; offsetY: number } {
  const imgRatio = imgWidth / imgHeight;
  const slotRatio = slotWidth / slotHeight;

  let width: number;
  let height: number;
  let offsetX: number;
  let offsetY: number;

  if (imgRatio > slotRatio) {
    // Görsel daha geniş, genişliğe göre sığdır
    width = slotWidth;
    height = slotWidth / imgRatio;
    offsetX = 0;
    offsetY = (slotHeight - height) / 2;
  } else {
    // Görsel daha uzun, yüksekliğe göre sığdır
    height = slotHeight;
    width = slotHeight * imgRatio;
    offsetX = (slotWidth - width) / 2;
    offsetY = 0;
  }

  return { width, height, offsetX, offsetY };
}
