"""
Builds the free Excel templates offered on /<locale>/engineer-downloads/ into
public/downloads/. Bilingual labels (Thai / English) in every sheet.

    python3 scripts/make-downloads.py

Needs Python 3 with openpyxl.
"""
import os

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'downloads')
NAVY = '0F172A'
HEAD_FILL = PatternFill('solid', fgColor='E0F2FE')
TITLE_FONT = Font(name='Arial', size=14, bold=True, color=NAVY)
HEAD_FONT = Font(name='Arial', size=10, bold=True, color=NAVY)
BODY_FONT = Font(name='Arial', size=10)
NOTE_FONT = Font(name='Arial', size=9, italic=True, color='475569')
THIN = Side(style='thin', color='CBD5E1')
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
FOOTER = 'Infinity CoolMaster · infinitycoolmaster.com · Free template, use and share freely / ใช้และแชร์ได้ฟรี'


def header(ws, title, subtitle, columns, widths, rows=40):
    ws['A1'] = title
    ws['A1'].font = TITLE_FONT
    ws['A2'] = subtitle
    ws['A2'].font = NOTE_FONT
    ws['A3'] = 'Site / สถานที่: ____________________    Month / เดือน: __________    Recorded by / ผู้บันทึก: __________'
    ws['A3'].font = BODY_FONT
    for i, (label, width) in enumerate(zip(columns, widths), start=1):
        cell = ws.cell(row=5, column=i, value=label)
        cell.font = HEAD_FONT
        cell.fill = HEAD_FILL
        cell.alignment = Alignment(wrap_text=True, vertical='center', horizontal='center')
        cell.border = BOX
        ws.column_dimensions[get_column_letter(i)].width = width
    ws.row_dimensions[5].height = 48
    for r in range(6, 6 + rows):
        for c in range(1, len(columns) + 1):
            cell = ws.cell(row=r, column=c)
            cell.border = BOX
            cell.font = BODY_FONT
    ws.cell(row=7 + rows, column=1, value=FOOTER).font = NOTE_FONT
    ws.freeze_panes = 'A6'
    ws.page_setup.orientation = 'landscape'
    ws.page_setup.fitToWidth = 1
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_title_rows = '5:5'


def daily_log():
    wb = Workbook()
    ws = wb.active
    ws.title = 'Daily log'
    cols = [
        'Date\nวันที่', 'Time\nเวลา', 'Chiller no.\nเครื่องที่',
        'CHW supply °C\nน้ำเย็นจ่าย', 'CHW return °C\nน้ำเย็นกลับ',
        'CW supply °C\nน้ำระบายความร้อนจ่าย', 'CW return °C\nน้ำระบายความร้อนกลับ',
        'Load %\nภาระ', 'Chiller kW\nกำลังไฟชิลเลอร์', 'Pumps + towers kW\nปั๊มและคูลลิ่งทาวเวอร์',
        'Cooling TR\nความเย็นที่ผลิตได้', 'Plant kW/TR\n(auto)', 'Evap. pressure\nความดันด้านต่ำ',
        'Cond. pressure\nความดันด้านสูง', 'Alarms / notes\nสัญญาณเตือน / หมายเหตุ', 'Initials\nผู้บันทึก',
    ]
    widths = [11, 8, 9, 11, 11, 13, 13, 8, 11, 14, 11, 11, 12, 12, 30, 9]
    rows = 60
    header(ws, 'Chiller plant daily log / ใบบันทึกระบบชิลเลอร์ประจำวัน',
           'One row per reading. Plant kW/TR is calculated automatically from kW and TR. / บันทึกหนึ่งแถวต่อการอ่านค่าหนึ่งครั้ง ค่า kW/TR คำนวณอัตโนมัติ',
           cols, widths, rows)
    for r in range(6, 6 + rows):
        ws.cell(row=r, column=12, value=f'=IF(AND(ISNUMBER(K{r}),K{r}>0),(I{r}+J{r})/K{r},"")')
        ws.cell(row=r, column=12).number_format = '0.00'
        ws.cell(row=r, column=1).number_format = 'yyyy-mm-dd'
    wb.save(os.path.join(OUT, 'chiller-daily-log-th-en.xlsx'))


