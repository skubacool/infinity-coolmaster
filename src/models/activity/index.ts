import { LocalizedText } from '../_commons/localized';

export interface ActivityTag {
  id: number;
  color: string;
  title: LocalizedText;
}

export interface ActivityType {
  id: number;
  color: string;
  title: LocalizedText;
}

/** An insight, technical article or company news item. */
export interface Activity {
  id: number;
  /** URL slug, e.g. 'cfo-guide-cooling-as-a-service'. Falls back to the English title. */
  slug?: string;
  thumbnail: string;
  banner: string;
  tag: ActivityTag | null;
  type: ActivityType | null;
  title: LocalizedText;
  excerpt: LocalizedText;
  details: LocalizedText;
  publishedAt: string;
  nextActivityId: number | null;
}
