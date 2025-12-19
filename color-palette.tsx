"use client"

import { useState } from "react"
import chroma from "chroma-js"
import { Theme as LeonardoTheme, Color as LeonardoColor, CssColor, BackgroundColor } from "@adobe/leonardo-contrast-colors"

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
  'yellorange': {
    'pantone': chroma("#FC4C02").set('oklch.h', '+15').hex(),
    'wfp': chroma("#F0512D").set('oklch.h', '+15').hex(),
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
  'black': {
    'pantone': '#000000',
    'wfp': '#000000',
  },
}

// Leonardo configuration and dynamic palette generation
// Toggle this between "pantone" and "wfp" to switch all Leonardo inputs
const BRAND_SOURCE = "pantone" as const

const LEONARDO_BACKGROUND = "#ffffff"

const LEONARDO_RATIOS = [1.07, 1.15, 1.33, 1.6, 2.2, 3.3, 4.9, 7.8, 11.3, 15, 18]

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

function getBrandColor(name: keyof typeof brand): CssColor {
  return brand[name][BRAND_SOURCE] as CssColor
}

type ColorSpace = "OKLCH" | "RGB"

type ColorConfig =
  | { name: string; keys: CssColor[]; colorspace: ColorSpace; smooth: boolean }
  | { name: string; keys: string[]; colorspace: ColorSpace; smooth: boolean }

function createLeonardoPalette(): LeonardoTokens {
  const configs: ColorConfig[] = [
    { name: "neutral", keys: [getBrandColor("black")], colorspace: "OKLCH", smooth: false },
    { name: "navy", keys: [getBrandColor("navy")], colorspace: "RGB", smooth: true },
    {
      name: "blue",
      keys: [getBrandColor("blue"), getBrandColor("navy")],
      colorspace: "RGB",
      smooth: true,
    },
    { name: "xblue", keys: [getBrandColor("blue")], colorspace: "RGB", smooth: true },
    { name: "aqua", keys: [getBrandColor("aqua")], colorspace: "OKLCH", smooth: true },
    { name: "xgreen", keys: [getBrandColor("green")], colorspace: "OKLCH", smooth: true },
    {
      name: "green",
      keys: [getBrandColor("green"), getBrandColor("darkgreen")],
      colorspace: "OKLCH",
      smooth: true,
    },
    { name: "darkgreen", keys: [getBrandColor("darkgreen")], colorspace: "OKLCH", smooth: true },
    { name: "ivory", keys: [getBrandColor("ivory")], colorspace: "OKLCH", smooth: false },
    { name: "brown", keys: [getBrandColor("earthybrown")], colorspace: "OKLCH", smooth: true },
    { name: "orange", keys: [getBrandColor("yellorange")], colorspace: "RGB", smooth: true },
    { name: "xorange", keys: [getBrandColor("orange")], colorspace: "OKLCH", smooth: true },
    { name: "red", keys: [getBrandColor("red")], colorspace: "OKLCH", smooth: true },
    { name: "xpurple", keys: [getBrandColor("purple")], colorspace: "OKLCH", smooth: true },
    {
      name: "purple",
      keys: [getBrandColor("purple"), getBrandColor("burgundy")],
      colorspace: "OKLCH",
      smooth: true,
    },
    { name: "burgundy", keys: [getBrandColor("burgundy")], colorspace: "OKLCH", smooth: true },
  ]

  const colors = configs.map(
    ({ name, keys, colorspace, smooth }) =>
      new LeonardoColor({
        name,
        colorKeys: keys as CssColor[],
        ratios: LEONARDO_RATIOS,
        colorspace,
        smooth,
      }),
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
      description:
        "UI background color. All color contrasts evaluated and generated against this color.",
    },
  }

    // theme.contrastColors returns an array grouped by base color,
    // each with a `values` array of named swatches like "neutral100"
    ; (theme.contrastColors || []).forEach((group: any) => {
      if (!group || !Array.isArray(group.values)) return

      group.values.forEach((swatch: any) => {
        if (!swatch || !swatch.name || !swatch.value) return

        tokens[swatch.name] = {
          value: swatch.value,
          type: "color",
          description: `WCAG 2.x (relative luminance) contrast is ${truncateDecimals(
            swatch.contrast,
            2,
          )}:1 against background ${LEONARDO_BACKGROUND}`,
        }
      })
    })

  return tokens
}

