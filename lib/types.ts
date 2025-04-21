export interface WeatherCondition {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface CurrentWeatherData {
    coord: {
      lon: number
      lat: number
    }
    weather: WeatherCondition[]
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    visibility: number
    wind: {
      speed: number
      deg: number
    }
    rain?: {
      '1h': number
    }
    snow?: {
      '1h': number
    }
    clouds: {
      all: number
    }
    dt: number
    sys: {
      type: number
      id: number
      country: string
      sunrise: number
      sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
  }
  
  export interface HourlyForecastData {
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    weather: WeatherCondition[]
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
    }
    visibility: number
    pop: number
    rain?: {
      '3h': number
    }
    snow?: {
      '3h': number
    }
    dt_txt: string
  }
  
  export interface DailyForecastData {
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    weather: WeatherCondition[]
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
    }
    visibility: number
    pop: number
    rain?: {
      '3h': number
    }
    snow?: {
      '3h': number
    }
    dt_txt: string
  }
  
  export interface WeatherData {
    current: CurrentWeatherData
    hourly: HourlyForecastData[]
    daily: DailyForecastData[]
  }