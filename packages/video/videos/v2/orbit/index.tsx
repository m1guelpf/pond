import { ease, mix, progress } from "@pond/video";
import { ORBIT, SOURCES } from "../data";
import styles from "./styles.module.css";

interface OrbitProps {
  t: number;
  enter: number;
  step: number;
  exit: number;
}

/** The source tiles burst out of stage center and drift around the line between them. */
export function Orbit({ t, enter, step, exit }: OrbitProps) {
  if (t < enter - 50 || t > exit + 900) return null;
  return (
    <div className={styles.orbit}>
      {SOURCES.map((source, i) => {
        const spot = ORBIT[i];
        if (!spot) return null;
        const at = enter + i * step;
        const out = ease.outQuint(progress(t, at, 1000));
        const land = ease.outBack(progress(t, at, 900));
        const leave = ease.in(progress(t, exit + i * 45, 520));
        const drift = Math.sin((t - at) / 760 + i * 1.7) * 9 * out;
        const spread = out * (1 + leave * 0.18);
        const blur = (1 - out) * 10 + leave * 10;
        return (
          <span
            key={source.name}
            className={styles.tile}
            style={{
              width: spot.size,
              height: spot.size,
              opacity: Math.min(1, out * 2) * (1 - leave),
              transform: `translate(${spot.x * spread - spot.size / 2}px, ${spot.y * spread + drift - spot.size / 2}px) rotate(${spot.turn * out}deg) scale(${mix(0.3, 1, land) * mix(1, 0.9, leave)})`,
              filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
            }}
          >
            <source.Icon aria-hidden />
          </span>
        );
      })}
    </div>
  );
}
