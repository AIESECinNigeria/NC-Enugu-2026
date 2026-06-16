
// export default function Assesment() {
//   return <div>

//   </div>;
// }


"use client";
import { useState } from "react";

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

export default function ButtonQuizForm() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Final Answers Submitted:", answers);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <h2 className="text-[#1A1A1A] text-[24px] mt-[20px] font-courier font-bold ">{activeQuestion.question}</h2>

        {/* Button Options Grid */}
        <div className="space-y-3 mb-6">
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
                {/* w-[700px] */}
                <label
                  htmlFor={option.value}
                  className="block w-full text-left text-[#1a1a1a] text-[32px] p-2 border border-[#1a1a1a] font-tungstenC cursor-pointer transition-all
                    hover:bg-[#ce000035] 
                    peer-checked:border-[#CE0000] peer-checked:bg-[#ce000035] peer-checked:text-[#CE0000]"
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>

        {/* Navigation Actions */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 ? (
            <button type="button" onClick={handleBack} className="px-4 py-2 text-gray-600 hover:underline">
              Back
            </button>
          ) : <div />}

          {currentStep < QUESTIONS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!answers[activeQuestion.id]} // Lock until they choose an option
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!answers[activeQuestion.id]}
              className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-300"
            >
              Submit Answers
            </button>
          )}
        </div>
      </form>
    </div>
  );
}