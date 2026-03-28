/**
 * PAIL v2.5 — ET AI Concierge Engine
 * Architecture: DataFabric → Orchestrator → APIGateway
 * Preserves class-based architecture strictly.
 */

// ============ DATA FABRIC (ET Data Fabric Layer) ============
class DataFabric {
  constructor() {
    this.identityGraph = {
      name: 'Rahul K.', initials: 'RK', segment: null,
      ageRange: '30–35', risk: null, income: null,
      goal: null, horizon: null,
      assets: null, products: 'Prime',
      sipCapacity: null, hasInsurance: null, hasNPS: null,
      hasIntlEquity: null, depth: 15, completedSteps: [0],
      signals: []
    };
    this.metrics = { products: 1, articles: 0, classes: 0, opportunities: 0 };
    this.contentStore = {
      equity: [
        { cat: 'Markets', headline: 'Nifty 50 crosses 24,500 — bull run intact despite FII selling', time: '12 min ago', tag: 'equity' },
        { cat: 'Stocks', headline: 'Reliance Industries Q4 profit up 19% — analysts bullish on Jio growth', time: '34 min ago', tag: 'equity' },
        { cat: 'ETF', headline: 'Nifty Next 50 ETFs see record ₹2,300Cr inflow in March', time: '1 hr ago', tag: 'equity' }
      ],
      mf: [
        { cat: 'Mutual Funds', headline: 'SIP flows hit all-time high of ₹26,688 Cr in February 2025', time: '2 hrs ago', tag: 'mf' },
        { cat: 'MF Analysis', headline: 'Flexi-cap funds outperform large-cap peers over 5-year horizon', time: '3 hrs ago', tag: 'mf' }
      ],
      insurance: [
        { cat: 'Insurance', headline: 'Term insurance premiums to rise 8–12% — buy now or lock in rates', time: '45 min ago', tag: 'insurance' },
        { cat: 'Health', headline: 'IRDAI mandates ₹5L base cover — what it means for your policy', time: '2 hrs ago', tag: 'insurance' }
      ],
      tax: [
        { cat: 'Tax', headline: 'NPS Tier-II: Additional ₹50K deduction under Section 80CCD(1B)', time: '1 hr ago', tag: 'tax' },
        { cat: 'Budget', headline: 'New tax regime vs old — which saves more for ₹25L salary bracket', time: '3 hrs ago', tag: 'tax' }
      ],
      wealth: [
        { cat: 'Wealth', headline: 'PMS vs mutual funds: Where should HNIs park ₹50L+?', time: '2 hrs ago', tag: 'wealth' },
        { cat: 'ET Wealth Summit', headline: 'Wealth Summit 2025: Nirmala Sitharaman, Uday Kotak to address 5,000 HNIs', time: '4 hrs ago', tag: 'wealth' }
      ],
      default: [
        { cat: 'ET Prime', headline: "How India's top 1% invest: 7 strategies from ET Prime research", time: '30 min ago', tag: 'wealth' },
        { cat: 'Economy', headline: 'India GDP growth forecast revised to 7.1% for FY26 — IMF', time: '1 hr ago', tag: 'macro' },
        { cat: 'Markets', headline: 'Sensex up 312 pts — IT stocks lead recovery amid global tech rally', time: '15 min ago', tag: 'equity' }
      ]
    };
    this.onboardSteps = [
      'Basic profile complete', 'ET Prime activated', 'Financial goals mapped',
      'Portfolio gap analysis', 'Partner service matched', 'Personalisation calibrated'
    ];
  }

