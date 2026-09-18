# ThePortfolio

A single-page portfolio site for writing, research, and strategy samples. No build step — plain HTML/CSS/JS, opened directly in a browser or served as static files.

## Structure

```
index.html            Single page: nav, landing view (card list), article view (shared shell)
css/styles.css         All styles
js/app.js              Router (showLanding/showArticle), TOC builder, image lightbox
js/charts.js           Shared Chart.js configs/helpers reused across articles
js/articles/*.js        One file per piece — populates the global ARTICLES registry
js/articles/_template.js  Copy this to scaffold a new piece
images/<Piece_Name>/    Images for a given piece, one subfolder per piece
```

It's a single HTML page with two "views" (`#landing` and `#article-view`) toggled by
`showLanding()` / `showArticle(id)` in `js/app.js`. Article content itself lives in
`js/articles/*.js`, each of which does:

```js
ARTICLES['some-id'] = {
  meta: 'Article · Category',       // small label above the title
  title: 'Piece Title',
  dek: 'Optional subtitle...',      // optional italic subtitle under the title
  charts: (id) => { ... },          // optional, only if using Chart.js
  toc: [{ id: 'section-id', label: 'Section' }],  // optional right-hand table of contents
  body: `...html...`
};
```

## Adding a new piece

1. Copy `js/articles/_template.js` to `js/articles/your-id.js`, rename the `ARTICLES['your-id']` key.
2. Fill in `meta`, `title`, `dek` (optional), and `body` (HTML string).
3. If it has images, drop them in `images/<Piece_Name>/` and reference them as
   `images/<Piece_Name>/file.jpg` in the body.
4. In `index.html`:
   - Add `<script src="js/articles/your-id.js"></script>` after `js/app.js` and `js/charts.js`,
     alongside the other article scripts.
   - Add a `<article class="card" onclick="showArticle('your-id')">` block in `#landing .cards`,
     matching the existing card markup (`card-meta`, `h2`, `card-desc`, `read-btn`).
5. Card position in the list = position of the `<article class="card">` block in `index.html`.
   To insert a piece between two others, just move the block. To visually separate groups of
   cards without a label, insert `<hr class="cards-divider">` between them (see the current
   divider between BC Trade and Sentra).

## Body content conventions (see `hydro.js` / `barbenheimer.js` / `bc-trade.js` for real examples)

- Paragraphs: plain `<p>...</p>`.
- Section headers: `<h2>...</h2>`.
- Section break (no heading): `<div class="article-divider"></div>`.
- Pull quote: `<div class="article-pull">...</div>`.
- Footnote markers: `<sup>1</sup>` inline; full list at the bottom in
  `<div class="footnotes"><p class="footnotes-label">Sources</p><p><sup>1</sup> ...</p>...</div>`.
- Image or video:
  ```html
  <div class="article-media">
    <img src="images/YourPiece/photo.jpg" alt="Description">
    <p class="article-media-caption">Caption text.</p>
  </div>
  ```
  Images default to `max-width:280px` (good for product shots/screenshots). For something that
  needs to be read clearly — a data chart, a wide diagram — override with an inline style, e.g.
  `style="max-width:520px;"` (matches the article body's text column width), rather than changing
  the shared default.
- Clicking an `<img>` inside `.article-media` opens a lightbox automatically (handled in `app.js`,
  no extra markup needed).
- Chart.js charts: add data/config to `js/charts.js`, reference via the article's `charts` function
  and a `<canvas id="...">` placed via a small HTML-returning helper (see `lineChartHTML` in
  `charts.js` and its usage in `hydro.js`).
- Table of contents: only add `toc: [...]` if the piece is long/structured enough to need one
  (e.g. a research brief). Most short-to-medium pieces (op-eds, articles) skip it entirely —
  don't add one unless asked.

## Styling notes

- Color tokens live in `:root` in `styles.css` (`--ink`, `--muted`, `--rule`, `--accent`, etc.).
  Prefer these over hardcoded colors when touching shared rules.
- `--rule` (`#cfd4d7`) is used broadly for hairline borders/dividers across nav, cards, and article
  chrome. When darkening/lightening a divider for one specific spot (e.g. `.cards-divider`), give
  it its own hardcoded color rather than changing `--rule` itself, since that variable is shared
  everywhere.
- Landing page cards (`.card`, `.card-meta`, `.card h2`, `.card-desc`, `.read-btn`) were
  deliberately sized down (~25% smaller padding/spacing, then font sizes nudged back up ~10%) so
  more of the list is visible at once without feeling cramped. Keep this balance in mind before
  resizing further.
- After any CSS change, do a hard refresh (Ctrl+Shift+R) when checking in-browser — styles.css has
  no cache-busting query string, so browsers can serve a stale cached copy.

## Research pieces / multi-version pieces

Some pieces have more than one version (e.g. a long analytical paper and a short brief). These use
two `read-btn`s on one card instead of one:

```html
<button class="read-btn" onclick="event.stopPropagation();showArticle('brief-long')">Long Version ...</button>
<button class="read-btn secondary" onclick="event.stopPropagation();showArticle('brief-short')">Short Brief ...</button>
```

`event.stopPropagation()` is required so clicking the button doesn't also trigger the card's own
`onclick`.
