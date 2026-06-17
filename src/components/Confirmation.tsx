'use client'

import Image from 'next/image'

export default function Confirmation() {
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
            style={{
              fontFamily: "'Tungsten Condensed', sans-serif",
              fontWeight: 400,
              backgroundColor: '#AB1212',
            }}
            className="absolute bottom-6 left-8 z-10 text-white text-2xl tracking-widest px-8 py-3"
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
    </section>
  );
}
