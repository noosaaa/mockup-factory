# 📐 Template Creation Guide

> A comprehensive guide to creating and adding new mockup templates to Mockup Factory

## Table of Contents

- [Overview](#overview)
- [Understanding Template Structure](#understanding-template-structure)
- [Step-by-Step Guide](#step-by-step-guide)
  - [1. Prepare Your Mockup Design](#1-prepare-your-mockup-design)
  - [2. Measure Template Dimensions](#2-measure-template-dimensions)
  - [3. Export the Template File](#3-export-the-template-file)
  - [4. Add Template Configuration](#4-add-template-configuration)
  - [5. Test Your Template](#5-test-your-template)
- [Measurement Tools](#measurement-tools)
- [Common Template Dimensions](#common-template-dimensions)
- [Troubleshooting](#troubleshooting)
- [Examples](#examples)

---

## Overview

Mockup Factory uses a slot-based system to composite user images onto device mockups. Each template consists of:

1. **PNG file** with transparent or designated content area
2. **Configuration object** defining where and how to place user content

```
Template PNG + Slot Coordinates + User Image = Final Mockup
```

---

## Understanding Template Structure

Every template needs the following properties:

```typescript
interface Template {
  id: string;           // Unique identifier (e.g., "web-imac-silver")
  label: string;        // Display name (e.g., "iMac Silver")
  type: MockupType;     // "web" or "mobile"
  imagePath: string;    // Path to PNG file (e.g., "/templates/web-imac-silver.png")
  slot: Slot;          // Content placement coordinates
  borderRadius?: number; // Corner radius for rounded screens (optional)
}

interface Slot {
  x: number;      // Distance from left edge of PNG to content area (px)
  y: number;      // Distance from top edge of PNG to content area (px)
  width: number;  // Width of content area (px)
  height: number; // Height of content area (px)
}
```

### Visual Representation

```
Full PNG Canvas (e.g., 1200 × 800 px)
┌─────────────────────────────────────────────┐
│                                             │
│  ← x (offset) →                             │
│  ↓                                          │
│  y  ┌─────────────────────────┐             │
│  │  │                         │             │
│  │  │   CONTENT SLOT          │ ← height    │
│  │  │   (User image here)     │             │
│  │  │                         │             │
│  ↓  └─────────────────────────┘             │
│      ←──── width ─────→                     │
│                                             │
│         Device Frame/Stand                  │
└─────────────────────────────────────────────┘
```

**Important:** Frame thickness doesn't need to be uniform. Only measure the exact screen/content area!

---

## Step-by-Step Guide

### 1. Prepare Your Mockup Design

#### Design Requirements

✅ **Must Have:**
- High resolution (minimum 2000px for web, 800px for mobile)
- Clean, professional device frame/border
- Clearly defined content/screen area
- Transparent background (PNG format)

❌ **Avoid:**
- Low resolution or pixelated images
- Pre-filled content in screen area
- JPEG format (no transparency support)
- Watermarks or copyrighted designs

#### Design Tips

**For Web Templates (Browsers/Monitors):**
- Include realistic browser chrome (address bar, tabs)
- Leave screen area completely empty or white
- Consider adding subtle shadows for depth
- Typical size: 2000-5000px width

**For Mobile Templates (Phones/Tablets):**
- Include device bezels and physical buttons
- Round screen corners accurately
- Add realistic device shadows
- Typical size: 500-1500px height

---

### 2. Measure Template Dimensions

This is the **most critical step**. Accurate measurements ensure perfect image placement.

#### Required Measurements

You need to measure **4 values**:

1. **`x`** - Horizontal offset from PNG left edge to screen left edge
2. **`y`** - Vertical offset from PNG top edge to screen top edge
3. **`width`** - Screen/content area width
4. **`height`** - Screen/content area height
5. **`borderRadius`** (optional) - Corner radius for rounded screens

#### Using Photoshop

```
Step 1: Open your mockup PNG in Photoshop
Step 2: Select Ruler Tool (I) or Rectangle Tool (U)
Step 3: Draw from top-left corner of screen area
Step 4: Check Info panel (Window > Info) for:
        - X, Y coordinates → your x, y values
        - W, H dimensions → your width, height values

For Border Radius:
Step 5: Select Rounded Rectangle Tool
Step 6: Test different radius values on corners
Step 7: Note the radius that matches your screen corners
```

**Photoshop Shortcuts:**
- `I` - Ruler Tool
- `U` - Rectangle Tool
- `F8` - Toggle Info panel
- `Ctrl/Cmd + R` - Show rulers

#### Using Figma

```
Step 1: Import your mockup PNG to Figma
Step 2: Lock the mockup layer
Step 3: Use Rectangle Tool (R) to draw over screen area
Step 4: Select the rectangle
Step 5: Check Design panel (right sidebar) for:
        - X position → your x value
        - Y position → your y value
        - W (width) → your width value
        - H (height) → your height value

For Border Radius:
Step 6: Select the screen area in original mockup
Step 7: Check Corner Radius in Design panel
```

**Figma Shortcuts:**
- `R` - Rectangle Tool
- `Option/Alt + hover` - Quick measure mode
- `Ctrl/Cmd + D` - Duplicate for testing

#### Manual Pixel Counting

If you don't have design tools:

```
Step 1: Open PNG in any image viewer that shows pixel coordinates
Step 2: Hover over top-left corner of screen → note X, Y
Step 3: Hover over bottom-right corner of screen → note X2, Y2
Step 4: Calculate:
        - x = X (from step 2)
        - y = Y (from step 2)
        - width = X2 - X
        - height = Y2 - Y
```

---

### 3. Export the Template File

#### Export Settings

**Photoshop:**
```
File > Export > Export As...
- Format: PNG
- Transparency: Checked
- Resolution: Original (do not resize)
- Color Profile: sRGB
- Interlaced: Unchecked
```

**Figma:**
```
Select mockup frame > Export
- Format: PNG
- Scale: 1x (do not upscale)
- Include "id" in export: Unchecked
```

#### File Naming Convention

Use this format: `{type}-{device}-{variant}.png`

**Examples:**
- `web-browser-light.png`
- `web-browser-dark.png`
- `web-imac-silver.png`
- `web-macbook-pro.png`
- `mobile-iphone-14-pro.png`
- `mobile-pixel-7.png`
- `mobile-ipad-pro.png`

#### File Placement

Save the PNG file to:
```
mockup-factory/
└── public/
    └── templates/
        └── your-template-name.png  ← HERE
```

---

### 4. Add Template Configuration

Open `lib/templates.ts` and add your template configuration:

#### Template Configuration Format

```typescript
// lib/templates.ts

export const templates: Template[] = [
  // ... existing templates ...
  
  // Your new template
  {
    id: "web-imac-silver",              // Unique ID (kebab-case)
    label: "iMac Silver",                // Display name
    type: "web",                         // "web" or "mobile"
    imagePath: "/templates/web-imac-silver.png",  // File path
    slot: { 
      x: 145,        // ← Your measured X offset
      y: 135,        // ← Your measured Y offset
      width: 2560,   // ← Your measured width
      height: 1440   // ← Your measured height
    },
    borderRadius: 8,  // ← Corner radius (optional, 0 for square)
  },
];
```

#### Configuration Checklist

✅ **ID:**
- [ ] Unique (not used by another template)
- [ ] Lowercase with hyphens (kebab-case)
- [ ] Descriptive (includes device name)

✅ **Label:**
- [ ] User-friendly name
- [ ] Proper capitalization
- [ ] Concise (2-4 words)

✅ **Type:**
- [ ] Set to `"web"` for desktop/browser mockups
- [ ] Set to `"mobile"` for phone/tablet mockups

✅ **Image Path:**
- [ ] Starts with `/templates/`
- [ ] Matches actual filename
- [ ] PNG extension

✅ **Slot Dimensions:**
- [ ] X and Y offsets are correct
- [ ] Width and height match screen area
- [ ] All values are positive integers

✅ **Border Radius:**
- [ ] Set to 0 for square corners (browsers)
- [ ] Measured accurately for rounded screens (phones)
- [ ] Optional (can be omitted if 0)

---

### 5. Test Your Template

#### Testing Workflow

**Step 1: Start Development Server**
```bash
cd mockup-factory
pnpm dev
```

**Step 2: Navigate to Templates Page**
```
Open: http://localhost:3000/templates
```

**Step 3: Visual Verification**
- [ ] Your template appears in the grid
- [ ] Template thumbnail loads correctly
- [ ] Type badge shows correct category (Web/Mobile)
- [ ] Label displays properly

**Step 4: Create Test Mockup**

Use these test images for verification:

**Test Image 1: Solid Color**
```
Create a solid red/green/blue rectangle matching your slot dimensions
Purpose: Check if content fills screen area perfectly
```

**Test Image 2: Grid Pattern**
```
Create a grid/checkerboard pattern
Purpose: Verify alignment and detect any skewing
```

**Test Image 3: Text/Numbers**
```
Add corner numbers (1, 2, 3, 4) in each corner
Purpose: Check if corners align and radius is correct
```

**Step 5: Adjustment Checklist**

Common issues and fixes:

| Issue | Cause | Solution |
|-------|-------|----------|
| Content overflows left edge | `x` too small | Increase `x` value |
| Content overflows top edge | `y` too small | Increase `y` value |
| Content doesn't reach edges | `width`/`height` too small | Increase dimensions |
| Content spills outside screen | `width`/`height` too large | Decrease dimensions |
| Corners appear square | `borderRadius` too small | Increase radius |
| Corners too rounded | `borderRadius` too large | Decrease radius |
| Content appears off-center | Asymmetric measurements | Re-measure all values |

**Step 6: Test with Real Content**
- Upload an actual screenshot or design
- Verify it looks professional and realistic
- Check on different screen sizes
- Test download functionality

---

## Measurement Tools

### Recommended Software

| Tool | Platform | Best For | Free? |
|------|----------|----------|-------|
| **Figma** | Web, Desktop | Quick measurements, collaboration | ✅ Yes |
| **Photoshop** | Desktop | Professional editing, precision | ❌ Paid |
| **GIMP** | Desktop | Free alternative to Photoshop | ✅ Yes |
| **Pixelmator Pro** | macOS | Mac-native design tool | ❌ Paid |
| **Photopea** | Web | Free browser-based Photoshop | ✅ Yes |

### Online Measurement Tools

**Photopea** (Free Photoshop alternative):
```
https://www.photopea.com/
- Open PNG file
- Use Ruler Tool (I)
- Check Info panel for coordinates
```

**Figma** (Free for individuals):
```
https://figma.com/
- Import PNG
- Use Rectangle Tool (R)
- Check properties panel
```

---

## Common Template Dimensions

### Web Templates

#### Desktop Monitors

| Device | Resolution | Typical Slot | Border Radius |
|--------|------------|--------------|---------------|
| Full HD Monitor | 1920 × 1080 | 1920 × 1010 | 0-5px |
| iMac 24" (M1) | 4480 × 2520 | 4480 × 2450 | 10px |
| iMac 27" (5K) | 5120 × 2880 | 5120 × 2810 | 8px |
| MacBook Pro 14" | 3024 × 1964 | 3024 × 1890 | 12px |
| MacBook Pro 16" | 3456 × 2234 | 3456 × 2160 | 12px |

#### Browser Windows

| Browser Type | Typical Slot | Header Height | Border Radius |
|--------------|--------------|---------------|---------------|
| Chrome/Edge | 1920 × 1008 | 72px | 0px |
| Safari (macOS) | 1920 × 1000 | 80px | 8px |
| Firefox | 1920 × 1010 | 70px | 0px |

**Frame Offsets:**
- **X:** Usually 0 (browsers start at left edge)
- **Y:** Header height (typically 70-80px)

### Mobile Templates

#### iPhone Models

| Device | Screen Resolution | Frame Offset | Border Radius |
|--------|-------------------|--------------|---------------|
| iPhone 14 Pro Max | 430 × 932 | ~26px | 55px |
| iPhone 14 Pro | 390 × 844 | ~26px | 47px |
| iPhone 14 | 390 × 844 | ~24px | 47px |
| iPhone SE (3rd) | 375 × 667 | ~20px | 10px |
| iPhone 13 Mini | 375 × 812 | ~24px | 44px |

#### Android Models

| Device | Screen Resolution | Frame Offset | Border Radius |
|--------|-------------------|--------------|---------------|
| Pixel 7 Pro | 412 × 915 | ~4px | 36px |
| Samsung S23 Ultra | 360 × 780 | ~8px | 42px |
| OnePlus 11 | 412 × 892 | ~6px | 32px |
| Xiaomi 13 | 393 × 851 | ~5px | 38px |

#### Tablets

| Device | Screen Resolution | Frame Offset | Border Radius |
|--------|-------------------|--------------|---------------|
| iPad Pro 12.9" | 2048 × 2732 | ~32px | 18px |
| iPad Air | 1640 × 2360 | ~28px | 16px |
| iPad Mini | 1488 × 2266 | ~26px | 14px |

---

## Troubleshooting

### Issue: Template Not Appearing

**Possible Causes:**
1. PNG file not in `public/templates/` folder
2. Typo in `imagePath`
3. Template not added to `templates` array

**Solution:**
```typescript
// Check these:
imagePath: "/templates/web-imac-silver.png"  // ✅ Correct
imagePath: "templates/web-imac-silver.png"   // ❌ Missing leading slash
imagePath: "/template/web-imac-silver.png"   // ❌ Wrong folder name
```

### Issue: Content Misaligned

**Possible Causes:**
1. Incorrect x/y offset measurements
2. PNG was resized after measuring
3. Wrong width/height values

**Solution:**
```typescript
// Re-measure carefully
// Use exact pixel coordinates from design tool
// Don't round numbers - use precise values

// Example: If Figma shows X: 145.5, use 146 (round up)
slot: { x: 146, y: 135, width: 2560, height: 1440 }
```

### Issue: Content Overflows or Doesn't Fill Screen

**Possible Causes:**
1. Width/height too large (overflow)
2. Width/height too small (doesn't fill)
3. PNG aspect ratio doesn't match slot

**Solution:**
```typescript
// Test with incremental adjustments
// Original:
slot: { x: 100, y: 100, width: 1920, height: 1080 }

// If overflowing, reduce dimensions:
slot: { x: 100, y: 100, width: 1900, height: 1060 }

// If not filling, increase dimensions:
slot: { x: 100, y: 100, width: 1940, height: 1100 }
```

### Issue: Corners Not Matching

**Possible Causes:**
1. Wrong `borderRadius` value
2. Mockup has variable corner radii
3. Canvas rendering issue

**Solution:**
```typescript
// Try different values:
borderRadius: 0   // Square corners
borderRadius: 10  // Slightly rounded
borderRadius: 47  // iPhone-style rounded

// For iOS devices, typical values:
// iPhone: 40-55px
// iPad: 14-20px

// For Android devices:
// 30-45px depending on model
```

### Issue: Low Quality Output

**Possible Causes:**
1. Source PNG too small
2. Browser downscaling
3. User uploaded low-res image

**Solution:**
```typescript
// Ensure your template PNG is high resolution
// Recommended minimum sizes:
// - Web templates: 2000px width
// - Mobile templates: 800px height

// Don't upscale - always use original resolution
```

---

## Examples

### Example 1: Browser Light Theme

```typescript
{
  id: "web-browser-light",
  label: "Browser Light",
  type: "web",
  imagePath: "/templates/web-browser-light.png",
  slot: { 
    x: 0,        // Browser starts at left edge
    y: 72,       // 72px header with tabs and address bar
    width: 1920, // Full HD width
    height: 1008 // 1080 - 72 = 1008
  },
  borderRadius: 0, // Browsers have square corners
}
```

**Measurements:**
- PNG size: 1920 × 1080px
- Header bar: 72px tall
- No side borders (x = 0)
- Content fills full width

---

### Example 2: iPhone 14 Pro

```typescript
{
  id: "mobile-iphone-14-pro",
  label: "iPhone 14 Pro",
  type: "mobile",
  imagePath: "/templates/mobile-iphone-14-pro.png",
  slot: { 
    x: 26,       // 26px bezel on left
    y: 26,       // 26px bezel on top
    width: 390,  // Native screen width
    height: 844  // Native screen height
  },
  borderRadius: 47, // iPhone's rounded display corners
}
```

**Measurements:**
- PNG size: 442 × 896px (390 + 26*2, 844 + 26*2)
- Uniform bezel: 26px all around
- Rounded corners: 47px radius
- Includes device shadow/depth

---

### Example 3: iMac 24" (M1)

```typescript
{
  id: "web-imac-24-silver",
  label: "iMac 24\" Silver",
  type: "web",
  imagePath: "/templates/web-imac-24-silver.png",
  slot: { 
    x: 145,      // Left bezel + chin offset
    y: 135,      // Top bezel
    width: 4480, // 4.5K Retina display width
    height: 2520 // 4.5K Retina display height
  },
  borderRadius: 10, // Slightly rounded display corners
}
```

**Measurements:**
- PNG size: ~4770 × 3000px (includes chin and stand)
- Non-uniform bezels (chin is larger)
- High-resolution display
- Subtle corner rounding

---

### Example 4: Android Tablet

```typescript
{
  id: "mobile-pixel-tablet",
  label: "Pixel Tablet",
  type: "mobile",
  imagePath: "/templates/mobile-pixel-tablet.png",
  slot: { 
    x: 48,       // Larger bezel for tablet
    y: 48,       // Symmetrical on all sides
    width: 1600, // 10.95" display
    height: 2560 // 16:10 aspect ratio
  },
  borderRadius: 24, // Modern tablet corner radius
}
```

**Measurements:**
- PNG size: 1696 × 2656px
- Larger bezels than phones
- 16:10 aspect ratio
- Medium corner rounding

---

## Best Practices

### ✅ Do's

- **Always measure in 1:1 scale** - Never measure a resized/scaled mockup
- **Use precise values** - Don't round measurements arbitrarily
- **Test with multiple images** - Various aspect ratios and content types
- **Document your work** - Add comments explaining unusual measurements
- **Use descriptive IDs** - Make it clear what device/variant it is
- **Optimize file size** - Use PNG compression tools (TinyPNG, ImageOptim)
- **Keep consistent naming** - Follow the established naming convention

### ❌ Don'ts

- **Don't guess measurements** - Always use proper tools
- **Don't use JPEG** - Transparency is required
- **Don't include watermarks** - Keep mockups clean
- **Don't use copyrighted designs** - Create original or use open-source
- **Don't skip testing** - Always verify with real content
- **Don't forget border radius** - Critical for mobile devices
- **Don't use inconsistent scales** - Keep everything at actual size

---

## Contributing Your Template

Once your template is tested and working:

1. **Fork the repository** on GitHub
2. **Create a new branch**: `git checkout -b add-imac-template`
3. **Add your files**:
   - PNG in `public/templates/`
   - Configuration in `lib/templates.ts`
4. **Test thoroughly** - Try multiple images
5. **Commit your changes**: `git commit -m "Add iMac 24\" Silver template"`
6. **Push to GitHub**: `git push origin add-imac-template`
7. **Open a Pull Request** with:
   - Screenshot of your template in use
   - Description of device/mockup
   - Any special notes about measurements

### Pull Request Template

```markdown
## New Template: [Device Name]

### Description
- **Device:** iMac 24" (M1)
- **Type:** Web
- **Resolution:** 4480 × 2520
- **Special notes:** Includes device chin and stand

### Screenshots
[Attach mockup examples]

### Checklist
- [ ] PNG file added to `public/templates/`
- [ ] Configuration added to `lib/templates.ts`
- [ ] Tested with multiple images
- [ ] Dimensions verified accurate
- [ ] Border radius correct (if applicable)
- [ ] No console errors
- [ ] Works on mobile and desktop

### Measurements
```typescript
slot: { x: 145, y: 135, width: 4480, height: 2520 }
borderRadius: 10
```
```

---

## Resources

### Design Assets

- **Mockup Hunt**: https://mockuphunt.co/ (Free mockups)
- **Freepik**: https://www.freepik.com/mockups (Free & Premium)
- **Mockup World**: https://www.mockupworld.co/ (Free mockups)
- **Figma Community**: https://www.figma.com/community (Free device mockups)

### Tools

- **Photopea**: https://www.photopea.com/ (Free Photoshop alternative)
- **Figma**: https://figma.com/ (Free design tool)
- **TinyPNG**: https://tinypng.com/ (PNG compression)
- **ImageOptim**: https://imageoptim.com/ (Mac PNG optimizer)

### Learning

- **Canvas API Docs**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Next.js Image**: https://nextjs.org/docs/app/api-reference/components/image
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## Questions?

- **GitHub Issues**: https://github.com/poyrazavsever/mockup-factory/issues
- **Discussions**: https://github.com/poyrazavsever/mockup-factory/discussions

---

<p align="center">
  Made with ❤️ by the Mockup Factory community
</p>
