import { createFileRoute } from "@tanstack/react-router";
import Invite from "@/components/Invite";
import portrait from "@/assets/joyce-invite-reference.png";

export const Route = createFileRoute("/")({
  component: Invite,
  head: () => ({
    meta: [
      { title: "Joyce Kawesa — 90th Birthday Celebration · May 31, 2026" },
      {
        name: "description",
        content:
          "You are warmly invited to honor Joyce Kawesa on her 90th birthday — Sunday, May 31, 2026 at Forcey Bible Church. A life of love, faith and blessings.",
      },
      { property: "og:title", content: "Joyce Kawesa — 90th Birthday Celebration" },
      {
        property: "og:description",
        content: "Sunday, May 31, 2026 · Forcey Bible Church · 3pm – 7pm",
      },
      { property: "og:image", content: portrait },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: portrait },
    ],
  }),
});
