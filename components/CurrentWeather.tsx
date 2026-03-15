'use client'

import { CurrentWeatherData } from '../lib/types'
import { motion } from 'framer-motion'
import { MapPin, Thermometer, Droplets } from 'lucide-react'
import WeatherIcon from './WeatherIcon'

interface CurrentWeatherProps {
  data: CurrentWeatherData
  unit: 'metric' | 'imperial'
}

const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

// Returns a tailwind gradient class based on weather condition
const getWeatherGradient = (weatherId: number, isNight: boolean): string => {
  if (isNight) return 'from-indigo-950/60 via-slate-900/40 to-transparent'
  if (weatherId >= 200 && weatherId < 300) return 'from-slate-900/80 via-purple-900/30 to-transparent'
  if (weatherId >= 300 && weatherId < 600) return 'from-slate-900/60 via-blue-900/30 to-transparent'
  if (weatherId >= 600 && weatherId < 700) return 'from-slate-800/60 via-blue-100/5 to-transparent'
  if (weatherId >= 700 && weatherId < 800) return 'from-slate-900/60 via-gray-700/20 to-transparent'
  if (weatherId === 800) return 'from-sky-900/60 via-amber-900/20 to-transparent'
  return 'from-slate-900/60 via-blue-900/20 to-transparent'
}

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const temp = Math.round(data.main.temp)
  const feelsLike = Math.round(data.main.feels_like)
  const tempMax = Math.round(data.main.temp_max)
  const tempMin = Math.round(data.main.temp_min)
  const unitSymbol = unit === 'metric' ? '°C' : '°F'
  const currentDate = formatDate(data.dt)
  const iconCode = data.weather[0].icon
  const isNight = iconCode.includes('n')
  const gradient = getWeatherGradient(data.weather[0].id, isNight)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass p-8 rounded-[2rem] relative overflow-hidden min-h-[360px] flex flex-col justify-between"
    >
      {/* Gradient overlay based on weather */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`} />

      {/* Decorative blurred orb */}
      <div className="absolute top-[-30%] right-[-15%] w-72 h-72 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Top Row */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-400 flex-shrink-0" />
            <h2 className="text-lg font-semibold tracking-tight text-white/90">
              {data.name}, {data.sys.country}
            </h2>
          </div>
          <p className="text-sm font-light text-white/40 pl-6">{currentDate}</p>
        </div>

        <div className="glass-dark px-4 py-2 rounded-full border border-white/8">
          <span className="text-sm font-medium text-blue-300 capitalize">
            {data.weather[0].description}
          </span>
        </div>
      </div>

      {/* Bottom Row: Temperature + Icon + Stats */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 pt-8">

        {/* Weather Icon */}
        <div className="w-24 h-24 flex-shrink-0">
          <WeatherIcon
            weatherId={data.weather[0].id}
            iconCode={iconCode}
            className="w-full h-full"
          />
        </div>

        {/* Temperature */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-start leading-none">
            <span className="text-[6rem] font-extrabold tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              {temp}
            </span>
            <span className="text-3xl font-light text-white/40 mt-4 ml-1">{unitSymbol}</span>
          </div>
          <p className="text-sm text-white/30 font-light mt-1">
            H:{tempMax}° &nbsp; L:{tempMin}°
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
          <div className="glass-dark p-4 rounded-2xl flex items-center gap-3 border border-white/5 min-w-[130px]">
            <div className="p-2 bg-orange-500/10 rounded-xl flex-shrink-0">
              <Thermometer size={18} className="text-orange-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-0.5">Feels Like</p>
              <p className="text-base font-semibold text-white">{feelsLike}{unitSymbol[0]}</p>
            </div>
          </div>
          <div className="glass-dark p-4 rounded-2xl flex items-center gap-3 border border-white/5 min-w-[130px]">
            <div className="p-2 bg-blue-500/10 rounded-xl flex-shrink-0">
              <Droplets size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-0.5">Humidity</p>
              <p className="text-base font-semibold text-white">{data.main.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
