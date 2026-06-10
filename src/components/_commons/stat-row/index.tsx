import { PropsWithChildren, useMemo } from 'react';

import Icon from '../icon';

export enum StatRowTheme {
  normal = 'normal',
  primary = 'primary',
  secondary = 'secondary',
}

export interface StatRowProps {
  /** Icon key resolved by the shared <Icon /> component. */
  icon: string;
  value: string;
  title: string;
  excerpt: string;
  theme?: StatRowTheme;
}

const StatRow = (props: PropsWithChildren<StatRowProps>) => {
  const { icon, value, title, excerpt, theme = StatRowTheme.normal } = props;

  const textColor = useMemo(() => {
    switch (theme) {
      case StatRowTheme.primary:
        return 'text-brand-blue';
      case StatRowTheme.secondary:
        return 'text-brand-green';
      default:
      case StatRowTheme.normal:
        return 'text-text-main';
    }
  }, [theme]);

  return (
    <div className="gap-x-5 flex flex-row justify-start items-start">
      <div
        className={`flex-shrink-0 w-[72px] h-[72px] rounded-2xl bg-gradient-caas-soft border border-sep-pale flex flex-col items-center justify-center ${textColor}`}
      >
        <Icon name={icon} size={32} />
      </div>
      <div className="flex-1 gap-y-1 flex flex-col justify-start items-start">
        <span className={`block font-semibold text-3hxl ${textColor}`}>
          {value}
        </span>
        <span className="block text-lg text-text-main font-medium uppercase tracking-wide">
          {title}
        </span>
        <span className="block text-text-muted text-base">{excerpt}</span>
      </div>
    </div>
  );
};

export default StatRow;
