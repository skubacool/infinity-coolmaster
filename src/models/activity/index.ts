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
  /** Three or four self-contained summary sentences, one per line. */
  keyPoints?: LocalizedText;
  /** Date of the last substantive edit (YYYY-MM-DD); shown as "Last updated". */
  updatedAt?: string;
  /** Standalone page keys (e.g. 'hotels', 'pricing-model') linked under the article. */
  relatedPages?: string[];
  nextActivityId: number | null;
}