def monthly_checklist():
    wb = Workbook()
    ws = wb.active
    ws.title = 'Monthly checklist'
    cols = ['Area\nส่วนงาน', 'Task\nรายการ', 'Frequency\nความถี่', 'Done\nเสร็จ', 'Date\nวันที่', 'By\nผู้ปฏิบัติ', 'Notes\nหมายเหตุ']
    widths = [18, 64, 14, 8, 12, 12, 30]
    tasks = [
        ('Water treatment / บำบัดน้ำ', 'Check condenser-water conductivity, chemical levels and blowdown / ตรวจค่าการนำไฟฟ้า ระดับสารเคมี และการระบายน้ำทิ้ง', 'Weekly / รายสัปดาห์'),
        ('Cooling towers / คูลลิ่งทาวเวอร์', 'Inspect for scale, debris, algae and uneven water distribution / ตรวจตะกรัน เศษสิ่งสกปรก ตะไคร่ และการกระจายน้ำ', 'Monthly / รายเดือน'),
        ('Pumps / ปั๊ม', 'Check bearings, couplings, seals, vibration and noise / ตรวจแบริ่ง คัปปลิ้ง ซีล การสั่น และเสียง', 'Monthly / รายเดือน'),
        ('Strainers / ตะแกรงกรอง', 'Clean strainers and record differential pressure / ล้างตะแกรงกรองและบันทึกความดันตกคร่อม', 'Monthly / รายเดือน'),
        ('Performance / ประสิทธิภาพ', 'Review plant and chiller kW/TR trend from the daily log / ทบทวนแนวโน้ม kW/TR จากใบบันทึกประจำวัน', 'Monthly / รายเดือน'),
        ('Safety / ความปลอดภัย', 'Test safety controls and alarms / ทดสอบระบบควบคุมความปลอดภัยและสัญญาณเตือน', 'Quarterly / รายไตรมาส'),
        ('Refrigerant / สารทำความเย็น', 'Check refrigerant charge and look for leaks / ตรวจปริมาณสารทำความเย็นและหาการรั่ว', 'Quarterly / รายไตรมาส'),
        ('Electrical / ไฟฟ้า', 'Inspect connections, starters and variable-speed drives / ตรวจจุดต่อไฟฟ้า สตาร์ทเตอร์ และระบบปรับรอบ', 'Quarterly / รายไตรมาส'),
        ('Sensors / เซนเซอร์', 'Calibrate key temperature, flow and power sensors / สอบเทียบเซนเซอร์อุณหภูมิ อัตราการไหล และกำลังไฟฟ้า', 'Half-yearly / รายครึ่งปี'),
        ('Heat exchangers / เครื่องแลกเปลี่ยนความร้อน', 'Clean condenser tubes (evaporator where needed) / ล้างท่อคอนเดนเซอร์ (และอีวาพอเรเตอร์ตามความจำเป็น)', 'Annual / รายปี'),
        ('Compressor / คอมเพรสเซอร์', 'Oil analysis and inspection per manufacturer / วิเคราะห์น้ำมันและตรวจตามคำแนะนำผู้ผลิต', 'Annual / รายปี'),
        ('Cooling towers / คูลลิ่งทาวเวอร์', 'Overhaul fill, drift eliminators, nozzles and fans / ยกเครื่องฟิลล์ ดริฟต์อีลิมิเนเตอร์ หัวฉีด และพัดลม', 'Annual / รายปี'),
        ('Controls / ระบบควบคุม', 'Review sequences and setpoints against last year’s data / ทบทวนลำดับการควบคุมและค่าที่ตั้งจากข้อมูลปีที่ผ่านมา', 'Annual / รายปี'),
    ]
    header(ws, 'Chiller plant maintenance checklist / เช็กลิสต์บำรุงรักษาระบบชิลเลอร์',
           'Follow the manufacturer’s instructions for your equipment. / ปฏิบัติตามคำแนะนำของผู้ผลิตสำหรับอุปกรณ์ของคุณ',
           cols, widths, rows=len(tasks))
    done = DataValidation(type='list', formula1='"✓,✗,N/A"', allow_blank=True)
    ws.add_data_validation(done)
    for i, (area, task, freq) in enumerate(tasks, start=6):
        ws.cell(row=i, column=1, value=area)
        ws.cell(row=i, column=2, value=task)
        ws.cell(row=i, column=3, value=freq)
        done.add(ws.cell(row=i, column=4))
        for c in (1, 2, 3):
            ws.cell(row=i, column=c).alignment = Alignment(wrap_text=True, vertical='top')
        ws.row_dimensions[i].height = 32
    wb.save(os.path.join(OUT, 'chiller-maintenance-checklist-th-en.xlsx'))


