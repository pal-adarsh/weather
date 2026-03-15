'use client'

import { HourlyForecastData } from '../lib/types'
import { motion } from 'framer-motion'
import { Clock, Droplets } from 'lucide-react'
import WeatherIcon from './WeatherIcon'

interface HourlyForecastProps {
  data: HourlyForecastData[]
  unit: 'metric' | 'imperial'
}

const formatHour = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  if (hours === 0) return '12 AM'
  if (hours === 12) return '12 PM'
  return hours < 12 ? `${hours} AM` : `${hours - 12} PM`
}

export default function HourlyForecast({ data, unit }: HourlyForecastProps) {
  const unitSymbol = unit === 'metric' ? '°' : '°'

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass p-6 sm:p-8 rounded-[2rem] overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/10 rounded-xl">
          <Clock size={18} className="text-indigo-400" />
        </div>
        <h3 className="text-base font-semibold tracking-tight text-white/90">Hourly Forecast</h3>
        <span className="ml-auto text-xs text-white/25 font-light">Next 36h</span>
      </div>

      <div className="flex overflow-x-auto pb-3 gap-3 no-scrollbar snap-x snap-mandatory">
        {data.slice(0, 12).map((hour, index) => {
          const time = formatHour(hour.dt)
          const temp = Math.round(hour.main.temp)
          const isNow = index === 0
          const pop = Math.round((hour.pop ?? 0) * 100)

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className={`flex-shrink-0 w-[80px] snap-center rounded-2xl p-3 flex flex-col items-center gap-2 border transition-all duration-200 cursor-default ${
                isNow
                  ? 'bg-gradient-to-b from-blue-600/25 to-indigo-600/10 border-blue-500/30'
                  : 'glass-dark border-white/5 hover:border-white/10'
              }`}
            >
              <p className={`text-[11px] font-medium ${isNow ? 'text-blue-300' : 'text-white/40'}`}>
                {isNow ? 'Now' : time}
              </p>
              <div className="w-9 h-9">
                <WeatherIcon
                  weatherId={hour.weather[0].id}
                  iconCode={hour.weather[0].icon}
                  className="w-full h-full"
                />
              </div>
              <p className="text-sm font-semibold text-white">
                {temp}{unitSymbol}
              </p>
              {pop > 0 && (
                <div className="flex items-center gap-0.5">
                  <Droplets size={9} className="text-blue-400" />
                  <span className="text-[9px] text-blue-300/80">{pop}%</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
