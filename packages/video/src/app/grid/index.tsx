import { ease, mix, progress } from "../../motion";
import styles from "./styles.module.css";

export interface Tile {
  key: string;
  src: string;
  title: string;
  aspect: number;
  ext?: string;
  at: number;
}

const COLUMNS = 5;
const GAP = 12;
const PADDING = 16;
const META = 30;
const WIDTH = 1014;

/** The waterfall grid: each card drops into the shortest column and pops in at its `at`. */
export function Grid({ t, tiles }: { t: number; tiles: Tile[] }) {
  const column = (WIDTH - PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS;
  const heights = Array.from({ length: COLUMNS }, () => PADDING);
  return (
    <div className={styles.grid}>
      {tiles.map((tile) => {
        const index = heights.indexOf(Math.min(...heights));
        const top = heights[index] ?? 0;
        const thumb = column / tile.aspect;
        heights[index] = top + thumb + META + GAP;
        const k = ease.outQuint(progress(t, tile.at, 560));
        if (k <= 0) return null;
        return (
          <figure
            key={tile.key}
            className={styles.card}
            style={{
              left: PADDING + index * (column + GAP),
              top,
              width: column,
              opacity: ease.out(progress(t, tile.at, 260)),
              transform: `translateY(${(1 - k) * 14}px) scale(${mix(0.94, 1, k)})`,
            }}
          >
            <span className={styles.thumb}>
              <img
                alt=""
                src={tile.src}
                className={styles.image}
                style={{ height: thumb }}
              />
              {tile.ext ? (
                <span className={styles.type}>{tile.ext}</span>
              ) : null}
            </span>
            <figcaption className={styles.title}>{tile.title}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
