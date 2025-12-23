# UI Color Palette Generator

A Next.js application that generates accessible color palettes using Adobe Leonardo Contrast Colors. This tool creates color scales from brand colors with WCAG-compliant contrast ratios, making it easy to build accessible design systems.

## Features

- **Automated Color Scale Generation**: Creates 11-step color scales (50-950) from brand colors
- **WCAG Compliance**: All colors are generated with specific contrast ratios against a white background
- **Interactive UI**: Visual color palette table with hover states and copy functionality
- **Copy to Clipboard**: Copy individual colors, entire columns, or all colors at once
- **Color Information**: Displays HEX, HSL values, and contrast ratios for each color
- **Multiple Colorspaces**: Supports various colorspaces (OKLCH, RGB, CAM02, etc.) for optimal color generation

## Tech Stack

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Adobe Leonardo Contrast Colors** - Color palette generation
- **chroma-js** - Color manipulation and calculations
- **shadcn/ui** - UI components

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ui-color-palette
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Customizing Brand Colors

Edit the `brand` object in `color-palette.tsx` to use your own brand colors:

```typescript
const brand = {
  'blue': '#007DBC',
  'navy': '#002F5A',
  'aqua': '#008EB2',
  // ... add your colors
}
```

### Configuring Color Scales

Modify the `colorConfigs` array to customize how colors are generated:

```typescript
const colorConfigs: ColorConfig[] = [
  { 
    name: "blue", 
    keys: [getBrandColor("blue"), getBrandColor("navy")], 
    colorspace: "RGB", 
    smooth: true 
  },
  // ... add more configurations
]
```

**Configuration Options:**
- `name`: Name of the color scale
- `keys`: Array of input colors from the brand palette
- `colorspace`: Colorspace to use (CAM02, CAM02p, LCH, LAB, HSL, HSLuv, HSV, RGB, OKLAB, OKLCH)
- `smooth`: Boolean flag for smooth (true) or sharp (false) color transitions

### Adjusting Contrast Ratios

Modify the `CONTRAST_RATIOS` array to change the contrast levels for each color step:

```typescript
const CONTRAST_RATIOS = [1.07, 1.15, 1.33, 1.6, 2.2, 3.3, 4.9, 7.8, 11.3, 15, 18] as const
```

### Changing Background Color

Update `LEONARDO_BACKGROUND` to generate colors against a different background:

```typescript
const LEONARDO_BACKGROUND = "#ffffff" // Change to your background color
```

## Color Scale Steps

The palette generates colors for the following steps:
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

Each step corresponds to a specific contrast ratio against the background color.

## Copying Colors

- **Single Color**: Click on any color swatch to copy its HEX value
- **Column**: Click the "Copy" button below a color column to copy all colors in that scale
- **All Colors**: Click "Copy all" to copy all color scales at once

## Project Structure

```
ui-color-palette/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── color-palette.tsx        # Main color palette component
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── theme-provider.tsx   # Theme provider
├── lib/
│   └── utils.ts             # Utility functions
└── styles/
    └── globals.css          # Additional styles
```

## Building for Production

```bash
pnpm build
pnpm start
```

## Related links

- [Designing accessible color systems](https://stripe.com/blog/accessible-color-systems)
- [Using color at scale for aesthetics and accessibility - Ashley Seto (Config 2023) - YouTube](https://www.youtube.com/watch?v=B6Qk_j9UGU8)
- [Accessible Palette: stop using HSL for color systems | Wildbit](https://www.wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)
- [Perceptually uniform color spaces - Programming Design Systems](https://programmingdesignsystems.com/color/perceptually-uniform-color-spaces/index.html)
- [Color Spaces – Bartosz Ciechanowski](https://ciechanow.ski/color-spaces/)
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance)