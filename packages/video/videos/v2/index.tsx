import { Caption, defineVideo, Frame, Lockup } from "@pond/video";
import { Chat, DOCK, FLY } from "./chat";
import { ALL_MEDIA, ARCHIVES, MODELS, SOURCES } from "./data";
import { Intro } from "./intro";
import { Library } from "./library";
import { Orbit } from "./orbit";
import { Roll } from "./roll";
import { School } from "./school";
import { CUES, DURATION, end, start } from "./timeline";

const TOP = { y: 118, size: 54 };
const MIDDLE = { y: 540, size: 64 };

function Composition({ t }: { t: number }) {
  return (
    <Frame>
      <School t={t} />
      <Intro
        t={t}
        enter={CUES.introLine}
        exit={CUES.introOut}
        dock={DOCK}
        fly={FLY}
      />
      <Chat t={t} />
      <Caption
        t={t}
        {...TOP}
        text="Ask about your saves."
        enter={CUES.chatRise + 700}
        exit={end("ask") - 300}
      />
      <Caption
        t={t}
        {...TOP}
        text="Run routines when new saves arrive."
        enter={start("routine") + 100}
        exit={end("routine") - 250}
      />
      <Caption
        t={t}
        {...TOP}
        text="Every change waits for your review."
        enter={start("review") + 100}
        exit={CUES.chatAway}
      />
      <Roll
        t={t}
        prefix="Your fish run on"
        items={MODELS}
        enter={start("model") + 300}
        roll={CUES.modelRoll}
        step={CUES.modelStep}
        exit={start("model") + 4300}
      />
      <Library t={t} />
      <Caption
        t={t}
        {...TOP}
        text="Pond 2.0 also introduces a cleaner library."
        enter={start("library") + 500}
        exit={end("library") - 250}
      />
      <Caption
        t={t}
        {...TOP}
        text="Cleaner previews."
        enter={start("preview") + 150}
        exit={end("preview") - 700}
      />
      <Roll
        t={t}
        prefix="Pond now syncs"
        items={SOURCES}
        enter={start("sources") + 100}
        roll={CUES.sourcesRoll}
        step={CUES.sourcesStep}
        exit={CUES.burst - 250}
      />
      <Orbit
        t={t}
        enter={CUES.burst}
        step={CUES.burstStep}
        exit={end("seven") - 700}
      />
      <Caption
        t={t}
        {...MIDDLE}
        text="Seven new sources."
        enter={CUES.burst + 300}
        exit={end("seven") - 650}
      />
      <Roll
        t={t}
        prefix="Import your"
        suffix="archive"
        items={ARCHIVES}
        enter={start("archives") + 100}
        roll={CUES.archivesRoll}
        step={CUES.archivesStep}
        exit={start("archives") + 3900}
      />
      <Caption
        t={t}
        {...MIDDLE}
        text="Every like and save keeps its original date."
        enter={start("archives") + 4250}
        exit={end("archives") - 450}
      />
      <Caption
        t={t}
        {...MIDDLE}
        text="Save from the [Share menu], [Shortcuts], and [Alfred]."
        enter={start("anywhere") + 200}
        exit={end("anywhere") - 700}
      />
      <Caption
        t={t}
        y={540}
        size={72}
        text="Pond {2.0} is out now."
        enter={start("release") + 150}
        exit={end("release") - 400}
      />
      <Lockup t={t} enter={CUES.logo} />
    </Frame>
  );
}

export const video = defineVideo({
  title: "Pond 2.0",
  duration: DURATION,
  poster: 29300,
  media: ALL_MEDIA,
  Composition,
});
