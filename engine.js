/**
 * PAIL v3.0 — ET AI Concierge Engine
 * Architecture: DataFabric → Orchestrator → APIGateway
 * Focus: ET Ecosystem Navigation & Intelligent Recommendations
 */

// ============ DATA FABRIC (ET Data Fabric Layer) ============
class DataFabric {
  constructor() {
    this.identityGraph = {
      name: null, initials: null, segment: null,
      ageRange: null, risk: null, income: null,
      goal: null, horizon: null,
      assets: null, products: null,
      sipCapacity: null, hasInsurance: null, hasNPS: null,
      hasIntlEquity: null, depth: 0, completedSteps: [],
      signals: [],
      preferences: {
        contentInterests: [],
        learningTopics: [],
        financialPriorities: []
      }
    };

    this.metrics = {
      products: 0,
      articles: 0,
      classes: 0,
      opportunities: 0,
      interactions: 0
    };

    // Portfolio data store — manual entry only
    this.portfolio = {
      holdings: [],        // { name, type, value, sipAmount, source }
      totalSIP: 0,
      totalValue: 0,
      assetAllocation: {}, // { equity: %, mf: %, debt: %, gold: % }
      investmentExp: null,  // 'beginner' | 'intermediate' | 'advanced'
      lastUpdated: null
    };

    this.onboardSteps = [
      'Basic profile complete',
      'ET Prime discovery',
      'Financial goals mapped',
      'Portfolio analysis',
      'Partner services matched',
      'Personalisation calibrated'
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
    const fields = ['name', 'goal', 'risk', 'income', 'assets', 'hasInsurance', 'hasNPS', 'ageRange', 'horizon'];
    const filled = fields.filter(f => u[f] !== null && u[f] !== undefined).length;
    u.depth = Math.min(95, Math.round(filled / fields.length * 95));

    this.updateUI();
    this.pushSignal(label || 'Profile field updated', 'var(--gold)');

    // Update recommendations based on new data
    this.renderReco();
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

  // Portfolio Management Methods
  addHolding(holding) {
    this.portfolio.holdings.push({
      ...holding,
      addedDate: new Date().toISOString(),
      source: 'manual'
    });
    this.updatePortfolioMetrics();
    this.pushSignal(`Added: ${holding.name} to portfolio`, 'var(--teal)');
  }

  editHolding(index, updates) {
    if (index >= 0 && index < this.portfolio.holdings.length) {
      this.portfolio.holdings[index] = { ...this.portfolio.holdings[index], ...updates };
      this.updatePortfolioMetrics();
      this.pushSignal(`Updated: ${updates.name || 'Holding'} modified`, 'var(--gold)');
      return true;
    }
    return false;
  }

  deleteHolding(index) {
    if (index >= 0 && index < this.portfolio.holdings.length) {
      const removed = this.portfolio.holdings[index];
      this.portfolio.holdings.splice(index, 1);
      this.updatePortfolioMetrics();
      this.pushSignal(`Removed: ${removed.name} from portfolio`, 'var(--coral)');
      return true;
    }
    return false;
  }

  updatePortfolioMetrics() {
    this.portfolio.totalSIP = this.portfolio.holdings.reduce((s, h) => s + (h.sipAmount || 0), 0);
    this.portfolio.totalValue = this.portfolio.holdings.reduce((s, h) => s + (h.value || 0), 0);

    // Calculate asset allocation
    const alloc = { equity: 0, mf: 0, debt: 0, other: 0 };
    this.portfolio.holdings.forEach(h => {
      if (h.type === 'Stock') alloc.equity += h.value;
      else if (h.type === 'MF') alloc.mf += h.value;
      else if (h.type === 'Debt') alloc.debt += h.value;
      else alloc.other += h.value;
    });

    const total = Object.values(alloc).reduce((a, b) => a + b, 0) || 1;
    this.portfolio.assetAllocation = {
      equity: Math.round(alloc.equity / total * 100),
      mf: Math.round(alloc.mf / total * 100),
      debt: Math.round(alloc.debt / total * 100),
      other: Math.round(alloc.other / total * 100)
    };

    // Derive investment experience
    const holdingCount = this.portfolio.holdings.length;
    this.portfolio.investmentExp = holdingCount > 6 ? 'advanced' : holdingCount > 2 ? 'intermediate' : 'beginner';
    this.portfolio.lastUpdated = new Date().toISOString();

    // Update identity graph
    const assetTypes = [...new Set(this.portfolio.holdings.map(h => h.type))];
    if (assetTypes.length) {
      this.updateIdentity({ assets: assetTypes.join(', ') }, 'Portfolio data integrated');
    }

    this.renderMetrics();
  }

  // ET Ecosystem Methods
  getETPrimeRecommendations() {
    const u = this.identityGraph;
    const recommendations = [];

    if (u.goal === 'Retirement / FIRE') {
      recommendations.push({
        title: "The Ultimate FIRE Guide: How to Retire by 45",
        type: "ET Prime Exclusive",
        relevance: 98,
        url: "/et-prime/fire-guide",
        description: "Deep-dive into early retirement strategies with real case studies"
      });
    }

    if (u.risk === 'Aggressive') {
      recommendations.push({
        title: "High-Growth Portfolio: 10 Stocks to Watch in 2026",
        type: "ET Prime Research",
        relevance: 95,
        url: "/et-prime/high-growth-stocks",
        description: "Expert analysis on high-conviction investment opportunities"
      });
    }

    if (u.hasInsurance === false) {
      recommendations.push({
        title: "Insurance Deep Dive: Why Term Insurance is Non-Negotiable",
        type: "ET Prime Guide",
        relevance: 92,
        url: "/et-prime/insurance-guide",
        description: "Comprehensive guide to protecting your family's financial future"
      });
    }

    recommendations.push({
      title: "Budget 2026 Analysis: What It Means for Your Portfolio",
      type: "ET Prime Exclusive",
      relevance: 89,
      url: "/et-prime/budget-2026",
      description: "Expert breakdown of tax changes and investment implications"
    });

    return recommendations.slice(0, 3);
  }

  getMasterclassRecommendations() {
    const u = this.identityGraph;
    const masterclasses = [];

    if (u.assets && /equity|stock/i.test(u.assets)) {
      masterclasses.push({
        title: "Equity Research Masterclass",
        instructor: "Ramesh Damani",
        level: "Intermediate",
        relevance: 96,
        url: "/masterclass/equity-research",
        description: "Learn to analyze stocks like a pro"
      });
    }

    if (u.goal === 'Retirement / FIRE') {
      masterclasses.push({
        title: "FIRE Movement Masterclass",
        instructor: "Deepak Shenoy",
        level: "Advanced",
        relevance: 94,
        url: "/masterclass/fire-planning",
        description: "Strategic planning for financial independence"
      });
    }

    if (u.hasNPS === false) {
      masterclasses.push({
        title: "Tax Optimization Masterclass",
        instructor: "Sudhir Kaushik",
        level: "Beginner",
        relevance: 91,
        url: "/masterclass/tax-planning",
        description: "Save up to ₹1.5L in taxes legally"
      });
    }

    masterclasses.push({
      title: "Personal Finance 101",
      instructor: "Monika Halan",
      level: "Beginner",
      relevance: 88,
      url: "/masterclass/personal-finance",
      description: "Build a strong financial foundation"
    });

    return masterclasses.slice(0, 3);
  }

  getMarketInsights() {
    const u = this.identityGraph;
    const insights = [];

    if (u.risk === 'Aggressive') {
      insights.push({
        title: "Markets at New High: Should You Book Profits?",
        source: "ET Markets",
        summary: "Expert views on market momentum and profit-booking strategies",
        url: "/markets/profit-booking",
        tag: "Market Outlook"
      });
    }

    if (u.goal === 'Passive income') {
      insights.push({
        title: "Dividend Stocks: Top 10 High-Yield Picks",
        source: "ET Wealth",
        summary: "Generate steady passive income with these dividend gems",
        url: "/wealth/dividend-stocks",
        tag: "Income Strategy"
      });
    }

    insights.push({
      title: u.assets && /mf|mutual/i.test(u.assets)
        ? "SIP Inflows Hit Record ₹27,000 Cr: Best Performing Funds"
        : "Nifty 50 Technical Outlook: Key Levels to Watch",
      source: "ET Markets",
      summary: u.assets && /mf|mutual/i.test(u.assets)
        ? "Top 5 mutual funds with 20%+ returns in 3 years"
        : "Bullish momentum continues with support at 24,800",
      url: "/markets/daily-outlook",
      tag: "Market Update"
    });

    return insights;
  }

  getPartnerOffers() {
    const u = this.identityGraph;
    const offers = [];

    if (u.hasInsurance === false) {
      offers.push({
        title: "Term Insurance at ₹823/month",
        partner: "ICICI Prudential",
        benefit: "₹1Cr coverage",
        relevance: 96,
        url: "/marketplace/term-insurance",
        tag: "Critical Gap"
      });
    }

    if (u.income && u.income.includes('1Cr')) {
      offers.push({
        title: "Wealth Management PMS",
        partner: "Zerodha",
        benefit: "26.4% CAGR (3 years)",
        relevance: 92,
        url: "/marketplace/pms-zerodha",
        tag: "HNI Offer"
      });
    }

    if (u.goal === 'Child education') {
      offers.push({
        title: "Child Education Plan",
        partner: "HDFC Life",
        benefit: "Guaranteed returns + insurance cover",
        relevance: 90,
        url: "/marketplace/child-plan",
        tag: "Goal-Based"
      });
    }

    offers.push({
      title: u.income && u.income.includes('20-40L')
        ? "ET-HDFC Millennia Credit Card"
        : "ET-Axis Magnus Credit Card",
      partner: u.income && u.income.includes('20-40L') ? "HDFC Bank" : "Axis Bank",
      benefit: u.income && u.income.includes('20-40L')
        ? "5% cashback on ET, ₹0 joining fee"
        : "Airport lounge access, travel rewards",
      relevance: 85,
      url: "/marketplace/credit-cards",
      tag: "Exclusive Offer"
    });

    return offers;
  }

  // UI Render Methods
  updateUI() {
    const u = this.identityGraph;
    this._setFlash('p-name', u.name);
    this._setFlash('p-seg', u.segment);
    this._setFlash('p-age', u.ageRange);
    this._setFlash('p-risk', u.risk);
    this._setFlash('p-income', u.income);
    this._setFlash('p-goal', u.goal);
    this._setFlash('p-horizon', u.horizon);
    this._setFlash('p-assets', u.assets);
    this._setFlash('p-products', u.products);

    const d = u.depth;
    document.getElementById('p-comp-fill').style.width = d + '%';
    document.getElementById('p-comp-label').textContent = d + '%';
    document.getElementById('pail-score-chip').textContent = 'PAIL ' + d + '%';

    const avatarEl = document.getElementById('user-avatar-top');
    if (avatarEl) avatarEl.textContent = u.initials || '?';

    const primePill = document.getElementById('prime-pill');
    if (primePill) primePill.style.display = u.products && /prime/i.test(u.products) ? '' : 'none';

    this.renderSidebar();
    this.renderOnboard();
    this.renderReco();
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
        { icon: '🏦', title: 'Bajaj Finance FD — 8.1% p.a.', sub: 'Capital-safe · AAA rated · 24 months', match: '96%', level: 'match-high' },
        { icon: '🛡️', title: 'ICICI Pru Term Plan ₹1Cr', sub: '₹823/mo · Fills insurance gap', match: '93%', level: 'match-high' },
        { icon: '📊', title: 'SBI Debt Fund SIP', sub: 'Low-risk · ₹5K/mo min · 7.2% returns', match: '79%', level: 'match-med' }
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
      concierge: {
        title: 'ET Welcome Concierge',
        desc: 'Smart 3-min profiling · PAIL identity graph construction',
        hint: 'Welcome Concierge mode',
        qr: ['Tell me about ET Prime', 'What ET products suit me?', 'Show my financial gaps', 'I need a home loan', 'Recommend news for me']
      },
      navigator: {
        title: 'Financial Life Navigator',
        desc: 'Deep financial understanding · Goal mapping · Portfolio gap analysis',
        hint: 'Financial Navigator mode',
        qr: ['Analyse my portfolio gaps', 'Add investments manually', 'Show my roadmap', 'FIRE planning for me', 'Portfolio summary']
      },
      crosssell: {
        title: 'ET Cross-Sell Engine',
        desc: 'Behavioural trigger analysis · Right offer at the right moment',
        hint: 'Cross-Sell Engine mode',
        qr: ["What's best for my profile?", 'Show upsell opportunities', 'ET Masterclass match', 'Credit card for me', 'Insurance recommendations']
      },
      marketplace: {
        title: 'ET Services Marketplace',
        desc: 'Financial services concierge · Partner integrations live',
        hint: 'Services Marketplace mode',
        qr: ['Home loan options', 'Term insurance quotes', 'Wealth management PMS', 'Best FD rates now', 'Credit card comparison']
      }
    };

    this.profilingStages = [
      { ask: `<p>Namaste! 🙏 I'm your <strong>ET AI Concierge</strong>, powered by PAIL — ET's Persistent Adaptive Intelligence Layer.</p><p>ET has a massive ecosystem — <strong>ET Prime, ET Markets, Masterclasses, Wealth Summits, and Financial Services</strong>. Most users discover only 10% of what ET offers.</p><p>I'll be your personal guide. Let's start: <strong>What's your name?</strong></p>`, richType: null, parse: (t) => { const raw = t.trim().replace(/^(i'm|i am|my name is|this is|hey i'm|hi i'm|call me)\s*/i, '').replace(/[.!,].*$/, '').trim(); const name = raw.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') || 'User'; const parts = name.split(/\s+/); const initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase(); return { name, initials }; }, signal: () => 'User name captured' },
      { ask: p => `<p>Welcome, <strong>${p.name}</strong>! Great to have you here. 🎉</p><p><strong>What's your age range?</strong></p>`, richType: 'age-q', parse: t => { let age = '25–30'; if (/18|19|early 20|under 25|below 25|20.*25|18.*24/i.test(t)) age = '18–25'; else if (/25.*30|late 20|mid 20|26|27|28|29/i.test(t)) age = '25–30'; else if (/30.*35|early 30|31|32|33|34/i.test(t)) age = '30–35'; else if (/35.*40|late 30|36|37|38|39/i.test(t)) age = '35–40'; else if (/40.*50|40s|41|42|43|44|45/i.test(t)) age = '40–50'; else if (/50|above 50|over 50|senior|60/i.test(t)) age = '50+'; return { ageRange: age }; }, signal: () => 'Age range recorded' },
      { ask: p => `<p>Perfect, ${p.name}. Now let's understand your financial life so I can map you to the right ET products.</p><p><strong>What's your primary financial goal right now?</strong></p>`, richType: 'goal-q', parse: (t) => { let g = 'Wealth creation', s = 'HNI-Aspirant'; if (/retire|fire|independen/i.test(t)) { g = 'Retirement / FIRE'; s = 'FIRE-Seeker'; } else if (/child|educat/i.test(t)) { g = 'Child education'; s = 'Family-Planner'; } else if (/income|passive/i.test(t)) { g = 'Passive income'; s = 'Income-Seeker'; } else if (/preserve|safe|capital/i.test(t)) { g = 'Capital preservation'; s = 'Conservative-HNI'; } return { goal: g, segment: s }; }, signal: t => `Goal detected: ${/retire|fire/i.test(t) ? 'Retirement/FIRE' : 'Wealth creation'}` },
      { ask: p => `<p>Great — <strong>${p.goal}</strong> is a well-defined goal. What's your risk appetite?</p>`, richType: 'risk-q', parse: t => { let r = 'Moderate'; if (/conserv|safe|low/i.test(t)) r = 'Conservative'; else if (/moderate|balanced|medium/i.test(t)) r = 'Moderate'; else if (/very aggress|maximum/i.test(t)) r = 'Very Aggressive'; else if (/aggress|high|growth/i.test(t)) r = 'Aggressive'; return { risk: r }; }, signal: () => 'Risk profile updated' },
      { ask: () => `<p>Understood. <strong>What asset classes are you currently invested in?</strong></p><p class="hint-text">(Equity, Mutual Funds, Gold, Real Estate, FD/Debt)</p>`, richType: 'asset-q', parse: t => { let a = []; if (/equit|stock|share/i.test(t)) a.push('Equity'); if (/mutual|mf|fund|sip/i.test(t)) a.push('MF'); if (/gold/i.test(t)) a.push('Gold'); if (/real estate|property/i.test(t)) a.push('Real Estate'); if (/fd|fixed|debt|bond/i.test(t)) a.push('Debt/FD'); if (!a.length) a = ['Savings']; return { assets: a.join(', ') }; }, signal: () => 'Asset classes mapped' },
      { ask: () => `<p>Good diversification context. <strong>What is your approximate annual income bracket?</strong></p>`, richType: 'income-q', parse: t => { let inc = '₹10–20L p.a.', seg = null; if (/below 5|under 5/i.test(t)) inc = 'Below ₹5L p.a.'; else if (/5.*(10|ten)|10 lakh/i.test(t)) inc = '₹5–10L p.a.'; else if (/10.*(20|twenty)|15/i.test(t)) inc = '₹10–20L p.a.'; else if (/20.*(40|forty)|25|30/i.test(t)) { inc = '₹20–40L p.a.'; } else if (/40.*(1 cr|hundred)|50 lakh/i.test(t)) { inc = '₹40L–1Cr p.a.'; seg = 'HNI'; } else if (/1 cr|crore|above 1/i.test(t)) { inc = '₹1Cr+ p.a.'; seg = 'Ultra-HNI'; } const r = { income: inc }; if (seg) r.segment = seg; return r; }, signal: () => 'Income bracket captured — segment refined' },
      { ask: () => `<p>Almost done profiling. Quick check: <strong>Do you currently have term insurance and NPS?</strong></p>`, richType: 'insurance-q', parse: t => { const hasIns = /yes.*insur|have.*insur|term plan|insurance.*yes/i.test(t) ? true : /no.*insur|don't.*insur|neither|without/i.test(t) ? false : null; const hasNPS = /yes.*nps|have.*nps|nps.*yes/i.test(t) ? true : /no.*nps|don't.*nps|neither/i.test(t) ? false : null; return { hasInsurance: hasIns, hasNPS: hasNPS }; }, signal: () => 'Insurance & NPS coverage status captured' }
    ];
  }

  async process(input) {
    const txt = input.toLowerCase();
    this.fabric.metrics.interactions++;
    this.fabric.pushSignal(`User: "${input.substring(0, 35)}…"`, 'rgba(255,255,255,.25)');

    // Route based on current agent
    if (this.currentAgent === 'concierge') return this.handleConcierge(txt, input);
    if (this.currentAgent === 'navigator') return this.handleNavigator(txt, input);
    if (this.currentAgent === 'crosssell') return this.handleCrossSell(txt, input);
    if (this.currentAgent === 'marketplace') return this.handleMarketplace(txt, input);

    return { text: `<p>Based on your PAIL profile, I'm working on a personalised response.</p>` };
  }

  handleConcierge(txt, raw) {
    const u = this.fabric.identityGraph;

    // Profiling flow
    if (this.profilingStep < this.profilingStages.length) {
      const stage = this.profilingStages[this.profilingStep];
      const updates = stage.parse(raw);
      this.fabric.updateIdentity(updates, stage.signal(raw));
      this.profilingStep++;

      if (this.profilingStep === 1) this.fabric.advanceOnboard(0);
      if (this.profilingStep === 4) this.fabric.advanceOnboard(2);

      if (this.profilingStep < this.profilingStages.length) {
        const next = this.profilingStages[this.profilingStep];
        const ask = typeof next.ask === 'function' ? next.ask(this.fabric.identityGraph) : next.ask;
        return { text: `<p>Got it — I've updated your profile. ✓</p>${ask}`, richType: next.richType, toast: `Profile updated` };
      } else {
        this.fabric.advanceOnboard(2);
        this.fabric.advanceOnboard(3);
        return {
          text: `<p>✅ <strong>Profiling complete!</strong> Your PAIL profile is now at <strong>${u.depth}%</strong> depth.</p>
          <p>Based on what I know about you, <strong>${u.name}</strong> — <strong>${u.goal}</strong> goal, <strong>${u.risk}</strong> risk, <strong>${u.income}</strong> income — here's your personalised ET onboarding path:</p>
          <p>Explore all 4 AI agents in the sidebar: <strong>Welcome Concierge</strong>, <strong>Financial Navigator</strong>, <strong>Cross-Sell Engine</strong>, and <strong>Services Marketplace</strong>.</p>`,
          extra: this._buildPersonalisedOnboard(),
          toast: 'Profile complete! Onboarding path generated.'
        };
      }
    }

    // Post-profiling intelligent responses
    if (/prime/i.test(txt)) {
      this.fabric.pushSignal('User exploring ET Prime', 'var(--gold)');
      this.fabric.metrics.products++;
      this.fabric.renderMetrics();
      const primeRecos = this.fabric.getETPrimeRecommendations();
      return {
        text: `<p><strong>ET Prime</strong> — India's most powerful financial journalism platform. Based on your <strong>${u.goal || 'financial'}</strong> goal:</p>
        <div class="prime-recommendations">
          ${primeRecos.map(p => `
            <div style="background: rgba(208,2,27,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
              <div style="font-weight: 600; color: var(--et-red);">${p.title}</div>
              <div style="font-size: 12px; color: var(--et-muted); margin: 4px 0;">${p.type} · ${p.relevance}% match</div>
              <div style="font-size: 13px; margin: 8px 0;">${p.description}</div>
              <a href="${p.url}" class="et-link" style="font-size: 12px;">Read on ET Prime →</a>
            </div>
          `).join('')}
        </div>
        <p><strong>ET Prime benefits:</strong> Exclusive research, expert columns, ad-free experience, and access to premium masterclasses.</p>
        <p><a href="/et-prime" class="et-link">Activate 14-day free trial →</a></p>`,
        newsTag: 'prime'
      };
    }

    if (/masterclass|learn|course/i.test(txt)) {
      this.fabric.pushSignal('User exploring Masterclasses', 'var(--blue)');
      this.fabric.metrics.classes++;
      this.fabric.renderMetrics();
      const masterclasses = this.fabric.getMasterclassRecommendations();
      return {
        text: `<p>🎓 <strong>ET Masterclasses — Learn from India's Best</strong></p>
        <p>Based on your <strong>${u.goal || 'financial'}</strong> goal and <strong>${u.risk || 'moderate'}</strong> risk profile:</p>
        <div class="masterclass-recommendations">
          ${masterclasses.map(m => `
            <div style="background: rgba(26,171,170,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
              <div style="display: flex; justify-content: space-between;">
                <div style="font-weight: 600;">${m.title}</div>
                <span style="background: rgba(26,171,170,.3); padding: 2px 8px; border-radius: 12px; font-size: 11px;">${m.relevance}% match</span>
              </div>
              <div style="font-size: 12px; color: var(--et-muted);">By ${m.instructor} · ${m.level}</div>
              <div style="font-size: 13px; margin: 8px 0;">${m.description}</div>
              <a href="${m.url}" class="et-link" style="font-size: 12px;">Enroll now →</a>
            </div>
          `).join('')}
        </div>
        <p>All masterclasses included with <strong>ET Prime</strong> subscription. <a href="/masterclass" class="et-link">Browse all 50+ masterclasses →</a></p>`
      };
    }

    if (/news|feed|article|market update/i.test(txt)) {
      this.fabric.pushSignal('User requesting news', 'var(--teal)');
      this.fabric.metrics.articles++;
      this.fabric.renderMetrics();
      const insights = this.fabric.getMarketInsights();
      return {
        text: `<p>📰 <strong>Personalised Market Insights for ${u.name || 'You'}</strong></p>
        <p>Based on your ${u.assets || 'investment'} interests:</p>
        <div class="market-insights">
          ${insights.map(i => `
            <div style="background: rgba(26,107,181,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--et-red); font-size: 12px; font-weight: 600;">${i.source}</span>
                <span style="font-size: 11px; background: rgba(26,107,181,.2); padding: 2px 8px; border-radius: 12px;">${i.tag}</span>
              </div>
              <div style="font-weight: 500; margin: 8px 0;">${i.title}</div>
              <div style="font-size: 13px; color: var(--et-muted); margin-bottom: 8px;">${i.summary}</div>
              <a href="${i.url}" class="et-link" style="font-size: 12px;">Read full story →</a>
            </div>
          `).join('')}
        </div>
        <p><strong>Recommended for you:</strong> Visit <a href="/et-markets" class="et-link">ET Markets</a> for live updates, or subscribe to <a href="/et-prime" class="et-link">ET Prime</a> for in-depth analysis.</p>`
      };
    }

    if (/gap|portfolio|analys/i.test(txt)) {
      this.fabric.pushSignal('Gap analysis requested', 'var(--blue)');
      return { text: `<p>📊 <strong>Running portfolio gap analysis for your profile…</strong></p><p>I'll analyze your financial situation against your goals and identify opportunities.</p>`, extra: this._buildGapsCard() };
    }

    if (/home loan|mortgage|housing/i.test(txt)) {
      this.fabric.pushSignal('Home loan inquiry', 'var(--coral)');
      return { text: `<p>🏠 <strong>Home Loan Options Based on Your Profile</strong></p><p>Based on your income (${u.income || 'profile'}) and risk profile:</p>`, extra: this._buildHomeLoanOptions() };
    }

    if (/insur/i.test(txt)) {
      return { text: `<p>🛡️ <strong>Insurance Coverage Analysis</strong></p><p>Let me check your coverage gaps and match you with the best partner offers.</p>`, extra: this._buildInsuranceOptions() };
    }

    if (/recommend|suggest|what should|best for me/i.test(txt)) {
      this.fabric.pushSignal('Recommendation request', 'var(--gold)');
      return { text: `<p>🎯 <strong>Based on your PAIL profile</strong> (${u.goal || 'goal pending'}, ${u.risk || 'risk pending'}):</p>`, extra: this._buildPersonalisedOnboard() };
    }

    if (/help|what can you|how does|capabilities/i.test(txt)) {
      return {
        text: `<p>🤖 <strong>I'm your ET AI Concierge — Here's What I Can Do</strong></p>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 16px 0;">
        <div style="background: rgba(208,2,27,.1); padding: 12px; border-radius: 8px;">
          <div style="font-size: 20px; margin-bottom: 4px;">📰</div>
          <div style="font-weight: 600;">ET Prime</div>
          <div style="font-size: 12px; color: var(--et-muted);">Premium content & analysis</div>
        </div>
        <div style="background: rgba(26,107,181,.1); padding: 12px; border-radius: 8px;">
          <div style="font-size: 20px; margin-bottom: 4px;">📊</div>
          <div style="font-weight: 600;">Portfolio Gaps</div>
          <div style="font-size: 12px; color: var(--et-muted);">Find missing opportunities</div>
        </div>
        <div style="background: rgba(26,171,170,.1); padding: 12px; border-radius: 8px;">
          <div style="font-size: 20px; margin-bottom: 4px;">🏠</div>
          <div style="font-weight: 600;">Home Loans</div>
          <div style="font-size: 12px; color: var(--et-muted);">Pre-approved offers</div>
        </div>
        <div style="background: rgba(201,162,39,.1); padding: 12px; border-radius: 8px;">
          <div style="font-size: 20px; margin-bottom: 4px;">🎓</div>
          <div style="font-weight: 600;">Masterclasses</div>
          <div style="font-size: 12px; color: var(--et-muted);">Learn from experts</div>
        </div>
      </div>
      <p>Just ask me anything! Try: <strong>"Show me ET Prime recommendations"</strong>, <strong>"What masterclasses suit me?"</strong>, or <strong>"Compare home loans"</strong></p>` };
    }

    if (/thank|thanks/i.test(txt)) {
      return { text: `<p>You're welcome${u.name ? ', ' + u.name : ''}! I'm here to help you navigate the ET ecosystem. Feel free to explore our 4 agents on the left or ask me anything. 🙌</p>` };
    }

    // Default response
    const goalInfo = u.goal ? `Your <strong>${u.goal}</strong> goal is mapped` : 'Your financial goals are being mapped';
    return { text: `<p>${goalInfo}. Your profile is at <strong>${u.depth}%</strong> depth. I can help you explore ET Prime, analyse portfolio gaps, find partner services, discover masterclasses, or get personalized news. What interests you?</p>` };
  }

  handleNavigator(txt, raw) {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;

    if (/add|manual|enter|investment/i.test(txt) && (txt.includes('add') || txt.includes('enter'))) {
      return this.handlePortfolioEntry(raw);
    }

    if (/edit|update|modify|change/i.test(txt) && p.holdings.length > 0) {
      return this.handlePortfolioEdit(raw);
    }

    if (/gap|analys|review|check/i.test(txt)) {
      this.fabric.pushSignal('Navigator: Gap analysis requested', 'var(--blue)');
      return { text: `<p>📊 <strong>Portfolio Gap Analysis</strong></p><p>Based on your profile (${u.goal || 'goal pending'}, ${u.risk || 'risk pending'}):</p>`, extra: this._buildGapsCard() };
    }

    if (/nps|pension/i.test(txt)) {
      const has = /yes|have|active/i.test(txt);
      this.fabric.updateIdentity({ hasNPS: has }, 'NPS status captured');
      const advice = has
        ? `Great! You're already capturing the ₹50K additional deduction under 80CCD(1B). <a href="/et-prime" class="et-link">Read NPS optimisation strategies →</a>`
        : `You're missing ₹50K additional deduction under 80CCD(1B). Based on your <strong>${u.income || 'income'}</strong> bracket, this could save ₹15,600 in taxes. <a href="/et-markets/nps" class="et-link">Explore NPS options →</a>`;
      return { text: `<p>📋 <strong>NPS Analysis</strong></p><p>${advice}</p>` };
    }

    if (/fire|retire|early/i.test(txt)) {
      this.fabric.pushSignal('FIRE simulation requested', 'var(--teal)');
      return { text: this._buildFIRESimulation(), extra: this._buildRoadmapCard() };
    }

    if (/roadmap|plan|next step|action/i.test(txt)) {
      this.fabric.pushSignal('Roadmap requested', 'var(--gold)');
      return { text: `<p>🗺️ <strong>Your Personalised Financial Roadmap</strong></p><p>Mapped to your ${u.goal || 'financial'} goals:</p>`, extra: this._buildRoadmapCard() };
    }

    if (/summary|overview|holdings|portfolio/i.test(txt)) {
      if (p.holdings.length > 0) {
        return { text: `<p>📈 <strong>Your Portfolio Summary</strong></p>`, extra: this._buildPortfolioSummaryCard() };
      }
      return { text: `<p>📝 <strong>No portfolio data yet</strong></p><p>Tell me about your investments in this format:</p><p><strong>Example:</strong> "Axis Bluechip Fund, SIP ₹5000, Value ₹2.85L" or "Reliance Industries, 250 shares, Value ₹7.1L"</p><p>You can add multiple holdings, and I'll track them for you.</p>` };
    }

    if (/return|performance|growth/i.test(txt) && p.holdings.length > 0) {
      return { text: this._buildPortfolioPerformance() };
    }

    return { text: `<p>🔍 <strong>Financial Navigator Ready</strong></p><p>I can help you with:</p><ul><li>Add/edit your investments</li><li>Analyze portfolio gaps</li><li>FIRE planning & simulations</li><li>Generate financial roadmap</li><li>Track portfolio performance</li></ul><p>What would you like to explore?</p>`, extra: this._buildGapsCard() };
  }

  handlePortfolioEntry(raw) {
    // Parse natural language investment entry
    const patterns = {
      fund: /([A-Za-z\s]+?)\s*(?:fund|sip|scheme)/i,
      sip: /(?:sip|monthly)[:\s]*₹?\s*([\d,]+)/i,
      value: /(?:value|val|amount|worth)[:\s]*₹?\s*([\d,]+(?:\.\d+)?)/i,
      type: /(?:stock|equity|share|mf|fund|etf)/i
    };

    const nameMatch = raw.match(/(?:add|enter|invest in|holding:?)\s*([^,.\n]+)/i);
    const name = nameMatch ? nameMatch[1].trim() : null;

    if (!name) {
      return { text: `<p>📝 <strong>Add Investment</strong></p><p>Please tell me in this format:</p><p><strong>Example:</strong> "Add Axis Bluechip Fund, SIP ₹5000, Value ₹2,85,000"</p><p>or "Add Reliance Industries, 250 shares at ₹2845 each"</p>` };
    }

    const sipMatch = raw.match(patterns.sip);
    const valueMatch = raw.match(patterns.value);
    const type = /stock|share|equity/i.test(raw) ? 'Stock' : 'MF';

    const holding = {
      name: name,
      type: type,
      sipAmount: sipMatch ? parseInt(sipMatch[1].replace(/,/g, '')) : 0,
      value: valueMatch ? parseInt(valueMatch[1].replace(/,/g, '')) : 0
    };

    if (holding.value === 0 && holding.sipAmount === 0) {
      return { text: `<p>I need more details. Please include either the investment value or SIP amount.</p><p><strong>Example:</strong> "Axis Bluechip Fund, SIP ₹5000, Value ₹2.85L"</p>` };
    }

    this.fabric.addHolding(holding);
    return {
      text: `<p>✅ <strong>Added to Portfolio</strong></p><p>${holding.name} (${holding.type})</p><p>${holding.sipAmount > 0 ? `SIP: ₹${holding.sipAmount.toLocaleString('en-IN')}/month<br>` : ''}Value: ₹${holding.value.toLocaleString('en-IN')}</p><p>Your portfolio now has ${this.fabric.portfolio.holdings.length} holdings. <a href="#" onclick="showPortfolioSummary()">View portfolio →</a></p>`,
      extra: this._buildPortfolioSummaryCard()
    };
  }

  handlePortfolioEdit(raw) {
    const p = this.fabric.portfolio;
    let editHTML = `<div class="r-card"><div class="r-card-title">✏️ Edit Portfolio</div>`;

    p.holdings.forEach((h, idx) => {
      editHTML += `
        <div class="opp-row" style="margin-bottom: 12px;">
          <div class="opp-left">
            <div class="opp-ico" style="background:${h.type === 'Stock' ? 'rgba(208,2,27,.15)' : 'rgba(26,171,170,.15)'}">${h.type === 'Stock' ? '📊' : '💼'}</div>
            <div>
              <div class="opp-title">${h.name}</div>
              <div class="opp-sub">${h.type} · SIP: ₹${(h.sipAmount || 0).toLocaleString('en-IN')} · Value: ₹${(h.value || 0).toLocaleString('en-IN')}</div>
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button onclick="editHolding(${idx})" class="et-link" style="padding: 4px 12px; background: rgba(26,107,181,.2); border-radius: 4px;">✏️ Edit</button>
            <button onclick="deleteHolding(${idx})" class="et-link" style="padding: 4px 12px; background: rgba(208,2,27,.2); border-radius: 4px;">🗑️ Delete</button>
          </div>
        </div>
      `;
    });

    editHTML += `<div style="text-align:center;padding:12px 0"><button onclick="injectQuick('Add new investment')" class="et-link" style="padding: 8px 16px; background: var(--teal); border-radius: 6px;">➕ Add New Holding</button></div></div>`;

    return { text: editHTML };
  }

  handleCrossSell(txt, raw) {
    const u = this.fabric.identityGraph;
    this.fabric.pushSignal('Cross-sell analysis', 'var(--gold)');

    if (/masterclass|learn/i.test(txt)) {
      const masterclasses = this.fabric.getMasterclassRecommendations();
      return {
        text: `<p>🎓 <strong>Personalised Masterclass Recommendations</strong></p>
        <div class="masterclass-recommendations">
          ${masterclasses.map(m => `
            <div style="background: rgba(26,171,170,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
              <div style="font-weight: 600;">${m.title}</div>
              <div style="font-size: 12px;">By ${m.instructor} · ${m.level} · ${m.relevance}% match</div>
              <div style="font-size: 13px; margin: 8px 0;">${m.description}</div>
              <a href="${m.url}" class="et-link">Enroll now →</a>
            </div>
          `).join('')}
        </div>`
      };
    }

    if (/credit card|card/i.test(txt)) {
      const cardOffer = this.fabric.getPartnerOffers().find(o => o.title.includes('Card'));
      return {
        text: `<p>💳 <strong>Credit Card Recommendation</strong></p>
        <div style="background: rgba(201,162,39,.1); padding: 16px; border-radius: 12px;">
          <div style="font-size: 20px; margin-bottom: 8px;">${cardOffer?.title || 'ET-HDFC Millennia Card'}</div>
          <div>${cardOffer?.benefit || '5% cashback on ET, ₹0 joining fee, lounge access'}</div>
          <div style="margin-top: 12px;"><a href="/marketplace/credit-cards" class="et-link">Apply now →</a></div>
        </div>
        <p>Based on your income (${u.income || 'profile'}) and spending patterns.</p>`
      };
    }

    if (/insur|term|health/i.test(txt)) {
      return { text: `<p>🛡️ <strong>Insurance Recommendations</strong></p>`, extra: this._buildInsuranceOptions() };
    }

    const offers = this.fabric.getPartnerOffers();
    return {
      text: `<p>🎯 <strong>Personalised Offers for You</strong></p>
      <div class="offers-list">
        ${offers.map(o => `
          <div style="background: rgba(26,107,181,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
            <div style="display: flex; justify-content: space-between;">
              <div style="font-weight: 600;">${o.title}</div>
              <span style="background: rgba(26,107,181,.2); padding: 2px 8px; border-radius: 12px; font-size: 11px;">${o.relevance}% match</span>
            </div>
            <div style="font-size: 12px;">${o.partner} · ${o.benefit}</div>
            <div style="margin-top: 8px;"><a href="${o.url}" class="et-link">Explore →</a></div>
          </div>
        `).join('')}
      </div>`
    };
  }

  handleMarketplace(txt, raw) {
    const u = this.fabric.identityGraph;
    this.fabric.pushSignal('Marketplace inquiry', 'var(--teal)');

    if (/home loan|mortgage/i.test(txt)) {
      return { text: `<p>🏠 <strong>Home Loan Options</strong></p>`, extra: this._buildHomeLoanOptions() };
    }

    if (/insur|term|health/i.test(txt)) {
      return { text: `<p>🛡️ <strong>Insurance Options</strong></p>`, extra: this._buildInsuranceOptions() };
    }

    if (/fd|fixed deposit/i.test(txt)) {
      return {
        text: `<p>🏦 <strong>Best FD Rates</strong></p>
      <div class="fd-options">
        <div style="display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid rgba(255,255,255,.1);">
          <span><strong>Bajaj Finance</strong> (AAA rated)</span>
          <span style="color: var(--teal);">8.10% p.a.</span>
          <span>24 months</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid rgba(255,255,255,.1);">
          <span><strong>Shriram Finance</strong></span>
          <span style="color: var(--teal);">8.52% p.a.</span>
          <span>24 months</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px;">
          <span><strong>HDFC Bank</strong></span>
          <span style="color: var(--teal);">7.40% p.a.</span>
          <span>12 months</span>
        </div>
      </div>
      <p><a href="/et-markets/fixed-deposits" class="et-link">Compare all FD options →</a></p>`
      };
    }

    if (/pms|wealth|management/i.test(txt)) {
      return {
        text: `<p>💎 <strong>Wealth Management Options</strong></p>
      <div class="wealth-options">
        <div style="background: rgba(201,162,39,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
          <div style="font-weight: 600;">Zerodha PMS — Momentum Strategy</div>
          <div>Min ₹50L · 3-year CAGR 26.4% · High risk</div>
          <div style="margin-top: 8px;"><a href="/marketplace/pms-zerodha" class="et-link">Learn more →</a></div>
        </div>
        <div style="background: rgba(201,162,39,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
          <div style="font-weight: 600;">Motilal Oswal Wealth — Multi-Asset</div>
          <div>Min ₹25L · Balanced approach · 5-year returns 18.2%</div>
          <div style="margin-top: 8px;"><a href="/marketplace/pms-motilal" class="et-link">Learn more →</a></div>
        </div>
      </div>`
      };
    }

    const services = APIGateway.getPartners(u.risk);
    return { text: `<p>🏪 <strong>ET Services Marketplace</strong></p><p>Pre-qualified offers for your ${u.risk} profile:</p>`, extra: this._buildMarketplaceCard() };
  }

  // Rich Card Builders
  _buildGapsCard() {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;
    const gaps = [];

    if (u.hasInsurance !== true) {
      gaps.push({ ico: '🛡️', bg: 'rgba(239,68,68,.15)', title: 'Term Insurance Missing', sub: `Recommended: 20× annual income coverage (₹${u.income && u.income.includes('1Cr') ? '2Cr' : '1Cr'}) · <a href="/marketplace/term-insurance" class="et-link">Get quotes →</a>`, match: 'Critical', level: 'match-crit' });
    }

    if (u.hasNPS !== true) {
      gaps.push({ ico: '📋', bg: 'rgba(26,107,181,.15)', title: 'NPS Contribution Gap', sub: `₹50K extra deduction under 80CCD(1B) — save ₹15,600 in taxes · <a href="/et-markets/nps" class="et-link">Open NPS →</a>`, match: 'Important', level: 'match-med' });
    }

    if (p.holdings.length > 0 && p.assetAllocation.debt === 0 && (p.assetAllocation.equity + p.assetAllocation.mf) > 80) {
      gaps.push({ ico: '⚖️', bg: 'rgba(59,130,246,.15)', title: 'No Debt Diversification', sub: `Consider 20-30% in debt funds/FDs for stability · <a href="/et-markets/debt-funds" class="et-link">Explore debt funds →</a>`, match: 'Important', level: 'match-med' });
    }

    if (!gaps.length) {
      gaps.push({ ico: '✅', bg: 'rgba(34,197,94,.15)', title: 'Well Diversified', sub: 'No critical gaps detected. Keep monitoring on ET Markets.', match: 'Healthy', level: 'match-high' });
    }

    const headerInfo = p.holdings.length > 0 ? `${p.holdings.length} holdings · ₹${p.totalValue.toLocaleString('en-IN')}` : 'Profile-based analysis';
    return `<div class="r-card"><div class="r-card-title">Gap Analysis · ${headerInfo}</div>${gaps.map(g => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${g.bg}">${g.ico}</div><div><div class="opp-title">${g.title}</div><div class="opp-sub">${g.sub}</div></div></div><span class="match-pill ${g.level}">${g.match}</span></div>`).join('')}</div>`;
  }

  _buildFIRESimulation() {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;

    const incMap = { 'Below ₹5L': 35000, '₹5–10L': 65000, '₹10–20L': 125000, '₹20–40L': 250000, '₹40L–1Cr': 580000, '₹1Cr+': 1000000 };
    const monthlyInc = incMap[u.income] || 125000;
    const monthlyExpense = Math.round(monthlyInc * 0.55);
    const annualExpense = monthlyExpense * 12;
    const targetCorpus = annualExpense * 25;

    const currentSIP = p.totalSIP || Math.round(monthlyInc * 0.15);
    const currentValue = p.totalValue || 0;
    const ageNum = parseInt(u.ageRange) || 30;
    const retireAge = 45;
    const yearsToFIRE = Math.max(5, retireAge - ageNum);
    const cagr = u.risk === 'Aggressive' ? 0.14 : u.risk === 'Conservative' ? 0.09 : 0.12;

    const r = cagr / 12;
    const n = yearsToFIRE * 12;
    const sipFV = Math.round(currentSIP * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const lumpFV = Math.round(currentValue * Math.pow(1 + cagr, yearsToFIRE));
    const projectedCorpus = sipFV + lumpFV;
    const gap = targetCorpus - projectedCorpus;
    const additionalSIP = gap > 0 ? Math.round((gap * r) / ((Math.pow(1 + r, n) - 1) * (1 + r))) : 0;

    return `<div class="r-card"><div class="r-card-title">🔥 FIRE Simulation</div>
    <div style="padding: 8px;">
      <div><strong>Monthly expenses:</strong> ₹${monthlyExpense.toLocaleString('en-IN')}</div>
      <div><strong>Target corpus (25×):</strong> ₹${(targetCorpus / 10000000).toFixed(1)}Cr</div>
      <div><strong>Current SIP:</strong> ₹${currentSIP.toLocaleString('en-IN')}/mo at ${Math.round(cagr * 100)}% CAGR</div>
      <div><strong>Projected in ${yearsToFIRE} yrs:</strong> ₹${(projectedCorpus / 10000000).toFixed(1)}Cr</div>
      <div style="margin-top: 12px; padding: 12px; background: ${gap > 0 ? 'rgba(239,68,68,.1)' : 'rgba(34,197,94,.1)'}; border-radius: 8px;">
        ${gap > 0 ? `<strong>Gap:</strong> ₹${(gap / 10000000).toFixed(1)}Cr — Increase SIP by <strong>₹${additionalSIP.toLocaleString('en-IN')}/mo</strong>` : '<strong>✓ On track!</strong> Current trajectory exceeds target'}
      </div>
      <div style="margin-top: 12px;"><a href="/et-prime" class="et-link">📰 FIRE toolkit on ET Prime →</a> · <a href="/masterclass" class="et-link">🎓 Retirement Masterclass →</a></div>
    </div></div>`;
  }

  _buildRoadmapCard() {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;
    const phases = [];

    const imm = [];
    if (u.hasInsurance !== true) imm.push({ act: 'Get term insurance (20× income)', link: '/marketplace/term-insurance', label: '🛡️ Get Quotes', type: 'marketplace' });
    if (u.hasNPS !== true) imm.push({ act: 'Open NPS account — ₹50K tax saving', link: '/et-markets/nps', label: '📋 Open NPS', type: 'markets' });
    if (p.holdings.length > 0 && p.assetAllocation.debt === 0) imm.push({ act: 'Add debt allocation (20-30%) for stability', link: '/et-markets/debt-funds', label: '⚖️ Explore Debt Funds', type: 'markets' });
    if (!imm.length) imm.push({ act: 'Complete financial profile', link: '#', label: '📝 Update Profile', type: 'profile' });
    phases.push({ title: '🔴 Phase 1 — Immediate Actions', items: imm });

    const short = [];
    if (u.goal === 'Retirement / FIRE') short.push({ act: 'Set up systematic transfer to balanced fund', link: '/et-markets', label: '📊 Rebalance Portfolio', type: 'markets' });
    short.push({ act: `Increase SIP to 25% of income for ${u.goal || 'wealth creation'}`, link: '/masterclass', label: '🎓 SIP Strategy', type: 'masterclass' });
    phases.push({ title: '🟡 Phase 2 — Short-term (1–3 months)', items: short });

    const long = [];
    long.push({ act: `Build ${u.goal === 'Retirement / FIRE' ? 'FIRE corpus' : 'wealth'} with annual SIP step-up`, link: '/et-prime', label: '📈 Step-up SIP Guide', type: 'prime' });
    long.push({ act: 'Track portfolio quarterly using ET Markets', link: '/et-markets', label: '📊 Portfolio Tracker', type: 'markets' });
    phases.push({ title: '🟢 Phase 3 — Long-term Strategy', items: long });

    return `<div class="r-card"><div class="r-card-title">Financial Roadmap · Mapped to ET Ecosystem</div>${phases.map(ph => `<div class="roadmap-phase"><div class="roadmap-phase-title">${ph.title}</div>${ph.items.map(it => `<div class="roadmap-item"><div class="roadmap-action">${it.act}</div><a href="${it.link}" class="roadmap-btn et-link">${it.label}</a></div>`).join('')}</div>`).join('')}</div>`;
  }

  _buildPortfolioSummaryCard() {
    const p = this.fabric.portfolio;
    if (!p.holdings.length) return '';

    const allocHTML = Object.entries(p.assetAllocation).filter(([, v]) => v > 0).map(([k, v]) => `<div class="alloc-bar-item"><div class="alloc-label">${k.toUpperCase()}</div><div class="alloc-bar-fill" style="width:${v}%;background:${k === 'equity' ? 'var(--et-red)' : k === 'mf' ? 'var(--teal)' : k === 'debt' ? 'var(--blue)' : 'var(--gold)'}"></div><div class="alloc-pct">${v}%</div></div>`).join('');

    return `<div class="r-card"><div class="r-card-title">Portfolio Summary · ${p.holdings.length} Holdings</div>
    <div class="portfolio-stats"><div class="port-stat"><div class="port-stat-val">₹${p.totalValue.toLocaleString('en-IN')}</div><div class="port-stat-label">Total Value</div></div><div class="port-stat"><div class="port-stat-val">₹${p.totalSIP.toLocaleString('en-IN')}/mo</div><div class="port-stat-label">Monthly SIP</div></div><div class="port-stat"><div class="port-stat-val">${p.investmentExp || '—'}</div><div class="port-stat-label">Experience</div></div></div>
    <div class="alloc-bars">${allocHTML}</div>
    ${p.holdings.slice(0, 5).map((h, idx) => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${h.type === 'Stock' ? 'rgba(208,2,27,.15)' : 'rgba(26,171,170,.15)'}">${h.type === 'Stock' ? '📊' : '💼'}</div><div><div class="opp-title">${h.name}</div><div class="opp-sub">${h.type} · SIP ₹${(h.sipAmount || 0).toLocaleString('en-IN')} · Value ₹${(h.value || 0).toLocaleString('en-IN')}</div></div></div><span class="match-pill match-med">${h.source === 'manual' ? 'Manual' : 'Added'}</span></div>`).join('')}
    ${p.holdings.length > 5 ? `<div class="opp-sub" style="text-align:center;padding:6px">+ ${p.holdings.length - 5} more holdings</div>` : ''}
    <div style="text-align:center;padding:8px 0"><a href="#" onclick="showFullPortfolio()" class="et-link">📊 View all holdings →</a> · <a href="#" onclick="injectQuick('Edit my portfolio')" class="et-link">✏️ Edit portfolio →</a></div></div>`;
  }

  _buildPortfolioPerformance() {
    const p = this.fabric.portfolio;
    if (!p.holdings.length) return '';

    // Simulate performance metrics
    const dayChange = (Math.random() * 2 - 0.5).toFixed(2);
    const weekChange = (Math.random() * 3 - 1).toFixed(2);
    const monthChange = (Math.random() * 5 - 1).toFixed(2);
    const yearChange = (Math.random() * 15 - 2).toFixed(2);

    return `<div class="r-card"><div class="r-card-title">📈 Portfolio Performance</div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 12px;">
      <div><div style="font-size: 11px; color: var(--et-muted);">Today</div><div style="font-size: 18px; font-weight: 600; color: ${dayChange >= 0 ? 'var(--teal)' : 'var(--coral)'}">${dayChange >= 0 ? '+' : ''}${dayChange}%</div></div>
      <div><div style="font-size: 11px; color: var(--et-muted);">Week</div><div style="font-size: 18px; font-weight: 600; color: ${weekChange >= 0 ? 'var(--teal)' : 'var(--coral)'}">${weekChange >= 0 ? '+' : ''}${weekChange}%</div></div>
      <div><div style="font-size: 11px; color: var(--et-muted);">Month</div><div style="font-size: 18px; font-weight: 600; color: ${monthChange >= 0 ? 'var(--teal)' : 'var(--coral)'}">${monthChange >= 0 ? '+' : ''}${monthChange}%</div></div>
      <div><div style="font-size: 11px; color: var(--et-muted);">Year</div><div style="font-size: 18px; font-weight: 600; color: ${yearChange >= 0 ? 'var(--teal)' : 'var(--coral)'}">${yearChange >= 0 ? '+' : ''}${yearChange}%</div></div>
    </div>
    <div style="padding: 8px; border-top: 1px solid rgba(255,255,255,.1);">
      <div style="display: flex; justify-content: space-between;">
        <span>vs Nifty 50</span>
        <span style="color: ${(parseFloat(monthChange) - 2.5) >= 0 ? 'var(--teal)' : 'var(--coral)'}">${(parseFloat(monthChange) - 2.5).toFixed(2)}%</span>
      </div>
      <div style="margin-top: 8px;"><a href="/et-markets/portfolio" class="et-link">Detailed analysis on ET Markets →</a></div>
    </div></div>`;
  }

  _buildHomeLoanOptions() {
    const u = this.fabric.identityGraph;
    const maxLoan = u.income && u.income.includes('1Cr') ? '1.5Cr' : u.income && u.income.includes('40L') ? '80L' : '50L';

    return `<div class="r-card"><div class="r-card-title">🏠 Home Loan Options</div>
    <div style="background: rgba(26,107,181,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
      <div style="font-weight: 600;">HDFC Home Loan</div>
      <div>8.4% p.a. · Up to ₹${maxLoan} · Pre-approved</div>
      <div style="margin-top: 8px;"><a href="/marketplace/home-loan-hdfc" class="et-link">Check eligibility →</a></div>
    </div>
    <div style="background: rgba(26,107,181,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
      <div style="font-weight: 600;">SBI Home Loan</div>
      <div>8.6% p.a. · Up to ₹${maxLoan} · Max tenure 30 years</div>
      <div style="margin-top: 8px;"><a href="/marketplace/home-loan-sbi" class="et-link">Check eligibility →</a></div>
    </div>
    <div style="background: rgba(26,107,181,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
      <div style="font-weight: 600;">ICICI Home Loan</div>
      <div>8.65% p.a. · Up to ₹${maxLoan} · Balance transfer facility</div>
      <div style="margin-top: 8px;"><a href="/marketplace/home-loan-icici" class="et-link">Check eligibility →</a></div>
    </div>
    <div style="margin-top: 12px; text-align: center;"><a href="/et-markets/home-loans" class="et-link">Compare all lenders →</a></div></div>`;
  }

  _buildInsuranceOptions() {
    const u = this.fabric.identityGraph;
    const premium = u.ageRange && u.ageRange.includes('25') ? '550' : u.ageRange && u.ageRange.includes('35') ? '750' : '650';

    return `<div class="r-card"><div class="r-card-title">🛡️ Term Insurance Options</div>
    <div style="background: rgba(26,171,170,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
      <div style="font-weight: 600;">ICICI Pru iProtect</div>
      <div>₹1Cr coverage at ₹${premium}/month · Returns 105% of premiums</div>
      <div style="margin-top: 8px;"><a href="/marketplace/term-insurance-icici" class="et-link">Get quote →</a></div>
    </div>
    <div style="background: rgba(26,171,170,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
      <div style="font-weight: 600;">HDFC Click 2 Protect</div>
      <div>₹1Cr coverage at ₹${parseInt(premium) + 50}/month · Critical illness rider</div>
      <div style="margin-top: 8px;"><a href="/marketplace/term-insurance-hdfc" class="et-link">Get quote →</a></div>
    </div>
    <div style="background: rgba(26,171,170,.1); padding: 12px; border-radius: 8px; margin: 8px 0;">
      <div style="font-weight: 600;">Max Life Smart Term Plan</div>
      <div>₹1Cr coverage at ₹${parseInt(premium) - 50}/month · Premium waiver on disability</div>
      <div style="margin-top: 8px;"><a href="/marketplace/term-insurance-max" class="et-link">Get quote →</a></div>
    </div>
    <div style="margin-top: 12px; text-align: center;"><a href="/et-markets/insurance" class="et-link">Compare all plans →</a></div></div>`;
  }

  _buildMarketplaceCard() {
    const services = APIGateway.getPartners(this.fabric.identityGraph.risk);
    return `<div class="r-card"><div class="r-card-title">Pre-qualified partner services</div>${services.map(s => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(26,107,181,.15)">${s.icon || ''}</div><div><div class="opp-title">${s.title}</div><div class="opp-sub">${s.sub}</div></div></div><span class="match-pill ${s.level}">${s.match}</span></div>`).join('')}</div>`;
  }

  _buildPersonalisedOnboard() {
    const u = this.fabric.identityGraph;
    return `<div class="r-card"><div class="r-card-title">Your personalised ET path · ${u.segment || 'Your Segment'}</div>
    <div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(208,2,27,.15)">📰</div><div><div class="opp-title">ET Prime — Activate full access</div><div class="opp-sub">Tailored to ${u.goal || 'your goals'}</div></div></div><span class="match-pill match-high">Step 1</span></div>
    <div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(26,107,181,.15)">📊</div><div><div class="opp-title">ET Markets Portfolio Tracker</div><div class="opp-sub">Track your ${u.assets || 'investments'}</div></div></div><span class="match-pill match-high">Step 2</span></div>
    <div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(26,171,170,.15)">🎓</div><div><div class="opp-title">Masterclass: ${u.assets && /equity/i.test(u.assets) ? 'Equity Research' : 'Personal Finance'}</div><div class="opp-sub">94% profile match</div></div></div><span class="match-pill match-med">Step 3</span></div>
    <div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(201,162,39,.15)">🏪</div><div><div class="opp-title">ET Marketplace: ${u.hasInsurance === false ? 'Get Term Insurance' : 'Explore PMS'}</div><div class="opp-sub">Gap-filling recommendation</div></div></div><span class="match-pill match-med">Step 4</span></div></div>`;
  }

  getRichCardHTML(type) {
    const builders = {
      'age-q': () => `<div class="r-card"><div class="r-card-title">Select your age range</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('I am in my early 20s, 18 to 25')"><div class="opt-chip-icon">🎓</div><div class="opt-chip-name">18–25</div><div class="opt-chip-desc">Early career</div></div><div class="opt-chip" onclick="injectQuick('I am 25 to 30 years old')"><div class="opt-chip-icon">💼</div><div class="opt-chip-name">25–30</div><div class="opt-chip-desc">Growth phase</div></div><div class="opt-chip" onclick="injectQuick('I am 30 to 35 years old')"><div class="opt-chip-icon">📊</div><div class="opt-chip-name">30–35</div><div class="opt-chip-desc">Peak earning</div></div><div class="opt-chip" onclick="injectQuick('I am 35 to 40 years old')"><div class="opt-chip-icon">🏠</div><div class="opt-chip-name">35–40</div><div class="opt-chip-desc">Established</div></div><div class="opt-chip" onclick="injectQuick('I am 40 to 50 years old')"><div class="opt-chip-icon">💎</div><div class="opt-chip-name">40–50</div><div class="opt-chip-desc">Wealth building</div></div><div class="opt-chip" onclick="injectQuick('I am above 50')"><div class="opt-chip-icon">👑</div><div class="opt-chip-name">50+</div><div class="opt-chip-desc">Pre-retirement</div></div></div></div>`,
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
      const portfolioInfo = this.fabric.portfolio.holdings.length > 0
        ? `<br>Portfolio: <strong>${this.fabric.portfolio.holdings.length} holdings</strong> · ₹${this.fabric.portfolio.totalValue.toLocaleString('en-IN')} · ₹${this.fabric.portfolio.totalSIP.toLocaleString('en-IN')}/mo SIP`
        : '<br><em>Add your investments to get personalised analysis</em>';
      return { text: `<p>Your <strong>Financial Life Navigator</strong> is online. PAIL profile — <strong>${u.goal || 'pending'}</strong> goal, <strong>${u.risk || 'pending'}</strong> risk.${portfolioInfo}</p><p>I can help you: Add investments, analyse gaps, FIRE planning, generate roadmap, or track performance.</p>`, extra: this._buildGapsCard(), onboard: 3 };
    }
    if (key === 'crosssell') {
      return { text: `<p>Your <strong>Cross-Sell Engine</strong> is active. Analysing ${u.signals.length + 12} behavioural signals…</p>`, extra: this._buildCrossSellCard() };
    }
    if (key === 'marketplace') {
      return { text: `<p>Welcome to the <strong>ET Services Marketplace</strong>. Profile matched against 40+ partner services.</p>`, extra: this._buildMarketplaceCard(), onboard: 4 };
    }
    return { text: '<p>Agent ready.</p>' };
  }

  _buildCrossSellCard() {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;
    const items = [];

    if (u.goal === 'Retirement / FIRE') items.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: FIRE & Early Retirement', sub: `Matched to your ${u.goal} goal · <a href="/masterclass" class="et-link">Enroll →</a>`, match: '96%', level: 'match-high' });
    else if (u.assets && /equity|stock/i.test(u.assets)) items.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: Equity Research', sub: `Matched to your ${u.assets} portfolio · <a href="/masterclass" class="et-link">Enroll →</a>`, match: '94%', level: 'match-high' });
    else items.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: Personal Finance', sub: `Foundational course · <a href="/masterclass" class="et-link">Enroll →</a>`, match: '90%', level: 'match-high' });

    if (u.income && /40L|1Cr|crore/i.test(u.income)) items.push({ ico: '💳', bg: 'rgba(201,162,39,.15)', title: 'ET–Axis Magnus Credit Card', sub: `Pre-approved · Travel + invest rewards`, match: '91%', level: 'match-high' });
    else items.push({ ico: '💳', bg: 'rgba(201,162,39,.15)', title: 'ET–HDFC Millennia Card', sub: `5% cashback on ET · ₹0 joining fee`, match: '88%', level: 'match-high' });

    if (p.holdings.length > 0 && p.totalSIP > 0) items.push({ ico: '📈', bg: 'rgba(34,197,94,.15)', title: `Optimize ₹${p.totalSIP.toLocaleString('en-IN')}/mo SIP`, sub: `Step-up 10% annually · <a href="/et-prime" class="et-link">SIP Guide →</a>`, match: '85%', level: 'match-med' });
    else items.push({ ico: '📈', bg: 'rgba(34,197,94,.15)', title: 'Start SIP — wealth building', sub: `Recommended for ${u.risk || 'Moderate'} profile · <a href="/et-markets" class="et-link">Best SIPs →</a>`, match: '82%', level: 'match-med' });

    return `<div class="r-card"><div class="r-card-title">Profile-matched opportunities</div>${items.map(i => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${i.bg}">${i.ico}</div><div><div class="opp-title">${i.title}</div><div class="opp-sub">${i.sub}</div></div></div><span class="match-pill ${i.level}">${i.match}</span></div>`).join('')}</div>`;
  }
}

// ============ GLOBAL INSTANCES ============
const fabric = new DataFabric();
const engine = new Orchestrator(fabric);

// ============ UI HELPER FUNCTIONS ============
function nowTime() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function renderMsg(role, content, time, richType, isExtra) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = `msg ${role === 'user' ? 'user' : ''}`;
  const av = document.createElement('div');
  av.className = `msg-av ${role === 'user' ? 'user-av' : 'et-av'}`;
  av.textContent = role === 'user' ? (fabric.identityGraph.initials || '?') : 'ET';
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
  setTimeout(async () => {
    typing.remove();
    const resp = await engine.process(txt);
    renderMsg('assistant', resp.text || '', nowTime(), resp.richType);
    if (resp.extra) renderMsg('assistant', resp.extra, nowTime(), null, true);
    if (resp.toast) showProfileToast(resp.toast);
    flashTag('tag-hil');
  }, 900 + Math.random() * 500);
}

function injectQuick(text) {
  document.getElementById('msg-input').value = text;
  sendMessage();
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function applyHIL() {
  const updates = {};
  const hilName = document.getElementById('hil-name');
  const hilAge = document.getElementById('hil-age');
  if (hilName && hilName.value.trim()) {
    updates.name = hilName.value.trim();
    const parts = updates.name.split(/\s+/);
    updates.initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : updates.name.substring(0, 2).toUpperCase();
  }
  if (hilAge && hilAge.value.trim()) updates.ageRange = hilAge.value.trim();
  updates.risk = document.getElementById('hil-risk').value;
  updates.goal = document.getElementById('hil-goal').value;
  updates.horizon = document.getElementById('hil-horizon').value;
  fabric.updateIdentity(updates, `HIL override applied`);
  fabric.renderReco();
  flashTag('tag-hil');
  renderMsg('assistant', `<p>⚙️ <strong>Human-in-Loop override applied.</strong> Risk: <strong>${updates.risk}</strong> · Goal: <strong>${updates.goal}</strong> · Horizon: <strong>${updates.horizon}</strong>${updates.name ? ' · Name: <strong>' + updates.name + '</strong>' : ''}</p><p>All agents repersonalised.</p>`, nowTime());
  setTimeout(() => renderMsg('assistant', engine._buildMarketplaceCard(), nowTime(), null, true), 400);
}

function editHolding(index) {
  const holding = fabric.portfolio.holdings[index];
  if (!holding) return;

  const editForm = `
    <div class="edit-holding-form" style="background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; z-index: 1000;" onclick="closeEditForm(event)">
      <div style="background: var(--et-bg); padding: 24px; border-radius: 12px; max-width: 400px; width: 90%;" onclick="event.stopPropagation()">
        <h3 style="margin-bottom: 16px;">Edit Holding</h3>
        <div style="margin-bottom: 12px;">
          <label>Name</label>
          <input type="text" id="edit-name" value="${holding.name.replace(/'/g, "\\'")}" style="width: 100%; padding: 8px; margin-top: 4px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); border-radius: 4px; color: white;">
        </div>
        <div style="margin-bottom: 12px;">
          <label>Type</label>
          <select id="edit-type" style="width: 100%; padding: 8px; margin-top: 4px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); border-radius: 4px; color: white;">
            <option value="MF" ${holding.type === 'MF' ? 'selected' : ''}>Mutual Fund</option>
            <option value="Stock" ${holding.type === 'Stock' ? 'selected' : ''}>Stock</option>
            <option value="ETF" ${holding.type === 'ETF' ? 'selected' : ''}>ETF</option>
            <option value="Debt" ${holding.type === 'Debt' ? 'selected' : ''}>Debt</option>
          </select>
        </div>
        <div style="margin-bottom: 12px;">
          <label>SIP Amount (₹/month)</label>
          <input type="number" id="edit-sip" value="${holding.sipAmount || 0}" style="width: 100%; padding: 8px; margin-top: 4px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); border-radius: 4px; color: white;">
        </div>
        <div style="margin-bottom: 12px;">
          <label>Current Value (₹)</label>
          <input type="number" id="edit-value" value="${holding.value || 0}" style="width: 100%; padding: 8px; margin-top: 4px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); border-radius: 4px; color: white;">
        </div>
        <div style="display: flex; gap: 12px; margin-top: 20px;">
          <button onclick="saveHoldingEdit(${index})" style="flex: 1; padding: 10px; background: var(--teal); border: none; border-radius: 6px; color: white; cursor: pointer;">Save Changes</button>
          <button onclick="closeEditForm()" style="flex: 1; padding: 10px; background: rgba(255,255,255,.1); border: none; border-radius: 6px; color: white; cursor: pointer;">Cancel</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', editForm);
}

function saveHoldingEdit(index) {
  const updates = {
    name: document.getElementById('edit-name').value,
    type: document.getElementById('edit-type').value,
    sipAmount: parseInt(document.getElementById('edit-sip').value) || 0,
    value: parseInt(document.getElementById('edit-value').value) || 0
  };

  fabric.editHolding(index, updates);
  closeEditForm();
  renderMsg('assistant', `<p>✅ Holding updated successfully!</p><p>${updates.name} — SIP: ₹${updates.sipAmount.toLocaleString('en-IN')}, Value: ₹${updates.value.toLocaleString('en-IN')}</p>`, nowTime());
  setTimeout(() => renderMsg('assistant', engine._buildPortfolioSummaryCard(), nowTime(), null, true), 500);
}

function deleteHolding(index) {
  if (confirm('Are you sure you want to remove this holding from your portfolio?')) {
    const holding = fabric.portfolio.holdings[index];
    fabric.deleteHolding(index);
    closeEditForm();
    renderMsg('assistant', `<p>🗑️ Removed ${holding.name} from your portfolio.</p>`, nowTime());
    setTimeout(() => renderMsg('assistant', engine._buildPortfolioSummaryCard(), nowTime(), null, true), 500);
  }
}

function showFullPortfolio() {
  const p = fabric.portfolio;
  if (!p.holdings.length) {
    renderMsg('assistant', '<p>No portfolio data available. Add your investments using the format: "Add Axis Bluechip Fund, SIP ₹5000, Value ₹2.85L"</p>', nowTime());
    return;
  }

  let portfolioHTML = `<div class="r-card"><div class="r-card-title">Complete Portfolio (${p.holdings.length} holdings)</div>`;
  p.holdings.forEach((h, idx) => {
    portfolioHTML += `
      <div class="opp-row" style="margin-bottom: 8px;">
        <div class="opp-left">
          <div class="opp-ico" style="background:${h.type === 'Stock' ? 'rgba(208,2,27,.15)' : 'rgba(26,171,170,.15)'}">${h.type === 'Stock' ? '📊' : '💼'}</div>
          <div>
            <div class="opp-title">${h.name}</div>
            <div class="opp-sub">${h.type} · SIP: ₹${(h.sipAmount || 0).toLocaleString('en-IN')} · Value: ₹${(h.value || 0).toLocaleString('en-IN')}</div>
          </div>
        </div>
        <button onclick="editHolding(${idx})" class="et-link" style="padding: 4px 12px; background: rgba(26,107,181,.2); border-radius: 4px;">✏️ Edit</button>
      </div>
    `;
  });
  portfolioHTML += `<div style="text-align:center;padding:12px 0"><button onclick="injectQuick('Add new investment')" class="et-link" style="padding: 8px 16px; background: var(--teal); border-radius: 6px;">➕ Add New Holding</button></div></div>`;

  renderMsg('assistant', portfolioHTML, nowTime());
}

function closeEditForm(event) {
  const forms = document.querySelectorAll('.edit-holding-form');
  forms.forEach(form => form.remove());
}

function showPortfolioSummary() {
  renderMsg('assistant', engine._buildPortfolioSummaryCard(), nowTime());
}

// ============ BOOT SEQUENCE ============
window.addEventListener('load', () => {
  const bar = document.getElementById('ld-bar');
  const steps = document.querySelectorAll('.loading-step');
  let i = 0;
  const tick = setInterval(() => {
    if (i < steps.length) {
      steps[i].classList.add('show');
      bar.style.width = ((i + 1) / steps.length * 100) + '%';
      setTimeout(() => {
        steps[i].classList.add('done');
        steps[i].textContent = '✓ ' + ['Initialising PAIL v3.0', 'Loading ET Data Fabric', 'Connecting ET Ecosystem', 'Personalisation Engine Active', 'AI Concierge Ready'][i];
      }, 250);
      i++;
    } else {
      clearInterval(tick);
      setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        ls.style.opacity = '0';
        setTimeout(() => {
          ls.remove();
          fabric.pushSignal('PAIL v3.0 Intelligence Layer online', 'var(--teal)');
          fabric.pushSignal(`User identity graph loaded — ${fabric.identityGraph.depth}% depth`, 'var(--gold)');
          fabric.pushSignal('ET Data Fabric connected', 'var(--blue)');
          fabric.updateUI();
          fabric.renderMetrics();
          setQuickReplies(engine.agentConfig.concierge.qr);
          const intro = engine.profilingStages[0];
          renderMsg('assistant', intro.ask, nowTime(), intro.richType);
        }, 500);
      }, 400);
    }
  }, 320);
});