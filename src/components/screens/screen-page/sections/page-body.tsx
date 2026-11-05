import { PageBody } from '../../../../content/types';
import SafeArea from '../../../_commons/safe-area';
import Icon from '../../../_commons/icon';

export interface PageBodyViewProps {
  body: PageBody;
  faqTitle: string;
}

/**
 * Long-form page content. FAQ answers are plain HTML inside <details>, so
 * crawlers read them without any click (they match the FAQPage JSON-LD).
 */
const PageBodyView = (props: PageBodyViewProps) => {
  const { body, faqTitle } = props;

  return (
    <section className="py-12 lg:py-16 flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="max-w-[880px] gap-y-12 flex flex-col justify-start items-stretch">
          {body.sections.map((section) => (
            <div key={section.heading} className="gap-y-4 flex flex-col">
              <h2 className="text-2xl lg:text-3hxl font-semibold tracking-tight text-text-main">
                {section.heading}
              </h2>
              {section.paragraphs?.map((text) => (
                <p
                  key={text}
                  className="text-base lg:text-lg leading-relaxed text-text-muted"
                >
                  {text}
                </p>
              ))}
              {section.bullets && (
                <ul className="gap-y-3 flex flex-col">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      className="gap-x-3 flex flex-row items-start text-base lg:text-lg text-text-muted"
                    >
                      <span className="mt-1 flex-shrink-0 text-brand-green">
                        <Icon name="guaranteed" size={18} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="overflow-x-auto rounded-xl border border-sep-pale">
                  <table className="w-full min-w-[560px] text-left text-sm lg:text-base">
                    <thead className="bg-bg-soft">
                      <tr>
                        {section.table.headers.map((header, index) => (
                          <th
                            key={index}
                            scope="col"
                            className="px-4 py-3 font-semibold text-text-main"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-sep-pale">
                          {row.map((cell, index) =>
                            index === 0 ? (
                              <th
                                key={index}
                                scope="row"
                                className="px-4 py-3 font-medium text-text-main"
                              >
                                {cell}
                              </th>
                            ) : (
                              <td
                                key={index}
                                className="px-4 py-3 text-text-muted"
                              >
                                {cell}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {body.terms && body.terms.length > 0 && (
            <dl className="gap-y-6 flex flex-col">
              {body.terms.map((entry) => (
                <div
                  key={entry.id}
                  id={entry.id}
                  className="scroll-mt-24 border-b border-sep-pale pb-6"
                >
                  <dt className="text-lg lg:text-xl font-semibold text-text-main">
                    <a className="hover:text-brand-blue" href={`#${entry.id}`}>
                      {entry.term}
                    </a>
                  </dt>
                  <dd className="mt-2 text-base lg:text-lg leading-relaxed text-text-muted">
                    {entry.definition}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {body.faqs && body.faqs.length > 0 && (
            <div className="gap-y-4 flex flex-col">
              <h2 className="text-2xl lg:text-3hxl font-semibold tracking-tight text-text-main">
                {faqTitle}
              </h2>
              <div className="gap-y-3 flex flex-col">
                {body.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="card-premium group overflow-hidden"
                  >
                    <summary className="cursor-pointer select-none list-none px-6 py-5 gap-x-4 flex flex-row items-center">
                      <h3 className="flex-1 text-base lg:text-lg font-semibold text-text-main">
                        {faq.question}
                      </h3>
                      <span className="flex-shrink-0 text-brand-blue transition-transform duration-200 group-open:rotate-180">
                        <Icon name="arrow-down" size={18} />
                      </span>
                    </summary>
                    <p className="px-6 pb-6 text-sm lg:text-base leading-relaxed text-text-muted">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </SafeArea>
    </section>
  );
};

export default PageBodyView;
