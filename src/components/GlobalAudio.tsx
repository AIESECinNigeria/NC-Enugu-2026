"use client";

import { useEffect, useRef } from "react";
import { useGlobalAudio } from "@/hooks/useGlobalAudio";

export default function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setAudioRef } = useGlobalAudio();

  useEffect(() => {
    setAudioRef(audioRef.current);
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/ncnugsAudio.m4a"
      preload="auto"
      loop
    />
  );
}