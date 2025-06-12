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

const v6 = {
  blue: {
    10: "#004670",
    20: "#007DBC",
    30: "#0092CB",
    40: "#11ABDE",
    50: "#89D1F4",
    60: "#B9E5FB",
  },
  navy: {
    10: "#00153B",
    20: "#002F5A",
    30: "#2A5B89",
    40: "#6490B6",
    50: "#89B2D0",
    60: "#BDD7EA",
  },
  aqua: {
    10: "#003C4D",
    20: "#008EB2",
    30: "#00A2C0",
    40: "#36B9D5",
    50: "#6DCDE3",
    60: "#B9E3EB",
  },
  green: {
    10: "#035537",
    20: "#03924A",
    30: "#4EB16F",
    40: "#74C48A",
    50: "#AFDBBB",
    60: "#D5ECDD",
  },
  dgreen: {
    10: "#003A27",
    20: "#005D45",
    30: "#0D9577",
    40: "#65B899",
    50: "#95D3C3",
    60: "#CAE8DE",
  },
  ivory: {
    10: "#A4885F",
    20: "#ECE1B1",
    30: "#F5E9CE",
    40: "#F9F4DF",
    50: "#fff",
    60: "#fff"
  },
  brown: {
    10: "#6A3713",
    20: "#AA5628",
    30: "#CC8153",
    40: "#D79772",
    50: "#ECB897",
    60: "#F4D7C4",
  },
  orange: {
    10: "#9A331B",
    20: "#F0512D",
    30: "#F37455",
    40: "#F8A07E",
    50: "#FBC4A8",
    60: "#FEDFCE",
  },
  purple: {
    10: "#65175C",
    20: "#AC1294",
    30: "#B24F9E",
    40: "#C372AF",
    50: "#DFA5CB",
    60: "#F0D2E5",
  },
  burgundy: {
    10: "#4A003B",
    20: "#950158",
    30: "#9A436E",
    40: "#DA7DA9",
    50: "#F7ADC5",
    60: "#FBD4DD",
  },
  red: {
    10: "#7F1724",
    20: "#E3002B",
    30: "#F04B5D",
    40: "#F69896",
    50: "#F9B9B7",
    60: "#FCDCD8",
  },
  black: {
    10: "#000000",
    20: "#231F20",
    30: "#636466",
    40: "#939598",
    50: "#B1B3B6",
    60: "#DADBDC",
  },
}

const originalColorScales: ColorScales = {
  blue: {
    10: v6.blue[10],
    20: v6.blue[20],
    30: v6.blue[30],
    40: v6.blue[40],
    50: v6.blue[50],
    60: v6.blue[60],
  },
  navy: {
    10: v6.navy[10],
    20: v6.navy[20],
    30: v6.navy[30],
    40: v6.navy[40],
    50: v6.navy[50],
    60: v6.navy[60],
  },
  aqua: {
    10: v6.aqua[10],
    20: v6.aqua[20],
    30: v6.aqua[30],
    40: v6.aqua[40],
    50: v6.aqua[50],
    60: v6.aqua[60],
  },
  aquanew: {
    10: v6.aqua[10],
    20: v6.aqua[20],
    30: v6.aqua[30],
    40: v6.aqua[40],
    50: v6.aqua[50],
    60: v6.aqua[60],
  },
  green: {
    10: v6.green[10],
    20: v6.green[20],
    30: v6.green[30],
    40: v6.green[40],
    50: v6.green[50],
    60: v6.green[60],
  },
  dgreen: {
    10: v6.dgreen[10],
    20: v6.dgreen[20],
    30: v6.dgreen[30],
    40: v6.dgreen[40],
    50: v6.dgreen[50],
    60: v6.dgreen[60],
  },
  ivory: {
    10: v6.ivory[10],
    20: v6.ivory[20],
    30: v6.ivory[30],
    40: v6.ivory[40],
    50: v6.ivory[50],
    60: v6.ivory[60],
  },
  brown: {
    10: v6.brown[10],
    20: v6.brown[20],
    30: v6.brown[30],
    40: v6.brown[40],
    50: v6.brown[50],
    60: v6.brown[60],
  },
  orange: {
    10: v6.orange[10],
    20: v6.orange[20],
    30: v6.orange[30],
    40: v6.orange[40],
    50: v6.orange[50],
    60: v6.orange[60],
  },
  orangenew: {
    10: v6.orange[10],
    20: v6.orange[20],
    30: v6.orange[30],
    40: v6.orange[40],
    50: v6.orange[50],
    60: v6.orange[60],
  },
  purple: {
    10: v6.purple[10],
    20: v6.purple[20],
    30: v6.purple[30],
    40: v6.purple[40],
    50: v6.purple[50],
    60: v6.purple[60],
  },
  burgundy: {
    10: v6.burgundy[10],
    20: v6.burgundy[20],
    30: v6.burgundy[30],
    40: v6.burgundy[40],
    50: v6.burgundy[50],
    60: v6.burgundy[60],
  },
  red: {
    10: v6.red[10],
    20: v6.red[20],
    30: v6.red[30],
    40: v6.red[40],
    50: v6.red[50],
    60: v6.red[60],
  },
  black: {
    10: v6.black[10],
    20: v6.black[20],
    30: v6.black[30],
    40: v6.black[40],
    50: v6.black[50],
    60: v6.black[60],
  },
}

export default function ColorPalette() {
  const [copied, setCopied] = useState("")
  const colorNames = [
    "blue",
    "navy",
    "aqua",
    "aquanew",
    "green",
    "dgreen",
    "ivory",
    "brown",
    "orange",
    "orangenew",
    "purple",
    "burgundy",
    "red",
    "black"
  ]
  const steps = [
    10, 20, 30, 40, 50, 60
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

    const formattedOutput = `${Object.entries(columnData)
      .map(([step, hex]) => `${hex}`)
      .join('\n')
      }`

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
