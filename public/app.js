const corridors = [
  { id: 'ice1', name: 'ICE 1 Leg 1', route: 'Batam — Singapore', demand: 94, diversity: 90, return: 88, readiness: 82, risk: 'low', rfs: 'Q1 2028', next: 'C&M signing', signal: 'Anchor demand validated' },
  { id: 'ice2', name: 'ICE 2', route: 'Singapore — US', demand: 98, diversity: 81, return: 91, readiness: 61, risk: 'medium', rfs: 'H2 2033', next: 'Supply contract', signal: 'AI inference cluster request' },
  { id: 'ice4', name: 'ICE 4', route: 'Asia — Middle East', demand: 89, diversity: 93, return: 86, readiness: 70, risk: 'medium', rfs: 'H2 2031', next: 'Landing readiness', signal: 'Sovereign AI demand' },
  { id: 'ice10', name: 'ICE 10', route: 'Singapore — US', demand: 96, diversity: 84, return: 93, readiness: 54, risk: 'high', rfs: 'H2 2032', next: 'Rights escalation', signal: 'Supplier schedule pressure' },
  { id: 'spectrum', name: 'Spectrum Africa', route: 'Middle East — Europe', demand: 78, diversity: 95, return: 75, readiness: 72, risk: 'low', rfs: '2026', next: 'Commercial scale', signal: 'NeoCloud prospect' }
];

const signals = [
  { type: 'CRITICAL', title: 'ICE 10 supplier slot has moved +6 weeks', context: 'Schedule / CAPEX impact: $2.1M exposure', time: '12 min ago', corridor: 'ice10' },
  { type: 'CRITICAL', title: 'Singapore landing permit needs executive support', context: 'Dependency to ICE 2 and ICE 10 commercial path', time: '1 hr ago', corridor: 'ice2' },
  { type: 'WATCH', title: 'NeoCloud demand indicates 18 Tbps potential', context: 'Asia–Middle East interconnect opportunity', time: '3 hrs ago', corridor: 'ice4' },
  { type: 'WATCH', title: 'Anchor tenant pipeline below target', context: 'ICE 2 currently at 61% commercial readiness', time: 'Today', corridor: 'ice2' }
];

const actions = [
  ['Approve', 'ICE 10 supplier fallback and commercial recovery scenario'],
  ['Escalate', 'Singapore landing-permit decision owner by Friday'],
  ['Validate', 'NeoCloud anchor demand for Asia–Middle East corridor'],
  ['Review', 'ICE 2 capacity plan against inference-cluster pipeline']
];

let activeFilter = 'all';
const riskOrder = { high: 3, medium: 2, low: 1 };

const titleByView = {
  overview: 'Intelligent Corridor Portfolio', corridors: 'Corridor Digital Twin', signals: 'Early-Signal Warning Centre', readiness: 'Commercial Readiness Monitor', scenarios: 'Scenario Lab'
};

function filteredCorridors() {
  return activeFilter === 'all' ? corridors : corridors.filter((corridor) => corridor.risk === activeFilter);
}

function renderFilters() {
  const filters = [['all', 'All corridors'], ['high', 'High intervention'], ['medium', 'Watchlist'], ['low', 'On track']];
  document.querySelector('#filters').innerHTML = filters.map(([id, label]) => `<button class="filter ${activeFilter === id ? 'selected' : ''}" data-filter="${id}">${label}</button>`).join('');
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { activeFilter = button.dataset.filter; render(); }));
}

function riskPill(risk) { return `<span class="risk-pill ${risk}">${risk === 'high' ? 'Intervene' : risk === 'medium' ? 'Watch' : 'On track'}</span>`; }

function renderCorridors() {
  const data = filteredCorridors();
  document.querySelector('#corridor-map').innerHTML = data.map((c, index) => `
    <button class="corridor-row" data-corridor="${c.id}" style="--delay:${index * 70}ms">
      <span class="route-line"><i class="route-dot ${c.risk}"></i><i></i></span>
      <span class="corridor-name"><strong>${c.name}</strong><small>${c.route}</small></span>
      <span class="score"><small>Demand</small>${c.demand}</span>
      <span class="score"><small>Diversity</small>${c.diversity}</span>
      <span class="score"><small>Return</small>${c.return}</span>
      ${riskPill(c.risk)}
    </button>`).join('');
  document.querySelectorAll('[data-corridor]').forEach((button) => button.addEventListener('click', () => openScenario(corridors.find((c) => c.id === button.dataset.corridor))));
}

