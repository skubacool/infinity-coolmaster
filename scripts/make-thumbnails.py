#!/usr/bin/env python3
"""Draws the line-art thumbnails for the built-in guides.

Output: public/assets/guides/<name>.svg (one per topic), in the same style as
public/assets/placeholders/. Run after adding a motif:

    python3 scripts/make-thumbnails.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "assets" / "guides"

# Each motif is an SVG path drawn inside a 400x483 canvas, centred near (200, 225).
MOTIFS = {
    "contract": "M150 120 h75 l25 25 v175 h-100 z M225 120 v25 h25 M170 185 h60 M170 215 h60 M170 245 h35 M172 284 l14 14 l28 -30",
    "price": "M125 220 l85 -85 h70 v70 l-85 85 z M252 163 m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M178 232 l28 28",
    "gauge": "M115 285 a85 85 0 1 1 170 0 z M200 285 l42 -58 M132 238 l13 8 M200 200 v15 M268 238 l-13 8",
    "questions": "M145 142 h110 v180 h-110 z M175 128 h50 v26 h-50 z M168 197 l10 10 l16 -18 M210 199 h27 M168 242 l10 10 l16 -18 M210 244 h27 M168 288 h69",
    "bolt": "M218 112 l-70 125 h48 l-16 92 l74 -130 h-48 z",
    "warning": "M200 122 l95 172 h-190 z M200 185 v58 M200 266 v3",
    "water-air": "M160 140 c-32 48 -42 64 -42 84 a42 42 0 0 0 84 0 c0 -20 -10 -36 -42 -84 z M228 185 h48 a16 16 0 1 0 -16 -16 M228 225 h72 M228 265 h44 a16 16 0 1 1 -16 16",
    "wrench": "M252 132 a46 46 0 0 0 -57 61 l-78 78 a15 15 0 0 0 30 30 l78 -78 a46 46 0 0 0 61 -57 l-29 29 l-26 -8 l-8 -26 z",
    "chart": "M128 128 v195 h155 M150 292 l36 -52 l30 20 l46 -78 M150 200 h112",
    "calendar": "M132 150 h136 v165 h-136 z M132 192 h136 M165 130 v36 M235 130 v36 M160 228 h22 M200 228 h22 M240 228 h10 M160 265 h22 M200 265 h22",
    "clock": "M200 225 m-88 0 a88 88 0 1 0 176 0 a88 88 0 1 0 -176 0 M200 168 v57 l40 26",
    "law": "M200 122 v195 M150 317 h100 M138 160 h124 M138 160 l-26 66 a26 18 0 0 0 52 0 z M262 160 l-26 66 a26 18 0 0 0 52 0 z",
    "compare": "M125 138 h65 v175 h-65 z M210 138 h65 v175 h-65 z M142 182 l10 10 l18 -20 M228 185 h30 M142 232 h31 M228 232 h30 M142 272 h31 M228 272 h30",
    "snowflake": "M200 120 v210 M109 172 l182 106 M109 278 l182 -106 M200 152 l-19 -19 M200 152 l19 -19 M200 298 l-19 19 M200 298 l19 19",
    "flask": "M172 128 h56 M184 128 v68 l-52 108 a12 12 0 0 0 11 18 h114 a12 12 0 0 0 11 -18 l-52 -108 v-68 M150 268 h100",
    "documents": "M130 145 h90 v135 h-90 z M180 190 h90 v135 h-90 z M200 228 h50 M200 258 h50 M200 288 h28",
    "leaf": "M130 305 c0 -115 62 -172 158 -172 c0 115 -58 172 -158 172 z M130 305 l104 -110",
    "thermometer": "M184 128 a16 16 0 0 1 32 0 v122 a36 36 0 1 1 -32 0 z M200 178 v96 M242 150 h32 M242 186 h20 M242 222 h32",
    "tower": "M148 322 c16 -62 16 -112 5 -184 h94 c-11 72 -11 122 5 184 z M157 192 h86 M136 322 h128 M174 118 c0 -12 12 -12 12 -24 M200 118 c0 -12 12 -12 12 -24 M226 118 c0 -12 12 -12 12 -24",
    "wave": "M112 225 c20 -92 40 -92 58 0 s38 92 58 0 s38 -92 58 0 M112 315 h176 M112 135 h176",
    "staging": "M128 322 v-52 h37 v52 M181 322 v-104 h37 v104 M234 322 v-164 h37 v164 M116 322 h168 M134 236 l46 -46 l52 -20 l42 -48",
    "chiller": "M122 188 h156 v84 h-156 z M150 272 v30 M250 272 v30 M132 302 h136 M168 188 v-38 h64 v38 M184 169 h32 M150 216 h100 M150 244 h100",
    "sun-snow": "M160 180 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0 M160 124 v13 M160 223 v13 M104 180 h13 M203 180 h13 M120 140 l9 9 M191 211 l9 9 M200 140 l-9 9 M129 211 l-9 9 M250 228 v96 M208 252 l84 48 M208 300 l84 -48",
    "building": "M150 320 v-190 h100 v190 M170 155 h20 v20 h-20 z M210 155 h20 v20 h-20 z M170 195 h20 v20 h-20 z M210 195 h20 v20 h-20 z M170 235 h20 v20 h-20 z M210 235 h20 v20 h-20 z M185 280 h30 v40 h-30 z M130 320 h140",
    "factory": "M120 320 v-95 l55 35 v-35 l55 35 v-35 l50 30 v65 z M135 225 v-90 h28 v108 M165 290 h20 M205 290 h20 M245 290 h20",
    "server": "M140 130 h120 v55 h-120 z M140 198 h120 v55 h-120 z M140 266 h120 v55 h-120 z M160 158 h4 M160 226 h4 M160 294 h4 M190 158 h50 M190 226 h50 M190 294 h50",
    "hospital": "M135 320 v-170 h130 v170 z M200 185 v60 M170 215 h60 M180 320 v-45 h40 v45 M120 320 h160",
    "hotel": "M120 300 v-120 M120 250 h160 v50 M280 300 v-70 M150 250 v-30 h50 v30 M165 205 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 M200 235 h65 a15 15 0 0 1 15 15",
    "checklist": "M140 130 h120 v190 h-120 z M160 172 l9 9 l15 -17 M198 174 h42 M160 217 l9 9 l15 -17 M198 219 h42 M160 262 l9 9 l15 -17 M198 264 h42",
}

TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 483">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F0FDF9"/>
      <stop offset="1" stop-color="#E0F2FE"/>
    </linearGradient>
    <linearGradient id="ln" x1="0" y1="0" x2="400" y2="483" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#10B981"/>
      <stop offset="1" stop-color="#38BDF8"/>
    </linearGradient>
  </defs>
  <rect width="400" height="483" fill="url(#bg)"/>
  <g stroke="#0F172A" stroke-opacity="0.05" stroke-width="1">
    <path d="M0 120 H400 M0 240 H400 M0 360 H400 M100 0 V483 M200 0 V483 M300 0 V483"/>
  </g>
  <circle cx="200" cy="241" r="112" fill="#FFFFFF" fill-opacity="0.55"/>
  <!-- Scaled around the canvas centre so wide (cropped) cards still show the whole icon. -->
  <g transform="translate(200 241) scale(0.78) translate(-200 -225)">
    <path d="{path}" fill="none" stroke="url(#ln)" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
  </g>
</svg>
"""


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, path in MOTIFS.items():
        (OUT / f"{name}.svg").write_text(TEMPLATE.format(path=path), encoding="utf-8")
    print(f"{len(MOTIFS)} thumbnails written to {OUT}")


if __name__ == "__main__":
    main()
