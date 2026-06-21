import { useRef } from "react";

let globalAudio: HTMLAudioElement | null = null;

export function useGlobalAudio() {
  const setAudioRef = (ref: HTMLAudioElement | null) => {
    globalAudio = ref;
  };

  const playAudio = async () => {
    try {
      if (!globalAudio) return;
      globalAudio.currentTime = 0;
      await globalAudio.play();
    } catch (err) {
      console.log("audio blocked", err);
    }
  };

  return { setAudioRef, playAudio };
}