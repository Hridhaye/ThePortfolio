/* ── ARTICLE REGISTRY ──
   Populated by js/articles/*.js, each doing: ARTICLES['some-id'] = { meta, title, body, charts?, toc? }
   toc (optional): [{ id: 'section-id', label: 'Section Label' }, ...] — an anchor with a matching id
   must exist in body (e.g. <h2 id="section-id">). When present, a sticky right-hand table of
   contents is rendered and kept in sync with scroll position. */
const ARTICLES = {};

/* ── CATEGORY REGISTRY ──
   Sub-landing pages that sit between the home page and a project (e.g. Analytics).
   CATEGORIES['id'] = { label, title, intro, cardsHTML } — cardsHTML is the inner markup
   of a .cards list (one .card per project). showCategory(id) renders it into #category-view.
   An article can set backTo: 'id' so its ← button returns to that category instead of home. */
const CATEGORIES = {};

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

/* Which view the nav ← button and article back-links should return to. */
let currentCategory = null;

function hideAllViews() {
  ['landing', 'category-view', 'article-view'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
}

function showLanding() {
  destroyCharts();
  destroyTOC();
  currentCategory = null;
  hideAllViews();
  document.getElementById('landing').classList.add('active');
  document.getElementById('nav-label').textContent = 'Writing Samples';
  updateURL();
  window.scrollTo(0,0);
}

function showCategory(id) {
  destroyCharts();
  destroyTOC();
  const c = CATEGORIES[id];
  if (!c) return;
  currentCategory = id;
  hideAllViews();
  const view = document.getElementById('category-view');
  view.querySelector('.category-label').textContent = c.label || '';
  view.querySelector('.category-title').textContent = c.title || '';
  view.querySelector('.category-intro').innerHTML = c.intro || '';
  view.querySelector('.category-cards').innerHTML = c.cardsHTML || '';
  view.classList.add('active');
  document.getElementById('nav-label').textContent = c.label || '';
  updateURL(id);
  window.scrollTo(0,0);
}

function showArticle(id) {
  destroyCharts();
  destroyTOC();
  const a = ARTICLES[id];
  if (!a) return;
  document.getElementById('article-meta').textContent = a.meta;
  document.getElementById('article-title').textContent = a.title;
  const dekEl = document.getElementById('article-dek');
  dekEl.textContent = a.dek || '';
  dekEl.style.display = a.dek ? '' : 'none';
  document.getElementById('article-body').innerHTML = a.body;
  document.getElementById('nav-label').textContent = '';
  currentCategory = a.backTo || null;
  hideAllViews();
  document.getElementById('article-view').classList.add('active');
  updateURL(id);
  window.scrollTo(0,0);
  buildCharts(id);
  buildTOC(a);
}

/* Nav ← button: always go up one level based on the active view, so a visitor
   who deep-links into a category or article is never stranded without a way home.
   Article → its category (if any) else home; category → home. */
function navBack() {
  const onArticle = document.getElementById('article-view').classList.contains('active');
  if (onArticle && currentCategory && CATEGORIES[currentCategory]) showCategory(currentCategory);
  else showLanding();
}

/* ── DIRECT URL SUPPORT ── */
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && ARTICLES[hash]) showArticle(hash);
  else if (hash && CATEGORIES[hash]) showCategory(hash);
});

/* ── LANDING OVERVIEW RAIL ──
   The at-a-glance index beside the cards. Each link scrolls to its card and
   flashes it; a scrollspy keeps the matching link highlighted. On narrow
   screens the rail is a collapsible <details> that starts closed. */
window.addEventListener('DOMContentLoaded', () => {
  const rail = document.querySelector('.overview-rail');
  if (!rail) return;

  // Start collapsed on small screens, open on wide ones. On wide screens the
  // rail is always open (the summary isn't a toggle); on narrow screens the
  // summary button toggles it.
  const collapse = rail.querySelector('.overview-collapse');
  const summary = rail.querySelector('.overview-summary');
  const mq = window.matchMedia('(max-width: 900px)');
  const setOpen = (open) => {
    collapse.dataset.open = open ? 'true' : 'false';
    if (summary) summary.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  const syncOpen = () => setOpen(!mq.matches);
  syncOpen();
  mq.addEventListener('change', syncOpen);
  if (summary) {
    summary.addEventListener('click', () => {
      if (!mq.matches) return; // only a toggle on small screens
      setOpen(collapse.dataset.open !== 'true');
    });
  }

  const links = [...rail.querySelectorAll('a[data-overview-target]')];
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = document.getElementById(link.dataset.overviewTarget);
      if (!card) return;
      const navOffset = 52 + 20;
      const top = card.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      card.classList.remove('flash');
      void card.offsetWidth; // restart the animation if it was mid-flash
      card.classList.add('flash');
      card.addEventListener('animationend', () => card.classList.remove('flash'), { once: true });
    });
  });

  // Scrollspy: highlight the card whose top sits just above a line a little
  // below the nav. A plain scroll calc is more reliable than an observer here,
  // since the cards vary a lot in height.
  const cards = links
    .map(l => document.getElementById(l.dataset.overviewTarget))
    .filter(Boolean);
  const setActive = (id) => links.forEach(a =>
    a.classList.toggle('active', a.dataset.overviewTarget === id)
  );

  const marker = 52 + 120; // nav height + a comfortable reading offset
  let ticking = false;
  const updateSpy = () => {
    ticking = false;
    // Only the landing view uses this rail.
    if (!document.getElementById('landing').classList.contains('active')) return;
    let currentId = cards[0] && cards[0].id;
    for (const card of cards) {
      if (card.getBoundingClientRect().top - marker <= 0) currentId = card.id;
      else break;
    }
    // Snap to the last item once scrolled to the bottom.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      currentId = cards[cards.length - 1].id;
    }
    if (currentId) setActive(currentId);
  };
  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateSpy); }
  };
  if (cards.length) {
    setActive(cards[0].id);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateSpy();
  }
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
    lightboxImg.classList.toggle('wide', img.hasAttribute('data-lightbox-wide'));
    overlay.classList.add('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();
