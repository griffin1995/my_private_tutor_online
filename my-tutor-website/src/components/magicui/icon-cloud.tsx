/**
 * Documentation Source: React Icon Cloud + React 18 Hooks
 * Reference: https://github.com/jpmorganchase/react-icon-cloud
 * Reference: https://react.dev/reference/react/useEffect
 * Reference: https://react.dev/reference/react/useMemo
 * 
 * Pattern: 3D Icon Cloud Component
 * Architecture:
 * - Client component using react-icon-cloud library
 * - Dynamic icon fetching from Simple Icons
 * - Theme-aware icon rendering
 * - Memoized performance optimization
 * 
 * Features:
 * - 3D rotating icon cloud
 * - Simple Icons integration
 * - Light/dark theme support
 * - Interactive hover effects
 * - Customizable cloud properties
 * 
 * Performance:
 * - useMemo for expensive computations
 * - useEffect for side effects
 * - Icon caching and optimization
 */

"use client"

import { useEffect, useMemo, useState } from "react"
import { Cloud, fetchSimpleIcons, ICloud, renderSimpleIcon } from "react-icon-cloud"

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
}

export const renderCustomIcon = (icon: any, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2f1" : "#080510"
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff"
  const minContrastRatio = theme === "dark" ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs: string[]
  imageArray?: any[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

export default function IconCloud({ iconSlugs, imageArray }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null)

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data) return null

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, "light")
    )
  }, [data])

  if (!renderedIcons) {
    return <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-900 border-t-transparent"></div>
    </div>
  }

  return (
    <Cloud {...cloudProps}>
      <div>
        {renderedIcons}
        {imageArray &&
          imageArray.map((image, index) => (
            <img key={index} height="42" width="42" alt={'Icon'} src={image} />
          ))}
      </div>
    </Cloud>
  )
}

export { IconCloud }