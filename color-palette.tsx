"use client"

import { useState } from "react"
import chroma from "chroma-js"
import {
  Theme as LeonardoTheme,
  Color as LeonardoColor,
  CssColor,
  BackgroundColor,
} from "@adobe/leonardo-contrast-colors"

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

// Input colors for the color palette.
const brand = {
  // WFP HEX codes
  blue: "#007DBC",
  navy: "#002F5A",
  aqua: "#008EB2",
  darkgreen: "#005D45",
  green: "#03924A",
  ivory: "#ECE1B1",
  earthybrown: "#AA5628",
  orange: "#F0512D",
  "orange-adjusted": chroma("#F0512D").set("oklch.h", "+35").hex(),
  red: "#E3002B",
  purple: "#AC1294",
  burgundy: "#950158",
  black: "#000000",

  // ShareTheMeal
  yellow: "#FEBB00" /* from ShareTheMeal */,
}

// const brand = { // WFP Pantone codes
//   'blue': '#0077C8',
//   'navy': '#002E5D',
//   'aqua': '#00AEC7',
//   'darkgreen': '#00664F',
//   'green': '#009F4D',
//   'ivory': '#F1E6B2',
//   'earthybrown': '#B86125',
//   'orange': '#FC4C02',
//   'orange-adjusted': chroma('#FC4C02').set('oklch.h', '+25').hex(),
//   'red': '#E4002B',
//   'purple': '#AD1AAC',
//   'burgundy': '#890C58',
//   'black': '#000000'
// }

// Leonardo configuration and dynamic palette generation

// UI background color. All color contrasts evaluated and generated against this color
const LEONARDO_BACKGROUND = "#ffffff"

// Define the color steps to be used in the color palette
const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

// Define the target contrast ratios for each of the color steps
const CONTRAST_RATIOS = [1.05, 1.13, 1.3, 1.6, 2.2, 3.3, 4.8, 7.8, 11.3, 15, 18] as const

// Helper function to get brand colors
function getBrandColor(name: keyof typeof brand): CssColor {
  return brand[name] as CssColor
}

// Type definitions for color configuration
type ColorConfig = {
  name: string
  keys: string[]
  colorspace: "CAM02" | "CAM02p" | "LCH" | "LAB" | "HSL" | "HSLuv" | "HSV" | "RGB" | "OKLAB" | "OKLCH"
  smooth: boolean
}

// Input color configurations for the Leonardo palette.
// name: name of the color scale
// keys: array of input colors (from the brand palette)
// colorspace: colorspace to use to generate the color scale (options: CAM02, CAM02p, LCH, LAB, HSL, HSLuv, HSV, RGB, OKLAB, OKLCH)
// smooth: boolean flag to indicate if the color scale should be smoothed (true for smooth, false for sharp)
// prettier-ignore
const colorConfigs: ColorConfig[] = [
  { name: "neutral", keys: [getBrandColor("black")], colorspace: "OKLCH", smooth: true },
  // { name: "navy", keys: [getBrandColor("navy")], colorspace: "RGB", smooth: true },
  { name: "blue", keys: [getBrandColor("blue"), getBrandColor("navy")], colorspace: "OKLCH", smooth: true },
  // { name: "blue", keys: [getBrandColor("blue")], colorspace: "RGB", smooth: true },
  { name: "aqua", keys: [getBrandColor("aqua")], colorspace: "OKLCH", smooth: true },
  // { name: "green", keys: [getBrandColor("green")], colorspace: "OKLCH", smooth: true },
  { name: "green", keys: [getBrandColor("green"), getBrandColor("darkgreen")], colorspace: "OKLCH", smooth: true },
  // { name: "darkgreen", keys: [getBrandColor("darkgreen")], colorspace: "OKLCH", smooth: true },
  { name: "ivory", keys: [getBrandColor("ivory")], colorspace: "OKLCH", smooth: false },
  // { name: "yellow", keys: [getBrandColor("yellow")], colorspace: "OKLCH", smooth: false },
  { name: "brown", keys: [getBrandColor("earthybrown")], colorspace: "OKLCH", smooth: true },
  { name: "orange", keys: [getBrandColor("orange-adjusted")], colorspace: "OKLCH", smooth: true },
  // { name: "orange", keys: [getBrandColor("orange")], colorspace: "OKLCH", smooth: true },
  { name: "red", keys: [getBrandColor("red")], colorspace: "OKLCH", smooth: true },
  // { name: "purple", keys: [getBrandColor("purple")], colorspace: "OKLCH", smooth: true },
  { name: "purple", keys: [getBrandColor("purple"), getBrandColor("burgundy")], colorspace: "OKLCH", smooth: true },
  // { name: "burgundy", keys: [getBrandColor("burgundy")], colorspace: "OKLCH", smooth: true },
]

type LeonardoToken = {
  value: string
  type: "color"
  description: string
}

