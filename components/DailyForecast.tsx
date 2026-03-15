'use client'

import { DailyForecastData } from '../lib/types'
import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { mode } from '../lib/utils'

interface DailyForecastProps {
  data: DailyForecastData[]
  unit: 'metric' | 'imperial'
}

export default function DailyForecast({ data, unit }: DailyForecastProps) {
  const unitSymbol = unit === 'metric' ? '°' : '°'

  // Group forecasts by day
  const dailyForecasts: Record<string, {
    temps: number[]
    weatherIds: number[]
    icons: string[]
    dateStr: string
  }> = {}

  data.forEach(forecast => {
    const date = new Date(forecast.dt * 1000)
    const key = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' })

    if (!dailyForecasts[dayKey]) {
      dailyForecasts[dayKey] = {
        temps: [],
        weatherIds: [],
        icons: [],
        dateStr: key
      }
    }

    dailyForecasts[dayKey].temps.push(forecast.main.temp)
    dailyForecasts[dayKey].weatherIds.push(forecast.weather[0].id)
    dailyForecasts[dayKey].icons.push(forecast.weather[0].icon)
  })

  const entries = Object.entries(dailyForecasts).slice(0, 6)

  // Find global min/max for proportional bar rendering
  const allMins = entries.map(([, d]) => Math.min(...d.temps))
  const allMaxs = entries.map(([, d]) => Math.max(...d.temps))
  const globalMin = Math.min(...allMins)
  const globalMax = Math.max(...allMaxs)
  const range = globalMax - globalMin || 1

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="glass p-6 sm:p-8 rounded-[2rem] h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-violet-500/10 rounded-xl">
          <CalendarDays size={18} className="text-violet-400" />
        </div>
        <h3 className="text-base font-semibold tracking-tight text-white/90">5-Day Forecast</h3>
      </div>

      <div className="space-y-2">
        {entries.map(([day, dayData], index) => {
          const minTemp = Math.min(...dayData.temps)
          const maxTemp = Math.max(...dayData.temps)
          const weatherId = mode(dayData.weatherIds)
          const iconCode = dayData.icons[dayData.weatherIds.indexOf(weatherId)]

          const minDisplay = Math.round(minTemp)
          const maxDisplay = Math.round(maxTemp)

          // Proportional bar offsets
          const barLeft = ((minTemp - globalMin) / range) * 100
          const barWidth = ((maxTemp - minTemp) / range) * 100

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.015, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
              className="flex items-center justify-between p-3.5 rounded-2xl glass-dark border border-white/5 transition-all duration-200 gap-3"
            >
              {/* Day */}
              <span className="w-10 text-sm font-medium text-white/60 flex-shrink-0">
                {day}
              </span>

              {/* Icon */}
              <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                <WeatherIcon
                  weatherId={weatherId}
                  iconCode={iconCode}
                  className="w-full h-full"
                />
              </div>

              {/* Temp bar */}
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="text-xs text-white/30 w-7 text-right flex-shrink-0">{minDisplay}{unitSymbol}</span>
                <div className="relative flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-amber-400"
                    style={{ left: `${barLeft}%`, width: `${Math.max(barWidth, 8)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-white/80 w-7 flex-shrink-0">{maxDisplay}{unitSymbol}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
