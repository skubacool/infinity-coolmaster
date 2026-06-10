import { PropsWithChildren, ReactNode } from 'react';

import SafeArea from '../../_commons/safe-area';

export interface SectionTwoColsProps {
  title: ReactNode;
  colEnd: ReactNode;
}

const SectionTwoCols = (props: PropsWithChildren<SectionTwoColsProps>) => {
  const { title, children, colEnd } = props;
  return (
    <section className="flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="lg:gap-y-0 lg:gap-x-16 flex flex-col-reverse lg:flex-row justify-start items-start">
          <div className="gap-y-16 flex-1 flex flex-col justify-start items-stretch">
            {title}
            <div className="lg:hidden self-stretch flex-col justify-start items-stretch">
              {colEnd}
            </div>
            {children}
          </div>
          <div className="max-w-[480px] flex-1 hidden lg:flex flex-col justify-start items-stretch">
            {colEnd}
          </div>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionTwoCols;