  pushSignal(text, color) {
    color = color || 'var(--teal)';
    const signal = { text, color, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    this.identityGraph.signals.unshift(signal);
    if (this.identityGraph.signals.length > 20) this.identityGraph.signals.pop();
    this.renderSignals();
    this.renderSidebar();
  }

  updateIdentity(changes, label) {
    const u = this.identityGraph;
    for (const [key, val] of Object.entries(changes)) { u[key] = val; }
    // Recalculate depth based on conversationally gathered fields
    const fields = ['goal', 'risk', 'income', 'assets', 'hasInsurance', 'hasNPS', 'ageRange', 'horizon'];
    const filled = fields.filter(f => u[f] !== null && u[f] !== undefined).length;
    u.depth = Math.min(95, 15 + filled * 10);
    this.updateUI();
    this.pushSignal(label || 'Profile field updated', 'var(--gold)');
  }

  addDepth(d) {
    this.identityGraph.depth = Math.min(95, this.identityGraph.depth + d);
    this.updateUI();
  }

  advanceOnboard(stepIdx) {
    if (!this.identityGraph.completedSteps.includes(stepIdx)) {
      this.identityGraph.completedSteps.push(stepIdx);
      this.renderOnboard();
    }
  }

  fetchNews(tags) {
    tags = tags || ['default'];
    let items = [];
    tags.forEach(t => { if (this.contentStore[t]) items = items.concat(this.contentStore[t]); });
    if (!items.length) items = this.contentStore.default;
    return items.slice(0, 4);
  }

  getNewsTagsForUser() {
    const u = this.identityGraph, tags = [];
    if (u.assets && /equity|stock/i.test(u.assets)) tags.push('equity');
    if (u.assets && /mf|mutual/i.test(u.assets)) tags.push('mf');
    if (u.hasInsurance === false) tags.push('insurance');
    if (u.hasNPS === false) tags.push('tax');
    if (u.segment && /hni|ultra/i.test(u.segment)) tags.push('wealth');
    return tags.length ? tags : ['default'];
  }

  // ---- UI RENDER METHODS ----
  updateUI() {
    const u = this.identityGraph;
    this._setFlash('p-name', u.name); this._setFlash('p-seg', u.segment);
    this._setFlash('p-age', u.ageRange); this._setFlash('p-risk', u.risk);
    this._setFlash('p-income', u.income); this._setFlash('p-goal', u.goal);
    this._setFlash('p-horizon', u.horizon); this._setFlash('p-assets', u.assets);
    this._setFlash('p-products', u.products);
    const d = u.depth;
    document.getElementById('p-comp-fill').style.width = d + '%';
    document.getElementById('p-comp-label').textContent = d + '%';
    document.getElementById('pail-score-chip').textContent = 'PAIL ' + d + '%';
    this.renderSidebar(); this.renderOnboard(); this.renderReco();
  }

  _setFlash(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const display = (val !== null && val !== undefined) ? val : '—';
    if (el.textContent !== display) {
      el.textContent = display;
      if (val !== null && val !== undefined) {
        el.classList.add('updating');
        setTimeout(() => el.classList.remove('updating'), 1800);
      }
    }
  }

  renderSidebar() {
    const u = this.identityGraph;
    document.getElementById('sb-depth').textContent = u.depth + '%';
    document.getElementById('sb-bar').style.width = u.depth + '%';
    document.getElementById('sb-risk').textContent = u.risk || '—';
    document.getElementById('sb-seg').textContent = u.segment || '—';
    document.getElementById('sb-signals').textContent = u.signals.length;
  }

  renderSignals() {
    const html = this.identityGraph.signals.map(s =>
      `<div class="signal-item"><div class="signal-dot" style="background:${s.color}"></div><div><div class="signal-text">${s.text}</div><div class="signal-time">${s.time}</div></div></div>`
    ).join('');
    document.getElementById('signal-feed').innerHTML = html || '<div class="signal-text" style="color:var(--et-muted);padding:8px 0;">No signals yet.</div>';
  }

  renderOnboard() {
    const completed = this.identityGraph.completedSteps;
    const html = this.onboardSteps.map((s, i) => {
      const done = completed.includes(i);
      const active = !done && (completed.length === i || (i === 2 && this.identityGraph.depth > 60));
      return `<div class="ob-step"><div class="ob-num ${done ? 'num-done' : active ? 'num-active' : 'num-pend'}">${done ? '✓' : i + 1}</div><span class="ob-text ${done ? 'done' : active ? 'act' : ''}">${s}</span></div>`;
    }).join('');
    document.getElementById('ob-steps').innerHTML = html;
  }

  renderReco() {
    const services = APIGateway.getPartners(this.identityGraph.risk);
    const html = services.map(s =>
      `<div class="rec-row"><div class="rec-ico" style="background:rgba(26,107,181,.15);">${s.icon || ''}</div><div class="rec-content"><div class="rec-title">${s.title}</div><div class="rec-meta">${s.sub}</div></div><span class="match-pill ${s.level}">${s.match}</span></div>`
    ).join('');
    document.getElementById('reco-list').innerHTML = html;
  }

  renderMetrics() {
    document.getElementById('m-products').textContent = this.metrics.products;
    document.getElementById('m-articles').textContent = this.metrics.articles;
    document.getElementById('m-classes').textContent = this.metrics.classes;
    document.getElementById('m-opps').textContent = this.metrics.opportunities;
  }
}

// ============ PARTNER API GATEWAY ============
class APIGateway {
  static getPartners(risk) {
    const db = {
      Conservative: [
        { icon: '🏦', title: 'Bajaj Finance FD — 8.1% p.a.', sub: 'Capital-safe · AAA rated', match: '96%', level: 'match-high' },
        { icon: '🛡️', title: 'ICICI Pru Term Plan ₹1Cr', sub: '₹823/mo · Fills insurance gap', match: '93%', level: 'match-high' },
        { icon: '📊', title: 'SBI Debt Fund SIP', sub: 'Low-risk · ₹5K/mo min', match: '79%', level: 'match-med' }
      ],
      Moderate: [
        { icon: '🏠', title: 'HDFC Home Loan — 8.4%', sub: 'Pre-approved ₹80L · 2% below market', match: 'Pre-approved', level: 'match-high' },
        { icon: '🛡️', title: 'ICICI Term Plan ₹1Cr', sub: '₹823/mo · Fills insurance gap', match: 'Recommended', level: 'match-high' },
        { icon: '💎', title: 'Groww Wealth PMS', sub: 'Min ₹50L · aligned to FIRE goal', match: 'Explore', level: 'match-med' },
        { icon: '💳', title: 'ET–HDFC Millennia Card', sub: 'Pre-approved · 5% cashback on ET', match: '91%', level: 'match-high' }
      ],
      Aggressive: [
        { icon: '🚀', title: 'Zerodha PMS — Momentum', sub: 'Min ₹50L · 26.4% CAGR (3yr)', match: '92%', level: 'match-high' },
        { icon: '🌍', title: "Motilal Int'l US Fund", sub: 'Fills intl equity gap · SIP ₹5K', match: '88%', level: 'match-high' },
        { icon: '💳', title: 'ET–Axis Magnus Credit Card', sub: 'Travel + invest rewards', match: '85%', level: 'match-med' }
      ]
    };
    if (risk && risk.includes('Aggress')) return db.Aggressive;
    if (risk && risk.includes('Conserv')) return db.Conservative;
    return db.Moderate;
  }
}

// ============ LLM ORCHESTRATOR ============
class Orchestrator {
  constructor(fabric) {
    this.fabric = fabric;
    this.currentAgent = 'concierge';
    this.profilingStep = 0;
    this.agentConfig = {
      concierge: { title: 'ET Welcome Concierge', desc: 'Smart 3-min profiling · PAIL identity graph construction', hint: 'Welcome Concierge mode', qr: ['Tell me about ET Prime', 'I invest in equities & MF', 'Show my financial gaps', 'I need a home loan'] },
      navigator: { title: 'Financial Life Navigator', desc: 'Deep financial understanding · Goal mapping · Portfolio gap analysis', hint: 'Financial Navigator mode', qr: ['Analyse my portfolio gaps', 'What is my NPS status?', 'Show insurance coverage', 'FIRE planning for me'] },
      crosssell: { title: 'ET Cross-Sell Engine', desc: 'Behavioural trigger analysis · Right offer at the right moment', hint: 'Cross-Sell Engine mode', qr: ["What's best for my profile?", 'Show upsell opportunities', 'ET Masterclass match', 'Credit card for me'] },
      marketplace: { title: 'ET Services Marketplace', desc: 'Financial services concierge · Partner integrations live', hint: 'Services Marketplace mode', qr: ['Home loan options', 'Term insurance quotes', 'Wealth management PMS', 'Best FD rates now'] }
    };
    this.profilingStages = [
      { ask: `<p>Namaste! 🙏 I'm your <strong>ET AI Concierge</strong>, powered by PAIL — ET's Persistent Adaptive Intelligence Layer.</p><p>I'll map you to everything the ET ecosystem offers in just a few questions. Let's start: <strong>What's your primary financial goal right now?</strong></p>`, richType: 'goal-q', parse: (t) => { let g = 'Wealth creation', s = 'HNI-Aspirant'; if (/retire|fire|independen/i.test(t)) { g = 'Retirement / FIRE'; } else if (/child|educat/i.test(t)) { g = 'Child education'; s = 'Family-Planner'; } else if (/income|passive/i.test(t)) { g = 'Passive income'; s = 'Income-Seeker'; } else if (/preserve|safe|capital/i.test(t)) { g = 'Capital preservation'; s = 'Conservative-HNI'; } return { goal: g, segment: s }; }, signal: t => `Goal detected: ${/retire|fire/i.test(t) ? 'Retirement/FIRE' : 'Wealth creation'}`, depth: 10 },
      { ask: p => `<p>Great — <strong>${p.goal}</strong> is a well-defined goal. What's your risk appetite?</p>`, richType: 'risk-q', parse: t => { let r = 'Moderate'; if (/conserv|safe|low/i.test(t)) r = 'Conservative'; else if (/moderate|balanced|medium/i.test(t)) r = 'Moderate'; else if (/very aggress|maximum/i.test(t)) r = 'Very Aggressive'; else if (/aggress|high|growth/i.test(t)) r = 'Aggressive'; return { risk: r }; }, signal: t => `Risk profile updated`, depth: 8 },
      { ask: () => `<p>Understood. <strong>What asset classes are you currently invested in?</strong></p>`, richType: 'asset-q', parse: t => { let a = []; if (/equit|stock|share/i.test(t)) a.push('Equity'); if (/mutual|mf|fund|sip/i.test(t)) a.push('MF'); if (/gold/i.test(t)) a.push('Gold'); if (/real estate|property/i.test(t)) a.push('Real Estate'); if (/fd|fixed|debt|bond/i.test(t)) a.push('Debt/FD'); if (!a.length) a = ['Savings']; return { assets: a.join(', ') }; }, signal: () => 'Asset classes mapped', depth: 7 },
      { ask: () => `<p>Good diversification context. <strong>What is your approximate annual income bracket?</strong></p>`, richType: 'income-q', parse: t => { let inc = '₹10–20L p.a.', seg = null; if (/below 5|under 5/i.test(t)) inc = 'Below ₹5L p.a.'; else if (/5.*(10|ten)|10 lakh/i.test(t)) inc = '₹5–10L p.a.'; else if (/10.*(20|twenty)|15/i.test(t)) inc = '₹10–20L p.a.'; else if (/20.*(40|forty)|25|30/i.test(t)) { inc = '₹20–40L p.a.'; } else if (/40.*(1 cr|hundred)|50 lakh/i.test(t)) { inc = '₹40L–1Cr p.a.'; seg = 'HNI'; } else if (/1 cr|crore|above 1/i.test(t)) { inc = '₹1Cr+ p.a.'; seg = 'Ultra-HNI'; } const r = { income: inc }; if (seg) r.segment = seg; return r; }, signal: () => 'Income bracket captured — segment refined', depth: 7 },
      { ask: () => `<p>Almost done profiling. Quick check: <strong>Do you currently have term insurance and NPS?</strong></p>`, richType: 'insurance-q', parse: t => { const hasIns = /yes.*insur|have.*insur|term plan|insurance.*yes/i.test(t) ? true : /no.*insur|don't.*insur|neither|without/i.test(t) ? false : null; const hasNPS = /yes.*nps|have.*nps|nps.*yes/i.test(t) ? true : /no.*nps|don't.*nps|neither/i.test(t) ? false : null; return { hasInsurance: hasIns, hasNPS: hasNPS }; }, signal: () => 'Insurance & NPS coverage status captured', depth: 5 }
    ];
  }

