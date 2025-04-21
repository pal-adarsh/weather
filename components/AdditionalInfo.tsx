'use client'

import { CurrentWeatherData } from '../lib/types'

interface AdditionalInfoProps {
  current: CurrentWeatherData
  unit: 'metric' | 'imperial'
}

export default function AdditionalInfo({ current, unit }: AdditionalInfoProps) {
  const windSpeed = unit === 'metric' 
    ? `${Math.round(current.wind.speed * 3.6)} km/h` 
    : `${Math.round(current.wind.speed * 2.237)} mph`

  const visibility = unit === 'metric' 
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

  const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="additional-info">
      <div className="info-card">
        <i className="fas fa-wind"></i>
        <h4>Wind</h4>
        <p>{windSpeed}</p>
      </div>
      <div className="info-card">
        <i className="fas fa-tint"></i>
        <h4>Humidity</h4>
        <p>{current.main.humidity}%</p>
      </div>
      <div className="info-card">
        <i className="fas fa-compress-alt"></i>
        <h4>Pressure</h4>
        <p>{current.main.pressure} hPa</p>
      </div>
      <div className="info-card">
        <i className="fas fa-sun"></i>
        <h4>Sunrise</h4>
        <p>{sunrise}</p>
      </div>
      <div className="info-card">
        <i className="fas fa-moon"></i>
        <h4>Sunset</h4>
        <p>{sunset}</p>
      </div>
      <div className="info-card">
        <i className="fas fa-eye"></i>
        <h4>Visibility</h4>
        <p>{visibility}</p>
      </div>
    </div>
  )
}