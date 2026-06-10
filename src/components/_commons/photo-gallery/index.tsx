import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { PhotoSlider } from 'react-photo-view';

import { l } from '../../../utils/localization-utils';
import { Locale } from '../../../models/_commons/localized';
import { useVmScreen } from '../../../stores/vm-screen';

const MAX_IMAGES_WITHOUT_HIDDEN = 4;

export interface PhotoGalleryProps {
  locale?: Locale;
  photos: string[];
}

const PhotoGallery = (props: PropsWithChildren<PhotoGalleryProps>) => {
  const { locale = 'en', photos } = props;

  const { localizations = [] } = useVmScreen();

  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);

  const photoCount = useMemo(() => photos.length, [photos]);
  const lastIndex = useMemo(() => MAX_IMAGES_WITHOUT_HIDDEN - 1, []);
  const moreCount = useMemo(
    () => photoCount - MAX_IMAGES_WITHOUT_HIDDEN,
    [photoCount]
  );
  const gridPhotos = useMemo(
    () => photos.slice(0, MAX_IMAGES_WITHOUT_HIDDEN),
    [photos]
  );

  const onClick = useCallback((index: number) => {
    setPreviewIndex(index);
    setPreviewVisible(true);
  }, []);

  return (
    <>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
        {gridPhotos.map((image, index) => {
          return (
            <button
              key={`${image}-${index}`}
              onClick={() => onClick(index)}
              className="relative block aspect-[519/358] rounded-xl overflow-hidden border border-sep-pale bg-pale"
              style={{ background: `url(${image}) no-repeat center/cover` }}
            >
              {photoCount <= MAX_IMAGES_WITHOUT_HIDDEN ||
              index < lastIndex ? null : (
                <div className="absolute left-0 top-0 w-full h-full bg-navy-a50 gap-y-2 flex flex-col justify-center items-center">
                  <span className="text-white text-base">
                    {l(locale, localizations, 'general.see-more')}
                  </span>
                  <span className="text-6hxl font-semibold text-gradient-caas">
                    +{moreCount}
                  </span>
                  <span className="text-white text-base">
                    {l(locale, localizations, 'general.photos')}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <PhotoSlider
        visible={previewVisible}
        index={previewIndex}
        onIndexChange={setPreviewIndex}
        onClose={() => setPreviewVisible(false)}
        images={photos.map((p) => ({ src: p, key: p }))}
      />
    </>
  );
};

export default PhotoGallery;
