import { Media } from '../models/media';

const errorUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export const m = (media: Media[] | undefined, key: string): string => {
  if (!media) return errorUrl;
  const medium = media.find((m) => m.key === key);
  if (!medium) return errorUrl;
  return medium.url;
};
