# ka21.me design system

Every tool on ka21.me shares one look. The source of truth is `ka21.css` in this repo,
extracted from recipes.ka21.me (`recipe-viewer/site/style.css`). A visual change that should
apply to every tool is made **here**, not in a tool's own stylesheet.

## Using it in a tool

1. Add the dependency: `"ka21-design": "github:katime012105/ka21-design#v1"`
   (or `file:../ka21-design` while developing locally).
2. In the build step, copy `ka21-design/ka21.css` into the output folder, then load it
   **before** the tool's own CSS:
   ```html
   <link rel="stylesheet" href="ka21.css">
   <link rel="stylesheet" href="tool.css">   <!-- tool-specific only -->
   ```
3. Use the component classes below. A tool stylesheet may add layout for its own screens,
   but should use the tokens (`var(--accent)` etc.), never raw hex colors.

## Tokens

All colors switch automatically with the system light/dark setting (`prefers-color-scheme`).
There is no in-app theme toggle.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f7f4ee` | `#1b1a18` | Page background (warm off-white / near-black) |
| `--surface` | `#fffdf9` | `#24221f` | Cards, inputs, tab bar |
| `--surface-2` | `#f0ebe2` | `#2d2a26` | Segmented-control track, chips, edit rows |
| `--ink` | `#26231f` | `#f1ece4` | Body text |
| `--ink-2` | `#6b645a` | `#b8afa2` | Secondary text |
| `--ink-3` | `#9a9286` | `#8a8277` | Labels, inactive tabs, placeholders |
| `--line` | `#e4ddd1` | `#3a3631` | Borders and row dividers |
| `--accent` | `#3f6b4f` | `#8cc19c` | Brand green: primary buttons, active tab, toggles |
| `--accent-ink` | `#ffffff` | `#13221a` | Text on accent |
| `--accent-soft` | `#e2ece4` | `#2a3a2f` | Tinted accent backgrounds |
| `--today` | `#b5652b` | `#e39a62` | "Now" highlight, badges, callout border |
| `--today-soft` | `#f6e6d8` | `#3b2c20` | Callout / today background |
| `--link` | `#2f6a4a` | `#93caa4` | Links and link buttons |
| `--danger` | `#a33a2c` | `#e98a7c` | Destructive actions, warnings |
| `--good` / `--good-soft` | `#3f6b4f` / `#e2ece4` | `#8cc19c` / `#2a3a2f` | Status: fine *(added for finance)* |
| `--caution` / `--caution-soft` | `#96660f` / `#f7ecd0` | `#e2b65c` / `#3a3020` | Status: watch *(added)* |
| `--bad` / `--bad-soft` | `#a33a2c` / `#f6dfda` | `#e98a7c` / `#3e2622` | Status: problem *(added)* |

**Shape and depth:** `--radius: 14px` (cards), `--radius-sm: 10px` (inputs), 12px for buttons and
segmented controls, 999px for pills/tags. `--shadow` is a very soft two-layer shadow in light mode
and `none` in dark mode.

## Typography

No web fonts. System fonts only, so pages load instantly and feel native on iPhone.

- `--serif`: Iowan Old Style → Palatino → Georgia. **Headings** (`h1` 1.75rem, `h2` 1.3rem,
  `h3` 1.1rem, weight 600), big numbers, and day names.
- `--sans`: the system UI font (San Francisco on Apple). **Everything else**, at 17px/1.5.
- **Labels** (`.eyebrow`, `.section-label`, `.stat .label`): sans, ~.8rem, weight 700, uppercase,
  `.06em` letter-spacing, `--ink-3`.
- Money and counts use `font-variant-numeric: tabular-nums` (`.num`) so digits line up.
- Inputs are always ≥16px so iPhone Safari doesn't zoom in on focus.

## Spacing and layout

- Content column: `main`, max 760px (1280px with `main.wide`), 16px side padding,
  top padding includes `env(safe-area-inset-top)`.
- Inside cards: 16px horizontal, 12–14px vertical. Gap between cards: 12px.
- Section labels: 22px above, 8px below.
- Touch targets: at least 44px tall (rows 52–60px, buttons 46px, small buttons 38px).
- Fixed bottom **tab bar**, 64px tall + safe area. The body has bottom padding so content clears it.

## Components (class names)

| Component | Markup | Notes |
|---|---|---|
| Page header | `header.page-head > .eyebrow + h1 + .sub` | Eyebrow is usually the date or context |
| Back link | `a.back` | Adds a ‹ chevron |
| Section label | `.section-label` | Uppercase small label above a group |
| Card | `.card` (`.card.pad` for padding) | Surface + border + radius + shadow |
| List in a card | `ul.list.card > li > .row > .main(.name,.meta) + .end` | Rows divided by `--line` |
| Collapsible card | `details.fold.card > summary` | Chevron rotates when open |
| Tab bar | `nav.tabbar > a(.active) > svg + span` | 3–5 tabs |
| Buttons | `.btn`, `.btn.secondary`, `.btn.small`, `.link-btn`, `.link-btn.danger`, `.round-btn` | One primary `.btn` per area |
| Segmented control | `.segmented > button[aria-pressed]` (`.mini` variant) | For view switches |
| Pill / filter | `.pill[aria-pressed]` | Toggleable filter chip |
| Chip | `.chip`, `.chip.status` | Read-only metadata |
| Tag | `.tag` + `.good` / `.caution` / `.bad` / `.plain` | Tiny uppercase label inside text |
| Badge | `.badge` | Solid orange "Today"-style marker |
| Form field | `.field > label + input/select/textarea + .hint` | `.field-row` lays fields side by side |
| Switch | `label.toggle > input[type=checkbox] + text` | iOS-style switch |
| Checkbox | `input.check[type=checkbox]` | Rounded square, green when checked |
| Callout | `.card.callout` | Orange-tinted notice |
| Toast | `#toast(.show)` | One per page, above the tab bar |
| Spinner | `.spinner` | 14px |

## Icons

- **UI icons** are inline SVG, written into the markup (no icon font, no library):
  `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, stroke width 1.7,
  round caps and joins, simple geometric shapes. They inherit color from text.
- **App icon** (home screen): a 512×512 SVG tile:
  - background `#3f6b4f`, corner radius 112
  - one cream (`#f7f4ee`) pictogram, built from a solid filled shape plus round-capped
    20px strokes
  - Recipes is a bowl with steam; Finance is a stack of coins with a rising trend line
  - each tool changes only the pictogram, never the tile.
- Render the PNGs with `node icons/render-icons.mjs <icon.svg> <outdir>` →
  `icon-180.png` (apple-touch-icon), `icon-192.png`, `icon-512.png`.

## Home screen / PWA checklist (mirror recipes.ka21.me)

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f7f4ee" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1b1a18" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="<Short name>">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="manifest" href="manifest.webmanifest" crossorigin="use-credentials">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-180.png">
```

`manifest.webmanifest`: `display: "standalone"`, `background_color: "#f7f4ee"`,
`theme_color: "#3f6b4f"`, the 192/512 PNGs plus `icon.svg`.
`crossorigin="use-credentials"` is required so the manifest loads through Cloudflare Access.