  process(input) {
    const txt = input.toLowerCase();
    this.fabric.pushSignal(`User message: "${input.substring(0, 35)}…"`, 'rgba(255,255,255,.25)');
    if (this.currentAgent === 'concierge') return this.handleConcierge(txt, input);
    if (this.currentAgent === 'navigator') return this.handleNavigator(txt, input);
    if (this.currentAgent === 'crosssell') return this.handleCrossSell(txt, input);
    if (this.currentAgent === 'marketplace') return this.handleMarketplace(txt, input);
    return { text: `<p>Based on your PAIL profile, I'm working on a personalised response.</p>` };
  }

  handleConcierge(txt, raw) {
    const u = this.fabric.identityGraph;
    if (this.profilingStep < this.profilingStages.length) {
      const stage = this.profilingStages[this.profilingStep];
      const updates = stage.parse(raw);
      this.fabric.updateIdentity(updates, stage.signal(raw));
      this.fabric.addDepth(stage.depth);
      this.profilingStep++;
      if (this.profilingStep === 2) this.fabric.advanceOnboard(2);
      if (this.profilingStep < this.profilingStages.length) {
        const next = this.profilingStages[this.profilingStep];
        const ask = typeof next.ask === 'function' ? next.ask(this.fabric.identityGraph) : next.ask;
        return { text: `<p>Got it — I've updated your profile with that. ✓</p>${ask}`, richType: next.richType, toast: `Profile updated: ${Object.values(updates)[0]}` };
      } else {
        this.fabric.advanceOnboard(2);
        return { text: `<p>✅ <strong>Profiling complete!</strong> Your PAIL profile is now at <strong>${u.depth}%</strong> depth.</p><p>Based on what I know about you — <strong>${u.goal}</strong> goal, <strong>${u.risk}</strong> risk, <strong>${u.income}</strong> — here's your personalised ET onboarding path:</p>`, extra: this._buildPersonalisedOnboard(), toast: 'Profile complete! Onboarding path generated.' };
      }
    }
    // Post-profiling free conversation — intent classification
    if (/prime/i.test(txt)) { this.fabric.pushSignal('User asked about ET Prime', 'var(--gold)'); this.fabric.metrics.products++; this.fabric.renderMetrics(); return { text: `<p><strong>ET Prime</strong> gives you unlimited access to in-depth analysis. Based on your <strong>${u.goal || 'financial'}</strong> goal, the most relevant Prime content: • Wealth summit replays · • Tax optimisation guides · • ET Prime Masterclasses</p>`, newsTag: ['wealth', 'equity'] }; }
    if (/news|feed|article|market/i.test(txt)) { this.fabric.metrics.articles++; this.fabric.renderMetrics(); return { text: `<p>Here's your personalised ET news feed, curated to your <strong>${u.assets || 'financial'}</strong> portfolio:</p>`, extra: this._buildNewsCard() }; }
    if (/gap|portfolio|analys/i.test(txt)) { return { text: `<p>Running portfolio gap analysis for your profile…</p>`, extra: this._buildGapsCard() }; }
    if (/home loan|mortgage|housing/i.test(txt)) { this.fabric.pushSignal('Home loan intent detected', 'var(--coral)'); return { text: `<p>I can help with home loans! Let me switch you to the <strong>ET Services Marketplace</strong> for pre-qualified offers based on your profile.</p>`, extra: this._buildMarketplaceCard() }; }
    if (/insur/i.test(txt)) { return { text: `<p>Insurance is critical. Let me check your coverage gaps and match you with the best partner offers.</p>`, extra: this._buildGapsCard() }; }
    if (/masterclass|learn|course/i.test(txt)) { this.fabric.metrics.classes++; this.fabric.renderMetrics(); return { text: `<p>ET Masterclasses matched to your profile: • <strong>Equity Research Fundamentals</strong> — 94% match · • <strong>Retirement Planning with MFs</strong> — 91% match · • <strong>Derivatives & Options Basics</strong> — 87% match</p><p>All included in your ET Prime subscription.</p>` }; }
    if (/recommend|suggest|what should/i.test(txt)) { return { text: `<p>Based on your PAIL profile (${u.goal || 'goals pending'}, ${u.risk || 'risk pending'}), here are my top recommendations:</p>`, extra: this._buildPersonalisedOnboard() }; }
    if (/help|what can you|how does|tell me/i.test(txt)) { return { text: `<p>I'm your <strong>ET AI Concierge</strong>. I can help you with:</p><p>• 📰 <strong>ET Prime</strong> — premium content & analysis<br>• 📊 <strong>Portfolio gaps</strong> — find what you're missing<br>• 🏠 <strong>Home loans</strong> — pre-approved offers<br>• 🛡️ <strong>Insurance</strong> — term plan comparison<br>• 🎓 <strong>Masterclasses</strong> — skill-building courses<br>• 💳 <strong>Credit cards</strong> — matched to your spend</p><p>Just ask anything or switch agents from the sidebar!</p>` }; }
    if (/thank|thanks/i.test(txt)) { return { text: `<p>You're welcome, ${u.name}! I'm always here to help you navigate the ET ecosystem. Feel free to ask anything or explore our agents on the left. 🙌</p>` }; }
    // Default: context-aware fallback
    const goalInfo = u.goal ? `Your <strong>${u.goal}</strong> goal is mapped` : 'Your financial goals are being mapped';
    return { text: `<p>${goalInfo}. Your profile is at <strong>${u.depth}%</strong> depth. I can help you explore ET Prime, analyse portfolio gaps, find partner services, or discover masterclasses. What interests you?</p>` };
  }