type LeonardoTokens = {
  description: string
  Background: LeonardoToken
  [name: string]: any
}

function createLeonardoPalette(): LeonardoTokens {
  const colors = colorConfigs.map(
    ({ name, keys, colorspace, smooth }) =>
      new LeonardoColor({
        name,
        colorKeys: keys as CssColor[],
        ratios: [...CONTRAST_RATIOS],
        colorspace,
        smooth,
      })
  )

  const theme = new LeonardoTheme({
    colors,
    backgroundColor: LEONARDO_BACKGROUND as unknown as BackgroundColor,
    lightness: 100,
    contrast: 1,
    saturation: 100,
    output: "HEX",
    formula: "wcag2",
  })

  const tokens: LeonardoTokens = {
    description: "Color theme tokens at lightness of 100%",
    Background: {
      value: LEONARDO_BACKGROUND,
      type: "color",
      description: "UI background color. All color contrasts evaluated and generated against this color.",
    },
  }

  ;(theme.contrastColors || []).forEach((group: any) => {
    if (!group || !Array.isArray(group.values)) return

    group.values.forEach((swatch: any) => {
      if (!swatch || !swatch.name || !swatch.value) return

      tokens[swatch.name] = {
        value: swatch.value,
        type: "color",
        description: `WCAG 2.x (relative luminance) contrast is ${truncateDecimals(
          swatch.contrast,
          2
        )}:1 against background ${LEONARDO_BACKGROUND}`,
      }
    })
  })

  return tokens
}

const leonardo = createLeonardoPalette()

// Generate color scales dynamically based on steps and Leonardo tokens
function generateColorScales(leonardoTokens: LeonardoTokens, steps: readonly number[]): ColorScales {
  const scales: ColorScales = {}

  colorConfigs.forEach((config) => {
    const colorName = config.name
    const colorScale: ColorStep = {}

    steps.forEach((step, index) => {
      // Map step index to Leonardo token name: index 0 -> 100, index 1 -> 200, etc.
      const leonardoTokenName = `${colorName}${(index + 1) * 100}`
      const token = leonardoTokens[leonardoTokenName]

      if (token && token.value) {
        colorScale[step] = token.value
      }
    })

    scales[colorName] = colorScale
  })

  return scales
}

const colorScales = generateColorScales(leonardo, COLOR_STEPS)

export default function ColorPalette() {
  const [copied, setCopied] = useState("")
  const colorNames = colorConfigs.map((config) => config.name)
  const steps = [...COLOR_STEPS]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(""), 1000)
  }

  const copyColumnToClipboard = (colorName: string) => {
    const columnData = steps.reduce((acc, step) => {
      const hex = colorScales[colorName]?.[step]
      if (hex) {
        acc[step] = hex
      }
      return acc
    }, {} as Record<number, string>)

    const formattedOutput = `${Object.entries(columnData)
      .map(([step, hex]) => `"${colorName}-${step}": "${hex}",`)
      .join("\n")}`

    navigator.clipboard.writeText(formattedOutput)
    setCopied(`${colorName}-column`)
    setTimeout(() => setCopied(""), 1000)
  }

  const copyAllColumnsToClipboard = () => {
    const allData = colorNames.map((colorName) => {
      return steps
        .map((step) => {
          const hex = colorScales[colorName]?.[step]
          return hex ? `"${colorName}-${step}": "${hex}",` : null
        })
        .filter((line): line is string => line !== null)
        .join("\n")
    })

    const formattedOutput = allData.join("\n\n")
    navigator.clipboard.writeText(formattedOutput)
    setCopied("all-columns")
    setTimeout(() => setCopied(""), 1000)
  }

  return (
    <div className="font-mono">
      <div className="w-full overflow-x-auto p-4">
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
                        <div
                          className={
                            useWhiteText
                              ? "text-white text-xs font-semibold mb-1"
                              : "text-black text-xs font-semibold mb-1"
                          }
                        >
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
                <td className="p-0 relative w-12">
                  <div className="w-full flex flex-col justify-between p-3">
                    <div className="text-sm">
                      {(() => {
                        const minContrast = colorNames.reduce((acc, colorName) => {
                          const hexColor = colorScales[colorName][step]
                          return hexColor ? Math.min(acc, getContrastRatio(hexColor)) : acc
                        }, Infinity)

                        const contrastValue = truncateDecimals(minContrast, 1)
                        const style = {
                          color: minContrast >= 4.5 ? "green" : minContrast >= 3 ? "darkorange" : "red",
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
            <tr>
              <td colSpan={colorNames.length} className="p-0 relative">
                <button
                  onClick={copyAllColumnsToClipboard}
                  className="w-full p-3 text-sm hover:bg-gray-200 transition-colors font-semibold"
                >
                  {copied === "all-columns" ? "Copied!" : "Copy all"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
