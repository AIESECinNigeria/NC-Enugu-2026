"use client";
import styles from './Classified.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';


export default function Classified() {

  return (
    <main className={`${styles.container} flex flex-col py-[50px] px-[50px] items-center relative `}>
      <div className={`${styles.contb} w-full max-w-[1200px] flex flex-col items-center relative z-[90] `}>
        <div className={`${styles.case} w-full mt-[40px] mb-[90px] font-courier italic text-[20px] `}>
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
              height={650}
            />
          </div>

          <div className={`${styles.paperOne} `}>
            <p className={`${styles.page} bg-[#1A1A1A] text-white w-[520px] p-[5px] font-courier text-[20px] `}>STATUS:CLEARED / CLASSIFICATION: CONFIRMED</p>
            <div className={`${styles.culpText} mx-[40px] mt-[10px] flex justify-evenly `}>
                <div className={`${styles.culp} flex flex-col justify-between items-center px-[70px] `}>
                    <div className={`${styles.coal} text-[#1A1A1A] text-[24px] mt-[40px] font-courier italic max-w-[700px] p-[10px] `}>
                        <p className=''>Your answers were good, Operative.</p>
                        <p> - - - - - - - - -  -</p>
                        <p>Now round up your registration by giving us some of your details.</p>
                    </div>
                    <Link className={`${styles.butt} bg-[#AB1212] mt-[40px] w-[450px] h-[55px] flex justify-center items-center text-[white] text-[28px] font-tungstenC cursor-pointer `} href="/">
                        B&nbsp; E&nbsp; G&nbsp; I&nbsp; N&nbsp;  &nbsp;&nbsp;&nbsp; R&nbsp; E&nbsp; G&nbsp; I&nbsp; S&nbsp; T&nbsp; R&nbsp; A&nbsp; T&nbsp; I&nbsp; O&nbsp; N&nbsp;
                    </Link>
                </div>
                <div className='w-full max-w-[500px] '>
                    <div className={`${styles.desktop} block relative -rotate-30 `}>
                        <Image
                            src="/images/nclogo.png"
                            alt="paper Bg"
                            width={1200}
                            height={700}
                        />
                    </div>

                    <div className={`${styles.class} font-punk text-[64px] text-[#CE0000] flex justify-center items-center -rotate-7 absolute top-[40%] right-[55] `}>
                        <div className={`${styles.class2} border-[10px] border-[#CE0000] px-[15px] py-[20px] leading-none `}>C L A S S I F I E D</div>
                    </div>

                </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
