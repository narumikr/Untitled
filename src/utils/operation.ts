import type React from 'react'

/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Enter key is pressed.
 * @param eventHandler - The function to be called when the Enter key is pressed.
 * @returns A new event handler that calls the provided handler on Enter key press and prevents the default action.
 */
export const fireOnEnterKey = <T extends HTMLElement>(
  eventHandler: (e: React.KeyboardEvent<T>) => void,
) => {
  return (e: React.KeyboardEvent<T>) => {
    if (e.key === 'Enter') {
      eventHandler(e)
      e.preventDefault()
    }
  }
}

/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Escape key is pressed.
 * @param eventHandler - The function to be called when the Escape key is pressed.
 * @returns A keyboard event handler function.
 */
export const fireOnEscapeKey = (eventHandler: (e: KeyboardEvent) => void) => {
  return (e: KeyboardEvent) => {
    e.preventDefault()
    if (e.key === 'Escape') {
      eventHandler(e)
    }
  }
}

/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Space key is pressed.
 * @param eventHandler - The function to be called when the Space key is pressed.
 * @returns A keyboard event handler function.
 */
export const fireOnSpaceKey = <T extends HTMLElement>(
  eventHandler: (e: React.KeyboardEvent<T>) => void,
) => {
  return (e: React.KeyboardEvent<T>) => {
    e.preventDefault()
    if (e.key === ' ') {
      eventHandler(e)
    }
  }
}

/**
 * @description Returns a new array with the elements of the input array shuffled in random order.
 * Uses the Fisher-Yates (Knuth) shuffle algorithm to ensure an unbiased shuffle.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to shuffle.
 * @returns A new array containing the shuffled elements.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}
