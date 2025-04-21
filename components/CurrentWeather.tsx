'use client'

import { CurrentWeatherData } from '../lib/types'
import WeatherIcon from './WeatherIcon'

interface CurrentWeatherProps {
  data: CurrentWeatherData
  unit: 'metric' | 'imperial'
}

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const tempUnit = unit === 'metric' ? '°C' : '°F'
  const temp = unit === 'metric' ? Math.round(data.main.temp) : Math.round((data.main.temp * 9/5) + 32)
  const tempMax = unit === 'metric' ? Math.round(data.main.temp_max) : Math.round((data.main.temp_max * 9/5) + 32)
  const tempMin = unit === 'metric' ? Math.round(data.main.temp_min) : Math.round((data.main.temp_min * 9/5) + 32)

  const currentDate = new Date(data.dt * 1000).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="current-weather">
      <div className="weather-main">
        <div className="location-time">
          <h2>{data.name}, {data.sys.country}</h2>
          <p>{currentDate}</p>
        </div>
        <WeatherIcon 
          weatherId={data.weather[0].id} 
          iconCode={data.weather[0].icon} 
          className="weather-icon"
        />
      </div>
      <div className="weather-details">
        <div className="temperature">
          <span>{temp}</span>
          <span className="unit">{tempUnit}</span>
        </div>
        <div className="description">{data.weather[0].description}</div>
        <div className="min-max">
          <span>H: {tempMax}°</span>
          <span>L: {tempMin}°</span>
        </div>
      </div>
    </div>
  )
}