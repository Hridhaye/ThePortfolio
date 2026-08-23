/* Shared Chart.js configs and helpers, reused across articles. */
const CHART_FONT = { family: 'Arial', size: 11 };
const GRID_COLOR = '#d0d0d0';
const TICK_COLOR = '#444';

const years = [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];
const hydroData = [381.5,392.2,383.5,371.0,363.2,356.4,358.1,343.8,341.8,347.0];
const fuelData  = [137.1,131.4,130.8,126.0,117.2,128.5,137.8,140.2,141.0,143.4];

function makeLineConfig() {
  return {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Hydroelectricity',
          data: hydroData,
          borderColor: '#4472C4', backgroundColor: '#4472C4',
          pointBackgroundColor: '#ffffff', pointBorderColor: '#4472C4',
          pointBorderWidth: 1.5, pointRadius: 3, pointHoverRadius: 3,
          borderWidth: 1.5, tension: 0
        },
        {
          label: 'Combustible Fuels',
          data: fuelData,
          borderColor: '#ED7D31', backgroundColor: '#ED7D31',
          pointBackgroundColor: '#ffffff', pointBorderColor: '#ED7D31',
          pointBorderWidth: 1.5, pointRadius: 4, pointHoverRadius: 5,
          borderWidth: 1.5, tension: 0
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true, position: 'bottom',
          labels: { font: CHART_FONT, color: TICK_COLOR, boxWidth: 16, boxHeight: 2, padding: 14, usePointStyle: false }
        },
        tooltip: { callbacks: { label: c => ` ${c.dataset.label}: ${c.parsed.y} TWh` } }
      },
      scales: {
        x: {
          grid: { color: GRID_COLOR, lineWidth: 0.5 }, border: { color: GRID_COLOR },
          ticks: { font: CHART_FONT, color: TICK_COLOR, maxRotation: 0 }
        },
        y: {
          min: 0, max: 500,
          grid: { color: GRID_COLOR, lineWidth: 0.5 }, border: { color: GRID_COLOR },
          ticks: { stepSize: 100, font: CHART_FONT, color: TICK_COLOR }
        }
      }
    }
  };
}

const projLabels = ['Normal\n2025','Drought\n2025','Normal\n2030','Drought\n2030','Normal\n2035','Drought\n2035'];
const hNorm = [347, 312.3, 380, 342.0, 410, 369.0];
const hShort= [0,   34.7,  0,   38.0,  0,   41.0 ];
const hRem  = [263, 263,   305, 305,   345, 345   ];

const projConfig = {
  type: 'bar',
  data: {
    labels: projLabels,
    datasets: [
      { label:'Hydro',           data: hNorm,  backgroundColor:'#4472C4', stack:'s' },
      { label:'Hydro Shortfall', data: hShort, backgroundColor:'#70AD47', stack:'s' },
      { label:'Remaining Load',  data: hRem,   backgroundColor:'#ED7D31', stack:'s' }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: { font: CHART_FONT, color: TICK_COLOR, boxWidth: 14, boxHeight: 10, padding: 14 }
      },
      tooltip: { callbacks: { label: c => ` ${c.dataset.label}: ${c.parsed.y} TWh` } }
    },
    scales: {
      x: {
        grid: { display: false }, border: { color: GRID_COLOR },
        ticks: { font: { family:'IBM Plex Sans', size:10 }, color: TICK_COLOR, maxRotation: 0 }
      },
      y: {
        min: 0, max: 800,
        grid: { color: GRID_COLOR, lineWidth: 0.5 }, border: { color: GRID_COLOR },
        ticks: { stepSize: 100, font: CHART_FONT, color: TICK_COLOR }
      }
    }
  }
};

const lineChartHTML = (id) => `
  <div class="chart-wrap">
    <p class="chart-title">Hydroelectric and combustible fuel generation, Canada, 2016–2025</p>
    <div class="chart-canvas-wrap"><canvas id="${id}"></canvas></div>
    <p class="chart-caption">All values are in Terawatt-hours (TWh).<br>Source: Statistics Canada, Table 25-10-0015-01</p>
  </div>`;

const projChartHTML = (id) => `
  <div class="chart-wrap">
    <p class="chart-title">Projected grid load and hydro contribution under normal and drought conditions, 2025–2035</p>
    <div class="chart-canvas-wrap"><canvas id="${id}"></canvas></div>
    <p class="chart-caption">All values are in Terawatt-hours (TWh). Each year shows a normal-year bar (left) and a drought-year bar (right).<br>2025 actuals: Statistics Canada, Table 25-10-0015-01.<br>Projections are illustrative, not forecasts. 2030 and 2035 values interpolated from CER Canada's Energy Future 2023, Current Measures scenario.<br>Drought scenario applies a 10% hydro decline, consistent with the 9.3% national decline recorded in 2023 (Statistics Canada).</p>
  </div>`;
