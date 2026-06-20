'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PreRegistration() {
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
            STATUS:CLEARED / CLASSIFICATION: CONFIRMED
          </p>
          <div className="absolute inset-0 flex flex-col justify-center pl-20">
            <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '24px', color: '#1A1A1A' }}>
              Your answers were good,
            </p>
            <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '24px', color: '#1A1A1A' }}>
              Operative.
            </p>
            <Image src="/images/thinline.png" alt="thin line" width={300} height={0} className="mt-2" style={{ width: '300px', height: 'auto' }} />
            <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '24px', color: '#1A1A1A' }} className="mt-2">
              Now round up your
            </p>
            <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '24px', color: '#1A1A1A' }}>
              registration by giving us
            </p>
            <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '24px', color: '#1A1A1A' }}>
              some of your details.
            </p>
          </div>
          <button
            style={{
              fontFamily: "'Tungsten Condensed', sans-serif",
              fontWeight: 400,
              backgroundColor: '#AB1212',
            }}
            onClick={() => router.push('/registration')}
            className="absolute bottom-6 left-20 z-10 text-white text-2xl tracking-widest px-16 py-2 cursor-pointer"
          >
            BEGIN REGISTRATION
          </button>
          <Image
            src="/images/confirmationbg.png"
            alt="confirmation"
            width={1000}
            height={700}
            priority
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-12">
            <div className="relative">
              <Image
                src="/images/preconfim.png"
                alt="pre confirmation"
                width={480}
                height={720}
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p
                  style={{
                    fontFamily: "'Punk Kid', sans-serif",
                    fontSize: '63px',
                    color: '#CE0000',
                    border: '8px solid #CE0000',
                    padding: '10px 20px',
                    lineHeight: 1,
                    transform: 'rotate(-7deg)',
                  }}
                >
                  CLASSIFIED
                </p>
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
        <div className="relative w-full flex justify-center" style={{ maxWidth: '800px' }}>
          {/* Image */}
          <Image
            src="/images/mbg_one.png"
            alt="paper Bg"
            width={600}
            height={500}
            priority
          />

          {/* Overlay content on image */}
          <div className="absolute inset-0 flex flex-col justify-center items-center w-full h-full p-4">
            {/* Top left: STATUS text */}
            <p className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[10px] font-courier px-2 py-1">
              STATUS:CLEARED / CLASSIFICATION: CONFIRMED
            </p>

            {/* Center section with equal spacing */}
            <div className="flex flex-col items-center gap-3">
              {/* CLASSIFIED text */}
              <div style={{ fontFamily: "'Punk Kid', sans-serif", fontSize: '24px', color: '#CE0000', border: '4px solid #CE0000', padding: '8px 15px', transform: 'rotate(-7deg)', marginTop: '-20px' }}>
                C L A S S I F I E D
              </div>

              {/* operative messages, thinline, and button */}
              <div className="flex flex-col items-center gap-3 mt-4 w-full h-full justify-between">
                <div className="flex flex-col items-center gap-3">
                  <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '16px', color: '#1A1A1A', textAlign: 'center' }}>
                    Your answers were good,
                  </p>
                  <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '16px', color: '#1A1A1A', textAlign: 'center' }}>
                    Operative.
                  </p>
                  <Image src="/images/thinline.png" alt="thin line" width={280} height={8} style={{ width: 'auto', height: 'auto' }} />
                  <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '16px', color: '#1A1A1A', textAlign: 'center' }}>
                    Now round up your registration
                  </p>
                  <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '16px', color: '#1A1A1A', textAlign: 'center' }}>
                    by giving us some of your
                  </p>
                  <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '16px', color: '#1A1A1A', textAlign: 'center' }}>
                    details.
                  </p>
                </div>
                <button
                  style={{
                    fontFamily: "'Tungsten Condensed', sans-serif",
                    fontWeight: 400,
                    backgroundColor: '#AB1212',
                    fontSize: '24px',
                  }}
                  onClick={() => router.push('/registration')}
                  className="text-white px-16 py-2 cursor-pointer tracking-wider absolute bottom-24"
                >
                  BEGIN REGISTRATION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
