import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { randomWithDigits } from '../../../utils/number-utils';
import { l } from '../../../utils/localization-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import { MenuItem } from '../../../models/menu';
import SafeArea from '../safe-area';
import BrandLogo from '../brand-logo';
import Icon from '../icon';
import LayoutPopup from '../../layouts/layout-popup';

const Nav = (props: PropsWithChildren) => {
  const { hash } = useLocation();

  const [querystring] = useSearchParams();
  const rand = querystring.get('rand');

  const { pathname } = useLocation();

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
  }, [pathname, hash, rand, setPopupVisible]);

  const onClickMenu = useCallback(() => {
    if (!setPopupVisible) return;
    setPopupVisible(!popupVisible);
  }, [setPopupVisible, popupVisible]);

  const isSamePath = useCallback(
    (url: string): boolean => {
      return (
        pathname.replace(/\/$/, '') ===
          `/${locale}${url}`.replace(/\/+/, '/').replace(/\/$/, '') ||
        pathname.replace(/\/[0-9]+$/, '').replace(/\/$/, '') ===
          `/${locale}${url}`.replace(/\/+/, '/').replace(/\/$/, '')
      );
    },
    [pathname, locale]
  );

  const onClickLocale = useCallback(() => {
    const nextLocale = locale === 'th' ? 'en' : 'th';
    const path = pathname.replace(/^\/[^/]+/, `/${nextLocale}`);
    navigate(path);
  }, [locale, pathname, navigate]);

  const itemUrl = useCallback(
    (url: string) =>
      `/${locale}/${url.replace(/\{\{random}}/g, String(randomWithDigits(8)))}`.replace(
        /\/{2,}/g,
        '/'
      ),
    [locale]
  );

  return (
    <>
      {/* Sticky, frosted-glass corporate navbar */}
      <header className="sticky top-0 z-50 w-full h-20 backdrop-blur-md bg-white/80 border-b border-sep-pale flex flex-col justify-stretch items-stretch">
        <SafeArea>
          <div className="w-full h-full flex flex-row justify-start items-center">
            <Link to={`/${locale}`} aria-label="Infinity CoolMaster — Home">
              <BrandLogo height={56} />
            </Link>
            <div className="flex-1" />
            <div className="lg:hidden flex flex-row justify-center items-center">
              <button onClick={onClickMenu} aria-label="Open menu">
                <Icon name="menu" size={26} className="text-text-main" />
              </button>
            </div>
            <ul className="hidden lg:flex flex-row items-center gap-x-8">
              {menuItems.map((menuItem) => {
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
                            ? 'text-brand-blue'
                            : 'text-text-main hover:text-brand-blue'
                        }`}
                      >
                        {l(locale, localizations, title)}
                      </span>
                    </Link>
                  </li>
                );
              })}
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
        <div className="px-8 pb-8 absolute left-0 top-0 w-full h-full bg-white flex flex-col justify-stretch items-stretch">
          <div className="py-6 h-20 flex flex-row justify-between items-center">
            <Link to={`/${locale}`} aria-label="Infinity CoolMaster — Home">
              <BrandLogo height={48} />
            </Link>
            <button onClick={onClickMenu} aria-label="Close menu">
              <Icon name="close" size={28} className="text-text-main" />
            </button>
          </div>
          <ul className="mt-4 flex flex-col justify-start items-stretch">
            {menuItems.map((menuItem) => {
              const { id, title, url, isCta } = menuItem;
              return (
                <li key={id} className="py-4">
                  <Link to={itemUrl(url)}>
                    <span
                      className={`text-2xl ${
                        isCta
                          ? 'font-semibold text-gradient-caas'
                          : isSamePath(url)
                            ? 'font-semibold text-brand-blue'
                            : 'text-text-main'
                      }`}
                    >
                      {l(locale, localizations, title)}
                    </span>
                  </Link>
                </li>
              );
            })}
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
