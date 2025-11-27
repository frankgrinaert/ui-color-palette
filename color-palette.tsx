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
  'blue': {
    'pantone': '#0077C8',
    'wfp': '#007DBC',
  },
  'navy': {
    'pantone': '#002E5D',
    'wfp': '#002F5A',
  },
  'aqua': {
    'pantone': '#00AEC7',
    'wfp': '#008EB2',
  },
  'darkgreen': {
    "pantone": '#00664F',
    "wfp": '#005D45',
  },
  'green': {
    'pantone': '#009F4D',
    'wfp': '#009F4D',
  },
  'ivory': {
    'pantone': '#F1E6B2',
    'wfp': '#ECE1B1',
  },
  'earthybrown': {
    'pantone': '#B86125',
    'wfp': '#AA5628',
  },
  'orange': {
    'pantone': '#FC4C02',
    'wfp': '#F0512D',
  },
  'red': {
    'pantone': '#E4002B',
    'wfp': '#E3002B',
  },
  'purple': {
    'pantone': '#AD1AAC',
    'wfp': '#AC1294',
  },
  'burgundy': {
    'pantone': '#890C58',
    'wfp': '#950158',
  },
}

const leonardo = {
  "description": "Color theme tokens at lightness of 100%",
  "Background": {
    "value": "#ffffff",
    "type": "color",
    "description": "UI background color. All color contrasts evaluated and generated against this color."
  },
  "neutral100": {
    "value": "#f8f8f8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "neutral200": {
    "value": "#eeeeee",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "neutral300": {
    "value": "#dfdfdf",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "neutral400": {
    "value": "#cccccc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "neutral500": {
    "value": "#afafaf",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "neutral600": {
    "value": "#8d8d8d",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "neutral700": {
    "value": "#6f6f6f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "neutral800": {
    "value": "#525252",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "neutral900": {
    "value": "#3b3b3b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "neutral1000": {
    "value": "#272727",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "neutral1100": {
    "value": "#161616",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "red100": {
    "value": "#fff7f6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "red200": {
    "value": "#ffeae8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "red300": {
    "value": "#ffd5d0",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "red400": {
    "value": "#ffbbb5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "red500": {
    "value": "#ff8f89",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "red600": {
    "value": "#ff4a4f",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "red700": {
    "value": "#e00027",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "red800": {
    "value": "#a9000a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "red900": {
    "value": "#7c0000",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "red1000": {
    "value": "#560000",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "red1100": {
    "value": "#370000",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "orange100": {
    "value": "#fff7f4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "orange200": {
    "value": "#ffebe2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "orange300": {
    "value": "#ffd6c4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "orange400": {
    "value": "#ffbda2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "orange500": {
    "value": "#ff9169",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "orange600": {
    "value": "#fe4f09",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "orange700": {
    "value": "#d32f00",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "orange800": {
    "value": "#a21900",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "orange900": {
    "value": "#780c00",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "orange1000": {
    "value": "#540400",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "orange1100": {
    "value": "#360200",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "yorange100": {
    "value": "#fff8f4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "yorange200": {
    "value": "#ffece1",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "yorange300": {
    "value": "#ffd7c1",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "yorange400": {
    "value": "#ffbe9d",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "yorange500": {
    "value": "#ff925f",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "yorange600": {
    "value": "#f35b01",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "yorange700": {
    "value": "#c93f00",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "yorange800": {
    "value": "#9a2800",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "yorange900": {
    "value": "#721900",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "yorange1000": {
    "value": "#4f0e00",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "yorange1100": {
    "value": "#330600",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "brown100": {
    "value": "#fdf7f3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "brown200": {
    "value": "#fbece4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "brown300": {
    "value": "#f7d9c8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "brown400": {
    "value": "#f2c2a6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "brown500": {
    "value": "#e59f76",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "brown600": {
    "value": "#cd7842",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "brown700": {
    "value": "#ad581a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "brown800": {
    "value": "#863d00",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "brown900": {
    "value": "#632900",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "brown1000": {
    "value": "#441a00",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "brown1100": {
    "value": "#2b0e00",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "ivorown100": {
    "value": "#fdfae3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "ivorown200": {
    "value": "#f7f0c6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "ivorown300": {
    "value": "#eedfa6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "ivorown400": {
    "value": "#e9c984",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "ivorown500": {
    "value": "#e1a255",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "ivorown600": {
    "value": "#cd7833",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "ivorown700": {
    "value": "#ad5820",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "ivorown800": {
    "value": "#843d11",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "ivorown900": {
    "value": "#622a07",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "ivorown1000": {
    "value": "#431b02",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "ivorown1100": {
    "value": "#2b0e01",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "ivory100": {
    "value": "#fffbca",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "ivory200": {
    "value": "#faefbb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "ivory300": {
    "value": "#eadfac",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "ivory400": {
    "value": "#d7cd9c",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "ivory500": {
    "value": "#b9af83",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "ivory600": {
    "value": "#968e69",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "ivory700": {
    "value": "#766f51",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "ivory800": {
    "value": "#57523b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "ivory900": {
    "value": "#3e3a29",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "ivory1000": {
    "value": "#29271a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "ivory1100": {
    "value": "#18160e",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "green100": {
    "value": "#f3faf4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "green200": {
    "value": "#e1f4e5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "green300": {
    "value": "#c0e9c8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "green400": {
    "value": "#97dba7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "green500": {
    "value": "#5cc37a",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "green600": {
    "value": "#0ea250",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "green700": {
    "value": "#008136",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "green800": {
    "value": "#005f22",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "green900": {
    "value": "#004415",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "green1000": {
    "value": "#002e0b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "green1100": {
    "value": "#001b04",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "greeen100": {
    "value": "#f3faf4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "greeen200": {
    "value": "#e4f3e7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "greeen300": {
    "value": "#c6e7cc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "greeen400": {
    "value": "#a5d8af",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "greeen500": {
    "value": "#6ec080",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "greeen600": {
    "value": "#19a251",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "greeen700": {
    "value": "#007f56",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "greeen800": {
    "value": "#035d49",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "greeen900": {
    "value": "#044334",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "greeen1000": {
    "value": "#032c22",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "greeen1100": {
    "value": "#011a13",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "darkgreen100": {
    "value": "#f7faf9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "darkgreen200": {
    "value": "#e8f0ed",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "darkgreen300": {
    "value": "#d2e3dc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "darkgreen400": {
    "value": "#b6d2c7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "darkgreen500": {
    "value": "#8cb8a8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "darkgreen600": {
    "value": "#5c9984",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "darkgreen700": {
    "value": "#2e7c65",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "darkgreen800": {
    "value": "#005e47",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "darkgreen900": {
    "value": "#004331",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "darkgreen1000": {
    "value": "#002d1f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "darkgreen1100": {
    "value": "#001b11",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "aqua100": {
    "value": "#f2fbfd",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "aqua200": {
    "value": "#d6f3fa",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "aqua300": {
    "value": "#aee9f6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "aqua400": {
    "value": "#7cd9ed",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "aqua500": {
    "value": "#36bed7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "aqua600": {
    "value": "#009bb3",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "aqua700": {
    "value": "#007a8f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "aqua800": {
    "value": "#005a6b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "aqua900": {
    "value": "#00404d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "aqua1000": {
    "value": "#002b35",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "aqua1100": {
    "value": "#001920",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "blue100": {
    "value": "#f4f9fe",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "blue200": {
    "value": "#e3f0fd",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "blue300": {
    "value": "#c8e1fc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "blue400": {
    "value": "#a6d0fa",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "blue500": {
    "value": "#74b4f2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "blue600": {
    "value": "#3a92e0",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "blue700": {
    "value": "#0072c3",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "blue800": {
    "value": "#005398",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "blue900": {
    "value": "#003a72",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "blue1000": {
    "value": "#00264f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "blue1100": {
    "value": "#001633",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "bluvy100": {
    "value": "#f7fafe",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "bluvy200": {
    "value": "#e6f0fb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "bluvy300": {
    "value": "#cde2f8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "bluvy400": {
    "value": "#add0f2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "bluvy500": {
    "value": "#7cb3e9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "bluvy600": {
    "value": "#4292d9",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "bluvy700": {
    "value": "#0072c4",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "bluvy800": {
    "value": "#00529d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "bluvy900": {
    "value": "#003a73",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "bluvy1000": {
    "value": "#002650",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "bluvy1100": {
    "value": "#001634",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "navy100": {
    "value": "#f8f9fb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "navy200": {
    "value": "#ebeff4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "navy300": {
    "value": "#d8e0e9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "navy400": {
    "value": "#c0cddc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "navy500": {
    "value": "#9db1c9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "navy600": {
    "value": "#758fb0",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "navy700": {
    "value": "#517199",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "navy800": {
    "value": "#2d5380",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "navy900": {
    "value": "#103b6a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "navy1000": {
    "value": "#002553",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "navy1100": {
    "value": "#00143c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "purple100": {
    "value": "#fdf8fd",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "purple200": {
    "value": "#fbe9f9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "purple300": {
    "value": "#f7d4f4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "purple400": {
    "value": "#f2bbee",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "purple500": {
    "value": "#e791e3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "purple600": {
    "value": "#d360d0",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "purple700": {
    "value": "#ba30b8",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "purple800": {
    "value": "#940094",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "purple900": {
    "value": "#6c006d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "purple1000": {
    "value": "#4a004b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "purple1100": {
    "value": "#2f0030",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "purpundy100": {
    "value": "#fdf8fc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "purpundy200": {
    "value": "#f9ebf8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "purpundy300": {
    "value": "#f3d6f1",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "purpundy400": {
    "value": "#ebbfe9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "purpundy500": {
    "value": "#dc97dc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "purpundy600": {
    "value": "#c969cb",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "purpundy700": {
    "value": "#b636b7",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "purpundy800": {
    "value": "#9e0071",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "purpundy900": {
    "value": "#730947",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "purpundy1000": {
    "value": "#4f042f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "purpundy1100": {
    "value": "#32021c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "burgundy100": {
    "value": "#fcf8fa",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.05:1 against background #ffffff"
  },
  "burgundy200": {
    "value": "#f8ecf1",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.15:1 against background #ffffff"
  },
  "burgundy300": {
    "value": "#f2d8e3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.33:1 against background #ffffff"
  },
  "burgundy400": {
    "value": "#ebc1d3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "burgundy500": {
    "value": "#dc9cb9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "burgundy600": {
    "value": "#c8729b",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "burgundy700": {
    "value": "#b14b7f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "burgundy800": {
    "value": "#962063",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "burgundy900": {
    "value": "#750049",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "burgundy1000": {
    "value": "#52002f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "burgundy1100": {
    "value": "#34001c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  }
}

const originalColorScales: ColorScales = {
  bluvy: {
    0: brand.blue.wfp,
    1: brand.blue.pantone,
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
    0: brand.blue.wfp,
    1: brand.blue.pantone,
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
    0: brand.navy.wfp,
    1: brand.navy.pantone,
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
    0: brand.green.wfp,
    1: brand.green.pantone,
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
    0: brand.green.wfp,
    1: brand.green.pantone,
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
    0: brand.darkgreen.wfp,
    1: brand.darkgreen.pantone,
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
    0: brand.orange.wfp,
    1: brand.orange.pantone,
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
  yorange: {
    0: brand.orange.wfp,
    1: brand.orange.pantone,
    50: leonardo.yorange100.value,
    100: leonardo.yorange200.value,
    200: leonardo.yorange300.value,
    300: leonardo.yorange400.value,
    400: leonardo.yorange500.value,
    500: leonardo.yorange600.value,
    600: leonardo.yorange700.value,
    700: leonardo.yorange800.value,
    800: leonardo.yorange900.value,
    900: leonardo.yorange1000.value,
    950: leonardo.yorange1100.value,
  },
  red: {
    0: brand.red.wfp,
    1: brand.red.pantone,
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
    0: brand.aqua.wfp,
    1: brand.aqua.pantone,
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
    0: brand.purple.wfp,
    1: brand.purple.pantone,
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
    0: brand.purple.wfp,
    1: brand.purple.pantone,
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
    0: brand.burgundy.wfp,
    1: brand.burgundy.pantone,
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
    0: brand.ivory.wfp,
    1: brand.ivory.pantone,
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
    0: brand.earthybrown.wfp,
    1: brand.earthybrown.pantone,
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
    0: brand.ivory.wfp,
    1: brand.ivory.pantone,
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
    1: "white",
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
    // "navy",
    "bluvy",
    // "blue",
    "aqua",
    // "green",
    "greeen",
    // "darkgreen",
    "ivory",
    // "ivorown",
    "brown",
    "yorange",
    // "orange",
    "red",
    // "purple",
    "purpundy",
    // "burgundy",
    "neutral"
  ]
  const steps = [
    // 0,
    // 1,
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
