import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  menuPath,
  PageKey,
  paths,
  switchLocalePath,
} from '../../../config/routes';
import {
  RESOURCE_GUIDE_PAGES,
  RESOURCE_TOOL_PAGES,
  isDraftPage,
  siteMeta,
} from '../../../seo/pages';
import { l } from '../../../utils/localization-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import { MenuItem } from '../../../models/menu';
import { Locale } from '../../../models/_commons/localized';
import SafeArea from '../safe-area';
import BrandLogo from '../brand-logo';
import Icon from '../icon';
import LayoutPopup from '../../layouts/layout-popup';

/** Resource pages grouped for the nav: interactive tools, then guides. */
const resourceGroups = (locale: Locale) => {
  const meta = siteMeta(locale);
  const visible = (keys: PageKey[]) => keys.filter((key) => !isDraftPage(key));
  return [
    { title: meta.resourcesTools, keys: visible(RESOURCE_TOOL_PAGES) },
    { title: meta.resourcesGuides, keys: visible(RESOURCE_GUIDE_PAGES) },
  ];
};

const RESOURCE_KEYS: PageKey[] = [
  ...RESOURCE_TOOL_PAGES,
  ...RESOURCE_GUIDE_PAGES,
];

/** Desktop "Resources" dropdown: opens on mouse hover, or on click/keyboard. */
const ResourcesMenu = (props: { locale: Locale; active: boolean }) => {
  const { locale, active } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement | null>(null);
  const meta = siteMeta(locale);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-resources"
        onClick={() => setOpen((value) => !value)}
        className={`gap-x-1 flex flex-row items-center text-sm font-medium transition-colors ${
          active || open
            ? 'text-brand-blue-ink'
            : 'text-text-main hover:text-brand-blue-ink'
        }`}
      >
        {meta.resourcesTitle}
        <Icon
          name="chevron-down"
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {/* pt-3 bridges the gap, so the panel stays open while the mouse moves onto it */}
      <div
        id="nav-resources"
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <div className="card-premium w-[480px] p-6 gap-x-8 grid grid-cols-2">
          {resourceGroups(locale).map((group) => (
            <div key={group.title} className="gap-y-3 flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-title-light">
                {group.title}
              </span>
              <ul className="gap-y-1 flex flex-col">
                {group.keys.map((key) => (
                  <li key={key}>
                    <Link
                      to={paths.page(locale, key)}
                      className={`-mx-2 px-2 py-1.5 block rounded-lg text-sm hover:bg-bg-soft hover:text-brand-blue-ink transition-colors ${
                        pathname === paths.page(locale, key)
                          ? 'font-semibold text-brand-blue-ink'
                          : 'text-text-main'
                      }`}
                    >
                      {meta.pages[key].label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

/** Mobile menu: Resources as an expandable group (native <details>). */
const ResourcesGroupMobile = (props: { locale: Locale; active: boolean }) => {
  const { locale, active } = props;
  const { pathname } = useLocation();
  const meta = siteMeta(locale);

  return (
    <li className="py-4">
      <details className="group" open={active}>
        <summary className="gap-x-2 flex flex-row justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span
            className={`text-2xl ${
              active ? 'font-semibold text-brand-blue-ink' : 'text-text-main'
            }`}
          >
            {meta.resourcesTitle}
          </span>
          <Icon
            name="chevron-down"
            size={22}
            className="text-title-light transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <div className="mt-4 pl-4 gap-y-5 flex flex-col border-l border-sep-light">
          {resourceGroups(locale).map((group) => (
            <div key={group.title} className="gap-y-2 flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-title-light">
                {group.title}
              </span>
              <ul className="gap-y-1 flex flex-col">
                {group.keys.map((key) => (
                  <li key={key}>
                    <Link
                      to={paths.page(locale, key)}
                      className={`py-1.5 block text-lg ${
                        pathname === paths.page(locale, key)
                          ? 'font-semibold text-brand-blue-ink'
                          : 'text-text-main'
                      }`}
                    >
                      {meta.pages[key].label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </li>
  );
};

const Nav = (props: PropsWithChildren) => {
  const { pathname, hash } = useLocation();

  const navigate = useNavigate();

  const {
    locale = 'en',
    localizations = [],
    navMenu,
    popupVisible,
    setPopupVisible,
  } = useVmScreen();

  const menuItems = useMemo((): MenuItem[] => {
    if (!navMenu) return [];
    const { items } = navMenu;
    return items ?? [];
  }, [navMenu]);

  useEffect(() => {
    if (!setPopupVisible) return;
    setPopupVisible(false);
  }, [pathname, hash, setPopupVisible]);

  const onClickMenu = useCallback(() => {
    if (!setPopupVisible) return;
    setPopupVisible(!popupVisible);
  }, [setPopupVisible, popupVisible]);

  const isSamePath = useCallback(
    (url: string): boolean => {
      const target = menuPath(locale, url);
      if (target === paths.home(locale)) return pathname === target;
      // Section pages stay highlighted on their detail pages.
      return pathname.startsWith(target);
    },
    [pathname, locale]
  );

  const onClickLocale = useCallback(() => {
    const nextLocale = locale === 'th' ? 'en' : 'th';
    // Remember the choice: the bare domain opens this language next time.
    try {
      window.localStorage.setItem('icm_locale', nextLocale);
    } catch {
      // Private mode or blocked storage: the switch still works this visit.
    }
    navigate(switchLocalePath(pathname, nextLocale));
  }, [locale, pathname, navigate]);

  const itemUrl = useCallback((url: string) => menuPath(locale, url), [locale]);

  const resourcesActive = RESOURCE_KEYS.some(
    (key) => pathname === paths.page(locale, key)
  );

  // Resources goes just before Insights, its sibling content section (or
  // before the call-to-action when there is no Insights item).
  const resourcesIndex = useMemo(() => {
    const insights = menuItems.findIndex((item) => item.url === '/insights');
    if (insights > -1) return insights;
    const cta = menuItems.findIndex((item) => item.isCta);
    return cta > -1 ? cta : menuItems.length;
  }, [menuItems]);

  const contactItem = menuItems.find((item) => item.isCta);

  /** Inserts the Resources entry at its slot in a rendered item list. */
  const withResources = (items: ReactNode[], resources: ReactNode) => [
    ...items.slice(0, resourcesIndex),
    resources,
    ...items.slice(resourcesIndex),
  ];

  return (
    <>
      {/* Sticky, frosted-glass corporate navbar */}
      <header className="sticky top-0 z-50 w-full h-20 backdrop-blur-md bg-white/80 border-b border-sep-pale flex flex-col justify-stretch items-stretch">
        <SafeArea>
          <div className="w-full h-full flex flex-row justify-start items-center">
            <Link
              to={paths.home(locale)}
              aria-label="Infinity CoolMaster — Home"
            >
              <BrandLogo height={56} />
            </Link>
            <div className="flex-1" />
            <div className="lg:hidden gap-x-4 flex flex-row justify-center items-center">
              {contactItem && (
                <Link to={itemUrl(contactItem.url)}>
                  <span className="btn-caas !py-2 !px-4 !text-sm">
                    {l(locale, localizations, 'menu.contact-short')}
                  </span>
                </Link>
              )}
              <button onClick={onClickMenu} aria-label="Open menu">
                <Icon name="menu" size={26} className="text-text-main" />
              </button>
            </div>
            <ul className="hidden lg:flex flex-row items-center gap-x-8">
              {withResources(
                menuItems.map((menuItem) => {
                  const { id, title, url, isCta } = menuItem;
                  if (isCta) {
                    return (
                      <li key={id}>
                        <Link to={itemUrl(url)}>
                          <span className="btn-caas !py-2.5 !px-6 !text-sm">
                            {l(locale, localizations, title)}
                          </span>
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={id}>
                      <Link to={itemUrl(url)}>
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isSamePath(url)
                              ? 'text-brand-blue-ink'
                              : 'text-text-main hover:text-brand-blue-ink'
                          }`}
                        >
                          {l(locale, localizations, title)}
                        </span>
                      </Link>
                    </li>
                  );
                }),
                <ResourcesMenu
                  key="resources"
                  locale={locale}
                  active={resourcesActive}
                />
              )}
              <li>
                <button
                  onClick={onClickLocale}
                  className="text-sm font-semibold text-title-light hover:text-text-main transition-colors"
                >
                  {locale === 'th' ? 'EN' : 'TH'}
                </button>
              </li>
            </ul>
          </div>
        </SafeArea>
      </header>
      <LayoutPopup visible={popupVisible ?? false}>
        <div className="px-8 pb-8 absolute left-0 top-0 w-full h-full overflow-y-auto bg-white flex flex-col justify-stretch items-stretch">
          <div className="py-6 h-20 flex-shrink-0 flex flex-row justify-between items-center">
            <Link
              to={paths.home(locale)}
              aria-label="Infinity CoolMaster — Home"
            >
              <BrandLogo height={48} />
            </Link>
            <button onClick={onClickMenu} aria-label="Close menu">
              <Icon name="close" size={28} className="text-text-main" />
            </button>
          </div>
          <ul className="mt-4 flex flex-col justify-start items-stretch">
            {withResources(
              menuItems.map((menuItem) => {
                const { id, title, url, isCta } = menuItem;
                return (
                  <li key={id} className="py-4">
                    <Link to={itemUrl(url)}>
                      <span
                        className={`text-2xl ${
                          isCta
                            ? 'font-semibold text-gradient-caas'
                            : isSamePath(url)
                              ? 'font-semibold text-brand-blue-ink'
                              : 'text-text-main'
                        }`}
                      >
                        {l(locale, localizations, title)}
                      </span>
                    </Link>
                  </li>
                );
              }),
              <ResourcesGroupMobile
                key="resources"
                locale={locale}
                active={resourcesActive}
              />
            )}
            <li className="py-6">
              <div className="h-px bg-sep-pale" />
            </li>
            <li>
              <button onClick={onClickLocale}>
                <span className="font-medium text-2xl text-title-light">
                  {locale === 'th' ? 'EN' : 'TH'}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </LayoutPopup>
    </>
  );
};

export default Nav;
