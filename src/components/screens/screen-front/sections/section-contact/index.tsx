import { useMemo } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import SafeArea from '../../../../_commons/safe-area';
import ContactRow from '../../../../_commons/contact-row';
import TextLines from '../../../../_commons/text-lines';
import LeadForm from '../../../../_commons/lead-form';
import Icon from '../../../../_commons/icon';

/** Lead capture section: pitch + contact details on the left, audit-request form on the right. */
const SectionContact = () => {
  const { locale = 'en', localizations = [], contacts } = useVmScreen();
  const { sectors = [] } = useVmScreenFront();

  const addressContact = useMemo(() => {
    if (!contacts) return null;
    return contacts.find((c) => c.type === 'address') ?? null;
  }, [contacts]);

  const telContact = useMemo(() => {
    if (!contacts) return null;
    return contacts.find((c) => c.type === 'tel') ?? null;
  }, [contacts]);

  const emailContact = useMemo(() => {
    if (!contacts) return null;
    return contacts.find((c) => c.type === 'email') ?? null;
  }, [contacts]);

  const mapsContact = useMemo(() => {
    if (!contacts) return null;
    return contacts.find((c) => c.type === 'maps') ?? null;
  }, [contacts]);

  const mapUrl = useMemo(() => mapsContact?.url ?? null, [mapsContact]);
  const mapText = useMemo(
    () => (mapsContact?.text ? mapsContact.text[locale] : null),
    [locale, mapsContact]
  );

  return (
    <div className="py-12 lg:py-[80px] bg-gradient-caas-soft flex flex-col justify-start items-stretch">
      <SafeArea>
        <div
          id="contact"
          className="gap-y-10 lg:gap-y-0 lg:gap-x-16 flex flex-col lg:flex-row justify-start items-stretch"
        >
          <div className="flex-1 flex flex-col justify-center items-start">
            <span className="kicker">
              {l(locale, localizations, 'front.title-contact')}
            </span>
            <p className="mt-4 lg:mt-6 text-text-main text-2xl lg:text-4hxl font-semibold !leading-[1.25]">
              <TextLines text={l(locale, localizations, 'front.cta-contact')} />
            </p>
            <ul className="mt-8 gap-y-4 flex flex-col justify-start items-start">
              {addressContact && (
                <li>
                  <ContactRow
                    icon={addressContact.icon}
                    text={addressContact.text[locale]}
                  />
                </li>
              )}
              {telContact && (
                <li>
                  <ContactRow
                    icon={telContact.icon}
                    text={telContact.text[locale]}
                    isPhone
                  />
                </li>
              )}
              {emailContact && (
                <li>
                  <ContactRow
                    icon={emailContact.icon}
                    text={emailContact.text[locale]}
                    isEmail
                  />
                </li>
              )}
            </ul>
            {mapUrl && (
              <a
                className="mt-8 gap-x-2 inline-flex flex-row justify-start items-center text-brand-blue"
                target="_blank"
                href={mapUrl}
                rel="noreferrer"
              >
                <span className="text-base lg:text-lg font-medium underline underline-offset-4">
                  {mapText}
                </span>
                <Icon name="arrow-right" size={18} />
              </a>
            )}
          </div>
          <div className="flex-1 w-full max-w-[640px] flex flex-col justify-start items-stretch">
            <LeadForm locale={locale} sectors={sectors} />
          </div>
        </div>
      </SafeArea>
    </div>
  );
};

export default SectionContact;
