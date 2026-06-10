import { PropsWithChildren, useMemo } from 'react';

import { ActivityTag as ActivityTagModel } from '../../../models/activity';
import { Locale } from '../../../models/_commons/localized';

export enum ActivityTagSize {
  normal = 'normal',
  small = 'small',
}

export interface ActivityTagProps {
  locale?: Locale;
  size?: ActivityTagSize;
  tag: ActivityTagModel;
}

const ActivityTag = (props: PropsWithChildren<ActivityTagProps>) => {
  const { locale = 'en', tag, size } = props;

  const localizedTag = useMemo(() => {
    if (!tag?.title) return '';
    return tag.title[locale];
  }, [locale, tag]);

  const fontSize = useMemo(() => {
    switch (size) {
      case ActivityTagSize.small:
        return 'text-xs';
      case ActivityTagSize.normal:
      default:
        return 'text-xs lg:text-sm';
    }
  }, [size]);

  return (
    <div
      className="py-1 px-3 rounded-full"
      style={{ backgroundColor: tag.color }}
    >
      <span className={`block text-white uppercase tracking-wider ${fontSize}`}>
        {localizedTag}
      </span>
    </div>
  );
};

export default ActivityTag;
