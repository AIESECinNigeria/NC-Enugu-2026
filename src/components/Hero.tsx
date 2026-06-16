import styles from './Hero.module.css'
//import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'


export default function Hero() {
  // // 1. Create references for the DOM nodes
  // const div1Ref = useRef<HTMLDivElement>(null);
  // const div2Ref = useRef<HTMLDivElement>(null);
  // const div3Ref = useRef<HTMLDivElement>(null);
  // const div4Ref = useRef<HTMLDivElement>(null);
  // const div5Ref = useRef<HTMLDivElement>(null);
  
  // // 2. Track coordinates in state
  // const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  // useEffect(() => {
  //   function updateCoords() {
  //     if (!div1Ref.current || !div2Ref.current || !div3Ref.current || !div4Ref.current || !div5Ref.current) return;

  //     const r1 = div1Ref.current.getBoundingClientRect();
  //     const r2 = div2Ref.current.getBoundingClientRect();
  //     const r3 = div3Ref.current.getBoundingClientRect();
  //     const r4 = div4Ref.current.getBoundingClientRect();
  //     const r5 = div5Ref.current.getBoundingClientRect();

  //     setCoords({
  //       x1: window.scrollX + r1.left + r1.width / 2,
  //       y1: window.scrollY + r1.top + r1.height / 2,
  //       x2: window.scrollX + r2.left + r2.width / 2,
  //       y2: window.scrollY + r2.top + r2.height / 2,
  //     });
  //   }

  //   // Run on mount
  //   updateCoords();

  //   // Listen to screen changes
  //   window.addEventListener('resize', updateCoords);
  //   window.addEventListener('scroll', updateCoords);

  //   return () => {
  //     window.removeEventListener('resize', updateCoords);
  //     window.removeEventListener('scroll', updateCoords);
  //   };
  // }, []); // Empty dependency array ensures listeners mount once



  return (
    <main className={`${styles.container} flex flex-col py-[50px] px-[50px] items-center relative `}>
      <div className='w-full max-w-[1200px] flex flex-col items-center relative z-[90] '>
        <div className='w-full mt-[40px] mb-[90px] '>
          <p className='font-courier text-[20px] '>CASE FILE / NO. 001 / STATUS: OPEN / AUTHOR: CLASSIFIED / DIVISION: DIGITAL OPERATIONS</p>
        </div>
        <div className={`${styles.paper} w-[1200px] h-auto `}>
          <div className={`${styles.paperTwo} w-full h-[700px]`}>
            <Image
              src="/images/rect_two.png"
              alt="paper Bg"
              width={1200}
              height={700}
            />
          </div>
          
          <div className={`${styles.paperOne} `}>
            <p className='bg-[#1A1A1A] text-white w-[520px] p-[5px] font-courier text-[20px] '>YOU WEREN’T SUPPOSED TO FIND THIS PAGE...</p>
            <div className='mx-[40px] mt-[10px] '>
              <div className='font-punk text-[84px] flex flex-col gap-[0px] text-[#1A1A1A] -rotate-3 '>
                <div className='relative'>
                  <div>THE</div>
                  <p className='text-[#CE0000] absolute top-0 left-[150px] inline '>CULPRIT</p>
                  <div className='absolute top-11 left-[150px] w-[291px] h-[62px] '><Image src='/images/rect_three.png' alt='hidden' width={290} height={61}/></div>
                  <p className='text-[#1A1A1A] absolute top-0 left-[470px] '>HAVE</p>
                </div>
                <div className='leading-none'>BEEN IDENTIFIED</div>
              </div>
              <div className='text-[#1A1A1A] text-[24px] mt-[40px] font-courier italic max-w-[700px] '>But since you are here - the Coal City has something worth stealing. The crew is almost complete. One question.</div>
              <div className='text-[#1A1A1A] text-[24px] mt-[20px] font-courier font-bold '>Can you be trusted?</div>
              {/* <button></button> */}
              <Link className='bg-[#AB1212] mt-[40px] w-[350px] h-[55px] flex justify-center items-center text-[#D2C3AA] text-[28px] font-tungstenC cursor-pointer '
                href={{
                  pathname: '/about',
                  query: { name: 'test' },
                }}
              >
                [ Begin Assessment ]
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.images} w-full h-auto absolute top-0 left-0 `}>
        <div className='absolute top-195 left-0 z-[110] '>
          <Image src={'/images/pho1.png'} alt='photo1' width={350} height={350} />
        </div>
        <div className='absolute top-80 right-30 z-[110] '>
          <Image src={'/images/pho2.png'} alt='photo2' width={450} height={450} />
        </div>
        <div className='absolute top-[10px] left-[10px] z-[80] '>
          <Image src={'/images/pho3.png'} alt='photo3' width={300} height={300} />
        </div>
        <div className='absolute top-[10px] right-0 z-[110] '>
          <Image src={'/images/pho4.png'} alt='photo4' width={500} height={500} />
        </div>
        <div className='absolute top-170 right-0 z-[110] '>
          <Image src={'/images/ph55.png'} alt='photo5' width={450} height={450} />
        </div>
      </div>
      <div className={`${styles.pins} w-full h-auto absolute top-0 left-0 `}>
        <div className='absolute top-230 left-35 z-[120] '>
          <Image src={'/images/rPin.png'} alt='photo1' width={100} height={100} />
        </div>
        <div className='absolute top-135 right-90 z-[120] '>
          <Image src={'/images/rPin.png'} alt='photo2' width={100} height={100} />
        </div>
        <div className='absolute top-25 left-25 z-[120] '>
          <Image src={'/images/rPin.png'} alt='photo3' width={100} height={100} />
        </div>
        <div className='absolute top-50 right-70 z-[120] '>
          <Image src={'/images/rPin.png'} alt='photo4' width={100} height={100} />
        </div>
        <div className='absolute top-192 right-44 z-[120] '>
          <Image src={'/images/rPin.png'} alt='photo5' width={100} height={100} />
        </div>
      </div>
    </main>
  );
}
