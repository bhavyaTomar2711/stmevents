import { createImageUrlBuilder } from "@sanity/image-url";
import { getClient } from "./client";

export function urlFor(source: unknown) {
  const client = getClient();
  if (!client) throw new Error("Sanity not configured");
  const builder = createImageUrlBuilder({
    projectId: client.config().projectId!,
    dataset: client.config().dataset!,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any);
}
