import { PropsWithChildren } from 'react';

export interface ScreenContentProps {
  caption?: string;
  title: string;
  subtitle?: string;
}

const ContentTitle = (props: PropsWithChildren<ScreenContentProps>) => {
  const { caption, title, subtitle, children } = props;
  return (
    <div className="gap-y-16 flex flex-col justify-start items-stretch">
      <div className="gap-y-3 lg:gap-y-4 flex flex-col justify-start items-start">
        {caption && <span className="kicker lg:mb-2">{caption}</span>}
        <h1 className="text-4xl lg:text-6hxl font-semibold leading-[1.15] text-text-main">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-muted text-sm lg:text-base">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default ContentTitle;
