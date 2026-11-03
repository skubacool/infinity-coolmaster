export interface RichTextProps {
  text: string;
  /** Classes for paragraphs and list items. */
  className?: string;
}

/**
 * Long-form CMS text with light formatting, written as plain text:
 *
 *   ## Heading           -> <h2>
 *   ### Sub-heading      -> <h3>
 *   - item               -> bulleted list (one item per line)
 *   blank line           -> new paragraph; a single line break stays a <br>
 *
 * Text without these markers renders exactly as before (paragraphs with line
 * breaks). As before, editors may embed simple HTML.
 */
const RichText = (props: RichTextProps) => {
  const { text, className = '' } = props;
  const blocks = (text ?? '').replace(/\r\n/g, '\n').split(/\n\s*\n/);

  return (
    <div className="gap-y-5 flex flex-col">
      {blocks.map((raw, index) => {
        const block = raw.trim();
        if (!block) return null;
        if (block.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="mt-2 text-xl lg:text-2xl font-semibold text-text-main"
            >
              {block.slice(4)}
            </h3>
          );
        }
        if (block.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="mt-4 text-2xl lg:text-3xl font-semibold tracking-tight text-text-main"
            >
              {block.slice(3)}
            </h2>
          );
        }
        const lines = block.split('\n');
        if (lines.every((line) => line.trim().startsWith('- '))) {
          return (
            <ul
              key={index}
              className={`pl-6 list-disc gap-y-2 flex flex-col ${className}`}
            >
              {lines.map((line, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: line.trim().slice(2) }}
                />
              ))}
            </ul>
          );
        }
        return (
          <p
            key={index}
            className={className}
            dangerouslySetInnerHTML={{ __html: block.replace(/\n/g, '<br/>') }}
          />
        );
      })}
    </div>
  );
};

export default RichText;
