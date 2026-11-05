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
const splitBlocks = (text: string): string[] =>
  (text ?? '').replace(/\r\n/g, '\n').split(/\n\s*\n/);

/** Anchor id of the n-th "## " heading (0-based), shared with the contents list. */
export const sectionId = (index: number): string => `section-${index + 1}`;

/** The "## " headings of a text, in order, for a table of contents. */
export const extractHeadings = (text: string): string[] =>
  splitBlocks(text)
    .map((block) => block.trim())
    .filter((block) => block.startsWith('## '))
    .map((block) => block.slice(3).trim());

/** Rough reading time: ~220 English words or ~900 Thai characters a minute. */
export const readingMinutes = (text: string): number => {
  const plain = (text ?? '').replace(/<[^>]+>/g, ' ');
  const thaiChars = (plain.match(/[\u0E00-\u0E7F]/g) ?? []).length;
  const words = plain
    .replace(/[\u0E00-\u0E7F]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220 + thaiChars / 900));
};

const RichText = (props: RichTextProps) => {
  const { text, className = '' } = props;
  const blocks = splitBlocks(text);
  let headingIndex = 0;

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
          const id = sectionId(headingIndex++);
          return (
            <h2
              id={id}
              key={index}
              className="mt-4 scroll-mt-24 text-2xl lg:text-3xl font-semibold tracking-tight text-text-main"
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
