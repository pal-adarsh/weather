'use client'

import { FaSyncAlt } from 'react-icons/fa'

interface FooterProps {
  onRefresh: () => void
}

export default function Footer({ onRefresh }: FooterProps) {
  return (
    <footer className="footer mt-8 py-4 px-6 bg-gray-100 dark:bg-gray-900 text-center text-sm text-gray-700 dark:text-gray-300 flex flex-col md:flex-row items-center justify-between gap-3 shadow-inner rounded-t-xl">
      <div>
        <p>
          Data provided by{' '}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            OpenWeather
          </a>
        </p>
      </div>
      <div>
         <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Made with <span className="text-pink-500">💖</span> by <strong>Adarsh Pal</strong>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          id="refresh-btn"
          onClick={onRefresh}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          <FaSyncAlt />
          Refresh
        </button>
       
      </div>
    </footer>
  )
}
