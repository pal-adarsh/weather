'use client'
import { useState } from 'react'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onSearch(searchInput)
    }
  }

  return (
    <header className="app-header">
      <h1>WeatherSphere</h1>
      <form onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          id="location-input"
          placeholder={currentLocation || "Search location..."}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" id="search-btn">
          <i className="fas fa-search"></i>
        </button>
        <button 
          type="button" 
          id="location-btn"
          onClick={() => navigator.geolocation?.getCurrentPosition(
            async (position) => {
              const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
              )
              const data = await response.json()
              if (data.length > 0) {
                onSearch(data[0].name)
              }
            }
          )}
        >
          <i className="fas fa-location-arrow"></i>
        </button>
      </form>
      <div className="unit-toggle">
        <button 
          id="celsius-btn" 
          className={unit === 'metric' ? 'active' : ''}
          onClick={() => unit !== 'metric' && onToggleUnit()}
        >
          °C
        </button>
        <button 
          id="fahrenheit-btn"
          className={unit === 'imperial' ? 'active' : ''}
          onClick={() => unit !== 'imperial' && onToggleUnit()}
        >
          °F
        </button>
      </div>
    </header>
  )
}