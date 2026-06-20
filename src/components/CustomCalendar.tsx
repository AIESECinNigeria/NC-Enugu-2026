'use client'

import { useState, useRef, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface CustomCalendarProps {
  onDateSelect: (date: string) => void
  value?: string
  minYear?: number
  maxYear?: number
}

export default function CustomCalendar({ onDateSelect, value, minYear = 1900, maxYear = 2026 }: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'calendar' | 'month' | 'year'>('calendar')
  const containerRef = useRef<HTMLDivElement>(null)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const days: (number | null)[] = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectMonth = (month: number) => {
    setCurrentDate(new Date(currentYear, month, 1))
    setStep('calendar')
  }

  const handleSelectYear = (year: number) => {
    setCurrentDate(new Date(year, currentMonth, 1))
    setStep('calendar')
  }

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day)
    const dateString = selectedDate.toISOString().split('T')[0]
    onDateSelect(dateString)
    setIsOpen(false)
    setStep('calendar')
  }

  const handleMonthClick = () => {
    setStep('month')
  }

  const handleYearClick = () => {
    setStep('year')
  }

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).reverse()

  const displayDate = value ? new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select date'

  return (
    <div ref={containerRef} className="relative w-[300px] mx-auto md:w-125 md:mx-0">
      {/* Input Field */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A]/40 px-3 py-2 text-sm font-bold text-left hover:bg-[#1A1A1A]/5 font-tungsten transition-colors"
      >
        {displayDate}
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-1 bg-white border border-[#1A1A1A]/40 shadow-lg z-50 p-2" style={{ width: '250px', maxHeight: '250px', overflowY: 'auto' }}>
          {/* Calendar View */}
          {step === 'calendar' && (
            <div>
              {/* Month/Year Header */}
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))}
                  className="p-1 hover:bg-[#1A1A1A]/10 transition-colors"
                >
                  <FaChevronLeft size={10} className="text-[#1A1A1A]" />
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleMonthClick}
                    className="text-[#1A1A1A] font-courier font-bold hover:bg-[#1A1A1A]/10 px-1 py-0 text-xs"
                  >
                    {monthNames[currentMonth]}
                  </button>
                  <button
                    type="button"
                    onClick={handleYearClick}
                    className="text-[#1A1A1A] font-courier font-bold hover:bg-[#1A1A1A]/10 px-1 py-0 text-xs"
                  >
                    {currentYear}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))}
                  className="p-1 hover:bg-[#1A1A1A]/10 transition-colors"
                >
                  <FaChevronRight size={10} className="text-[#1A1A1A]" />
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-[10px] font-courier font-bold text-[#1A1A1A]/60 h-4 flex items-center justify-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0.5">
                {days.map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => day && handleSelectDay(day)}
                    disabled={!day}
                    className={`aspect-square text-[10px] font-courier font-bold transition-colors flex items-center justify-center ${
                      !day
                        ? 'cursor-default'
                        : `text-[#1A1A1A] border border-[#1A1A1A]/40 hover:bg-[#1A1A1A]/20 ${
                            value && new Date(value).getDate() === day && new Date(value).getMonth() === currentMonth && new Date(value).getFullYear() === currentYear
                              ? 'bg-[#AB1212] text-white border-[#AB1212]'
                              : ''
                          }`
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Month Picker */}
          {step === 'month' && (
            <div>
              <h3 className="text-xs font-courier font-bold text-[#1A1A1A] mb-2">Select Month</h3>
              <div className="grid grid-cols-3 gap-1">
                {monthNames.map((month, index) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => handleSelectMonth(index)}
                    className={`py-1 text-[10px] font-courier font-bold transition-colors border ${
                      currentMonth === index
                        ? 'bg-[#AB1212] text-white border-[#AB1212]'
                        : 'text-[#1A1A1A] border-[#1A1A1A]/40 hover:bg-[#1A1A1A]/10'
                    }`}
                  >
                    {month.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Year Picker */}
          {step === 'year' && (
            <div>
              <h3 className="text-xs font-courier font-bold text-[#1A1A1A] mb-2">Select Year</h3>
              <div className="grid grid-cols-4 gap-1 max-h-32 overflow-y-auto">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleSelectYear(year)}
                    className={`py-1 text-[10px] font-courier font-bold transition-colors border ${
                      currentYear === year
                        ? 'bg-[#AB1212] text-white border-[#AB1212]'
                        : 'text-[#1A1A1A] border-[#1A1A1A]/40 hover:bg-[#1A1A1A]/10'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
