import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { l } from '../../../utils/localization-utils';
import { randomWithDigits } from '../../../utils/number-utils';
import { MenuItem } from '../../../models/menu';
import { useVmScreen } from '../../../stores/vm-screen';
import SafeArea from '../safe-area';
import BrandLogo, { BrandLogoTone } from '../brand-logo';
import Icon from '../icon';

const Footer = () => {
  const {
    locale = 'en',
    localizations = [],
    footerMenu,
    contacts,
  } = useVmScreen();

  const footerMenuItems = useMemo((): MenuItem[] => {
    if (!footerMenu) return [];
    const { items } = footerMenu;
    return items ?? [];
  }, [footerMenu]);

  const socialContacts = useMemo(() => {
    if (!contacts) return [];
    const otherTypes = ['address', 'tel', 'email', 'maps'];
    return contacts.filter((c) => !otherTypes.includes(c.type));
  }, [contacts]);

  return (
    <footer className="relative bg-navy pt-16 flex flex-col justify-start items-stretch">
      {/* Signature gradient hairline */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-caas" />
      <SafeArea>
        <div className="gap-y-6 flex flex-col justify-start items-stretch">
          <div className="pb-10 lg:pb-0 gap-y-8 lg:gap-y-0 lg:gap-x-10 flex flex-col lg:flex-row justify-start items-center lg:items-start">
            <div className="gap-y-3 flex flex-col justify-start items-center lg:items-start">
              <Link to={`/${locale}`} aria-label="Infinity CoolMaster — Home">
                <BrandLogo tone={BrandLogoTone.light} height={52} />
              </Link>
              <span className="text-white-a70 text-xs tracking-[0.25em] uppercase">
                {l(locale, localizations, 'general.tagline')}
              </span>
            </div>
            <div className="relative flex-1 flex flex-col justify-center items-center">
              <div className="gap-y-3 w-full lg:max-w-[800px] lg:pt-4 lg:pb-9 flex flex-col justify-start items-center lg:items-stretch">
                <ul className="gap-y-4 lg:gap-3 flex flex-col lg:flex-row justify-start items-center lg:items-start flex-wrap">
                  {footerMenuItems.map((menuItem) => {
                    const { id, title, url } = menuItem;
                    return (
                      <li key={id} className="flex-1 flex-shrink-0">
                        <Link
                          to={`/${locale}/${url.replace(/\{\{random}}/g, String(randomWithDigits(8)))}`}
                        >
                          <span className="text-sm text-white-a70 hover:text-white transition-colors whitespace-nowrap">
                            {l(locale, localizations, title)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="h-px bg-white-a10 self-stretch lg:hidden" />
            <div className="gap-y-4 lg:w-[164px] lg:pt-4 lg:pb-9 flex flex-col justify-start items-center lg:items-end">
              <div className="gap-x-4 flex flex-row justify-start items-stretch">
                {socialContacts.map((contact) => {
                  const { id, icon, url, text } = contact;
                  return (
                    <a
                      key={id}
                      target="_blank"
                      href={url ?? '/'}
                      rel="noreferrer"
                      aria-label={text[locale]}
                    >
                      <div className="rounded-full bg-white-a10 hover:bg-white-a20 transition-colors w-10 h-10 flex flex-col justify-center items-center text-white">
                        <Icon name={icon} size={18} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col justify-start items-stretch border-t border-t-white-a10">
            <span className="block text-white-a70 text-2xs lg:text-sm text-center">
              {l(locale, localizations, 'general.copyrights')}
            </span>
          </div>
        </div>
      </SafeArea>
    </footer>
  );
};

export default Footer;
