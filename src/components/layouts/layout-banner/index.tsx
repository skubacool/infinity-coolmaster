import { PropsWithChildren, ReactElement } from 'react';

import Nav from '../../_commons/nav';
import Footer from '../../_commons/footer';

export interface LayoutBannerProps {
  banner?: ReactElement;
  isFilled?: boolean;
}

const LayoutBanner = (props: PropsWithChildren<LayoutBannerProps>) => {
  const { banner, isFilled, children } = props;

  return (
    <div className="min-h-screen bg-bg-base flex flex-col justify-start items-stretch">
      <Nav />
      <div
        className={`relative flex flex-col justify-stretch items-stretch ${
          !isFilled
            ? 'min-h-[420px] lg:min-h-[520px]'
            : 'min-h-[300px] lg:min-h-[360px] max-h-[480px]'
        }`}
      >
        {banner}
      </div>
      <div className="flex-1 flex flex-col justify-start items-stretch">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutBanner;
