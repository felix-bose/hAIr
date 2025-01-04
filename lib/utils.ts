import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFirstNameAndLastInitial = (
  input?: string | null
): string | undefined => {
  if (!input) return undefined

  const parts = input.trim().split(" ")
  const firstName = parts[0] || ""
  const lastNameInitial = parts[1]?.charAt(0).toUpperCase() || ""

  return firstName ? `${firstName} ${lastNameInitial}`.trim() : undefined
}

export const imageDimensions = {
  small: 256,
  medium: 512,
  large: 1024,
} as const

type ImageDimensionKey = keyof typeof imageDimensions

// Define a template literal type for return values
type ImageDimensionString<K extends ImageDimensionKey> =
  `${(typeof imageDimensions)[K]}x${(typeof imageDimensions)[K]}`

// Generic function to get image dimensions
export function getOpenAIImageDimensions<K extends ImageDimensionKey>(
  size: K
): ImageDimensionString<K> {
  const dimension = imageDimensions[size]
  return `${dimension}x${dimension}` as ImageDimensionString<K>
}
