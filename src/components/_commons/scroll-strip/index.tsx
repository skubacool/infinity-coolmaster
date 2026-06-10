import { PropsWithChildren, useCallback } from 'react';

import { scrollUp100Vh } from '../../../utils/window-utils';
import Icon from '../icon';

export interface ScrollStripProps {
  text: string;
}

const ScrollStrip = (props: PropsWithChildren<ScrollStripProps>) => {
  const { text } = props;

  const onClick = useCallback(() => {
    scrollUp100Vh();
  }, []);

  return (
    <button
      className="absolute left-0 bottom-6 lg:bottom-12 w-full h-[88px] flex flex-col justify-start items-center"
      onClick={onClick}
    >
      <span className="text-text-muted text-xs lg:text-sm tracking-[0.2em] uppercase">
        {text}
      </span>
      <div className="flex-1 w-px my-2 bg-sep-smoke" />
      <Icon name="arrow-down" size={20} className="text-brand-blue" />
    </button>
  );
};

export default ScrollStrip;
