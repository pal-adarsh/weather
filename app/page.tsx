'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import CurrentWeather from '../components/CurrentWeather'
import HourlyForecast from '../components/HourlyForecast'
import DailyForecast from '../components/DailyForecast'
import AdditionalInfo from '../components/AdditionalInfo'
import WeatherIcon from '../components/WeatherIcon'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import { fetchWeatherData } from '../lib/api'
import { WeatherData } from '../lib/types'

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState('')

  useEffect(() => {
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
            setError('Failed to fetch weather data')
          } finally {
            setLoading(false)
          }
        },
        () => {
          fetchDefaultLocation()
        }
      )
    } else {
      fetchDefaultLocation()
    }
  }, [unit])

  const fetchDefaultLocation = async () => {
    try {
      const data = await fetchWeatherData(51.5074, -0.1278, unit) // London as fallback
      setWeatherData(data)
      setLocation(`${data.current.name}, ${data.current.sys.country}`)
    } catch (err) {
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (searchLocation: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
      const data = await response.json()
      if (data.length > 0) {
        const weather = await fetchWeatherData(data[0].lat, data[0].lon, unit)
        setWeatherData(weather)
        setLocation(`${data[0].name}, ${data[0].country}`)
      } else {
        setError('Location not found')
      }
    } catch (err) {
      setError('Failed to fetch location')
    } finally {
      setLoading(false)
    }
  }

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric')
  }

  const refreshData = async () => {
    if (!weatherData) return
    setLoading(true)
    try {
      const data = await fetchWeatherData(
        weatherData.current.coord.lat,
        weatherData.current.coord.lon,
        unit
      )
      setWeatherData(data)
    } catch (err) {
      setError('Failed to refresh data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <div className="error-message">{error}</div>
  if (!weatherData) return <div>No weather data available</div>

  return (
    <div className="container">
      <Header 
        onSearch={handleSearch}
        onToggleUnit={toggleUnit}
        unit={unit}
        currentLocation={location}
      />
      
      <main>
        <CurrentWeather data={weatherData.current} unit={unit} />
        <HourlyForecast data={weatherData.hourly} unit={unit} />
        <AdditionalInfo 
          current={weatherData.current}
          unit={unit}
        />
        <DailyForecast data={weatherData.daily} unit={unit} />
        
      </main>

      <Footer onRefresh={refreshData} />
    </div>
  )
}