import type { AssistantChange } from "@shared/assistant";
import { useSelector } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import { assistant } from "./assistant";

export type ReviewAction = "apply" | "undo" | "dismiss";

export type ReviewPerform = (
  messageId: string,
  changeIds: string[],
  action: ReviewAction,
) => Promise<void>;

interface ReviewState {
  working: string[];
  error: { messageId: string; text: string } | null;
  inspecting: { messageId: string; changeId: string } | null;
}

const store = new Store<ReviewState>({
  working: [],
  error: null,
  inspecting: null,
});

const patch = (value: Partial<ReviewState>) =>
  store.setState((state) => ({ ...state, ...value }));

export const review = {
  async run(
    messageId: string,
    changes: AssistantChange[],
    action: ReviewAction,
    perform: ReviewPerform = assistant.review,
  ) {
    if (!changes.length || store.state.working.length) return;
    patch({ working: changes.map((change) => change.id), error: null });
    try {
      await perform(
        messageId,
        changes.map((change) => change.id),
        action,
      );
    } catch {
      patch({
        error: {
          messageId,
          text: "Could not finish these changes. Check the results before retrying.",
        },
      });
    } finally {
      patch({ working: [] });
    }
  },
  inspect(messageId: string, changeId: string) {
    patch({ inspecting: { messageId, changeId } });
  },
  close() {
    patch({ inspecting: null });
  },
};

export function useReview() {
  return useSelector(store, (state) => state);
}
