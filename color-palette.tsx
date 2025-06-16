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
    1: "#004670",
    2: "#007DBC",
    3: "#0092CB",
    4: "#11ABDE",
    5: "#89D1F4",
    6: "#B9E5FB",
  },
  navy: {
    1: "#00153B",
    2: "#002F5A",
    3: "#2A5B89",
    4: "#6490B6",
    5: "#89B2D0",
    6: "#BDD7EA",
  },
  aqua: {
    1: "#003C4D",
    2: "#008EB2",
    3: "#00A2C0",
    4: "#36B9D5",
    5: "#6DCDE3",
    6: "#B9E3EB",
  },
  green: {
    1: "#035537",
    2: "#03924A",
    3: "#4EB16F",
    4: "#74C48A",
    5: "#AFDBBB",
    6: "#D5ECDD",
  },
  darkgreen: {
    1: "#003A27",
    2: "#005D45",
    3: "#0D9577",
    4: "#65B899",
    5: "#95D3C3",
    6: "#CAE8DE",
  },
  ivory: {
    1: "#A4885F",
    2: "#ECE1B1",
    3: "#F5E9CE",
    4: "#F9F4DF",
    // 5: "#fff",
    // 6: "#fff"
  },
  brown: {
    1: "#6A3713",
    2: "#AA5628",
    3: "#CC8153",
    4: "#D79772",
    5: "#ECB897",
    6: "#F4D7C4",
  },
  orange: {
    1: "#9A331B",
    2: "#F0512D",
    3: "#F37455",
    4: "#F8A07E",
    5: "#FBC4A8",
    6: "#FEDFCE",
  },
  purple: {
    1: "#65175C",
    2: "#AC1294",
    3: "#B24F9E",
    4: "#C372AF",
    5: "#DFA5CB",
    6: "#F0D2E5",
  },
  burgundy: {
    1: "#4A003B",
    2: "#950158",
    3: "#9A436E",
    4: "#DA7DA9",
    5: "#F7ADC5",
    6: "#FBD4DD",
  },
  red: {
    1: "#7F1724",
    2: "#E3002B",
    3: "#F04B5D",
    4: "#F69896",
    5: "#F9B9B7",
    6: "#FCDCD8",
  },
  black: {
    1: "#000000",
    2: "#231F20",
    3: "#636466",
    4: "#939598",
    5: "#B1B3B6",
    6: "#DADBDC",
  },
}

const originalColorScales: ColorScales = {
  blue: {
    1: v6.blue[1],
    2: v6.blue[2],
    3: v6.blue[3],
    4: v6.blue[4],
    5: v6.blue[5],
    6: v6.blue[6],
  },
  navy: {
    1: v6.navy[1],
    2: v6.navy[2],
    3: v6.navy[3],
    4: v6.navy[4],
    5: v6.navy[5],
    6: v6.navy[6],
  },
  aqua: {
    1: v6.aqua[1],
    2: v6.aqua[2],
    3: v6.aqua[3],
    4: v6.aqua[4],
    5: v6.aqua[5],
    6: v6.aqua[6],
  },
  NEWaqua: {
    1: chroma(v6.aqua[1]).set('oklch.h', '-10').hex(),
    2: chroma(v6.aqua[2]).set('oklch.h', '-10').hex(),
    3: chroma(v6.aqua[3]).set('oklch.h', '-10').hex(),
    4: chroma(v6.aqua[4]).set('oklch.h', '-10').hex(),
    5: chroma(v6.aqua[5]).set('oklch.h', '-10').hex(),
    6: chroma(v6.aqua[6]).set('oklch.h', '-10').hex(),
  },
  green: {
    1: v6.green[1],
    2: v6.green[2],
    3: v6.green[3],
    4: v6.green[4],
    5: v6.green[5],
    6: v6.green[6],
  },
  darkgreen: {
    1: v6.darkgreen[1],
    2: v6.darkgreen[2],
    3: v6.darkgreen[3],
    4: v6.darkgreen[4],
    5: v6.darkgreen[5],
    6: v6.darkgreen[6],
  },
  ivory: {
    1: v6.ivory[1],
    2: v6.ivory[2],
    3: v6.ivory[3],
    4: v6.ivory[4],
  },
  brown: {
    1: v6.brown[1],
    2: v6.brown[2],
    3: v6.brown[3],
    4: v6.brown[4],
    5: v6.brown[5],
    6: v6.brown[6],
  },
  orange: {
    1: v6.orange[1],
    2: v6.orange[2],
    3: v6.orange[3],
    4: v6.orange[4],
    5: v6.orange[5],
    6: v6.orange[6],
  },
  NEWorange: {
    1: chroma(v6.orange[1]).set('oklch.h', '+12').hex(),
    2: chroma(v6.orange[2]).set('oklch.h', '+12').hex(),
    3: chroma(v6.orange[3]).set('oklch.h', '+12').hex(),
    4: chroma(v6.orange[4]).set('oklch.h', '+12').hex(),
    5: chroma(v6.orange[5]).set('oklch.h', '+12').hex(),
    6: chroma(v6.orange[6]).set('oklch.h', '+12').hex(),
  },
  purple: {
    1: v6.purple[1],
    2: v6.purple[2],
    3: v6.purple[3],
    4: v6.purple[4],
    5: v6.purple[5],
    6: v6.purple[6],
  },
  burgundy: {
    1: v6.burgundy[1],
    2: v6.burgundy[2],
    3: v6.burgundy[3],
    4: v6.burgundy[4],
    5: v6.burgundy[5],
    6: v6.burgundy[6],
  },
  red: {
    1: v6.red[1],
    2: v6.red[2],
    3: v6.red[3],
    4: v6.red[4],
    5: v6.red[5],
    6: v6.red[6],
  },
  black: {
    1: v6.black[1],
    2: v6.black[2],
    3: v6.black[3],
    4: v6.black[4],
    5: v6.black[5],
    6: v6.black[6],
  },
}

export default function ColorPalette() {
  const [copied, setCopied] = useState("")
  const colorNames = [
    "red",
    // "orange",
    "NEWorange",
    "brown",
    "ivory",
    "green",
    "darkgreen",
    // "aqua",
    "NEWaqua",
    "blue",
    "navy",
    "purple",
    "burgundy",
    "black"
  ]
  const steps = [
    1, 2, 3, 4, 5, 6
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
                      <td key={`${colorName}-${step}`}>
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
                    {copied === `${colorName}-column` ? "Copied!" : "Copy all"}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
