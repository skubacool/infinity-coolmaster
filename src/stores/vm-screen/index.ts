import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

import { Menu } from '../../models/menu';
import { Locale, LocalizedKeyText } from '../../models/_commons/localized';
import { Contact } from '../../models/contact';
import { Media } from '../../models/media';
import { findMenu } from '../../apis/menu';
import { listLocalizations } from '../../apis/localization';
import { listContacts } from '../../apis/contact';
import { listMedia } from '../../apis/media';
import { DEFAULT_LOCALE } from '../../config/constants';

const localeState = atom<Locale>(DEFAULT_LOCALE);
const navMenuState = atom<Menu | null>(null);
const footerMenuState = atom<Menu | null>(null);
const contactsState = atom<Contact[]>([]);
const popupVisibleState = atom<boolean>(false);
const localizationsState = atom<LocalizedKeyText[]>([]);
const mediaState = atom<Media[]>([]);
const windowWidthState = atom<number>(1024);

export interface IVmScreen {
  // Observables
  locale?: Locale;
  localizations?: LocalizedKeyText[];
  media?: Media[];
  navMenu?: Menu | null;
  footerMenu?: Menu | null;
  contacts?: Contact[];
  popupVisible?: boolean;
  windowWidth?: number;
  // Actions
  bind?: () => void;
  setPopupVisible?: (visible: boolean) => void;
}

const store: IVmScreen = {};

export const useVmScreen = (): IVmScreen => {
  const { locale: localeParam } = useParams();

  const [locale, setLocale] = useAtom(localeState);
  const [localizations, setLocalizations] = useAtom(localizationsState);
  const [media, setMedia] = useAtom(mediaState);
  const [navMenu, setNavMenu] = useAtom(navMenuState);
  const [footerMenu, setFooterMenu] = useAtom(footerMenuState);
  const [contacts, setContacts] = useAtom(contactsState);
  const [popupVisible, setPopupVisible] = useAtom(popupVisibleState);
  const [windowWidth, setWindowWidth] = useAtom(windowWidthState);

  useEffect(() => {
    if (!localeParam || localeParam === locale) return;
    switch (localeParam) {
      case 'th':
        setLocale('th');
        break;
      case 'en':
      default:
        setLocale('en');
        break;
    }
  }, [localeParam, locale, setLocale]);

  const bind = useCallback(() => {
    setWindowWidth(document.documentElement.offsetWidth);
    const handler = () => {
      setWindowWidth(document.documentElement.offsetWidth);
    };
    window.addEventListener('resize', handler);
    (async () => {
      const results = await Promise.allSettled([
        listLocalizations().then(setLocalizations),
        listMedia().then(setMedia),
        findMenu('nav').then(setNavMenu),
        findMenu('footer').then(setFooterMenu),
        listContacts().then(setContacts),
      ]);
      for (const result of results) {
        if (result.status === 'rejected') {
          console.error('>>error<< vm-screen bind', result.reason);
        }
      }
    })();
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [
    setWindowWidth,
    setLocalizations,
    setMedia,
    setNavMenu,
    setFooterMenu,
    setContacts,
  ]);

  // Observables
  store.locale = locale;
  store.media = media;
  store.localizations = localizations;
  store.navMenu = navMenu;
  store.footerMenu = footerMenu;
  store.contacts = contacts;
  store.popupVisible = popupVisible;
  store.windowWidth = windowWidth;

  // Actions
  store.bind = bind;
  store.setPopupVisible = setPopupVisible;

  return store;
};
