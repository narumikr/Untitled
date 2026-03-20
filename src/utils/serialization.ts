import { ConsoleWarning } from '@/internal/logging'

/**
 * @description Utility functions for serializing and deserializing data, including handling of Date objects.
 * @param {T} data - The data to serialize
 * @param {WeakSet<object>} visited - A WeakSet to track visited objects for circular reference detection
 * @returns {unknown} - The serialized data
 */
export const serializeData = <T>(data: T, visited = new WeakSet()): unknown => {
  // If data is Date instance, convert to ISO string
  if (data instanceof Date) {
    return data.toISOString()
  }

  // If data is an array, recursively serialize each element
  if (Array.isArray(data)) {
    return serializeArray(data, visited)
  }

  // If data is an object, recursively serialize each property
  if (data && typeof data === 'object') {
    return serializeObject(data, visited)
  }

  // For other primitive types, return as is
  return data
}

/**
 * @description Deserialize data, converting ISO date strings back to Date objects
 * @param {unknown} data - data to deserialize
 * @param {WeakSet<object>} visited - A WeakSet to track visited objects for circular reference detection
 * @returns {unknown} - The deserialized data
 */
export const deserializeData = (data: unknown, visited = new WeakSet()): unknown => {
  // If data is a string and looks like an ISO date, convert to Date
  if (typeof data === 'string') {
    return deserializeDate(data)
  }

  // If data is an array, recursively deserialize each element
  if (Array.isArray(data)) {
    return deserializeArray(data, visited)
  }

  // If data is an object, recursively deserialize each property
  if (data != null && typeof data === 'object') {
    return deserializeObject(data, visited)
  }

  // For other primitive types, return as is
  return data
}

export const deserializeDataWithTemplate = <T>(
  obj: unknown,
  template: T,
  visited = new WeakSet(),
): T => {
  // If template is Date instance, and obj is string, convert to Date
  if (template instanceof Date && typeof obj === 'string') {
    return deserializeDateWithTemplate(obj)
  }

  // If template is an array, recursively temp each element
  if (Array.isArray(template)) {
    return deserializeArrayWithTemplate(obj, template, visited)
  }

  // If template is an object, recursively deserialize each property
  if (typeof template === 'object') {
    return deserializeObjectWithTemplate(
      obj as object,
      template as Record<string, unknown>,
      visited,
    )
  }

  // For other primitive types, return obj if same type, else template
  return obj as T
}

/**
 * @description Validates if a string is a valid date string (ISO 8601 or other formats recognized by Date.parse)
 * @param dateStr - date string to validate
 * @returns boolean - whether the string is a valid date string
 */
export const isValidDateString = (dateStr: string): boolean => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/
  return isoRegex.test(dateStr.trim()) || !isNaN(Date.parse(dateStr))
}

// For searializeData start
// Helper function to searialize array
const serializeArray = <T>(obj: T, visited: WeakSet<object>): unknown => {
  if (Array.isArray(obj)) {
    if (visited.has(obj as object)) {
      throw new Error('Circular reference detected during serializeData')
    }
    visited.add(obj as object)

    const result = obj.map((el) => serializeData(el, visited))
    visited.delete(obj as object)
    return result
  }
  return obj
}
// Helper function to searialize object
const serializeObject = <T>(obj: T, visited: WeakSet<object>): unknown => {
  if (visited.has(obj as object)) {
    throw new Error('Circular reference detected during serialization')
  }

  if (obj instanceof Map || obj instanceof Set) {
    ConsoleWarning(
      'Map and Set are not supported for serialization. They will be converted to empty objects.',
    )
  }

  if (isObject(obj)) {
    visited.add(obj as object)
    const serializedObj: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj as object)) {
      serializedObj[key] = serializeData(value, visited)
    }
    visited.delete(obj as object)
    return serializedObj
  }
  return obj
}
// For searializeData end

