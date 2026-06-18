'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const ROLE_CLEARANCE: Record<string, string> = {
  'Team Member':      'CLEARANCE LEVEL 1',
  'Team Leader':      'CLEARANCE LEVEL 2',
  'LCVP':             'CLEARANCE LEVEL 3',
  'LCP':              'CLEARANCE LEVEL 4',
  'The Cooks (EST)':  'CLEARANCE LEVEL 5',
}

interface AgentIDProps {
  codename: string
  lc: string
  role: string
  groupId: number
  crewName: string
  clearance: string
  serialNo: string
}

const ROLE_IMAGES: Record<string, string> = {
  'THE SPECIALIST': '/images/thespecialist.png',
  'THE DRIVER':     '/images/thedriver.png',
  'THE CHARMER':    '/images/thecharmer.png',
  'THE LOOKOUT':    '/images/thelookout.png',
  'THE GHOST':      '/images/theghost.png',
  'THE WILD CARD':  '/images/thewildcard.png',
}

export default function AgentID({ codename, lc, role, groupId, crewName, clearance, serialNo }: AgentIDProps) {
  const roleImage = ROLE_IMAGES[crewName] ?? '/images/thespecialist.png'
  const clearanceLabel = ROLE_CLEARANCE[role] ?? 'CLEARANCE LEVEL 1'
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(true)

  useEffect(() => {
    const download = async () => {
      if (!cardRef.current) return
      try {
        const html2canvas = (await import('html2canvas')).default
        const clonedElement = cardRef.current.cloneNode(true) as HTMLElement

        // Remove the loading overlay
        const allDivs = clonedElement.querySelectorAll('div')
        allDivs.forEach(div => {
          if (div.textContent.includes('DECRYPTING AGENT')) {
            div.remove()
          }
        })

        // Temporarily add to DOM for capture
        const container = document.createElement('div')
        container.style.position = 'absolute'
        container.style.left = '-9999px'
        container.appendChild(clonedElement)
        document.body.appendChild(container)

        const canvas = await html2canvas(clonedElement, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#FDF5E6',
        })

        document.body.removeChild(container)

        const link = document.createElement('a')
        link.download = `${codename.replace(/\s+/g, '_')}_ID.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        console.log('ID card downloaded successfully')
        setIsDownloading(false)
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
      <div className="flex flex-col items-start justify-center relative z-10 gap-4 pl-12">
        <div className="relative w-fit">
          <p className="absolute top-4 left-4 text-sm font-courier italic text-[#FDFDFD] bg-[#1A1A1A] px-3 py-2">
            YOUR OPERATIVE BADGE HAS BEEN CLEARED FOR TRANSMISSION
          </p>
          <Image
            src="/images/confirmationbg.png"
            alt="confirmation"
            width={1000}
            height={700}
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative" ref={cardRef}>
              <Image
                src="/images/idimage.png"
                alt="id image"
                width={600}
                height={500}
                priority
              />
              {/* Bordered content area: text + specialist image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-4 px-4 py-4 relative" style={{ border: '5px solid #1A1A1A', borderRadius: '24px' }}>
                  {/* nclogo watermark behind text */}
                  <div className="absolute inset-0 flex items-center justify-start pointer-events-none" style={{ zIndex: 0 }}>
                    <Image src="/images/nclogo.png" alt="logo" width={160} height={160} style={{ opacity: 0.1 }} />
                  </div>
                  {/* Left text */}
                  <div style={{ zIndex: 1, position: 'relative' }}>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: '25px', color: '#1A1A1A' }}>
                      COAL CITY HEIST
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '17px', color: '#1A1A1A' }}>
                      Certificate of Identity
                    </p>
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontStyle: 'italic', fontSize: '15px', color: '#AB1212', textAlign: 'center' }}>
                      {clearanceLabel}
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
                    <p style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 400, fontSize: '18px', color: '#1A1A1A' }}>
                      SERIAL NO. <span style={{ fontWeight: 700 }}>{serialNo}</span>
                    </p>
                  </div>
                  {/* Specialist sitting on allroles */}
                  <div style={{ zIndex: 1 }} className="flex flex-col items-center mt-4">
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

            {/* Bottom text — inside the brown background area */}
            <p className="mt-4 text-center" style={{ fontFamily: "'Courier Prime', monospace", fontStyle: 'italic', fontSize: '16px', color: '#1A1A1A' }}>
              Show this card to verify your clearance with fellow field agents
            </p>
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
    </section>
  )
}
