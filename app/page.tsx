"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { Iphone } from "@/components/ui/iphone";
import TargetCursor from "../components/TargetCursor";

const brandName = "Satvic Movement";
const highlightDuration = (brandName.length - 1) * 45 + 520;

function SatvicBrand() {
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [autoAnimating, setAutoAnimating] = useState(false);
  const characterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playNameAnimation = useCallback(() => {
    setAutoAnimating(true);
    if (animationTimer.current) clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(() => setAutoAnimating(false), highlightDuration);
  }, []);

  useEffect(() => {
    playNameAnimation();
    const interval = window.setInterval(playNameAnimation, 5000);
    return () => {
      window.clearInterval(interval);
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, [playNameAnimation]);

  return (
    <a className="home-brand cursor-target" href="/" aria-label="Satvic Movement home" data-cursor-label="Satvic Movement">
      <img className="home-logo" src="/logo.jpg" alt="" />
      <span
        className={`variable-name${autoAnimating ? " is-auto-animating" : ""}`}
        aria-label={brandName}
        onPointerMove={event => {
          if (event.pointerType !== "touch") setPointer({ x: event.clientX, y: event.clientY });
        }}
        onPointerLeave={() => setPointer(null)}
      >
        {Array.from(brandName).map((character, index) => {
          const element = characterRefs.current[index];
          const rect = element?.getBoundingClientRect();
          const proximity = pointer && rect
            ? Math.max(0, 1 - Math.hypot(
              pointer.x - (rect.left + rect.right) / 2,
              pointer.y - (rect.top + rect.bottom) / 2,
            ) / 100)
            : 0;
          const isSpace = character === " ";
          const isSatvic = index < "Satvic".length;
          const weight = (isSatvic ? 600 : 400) + proximity * 400;

          return (
            <span
              key={index}
              ref={element => { characterRefs.current[index] = element; }}
              className={`variable-name-character${isSpace ? " is-space" : ""}${isSatvic ? " is-bold" : ""}`}
              style={{
                fontWeight: Math.round(weight),
                transform: `translateY(${-proximity * 2}px) scale(${1 + proximity * 0.16})`,
                animationDelay: `${index * 45}ms`,
              }}
              aria-hidden="true"
            >
              {character}
            </span>
          );
        })}
      </span>
    </a>
  );
}

export default function Home() {
  const revealDots = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    event.currentTarget.classList.add("is-hovering");
  };

  const hideDots = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.classList.remove("is-hovering");
  };

  return (
    <main className="home-page">
      <TargetCursor />
      <header className="home-nav">
        <SatvicBrand />
      </header>
      <section
        className="home-hero"
        aria-label="Satvic Movement"
        onPointerMove={revealDots}
        onPointerLeave={hideDots}
      >
        <div className="dot-matrix" aria-hidden="true" />
        <div className="hero-phone-wrap">
          <Iphone
            className="hero-phone cursor-target"
            data-cursor-label="iPhone"
            aria-label="iPhone mockup"
          />
        </div>
      </section>
    </main>
  );
}
