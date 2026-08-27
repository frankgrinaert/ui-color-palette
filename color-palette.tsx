"use client"

import { useState } from "react"
import {
  Theme as LeonardoTheme,
  Color as LeonardoColor,
  CssColor,
  BackgroundColor,
} from "@adobe/leonardo-contrast-colors"

// ------------------------------------------------------------------------------
// Customizable palette config — edit these to generate your design system colors
// ------------------------------------------------------------------------------

// Your brand colors, used as inputs to generate the color scales
const KEYCOLORS = {
  lime: "#A6C044",
  graphite: "#444B53",
  lightGrey: "#F5F7FF",
  blue: "#143FD8",
  lightBlue: "#E5ECFF",
  orange: "#FF7B31",
  lightOrange: "#FFE5D6",
  purple: "#C530B6",
  lightPurple: "#FAEAF8",
  grey: "#E1E4E6",
  lightGrey2: "#F0F1F3",
} as const satisfies Record<string, CssColor>

// Background against which all contrast ratios are evaluated and generated
const BACKGROUND = "white" as CssColor

// Scale steps and matching target contrast ratios vs BACKGROUND
const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
const CONTRAST_RATIOS = [1.05, 1.13, 1.28, 1.6, 2.2, 3.3, 4.8, 7.5, 11.3, 15, 18] as const

type keys = keyof typeof KEYCOLORS

type ColorConfig = {
  name: string
  keys: keys[]
  colorSpace: "CAM02" | "CAM02p" | "LCH" | "LAB" | "HSL" | "HSLuv" | "HSV" | "RGB" | "OKLAB" | "OKLCH"
  smooth: boolean
}

// Configure color scales for the accessible palette.
// name: name of the color scale
// keys: array of input key colors
// colorSpace: color space to use to generate the color scale (options: CAM02, CAM02p, LCH, LAB, HSL, HSLuv, HSV, RGB, OKLAB, OKLCH)
// smooth: boolean flag to indicate if the color scale should be smoothed (true for smooth, false for sharp)
const colorConfigs: ColorConfig[] = [
  { name: "lime", keys: ["lime"], colorSpace: "OKLCH", smooth: true },
  { name: "neutral", keys: ["graphite", "lightGrey"], colorSpace: "OKLCH", smooth: true },
  { name: "blue", keys: ["blue", "lightBlue"], colorSpace: "OKLCH", smooth: true },
  { name: "orange", keys: ["orange", "lightOrange"], colorSpace: "OKLCH", smooth: true },
  { name: "purple", keys: ["purple", "lightPurple"], colorSpace: "OKLCH", smooth: true },
]

const COLOR_NAMES = colorConfigs.map((config) => config.name)

// --------------
// Implementation
// --------------

type ScaleSwatch = {
  value: string
  contrast: number
}

type ColorScales = Record<string, Partial<Record<number, ScaleSwatch>>>

type LeonardoToken = {
  value: string
  contrast?: number
  type: "color"
  description: string
}

type LeonardoTokens = {
  description: string
  Background: LeonardoToken
  [name: string]: LeonardoToken | string
}

function truncateDecimals(num: number, decimals: number): string {
  const factor = 10 ** decimals
  return (Math.floor(num * factor) / factor).toFixed(decimals)
}

function createLeonardoPalette(): LeonardoTokens {
  const colors = colorConfigs.map(({ name, keys, colorSpace, smooth }) => {
    // Avoid fresh-literal excess-property checks against older ColorBase typings.
    const options = {
      name,
      colorKeys: keys.map((key) => KEYCOLORS[key]),
      ratios: [...CONTRAST_RATIOS],
      colorSpace,
      smooth,
    }
    return new LeonardoColor(options)
  })

  const theme = new LeonardoTheme({
    colors,
    backgroundColor: BACKGROUND as unknown as BackgroundColor,
    lightness: 100,
    contrast: 1,
    saturation: 100,
    output: "HEX",
    formula: "wcag2",
  })

  const tokens: LeonardoTokens = {
    description: "Color theme tokens at lightness of 100%",
    Background: {
      value: BACKGROUND,
      type: "color",
      description: "Background color. All color contrasts evaluated against this color.",
    },
  }

  for (const group of theme.contrastColors ?? []) {
    if (!group || !("values" in group) || !Array.isArray(group.values)) continue

    for (const swatch of group.values) {
      if (!swatch?.name || !swatch?.value) continue

      tokens[swatch.name] = {
        value: swatch.value,
        contrast: swatch.contrast,
        type: "color",
        description: `WCAG 2.x (relative luminance) contrast is ${truncateDecimals(
          swatch.contrast,
          2
        )}:1 against background ${BACKGROUND}`,
      }
    }
  }

  return tokens
}

