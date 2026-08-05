export const WIB_OFFSET = '+07:00';

export function parseEventWib(dateIso: string, timeStart: string, timeEnd?: string): {
  startMs: number;
  endMs: number;
} {
  const startMs = new Date(`${dateIso}T${timeStart}:00${WIB_OFFSET}`).getTime();

  if (timeEnd) {
    const endMs = new Date(`${dateIso}T${timeEnd}:00${WIB_OFFSET}`).getTime();
    return { startMs, endMs };
  }

  // Default duration of 2 hours when no explicit end time is provided.
  return { startMs, endMs: startMs + 2 * 60 * 60 * 1000 };
}

export function toEventMsWib(dateIso: string, timeStart: string): number {
  return new Date(`${dateIso}T${timeStart}:00${WIB_OFFSET}`).getTime();
}