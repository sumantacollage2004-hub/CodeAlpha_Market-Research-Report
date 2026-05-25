/* ===================================================
   EV MARKET RESEARCH REPORT — CHARTS.JS
   All Chart.js configurations + interactivity
   =================================================== */

// ── Chart.js global defaults ──────────────────────────
Chart.defaults.color = '#8899bb';
Chart.defaults.font.family = "'DM Mono', monospace";
Chart.defaults.plugins.legend.display = false;

const ACCENT   = '#00e5ff';
const ACCENT2  = '#7cff6b';
const ACCENT3  = '#ff6b35';
const THREAT   = '#ff4d6d';
const GOLD     = '#f0c040';
const MUTED    = '#4a5570';

// ── Helper: gradient fill ─────────────────────────────
function makeGrad(ctx, color1, color2) {
  const g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  g.addColorStop(0, color1);
  g.addColorStop(1, color2);
  return g;
}

// ──────────────────────────────────────────────────────
// 1. SWOT RADAR CHART
// ──────────────────────────────────────────────────────
(function initSwotRadar() {
  const ctx = document.getElementById('swotRadar');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Cost Savings', 'Tech Innovation', 'Brand Power',
        'Policy Support', 'Infrastructure', 'Market Size',
        'Supply Chain', 'Consumer Trust'
      ],
      datasets: [
        {
          label: 'Strengths',
          data: [9, 8.5, 7, 9, 6, 9, 5, 8],
          borderColor: ACCENT,
          backgroundColor: 'rgba(0,229,255,0.12)',
          pointBackgroundColor: ACCENT,
          borderWidth: 2,
          pointRadius: 4,
        },
        {
          label: 'Opportunities',
          data: [7, 9, 6, 8, 7, 10, 6, 7],
          borderColor: ACCENT2,
          backgroundColor: 'rgba(124,255,107,0.08)',
          pointBackgroundColor: ACCENT2,
          borderWidth: 2,
          pointRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { color: '#8899bb', boxWidth: 12, padding: 20 }
        },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: 'rgba(0,229,255,0.3)',
          borderWidth: 1,
          titleColor: '#eef2ff',
          bodyColor: '#8899bb',
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 10,
          grid: { color: 'rgba(255,255,255,0.05)' },
          angleLines: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            display: false,
            stepSize: 2,
          },
          pointLabels: {
            color: '#8899bb',
            font: { size: 11 }
          }
        }
      }
    }
  });
})();

// ──────────────────────────────────────────────────────
// 2. AUDIENCE DONUT CHART
// ──────────────────────────────────────────────────────
(function initAudienceDonut() {
  const ctx = document.getElementById('audienceDonut');
  if (!ctx) return;

  const segments = [
    { label: 'Fleet & Corporate', pct: 34, color: ACCENT },
    { label: 'Eco-Conscious Millennials', pct: 24, color: ACCENT2 },
    { label: 'Tech Enthusiasts', pct: 18, color: GOLD },
    { label: 'Luxury Seekers', pct: 14, color: ACCENT3 },
    { label: 'Cost-Conscious Commuters', pct: 10, color: '#a855f7' },
  ];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: segments.map(s => s.label),
      datasets: [{
        data: segments.map(s => s.pct),
        backgroundColor: segments.map(s => s.color + 'cc'),
        borderColor: segments.map(s => s.color),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        tooltip: {
          backgroundColor: '#141820',
          borderColor: 'rgba(0,229,255,0.3)',
          borderWidth: 1,
          titleColor: '#eef2ff',
          bodyColor: '#8899bb',
          callbacks: {
            label: (c) => ` ${c.label}: ${c.parsed}%`
          }
        }
      }
    }
  });

  // Build custom legend
  const legend = document.getElementById('donutLegend');
  if (legend) {
    segments.forEach(s => {
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `
        <div class="legend-dot" style="background:${s.color}"></div>
        <span>${s.label}</span>
        <span class="legend-pct">${s.pct}%</span>
      `;
      legend.appendChild(item);
    });
  }
})();

// ──────────────────────────────────────────────────────
// 3. MARKET SHARE HORIZONTAL BAR CHART
// ──────────────────────────────────────────────────────
(function initMarketShareBar() {
  const ctx = document.getElementById('marketShareBar');
  if (!ctx) return;

  const companies  = ['BYD', 'Tesla', 'VW Group', 'Hyundai/Kia', 'GM', 'Others'];
  const shares     = [22, 18, 11, 8, 6, 35];
  const colors     = [ACCENT3, ACCENT, ACCENT2, GOLD, '#a855f7', MUTED];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: companies,
      datasets: [{
        data: shares,
        backgroundColor: colors.map(c => c + 'bb'),
        borderColor: colors,
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        tooltip: {
          backgroundColor: '#141820',
          borderColor: 'rgba(0,229,255,0.3)',
          borderWidth: 1,
          titleColor: '#eef2ff',
          bodyColor: '#8899bb',
          callbacks: {
            label: c => ` Market Share: ${c.parsed.x}%`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '%' },
          border: { color: 'rgba(255,255,255,0.06)' },
          max: 45,
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#eef2ff', font: { size: 13, weight: '600' } }
        }
      }
    }
  });
})();

