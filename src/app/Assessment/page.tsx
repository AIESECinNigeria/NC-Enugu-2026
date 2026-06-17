"use client";
import React, { FormEvent } from 'react';
import styles from './Asses.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useActionState } from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from 'next/navigation'; 
//import { handleCategorySubmit } from './actions'


// multi-choice questions
const QUESTIONS = [
  {
    id: "step1",
    question: "It’s a group project. What role do you naturally fall into?",
    options: [
      { value: "opt1", label: "A. The one who does the research nobody asked for" },
      { value: "opt2", label: "B. The one who builds the actual thing" },
      { value: "opt3", label: "C. The one who presents it" },
      { value: "opt4", label: "D. The one who sets the deadlines and makes sure people meet them" },
    ],
  },
  {
    id: "step2",
    question: "Your friends would describe you as...",
    options: [
      { value: "opt1", label: "A. The one with the craziest stories" },
      { value: "opt2", label: "B. The one who always warns them and is always right" },
      { value: "opt3", label: "C. The one who fixes everything" },
      { value: "opt4", label: "D. Hard to read but always watching" },
    ],
  },
  {
    id: "step3",
    question: "You're at a party. Where are you?",
    options: [
      { value: "opt1", label: "A. In the middle of the room holding court" },
      { value: "opt2", label: "B. You organized the party" },
      { value: "opt3", label: "C. Showed up uninvited and somehow became the main character" },
      { value: "opt4", label: "D. By the door, watching who comes in and who leaves" },
    ],
  },
  {
    id: "step4",
    question: "Someone in the crew is a snitch. How do you find out?",
    options: [
      { value: "opt1", label: "A. You already knew. You've been on to them for weeks" },
      { value: "opt2", label: "B. You check the comms. The evidence is in the data" },
      { value: "opt3", label: "C. You take them out to drinks and get them talking" },
      { value: "opt4", label: "D. You noticed their behaviour changed three days ago" },
    ],
  },
  {
    id: "step5",
    question: "The plan goes sideways. What do you do?",
    options: [
      { value: "opt1", label: "A. Disappear. Regroup. Come back with a new angle" },
      { value: "opt2", label: "B. Switch to Plan B. You always had a Plan B" },
      { value: "opt3", label: "C. Improvise. The best moves aren't planned" },
      { value: "opt4", label: "D. You saw it coming. You already told them this would happen" },
    ],
  },
  {
    id: "step6",
    question: "You're being held in a sterile room for questioning. What's your survival strategy?",
    options: [
      { value: "opt1", label: "A. Say absolutely nothing. Let them try to prove you were ever there" },
      { value: "opt2", label: "B. Study the room's security and find a structural loop to exploit" },
      { value: "opt3", label: "C. Flash a confident smile and charm your way out of the cuffs" },
      { value: "opt4", label: "D. Give them a completely chaotic story that sends their agents in the wrong direction" },
    ],
  },
  {
    id: "step7",
    question: "The vault door is open. You have 30 seconds. What do you do?",
    options: [
      { value: "opt1", label: "A. You're the reason the door is open" },
      { value: "opt2", label: "B. You're counting down the seconds and making sure everyone gets out" },
      { value: "opt3", label: "C. You weren't supposed to be here but you're grabbing what you can" },
      { value: "opt4", label: "D. You're watching the corridor. If anyone's coming, the crew knows first" },
    ],
  },
];

