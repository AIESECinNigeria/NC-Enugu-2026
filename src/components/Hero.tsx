import styles from './Hero.module.css'
import Image from 'next/image'


export default function Hero() {
  return (
    <main className={`${styles.container} flex flex-col justify-center items-center p-[50px] `}>
      <div>
        <p className='font-courier text-[20px] '>CASE FILE / NO. 001 / STATUS: OPEN / AUTHOR: CLASSIFIED / DIVISION: DIGITAL OPERATIONS</p>
      </div>
      <div>
        <div>
          <p className='bg-[#1A1A1A] text-white w-[520px] p-[5px] font-courier text-[20px] '>YOU WEREN’T SUPPOSED TO FIND THIS PAGE...</p>
        </div>
        <Image 
          src="/images/rect_two.png"
          alt="paper Bg"
          width={1200}
          height={500}
        />
      </div>
      {/* <div className='bg-[url(/images/rect_one.png)] bg-cover bg-center h-[100%] w-[100%] '>
        <p>Some text here</p>
      </div> */}
      {/* <h1 className="text-center text-6xl font-black tracking-[0.2em] text-white sm:text-8xl">
        NC NUGS
      </h1> */}
    </main>
  );
}
