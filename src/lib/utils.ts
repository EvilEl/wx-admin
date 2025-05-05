import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        res(reader.result)
      } else {
        rej(new Error('Failed to convert file to base64 string'))
      }
    }
    reader.onerror = rej
  })
}