// For deserualizeData start
// Helper function to desearialize date
const deserializeDate = (obj: string) => {
  try {
    const dateDeserialized = new Date(obj)
    // Check if the date is valid
    if (!isNaN(dateDeserialized.getTime()) && obj.trim() !== '' && isValidDateString(obj)) {
      return dateDeserialized
    }
    return obj
  } catch (err) {
    throw new Error('Failed to parse date:' + (err as Error).message)
  }
}
// Helper function to deserialize array
const deserializeArray = (obj: unknown, visited: WeakSet<object>): unknown => {
  if (visited.has(obj as object)) {
    throw new Error('Circular reference detected during deserialization')
  }
  if (!Array.isArray(obj)) {
    return obj
  }

  visited.add(obj)
  for (let i = 0; i < obj.length; i++) {
    const deserializedElement = deserializeData(obj[i], visited)

    if (deserializedElement !== obj[i]) {
      const result = obj.slice(0, i)
      result[i] = deserializedElement

      for (let j = i + 1; j < obj.length; j++) {
        result[j] = deserializeData(obj[j], visited)
      }

      visited.delete(obj)
      return result
    }
  }

  visited.delete(obj)
  return obj
}
// Helper function to deserialize object
const deserializeObject = (obj: unknown, visited: WeakSet<object>): unknown => {
  if (!isObject(obj)) {
    return obj
  }

  if (visited.has(obj as object)) {
    throw new Error('Circular reference detected during deserialization')
  }

  visited.add(obj as object)

  const entries = Object.entries(obj as object)
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i]
    const deserializedValue = deserializeData(value, visited)

    if (deserializedValue !== value) {
      const deserializedObj: Record<string, unknown> = {}

      for (let j = 0; j < i; j++) {
        const [prevKey, prevValue] = entries[j]
        deserializedObj[prevKey] = prevValue
      }

      deserializedObj[key] = deserializedValue

      for (let j = i + 1; j < entries.length; j++) {
        const [remainingKey, remainingValue] = entries[j]
        deserializedObj[remainingKey] = deserializeData(remainingValue, visited)
      }

      visited.delete(obj as object)
      return deserializedObj
    }
  }
  visited.delete(obj as object)
  return obj
}
// For deserualizeData end

// For deserializeDataWithTemplate start
// Helper function to deserialize date with template
const deserializeDateWithTemplate = <T>(obj: string) => {
  try {
    const date = new Date(obj)
    // Check if the date is valid
    if (!isNaN(date.getTime()) && obj.trim() !== '' && isValidDateString(obj)) {
      return date as unknown as T
    }
    return obj as unknown as T
  } catch (err) {
    throw new Error('Failed to parse date:' + (err as Error).message)
  }
}
// Helper function to deserialize array with template
const deserializeArrayWithTemplate = <T>(
  obj: unknown,
  template: T,
  visited: WeakSet<object>,
): T => {
  const templateArray = template as unknown as T[]

  if (visited.has(obj as object)) {
    throw new Error('Circular reference detected during deserialization with template')
  }

  if (!Array.isArray(obj)) {
    return obj as unknown as T
  }

  if (templateArray.length === 0) {
    return obj as unknown as T
  }

  visited.add(obj as object)
  const result = obj.map((el, index) => {
    const templateItem = templateArray[index] ?? templateArray[0]
    return deserializeDataWithTemplate(el, templateItem, visited)
  })
  visited.delete(obj as object)

  return result as unknown as T
}
// Helper function to deserialize object with template
const deserializeObjectWithTemplate = <T>(
  obj: unknown,
  template: Record<string, unknown>,
  visited: WeakSet<object>,
): T => {
  if (!isObject(obj)) {
    return obj as unknown as T
  }

  if (visited.has(obj as object)) {
    throw new Error('Circular reference detected during deserialization with template')
  }

  visited.add(obj as object)
  const deserializedObj: Record<string, unknown> = {}

  for (const key in template) {
    if (key in template) {
      deserializedObj[key] = deserializeDataWithTemplate(
        (obj as Record<string, unknown>)[key],
        template[key],
        visited,
      )
    }
  }

  visited.delete(obj as object)
  return deserializedObj as T
}
// For deserializeDataWithTemplate end

const isObject = (value: unknown): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
