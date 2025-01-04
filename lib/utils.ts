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
