/**
 * DataURL'i PNG dosyası olarak indirir.
 * Tüm işlem client-side (tarayıcıda) gerçekleşir.
 *
 * @param dataUrl - Base64 encoded image data URL
 * @param filename - İndirilecek dosya adı
 */
export function downloadImage(
  dataUrl: string,
  filename: string = "mockup.png"
): void {
  // 1. Geçici link oluştur
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;

  // 2. DOM'a ekle, tıkla, kaldır
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * DataURL'i Blob'a çevirir (alternatif indirme yöntemi için)
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

/**
 * Blob kullanarak indir (bazı tarayıcılarda daha güvenilir)
 */
export function downloadImageAsBlob(
  dataUrl: string,
  filename: string = "mockup.png"
): void {
  const blob = dataUrlToBlob(dataUrl);
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Bellek temizliği
  URL.revokeObjectURL(url);
}
