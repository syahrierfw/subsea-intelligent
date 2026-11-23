import { useMemo, useRef, useState } from 'react';
import { AlertTriangle, ArrowUpRight, Bell, ChevronDown, CircleDot, Command, Filter, LayoutDashboard, Map, MoreHorizontal, Plus, Search, Settings, Sparkles, Users, Workflow, X } from 'lucide-react';
import { corridors, projectDetails, signals } from './data';
import type { Corridor, ProjectDetail, Risk } from './types';
import { CorridorMap } from './CorridorMap';

const tabs = ['Portfolio', 'Corridor twin', 'Early signals', 'Commercial readiness'];
const filters: { key: 'all' | Risk; label: string }[] = [{ key: 'all', label: 'All corridors' }, { key: 'critical', label: 'Needs action' }, { key: 'watch', label: 'Watchlist' }, { key: 'healthy', label: 'On track' }];
const riskCopy: Record<Risk, string> = { critical: 'Needs action', watch: 'Watchlist', healthy: 'On track' };
const navItems = [{ label: 'Overview', icon: LayoutDashboard, target: 'overview' }, { label: 'Portfolio map', icon: Map, target: 'map' }, { label: 'Decision flows', icon: Workflow, target: 'portfolio' }, { label: 'Partner network', icon: Users, target: 'portfolio' }];

function Status({ risk }: { risk: Risk }) { return <span className={`status ${risk}`}><i />{riskCopy[risk]}</span>; }
function Progress({ value }: { value: number }) { return <div className="progress"><i style={{ width: `${value}%` }} /></div>; }