export default function Assesment() {
        const router = useRouter();
        const [currentStep, setCurrentStep] = useState(0);
        const [answers, setAnswers] = useState<Record<string, string>>({});
        
        const activeQuestion = QUESTIONS[currentStep];
        
        const handleSelect = (value: string) => {
            // Save selection
            setAnswers((prev) => ({ ...prev, [activeQuestion.id]: value }));
        };
        
        const handleNext = () => {
            if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep((prev) => prev + 1);
            }
        };
        
        const handleBack = () => {
            if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            }
        };
        
        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                console.log("Final Answers Submitted:", answers);
                // const response = await fetch('/api/submit', { method: 'POST', ... });

                router.push('/registration');
            } catch (error) {
                console.error('Submission failed', error);
            }
        };

    return(
        <div className={`${styles.container2} flex flex-col py-[50px] px-[50px] items-center relative `}>
            <div className={`${styles.quest1}  w-[1200px] h-auto flex flex-col items-center relative `}>
                <div className={`${styles.paperOne} w-full h-[700px] flex flex-col items-center`}>
                    <Image className={`${styles.desktop}`}
                    src="/images/bg_four.png"
                    alt="paper Bg"
                    width={1000}
                    height={700}
                    />
                    <Image className={`${styles.mobile} `}
                    src="/images/mbg_two.png"
                    alt="paper Bg"
                    width={600}
                    height={700}
                    />
                </div>
                <div className={`${styles.paperTwo} w-full h-[700px]`}>
                  <div className={`${styles.crew} flex items-center mt-[38px] mx-[147px] justify-between `}>
                    <p className={`${styles.crewkid1} bg-[#1A1A1A] w-[520px] p-[5px] text-white font-courier text-[20px] `}>CREW ASSESSMENT / CLASSIFICATION PROTOCOL</p>
                    {/* Progress */}
                    <div className={`${styles.crewkid2} text-[#1a1a1a] text-[20px] flex flex-col items-center font-courier italic `}>
                      {(currentStep + 1)}/7
                      <Image className={`${styles.crewLine} `} src={'/images/underLine.png'} alt='line' width={45} height={9} />
                    </div>
                  </div>
                    <div className={`${styles.every} mt-[20px] ml-[177px] text-[#1A1A1A] text-[19px] font-courier italic max-w-[700px] `}>Every operative has a role. This assessment determines yours. Answer honestly. The operation depends on it.</div>
                    <form className={`${styles.formm} self-center flex flex-col items-center w-[900px] `} onSubmit={handleSubmit}>
                        <h2 className={`${styles.questionL} text-[#1A1A1A] w-[800px] text-[24px] text-left mt-[20px] ml-[30px] font-courier font-bold `}>{activeQuestion.question}</h2>

                        {/* Button Options Grid */}
                        <div className="space-y-3 mt-[20px] ">
                        {activeQuestion.options.map((option) => {
                            const isChecked = answers[activeQuestion.id] === option.value;
                            return (
                            <div key={option.value}>
                                {/* 2. Hidden Input */}
                                <input
                                type="radio"
                                id={option.value}
                                name={activeQuestion.id}
                                value={option.value}
                                checked={isChecked}
                                onChange={() => handleSelect(option.value)}
                                className="sr-only peer"
                                />
                                
                                {/* 3. Button Styled Label */}
                                
                                <label
                                htmlFor={option.value}
                                className={`${styles.questionB} block text-left text-[#1a1a1a] w-[760px] text-[28px] p-2 border border-[#1a1a1a] font-tungstenC cursor-pointer transition-all
                                    hover:bg-black
                                    hover:text-white
                                    peer-checked:bg-black peer-checked:text-white`}
                                >
                                {option.label}
                                </label>
                            </div>
                            );
                        })}
                        </div>

                        {/* Navigation Actions */}
                        <div className="flex justify-between mt-[20px] ml-[70px] gap-[20px] self-start ">
                        {currentStep > 0 ? (
                            <button type="button" onClick={handleBack} className="px-4 py-2 border-[1px] text-black hover:bg-black hover:text-white ">
                            <MdArrowBackIosNew />
                            </button>
                        ) : <Link href="/" className="flex items-center px-4 py-2 border-[1px] text-black hover:bg-black hover:text-white ">
                            <MdArrowBackIosNew />
                            </Link>
                        }

                        {currentStep < QUESTIONS.length - 1 ? (
                            <button
                            type="button"
                            onClick={handleNext}
                            disabled={!answers[activeQuestion.id]} // Lock until they choose an option
                            className={` flex items-center gap-[5px] px-6 py-2 bg-black text-white text-[24px] font-tungstenC hover:bg-white hover:text-black disabled:bg-black disabled:text-white disabled:cursor-not-allowed `}
                            >
                            Next <MdArrowForwardIos />
                            </button>
                        ) : (
                            <button
                            type="submit"
                            disabled={!answers[activeQuestion.id]}
                            className=" flex items-center gap-[5px] px-6 py-2 bg-black text-white text-[24px] font-tungstenC hover:bg-white hover:text-black disabled:bg-black disabled:text-white disabled:cursor-not-allowed "
                            >
                            Finish <MdArrowForwardIos />
                            </button>
                        )}
                        </div>
                    </form>
                </div>
                <div className={`absolute top-0 left-0 z-[90]  w-full h-[700px] flex justify-center items-center `}>
                  <Image 
                  src="/images/nclogo.png"
                  alt="logo"
                  width={260}
                  height={260}
                  />
                </div>
            </div>
            <div className={`${styles.desktop} absolute top-[500] right-[160] z-[90] flex justify-center items-center rotate-30 `}>
              <Image className={`relative `}
                src="/images/qMark.png"
                alt="question mark"
                width={229}
                height={254}
              />
            </div>
            <div className={`${styles.pic2} absolute top-[400] right-[220] z-[90] flex justify-center items-center `}>
              <Image
                src="/images/drumPerson.png"
                alt="drum dude"
                width={229}
                height={254}
              />
            </div>
        </div>
    );
}
  