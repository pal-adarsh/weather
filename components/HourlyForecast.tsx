'use client'

import { HourlyForecastData } from '../lib/types'
import WeatherIcon from './WeatherIcon'

interface HourlyForecastProps {
  data: HourlyForecastData[]
  unit: 'metric' | 'imperial'
}

// Utility function for temperature
const formatTemp = (kelvin: number, unit: 'metric' | 'imperial') =>
  unit === 'metric'
    ? Math.round(kelvin)
    : Math.round((kelvin * 9) / 5 + 32)

// Format hour in 12-hour format with AM/PM
const formatHour = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 || 12
  return `${hour12} ${ampm}`
}

export default function HourlyForecast({ data, unit }: HourlyForecastProps) {
  return (
    <section className="hourly-forecast p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Hourly Forecast</h3>
      <div className="hourly-container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {data.slice(0, 8).map((hour, index) => {
          const time = formatHour(hour.dt)
          const temp = formatTemp(hour.main.temp, unit)

          return (
            <div
              key={index}
              className="hourly-item flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 hover:scale-105 transition-transform"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">{time}</p>
              <WeatherIcon
                weatherId={hour.weather[0].id}
                iconCode={hour.weather[0].icon}
                className="w-10 h-10 my-2"
              />
              <p className="text-md font-medium text-blue-600 dark:text-blue-300">{temp}°</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
