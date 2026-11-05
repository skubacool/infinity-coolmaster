import { Activity } from '../../models/activity';

/**
 * The built-in guides' full text is loaded on demand (its own chunk), so it is
 * not part of the JavaScript every page downloads. Pre-rendered pages already
 * contain what they show; this only runs when the browser refreshes content.
 */
export const loadBuiltInGuides = (): Promise<Activity[]> =>
  import('./index').then((module) => module.builtInGuides);
