'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBolt, 
  faCloudRain,
  faIcicles,
  faCloudShowersHeavy,
  faUmbrella,
  faSnowflake,
  faSmog,
  faMoon,
  faSun,
  faCloudSun,
  faCloud,
  faQuestion
} from '@fortawesome/free-solid-svg-icons'

interface WeatherIconProps {
  weatherId: number
  iconCode: string
  className?: string
}

export default function WeatherIcon({ weatherId, iconCode, className = '' }: WeatherIconProps) {
  let icon = faQuestion
  
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    icon = faBolt
  } 
  // Drizzle
  else if (weatherId >= 300 && weatherId < 400) {
    icon = faCloudRain
  } 
  // Rain
  else if (weatherId >= 500 && weatherId < 600) {
    if (weatherId === 511) {
      icon = faIcicles
    } else if (weatherId >= 520 && weatherId <= 531) {
      icon = faCloudShowersHeavy
    } else {
      icon = faUmbrella
    }
  } 
  // Snow
  else if (weatherId >= 600 && weatherId < 700) {
    icon = faSnowflake
  } 
  // Atmosphere
  else if (weatherId >= 700 && weatherId < 800) {
    icon = faSmog
  } 
  // Clear
  else if (weatherId === 800) {
    icon = iconCode.includes('n') ? faMoon : faSun
  } 
  // Clouds
  else if (weatherId > 800 && weatherId < 900) {
    icon = (weatherId === 801 || weatherId === 802) ? faCloudSun : faCloud
  }

  const animationClass = 
    weatherId >= 200 && weatherId < 300 ? 'thunder' :
    weatherId >= 300 && weatherId < 600 ? 'rainy' :
    weatherId === 800 && !iconCode.includes('n') ? 'sunny' :
    weatherId > 800 && weatherId < 900 ? 'cloudy' : ''

  return (
    <div className={`weather-icon ${className} ${animationClass}`}>
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}