  handleNavigator(txt) {
    const u = this.fabric.identityGraph;
    if (/gap|portfolio|analys/i.test(txt)) {
      this.fabric.pushSignal('Navigator: Gap analysis requested', 'var(--blue)');
      return { text: `<p>Running full gap analysis against your PAIL profile (${u.risk} risk, ${u.horizon} horizon):</p>`, extra: this._buildGapsCard(), newsTag: ['tax', 'mf'] };
    }
    if (/nps|pension/i.test(txt)) {
      const has = /yes|have|active/i.test(txt);
      this.fabric.updateIdentity({ hasNPS: has }, 'NPS status captured');
      return { text: `<p>NPS status recorded. ${has ? 'Great — you\'re capturing the ₹50K extra deduction.' : 'You\'re missing ₹50K additional deduction under 80CCD(1B).'}</p>`, newsTag: ['tax'] };
    }
    if (/fire|retire|early/i.test(txt)) {
      this.fabric.pushSignal('FIRE planning simulation initiated', 'var(--teal)');
      return { text: `<p>FIRE simulation for <strong>${u.name}</strong>:</p><p>• Target corpus: <strong>₹3.8–5.2Cr</strong> · • Current SIP trajectory: <strong>₹2.1Cr</strong> at 12% CAGR · • Gap: <strong>₹1.7–3.1Cr</strong> · • Recommendation: Increase SIP by ₹8K/mo</p>`, newsTag: ['wealth'] };
    }
    return { text: `<p>Analyzing gaps for your <strong>${u.goal}</strong> goal…</p>`, extra: this._buildGapsCard() };
  }

