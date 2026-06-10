import { useMemo } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import SectionTwoCols from '../../../../sections/section-two-cols';
import ContentItem from '../../../../_commons/content-item';
import TextLines from '../../../../_commons/text-lines';

const SectionDetails = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();

  const story = useMemo(() => {
    const story = l(locale, localizations, 'about.story');
    const highlight = l(locale, localizations, 'about.story-highlight');
    if (!highlight) return story;
    return story.replace(
      highlight,
      `<span style="color: #10B981; font-weight: 600">${highlight}</span>`
    );
  }, [locale, localizations]);

  const colEnd = useMemo(() => {
    return (
      <ul className="flex flex-col justify-start items-stretch">
        <li>
          <ContentItem
            title={l(locale, localizations, 'about.caption-established')}
            text={l(locale, localizations, 'about.text-established')}
          />
          <ContentItem
            title={l(locale, localizations, 'about.caption-capital')}
            text={l(locale, localizations, 'about.text-capital')}
          />
          <ContentItem
            title={l(locale, localizations, 'about.caption-headquarter')}
            text={l(locale, localizations, 'about.text-headquarter')}
          />
        </li>
      </ul>
    );
  }, [locale, localizations]);

  return (
    <div className="py-20 flex flex-col justify-start items-stretch">
      <SectionTwoCols title={null} colEnd={colEnd}>
        <p className="text-text-muted text-base lg:text-lg leading-relaxed">
          <TextLines text={story} />
        </p>
      </SectionTwoCols>
    </div>
  );
};

export default SectionDetails;
