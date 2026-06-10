export interface MenuItem {
  id: number;
  icon?: string;
  /** Localization key, e.g. 'menu.home'. */
  title: string;
  url: string;
  isCta?: boolean;
}

export interface Menu {
  id: number;
  type: string;
  items: MenuItem[];
}