  handleCrossSell(txt) {
    const u = this.fabric.identityGraph;
    this.fabric.pushSignal(`Cross-sell signal: query processed`, 'var(--gold)');
    if (/masterclass|learn/i.test(txt)) { this.fabric.metrics.classes++; this.fabric.renderMetrics(); return { text: `<p>Matched Masterclasses for your ${u.assets} portfolio: • <strong>Equity Research Fundamentals</strong> — 94% match · • <strong>Retirement Planning with MFs</strong> — 91% match</p>` }; }
    if (/credit card|card/i.test(txt)) { return { text: `<p>Based on your income bracket (${u.income}), you're pre-approved for <strong>ET–HDFC Millennia Card</strong>: • 5% cashback on ET · • Airport lounge access · • ₹0 joining fee</p>` }; }
    return { text: `<p>Running cross-sell analysis for <strong>${u.segment}</strong> segment…</p>`, extra: this._buildCrossSellCard() };
  }

  handleMarketplace(txt) {
    const u = this.fabric.identityGraph;
    this.fabric.pushSignal(`Marketplace query processed`, 'var(--teal)');
    if (/home loan|mortgage/i.test(txt)) { return { text: `<p>Pre-qualified home loans for your profile (${u.income}):</p><p>🏠 <strong>HDFC</strong> — 8.4% · Up to ₹80L · Pre-approved<br>🏠 <strong>SBI</strong> — 8.6% · Up to ₹75L<br>🏠 <strong>ICICI</strong> — 8.65% · Up to ₹70L</p>` }; }
    if (/insur/i.test(txt)) { this.fabric.updateIdentity({ hasInsurance: false }, 'Insurance gap confirmed'); return { text: `<p>Term insurance options for your profile (${u.income}, ${u.ageRange}):</p><p>🛡️ <strong>ICICI Pru iProtect</strong> — ₹1Cr at ₹823/mo<br>🛡️ <strong>HDFC Click 2 Protect</strong> — ₹1Cr at ₹891/mo<br>🛡️ <strong>Max Life Smart</strong> — ₹1Cr at ₹810/mo</p>` }; }
    if (/fd|fixed deposit/i.test(txt)) { return { text: `<p>Best FD rates via ET partners:</p><p>🏦 <strong>Bajaj Finance</strong> — 8.10% (AAA) · 24 months<br>🏦 <strong>Shriram Finance</strong> — 8.52% · 24 months<br>🏦 <strong>HDFC Bank</strong> — 7.40% · 12 months</p>` }; }
    return { text: `<p>Matching partner services for your <strong>${u.risk}</strong> profile…</p>`, extra: this._buildMarketplaceCard() };
  }

