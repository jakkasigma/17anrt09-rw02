import { EventStatus } from '../types';

export function getEventStatus(dateIso: string, timeStart: string, now: Date = new Date()): EventStatus {
  const endMs = new Date(`${dateIso}T${timeStart}:00`).getTime();
  return now.getTime() >= endMs ? 'selesai' : 'mendatang';
}
