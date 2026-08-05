import { describe, it, expect } from 'vitest';
import { getEventStatus } from './eventStatus';

describe('getEventStatus', () => {
  it('returns selesai after the event start time', () => {
    expect(getEventStatus('2026-08-07', '16:00', new Date('2026-08-07T17:00:00'))).toBe('selesai');
  });

  it('returns mendatang before the event start time', () => {
    expect(getEventStatus('2026-08-07', '16:00', new Date('2026-08-07T15:00:00'))).toBe('mendatang');
  });

  it('returns selesai exactly at the start time', () => {
    expect(getEventStatus('2026-08-07', '16:00', new Date('2026-08-07T16:00:00'))).toBe('selesai');
  });

  it('returns mendatang for a future date', () => {
    expect(getEventStatus('2030-08-17', '08:00', new Date('2026-08-05T12:00:00'))).toBe('mendatang');
  });
});
