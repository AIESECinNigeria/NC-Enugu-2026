'use client'

import { useActionState, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { registerAgentStep2 } from '@/app/actions'
import { GrPrevious } from 'react-icons/gr'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const roles = ['Team Member', 'Team Leader', 'LCVP', 'LCP', 'Alumni']
const lcs = ['Abeokuta', 'Abuja', 'Akure', 'Benin', 'Benue', 'Calabar', 'Ekiti', 'Enugu', 'Ibadan', 'Ife', 'Ilorin', 'JOS', 'Kano', 'Lagos', 'Port-harcourt', 'Zaria', 'The Cooks (EST)', 'Alumni']
const conferenceOptions = ['Yes', 'No']

const initialState = { message: '', success: false }

const dropdownClass = 'w-full border border-[#1A1A1A]/40 px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent'
const dropdownClassMobile = 'w-full border border-[#1A1A1A]/40 px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent'
const dropdownPanelClass = 'absolute z-20 top-full mt-1 w-full border border-[#1A1A1A]/20 bg-white shadow-lg max-h-52 overflow-y-auto'
const optionClass = (selected: boolean) => `w-full px-3 py-2 text-left text-sm font-tungsten font-normal hover:bg-[#1A1A1A] hover:text-white transition-colors ${selected ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'}`
const optionClassMobile = (selected: boolean) => `w-full px-3 py-2 text-left text-sm font-tungsten font-normal hover:bg-[#1A1A1A] hover:text-white transition-colors ${selected ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'}`

interface Step2InitialData {
  role?: string
  lc?: string
  firstConference?: string
  purpose?: string
  notes?: string
}

export default function RegistrationStep2({ initialData }: { initialData?: Step2InitialData }) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(registerAgentStep2, initialState)

  const [roleOpen, setRoleOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(initialData?.role || '')
  const roleRef = useRef<HTMLDivElement>(null)

  const [lcOpen, setLcOpen] = useState(false)
  const [selectedLc, setSelectedLc] = useState(initialData?.lc || '')
  const lcRef = useRef<HTMLDivElement>(null)

  const [confOpen, setConfOpen] = useState(false)
  const [selectedConf, setSelectedConf] = useState(initialData?.firstConference || '')
  const confRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleOpen(false)
      if (lcRef.current && !lcRef.current.contains(e.target as Node)) setLcOpen(false)
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
            2/3
          </span>
          <Image src="/images/number.png" alt="number" width={48} height={48} className="-mt-3" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <Image
            src="/images/reg2.png"
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
              DIVISION & RANK
            </h2>
          </div>

          <form action={formAction} className="space-y-4 relative z-10">

            {/* Role dropdown */}
            <div>
              <label className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                What&apos;s your clearance level?
              </label>
              <input type="hidden" name="role" value={selectedRole} />
              <div ref={roleRef} className="relative w-125">
                <button type="button" onClick={() => setRoleOpen((o) => !o)} className={dropdownClass}>
                  <span className={selectedRole ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'}>
                    {selectedRole || 'Team Member'}
                  </span>
                  {roleOpen ? <FaChevronUp size={12} className="text-[#1A1A1A]/40 shrink-0" /> : <FaChevronDown size={12} className="text-[#1A1A1A]/40 shrink-0" />}
                </button>
                {roleOpen && (
                  <div className="absolute z-20 top-full mt-1 w-full border border-[#1A1A1A]/20 bg-white shadow-lg max-h-64 overflow-y-auto">
                    {roles.map((r) => (
                      <button key={r} type="button" onMouseDown={(e) => { e.preventDefault(); setSelectedRole(r); setRoleOpen(false) }} className={optionClass(selectedRole === r)}>
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* LC dropdown */}
            <div>
              <label className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Which division are you from?
              </label>
              <input type="hidden" name="lc" value={selectedLc} />
              <div ref={lcRef} className="relative w-125">
                <button type="button" onClick={() => setLcOpen((o) => !o)} className={dropdownClass}>
                  <span className={selectedLc ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'}>
                    {selectedLc || 'Choose your LC'}
                  </span>
                  {lcOpen ? <FaChevronUp size={12} className="text-[#1A1A1A]/40 shrink-0" /> : <FaChevronDown size={12} className="text-[#1A1A1A]/40 shrink-0" />}
                </button>
                {lcOpen && (
                  <div className={dropdownPanelClass}>
                    {lcs.map((lc) => (
                      <button key={lc} type="button" onMouseDown={(e) => { e.preventDefault(); setSelectedLc(lc); setLcOpen(false) }} className={optionClass(selectedLc === lc)}>
                        {lc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* First conference dropdown */}
            <div>
              <label className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Is this your first operation?
              </label>
              <input type="hidden" name="firstConference" value={selectedConf} />
              <div ref={confRef} className="relative w-125">
                <button type="button" onClick={() => setConfOpen((o) => !o)} className={dropdownClass}>
                  <span className={selectedConf ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'}>
                    {selectedConf || 'Is this your first conference'}
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

            {/* What are you here for */}
            <div>
              <label htmlFor="purpose" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                What do you expect to take from this heist?
              </label>
              <input
                id="purpose"
                type="text"
                name="purpose"
                defaultValue={initialData?.purpose || ''}
                placeholder="What are you here for..."
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            {/* Anything we should know */}
            <div>
              <label htmlFor="notes" className="block text-lg font-courier font-bold text-[#1A1A1A] mb-1">
                Any intel for the masterminds?
              </label>
              <input
                id="notes"
                type="text"
                name="notes"
                defaultValue={initialData?.notes || ''}
                placeholder="Anything we should know.."
                className="w-125 bg-transparent border border-[#1A1A1A]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            {state?.message && (
              <p className="text-sm text-[#1A1A1A] tracking-wide">{state.message}</p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push('/registration')}
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
                DIVISION & RANK
              </h2>
              <div className="absolute right-0 flex flex-col items-center">
                <span className="font-courier font-normal italic text-[18px] text-[#1A1A1A]">
                  2/3
                </span>
                <Image src="/images/number.png" alt="number" width={48} height={48} className="-mt-1" />
              </div>
            </div>

            <form action={formAction} className="space-y-2 flex flex-col">
              {/* Role dropdown */}
              <div>
                <label className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  What&apos;s your clearance level?
                </label>
                <input type="hidden" name="role" value={selectedRole} />
                <div ref={roleRef} className="relative w-[300px] mx-auto">
                  <button type="button" onClick={() => setRoleOpen((o) => !o)} className="w-full border border-[#1A1A1A] px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent">
                    <span className={selectedRole ? 'text-[#1A1A1A] text-sm' : 'text-[#1A1A1A]/40 text-sm'}>
                      {selectedRole || 'Team Member'}
                    </span>
                    {roleOpen ? <FaChevronUp size={10} className="text-[#1A1A1A]/40 shrink-0" /> : <FaChevronDown size={10} className="text-[#1A1A1A]/40 shrink-0" />}
                  </button>
                  {roleOpen && (
                    <div className="absolute z-20 top-full mt-1 w-full border border-[#1A1A1A] bg-white shadow-lg max-h-64 overflow-y-auto">
                      {roles.map((r) => (
                        <button key={r} type="button" onClick={() => { setSelectedRole(r); setRoleOpen(false) }} className={optionClassMobile(selectedRole === r)}>
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* LC dropdown */}
              <div>
                <label className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Which division are you from?
                </label>
                <input type="hidden" name="lc" value={selectedLc} />
                <div ref={lcRef} className="relative w-[300px] mx-auto">
                  <button type="button" onClick={() => setLcOpen((o) => !o)} className="w-full border border-[#1A1A1A] px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent">
                    <span className={selectedLc ? 'text-[#1A1A1A] text-sm' : 'text-[#1A1A1A]/40 text-sm'}>
                      {selectedLc || 'Choose LC'}
                    </span>
                    {lcOpen ? <FaChevronUp size={10} className="text-[#1A1A1A]/40 shrink-0" /> : <FaChevronDown size={10} className="text-[#1A1A1A]/40 shrink-0" />}
                  </button>
                  {lcOpen && (
                    <div className="absolute z-20 top-full mt-1 w-full border border-[#1A1A1A] bg-white shadow-lg max-h-40 overflow-y-auto">
                      {lcs.map((lc) => (
                        <button key={lc} type="button" onClick={() => { setSelectedLc(lc); setLcOpen(false) }} className={optionClassMobile(selectedLc === lc)}>
                          {lc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* First conference dropdown */}
              <div>
                <label className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Is this your first operation?
                </label>
                <input type="hidden" name="firstConference" value={selectedConf} />
                <div ref={confRef} className="relative w-[300px] mx-auto">
                  <button type="button" onClick={() => setConfOpen((o) => !o)} className="w-full border border-[#1A1A1A] px-3 py-2 flex items-center justify-between text-sm font-tungsten font-normal focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent">
                    <span className={selectedConf ? 'text-[#1A1A1A] text-sm' : 'text-[#1A1A1A]/40 text-sm'}>
                      {selectedConf || 'Yes/No'}
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

              {/* What are you here for */}
              <div>
                <label htmlFor="purpose" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  What do you expect to take from this heist?
                </label>
                <input
                  id="purpose"
                  type="text"
                  name="purpose"
                  defaultValue={initialData?.purpose || ''}
                  placeholder="What you expect..."
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {/* Anything we should know */}
              <div>
                <label htmlFor="notes" className="block text-base font-courier font-bold text-[#1A1A1A] mb-1">
                  Any intel for the masterminds?
                </label>
                <input
                  id="notes"
                  type="text"
                  name="notes"
                  defaultValue={initialData?.notes || ''}
                  placeholder="Anything else..."
                  className="w-[300px] mx-auto block bg-transparent border border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 placeholder-tungsten px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {state?.message && (
                <p className="text-sm text-[#1A1A1A] tracking-wide">{state.message}</p>
              )}

              <div className="flex justify-center items-center gap-2 mt-[20px] ">
                <button
                  type="button"
                  onClick={() => router.push('/registration')}
                  className="px-3 py-[0.6rem] border border-[#1A1A1A]/40 text-[#1A1A1A] text-[0.875rem] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                >
                  <GrPrevious size={16} />
                </button>

                <button
                  type="submit"
                  disabled={pending}
                  className="w-[200px] py-2 bg-[#1A1A1A] text-[#FFFFFF] font-tungsten flex items-center justify-center gap-2 text-[0.875rem] hover:opacity-80 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {pending ? 'Transmitting...' : 'Next'}
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