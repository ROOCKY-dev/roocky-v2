"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Mood accent system — the core visual identity driver for roocky.dev.
 *
 * This hook fetches Ahmed's current "mood" from /api/mood (which reads
 * GitHub activity + time of day) and sets the --accent CSS variable on
 * the <html> element. Every coloured element on the site references
 * var(--accent), so changing it here recolours the entire page.
 *
 * States:
 *   - Pressure (red #FF3B30): >5 open issues OR committed within 2 hours
 *   - Active (yellow #FFD60A): normal working hours, recent activity
 *   - Resting (green #30D158): weekend, late night, or 12+ hours inactive
 *
 * The hook re-polls every 5 minutes so the site shifts colour in real time.
 * The global CSS transition on * ensures the shift is smooth (1.5s ease).
 */

interface MoodData {
  accent: string;
  state: string;
  label: string;
}

// Default to active/yellow so the page has colour immediately
const DEFAULT_MOOD: MoodData = {
  accent: "#FFD60A",
  state: "active",
  label: "active",
};

// Re-poll interval: 5 minutes
const POLL_INTERVAL_MS = 5 * 60 * 1000;

export function useMoodAccent(): MoodData {
  const [mood, setMood] = useState<MoodData>(DEFAULT_MOOD);

  const fetchMood = useCallback(async () => {
    try {
      const res = await fetch("/api/mood");
      if (!res.ok) return;

      const data = (await res.json()) as MoodData;

      // Apply the accent colour to the root element immediately
      document.documentElement.style.setProperty("--accent", data.accent);

      setMood(data);
    } catch {
      // Silently fail — keep whatever accent is currently set
    }
  }, []);

  useEffect(() => {
    // Fetch on mount
    fetchMood();

    // Re-evaluate every 5 minutes
    const interval = setInterval(fetchMood, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [fetchMood]);

  return mood;
}
