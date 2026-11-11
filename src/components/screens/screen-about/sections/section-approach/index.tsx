import { Link } from 'react-router-dom';

import { paths } from '../../../../../config/routes';
import { useVmScreen } from '../../../../../stores/vm-screen';
import {
  FIRST_PROJECT,
  firstProjectClient,
} from '../../../../../content/first-project';
import Icon from '../../../../_commons/icon';
import SafeArea from '../../../../_commons/safe-area';

/**
 * What the company takes responsibility for, its first project and its
 * registration details. Every statement here is a confirmed company fact;
 * keep it that way when editing.
 */
const TEXT = {
  en: {
    title: 'What we take responsibility for',
    lead: 'Under one contract we carry the investment, the operation and the performance risk of your chiller plant.',
    items: [
      {
        icon: 'zero-capex',
        title: 'We fund it',
        text: 'We design, finance and install the high-efficiency chiller plant. You invest nothing upfront.',
      },
      {
        icon: 'monitoring',
        title: 'We run it',
        text: 'We operate and maintain the plant for the whole contract, with 24/7 monitoring and our CPMS optimising it continuously.',
      },
      {
        icon: 'mv',
        title: 'We prove it',
        text: 'Savings are measured and verified every month against an IPMVP-aligned baseline agreed with you before work starts.',
      },
      {
        icon: 'guaranteed',
        title: 'We guarantee it',
        text: 'A minimum 10% energy saving is written into the contract. Contracts typically run 5–10 years.',
      },
    ],
    projectKicker: 'First project',
    projectTitle: (client: string) => `${client}, Rayong`,
    projectText: (client: string, status: string, month: string) =>
      `Our first Cooling-as-a-Service plant, for ${client}, is in ${status} in ${month}. Measured results will be published once they are verified.`,
    projectLink: 'Read the project update',
    companyTitle: 'Company details',
    company: [
      ['Legal name', 'Infinity CoolMaster Co., Ltd.'],
      ['Company registration no.', '0105566016285'],
      ['Established', '2023'],
      [
        'Registered office',
        '157/9 Soi Ari Samphan 2, Phahonyothin Road, Phaya Thai, Bangkok 10400',
      ],
    ],
    cta: 'Request a free audit',
  },
  th: {
    title: 'สิ่งที่เรารับผิดชอบ',
    lead: 'ภายใต้สัญญาเดียว เรารับภาระการลงทุน การดูแลระบบ และความเสี่ยงด้านผลประหยัดของระบบชิลเลอร์ของคุณ',
    items: [
      {
        icon: 'zero-capex',
        title: 'เราลงทุน',
        text: 'เราออกแบบ ลงทุน และติดตั้งระบบชิลเลอร์ประสิทธิภาพสูง คุณไม่ต้องลงทุนก้อนแรก',
      },
      {
        icon: 'monitoring',
        title: 'เราดูแลระบบ',
        text: 'เราเดินระบบและบำรุงรักษาตลอดอายุสัญญา พร้อมเฝ้าติดตาม 24 ชั่วโมง และปรับการทำงานต่อเนื่องด้วยระบบ CPMS',
      },
      {
        icon: 'mv',
        title: 'เราพิสูจน์ผล',
        text: 'ตรวจวัดและพิสูจน์ผลประหยัดทุกเดือน เทียบกับค่าฐานตามแนวทาง IPMVP ที่ตกลงร่วมกันก่อนเริ่มงาน',
      },
      {
        icon: 'guaranteed',
        title: 'เรารับประกัน',
        text: 'ระบุผลประหยัดพลังงานขั้นต่ำ 10% ไว้ในสัญญา โดยทั่วไปสัญญามีระยะเวลา 5–10 ปี',
      },
    ],
    projectKicker: 'โครงการแรก',
    projectTitle: (client: string) => `${client} จังหวัดระยอง`,
    projectText: (client: string, status: string, month: string) =>
      `ระบบ Cooling-as-a-Service แห่งแรกของเรา สำหรับ ${client} อยู่ระหว่าง${status}ในเดือน${month} เราจะเผยแพร่ผลที่ตรวจวัดได้เมื่อผ่านการพิสูจน์ผลแล้ว`,
    projectLink: 'อ่านความคืบหน้าโครงการ',
    companyTitle: 'ข้อมูลบริษัท',
    company: [
      ['ชื่อนิติบุคคล', 'บริษัท อินฟินิตี คูลมาสเตอร์ จำกัด'],
      ['เลขทะเบียนนิติบุคคล', '0105566016285'],
      ['ก่อตั้ง', 'พ.ศ. 2566'],
      [
        'ที่ตั้งสำนักงาน',
        '157/9 ซอยอารีย์สัมพันธ์ 2 ถนนพหลโยธิน แขวงพญาไท เขตพญาไท กรุงเทพมหานคร 10400',
      ],
    ],
    cta: 'ขอรับการประเมินฟรี',
  },
};

const PROJECT_SLUG = 'first-cooling-as-a-service-project-commissioning';

const SectionApproach = () => {
  const { locale = 'en' } = useVmScreen();
  const t = TEXT[locale];
  const client = firstProjectClient(locale);

  return (
    <section className="bg-bg-soft py-16 lg:py-20 flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="gap-y-10 flex flex-col justify-start items-stretch">
          <div className="max-w-[760px] gap-y-3 flex flex-col">
            <h2 className="text-2xl lg:text-4hxl font-semibold tracking-tight text-text-main">
              {t.title}
            </h2>
            <p className="text-base lg:text-lg text-text-muted">{t.lead}</p>
          </div>
          <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {t.items.map((item) => (
              <li
                key={item.title}
                className="card-premium p-6 gap-y-3 flex flex-col"
              >
                <span className="w-11 h-11 rounded-xl bg-gradient-caas-soft flex items-center justify-center text-brand-green">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="text-lg font-semibold text-text-main">
                  {item.title}
                </h3>
                <p className="text-sm lg:text-base leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-caas-soft border border-sep-pale p-6 lg:p-8 gap-y-3 flex flex-col justify-start items-start">
              <span className="kicker">{t.projectKicker}</span>
              <h3 className="text-xl lg:text-2xl font-semibold text-text-main">
                {t.projectTitle(client)}
              </h3>
              <p className="text-base leading-relaxed text-text-muted">
                {t.projectText(
                  client,
                  FIRST_PROJECT.status[locale],
                  FIRST_PROJECT.month[locale]
                )}
              </p>
              <Link
                className="text-base font-medium text-brand-blue-ink underline underline-offset-4"
                to={`/${locale}/insights/${PROJECT_SLUG}/`}
              >
                {t.projectLink}
              </Link>
            </div>
            <div className="card-premium p-6 lg:p-8 gap-y-3 flex flex-col justify-start items-stretch">
              <h3 className="text-xl lg:text-2xl font-semibold text-text-main">
                {t.companyTitle}
              </h3>
              <dl className="flex flex-col">
                {t.company.map(([label, value]) => (
                  <div
                    key={label}
                    className="py-2.5 border-t border-sep-pale gap-x-4 flex flex-col sm:flex-row sm:justify-between sm:items-baseline"
                  >
                    <dt className="flex-shrink-0 text-sm text-text-muted">
                      {label}
                    </dt>
                    <dd className="text-sm font-medium sm:text-right text-text-main">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Link className="btn-caas self-start" to={paths.contact(locale)}>
            {t.cta}
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionApproach;
