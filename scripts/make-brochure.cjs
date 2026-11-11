/**
 * Builds the one-page company brochure as PDF, in Thai and English:
 *   public/downloads/infinity-coolmaster-brochure-th.pdf
 *   public/downloads/infinity-coolmaster-brochure-en.pdf
 *
 * Needs Playwright with Chromium:  node scripts/make-brochure.cjs
 * Every statement below is a confirmed company fact; keep it that way.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const url = (rel) => pathToFileURL(path.join(PUB, rel)).href;

const TEXT = {
  en: {
    kicker: 'COOLING-AS-A-SERVICE (CAAS)',
    title: 'A new, efficient chiller plant.\nNo upfront investment.',
    lead: 'Infinity CoolMaster designs, finances, installs, operates and maintains high-efficiency chiller plants for factories and buildings in Thailand. You pay for cooling from the energy you save.',
    glanceTitle: 'The contract at a glance',
    glance: [
      ['Upfront investment', '฿0'],
      ['Guaranteed energy saving', 'At least 10%, in writing'],
      ['Contract term', '5–10 years'],
      ['Savings verified', 'Monthly, IPMVP-aligned'],
      ['Plant monitoring', '24/7'],
      ['Owns and maintains the plant', 'Infinity CoolMaster'],
      ['At the end of the contract', 'Renew or take ownership on agreed terms'],
    ],
    stepsTitle: 'How it works',
    steps: [
      ['Free audit', 'We review 12 months of bills and survey the plant.'],
      ['Written proposal', 'Baseline, guaranteed saving and contract terms.'],
      ['We invest and install', 'Around your operating schedule.'],
      [
        'We operate, 24/7',
        'CPMS with machine learning optimises chillers, pumps and towers.',
      ],
      ['Verified every month', 'Savings measured against the agreed baseline.'],
    ],
    whoTitle: 'Who it is for',
    who: 'Factories · Hospitals · Hotels and resorts · Shopping malls · Office buildings · Data centres',
    whyTitle: 'Why owners choose it',
    why: [
      'Capital stays in the core business.',
      'One partner is responsible for performance and operation.',
      'Our fee follows measured savings, so the performance risk is ours.',
      'Monthly, auditable reports support energy and ESG reporting.',
    ],
    projectTitle: 'First project',
    project:
      'Our first Cooling-as-a-Service plant, for Platinum Pro Plastic in Rayong, is in testing and commissioning in November 2026.',
    contactTitle: 'Request a free audit',
    company:
      'Infinity CoolMaster Co., Ltd. · Company registration no. 0105566016285',
    address:
      '157/9 Soi Ari Samphan 2, Phahonyothin Road, Phaya Thai, Bangkok 10400',
    note: 'Savings figures are confirmed by a site audit and set in a written proposal.',
  },
  th: {
    kicker: 'COOLING-AS-A-SERVICE (CAAS)',
    title: 'ระบบชิลเลอร์ใหม่ ประสิทธิภาพสูง\nโดยไม่ต้องลงทุนก้อนแรก',
    lead: 'Infinity CoolMaster ออกแบบ ลงทุน ติดตั้ง เดินระบบ และบำรุงรักษาระบบชิลเลอร์ประสิทธิภาพสูง สำหรับโรงงานและอาคารในประเทศไทย คุณจ่ายค่าความเย็นจากพลังงานที่ประหยัดได้',
    glanceTitle: 'สรุปเงื่อนไขสัญญา',
    glance: [
      ['เงินลงทุนก้อนแรก', '฿0'],
      ['รับประกันผลประหยัดพลังงาน', 'ขั้นต่ำ 10% เป็นลายลักษณ์อักษร'],
      ['ระยะเวลาสัญญา', '5–10 ปี'],
      ['การตรวจวัดพิสูจน์ผล', 'ทุกเดือน ตามแนวทาง IPMVP'],
      ['การเฝ้าติดตามระบบ', 'ตลอด 24 ชั่วโมง'],
      ['ผู้เป็นเจ้าของและดูแลระบบ', 'Infinity CoolMaster'],
      [
        'เมื่อสิ้นสุดสัญญา',
        'ต่อสัญญาหรือรับโอนกรรมสิทธิ์ตามเงื่อนไขที่ตกลงไว้',
      ],
    ],
    stepsTitle: 'ขั้นตอนการทำงาน',
    steps: [
      ['ตรวจประเมินฟรี', 'วิเคราะห์ค่าไฟย้อนหลัง 12 เดือน และสำรวจระบบ'],
      [
        'ข้อเสนอเป็นลายลักษณ์อักษร',
        'ค่าฐาน ผลประหยัดที่รับประกัน และเงื่อนไขสัญญา',
      ],
      ['เราลงทุนและติดตั้ง', 'วางแผนตามตารางการทำงานของคุณ'],
      [
        'เราดูแลระบบ 24 ชั่วโมง',
        'CPMS พร้อม Machine Learning ปรับชิลเลอร์ ปั๊ม และทาวเวอร์',
      ],
      ['พิสูจน์ผลทุกเดือน', 'ตรวจวัดผลประหยัดเทียบกับค่าฐานที่ตกลงกัน'],
    ],
    whoTitle: 'เหมาะกับใคร',
    who: 'โรงงาน · โรงพยาบาล · โรงแรมและรีสอร์ท · ศูนย์การค้า · อาคารสำนักงาน · ดาต้าเซ็นเตอร์',
    whyTitle: 'ทำไมเจ้าของกิจการเลือกรูปแบบนี้',
    why: [
      'เก็บเงินลงทุนไว้กับธุรกิจหลัก',
      'มีพันธมิตรรายเดียวรับผิดชอบทั้งผลงานและการดูแลระบบ',
      'ค่าบริการเป็นไปตามผลประหยัดที่วัดได้ ความเสี่ยงด้านผลประหยัดจึงเป็นของเรา',
      'รายงานรายเดือนที่ตรวจสอบได้ ใช้ประกอบรายงานพลังงานและ ESG',
    ],
    projectTitle: 'โครงการแรก',
    project:
      'ระบบ Cooling-as-a-Service แห่งแรกของเรา สำหรับ แพลตตินั่ม โปร พลาสติก จังหวัดระยอง อยู่ระหว่างทดสอบและเดินระบบในเดือนพฤศจิกายน 2569',
    contactTitle: 'ขอรับการประเมินฟรี',
    company:
      'บริษัท อินฟินิตี คูลมาสเตอร์ จำกัด · เลขทะเบียนนิติบุคคล 0105566016285',
    address:
      '157/9 ซอยอารีย์สัมพันธ์ 2 ถนนพหลโยธิน แขวงพญาไท เขตพญาไท กรุงเทพมหานคร 10400',
    note: 'ตัวเลขผลประหยัดจะยืนยันด้วยการตรวจประเมินที่หน้างาน และระบุในข้อเสนอเป็นลายลักษณ์อักษร',
  },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const html = (
  t,
  locale
) => `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:400;src:url(${url('fonts/inter/Inter-Regular.woff2')})}
@font-face{font-family:Inter;font-weight:600;src:url(${url('fonts/inter/Inter-SemiBold.woff2')})}
@font-face{font-family:Thai;src:url(${url('fonts/noto-sans-thai/NotoSansThai.ttf')})}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,Thai,sans-serif;color:#0F172A;font-size:10.5pt;line-height:1.5;width:210mm;height:297mm;display:flex;flex-direction:column}
.top{background:linear-gradient(135deg,#F0FDF9,#E0F2FE);padding:14mm 16mm 10mm}
.logo{height:16mm}
.kicker{margin-top:8mm;font-size:8pt;letter-spacing:2.5px;font-weight:600;color:#047857}
h1{margin-top:3mm;font-size:23pt;line-height:1.22;font-weight:600;white-space:pre-line}
.lead{margin-top:4mm;max-width:150mm;font-size:11pt;color:#475569}
.body{flex:1;padding:8mm 16mm 0;display:grid;grid-template-columns:1fr 1fr;gap:8mm}
h2{font-size:8.5pt;letter-spacing:2px;text-transform:uppercase;font-weight:600;color:#047857;margin-bottom:2.5mm}
.card{border:1px solid #E2E8F0;border-radius:4mm;padding:5mm}
.row{display:flex;justify-content:space-between;gap:4mm;padding:1.7mm 0;border-top:1px solid #EEF2F6;font-size:9.5pt}
.row:first-of-type{border-top:0}
.row span:first-child{color:#475569}
.row span:last-child{font-weight:600;text-align:right}
.step{display:flex;gap:3mm;margin-bottom:2.6mm}
.n{flex:none;width:6.5mm;height:6.5mm;border-radius:50%;background:linear-gradient(135deg,#10B981,#38BDF8);color:#fff;font-weight:600;font-size:9pt;display:flex;align-items:center;justify-content:center}
.step b{display:block;font-weight:600}
.step span{color:#475569;font-size:9.5pt}
ul{list-style:none}
li{padding-left:5mm;position:relative;margin-bottom:1.6mm;color:#334155}
li:before{content:"";position:absolute;left:0;top:2.1mm;width:2.2mm;height:2.2mm;border-radius:50%;background:#10B981}
.sec{margin-bottom:6mm}
.muted{color:#475569}
.foot{background:#0F172A;color:#fff;padding:7mm 16mm;display:flex;justify-content:space-between;gap:8mm;align-items:center}
.foot h3{font-size:13pt;font-weight:600}
.foot .c{font-size:11pt;font-weight:600;line-height:1.7;text-align:right}
.foot small{display:block;margin-top:1.5mm;font-size:7.5pt;color:#CBD5E1;font-weight:400}
.note{padding:3mm 16mm 4mm;font-size:7.5pt;color:#64748B}
</style></head><body>
<div class="top"><img class="logo" src="${url('assets/brand/logo-official.png')}" alt="Infinity CoolMaster">
<div class="kicker">${esc(t.kicker)}</div><h1>${esc(t.title)}</h1><p class="lead">${esc(t.lead)}</p></div>
<div class="body"><div>
<div class="sec"><h2>${esc(t.glanceTitle)}</h2><div class="card">${t.glance.map(([a, b]) => `<div class="row"><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join('')}</div></div>
<div class="sec"><h2>${esc(t.whoTitle)}</h2><p class="muted">${esc(t.who)}</p></div>
<div class="sec"><h2>${esc(t.projectTitle)}</h2><p class="muted">${esc(t.project)}</p></div>
</div><div>
<div class="sec"><h2>${esc(t.stepsTitle)}</h2>${t.steps.map(([a, b], i) => `<div class="step"><div class="n">${i + 1}</div><div><b>${esc(a)}</b><span>${esc(b)}</span></div></div>`).join('')}</div>
<div class="sec"><h2>${esc(t.whyTitle)}</h2><ul>${t.why.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
</div></div>
<div class="note">${esc(t.note)}</div>
<div class="foot"><div><h3>${esc(t.contactTitle)}</h3><small>${esc(t.company)}<br>${esc(t.address)}</small></div>
<div class="c">082-096-6595<br>sales@infinitycoolmaster.com<br>infinitycoolmaster.com</div></div>
</body></html>`;

(async () => {
  const out = path.join(PUB, 'downloads');
  fs.mkdirSync(out, { recursive: true });
  const tmp = path.join(PUB, '.brochure-tmp.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const locale of ['th', 'en']) {
    fs.writeFileSync(tmp, html(TEXT[locale], locale));
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(out, `infinity-coolmaster-brochure-${locale}.pdf`);
    await page.pdf({ path: file, format: 'A4', printBackground: true });
    if (process.env.BROCHURE_PNG) {
      await page.setViewportSize({ width: 794, height: 1123 });
      await page.screenshot({
        path: `${process.env.BROCHURE_PNG}-${locale}.png`,
      });
    }
    console.log(file, Math.round(fs.statSync(file).size / 1024) + ' KB');
  }
  fs.unlinkSync(tmp);
  await browser.close();
})();
