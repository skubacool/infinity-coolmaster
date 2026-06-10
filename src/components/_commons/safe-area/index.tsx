import { PropsWithChildren } from 'react';

const SafeArea = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="relative mx-auto w-full max-w-[1440px] px-6 flex-1 flex flex-col justify-start items-stretch">
      {children}
    </div>
  );
};

export default SafeArea;