function renderSignals() {
  document.querySelector('#signal-list').innerHTML = signals.slice(0, 4).map((signal) => `
    <button class="signal-item" data-signal="${signal.corridor}">
      <span class="signal-type ${signal.type.toLowerCase()}">${signal.type}</span>
      <span><strong>${signal.title}</strong><small>${signal.context}</small></span>
      <time>${signal.time}</time>
    </button>`).join('');
  document.querySelectorAll('[data-signal]').forEach((button) => button.addEventListener('click', () => openScenario(corridors.find((c) => c.id === button.dataset.signal))));
}

function renderReadiness() {
  document.querySelector('#readiness-list').innerHTML = filteredCorridors().map((c) => `<div class="readiness-item"><div><strong>${c.name}</strong><span>${c.route}</span></div><div class="bar"><i style="width:${c.readiness}%"></i></div><b>${c.readiness}%</b></div>`).join('');
}

function renderActions() {
  document.querySelector('#action-list').innerHTML = actions.map(([tag, action], index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p><b>${tag}</b> ${action}</p></li>`).join('');
}

function renderTable() {
  document.querySelector('#project-table').innerHTML = filteredCorridors().sort((a, b) => riskOrder[b.risk] - riskOrder[a.risk]).map((c) => `<tr><td><strong>${c.name}</strong></td><td>${c.route}</td><td>${c.signal}</td><td><span class="readiness-cell"><i style="width:${c.readiness}%"></i></span>${c.readiness}%</td><td>${riskPill(c.risk)}</td><td>${c.next}</td></tr>`).join('');
}

function openScenario(corridor) {
  const recommendation = corridor.risk === 'high'
    ? 'Activate the alternate supplier option, align the recovery schedule with the commercial team, and elevate the decision gate this week.'
    : corridor.risk === 'medium'
      ? 'Run a focused demand and dependency review before the next gate. Confirm anchor demand and the critical external dependencies.'
      : 'Maintain current execution. Use the corridor as a reference playbook for a commercially ready delivery model.';
  document.querySelector('#modal-title').textContent = `${corridor.name}: decision recommendation`;
  document.querySelector('#modal-body').innerHTML = `<div class="scenario-card"><p class="eyebrow">${corridor.route}</p><div class="scenario-stats"><span><small>Demand</small><b>${corridor.demand}</b></span><span><small>Readiness</small><b>${corridor.readiness}%</b></span><span><small>RFS</small><b>${corridor.rfs}</b></span></div><h3>Recommended management action</h3><p>${recommendation}</p><div class="scenario-actions"><button class="outline-button" id="dismiss-scenario">Keep monitoring</button><button class="primary-button" id="accept-scenario">Create decision brief</button></div></div>`;
  document.querySelector('#modal-backdrop').classList.add('visible');
  document.querySelector('#modal-backdrop').setAttribute('aria-hidden', 'false');
  document.querySelector('#dismiss-scenario').onclick = closeModal;
  document.querySelector('#accept-scenario').onclick = () => { alert(`Dummy action: decision brief for ${corridor.name} created.`); closeModal(); };
}

function closeModal() { document.querySelector('#modal-backdrop').classList.remove('visible'); document.querySelector('#modal-backdrop').setAttribute('aria-hidden', 'true'); }

function render() { renderFilters(); renderCorridors(); renderSignals(); renderReadiness(); renderActions(); renderTable(); document.querySelector('#critical-kpi').textContent = corridors.filter((c) => c.risk === 'high').length; }

document.querySelector('#date-chip').textContent = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date());
document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-view]').forEach((item) => item.classList.remove('active')); button.classList.add('active'); document.querySelector('#page-title').textContent = titleByView[button.dataset.view]; if (button.dataset.view === 'scenarios') openScenario(corridors.find((c) => c.id === 'ice10')); }));
document.querySelector('#refresh-button').addEventListener('click', () => { const refresh = document.querySelector('#refresh-button'); refresh.textContent = '✓ Signals updated'; setTimeout(() => { refresh.textContent = '↻ Refresh signals'; }, 1300); });
document.querySelector('#simulate-button').addEventListener('click', () => openScenario(corridors.find((c) => c.id === 'ice10')));
document.querySelector('#close-modal').addEventListener('click', closeModal);
document.querySelector('#modal-backdrop').addEventListener('click', (event) => { if (event.target.id === 'modal-backdrop') closeModal(); });
render();
