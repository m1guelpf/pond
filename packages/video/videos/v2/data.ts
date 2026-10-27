import {
  IconAnthropic,
  IconApple,
  IconBrandBehance,
  IconBrandBluesky,
  IconBrandDribbble,
  IconBrandSavee,
  IconBrandTumblr,
  IconBrandUnsplash,
  IconBrandVimeo,
  IconInstagram,
  IconLmStudio,
  IconOllama,
  IconOpenAI,
  IconReddit,
  IconTikTok,
  IconXTwitter,
  IconYoutube,
} from "@pond/icons/social-media";
import { type FishColor, type FishSpecies, scatter } from "@pond/video";
import type { ComponentType, SVGProps } from "react";

export const media = (id: string) => `/media/${id}.jpg`;

export interface Source {
  name: string;
  /** The chip tint, sampled from the brand's tile. */
  color: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** A background for glyph-only icons, which have no tile of their own. */
  tile?: string;
}

/** The seven sources 2.0 syncs, in changelog order. */
export const SOURCES: Source[] = [
  { name: "Tumblr", color: "#001935", Icon: IconBrandTumblr },
  { name: "Savee", color: "#111111", Icon: IconBrandSavee },
  { name: "Behance", color: "#1769ff", Icon: IconBrandBehance },
  { name: "Vimeo", color: "#1ab7ea", Icon: IconBrandVimeo },
  { name: "Dribbble", color: "#ea4c89", Icon: IconBrandDribbble },
  { name: "Unsplash", color: "#000000", Icon: IconBrandUnsplash },
  { name: "Bluesky", color: "#1185fe", Icon: IconBrandBluesky },
];

/** The apps whose data exports Import Data Export reads. */
export const ARCHIVES: Source[] = [
  { name: "X", color: "#0f1419", Icon: IconXTwitter },
  { name: "Instagram", color: "#e1306c", Icon: IconInstagram },
  { name: "TikTok", color: "#000000", Icon: IconTikTok },
  { name: "YouTube", color: "#ff0000", Icon: IconYoutube },
  { name: "Reddit", color: "#ff4500", Icon: IconReddit },
];

/** Models a fish can run on, ending on the one that needs no key or host. */
export const MODELS: Source[] = [
  { name: "OpenAI", color: "#000000", Icon: IconOpenAI, tile: "#000" },
  {
    name: "Anthropic",
    color: "#d97757",
    Icon: IconAnthropic,
    tile: "#d97757",
  },
  { name: "Ollama", color: "#000000", Icon: IconOllama, tile: "#111" },
  { name: "LM Studio", color: "#4f46e5", Icon: IconLmStudio, tile: "#4f46e5" },
  {
    name: "Apple Intelligence",
    color: "#a855f7",
    Icon: IconApple,
    tile: "linear-gradient(135deg, #ff9f0a, #ff375f 35%, #bf5af2 65%, #0a84ff)",
  },
];

/** Where each source tile settles around the "Seven new sources" line, from stage center. */
export const ORBIT = [
  { x: -600, y: -250, size: 132, turn: -8 },
  { x: -190, y: -330, size: 112, turn: 5 },
  { x: 330, y: -290, size: 140, turn: 7 },
  { x: 650, y: -40, size: 118, turn: -5 },
  { x: 470, y: 250, size: 136, turn: 6 },
  { x: -40, y: 320, size: 116, turn: -6 },
  { x: -520, y: 220, size: 124, turn: 4 },
];

export interface Member {
  species: FishSpecies;
  color: FishColor;
  x: number;
  y: number;
  /** 0 is far and small, 1 is near and large. */
  depth: number;
}

const SPECIES: FishSpecies[] = [
  "goldfish",
  "puffer",
  "clownfish",
  "angelfish",
  "koi",
  "shark",
  "anglerfish",
  "sunfish",
];
const COLORS: FishColor[] = [
  "gold",
  "teal",
  "red",
  "purple",
  "orange",
  "blue",
  "green",
  "pink",
];

/** Koi's spot in the school, in stage pixels. */
export const KOI_SPOT = { x: 960, y: 430 };

/** A jittered grid of fish across the frame, clear of Koi. */
export const SCHOOL: Member[] = Array.from({ length: 15 * 9 }, (_, i) => {
  const column = i % 15;
  const row = Math.floor(i / 15);
  return {
    species: SPECIES[Math.floor(scatter(i * 3 + 7) * 8)] ?? "goldfish",
    color: COLORS[Math.floor(scatter(i * 3 + 11) * 8)] ?? "gold",
    x: (column + 0.5) * 128 + (scatter(i * 3 + 1) - 0.5) * 90,
    y: (row + 0.5) * 120 + (scatter(i * 3 + 2) - 0.5) * 80,
    depth: scatter(i * 3 + 5),
  };
}).filter(
  (member) => Math.hypot(member.x - KOI_SPOT.x, member.y - KOI_SPOT.y) > 240,
);