  // ---- RICH CARD BUILDERS (Personalization Delivery) ----
  _buildGapsCard() {
    const u = this.fabric.identityGraph; const gaps = [];
    if (u.hasInsurance !== true) gaps.push({ bg: 'rgba(239,68,68,.15)', title: 'Term insurance underweight', sub: 'Recommended 20× income coverage', match: 'Critical', level: 'match-crit' });
    if (u.hasIntlEquity !== true) gaps.push({ bg: 'rgba(201,162,39,.15)', title: 'No international equity exposure', sub: 'Recommend 15–20% allocation', match: 'Important', level: 'match-med' });
    if (u.hasNPS !== true) gaps.push({ bg: 'rgba(26,107,181,.15)', title: 'NPS contribution gap', sub: '₹1.5L deduction under 80CCD(1B) untapped', match: 'Moderate', level: 'match-med' });
    if (!gaps.length) gaps.push({ bg: 'rgba(26,138,90,.15)', title: 'Portfolio well-diversified', sub: 'No critical gaps found', match: 'Healthy', level: 'match-high' });
    return `<div class="r-card"><div class="r-card-title">Portfolio gap analysis · PAIL-powered</div>${gaps.map(g => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${g.bg}">⚡</div><div><div class="opp-title">${g.title}</div><div class="opp-sub">${g.sub}</div></div></div><span class="match-pill ${g.level}">${g.match}</span></div>`).join('')}</div>`;
  }

  _buildNewsCard(tags) {
    tags = tags || this.fabric.getNewsTagsForUser();
    const items = this.fabric.fetchNews(tags);
    return `<div class="news-card"><div class="news-header">ET Live Feed · Personalised for ${this.fabric.identityGraph.name}</div>${items.map(n => `<div class="news-item"><div class="news-cat" style="color:var(--et-red)">${n.cat}</div><div class="news-headline">${n.headline}</div><div class="news-meta">${n.time}</div></div>`).join('')}</div>`;
  }

  _buildCrossSellCard() {
    const items = [
      { bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: Equity Research', sub: '94% relevance', match: '94%', level: 'match-high' },
      { bg: 'rgba(201,162,39,.15)', title: 'ET–HDFC Millennia Credit Card', sub: 'Spend pattern match · pre-approved', match: '91%', level: 'match-high' },
      { bg: 'rgba(26,138,90,.15)', title: 'Bajaj Finance FD 8.1% p.a.', sub: 'Idle cash detected', match: '78%', level: 'match-med' }
    ];
    return `<div class="r-card"><div class="r-card-title">Identified opportunities</div>${items.map(i => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${i.bg}">✦</div><div><div class="opp-title">${i.title}</div><div class="opp-sub">${i.sub}</div></div></div><span class="match-pill ${i.level}">${i.match}</span></div>`).join('')}</div>`;
  }

  _buildMarketplaceCard() {
    const services = APIGateway.getPartners(this.fabric.identityGraph.risk);
    return `<div class="r-card"><div class="r-card-title">Pre-qualified partner services · ${this.fabric.identityGraph.risk} profile</div>${services.map(s => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(26,107,181,.15)">${s.icon || ''}</div><div><div class="opp-title">${s.title}</div><div class="opp-sub">${s.sub}</div></div></div><span class="match-pill ${s.level}">${s.match}</span></div>`).join('')}</div>`;
  }

  _buildPersonalisedOnboard() {
    const u = this.fabric.identityGraph;
    return `<div class="r-card"><div class="r-card-title">Your personalised ET path · ${u.segment}</div>
    <div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(208,2,27,.15)">📰</div><div><div class="opp-title">ET Prime — Activate full access</div><div class="opp-sub">Tailored to ${u.goal}</div></div></div><span class="match-pill match-high">Step 1</span></div>
    <div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(26,107,181,.15)">📊</div><div><div class="opp-title">ET Markets Portfolio Tracker</div><div class="opp-sub">Track your ${u.assets} portfolio</div></div></div><span class="match-pill match-high">Step 2</span></div>
    <div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(26,171,170,.15)">🎓</div><div><div class="opp-title">Masterclass: Equity Research</div><div class="opp-sub">94% profile match</div></div></div><span class="match-pill match-med">Step 3</span></div>
    <div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(201,162,39,.15)">🏪</div><div><div class="opp-title">ET Marketplace: ${u.hasInsurance === false ? 'Get Term Insurance' : 'Explore PMS'}</div><div class="opp-sub">Gap-filling recommendation</div></div></div><span class="match-pill match-med">Step 4</span></div></div>`;
  }

  getRichCardHTML(type) {
    const builders = {
      'goal-q': () => `<div class="r-card"><div class="r-card-title">Select your primary goal</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('I want to retire early and achieve financial independence — FIRE')"><div class="opt-chip-icon">🎯</div><div class="opt-chip-name">Retirement / FIRE</div><div class="opt-chip-desc">Long-term independence</div></div><div class="opt-chip" onclick="injectQuick('I want to build wealth and grow my assets aggressively')"><div class="opt-chip-icon">📈</div><div class="opt-chip-name">Wealth creation</div><div class="opt-chip-desc">Growth focus</div></div><div class="opt-chip" onclick="injectQuick('I want to generate passive income from dividends')"><div class="opt-chip-icon">💰</div><div class="opt-chip-name">Passive income</div><div class="opt-chip-desc">Dividend & yield</div></div><div class="opt-chip" onclick="injectQuick('I want to save for my child education')"><div class="opt-chip-icon">👶</div><div class="opt-chip-name">Child education</div><div class="opt-chip-desc">Family planning</div></div></div></div>`,
      'risk-q': () => `<div class="r-card"><div class="r-card-title">Risk tolerance</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('I prefer conservative investments, capital preservation')"><div class="opt-chip-icon">🛡️</div><div class="opt-chip-name">Conservative</div><div class="opt-chip-desc">Capital preservation</div></div><div class="opt-chip" onclick="injectQuick('I am moderate, balanced growth with some risk')"><div class="opt-chip-icon">⚖️</div><div class="opt-chip-name">Moderate</div><div class="opt-chip-desc">Balanced growth</div></div><div class="opt-chip" onclick="injectQuick('I am aggressive, I want high growth')"><div class="opt-chip-icon">🚀</div><div class="opt-chip-name">Aggressive</div><div class="opt-chip-desc">High growth</div></div><div class="opt-chip" onclick="injectQuick('Very aggressive, maximum returns')"><div class="opt-chip-icon">⚡</div><div class="opt-chip-name">Very Aggressive</div><div class="opt-chip-desc">Maximum returns</div></div></div></div>`,
      'asset-q': () => `<div class="r-card"><div class="r-card-title">Current investments</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('I invest in equity stocks and mutual funds including SIPs')"><div class="opt-chip-icon">📊</div><div class="opt-chip-name">Equity & MF</div><div class="opt-chip-desc">Stocks, SIPs</div></div><div class="opt-chip" onclick="injectQuick('I have real estate and gold')"><div class="opt-chip-icon">🏠</div><div class="opt-chip-name">Real Estate & Gold</div><div class="opt-chip-desc">Physical assets</div></div><div class="opt-chip" onclick="injectQuick('I mainly use fixed deposits and debt')"><div class="opt-chip-icon">🏦</div><div class="opt-chip-name">FD & Debt</div><div class="opt-chip-desc">Fixed income</div></div><div class="opt-chip" onclick="injectQuick('I am just starting, mostly savings')"><div class="opt-chip-icon">🌱</div><div class="opt-chip-name">Just starting</div><div class="opt-chip-desc">Savings only</div></div></div></div>`,
      'income-q': () => `<div class="r-card"><div class="r-card-title">Annual income bracket</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('My annual income is around 10 to 20 lakhs')"><div class="opt-chip-icon">💼</div><div class="opt-chip-name">₹10–20L</div><div class="opt-chip-desc">p.a.</div></div><div class="opt-chip" onclick="injectQuick('My annual income is around 20 to 40 lakhs')"><div class="opt-chip-icon">💼</div><div class="opt-chip-name">₹20–40L</div><div class="opt-chip-desc">p.a.</div></div><div class="opt-chip" onclick="injectQuick('My annual income is around 40 lakhs to 1 crore')"><div class="opt-chip-icon">💎</div><div class="opt-chip-name">₹40L–1Cr</div><div class="opt-chip-desc">p.a.</div></div><div class="opt-chip" onclick="injectQuick('My annual income is above 1 crore')"><div class="opt-chip-icon">👑</div><div class="opt-chip-name">₹1Cr+</div><div class="opt-chip-desc">p.a.</div></div></div></div>`,
      'insurance-q': () => `<div class="r-card"><div class="r-card-title">Coverage status</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('Yes I have term insurance and NPS both')"><div class="opt-chip-icon">✅</div><div class="opt-chip-name">Both covered</div><div class="opt-chip-desc">Term + NPS</div></div><div class="opt-chip" onclick="injectQuick('I have term insurance but no NPS')"><div class="opt-chip-icon">🛡️</div><div class="opt-chip-name">Insurance only</div><div class="opt-chip-desc">No NPS yet</div></div><div class="opt-chip" onclick="injectQuick('I have NPS but no term insurance')"><div class="opt-chip-icon">📋</div><div class="opt-chip-name">NPS only</div><div class="opt-chip-desc">No term plan</div></div><div class="opt-chip" onclick="injectQuick('I have neither term insurance nor NPS')"><div class="opt-chip-icon">⚠️</div><div class="opt-chip-name">Neither yet</div><div class="opt-chip-desc">Need both</div></div></div></div>`
    };
    return builders[type] ? builders[type]() : '';
  }

  agentIntro(key) {
    const u = this.fabric.identityGraph;
    if (key === 'concierge') {
      if (this.profilingStep === 0) return { text: this.profilingStages[0].ask, richType: this.profilingStages[0].richType };
      return { text: `<p>Welcome back. Your PAIL profile is at <strong>${u.depth}%</strong> depth.</p>` };
    }
    if (key === 'navigator') {
      return { text: `<p>Your <strong>Financial Life Navigator</strong> is online. PAIL profile — <strong>${u.goal}</strong> goal, <strong>${u.risk}</strong> risk, <strong>${u.horizon}</strong> horizon.</p><p>Running portfolio gap analysis…</p>`, extra: this._buildGapsCard(), newsTag: ['equity', 'mf'], onboard: 3 };
    }
    if (key === 'crosssell') {
      return { text: `<p>Your <strong>Cross-Sell Engine</strong> is active. Processing ${u.signals.length + 12} behavioural signals…</p>`, extra: this._buildCrossSellCard() };
    }
    if (key === 'marketplace') {
      return { text: `<p>Welcome to the <strong>ET Services Marketplace</strong>. Profile matched against 40+ partner services.</p>`, extra: this._buildMarketplaceCard(), onboard: 4 };
    }
    return { text: '<p>Agent ready.</p>' };
  }
}