const leonardo = createLeonardoPalette()

const originalColorScales: ColorScales = {
  neutral: {
    0: getBrandColor("black"),
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
  navy: {
    0: getBrandColor("navy"),
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
  blue: {
    0: getBrandColor("blue"),
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
  xblue: {
    0: getBrandColor("blue"),
    50: leonardo.xblue100.value,
    100: leonardo.xblue200.value,
    200: leonardo.xblue300.value,
    300: leonardo.xblue400.value,
    400: leonardo.xblue500.value,
    500: leonardo.xblue600.value,
    600: leonardo.xblue700.value,
    700: leonardo.xblue800.value,
    800: leonardo.xblue900.value,
    900: leonardo.xblue1000.value,
    950: leonardo.xblue1100.value,
  },
  aqua: {
    0: getBrandColor("aqua"),
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
  xgreen: {
    0: getBrandColor("green"),
    50: leonardo.xgreen100.value,
    100: leonardo.xgreen200.value,
    200: leonardo.xgreen300.value,
    300: leonardo.xgreen400.value,
    400: leonardo.xgreen500.value,
    500: leonardo.xgreen600.value,
    600: leonardo.xgreen700.value,
    700: leonardo.xgreen800.value,
    800: leonardo.xgreen900.value,
    900: leonardo.xgreen1000.value,
    950: leonardo.xgreen1100.value,
  },
  green: {
    0: getBrandColor("green"),
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
    0: getBrandColor("darkgreen"),
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
  ivory: {
    0: getBrandColor("ivory"),
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
    0: getBrandColor("earthybrown"),
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
  orange: {
    0: getBrandColor("orange"),
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
  xorange: {
    0: getBrandColor("orange"),
    50: leonardo.xorange100.value,
    100: leonardo.xorange200.value,
    200: leonardo.xorange300.value,
    300: leonardo.xorange400.value,
    400: leonardo.xorange500.value,
    500: leonardo.xorange600.value,
    600: leonardo.xorange700.value,
    700: leonardo.xorange800.value,
    800: leonardo.xorange900.value,
    900: leonardo.xorange1000.value,
    950: leonardo.xorange1100.value,
  },
  red: {
    0: getBrandColor("red"),
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
  burgundy: {
    0: getBrandColor("burgundy"),
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
  xpurple: {
    0: getBrandColor("purple"),
    50: leonardo.xpurple100.value,
    100: leonardo.xpurple200.value,
    200: leonardo.xpurple300.value,
    300: leonardo.xpurple400.value,
    400: leonardo.xpurple500.value,
    500: leonardo.xpurple600.value,
    600: leonardo.xpurple700.value,
    700: leonardo.xpurple800.value,
    800: leonardo.xpurple900.value,
    900: leonardo.xpurple1000.value,
    950: leonardo.xpurple1100.value,
  },
  purple: {
    0: getBrandColor("purple"),
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
}

export default function ColorPalette() {
  const [copied, setCopied] = useState("")
  const colorNames = [
    "neutral",
    // "navy",
    "blue",
    // "xblue",
    "aqua",
    // "xgreen",
    "green",
    // "darkgreen",
    "ivory",
    "brown",
    "orange",
    // "xorange",
    "red",
    // "burgundy",
    "purple",
    // "xpurple",
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
                          color: minContrast >= 4.5 ? colorScales.green[500] :
                            minContrast >= 3 ? colorScales.xorange[500] :
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
