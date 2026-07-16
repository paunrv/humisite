const INTRO_KEY = "humi_intro_seen";
const INTRO_TIMESTAMP_KEY = "humi_intro_timestamp";
/** Session flag — skip intro for the rest of this browser tab session */
const INTRO_SESSION_KEY = "humi_intro_seen_session";
/** Re-show intro after this many hours (across sessions) */
export const INTRO_COOLDOWN_HOURS = 4;

export type IntroStoragePayload = {
  seen: boolean;
  timestamp: number;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readIntroState(): IntroStoragePayload | null {
  if (!isBrowser()) return null;

  try {
    const seen = localStorage.getItem(INTRO_KEY);
    const timestampRaw = localStorage.getItem(INTRO_TIMESTAMP_KEY);
    if (seen !== "true" || !timestampRaw) return null;

    const timestamp = Number(timestampRaw);
    if (Number.isNaN(timestamp)) return null;

    return { seen: true, timestamp };
  } catch {
    return null;
  }
}

export function shouldSkipIntro(now = Date.now()): boolean {
  if (!isBrowser()) return false;

  try {
    if (sessionStorage.getItem(INTRO_SESSION_KEY) === "true") return true;
  } catch {
    /* private browsing / quota */
  }

  const state = readIntroState();
  if (!state?.seen) return false;

  const elapsedMs = now - state.timestamp;
  const cooldownMs = INTRO_COOLDOWN_HOURS * 60 * 60 * 1000;
  return elapsedMs < cooldownMs;
}

export function markIntroSeen(now = Date.now()): void {
  if (!isBrowser()) return;

  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, "true");
  } catch {
    /* private browsing / quota */
  }

  try {
    localStorage.setItem(INTRO_KEY, "true");
    localStorage.setItem(INTRO_TIMESTAMP_KEY, String(now));
  } catch {
    /* private browsing / quota */
  }
}

export function clearIntroSeen(): void {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(INTRO_KEY);
    localStorage.removeItem(INTRO_TIMESTAMP_KEY);
  } catch {
    /* noop */
  }
}
