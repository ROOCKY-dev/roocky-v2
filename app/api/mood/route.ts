import { NextResponse } from "next/server";

// Mood accent colours — locked in CLAUDE.md
const MOODS = {
  pressure: { accent: "#FF3B30", state: "pressure", label: "under pressure" },
  active:   { accent: "#FFD60A", state: "active",   label: "active" },
  resting:  { accent: "#30D158", state: "resting",  label: "resting" },
} as const;

type MoodResponse = (typeof MOODS)[keyof typeof MOODS];

// GitHub API endpoints (public, no auth needed)
const REPO_URL = "https://api.github.com/repos/ROOCKY-dev/roocky-v2";
const ISSUES_URL = "https://api.github.com/repos/ROOCKY-dev/Profile/issues?state=open&per_page=100";

interface GitHubRepo {
  pushed_at: string;
}

interface GitHubIssue {
  pull_request?: unknown;
}

/**
 * Compute the mood state based on GitHub activity and current time.
 *
 * Priority order (first match wins):
 *   1. Pressure — >5 open issues OR last commit within 2 hours
 *   2. Resting  — weekend OR no commits in 12+ hours OR 12am–9am (MYT)
 *   3. Active   — normal working hours with recent activity (default)
 *
 * All time comparisons use Asia/Kuala_Lumpur (MYT, UTC+8) since Ahmed is in Malaysia.
 */
function computeMood(
  openIssueCount: number,
  lastPushAt: string | null,
): MoodResponse {
  const now = new Date();

  // Malaysia time (UTC+8)
  const myt = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }));
  const hour = myt.getHours();
  const day = myt.getDay(); // 0 = Sunday, 6 = Saturday

  // Hours since last push
  let hoursSinceLastPush = Infinity;
  if (lastPushAt) {
    const pushDate = new Date(lastPushAt);
    hoursSinceLastPush = (now.getTime() - pushDate.getTime()) / (1000 * 60 * 60);
  }

  // 1. Pressure: >5 open issues OR committed within the last 2 hours
  if (openIssueCount > 5 || hoursSinceLastPush < 2) {
    return MOODS.pressure;
  }

  // 2. Resting: weekend OR no commits in 12+ hours OR late night / early morning (12am–9am)
  const isWeekend = day === 0 || day === 6;
  const isLateNight = hour >= 0 && hour < 9;
  const isInactive = hoursSinceLastPush >= 12;

  if (isWeekend || isLateNight || isInactive) {
    return MOODS.resting;
  }

  // 3. Active: normal working hours, recent-ish activity
  return MOODS.active;
}

export async function GET() {
  try {
    // Fetch repo push activity and open issues in parallel
    const [repoRes, issuesRes] = await Promise.all([
      fetch(REPO_URL, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 300 }, // cache for 5 minutes
      }),
      fetch(ISSUES_URL, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 300 },
      }),
    ]);

    let lastPushAt: string | null = null;
    let openIssueCount = 0;

    if (repoRes.ok) {
      const repo = (await repoRes.json()) as GitHubRepo;
      lastPushAt = repo.pushed_at;
    }

    if (issuesRes.ok) {
      const issues = (await issuesRes.json()) as GitHubIssue[];
      // Filter out pull requests — only count actual issues
      openIssueCount = issues.filter((i) => !i.pull_request).length;
    }

    const mood = computeMood(openIssueCount, lastPushAt);

    return NextResponse.json(mood, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch {
    // If anything fails, default to active (yellow)
    return NextResponse.json(MOODS.active, {
      headers: {
        "Cache-Control": "public, s-maxage=60",
      },
    });
  }
}
