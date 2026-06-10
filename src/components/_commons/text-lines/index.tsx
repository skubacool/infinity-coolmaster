import { PropsWithChildren } from 'react';

export interface TextLinesProps {
  text: string;
}

/** Renders CMS text, converting \n to line breaks (CMS copy may embed markup). */
const TextLines = (props: PropsWithChildren<TextLinesProps>) => {
  const { text } = props;
  return (
    <span
      dangerouslySetInnerHTML={{ __html: (text ?? '').replace(/\n/g, '<br/>') }}
    />
  );
};

export default TextLines;
