<p align="center">
  <img src="public/logos/logo.png" alt="Mockup Factory Logo" width="120" height="120" />
</p>

<h1 align="center">Mockup Factory</h1>

<p align="center">
  <strong>Create stunning device mockups in seconds — 100% client-side, your images never leave your browser.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#templates">Templates</a> •
  <a href="#adding-templates">Adding Templates</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## ✨ Features

- 🔒 **Privacy First** — All image processing happens in your browser. No uploads, no servers, no tracking.
- 🖥️ **Web & Mobile Mockups** — Support for browser frames, iPhone, and Android device mockups.
- 🎨 **4-Step Wizard** — Simple flow: Select type → Upload image → Choose template → Download.
- ⚡ **Instant Preview** — See your mockup in real-time before downloading.
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile devices.
- ⌨️ **Keyboard Navigation** — Navigate with Arrow keys, Enter, and Escape.
- 🔧 **Extensible Templates** — Easy to add new mockup templates via simple configuration.

---

## 🎬 Demo

Visit the live demo: **[https://mockup-factory-mu.vercel.app/](https://mockup-factory-mu.vercel.app/)**

### Quick Preview

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. Select Type    2. Upload    3. Template    4. Preview   │
│    ●────────────────○────────────────○────────────────○     │
│                                                             │
│       ┌─────────────────┐    ┌─────────────────┐            │
│       │   🖥️  WEB       │    │   📱 MOBILE     │            │
│       │                 │    │                 │            │
│       │  Browser frames │    │  Phone mockups  │            │
│       └─────────────────┘    └─────────────────┘            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.x or higher
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/poyrazavsever/mockup-factory.git
cd mockup-factory

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

---

## 🔧 How It Works

Mockup Factory uses the **Canvas API** to composite images entirely in the browser:

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER (Client-Side)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │    User     │    │  Template   │    │   Canvas    │      │
│  │   Image     │ +  │    PNG      │ =  │  Composite  │      │
│  │ (FileReader)│    │  (public/)  │    │    (API)    │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │             │
│                                               ▼             │
│                                        ┌─────────────┐      │
│                                        │  Download   │      │
│                                        │  (DataURL)  │      │
│                                        └─────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ❌ NOTHING goes to a server
                    ✅ Everything stays in your browser
```

### Technical Stack

| Technology         | Purpose                             |
| ------------------ | ----------------------------------- |
| **Next.js 15**     | App Router, React Server Components |
| **TypeScript**     | Type safety                         |
| **Tailwind CSS 4** | Styling                             |
| **Canvas API**     | Image composition                   |
| **@iconify/react** | Icons                               |

---

## 📁 Project Structure

```
mockup-factory/
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Home page with Wizard
│   └── templates/
│       └── page.tsx        # Template gallery page
├── components/
│   ├── ui/
│   │   ├── navbar.tsx      # Navigation bar
│   │   └── footer.tsx      # Footer
│   ├── shared/
│   │   ├── Toast.tsx       # Notification system
│   │   └── Loading.tsx     # Loading spinners
│   └── wizard/
│       ├── WizardContainer.tsx
│       ├── Stepper.tsx
│       ├── StepSelectType.tsx
│       ├── StepUploadImage.tsx
│       ├── StepSelectTemplate.tsx
│       └── StepPreview.tsx
├── lib/
│   ├── types.ts            # TypeScript definitions
│   ├── templates.ts        # Template manifest
│   ├── composeMockup.ts    # Canvas composition logic
│   ├── downloadImage.ts    # Download helpers
│   └── hooks/
│       ├── useWizard.ts    # Wizard state management
│       └── useToast.ts     # Toast notifications
├── public/
│   ├── logos/
│   │   └── logo.png        # App logo
│   └── templates/          # Mockup PNG files
│       ├── web-browser-light.png
│       ├── web-browser-dark.png
│       ├── mobile-iphone.png
│       └── mobile-android.png
└── README.md
```

---

## 🎨 Templates

### Available Templates

| Template       | Type   | Slot Size   | Border Radius |
| -------------- | ------ | ----------- | ------------- |
| Browser Light  | Web    | 1920 × 1008 | 0px           |
| Browser Dark   | Web    | 1920 × 1008 | 0px           |
| iPhone Mockup  | Mobile | 390 × 844   | 47px          |
| Android Mockup | Mobile | 424 × 915   | 36px          |

### Recommended Image Sizes

For best results, use images that match the template slot dimensions:

- **Web Mockups:** `1920 × 1008 px` (aspect ratio ≈ 1.9:1)
- **Mobile Mockups:** `390 × 844 px` (iPhone) or `424 × 915 px` (Android)

---

## 🎯 Adding Templates

Want to add a new mockup template? We've created a comprehensive guide to walk you through the process!

**📖 Read the full guide:** [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)

### Quick Start

1. **Prepare** - Create or find a high-quality device mockup PNG with transparent background
2. **Measure** - Use Photoshop/Figma to measure the screen area coordinates
3. **Configure** - Add template configuration to `lib/templates.ts`
4. **Test** - Verify your template works with various images
5. **Submit** - Open a pull request with your new template

### Example Configuration

```typescript
{
  id: "web-imac-silver",
  label: "iMac Silver",
  type: "web",
  imagePath: "/templates/web-imac-silver.png",
  slot: { x: 145, y: 135, width: 2560, height: 1440 },
  borderRadius: 8,
}
```

For detailed instructions, measurements, troubleshooting, and examples, see the **[Template Creation Guide](TEMPLATE_GUIDE.md)**.

---

### How to Calculate Template Dimensions

When creating new templates, follow these guidelines to calculate accurate measurements:

#### 🖥️ **Web Templates (Browser Mockups)**

1. Open your mockup design in Photoshop/Figma
2. Measure the browser header bar height → **`y` value**
3. Measure distance from left edge to content area → **`x` value**
4. Measure content area dimensions → **`width` and `height` values**
5. Web templates typically have `borderRadius: 0`

**Common Web Dimensions:**

- Full HD: `1920 × 1080` (slot: `1920 × 1008` after 72px header)
- MacBook Pro 14": `3024 × 1964`
- iMac 27": `5120 × 2880`

#### 📱 **Mobile Templates (Phone Mockups)**

1. Open your mockup design in Photoshop/Figma
2. Measure device frame thickness → **`x` and `y` values** (usually equal)
3. Measure screen area dimensions → **`width` and `height` values**
4. Measure corner radius of screen → **`borderRadius` value**

**Common Mobile Dimensions:**

**iPhone:**

- iPhone 14 Pro: `390 × 844` (frame: ~26px, radius: ~47px)
- iPhone 14 Pro Max: `430 × 932` (frame: ~26px, radius: ~55px)
- iPhone SE: `375 × 667` (frame: ~20px, radius: ~10px)

**Android:**

- Pixel 7: `412 × 915` (frame: ~4px, radius: ~36px)
- Samsung S23: `360 × 780` (frame: ~8px, radius: ~40px)
- OnePlus: `412 × 892` (frame: ~6px, radius: ~32px)

#### 🛠️ **Measurement Tools**

**Photoshop:**

- Use Ruler Tool (I) to measure distances
- Check Info panel for X, Y, W, H values
- Test corner radius with Rounded Rectangle Tool

**Figma:**

- Enable Measurement mode (Option/Alt + hover)
- Select frame to see W, H in Design panel
- Inspect border radius property directly

#### ✅ **Verification Checklist**

1. Upload a test image (solid color rectangle)
2. Generate mockup and verify:
   - ❌ Content overflows frame? → Decrease width/height
   - ❌ Content doesn't fill screen? → Increase width/height
   - ❌ Content off-center? → Adjust x/y values
   - ❌ Corners appear square? → Increase borderRadius
   - ✅ Perfect fit? You're done!

**Pro Tips:**

- Always work at 1:1 scale, never scale mockups
- Frame thickness is usually uniform (same x and y)
- Test with multiple image aspect ratios
- Document your measurements for future reference

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Templates

1. Create your mockup PNG with a transparent area for the user's image
2. Add the template configuration to `lib/templates.ts`:

```typescript
{
  id: "my-new-template",
  label: "My Template",
  type: "web", // or "mobile"
  imagePath: "/templates/my-new-template.png",
  slot: { x: 0, y: 72, width: 1920, height: 1008 },
  borderRadius: 0, // for rounded corners (mobile devices)
}
```

3. Place your PNG in `public/templates/`
4. Submit a pull request!

### Development Guidelines

- Follow the existing code style
- Use TypeScript for type safety
- Test your changes on both desktop and mobile
- Ensure all images stay client-side (no server uploads!)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Device mockup designs inspired by various open-source projects
- Icons by [Iconify](https://iconify.design/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)

---

<p align="center">
  Made with ❤️ by <a href="https://www.poyrazavsever.com">Poyraz Avsever</a>
</p>

<p align="center">
  <a href="https://github.com/poyrazavsever/mockup-factory/stargazers">Star this repo</a> •
  <a href="https://github.com/poyrazavsever/mockup-factory/issues">Report Bug</a> •
  <a href="https://github.com/poyrazavsever/mockup-factory/issues">Request Feature</a>
</p>
