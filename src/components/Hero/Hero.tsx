"use client";
import styles from './Hero.module.css'
//import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';


export default function Hero() { 
  // 1. Create a parent ref and an array of refs for the pins
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [points, setPoints] = useState<string>('');

  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) return;

      // Get the parent container's bounding box to calculate relative coordinates
      const containerRect = containerRef.current.getBoundingClientRect();

      const isMobileMediaQuery = window.matchMedia('(max-width: 450px)').matches;
      
      const coordinates = pinRefs.current
        .filter((pin): pin is HTMLDivElement => pin !== null)
        .filter((_, index) => {
          if (isMobileMediaQuery && (index === 1 || index === 2)) {
            return false; // Skip the desktop pins on mobile path
          }
          return true;
        })
        .map((pin) => {
          const pinRect = pin.getBoundingClientRect();
          
          // Calculate the center point of each pin image
          const x = pinRect.left - containerRect.left + pinRect.width / 2;
          const y = pinRect.top - containerRect.top + pinRect.height / 2;
          
          return `${x},${y}`;
        });

      // Join coordinates into a string format acceptable by SVG polyline: "x1,y1 x2,y2..."
      setPoints(coordinates.join(' '));
    };

    // // Calculate on initial mount
    // calculatePositions();

    // // Recalculate positions if the window resizes
    // window.addEventListener('resize', calculatePositions);
    // return () => window.removeEventListener('resize', calculatePositions);

    // Run layout calculations
    const timer = setTimeout(calculatePositions, 100);

    // This listener automatically fixes the line when rotating a phone or resizing a browser
    window.addEventListener('resize', calculatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);



  return (
    <main className={`${styles.container} flex flex-col py-[50px] px-[50px] items-center relative `}>
      <div className={`${styles.contb} w-full max-w-[1200px] flex flex-col items-center relative z-[90] `}>
        <div className={`${styles.case} w-full mt-[40px] mb-[90px] font-courier text-[20px] `}>
          <p className={`text-shadow-lg/30 `}>CASE FILE / NO. 001 / STATUS: OPEN / AUTHOR: CLASSIFIED / DIVISION: DIGITAL OPERATIONS</p>
        </div>
        <div className={`${styles.paper} w-[1200px] h-auto `}>
          <div className={`${styles.paperTwo} w-full h-[700px]`}>
            <Image className={`${styles.desktop}`}
              src="/images/rect_two.png"
              alt="paper Bg"
              width={1200}
              height={700}
            />
            <Image className={`${styles.mobile} ${styles.img}`}
              src="/images/mbg_one.png"
              alt="paper Bg"
              width={300}
              height={700}
            />
          </div>
          
          <div className={`${styles.paperOne} `}>
            <p className={`${styles.page} bg-[#1A1A1A] text-white w-[520px] p-[5px] font-courier text-[20px] `}>YOU WEREN’T SUPPOSED TO FIND THIS PAGE...</p>
            <div className={`${styles.culpText} mx-[40px] mt-[10px] `}>
              <div className={`${styles.culprit} font-punk text-[84px] flex flex-col gap-[0px] text-[#1A1A1A] -rotate-3 `}>
                <div className='relative'>
                  <div>THE</div>
                  <p className={`${styles.culpritA} text-[#CE0000] absolute top-0 left-[150px] inline `}>CULPRIT</p>
                  <div className={`${styles.culpritC} absolute top-11 left-[150px] w-[291px] h-[62px] `}><Image src='/images/rect_three.png' alt='hidden' width={290} height={61}/></div>
                  <p className={`${styles.desktop} text-[#1A1A1A] absolute top-0 left-[470px] `}>HAS</p>
                </div>
                <div className={`${styles.desktop}`}>BEEN IDENTIFIED</div>
                <div className={`${styles.mobile}`}>HAS BEEN</div>
                <div className={`${styles.mobile}`}>IDENTIFIED</div>
              </div>
              <div className={`${styles.coal} text-[#1A1A1A] text-[24px] mt-[40px] font-courier italic max-w-[700px] `}>But since you are here - the Coal City has something worth stealing. The crew is almost complete. One question.</div>
              <div className={`${styles.coal} text-[#1A1A1A] text-[24px] mt-[20px] font-courier font-bold `}>Can you be trusted?</div>
              {/* <button></button> */}
              <Link className={`${styles.butt} bg-[#AB1212] mt-[40px] w-[350px] h-[55px] flex justify-center items-center text-[#D2C3AA] text-[28px] font-tungstenC cursor-pointer `} href="/Assessment">
                [ B e g i n &nbsp; A s s e s s m e n t ]
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.images} w-full h-auto absolute top-0 left-0 `}>
        <div className={`${styles.desktop} absolute top-195 left-0 z-[110] `}>
          <Image src={'/images/pho1.png'} alt='photo1' width={350} height={350} />
        </div>
        <div className={`${styles.desktop} absolute top-80 right-30 z-[110] `}>
          <Image src={'/images/pho2.png'} alt='photo2' width={450} height={450} />
        </div>
        <div className={`${styles.desktop} absolute top-[10px] left-[10px] z-[80] `}>
          <Image src={'/images/pho3.png'} alt='photo3' width={300} height={300} />
        </div>
        <div className={`${styles.desktop} absolute top-[10px] right-0 z-[110] `}>
          <Image src={'/images/pho4.png'} alt='photo4' width={500} height={500} />
        </div>
        <div className={`${styles.phot1} absolute top-170 right-0 z-[110] `}>
          <Image src={'/images/ph55.png'} alt='photo5' width={450} height={450} />
        </div>
      </div>
      {/* <div className={`${styles.pins} w-full h-auto absolute top-0 left-0 `}>
        <div className={`${styles.mPin} ${styles.mPin1} absolute top-230 left-35 z-[120] `}>
          <Image src={'/images/rPin.png'} alt='photo1' width={100} height={100} />
        </div>
        <div className={`${styles.desktop} absolute top-135 right-90 z-[120] `}>
          <Image src={'/images/rPin.png'} alt='photo2' width={100} height={100} />
        </div>
        <div className={`${styles.desktop} absolute top-25 left-25 z-[120] `}>
          <Image src={'/images/rPin.png'} alt='photo3' width={100} height={100} />
        </div>
        <div className={`${styles.mPin} ${styles.mPin2} absolute top-50 right-70 z-[120] `}>
          <Image src={'/images/rPin.png'} alt='photo4' width={100} height={100} />
        </div>
        <div className={`${styles.mPin} ${styles.mPin3} absolute top-192 right-44 z-[120] `}>
          <Image src={'/images/rPin.png'} alt='photo5' width={100} height={100} />
        </div>
      </div> */}
      <div ref={containerRef} className={`${styles.pins} w-full h-auto absolute top-0 left-0`}>
      
      {/* 2. SVG Overlay to draw the connecting red line */}
      <svg className={`${styles.svgg} absolute top-0 left-0 w-full h-full pointer-events-none z-[119]`} style={{ overflow: 'visible', minHeight: '1200px' }}>
        {points && (
          <polyline
            points={points}
            fill="none"
            stroke="#CE0000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* 3. Your Pins assigned with array refs sequentially */}
      <div 
        ref={(el) => { pinRefs.current[0] = el; }} 
        className={`${styles.mPin} ${styles.mPin1} absolute top-230 left-35 z-[120]`}
      >
        <Image src={'/images/rPin.png'} alt='photo1' width={100} height={100} />
      </div>

      <div 
        ref={(el) => { pinRefs.current[1] = el; }} 
        className={`${styles.desktop} absolute top-135 right-90 z-[120]`}
      >
        <Image src={'/images/rPin.png'} alt='photo2' width={100} height={100} />
      </div>

      <div 
        ref={(el) => { pinRefs.current[2] = el; }} 
        className={`${styles.desktop} absolute top-25 left-25 z-[120]`}
      >
        <Image src={'/images/rPin.png'} alt='photo3' width={100} height={100} />
      </div>

      <div 
        ref={(el) => { pinRefs.current[3] = el; }} 
        className={`${styles.mPin} ${styles.mPin2} absolute top-50 right-70 z-[120]`}
      >
        <Image src={'/images/rPin.png'} alt='photo4' width={100} height={100} />
      </div>

      <div 
        ref={(el) => { pinRefs.current[4] = el; }} 
        className={`${styles.mPin} ${styles.mPin3} absolute top-192 right-44 z-[120]`}
      >
        <Image src={'/images/rPin.png'} alt='photo5' width={100} height={100} />
      </div>
    </div>
    </main>
  );
}
