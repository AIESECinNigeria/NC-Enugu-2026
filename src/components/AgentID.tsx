'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'

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

  useEffect(() => {
    const download = async () => {
      if (!cardRef.current) return
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true })
      const link = document.createElement('a')
      link.download = `${codename.replace(/\s+/g, '_')}_ID.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    // Wait for images to fully render before capturing
    const timer = setTimeout(download, 1500)
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
          <div className="absolute inset-0 flex items-center justify-center">
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
          <p className="absolute -bottom-16 left-0 right-0 text-center" style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: '25px', color: '#CE0000' }}>
            Show this card to verify your<br />clearance with fellow field agents
          </p>
        </div>
      </div>
    </section>
  )
}
