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
      <div className="flex flex-col items-start justify-center relative z-10 gap-4 pl-12">
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
            <Image src="/images/thinline.png" alt="thin line" width={300} height={10} className="mt-2" />
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
    </section>
  );
}
