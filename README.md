# WeatherSphere ☀️🌧️❄️

A beautiful, responsive weather application built with Next.js 14, TypeScript, and Tailwind CSS. Get real-time weather forecasts for any location worldwide with animated weather icons and intuitive UI.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://weathersphere-demo.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

![WeatherSphere Screenshot](./public/screenshot.png)

## Features ✨

- 🌎 **Location-based weather** (auto-detects your location)
- 🔍 **Search any city worldwide**
- 📱 **Fully responsive design** (works on all devices)
- 🌡️ **Temperature unit toggle** (°C/°F)
- ⏳ **24-hour hourly forecast**
- 📅 **5-day daily forecast**
- 💨 **Detailed weather metrics** (wind, humidity, pressure, etc.)
- 🌈 **Animated weather icons** that reflect current conditions
- 🔄 **Refresh button** for updated data
- 🚀 **Blazing fast performance** with Next.js

## Technologies Used 🛠️

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (with custom animations)
- **Font Awesome** (for weather icons)
- **OpenWeatherMap API** (weather data)
- **Geolocation API** (for device location)

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- OpenWeatherMap API key ([get one here](https://openweathermap.org/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pal-adarsh/weather.git
   cd weathersphere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env.local file in the root directory and add your API key :
   ```bash
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open in your browser.
   ```bash
   http://localhost:3000
   ```




