# Mockup Factory - Proje Dokümantasyonu

---

## 1. Projenin Genel Çerçevesi

### Amaç

Tarayıcıda çalışan, kullanıcıdan alınan görselleri hazır mockup PNG'lerinin içine otomatik yerleştiren bir web aracı.

### Temel Özellikler

- **Tamamen client-side** (görseller hiçbir yere upload edilmiyor).
- **4 adımlı bir wizard akışı:**
  1. Web / Mobil tipi seçimi
  2. Kullanıcı görsellerini seçer
  3. Mockup template'i seçer
  4. Son halini görür ve indirir
- **Modüler template sistemi:**
  - Mockup'lar `public/templates` altında duran PNG dosyaları
  - Her mockup için bir "slot" tanımı (görselin oturacağı alan bilgisi)
  - Katkı verenler sadece PNG + basit bir config/manifest ekleyerek yeni mockup tanımlayabilir.

### Stack (Önerilen)

| Teknoloji        | Kullanım Amacı                     |
| ---------------- | ---------------------------------- |
| **Next.js**      | App Router, TypeScript             |
| **Tailwind CSS** | Hızlı UI için                      |
| **Canvas API**   | Tarayıcıda birleştirme işlemi için |

---

## 2. Mimari Katmanlar

Projeyi mental olarak 3 katmana ayırabilirsin:

### 2.1. Presentation/UI Katmanı

Kullanıcının gördüğü her şey:

- Adım göstergesi (hangi adımda olduğumuzu gösteren progress/stepper)
- Web / Mobile seçim ekranı
- Görsel upload alanı
- Template thumbnails listesi
- Son mockup önizlemesi ve "indir" butonu

Bu katman tamamen:

- State yönetimi (hangi adımdayız, hangi template seçili, hangi görsel yüklendi?)
- Kullanıcı etkileşimleri (butona tıklama, dosya seçme)
- Basit form/wizard mantığı

### 2.2. Domain/Logic Katmanı

Bu katmanda UI'dan bağımsız "iş mantığı" var:

- Template tanımları (hangi mockup var, hangi tipte, slot koordinatları ne?)
- **Mockup oluşturma süreci:**
  - Kullanıcı görselini okuma
  - Template mockup PNG'sini alma
  - Bu ikisini canvas üzerinde birleştirme
  - Oluşan sonucu bir data URL / indirilebilir imaj haline getirme

UI sadece "şu dosya" ve "şu template" ile birleştir diye bu katmanı çağırır.

> 💡 **Böylece:** Yarın farklı bir UI yazsan (mesela Electron app) aynı mantığı kullanabilirsin.

### 2.3. Asset / Template Katmanı

Gerçek mockup görselleri burada:

- `public/templates/web-desktop-1.png`
- `public/templates/mobile-iphone-1.png` gibi.

Bunların yanında bir **manifest (config)** var:

- Hangi görsel "web" tipinde
- Hangi görsel "mobil"
- Her birinin içinde görselin oturacağı slot alanının koordinat ve boyut bilgisi

Bu katman aynı zamanda **"community contribution"** noktandır:

**Yeni template eklemek isteyen:**

1. PNG dosyasını `public/templates` altına koyar
2. Manifest'e bir kayıt ekler
3. PR atar, sen merge'edersin, sistem otomatik yeni mockup'ı tanır.

---

## 3. Dosya ve Klasör Yapısı Fikri (İsimler, Roller)

> Kod yok, sadece nasıl organize edeceğini konuşalım:

```
public/
  templates/
    web-desktop-1.png      → Web mockup
    web-laptop-1.png       → Web mockup
    mobile-iphone-1.png    → Mobil mockup
    mobile-android-1.png   → Mobil mockup

src/
  app/
    page.tsx               → Ana 4 adımlı ekran (UI akışı)
    layout.tsx             → Genel layout (başlık, tema vs.)
  components/
    Stepper                → Adım göstergesi bileşeni
    StepSelectType         → Adım 1 (Web / Mobile seçimi)
    StepUploadImage        → Adım 2 (Görsel yükleme alanı)
    StepSelectTemplate     → Adım 3 (Template kartları listesi)
    StepPreview            → Adım 4 (sonuç + indir)
  lib/
    templates              → Template manifest & tip tanımları
    composeMockup          → Mockup oluşturma mantığı (canvas)
    types                  → Ortak tipler (isteğe bağlı)
```

---

## 4. Template Mantığını Nasıl Düşünmelisin?

Her mockup için temel bilgiler:

