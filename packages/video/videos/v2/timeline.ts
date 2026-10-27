import { LOCKUP_LENGTH, scenes } from "@pond/video";

const LOGO = 53700;

export const { start, end } = scenes({
  meet: [0, 6000],
  ask: [6000, 11000],
  routine: [11000, 14200],
  review: [14200, 18400],
  model: [18400, 23100],
  library: [23100, 27300],
  preview: [27300, 31900],
  sources: [31900, 37600],
  seven: [37600, 40900],
  archives: [40900, 46500],
  anywhere: [46500, 51100],
  release: [51100, LOGO],
  outro: [LOGO, LOGO + LOCKUP_LENGTH],
});

export const DURATION = end("outro");

/** Beats inside scenes, in ms. `score.py` cues the same moments in seconds. */
export const CUES = {
  schoolIn: 200,
  schoolOut: 2600,
  introLine: 3200,
  introOut: 4650,
  chatRise: 5200,
  askSend: 6500,
  thinking: 7000,
  answer: 7900,
  consulted: 8700,
  routineEvent: 11400,
  routineReply: 12100,
  reviewCard: 13000,
  applyClick: 16300,
  chatAway: 18300,
  modelRoll: 19500,
  modelStep: 600,
  windowRise: 23100,
  tileClick: 27700,
  paneOpen: 27850,
  sourcesRoll: 32800,
  sourcesStep: 560,
  burst: 37450,
  burstStep: 70,
  archivesRoll: 41700,
  archivesStep: 620,
  logo: LOGO,
} as const;