export interface Shot {
  id: string;
  title: string;
  aspect: number;
  ext?: string;
}

const LOUNGE: Shot = {
  id: "01M1Z5DRYKKHRGE6G1HJY7NTTH",
  title: "Leather lounge chair",
  aspect: 1,
};
const WICKER: Shot = {
  id: "01KXAYVKHQ8R54NXFAKFD793TA",
  title: "Wicker chair",
  aspect: 480 / 640,
};
const CABIN: Shot = {
  id: "01KXPDEGV9YA8Q39G77V3HS3AA",
  title: "Kiladalen cabin",
  aspect: 480 / 318,
};

/** The library grid, in the order cards fill the columns. */
export const LIBRARY: Shot[] = [
  {
    id: "01M1Z5EJM0DK2SN3NBPY1SKNYD",
    title: "Lemaire AW25, look 28",
    aspect: 1066 / 1600,
  },
  LOUNGE,
  { id: "01M1Z7ARH04054W1M4T6WP648N", title: "iFest identity", aspect: 1 },
  { id: "01KXP2R8T53GXNDE6MF689MAE4", title: "Zweifel studio", aspect: 1.5 },
  {
    id: "01M1Z5EJM4EJSHHMAQGT0583JE",
    title: "Auralee FW26, look 22",
    aspect: 1066 / 1600,
  },
  { id: "01M1Z7ARJ82B6CY1J9QHHXH33R", title: "911 GT3", aspect: 0.8 },
  WICKER,
  { id: "01M1Z7ARH6SPW2625B2BVKB13D", title: "Grey suit", aspect: 1 },
  {
    id: "01KTK26F2WYAW8DMSMD0KAXNKW",
    title: "Still life, camera",
    aspect: 0.8,
  },
  {
    id: "01M1Z7ARH5ZSSS2T9HF1QE5FP4",
    title: "Light study",
    aspect: 1165 / 1600,
  },
  CABIN,
  { id: "01M1Z7ARGSQ85GMFQE7YBRN8TM", title: "White shirt", aspect: 0.8 },
  { id: "01KXAYBQZS585AQJPP3ZGZAD22", title: "Natural Selection", aspect: 1 },
  { id: "01KXP2TKF2ZN07QE8NDD0S5V5B", title: "Studio storage", aspect: 2 / 3 },
  { id: "01M1Z5DRYJFGZ37JBZGDQ2HYE5", title: "Silver 911", aspect: 0.85 },
  { id: "01KTK26F2XJJNW26QWYQJDWR2D", title: "Travel bag", aspect: 0.75 },
  { id: "01M1Z5EJK6338MH34BE28RPEV9", title: "Desk at night", aspect: 0.75 },
  { id: "01M1Z4YDVSSMZ9HBAJ8B9PYRJC", title: "Mouse", aspect: 0.75 },
  {
    id: "01M1Z7ARH5KKCAA5676VAJQKFT",
    title: "Patchwork knit",
    aspect: 1066 / 1600,
  },
  { id: "01M1Z7ARH75TKXT6577DXZ09K4", title: "Long black coat", aspect: 0.8 },
];

const DAY = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** When a library save was added: newest first, a few days apart. */
export const added = (shot: Shot) =>
  DAY.format(Date.UTC(2026, 3, 24 - LIBRARY.indexOf(shot) * 3));

/** The saves Koi reads to answer, with the dates shown in the card. */
export const CONSULTED = [CABIN, LOUNGE, WICKER].map((shot) => ({
  ...shot,
  date: added(shot),
}));

/** The save the pointer opens in the preview pane. */
export const PREVIEW = {
  ...LOUNGE,
  index: LIBRARY.indexOf(LOUNGE),
  url: "studiomobile.tumblr.com/post/748021",
  author: "Studio Mobile",
  handle: "studiomobile",
  description: "Cognac leather on a walnut frame. Low seat, wide arms.",
  date: added(LOUNGE),
  tags: ["chairs", "cabin", "leather"],
  folders: ["Interiors"],
};

export const ALL_MEDIA = [...new Set(LIBRARY.map((shot) => media(shot.id)))];
