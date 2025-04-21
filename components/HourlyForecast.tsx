'use client'

import { HourlyForecastData } from '../lib/types'
import WeatherIcon from './WeatherIcon'

interface HourlyForecastProps {
  data: HourlyForecastData[]
  unit: 'metric' | 'imperial'
}

export default function HourlyForecast({ data, unit }: HourlyForecastProps) {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-container">
        {data.slice(0, 8).map((hour, index) => {
          const hourTime = new Date(hour.dt * 1000).getHours()
          const temp = unit === 'metric' 
            ? Math.round(hour.main.temp) 
            : Math.round((hour.main.temp * 9/5) + 32)

          return (
            <div key={index} className="hourly-item">
              <p>{hourTime}:00</p>
              <WeatherIcon 
                weatherId={hour.weather[0].id} 
                iconCode={hour.weather[0].icon} 
                className="hourly-icon"
              />
              <p>{temp}°</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}