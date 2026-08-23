/* ── ARTICLE REGISTRY ──
   Populated by js/articles/*.js, each doing: ARTICLES['some-id'] = { meta, title, body, charts?, toc? }
   toc (optional): [{ id: 'section-id', label: 'Section Label' }, ...] — an anchor with a matching id
   must exist in body (e.g. <h2 id="section-id">). When present, a sticky right-hand table of
   contents is rendered and kept in sync with scroll position. */
const ARTICLES = {};

/* ── CHART REGISTRY ── */
let charts = {};
function destroyCharts() { Object.values(charts).forEach(c => c.destroy()); charts = {}; }

function buildCharts(id) {
  const article = ARTICLES[id];
  if (!article || !article.charts) return;
  setTimeout(() => article.charts(id), 60);
}

/* ── TABLE OF CONTENTS / SCROLLSPY ── */
let tocObserver = null;

function destroyTOC() {
  if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
  document.getElementById('article-view').classList.remove('wide');
  const sidebar = document.getElementById('toc-sidebar');
  if (sidebar) {
    if (sidebar._onScroll) window.removeEventListener('scroll', sidebar._onScroll);
    sidebar.remove();
  }
}

function buildTOC(article) {
  if (!article.toc || !article.toc.length) return;
  const view = document.getElementById('article-view');
  view.classList.add('wide');

  const nav = document.createElement('div');
  nav.className = 'toc-sidebar';
  nav.id = 'toc-sidebar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Table of contents');
  const items = article.toc.map(s =>
    `<li${s.sub ? ' class="toc-sub"' : ''}><a href="#" data-toc-target="${s.id}">${s.label}</a></li>`
  ).join('');
  nav.innerHTML = `<p class="toc-label">On this page</p><ul class="toc-list">${items}</ul>`;
  view.appendChild(nav);

  nav.querySelectorAll('a[data-toc-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.tocTarget);
      if (target) {
        if (target.tagName === 'DETAILS') target.open = true;
        const navOffset = 52 + 24;
        const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const sectionEls = article.toc
    .map(s => document.getElementById(s.id))
    .filter(Boolean);
  if (!sectionEls.length) return;

  const setActive = (id) => {
    nav.querySelectorAll('a[data-toc-target]').forEach(a =>
      a.classList.toggle('active', a.dataset.tocTarget === id)
    );
  };
  setActive(sectionEls[0].id);

  tocObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    if (visible.length) {
      const topMost = visible.reduce((a, b) => a.boundingClientRect.top < b.boundingClientRect.top ? a : b);
      setActive(topMost.target.id);
    }
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

  sectionEls.forEach(el => tocObserver.observe(el));

  // Fast scrolls or short trailing sections can land past the observer's trigger zone
  // without crossing a new threshold; snap to the last section once near page bottom.
  const lastId = sectionEls[sectionEls.length - 1].id;
  const onScroll = () => {
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
    if (scrolledToBottom) setActive(lastId);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  nav._onScroll = onScroll;
}

/* ── NAVIGATION ── */
function updateURL(id = '') {
  if (!id) history.replaceState(null, '', window.location.pathname);
  else history.replaceState(null, '', `#${id}`);
}

function showLanding() {
  destroyCharts();
  destroyTOC();
  document.getElementById('landing').classList.add('active');
  document.getElementById('article-view').classList.remove('active');
  document.getElementById('nav-label').textContent = 'Writing Samples';
  updateURL();
  window.scrollTo(0,0);
}

function showArticle(id) {
  destroyCharts();
  destroyTOC();
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
  buildTOC(a);
}

/* ── DIRECT URL SUPPORT ── */
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && ARTICLES[hash]) showArticle(hash);
});

/* ── IMAGE LIGHTBOX ── */
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<img class="lightbox-img">';
  document.body.appendChild(overlay);
  const lightboxImg = overlay.querySelector('img');

  function close() {
    overlay.classList.remove('active');
    lightboxImg.src = '';
  }

  overlay.addEventListener('click', close);

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.article-media img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    overlay.classList.add('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();
