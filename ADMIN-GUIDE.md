# Infinity CoolMaster — Website Editing Guide (for everyone)

You do **not** need any technical knowledge to update the website.
Everything is done in a normal web page with forms and buttons.

---

## 1. Logging in

1. Open this address in your browser:
   **https://infinitycoolmaster.com/admin/**
2. Type your **email** and **password** (given to you by the administrator).
3. Click **Sign in**.

You now see the **Content Manager**. On the left is a menu:

| Menu item | What it controls |
| --- | --- |
| 📥 Leads | Customer enquiries from the website form |
| Site Text | Every heading and sentence on the website (English + Thai) |
| Banners & Images | The big pictures at the top of pages |
| Case Studies | The project showcase pages |
| Articles & News | Blog articles and company news |
| Partners & Clients | The logo strips |
| Benefits / Services / Sectors | The home-page content blocks |
| Contact Channels | Address, phone, email, social links |

**Golden rule:** when you press **Save**, the change is live immediately.
Visitors see it the next time they open or refresh the page. There is no
"publish" step and nothing to install.

---

## 2. Changing a banner photo  ⭐ most common task

Example: replacing the About page banner.

1. Log in (see above).
2. Click **Banners & Images** in the left menu.
3. Find the card titled **"About page — hero banner"**.
4. Click the dark **Upload image** button.
5. Choose a photo from your computer and wait a few seconds —
   the small preview changes to your new photo.
6. Click **Save**. A green message confirms it.
7. Check it: open the website, go to the About page, and refresh
   (press F5). Your new banner is there.

Made a mistake? Click **Reset to default** on the same card and the
original picture comes back.

**Photo tips:**
- Banners look best **wide**, around **1600 × 700 pixels** (landscape).
- Use JPG or PNG. If the file is bigger than ~2 MB, the page loads slowly —
  resize large phone photos first if you can.

---

## 3. Changing text (any heading or sentence)

1. Click **Site Text** in the left menu.
2. Find your text in one of two ways:
   - Click a group to open it (e.g. **Home page**, **About page**), or
   - Type a word you remember into the **search box** at the top —
     it finds matching texts in English or Thai.
3. Each text has two boxes: **English** and **ภาษาไทย**. Edit both so the
   two language versions of the site stay consistent.
4. Click the small **Save** button under that text.
5. Refresh the website to see it live.

Texts you have changed show a green **customized** badge. Click
**Reset to default** to restore the original wording.

---

## 4. Case studies (projects)

> **Only real, verified projects.** The website ships with no sample case
> studies. Until the first one is added, the site shows a "first project in
> testing and commissioning" notice and hides the portfolio statistics. Add a
> case study only when its numbers are measured, and only name a client who
> has agreed in writing.

### First time only
Open the **Case Studies** tab. If you see a blue box saying the list shows
"built-in defaults", click **"Enable editing (copy defaults)"** once.
The example projects become editable.

### Edit an existing case study
1. Click **Edit** next to its name.
2. Change any field — every field has a label, and texts have EN + TH boxes:
   - **Title / Short teaser / Full story** — the words on the page.
     In the Full story, leave an empty line between paragraphs.
   - **Web address (slug)** — the end of the page's address, e.g.
     `sathorn-office-tower-28-percent-savings` gives
     `infinitycoolmaster.com/en/case-studies/sathorn-office-tower-28-percent-savings/`.
     Lower-case words joined by hyphens. Leave it empty to use the English
     title. Avoid changing it once the page is published — links people
     already shared would stop working.
   - **Plant size (TR), Verified savings (%), Year in service** — the numbers
     shown on the card and page.
   - **Card photo / Page banner photo** — use the **Upload image** buttons,
     same as banners.
   - **Photo gallery** — click **+ Add photo**, then Upload for each one.
3. Click **Save** at the bottom.

### Add a new case study
Click **+ Add case study**, fill in the form, **Save**.
The number in **Display order** controls its position in the list
(1 = first).

### Remove one
Click **Delete** next to it and confirm. (Careful — this cannot be undone.)

The statistics on the home page (number of facilities, total TR, energy
saved) update **automatically** from this list — you never edit them
directly.

> **Tell the website administrator after adding or changing case studies or
> articles.** Visitors see your change right away, but Google and AI
> assistants only see it after the site is rebuilt and redeployed
> (`npm run deploy`). A brand-new case study or article has no page of its
> own for search engines until then.

---

## 5. Articles & news

Works exactly like case studies: enable editing once, then Edit / Add /
Delete. Extra fields:
- **Publish date** — shown on the article card.
- **Tag badge / Article type** — pick from the dropdown lists.
- **Article body** formatting: start a line with `## ` for a heading,
  `### ` for a sub-heading and `- ` for each bullet point; leave an empty
  line between paragraphs.
- **Key points** — three or four short sentences, one per line, that answer
  the article on their own. They appear in a box at the top of the article,
  and search engines and AI assistants quote them first.
- **Last updated** — set it when you change an article substantially; it is
  shown on the page and to search engines.

Thirteen in-depth guides (Cooling-as-a-Service basics, chiller replacement,
kW/TR, maintenance, IPMVP, PUE, hotels, hospitals and more) are built into
the website itself and always appear in the list. To edit one, ask the website administrator, or
create an article here with the same web address (slug) — yours then
replaces the built-in one.

---

## 6. Partner and client logos

The built-in logos were design placeholders and are no longer shown: the
logo strips stay hidden until you add **real** partners and clients (with
their written permission to show their logo).

1. Open **Partners & Clients** (enable editing the first time).
2. **+ Add partner** → type the name → **Upload image** for the logo
   (a PNG with transparent background looks best).
3. Choose the **Strip**:
   - `vendor` → appears under *Trusted Technology Partners*
   - `client` → appears under *Enterprises That Trust Us*
4. **Save**.

---

## 7. Customer leads 📥

When someone fills in the "Request a Free Audit" form on the website,
their details appear here instantly — newest on top.

- Click the **email** or **phone number** to contact them directly.
- Use the **Status** dropdown to track progress:
  `new → contacted → qualified → won / lost`.
- Click **Refresh** to check for new entries.

Tip: check this tab **every working day** — fast replies win customers.

---

## 8. If something goes wrong

- A change doesn't appear? Refresh the website page (F5). On a phone,
  close and reopen the browser tab.
- Saved the wrong thing? Edit it again, or use **Reset to default**
  (text and banners only).
- Page shows an error after your computer was idle? Sign in again.
- Still stuck? Contact your administrator — nothing you do in the
  Content Manager can permanently break the website; the design and
  layout are protected.
