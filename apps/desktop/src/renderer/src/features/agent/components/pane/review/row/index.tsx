import { Shimmer, Swap } from "@pond/ui";
import type { AssistantChange } from "@shared/assistant";
import { useId } from "react";
import { SourceThumbnail } from "../../save-preview";
import {
  ChangeActions,
  type ChangeProps,
  ChangeSummary,
  fieldIcons,
  statusLabels,
} from "../change";
import { reviewTitle } from "../lib";
import styles from "./styles.module.css";

function statusText(change: AssistantChange, working: boolean) {
  if (working) return "Updating";
  if (change.status !== "pending") return statusLabels[change.status];
  return change.error ? "Failed" : null;
}

function actionsKey(
  change: AssistantChange,
  working: boolean,
  actions: boolean,
) {
  if (working) return "working";
  if (change.status !== "pending") return change.status;
  return actions ? "pending" : "none";
}

export function ChangeRow({
  change,
  busy,
  working,
  selected,
  folderName,
  onAction,
  onInspect,
  actions = true,
}: ChangeProps & { actions?: boolean }) {
  const detailId = useId();
  const title = reviewTitle(change.title);
  const status = statusText(change, working);
  const FieldIcon = fieldIcons[change.field];
  return (
    <li
      className={styles.row}
      data-selected={selected || undefined}
      data-dimmed={
        change.status === "dismissed" || change.status === "undone" || undefined
      }
    >
      <button
        type="button"
        className={styles.main}
        aria-label={`Review ${title}`}
        aria-describedby={detailId}
        aria-pressed={selected}
        onClick={onInspect}
      >
        {change.saveId ? (
          <SourceThumbnail id={change.saveId} size="compact" shape="natural" />
        ) : (
          <span className={styles.icon} aria-hidden>
            <FieldIcon size={12} />
          </span>
        )}
        <span className={styles.text}>
          <span className={styles.title}>{title}</span>
          <Swap
            id={detailId}
            value={status ?? "summary"}
            className={styles.detail}
            data-tone={change.error && !working ? "error" : undefined}
          >
            {working ? (
              <Shimmer.Root className={styles.line}>{status}</Shimmer.Root>
            ) : (
              <span className={styles.line}>
                {status ?? (
                  <ChangeSummary change={change} folderName={folderName} />
                )}
              </span>
            )}
          </Swap>
        </span>
      </button>
      <Swap
        value={actionsKey(change, working, actions)}
        className={styles.actions}
      >
        {actions || change.status !== "pending" ? (
          <ChangeActions
            change={change}
            busy={busy}
            working={working}
            onAction={onAction}
          />
        ) : null}
      </Swap>
    </li>
  );
}
