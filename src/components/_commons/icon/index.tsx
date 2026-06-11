import { ReactElement, SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Icon key, e.g. 'zero-capex' | 'ai' | 'commercial' | 'pin'. */
  name: string;
  /** Pixel size (width = height). Defaults to 24. */
  size?: number;
}

/**
 * Central inline-SVG icon registry. Icons inherit `currentColor`,
 * so tint them with Tailwind text-* utilities.
 */
const paths: Record<string, ReactElement> = {
  'zero-capex': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.2c0-1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.7c0 2.8-5 1.8-5 4.6 0 1 1.1 1.7 2.5 1.7s2.5-.7 2.5-1.7" />
    </>
  ),
  guaranteed: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  ai: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 10.5h.01M14 10.5h.01M9.8 14c1.4 1 3 1 4.4 0" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8" />
    </>
  ),
  mv: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4.5V3h6v1.5M9 10l2 2 4-4M9 16h6" />
    </>
  ),
  support: (
    <>
      <path d="M5 13a7 7 0 0 1 14 0" />
      <rect x="3.5" y="12" width="3.5" height="6" rx="1.5" />
      <rect x="17" y="12" width="3.5" height="6" rx="1.5" />
      <path d="M19 18a3 3 0 0 1-3 3h-3" />
    </>
  ),
  cpms: (
    <>
      <path d="M4 7h10M18 7h2M4 12h4M12 12h8M4 17h13" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="19" cy="17" r="2" />
    </>
  ),
  monitoring: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M7 11h2l1.5-3 2.5 5 1.5-2H17" />
      <path d="M9 21h6M12 17.5V21" />
    </>
  ),
  commercial: (
    <>
      <path d="M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
      <path d="M16 9h2a2 2 0 0 1 2 2v10M3 21h18" />
      <path d="M8.5 7h2M12.5 7h2M8.5 11h2M12.5 11h2M8.5 15h2M12.5 15h2" />
    </>
  ),
  industrial: (
    <>
      <path d="M3 21V11l5 3v-3l5 3v-3l8 4.5V21H3z" />
      <path d="M6 11V4h3v8" />
    </>
  ),
  healthcare: (
    <>
      <rect x="4" y="6" width="16" height="15" rx="2" />
      <path d="M9 6V3h6v3M12 10.5v6M9 13.5h6" />
    </>
  ),
  hospitality: (
    <>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18h18M3 21v-3M21 21v-3M7 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    </>
  ),
  retail: (
    <>
      <path d="M5 8h14l-1 13H6L5 8z" />
      <path d="M9 11V6a3 3 0 0 1 6 0v5" />
    </>
  ),
  'data-center': (
    <>
      <rect x="4" y="3" width="16" height="6" rx="1.5" />
      <rect x="4" y="11" width="16" height="6" rx="1.5" />
      <path d="M8 6h.01M8 14h.01M12 6h3M12 14h3M7 21h10M12 17v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  tel: (
    <>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </>
  ),
  map: (
    <>
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5V17M7.5 7.5v.01M11.5 17v-3.5a2.5 2.5 0 0 1 5 0V17M11.5 10.5V17" />
    </>
  ),
  facebook: (
    <>
      <path d="M14 8h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V8.5A.5.5 0 0 1 14 8z" />
    </>
  ),
  line: (
    <>
      <path d="M12 4c-5 0-9 3.1-9 7 0 3.5 3.1 6.3 7.3 6.9l-.3 2.6c0 .4.4.6.7.4l3.5-2.3c3.9-.6 6.8-3.7 6.8-7.6 0-3.9-4-7-9-7z" />
      <path d="M7.5 9.5v4M10.5 9.5v4M13.5 9.5v4l2.5-4v4" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-down': <path d="M12 5v14M6 13l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chart: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16v-5M12 16V8M16 16v-3M20 16V6" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 9 12 4 20 4c0 8-5 15-15 15z" />
      <path d="M5 19c3-5 7-9 11-11" />
    </>
  ),
  bolt: <path d="M13 2L5 13h5l-1 9 8-11h-5l1-9z" />,
  snowflake: (
    <>
      <path d="M12 2v20M4 6l16 12M20 6L4 18" />
      <path d="M12 6.5L9.5 4M12 6.5L14.5 4M12 17.5L9.5 20M12 17.5l2.5 2.5" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="14" r="5" />
      <path d="M9 10L6 3h4l2 4 2-4h4l-3 7M12 12.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3.9-1.8z" />
    </>
  ),
  growth: (
    <>
      <path d="M4 20h16M4 20V4" />
      <path d="M7 15l4-4 3 3 6-7" />
      <path d="M20 11V7h-4" />
    </>
  ),
  uptime: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
};

/** All registered icon keys — used by the admin CMS icon picker. */
export const iconNames: string[] = Object.keys(paths);

const Icon = (props: IconProps): ReactElement | null => {
  const { name, size = 24, ...rest } = props;
  const path = paths[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  );
};

export default Icon;
