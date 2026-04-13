import "./CustomCursor.scss";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[data-cursor='hover']",
].join(",");

const CustomCursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const coreRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLDivElement>(null);
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const corePointerRef = useRef({ x: 0, y: 0 });
  const glyphPointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setIsEnabled(hoverQuery.matches && !motionQuery.matches);
    };

    updateEnabled();
    hoverQuery.addEventListener("change", updateEnabled);
    motionQuery.addEventListener("change", updateEnabled);

    return () => {
      hoverQuery.removeEventListener("change", updateEnabled);
      motionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    if (targetPointerRef.current.x === 0 && targetPointerRef.current.y === 0) {
      targetPointerRef.current = {
        x: Math.round(window.innerWidth / 2),
        y: Math.round(window.innerHeight / 2),
      };
    }

    corePointerRef.current = { ...targetPointerRef.current };
    glyphPointerRef.current = { ...targetPointerRef.current };

    const applyPosition = (
      element: HTMLDivElement | null,
      x: number,
      y: number,
    ) => {
      if (!element) {
        return;
      }

      element.style.setProperty("--cursor-x", `${x}px`);
      element.style.setProperty("--cursor-y", `${y}px`);
    };

    const updateInteractiveState = (target: Element | null) => {
      const interactiveTarget = target?.closest(INTERACTIVE_SELECTOR);

      document.body.classList.toggle(
        "gzkCursorInteractive",
        Boolean(interactiveTarget),
      );
    };

    const tick = () => {
      const nextCoreX =
        corePointerRef.current.x +
        (targetPointerRef.current.x - corePointerRef.current.x) * 0.42;
      const nextCoreY =
        corePointerRef.current.y +
        (targetPointerRef.current.y - corePointerRef.current.y) * 0.42;
      const nextGlyphX =
        glyphPointerRef.current.x +
        (targetPointerRef.current.x - glyphPointerRef.current.x) * 0.24;
      const nextGlyphY =
        glyphPointerRef.current.y +
        (targetPointerRef.current.y - glyphPointerRef.current.y) * 0.24;

      corePointerRef.current = { x: nextCoreX, y: nextCoreY };
      glyphPointerRef.current = { x: nextGlyphX, y: nextGlyphY };

      applyPosition(coreRef.current, nextCoreX, nextCoreY);
      applyPosition(glyphRef.current, nextGlyphX, nextGlyphY);

      frameRef.current = window.requestAnimationFrame(tick);
    };

    const syncInteractiveStateFromPoint = (x: number, y: number) => {
      updateInteractiveState(document.elementFromPoint(x, y));
    };

    applyPosition(
      coreRef.current,
      targetPointerRef.current.x,
      targetPointerRef.current.y,
    );
    applyPosition(
      glyphRef.current,
      targetPointerRef.current.x,
      targetPointerRef.current.y,
    );
    document.body.classList.add("gzkCursorEnabled", "gzkCursorVisible");

    const onMove = (e: PointerEvent) => {
      targetPointerRef.current = { x: e.clientX, y: e.clientY };
      document.body.classList.add("gzkCursorEnabled", "gzkCursorVisible");
      syncInteractiveStateFromPoint(e.clientX, e.clientY);
    };

    const onPointerLeave = () => {
      document.body.classList.remove(
        "gzkCursorVisible",
        "gzkCursorInteractive",
        "gzkCursorDown",
      );
    };

    const onPointerEnter = (e: PointerEvent) => {
      targetPointerRef.current = { x: e.clientX, y: e.clientY };
      corePointerRef.current = { ...targetPointerRef.current };
      glyphPointerRef.current = { ...targetPointerRef.current };
      applyPosition(coreRef.current, e.clientX, e.clientY);
      applyPosition(glyphRef.current, e.clientX, e.clientY);
      document.body.classList.add("gzkCursorVisible");
      syncInteractiveStateFromPoint(e.clientX, e.clientY);
    };

    const onBlur = () => {
      document.body.classList.remove(
        "gzkCursorVisible",
        "gzkCursorInteractive",
        "gzkCursorDown",
      );
    };

    const onFocus = () => {
      document.body.classList.add("gzkCursorVisible");
      syncInteractiveStateFromPoint(
        targetPointerRef.current.x,
        targetPointerRef.current.y,
      );
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        onBlur();
        return;
      }

      onFocus();
    };

    const onPointerDown = () => {
      document.body.classList.add("gzkCursorDown");
    };

    const onPointerUp = () => {
      document.body.classList.remove("gzkCursorDown");
    };

    frameRef.current = window.requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerenter", onPointerEnter);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerenter", onPointerEnter);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.body.classList.remove(
        "gzkCursorEnabled",
        "gzkCursorVisible",
        "gzkCursorInteractive",
        "gzkCursorDown",
      );
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div ref={coreRef} className="customCursorCore" />
      <div ref={glyphRef} className="customCursorGlyph" />
    </>
  );
};

export default CustomCursor;
