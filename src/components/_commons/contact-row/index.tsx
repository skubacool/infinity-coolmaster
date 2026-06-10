import { PropsWithChildren } from 'react';

import Icon from '../icon';

export interface ContactRowProps {
  /** Icon key resolved by the shared <Icon /> component. */
  icon: string;
  text: string;
  isEmail?: boolean;
  isPhone?: boolean;
}

const ContactRow = (props: PropsWithChildren<ContactRowProps>) => {
  const { icon, text, isEmail, isPhone } = props;
  return (
    <div className="gap-x-3 lg:gap-x-4 flex flex-row justify-start items-start text-sm lg:text-base text-text-muted">
      <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-caas-soft flex flex-col justify-center items-center text-brand-blue">
        <Icon name={icon} size={16} />
      </span>
      {isEmail && (
        <a
          href={`mailto:${text}`}
          className="block underline self-center break-all"
        >
          {text}
        </a>
      )}
      {isPhone && (
        <a href={`tel:${text.replace(/[^+\d]/g, '')}`} className="block self-center">
          {text}
        </a>
      )}
      {!isEmail && !isPhone && <span className="block self-center">{text}</span>}
    </div>
  );
};

export default ContactRow;
