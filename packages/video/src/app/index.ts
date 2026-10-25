import { Board } from "./board";
import { Card } from "./card";
import { CommandMenu } from "./command-menu";
import { Connector } from "./connector";
import { Grid } from "./grid";
import { Menu } from "./menu";
import { Note } from "./note";
import { Panel } from "./panel";
import { Sidebar } from "./sidebar";
import { Stroke } from "./stroke";
import { Tools } from "./tools";
import { Window } from "./window";
import { Zoom } from "./zoom";

/** Pond's app surfaces, rebuilt at real size so a video can drive them frame by frame. */
export const App = {
  Window,
  Sidebar,
  Panel,
  Grid,
  Menu,
  CommandMenu,
  Board,
  Card,
  Note,
  Connector,
  Stroke,
  Tools,
  Zoom,
};

export { CANVAS_COLORS, type CanvasColor } from "./board/colors";
export { type Box, cardBox } from "./card";
export {
  COMMAND_MENU,
  type MatchRange,
  type PaletteEntry,
  type PaletteRow,
  type PaletteState,
  PaletteThumb,
} from "./command-menu";
export { anchor, type End } from "./connector";
export * from "./geometry";
export type { Tile } from "./grid";
export type { Side } from "./handles";
export { IMPORT_ITEMS, type MenuItem, type MenuLevel, NEW_ITEMS } from "./menu";
export {
  type CanvasRow,
  libraryPlaces,
  type Place,
  type TreeRow,
} from "./sidebar";
export type { StrokePoint } from "./stroke";
export { CANVAS_TOOLS, type CanvasTool, toolIndex } from "./tools";
