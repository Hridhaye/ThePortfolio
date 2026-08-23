ARTICLES['brief-short'] = {
  meta: 'Policy Brief · Energy & Climate',
  title: "The Hydro-Emissions Tension: Addressing Structural Vulnerabilities in Canada's Net-Zero Transition — Short Brief",
  charts: (id) => {
    if (id !== 'brief-short') return;
    const el1 = document.getElementById('shortLineChart');
    if (el1) charts.shortLine = new Chart(el1, makeLineConfig());
    const el2 = document.getElementById('shortProjChart');
    if (el2) charts.shortProj = new Chart(el2, JSON.parse(JSON.stringify(projConfig)));
  },
  body: `
<div class="article-links">
  <button class="article-link-btn" onclick="showArticle('brief-long')">View Analytical Paper</button>
  <button class="article-link-btn" onclick="showArticle('hydro')">View Op-ed</button>
</div>

  <h2>Executive Summary</h2>
  <p>Canada's electricity system is among the cleanest in the world, largely because of its heavy reliance on hydroelectricity.<sup>1</sup> But recent droughts have revealed a structural vulnerability: when hydro output falls, provinces often turn to increased fossil fuel generation or high-emitting imports to fill the gap.<sup>2,3</sup> This pattern is already visible in British Columbia and Manitoba, and it risks becoming more pronounced as electrification drives electricity demand higher.<sup>4</sup></p>
  <p>This brief argues that to effectively secure Canada's net-zero electricity transition, governments and utilities must do three things: expand clean dispatchable backup capacity, strengthen interprovincial transmission, and revise planning assumptions to reflect hydro's constraints and exposure to variability. Without these changes, shortfalls in hydro generation may continue to push emissions higher during periods of supply stress.<sup>3,5</sup> As the net-zero transition continues, accounting for variations in hydro generation while also diversifying beyond hydro can make the grid more reliable in delivering clean energy even when under pressure.</p>
  ${lineChartHTML('shortLineChart')}

  <h2>Policy Recommendations</h2>
  <p>Federal and provincial decision-makers should align electricity planning with hydro variability by:</p>
  <div class="rec-box"><strong>Expanding non-emitting backup capacity</strong><p>Including storage, geothermal, and other firm low-carbon resources that can cover multi-month drought periods that wind and solar alone cannot reliably bridge.<sup>6</sup></p></div>
  <div class="rec-box"><strong>Building stronger interprovincial transmission links</strong><p>So clean electricity can move across regions when local hydro basins are stressed, reducing dependence on high-emitting imports.<sup>7</sup></p></div>
  <div class="rec-box"><strong>Updating planning and regulatory assumptions</strong><p>To require utilities to prepare for drought years without defaulting to fossil fuels, following the logic already embedded in the Clean Electricity Regulations' drought-year credit provisions.<sup>8</sup></p></div>

  <h2>Problem Statement</h2>
  <p>Canada has made real progress decarbonizing its electricity sector. Since 2005, greenhouse gas emissions from electricity generation have fallen sharply, and the grid now runs over 80% non-emitting in a normal year.<sup>9,10</sup> Much of that comes from hydroelectricity, which supplies nearly 60% of national electricity — and in provinces like British Columbia and Manitoba, 90% or more.<sup>1,11</sup></p>
  <p>The problem is that hydro is not immune to climate stress. In recent years, below-normal precipitation and drought have reduced hydro output across Canada. In 2025, combustible fuel generation reached its highest level since 2016, while hydro's share of total generation fell to a series low, which together highlight growing system stress. Canada also became a net electricity importer during multiple months in 2024 and 2025, which is the first time this had happened in the current era.<sup>2,3</sup> These trends may not be one-off anomalies because the grid is built around hydro abundance and has limited clean options when that abundance runs short.</p>
  <p>The core problem is not hydro itself. It is that Canada has not developed enough clean backup capacity to replace hydro when it underperforms. When that gap opens, fossil fuels and imports become the default.</p>

  <h2>The Structural Risk</h2>
  <p>The scale of the vulnerability is measurable. Canada's hydroelectric generation peaked at 392 TWh in 2017 and fell to 341.8 TWh in 2024. A 10% decline from that level would create a shortfall of roughly 34.2 TWh, which is about one-quarter of 2025 combustible-fuels generation. Even moderate droughts can create supply shortages large enough to require substantial fossil replacement.<sup>3</sup></p>
  <p>British Columbia illustrates the problem clearly. During low-water conditions, BC Hydro covered close to a quarter of provincial electricity demand through imports, at a cost of about $1.38 billion.<sup>12</sup> Much of that imported electricity came from Alberta and the United States, where generation is substantially more carbon-intensive than in Canada's hydro-heavy provinces.<sup>13</sup> Because emissions inventories count only in-province generation, the emissions associated with those imports are not fully visible in provincial totals.</p>
  <p>Manitoba shows how this problem can become locked into future planning. The province relies on hydro for about 97% of its generation, leaving little domestic clean backup when precipitation is low.<sup>14</sup> Manitoba Hydro has proposed a $3 billion combustion turbine facility at Brandon to provide dispatchable backup, with natural gas as the lowest-cost fuel option under consideration.<sup>15,16</sup> Since hydro shortfalls are a recurring risk, dependence on fossil fuels to compensate for them risks turning what should be an emergency measure into a structural feature of the grid.</p>

  <h2>Why Electrification Makes the Problem More Urgent</h2>
  <p>Canada's electrification push is the right long-term direction. The Clean Electricity Regulations, finalized in December 2024, set emission limits on generating units beginning in 2035, with a net-zero grid target of 2050.<sup>17</sup> The Canada Energy Regulator projects electricity demand growth of 26% to 44% by 2050, and BC Hydro expects significant provincial demand increases by 2030 driven by electric vehicles, heating electrification, and population growth.<sup>4,18</sup></p>
  <p>The concern is not the direction — it's the timing and the gap. Rising demand increases the cost of hydro shortfalls. As total grid load grows with electrification and outpaces the increase in hydro capacity, the grid becomes more sensitive to droughts, even those of the same intensity as today. As a result, it requires an earlier intervention from other sources, and as it stands today, these other sources consist largely of fossil fuels. The takeaway is not that electrification is the wrong strategy. It is that electrification might arrive before the system needed to support it sustainably.</p>
  ${projChartHTML('shortProjChart')}

  <h2>Conclusion</h2>
  <p>Canada's grid is cleaner than most, but its low-emissions record depends heavily on hydro availability. When hydro underperforms, the system often falls back on fossil generation and imports. British Columbia and Manitoba illustrate that this isn't a temporary anomaly; rather, it's a structural design problem, one that electrification will make more consequential as overall electricity demand grows.</p>
  <p>The answer is not to slow electrification. It is to build the grid capable of supporting it under stress. That means clean backup capacity that doesn't depend on rain, transmission infrastructure that lets clean electricity move to where it's needed, and planning rules that stop treating hydro as a guaranteed resource. Without such changes, Canada's electricity system risks remaining clean in good years and more fossil-dependent when conditions turn difficult.</p>

  <div class="footnotes">
    <p class="footnotes-label">Sources</p>
    <p><sup>1</sup> Statistics Canada. Electric Power Generation, Monthly Generation by Type of Electricity, Table 25-10-0015-01. statcan.gc.ca</p>
    <p><sup>2</sup> Statistics Canada. Electricity Generation from Combustibles and Renewables Sharply Increase Amid Another Dry Year: Electricity Year in Review 2025. statcan.gc.ca/o1/en/plus/9117</p>
    <p><sup>3</sup> Statistics Canada. Table 25-10-0015-01 / Electricity Year in Review 2025. Hydro: 392.2 TWh (2017 peak), 341.8 TWh (2024); combustibles: 137.8 TWh (2022), 143.4 TWh (2025 series high). The 34.2 TWh shortfall figure is derived from the 2024 hydro total using a 10% decline assumption consistent with the 9.3% national decline recorded by Statistics Canada in 2023.</p>
    <p><sup>4</sup> Canada Energy Regulator. Canada's Energy Future 2026: Executive Summary. cer-rec.gc.ca. Electricity demand projected to grow 26% (Lower scenario) to 44% (Current Measures) from 2023 to 2050.</p>
    <p><sup>5</sup> Statistics Canada. Electricity Supply and Disposition, 2023, released October 22, 2024. National hydro generation fell 9.3% year-over-year. statcan.gc.ca</p>
    <p><sup>6</sup> Canada Energy Regulator. Market Snapshot: Geothermal Power is Stable and Low Carbon, but What is its Potential in Canada? cer-rec.gc.ca; RBC Climate Action Institute / Canadian Geothermal Energy Association. Geothermal Energy Surges: Canada's Potential in a Promising Baseload Power Source (2026). rbc.com</p>
    <p><sup>7</sup> Canadian Climate Institute. Connecting Regional Electricity Grids in Canada (2025). climateinstitute.ca</p>
    <p><sup>8</sup> Government of Canada. Clean Electricity Regulations: Maintaining Reliability. canada.ca/en/services/environment/weather/climatechange/climate-plan/clean-electricity/regulations-reliability.html</p>
    <p><sup>9</sup> Environment and Climate Change Canada. National Inventory Report 1990–2023: Greenhouse Gas Sources and Sinks in Canada (2025). canada.ca/en/environment-climate-change/services/environmental-indicators/greenhouse-gas-emissions.html</p>
    <p><sup>10</sup> Natural Resources Canada. Powering Canada's Future: A Clean Electricity Strategy. natural-resources.canada.ca/energy-sources/powering-canada-s-future-clean-electricity-strategy</p>
    <p><sup>11</sup> Canada Energy Regulator. Renewable Energy in Canada – British Columbia; Renewable Energy in Canada – Manitoba. cer-rec.gc.ca</p>
    <p><sup>12</sup> BC Hydro. 2024/25 First Quarter Report. bchydro.com; Global News, November 29, 2024. BC Hydro imported approximately 13,600 GWh in fiscal year 2024, about 25% of total provincial power, at a cost of nearly $1.4 billion per BC Utilities Commission documents.</p>
    <p><sup>13</sup> Energy Futures Institute / BC Utilities Commission documents filed by BC Hydro, reported by Business in Vancouver, December 2, 2024; Global News, November 29, 2024; Canada Energy Regulator, Provincial and Territorial Energy Profiles – Alberta. cer-rec.gc.ca. Alberta carbon intensity: 470 g CO₂e/kWh vs. 100 g national average; Alberta gas share approximately 74.7% in 2024.</p>
    <p><sup>14</sup> Canada Energy Regulator. Renewable Energy in Canada – Manitoba. cer-rec.gc.ca. Hydro: 96.9% of generation in 2023.</p>
    <p><sup>15</sup> CBC News, November 21, 2025; CBC News, February 27, 2025.</p>
    <p><sup>16</sup> Manitoba Hydro. Brandon Dispatchable Capacity Project. hydro.mb.ca/community/engagement/brandon-dispatchable-capacity</p>
    <p><sup>17</sup> Government of Canada. Clean Electricity Regulations (SOR/2024-263), finalized December 2024. Emission limits on generating units apply from 2035; net-zero grid target is 2050. canada.ca/en/environment-climate-change/corporate/transparency/strategic-environmental-economic-assessments/clean-electricity-regulations</p>
    <p><sup>18</sup> Energy Futures Institute / BC Utilities Commission documents filed by BC Hydro, reported by Business in Vancouver, December 2, 2024.</p>
    <p><sup>19</sup> Canada Energy Regulator. Canada's Energy Future 2023, Current Measures scenario. cer-rec.gc.ca; Statistics Canada, Table 25-10-0015-01.</p>
    <p><sup>20</sup> Canadian Climate Institute. How Canada Can Build Electricity Transmission to Unlock Nation-Building Projects (2025). climateinstitute.ca</p>
    <p><sup>21</sup> RBC Climate Action Institute / Canadian Geothermal Energy Association. Geothermal Energy Surges: Canada's Potential in a Promising Baseload Power Source (2026). rbc.com</p>
  </div>
`
};
