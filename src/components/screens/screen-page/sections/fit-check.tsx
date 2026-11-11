import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Locale } from '../../../../models/_commons/localized';
import { paths } from '../../../../config/routes';
import { trackEvent } from '../../../../utils/analytics';
import SafeArea from '../../../_commons/safe-area';
import Icon from '../../../_commons/icon';

type L = Record<Locale, string>;

/** Each answer carries a score; a higher total means a better fit for CaaS. */
const QUESTIONS: { q: L; options: { label: L; score: number }[] }[] = [
  {
    q: {
      en: 'What is your site’s monthly electricity bill?',
      th: 'ค่าไฟฟ้าต่อเดือนของสถานที่ของคุณประมาณเท่าไร',
    },
    options: [
      { label: { en: 'Under ฿500,000', th: 'ต่ำกว่า 500,000 บาท' }, score: 0 },
      {
        label: { en: '฿500,000 – ฿1 million', th: '500,000 – 1 ล้านบาท' },
        score: 1,
      },
      { label: { en: '฿1 – 5 million', th: '1 – 5 ล้านบาท' }, score: 2 },
      { label: { en: 'Over ฿5 million', th: 'มากกว่า 5 ล้านบาท' }, score: 3 },
    ],
  },
  {
    q: {
      en: 'How old is your main chiller plant?',
      th: 'ระบบชิลเลอร์หลักของคุณอายุเท่าไร',
    },
    options: [
      { label: { en: 'Under 5 years', th: 'ไม่ถึง 5 ปี' }, score: 0 },
      { label: { en: '5 – 10 years', th: '5 – 10 ปี' }, score: 1 },
      { label: { en: '10 – 15 years', th: '10 – 15 ปี' }, score: 2 },
      {
        label: {
          en: 'Over 15 years, or not sure',
          th: 'เกิน 15 ปี หรือไม่แน่ใจ',
        },
        score: 3,
      },
    ],
  },
  {
    q: {
      en: 'How many hours does your cooling run?',
      th: 'ระบบทำความเย็นของคุณทำงานกี่ชั่วโมง',
    },
    options: [
      { label: { en: 'Office hours only', th: 'เฉพาะเวลาทำการ' }, score: 1 },
      {
        label: {
          en: 'Extended hours or two shifts',
          th: 'ยาวกว่าเวลาทำการ หรือสองกะ',
        },
        score: 2,
      },
      { label: { en: '24 hours a day', th: 'ตลอด 24 ชั่วโมง' }, score: 3 },
    ],
  },
  {
    q: {
      en: 'Do you have budget approved to replace or upgrade the plant?',
      th: 'คุณมีงบประมาณที่อนุมัติแล้วสำหรับเปลี่ยนหรือปรับปรุงระบบหรือไม่',
    },
    options: [
      {
        label: { en: 'Yes, fully approved', th: 'มี อนุมัติครบแล้ว' },
        score: 0,
      },
      {
        label: {
          en: 'Partly, or it competes with other projects',
          th: 'มีบางส่วน หรือต้องแย่งกับโครงการอื่น',
        },
        score: 2,
      },
      { label: { en: 'No budget', th: 'ไม่มีงบประมาณ' }, score: 3 },
    ],
  },
  {
    q: {
      en: 'Who operates and optimises the plant today?',
      th: 'ปัจจุบันใครเป็นผู้เดินระบบและปรับการทำงานของระบบ',
    },
    options: [
      {
        label: {
          en: 'A dedicated in-house engineering team',
          th: 'ทีมวิศวกรรมภายในที่ดูแลโดยเฉพาะ',
        },
        score: 0,
      },
      {
        label: {
          en: 'A small team with many other duties',
          th: 'ทีมเล็กที่มีงานอื่นหลายอย่าง',
        },
        score: 2,
      },
      {
        label: {
          en: 'Mostly contractors, when something breaks',
          th: 'ส่วนใหญ่เป็นผู้รับเหมา เมื่อมีปัญหา',
        },
        score: 3,
      },
    ],
  },
  {
    q: {
      en: 'Does the plant use R-22, or break down more than it used to?',
      th: 'ระบบใช้สารทำความเย็น R-22 หรือเสียบ่อยกว่าเดิมหรือไม่',
    },
    options: [
      { label: { en: 'No', th: 'ไม่' }, score: 0 },
      { label: { en: 'One of the two', th: 'อย่างใดอย่างหนึ่ง' }, score: 2 },
      {
        label: { en: 'Both, or not sure', th: 'ทั้งสองอย่าง หรือไม่แน่ใจ' },
        score: 3,
      },
    ],
  },
];

const MAX = QUESTIONS.reduce(
  (sum, item) => sum + Math.max(...item.options.map((o) => o.score)),
  0
);

