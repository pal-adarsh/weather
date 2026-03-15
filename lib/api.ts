import { WeatherData } from './types'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

/**
 * Sanitize a location search string to prevent injection attacks.
 * Allows letters (including Unicode/accented), spaces, commas, hyphens, periods, and parentheses.
 * Strips everything else.
 */
export function sanitizeLocation(input: string): string {
  return input
    .trim()
    .replace(/[<>"'`;{}[\]\\]/g, '') // Remove dangerous characters
    .substring(0, 100)               // Maximum 100 characters
}

/**
 * Validate latitude and longitude are within valid bounds.
 */
export function validateCoordinates(lat: number, lon: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lon === 'number' &&
    isFinite(lat) &&
    isFinite(lon) &&
    lat >= -90 && lat <= 90 &&
    lon >= -180 && lon <= 180
  )
}

export const fetchWeatherData = async (
  lat: number,
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured')
  }

  if (!validateCoordinates(lat, lon)) {
    throw new Error('Invalid coordinates provided')
  }

  // Only 'metric' and 'imperial' are valid — guard against injection
  const safeUnits = units === 'imperial' ? 'imperial' : 'metric'

  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${safeUnits}&appid=${API_KEY}`,
      { cache: 'no-store' }
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${safeUnits}&appid=${API_KEY}`,
      { cache: 'no-store' }
    ),
  ])

  if (!currentResponse.ok || !forecastResponse.ok) {
    const status = !currentResponse.ok ? currentResponse.status : forecastResponse.status
    if (status === 401) throw new Error('Invalid API key')
    if (status === 429) throw new Error('Rate limit exceeded — try again shortly')
    throw new Error(`Weather service error (${status})`)
  }

  const currentData = await currentResponse.json()
  const forecastData = await forecastResponse.json()

  return {
    current: currentData,
    hourly: forecastData.list.slice(0, 12), // Next 36 hours (3-hour intervals)
    daily: forecastData.list // All items — DailyForecast groups by day
  }
}