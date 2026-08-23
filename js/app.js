/* ── ARTICLE REGISTRY ──
   Populated by js/articles/*.js, each doing: ARTICLES['some-id'] = { meta, title, body, charts? } */
const ARTICLES = {};

/* ── CHART REGISTRY ── */
let charts = {};
function destroyCharts() { Object.values(charts).forEach(c => c.destroy()); charts = {}; }

function buildCharts(id) {
  const article = ARTICLES[id];
  if (!article || !article.charts) return;
  setTimeout(() => article.charts(id), 60);
}

/* ── NAVIGATION ── */
function updateURL(id = '') {
  if (!id) history.replaceState(null, '', window.location.pathname);
  else history.replaceState(null, '', `#${id}`);
}

function showLanding() {
  destroyCharts();
  document.getElementById('landing').classList.add('active');
  document.getElementById('article-view').classList.remove('active');
  document.getElementById('nav-label').textContent = 'Writing Samples';
  updateURL();
  window.scrollTo(0,0);
}

function showArticle(id) {
  destroyCharts();
  const a = ARTICLES[id];
  if (!a) return;
  document.getElementById('article-meta').textContent = a.meta;
  document.getElementById('article-title').textContent = a.title;
  document.getElementById('article-body').innerHTML = a.body;
  document.getElementById('nav-label').textContent = '';
  document.getElementById('landing').classList.remove('active');
  document.getElementById('article-view').classList.add('active');
  updateURL(id);
  window.scrollTo(0,0);
  buildCharts(id);
}

/* ── DIRECT URL SUPPORT ── */
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && ARTICLES[hash]) showArticle(hash);
});
