"use client"

import { useState } from "react"
import chroma from "chroma-js"

// Type definitions
type ColorStep = {
  [key: number]: string
}

type ColorScales = {
  [colorName: string]: ColorStep
}

// Utility functions for color calculations
function hexToHsl(hex: string): string {
  const color = chroma(hex)
  const [h, s, l] = color.hsl()
  return `hsl(${Math.round(h || 0)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

function getContrastRatio(hex: string): number {
  return chroma.contrast(hex, "#ffffff")
}

function truncateDecimals(num: number, decimals: number): string {
  const multiplier = Math.pow(10, decimals)
  return (Math.floor(num * multiplier) / multiplier).toString()
}

// Function to determine if text should be white or black based on background color
function shouldUseWhiteText(hexColor: string): boolean {
  return chroma.contrast(hexColor, "#ffffff") >= chroma.contrast(hexColor, "#000000")
}

const brand = {
  'wfp': '#0077C8',
  'navy': '#002E5D',
  'aqua': '#00AEC7',
  'darkgreen': '#00664F',
  'green': '#009F4D',
  'ivory': '#F1E6B2',
  'earthybrown': '#B86125',
  'orange': '#FC4C02',
  'red': '#E4002B',
  'purple': '#AD1AAC',
  'burgundy': '#890C58',
}

const leonardo = {
  "neutral100": {
    "value": "#f8f8f9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "neutral200": {
    "value": "#eeefef",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "neutral300": {
    "value": "#dedfe0",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "neutral400": {
    "value": "#cacccd",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "neutral500": {
    "value": "#adafb2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "neutral600": {
    "value": "#8c8d90",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "neutral700": {
    "value": "#6e6f72",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "neutral800": {
    "value": "#525254",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "neutral900": {
    "value": "#3c3a3b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "neutral1000": {
    "value": "#292527",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "neutral1100": {
    "value": "#181616",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "red100": {
    "value": "#fef8f8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "red200": {
    "value": "#fdebe9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "red300": {
    "value": "#fcd7d4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "red400": {
    "value": "#f9bdbb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "red500": {
    "value": "#f69392",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "red600": {
    "value": "#f15967",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "red700": {
    "value": "#df012b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "red800": {
    "value": "#a50e27",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "red900": {
    "value": "#731521",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "red1000": {
    "value": "#4e0e16",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "red1100": {
    "value": "#2f090d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "orange100": {
    "value": "#fff8f4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "orange200": {
    "value": "#feeade",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "orange300": {
    "value": "#fdd8c4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "orange400": {
    "value": "#fbbfa2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "orange500": {
    "value": "#f79574",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "orange600": {
    "value": "#f15d3b",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "orange700": {
    "value": "#c54224",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "orange800": {
    "value": "#92311a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "orange900": {
    "value": "#692312",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "orange1000": {
    "value": "#47170c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "orange1100": {
    "value": "#2a0e07",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "brown100": {
    "value": "#fdf7f3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "brown200": {
    "value": "#faebe2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "brown300": {
    "value": "#f5d9c7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "brown400": {
    "value": "#efc4a8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "brown500": {
    "value": "#dea17e",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "brown600": {
    "value": "#c77b4d",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "brown700": {
    "value": "#ac582a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "brown800": {
    "value": "#80411a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "brown900": {
    "value": "#5b2f10",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "brown1000": {
    "value": "#3d1f0b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "brown1100": {
    "value": "#241206",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "ivorown100": {
    "value": "#fbf9ec",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "ivorown200": {
    "value": "#f5efd2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "ivorown300": {
    "value": "#ebdfaf",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "ivorown400": {
    "value": "#e4c999",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "ivorown500": {
    "value": "#d8a476",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "ivorown600": {
    "value": "#c77b4d",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "ivorown700": {
    "value": "#ac582a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "ivorown800": {
    "value": "#80411a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "ivorown900": {
    "value": "#5b2f10",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "ivorown1000": {
    "value": "#3d1f0b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "ivorown1100": {
    "value": "#241206",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "ivory100": {
    "value": "#fbf9ec",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "ivory200": {
    "value": "#f5efd2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "ivory300": {
    "value": "#ebe0b0",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "ivory400": {
    "value": "#dacb9d",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "ivory500": {
    "value": "#c1ac81",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "ivory600": {
    "value": "#a58960",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "ivory700": {
    "value": "#826c4b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "ivory800": {
    "value": "#604f38",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "ivory900": {
    "value": "#443827",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "ivory1000": {
    "value": "#2d251a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "ivory1100": {
    "value": "#1a160f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "green100": {
    "value": "#f4faf6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "green200": {
    "value": "#e4f3e9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "green300": {
    "value": "#c9e7d2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "green400": {
    "value": "#a6d8b4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "green500": {
    "value": "#6cc084",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "green600": {
    "value": "#27a15c",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "green700": {
    "value": "#038045",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "green800": {
    "value": "#035e3a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "green900": {
    "value": "#02432c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "green1000": {
    "value": "#022d1d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "green1100": {
    "value": "#011b12",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "greeen100": {
    "value": "#f4faf6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "greeen200": {
    "value": "#e4f3e9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "greeen300": {
    "value": "#c9e7d2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "greeen400": {
    "value": "#a6d8b4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "greeen500": {
    "value": "#6cc084",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "greeen600": {
    "value": "#27a15c",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "greeen700": {
    "value": "#028048",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "greeen800": {
    "value": "#005e45",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "greeen900": {
    "value": "#00432f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "greeen1000": {
    "value": "#002d1f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "greeen1100": {
    "value": "#001b12",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "darkgreen100": {
    "value": "#f4faf8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "darkgreen200": {
    "value": "#e3f3ee",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "darkgreen300": {
    "value": "#c5e6db",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "darkgreen400": {
    "value": "#a0d7c9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "darkgreen500": {
    "value": "#6fbea2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "darkgreen600": {
    "value": "#279f81",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "darkgreen700": {
    "value": "#087e63",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "darkgreen800": {
    "value": "#005e46",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "darkgreen900": {
    "value": "#00432f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "darkgreen1000": {
    "value": "#002d1f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "darkgreen1100": {
    "value": "#001b12",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "aqua100": {
    "value": "#f3fafb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "aqua200": {
    "value": "#e0f3f6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "aqua300": {
    "value": "#c1e6ed",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "aqua400": {
    "value": "#91d7e7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "aqua500": {
    "value": "#42bdd8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "aqua600": {
    "value": "#009abb",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "aqua700": {
    "value": "#007998",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "aqua800": {
    "value": "#005971",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "aqua900": {
    "value": "#004053",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "aqua1000": {
    "value": "#002a37",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "aqua1100": {
    "value": "#001921",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "blue100": {
    "value": "#f2fafe",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "blue200": {
    "value": "#dcf2fd",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "blue300": {
    "value": "#bae5fb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "blue400": {
    "value": "#92d5f5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "blue500": {
    "value": "#44bbe7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "blue600": {
    "value": "#0497cf",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "blue700": {
    "value": "#0075b2",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "blue800": {
    "value": "#005687",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "blue900": {
    "value": "#003d62",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "blue1000": {
    "value": "#002942",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "blue1100": {
    "value": "#001927",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "bluvy100": {
    "value": "#f2fafe",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "bluvy200": {
    "value": "#dcf2fd",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "bluvy300": {
    "value": "#bae5fb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "bluvy400": {
    "value": "#92d5f5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "bluvy500": {
    "value": "#44bbe7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "bluvy600": {
    "value": "#0497cf",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "bluvy700": {
    "value": "#0075b2",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "bluvy800": {
    "value": "#005687",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "bluvy900": {
    "value": "#003c67",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "bluvy1000": {
    "value": "#002650",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "bluvy1100": {
    "value": "#00143a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "navy100": {
    "value": "#f5f9fc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "navy200": {
    "value": "#e7f0f7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "navy300": {
    "value": "#cee2f0",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "navy400": {
    "value": "#b3d0e5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "navy500": {
    "value": "#8cb4d1",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "navy600": {
    "value": "#6692b7",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "navy700": {
    "value": "#45739e",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "navy800": {
    "value": "#245482",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "navy900": {
    "value": "#0c3c67",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "navy1000": {
    "value": "#002650",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "navy1100": {
    "value": "#00143a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "purple100": {
    "value": "#fcf7fa",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "purple200": {
    "value": "#f8eaf3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "purple300": {
    "value": "#f2d7e8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "purple400": {
    "value": "#eac1db",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "purple500": {
    "value": "#da9cc6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "purple600": {
    "value": "#c372af",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "purple700": {
    "value": "#b1459c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "purple800": {
    "value": "#941481",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "purple900": {
    "value": "#67175d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "purple1000": {
    "value": "#45103f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "purple1100": {
    "value": "#2a0926",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "purpundy100": {
    "value": "#fcf7fa",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "purpundy200": {
    "value": "#f8eaf3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "purpundy300": {
    "value": "#f2d7e8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "purpundy400": {
    "value": "#eac1db",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "purpundy500": {
    "value": "#da9cc6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "purpundy600": {
    "value": "#c372af",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "purpundy700": {
    "value": "#b1459c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "purpundy800": {
    "value": "#9d076e",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "purpundy900": {
    "value": "#74014b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "purpundy1000": {
    "value": "#4f003d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "purpundy1100": {
    "value": "#320028",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "burgundy100": {
    "value": "#fef6f8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "burgundy200": {
    "value": "#fdebef",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "burgundy300": {
    "value": "#fbd6df",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "burgundy400": {
    "value": "#f9bcce",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "burgundy500": {
    "value": "#e996b7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "burgundy600": {
    "value": "#cc709c",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "burgundy700": {
    "value": "#aa517d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "burgundy800": {
    "value": "#971f62",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "burgundy900": {
    "value": "#74014b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "burgundy1000": {
    "value": "#4f003d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "burgundy1100": {
    "value": "#320028",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  }
}

const originalColorScales: ColorScales = {
  bluvy: {
    0: brand.wfp,
    50: leonardo.bluvy100.value,
    100: leonardo.bluvy200.value,
    200: leonardo.bluvy300.value,
    300: leonardo.bluvy400.value,
    400: leonardo.bluvy500.value,
    500: leonardo.bluvy600.value,
    600: leonardo.bluvy700.value,
    700: leonardo.bluvy800.value,
    800: leonardo.bluvy900.value,
    900: leonardo.bluvy1000.value,
    950: leonardo.bluvy1100.value,
  },
  blue: {
    0: brand.wfp,
    50: leonardo.blue100.value,
    100: leonardo.blue200.value,
    200: leonardo.blue300.value,
    300: leonardo.blue400.value,
    400: leonardo.blue500.value,
    500: leonardo.blue600.value,
    600: leonardo.blue700.value,
    700: leonardo.blue800.value,
    800: leonardo.blue900.value,
    900: leonardo.blue1000.value,
    950: leonardo.blue1100.value,
  },
  navy: {
    0: brand.navy,
    50: leonardo.navy100.value,
    100: leonardo.navy200.value,
    200: leonardo.navy300.value,
    300: leonardo.navy400.value,
    400: leonardo.navy500.value,
    500: leonardo.navy600.value,
    600: leonardo.navy700.value,
    700: leonardo.navy800.value,
    800: leonardo.navy900.value,
    900: leonardo.navy1000.value,
    950: leonardo.navy1100.value,
  },
  greeen: {
    0: brand.green,
    50: leonardo.greeen100.value,
    100: leonardo.greeen200.value,
    200: leonardo.greeen300.value,
    300: leonardo.greeen400.value,
    400: leonardo.greeen500.value,
    500: leonardo.greeen600.value,
    600: leonardo.greeen700.value,
    700: leonardo.greeen800.value,
    800: leonardo.greeen900.value,
    900: leonardo.greeen1000.value,
    950: leonardo.greeen1100.value,
  },
  green: {
    0: brand.green,
    50: leonardo.green100.value,
    100: leonardo.green200.value,
    200: leonardo.green300.value,
    300: leonardo.green400.value,
    400: leonardo.green500.value,
    500: leonardo.green600.value,
    600: leonardo.green700.value,
    700: leonardo.green800.value,
    800: leonardo.green900.value,
    900: leonardo.green1000.value,
    950: leonardo.green1100.value,
  },
  darkgreen: {
    0: brand.darkgreen,
    50: leonardo.darkgreen100.value,
    100: leonardo.darkgreen200.value,
    200: leonardo.darkgreen300.value,
    300: leonardo.darkgreen400.value,
    400: leonardo.darkgreen500.value,
    500: leonardo.darkgreen600.value,
    600: leonardo.darkgreen700.value,
    700: leonardo.darkgreen800.value,
    800: leonardo.darkgreen900.value,
    900: leonardo.darkgreen1000.value,
    950: leonardo.darkgreen1100.value,
  },
  orange: {
    0: brand.orange,
    50: leonardo.orange100.value,
    100: leonardo.orange200.value,
    200: leonardo.orange300.value,
    300: leonardo.orange400.value,
    400: leonardo.orange500.value,
    500: leonardo.orange600.value,
    600: leonardo.orange700.value,
    700: leonardo.orange800.value,
    800: leonardo.orange900.value,
    900: leonardo.orange1000.value,
    950: leonardo.orange1100.value,
  },
  red: {
    0: brand.red,
    50: leonardo.red100.value,
    100: leonardo.red200.value,
    200: leonardo.red300.value,
    300: leonardo.red400.value,
    400: leonardo.red500.value,
    500: leonardo.red600.value,
    600: leonardo.red700.value,
    700: leonardo.red800.value,
    800: leonardo.red900.value,
    900: leonardo.red1000.value,
    950: leonardo.red1100.value,
  },
  aqua: {
    0: brand.aqua,
    50: leonardo.aqua100.value,
    100: leonardo.aqua200.value,
    200: leonardo.aqua300.value,
    300: leonardo.aqua400.value,
    400: leonardo.aqua500.value,
    500: leonardo.aqua600.value,
    600: leonardo.aqua700.value,
    700: leonardo.aqua800.value,
    800: leonardo.aqua900.value,
    900: leonardo.aqua1000.value,
    950: leonardo.aqua1100.value,
  },
  purpundy: {
    0: brand.purple,
    50: leonardo.purpundy100.value,
    100: leonardo.purpundy200.value,
    200: leonardo.purpundy300.value,
    300: leonardo.purpundy400.value,
    400: leonardo.purpundy500.value,
    500: leonardo.purpundy600.value,
    600: leonardo.purpundy700.value,
    700: leonardo.purpundy800.value,
    800: leonardo.purpundy900.value,
    900: leonardo.purpundy1000.value,
    950: leonardo.purpundy1100.value,
  },
  purple: {
    0: brand.purple,
    50: leonardo.purple100.value,
    100: leonardo.purple200.value,
    200: leonardo.purple300.value,
    300: leonardo.purple400.value,
    400: leonardo.purple500.value,
    500: leonardo.purple600.value,
    600: leonardo.purple700.value,
    700: leonardo.purple800.value,
    800: leonardo.purple900.value,
    900: leonardo.purple1000.value,
    950: leonardo.purple1100.value,
  },
  burgundy: {
    0: brand.burgundy,
    50: leonardo.burgundy100.value,
    100: leonardo.burgundy200.value,
    200: leonardo.burgundy300.value,
    300: leonardo.burgundy400.value,
    400: leonardo.burgundy500.value,
    500: leonardo.burgundy600.value,
    600: leonardo.burgundy700.value,
    700: leonardo.burgundy800.value,
    800: leonardo.burgundy900.value,
    900: leonardo.burgundy1000.value,
    950: leonardo.burgundy1100.value,
  },
  ivory: {
    0: brand.ivory,
    50: leonardo.ivory100.value,
    100: leonardo.ivory200.value,
    200: leonardo.ivory300.value,
    300: leonardo.ivory400.value,
    400: leonardo.ivory500.value,
    500: leonardo.ivory600.value,
    600: leonardo.ivory700.value,
    700: leonardo.ivory800.value,
    800: leonardo.ivory900.value,
    900: leonardo.ivory1000.value,
    950: leonardo.ivory1100.value,
  },
  brown: {
    0: brand.earthybrown,
    50: leonardo.brown100.value,
    100: leonardo.brown200.value,
    200: leonardo.brown300.value,
    300: leonardo.brown400.value,
    400: leonardo.brown500.value,
    500: leonardo.brown600.value,
    600: leonardo.brown700.value,
    700: leonardo.brown800.value,
    800: leonardo.brown900.value,
    900: leonardo.brown1000.value,
    950: leonardo.brown1100.value,
  },
  ivorown: {
    0: brand.ivory,
    50: leonardo.ivorown100.value,
    100: leonardo.ivorown200.value,
    200: leonardo.ivorown300.value,
    300: leonardo.ivorown400.value,
    400: leonardo.ivorown500.value,
    500: leonardo.ivorown600.value,
    600: leonardo.ivorown700.value,
    700: leonardo.ivorown800.value,
    800: leonardo.ivorown900.value,
    900: leonardo.ivorown1000.value,
    950: leonardo.ivorown1100.value,
  },
  neutral: {
    0: "white",
    50: leonardo.neutral100.value,
    100: leonardo.neutral200.value,
    200: leonardo.neutral300.value,
    300: leonardo.neutral400.value,
    400: leonardo.neutral500.value,
    500: leonardo.neutral600.value,
    600: leonardo.neutral700.value,
    700: leonardo.neutral800.value,
    800: leonardo.neutral900.value,
    900: leonardo.neutral1000.value,
    950: leonardo.neutral1100.value,
  },
}

export default function ColorPalette() {
  const [copied, setCopied] = useState("")
  const colorNames = [
    // "blue",
    "bluvy",
    // "navy",
    // "green",
    "greeen",
    // "darkgreen",
    "orange",
    "red",
    "aqua",
    // "purple",
    "purpundy",
    // "burgundy",
    "ivory",
    // "ivorown",
    "brown",
    "neutral"
  ]
  const steps = [
    // 0,
    50,
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    950
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(""), 1000)
  }

  const copyColumnToClipboard = (colorName: string) => {
    const columnData = steps.reduce((acc, step) => {
      acc[step] = colorScales[colorName][step]
      return acc
    }, {} as Record<number, string>)

    const formattedOutput = `"${colorName}": {\n${Object.entries(columnData)
      .map(([step, hex]) => `  "${step}": "${hex}"`)
      .join(',\n')
      }\n}`

    navigator.clipboard.writeText(formattedOutput)
    setCopied(`${colorName}-column`)
    setTimeout(() => setCopied(""), 1000)
  }

  // Use the original color scales directly
  const colorScales = originalColorScales

  return (
    <div className="font-mono">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <tbody>
            {steps.map((step) => (
              <tr key={step}>
                {colorNames.map((colorName) => {
                  const hexColor = colorScales[colorName][step]

                  // Add safety check to prevent undefined values
                  if (!hexColor) {
                    return (
                      <td key={`${colorName}-${step}`} className="p-0 relative bg-red-500">
                        <div className="w-full flex flex-col justify-between p-3">
                          <div className="text-white text-xs mb-1">
                            ERROR: {colorName}-{step}
                          </div>
                        </div>
                      </td>
                    )
                  }

                  const hslColor = hexToHsl(hexColor)
                  const contrastRatio = getContrastRatio(hexColor)
                  const useWhiteText = shouldUseWhiteText(hexColor)

                  return (
                    <td
                      style={{ backgroundColor: hexColor }}
                      key={`${colorName}-${step}`}
                      className="p-0 relative cursor-pointer"
                      onClick={() => copyToClipboard(hexColor)}
                    >
                      <div className="w-full flex flex-col justify-between p-3">
                        <div className={useWhiteText ? "text-white text-xs font-semibold mb-1" : "text-black text-xs font-semibold mb-1"}>
                          {colorName}-{step}
                        </div>
                        <div className={useWhiteText ? "text-white text-xs mb-1" : "text-black text-xs mb-1"}>
                          {hexColor}
                        </div>
                        <div className={useWhiteText ? "text-white text-xs mb-1" : "text-black text-xs mb-1"}>
                          {hslColor}
                        </div>
                        <div
                          className={
                            useWhiteText ? "text-white text-xs font-semibold" : "text-black text-xs font-semibold"
                          }
                        >
                          {truncateDecimals(contrastRatio, 1)}
                        </div>
                      </div>
                      {copied === hexColor && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white text-sm">Copied!</span>
                        </div>
                      )}
                    </td>
                  )
                })}
                <td className="p-0 relative w-20">
                  <div className="w-full flex flex-col justify-between p-3">
                    <div className="text-sm">
                      {(() => {
                        const minContrast = colorNames.reduce((acc, colorName) => {
                          const hexColor = colorScales[colorName][step]
                          return hexColor ? Math.min(acc, getContrastRatio(hexColor)) : acc
                        }, Infinity)

                        const contrastValue = truncateDecimals(minContrast, 1)
                        const style = {
                          color: minContrast >= 4.5 ? colorScales.greeen[500] :
                            minContrast >= 3 ? colorScales.orange[500] :
                              colorScales.red[500]
                        }

                        return <span style={style}>{contrastValue}</span>
                      })()}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              {colorNames.map((colorName) => (
                <td key={`${colorName}-copy`} className="p-0 relative">
                  <button
                    onClick={() => copyColumnToClipboard(colorName)}
                    className="w-full p-3 text-sm hover:bg-gray-200 transition-colors"
                  >
                    {copied === `${colorName}-column` ? "Copied!" : "Copy"}
                  </button>
                </td>
              ))}
              <td className="p-0 relative w-20"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
