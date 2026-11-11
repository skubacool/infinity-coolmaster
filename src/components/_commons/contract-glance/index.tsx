import { Link } from 'react-router-dom';

import { Locale } from '../../../models/_commons/localized';
import { paths } from '../../../config/routes';
import Icon from '../icon';

/** The contract terms a buyer checks first, shown beside the headline. */
const GLANCE = {
  en: {
    title: 'The contract at a glance',
    rows: [
      ['Upfront investment', '฿0'],
      ['Guaranteed energy saving', 'At least 10%, in writing'],
      ['Contract term', '5–10 years'],
      ['Savings verified', 'Monthly, IPMVP-aligned'],
      ['Plant monitoring', '24/7'],
      ['Who owns and maintains the plant', 'Infinity CoolMaster'],
    ],
    link: 'How the fee works',
    cta: 'Request a free audit',
  },
  th: {
    title: 'สรุปเงื่อนไขสัญญา',
    rows: [
      ['เงินลงทุนก้อนแรก', '฿0'],
      ['รับประกันผลประหยัดพลังงาน', 'ขั้นต่ำ 10% เป็นลายลักษณ์อักษร'],
      ['ระยะเวลาสัญญา', '5–10 ปี'],
      ['การตรวจวัดพิสูจน์ผล', 'ทุกเดือน ตามแนวทาง IPMVP'],
      ['การเฝ้าติดตามระบบ', 'ตลอด 24 ชั่วโมง'],
      ['ผู้เป็นเจ้าของและดูแลระบบ', 'Infinity CoolMaster'],
    ],
    link: 'ดูวิธีคิดค่าบริการ',
    cta: 'ขอรับการประเมินฟรี',
  },
};

/**
 * Card with the confirmed contract terms. Used beside the homepage headline
 * and, with an audit button, beside long pages.
 */
const ContractGlance = (props: { locale: Locale; withCta?: boolean }) => {
  const { locale, withCta } = props;
  const t = GLANCE[locale];
  return (
    <aside className="card-premium p-7 gap-y-4 flex flex-col">
      <span className="kicker">{t.title}</span>
      <dl className="flex flex-col">
        {t.rows.map(([label, value]) => (
          <div
            key={label}
            className="py-3 border-t border-sep-pale gap-x-4 flex flex-row justify-between items-baseline"
          >
            <dt className="text-sm text-text-muted">{label}</dt>
            <dd className="text-sm font-semibold text-right text-text-main">
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <Link
        className="text-sm font-medium text-brand-blue-ink underline underline-offset-4"
        to={paths.page(locale, 'pricing-model')}
      >
        {t.link}
      </Link>
      {withCta && (
        <Link className="btn-caas justify-center" to={paths.contact(locale)}>
          {t.cta}
          <Icon name="arrow-right" size={18} />
        </Link>
      )}
    </aside>
  );
};

export default ContractGlance;
