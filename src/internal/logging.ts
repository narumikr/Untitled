/* eslint-disable no-console */

declare const process: { env: { NODE_ENV?: string } }

const isDevelopment = () => {
  return typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
}

export const ConsoleLog = <T extends unknown[]>(...arg: T) => {
  if (isDevelopment()) {
    console.log(...arg)
  }
}

export const ConsoleWarning = <T extends unknown[]>(...arg: T) => {
  if (isDevelopment()) {
    console.warn(...arg)
  }
}

export const ConsoleError = <T extends unknown[]>(...arg: T) => {
  if (isDevelopment()) {
    console.error(...arg)
  }
}
