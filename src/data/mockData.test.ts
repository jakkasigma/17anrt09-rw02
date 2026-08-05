import { describe, it, expect } from 'vitest';
import { INITIAL_EVENTS, INITIAL_LOMBA } from './mockData';

describe('mockData consistency', () => {
  it('events are sorted by stepNumber with unique ids', () => {
    const steps = INITIAL_EVENTS.map((e) => e.stepNumber);
    expect(steps).toEqual([...steps].sort((a, b) => a - b));
    expect(new Set(INITIAL_EVENTS.map((e) => e.id)).size).toBe(INITIAL_EVENTS.length);
  });

  it('every lomba event matches its lomba card exactly', () => {
    for (const evt of INITIAL_EVENTS.filter((e) => e.category === 'Lomba')) {
      const lomba = INITIAL_LOMBA.find((l) => l.id === evt.id);
      expect(lomba, `missing lomba card for event ${evt.id}`).toBeDefined();
      expect(lomba!.title).toBe(evt.title);
      expect(lomba!.date).toBe(evt.date);
      expect(lomba!.time).toBe(evt.time);
      expect(lomba!.location).toBe(evt.location);
      expect(lomba!.emoji).toBe(evt.emoji);
    }
  });

  it('every lomba card has a corresponding event', () => {
    for (const lomba of INITIAL_LOMBA) {
      const evt = INITIAL_EVENTS.find((e) => e.id === lomba.id);
      expect(evt, `missing event for lomba ${lomba.id}`).toBeDefined();
    }
  });

  it('all photos have unique ids (events may have none yet)', () => {
    const ids = INITIAL_EVENTS.flatMap((e) => e.photos.map((p) => p.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every lomba has a registration status and registered count', () => {
    for (const lomba of INITIAL_LOMBA) {
      expect(['Pendaftaran Dibuka', 'Segera', 'Selesai']).toContain(lomba.status);
      expect(lomba.registeredCount).toBeGreaterThanOrEqual(0);
    }
  });
});
