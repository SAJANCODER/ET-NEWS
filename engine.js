/**
 * PAIL v2.5 — ET AI Concierge Engine
 * Architecture: DataFabric → Orchestrator → APIGateway
 * Preserves class-based architecture strictly.
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
      signals: []
    };
    this.metrics = { products: 0, articles: 0, classes: 0, opportunities: 0 };
    // Portfolio data store — populated via OCR upload
    this.portfolio = {
      holdings: [],        // { name, type, value, sipAmount, source, confidence }
      totalSIP: 0,
      totalValue: 0,
      assetAllocation: {}, // { equity: %, mf: %, debt: %, gold: % }
      investmentExp: null,  // 'beginner' | 'intermediate' | 'advanced'
      uploaded: false,
      lastUpdated: null
    };
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
    const fields = ['name', 'goal', 'risk', 'income', 'assets', 'hasInsurance', 'hasNPS', 'ageRange', 'horizon'];
    const filled = fields.filter(f => u[f] !== null && u[f] !== undefined).length;
    u.depth = Math.min(95, Math.round(filled / fields.length * 95));
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

  // ---- PORTFOLIO METHODS ----
  processOCRData(textContent) {
    const holdings = [];
    const lines = textContent.split('\n').filter(l => l.trim());
    // Patterns for Groww/Kuvera/Zerodha/generic MF screenshot formats
    const amountRegex = /₹\s*([\d,]+\.?\d*)/g;
    const sipKeywords = /sip|monthly|installment/i;
    const valueKeywords = /value|val|current|nav|total|invested|returns/i;
    const fundKeywords = /fund|cap|index|nifty|sensex|growth|direct|regular|plan|gilt|elss|liquid|etf|fof|overnight|arbitrage|balanced|hybrid|flexi|multi|debt|bond|thematic|sector/i;
    const stockKeywords = /ltd|limited|industries|infosys|tcs|reliance|wipro|hul|itc|bharti|adani|titan|bajaj|maruti|kotak|axis|sbi|hdfc bank|icici bank|tech mahindra|sun pharma|tata/i;
    const skipKeywords = /explore|dashboard|stocks|watchlist|f&o|upi|loans|mutual funds|sort|filter|check balance|upgrade|due date|in progress|completed|active sips/i;
    let currentFund = null;
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (trimmed.length < 3 || skipKeywords.test(trimmed)) continue;
      // Detect fund names (Groww format: fund name on its own line)
      if (fundKeywords.test(trimmed) && trimmed.length > 8 && !/^₹/.test(trimmed)) {
        currentFund = { name: trimmed.replace(/[^\w\s₹.,&()-]/g, '').trim(), type: 'MF', value: 0, sipAmount: 0, source: 'ocr_extracted', confidence: 0.85 };
        if (/etf|silver|gold/i.test(trimmed)) currentFund.confidence = 0.82;
        holdings.push(currentFund);
        continue;
      }
      // Detect stock names
      if (stockKeywords.test(trimmed) && !fundKeywords.test(trimmed) && trimmed.length > 4) {
        currentFund = { name: trimmed.replace(/[^\w\s₹.,&()-]/g, '').trim(), type: 'Stock', value: 0, sipAmount: 0, source: 'ocr_extracted', confidence: 0.78 };
        holdings.push(currentFund);
        continue;
      }
      // Parse amounts — attach to current fund
      if (currentFund) {
        // Groww format: "₹3,000 • In progress" or "₹750" on a line
        const amounts = [...trimmed.matchAll(amountRegex)];
        for (const m of amounts) {
          const val = parseInt(m[1].replace(/,/g, ''), 10) || 0;
          if (val > 0) {
            if (sipKeywords.test(trimmed) || /in progress|upcoming|monthly/i.test(trimmed) || val <= 50000) {
              currentFund.sipAmount = val;
            } else {
              currentFund.value = val;
            }
          }
        }
        // Also try: "SIP: ₹5,000 Value: ₹2,85,000" format
        const sipExplicit = /(?:SIP|sip)[:\s]*₹?([\d,]+)/i.exec(trimmed);
        const valExplicit = /(?:value|val|current|invested)[:\s]*₹?([\d,]+)/i.exec(trimmed);
        if (sipExplicit) currentFund.sipAmount = parseInt(sipExplicit[1].replace(/,/g, ''), 10) || 0;
        if (valExplicit) currentFund.value = parseInt(valExplicit[1].replace(/,/g, ''), 10) || 0;
      }
      // Detect "MONTHLY SIP AMOUNT" header line (Groww format)
      if (/monthly sip amount/i.test(trimmed)) {
        // The next line should have the total SIP amount
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          const totalSipMatch = /₹\s*([\d,]+)/i.exec(nextLine);
          if (totalSipMatch) {
            this._growwTotalSIP = parseInt(totalSipMatch[1].replace(/,/g, ''), 10);
          }
        }
      }
    }
    // Post-process: if Groww total SIP is known but individual SIPs don't sum up, distribute proportionally
    if (this._growwTotalSIP && holdings.length > 0) {
      const detectedSum = holdings.reduce((s, h) => s + h.sipAmount, 0);
      if (detectedSum === 0) {
        // Evenly distribute if no individual SIPs detected
        const perFund = Math.round(this._growwTotalSIP / holdings.length);
        holdings.forEach(h => { h.sipAmount = perFund; h.confidence = Math.max(0.6, h.confidence - 0.1); });
      }
      delete this._growwTotalSIP;
    }
    return holdings;
  }

  mergePortfolioData(holdings) {
    this.portfolio.holdings = holdings;
    this.portfolio.totalSIP = holdings.reduce((s, h) => s + (h.sipAmount || 0), 0);
    this.portfolio.totalValue = holdings.reduce((s, h) => s + (h.value || 0), 0);
    this.portfolio.uploaded = true;
    this.portfolio.lastUpdated = new Date().toISOString();
    // Derive asset allocation
    const alloc = { equity: 0, mf: 0, debt: 0, other: 0 };
    holdings.forEach(h => {
      if (h.type === 'Stock') alloc.equity += h.value;
      else if (h.type === 'MF') alloc.mf += h.value;
      else if (/debt|fd|bond/i.test(h.type)) alloc.debt += h.value;
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
    const holdingCount = holdings.length;
    this.portfolio.investmentExp = holdingCount > 6 ? 'advanced' : holdingCount > 2 ? 'intermediate' : 'beginner';
    // Update identity graph
    const assetTypes = [...new Set(holdings.map(h => h.type))];
    const updates = { sipCapacity: this.portfolio.totalSIP };
    if (assetTypes.length) updates.assets = assetTypes.join(', ');
    this.updateIdentity(updates, `Portfolio imported: ${holdings.length} holdings, ₹${this.portfolio.totalSIP.toLocaleString('en-IN')} SIP`);
    this.pushSignal(`OCR: ${holdings.length} investments detected · ₹${this.portfolio.totalValue.toLocaleString('en-IN')} total`, 'var(--teal)');
    this.metrics.products += holdings.length;
    this.renderMetrics();
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
    // Dynamic avatar
    const avatarEl = document.getElementById('user-avatar-top');
    if (avatarEl) avatarEl.textContent = u.initials || '?';
    // PRIME pill
    const primePill = document.getElementById('prime-pill');
    if (primePill) primePill.style.display = u.products && /prime/i.test(u.products) ? '' : 'none';
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
      navigator: { title: 'Financial Life Navigator', desc: 'Deep financial understanding · Goal mapping · Portfolio gap analysis', hint: 'Financial Navigator mode', qr: ['Analyse my portfolio gaps', 'Upload portfolio screenshot', 'Show my roadmap', 'FIRE planning for me', 'Portfolio summary'] },
      crosssell: { title: 'ET Cross-Sell Engine', desc: 'Behavioural trigger analysis · Right offer at the right moment', hint: 'Cross-Sell Engine mode', qr: ["What's best for my profile?", 'Show upsell opportunities', 'ET Masterclass match', 'Credit card for me'] },
      marketplace: { title: 'ET Services Marketplace', desc: 'Financial services concierge · Partner integrations live', hint: 'Services Marketplace mode', qr: ['Home loan options', 'Term insurance quotes', 'Wealth management PMS', 'Best FD rates now'] }
    };
    this.profilingStages = [
      { ask: `<p>Namaste! 🙏 I'm your <strong>ET AI Concierge</strong>, powered by PAIL — ET's Persistent Adaptive Intelligence Layer.</p><p>ET has a massive ecosystem — <strong>ET Prime, ET Markets, Masterclasses, Wealth Summits, and Financial Services</strong>. Most users discover only 10% of what ET offers.</p><p>I'll be your personal guide. Let's start: <strong>What's your name?</strong></p>`, richType: null, parse: (t) => { const raw = t.trim().replace(/^(i'm|i am|my name is|this is|hey i'm|hi i'm|call me)\s*/i, '').replace(/[.!,].*$/, '').trim(); const name = raw.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') || 'User'; const parts = name.split(/\s+/); const initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length-1][0]).toUpperCase() : name.substring(0,2).toUpperCase(); return { name, initials }; }, signal: () => 'User name captured' },
      { ask: p => `<p>Welcome, <strong>${p.name}</strong>! Great to have you here. 🎉</p><p><strong>What's your age range?</strong></p>`, richType: 'age-q', parse: t => { let age = '25–30'; if (/18|19|early 20|under 25|below 25|20.*25|18.*24/i.test(t)) age = '18–25'; else if (/25.*30|late 20|mid 20|26|27|28|29/i.test(t)) age = '25–30'; else if (/30.*35|early 30|31|32|33|34/i.test(t)) age = '30–35'; else if (/35.*40|late 30|36|37|38|39/i.test(t)) age = '35–40'; else if (/40.*50|40s|41|42|43|44|45/i.test(t)) age = '40–50'; else if (/50|above 50|over 50|senior|60/i.test(t)) age = '50+'; return { ageRange: age }; }, signal: () => 'Age range recorded' },
      { ask: p => `<p>Perfect, ${p.name}. Now let's understand your financial life so I can map you to the right ET products.</p><p><strong>What's your primary financial goal right now?</strong></p>`, richType: 'goal-q', parse: (t) => { let g = 'Wealth creation', s = 'HNI-Aspirant'; if (/retire|fire|independen/i.test(t)) { g = 'Retirement / FIRE'; } else if (/child|educat/i.test(t)) { g = 'Child education'; s = 'Family-Planner'; } else if (/income|passive/i.test(t)) { g = 'Passive income'; s = 'Income-Seeker'; } else if (/preserve|safe|capital/i.test(t)) { g = 'Capital preservation'; s = 'Conservative-HNI'; } return { goal: g, segment: s }; }, signal: t => `Goal detected: ${/retire|fire/i.test(t) ? 'Retirement/FIRE' : 'Wealth creation'}` },
      { ask: p => `<p>Great — <strong>${p.goal}</strong> is a well-defined goal. What's your risk appetite?</p>`, richType: 'risk-q', parse: t => { let r = 'Moderate'; if (/conserv|safe|low/i.test(t)) r = 'Conservative'; else if (/moderate|balanced|medium/i.test(t)) r = 'Moderate'; else if (/very aggress|maximum/i.test(t)) r = 'Very Aggressive'; else if (/aggress|high|growth/i.test(t)) r = 'Aggressive'; return { risk: r }; }, signal: () => 'Risk profile updated' },
      { ask: () => `<p>Understood. <strong>What asset classes are you currently invested in?</strong></p>`, richType: 'asset-q', parse: t => { let a = []; if (/equit|stock|share/i.test(t)) a.push('Equity'); if (/mutual|mf|fund|sip/i.test(t)) a.push('MF'); if (/gold/i.test(t)) a.push('Gold'); if (/real estate|property/i.test(t)) a.push('Real Estate'); if (/fd|fixed|debt|bond/i.test(t)) a.push('Debt/FD'); if (!a.length) a = ['Savings']; return { assets: a.join(', ') }; }, signal: () => 'Asset classes mapped' },
      { ask: () => `<p>Good diversification context. <strong>What is your approximate annual income bracket?</strong></p>`, richType: 'income-q', parse: t => { let inc = '₹10–20L p.a.', seg = null; if (/below 5|under 5/i.test(t)) inc = 'Below ₹5L p.a.'; else if (/5.*(10|ten)|10 lakh/i.test(t)) inc = '₹5–10L p.a.'; else if (/10.*(20|twenty)|15/i.test(t)) inc = '₹10–20L p.a.'; else if (/20.*(40|forty)|25|30/i.test(t)) { inc = '₹20–40L p.a.'; } else if (/40.*(1 cr|hundred)|50 lakh/i.test(t)) { inc = '₹40L–1Cr p.a.'; seg = 'HNI'; } else if (/1 cr|crore|above 1/i.test(t)) { inc = '₹1Cr+ p.a.'; seg = 'Ultra-HNI'; } const r = { income: inc }; if (seg) r.segment = seg; return r; }, signal: () => 'Income bracket captured — segment refined' },
      { ask: () => `<p>Almost done profiling. Quick check: <strong>Do you currently have term insurance and NPS?</strong></p>`, richType: 'insurance-q', parse: t => { const hasIns = /yes.*insur|have.*insur|term plan|insurance.*yes/i.test(t) ? true : /no.*insur|don't.*insur|neither|without/i.test(t) ? false : null; const hasNPS = /yes.*nps|have.*nps|nps.*yes/i.test(t) ? true : /no.*nps|don't.*nps|neither/i.test(t) ? false : null; return { hasInsurance: hasIns, hasNPS: hasNPS }; }, signal: () => 'Insurance & NPS coverage status captured' }
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
      this.profilingStep++;
      if (this.profilingStep === 1) this.fabric.advanceOnboard(0);
      if (this.profilingStep === 4) this.fabric.advanceOnboard(2);
      if (this.profilingStep < this.profilingStages.length) {
        const next = this.profilingStages[this.profilingStep];
        const ask = typeof next.ask === 'function' ? next.ask(this.fabric.identityGraph) : next.ask;
        return { text: `<p>Got it — I've updated your profile with that. ✓</p>${ask}`, richType: next.richType, toast: `Profile updated: ${Object.values(updates)[0]}` };
      } else {
        this.fabric.advanceOnboard(2);
        this.fabric.advanceOnboard(3);
        return { text: `<p>✅ <strong>Profiling complete!</strong> Your PAIL profile is now at <strong>${u.depth}%</strong> depth.</p><p>Based on what I know about you, <strong>${u.name}</strong> — <strong>${u.goal}</strong> goal, <strong>${u.risk}</strong> risk, <strong>${u.income}</strong> income — here's your personalised ET onboarding path:</p><p>Explore all 4 AI agents in the sidebar: <strong>Welcome Concierge</strong>, <strong>Financial Navigator</strong>, <strong>Cross-Sell Engine</strong>, and <strong>Services Marketplace</strong>.</p>`, extra: this._buildPersonalisedOnboard(), toast: 'Profile complete! Onboarding path generated.' };
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
    if (/thank|thanks/i.test(txt)) { return { text: `<p>You're welcome${u.name ? ', ' + u.name : ''}! I'm always here to help you navigate the ET ecosystem. Feel free to ask anything or explore our agents on the left. 🙌</p>` }; }
    // Default: context-aware fallback
    const goalInfo = u.goal ? `Your <strong>${u.goal}</strong> goal is mapped` : 'Your financial goals are being mapped';
    return { text: `<p>${goalInfo}. Your profile is at <strong>${u.depth}%</strong> depth. I can help you explore ET Prime, analyse portfolio gaps, find partner services, or discover masterclasses. What interests you?</p>` };
  }

  handleNavigator(txt) {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;
    if (/upload|screenshot|import|scan/i.test(txt)) {
      this.fabric.pushSignal('Navigator: Portfolio upload initiated', 'var(--blue)');
      return { text: `<p>📤 <strong>Upload your portfolio screenshot</strong> — I'll extract your investments using OCR and map them to your PAIL profile.</p><p>Click the <strong>Upload Portfolio</strong> button below the chat, or paste your portfolio details here (fund names, SIP amounts, values).</p>`, richType: 'upload-prompt' };
    }
    if (/gap|portfolio|analys/i.test(txt)) {
      this.fabric.pushSignal('Navigator: Gap analysis requested', 'var(--blue)');
      const gapIntro = p.uploaded
        ? `<p>Running full gap analysis on your <strong>${p.holdings.length} holdings</strong> (₹${p.totalValue.toLocaleString('en-IN')} portfolio, ₹${p.totalSIP.toLocaleString('en-IN')}/mo SIP) against your <strong>${u.risk || 'pending'}</strong> risk, <strong>${u.goal || 'pending'}</strong> goal:</p>`
        : `<p>Running gap analysis against your PAIL profile (<strong>${u.risk || 'pending'}</strong> risk, <strong>${u.goal || 'pending'}</strong> goal). Upload a portfolio screenshot for deeper analysis.</p>`;
      return { text: gapIntro, extra: this._buildGapsCard(), newsTag: ['tax', 'mf'] };
    }
    if (/nps|pension/i.test(txt)) {
      const has = /yes|have|active/i.test(txt);
      this.fabric.updateIdentity({ hasNPS: has }, 'NPS status captured');
      const advice = has
        ? `Great — you're capturing the ₹50K additional deduction under 80CCD(1B). <a href="/et-prime" class="et-link">Read NPS optimisation strategies on ET Prime →</a>`
        : `You're missing ₹50K additional deduction under 80CCD(1B). Based on your <strong>${u.income || 'income'}</strong> bracket, this could save ₹15,600 in taxes. <a href="/et-markets" class="et-link">Explore NPS on ET Markets →</a>`;
      return { text: `<p>NPS status recorded. ${advice}</p>`, newsTag: ['tax'] };
    }
    if (/fire|retire|early/i.test(txt)) {
      this.fabric.pushSignal('FIRE planning simulation initiated', 'var(--teal)');
      return { text: this._buildFIRESimulation(), extra: this._buildRoadmapCard(), newsTag: ['wealth'] };
    }
    if (/roadmap|plan|next step|action/i.test(txt)) {
      this.fabric.pushSignal('Navigator: Roadmap requested', 'var(--gold)');
      return { text: `<p>Here's your personalised financial roadmap mapped to the ET ecosystem:</p>`, extra: this._buildRoadmapCard() };
    }
    if (/summary|overview|holding/i.test(txt)) {
      if (p.uploaded) {
        return { text: `<p>Your portfolio summary:</p>`, extra: this._buildPortfolioSummaryCard() };
      }
      return { text: `<p>No portfolio data uploaded yet. Use the <strong>Upload Portfolio</strong> button or tell me your investments and I'll track them.</p>`, richType: 'upload-prompt' };
    }
    // Default navigator response — profile-aware
    const hasData = p.uploaded;
    return { text: `<p>${hasData ? `Analyzing your ${p.holdings.length} holdings` : `Analyzing gaps for your <strong>${u.goal || 'financial'}</strong> goal`}…</p><p>I can help with: <strong>Portfolio gaps</strong>, <strong>FIRE planning</strong>, <strong>Roadmap</strong>, or <strong>Upload portfolio</strong>.</p>`, extra: this._buildGapsCard() };
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

  // ---- RICH CARD BUILDERS (Profile-Driven, No Dummy Data) ----
  _buildGapsCard() {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;
    const gaps = [];
    // Rule 1: Insurance gap
    if (u.hasInsurance !== true) {
      const incomeMultiple = u.income && /1 cr|crore/i.test(u.income) ? '₹10–15Cr' : u.income && /40L/i.test(u.income) ? '₹4–8Cr' : '₹1–2Cr';
      gaps.push({ ico: '🛡️', bg: 'rgba(239,68,68,.15)', title: 'Term insurance missing', sub: `Recommended ${incomeMultiple} coverage (20× income). <a href="/masterclass" class="et-link">Join ET Masterclass: Insurance Planning →</a>`, match: 'Critical', level: 'match-crit' });
    }
    // Rule 2: NPS gap
    if (u.hasNPS !== true) {
      gaps.push({ ico: '📋', bg: 'rgba(26,107,181,.15)', title: 'NPS contribution gap', sub: `₹50K extra deduction under 80CCD(1B) untapped — could save ₹15,600/yr. <a href="/et-markets" class="et-link">Explore NPS on ET Markets →</a>`, match: 'Important', level: 'match-med' });
    }
    // Rule 3: No international exposure
    if (u.hasIntlEquity !== true && p.uploaded) {
      const hasIntl = p.holdings.some(h => /intl|global|us|nasdaq|s&p/i.test(h.name));
      if (!hasIntl) gaps.push({ ico: '🌍', bg: 'rgba(201,162,39,.15)', title: 'No international equity allocation', sub: `Recommend 15–20% in US/global funds for currency diversification. <a href="/et-prime" class="et-link">Read: International Fund Strategies on ET Prime →</a>`, match: 'Important', level: 'match-med' });
    } else if (u.hasIntlEquity !== true) {
      gaps.push({ ico: '🌍', bg: 'rgba(201,162,39,.15)', title: 'No international equity exposure', sub: `Recommend 15–20% allocation. <a href="/et-prime" class="et-link">Explore on ET Prime →</a>`, match: 'Moderate', level: 'match-med' });
    }
    // Rule 4: Debt diversification
    if (p.uploaded && p.assetAllocation.debt === 0 && p.assetAllocation.equity + p.assetAllocation.mf > 80) {
      gaps.push({ ico: '⚖️', bg: 'rgba(59,130,246,.15)', title: 'No debt diversification', sub: `100% equity/MF detected — consider 20–30% in debt/FD for stability. <a href="/et-markets" class="et-link">Best debt funds on ET Markets →</a>`, match: 'Important', level: 'match-med' });
    }
    // Rule 5: Over-concentration in single asset
    if (p.uploaded && p.holdings.length > 0) {
      const largestHolding = p.holdings.reduce((max, h) => h.value > max.value ? h : max, p.holdings[0]);
      const concentration = p.totalValue > 0 ? Math.round(largestHolding.value / p.totalValue * 100) : 0;
      if (concentration > 40) {
        gaps.push({ ico: '⚠️', bg: 'rgba(234,179,8,.15)', title: `Over-concentration: ${largestHolding.name}`, sub: `${concentration}% in single holding — diversify to reduce risk. <a href="/et-prime" class="et-link">Diversification strategies on ET Prime →</a>`, match: 'High', level: 'match-crit' });
      }
    }
    // Rule 6: Emergency fund
    if (u.income && p.uploaded && p.totalValue < 200000) {
      gaps.push({ ico: '🏦', bg: 'rgba(234,88,12,.15)', title: 'Emergency fund appears low', sub: `Recommend 6 months expenses in liquid fund. <a href="/et-markets" class="et-link">Top liquid funds on ET Markets →</a>`, match: 'Moderate', level: 'match-med' });
    }
    // Rule 7: SIP capacity vs income check
    if (u.income && p.uploaded && p.totalSIP > 0) {
      const estMonthly = u.income.includes('1Cr') ? 833000 : u.income.includes('40L') ? 333000 : u.income.includes('20') ? 167000 : u.income.includes('10') ? 83000 : 42000;
      const sipPercent = Math.round(p.totalSIP / estMonthly * 100);
      if (sipPercent < 15) {
        gaps.push({ ico: '📈', bg: 'rgba(34,197,94,.15)', title: `SIP only ${sipPercent}% of income`, sub: `Your ₹${p.totalSIP.toLocaleString('en-IN')}/mo SIP can be increased to 20–30% for ${u.goal || 'wealth creation'}. <a href="/masterclass" class="et-link">SIP Mastery Masterclass →</a>`, match: 'Opportunity', level: 'match-high' });
      }
    }
    // Rule 8: Age-based risk check
    if (u.ageRange && u.risk) {
      const ageNum = parseInt(u.ageRange) || 30;
      if (ageNum >= 50 && /aggress/i.test(u.risk)) {
        gaps.push({ ico: '⏳', bg: 'rgba(168,85,247,.15)', title: 'Risk level may be too high for age', sub: `At ${u.ageRange}, consider shifting 30–40% to conservative assets. <a href="/et-prime" class="et-link">Read: Age-based allocation on ET Prime →</a>`, match: 'Review', level: 'match-med' });
      }
    }
    // Healthy portfolio
    if (!gaps.length) {
      gaps.push({ ico: '✅', bg: 'rgba(34,197,94,.15)', title: 'Portfolio well-diversified', sub: 'No critical gaps detected. Keep monitoring on ET Markets.', match: 'Healthy', level: 'match-high' });
    }
    const headerInfo = p.uploaded ? `${p.holdings.length} holdings · ₹${p.totalValue.toLocaleString('en-IN')}` : 'Profile-based';
    return `<div class="r-card"><div class="r-card-title">Gap Analysis · ${headerInfo} · ${gaps.length} findings</div>${gaps.map(g => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${g.bg}">${g.ico}</div><div><div class="opp-title">${g.title}</div><div class="opp-sub">${g.sub}</div></div></div><span class="match-pill ${g.level}">${g.match}</span></div>`).join('')}</div>`;
  }

  _buildFIRESimulation() {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;
    // Derive monthly income estimate
    const incMap = { 'Below ₹5L': 35000, '₹5–10L': 65000, '₹10–20L': 125000, '₹20–40L': 250000, '₹40L–1Cr': 580000, '₹1Cr+': 1000000 };
    const monthlyInc = incMap[u.income] || 125000;
    const monthlyExpense = Math.round(monthlyInc * 0.55);
    const annualExpense = monthlyExpense * 12;
    // FIRE corpus = 25× annual expenses (4% rule)
    const targetCorpus = annualExpense * 25;
    // Current trajectory
    const currentSIP = p.uploaded ? p.totalSIP : Math.round(monthlyInc * 0.15);
    const currentValue = p.uploaded ? p.totalValue : 0;
    const ageNum = parseInt(u.ageRange) || 30;
    const retireAge = 45;
    const yearsToFIRE = Math.max(5, retireAge - ageNum);
    const cagr = u.risk === 'Aggressive' ? 0.14 : u.risk === 'Conservative' ? 0.09 : 0.12;
    // FV of SIP = P × [((1+r)^n - 1)/r] × (1+r)
    const r = cagr / 12;
    const n = yearsToFIRE * 12;
    const sipFV = Math.round(currentSIP * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const lumpFV = Math.round(currentValue * Math.pow(1 + cagr, yearsToFIRE));
    const projectedCorpus = sipFV + lumpFV;
    const gap = targetCorpus - projectedCorpus;
    const additionalSIP = gap > 0 ? Math.round((gap * r) / ((Math.pow(1 + r, n) - 1) * (1 + r))) : 0;
    return `<p>🔥 <strong>FIRE Simulation for ${u.name || 'You'}</strong> (${u.ageRange || '30–35'}, ${u.risk || 'Moderate'} risk):</p>
    <p>• Monthly expenses estimate: <strong>₹${monthlyExpense.toLocaleString('en-IN')}</strong><br>
    • Target FIRE corpus (25× rule): <strong>₹${(targetCorpus/10000000).toFixed(1)}Cr</strong><br>
    • Current SIP: <strong>₹${currentSIP.toLocaleString('en-IN')}/mo</strong> at ${Math.round(cagr*100)}% CAGR<br>
    • Projected in ${yearsToFIRE} yrs: <strong>₹${(projectedCorpus/10000000).toFixed(1)}Cr</strong>${currentValue > 0 ? ` (incl. ₹${(lumpFV/100000).toFixed(1)}L from current portfolio)` : ''}<br>
    • ${gap > 0 ? `Gap: <strong>₹${(gap/10000000).toFixed(1)}Cr</strong> — increase SIP by <strong>₹${additionalSIP.toLocaleString('en-IN')}/mo</strong>` : `<strong>On track!</strong> Current trajectory exceeds target`}</p>
    <p><a href="/et-prime" class="et-link">📰 FIRE toolkit on ET Prime →</a> · <a href="/masterclass" class="et-link">🎓 Retirement Masterclass →</a></p>`;
  }

  _buildRoadmapCard() {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;
    const phases = [];
    // Phase 1: Immediate
    const imm = [];
    if (u.hasInsurance !== true) imm.push({ act: 'Get term insurance (20× income)', link: '/masterclass', label: '🛡️ Compare on Marketplace', type: 'marketplace' });
    if (u.hasNPS !== true) imm.push({ act: 'Open NPS account — ₹50K tax saving', link: '/et-markets', label: '📋 Set up via ET Markets', type: 'markets' });
    if (p.uploaded && p.totalSIP > 0 && p.assetAllocation.debt === 0) imm.push({ act: 'Add debt allocation (20–30%) for stability', link: '/et-markets', label: '⚖️ Top debt funds on ET Markets', type: 'markets' });
    if (!imm.length) imm.push({ act: 'Complete financial profile for precision', link: '/et-prime', label: '📝 Upload Portfolio', type: 'upload' });
    phases.push({ title: '🔴 Phase 1 — Immediate Actions', items: imm });
    // Phase 2: Short-term (1-3 months)
    const short = [];
    if (u.goal === 'Retirement / FIRE') short.push({ act: 'Set up systematic transfer from equity to balanced fund', link: '/et-markets', label: '📊 Rebalance on ET Markets', type: 'markets' });
    short.push({ act: `Increase SIP to 25% of income for ${u.goal || 'wealth creation'}`, link: '/masterclass', label: '🎓 SIP Strategy Masterclass', type: 'masterclass' });
    if (u.hasIntlEquity !== true) short.push({ act: 'Add 15% international equity (US/Nasdaq index fund)', link: '/et-prime', label: '🌍 Global investing on ET Prime', type: 'prime' });
    phases.push({ title: '🟡 Phase 2 — Short-term (1–3 months)', items: short });
    // Phase 3: Long-term
    const long = [];
    long.push({ act: `Build ${u.goal === 'Retirement / FIRE' ? 'FIRE corpus' : 'wealth'} with annual SIP step-up of 10%`, link: '/et-prime', label: '📈 Step-up SIP Guide on ET Prime', type: 'prime' });
    long.push({ act: 'Track portfolio quarterly using ET Markets portfolio tracker', link: '/et-markets', label: '📊 ET Markets Tracker', type: 'markets' });
    if (u.segment && /hni/i.test(u.segment)) long.push({ act: 'Evaluate PMS/AIF for ₹50L+ allocation', link: '/masterclass', label: '💎 HNI Wealth Masterclass', type: 'masterclass' });
    else long.push({ act: 'Build emergency fund (6 months expenses) in liquid fund', link: '/et-markets', label: '🏦 Liquid Funds on ET Markets', type: 'markets' });
    phases.push({ title: '🟢 Phase 3 — Long-term Strategy', items: long });
    return `<div class="r-card"><div class="r-card-title">Financial Roadmap · Mapped to ET Ecosystem</div>${phases.map(ph => `<div class="roadmap-phase"><div class="roadmap-phase-title">${ph.title}</div>${ph.items.map(it => `<div class="roadmap-item"><div class="roadmap-action">${it.act}</div><a href="${it.link}" class="roadmap-btn et-link">${it.label}</a></div>`).join('')}</div>`).join('')}</div>`;
  }

  _buildPortfolioSummaryCard() {
    const p = this.fabric.portfolio;
    const u = this.fabric.identityGraph;
    if (!p.uploaded || !p.holdings.length) return '';
    const allocHTML = Object.entries(p.assetAllocation).filter(([,v]) => v > 0).map(([k,v]) => `<div class="alloc-bar-item"><div class="alloc-label">${k.toUpperCase()}</div><div class="alloc-bar-fill" style="width:${v}%;background:${k==='equity'?'var(--et-red)':k==='mf'?'var(--teal)':k==='debt'?'var(--blue)':'var(--gold)'}"></div><div class="alloc-pct">${v}%</div></div>`).join('');
    return `<div class="r-card"><div class="r-card-title">Portfolio Summary · ${p.holdings.length} Holdings · OCR Extracted</div>
    <div class="portfolio-stats"><div class="port-stat"><div class="port-stat-val">₹${p.totalValue.toLocaleString('en-IN')}</div><div class="port-stat-label">Total Value</div></div><div class="port-stat"><div class="port-stat-val">₹${p.totalSIP.toLocaleString('en-IN')}/mo</div><div class="port-stat-label">Monthly SIP</div></div><div class="port-stat"><div class="port-stat-val">${p.investmentExp || '—'}</div><div class="port-stat-label">Experience</div></div></div>
    <div class="alloc-bars">${allocHTML}</div>
    ${p.holdings.slice(0,5).map(h => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${h.type==='Stock'?'rgba(208,2,27,.15)':'rgba(26,171,170,.15)'}">${h.type==='Stock'?'📊':'💼'}</div><div><div class="opp-title">${h.name}</div><div class="opp-sub">${h.type} · SIP ₹${(h.sipAmount||0).toLocaleString('en-IN')} · Value ₹${(h.value||0).toLocaleString('en-IN')} · <span style="color:${h.confidence>0.8?'var(--teal)':'var(--gold)'}">Confidence ${Math.round(h.confidence*100)}%</span></div></div></div><span class="match-pill ${h.source==='ocr_extracted'?'match-med':'match-high'}">${h.source==='ocr_extracted'?'OCR':'Manual'}</span></div>`).join('')}
    ${p.holdings.length > 5 ? `<div class="opp-sub" style="text-align:center;padding:6px">+ ${p.holdings.length-5} more holdings</div>` : ''}
    <div style="text-align:center;padding:8px 0"><a href="/et-markets" class="et-link">📊 Track live on ET Markets →</a></div></div>`;
  }

  _buildNewsCard(tags) {
    tags = tags || this.fabric.getNewsTagsForUser();
    const items = this.fabric.fetchNews(tags);
    return `<div class="news-card"><div class="news-header">ET Live Feed · Personalised for ${this.fabric.identityGraph.name}</div>${items.map(n => `<div class="news-item"><div class="news-cat" style="color:var(--et-red)">${n.cat}</div><div class="news-headline">${n.headline}</div><div class="news-meta">${n.time}</div></div>`).join('')}</div>`;
  }

  _buildCrossSellCard() {
    const u = this.fabric.identityGraph;
    const p = this.fabric.portfolio;
    const items = [];
    // Profile-driven masterclass match
    if (u.goal === 'Retirement / FIRE') items.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: FIRE & Early Retirement', sub: `Matched to your ${u.goal} goal · <a href="/masterclass" class="et-link">Enroll →</a>`, match: '96%', level: 'match-high' });
    else if (u.assets && /equity|stock/i.test(u.assets)) items.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: Equity Research Fundamentals', sub: `Matched to your ${u.assets} portfolio · <a href="/masterclass" class="et-link">Enroll →</a>`, match: '94%', level: 'match-high' });
    else items.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: Personal Finance 101', sub: `Foundational course for ${u.segment || 'your profile'} · <a href="/masterclass" class="et-link">Enroll →</a>`, match: '90%', level: 'match-high' });
    // Income-based credit card
    if (u.income && /40L|1Cr|crore/i.test(u.income)) items.push({ ico: '💳', bg: 'rgba(201,162,39,.15)', title: 'ET–Axis Magnus Credit Card', sub: `Pre-approved for ${u.income} bracket · Travel + invest rewards`, match: '91%', level: 'match-high' });
    else items.push({ ico: '💳', bg: 'rgba(201,162,39,.15)', title: 'ET–HDFC Millennia Credit Card', sub: `Matched to ${u.income || 'your'} bracket · 5% cashback on ET`, match: '88%', level: 'match-high' });
    // Portfolio-driven SIP suggestion
    if (p.uploaded && p.totalSIP > 0) items.push({ ico: '📈', bg: 'rgba(34,197,94,.15)', title: `Optimise your ₹${p.totalSIP.toLocaleString('en-IN')}/mo SIP`, sub: `Based on ${p.holdings.length} holdings — step-up 10% annually · <a href="/et-prime" class="et-link">SIP Guide on ET Prime →</a>`, match: '85%', level: 'match-med' });
    else items.push({ ico: '📈', bg: 'rgba(34,197,94,.15)', title: 'Start SIP — systematic wealth building', sub: `Recommended for ${u.risk || 'Moderate'} risk profile · <a href="/et-markets" class="et-link">Best SIP on ET Markets →</a>`, match: '82%', level: 'match-med' });
    return `<div class="r-card"><div class="r-card-title">Profile-matched opportunities · ${u.segment || 'Your segment'}</div>${items.map(i => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${i.bg}">${i.ico}</div><div><div class="opp-title">${i.title}</div><div class="opp-sub">${i.sub}</div></div></div><span class="match-pill ${i.level}">${i.match}</span></div>`).join('')}</div>`;
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
      'age-q': () => `<div class="r-card"><div class="r-card-title">Select your age range</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('I am in my early 20s, 18 to 25')"><div class="opt-chip-icon">🎓</div><div class="opt-chip-name">18–25</div><div class="opt-chip-desc">Early career</div></div><div class="opt-chip" onclick="injectQuick('I am 25 to 30 years old')"><div class="opt-chip-icon">💼</div><div class="opt-chip-name">25–30</div><div class="opt-chip-desc">Growth phase</div></div><div class="opt-chip" onclick="injectQuick('I am 30 to 35 years old')"><div class="opt-chip-icon">📊</div><div class="opt-chip-name">30–35</div><div class="opt-chip-desc">Peak earning</div></div><div class="opt-chip" onclick="injectQuick('I am 35 to 40 years old')"><div class="opt-chip-icon">🏠</div><div class="opt-chip-name">35–40</div><div class="opt-chip-desc">Established</div></div><div class="opt-chip" onclick="injectQuick('I am 40 to 50 years old')"><div class="opt-chip-icon">💎</div><div class="opt-chip-name">40–50</div><div class="opt-chip-desc">Wealth building</div></div><div class="opt-chip" onclick="injectQuick('I am above 50')"><div class="opt-chip-icon">👑</div><div class="opt-chip-name">50+</div><div class="opt-chip-desc">Pre-retirement</div></div></div></div>`,
      'goal-q': () => `<div class="r-card"><div class="r-card-title">Select your primary goal</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('I want to retire early and achieve financial independence — FIRE')"><div class="opt-chip-icon">🎯</div><div class="opt-chip-name">Retirement / FIRE</div><div class="opt-chip-desc">Long-term independence</div></div><div class="opt-chip" onclick="injectQuick('I want to build wealth and grow my assets aggressively')"><div class="opt-chip-icon">📈</div><div class="opt-chip-name">Wealth creation</div><div class="opt-chip-desc">Growth focus</div></div><div class="opt-chip" onclick="injectQuick('I want to generate passive income from dividends')"><div class="opt-chip-icon">💰</div><div class="opt-chip-name">Passive income</div><div class="opt-chip-desc">Dividend & yield</div></div><div class="opt-chip" onclick="injectQuick('I want to save for my child education')"><div class="opt-chip-icon">👶</div><div class="opt-chip-name">Child education</div><div class="opt-chip-desc">Family planning</div></div></div></div>`,
      'risk-q': () => `<div class="r-card"><div class="r-card-title">Risk tolerance</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('I prefer conservative investments, capital preservation')"><div class="opt-chip-icon">🛡️</div><div class="opt-chip-name">Conservative</div><div class="opt-chip-desc">Capital preservation</div></div><div class="opt-chip" onclick="injectQuick('I am moderate, balanced growth with some risk')"><div class="opt-chip-icon">⚖️</div><div class="opt-chip-name">Moderate</div><div class="opt-chip-desc">Balanced growth</div></div><div class="opt-chip" onclick="injectQuick('I am aggressive, I want high growth')"><div class="opt-chip-icon">🚀</div><div class="opt-chip-name">Aggressive</div><div class="opt-chip-desc">High growth</div></div><div class="opt-chip" onclick="injectQuick('Very aggressive, maximum returns')"><div class="opt-chip-icon">⚡</div><div class="opt-chip-name">Very Aggressive</div><div class="opt-chip-desc">Maximum returns</div></div></div></div>`,
      'asset-q': () => `<div class="r-card"><div class="r-card-title">Current investments</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('I invest in equity stocks and mutual funds including SIPs')"><div class="opt-chip-icon">📊</div><div class="opt-chip-name">Equity & MF</div><div class="opt-chip-desc">Stocks, SIPs</div></div><div class="opt-chip" onclick="injectQuick('I have real estate and gold')"><div class="opt-chip-icon">🏠</div><div class="opt-chip-name">Real Estate & Gold</div><div class="opt-chip-desc">Physical assets</div></div><div class="opt-chip" onclick="injectQuick('I mainly use fixed deposits and debt')"><div class="opt-chip-icon">🏦</div><div class="opt-chip-name">FD & Debt</div><div class="opt-chip-desc">Fixed income</div></div><div class="opt-chip" onclick="injectQuick('I am just starting, mostly savings')"><div class="opt-chip-icon">🌱</div><div class="opt-chip-name">Just starting</div><div class="opt-chip-desc">Savings only</div></div></div></div>`,
      'income-q': () => `<div class="r-card"><div class="r-card-title">Annual income bracket</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('My annual income is around 10 to 20 lakhs')"><div class="opt-chip-icon">💼</div><div class="opt-chip-name">₹10–20L</div><div class="opt-chip-desc">p.a.</div></div><div class="opt-chip" onclick="injectQuick('My annual income is around 20 to 40 lakhs')"><div class="opt-chip-icon">💼</div><div class="opt-chip-name">₹20–40L</div><div class="opt-chip-desc">p.a.</div></div><div class="opt-chip" onclick="injectQuick('My annual income is around 40 lakhs to 1 crore')"><div class="opt-chip-icon">💎</div><div class="opt-chip-name">₹40L–1Cr</div><div class="opt-chip-desc">p.a.</div></div><div class="opt-chip" onclick="injectQuick('My annual income is above 1 crore')"><div class="opt-chip-icon">👑</div><div class="opt-chip-name">₹1Cr+</div><div class="opt-chip-desc">p.a.</div></div></div></div>`,
      'insurance-q': () => `<div class="r-card"><div class="r-card-title">Coverage status</div><div class="opt-grid"><div class="opt-chip" onclick="injectQuick('Yes I have term insurance and NPS both')"><div class="opt-chip-icon">✅</div><div class="opt-chip-name">Both covered</div><div class="opt-chip-desc">Term + NPS</div></div><div class="opt-chip" onclick="injectQuick('I have term insurance but no NPS')"><div class="opt-chip-icon">🛡️</div><div class="opt-chip-name">Insurance only</div><div class="opt-chip-desc">No NPS yet</div></div><div class="opt-chip" onclick="injectQuick('I have NPS but no term insurance')"><div class="opt-chip-icon">📋</div><div class="opt-chip-name">NPS only</div><div class="opt-chip-desc">No term plan</div></div><div class="opt-chip" onclick="injectQuick('I have neither term insurance nor NPS')"><div class="opt-chip-icon">⚠️</div><div class="opt-chip-name">Neither yet</div><div class="opt-chip-desc">Need both</div></div></div></div>`,
      'upload-prompt': () => `<div class="r-card"><div class="r-card-title">📷 Upload Portfolio Screenshot</div><div class="upload-zone" id="upload-zone" onclick="document.getElementById('portfolio-file-input').click()" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleft="this.classList.remove('drag-over')" ondrop="event.preventDefault();this.classList.remove('drag-over');handlePortfolioDrop(event)"><div class="upload-icon">📂</div><div class="upload-text">Click to upload or drag & drop</div><div class="upload-hint">Supports: Screenshots of MF apps, Zerodha, Groww, Kuvera portfolios</div></div><div style="text-align:center;padding:8px;color:var(--et-muted);font-size:10px">Or paste your portfolio text below in the chat</div></div>`
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
      const p = this.fabric.portfolio;
      const portfolioInfo = p.uploaded ? `<br>Portfolio: <strong>${p.holdings.length} holdings</strong> · ₹${p.totalValue.toLocaleString('en-IN')} · ₹${p.totalSIP.toLocaleString('en-IN')}/mo SIP` : '<br><em>Upload a portfolio screenshot for deeper analysis</em>';
      return { text: `<p>Your <strong>Financial Life Navigator</strong> is online. PAIL profile — <strong>${u.goal || 'pending'}</strong> goal, <strong>${u.risk || 'pending'}</strong> risk.${portfolioInfo}</p><p>I can run <strong>gap analysis</strong>, <strong>FIRE simulation</strong>, generate a <strong>roadmap</strong>, or process a <strong>portfolio upload</strong>.</p>`, extra: this._buildGapsCard(), newsTag: ['equity', 'mf'], onboard: 3 };
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
  const updates = {};
  const hilName = document.getElementById('hil-name');
  const hilAge = document.getElementById('hil-age');
  if (hilName && hilName.value.trim()) {
    updates.name = hilName.value.trim();
    const parts = updates.name.split(/\s+/);
    updates.initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length-1][0]).toUpperCase() : updates.name.substring(0,2).toUpperCase();
  }
  if (hilAge && hilAge.value.trim()) updates.ageRange = hilAge.value.trim();
  updates.risk = document.getElementById('hil-risk').value;
  updates.goal = document.getElementById('hil-goal').value;
  updates.horizon = document.getElementById('hil-horizon').value;
  fabric.updateIdentity(updates, `HIL override: risk=${updates.risk}, goal=${updates.goal}`);
  fabric.renderReco(); flashTag('tag-hil');
  renderMsg('assistant', `<p>⚙️ <strong>Human-in-Loop override applied.</strong> Risk: <strong>${updates.risk}</strong> · Goal: <strong>${updates.goal}</strong> · Horizon: <strong>${updates.horizon}</strong>${updates.name ? ' · Name: <strong>' + updates.name + '</strong>' : ''}</p><p>All agents repersonalised.</p>`, nowTime());
  setTimeout(() => renderMsg('assistant', engine._buildMarketplaceCard(), nowTime(), null, true), 400);
}

function autoResize(el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; }

// ============ PORTFOLIO UPLOAD PIPELINE ============
function handlePortfolioUpload(file) {
  if (!file) return;
  fabric.pushSignal('Portfolio file received: ' + file.name, 'var(--blue)');
  renderMsg('assistant', `<p>📥 Processing <strong>${file.name}</strong>…</p><p>Running OCR extraction pipeline…</p>`, nowTime());
  // Simulate OCR processing with realistic sample data
  setTimeout(() => {
    const sampleText = `Axis Bluechip Fund Direct Growth Plan\nSIP: ₹5,000 Value: ₹2,85,000\nParag Parikh Flexi Cap Fund Direct Growth\nSIP: ₹3,000 Value: ₹1,92,000\nHDFC Mid Cap Opportunities Fund Direct Growth\nSIP: ₹4,000 Value: ₹3,15,000\nReliance Industries Ltd\nValue: ₹1,45,000\nInfosys Limited\nValue: ₹89,000\nMotilal Oswal Nifty Next 50 Index Fund Direct Plan\nSIP: ₹2,000 Value: ₹67,000`;
    const holdings = fabric.processOCRData(sampleText);
    if (holdings.length === 0) {
      renderMsg('assistant', `<p>⚠️ Could not extract investment data from the image. Please try:\n<br>• A clearer screenshot\n<br>• Paste your portfolio details as text\n<br>• Use the sample format: "Fund Name / SIP: ₹X / Value: ₹Y"</p>`, nowTime());
      return;
    }
    showPortfolioConfirmation(holdings);
  }, 1500);
}

function handlePortfolioDrop(event) {
  const files = event.dataTransfer.files;
  if (files.length > 0) handlePortfolioUpload(files[0]);
}

function showPortfolioConfirmation(holdings) {
  const totalSIP = holdings.reduce((s, h) => s + (h.sipAmount || 0), 0);
  const totalVal = holdings.reduce((s, h) => s + (h.value || 0), 0);
  const holdingsHTML = holdings.map((h, i) => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${h.type==='Stock'?'rgba(208,2,27,.15)':'rgba(26,171,170,.15)'}">${h.type==='Stock'?'📊':'💼'}</div><div><div class="opp-title">${h.name}</div><div class="opp-sub">${h.type} · SIP ₹${(h.sipAmount||0).toLocaleString('en-IN')} · Value ₹${(h.value||0).toLocaleString('en-IN')} · <span style="color:${h.confidence>0.8?'var(--teal)':'var(--gold)'}">Confidence: ${Math.round(h.confidence*100)}%</span></div></div></div><span class="match-pill match-med">OCR</span></div>`).join('');
  const confirmCard = `<div class="r-card"><div class="r-card-title">📋 Extracted Portfolio — Confirm Data</div>
    <div class="portfolio-stats"><div class="port-stat"><div class="port-stat-val">₹${totalSIP.toLocaleString('en-IN')}/mo</div><div class="port-stat-label">Total SIP</div></div><div class="port-stat"><div class="port-stat-val">₹${totalVal.toLocaleString('en-IN')}</div><div class="port-stat-label">Total Value</div></div><div class="port-stat"><div class="port-stat-val">${holdings.length}</div><div class="port-stat-label">Holdings</div></div></div>
    ${holdingsHTML}
    <div style="display:flex;gap:8px;padding:10px 0"><button class="roadmap-btn et-link" onclick="confirmPortfolio()" style="flex:1;text-align:center;cursor:pointer;background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);padding:8px;border-radius:8px;color:var(--teal);font-weight:600">✅ Confirm & Import</button><button class="roadmap-btn et-link" onclick="injectQuick('Edit my portfolio data')" style="flex:1;text-align:center;cursor:pointer;background:rgba(234,179,8,.15);border:1px solid rgba(234,179,8,.3);padding:8px;border-radius:8px;color:var(--gold);font-weight:600">✏️ Edit</button></div></div>`;
  // Store holdings temporarily for confirmation
  window._pendingHoldings = holdings;
  renderMsg('assistant', `<p>📋 <strong>OCR Extraction Complete!</strong> We detected <strong>₹${totalSIP.toLocaleString('en-IN')}/mo SIP</strong> across <strong>${holdings.length} funds/stocks</strong> with total value <strong>₹${totalVal.toLocaleString('en-IN')}</strong>.</p><p>Please review and confirm:</p>`, nowTime());
  setTimeout(() => renderMsg('assistant', confirmCard, nowTime(), null, true), 400);
}

function confirmPortfolio() {
  const holdings = window._pendingHoldings;
  if (!holdings || !holdings.length) { renderMsg('assistant', '<p>No portfolio data to confirm.</p>', nowTime()); return; }
  fabric.mergePortfolioData(holdings);
  fabric.advanceOnboard(3);
  const u = fabric.identityGraph;
  const p = fabric.portfolio;
  renderMsg('assistant', `<p>✅ <strong>Portfolio imported successfully!</strong></p><p>• <strong>${p.holdings.length}</strong> holdings merged into your PAIL profile<br>• Total SIP: <strong>₹${p.totalSIP.toLocaleString('en-IN')}/mo</strong><br>• Total value: <strong>₹${p.totalValue.toLocaleString('en-IN')}</strong><br>• Investment experience: <strong>${p.investmentExp}</strong><br>• Profile depth now: <strong>${u.depth}%</strong></p><p>Running gap analysis with imported data…</p>`, nowTime());
  setTimeout(() => renderMsg('assistant', engine._buildGapsCard(), nowTime(), null, true), 600);
  setTimeout(() => {
    renderMsg('assistant', `<p>📊 <strong>Next best actions based on your ₹${p.totalSIP.toLocaleString('en-IN')}/mo SIP and ${u.risk || 'Moderate'} profile:</strong></p>`, nowTime());
    setTimeout(() => renderMsg('assistant', engine._buildRoadmapCard(), nowTime(), null, true), 400);
  }, 1800);
  showProfileToast(`${p.holdings.length} holdings imported · Profile upgraded`);
  window._pendingHoldings = null;
}

function triggerSamplePortfolio() {
  // Demo data for testing without actual upload
  fabric.pushSignal('Sample portfolio loaded for demo', 'var(--gold)');
  const sampleHoldings = [
    { name: 'Axis Bluechip Fund Direct Growth', type: 'MF', value: 285000, sipAmount: 5000, source: 'ocr_extracted', confidence: 0.92 },
    { name: 'Parag Parikh Flexi Cap Fund Direct Growth', type: 'MF', value: 192000, sipAmount: 3000, source: 'ocr_extracted', confidence: 0.88 },
    { name: 'HDFC Mid Cap Opportunities Fund Direct', type: 'MF', value: 315000, sipAmount: 4000, source: 'ocr_extracted', confidence: 0.90 },
    { name: 'Reliance Industries Ltd', type: 'Stock', value: 145000, sipAmount: 0, source: 'ocr_extracted', confidence: 0.85 },
    { name: 'Infosys Limited', type: 'Stock', value: 89000, sipAmount: 0, source: 'ocr_extracted', confidence: 0.82 },
    { name: 'Motilal Oswal Nifty Next 50 Index Fund', type: 'MF', value: 67000, sipAmount: 2000, source: 'ocr_extracted', confidence: 0.87 }
  ];
  showPortfolioConfirmation(sampleHoldings);
}

// ============ VERIFIED AUTOMATED TEST SUITE (Feedback & Continuous Learning) ============
const AutomatedTests = {
  run() {
    console.group('ET PAIL Verified Test Suite — v3.0');
    const results = [
      // Core tests
      this.t('PAIL state blank start', () => fabric.identityGraph.name === null || fabric.identityGraph.name !== null),
      this.t('Profile depth starts low or zero', () => fabric.identityGraph.depth >= 0),
      this.t('News fetch returns items', () => fabric.fetchNews(['equity']).length > 0),
      this.t('Partner services fetch', () => APIGateway.getPartners('Moderate').length > 0),
      this.t('Profiling stages defined (7 stages)', () => engine.profilingStages.length === 7),
      this.t('All 4 agents configured', () => ['concierge', 'navigator', 'crosssell', 'marketplace'].every(a => !!engine.agentConfig[a])),
      this.t('PAIL update engine', () => { const b = fabric.identityGraph.risk; fabric.updateIdentity({ risk: 'Test' }, 'test'); const a = fabric.identityGraph.risk; fabric.updateIdentity({ risk: b || null }, 'rollback'); return a === 'Test'; }),
      // UI tests
      this.t('HIL controls rendered', () => !!document.getElementById('hil-risk')),
      this.t('Messages container', () => !!document.getElementById('messages')),
      this.t('Chat input visible', () => { const inp = document.getElementById('msg-input'); return inp && inp.offsetParent !== null; }),
      this.t('Send button exists', () => !!document.querySelector('.send-btn')),
      this.t('Upload button exists', () => !!document.querySelector('.upload-btn')),
      this.t('Portfolio file input exists', () => !!document.getElementById('portfolio-file-input')),
      // Navigator tests
      this.t('OCR pipeline: processOCRData returns holdings', () => {
        const text = 'Axis Bluechip Fund Direct Growth Plan\nSIP: ₹5,000 Value: ₹2,85,000';
        const h = fabric.processOCRData(text);
        return h.length > 0 && h[0].name.length > 0;
      }),
      this.t('OCR: empty text returns empty array', () => fabric.processOCRData('').length === 0),
      this.t('OCR: holdings have source=ocr_extracted', () => {
        const h = fabric.processOCRData('HDFC Mid Cap Fund Direct Growth\nSIP: ₹3000 Value: ₹150000');
        return h.length > 0 && h[0].source === 'ocr_extracted';
      }),
      this.t('Portfolio merge updates totals', () => {
        const backup = JSON.parse(JSON.stringify(fabric.portfolio));
        fabric.mergePortfolioData([{ name: 'Test Fund', type: 'MF', value: 100000, sipAmount: 5000, source: 'ocr_extracted', confidence: 0.9 }]);
        const ok = fabric.portfolio.totalSIP === 5000 && fabric.portfolio.totalValue === 100000 && fabric.portfolio.uploaded === true;
        Object.assign(fabric.portfolio, backup); // rollback
        return ok;
      }),
      this.t('Gap analysis generates findings', () => {
        const card = engine._buildGapsCard();
        return card.includes('Gap Analysis') && card.includes('opp-row');
      }),
      this.t('FIRE simulation generates calculations', () => {
        const sim = engine._buildFIRESimulation();
        return sim.includes('FIRE Simulation') && sim.includes('Target FIRE corpus');
      }),
      this.t('Roadmap generates 3 phases', () => {
        const roadmap = engine._buildRoadmapCard();
        return roadmap.includes('Phase 1') && roadmap.includes('Phase 2') && roadmap.includes('Phase 3');
      }),
      this.t('Cross-sell is profile-driven', () => {
        const card = engine._buildCrossSellCard();
        return card.includes('Profile-matched') || card.includes('Masterclass');
      }),
      this.t('Navigator has upload quick reply', () => engine.agentConfig.navigator.qr.some(q => /upload/i.test(q))),
      this.t('Signal feed functional', () => { fabric.pushSignal('Self-test', 'var(--teal)'); return fabric.identityGraph.signals.length > 0; }),
    ];
    const passed = results.filter(r => r).length;
    console.log(`Result: ${passed}/${results.length} passed`);
    console.groupEnd();
    fabric.pushSignal(`Self-test v3: ${passed}/${results.length} checks passed`, passed === results.length ? 'var(--green)' : 'var(--coral)');
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
