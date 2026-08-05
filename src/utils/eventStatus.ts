import { EventStatus } from '../types';
import { parseEventWib } from './date';

export function getEventStatus(
  dateIso: string,
  timeStart: string,
  timeEnd?: string,
  now: Date = new Date()
): EventStatus {
  const { startMs, endMs } = parseEventWib(dateIso, timeStart, timeEnd);
  const nowMs = now.getTime();
  if (nowMs < startMs) return 'mendatang';
  if (nowMs < endMs) return 'berlangsung';
  return 'selesai';
}