// ──────────────────────────────────────────────────────
// 4. GROWTH LINE CHART
// ──────────────────────────────────────────────────────
(function initGrowthLine() {
  const ctx = document.getElementById('growthLine');
  if (!ctx) return;

  const years  = ['2019','2020','2021','2022','2023','2024','2025E','2026E','2027E','2028E','2029E','2030E'];
  const actual = [2.2, 3.1, 6.6, 10.5, 14.2, 17.0, null, null, null, null, null, null];
  const proj   = [null, null, null, null, null, 17.0, 22.5, 29, 38, 50, 62, 78];

  // Build gradient
  const gradient1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 320);
  gradient1.addColorStop(0, 'rgba(0,229,255,0.3)');
  gradient1.addColorStop(1, 'rgba(0,229,255,0)');

  const gradient2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 320);
  gradient2.addColorStop(0, 'rgba(124,255,107,0.25)');
  gradient2.addColorStop(1, 'rgba(124,255,107,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Actual Sales (M units)',
          data: actual,
          borderColor: ACCENT,
          backgroundColor: gradient1,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: ACCENT,
          pointBorderColor: '#0a0c10',
          pointBorderWidth: 2,
          borderWidth: 2.5,
          spanGaps: false,
        },
        {
          label: 'Projected Sales (M units)',
          data: proj,
          borderColor: ACCENT2,
          backgroundColor: gradient2,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: ACCENT2,
          pointBorderColor: '#0a0c10',
          pointBorderWidth: 2,
          borderWidth: 2.5,
          borderDash: [6, 4],
          spanGaps: false,
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: { color: '#8899bb', boxWidth: 20, padding: 20, usePointStyle: true }
        },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: 'rgba(0,229,255,0.3)',
          borderWidth: 1,
          titleColor: '#eef2ff',
          bodyColor: '#8899bb',
          callbacks: {
            label: c => c.parsed.y !== null ? ` ${c.dataset.label}: ${c.parsed.y}M` : ''
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          border: { color: 'rgba(255,255,255,0.06)' },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          border: { color: 'rgba(255,255,255,0.06)' },
          ticks: { callback: v => v + 'M' },
          beginAtZero: true,
        }
      }
    }
  });
})();

// ──────────────────────────────────────────────────────
// 5. REGIONAL GROUPED BAR CHART
// ──────────────────────────────────────────────────────
(function initRegionalBar() {
  const ctx = document.getElementById('regionalBar');
  if (!ctx) return;

  const regions = ['China', 'Europe', 'North America', 'India & SE Asia', 'Rest of World'];
  const share24 = [60, 22, 11, 4, 3];
  const share30 = [48, 28, 16, 6, 2];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: regions,
      datasets: [
        {
          label: '2024 Share (%)',
          data: share24,
          backgroundColor: ACCENT + 'bb',
          borderColor: ACCENT,
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: '2030E Share (%)',
          data: share30,
          backgroundColor: ACCENT2 + 'bb',
          borderColor: ACCENT2,
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: { color: '#8899bb', boxWidth: 16, padding: 20, usePointStyle: true }
        },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: 'rgba(0,229,255,0.3)',
          borderWidth: 1,
          titleColor: '#eef2ff',
          bodyColor: '#8899bb',
          callbacks: {
            label: c => ` ${c.dataset.label}: ${c.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: 'rgba(255,255,255,0.06)' },
          ticks: { color: '#8899bb' }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          border: { color: 'rgba(255,255,255,0.06)' },
          ticks: { callback: v => v + '%' },
          beginAtZero: true,
          max: 70
        }
      }
    }
  });
})();

// ──────────────────────────────────────────────────────
// NAV DOT SCROLL SPY
// ──────────────────────────────────────────────────────
(function initScrollSpy() {
  const sections = ['cover','exec','swot','audience','competitors','trends','regions','conclusion'];
  const dots = document.querySelectorAll('.nav-dot');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target.id);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

// ──────────────────────────────────────────────────────
// AUDIENCE BAR ANIMATION ON SCROLL
// ──────────────────────────────────────────────────────
(function animateAudienceBars() {
  const fills = document.querySelectorAll('.aud-fill');
  fills.forEach(el => {
    const target = el.style.width;
    el.style.width = '0';
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => { el.style.width = target; }, 200);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
  });
})();

// ──────────────────────────────────────────────────────
// SHARE BAR ANIMATION ON SCROLL
// ──────────────────────────────────────────────────────
(function animateShareBars() {
  const fills = document.querySelectorAll('.share-fill');
  fills.forEach(el => {
    const target = el.style.width;
    el.style.width = '0';
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => { el.style.width = target; }, 300);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
  });
})();