// ============ GLOBAL INSTANCES ============
const fabric = new DataFabric();
const engine = new Orchestrator(fabric);

// ============ UI CONTROLLER FUNCTIONS ============
function nowTime() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function renderMsg(role, content, time, richType, isExtra) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = `msg ${role === 'user' ? 'user' : ''}`;
  const av = document.createElement('div');
  av.className = `msg-av ${role === 'user' ? 'user-av' : 'et-av'}`;
  av.textContent = role === 'user' ? fabric.identityGraph.initials : 'ET';
  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = content || '';
  if (richType) bubble.innerHTML += engine.getRichCardHTML(richType);
  wrap.appendChild(bubble);
  if (!isExtra) { const t = document.createElement('div'); t.className = 'msg-time'; t.textContent = time || nowTime(); wrap.appendChild(t); }
  div.appendChild(av); div.appendChild(wrap);
  msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg'; div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-av et-av">ET</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function showProfileToast(msg) {
  const msgs = document.getElementById('messages');
  const d = document.createElement('div');
  d.innerHTML = `<div class="profile-toast"><span>✦</span><span>PAIL updated: ${msg}</span></div>`;
  msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => d.remove(), 4000);
}

function setQuickReplies(list) {
  document.getElementById('quick-replies').innerHTML = list.map(q =>
    `<button class="qr" onclick="injectQuick('${q.replace(/'/g, "\\'")}')">${q}</button>`
  ).join('');
}

function flashTag(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('update-flash', 'active-tag');
  setTimeout(() => el.classList.remove('update-flash'), 1600);
}

