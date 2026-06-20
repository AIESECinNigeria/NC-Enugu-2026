'use client'

import { useActionState, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { registerAgentStep3 } from '@/app/actions'
import { GrPrevious } from 'react-icons/gr'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const conferenceOptions = ['Yes', 'No']

const initialState = { message: '', success: false }

const dropdownClass = 'w-full border border-[#1A1A1A]/40 px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent'
const dropdownClassMobile = 'w-full border border-[#1A1A1A]/40 px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent'
const dropdownPanelClass = 'absolute z-20 top-full mt-1 w-full border border-[#1A1A1A]/20 bg-white shadow-lg max-h-52 overflow-y-auto'
const optionClass = (selected: boolean) => `w-full px-3 py-2 text-left text-sm font-tungsten font-normal hover:bg-[#1A1A1A] hover:text-white transition-colors ${selected ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'}`
const optionClassMobile = (selected: boolean) => `w-full px-3 py-2 text-left text-sm font-tungsten font-normal hover:bg-[#1A1A1A] hover:text-white transition-colors ${selected ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'}`

interface Step3InitialData {
  allergies?: string
  countermeasures?: string
  coEd?: string
  emergencyContact?: string
  relationship?: string
  directLine?: string
}

export default function RegistrationStep3({ initialData }: { initialData?: Step3InitialData }) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(registerAgentStep3, initialState)

  const [confOpen, setConfOpen] = useState(false)
  const [selectedConf, setSelectedConf] = useState(initialData?.coEd || '')
  const confRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (confRef.current && !confRef.current.contains(e.target as Node)) setConfOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          section {
            background-image: url('/images/bg_one.png') !important;
          }
        }
      `}</style>
      <section
        className="h-screen flex relative"
        style={{
          backgroundImage: "url('/images/newbg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full h-full px-[10%] py-[10%] gap-4 relative">
        <div className="absolute top-6 right-[12%] flex flex-col items-center">
          <span className="font-courier font-normal italic text-[24px] text-[#1A1A1A]">
            3/3
          </span>
          <Image src="/images/number.png" alt="number" width={48} height={48} className="-mt-3" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <Image
            src="/images/reg3.png"
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
              OPERATIVE WELFARE
            </h2>
          </div>

          <form action={formAction} className="space-y-4 relative z-10">

            {/* Allergies text input */}
            <div>
              <label htmlFor="allergies" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Any allergies that compromise the operative?
              </label>
              <input
                id="allergies"
                type="text"
                name="allergies"
                defaultValue={initialData?.allergies || ''}
                placeholder="Anything the crew should know..."
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            {/* Countermeasures text input */}
            <div>
              <label htmlFor="countermeasures" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                What countermeasures must be on hand?
              </label>
              <input
                id="countermeasures"
                type="text"
                name="countermeasures"
                defaultValue={initialData?.countermeasures || ''}
                placeholder="Drugs, remedies, etc..."
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            {/* Co-ed dropdown */}
            <div>
              <label className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Are you cleared for co-ed quarters?
              </label>
              <input type="hidden" name="coEd" value={selectedConf} />
              <div ref={confRef} className="relative w-125">
                <button type="button" onClick={() => setConfOpen((o) => !o)} className={dropdownClass}>
                  <span className={selectedConf ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'}>
                    {selectedConf || 'Would you stay with the opposite sex?'}
                  </span>
                  {confOpen ? <FaChevronUp size={12} className="text-[#1A1A1A]/40 shrink-0" /> : <FaChevronDown size={12} className="text-[#1A1A1A]/40 shrink-0" />}
                </button>
                {confOpen && (
                  <div className={dropdownPanelClass}>
                    {conferenceOptions.map((opt) => (
                      <button key={opt} type="button" onMouseDown={(e) => { e.preventDefault(); setSelectedConf(opt); setConfOpen(false) }} className={optionClass(selectedConf === opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Emergency contact */}
            <div>
              <label htmlFor="purpose" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Who do we contact if the operation goes sideways?
              </label>
              <input
                id="purpose"
                type="text"
                name="purpose"
                defaultValue={initialData?.emergencyContact || ''}
                placeholder="Next of kin"
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            {/* Relationship */}
            <div>
              <label htmlFor="notes" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Their connection to you
              </label>
              <input
                id="notes"
                type="text"
                name="notes"
                defaultValue={initialData?.relationship || ''}
                placeholder="Relationship"
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="directLine" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Their direct line
              </label>
              <input
                id="directLine"
                type="tel"
                name="directLine"
                defaultValue={initialData?.directLine || ''}
                placeholder="In case we need to make the call"
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            {state?.message && (
              <p className="text-sm text-[#1A1A1A] tracking-wide">{state.message}</p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push('/step2')}
                className="px-5 py-3 border border-[#1A1A1A]/40 text-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
              >
                <GrPrevious size={18} />
              </button>

              <button
                type="submit"
                disabled={pending}
                className="w-25.5 py-3 bg-[#1A1A1A] text-[#FFFFFF] font-tungsten flex items-center justify-center gap-2 text-lg hover:opacity-80 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {pending ? 'Transmitting...' : 'Submit'}
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
                OPERATIVE WELFARE
              </h2>
              <div className="absolute right-0 flex flex-col items-center">
                <span className="font-courier font-normal italic text-[18px] text-[#1A1A1A]">
                  3/3
                </span>
                <Image src="/images/number.png" alt="number" width={48} height={48} className="-mt-1" />
              </div>
            </div>

            <form action={formAction} className="space-y-2 flex flex-col">
              {/* Allergies text input */}
              <div>
                <label htmlFor="allergies" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Any allergies that compromise the operative?
                </label>
                <input
                  id="allergies"
                  type="text"
                  name="allergies"
                  defaultValue={initialData?.allergies || ''}
                  placeholder="Any allergies..."
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {/* Countermeasures text input */}
              <div>
                <label htmlFor="countermeasures" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  What countermeasures must be on hand?
                </label>
                <input
                  id="countermeasures"
                  type="text"
                  name="countermeasures"
                  defaultValue={initialData?.countermeasures || ''}
                  placeholder="Drugs, remedies..."
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {/* Co-ed dropdown */}
              <div>
                <label className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Are you cleared for co-ed quarters?
                </label>
                <input type="hidden" name="coEd" value={selectedConf} />
                <div ref={confRef} className="relative w-[300px] mx-auto">
                  <button type="button" onClick={() => setConfOpen((o) => !o)} className="w-full border border-[#1A1A1A] px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent">
                    <span className={selectedConf ? 'text-[#1A1A1A] text-sm' : 'text-[#1A1A1A]/40 text-sm'}>
                      {selectedConf || 'Would you stay with the opposite sex?'}
                    </span>
                    {confOpen ? <FaChevronUp size={10} className="text-[#1A1A1A]/40 shrink-0" /> : <FaChevronDown size={10} className="text-[#1A1A1A]/40 shrink-0" />}
                  </button>
                  {confOpen && (
                    <div className="absolute z-20 top-full mt-1 w-full border border-[#1A1A1A] bg-white shadow-lg max-h-40 overflow-y-auto">
                      {conferenceOptions.map((opt) => (
                        <button key={opt} type="button" onClick={() => { setSelectedConf(opt); setConfOpen(false) }} className={optionClassMobile(selectedConf === opt)}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Emergency contact */}
              <div>
                <label htmlFor="purpose" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Who do we contact if the operation goes sideways?
                </label>
                <input
                  id="purpose"
                  type="text"
                  name="purpose"
                  defaultValue={initialData?.emergencyContact || ''}
                  placeholder="Next of kin"
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {/* Relationship */}
              <div>
                <label htmlFor="notes" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Their connection to you
                </label>
                <input
                  id="notes"
                  type="text"
                  name="notes"
                  defaultValue={initialData?.relationship || ''}
                  placeholder="Connection"
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {/* Direct line */}
              <div>
                <label htmlFor="directLine" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Their direct line
                </label>
                <input
                  id="directLine"
                  type="tel"
                  name="directLine"
                  defaultValue={initialData?.directLine || ''}
                  placeholder="Phone number"
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {state?.message && (
                <p className="text-sm text-[#1A1A1A] tracking-wide">{state.message}</p>
              )}

              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => router.push('/step2')}
                  className="px-3 py-2 border border-[#1A1A1A]/40 text-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                >
                  <GrPrevious size={14} />
                </button>

                <button
                  type="submit"
                  disabled={pending}
                  className="w-[200px] py-2 bg-[#1A1A1A] text-[#FFFFFF] font-tungsten flex items-center justify-center gap-2 text-sm hover:opacity-80 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {pending ? 'Transmitting...' : 'Submit'}
                  <MdOutlineArrowForwardIos size={12} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}