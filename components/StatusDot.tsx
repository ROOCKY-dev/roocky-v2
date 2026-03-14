"use client";

interface StatusDotProps {
  accent: string;
  label: string;
}

/**
 * Pulsing status dot that reflects Ahmed's current mood state.
 * Colour is driven by the mood accent system.
 * Placed in the top-right of the nav bar.
 */
export function StatusDot({ accent, label }: StatusDotProps) {
  return (
    <span
      className="status-dot relative inline-block h-3 w-3 rounded-full"
      style={{ backgroundColor: accent }}
      title={`Ahmed is currently: ${label}`}
    >
      {/* Pulse ring */}
      <span
        className="status-dot-pulse absolute inset-0 rounded-full"
        style={{ backgroundColor: accent }}
      />
    </span>
  );
}