const TEXT = {
  en: {
    progress: (n: number) => `Question ${n} of ${QUESTIONS.length}`,
    back: 'Back',
    restart: 'Start again',
    result: 'Your result',
    strong: {
      title: 'A strong fit for Cooling-as-a-Service',
      text: 'Your answers match the sites where Cooling-as-a-Service usually works best: a large cooling bill, an ageing plant and limited capital or people to run it. A free audit will confirm the saving and the guaranteed figure.',
    },
    possible: {
      title: 'A possible fit, worth an audit',
      text: 'Some of your answers point to Cooling-as-a-Service and some do not. A free audit will show whether the saving is large enough to fund a new plant, or whether tuning the existing one is the better first step.',
    },
    low: {
      title: 'Probably not yet',
      text: 'With a newer plant, a smaller bill or budget and a team already in place, optimising what you have is likely the better step for now. Our free efficiency check and guides can help, and we are happy to look again when the plant ages.',
    },
    cta: 'Request a free audit',
    alt: 'Check your plant efficiency',
    note: 'A quick indication only, based on your answers. It is not a proposal; savings are confirmed by a site audit.',
  },
  th: {
    progress: (n: number) => `คำถามที่ ${n} จาก ${QUESTIONS.length}`,
    back: 'ย้อนกลับ',
    restart: 'เริ่มใหม่',
    result: 'ผลของคุณ',
    strong: {
      title: 'เหมาะกับ Cooling-as-a-Service อย่างมาก',
      text: 'คำตอบของคุณตรงกับสถานที่ที่ Cooling-as-a-Service มักได้ผลดีที่สุด คือ ค่าไฟจากระบบทำความเย็นสูง ระบบมีอายุมาก และมีงบลงทุนหรือบุคลากรดูแลจำกัด การตรวจประเมินฟรีจะยืนยันผลประหยัดและตัวเลขที่รับประกัน',
    },
    possible: {
      title: 'มีแนวโน้มเหมาะสม ควรตรวจประเมิน',
      text: 'คำตอบบางข้อชี้ว่าเหมาะกับ Cooling-as-a-Service และบางข้อยังไม่ชัด การตรวจประเมินฟรีจะบอกได้ว่าผลประหยัดมากพอสำหรับระบบใหม่หรือไม่ หรือควรเริ่มจากการปรับจูนระบบเดิมก่อน',
    },
    low: {
      title: 'อาจยังไม่ถึงเวลา',
      text: 'หากระบบยังใหม่ ค่าไฟไม่สูง หรือมีงบประมาณและทีมงานพร้อมอยู่แล้ว การปรับปรุงระบบเดิมน่าจะเป็นทางเลือกที่ดีกว่าในตอนนี้ เครื่องมือตรวจประสิทธิภาพและคู่มือฟรีของเราช่วยได้ และเรายินดีประเมินอีกครั้งเมื่อระบบมีอายุมากขึ้น',
    },
    cta: 'ขอรับการประเมินฟรี',
    alt: 'ตรวจประสิทธิภาพระบบของคุณ',
    note: 'เป็นเพียงการประเมินเบื้องต้นจากคำตอบของคุณ ไม่ใช่ข้อเสนอ ผลประหยัดต้องยืนยันด้วยการตรวจประเมินที่หน้างาน',
  },
};

/** Six-question self-check: is Cooling-as-a-Service likely to suit the site? */
const FitCheck = (props: { locale: Locale }) => {
  const { locale } = props;
  const t = TEXT[locale];
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step === QUESTIONS.length;
  const total = answers.reduce((sum, score) => sum + score, 0);
  const tier = total >= 12 ? 'strong' : total >= 7 ? 'possible' : 'low';

  const answer = (score: number) => {
    const next = [...answers, score];
    setAnswers(next);
    if (next.length === QUESTIONS.length) {
      const sum = next.reduce((a, b) => a + b, 0);
      trackEvent('fit_check', {
        result: sum >= 12 ? 'strong' : sum >= 7 ? 'possible' : 'low',
      });
    }
  };

  return (
    <section className="py-10 lg:py-14 flex flex-col">
      <SafeArea>
        <div
          className="mx-auto w-full max-w-[760px] card-premium p-6 lg:p-10 gap-y-6 flex flex-col"
          aria-live="polite"
        >
          <div className="h-1.5 rounded-full bg-sep-pale overflow-hidden">
            <div
              className="h-full bg-gradient-caas transition-all"
              style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
            />
          </div>
          {!done ? (
            <>
              <span className="kicker">{t.progress(step + 1)}</span>
              <h2 className="text-xl lg:text-2xl font-semibold text-text-main">
                {QUESTIONS[step].q[locale]}
              </h2>
              <div className="gap-y-3 flex flex-col">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option.label.en}
                    type="button"
                    className="rounded-xl border border-sep-light bg-white px-5 py-4 text-left text-base font-medium text-text-main hover:border-brand-blue hover:bg-bg-soft transition-colors"
                    onClick={() => answer(option.score)}
                  >
                    {option.label[locale]}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  className="self-start text-sm font-medium text-text-muted underline underline-offset-4"
                  onClick={() => setAnswers(answers.slice(0, -1))}
                >
                  {t.back}
                </button>
              )}
            </>
          ) : (
            <>
              <span className="kicker">{t.result}</span>
              <h2 className="text-2xl lg:text-3hxl font-semibold text-text-main">
                {t[tier].title}
              </h2>
              <p className="text-base lg:text-lg leading-relaxed text-text-muted">
                {t[tier].text}
              </p>
              <span className="text-sm text-text-muted">
                {total} / {MAX}
              </span>
              <div className="gap-4 flex flex-col sm:flex-row sm:items-center">
                <Link className="btn-caas" to={paths.contact(locale)}>
                  {t.cta}
                  <Icon name="arrow-right" size={18} />
                </Link>
                <Link
                  className="btn-outline"
                  to={paths.page(locale, 'chiller-efficiency-check')}
                >
                  {t.alt}
                </Link>
              </div>
              <p className="text-xs text-text-muted">{t.note}</p>
              <button
                type="button"
                className="self-start text-sm font-medium text-text-muted underline underline-offset-4"
                onClick={() => setAnswers([])}
              >
                {t.restart}
              </button>
            </>
          )}
        </div>
      </SafeArea>
    </section>
  );
};

export default FitCheck;
