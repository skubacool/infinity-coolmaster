import { PropsWithChildren, useMemo } from 'react';

import Icon from '../icon';

export enum StatBoxTheme {
  normal = 'normal',
  primary = 'primary',
  secondary = 'secondary',
}

export interface StatBoxProps {
  /** Icon key resolved by the shared <Icon /> component. */
  icon: string;
  value: string;
  title: string;
  theme?: StatBoxTheme;
}

const StatBox = (props: PropsWithChildren<StatBoxProps>) => {
  const { icon, value, title, theme } = props;

  const textColor = useMemo(() => {
    switch (theme) {
      case StatBoxTheme.primary:
        return 'text-brand-blue';
      case StatBoxTheme.secondary:
        return 'text-brand-green';
      default:
      case StatBoxTheme.normal:
        return 'text-text-main';
    }
  }, [theme]);

  return (
    <div className="gap-y-6 min-w-[264px] flex flex-col justify-start items-center">
      <span className={`block ${textColor}`}>
        <Icon name={icon} size={48} />
      </span>
      <span
        className={`block ${textColor} text-center text-7xl lg:text-8xl font-semibold leading-none`}
      >
        {value}
      </span>
      <span className="block text-sm lg:text-base text-title-light text-center uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
};

export default StatBox;
