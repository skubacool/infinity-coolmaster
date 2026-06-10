import { PropsWithChildren } from 'react';

export interface ProjectBannerRowProps {
  title: string;
  value: string;
}

const ProjectBannerRow = (props: PropsWithChildren<ProjectBannerRowProps>) => {
  const { title, value } = props;
  return (
    <div className="gap-y-2 flex flex-col justify-center items-center">
      <span className="text-title-light text-xs lg:text-base uppercase tracking-wider leading-none">
        {title}
      </span>
      <span className="text-text-main text-5xl lg:text-6hxl font-semibold leading-none">
        {value}
      </span>
    </div>
  );
};

export default ProjectBannerRow;
