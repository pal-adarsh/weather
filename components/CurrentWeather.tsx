'use client'

import { CurrentWeatherData } from '../lib/types'
import WeatherIcon from './WeatherIcon'

interface CurrentWeatherProps {
  data: CurrentWeatherData
  unit: 'metric' | 'imperial'
}

// Utility function to convert temperature
const formatTemperature = (kelvin: number, unit: 'metric' | 'imperial'): number =>
  unit === 'metric'
    ? Math.round(kelvin)
    : Math.round((kelvin * 9) / 5 + 32)

const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const temp = formatTemperature(data.main.temp, unit)
  const tempMax = formatTemperature(data.main.temp_max, unit)
  const tempMin = formatTemperature(data.main.temp_min, unit)
  const tempUnit = unit === 'metric' ? '°C' : '°F'
  const currentDate = formatDate(data.dt)

  return (
    <section className="current-weather p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 transition duration-300">
      <header className="weather-main flex items-center justify-between mb-4">
        <div className="location-time">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{currentDate}</p>
        </div>
        <WeatherIcon
          weatherId={data.weather[0].id}
          iconCode={data.weather[0].icon}
          className="w-16 h-16"
        />
      </header>

      <div className="weather-details text-center">
        <div className="temperature text-5xl font-semibold text-blue-600 dark:text-blue-300">
          {temp}
          <span className="text-xl align-top ml-1">{tempUnit}</span>
        </div>

        <div className="description text-gray-700 dark:text-gray-300 capitalize my-2">
          {data.weather[0].description}
        </div>

        <div className="min-max text-gray-600 dark:text-gray-400 text-sm mt-2 space-x-4">
          <span>High: {tempMax}°</span>
          <span>Low: {tempMin}°</span>
        </div>
      </div>
    </section>
  )
}