def mv_checklist():
    wb = Workbook()
    ws = wb.active
    ws.title = 'M&V checklist'
    cols = ['Item\nรายการ', 'Detail\nรายละเอียด', 'Have it?\nมีแล้ว', 'Source / file\nแหล่งข้อมูล', 'Notes\nหมายเหตุ']
    widths = [34, 60, 10, 24, 30]
    items = [
        ('Electricity bills / บิลค่าไฟ', '12–24 months: kWh, peak kW, TOU split, meter numbers / 12–24 เดือน หน่วยไฟฟ้า kW สูงสุด การแบ่ง TOU เลขมิเตอร์'),
        ('Interval data / ข้อมูลรายช่วงเวลา', '15- or 30-minute data from PEA/MEA if available / ข้อมูลราย 15 หรือ 30 นาทีจาก กฟภ./กฟน. ถ้ามี'),
        ('Operating data / ข้อมูลการใช้งาน', 'Production, occupancy or operating hours by month / ปริมาณการผลิต การใช้อาคาร หรือชั่วโมงทำงานรายเดือน'),
        ('Weather / สภาพอากาศ', 'Outdoor temperature and humidity for the same period / อุณหภูมิและความชื้นภายนอกในช่วงเดียวกัน'),
        ('Plant inventory / รายการอุปกรณ์', 'Chillers (make, model, TR, age, refrigerant), pumps, towers / ชิลเลอร์ (ยี่ห้อ รุ่น TR อายุ สารทำความเย็น) ปั๊ม คูลลิ่งทาวเวอร์'),
        ('Plant power / กำลังไฟฟ้าของระบบ', 'kW of chillers, pumps and tower fans, logged ≥ 2 weeks / kW ของชิลเลอร์ ปั๊ม และพัดลม บันทึกอย่างน้อย 2 สัปดาห์'),
        ('Cooling output / ความเย็นที่ผลิตได้', 'Chilled-water flow and supply/return temperatures, same interval / อัตราการไหลน้ำเย็นและอุณหภูมิจ่าย/กลับ ช่วงเวลาเดียวกัน'),
        ('Calibration / การสอบเทียบ', 'Certificates for every logger and sensor used / ใบรับรองการสอบเทียบของเครื่องบันทึกและเซนเซอร์ทุกตัว'),
        ('Requirements / ข้อกำหนด', 'Required chilled-water temperatures and comfort or process limits / อุณหภูมิน้ำเย็นที่ต้องการ และขอบเขตความสบายหรือกระบวนการผลิต'),
        ('Boundary & method / ขอบเขตและวิธี', 'Measurement boundary and IPMVP option agreed / ตกลงขอบเขตการวัดและทางเลือก IPMVP'),
        ('Adjustments / การปรับค่า', 'Baseline adjustment variables agreed (weather, production) / ตกลงตัวแปรสำหรับปรับ Baseline (สภาพอากาศ การผลิต)'),
        ('Reporting / การรายงาน', 'Report frequency and who can audit the data / ความถี่ของรายงานและผู้ที่ตรวจสอบข้อมูลได้'),
    ]
    header(ws, 'M&V data checklist / เช็กลิสต์ข้อมูลการตรวจวัดผลประหยัด (M&V)',
           'Collect before the existing plant changes. / เก็บข้อมูลก่อนที่ระบบเดิมจะเปลี่ยนแปลง',
           cols, widths, rows=len(items))
    have = DataValidation(type='list', formula1='"Yes / มี,No / ไม่มี,Partly / บางส่วน"', allow_blank=True)
    ws.add_data_validation(have)
    for i, (item, detail) in enumerate(items, start=6):
        ws.cell(row=i, column=1, value=item)
        ws.cell(row=i, column=2, value=detail)
        have.add(ws.cell(row=i, column=3))
        for c in (1, 2):
            ws.cell(row=i, column=c).alignment = Alignment(wrap_text=True, vertical='top')
        ws.row_dimensions[i].height = 32
    wb.save(os.path.join(OUT, 'mv-data-checklist-th-en.xlsx'))


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    daily_log()
    monthly_checklist()
    mv_checklist()
    for name in sorted(os.listdir(OUT)):
        print(name, os.path.getsize(os.path.join(OUT, name)), 'bytes')
