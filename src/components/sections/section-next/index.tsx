import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import SafeArea from '../../_commons/safe-area';
import Icon from '../../_commons/icon';

export interface SectionNextProps {
  url: string;
  text: string;
}

const SectionNext = (props: PropsWithChildren<SectionNextProps>) => {
  const { url, text } = props;

  return (
    <div className="pb-20 flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="mt-4 lg:mt-0 pt-16 flex flex-row justify-start items-center border-t border-t-sep-pale">
          <Link to={url}>
            <span className="gap-x-3 inline-flex flex-row items-center text-title-light hover:text-brand-blue transition-colors text-base uppercase tracking-wider">
              {text}
              <Icon name="arrow-right" size={20} />
            </span>
          </Link>
        </div>
      </SafeArea>
    </div>
  );
};

export default SectionNext;
