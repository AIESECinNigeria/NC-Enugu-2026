'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Confirmation() {
  const router = useRouter()
  return (
    <section
      className="h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/images/bg_one.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col items-start justify-center relative z-10 gap-4 pl-12">
        <p className="text-sm font-courier italic text-[#FDFDFD] text-left">
          CASE FILE / NO. 001 / STATUS: OPEN / AUTHOR: CLASSIFIED / DIVISION: DIGITAL OPERATIONS
        </p>
        <div className="relative w-fit">
          <p className="absolute top-4 left-4 text-sm font-courier italic text-[#FDFDFD] bg-[#1A1A1A] px-3 py-2">
            YOUR DOSSIER HAS BEEN FILLED AND...
          </p>
          <div className="absolute inset-0 flex flex-col justify-start pt-12 pl-8">
            <div className="relative inline-block">
              <p style={{ fontFamily: "'Punk Kid', sans-serif", fontSize: '81px', transform: 'rotate(-15deg)' }} className="text-[#1A1A1A] leading-none text-left">
                YOUR <span className="text-[#CE0000]">CREW</span>
              </p>
            </div>
            <p style={{ fontFamily: "'Punk Kid', sans-serif", fontSize: '81px', transform: 'rotate(-15deg)' }} className="text-[#1A1A1A] leading-none text-left">
              ASSIGNMENT
            </p>
            <p style={{ fontFamily: "'Punk Kid', sans-serif", fontSize: '81px', transform: 'rotate(-15deg)' }} className="text-[#1A1A1A] leading-none text-left">
              IS LOCKED
            </p>
          </div>
          <button
            onClick={() => router.push('/agent-id')}
            style={{
              fontFamily: "'Tungsten Condensed', sans-serif",
              fontWeight: 400,
              backgroundColor: '#AB1212',
            }}
            className="absolute bottom-6 left-8 z-10 text-white text-2xl tracking-widest px-8 py-3 cursor-pointer"
          >
            DOWNLOAD ID (CLASSIFIED)
          </button>
          <Image
            src="/images/confirmationbg.png"
            alt="confirmation"
            width={1000}
            height={700}
            priority
          />
          <div className="absolute top-1/2 -translate-y-1/2 -right-16">
            <div className="relative flex items-center justify-center">
              {/* Watermark — large and semi-transparent */}
              <Image
                src="/images/preconfim.png"
                alt="watermark"
                width={600}
                height={750}
                style={{ opacity: 0.35 }}
                priority
              />
              {/* Foreground plane image — smaller, centered over watermark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="/images/confplaneimage.png"
                    alt="plane"
                    width={340}
                    height={520}
                    priority
                  />
                  <div className="absolute -top-6 right-0" style={{ zIndex: 2 }}>
                    <Image src="/images/rPin.png" alt="pin" width={120} height={120} priority />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ zIndex: 2 }}>
                    <p className="leading-snug" style={{ fontFamily: "'Courier Prime', monospace", fontStyle: 'italic', fontSize: '25px', color: '#1A1A1A' }}>
                      The masterminds<br />will be in<br />touch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center justify-center relative z-10 w-full px-4">
        {/* Case file text centered above image */}
        <p className="text-xs font-courier italic text-[#FDFDFD] text-center mb-4">
          CASE FILE / NO. 001 / STATUS: OPEN / AUTHOR: CLASSIFIED / DIVISION: DIGITAL OPERATIONS
        </p>

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
                YOUR DOSSIER HAS BEEN FILLED AND...
              </p>
            </div>

            {/* Middle-top section: "YOUR CREW..." slanted text */}
            <div className="flex flex-col items-start gap-0 pt-2">
              <p style={{ fontFamily: "'Punk Kid', sans-serif", fontSize: '50px', transform: 'rotate(-15deg)', lineHeight: 1 }} className="text-[#1A1A1A] text-left">
                YOUR <span className="text-[#CE0000]">CREW</span>
              </p>
              <p style={{ fontFamily: "'Punk Kid', sans-serif", fontSize: '50px', transform: 'rotate(-15deg)', lineHeight: 1 }} className="text-[#1A1A1A] text-left">
                ASSIGNMENT
              </p>
              <p style={{ fontFamily: "'Punk Kid', sans-serif", fontSize: '50px', transform: 'rotate(-15deg)', lineHeight: 1 }} className="text-[#1A1A1A] text-left">
                IS LOCKED
              </p>
            </div>

            {/* Middle section: NC logo watermark with plane image on top */}
            <div className="relative flex items-center justify-center py-0">
              {/* Watermark — semi-transparent NC logo */}
              <Image
                src="/images/nclogo.png"
                alt="watermark"
                width={250}
                height={250}
                style={{ opacity: 0.35 }}
                priority
              />
              {/* Foreground plane image — on top of watermark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="/images/confplaneimage.png"
                    alt="plane"
                    width={220}
                    height={280}
                    priority
                  />
                  {/* rPin image at top right of plane */}
                  <div className="absolute -top-4 right-0" style={{ zIndex: 2 }}>
                    <Image src="/images/rPin.png" alt="pin" width={80} height={80} priority />
                  </div>
                  {/* Text overlay on plane image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ zIndex: 2 }}>
                    <p className="leading-snug" style={{ fontFamily: "'Courier Prime', monospace", fontStyle: 'italic', fontSize: '16px', color: '#1A1A1A' }}>
                      The masterminds<br />will be in<br />touch
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section: Download button */}
            <button
              onClick={() => router.push('/agent-id')}
              style={{
                fontFamily: "'Tungsten Condensed', sans-serif",
                fontWeight: 400,
                backgroundColor: '#AB1212',
                fontSize: '24px',
                width: '261px',
                height: '50px',
              }}
              className="text-white cursor-pointer tracking-wider -mt-8 whitespace-nowrap flex items-center justify-center"
            >
              DOWNLOAD ID (CLASSIFIED)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
