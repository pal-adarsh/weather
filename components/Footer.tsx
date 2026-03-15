'use client'

import { motion } from 'framer-motion'
import { RefreshCw, Wind, ExternalLink } from 'lucide-react'

interface FooterProps {
  onRefresh: () => void
}

export default function Footer({ onRefresh }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      {/* Attribution */}
      <div className="flex items-center gap-1.5 text-xs text-white/25 font-light">
        <Wind size={12} className="text-white/20" />
        <span>Data by</span>
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400/60 hover:text-blue-400 transition-colors underline-offset-2 hover:underline inline-flex items-center gap-0.5"
        >
          OpenWeatherMap
          <ExternalLink size={10} />
        </a>
      </div>

      {/* Credit */}
      <p className="text-xs text-white/20 font-light">
        Made with <span className="text-rose-400">♥</span> by{' '}
        <span className="text-white/40 font-medium">Adarsh Pal</span>
      </p>

      {/* Refresh */}
      <button
        id="refresh-btn"
        onClick={onRefresh}
        className="flex items-center gap-2 px-4 py-2 glass-dark rounded-xl border border-white/8 text-xs text-white/50 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/8 transition-all duration-200 group"
      >
        <RefreshCw size={13} className="group-hover:rotate-180 transition-transform duration-500" />
        Refresh Data
      </button>
    </motion.footer>
  )
}