| Alan        | Açıklama                                                | Örnek                            |
| ----------- | ------------------------------------------------------- | -------------------------------- |
| `id`        | Benzersiz kimlik                                        | `"web-desktop-1"`                |
| `label`     | Kullanıcıya gösterilecek isim                           | `"Desktop Browser Mockup"`       |
| `type`      | Mockup tipi (Adım 1'de seçilen tipe göre filtrelenecek) | `"web"` veya `"mobile"`          |
| `imagePath` | Public yolu                                             | `"/templates/web-desktop-1.png"` |
| `slot`      | Kullanıcı görselinin oturacağı alan                     | _(aşağıya bakınız)_              |

### Slot Tanımı

| Parametre | Açıklama                                  |
| --------- | ----------------------------------------- |
| `x`       | Template üzerinde soldan uzaklık (piksel) |
| `y`       | Template üzerinde yukarıdan uzaklık       |
| `width`   | Ekran alanının genişliği                  |
| `height`  | Ekran alanının yüksekliği                 |

Bunu bir `json/ts config` gibi düşünebilirsin. UI için bu sadece _"kart oluştururken thumbnail'ini gösterelim, tıklanırsa bu template'i kullan"_ bilgisidir.

---

## 5. 4 Adımlı Akışın Mantıksal Kurgusu

> Uygulamanın kalbi bu akış:

### Adım 1 – Tür Seçimi (Web / Mobile)

Kullanıcıdan mockup türü ister:

- "Web Mockup"
- "Mobile Mockup"

Seçime göre iç state'de `type = 'web'` veya `'mobile'` tutulur.

Sonraki adımlarda template listesi bu tipe göre filtrelenecek.

> 🎯 **Amaç:** Tüm UX'i sadeleştirmek, kullanıcıyı yalnızca ilgilendiği mockup'larla karşılaştırmak.

---

### Adım 2 – Görsel(ler) Yükleme

Kullanıcı ekran görüntüsünü / tasarımını yükler:

- Örneğin Figma'dan export ettiği bir ekran,
- Veya mobil uygulama ekran screenshot'ı.

**Sen bu adımda:**

- Dosya objesini hafızada tutarsın (state olarak),
- Şimdilik sadece ilk görseli kullanmak yeterli.

**İleride:**

- Birden fazla mockup için aynı anda çıktı üretme
- Aynı ekranın farklı mockup'lara otomatik yerleştirilmesi

gibi özellikler eklenebilir.

> 🎯 **Amaç:** Domain katmanına "kullanıcı input görseli" sağlamak.

---

### Adım 3 – Template Seçimi

Adım 1'de seçilen tipe göre template'leri filtrelersin:

- `type = 'web'` → sadece web mockupları
- `type = 'mobile'` → sadece mobil mockupları

**Kullanıcı bu listeden bir mockup seçer:**

- Her template için bir küçük önizleme (PNG'sinin küçültülmüş hali)
- Altında template adı

**Template'e tıklandığında:**

- Seçilen template iç state'e kaydedilir
- Mockup oluşturma süreci tetiklenir (veya bir sonraki adımda tetiklenecek şekilde hazırlanır)

> 🎯 **Amaç:** Kullanıcıya seçenekleri görsel olarak sunmak ve seçim alıp domain katmanına parametre sağlamak.

---

### Adım 4 – Sonuç ve Dışa Aktarım

Domain katmanı (canvas mantığı) çalışmış, bir "hazır mockup" görseli üretmiş olur.

**Bu görsel:**

- Ekranda önizleme olarak gösterilir (normal `<img>` ile)
- "Download as PNG" gibi bir buton ile indirilebilir hale gelir.

**Bu adımda kullanıcı:**

- Geri dönüp başka template deneyebilir,
- Farklı bir görsel yüklemek için önceki adımlara dönebilir.

> 🎯 **Amaç:** Kullanıcıya nihai ürünü vermek + hızlı iterasyon imkanı tanımak.

---

## 6. Extensibility / Topluluk Katkısı

Bu kısım projeyi "tek akşamlık oyuncak" olmaktan çıkarıp küçük bir ürün yapar. 🙂

### Katkı Akışı

1. Contributor, kendi mockup tasarımını PNG olarak export eder.
2. PNG'yi `public/templates` klasörüne ekler.
3. Manifest'e (örneğin templates config dosyan) yeni bir obje ekler:
   - `id`, `label`, `type`, `image path`
   - `slot` koordinatları (gözle veya tasarım aracında ölçerek)
4. PR açar.

### Sen de:

- Slot ölçülerini kontrol edebilirsin.
- Template'leri kategorilere bölebilirsin (dark/light, device tipi, vs.).
- README'de **"How to add a new template"** bölümü ile bunu tarif edersin.

---

## 7. Teknik / Non-fonksiyonel Konular

### Performans

- Her şey client-side ve tek görsel/tek template ile çalıştığı için ilk versiyonda ciddi bir yük yok.
- Çok sayıda template veya batch render istersen, işlemleri sıraya koyabilirsin.

### Güvenlik / Gizlilik

- Görseller server'a gönderilmediği için GDPR/kişisel veri tarafı çok daha rahat.
- README'de _"All processing happens in your browser"_ gibi bir not ekleyebilirsin.

### Responsive Tasarım

- Wizard yapısını tek sütun gibi kurgulayıp, desktop'ta daha ferah layout yapabilirsin.
- Örneğin: sol tarafta kısa açıklama, sağda wizard.
