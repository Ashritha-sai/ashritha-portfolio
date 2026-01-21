"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
};

export function TypedText({ text, speed = 50, delay = 500, className = "" }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayed, text, speed, started]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
