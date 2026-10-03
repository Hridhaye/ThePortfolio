ARTICLES['ecommerce-funnel'] = {
  meta: 'Business Intelligence · SQL & Power BI',
  title: 'E-Commerce Funnel & Conversion Analysis',
  dek: 'Where does an online store lose its customers, and can it be fixed? A SQL and Power BI project on a ~2M-row e-commerce dataset.',
  backTo: 'analytics',
  toc: [
    { id: 'the-setup', label: 'The Setup' },
    { id: 'what-the-data-says', label: 'What the Data Says' },
    { id: 'f-funnel', label: 'The Actionable Loss', sub: true },
    { id: 'f-channels', label: 'Same Traffic, Different Outcomes', sub: true },
    { id: 'f-abtest', label: 'The A/B Test', sub: true },
    { id: 'the-recommendation', label: 'The Recommendation' },
    { id: 'the-project', label: 'Explore the Project' }
  ],
  body: `
<div class="article-links">
  <button class="article-link-btn" onclick="showCategory('analytics')">← Analytics Projects</button>
  <a class="article-link-btn" href="https://github.com/Hridhaye/e-commerce-analytics" target="_blank" rel="noopener">View on GitHub</a>
</div>

<p>Every online store loses most of its visitors between the first page view and the checkout. The question is not whether this happens, but where it happens, and whether the cause is the traffic or the site itself. This project uses SQL to validate and explore a ~2M-row e-commerce dataset, then Power BI to model the data and build a two-page report that locates the loss and tests a fix.</p>

<!-- KPI STRIP — headline numbers from the dashboard's Performance Overview -->
<div class="kpi-strip kpi-4">
  <div class="kpi"><span class="kpi-value">$8.4M</span><span class="kpi-label">Net Revenue</span></div>
  <div class="kpi"><span class="kpi-value">100K</span><span class="kpi-label">Customers</span></div>
  <div class="kpi"><span class="kpi-value">9.9%</span><span class="kpi-label">Overall Conversion</span></div>
  <div class="kpi"><span class="kpi-value">63.7%</span><span class="kpi-label">Cart Abandonment</span></div>
</div>

<h2 id="the-setup">The Setup</h2>
<p>The data is a public synthetic dataset<sup>1</sup> of customers, campaigns, products, transactions, and a ~2M-row events log, loaded into MySQL. The work followed a clear division of labour. Validation and early exploration were done in SQL, and modelling, further exploration, and presentation were done in Power BI.</p>
<p>The first SQL script was a validation pass covering row counts, duplicate keys, range and business-rule checks, and referential integrity across the tables. The dataset proved clean, so this stage largely confirmed its quality rather than correcting it. The clearest example is the referential-integrity check, which looks for event rows pointing to a campaign that does not exist, while excluding the <code>campaign_id = 0</code> sentinel that marks non-campaign traffic.</p>

<div class="code-block">
  <p class="code-block-label">SQL · referential integrity (expect 0 orphans)</p>
  <pre><span class="sql-com">-- Any event tied to a campaign that doesn't exist? (0 = clean)</span>
<span class="sql-com">-- campaign_id = 0 is the "no campaign" sentinel, not a key, so it's excluded.</span>
<span class="sql-kw">SELECT</span> <span class="sql-kw">COUNT</span>(*) <span class="sql-kw">AS</span> orphan_events
<span class="sql-kw">FROM</span> events e
<span class="sql-kw">LEFT JOIN</span> campaigns c <span class="sql-kw">ON</span> e.campaign_id = c.campaign_id
<span class="sql-kw">WHERE</span> e.campaign_id &lt;&gt; 0
  <span class="sql-kw">AND</span> c.campaign_id <span class="sql-kw">IS NULL</span>;</pre>
  <p class="code-block-caption">The LEFT JOIN keeps unmatched events; a non-null filter on the right side then surfaces any that have no parent campaign.</p>
</div>

<p>The remaining SQL scripts were exploratory. The most important built the conversion funnel and broke each step down by traffic source, which is what pointed to the core story. That query holds the top two funnel steps up against the final one, so that a weakness in traffic quality and a weakness in checkout would show up in different columns.</p>

<div class="code-block">
  <p class="code-block-label">SQL · funnel step-rates by traffic source</p>
  <pre><span class="sql-com">-- If the gap is "bad traffic" it shows at the top (view→click,</span>
<span class="sql-com">-- click→cart); if it's a checkout problem it shows at cart→purchase.</span>
<span class="sql-kw">SELECT</span>
    traffic_source,
    <span class="sql-kw">ROUND</span>(100 * <span class="sql-kw">SUM</span>(event_type = 'click')       / <span class="sql-kw">SUM</span>(event_type = 'view'),  1) <span class="sql-kw">AS</span> view_to_click_pct,
    <span class="sql-kw">ROUND</span>(100 * <span class="sql-kw">SUM</span>(event_type = 'add_to_cart') / <span class="sql-kw">SUM</span>(event_type = 'click'), 1) <span class="sql-kw">AS</span> click_to_cart_pct,
    <span class="sql-kw">ROUND</span>(100 * <span class="sql-kw">SUM</span>(event_type = 'purchase')    / <span class="sql-kw">SUM</span>(event_type = 'add_to_cart'), 1) <span class="sql-kw">AS</span> cart_to_purchase_pct
<span class="sql-kw">FROM</span> events
<span class="sql-kw">GROUP BY</span> traffic_source
<span class="sql-kw">ORDER BY</span> cart_to_purchase_pct <span class="sql-kw">DESC</span>;</pre>
  <p class="code-block-caption">Steady top-of-funnel rates with a varying final step would point to checkout, not traffic quality.</p>
</div>

<p>The data then moved into Power BI. Minor cleaning that is better handled closer to the report, chiefly standardizing text values, was done in Power Query. The tables were arranged into a star schema, and a dedicated date table was built and related to the event date in the events table, the transaction date in the transactions table, and the campaign end date in the campaigns table, so that any table could be analysed on a common timeline. Funnel rates, revenue, and the A/B metrics were then written as DAX measures.</p>
<p>Before settling on the final visuals, I used quick charts in Power BI to continue exploring. This is where the funnel story firmed up, and where several candidate angles were ruled out as dead ends, including time trends (performance is flat across 2021–2023) and product-category differences. The report was then organized into two pages. The first, Performance Overview, is a focused summary of overall performance. The second, Funnel Conversion, drills into the traffic-source problem the first page surfaces.</p>

<div class="article-divider"></div>

<h2 id="what-the-data-says">What the Data Says</h2>

<div class="article-media">
  <img src="images/ecommerce/01-performance-overview.png" alt="Power BI Performance Overview dashboard: KPI cards for revenue, customers, purchases and conversion, an engagement funnel, and revenue breakdowns by product category and loyalty tier." style="max-width:640px;" data-lightbox-wide>
  <p class="article-media-caption">Page 1, Performance Overview (click to expand). The engagement funnel falls from 1.04M views to 0.10M purchases, a 9.9% overall conversion.</p>
</div>

<div class="article-media">
  <img src="images/ecommerce/02-funnel-conversion.png" alt="Power BI Funnel Conversion dashboard: a table of step-rates by traffic source, traffic-share versus purchase-share bars, and the A/B test results by group." style="max-width:640px;" data-lightbox-wide>
  <p class="article-media-caption">Page 2, Funnel Conversion (click to expand). The step-rate table isolates cart→purchase as the stage that varies by channel; the A/B panels show Variant B lifting it.</p>
</div>

<p>Three findings build on each other. The loss has a specific location, that location behaves very differently by channel, and a site-wide test shows it can be reduced.</p>

<h3 id="f-funnel">1 · The actionable loss is at checkout</h3>
<p>There is an expected drop from view to click, where most people who see a product simply do not click, and that rate is near-identical across every traffic source, so there is little to act on there. The step that matters is cart to purchase. Click-to-cart holds steady at around 75% across all sources, but the final step swings widely, which means the entire spread between a strong channel and a weak one opens up at checkout. The issue there is not low-quality traffic failing to engage, but engaged shoppers who reach the cart and then abandon it.</p>

<h3 id="f-channels">2 · The same funnel, very different endings</h3>
<p>Measured at that final step, the channels divide into two groups. Email (65.1%) and Paid Search (61.7%) convert carts to purchases at four to five times the rate of Direct (14.3%) and Organic (14.2%), with Social in between. Because the earlier steps are identical, this is a checkout-conversion gap rather than a traffic-quality one. It also carries a real cost. Organic brings the most traffic (41.3% of views) but produces only 16.2% of purchases, so the weakest-converting channel is also the one leaving the most revenue on the table.</p>

<h3 id="f-abtest">3 · An A/B test shows the loss can be reduced</h3>
<p>The dataset includes a site-wide randomized experiment, so a fix can be measured rather than assumed. Variant B raises overall cart-to-purchase conversion to 44.8%, against the Control's 33.3%, and it helps the weakest segments most, nearly doubling the rate for Organic and Direct (Direct rises from 11.4% to 21.8%). A change that improves precisely the stage identified as the loss, and improves it most where the loss was largest, is strong evidence that the problem is addressable.</p>

<div class="article-divider"></div>

<h2 id="the-recommendation">The Recommendation</h2>
<p>The largest available lever is the checkout, not additional traffic. The top of the funnel already performs consistently across channels; revenue is lost at cart to purchase, and most heavily on the highest-volume channels. The recommendation is therefore to <strong>roll out the Variant B checkout experience site-wide and prioritize the low-converting, high-traffic segments, Organic and Direct, where the test produced the largest gains.</strong> Acquiring more Organic traffic, by contrast, mainly feeds a stage that currently converts at roughly 14%.</p>

<h2 id="the-project">Explore the Project</h2>
<p>The full project is on GitHub, including the ordered SQL scripts, the Power BI project file (<code>.pbip</code>, which opens in Power BI Desktop), and the report. The two-page report is also available as a PDF below.</p>
<div class="article-links" style="margin-top:1.2rem;">
  <a class="article-link-btn" href="https://github.com/Hridhaye/e-commerce-analytics" target="_blank" rel="noopener">View on GitHub</a>
  <a class="article-link-btn" href="files/ECommerce_Analytics_Dashboard.pdf" target="_blank" rel="noopener">Open the Dashboard (PDF)</a>
</div>

<div class="footnotes">
  <p class="footnotes-label">Notes & Source</p>
  <p><sup>1</sup> Marketing & E-Commerce Analytics Dataset, Kaggle (geethasagarbonthu). Synthetic data loaded and cleaned in MySQL; Power BI connects to the database. All figures above are computed from the dataset and are not real company results.</p>
</div>
`
};
