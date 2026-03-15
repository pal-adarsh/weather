'use client'

import { CurrentWeatherData } from '../lib/types'
import { motion } from 'framer-motion'
import { Wind, Droplets, Gauge, Sunrise, Sunset, Eye, Compass } from 'lucide-react'

interface AdditionalInfoProps {
  current: CurrentWeatherData
  unit: 'metric' | 'imperial'
}

const getWindDirection = (deg: number) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

export default function AdditionalInfo({ current, unit }: AdditionalInfoProps) {
  // API already returns units-appropriate wind speed;
  // metric = m/s → convert to km/h; imperial = mph (keep as is)
  const windSpeed = unit === 'metric'
    ? Math.round(current.wind.speed * 3.6)
    : Math.round(current.wind.speed)
  const windUnit = unit === 'metric' ? 'km/h' : 'mph'
  const windDir = getWindDirection(current.wind.deg)

  const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
  const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  const details = [
    {
      label: 'Wind Speed',
      value: windSpeed,
      unit: windUnit,
      sub: windDir,
      icon: <Wind size={20} />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      ring: 'ring-blue-500/20',
    },
    {
      label: 'Humidity',
      value: current.main.humidity,
      unit: '%',
      sub: current.main.humidity > 70 ? 'High' : current.main.humidity < 30 ? 'Low' : 'Normal',
      icon: <Droplets size={20} />,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      ring: 'ring-cyan-500/20',
    },
    {
      label: 'Pressure',
      value: current.main.pressure,
      unit: 'hPa',
      sub: current.main.pressure > 1020 ? 'High' : current.main.pressure < 1000 ? 'Low' : 'Normal',
      icon: <Gauge size={20} />,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      ring: 'ring-violet-500/20',
    },
    {
      label: 'Visibility',
      value: (current.visibility / 1000).toFixed(1),
      unit: 'km',
      sub: current.visibility >= 10000 ? 'Clear' : current.visibility >= 5000 ? 'Moderate' : 'Poor',
      icon: <Eye size={20} />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      ring: 'ring-emerald-500/20',
    },
    {
      label: 'Sunrise',
      value: sunrise,
      unit: '',
      sub: 'Dawn',
      icon: <Sunrise size={20} />,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      ring: 'ring-amber-500/20',
    },
    {
      label: 'Sunset',
      value: sunset,
      unit: '',
      sub: 'Dusk',
      icon: <Sunset size={20} />,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      ring: 'ring-rose-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {details.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.07, duration: 0.4 }}
          whileHover={{ y: -5 }}
          className="glass p-5 rounded-[1.75rem] border border-white/5 flex flex-col justify-between min-h-[150px] transition-all duration-200 group cursor-default"
        >
          {/* Icon */}
          <div className={`${item.bg} ${item.color} p-3 rounded-2xl w-fit transition-all duration-300 group-hover:ring-2 ${item.ring}`}>
            {item.icon}
          </div>

          {/* Value */}
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-medium">
              {item.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{item.value}</span>
              <span className="text-xs text-white/30 font-light">{item.unit}</span>
            </div>
            {item.sub && (
              <p className={`text-xs mt-0.5 ${item.color} opacity-70`}>{item.sub}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
