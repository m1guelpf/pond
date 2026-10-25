import {
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconXmark,
} from "@pond/icons";
import { Button, Chip, Tooltip } from "@pond/ui";
import type { AssistantChange } from "@shared/assistant";
import { type ReactNode, useEffect, useRef } from "react";
import { useAssistant } from "@/features/agent/state/assistant";
import { review, useReview } from "@/features/agent/state/review";
import { openSave } from "@/features/saves/navigation";
import { useChangeCovers, useFolderName } from "../review";
import { chipDiff, reviewTitle } from "../review/lib";
import { SourceThumbnail } from "../save-preview";
import styles from "./styles.module.css";

const fieldLabels = {
  title: "Title",
  note: "Note",
  tags: "Tags",
  folders: "Folders",
  rating: "Rating",
  trash: "Trash",
  action: "Library",
};

const statusLabels = {
  applied: "Applied",
  dismissed: "Dismissed",
  undone: "Undone",
};

function stars(value: number | null): string {
  if (!value) return "No rating";
  return `${value} ${value === 1 ? "star" : "stars"}`;
}

function Values({ before, after }: { before?: ReactNode; after: ReactNode }) {
  return (
    <p className={styles.values}>
      {before != null ? (
        <>
          <del className={styles.before}>{before}</del>
          <IconArrowRight size={12} className={styles.arrow} />
        </>
      ) : null}
      <span className={styles.after}>{after}</span>
    </p>
  );
}

function Diff({
  change,
  folderName,
}: {
  change: AssistantChange;
  folderName: (id: string) => string;
}) {
  switch (change.field) {
    case "tags":
    case "folders": {
      const name = change.field === "folders" ? folderName : String;
      const chips = chipDiff(change.before, change.after);
      if (!chips.length)
        return (
          <Values after={change.field === "tags" ? "No tags" : "No folders"} />
        );
      return (
        <Chip.Root className={styles.chips}>
          {chips.map((chip) => (
            <Chip.Item key={chip.value} tone={chip.tone}>
              {chip.tone === "added" ? <IconPlus size={12} /> : null}
              <Chip.Label>{name(chip.value)}</Chip.Label>
            </Chip.Item>
          ))}
        </Chip.Root>
      );
    }
    case "title":
      return (
        <Values before={change.before || "Untitled"} after={change.after} />
      );
    case "note":
      return (
        <Values
          before={change.before || undefined}
          after={change.after || "No note"}
        />
      );
    case "rating":
      return (
        <Values before={stars(change.before)} after={stars(change.after)} />
      );
    case "trash":
      return (
        <Values
          before={change.before === "trashed" ? "In Trash" : "In Library"}
          after={change.after === "trashed" ? "In Trash" : "In Library"}
        />
      );
    case "action":
      return <Values after={change.after} />;
  }
}

export function ChangeInspector({
  messageId,
  changes,
  layout,
  disabled = false,
}: {
  messageId: string;
  changes: AssistantChange[];
  layout: "pane" | "panel";
  disabled?: boolean;
}) {
  const folderName = useFolderName();
  useChangeCovers(changes);
  const { inspecting, working } = useReview();
  const index = changes.findIndex(
    (change) => change.id === inspecting?.changeId,
  );
  const change = changes[index];
  const busy = disabled || working.length > 0;
  const step = (delta: number) => {
    const next = changes[(index + delta + changes.length) % changes.length];
    if (next) review.inspect(messageId, next.id);
  };
  useEffect(() => {
    if (!change) review.close();
  }, [change]);
  if (!change) return null;
  const title = reviewTitle(change.title);
  const run = (action: "apply" | "undo" | "dismiss") =>
    void review.run(messageId, [change], action);
  return (
    <aside
      className={styles.inspector}
      data-layout={layout}
      aria-label={`Review ${title}`}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") step(1);
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") step(-1);
        if (event.key === "Escape") review.close();
      }}
      tabIndex={-1}
    >
      <header className={styles.header}>
        <span className={styles.position}>
          Change {index + 1} of {changes.length}
        </span>
        <div className={styles.nav}>
          <Tooltip label="Previous Change">
            <Button
              icon
              size="sm"
              variant="ghost"
              aria-label="Previous Change"
              disabled={changes.length < 2}
              onClick={() => step(-1)}
            >
              <IconChevronLeft />
            </Button>
          </Tooltip>
          <Tooltip label="Next Change">
            <Button
              icon
              size="sm"
              variant="ghost"
              aria-label="Next Change"
              disabled={changes.length < 2}
              onClick={() => step(1)}
            >
              <IconChevronRight />
            </Button>
          </Tooltip>
          <Tooltip label="Close">
            <Button
              icon
              size="sm"
              variant="ghost"
              aria-label="Close"
              onClick={review.close}
            >
              <IconXmark />
            </Button>
          </Tooltip>
        </div>
      </header>
      <div className={styles.body}>
        {change.saveId ? (
          <Button
            variant="text"
            className={styles.preview}
            aria-label={`Open ${title}`}
            onClick={() => openSave(change.saveId)}
          >
            <SourceThumbnail id={change.saveId} />
          </Button>
        ) : null}
        <h3 className={styles.title}>{title}</h3>
        <section className={styles.section}>
          <h4>{fieldLabels[change.field]}</h4>
          <Diff change={change} folderName={folderName} />
        </section>
        {change.reason ? (
          <section className={styles.section}>
            <h4>Why</h4>
            <p>{change.reason}</p>
          </section>
        ) : null}
        {change.field === "action" && change.action === "runOperation" ? (
          <details className={styles.details}>
            <summary>Details</summary>
            <pre>{JSON.stringify(change.payload?.arguments, null, 2)}</pre>
          </details>
        ) : null}
        {change.error ? (
          <p className={styles.error} role="alert">
            {change.error}
          </p>
        ) : null}
      </div>
      <footer className={styles.footer}>
        {change.saveId ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => openSave(change.saveId)}
          >
            Open Save
          </Button>
        ) : (
          <span />
        )}
        <div className={styles.actions}>
          {change.status === "pending" ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                disabled={busy}
                onClick={() => run("dismiss")}
              >
                Dismiss
              </Button>
              <Button
                size="sm"
                disabled={busy}
                loading={working.includes(change.id)}
                onClick={() => run("apply")}
              >
                <IconCheck size={12} />
                {change.error ? "Retry" : "Apply"}
              </Button>
            </>
          ) : (
            <>
              <span className={styles.status} role="status">
                {statusLabels[change.status]}
              </span>
              {change.status === "applied" && change.undoable !== false ? (
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy}
                  loading={working.includes(change.id)}
                  onClick={() => run("undo")}
                >
                  Undo
                </Button>
              ) : null}
            </>
          )}
        </div>
      </footer>
    </aside>
  );
}

/** The fish page borrows the app's right column for change review. */
export function ChangeReviewPanel({ open }: { open: boolean }) {
  const state = useAssistant();
  const { inspecting } = useReview();
  const wasOpen = useRef(open);
  useEffect(() => {
    if (wasOpen.current && !open) review.close();
    wasOpen.current = open;
  }, [open]);
  const changes =
    state.messages.find((message) => message.id === inspecting?.messageId)
      ?.metadata?.changes ?? [];
  if (!inspecting || !changes.length) return null;
  return (
    <ChangeInspector
      key={inspecting.messageId}
      messageId={inspecting.messageId}
      changes={changes}
      layout="panel"
      disabled={state.busy}
    />
  );
}
