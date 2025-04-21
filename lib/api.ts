import { WeatherData } from './types'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export const fetchWeatherData = async (
  lat: number,
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  const currentResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  )
  
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  )

  if (!currentResponse.ok || !forecastResponse.ok) {
    throw new Error('Failed to fetch weather data')
  }

  const currentData = await currentResponse.json()
  const forecastData = await forecastResponse.json()

  return {
    current: currentData,
    hourly: forecastData.list.slice(0, 8), // Next 24 hours (3-hour intervals)
    daily: forecastData.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5) // Daily forecast
  }
}