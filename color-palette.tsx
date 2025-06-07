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
  'aquamarine': '#00AEC7',
  'darkgreen': '#00664F',
  'green': '#009F4D',
  'ivory': '#F1E6B2',
  'earthybrown': '#B86125',
  'orange': '#FC4C02',
  'red': '#E4002B',
  'purple': '#AD1AAC',
  'burgundy': '#890C58',
}

const carbon = {
  yellow: {
    10: "#fcf4d6",
    20: "#fddc69",
    30: "#f1c21b",
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
    30: "#ffb784",
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
    30: "#ffb3b8",
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
    30: "#ffafd2",
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
    30: "#d4bbff",
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
    30: "#3ddbd9",
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
    30: "#6fdc8c",
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
    30: "#c6c6c6",
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
    30: "#cac5c4",
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
    95: chroma.mix(carbon.cyan[10], carbon.teal[10], 0.0).hex(),
    90: chroma.mix(carbon.cyan[20], carbon.teal[20], 0.0).hex(),
    80: chroma.mix(carbon.cyan[30], carbon.teal[30], 0.0).hex(),
    70: chroma.mix(carbon.cyan[40], carbon.teal[40], 0.0).hex(),
    60: chroma.mix(carbon.cyan[50], carbon.teal[50], 0.0).hex(),
    50: chroma.mix(carbon.cyan[60], carbon.teal[60], 0.0).hex(),
    40: chroma.mix(carbon.cyan[70], carbon.blue[70], 0.0).hex(),
    30: chroma.mix(carbon.cyan[80], carbon.blue[80], 0.05).hex(),
    20: chroma.mix(carbon.cyan[90], carbon.blue[90], 0.1).hex(),
    10: chroma.mix(carbon.cyan[100], carbon.blue[100], 0.1).hex(),
  },
  blue: {
    0: brand.wfp,
    95: chroma.mix(carbon.cyan[10], carbon.teal[10], 0.0).hex(),
    90: chroma.mix(carbon.cyan[20], carbon.teal[20], 0.0).hex(),
    80: chroma.mix(carbon.cyan[30], carbon.teal[30], 0.0).hex(),
    70: chroma.mix(carbon.cyan[40], carbon.teal[40], 0.0).hex(),
    60: chroma.mix(carbon.cyan[50], carbon.teal[50], 0.0).hex(),
    50: chroma.mix(carbon.cyan[60], carbon.teal[60], 0.0).hex(),
    40: chroma.mix(carbon.cyan[70], carbon.teal[70], 0.0).hex(),
    30: chroma.mix(carbon.cyan[80], carbon.teal[80], 0.0).hex(),
    20: chroma.mix(carbon.cyan[90], carbon.teal[90], 0.0).hex(),
    10: chroma.mix(carbon.cyan[100], carbon.teal[100], 0.0).hex(),
  },
  navy: {
    0: brand.navy,
    95: chroma.mix(carbon.cyan[10], carbon.blue[10], 0.1).hex(),
    90: chroma.mix(carbon.cyan[20], carbon.blue[20], 0.1).hex(),
    80: chroma.mix(carbon.cyan[30], carbon.blue[30], 0.1).hex(),
    70: chroma.mix(carbon.cyan[40], carbon.blue[40], 0.1).hex(),
    60: chroma.mix(carbon.cyan[50], carbon.blue[50], 0.1).hex(),
    50: chroma.mix(carbon.cyan[60], carbon.blue[60], 0.1).hex(),
    40: chroma.mix(carbon.cyan[70], carbon.blue[70], 0.1).hex(),
    30: chroma.mix(carbon.cyan[80], carbon.blue[80], 0.1).hex(),
    20: chroma.mix(carbon.cyan[90], carbon.blue[90], 0.1).hex(),
    10: chroma.mix(carbon.cyan[100], carbon.blue[100], 0.1).hex(),
  },
  greeen: {
    0: brand.green,
    95: chroma.mix(carbon.green[10], carbon.teal[10], 0.2).hex(),
    90: chroma.mix(carbon.green[20], carbon.teal[20], 0.2).hex(),
    80: chroma.mix(carbon.green[30], carbon.teal[30], 0.2).hex(),
    70: chroma.mix(carbon.green[40], carbon.teal[40], 0.2).hex(),
    60: chroma.mix(carbon.green[50], carbon.teal[50], 0.2).hex(),
    50: chroma.mix(carbon.green[60], carbon.teal[60], 0.3).hex(),
    40: chroma.mix(carbon.green[70], carbon.teal[70], 0.4).hex(),
    30: chroma.mix(carbon.green[80], carbon.teal[80], 0.5).hex(),
    20: chroma.mix(carbon.green[90], carbon.teal[90], 0.5).hex(),
    10: chroma.mix(carbon.green[100], carbon.teal[100], 0.5).hex(),
  },
  green: {
    0: brand.green,
    95: chroma.mix(carbon.green[10], carbon.teal[10], 0.2).hex(),
    90: chroma.mix(carbon.green[20], carbon.teal[20], 0.2).hex(),
    80: chroma.mix(carbon.green[30], carbon.teal[30], 0.2).hex(),
    70: chroma.mix(carbon.green[40], carbon.teal[40], 0.2).hex(),
    60: chroma.mix(carbon.green[50], carbon.teal[50], 0.2).hex(),
    50: chroma.mix(carbon.green[60], carbon.teal[60], 0.2).hex(),
    40: chroma.mix(carbon.green[70], carbon.teal[70], 0.2).hex(),
    30: chroma.mix(carbon.green[80], carbon.teal[80], 0.2).hex(),
    20: chroma.mix(carbon.green[90], carbon.teal[90], 0.2).hex(),
    10: chroma.mix(carbon.green[100], carbon.teal[100], 0.2).hex(),
  },
  darkgreen: {
    0: brand.darkgreen,
    95: chroma.mix(carbon.green[10], carbon.teal[10], 0.5).hex(),
    90: chroma.mix(carbon.green[20], carbon.teal[20], 0.5).hex(),
    80: chroma.mix(carbon.green[30], carbon.teal[30], 0.5).hex(),
    70: chroma.mix(carbon.green[40], carbon.teal[40], 0.5).hex(),
    60: chroma.mix(carbon.green[50], carbon.teal[50], 0.5).hex(),
    50: chroma.mix(carbon.green[60], carbon.teal[60], 0.5).hex(),
    40: chroma.mix(carbon.green[70], carbon.teal[70], 0.5).hex(),
    30: chroma.mix(carbon.green[80], carbon.teal[80], 0.5).hex(),
    20: chroma.mix(carbon.green[90], carbon.teal[90], 0.5).hex(),
    10: chroma.mix(carbon.green[100], carbon.teal[100], 0.5).hex(),
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
    95: chroma.mix(carbon.orange[10], carbon.yellow[10], 0.0).hex(),
    90: chroma.mix(carbon.orange[20], carbon.yellow[20], 0.1).hex(),
    80: chroma.mix(carbon.orange[30], carbon.red[30], 0.2).hex(),
    70: chroma.mix(carbon.orange[40], carbon.red[40], 0.2).hex(),
    60: chroma.mix(carbon.orange[50], carbon.red[50], 0.2).hex(),
    50: chroma.mix(carbon.orange[60], carbon.red[60], 0.2).hex(),
    40: chroma.mix(carbon.orange[70], carbon.red[70], 0.2).hex(),
    30: chroma.mix(carbon.orange[80], carbon.red[80], 0.2).hex(),
    20: chroma.mix(carbon.orange[90], carbon.red[90], 0.2).hex(),
    10: chroma.mix(carbon.orange[100], carbon.red[100], 0.2).hex(),
  },
  red: {
    0: brand.red,
    95: chroma.mix(carbon.red[10], carbon.magenta[10], 0.25).hex(),
    90: chroma.mix(carbon.red[20], carbon.magenta[20], 0.25).hex(),
    80: chroma.mix(carbon.red[30], carbon.magenta[30], 0.25).hex(),
    70: chroma.mix(carbon.red[40], carbon.magenta[40], 0.25).hex(),
    60: chroma.mix(carbon.red[50], carbon.magenta[50], 0.25).hex(),
    50: chroma.mix(carbon.red[60], carbon.magenta[60], 0.25).hex(),
    40: chroma.mix(carbon.red[70], carbon.magenta[70], 0.25).hex(),
    30: chroma.mix(carbon.red[80], carbon.magenta[80], 0.25).hex(),
    20: chroma.mix(carbon.red[90], carbon.magenta[90], 0.25).hex(),
    10: chroma.mix(carbon.red[100], carbon.magenta[100], 0.25).hex(),
  },
  aqua: {
    0: brand.aquamarine,
    95: chroma.mix(carbon.cyan[10], carbon.teal[10], 0.75).hex(),
    90: chroma.mix(carbon.cyan[20], carbon.teal[20], 0.75).hex(),
    80: chroma.mix(carbon.cyan[30], carbon.teal[30], 0.75).hex(),
    70: chroma.mix(carbon.cyan[40], carbon.teal[40], 0.75).hex(),
    60: chroma.mix(carbon.cyan[50], carbon.teal[50], 0.75).hex(),
    50: chroma.mix(carbon.cyan[60], carbon.teal[60], 0.75).hex(),
    40: chroma.mix(carbon.cyan[70], carbon.teal[70], 0.75).hex(),
    30: chroma.mix(carbon.cyan[80], carbon.teal[80], 0.75).hex(),
    20: chroma.mix(carbon.cyan[90], carbon.teal[90], 0.75).hex(),
    10: chroma.mix(carbon.cyan[100], carbon.teal[100], 0.75).hex(),
  },
  purpundy: {
    0: brand.purple,
    95: chroma.mix(carbon.magenta[10], carbon.purple[10], 0.35).hex(),
    90: chroma.mix(carbon.magenta[20], carbon.purple[20], 0.35).hex(),
    80: chroma.mix(carbon.magenta[30], carbon.purple[30], 0.35).hex(),
    70: chroma.mix(carbon.magenta[40], carbon.purple[40], 0.35).hex(),
    60: chroma.mix(carbon.magenta[50], carbon.purple[50], 0.35).hex(),
    50: chroma.mix(carbon.magenta[60], carbon.purple[60], 0.35).hex(),
    40: chroma.mix(carbon.magenta[70], carbon.purple[70], 0.25).hex(),
    30: chroma.mix(carbon.magenta[80], carbon.purple[80], 0.15).hex(),
    20: chroma.mix(carbon.magenta[90], carbon.purple[90], 0.15).hex(),
    10: chroma.mix(carbon.magenta[100], carbon.purple[100], 0.15).hex(),
  },
  purple: {
    0: brand.purple,
    95: chroma.mix(carbon.magenta[10], carbon.purple[10], 0.35).hex(),
    90: chroma.mix(carbon.magenta[20], carbon.purple[20], 0.35).hex(),
    80: chroma.mix(carbon.magenta[30], carbon.purple[30], 0.35).hex(),
    70: chroma.mix(carbon.magenta[40], carbon.purple[40], 0.35).hex(),
    60: chroma.mix(carbon.magenta[50], carbon.purple[50], 0.35).hex(),
    50: chroma.mix(carbon.magenta[60], carbon.purple[60], 0.35).hex(),
    40: chroma.mix(carbon.magenta[70], carbon.purple[70], 0.35).hex(),
    30: chroma.mix(carbon.magenta[80], carbon.purple[80], 0.35).hex(),
    20: chroma.mix(carbon.magenta[90], carbon.purple[90], 0.35).hex(),
    10: chroma.mix(carbon.magenta[100], carbon.purple[100], 0.35).hex(),
  },
  burgundy: {
    0: brand.burgundy,
    95: chroma.mix(carbon.magenta[10], carbon.purple[10], 0.15).hex(),
    90: chroma.mix(carbon.magenta[20], carbon.purple[20], 0.15).hex(),
    80: chroma.mix(carbon.magenta[30], carbon.purple[30], 0.15).hex(),
    70: chroma.mix(carbon.magenta[40], carbon.purple[40], 0.15).hex(),
    60: chroma.mix(carbon.magenta[50], carbon.purple[50], 0.15).hex(),
    50: chroma.mix(carbon.magenta[60], carbon.purple[60], 0.15).hex(),
    40: chroma.mix(carbon.magenta[70], carbon.purple[70], 0.15).hex(),
    30: chroma.mix(carbon.magenta[80], carbon.purple[80], 0.15).hex(),
    20: chroma.mix(carbon.magenta[90], carbon.purple[90], 0.15).hex(),
    10: chroma.mix(carbon.magenta[100], carbon.purple[100], 0.15).hex(),
  },
  ivory: {
    0: brand.ivory,
    95: chroma.average([carbon.yellow[10], carbon.green[10], carbon.gray[10]], 'oklab', [4, 0.5, 3]).hex(),
    90: chroma.average([carbon.yellow[20], carbon.green[20], carbon.gray[20]], 'oklab', [4, 0.5, 3]).hex(),
    80: chroma.average([carbon.yellow[30], carbon.green[30], carbon.gray[30]], 'oklab', [4, 0.5, 3]).hex(),
    70: chroma.average([carbon.yellow[40], carbon.green[40], carbon.gray[40]], 'oklab', [4, 0.5, 3]).hex(),
    60: chroma.average([carbon.yellow[50], carbon.green[50], carbon.gray[50]], 'oklab', [4, 0.5, 3]).hex(),
    50: chroma.average([carbon.yellow[60], carbon.green[60], carbon.gray[60]], 'oklab', [4, 0.5, 3]).hex(),
    40: chroma.average([carbon.yellow[70], carbon.green[70], carbon.gray[70]], 'oklab', [4, 0.5, 3]).hex(),
    30: chroma.average([carbon.yellow[80], carbon.green[80], carbon.gray[80]], 'oklab', [4, 0.5, 3]).hex(),
    20: chroma.average([carbon.yellow[90], carbon.green[90], carbon.gray[90]], 'oklab', [4, 0.5, 3]).hex(),
    10: chroma.average([carbon.yellow[100], carbon.green[100], carbon.gray[100]], 'oklab', [4, 0.5, 3]).hex(),
  },
  brown: {
    0: brand.earthybrown,
    95: chroma.average([carbon.yellow[10], carbon.orange[10], carbon.gray[10]], 'oklab', [1, 8, 2]).hex(),
    90: chroma.average([carbon.yellow[20], carbon.orange[20], carbon.gray[20]], 'oklab', [1, 8, 2]).hex(),
    80: chroma.average([carbon.yellow[30], carbon.orange[30], carbon.gray[30]], 'oklab', [1, 8, 2]).hex(),
    70: chroma.average([carbon.yellow[40], carbon.orange[40], carbon.gray[40]], 'oklab', [1, 8, 2]).hex(),
    60: chroma.average([carbon.yellow[50], carbon.orange[50], carbon.gray[50]], 'oklab', [1, 8, 2]).hex(),
    50: chroma.average([carbon.yellow[60], carbon.orange[60], carbon.gray[60]], 'oklab', [1, 8, 2]).hex(),
    40: chroma.average([carbon.yellow[70], carbon.orange[70], carbon.gray[70]], 'oklab', [1, 8, 2]).hex(),
    30: chroma.average([carbon.yellow[80], carbon.orange[80], carbon.gray[80]], 'oklab', [1, 8, 2]).hex(),
    20: chroma.average([carbon.yellow[90], carbon.orange[90], carbon.gray[90]], 'oklab', [1, 8, 2]).hex(),
    10: chroma.average([carbon.yellow[100], carbon.orange[100], carbon.gray[100]], 'oklab', [1, 8, 2]).hex(),
  },
  ivorown: {
    0: brand.ivory,
    95: chroma.average([carbon.yellow[10], carbon.green[10], carbon.gray[10]], 'oklab', [4, 0.0, 3]).hex(),
    90: chroma.average([carbon.yellow[20], carbon.green[20], carbon.gray[20]], 'oklab', [4, 0.0, 3]).hex(),
    80: chroma.average([carbon.yellow[30], carbon.orange[30], carbon.gray[30]], 'oklab', [3, 1.5, 2.5]).hex(),
    70: chroma.average([carbon.yellow[40], carbon.orange[40], carbon.gray[40]], 'oklab', [2, 3, 2.5]).hex(),
    60: chroma.average([carbon.yellow[50], carbon.orange[50], carbon.gray[50]], 'oklab', [1, 5, 2.5]).hex(),
    50: chroma.average([carbon.yellow[60], carbon.orange[60], carbon.gray[60]], 'oklab', [1, 7, 2]).hex(),
    40: chroma.average([carbon.yellow[70], carbon.orange[70], carbon.gray[70]], 'oklab', [1, 8, 2]).hex(),
    30: chroma.average([carbon.yellow[80], carbon.orange[80], carbon.gray[80]], 'oklab', [1, 8, 2]).hex(),
    20: chroma.average([carbon.yellow[90], carbon.orange[90], carbon.gray[90]], 'oklab', [1, 8, 2]).hex(),
    10: chroma.average([carbon.yellow[100], carbon.orange[100], carbon.gray[100]], 'oklab', [1, 8, 2]).hex(),
  },
  neutral: {
    0: "white",
    95: carbon.coolGray[10],
    90: carbon.coolGray[20],
    80: carbon.coolGray[30],
    70: carbon.coolGray[40],
    60: carbon.coolGray[50],
    50: carbon.coolGray[60],
    40: carbon.coolGray[70],
    30: carbon.coolGray[80],
    20: carbon.coolGray[90],
    10: carbon.coolGray[100],
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
  const steps = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10]

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
