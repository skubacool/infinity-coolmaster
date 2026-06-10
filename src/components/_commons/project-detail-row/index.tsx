import { PropsWithChildren } from 'react';

export interface ProjectDetailRowProps {
  title: string;
  text: string;
  isCta?: boolean;
  isLongText?: boolean;
}

const ProjectDetailRow = (props: PropsWithChildren<ProjectDetailRowProps>) => {
  const { title, text, isCta, isLongText } = props;
  return (
    <div className="flex flex-col justify-start items-start">
      <h6 className="text-xs uppercase tracking-wider text-title-pale">
        {title}
      </h6>
      <p
        className={`line-clamp-2 text-sm ${
          !isCta ? 'text-text-main' : 'text-brand-green font-semibold'
        } ${!isLongText ? '' : 'min-h-10'}`}
      >
        {text}
      </p>
    </div>
  );
};

export default ProjectDetailRow;
