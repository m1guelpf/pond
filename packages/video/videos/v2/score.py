"""Score for the Pond 2.0 cut: D major, 100 BPM, cues from timeline.ts."""

from pond_score import Harmony, Score, hz

score = Score(duration=58.1)
harmony = Harmony(
    [
        "D", "D", "Bm", "G", "A", "D", "Bm", "G", "A", "D", "Bm", "G", "A",
        "D", "Bm", "G", "A", "D", "Bm", "G", "A", "D", "G", "D", "D",
    ],
    bar=score.bar,
    grid=0.6,
)

score.pads(
    harmony,
    range(-1, 25),
    [(0, 0), (1.0, 0.5), (3.2, 0.75), (5.2, 0.85), (11.0, 0.9), (18.4, 0.95), (23.1, 0.85), (31.9, 0.9), (37.5, 1.0), (51.1, 1.1), (53.7, 0.9), (58.1, 0)],
)
score.arpeggio(
    harmony,
    5.2,
    53.3,
    [(0, 0), (5.2, 0), (6.0, 0.45), (11.0, 0.6), (18.4, 0.8), (23.1, 0.6), (31.9, 0.8), (37.5, 1.0), (51.1, 0.8), (52.9, 0.6), (53.3, 0), (58.1, 0)],
)
score.drums(18.6, 50.9, shaker_from=31.9, rests=[(22.9, 24.3), (40.7, 41.7)])
score.bass(harmony, range(8, 21))

sfx = score.sfx

sfx.add(0.15, score.air(1.2, 300, 2600, rising=True, gain=0.8))
for index, midi in enumerate([74, 78, 81, 76, 83, 86, 81, 88, 90, 86, 93, 88]):
    sfx.add(0.45 + index * 0.075, score.pop(hz(midi), 0.45), pan=-0.8 + index * 0.145)
sfx.add(2.4, score.air(1.1, 2600, 400, rising=False, gain=0.7))
sfx.add(3.2, score.pluck(hz(81), 1.0, 1.3), gain=0.09, pan=-0.2)
sfx.add(3.45, score.bell(hz(86)), gain=0.5, pan=0.1)
sfx.add(4.95, score.pop(hz(90), 0.6), pan=0.1)
sfx.add(4.95, score.air(0.7, 400, 2200, rising=True, gain=0.7))

for index in range(9):
    sfx.add(5.58 + index * 0.085, score.tick(), gain=0.35)
sfx.add(6.5, score.click(0.8), gain=0.6)
sfx.add(6.52, score.pop(hz(86), 0.7), pan=0.3)
sfx.add(7.9, score.pluck(hz(81), 1.0, 1.3), gain=0.1, pan=-0.2)
for index, midi in enumerate([83, 86, 90]):
    sfx.add(8.75 + index * 0.07, score.pop(hz(midi), 0.6), pan=-0.3 + index * 0.3)

sfx.add(11.4, score.bell(hz(81), 1.6), gain=0.4, pan=-0.1)
sfx.add(12.1, score.pluck(hz(78), 1.0, 1.3), gain=0.1, pan=0.2)
sfx.add(13.0, score.pop(hz(83), 0.8), pan=0.1)
sfx.add(16.3, score.click(1.0), gain=0.7)
sfx.add(16.4, score.bell(hz(86)), gain=0.55, pan=0.15)
sfx.add(18.2, score.air(0.6, 2400, 500, rising=False, gain=0.7))

for index, midi in enumerate([78, 81, 83, 86]):
    sfx.add(19.5 + 0.19 + index * 0.6, score.pluck(hz(midi), 0.8, 1.5), gain=0.09, pan=-0.3 + index * 0.2)
    sfx.add(19.5 + 0.19 + index * 0.6, score.tick(), gain=0.5)

sfx.add(22.7, score.air(0.8, 300, 2200, rising=True, gain=0.8))
score.sub(23.1, 50)
for index, midi in enumerate([81, 83, 86, 90]):
    sfx.add(23.4 + index * 0.18, score.pop(hz(midi), 0.5), pan=-0.5 + index * 0.33)
sfx.add(27.7, score.click(0.9), gain=0.6)
sfx.add(27.85, score.air(0.5, 600, 2400, rising=True, gain=0.5))
sfx.add(27.95, score.pluck(hz(86), 1.0, 1.4), gain=0.1, pan=0.4)
sfx.add(31.25, score.air(0.6, 2400, 500, rising=False, gain=0.7))

for index, midi in enumerate([74, 76, 78, 81, 83, 86]):
    sfx.add(32.8 + 0.19 + index * 0.56, score.pluck(hz(midi), 0.8, 1.5), gain=0.09, pan=-0.3 + index * 0.1)
    sfx.add(32.8 + 0.19 + index * 0.56, score.tick(), gain=0.5)
sfx.add(37.2, score.air(0.5, 400, 2400, rising=True, gain=0.9))
for index, midi in enumerate([86, 88, 90, 93, 90, 88, 86]):
    sfx.add(37.65 + index * 0.07, score.pop(hz(midi), 0.8), pan=-0.6 + index * 0.2)
sfx.add(37.75, score.bell(hz(86)), gain=0.6, pan=-0.15)

sfx.add(40.55, score.air(0.6, 2400, 500, rising=False, gain=0.7))
for index, midi in enumerate([78, 81, 83, 86]):
    sfx.add(41.7 + 0.19 + index * 0.62, score.pluck(hz(midi), 0.8, 1.5), gain=0.09, pan=0.3 - index * 0.15)
    sfx.add(41.7 + 0.19 + index * 0.62, score.tick(), gain=0.5)

sfx.add(46.15, score.air(0.6, 2400, 500, rising=False, gain=0.7))
sfx.add(46.6, score.air(0.9, 300, 2200, rising=True, gain=0.7))
for index, midi in enumerate([81, 86, 90]):
    sfx.add(47.05 + index * 0.45, score.pop(hz(midi)), pan=-0.3 + index * 0.3)
sfx.add(50.7, score.air(0.6, 2400, 500, rising=False, gain=0.6))
score.sub(51.2, 50)
sfx.add(51.35, score.bell(hz(86), 2.6), gain=0.6)

score.lockup(53.7, slide=1.3)

score.master()
