/**
 * Tag and type colours come from the content manager, where staff usually pick
 * the bright brand green/blue. As small text (or behind white text) those fail
 * WCAG AA, so darken the colour just enough to reach 4.5:1 against white.
 */
const luminance = (rgb: number[]): number => {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const parseHex = (hex: string): number[] | null => {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h =
    m[1].length === 3
      ? m[1]
          .split('')
          .map((c) => c + c)
          .join('')
      : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const toHex = (rgb: number[]): string =>
  `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

export const readableOnWhite = (hex?: string, minRatio = 4.5): string => {
  const rgb = hex ? parseHex(hex) : null;
  if (!rgb) return hex ?? '';
  let current = rgb;
  for (let i = 0; i < 20; i += 1) {
    if (1.05 / (luminance(current) + 0.05) >= minRatio) return toHex(current);
    current = current.map((v) => v * 0.92);
  }
  return toHex(current);
};
