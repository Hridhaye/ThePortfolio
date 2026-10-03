ARTICLES['crm-pipeline'] = {
  meta: 'Business Intelligence · Excel',
  title: 'CRM Sales Pipeline Analysis',
  dek: 'What actually drives revenue: win rate, speed, deal size, or volume? An Excel BI project built on ~8,800 B2B sales opportunities.',
  backTo: 'analytics',
  toc: [
    { id: 'the-setup', label: 'The Setup' },
    { id: 'what-the-data-says', label: 'What the Data Says' },
    { id: 'f-drivers', label: 'Volume & Deal Size', sub: true },
    { id: 'f-region', label: 'East Does More With Less', sub: true },
    { id: 'f-product', label: 'A Few Products Carry It', sub: true },
    { id: 'f-sector', label: 'Sector Is a Red Herring', sub: true },
    { id: 'the-recommendation', label: 'The Recommendation' },
    { id: 'the-workbook', label: 'Explore the Workbook' }
  ],
  body: `
<div class="article-links">
  <button class="article-link-btn" onclick="showCategory('analytics')">← Analytics Projects</button>
  <a class="article-link-btn" href="files/CRM_Sales_Pipeline_Analysis.xlsx" download>Download the Workbook (.xlsx)</a>
</div>

<p>Most sales teams track numerous metrics, but it's often difficult to determine which ones actually move revenue. This project uses Excel to dig into a CRM dataset of roughly 8,800 B2B sales opportunities and answer one narrow question: what explains the revenue gaps between different sales reps and different regions? Is it win rate, volume, speed through the pipeline, or the size of each deal?</p>

<!-- KPI STRIP — headline numbers from the workbook's Executive Summary -->
<div class="kpi-strip">
  <div class="kpi"><span class="kpi-value">$10.0M</span><span class="kpi-label">Revenue (Won)</span></div>
  <div class="kpi"><span class="kpi-value">4,238</span><span class="kpi-label">Deals Won</span></div>
  <div class="kpi"><span class="kpi-value">63%</span><span class="kpi-label">Win Rate</span></div>
  <div class="kpi"><span class="kpi-value">$2,361</span><span class="kpi-label">Avg Deal Size</span></div>
  <div class="kpi"><span class="kpi-value">48</span><span class="kpi-label">Avg Cycle (days)</span></div>
</div>

<h2 id="the-setup">The Setup</h2>
<p>The data used in this project was imported from a public synthetic CRM dataset<sup>1</sup>. The raw pipeline only carried source fields. After cleaning the data (e.g., fixing date formats, standardizing text), I added further columns and calculations required by my analysis: a cycle time between engage and close dates, a clean win flag for win-rate math, a high-value flag (a won deal counts as high-value if it lands at or above the 60th percentile of all won deals, roughly $3,203, computed from the data rather than hard-coded), and each deal's region and customer sector pulled across from reference tables using VLOOKUP to make pivot table creation easier. After that, I made PivotTables for the agent, region, and sector cuts, a scatter plot to segment the sales force, and a KPI dashboard to deliver a story suitable for a range of stakeholders. A data dictionary documents every field and flags it as source or derived.</p>

<div class="article-media">
  <img src="images/crm/CRM_Sales_Pipeline_Sheet.png" alt="The sales_pipeline sheet in Excel, showing source fields alongside the engineered columns: Cycle, Deal Won, High-Value Flag, Regional Office, and Sector." style="max-width:520px;" data-lightbox-wide>
  <p class="article-media-caption">The pipeline sheet with added columns (click to expand). Note that blank accounts were a recurring pattern only with engaging deals, not won or lost deals, and hence were filtered when needed rather than eliminated.</p>
</div>

<div class="article-divider"></div>

<h2 id="what-the-data-says">What the Data Says</h2>
<p>Four findings came out of the analysis, and they reinforce each other.</p>

<h3 id="f-drivers">1 · It's a volume and deal-size game, not win rate or speed</h3>
<p>Win rate is mostly flat, sitting around 63% across almost every agent, region, and sector. Cycle time barely moves with revenue either, as fast and slow closers are scattered all through the earnings table. The two things that actually vary between strong and weak performers are how many deals they close and how big those deals are. The top of the leaderboard isn't winning a higher share of its deals or closing them faster. It's optimizing for more deals, and many of them are of bigger sizes.</p>

<div class="article-media">
  <img src="images/crm/CRM_Scatter_Chart.png" alt="Scatter plot of sales agents by deal count (x-axis) against average deal size (y-axis), with median lines dividing the agents into Stars, Hunters, Closers, and Developing quadrants." style="max-width:520px;">
  <p class="article-media-caption">Agents plotted by volume (x) against average deal size (y). Median lines split the force into four quadrants.</p>
</div>

<p>The segmentation tab makes this concrete. Plotting every rep by deal count against average deal size, then splitting on the median of each (278 deals, $1,615 average), sorts the force into four quadrants: <strong>Stars</strong> (high volume and high value), <strong>Hunters</strong> (volume), <strong>Closers</strong> (deal size), and <strong>Developing</strong>. The top earner, Darcel Schlecht, is the clearest Star: 747 deals at a $2,085 average, for $1.15M in won revenue, roughly 2.4 times the next rep. Majority of top earners are strong on one of the two axes.</p>

<h3 id="f-region">2 · The East region does more with less</h3>
<p>Regionally, the story emphasizes efficiency rather than size alone. East closes the fewest deals of the three regions (1,171 won, versus Central's 1,629) yet nearly matches Central on revenue. It gets there on the highest average deal size ($2,639) and the highest share of high-value deals: 47%, against Central's 36% and West's 39%. West also closes fewer deals than Central, yet it is the highest-earning region. This shows a quality-over-quantity trend already working inside the business, making it a model worth studying.</p>

<div class="article-media">
  <img src="images/crm/CRM_Region_Table.png" alt="Region performance table comparing Central, East, and West on won revenue, deals won, and high-value deal share." style="max-width:520px;">
  <p class="article-media-caption">Region performance: revenue, deals won, and high-value share by regional office.</p>
</div>

<h3 id="f-product">3 · A few premium products carry the P&L</h3>
<p>Revenue is heavily concentrated by product, and low deal counts are clearly not indicative of revenue potential. Three premium SKUs (GTX Pro at $3.51M, GTX Plus Pro at $2.63M, and MG Advanced at $2.22M) generate the bulk of revenue, while cheap SKUs like MG Special and GTX Basic rack up large deal counts but little revenue in comparison. MG Special, for example, is over 1,600 opportunities and only ~$43k in dollars. The niche standout is GTK 500: just 15 won deals at a ~$26,700 average, sold almost entirely in the West. A product can matter enormously to revenue while being nearly invisible in the activity logs.</p>

<h3 id="f-sector">4 · Customer industry is a red herring</h3>
<p>As of now, variations across industries are modest at best. Average deal value sits in a tight band (about $2,259 to $2,650) across all ten customer sectors, and the high-value share stays in a narrow 38 to 42% range everywhere. What revenue differences exist between sectors come primarily from deal volume, not deal size. Based on this dataset, chasing "richer" industries is not a reasonable lever at the moment.</p>

<div class="article-divider"></div>

<h2 id="the-recommendation">The Recommendation</h2>
<p>All of this points to a shift in how performance gets managed. While win rate and speed are largely uniform, <strong>average deal size and deal count still vary a lot</strong>, and most high performers are strong on one or both. Steer reps toward premium SKUs and high-value opportunities, and treat the East region and agent Darcel Schlecht as internal models worth replicating.</p>

<h2 id="the-workbook">Explore the Workbook</h2>
<p>The full workbook is below. It start with an Overview and Executive Summary, after which it proceeds to the pivot tables. The data sheets and dictionary sit at the end.</p>
<div class="article-links" style="margin-top:1.2rem;">
  <a class="article-link-btn" href="files/CRM_Sales_Pipeline_Analysis.xlsx" download>Download the Workbook (.xlsx)</a>
  <a class="article-link-btn" href="https://www.kaggle.com/datasets/innocentmfa/crm-sales-opportunities" target="_blank" rel="noopener">View the Source Dataset</a>
</div>

<div class="footnotes">
  <p class="footnotes-label">Notes & Source</p>
  <p><sup>1</sup> CRM Sales Opportunities, Kaggle (innocentmfa). Imported from the supplied CSV files. All figures above are computed in the workbook from the Won-deal subset unless noted; totals reflect the dataset as analysed and are not real company results.</p>
</div>
`
};
