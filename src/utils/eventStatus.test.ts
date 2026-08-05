import { describe, it, expect } from 'vitest';
import { getEventStatus } from './eventStatus';

describe('getEventStatus', () => {
  it('returns mendatang before the event start time', () => {
    expect(getEventStatus('2026-08-07', '16:00', undefined, new Date('2026-08-07T15:00:00'))).toBe('mendatang');
  });

  it('returns berlangsung during the event (default 2h window)', () => {
    expect(getEventStatus('2026-08-07', '16:00', undefined, new Date('2026-08-07T16:00:00'))).toBe('berlangsung');
    expect(getEventStatus('2026-08-07', '16:00', undefined, new Date('2026-08-07T17:30:00'))).toBe('berlangsung');
  });

  it('returns selesai after the default end time', () => {
    expect(getEventStatus('2026-08-07', '16:00', undefined, new Date('2026-08-07T18:00:00'))).toBe('selesai');
  });

  it('honors an explicit timeEnd window', () => {
    expect(getEventStatus('2026-08-07', '16:00', '21:00', new Date('2026-08-07T20:00:00'))).toBe('berlangsung');
    expect(getEventStatus('2026-08-07', '16:00', '21:00', new Date('2026-08-07T21:00:00'))).toBe('selesai');
  });

  it('returns mendatang for a future date', () => {
    expect(getEventStatus('2030-08-17', '08:00', undefined, new Date('2026-08-05T12:00:00'))).toBe('mendatang');
  });
});