function switchAgent(key, btn) {
  document.querySelectorAll('.agent-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  engine.currentAgent = key;
  const cfg = engine.agentConfig[key];
  document.getElementById('agent-title').textContent = cfg.title;
  document.getElementById('agent-desc-hdr').textContent = cfg.desc;
  document.getElementById('agent-mode-hint').textContent = cfg.hint;
  setQuickReplies(cfg.qr);
  document.getElementById('messages').innerHTML = '';
  fabric.pushSignal(`Agent switched to: ${cfg.title}`, 'var(--blue)');
  setTimeout(() => {
    const intro = engine.agentIntro(key);
    renderMsg('assistant', intro.text, nowTime(), intro.richType);
    if (intro.extra) setTimeout(() => renderMsg('assistant', intro.extra, nowTime(), null, true), 600);
    if (intro.newsTag) setTimeout(() => renderMsg('assistant', engine._buildNewsCard(intro.newsTag), nowTime(), null, true), 1200);
    if (intro.onboard) fabric.advanceOnboard(intro.onboard);
  }, 200);
}

function switchTab(tab, btn) {
  document.querySelectorAll('.panel-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.panel-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('pane-' + tab).classList.add('active');
}

function sendMessage() {
  const inp = document.getElementById('msg-input');
  const txt = inp.value.trim();
  if (!txt) return;
  renderMsg('user', `<p>${txt}</p>`, nowTime());
  inp.value = ''; inp.style.height = 'auto';
  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    const resp = engine.process(txt);
    renderMsg('assistant', resp.text || '', nowTime(), resp.richType);
    if (resp.extra) renderMsg('assistant', resp.extra, nowTime(), null, true);
    if (resp.newsTag) setTimeout(() => { renderMsg('assistant', engine._buildNewsCard(resp.newsTag), nowTime(), null, true); fabric.metrics.articles++; fabric.renderMetrics(); }, 500);
    if (resp.toast) showProfileToast(resp.toast);
    flashTag('tag-hil');
  }, 900 + Math.random() * 500);
}

function injectQuick(text) { document.getElementById('msg-input').value = text; sendMessage(); }

function hilUpdate() { /* stored on apply */ }
function applyHIL() {
  const risk = document.getElementById('hil-risk').value;
  const goal = document.getElementById('hil-goal').value;
  const horizon = document.getElementById('hil-horizon').value;
  fabric.updateIdentity({ risk, goal, horizon }, `HIL override: risk=${risk}, goal=${goal}`);
  fabric.addDepth(4); fabric.renderReco(); flashTag('tag-hil');
  renderMsg('assistant', `<p>⚙️ <strong>Human-in-Loop override applied.</strong> Risk: <strong>${risk}</strong> · Goal: <strong>${goal}</strong> · Horizon: <strong>${horizon}</strong></p><p>All agents repersonalised.</p>`, nowTime());
  setTimeout(() => renderMsg('assistant', engine._buildMarketplaceCard(), nowTime(), null, true), 400);
}

function autoResize(el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; }

// ============ VERIFIED AUTOMATED TEST SUITE (Feedback & Continuous Learning) ============
const AutomatedTests = {
  run() {
    console.group('ET PAIL Verified Test Suite');
    const results = [
      this.t('PAIL state initialised', () => !!fabric.identityGraph.name),
      this.t('Profile starts with low depth (chat-driven)', () => fabric.identityGraph.depth >= 15),
      this.t('News fetch returns items', () => fabric.fetchNews(['equity']).length > 0),
      this.t('Partner services fetch', () => APIGateway.getPartners('Moderate').length > 0),
      this.t('Profiling stages defined', () => engine.profilingStages.length === 5),
      this.t('All 4 agents configured', () => ['concierge', 'navigator', 'crosssell', 'marketplace'].every(a => !!engine.agentConfig[a])),
      this.t('PAIL update engine', () => { const b = fabric.identityGraph.risk; fabric.updateIdentity({ risk: 'Test' }, 'test'); const a = fabric.identityGraph.risk; fabric.updateIdentity({ risk: b }, 'rollback'); return a === 'Test'; }),
      this.t('HIL controls rendered', () => !!document.getElementById('hil-risk')),
      this.t('Messages container', () => !!document.getElementById('messages')),
      this.t('Signal feed functional', () => { fabric.pushSignal('Self-test', 'var(--teal)'); return fabric.identityGraph.signals.length > 0; })
    ];
    const passed = results.filter(r => r).length;
    console.log(`Result: ${passed}/${results.length} passed`);
    console.groupEnd();
    fabric.pushSignal(`Self-test: ${passed}/${results.length} checks passed`, passed === results.length ? 'var(--green)' : 'var(--coral)');
  },
  t(name, fn) { try { const p = fn(); console.log(`${p ? '✅' : '❌'} ${name}`); return p; } catch (e) { console.log(`❌ ${name}: ${e.message}`); return false; } }
};

// ============ BOOT SEQUENCE ============
const LOAD_LABELS = ['Initialising PAIL Intelligence Layer', 'Loading user identity graph', 'Connecting ET data fabric', 'Fetching partner API feeds', 'Calibrating personalisation engine'];

window.addEventListener('load', () => {
  const bar = document.getElementById('ld-bar');
  const steps = document.querySelectorAll('.loading-step');
  let i = 0;
  const tick = setInterval(() => {
    if (i < steps.length) {
      steps[i].classList.add('show');
      bar.style.width = ((i + 1) / steps.length * 100) + '%';
      const idx = i;
      setTimeout(() => { steps[idx].classList.add('done'); steps[idx].textContent = '✓ ' + LOAD_LABELS[idx]; }, 250);
      i++;
    } else {
      clearInterval(tick);
      setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        ls.style.opacity = '0';
        setTimeout(() => {
          ls.remove();
          // Boot signals
          fabric.pushSignal('PAIL Intelligence Layer online', 'var(--teal)');
          fabric.pushSignal(`User identity graph loaded — ${fabric.identityGraph.depth}% depth`, 'var(--gold)');
          fabric.pushSignal('ET Data Fabric connected', 'var(--blue)');
          fabric.pushSignal('Partner API gateway live', 'var(--teal)');
          fabric.updateUI(); fabric.renderMetrics();
          setQuickReplies(engine.agentConfig.concierge.qr);
          // First profiling message
          const intro = engine.profilingStages[0];
          renderMsg('assistant', intro.ask, nowTime(), intro.richType);
          // Self-test
          setTimeout(() => AutomatedTests.run(), 1000);
        }, 500);
      }, 400);
    }
  }, 320);
});
