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
import { cn } from '../lib/utils'

interface WeatherIconProps {
  weatherId: number
  iconCode: string
  className?: string
}

export default function WeatherIcon({ weatherId, iconCode, className = '' }: WeatherIconProps) {
  const isNight = iconCode.includes('n')
  let icon = faQuestion
  let animClass = ''

  // Thunderstorm (200–299)
  if (weatherId >= 200 && weatherId < 300) {
    icon = faBolt
    animClass = 'thunder'
  }
  // Drizzle (300–399)
  else if (weatherId >= 300 && weatherId < 400) {
    icon = faCloudRain
    animClass = 'rainy'
  }
  // Rain (500–599)
  else if (weatherId >= 500 && weatherId < 600) {
    icon = weatherId === 511 ? faIcicles : (weatherId >= 520 ? faCloudShowersHeavy : faUmbrella)
    animClass = 'rainy'
  }
  // Snow (600–699)
  else if (weatherId >= 600 && weatherId < 700) {
    icon = faSnowflake
    animClass = 'snowy'
  }
  // Atmosphere (700–799)
  else if (weatherId >= 700 && weatherId < 800) {
    icon = faSmog
    animClass = 'cloudy'
  }
  // Clear (800)
  else if (weatherId === 800) {
    icon = isNight ? faMoon : faSun
    animClass = isNight ? 'moon' : 'sunny'
  }
  // Clouds (801–899)
  else if (weatherId > 800 && weatherId < 900) {
    icon = (weatherId === 801 || weatherId === 802) ? faCloudSun : faCloud
    animClass = 'cloudy'
  }

  return (
    <div className={cn('weather-icon', animClass, className)}>
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}