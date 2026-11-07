import { Locale } from '../../../../models/_commons/localized';
import { p } from '../../../../utils/path-utils';
import SafeArea from '../../../_commons/safe-area';
import Icon from '../../../_commons/icon';

/** Files built by scripts/make-downloads.py into public/downloads/. */
const FILES = [
  {
    file: 'chiller-daily-log-th-en.xlsx',
    size: '10 KB',
    en: {
      title: 'Chiller plant daily log',
      text: 'Temperatures, load, power, cooling output and pressures for each reading; plant kW/TR is calculated automatically.',
    },
    th: {
      title: 'ใบบันทึกระบบชิลเลอร์ประจำวัน',
      text: 'บันทึกอุณหภูมิ ภาระ กำลังไฟฟ้า ความเย็นที่ผลิตได้ และความดันในแต่ละครั้ง พร้อมคำนวณ kW/TR ทั้งระบบอัตโนมัติ',
    },
  },
  {
    file: 'chiller-maintenance-checklist-th-en.xlsx',
    size: '8 KB',
    en: {
      title: 'Maintenance checklist',
      text: 'Weekly to annual tasks for water treatment, towers, pumps, refrigerant, electrical, sensors and controls, with columns for date and who did it.',
    },
    th: {
      title: 'เช็กลิสต์บำรุงรักษา',
      text: 'งานรายสัปดาห์ถึงรายปี ทั้งการบำบัดน้ำ คูลลิ่งทาวเวอร์ ปั๊ม สารทำความเย็น ไฟฟ้า เซนเซอร์ และระบบควบคุม พร้อมช่องวันที่และผู้ปฏิบัติ',
    },
  },
  {
    file: 'mv-data-checklist-th-en.xlsx',
    size: '8 KB',
    en: {
      title: 'M&V data checklist',
      text: 'The data to collect before an efficiency project (bills, interval data, plant power, cooling output, calibration) so savings can be proven.',
    },
    th: {
      title: 'เช็กลิสต์ข้อมูล M&V',
      text: 'ข้อมูลที่ต้องเก็บก่อนเริ่มโครงการประหยัดพลังงาน (บิลค่าไฟ ข้อมูลรายช่วงเวลา กำลังไฟฟ้า ความเย็นที่ผลิตได้ การสอบเทียบ) เพื่อพิสูจน์ผลประหยัดได้',
    },
  },
];

const LABEL = { en: 'Download Excel', th: 'ดาวน์โหลด Excel' };

/** Download cards for the engineer-downloads page. */
const EngineerDownloads = (props: { locale: Locale }) => {
  const { locale } = props;
  return (
    <section className="py-10 lg:py-14 flex flex-col">
      <SafeArea>
        <ul className="mx-auto w-full max-w-[960px] gap-5 grid grid-cols-1 md:grid-cols-3">
          {FILES.map((item) => (
            <li
              key={item.file}
              className="card-premium p-6 gap-y-3 flex flex-col"
            >
              <span className="w-12 h-12 rounded-xl bg-gradient-caas-soft flex items-center justify-center text-brand-green">
                <Icon name="chart" size={24} />
              </span>
              <h2 className="text-lg font-semibold text-text-main">
                {item[locale].title}
              </h2>
              <p className="flex-1 text-sm text-text-muted">
                {item[locale].text}
              </p>
              <a
                className="btn-caas self-start"
                href={p(`downloads/${item.file}`)}
                download
              >
                {LABEL[locale]} · {item.size}
              </a>
            </li>
          ))}
        </ul>
      </SafeArea>
    </section>
  );
};

export default EngineerDownloads;