function generateColorScales(leonardoTokens: LeonardoTokens): ColorScales {
  const scales: ColorScales = {}

  for (const { name } of colorConfigs) {
    const colorScale: Partial<Record<number, ScaleSwatch>> = {}

    COLOR_STEPS.forEach((step, index) => {
      const token = leonardoTokens[`${name}${(index + 1) * 100}`]
      if (typeof token === "object" && token.value != null && token.contrast != null) {
        colorScale[step] = { value: token.value, contrast: token.contrast }
      }
    })

    scales[name] = colorScale
  }

  return scales
}

const colorScales = generateColorScales(createLeonardoPalette())

function formatScaleEntries(colorName: string): string {
  return COLOR_STEPS.map((step) => {
    const swatch = colorScales[colorName]?.[step]
    return swatch ? `"${colorName}-${step}": "${swatch.value}",` : null
  })
    .filter((line): line is string => line !== null)
    .join("\n")
}

function getMinContrastForStep(step: number): number {
  return COLOR_NAMES.reduce((min, colorName) => {
    const contrast = colorScales[colorName]?.[step]?.contrast
    return contrast != null ? Math.min(min, contrast) : min
  }, Infinity)
}

export default function ColorPalette() {
  const [copied, setCopied] = useState("")

  const copyText = (text: string, id = text) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(""), 1000)
  }

  return (
    <div className="font-mono">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <tbody>
            {COLOR_STEPS.map((step, stepIndex) => {
              const minContrast = getMinContrastForStep(step)

              return (
                <tr key={step}>
                  {COLOR_NAMES.map((colorName) => {
                    const swatch = colorScales[colorName][step]

                    if (!swatch) {
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

                    const useWhiteText = CONTRAST_RATIOS[stepIndex] >= 4.5

                    return (
                      <td
                        key={`${colorName}-${step}`}
                        style={{ backgroundColor: swatch.value }}
                        className="p-0 relative cursor-pointer"
                        onClick={() => copyText(swatch.value)}
                      >
                        <div
                          className={`w-full flex flex-col gap-0.5 p-3 text-xs ${
                            useWhiteText ? "text-white" : "text-black"
                          }`}
                        >
                          <p className="font-semibold">
                            {colorName}-{step}
                          </p>
                          <p>{swatch.value}</p>
                          <p>{truncateDecimals(swatch.contrast, 1)}</p>
                        </div>
                        {copied === swatch.value && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs">Copied!</span>
                          </div>
                        )}
                      </td>
                    )
                  })}
                  <td className="p-0 relative w-14">
                    <div className="w-full flex flex-col justify-between p-3">
                      <div className="text-xs text-end">
                        <span style={{ color: minContrast >= 4.5 ? "green" : "red" }}>
                          {truncateDecimals(minContrast, 1)}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
            <tr>
              {COLOR_NAMES.map((colorName) => (
                <td key={`${colorName}-copy`} className="p-0 relative">
                  <button
                    onClick={() => copyText(formatScaleEntries(colorName), `${colorName}-column`)}
                    className="w-full p-3 text-xs hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {copied === `${colorName}-column` ? "Copied!" : "Copy JSON"}
                  </button>
                </td>
              ))}
              <td className="p-0 relative w-20" />
            </tr>
            <tr>
              <td colSpan={COLOR_NAMES.length} className="p-0 relative">
                <button
                  onClick={() =>
                    copyText(COLOR_NAMES.map(formatScaleEntries).join("\n\n"), "all-columns")
                  }
                  className="w-full p-3 text-xs hover:bg-gray-200 transition-colors font-semibold cursor-pointer"
                >
                  {copied === "all-columns" ? "Copied!" : "Copy JSON (all)"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
