import { useRef, useEffect, PropsWithChildren, useMemo } from 'react';

export interface LayoutPopupProps {
  visible: boolean;
}

const LayoutPopup = (props: PropsWithChildren<LayoutPopupProps>) => {
  const { visible, children } = props;

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.style.overflowY = !visible ? 'auto' : 'hidden';
    return () => {
      document.documentElement.style.overflowY = 'auto';
    };
  }, [visible]);

  const pointerEvents = useMemo(() => {
    return !visible ? 'opacity-0 pointer-events-none' : 'opacity-100';
  }, [visible]);

  return (
    <div
      ref={targetRef}
      className={`z-[60] lg:hidden transition-all duration-300 ease-out fixed left-0 top-0 w-screen h-svh ${pointerEvents} bg-navy-a30 backdrop-blur-sm`}
    >
      {children}
    </div>
  );
};

export default LayoutPopup;
