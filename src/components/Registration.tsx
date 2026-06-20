'use client'

import { useActionState, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { registerAgent } from '@/app/actions'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import CustomCalendar from './CustomCalendar'

const currentYear = new Date().getFullYear()
const recruitmentYears = Array.from(
  { length: currentYear - 1999 + 1 },
  (_, i) => 1999 + i
).reverse()

const initialState = { message: '', success: false }

export default function Registration() {
  const [state, formAction, pending] = useActionState(registerAgent, initialState)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const pickerRef = useRef<HTMLDivElement>(null)
  const [selectedBirthDate, setSelectedBirthDate] = useState('')

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section
      className="h-screen flex relative"
      style={{
        backgroundImage: "url('/images/newbg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      suppressHydrationWarning
    >
      <style>{`
        @media (max-width: 768px) {
          section {
            background-image: url('/images/bg_one.png') !important;
          }
        }
      `}</style>
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full h-full px-[10%] py-[10%] gap-4 relative">
        <div className="absolute top-6 right-[12%] flex flex-col items-center">
          <span className="font-courier font-normal italic text-[24px] text-[#1A1A1A]">
            1/3
          </span>
          <Image src="/images/number.png" alt="number" width={48} height={48} className="-mt-3" />
        </div>

        {/* reg1 image */}
        <div className="w-1/2 flex items-center justify-end">
          <Image
            src="/images/reg1.png"
            alt="NC ENUGU"
            width={200}
            height={784}
            style={{ height: '750px', width: 'auto' }}
            priority
          />
        </div>

        <div className="flex flex-col justify-center flex-1 relative">
          <Image
            src="/images/logo.png"
            alt="logo"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            className="pointer-events-none"
          />

          <div className="relative z-10 mb-5">
            <h2 className="text-[38px] font-courier font-bold text-[#1A1A1A] uppercase text-center">
              IDENTITY
            </h2>
          </div>

          <form action={formAction} className="space-y-4 relative z-10">
            <div>
              <label htmlFor="codename" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                What is your codename?
              </label>
              <input
                id="codename"
                type="text"
                name="codename"
                placeholder="Enter your alias"
                required
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                What is your direct line?
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="In case the crew needs to reach you..."
                required
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Where do we send the dossier?
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your classified inbox"
                required
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="birthYear" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                What year were you commissioned?
              </label>
              <input type="hidden" name="birthYear" value={selectedBirthDate} required />
              <CustomCalendar onDateSelect={setSelectedBirthDate} value={selectedBirthDate} minYear={1900} maxYear={2009} />
            </div>

            <div>
              <label className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                When were you first recruited?
              </label>
              <input type="hidden" name="recruitmentYear" value={selectedYear ?? ''} />
              <div ref={pickerRef} className="relative w-125">
                <button
                  type="button"
                  onClick={() => setPickerOpen((o) => !o)}
                  className="w-full border border-[#1A1A1A]/40 px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent"
                >
                  <span className={`${selectedYear ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'} whitespace-nowrap overflow-hidden text-ellipsis`}>
                    {selectedYear ?? 'Year recruited'}
                  </span>
                  {pickerOpen
                    ? <FaChevronUp size={12} className="text-[#1A1A1A]/40 shrink-0" />
                    : <FaChevronDown size={12} className="text-[#1A1A1A]/40 shrink-0" />
                  }
                </button>

                {pickerOpen && (
                  <div className="absolute z-20 top-full mt-1 w-full border border-[#1A1A1A]/20 bg-white shadow-lg max-h-52 overflow-y-auto">
                    <div className="flex flex-col">
                      {recruitmentYears.map((year) => (
                        <button
                          key={year}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault()
                            setSelectedYear(year)
                            setPickerOpen(false)
                          }}
                          className={`w-full py-2 px-3 text-sm font-tungsten font-normal text-left hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer
                            ${selectedYear === year ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'}`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="instagram" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Where can the crew find you?
              </label>
              <input
                id="instagram"
                type="text"
                name="instagram"
                placeholder="Instagram handle"
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            {state?.message && (
              <p className="text-sm text-[#1A1A1A] tracking-wide">{state.message}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={pending}
                className="w-25.5 py-3 bg-[#1A1A1A] text-[#FFFFFF] font-tungsten flex items-center justify-center gap-2 text-lg hover:opacity-80 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {pending ? 'Transmitting...' : 'Next'}
                <MdOutlineArrowForwardIos size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center justify-center w-full h-full px-4 py-8">
        <div className="relative w-full max-w-md">
          <Image
            src="/images/mbg_two.png"
            alt="mobile bg"
            width={600}
            height={700}
            priority
          />

          <div className="absolute inset-0 flex flex-col p-6 overflow-y-auto">
            <div className="relative flex flex-row items-start justify-center gap-2 mb-6">
              <h2 className="text-[24px] font-courier font-bold text-[#1A1A1A]">
                IDENTITY
              </h2>
              <div className="absolute right-0 flex flex-col items-center">
                <span className="font-courier font-normal italic text-[18px] text-[#1A1A1A]">
                  1/3
                </span>
                <Image src="/images/number.png" alt="number" width={48} height={48} className="-mt-1" />
              </div>
            </div>

            <form action={formAction} className="space-y-2 flex flex-col">
              <div>
                <label htmlFor="codename" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1 w-[300px] mx-auto">
                  What is your codename?
                </label>
                <input
                  id="codename"
                  type="text"
                  name="codename"
                  placeholder="Enter your alias"
                  required
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  What is your direct line?
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Contact"
                  required
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Where do we send the dossier?
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your email"
                  required
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="birthYear" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  What year were you commissioned?
                </label>
                <input type="hidden" name="birthYear" value={selectedBirthDate} required />
                <CustomCalendar onDateSelect={setSelectedBirthDate} value={selectedBirthDate} minYear={1900} maxYear={2009} />
              </div>

              <div>
                <label className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  When were you first recruited?
                </label>
                <input type="hidden" name="recruitmentYear" value={selectedYear ?? ''} />
                <div ref={pickerRef} className="relative w-[300px] mx-auto" style={{ zIndex: pickerOpen ? 50 : 'auto' }}>
                  <button
                    type="button"
                    onClick={() => setPickerOpen((o) => !o)}
                    className="w-full border border-[#1A1A1A] px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent"
                  >
                    <span className={`${selectedYear ? 'text-[#1A1A1A] text-sm' : 'text-[#1A1A1A]/40 text-sm'} whitespace-nowrap overflow-hidden text-ellipsis`}>
                      {selectedYear ?? 'Year'}
                    </span>
                    {pickerOpen
                      ? <FaChevronUp size={10} className="text-[#1A1A1A]/40 shrink-0" />
                      : <FaChevronDown size={10} className="text-[#1A1A1A]/40 shrink-0" />
                    }
                  </button>

                  {pickerOpen && (
                    <div className="fixed left-1/2 transform -translate-x-1/2 z-50 border border-[#1A1A1A] bg-white shadow-lg max-h-40 overflow-y-auto" style={{ width: '300px', top: '50%' }}>
                      <div className="flex flex-col">
                        {recruitmentYears.map((year) => (
                          <button
                            key={year}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault()
                              setSelectedYear(year)
                              setPickerOpen(false)
                            }}
                            className={`w-full py-2 px-3 text-sm font-tungsten font-normal text-left hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer
                              ${selectedYear === year ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'}`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="instagram" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Where can the crew find you?
                </label>
                <input
                  id="instagram"
                  type="text"
                  name="instagram"
                  placeholder="Instagram"
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {state?.message && (
                <p className="text-sm text-[#1A1A1A] tracking-wide">{state.message}</p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="mt-1 py-2 w-[300px] mx-auto bg-[#1A1A1A] text-[#FFFFFF] font-tungsten flex items-center justify-center gap-2 text-sm hover:opacity-80 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {pending ? 'Transmitting...' : 'Next'}
                <MdOutlineArrowForwardIos size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
