import { PropsWithChildren } from 'react';

import { p } from '../../../utils/path-utils';
import { SITE_NAME } from '../../../config/constants';

export enum BrandLogoTone {
  /** For light surfaces — the official artwork as-is. */
  dark = 'dark',
  /** For the navy footer — official artwork on a white plate for legibility. */
  light = 'light',
}

export interface BrandLogoProps {
  tone?: BrandLogoTone;
  /** Render only the infinity mark without the wordmark. */
  markOnly?: boolean;
  /** Pixel height of the logo image. */
  height?: number;
}

/**
 * Official brand logo (assets exported from the corporate CI file at
 * Logo/logo infinity final.png — do not substitute redrawn artwork).
 */
const BrandLogo = (props: PropsWithChildren<BrandLogoProps>) => {
  const { tone = BrandLogoTone.dark, markOnly = false, height = 48 } = props;

  const src = markOnly
    ? p('assets/brand/logo-mark.png')
    : p('assets/brand/logo-official.png');

  const img = (
    <img
      src={src}
      alt={SITE_NAME}
      style={{ height: `${height}px` }}
      className="block w-auto select-none"
      draggable={false}
    />
  );

  if (tone === BrandLogoTone.light) {
    return (
      <span className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 shadow-premium">
        {img}
      </span>
    );
  }
  return img;
};

export default BrandLogo;