export default function App() {
  const [activeTab, setActiveTab] = useState('Portfolio');
  const [activeFilter, setActiveFilter] = useState<'all' | Risk>('all');
  const [selected, setSelected] = useState<Corridor | null>(null);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('Live mock data');
  const [activeNav, setActiveNav] = useState('Overview');
  const [createOpen, setCreateOpen] = useState(false);
  const overviewRef = useRef<HTMLElement>(null); const mapRef = useRef<HTMLElement>(null); const portfolioRef = useRef<HTMLElement>(null); const signalsRef = useRef<HTMLElement>(null);
  const projectGroups = ['Priority development', 'Telin cable systems'] as const;
  const actionCount = corridors.filter(c => c.risk === 'critical').length;
  const visible = useMemo(() => corridors.filter(c => (activeFilter === 'all' || c.risk === activeFilter) && `${c.label} ${c.route}`.toLowerCase().includes(query.toLowerCase())), [activeFilter, query]);
  const scrollTo = (target: string) => ({ overview: overviewRef, map: mapRef, portfolio: portfolioRef }[target] || overviewRef).current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const selectTab = (tab: string) => { setActiveTab(tab); if (tab === 'Corridor twin') mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (tab === 'Early signals') signalsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (tab === 'Commercial readiness') { setActiveFilter('watch'); portfolioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
  const cycleFilter = () => { const keys: ('all' | Risk)[] = ['all', 'critical', 'watch', 'healthy']; const next = keys[(keys.indexOf(activeFilter) + 1) % keys.length]; setActiveFilter(next); setNotice(`Showing ${filters.find(f => f.key === next)?.label.toLowerCase()} projects`); };

  return <div className="product-shell">
    <aside className="side-nav">
      <div className="brand"><span className="brand-badge">T</span><span>telin</span><b>LAB</b></div>
      <button className="workspace-chip" onClick={() => { setActiveNav('Overview'); scrollTo('overview'); }}><span className="workspace-icon">I</span><span><small>Workspace</small>Intelligent Corridors</span><ChevronDown size={18} /></button>
      <nav>{navItems.map(item => { const Icon = item.icon; return <button key={item.label} className={`nav-link ${activeNav === item.label ? 'active' : ''}`} onClick={() => { setActiveNav(item.label); scrollTo(item.target); setNotice(`${item.label} workspace selected`); }}><Icon size={20} />{item.label}</button>; })}</nav>
      <p className="nav-group">WORKSPACE</p>
      <button className="board-link" onClick={() => { setActiveNav('Overview'); scrollTo('overview'); }}><span className="pink-dot" />Subsea control tower <b>8</b></button>
      <button className="board-link" onClick={() => { setActiveFilter('all'); setActiveNav('Decision flows'); scrollTo('portfolio'); }}><span className="purple-dot" />ICE development pipeline</button>
      <button className="board-link" onClick={() => selectTab('Commercial readiness')}><span className="cyan-dot" />Commercial readiness</button>
      <div className="sidebar-bottom"><button className="nav-link" onClick={() => setNotice('Settings panel is ready for configuration')}><Settings size={20} />Settings</button><div className="profile"><span>SW</span><p><b>Syahrier Wakid</b><small>Portfolio owner</small></p><MoreHorizontal size={18} /></div></div>
    </aside>
    <main className="app-main">
      <header className="app-header"><div className="crumbs">Product Innovation <span>/</span> Subsea</div><div className="header-actions"><button className="icon-button" aria-label="View notifications" onClick={() => { setActiveTab('Early signals'); signalsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setNotice(`${signals.length} active early signals`); }}><Bell size={20} /><i /></button><button className="avatar">SW</button></div></header>
      <section className="page-head" ref={overviewRef}><div><p className="eyebrow"><Sparkles size={16} />SUBSEA INTELLIGENCE CONTROL TOWER</p><h1>Intelligent corridor portfolio</h1><p className="subtitle">Connect demand, delivery, diversity and commercial readiness before every decision gate.</p></div><div className="head-actions"><button className="secondary-button" onClick={() => setNotice('Portfolio refreshed · all signals recalculated')}><ArrowUpRight size={18} />Refresh</button><button className="primary-button" onClick={() => setSelected(corridors[0])}><Plus size={19} />Run scenario</button></div></section>
      <section className="tab-row"><div className="tabs">{tabs.map(tab => <button key={tab} className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => selectTab(tab)}>{tab}{tab === 'Early signals' && <b>{signals.length}</b>}</button>)}</div><p className="sync-status"><CircleDot size={15} />{notice}</p></section>
      <section className="metric-grid"><Metric label="Portfolio value" value="USD 186.4M" trend="12% above plan" tone="positive" /><Metric label="Active projects" value="10 systems" trend="4 development + 6 live systems" /><Metric label="Commercial readiness" value="68%" trend="2 corridors need intervention" tone="warning" /><Metric label="Decision gates" value={`${actionCount} urgent`} trend="Executive action within 7 days" tone="danger" /></section>
      <section className="content-grid"><article className="map-card card" ref={mapRef}><div className="card-top"><div><p className="eyebrow">NETWORK PORTFOLIO TWIN</p><h2>Priority cable corridors</h2></div><button className="ellipsis" onClick={() => setNotice('Portfolio-map configuration opened')}><MoreHorizontal size={22} /></button></div><div className="route-visual"><CorridorMap /><div className="route-overlay"><span className="live-dot" />Illustrative portfolio layer</div></div><div className="map-foot"><span><i className="legend-dot critical" />Intervention</span><span><i className="legend-dot watch" />Watchlist</span><span><i className="legend-dot healthy" />On track</span><a href="https://www.telin.net/en/carrier/telin-cable-system" target="_blank" rel="noreferrer">Telin cable system <ArrowUpRight size={16} /></a></div></article>
        <article className="signals-card card" ref={signalsRef}><div className="card-top"><div><p className="eyebrow">EARLY SIGNAL WARNING</p><h2>Attention queue</h2></div><button className="text-button" onClick={() => { setActiveTab('Early signals'); setNotice('All early signals are displayed below'); portfolioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>View all</button></div><div className="signal-stack">{signals.map(signal => <button className="signal" key={signal.id} onClick={() => setSelected(corridors.find(c => c.id === signal.corridorId) || null)}><span className={`signal-icon ${signal.risk}`}><AlertTriangle size={18} /></span><span><b>{signal.title}</b><small>{signal.detail}</small></span><time>{signal.time}</time></button>)}</div><button className="smart-action" onClick={() => setSelected(corridors[0])}><Sparkles size={18} /><span><b>Smart recommendation</b><small>Prepare supplier fallback brief for ICE 10</small></span><ArrowUpRight size={18} /></button></article></section>
      <section className="portfolio card" ref={portfolioRef}><div className="portfolio-head"><div><p className="eyebrow">DECISION-READY WORKSPACE</p><h2>Subsea project portfolio</h2></div><div className="board-actions"><label className="search"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects" /></label><button className="secondary-button" onClick={cycleFilter}><Filter size={18} />Filter</button><button className="primary-button small" onClick={() => setCreateOpen(true)}><Plus size={18} />New item</button></div></div><div className="filter-row">{filters.map(filter => <button key={filter.key} onClick={() => setActiveFilter(filter.key)} className={activeFilter === filter.key ? 'filter-pill selected' : 'filter-pill'}>{filter.label}</button>)}</div><div className="board-table"><div className="table-header"><span>Project</span><span>Strategic fit</span><span>Readiness</span><span>Risk state</span><span>Owner</span><span>Next decision gate</span></div>{projectGroups.map(group => { const items = visible.filter(item => item.group === group); return items.length ? <div className="project-group" key={group}><div className="group-label"><span>{group}</span><b>{items.length} projects</b></div>{items.map(corridor => <button className="table-row" key={corridor.id} onClick={() => setSelected(corridor)}><span className="corridor-cell"><i className={corridor.risk} /><b>{corridor.label}</b><small>{corridor.route}</small></span><span className="score-chip"><Command size={15} />{Math.round((corridor.demand + corridor.diversity + corridor.returnScore) / 3)}</span><span className="readiness"><Progress value={corridor.progress} /><b>{corridor.progress}%</b></span><Status risk={corridor.risk} /><span className="owner"><i>{corridor.owner.split(' ').map(w => w[0]).join('').slice(0, 2)}</i>{corridor.owner}</span><span className="next-gate">{corridor.nextGate}<ArrowUpRight size={16} /></span></button>)}</div> : null; })}</div></section>
    </main>
    {selected && <ScenarioDrawer corridor={selected} close={() => setSelected(null)} />}
    {createOpen && <CreateProject close={() => setCreateOpen(false)} notify={setNotice} />}
  </div>;
}

function Metric({ label, value, trend, tone = 'neutral' }: { label: string; value: string; trend: string; tone?: 'neutral' | 'positive' | 'warning' | 'danger' }) { return <article className="metric card"><p>{label}</p><h3>{value}</h3><small className={tone}>{tone === 'positive' ? '↑ ' : tone === 'warning' ? '● ' : tone === 'danger' ? '● ' : ''}{trend}</small></article>; }
function CreateProject({ close, notify }: { close: () => void; notify: (text: string) => void }) { return <div className="drawer-backdrop" onMouseDown={close}><aside className="scenario-drawer create-drawer" onMouseDown={e => e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">CREATE PROJECT RECORD</p><h2>New portfolio item</h2><p>Add a project, decision gate, and the evidence required for forecasting.</p></div><button className="icon-button" onClick={close}><X size={18} /></button></div><div className="form-stack"><label>Project name<input placeholder="e.g. New corridor initiative" /></label><label>Primary route<input placeholder="Origin → destination" /></label><label>Decision owner<input placeholder="Portfolio owner" /></label><label>Next decision gate<select defaultValue=""><option value="" disabled>Select gate</option><option>Demand qualification</option><option>Investment approval</option><option>Supplier decision</option><option>Commercial launch</option></select></label></div><p className="form-note">The project record becomes an AI input only when milestones, updates, dependencies and commercial evidence are completed.</p><div className="drawer-actions"><button className="secondary-button" onClick={close}>Cancel</button><button className="primary-button" onClick={() => { notify('New project draft created — add evidence before forecasting'); close(); }}>Create draft</button></div></aside></div>; }
function ScenarioDrawer({ corridor, close }: { corridor: Corridor; close: () => void }) {
  const detail: ProjectDetail = projectDetails[corridor.id] ?? {
    evidence: [{ label: 'CIF / RFS plan', state: 'current' }, { label: 'Supplier schedule', state: 'current' }, { label: 'Permit tracker', state: 'current' }, { label: 'Anchor demand', state: 'watch' }, { label: 'CAPEX baseline', state: 'current' }],
    milestones: [{ name: 'Project plan refresh', owner: 'SPO', due: '06 Dec', state: 'watch' }, { name: 'Commercial review', owner: 'Sales', due: '13 Dec', state: 'watch' }, { name: 'Portfolio gate', owner: 'Leadership', due: '20 Dec', state: 'done' }],
    updates: [{ date: 'Today', text: 'Portfolio data is refreshed for this project record.', source: 'Control tower' }, { date: 'This week', text: 'Commercial and delivery evidence is being reviewed.', source: 'Portfolio review' }],
    forecast: 'Current data indicates a stable operating path. Continue monitoring new delivery and commercial updates.'
  };
  return <div className="drawer-backdrop" onMouseDown={close}><aside className="scenario-drawer" onMouseDown={e => e.stopPropagation()}>
    <div className="drawer-head"><div><p className="eyebrow">PROJECT INTELLIGENCE DETAIL</p><h2>{corridor.label}</h2><p>{corridor.route}</p></div><button className="icon-button" onClick={close}><X size={18} /></button></div>
    <div className="drawer-score"><span><small>Demand</small><b>{corridor.demand}</b></span><span><small>Readiness</small><b>{corridor.progress}%</b></span><span><small>RFS</small><b>{corridor.rfs}</b></span></div>
    <DecisionEngine corridor={corridor} detail={detail} />
    <div className="drawer-section"><p className="eyebrow">AI INPUT COMPLETENESS</p><div className="evidence-row">{detail.evidence.map(item => <span className={`evidence ${item.state}`} key={item.label}><i />{item.label}</span>)}</div></div>
    <div className="drawer-section"><p className="eyebrow">LIKELY IMPACT, BASED ON UPDATES</p><h3>{detail.forecast}</h3><p>AI compares the planned critical path with milestone status, narrative updates, demand changes, and external signals. It suggests decisions; owners remain accountable for approval.</p></div>
    <div className="drawer-section"><p className="eyebrow">MILESTONES & DEPENDENCIES</p><div className="milestone-list">{detail.milestones.map(item => <div className="milestone" key={item.name}><span className={`milestone-state ${item.state}`} /><span><b>{item.name}</b><small>{item.owner} · due {item.due}</small></span><Status risk={item.state === 'risk' ? 'critical' : item.state === 'watch' ? 'watch' : 'healthy'} /></div>)}</div></div>
    <div className="drawer-section"><p className="eyebrow">LATEST PROJECT UPDATES</p><div className="update-list">{detail.updates.map(update => <div className="update" key={`${update.date}${update.source}`}><time>{update.date}</time><p>{update.text}<small>{update.source}</small></p></div>)}</div></div>
    <div className="drawer-actions"><button className="secondary-button" onClick={close}>Keep monitoring</button><button className="primary-button" onClick={close}>Create decision brief</button></div>
  </aside></div>;
}

function DecisionEngine({ corridor, detail }: { corridor: Corridor; detail: ProjectDetail }) {
  const evidence = Math.round(detail.evidence.reduce((sum, item) => sum + (item.state === 'current' ? 100 : item.state === 'watch' ? 65 : 20), 0) / detail.evidence.length);
  const base = corridor.demand * .30 + corridor.returnScore * .25 + corridor.progress * .25 + corridor.diversity * .20;
  const riskPenalty = corridor.risk === 'critical' ? 18 : corridor.risk === 'watch' ? 8 : 0;
  const score = Math.round(Math.max(0, base - riskPenalty) * (0.65 + evidence / 285));
  const decision = score >= 78 && evidence >= 75 ? 'Advance with conditions' : score >= 58 ? 'Resolve gate before advance' : 'Hold and redesign';
  const options = corridor.risk === 'critical'
    ? ['Approve supplier fallback and rights escalation', 'Hold supply commitment until anchor demand clears', 'Rebaseline RFS and preserve CAPEX option']
    : ['Advance to the next decision gate', 'Qualify missing commercial evidence first', 'Keep as watchlist and review at weekly war room'];
  return <section className="drawer-section decision-engine">
    <p className="eyebrow">EXPLAINABLE DECISION METHOD · PDS v1.0</p>
    <div className="decision-summary"><div className="decision-score"><span>Priority Decision Score</span><b>{score}<small>/100</small></b></div><div><strong>{decision}</strong><p>Weighted score, with hard risk and data-quality gates.</p></div></div>
    <div className="method-grid"><span><b>30%</b> Demand</span><span><b>25%</b> Value</span><span><b>25%</b> Readiness</span><span><b>20%</b> Diversity</span></div>
    <p className="method-note">Confidence: <b>{evidence}%</b> from project evidence. Critical supplier, rights, permit or anchor-demand gaps can override the score.</p>
    <div className="decision-options"><p>Decision options</p>{options.map((option, index) => <button key={option}><span>{index + 1}</span>{option}<ArrowUpRight size={15} /></button>)}</div>
  </section>;
}
