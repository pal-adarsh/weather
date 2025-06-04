'use client'

import { CurrentWeatherData } from '../lib/types'
import {
  FaWind,
  FaTint,
  FaCompressAlt,
  FaSun,
  FaMoon,
  FaEye,
  FaCloudRain
} from 'react-icons/fa'

interface AdditionalInfoProps {
  current: CurrentWeatherData
  unit: 'metric' | 'imperial'
}

export default function AdditionalInfo({ current, unit }: AdditionalInfoProps) {
  const windSpeed =
    unit === 'metric'
      ? `${Math.round(current.wind.speed * 3.6)} km/h`
      : `${Math.round(current.wind.speed * 2.237)} mph`

  const visibility =
    unit === 'metric'
      ? `${(current.visibility / 1000).toFixed(1)} km`
      : `${(current.visibility / 1609).toFixed(1)} mi`

  const precipitation = current.rain
    ? unit === 'metric'
      ? `${current.rain['1h'] || 0} mm`
      : `${((current.rain['1h'] || 0) / 25.4).toFixed(1)} in`
    : current.snow
    ? unit === 'metric'
      ? `${current.snow['1h'] || 0} mm`
      : `${((current.snow['1h'] || 0) / 25.4).toFixed(1)} in`
    : '0 mm'

  const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  const infoItems = [
    { icon: <FaWind />, label: 'Wind', value: windSpeed },
    { icon: <FaTint />, label: 'Humidity', value: `${current.main.humidity}%` },
    { icon: <FaCompressAlt />, label: 'Pressure', value: `${current.main.pressure} hPa` },
    { icon: <FaSun />, label: 'Sunrise', value: sunrise },
    { icon: <FaMoon />, label: 'Sunset', value: sunset },
    { icon: <FaEye />, label: 'Visibility', value: visibility },
  ]

  return (
    <section className="additional-info grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 text-gray-800 dark:text-gray-100">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="info-card flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <div className="text-2xl text-blue-500 dark:text-blue-300 mb-2">{item.icon}</div>
          <h4 className="font-semibold">{item.label}</h4>
          <p className="text-sm mt-1">{item.value}</p>
        </div>
      ))}
    </section>
  )
}
