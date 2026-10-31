"use client";

import type { PointerEvent } from "react";

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
      <header className="home-nav">
        <a className="home-brand" href="/" aria-label="Satvic Movement home">
          <img className="home-logo" src="/logo.jpg" alt="" />
          <span>Satvic Movement</span>
        </a>
      </header>
      <section
        className="home-hero"
        aria-label="Satvic Movement"
        onPointerMove={revealDots}
        onPointerLeave={hideDots}
      >
        <div className="dot-matrix" aria-hidden="true" />
      </section>
    </main>
  );
}
