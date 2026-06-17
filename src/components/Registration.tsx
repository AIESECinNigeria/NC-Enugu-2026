'use client'

import { useActionState, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { registerAgent } from '@/app/actions'
import { GrPrevious } from 'react-icons/gr'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const currentYear = new Date().getFullYear()
const recruitmentYears = Array.from(
  { length: currentYear - 1999 + 1 },
  (_, i) => 1999 + i
)

const initialState = { message: '', success: false }

export default function Registration() {
  const [state, formAction, pending] = useActionState(registerAgent, initialState)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

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
    >
      <div className="absolute top-6 right-[12%] flex flex-col items-center">
        <span className="font-courier font-normal italic text-[24px] text-[#1A1A1A]">
          1/3
        </span>
        <Image src="/images/number.png" alt="number" width={48} height={48} className="-mt-3" />
      </div>

      <div className="flex w-full h-full px-[10%] py-[10%] gap-4">

        {/* reg1 image — right edge lands at page center */}
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
              <input
                id="birthYear"
                type="number"
                name="birthYear"
                placeholder="Input birth year"
                min={1900}
                max={2026}
                required
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Custom year picker */}
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
                  <span className={selectedYear ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'}>
                    {selectedYear ?? 'Input Year of AIESEC recruitment'}
                  </span>
                  {pickerOpen
                    ? <FaChevronUp size={12} className="text-[#1A1A1A]/40 shrink-0" />
                    : <FaChevronDown size={12} className="text-[#1A1A1A]/40 shrink-0" />
                  }
                </button>

                {pickerOpen && (
                  <div className="absolute z-20 top-full mt-1 w-full border border-[#1A1A1A]/20 bg-white shadow-lg max-h-52 overflow-y-auto">
                    <div className="grid grid-cols-4">
                      {recruitmentYears.map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => {
                            setSelectedYear(year)
                            setPickerOpen(false)
                          }}
                          className={`py-2 text-sm font-tungsten font-normal text-center hover:bg-[#1A1A1A] hover:text-white transition-colors
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
                type="button"
                className="px-5 py-3 border border-[#1A1A1A]/40 text-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
              >
                <GrPrevious size={18} />
              </button>

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
          </div>{/* end form column */}
      </div>{/* end outer container */}
    </section>
  )
}
