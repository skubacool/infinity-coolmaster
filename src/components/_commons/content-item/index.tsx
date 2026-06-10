import { PropsWithChildren, useMemo } from 'react';

export interface ContentItemProps {
  title: string;
  text: string;
  isCta?: boolean;
}

const ContentItem = (props: PropsWithChildren<ContentItemProps>) => {
  const { title, text, isCta } = props;

  const textColor = useMemo(() => {
    return !isCta ? 'text-text-main' : 'text-brand-green font-semibold';
  }, [isCta]);

  return (
    <div className="py-7 gap-x-4 flex flex-row justify-start items-start border-t border-t-sep-light">
      <span className="flex-1 flex-shrink-0 block uppercase text-xs lg:text-sm tracking-wider text-title-pale">
        {title}
      </span>
      <span className={`flex-1 flex-shrink-0 block text-base ${textColor}`}>
        {text}
      </span>
    </div>
  );
};

export default ContentItem;
