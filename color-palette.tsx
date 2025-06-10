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

function truncateToTwoDecimals(num: number): string {
  return (Math.floor(num * 100) / 100).toString()
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
    "value": "#f5f5f5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "neutral200": {
    "value": "#e4e5e6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "neutral300": {
    "value": "#cacccd",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "neutral400": {
    "value": "#adafb2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "neutral500": {
    "value": "#8c8d90",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "neutral600": {
    "value": "#6e6f72",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "neutral700": {
    "value": "#525254",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "neutral800": {
    "value": "#3c3a3b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "neutral900": {
    "value": "#292527",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "neutral1000": {
    "value": "#181616",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "red100": {
    "value": "#fef2f0",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "red200": {
    "value": "#fcdedb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "red300": {
    "value": "#f9bdbb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "red400": {
    "value": "#f69392",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "red500": {
    "value": "#f15967",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "red600": {
    "value": "#df012b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "red700": {
    "value": "#a50e27",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "red800": {
    "value": "#731521",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "red900": {
    "value": "#4e0e16",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "red1000": {
    "value": "#2f090d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "orange100": {
    "value": "#fff2eb",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "orange200": {
    "value": "#fedfce",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "orange300": {
    "value": "#fbbfa2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "orange400": {
    "value": "#f79574",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "orange500": {
    "value": "#f15d3b",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "orange600": {
    "value": "#c54224",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "orange700": {
    "value": "#92311a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "orange800": {
    "value": "#692312",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "orange900": {
    "value": "#47170c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "orange1000": {
    "value": "#2a0e07",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "brown100": {
    "value": "#fcf3ed",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "brown200": {
    "value": "#f7e1d3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "brown300": {
    "value": "#efc4a8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "brown400": {
    "value": "#dea17e",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "brown500": {
    "value": "#c77b4d",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "brown600": {
    "value": "#ac582a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "brown700": {
    "value": "#80411a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "brown800": {
    "value": "#5b2f10",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "brown900": {
    "value": "#3d1f0b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "brown1000": {
    "value": "#241206",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "ivorown100": {
    "value": "#faf5e3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "ivorown200": {
    "value": "#f0e6be",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "ivorown300": {
    "value": "#e4c999",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "ivorown400": {
    "value": "#d8a476",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "ivorown500": {
    "value": "#c77b4d",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "ivorown600": {
    "value": "#ac582a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "ivorown700": {
    "value": "#80411a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "ivorown800": {
    "value": "#5b2f10",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "ivorown900": {
    "value": "#3d1f0b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "ivorown1000": {
    "value": "#241206",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "ivory100": {
    "value": "#faf5e3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "ivory200": {
    "value": "#f0e6be",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "ivory300": {
    "value": "#dacb9d",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "ivory400": {
    "value": "#c1ac81",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "ivory500": {
    "value": "#a58960",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "ivory600": {
    "value": "#826c4b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "ivory700": {
    "value": "#604f38",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "ivory800": {
    "value": "#443827",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "ivory900": {
    "value": "#2d251a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "ivory1000": {
    "value": "#1a160f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "green100": {
    "value": "#ecf7f0",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "green200": {
    "value": "#d4ecdc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "green300": {
    "value": "#a6d8b4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "green400": {
    "value": "#6cc084",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "green500": {
    "value": "#27a15c",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "green600": {
    "value": "#038045",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "green700": {
    "value": "#035e3a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "green800": {
    "value": "#02432c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "green900": {
    "value": "#022d1d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "green1000": {
    "value": "#011b12",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "greeen100": {
    "value": "#ecf7f0",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "greeen200": {
    "value": "#d4ecdc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "greeen300": {
    "value": "#a6d8b4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "greeen400": {
    "value": "#6cc084",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "greeen500": {
    "value": "#27a15c",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "greeen600": {
    "value": "#028048",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "greeen700": {
    "value": "#005e45",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "greeen800": {
    "value": "#00432f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "greeen900": {
    "value": "#002d1f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "greeen1000": {
    "value": "#001b12",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "darkgreen100": {
    "value": "#ebf7f3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "darkgreen200": {
    "value": "#d2ece3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "darkgreen300": {
    "value": "#a0d7c9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "darkgreen400": {
    "value": "#6fbea2",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "darkgreen500": {
    "value": "#279f81",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "darkgreen600": {
    "value": "#087e63",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "darkgreen700": {
    "value": "#005e46",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "darkgreen800": {
    "value": "#00432f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "darkgreen900": {
    "value": "#002d1f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "darkgreen1000": {
    "value": "#001b12",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "aqua100": {
    "value": "#e9f6f9",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "aqua200": {
    "value": "#ceebf1",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "aqua300": {
    "value": "#91d7e7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "aqua400": {
    "value": "#42bdd8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "aqua500": {
    "value": "#009abb",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "aqua600": {
    "value": "#007998",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "aqua700": {
    "value": "#005971",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "aqua800": {
    "value": "#004053",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "aqua900": {
    "value": "#002a37",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "aqua1000": {
    "value": "#001921",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "blue100": {
    "value": "#e8f6fe",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "blue200": {
    "value": "#caebfc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "blue300": {
    "value": "#92d5f5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "blue400": {
    "value": "#44bbe7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "blue500": {
    "value": "#0497cf",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "blue600": {
    "value": "#0075b2",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "blue700": {
    "value": "#005687",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "blue800": {
    "value": "#003d62",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "blue900": {
    "value": "#002942",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "blue1000": {
    "value": "#001927",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "bluvy100": {
    "value": "#e8f6fe",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "bluvy200": {
    "value": "#caebfc",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "bluvy300": {
    "value": "#92d5f5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "bluvy400": {
    "value": "#44bbe7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "bluvy500": {
    "value": "#0497cf",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "bluvy600": {
    "value": "#0075b2",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "bluvy700": {
    "value": "#005687",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "bluvy800": {
    "value": "#003c67",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "bluvy900": {
    "value": "#002650",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "bluvy1000": {
    "value": "#00143a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "navy100": {
    "value": "#f0f6fa",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "navy200": {
    "value": "#d8e7f3",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "navy300": {
    "value": "#b3d0e5",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "navy400": {
    "value": "#8cb4d1",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "navy500": {
    "value": "#6692b7",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "navy600": {
    "value": "#45739e",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "navy700": {
    "value": "#245482",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "navy800": {
    "value": "#0c3c67",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "navy900": {
    "value": "#002650",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "navy1000": {
    "value": "#00143a",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "purple100": {
    "value": "#fbf2f8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "purple200": {
    "value": "#f5e0ed",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "purple300": {
    "value": "#eac1db",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "purple400": {
    "value": "#da9cc6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "purple500": {
    "value": "#c372af",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "purple600": {
    "value": "#b1459c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "purple700": {
    "value": "#941481",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "purple800": {
    "value": "#67175d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "purple900": {
    "value": "#45103f",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "purple1000": {
    "value": "#2a0926",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "purpundy100": {
    "value": "#fbf2f8",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "purpundy200": {
    "value": "#f5e0ed",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "purpundy300": {
    "value": "#eac1db",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "purpundy400": {
    "value": "#da9cc6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "purpundy500": {
    "value": "#c372af",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "purpundy600": {
    "value": "#b1459c",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "purpundy700": {
    "value": "#9d076e",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "purpundy800": {
    "value": "#74014b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "purpundy900": {
    "value": "#4f003d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "purpundy1000": {
    "value": "#320028",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  },
  "burgundy100": {
    "value": "#fef1f4",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.09:1 against background #ffffff"
  },
  "burgundy200": {
    "value": "#fcdfe6",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.25:1 against background #ffffff"
  },
  "burgundy300": {
    "value": "#f9bcce",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 1.6:1 against background #ffffff"
  },
  "burgundy400": {
    "value": "#e996b7",
    "type": "color",
    "description": "Do not use for UI elements or text. WCAG 2.x (relative luminance) contrast is 2.2:1 against background #ffffff"
  },
  "burgundy500": {
    "value": "#cc709c",
    "type": "color",
    "description": "Color can be used for UI elements or large text. WCAG 2.x (relative luminance) contrast is 3.3:1 against background #ffffff"
  },
  "burgundy600": {
    "value": "#aa517d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 5:1 against background #ffffff"
  },
  "burgundy700": {
    "value": "#971f62",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 7.8:1 against background #ffffff"
  },
  "burgundy800": {
    "value": "#74014b",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 11.3:1 against background #ffffff"
  },
  "burgundy900": {
    "value": "#4f003d",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 15:1 against background #ffffff"
  },
  "burgundy1000": {
    "value": "#320028",
    "type": "color",
    "description": "Color can be used for small text. WCAG 2.x (relative luminance) contrast is 18:1 against background #ffffff"
  }
}

const carbon = {
  yellow: {
    10: "#fcf4d6",
    20: "#fddc69",
    // 30: "#f1c21b",
    30: chroma.mix("#f1c21b", "#fddc69", 0.1).hex(),
    40: "#d2a106",
    50: "#b28600",
    60: "#8e6a00",
    70: "#684e00",
    80: "#483700",
    90: "#302400",
    100: "#1c1500",
  },
  orange: {
    10: "#fff2e8",
    20: "#ffd9be",
    // 30: "#ffb784",
    30: chroma.mix("#ffb784", "#ffd9be", 0.1).hex(),
    40: "#ff832b",
    50: "#eb6200",
    60: "#ba4e00",
    70: "#8a3800",
    80: "#5e2900",
    90: "#3e1a00",
    100: "#231000",
  },
  red: {
    10: "#fff1f1",
    20: "#ffd7d9",
    // 30: "#ffb3b8",
    30: chroma.mix("#ffb3b8", "#ffd7d9", 0.1).hex(),
    40: "#ff8389",
    50: "#fa4d56",
    60: "#da1e28",
    70: "#a2191f",
    80: "#750e13",
    90: "#520408",
    100: "#2d0709",
  },
  magenta: {
    10: "#fff0f7",
    20: "#ffd6e8",
    // 30: "#ffafd2",
    30: chroma.mix("#ffafd2", "#ffd6e8", 0.1).hex(),
    40: "#ff7eb6",
    50: "#ee5396",
    60: "#d02670",
    70: "#9f1853",
    80: "#740937",
    90: "#510224",
    100: "#2a0a18",
  },
  purple: {
    10: "#f6f2ff",
    20: "#e8daff",
    // 30: "#d4bbff",
    30: chroma.mix("#d4bbff", "#e8daff", 0.1).hex(),
    40: "#be95ff",
    50: "#a56eff",
    60: "#8a3ffc",
    70: "#6929c4",
    80: "#491d8b",
    90: "#31135e",
    100: "#1c0f30",
  },
  blue: {
    10: "#edf5ff",
    20: "#d0e2ff",
    // 30: "#a6c8ff",
    30: chroma.mix("#a6c8ff", "#d0e2ff", 0.4).hex(),
    40: "#78a9ff",
    50: "#4589ff",
    60: "#0f62fe",
    70: "#0043ce",
    80: "#002d9c",
    90: "#001d6c",
    100: "#001141",
  },
  cyan: {
    10: "#e5f6ff",
    20: "#bae6ff",
    // 30: "#82cfff",
    30: chroma.mix("#82cfff", "#bae6ff", 0.1).hex(),
    40: "#33b1ff",
    50: "#1192e8",
    60: "#0072c3",
    70: "#00539a",
    80: "#003a6d",
    90: "#012749",
    100: "#061727",
  },
  teal: {
    10: "#d9fbfb",
    20: "#9ef0f0",
    // 30: "#3ddbd9",
    30: chroma.mix("#3ddbd9", "#9ef0f0", 0.1).hex(),
    40: "#08bdba",
    50: "#009d9a",
    60: "#007d79",
    70: "#005d5d",
    80: "#004144",
    90: "#022b30",
    100: "#081a1c",
  },
  green: {
    10: "#defbe6",
    20: "#a7f0ba",
    // 30: "#6fdc8c",
    30: chroma.mix("#6fdc8c", "#a7f0ba", 0.1).hex(),
    40: "#42be65",
    50: "#24a148",
    60: "#198038",
    70: "#0e6027",
    80: "#044317",
    90: "#022d0d",
    100: "#071908",
  },
  coolGray: {
    10: "#f2f4f8",
    20: "#dde1e6",
    // 30: "#c1c7cd",
    30: chroma.mix("#c1c7cd", "#dde1e6", 0.1).hex(),
    40: "#a2a9b0",
    50: "#878d96",
    60: "#697077",
    70: "#4d5358",
    80: "#343a3f",
    90: "#21272a",
    100: "#121619",
  },
  gray: {
    10: "#f4f4f4",
    20: "#e0e0e0",
    // 30: "#c6c6c6",
    30: chroma.mix("#c6c6c6", "#e0e0e0", 0.1).hex(),
    40: "#a8a8a8",
    50: "#8d8d8d",
    60: "#6f6f6f",
    70: "#525252",
    80: "#393939",
    90: "#262626",
    100: "#161616",
  },
  warmGray: {
    10: "#f7f3f2",
    20: "#e5e0df",
    // 30: "#cac5c4",
    30: chroma.mix("#cac5c4", "#e5e0df", 0.1).hex(),
    40: "#ada8a8",
    50: "#8f8b8b",
    60: "#726e6e",
    70: "#565151",
    80: "#3c3838",
    90: "#272525",
    100: "#171414",
  },
}

const originalColorScales: ColorScales = {
  bluvy: {
    0: brand.wfp,
    95: leonardo.bluvy100.value,
    90: leonardo.bluvy200.value,
    80: leonardo.bluvy300.value,
    70: leonardo.bluvy400.value,
    60: leonardo.bluvy500.value,
    50: leonardo.bluvy600.value,
    40: leonardo.bluvy700.value,
    30: leonardo.bluvy800.value,
    20: leonardo.bluvy900.value,
    10: leonardo.bluvy1000.value,
  },
  blue: {
    0: brand.wfp,
    95: leonardo.blue100.value,
    90: leonardo.blue200.value,
    80: leonardo.blue300.value,
    70: leonardo.blue400.value,
    60: leonardo.blue500.value,
    50: leonardo.blue600.value,
    40: leonardo.blue700.value,
    30: leonardo.blue800.value,
    20: leonardo.blue900.value,
    10: leonardo.blue1000.value,
  },
  navy: {
    0: brand.navy,
    95: leonardo.navy100.value,
    90: leonardo.navy200.value,
    80: leonardo.navy300.value,
    70: leonardo.navy400.value,
    60: leonardo.navy500.value,
    50: leonardo.navy600.value,
    40: leonardo.navy700.value,
    30: leonardo.navy800.value,
    20: leonardo.navy900.value,
    10: leonardo.navy1000.value,
  },
  greeen: {
    0: brand.green,
    95: leonardo.greeen100.value,
    90: leonardo.greeen200.value,
    80: leonardo.greeen300.value,
    70: leonardo.greeen400.value,
    60: leonardo.greeen500.value,
    50: leonardo.greeen600.value,
    40: leonardo.greeen700.value,
    30: leonardo.greeen800.value,
    20: leonardo.greeen900.value,
    10: leonardo.greeen1000.value,
  },
  green: {
    0: brand.green,
    95: leonardo.green100.value,
    90: leonardo.green200.value,
    80: leonardo.green300.value,
    70: leonardo.green400.value,
    60: leonardo.green500.value,
    50: leonardo.green600.value,
    40: leonardo.green700.value,
    30: leonardo.green800.value,
    20: leonardo.green900.value,
    10: leonardo.green1000.value,
  },
  darkgreen: {
    0: brand.darkgreen,
    95: leonardo.darkgreen100.value,
    90: leonardo.darkgreen200.value,
    80: leonardo.darkgreen300.value,
    70: leonardo.darkgreen400.value,
    60: leonardo.darkgreen500.value,
    50: leonardo.darkgreen600.value,
    40: leonardo.darkgreen700.value,
    30: leonardo.darkgreen800.value,
    20: leonardo.darkgreen900.value,
    10: leonardo.darkgreen1000.value,
  },
  // yellow: {
  //   10: carbon.yellow[10],
  //   20: carbon.yellow[20],
  //   30: carbon.yellow[30],
  //   40: carbon.yellow[40],
  //   50: carbon.yellow[50],
  //   50:X carbon.yellow[60],
  //   40:X carbon.yellow[70],
  //   30:X carbon.yellow[80],
  //   20:X carbon.yellow[90],
  //   10:X carbon.yellow[100],
  // },
  orange: {
    0: brand.orange,
    95: leonardo.orange100.value,
    90: leonardo.orange200.value,
    80: leonardo.orange300.value,
    70: leonardo.orange400.value,
    60: leonardo.orange500.value,
    50: leonardo.orange600.value,
    40: leonardo.orange700.value,
    30: leonardo.orange800.value,
    20: leonardo.orange900.value,
    10: leonardo.orange1000.value,
  },
  red: {
    0: brand.red,
    95: leonardo.red100.value,
    90: leonardo.red200.value,
    80: leonardo.red300.value,
    70: leonardo.red400.value,
    60: leonardo.red500.value,
    50: leonardo.red600.value,
    40: leonardo.red700.value,
    30: leonardo.red800.value,
    20: leonardo.red900.value,
    10: leonardo.red1000.value,
  },
  aqua: {
    0: brand.aqua,
    95: leonardo.aqua100.value,
    90: leonardo.aqua200.value,
    80: leonardo.aqua300.value,
    70: leonardo.aqua400.value,
    60: leonardo.aqua500.value,
    50: leonardo.aqua600.value,
    40: leonardo.aqua700.value,
    30: leonardo.aqua800.value,
    20: leonardo.aqua900.value,
    10: leonardo.aqua1000.value,
  },
  purpundy: {
    0: brand.purple,
    95: leonardo.purpundy100.value,
    90: leonardo.purpundy200.value,
    80: leonardo.purpundy300.value,
    70: leonardo.purpundy400.value,
    60: leonardo.purpundy500.value,
    50: leonardo.purpundy600.value,
    40: leonardo.purpundy700.value,
    30: leonardo.purpundy800.value,
    20: leonardo.purpundy900.value,
    10: leonardo.purpundy1000.value,
  },
  purple: {
    0: brand.purple,
    95: leonardo.purple100.value,
    90: leonardo.purple200.value,
    80: leonardo.purple300.value,
    70: leonardo.purple400.value,
    60: leonardo.purple500.value,
    50: leonardo.purple600.value,
    40: leonardo.purple700.value,
    30: leonardo.purple800.value,
    20: leonardo.purple900.value,
    10: leonardo.purple1000.value,
  },
  burgundy: {
    0: brand.burgundy,
    95: leonardo.burgundy100.value,
    90: leonardo.burgundy200.value,
    80: leonardo.burgundy300.value,
    70: leonardo.burgundy400.value,
    60: leonardo.burgundy500.value,
    50: leonardo.burgundy600.value,
    40: leonardo.burgundy700.value,
    30: leonardo.burgundy800.value,
    20: leonardo.burgundy900.value,
    10: leonardo.burgundy1000.value,
  },
  ivory: {
    0: brand.ivory,
    95: leonardo.ivory100.value,
    90: leonardo.ivory200.value,
    80: leonardo.ivory300.value,
    70: leonardo.ivory400.value,
    60: leonardo.ivory500.value,
    50: leonardo.ivory600.value,
    40: leonardo.ivory700.value,
    30: leonardo.ivory800.value,
    20: leonardo.ivory900.value,
    10: leonardo.ivory1000.value,
  },
  brown: {
    0: brand.earthybrown,
    95: leonardo.brown100.value,
    90: leonardo.brown200.value,
    80: leonardo.brown300.value,
    70: leonardo.brown400.value,
    60: leonardo.brown500.value,
    50: leonardo.brown600.value,
    40: leonardo.brown700.value,
    30: leonardo.brown800.value,
    20: leonardo.brown900.value,
    10: leonardo.brown1000.value,
  },
  ivorown: {
    0: brand.ivory,
    95: leonardo.ivorown100.value,
    90: leonardo.ivorown200.value,
    80: leonardo.ivorown300.value,
    70: leonardo.ivorown400.value,
    60: leonardo.ivorown500.value,
    50: leonardo.ivorown600.value,
    40: leonardo.ivorown700.value,
    30: leonardo.ivorown800.value,
    20: leonardo.ivorown900.value,
    10: leonardo.ivorown1000.value,
  },
  neutral: {
    0: "white",
    95: leonardo.neutral100.value,
    90: leonardo.neutral200.value,
    80: leonardo.neutral300.value,
    70: leonardo.neutral400.value,
    60: leonardo.neutral500.value,
    50: leonardo.neutral600.value,
    40: leonardo.neutral700.value,
    30: leonardo.neutral800.value,
    20: leonardo.neutral900.value,
    10: leonardo.neutral1000.value,
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
    // "ivory",
    "ivorown",
    // "brown",
    "neutral"
  ]
  const steps = [
    // 0,
    95,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10
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
                          {truncateToTwoDecimals(contrastRatio)}
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
                        const avgContrast = colorNames.reduce((sum, colorName) => {
                          const hexColor = colorScales[colorName][step]
                          return hexColor ? sum + getContrastRatio(hexColor) : sum
                        }, 0) / colorNames.length

                        const contrastValue = avgContrast.toFixed(1)
                        const style = {
                          color: avgContrast >= 4.5 ? colorScales.greeen[50] :
                            avgContrast >= 3 ? colorScales.orange[50] :
                              colorScales.red[50]
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
