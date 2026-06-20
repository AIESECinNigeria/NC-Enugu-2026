"use client";
import React, { FormEvent } from 'react';
import styles from './Asses.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useActionState } from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/config';
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
        const [submitting, setSubmitting] = useState(false);
        
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
        
        // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        //     e.preventDefault();

        //     try {
        //         console.log("Final Answers Submitted:", answers);
        //         // const response = await fetch('/api/submit', { method: 'POST', ... });

        //         router.push('/Classified');
        //     } catch (error) {
        //         console.error('Submission failed', error);
        //     }
        // };

        const CREW_TYPES: Record<string, { name: string; clearance: string }> = {
          opt1:         { name: 'THE SPECIALIST', clearance: 'LEVEL 1' },
          opt2:         { name: 'THE DRIVER',     clearance: 'LEVEL 2' },
          opt3:         { name: 'THE CHARMER',    clearance: 'LEVEL 3' },
          opt4:         { name: 'THE LOOKOUT',    clearance: 'LEVEL 4' },
          opt1_opt4:    { name: 'THE GHOST',      clearance: 'LEVEL 5' },
          opt2_opt3:    { name: 'THE WILD CARD',  clearance: 'LEVEL 6' },
        }

        const deriveCrewType = () => {
          const tally: Record<string, number> = { opt1: 0, opt2: 0, opt3: 0, opt4: 0 }
          Object.values(answers).forEach((v) => { if (tally[v] !== undefined) tally[v]++ })
          const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1])
          // If there's a clear winner, return it
          if (sorted[0][1] > sorted[1][1]) return sorted[0][0]
          // Otherwise return the tied key combo (sorted alphabetically)
          const tiedKey = [sorted[0][0], sorted[1][0]].sort().join('_')
          return CREW_TYPES[tiedKey] ? tiedKey : sorted[0][0]
        }

        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setSubmitting(true);

          try {
            const requestBody = QUESTIONS.reduce((accumulator, q) => {
                const selectedValue = answers[q.id];
                const matchedOption = q.options.find((opt) => opt.value === selectedValue);

                accumulator[q.question] = matchedOption ? matchedOption.label : "";
                return accumulator;
            }, {} as Record<string, string>);

            const response = await fetch(`${API_BASE_URL}/api/nc-enugu-quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorDetails = await response.json().catch(() => null);
                console.error("Server Error Details:", errorDetails);
                throw new Error(`Server returned code: ${response.status}`);
            }

            // Extract quiz_id for linking registration
            const result = await response.json();
            const quizId = result.quiz_id;
            document.cookie = `quiz_id=${quizId}; path=/; max-age=3600; samesite=lax`;

            // Derive crew type from answers and persist for ID generation
            const topAnswer = deriveCrewType()
            const crew = CREW_TYPES[topAnswer]
            document.cookie = `quiz_result=${encodeURIComponent(JSON.stringify(crew))}; path=/; max-age=3600; samesite=lax`

            router.push('/pre-registration');

        } catch (error) {
            console.error('Submission failed', error);
            setSubmitting(false);
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
                                className={`${styles.questionB} block text-left text-[#1a1a1a] w-[760px] text-[28px] p-2 border border-[#1a1a1a] font-tungstenC tracking-wider cursor-pointer transition-all
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
                        <div className={` ${styles.buttC} flex w-[100%] gap-[10px] mt-[20px] `}>
                        {currentStep > 0 ? (
                            <button type="button" onClick={handleBack} className={` ${styles.buttB} py-2 px-5 border-[1px] ml-[30px] text-black hover:bg-black hover:text-white `}>
                            <MdArrowBackIosNew size={14} />
                            </button>
                        ) : <Link href="/" className={` ${styles.buttB} flex items-center py-2 px-4 border-[1px] ml-[70px] text-black hover:bg-black hover:text-white `}>
                            <MdArrowBackIosNew />
                            </Link>
                        }

                        {currentStep < QUESTIONS.length - 1 ? (
                            <button
                            type="button"
                            onClick={handleNext}
                            disabled={!answers[activeQuestion.id]} // Lock until they choose an option
                            className={` ${styles.buttA} flex items-center gap-[5px] px-6 py-2 bg-black text-white text-[24px] font-tungstenC hover:bg-white hover:text-black disabled:bg-black disabled:text-white disabled:cursor-not-allowed `}
                            >
                            Next <MdArrowForwardIos />
                            </button>
                        ) : (
                            <button
                            type="submit"
                            disabled={!answers[activeQuestion.id] || submitting}
                            className={` ${styles.buttA} flex items-center gap-[5px] px-6 py-2 bg-black text-white text-[24px] font-tungstenC hover:bg-white hover:text-black disabled:bg-black disabled:text-white disabled:cursor-not-allowed `}
                            >
                            {submitting ? 'Transmitting...' : 'Finish'} {!submitting && <MdArrowForwardIos />}
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
  