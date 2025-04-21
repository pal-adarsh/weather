'use client'

import { DailyForecastData } from '../lib/types'
import WeatherIcon from './WeatherIcon'
import { mode } from '../lib/utils'

interface DailyForecastProps {
  data: DailyForecastData[]
  unit: 'metric' | 'imperial'
}

export default function DailyForecast({ data, unit }: DailyForecastProps) {
  // Group forecasts by day
  const dailyForecasts: Record<string, {
    temps: number[]
    weatherIds: number[]
    icons: string[]
  }> = {}

  data.forEach(forecast => {
    const date = new Date(forecast.dt * 1000)
    const day = date.toLocaleDateString('en-US', { weekday: 'short' })
    
    if (!dailyForecasts[day]) {
      dailyForecasts[day] = {
        temps: [],
        weatherIds: [],
        icons: []
      }
    }
    
    dailyForecasts[day].temps.push(forecast.main.temp)
    dailyForecasts[day].weatherIds.push(forecast.weather[0].id)
    dailyForecasts[day].icons.push(forecast.weather[0].icon)
  })

  return (
    <div className="daily-forecast">
      <h3>5-Day Forecast</h3>
      <div className="daily-container">
        {Object.entries(dailyForecasts).slice(0, 5).map(([day, dayData], index) => {
          const minTemp = Math.min(...dayData.temps)
          const maxTemp = Math.max(...dayData.temps)
          const weatherId = mode(dayData.weatherIds)
          const iconCode = dayData.icons[dayData.weatherIds.indexOf(weatherId)]

          const minTempDisplay = unit === 'metric' 
            ? Math.round(minTemp) 
            : Math.round((minTemp * 9/5) + 32)
          const maxTempDisplay = unit === 'metric' 
            ? Math.round(maxTemp) 
            : Math.round((maxTemp * 9/5) + 32)

          return (
            <div key={index} className="daily-item">
              <span className="day">{day}</span>
              <WeatherIcon 
                weatherId={weatherId} 
                iconCode={iconCode} 
                className="daily-icon"
              />
              <div className="temp-range">
                <span>{maxTempDisplay}°</span>
                <span>{minTempDisplay}°</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}