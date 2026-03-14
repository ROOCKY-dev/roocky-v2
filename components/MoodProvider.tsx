"use client";

import { useMoodAccent } from "@/hooks/useMoodAccent";
import { StatusDot } from "@/components/StatusDot";

/**
 * Client wrapper that initialises the mood accent system.
 * Calls useMoodAccent() on mount to set --accent on <html>.
 * Renders StatusDot in a fixed top-right position (temporary —
 * will move into Nav component when Nav is built).
 */
export function MoodProvider({ children }: { children: React.ReactNode }) {
  const { accent, label } = useMoodAccent();

  return (
    <>
      {/* Temporary fixed position — moves to Nav in Phase 07 */}
      <div className="fixed right-4 top-4 z-50">
        <StatusDot accent={accent} label={label} />
      </div>
      {children}
    </>
  );
}
