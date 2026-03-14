"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

// ── Typewriter sub-component ──
// Types a string character by character using Framer Motion stagger.
function TypewriterText({
  text,
  accentPrompt = false,
  className = "",
  onComplete,
}: {
  text: string;
  accentPrompt?: boolean;
  className?: string;
  onComplete?: () => void;
}) {
  const prefersReduced = useReducedMotion();
  const chars = text.split("");
  const duration = prefersReduced ? 0 : 0.04;
  const stagger = prefersReduced ? 0 : 0.04;

  return (
    <motion.span
      className={`inline whitespace-pre-wrap ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      onAnimationComplete={onComplete}
    >
      {chars.map((char, i) => {
        const isPrompt = accentPrompt && i === 0;
        return (
          <motion.span
            key={i}
            className={isPrompt ? "text-[var(--accent)]" : ""}
            variants={{
              hidden: { opacity: 0, display: "none" },
              visible: {
                opacity: 1,
                display: "inline",
                transition: { duration },
              },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

// ── Blinking cursor ──
function BlinkingCursor() {
  return (
    <span
      className="inline-block w-[0.6em] h-[1.2em] bg-[var(--accent)] align-middle ml-[2px] animate-[blink_1s_step-end_infinite]"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolledPast(latest > 100);
  });

  // If reduced motion, show everything immediately
  useEffect(() => {
    if (prefersReduced) {
      setLine1Done(true);
      setShowLine2(true);
      setLine2Done(true);
      setShowLine3(true);
      setShowScroll(true);
    }
  }, [prefersReduced]);

  // Delay line 2 after line 1 completes
  useEffect(() => {
    if (line1Done && !prefersReduced) {
      const t = setTimeout(() => setShowLine2(true), 400);
      return () => clearTimeout(t);
    }
  }, [line1Done, prefersReduced]);

  // Delay line 3 after line 2 completes
  useEffect(() => {
    if (line2Done && !prefersReduced) {
      const t = setTimeout(() => setShowLine3(true), 600);
      return () => clearTimeout(t);
    }
  }, [line2Done, prefersReduced]);

  // Delay scroll indicator after line 3 appears
  useEffect(() => {
    if (showLine3 && !prefersReduced) {
      const t = setTimeout(() => setShowScroll(true), 1000);
      return () => clearTimeout(t);
    }
  }, [showLine3, prefersReduced]);

  return (
    <section className="relative h-dvh flex items-center overflow-hidden overflow-x-hidden bg-[var(--bg-primary)]">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-20 flex flex-col justify-center h-dvh w-full"
        style={{
          paddingLeft: "clamp(1.5rem, 8vw, 6rem)",
          gap: 0,
        }}
      >
        {/* Line 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReduced ? 0 : 0.5, duration: prefersReduced ? 0 : 0.01 }}
          className="font-mono flex items-center"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <TypewriterText
            text="> Ahmed Husam"
            accentPrompt
            onComplete={() => setLine1Done(true)}
          />
          {line1Done && <BlinkingCursor />}
        </motion.div>

        {/* Line 2 */}
        <div style={{ height: "1.5rem" }} />
        {showLine2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: prefersReduced ? 0 : 0.01 }}
            className="font-mono"
            style={{ fontSize: "clamp(0.95rem, 2.8vw, 2rem)" }}
          >
            <TypewriterText
              text="> CS student. Builder. Foundation."
              accentPrompt
              className="text-[var(--fg-primary)]"
              onComplete={() => setLine2Done(true)}
            />
          </motion.div>
        )}

        {/* Line 3 */}
        <div style={{ height: "1rem" }} />
        {showLine3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-mono italic text-[var(--fg-secondary)]"
            style={{ fontSize: "clamp(0.9rem, 2vw, 1.3rem)" }}
          >
            &ldquo;The foundation you don&rsquo;t see until it&rsquo;s missing.&rdquo;
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {showScroll && !scrolledPast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 font-mono text-[12px] text-[var(--fg-tertiary)]"
        >
          <span>scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      )}
    </section>
  );
}
