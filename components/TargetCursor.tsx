"use client";

import { useEffect, useRef } from "react";

export default function TargetCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!pointerQuery.matches) return;

    document.documentElement.classList.add("has-target-cursor");

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const element = document.elementFromPoint(event.clientX, event.clientY);
      const target = element instanceof Element
        ? element.closest<HTMLElement>(".cursor-target[data-cursor-label]")
        : null;

      if (target) {
        const bounds = target.getBoundingClientRect();
        const padding = 8;
        cursor.style.width = `${bounds.width + padding * 2}px`;
        cursor.style.height = `${bounds.height + padding * 2}px`;
        cursor.style.setProperty("--cursor-x", `${bounds.left + bounds.width / 2}px`);
        cursor.style.setProperty("--cursor-y", `${bounds.top + bounds.height / 2}px`);
        cursor.classList.add("is-target");
        label.textContent = target.dataset.cursorLabel ?? "";
      } else {
        cursor.style.width = "36px";
        cursor.style.height = "36px";
        cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
        cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
        cursor.classList.remove("is-target");
        label.textContent = "";
      }

      cursor.classList.add("is-visible");
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) cursor.classList.remove("is-visible", "is-target");
    };

    const onPointerDown = () => cursor.classList.add("is-clicking");
    const onPointerUp = () => cursor.classList.remove("is-clicking");
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      document.documentElement.classList.remove("has-target-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div className="target-cursor" ref={cursorRef} aria-hidden="true">
      <span className="target-cursor-frame">
        <span className="target-cursor-corner target-cursor-corner-top-left" />
        <span className="target-cursor-corner target-cursor-corner-top-right" />
        <span className="target-cursor-corner target-cursor-corner-bottom-left" />
        <span className="target-cursor-corner target-cursor-corner-bottom-right" />
        <span className="target-cursor-dot" />
      </span>
      <span className="target-cursor-label" ref={labelRef} />
    </div>
  );
}
