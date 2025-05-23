"use client"

import { useState } from "react"

// Utility functions for color calculations
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function hexToHsl(hex: string): string {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)
  return `hsl(${h}, ${s}%, ${l}%)`
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function getContrastRatio(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  const luminance = getRelativeLuminance(r, g, b)
  const whiteLuminance = 1 // White has luminance of 1
  return (whiteLuminance + 0.05) / (luminance + 0.05)
}

function truncateToTwoDecimals(num: number): string {
  return (Math.floor(num * 100) / 100).toString()
}

// Color scales with only hex values
const colorScales = {
  wfp: {
    10: "#edf5fc",
    20: "#d0e2f3",
    30: "#a6c8e6",
    40: "#78aed7",
    50: "#4b94c9",
    60: "#007dbc",
    70: "#00629a",
    80: "#004976",
    90: "#003252",
    100: "#001b2e",
  },
  navy: {
    10: "#e6e8f0",
    20: "#c8cce0",
    30: "#a6acd0",
    40: "#7f89b8",
    50: "#5a67a0",
    60: "#3a4787",
    70: "#232d70",
    80: "#121c59",
    90: "#060f42",
    100: "#000f59",
  },
  aqua: {
    10: "#e5f6fa",
    20: "#c2e8f2",
    30: "#93d7e6",
    40: "#5ec3d7",
    50: "#2aaec7",
    60: "#008eb2",
    70: "#00718f",
    80: "#00546c",
    90: "#003949",
    100: "#001f27",
  },
  darkgreen: {
    10: "#e6f2ee",
    20: "#c4e0d7",
    30: "#9ccbbc",
    40: "#6fb59e",
    50: "#459e81",
    60: "#1c8764",
    70: "#006c4f",
    80: "#00513b",
    90: "#003728",
    100: "#001d15",
  },
  green: {
    10: "#e6f7ed",
    20: "#c3ebd4",
    30: "#96dcb3",
    40: "#64ca8e",
    50: "#35b76a",
    60: "#03924a",
    70: "#00743a",
    80: "#00562b",
    90: "#00391d",
    100: "#001f10",
  },
  ivory: {
    10: "#fdfbf4",
    20: "#f9f5e4",
    30: "#f4ecd0",
    40: "#ece1b1",
    50: "#e0d08a",
    60: "#d0bc63",
    70: "#b39b3e",
    80: "#8c7624",
    90: "#635016",
    100: "#3a2c09",
  },
  brown: {
    10: "#f9efe9",
    20: "#f0d9cc",
    30: "#e4bda7",
    40: "#d59e7d",
    50: "#c47e53",
    60: "#aa5628",
    70: "#8a4520",
    80: "#693418",
    90: "#482310",
    100: "#271308",
  },
  orange: {
    10: "#fef0e9",
    20: "#fddacb",
    30: "#fcbda3",
    40: "#fa9c75",
    50: "#f87947",
    60: "#f24c02",
    70: "#c23c01",
    80: "#922d01",
    90: "#621e01",
    100: "#331000",
  },
  red: {
    10: "#fce9ed",
    20: "#f9ccd5",
    30: "#f5a7b8",
    40: "#ef7d96",
    50: "#e85274",
    60: "#e3002b",
    70: "#b50022",
    80: "#88001a",
    90: "#5b0011",
    100: "#2f0009",
  },
  purple: {
    10: "#f7e9f5",
    20: "#eacce8",
    30: "#daa7d9",
    40: "#c87ec7",
    50: "#b654b4",
    60: "#ac1294",
    70: "#890e76",
    80: "#670a58",
    90: "#45073b",
    100: "#24031f",
  },
  burgundy: {
    10: "#f9e9f0",
    20: "#f0ccd9",
    30: "#e4a7bd",
    40: "#d57e9e",
    50: "#c4547e",
    60: "#b0285e",
    70: "#950158",
    80: "#700142",
    90: "#4b012c",
    100: "#270017",
  },
}

export default function ColorPalette() {
  const [copied, setCopied] = useState("")
  const colorNames = Object.keys(colorScales)
  const steps = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div className="font-mono">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <tbody>
            {steps.map((step) => (
              <tr key={step}>
                {colorNames.map((colorName) => {
                  const hexColor = colorScales[colorName][step]
                  const hslColor = hexToHsl(hexColor)
                  const contrastRatio = getContrastRatio(hexColor)
                  return (
                    <td
                      style={{ backgroundColor: hexColor }}
                      key={`${colorName}-${step}`}
                      className="p-0 relative cursor-pointer"
                      onClick={() => copyToClipboard(hexColor)}
                    >
                      <div className="w-full flex flex-col justify-between p-3">
                        <div className={step > 50 ? "text-white text-xs mb-1" : "text-black text-xs mb-1"}>
                          {colorName}-{step}
                        </div>
                        <div className={step > 50 ? "text-white text-xs mb-1" : "text-black text-xs mb-1"}>
                          {hexColor}
                        </div>
                        <div className={step > 50 ? "text-white text-xs mb-1" : "text-black text-xs mb-1"}>
                          {hslColor}
                        </div>
                        <div
                          className={
                            step > 50 ? "text-white text-xs font-semibold" : "text-black text-xs font-semibold"
                          }
                        >
                          {truncateToTwoDecimals(contrastRatio)}
                        </div>
                      </div>
                      {copied === hexColor && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white">Copied!</span>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
