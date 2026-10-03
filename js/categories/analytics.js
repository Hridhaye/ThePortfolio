CATEGORIES['analytics'] = {
  label: 'Analytics',
  title: 'Data & Analytics',
  intro: 'Business-intelligence and data-analysis projects — turning raw datasets into decisions. Each project includes the underlying file so you can open the real work.',
  cardsHTML: `
    <article class="card" onclick="showArticle('crm-pipeline')">
      <div>
        <p class="card-meta">Business Intelligence &nbsp;·&nbsp; Excel</p>
        <h2>CRM Sales Pipeline Analysis</h2>
        <p class="card-desc">An Excel data-analysis and BI project built on ~8,800 B2B sales opportunities. Engineered columns, PivotTables, an agent-segmentation scatter and a KPI dashboard answer one question — what actually drives revenue? — and land a concrete coaching recommendation. Includes the downloadable workbook.</p>
      </div>
      <div class="card-right">
        <button class="read-btn">Read <svg viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </article>

    <article class="card" onclick="showArticle('ecommerce-funnel')">
      <div>
        <p class="card-meta">Business Intelligence &nbsp;·&nbsp; SQL &amp; Power BI</p>
        <h2>E-Commerce Funnel &amp; Conversion Analysis</h2>
        <p class="card-desc">A SQL and Power BI project on a ~2M-row e-commerce dataset. SQL validates the data and locates the conversion leak at the checkout stage; a two-page Power BI dashboard breaks the funnel down by traffic source and shows an A/B test that lifts the weak segments most. Includes the GitHub repo and dashboard PDF.</p>
      </div>
      <div class="card-right">
        <button class="read-btn">Read <svg viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </article>
  `
};
