'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

interface AgentIDProps {
  codename: string
  lc: string
  role: string
  crewName: string
  clearance: string
  clearanceLevel?: string
}

const ROLE_IMAGES: Record<string, string> = {
  'THE SPECIALIST': '/images/thespecialist.png',
  'THE DRIVER':     '/images/thedriver.png',
  'THE CHARMER':    '/images/thecharmer.png',
  'THE LOOKOUT':    '/images/thelookout.png',
  'THE GHOST':      '/images/theghost.png',
  'THE WILD CARD':  '/images/thewildcard.png',
}

export default function AgentID({ codename, lc, role, crewName, clearance, clearanceLevel }: AgentIDProps) {
  const roleImage = ROLE_IMAGES[crewName] ?? '/images/thespecialist.png'

  const CLEARANCE_LEVELS: Record<string, number> = {
    'Team Member': 1,
    'Team Leader': 2,
    'LCVP': 3,
    'LCP': 4,
    'The Cooks (EST)': 5,
    'Alumni': 6,
  }

  const clearanceLevelNum = clearanceLevel ? CLEARANCE_LEVELS[clearanceLevel] || 1 : 1
  const clearanceDisplay = `Clearance Level ${clearanceLevelNum}`

  const cardRef = useRef<HTMLDivElement>(null)
  const mobileCardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(true)

  useEffect(() => {
    const download = async () => {
      try {
        const html2canvas = (await import('html2canvas')).default
        const isMobileViewport = window.matchMedia('(max-width: 767px)').matches
        const target = isMobileViewport ? mobileCardRef.current : cardRef.current

        if (!target) return

        const clonedElement = target.cloneNode(true) as HTMLElement

        // Remove the loading overlay
        const allDivs = clonedElement.querySelectorAll('div')
        allDivs.forEach(div => {
          if (div.textContent?.includes('DECRYPTING AGENT')) {
            div.remove()
          }
        })

        // Temporarily add to DOM for capture
        const container = document.createElement('div')
        container.style.position = 'absolute'
        container.style.left = '-9999px'
        container.style.top = '0'
        container.appendChild(clonedElement)
        document.body.appendChild(container)

        try {
          // Set explicit dimensions based on viewport
          if (isMobileViewport) {
            clonedElement.style.width = '300px'
            clonedElement.style.height = '210px'
          } else {
            clonedElement.style.width = '550px'
            clonedElement.style.height = '380px'
          }

          const canvas = await html2canvas(clonedElement, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#FDF5E6',
          })

          const link = document.createElement('a')
          link.download = `${codename.replace(/\s+/g, '_')}_ID.png`
          link.href = canvas.toDataURL('image/png')
          link.click()
          console.log('ID card downloaded successfully')
        } finally {
          document.body.removeChild(container)
          setIsDownloading(false)
        }
      } catch (err) {
        console.error('Failed to capture ID card:', err)
        setIsDownloading(false)
      }
    }
    const timer = setTimeout(download, 2000)
    return () => clearTimeout(timer)
  }, [codename])

  return (
    <section
      className="h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/images/bg_one.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hidden md:flex flex-col items-center justify-center relative z-10 gap-4">
        <div className="relative w-fit">
          <p className="absolute top-4 left-4 text-sm font-courier italic text-[#FDFDFD] bg-[#1A1A1A] px-3 py-2">
            YOUR OPERATIVE BADGE HAS BEEN CLEARED FOR TRANSMISSION
          </p>
          <Image
            src="/images/confirmationbg.png"
            alt="confirmation"
            width={1100}
            height={800}
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative" ref={cardRef} style={{ width: '550px', height: '380px', overflow: 'hidden', borderRadius: '16px' }}>
              <Image
                src="/images/agentid.jpeg"
                alt="id image"
                width={550}
                height={380}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
              />
              {/* Bordered content area: text + specialist image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-4 px-4 py-4 relative" style={{ border: '5px solid #1A1A1A', borderRadius: '24px' }}>
                  {/* nclogo watermark behind text */}
                  <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} className="absolute inset-0 flex items-center justify-start pointer-events-none">
                    <img src="/images/nclogo.png" alt="logo" width={160} height={160} style={{ opacity: 1 }} />
                  </div>
                  {/* Left text */}
                  <div style={{ zIndex: 2, position: 'relative' }}>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: '25px', color: '#1A1A1A' }}>
                      COAL CITY HEIST
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '17px', color: '#1A1A1A' }}>
                      Certificate of Identity
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontStyle: 'italic', fontSize: '15px', color: '#AB1212', textAlign: 'center' }}>
                      {clearanceDisplay}
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '18px', color: '#1A1A1A', marginTop: '12px' }}>
                      CODE NAME: <span style={{ fontWeight: 700 }}>{codename}</span>
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '18px', color: '#1A1A1A' }}>
                      DIVISION: <span style={{ fontWeight: 700 }}>{lc}</span>
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '18px', color: '#1A1A1A' }}>
                      ROLE: <span style={{ fontWeight: 700 }}>{crewName}</span>
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '18px', color: '#1A1A1A', marginTop: '4px' }}>
                      ID: <span style={{ fontWeight: 700 }}>007</span>
                    </p>
                  </div>
                  {/* Specialist sitting on allroles */}
                  <div style={{ zIndex: 2 }} className="flex flex-col items-center mt-4">
                    <Image src={roleImage} alt={crewName} width={140} height={200} />
                    <Image src="/images/allroles.png" alt="all roles" width={100} height={30} />
                  </div>
                </div>
                <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '13px', color: '#1A1A1A' }}>
                  RESTRICTED ACCESS • FOR AUTHORIZED USE ONLY
                </p>
              </div>

              {/* Loading overlay while generating ID */}
              {isDownloading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FDF5E6]/80" style={{ borderRadius: '24px' }}>
                  <div className="text-center">
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: '18px', color: '#1A1A1A' }}>
                      DECRYPTING AGENT
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: '18px', color: '#1A1A1A' }}>
                      DETAILS...
                    </p>
                    <div className="mt-3 flex justify-center gap-1">
                      <span className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

        {/* Text below card image */}
        <div className="w-full flex justify-center">
          <p className="mt-12 text-center" style={{ fontFamily: "'Courier Prime', monospace", fontStyle: 'italic', fontSize: '20px', color: '#CE0000', fontWeight: 700 }}>
            Show this card to verify your <br/> clearance with fellow field agents
          </p>
        </div>
          </div>
          <div className="absolute top-0 right-0">
            <Image
              src="/images/preconfim.png"
              alt="watermark"
              width={340}
              height={415}
              style={{ opacity: 0.35 }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center justify-center relative z-10 w-full px-4">
        {/* Mobile image container */}
        <div className="relative w-full flex justify-center" style={{ maxWidth: '400px' }}>
          {/* Mobile background image */}
          <Image
            src="/images/mbg_one.png"
            alt="mobile background"
            width={400}
            height={600}
            priority
          />

          {/* Overlay content on image */}
          <div className="absolute inset-0 flex flex-col justify-between items-center w-full h-full p-4">
            {/* Top section: Dossier text */}
            <div className="w-full flex justify-start pl-2 pt-2">
              <p className="text-xs font-courier italic text-[#FDFDFD] bg-[#1A1A1A] px-2 py-1" style={{ lineHeight: '1.2' }}>
                YOUR OPERATIVE BADGE HAS BEEN CLEARED FOR TRANSMISSION
              </p>
            </div>

            {/* Bottom right: NC logo watermark */}
            <div className="absolute bottom-4 right-4 z-0">
              <Image
                src="/images/nclogo.png"
                alt="watermark"
                width={200}
                height={200}
                style={{ opacity: 0.35 }}
                priority
              />
            </div>

            {/* Middle: ID card with full layout scaled for mobile */}
            <div className="flex flex-col items-center gap-3 flex-1 justify-center">
              <div className="relative" ref={mobileCardRef} style={{ width: '300px', height: '210px', overflow: 'hidden', borderRadius: '16px' }}>
                <Image
                  src="/images/agentid.jpeg"
                  alt="id image"
                  width={300}
                  height={210}
                  priority
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
                {/* Bordered content area: text + specialist image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-2 py-2" style={{ gap: '6px', width: '100%', height: '100%' }}>
                  <div className="flex items-center gap-2 px-2 py-2 relative" style={{ border: '3px solid #1A1A1A', borderRadius: '14px', maxWidth: '95%' }}>
                    {/* nclogo watermark behind text */}
                    <div className="absolute inset-0 flex items-center justify-start pointer-events-none" style={{ zIndex: 1 }}>
                      <Image src="/images/nclogo.png" alt="logo" width={100} height={100} style={{ opacity: 1 }} />
                    </div>
                    {/* Left text */}
                    <div style={{ zIndex: 1, position: 'relative' }}>
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: '12px', color: '#1A1A1A', margin: '0' }}>
                        COAL CITY HEIST
                      </p>
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '10px', color: '#1A1A1A', margin: '0' }}>
                        Certificate of Identity
                      </p>
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontStyle: 'italic', fontSize: '9px', color: '#AB1212', textAlign: 'center', margin: '2px 0 0 0' }}>
                        {clearanceDisplay}
                      </p>
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '9px', color: '#1A1A1A', marginTop: '4px', margin: '4px 0 0 0' }}>
                        CODE NAME: <span style={{ fontWeight: 700 }}>{codename}</span>
                      </p>
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '9px', color: '#1A1A1A', margin: '0' }}>
                        DIVISION: <span style={{ fontWeight: 700 }}>{lc}</span>
                      </p>
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '9px', color: '#1A1A1A', margin: '0' }}>
                        ROLE: <span style={{ fontWeight: 700 }}>{crewName}</span>
                      </p>
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '9px', color: '#1A1A1A', margin: '2px 0 0 0' }}>
                        ID: <span style={{ fontWeight: 700 }}>007</span>
                      </p>
                    </div>
                    {/* Specialist sitting on allroles */}
                    <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', minWidth: '50px', maxWidth: '60px' }}>
                      <Image src={roleImage} alt={crewName} width={60} height={80} style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }} />
                      <Image src="/images/allroles.png" alt="all roles" width={50} height={15} style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }} />
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '8px', color: '#1A1A1A', margin: '0' }}>
                    RESTRICTED ACCESS • FOR AUTHORIZED USE ONLY
                  </p>
                </div>

                {/* Loading overlay while generating ID */}
                {isDownloading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#FDF5E6]/80" style={{ borderRadius: '20px' }}>
                    <div className="text-center">
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: '11px', color: '#1A1A1A' }}>
                        DECRYPTING AGENT
                      </p>
                      <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: '11px', color: '#1A1A1A' }}>
                        DETAILS...
                      </p>
                      <div className="mt-2 flex justify-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p
    className="text-center"
    style={{
      fontFamily: "'Courier Prime', monospace",
      fontStyle: 'italic',
      fontSize: '12px',
      color: '#CE0000',
      fontWeight: 700,
      marginTop: '8px'
    }}
  >
    Show this card to verify your <br /> clearance with fellow field agents
  </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
