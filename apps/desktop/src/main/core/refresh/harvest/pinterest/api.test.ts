import type { JsonObject } from "@pond/schema/json";
import { expect, it } from "vitest";
import { fetchPinterestCapture, parsePinPage } from "./api";

function relayPage(payload: JsonObject): string {
  const key = encodeURIComponent(JSON.stringify({ queryID: "q" }));
  return `<script>window.__PWS_RELAY_REGISTER_COMPLETED_REQUEST__("${key}", ${JSON.stringify(payload)});</script>`;
}

function pinPayload(title: string, imageUrl?: string): JsonObject {
  return {
    data: {
      v3GetPinQueryv2: {
        __typename: "PinResponse",
        data: {
          title,
          ...(imageUrl ? { imageLargeUrl: imageUrl } : {}),
        },
      },
    },
  };
}

it("reads the pin from the relay payload", () => {
  const page = parsePinPage(
    relayPage({
      data: {
        v3GetPinQueryv2: {
          __typename: "PinResponse",
          data: {
            title: "Record player",
            imageLargeUrl: "https://i.pinimg.com/a.jpg",
          },
        },
      },
    }),
  );
  expect(page.kind).toBe("pin");
  expect(page.kind === "pin" && page.pin.title).toBe("Record player");
});

it("reports a pin Pinterest has removed", () => {
  const page = parsePinPage(
    relayPage({ data: { v3GetPinQueryv2: { __typename: "PinNotFound" } } }),
  );
  expect(page).toEqual({ kind: "not_found" });
});

it("reports a page without pin data", () => {
  expect(parsePinPage("<html><title>Pinterest</title></html>")).toEqual({
    kind: "no_pin",
  });
});

it("keeps pin data when a sibling relay call also reports PinNotFound", () => {
  const html = `${relayPage({ data: { v3GetPinQueryv2: { __typename: "PinNotFound" } } })}${relayPage(pinPayload("Record player", "https://i.pinimg.com/a.jpg"))}`;
  const page = parsePinPage(html);
  expect(page.kind).toBe("pin");
  expect(page.kind === "pin" && page.pin.title).toBe("Record player");
});

it("builds a capture from injected pin HTML", async () => {
  const result = await fetchPinterestCapture({
    sourceId: "123",
    get: async () =>
      new Response(
        relayPage(pinPayload("Record player", "https://i.pinimg.com/a.jpg")),
      ),
  });
  expect(result.ok).toBe(true);
  expect(result.ok && result.capture.media[0]?.url).toBe(
    "https://i.pinimg.com/a.jpg",
  );
});

it("reports PinNotFound from injected HTML as not_found, not a built capture", async () => {
  const result = await fetchPinterestCapture({
    sourceId: "123",
    get: async () =>
      new Response(
        relayPage({ data: { v3GetPinQueryv2: { __typename: "PinNotFound" } } }),
      ),
  });
  expect(result).toEqual({ ok: false, reason: "not_found" });
});
