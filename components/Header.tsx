'use client'

import { useState, FormEvent, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Navigation2, Thermometer } from 'lucide-react'
import { cn } from '../lib/utils'

interface HeaderProps {
  onSearch: (location: string) => void
  onToggleUnit: () => void
  unit: 'metric' | 'imperial'
  currentLocation: string
}

export default function Header({ 
  onSearch, 
  onToggleUnit, 
  unit,
  currentLocation
}: HeaderProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onSearch(searchInput.trim())
      setSearchInput('')
    }
  }

  const handleLocationClick = () => {
    if (!navigator.geolocation) return
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
          )
          const data = await response.json()
          if (data.length > 0) onSearch(data[0].name)
        } finally {
          setIsLocating(false)
        }
      },
      () => setIsLocating(false)
    )
  }

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-50">
      {/* Brand */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-1.5 w-full md:w-auto"
      >
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Thermometer size={16} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white/60 bg-clip-text text-transparent">
              WeatherSphere
            </span>
          </h1>
        </div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentLocation}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5"
          >
            <MapPin size={12} className="text-blue-400 flex-shrink-0" />
            <span className="text-xs font-light text-white/40 tracking-wide truncate max-w-[240px]">
              {currentLocation || 'Detecting your location…'}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end"
      >
        {/* Search */}
        <form 
          onSubmit={handleSubmit}
          className={cn(
            "relative flex items-center glass-dark rounded-2xl transition-all duration-300 w-full xs:w-[300px] px-4 py-2.5 gap-2",
            isFocused 
              ? "border border-blue-500/40 shadow-[0_0_0_4px_rgba(59,130,246,0.08)]" 
              : "border border-white/5"
          )}
        >
          <Search size={16} className={cn("flex-shrink-0 transition-colors duration-200", isFocused ? "text-blue-400" : "text-white/20")} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search any city…"
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full font-light"
            value={searchInput}
            maxLength={100}
            autoComplete="off"
            spellCheck={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button 
            type="button"
            onClick={handleLocationClick}
            title="Use my location"
            className="p-1.5 hover:bg-white/8 rounded-lg transition-colors flex-shrink-0"
          >
            <Navigation2 
              size={15} 
              className={cn("transition-all duration-300", isLocating ? "text-blue-400 animate-pulse" : "text-white/30 hover:text-white/60")} 
            />
          </button>
        </form>

        {/* Unit Toggle */}
        <div className="flex items-center glass-dark p-1 rounded-2xl border border-white/5">
          {(['metric', 'imperial'] as const).map((u) => (
            <button
              key={u}
              onClick={() => u !== unit && onToggleUnit()}
              className={cn(
                "px-4 py-1.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300",
                unit === u 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-white/30 hover:text-white/60"
              )}
            >
              {u === 'metric' ? '°C' : '°F'}
            </button>
          ))}
        </div>
      </motion.div>
    </header>
  )
}
