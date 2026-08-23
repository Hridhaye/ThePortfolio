ARTICLES.hydro = {
  meta: 'Article · Energy Policy',
  title: "Canada's Clean Grid Has a Rainy-Day Problem",
  charts: (id) => {
    if (id !== 'hydro') return;
    const el = document.getElementById('hydroLineChart');
    if (el) charts.hydroLine = new Chart(el, makeLineConfig());
  },
  body: `
<div class="article-links">
  <button class="article-link-btn" onclick="showArticle('brief-short')">View Short Brief</button>
  <button class="article-link-btn" onclick="showArticle('brief-long')">View Analytical Paper</button>
</div>
  <p>Canada's electricity sector has a genuine success story to tell. Since 2005, greenhouse gas emissions from electricity generation have fallen by 58%, the single largest sectoral reduction anywhere in the Canadian economy.<sup>1</sup> In a normal year, more than 80% of the power flowing through Canadian homes and factories comes from non-emitting sources.<sup>2</sup> That is a real achievement, and one that shapes how Canada thinks about its broader path to net zero.</p>
  <p>But the phrase "a normal year" carries more weight than it might seem. As Canada pushes to electrify its economy (cars, heating, industry), the question of what happens in an abnormal year is becoming one of the most consequential in Canadian energy policy.</p>
  <p>Right now, the answer is largely: fossil fuels.</p>
  <div class="article-divider"></div>
  <p>Canada's electricity grid is built on hydropower. Hydro accounts for nearly 60% of national generation, and in provinces like British Columbia and Manitoba, that figure climbs above 90%.<sup>3</sup> This is the bedrock of Canada's clean electricity story. It is also, increasingly, a structural vulnerability.</p>
  <p>Hydro depends on precipitation. Reservoirs need rain and snowmelt to fill. When they don't, generation falls, and the grid has to find electricity somewhere else. In recent years, that somewhere else has largely been combustible fuels. In 2025, combustible fuel generation hit its highest level since Statistics Canada's current data series began in 2016. Hydro's share of total generation fell to a series low. Canada became a net electricity importer during multiple months of both 2024 and 2025, the first time this had occurred in the modern era.<sup>4</sup></p>
  <p>These trends may not be one-off anomalies. They may be the early expression of something more structural: a gap in how Canada's grid was designed to handle stress.</p>
  <p>The provincial picture makes this concrete. When a drought pushed BC Hydro into a generation deficit in 2024, the province covered roughly a quarter of its electricity demand through imports at a cost of approximately $1.38 billion, much of it drawn from Alberta's grid, which runs at nearly 75% natural gas.<sup>5</sup> Those emissions don't show up in British Columbia's official figures; provincial inventories only count what is generated within a province's borders, so the carbon embedded in the imports is effectively invisible in the accounting. Manitoba tells a related but different story: the province generates about 97% of its electricity from hydro, and rather than absorb that risk quietly, Manitoba Hydro has proposed a $3 billion natural gas facility at Brandon specifically to provide backup when water levels fall short.<sup>6</sup> Both cases point to the same underlying problem, just from different angles. One province is already reaching for high-carbon imports when hydro disappoints; the other is preparing to build the fossil infrastructure to avoid having to do the same.</p>
  ${lineChartHTML('hydroLineChart')}
  <div class="article-divider"></div>
  <p>The deeper issue is not that hydro is unreliable in any absolute sense. Over a long enough period, Canadian watersheds are productive and the generation record is strong. The issue is that the grid was designed around hydro abundance, which means it has very little to fall back on when that abundance runs short. Fossil fuels exist in the system precisely to fill gaps that cleaner sources cannot. And when hydro disappoints, that is exactly what they do.</p>
  <div class="article-pull">The cleanliness of Canadian electricity is, to a meaningful degree, a function of how much it has rained.</div>
  <p>This creates an awkward reality at the heart of Canada's clean electricity story: the grid's low-emissions record is partly contingent on the weather. In dry years, the system quietly becomes more carbon-intensive, not because of any policy failure or bad decision, but because the backup capacity that exists is largely fossil-based.</p>
  <p>That would be a manageable problem if the future looked like the recent past. It becomes harder to manage for two reasons.</p>
  <p>The first is that the recent past may itself be changing. The years 2023 and 2025 both featured significant drought conditions and some of the lowest hydro generation on record.<sup>4</sup> Whether this reflects a short-term pattern or a longer-term shift in precipitation driven by climate change remains genuinely uncertain. But a grid strategy that treats hydro abundance as a baseline assumption is taking on risk it may not fully account for.</p>
  <p>The second reason is electrification. Canada's federal government has committed to a net-zero electricity grid by 2050 and set binding emissions limits on generating units beginning in 2035.<sup>7</sup> Running alongside these targets is a sweeping push to move transportation, heating, and industry off fossil fuels, which requires substantially more electricity than Canada currently produces. The Canada Energy Regulator projects electricity demand will grow between 26% and 44% by 2050 relative to 2023 levels.<sup>8</sup></p>
  <p>More demand on the same grid means more exposure to the same vulnerability. As total grid load grows with electrification and outpaces the increase in hydro capacity, the grid becomes more sensitive to droughts, even those of the same intensity as today. As a result, it requires an earlier intervention from other sources, and as it stands today, these other sources consist largely of fossil fuels. The takeaway is not that electrification is the wrong strategy. It is that electrification might arrive before the system needed to support it sustainably.</p>
  <div class="article-divider"></div>
  <p>There is something worth sitting with in that picture. Canada is pursuing one of the most ambitious electricity transitions in its history, grounded in a genuine commitment to decarbonization. And yet the foundation that transition rests on has a known weak point: it performs well when the rain falls and less well when it doesn't. The federal government's clean electricity strategy is largely built around the assumption that hydro will continue to anchor the grid, supplemented over time by wind, solar, and eventually storage. That is a reasonable plan in its broad strokes. But it does not yet fully grapple with what happens in the years before that supplementary capacity is built, when demand has risen and the grid still relies on fossil fuels to fill whatever gap hydro leaves behind.</p>
  <p>This is not an argument against electrification or against hydro. It is an argument for being honest about what the grid actually does when conditions turn difficult, and for building the clean alternatives that make the answer to that question something other than fossil fuels. The gap is real, it is measurable, and it is likely to widen before it narrows. Acknowledging it clearly is the first step toward closing it.</p>
  <p>Canada's electricity sector has achieved something genuinely worth building on. The question now is whether the planning behind the net-zero transition is honest about the conditions under which that achievement holds, and the conditions under which it doesn't.</p>
  <div class="footnotes">
    <p class="footnotes-label">Further Reading</p>
    <p><sup>1</sup> Environment and Climate Change Canada, National Inventory Report 1990–2023 (2025).</p>
    <p><sup>2</sup> Natural Resources Canada, Powering Canada's Future: A Clean Electricity Strategy.</p>
    <p><sup>3</sup> Statistics Canada, Table 25-10-0015-01; Canada Energy Regulator, Renewable Energy in Canada – British Columbia and Manitoba.</p>
    <p><sup>4</sup> Statistics Canada, Electricity Year in Review 2025; Statistics Canada, Electricity Supply and Disposition, 2023 (released October 22, 2024).</p>
    <p><sup>5</sup> BC Hydro, 2024/25 First Quarter Report; Canada Energy Regulator, Provincial and Territorial Energy Profiles – Alberta.</p>
    <p><sup>6</sup> CBC News, November 21, 2025; Manitoba Hydro, Brandon Dispatchable Capacity Project.</p>
    <p><sup>7</sup> Government of Canada, Clean Electricity Regulations (SOR/2024-263), finalized December 2024.</p>
    <p><sup>8</sup> Canada Energy Regulator, Canada's Energy Future 2026: Executive Summary.</p>
  </div>
`
};
