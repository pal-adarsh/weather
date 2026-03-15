'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import CurrentWeather from '../components/CurrentWeather'
import HourlyForecast from '../components/HourlyForecast'
import DailyForecast from '../components/DailyForecast'
import AdditionalInfo from '../components/AdditionalInfo'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import { fetchWeatherData, sanitizeLocation } from '../lib/api'
import { WeatherData } from '../lib/types'

// Client-side rate limiter: max 5 searches per 10 seconds
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10_000

function useRateLimiter() {
  const timestamps = useRef<number[]>([])

  return useCallback(() => {
    const now = Date.now()
    timestamps.current = timestamps.current.filter(t => now - t < RATE_WINDOW_MS)
    if (timestamps.current.length >= RATE_LIMIT) {
      return false
    }
    timestamps.current.push(now)
    return true
  }, [])
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState('')
  const checkRateLimit = useRateLimiter()

  const fetchDefaultLocation = useCallback(async () => {
    try {
      const data = await fetchWeatherData(51.5074, -0.1278, unit) // London fallback
      setWeatherData(data)
      setLocation(`${data.current.name}, ${data.current.sys.country}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch weather data'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [unit])

  useEffect(() => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchWeatherData(
              position.coords.latitude,
              position.coords.longitude,
              unit
            )
            setWeatherData(data)
            setLocation(`${data.current.name}, ${data.current.sys.country}`)
          } catch (err) {
            const msg = err instanceof Error ? err.message : 'Failed to fetch weather data'
            setError(msg)
          } finally {
            setLoading(false)
          }
        },
        () => fetchDefaultLocation()
      )
    } else {
      fetchDefaultLocation()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit])

  const handleSearch = async (rawInput: string) => {
    // Rate limit check
    if (!checkRateLimit()) {
      setError('Too many requests — please wait a moment before searching again.')
      return
    }

    // Sanitize input
    const searchLocation = sanitizeLocation(rawInput)
    if (!searchLocation || searchLocation.length < 2) {
      setError('Please enter a valid city name (at least 2 characters).')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchLocation)}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
      if (!response.ok) {
        throw new Error(`Geocoding error (${response.status})`)
      }
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        const weather = await fetchWeatherData(data[0].lat, data[0].lon, unit)
        setWeatherData(weather)
        setLocation(`${data[0].name}, ${data[0].country}`)
      } else {
        setError(`Location "${searchLocation}" not found. Try a different spelling.`)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch location data'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric')
  }

  const refreshData = async () => {
    if (!weatherData) return
    if (!checkRateLimit()) {
      setError('Too many requests — please wait a moment.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherData(
        weatherData.current.coord.lat,
        weatherData.current.coord.lon,
        unit
      )
      setWeatherData(data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to refresh data'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  if (error) return (
    <div className="min-h-screen bg-[#080b14] flex items-center justify-center p-4">
      <div className="glass p-8 rounded-[2rem] max-w-sm w-full text-center space-y-4 border border-white/5">
        <div className="text-5xl">⚠️</div>
        <h2 className="text-white/80 font-semibold text-lg">Something went wrong</h2>
        <p className="text-white/50 text-sm leading-relaxed">{error}</p>
        <button
          onClick={() => { setError(null); setLoading(true); fetchDefaultLocation() }}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm rounded-xl transition-all duration-200 font-medium shadow-lg shadow-blue-500/20"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  if (!weatherData) return null

  return (
    <div className="min-h-screen bg-[#080b14] text-white relative overflow-hidden">
      <div className="bg-mesh" />
      <div className="ambient-light left-[-15%] top-[-15%] opacity-60" />
      <div className="ambient-light right-[-15%] bottom-[-20%] opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <Header
          onSearch={handleSearch}
          onToggleUnit={toggleUnit}
          unit={unit}
          currentLocation={location}
        />

        <main className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-6">
                <CurrentWeather data={weatherData.current} unit={unit} />
                <HourlyForecast data={weatherData.hourly} unit={unit} />
                <AdditionalInfo current={weatherData.current} unit={unit} />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4">
                <DailyForecast data={weatherData.daily} unit={unit} />
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onRefresh={refreshData} />
      </div>
    </div>
  )
}
