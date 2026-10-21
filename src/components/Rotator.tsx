"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = [
  "Web Development",
  "Data Entry",
  "Social Media Management",
  "Marketing",
];

export default function Rotator() {
  const [index, setIndex] = useState(0);
  const [swap, setSwap] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setSwap(true);
      timer.current = setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setSwap(false);
      }, 320);
    }, 2600);
    return () => {
      clearInterval(id);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <span className={swap ? "rotator swap" : "rotator"}>{WORDS[index]}</span>
  );
}
