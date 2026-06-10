import { PropsWithChildren } from 'react';

import Nav from '../../_commons/nav';
import Footer from '../../_commons/footer';

const LayoutStandard = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="min-h-screen bg-bg-base flex flex-col justify-start items-stretch">
      <Nav />
      <div className="min-h-80 flex-1 flex flex-col justify-start items-stretch">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutStandard;
