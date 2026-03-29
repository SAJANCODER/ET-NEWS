/**
 * PAIL v8.0 — ET AI Concierge Engine (Enterprise Masterpiece Build)
 * Architecture: ETEcosystemKB → ETLiveData → ContextualNLPEngine → Orchestrator → DataFabric
 * Features: Deep Math Core, Strict Intent Hierarchy, Dynamic Onboarding, Custom Inputs
 */

// ============================= ET ECOSYSTEM KNOWLEDGE BASE =============================
const ETEcosystemKB = {
  products: {
    prime: { name: 'ET Prime', icon: '📰', color: 'rgba(208,2,27,.15)', url: 'https://economictimes.indiatimes.com/prime', desc: 'Premium ad-free journalism and exclusive research', keywords: ['prime', 'premium', 'exclusive', 'subscribe', 'ad-free'] },
    markets: {
      name: 'ET Markets', icon: '📊', color: 'rgba(26,107,181,.15)', url: 'https://economictimes.indiatimes.com/markets', desc: 'Live market data and stock screeners', keywords: ['market', 'stock', 'nifty', 'sensex', 'trading', 'share'],
      sections: {
        stocks: { name: 'Stocks', url: 'https://economictimes.indiatimes.com/markets/stocks', keywords: ['stock market', 'equity'] },
        mf_news: { name: 'Mutual Fund News', url: 'https://economictimes.indiatimes.com/mutual-funds/news', keywords: ['mutual fund news', 'mf news', 'sip news'] },
        mf: { name: 'Mutual Funds', url: 'https://economictimes.indiatimes.com/mutual-funds', keywords: ['mutual fund', 'mf', 'sip', 'nav'] },
        fno: { name: 'Futures & Options', url: 'https://economictimes.indiatimes.com/markets/stocks/livequotes/derivatives', keywords: ['future', 'option', 'f&o', 'fno', 'derivative'] },
        ipo: { name: 'IPO Hub', url: 'https://economictimes.indiatimes.com/markets/ipo', keywords: ['ipo', 'initial public', 'listing', 'gmp', 'upcoming ipo'] },
        commodities: { name: 'Commodities', url: 'https://economictimes.indiatimes.com/markets/commodities', keywords: ['commodity', 'gold', 'silver', 'crude'] },
        forex: { name: 'Forex', url: 'https://economictimes.indiatimes.com/markets/forex', keywords: ['forex', 'currency', 'usd', 'inr', 'exchange rate', 'rupee'] },
        crypto: { name: 'Cryptocurrency', url: 'https://economictimes.indiatimes.com/markets/cryptocurrency', keywords: ['crypto', 'bitcoin', 'ethereum', 'web3'] },
        technicals: { name: 'Technical Analysis', url: 'https://economictimes.indiatimes.com/markets/stocks/news/technicals', keywords: ['technical', 'chart', 'rsi', 'macd'] }
      }
    },
    wealth: {
      name: 'ET Wealth', icon: '💰', color: 'rgba(201,162,39,.15)', url: 'https://economictimes.indiatimes.com/wealth', desc: 'Personal finance, tax, and saving guides', keywords: ['wealth', 'personal finance', 'save', 'tax'],
      sections: {
        tax: { name: 'Tax Planning', url: 'https://economictimes.indiatimes.com/wealth/tax', keywords: ['tax', 'itr', '80c', 'deduction', 'capital gain'] },
        insurance: { name: 'Insurance', url: 'https://economictimes.indiatimes.com/wealth/insure', keywords: ['insurance', 'term plan', 'health plan', 'claim'] },
        realestate: { name: 'Real Estate', url: 'https://economictimes.indiatimes.com/wealth/real-estate', keywords: ['real estate', 'property', 'home buy', 'rera'] },
        retirement: { name: 'Retirement & NPS', url: 'https://economictimes.indiatimes.com/wealth/retire', keywords: ['retire', 'pension', 'nps', 'epf', 'ppf'] },
        borrow: { name: 'Loans & Borrowing', url: 'https://economictimes.indiatimes.com/wealth/borrow', keywords: ['loan', 'emi', 'borrow', 'mortgage'] },
        cards: { name: 'Credit Cards', url: 'https://economictimes.indiatimes.com/wealth/spend', keywords: ['credit card', 'reward', 'cashback', 'spend'] }
      }
    },
    masterclass: { name: 'ET Masterclass', icon: '🎓', color: 'rgba(26,171,170,.15)', url: 'https://economictimes.indiatimes.com/masterclass', desc: 'Expert-led financial courses', keywords: ['masterclass', 'course', 'learn', 'certification'] },
    news: { name: 'Top News', icon: '📰', color: 'rgba(208,2,27,.15)', url: 'https://economictimes.indiatimes.com/news', desc: 'Latest headlines and breaking news', keywords: ['news', 'headline', 'breaking', 'today'] },
    podcasts: { name: 'ET Podcasts', icon: '🎙️', color: 'rgba(232,93,36,.15)', url: 'https://economictimes.indiatimes.com/podcast', desc: 'Listen to the Morning Brief and market updates', keywords: ['podcast', 'listen', 'audio', 'morning brief'] }
  },

  // Deep Financial DB for zero-hallucination marketplace functional recommendations
  financialDB: {
    mutualFunds: {
      conservative: {
        equity: [
          { name: 'Axis Bluechip Fund', type: 'Large Cap', returns: '16.2% (FY25)', risk: 'Moderate High', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'SBI Bluechip Fund', type: 'Large Cap', returns: '15.8% (FY25)', risk: 'Moderate High', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        debt: [
          { name: 'HDFC Balanced Advantage Fund', type: 'Hybrid', returns: '8.1% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'Axis Equity Hybrid Fund', type: 'Hybrid', returns: '7.9% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        gold: [
          { name: 'SBI Gold Fund', type: 'Gold Fund', returns: '13.4% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'HDFC Gold Fund', type: 'Gold Fund', returns: '13.1% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        international: []
      },
      moderate: {
        equity: [
          { name: 'Parag Parikh Flexi Cap', type: 'Flexi Cap', returns: '28.6% (FY25)', risk: 'Very High', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'DSP Top 100 Equity Fund', type: 'Large Cap', returns: '26.3% (FY25)', risk: 'High', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        debt: [
          { name: 'Aditya Birla Sun Life Balanced Advantage', type: 'Hybrid', returns: '8.4% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'Axis Equity Hybrid Fund', type: 'Hybrid', returns: '8.2% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        gold: [
          { name: 'ICICI Gold Fund', type: 'Gold Fund', returns: '13.6% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'Kotak Gold Fund', type: 'Gold Fund', returns: '13.2% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        international: [
          { name: 'Motilal Oswal Nasdaq 100 FoF', type: 'International Equity', returns: '21.8% (FY25)', risk: 'High', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'ICICI Prudential US Bluechip Equity Fund', type: 'International Equity', returns: '19.7% (FY25)', risk: 'High', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ]
      },
      aggressive: {
        equity: [
          { name: 'Quant Mid Cap Fund', type: 'Mid Cap', returns: '36.2% (FY25)', risk: 'Very High', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'Quant Small Cap Fund', type: 'Small Cap', returns: '38.4% (FY25)', risk: 'Very High', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'T. Rowe Price Emerging Markets Fund', type: 'International', returns: '32.1% (FY25)', risk: 'Very High', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        debt: [
          { name: 'SBI Magnum Multicap Fund', type: 'Multi Cap', returns: '9.1% (FY25)', risk: 'Moderate High', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'Nippon India Multi Cap Growth Fund', type: 'Multi Cap', returns: '8.8% (FY25)', risk: 'Moderate High', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        gold: [
          { name: 'Axis Gold Fund', type: 'Gold Fund', returns: '13.7% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'Nippon India Gold Fund', type: 'Gold Fund', returns: '13.3% (FY25)', risk: 'Moderate', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ],
        international: [
          { name: 'Edelweiss US Technology Equity FoF', type: 'International Equity', returns: '24.6% (FY25)', risk: 'High', url: 'https://economictimes.indiatimes.com/mutual-funds' },
          { name: 'Motilal Oswal S&P 500 Index Fund', type: 'International Equity', returns: '22.3% (FY25)', risk: 'High', url: 'https://economictimes.indiatimes.com/mutual-funds' }
        ]
      }
    },
    creditCards: [
      { name: 'ET–Axis Magnus', minIncome: 2400000, minAge: 25, type: 'Premium Travel', reward: 'Unlimited Lounge, 5% CB on ET', category: 'premium' },
      { name: 'HDFC Regalia', minIncome: 2000000, minAge: 25, type: 'Premium', reward: 'Complimentary airport lounge, 5% cashback on dining' },
      { name: 'ICICI Sapphiro', minIncome: 1500000, minAge: 25, type: 'Premium', reward: '10x reward points on dining & travel, lounge access' },
      { name: 'ET–HDFC Millennia', minIncome: 400000, minAge: 21, type: 'Cashback', reward: '5% CB on Amazon/Flipkart/ET', category: 'mid-tier' },
      { name: 'Axis Airtel Rewards', minIncome: 600000, minAge: 21, type: 'Rewards', reward: '4x bonus points on Airtel, 2% on other spends' },
      { name: 'SBI SimplyCLICK', minIncome: 200000, minAge: 21, type: 'Beginner', reward: '10x Rewards on Online Spends', category: 'entry' },
      { name: 'HDFC Cashback', minIncome: 250000, minAge: 21, type: 'Cashback', reward: '1-1.5% cashback on all spends' },
      { name: 'ICICI Amazon Pay', minIncome: 300000, minAge: 21, type: 'eCommerce', reward: '5% cashback on Amazon purchases' }
    ]
  },

  matchQuery(query) {
    const q = query.toLowerCase();
    const matches = [];
    for (const [pKey, product] of Object.entries(this.products)) {
      if (product.sections) {
        for (const [sKey, section] of Object.entries(product.sections)) {
          let score = 0;
          for (const kw of section.keywords) { if (q.includes(kw)) score += kw.split(' ').length * 15; }
          if (score > 0) matches.push({ type: 'section', product: pKey, section: sKey, data: { ...section, parentProduct: product.name, parentIcon: product.icon }, score });
        }
      }
      let score = 0;
      for (const kw of (product.keywords || [])) { if (q.includes(kw)) score += kw.split(' ').length * 8; }
      if (score > 0) matches.push({ type: 'product', product: pKey, data: product, score });
    }
    return matches.sort((a, b) => b.score - a.score);
  }
};

// ============================= LIVE ET DATA SERVICE =============================
class ETLiveDataService {
  constructor() {
    this.cache = {};
    this.cacheTTL = 10 * 60 * 1000;
    this.proxyBase = 'https://api.allorigins.win/get?url=';
    this.feeds = {
      topStories: 'https://economictimes.indiatimes.com/rssfeedstopstories.cms',
      markets: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
      wealth: 'https://economictimes.indiatimes.com/wealth/rssfeeds/837555174.cms',
      tech: 'https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms'
    };
  }

  async fetchFeed(feedKey) {
    const now = Date.now();
    if (this.cache[feedKey] && (now - this.cache[feedKey].ts) < this.cacheTTL) return this.cache[feedKey].data;
    const url = this.feeds[feedKey];
    if (!url) return this._fallbackData(feedKey);
    try {
      const resp = await fetch(this.proxyBase + encodeURIComponent(url), { signal: AbortSignal.timeout(6000) });
      const json = await resp.json();
      const items = this._parseRSS(json.contents);
      if (items.length) { this.cache[feedKey] = { data: items, ts: now }; return items; }
    } catch (e) { console.warn('ET Feed fetch failed', e.message); }
    return this._fallbackData(feedKey);
  }

  _parseRSS(xml) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      return Array.from(doc.querySelectorAll('item')).slice(0, 10).map(item => ({
        title: item.querySelector('title')?.textContent || '',
        link: item.querySelector('link')?.textContent || '',
        description: (item.querySelector('description')?.textContent || '').replace(/<[^>]*>/g, '').substring(0, 150),
        pubDate: item.querySelector('pubDate')?.textContent || '',
        source: 'ET Live'
      }));
    } catch (e) { return []; }
  }

  _fallbackData(feedKey) {
    return [
      { title: 'Budget 2026: Key Takeaways for Investors', link: 'https://economictimes.indiatimes.com/news/economy', description: 'Comprehensive analysis of Union Budget implications on markets and personal finance', source: 'ET News' },
      { title: 'RBI Policy: Rate Cut Expectations and Market Impact', link: 'https://economictimes.indiatimes.com/news/economy/policy', description: 'What the latest RBI monetary policy means for your investments and EMIs', source: 'ET Economy' }
    ];
  }
  async getTopStories() { return this.fetchFeed('topStories'); }
  async getMarketNews() { return this.fetchFeed('markets'); }
  async getWealthNews() { return this.fetchFeed('wealth'); }
}

// ============================= PROFILE DRAWER UX MANAGER =============================
class ProfileDrawerManager {
  constructor() {
    this.isOpen = false;
    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    this.drawer = document.getElementById('profile-drawer') || document.querySelector('.profile-drawer');
    this.overlay = document.getElementById('drawer-overlay');

    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'drawer-overlay';
      this.overlay.id = 'drawer-overlay';
      document.body.appendChild(this.overlay);
    }

    if (this.drawer) {
      this.drawer.setAttribute('aria-hidden', 'true');
    }
  }



  toggle(forceState) {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;

    if (this.drawer) {
      this.drawer.classList.toggle('open', this.isOpen);
      if (this.isOpen) this.drawer.setAttribute('aria-hidden', 'false');
      else this.drawer.setAttribute('aria-hidden', 'true');
    }

    this.overlay.classList.toggle('active', this.isOpen);

    // Clear notification badge when opened
    if (this.isOpen) {
      const badge = document.getElementById('profile-update-badge');
      if (badge) badge.classList.remove('active');
      const miniBadge = document.getElementById('profile-badge');
      if (miniBadge) miniBadge.classList.remove('pulse');
    }
  }

  bindEvents() {
    // Click overlay to close
    this.overlay.addEventListener('click', () => this.toggle(false));

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.toggle(false);
    });

    // Top Nav Button Trigger
    const navBtn = document.getElementById('nav-profile-btn');
    if (navBtn) navBtn.addEventListener('click', () => this.toggle());

    // Close Button Click
    document.addEventListener('click', (e) => {
      if (e.target.closest('.drawer-close-btn')) this.toggle(false);
    });
  }

  notifyUpdate(source) {
    // If drawer is closed, pulse the nav badge
    if (!this.isOpen) {
      const badge = document.getElementById('profile-update-badge');
      if (badge) badge.classList.add('active');
      const miniBadge = document.getElementById('profile-badge');
      if (miniBadge) miniBadge.classList.add('pulse');
    }
  }
}

// Initialize Drawer globally
window.drawerManager = new ProfileDrawerManager();

// ============================= SESSION MANAGER (STATELESS) =============================
class SessionManager {
  constructor() { this.sessionKey = 'et_concierge_session'; }
  save(identityGraph, portfolio, metrics) { } // Disabled to ensure fresh start / Vector DB Prep
  load() { return null; } // Always return null to force fresh 3-min profiling
  updateSession() {
    return { visitCount: 1, lastVisit: Date.now() };
  }
  getSession() { return {}; }
  clear() { sessionStorage.removeItem(this.sessionKey); localStorage.removeItem('et_concierge_pail'); }
}

// ============================= BEHAVIOUR TRACKER =============================
class BehaviourTracker {
  constructor() {
    this.interactions = [];
    this.topicFrequency = {};
    this.currentAgent = 'concierge';
    this.sessionStart = Date.now();
    this.queryCount = 0;
  }

  trackQuery(query, agent) {
    this.queryCount++;
    const topics = this._extractTopics(query);
    topics.forEach(t => { this.topicFrequency[t] = (this.topicFrequency[t] || 0) + 1; });
    this.interactions.push({ type: 'query', query, agent, topics, time: Date.now() });
    if (this.interactions.length > 100) this.interactions.shift();
  }

  trackAgentSwitch(agent) { this.currentAgent = agent; }

  _extractTopics(query) {
    const q = query.toLowerCase();
    const topicMap = {
      'markets': /market|stock|share|nifty|sensex|trading/i,
      'mutual_funds': /mutual fund|sip|mf|nav|fund/i,
      'insurance': /insur|term plan|health plan|life cover/i,
      'loans': /loan|emi|mortgage|borrow/i,
      'prime': /prime|premium|exclusive/i,
      'credit_cards': /credit card|card|cashback/i
    };
    const found = [];
    for (const [topic, re] of Object.entries(topicMap)) { if (re.test(q)) found.push(topic); }
    return found.length ? found : ['general'];
  }

  getCrossSellTriggers(userProfile) {
    const triggers = [];
    if (userProfile.hasInsurance === false) {
      triggers.push({ type: 'service', product: 'insurance', reason: 'Critical Gap: No Term Insurance detected. Secure your family.', priority: 'critical', icon: '🛡️', url: 'https://economictimes.indiatimes.com/wealth/insure' });
    }
    if (userProfile.incomeNum >= 2400000 && !this.topicFrequency['credit_cards']) {
      triggers.push({ type: 'upsell', product: 'credit_cards', reason: 'Profile Match: You are eligible for premium ET-Axis Magnus card tier.', priority: 'high', icon: '💳', url: 'https://economictimes.indiatimes.com/wealth/spend' });
    } else if (userProfile.incomeNum >= 1200000) {
      triggers.push({ type: 'upsell', product: 'credit_cards', reason: 'Profile Match: Mid-premium card options are available for your income band.', priority: 'medium', icon: '💳', url: 'https://economictimes.indiatimes.com/wealth/spend' });
    }
    if (this.topicFrequency['markets'] >= 2 && !this.topicFrequency['prime']) {
      triggers.push({ type: 'upsell', product: 'prime', reason: `You've asked multiple market questions — ET Prime gives you expert analysis`, priority: 'high', icon: '📰', url: 'https://economictimes.indiatimes.com/prime' });
    }

    if ((userProfile.surplus || 0) > 0) {
      triggers.push({ type: 'service', product: 'sip_start', reason: `Actionable Next Step: Start SIPs with your ₹${Math.round(userProfile.surplus).toLocaleString('en-IN')}/month surplus.`, priority: 'medium', icon: '📈', url: 'https://economictimes.indiatimes.com/mutual-funds' });
    }

    if (userProfile.risk === 'Aggressive') {
      triggers.push({ type: 'upsell', product: 'masterclass_growth', reason: 'Behavior Fit: Advanced market learning can improve high-growth decision quality.', priority: 'medium', icon: '🎓', url: 'https://economictimes.indiatimes.com/masterclass' });
    }

    if (triggers.length === 0) {
      triggers.push({ type: 'upsell', product: 'prime_starter', reason: 'Starter Offer: ET Prime helps personalize your market and wealth journey.', priority: 'medium', icon: '📰', url: 'https://economictimes.indiatimes.com/prime' });
      triggers.push({ type: 'service', product: 'marketplace_check', reason: 'Service Check: Explore cards, insurance, and wealth services matched to your profile.', priority: 'medium', icon: '🧭', url: 'https://economictimes.indiatimes.com/wealth' });
    }

    const uniqueTriggers = []; const seen = new Set();
    for (let t of triggers) { if (!seen.has(t.product)) { seen.add(t.product); uniqueTriggers.push(t); } }
    return uniqueTriggers.sort((a, b) => { const p = { 'critical': 3, 'high': 2, 'medium': 1 }; return p[b.priority] - p[a.priority]; }).slice(0, 3);
  }

  getEngagementScore() {
    const duration = (Date.now() - this.sessionStart) / 60000;
    return Math.min(100, (this.queryCount * 5) + (duration * 3) + 20);
  }
}

// ============================= DATA FABRIC =============================
class DataFabric {
  constructor() {
    this.session = new SessionManager();
    this.liveData = new ETLiveDataService();
    this.behaviour = new BehaviourTracker();

    this.identityGraph = {
      name: null, initials: null, segment: null, ageRange: null, risk: null,
      income: null, incomeNum: 0, monthlyExpenses: null, surplus: 0,
      goal: null, horizon: null, assets: null, products: null,
      sipCapacity: null, hasInsurance: null, hasNPS: null,
      depth: 0, completedSteps: [], signals: []
    };

    this.metrics = { interactions: 0, products: 0, articles: 0, classes: 0, opportunities: 0 };
    this.portfolio = { holdings: [], totalSIP: 0, totalValue: 0 };
    this.contextMemory = { pendingAction: null };
    this.confirmedFields = new Set();

    this._restoreSession();
  }

  _restoreSession() {
    this._restored = false;
    this.sessionInfo = this.session.updateSession();
  }

  isReturningUser() { return false; }

  pushSignal(text, color) {
    const signal = { text, color: color || 'var(--teal)', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    this.identityGraph.signals.unshift(signal);
    if (this.identityGraph.signals.length > 20) this.identityGraph.signals.pop();
    this.renderSidebar();
  }

  updateIdentity(changes, label) {
    const u = this.identityGraph;
    for (const [key, val] of Object.entries(changes)) { u[key] = val; }

    // MATHEMATICAL CORE: Calculate EXACT Investable Surplus
    if (u.incomeNum > 0 && u.monthlyExpenses > 0) {
      const monthlyIncome = u.incomeNum / 12;
      u.surplus = Math.max(0, monthlyIncome - u.monthlyExpenses);
    }

    const fields = ['name', 'goal', 'risk', 'income', 'monthlyExpenses', 'horizon', 'assets', 'hasInsurance', 'hasNPS', 'ageRange'];
    const filled = fields.filter(f => u[f] !== null && u[f] !== undefined).length;
    u.depth = Math.min(95, Math.round(filled / fields.length * 95));

    this.updateUI();
    this.pushSignal(label || 'Profile updated', 'var(--gold)');

    // NEW: Live UI Sync & Badge Notification
    if (window.drawerManager) {
      window.drawerManager.notifyUpdate('AI Inferred');
    }
  }

  markConfirmed(fields) {
    fields.forEach(f => this.confirmedFields.add(f));
    this.renderProfileBreakdown();
  }

  advanceOnboard(stepIdx) {
    if (!this.identityGraph.completedSteps.includes(stepIdx)) {
      this.identityGraph.completedSteps.push(stepIdx);
      this.identityGraph.completedSteps.sort((a, b) => a - b);
      this.updateUI();
    }
  }

  renderReco() {
    const recoList = document.getElementById('reco-list');
    if (!recoList) return;

    const u = this.identityGraph;
    const recommendations = [];

    if (u.goal === 'Wealth creation') {
      recommendations.push({
        icon: '📈',
        title: 'Diversified Growth Portfolio',
        desc: 'Match your goal with high-growth equity + balanced allocation',
        match: 'Perfect Match',
        level: 'match-high'
      });
    }

    if (u.goal === 'Retirement / FIRE') {
      recommendations.push({
        icon: '🏦',
        title: 'NPS + Retirement Benefit Scheme',
        desc: 'Maximize tax benefits and secure post-retirement income',
        match: 'Recommended',
        level: 'match-high'
      });
    }

    if (u.risk === 'Aggressive') {
      recommendations.push({
        icon: '🚀',
        title: 'Small Cap & Emerging Funds',
        desc: 'High-growth funds aligned to your aggressive profile (FY25 top performers)',
        match: 'Top Performers',
        level: 'match-high'
      });
    } else if (u.risk === 'Conservative') {
      recommendations.push({
        icon: '🛡️',
        title: 'Hybrid & Debt-Focused Allocation',
        desc: 'Balanced returns with capital protection for conservative investors',
        match: 'Stable',
        level: 'match-med'
      });
    } else {
      recommendations.push({
        icon: '⚖️',
        title: 'Balanced Multi-Asset Portfolio',
        desc: 'Moderate risk with diversified equity, debt & international exposure',
        match: 'Optimal Mix',
        level: 'match-high'
      });
    }

    if (u.hasInsurance !== true) {
      recommendations.push({
        icon: '🛡️',
        title: 'Critical: Term Insurance',
        desc: 'Coverage gap detected. Secure your family\'s financial future (₹1 Cr minimum)',
        match: 'Critical',
        level: 'match-crit'
      });
    }

    if (u.incomeNum >= 1500000 && !u.hasNPS) {
      recommendations.push({
        icon: '📋',
        title: 'NPS Investment',
        desc: 'Get ₹50K additional tax deduction under 80CCD(1B)',
        match: 'High Priority',
        level: 'match-med'
      });
    }

    if (u.surplus > 0) {
      recommendations.push({
        icon: '💰',
        title: 'Monthly SIP Strategy',
        desc: `Start systematic investing with your ₹${Math.round(u.surplus).toLocaleString('en-IN')}/month surplus`,
        match: 'Ready to Go',
        level: 'match-high'
      });
    }

    const html = recommendations.map(r => `
      <div style="background:rgba(26,107,181,.08);padding:10px;border-radius:8px;margin-bottom:10px;border-left:3px solid var(--teal)">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:6px">
          <div style="font-weight:600;font-size:13px">${r.icon} ${r.title}</div>
          <span class="match-pill ${r.level}" style="font-size:10px">${r.match}</span>
        </div>
        <div style="font-size:11px;color:var(--et-muted)">${r.desc}</div>
      </div>
    `).join('');

    recoList.innerHTML = html || '<div style="color:var(--et-muted);padding:10px">Complete your profile to get personalized recommendations.</div>';
  }

  addHolding(holding) {
    this.portfolio.holdings.push({ ...holding, addedDate: new Date().toISOString() });
    this.updatePortfolioMetrics();
    this.pushSignal(`Added: ${holding.name} to portfolio`, 'var(--teal)');
  }

  updatePortfolioMetrics() {
    this.portfolio.totalSIP = this.portfolio.holdings.reduce((s, h) => s + (h.sipAmount || 0), 0);
    this.portfolio.totalValue = this.portfolio.holdings.reduce((s, h) => s + (h.value || 0), 0);
    this.updateUI();
  }

  updateUI() {
    const u = this.identityGraph;

    // Enforce pure white text for high visibility in dark theme
    const setFlash = (id, val) => {
      const el = document.getElementById(id); if (!el) return;
      const display = (val !== null && val !== undefined) ? val : '—';
      if (el.textContent !== display) {
        el.textContent = display;
        el.style.color = (val !== null && val !== undefined) ? '#ffffff' : 'rgba(255,255,255,0.4)';
        el.style.fontWeight = '500';
        el.classList.add('updating'); setTimeout(() => el.classList.remove('updating'), 1800);
      }
    };

    setFlash('p-name', u.name); setFlash('p-seg', u.segment); setFlash('p-age', u.ageRange);
    setFlash('p-risk', u.risk); setFlash('p-income', u.income); setFlash('p-goal', u.goal);
    setFlash('p-horizon', u.horizon); setFlash('p-assets', u.assets);

    const bar = document.getElementById('p-comp-fill-panel');
    if (bar) bar.style.width = u.depth + '%';
    const label = document.getElementById('p-comp-label-panel');
    if (label) label.textContent = u.depth + '%';
    const chip = document.getElementById('pail-score-chip');
    if (chip) chip.textContent = `PAIL ${u.depth}%`;
    const avatarEl = document.getElementById('user-avatar-top');
    if (avatarEl) avatarEl.textContent = u.initials || '?';

    this.renderProfileBreakdown();
    this.renderSidebar();
    this.renderMetrics();
    this.renderReco();
  }

  formatProfileValue(key, value) {
    if (value === null || value === undefined || value === '') return '—';
    if (key === 'monthlyExpenses' || key === 'incomeNum' || key === 'surplus' || key === 'sipCapacity') {
      return `₹${Number(value).toLocaleString('en-IN')}`;
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }

  renderProfileBreakdown() {
    const inferredContainer = document.getElementById('inferred-fields');
    const confirmedContainer = document.getElementById('confirmed-fields');
    if (!inferredContainer || !confirmedContainer) return;

    const labels = {
      name: 'Name',
      ageRange: 'Age range',
      goal: 'Primary goal',
      risk: 'Risk profile',
      income: 'Income bracket',
      monthlyExpenses: 'Monthly expenses',
      horizon: 'Horizon',
      assets: 'Assets',
      hasInsurance: 'Has term insurance',
      hasNPS: 'Has NPS'
    };

    const allRows = Object.entries(labels)
      .map(([key, label]) => ({ key, label, value: this.identityGraph[key] }))
      .filter(row => row.value !== null && row.value !== undefined && row.value !== '');

    const confirmedRows = allRows.filter(r => this.confirmedFields.has(r.key));
    const inferredRows = allRows.filter(r => !this.confirmedFields.has(r.key));

    const toRow = (row) => `<div class="prof-row"><span class="prof-key">${row.label}</span><span class="prof-val">${this.formatProfileValue(row.key, row.value)}</span></div>`;

    inferredContainer.innerHTML = inferredRows.length
      ? inferredRows.map(toRow).join('')
      : '<div class="prof-key" style="padding:4px 0;">No inferred fields yet.</div>';

    confirmedContainer.innerHTML = confirmedRows.length
      ? confirmedRows.map(toRow).join('')
      : '<div class="prof-key" style="padding:4px 0;">No confirmed fields yet.</div>';
  }

  renderSidebar() {
    const u = this.identityGraph;
    const sDepth = document.getElementById('sb-depth'); if (sDepth) sDepth.textContent = u.depth + '%';
    const sBar = document.getElementById('sb-bar'); if (sBar) sBar.style.width = u.depth + '%';
    const sRisk = document.getElementById('sb-risk'); if (sRisk) sRisk.textContent = u.risk || '—';
    const sSeg = document.getElementById('sb-seg'); if (sSeg) sSeg.textContent = u.segment || '—';
    const sSig = document.getElementById('sb-signals'); if (sSig) sSig.textContent = u.signals.length;

    const html = u.signals.map(s => `<div class="signal-item"><div class="signal-dot" style="background:${s.color}"></div><div><div class="signal-text">${s.text}</div><div class="signal-time">${s.time}</div></div></div>`).join('');
    const sFeed = document.getElementById('signal-feed'); if (sFeed) sFeed.innerHTML = html || '<div class="signal-text" style="color:var(--et-muted);padding:8px 0;">No signals yet.</div>';

    const steps = ['Basic profile complete', 'ET Prime discovery', 'Financial goals mapped', 'Portfolio analysis', 'Partner services matched', 'Personalisation calibrated'];
    const obHtml = steps.map((s, i) => {
      const done = u.completedSteps.includes(i);
      const isNext = !done && (i === 0 || u.completedSteps.includes(i - 1));
      return `<div class="ob-step"><div class="ob-num ${done ? 'num-done' : isNext ? 'num-active' : 'num-pend'}">${done ? '✓' : i + 1}</div><span class="ob-text ${done ? 'done' : isNext ? 'act' : ''}">${s}</span></div>`;
    }).join('');
    const obSteps = document.getElementById('ob-steps'); if (obSteps) obSteps.innerHTML = obHtml;
  }

  renderMetrics() {
    const mProducts = document.getElementById('m-products');
    if (mProducts) mProducts.textContent = String(this.metrics.products || 0);

    const mArticles = document.getElementById('m-articles');
    if (mArticles) mArticles.textContent = String(this.metrics.articles || 0);

    const mClasses = document.getElementById('m-classes');
    if (mClasses) mClasses.textContent = String(this.metrics.classes || 0);

    const mOpps = document.getElementById('m-opps');
    if (mOpps) mOpps.textContent = String(this.metrics.opportunities || 0);
  }
}

// ============================= STRICT NLP ENGINE =============================
class ContextualNLPEngine {
  constructor(fabric) {
    this.fabric = fabric;
    // PRIORITY 1: Core Functional Intents (Strict Marketplace/Navigator execution)
    this.coreIntents = [
      { id: 'recommend_mf', patterns: [/recommend.*fund/i, /stable.*fund/i, /best.*mutual fund/i, /where.*invest/i], conf: 0.95 },
      { id: 'recommend_card', patterns: [/best.*credit card/i, /recommend.*card/i, /which card/i, /credit card for me/i], conf: 0.95 },
      { id: 'recommend_insurance', patterns: [/term insurance/i, /insurance quote/i, /need insurance/i, /life cover/i], conf: 0.95 },
      { id: 'recommend_loan', patterns: [/loan/i, /emi/i, /borrow/i, /home loan/i, /personal loan/i], conf: 0.95 },
      { id: 'sip_roadmap', patterns: [/sip.*allocation/i, /sip.*(\d+)/i, /build.*roadmap/i, /roadmap/i], conf: 0.95 },
      { id: 'start_investing', patterns: [/how.*start.*invest/i, /where.*start.*invest/i, /beginner.*invest/i, /invest.*safely/i, /new to invest/i, /first time.*invest/i], conf: 0.95 },
      { id: 'gap_analysis', patterns: [/gap/i, /analyze.*portfolio/i, /review.*portfolio/i], conf: 0.9 },
      { id: 'show_onboard', patterns: [/where is my onboard/i, /onboard/i, /my path/i], conf: 0.9 },
      { id: 'portfolio_add', patterns: [/\badd\b.*(?:invest|hold|stock|fund|sip)/i], conf: 0.85 },
      { id: 'crosssell_offer', patterns: [/cross\s*-?\s*sell/i, /upsell/i, /offer for me/i, /best for my profile/i, /opportunit(?:y|ies)/i], conf: 0.9 }
    ];

    // PRIORITY 2: Conversational Intents
    this.convIntents = [
      { id: 'personalized_news', patterns: [/which news/i, /recommend news/i, /news for me/i], conf: 0.9 },
      { id: 'navigation', patterns: [/where can i (find|access|read|see)/i, /how to (find|access|go to)/i, /link for/i, /take me to/i, /where is/i, /wehre is/i], conf: 0.95 },
      { id: 'bot_identity', patterns: [/who are you/i, /what are you/i, /capabilities/i, /what can you do/i], conf: 0.95 },
      { id: 'affirmative', patterns: [/\byes\b/i, /\byeah\b/i, /\bsure\b/i, /\bok\b/i], conf: 1.0 },
      { id: 'negative', patterns: [/\bno\b/i, /\bnah\b/i, /\bcancel\b/i], conf: 1.0 }
    ];
  }

  analyze(text) {
    const q = text.toLowerCase().trim();

    // 1. Contextual Memory Interception
    if (this.fabric.contextMemory.pendingAction) {
      if (this.convIntents.find(i => i.id === 'affirmative').patterns.some(p => p.test(q))) {
        const action = this.fabric.contextMemory.pendingAction;
        this.fabric.contextMemory.pendingAction = null;
        return { intent: action, contextTriggered: true };
      }
      if (this.convIntents.find(i => i.id === 'negative').patterns.some(p => p.test(q))) {
        this.fabric.contextMemory.pendingAction = null;
        return { intent: 'cancel', contextTriggered: true };
      }
    }

    // 2. Strict Core Functional Matching (Ensures Marketplace works)
    for (const intent of this.coreIntents) {
      if (intent.patterns.some(pattern => pattern.test(q))) {
        return { intent: intent.id, score: intent.conf };
      }
    }

    // 3. Conversational Matching
    for (const intent of this.convIntents) {
      if (intent.patterns.some(pattern => pattern.test(q))) {
        return { intent: intent.id, score: intent.conf };
      }
    }

    // 4. Ecosystem & Navigation Fallback (Prevents hijacking functional queries)
    const kbMatches = ETEcosystemKB.matchQuery(q);
    if (kbMatches.length > 0) {
      return { intent: `discover_kb`, score: 0.8, data: kbMatches[0].data, isSection: kbMatches[0].type === 'section' };
    }

    return { intent: 'unknown', score: 0 };
  }
}

// ============================= ORCHESTRATOR =============================
class Orchestrator {
  constructor(fabric) {
    this.fabric = fabric;
    this.nlp = new ContextualNLPEngine(fabric);
    this.currentAgent = 'concierge';
    this.profilingStep = 0;

    this.agentConfig = {
      concierge: { title: 'ET Welcome Concierge', desc: 'Welcome + onboarding details only', qr: ['Show my onboarding path', 'Who are you?', 'What details do you need?'] },
      navigator: { title: 'Financial Life Navigator', desc: 'Investment plan, ET tools guidance, partner services fit, portfolio gaps and immediate needs', qr: ['Analyse my portfolio gaps', 'Build my SIP Roadmap', 'Recommend mutual funds'] },
      crosssell: { title: 'ET Cross-Sell Engine', desc: 'Proactive cross-sell/upsell engine based on behavior + profile timing', qr: ["What's best for my profile?", 'Any upsell opportunity for me?'] },
      marketplace: { title: 'ET Services Marketplace', desc: 'Concierge for credit cards, loans, insurance, and wealth services via ET partnerships', qr: ['Credit card for me', 'Term insurance quotes', 'Loan options for me'] }
    };

    // EXACT PRECISION PROFILING (Regex extracts exact numbers, Custom inputs allowed)
    this.stages = [
      { ask: `<p>Namaste! 🙏 I'm your <strong>ET AI Concierge</strong>. I map your exact financial data to the ET ecosystem to generate precise roadmaps.</p><p>Let's start: <strong>What's your name?</strong></p>`, parse: t => { const n = t.replace(/^(i'm|i am|my name is)\s*/i, '').trim().split(' ')[0]; return { name: n.charAt(0).toUpperCase() + n.slice(1) || 'User', initials: n.substring(0, 2).toUpperCase() }; }, sig: 'Name captured' },
      { ask: p => `<p>Welcome, <strong>${p.name}</strong>! 🎉 <strong>What's your age range?</strong></p>`, rich: 'age', parse: t => ({ ageRange: t.replace(/my exact.*is:?/i, '').trim() || '30-35' }), sig: 'Age mapped' },
      { ask: p => `<p><strong>What's your primary financial goal?</strong></p>`, rich: 'goal', parse: t => ({ goal: /retire|fire/i.test(t) ? 'Retirement / FIRE' : /child|kid/i.test(t) ? 'Child Education' : /house|home/i.test(t) ? 'Buying a House' : t.replace(/my exact.*is:?/i, '').trim() || 'Wealth creation', segment: /retire/i.test(t) ? 'FIRE-Seeker' : 'HNI-Aspirant' }), sig: 'Goal set' },
      { ask: p => `<p>Got it. What is your <strong>risk appetite</strong>?</p>`, rich: 'risk', parse: t => ({ risk: /conserv|safe/i.test(t) ? 'Conservative' : /aggress/i.test(t) ? 'Aggressive' : 'Moderate' }), sig: 'Risk profile updated' },
      {
        ask: () => `<p>To build a precise roadmap, what is your <strong>exact annual income?</strong></p>`, rich: 'inc', parse: t => {
          // FIX: Strip commas first
          const cleanText = t.replace(/,/g, '');
          // Broad regex to catch lacs, lackhs, crores, etc.
          const m = cleanText.match(/(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d+)?)\s*(k|lakhs?|lacs?|lackhs?|l|cr|crores?)?\b/i);
          let n = 1200000;
          if (m) {
            let val = parseFloat(m[1]);
            let mult = m[2]?.toLowerCase() || '';
            if (mult === 'k') val *= 1000;
            else if (mult.startsWith('l')) val *= 100000; // Catches l, lakh, lacs, lackhs
            else if (mult.startsWith('cr')) val *= 10000000; // Catches cr, crore
            n = val;
          }
          return { income: `₹${(n / 100000).toFixed(1)}L`, incomeNum: n };
        }, sig: 'Income captured exactly'
      },
      {
        ask: () => `<p>To calculate your investable surplus mathematically, what are your <strong>exact monthly living expenses</strong>?</p>`, rich: 'exp', parse: t => {
          const cleanText = t.replace(/,/g, '');
          const m = cleanText.match(/(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d+)?)\s*(k|lakhs?|lacs?|lackhs?|l)?\b/i);
          let n = 50000;
          if (m) {
            let val = parseFloat(m[1]);
            let mult = m[2]?.toLowerCase() || '';
            if (mult === 'k') val *= 1000;
            else if (mult.startsWith('l')) val *= 100000;
            n = val;
          }
          return { monthlyExpenses: n };
        }, sig: 'Expenses captured exactly'
      },
      { ask: p => `<p>Surplus calculated! How many <strong>years</strong> do you have to achieve your ${p.goal} goal?</p>`, rich: 'hor', parse: t => ({ horizon: (t.match(/(\d+)/)?.[1] || '10') + ' yrs' }), sig: 'Horizon set' },
      { ask: () => `<p>What asset classes do you currently hold?</p>`, rich: 'asset', parse: t => ({ assets: t.replace(/my exact.*is:?/i, '').trim() || 'Equity, MF' }), sig: 'Assets mapped' },
      { ask: () => `<p>Last question: <strong>Do you have term insurance and NPS?</strong></p>`, rich: 'ins', parse: t => ({ hasInsurance: /yes|term/i.test(t), hasNPS: /yes|nps/i.test(t) }), sig: 'Insurance captured' }
    ];
  }

  async process(input) {
    this.fabric.metrics.interactions++;
    this.fabric.behaviour.trackQuery(input, this.currentAgent);
    this.fabric.pushSignal(`Query: ${input.substring(0, 25)}...`, 'rgba(255,255,255,.2)');

    // 1. Profiling Wizard Interception
    if (this.currentAgent === 'concierge' && this.profilingStep < this.stages.length) {
      const stage = this.stages[this.profilingStep];
      const updates = stage.parse(input);
      this.fabric.updateIdentity(updates, stage.sig);
      this.profilingStep++;

      if (this.profilingStep === 1) this.fabric.advanceOnboard(0);
      if (this.profilingStep === 5) this.fabric.advanceOnboard(2);

      if (this.profilingStep < this.stages.length) {
        const next = this.stages[this.profilingStep];
        return { text: `<p>Updated. ✓</p>${typeof next.ask === 'function' ? next.ask(this.fabric.identityGraph) : next.ask}`, richType: next.rich };
      } else {
        this.fabric.advanceOnboard(3); this.fabric.advanceOnboard(4);
        return {
          text: `<p>✅ <strong>Profiling complete!</strong> PAIL profile at <strong>${this.fabric.identityGraph.depth}%</strong> depth.</p>
                                 <p>Based on your <strong>${this.fabric.identityGraph.risk}</strong> risk profile and exact calculated surplus of <strong>₹${Math.round(this.fabric.identityGraph.surplus).toLocaleString('en-IN')}/month</strong>, here is your tailored ET path:</p>`,
          extra: this._buildDynamicOnboardUI()
        };
      }
    }

    // 2. Intelligent NLP Routing
    const analysis = this.nlp.analyze(input);
    const intent = analysis.intent;

    const agentScope = {
      concierge: new Set(['show_onboard', 'bot_identity']),
      navigator: new Set(['start_investing', 'sip_roadmap', 'recommend_mf', 'gap_analysis', 'portfolio_add', 'discover_kb']),
      crosssell: new Set(['crosssell_offer']),
      marketplace: new Set(['recommend_card', 'recommend_insurance', 'recommend_loan', 'discover_kb'])
    };

    const intentOwner = {
      show_onboard: 'concierge',
      bot_identity: 'concierge',
      start_investing: 'navigator',
      sip_roadmap: 'navigator',
      recommend_mf: 'navigator',
      gap_analysis: 'navigator',
      portfolio_add: 'navigator',
      crosssell_offer: 'crosssell',
      recommend_card: 'marketplace',
      recommend_insurance: 'marketplace',
      recommend_loan: 'marketplace'
    };

    const displayAgent = {
      concierge: 'ET Welcome Concierge',
      navigator: 'Financial Life Navigator',
      crosssell: 'ET Ecosystem Cross-Sell Engine',
      marketplace: 'ET Services Marketplace Agent'
    };

    const offScopeResponse = (targetKey) => ({
      text: `<p>This request belongs to <strong>${displayAgent[targetKey]}</strong>.</p>
             <p>Please switch to that agent tab so I can handle it in the correct workflow without mixing responsibilities.</p>`
    });

    const buildKBResponse = (d) => ({
      text: `<p>${d.parentIcon || d.icon || '🔗'} <strong>I can guide you to ${d.name}</strong></p>
             <p>Based on your requirement, the best place on Economic Times to access this information is the <strong>${d.name}</strong> section.</p>
             <div style="background:rgba(26,107,181,.1);padding:14px;border-radius:8px;margin-top:12px;border-left:4px solid var(--blue)">
               <div style="font-weight:600;margin-bottom:6px">${d.parentProduct ? `${d.parentProduct} > ` : ''}${d.name}</div>
               <a href="${d.url}" class="et-link" target="_blank" style="font-size:12px">Access ${d.name} here →</a>
             </div>`
    });

    if (intent !== 'unknown' && !agentScope[this.currentAgent].has(intent)) {
      if (intent === 'discover_kb') {
        const target = /insurance|loan|credit card|card|wealth|tax/i.test(input) ? 'marketplace' : 'navigator';
        return offScopeResponse(target);
      }
      const target = intentOwner[intent];
      if (target) return offScopeResponse(target);
    }

    if (this.currentAgent === 'concierge') {
      if (intent === 'show_onboard') return { text: `<p>Here is your mapped onboarding path:</p>`, extra: this._buildDynamicOnboardUI() };
      if (intent === 'bot_identity') return { text: `<p>I am the <strong>ET Welcome Concierge</strong>. I handle your welcome journey and onboarding path only.</p>` };
      return {
        text: `<p>Welcome! I handle onboarding only.</p><p>Ask me: <strong>"Show my onboarding path"</strong> or continue the profiling flow.</p>`
      };
    }

    if (this.currentAgent === 'navigator') {
      if (intent === 'start_investing') {
        this.fabric.pushSignal('Navigator: Beginner investing intent mapped', 'var(--teal)');
        return {
          text: `<p>Great question. Here is your safe, profile-based investment roadmap:</p>`,
          extra: this._buildSIPRoadmap(input).text
        };
      }
      if (intent === 'sip_roadmap') {
        this.fabric.pushSignal('Navigator: SIP Roadmap Computed', 'var(--teal)');
        return this._buildSIPRoadmap(input);
      }
      if (intent === 'recommend_mf') {
        this.fabric.pushSignal('Navigator: MF filtering active', 'var(--blue)');
        return this._buildMFRecommendation(input);
      }
      if (intent === 'gap_analysis') return { text: `<p>📊 <strong>Portfolio Gap Analysis</strong></p>`, extra: this._buildGapsCard() };
      if (intent === 'discover_kb' && analysis.data) {
        return {
          text: buildKBResponse(analysis.data).text,
          extra: this._buildNavigatorKBDetails(analysis.data)
        };
      }
      return {
        text: `<p>I handle investment planning, portfolio gaps, and ET tool guidance.</p><p>Try: <strong>"Build my SIP roadmap"</strong> or <strong>"Analyze my portfolio gaps"</strong>.</p>`
      };
    }

    if (this.currentAgent === 'crosssell') {
      if (intent === 'crosssell_offer') {
        const triggers = this.fabric.behaviour.getCrossSellTriggers(this.fabric.identityGraph);
        if (triggers.length > 0) {
          return { text: `<p>🎯 <strong>Cross-Sell Analysis</strong></p><p>Based on your profile and behavior, here are your best timed opportunities with recommended SIP investment guidance:</p>`, extra: this._buildCrossSellCard(triggers, this.fabric.identityGraph) };
        }
        return { text: `<p>Cross-sell signals are still warming up. Ask about your profile fit, and I’ll surface the best available ET offer with timing rationale.</p>` };
      }
      return {
        text: `<p>I only handle cross-sell and upsell opportunities based on behavior signals.</p><p>Ask: <strong>"Show my best offer"</strong> or <strong>"Any upsell opportunity for me?"</strong></p>`
      };
    }

    if (this.currentAgent === 'marketplace') {
      if (intent === 'recommend_card') {
        this.fabric.pushSignal('Marketplace: Card match executing', 'var(--gold)');
        return this._buildCardRecommendation();
      }
      if (intent === 'recommend_insurance') {
        return {
          text: `<p>🛡️ <strong>ET Services Marketplace — Insurance Concierge</strong></p>
                 <p>Based on your profile, term insurance is the first protection layer to evaluate.</p>
                 <div style="margin-top:10px"><a href="https://economictimes.indiatimes.com/wealth/insure" target="_blank" class="et-link" style="font-size:12px">Explore ET Insurance Services →</a></div>`
        };
      }
      if (intent === 'recommend_loan') {
        return this._buildLoanEligibility();
      }
      if (intent === 'discover_kb' && analysis.data) return buildKBResponse(analysis.data);
      return {
        text: `<p>I handle ET partner financial services only: credit cards, loans, insurance, and wealth services.</p><p>Try: <strong>"Credit card for me"</strong> or <strong>"Term insurance quotes"</strong>.</p>`
      };
    }

    return { text: `<p>Please select an agent to continue.</p>` };
  }

  _resolveRiskBand(isStableRequest) {
    const risk = (this.fabric.identityGraph.risk || '').toLowerCase();
    if (isStableRequest || risk.includes('conserv')) return 'conservative';
    if (risk.includes('aggress')) return 'aggressive';
    return 'moderate';
  }

  _pickFundByBucket(riskBand, bucketName, user) {
    const pool = ETEcosystemKB.financialDB.mutualFunds[riskBand]?.[bucketName] || [];
    if (!pool.length) return null;

    const horizonYears = parseInt((user.horizon || '').match(/\d+/)?.[0] || '10', 10);
    const index = horizonYears > 10 ? 0 : Math.min(1, pool.length - 1);
    return pool[index];
  }

  _pickCardsByProfile(user) {
    const income = user.incomeNum || 500000;
    const ageStr = (user.ageRange || '30–35').match(/\d+/)?.[0];
    const age = parseInt(ageStr, 10) || 30;

    const cards = ETEcosystemKB.financialDB.creditCards.map(c => {
      const minAge = c.minAge || 21;
      const incomeGap = Math.max(0, c.minIncome - income);
      const ageGap = Math.max(0, minAge - age);
      return {
        ...c,
        incomeGap,
        ageGap,
        eligibleNow: incomeGap === 0 && ageGap === 0
      };
    });

    const eligible = cards.filter(c => c.eligibleNow).sort((a, b) => b.minIncome - a.minIncome);
    if (eligible.length > 0) return eligible.slice(0, 3);

    const nearEligible = cards
      .filter(c => c.incomeGap === 0 || c.ageGap === 0)
      .sort((a, b) => (a.ageGap + a.incomeGap / 100000) - (b.ageGap + b.incomeGap / 100000));
    if (nearEligible.length > 0) return nearEligible.slice(0, 3);

    return cards.sort((a, b) => a.minIncome - b.minIncome).slice(0, 3);
  }

  // --- CORE HTML RENDERING MODULES ---
  _buildMFRecommendation(input) {
    const u = this.fabric.identityGraph;
    this.fabric.advanceOnboard(5);

    const isStableRequest = /stable|safe|secure/i.test(input);
    const riskCategory = this._resolveRiskBand(isStableRequest);
    const fundsByBucket = ETEcosystemKB.financialDB.mutualFunds[riskCategory] || ETEcosystemKB.financialDB.mutualFunds.moderate;

    const selectedFunds = [
      this._pickFundByBucket(riskCategory, 'equity', u),
      this._pickFundByBucket(riskCategory, 'debt', u),
      this._pickFundByBucket(riskCategory, 'gold', u)
    ].filter(Boolean);

    if (riskCategory !== 'conservative') {
      const intlFund = this._pickFundByBucket(riskCategory, 'international', u);
      if (intlFund) selectedFunds.push(intlFund);
    }

    let html = `<p>Based on your <strong>${u.risk || 'Moderate'}</strong> profile${isStableRequest ? ' and request for stability' : ''}, here are the top funds analysed by ET Markets:</p>
                                <div class="r-card"><div class="r-card-title">Top ${riskCategory === 'conservative' ? 'Stable / Hybrid' : riskCategory === 'aggressive' ? 'High-Growth' : 'Balanced Growth'} Funds</div>`;

    selectedFunds.forEach(f => {
      html += `<div style="background:rgba(26,107,181,.1);padding:12px;border-radius:8px;margin:8px 0;border-left:4px solid ${riskCategory === 'conservative' ? 'var(--blue)' : 'var(--et-red)'}">
                                 <div style="font-weight:600;font-size:14px;margin-bottom:4px">${f.name}</div>
                                 <div style="font-size:12px;color:var(--et-muted);display:flex;justify-content:space-between">
                                     <span>Type: ${f.type}</span><span>3Y Ret: <strong style="color:var(--teal)">${f.returns}</strong></span>
                                 </div>
                                 <div style="margin-top:8px"><a href="${f.url}" target="_blank" class="et-link" style="font-size:11px">Invest via ET Partners →</a></div>
                             </div>`;
    });
    html += `</div>`;
    return { text: html };
  }

  _buildCardRecommendation() {
    const u = this.fabric.identityGraph;
    const income = u.incomeNum || 500000;
    const eligibleCards = this._pickCardsByProfile(u);

    const cardsList = eligibleCards.map(c => `
      <div style="background:rgba(201,162,39,.1);padding:12px;border-radius:8px;margin-bottom:10px;border-left:3px solid var(--gold)">
        <div style="font-weight:600;font-size:13px">${c.name}</div>
        <div style="font-size:11px;color:var(--et-muted);margin:4px 0">Type: ${c.type}</div>
        <div style="font-size:11px;margin:4px 0;color:${c.eligibleNow ? 'var(--teal)' : 'var(--gold)'}">
          <strong>${c.eligibleNow ? 'Eligible now' : c.ageGap > 0 ? `Eligible in ~${c.ageGap} year(s)` : `Needs +₹${Math.round(c.incomeGap).toLocaleString('en-IN')} annual income`}</strong>
        </div>
        <div style="font-size:11px;margin:4px 0"><strong>Benefits:</strong> ${c.reward}</div>
      </div>
    `).join('');

    return {
      text: `<p>💳 <strong>ET Services Marketplace — Credit Cards</strong></p>
                        <p>Based on your verified profile (Annual Income: ₹${(income / 100000).toFixed(1)}L, Age: ${(u.ageRange || '30–35')}), here are the available card options for you right now (and closest eligible options):</p>
                        ${cardsList}
                        <div style="margin-top:12px"><a href="https://economictimes.indiatimes.com/wealth/spend" target="_blank" class="et-link" style="font-size:11px">View all card offers on ET →</a></div>` };
  }

  _buildLoanEligibility() {
    const u = this.fabric.identityGraph;
    const annualIncome = u.incomeNum || 600000;
    const monthlyIncome = annualIncome / 12;
    const monthlyExpenses = u.monthlyExpenses || (monthlyIncome * 0.5);
    const surplus = Math.max(0, (u.surplus || (monthlyIncome - monthlyExpenses)));
    const age = parseInt((u.ageRange || '30-35').match(/\d+/)?.[0] || '30', 10);

    const recommendedEMI = Math.max(3000, Math.round(Math.min(monthlyIncome * 0.4, surplus * 0.75)));
    const profileBand = annualIncome >= 2000000 ? 'high' : annualIncome >= 1200000 ? 'mid' : annualIncome >= 600000 ? 'emerging' : 'starter';

    const slabs = {
      high: { home: 12000000, personal: 2500000, education: 3500000 },
      mid: { home: 7000000, personal: 1500000, education: 2200000 },
      emerging: { home: 3500000, personal: 600000, education: 1200000 },
      starter: { home: 1500000, personal: 250000, education: 600000 }
    };

    const tenureYears = age >= 40 ? 15 : 20;
    const slab = slabs[profileBand];

    const rows = [
      { name: 'Home Loan', cap: slab.home, eta: '8.5%–9.5%', url: 'https://economictimes.indiatimes.com/wealth/borrow' },
      { name: 'Personal Loan', cap: slab.personal, eta: '10.5%–16%', url: 'https://economictimes.indiatimes.com/wealth/borrow' },
      { name: 'Education Loan', cap: slab.education, eta: '9%–13%', url: 'https://economictimes.indiatimes.com/wealth/borrow' }
    ];

    const loanCards = rows.map(r => `
      <div style="background:rgba(26,107,181,.08);padding:10px;border-radius:8px;margin-bottom:8px;border-left:3px solid var(--blue)">
        <div style="font-weight:600;font-size:12px">${r.name}</div>
        <div style="font-size:11px;color:var(--et-muted);margin-top:4px">Estimated eligible amount: <strong>₹${Math.round(r.cap).toLocaleString('en-IN')}</strong></div>
        <div style="font-size:11px;color:var(--et-muted)">Indicative interest range: ${r.eta}</div>
        <div style="margin-top:6px"><a href="${r.url}" target="_blank" class="et-link" style="font-size:11px">Check ${r.name} options on ET →</a></div>
      </div>
    `).join('');

    return {
      text: `<p>🏦 <strong>ET Services Marketplace — Loan Eligibility</strong></p>
             <p>Based on your profile (Income: ₹${(annualIncome / 100000).toFixed(1)}L · Age: ${u.ageRange || '30-35'}), here is your estimated eligibility:</p>
             <div class="r-card">
               <div style="font-size:12px;color:var(--et-muted);margin-bottom:8px">Recommended EMI capacity: <strong style="color:var(--teal)">₹${recommendedEMI.toLocaleString('en-IN')}/month</strong> · Suggested max tenure: <strong>${tenureYears} years</strong></div>
               ${loanCards}
               <div style="font-size:11px;color:var(--et-muted)">Note: Final approval depends on lender credit checks, existing obligations, and documentation.</div>
             </div>`
    };
  }

  _buildNavigatorKBDetails(data) {
    const name = (data?.name || '').toLowerCase();
    const isForex = /forex|currency/.test(name);

    if (isForex) {
      return `<div class="r-card"><div class="r-card-title">Navigator Details · Forex</div>
        <div style="font-size:12px;color:var(--et-muted);line-height:1.7">
          <div>• Track <strong>USD/INR and major currency moves</strong> with ET Markets Forex.</div>
          <div>• Follow <strong>RBI policy</strong>, global rate cues, and currency volatility updates.</div>
          <div>• Use this section when planning <strong>international investing</strong> or currency-sensitive decisions.</div>
        </div>
        <div style="margin-top:8px"><a href="https://economictimes.indiatimes.com/markets/forex" target="_blank" class="et-link" style="font-size:11px">Open ET Markets Forex →</a></div>
      </div>`;
    }

    return `<div class="r-card"><div class="r-card-title">Navigator Details</div>
      <div style="font-size:12px;color:var(--et-muted);line-height:1.7">
        <div>• This ET section maps to your goal and risk profile.</div>
        <div>• Use it for decision-ready insights before taking investment actions.</div>
        <div>• Ask next: <strong>"How should I use this for my profile?"</strong></div>
      </div>
    </div>`;
  }

  _buildSIPRoadmap(input) {
    const u = this.fabric.identityGraph;
    let sipAmount = u.surplus || 10000;

    // Dynamic Input Parsing (strips commas, applies multipliers safely)
    const cleanInput = input.replace(/,/g, '');
    const match = cleanInput.match(/(\d+(?:\.\d+)?)\s*(k|lakhs?|lacs?|lackhs?|l)?\b/i);
    if (match) {
      let val = parseFloat(match[1]);
      let mult = match[2]?.toLowerCase() || '';
      if (mult === 'k') val *= 1000;
      else if (mult.startsWith('l')) val *= 100000;
      if (val > 0) sipAmount = val;
    }

    let eq = 50, db = 30, gl = 10, in_ = 10;
    if (u.risk === 'Aggressive') { eq = 65; db = 15; gl = 5; in_ = 15; }
    else if (u.risk === 'Conservative') { eq = 25; db = 60; gl = 15; in_ = 0; }

    const riskBand = this._resolveRiskBand(false);
    const fundPlan = [
      { bucket: 'Equity', key: 'equity', pct: eq },
      { bucket: 'Debt', key: 'debt', pct: db },
      { bucket: 'Gold', key: 'gold', pct: gl },
      { bucket: 'International', key: 'international', pct: in_ }
    ]
      .filter(p => p.pct > 0)
      .map(p => ({ ...p, fund: this._pickFundByBucket(riskBand, p.key, u) }))
      .filter(p => Boolean(p.fund));

    const serviceRecommendations = [];
    if (u.hasInsurance !== true) {
      serviceRecommendations.push({
        icon: '🛡️',
        title: 'Term Insurance',
        desc: 'Critical protection gap detected based on your profile.',
        url: 'https://economictimes.indiatimes.com/wealth/insure',
        cta: 'Explore Term Insurance'
      });
    }

    serviceRecommendations.push({
      icon: '📊',
      title: 'Mutual Fund Screener',
      desc: `Funds aligned to your ${u.risk || 'Moderate'} risk profile and SIP capacity.`,
      url: 'https://economictimes.indiatimes.com/mutual-funds',
      cta: 'Compare Mutual Funds'
    });

    if ((u.incomeNum || 0) >= 1200000) {
      serviceRecommendations.push({
        icon: '💳',
        title: 'Premium Credit Card Match',
        desc: 'Cards with high rewards and ET-linked partner benefits.',
        url: 'https://economictimes.indiatimes.com/wealth/spend',
        cta: 'See Card Matches'
      });
    } else {
      serviceRecommendations.push({
        icon: '📋',
        title: 'Tax Planning Services',
        desc: 'Improve post-tax returns with deductions and planning tools.',
        url: 'https://economictimes.indiatimes.com/wealth/tax',
        cta: 'Open Tax Planning'
      });
    }

    const altLabel = u.risk === 'Aggressive' ? 'International' : 'Alternatives';

    return {
      text: `<p>🗺️ <strong>Your Precision SIP Roadmap</strong></p>
            <div class="r-card">
            <div class="r-card-title" style="color:var(--gold)">Monthly Capacity: ₹${Math.round(sipAmount).toLocaleString('en-IN')}</div>
            <div style="padding:12px">
                <p style="margin:0 0 12px 0;font-size:12px;color:var(--et-muted)">Exact mathematical split based on your ${u.risk || 'Moderate'} profile:</p>
                <div style="display:flex;gap:8px;margin-bottom:12px;text-align:center">
                    <div style="flex:1;background:rgba(208,2,27,.1);padding:10px;border-radius:6px"><div style="color:var(--et-red);font-weight:700;font-size:16px">${eq}%</div><div style="font-size:10px;color:var(--et-muted)">Equity</div></div>
                    <div style="flex:1;background:rgba(26,107,181,.1);padding:10px;border-radius:6px"><div style="color:var(--blue);font-weight:700;font-size:16px">${db}%</div><div style="font-size:10px;color:var(--et-muted)">Debt</div></div>
                    <div style="flex:1;background:rgba(201,162,39,.1);padding:10px;border-radius:6px"><div style="color:var(--gold);font-weight:700;font-size:16px">${gl}%</div><div style="font-size:10px;color:var(--et-muted)">Gold</div></div>
            ${in_ > 0 ? `<div style="flex:1;background:rgba(26,171,170,.1);padding:10px;border-radius:6px"><div style="color:var(--teal);font-weight:700;font-size:16px">${in_}%</div><div style="font-size:10px;color:var(--et-muted)">${altLabel}</div></div>` : ''}
                </div>
                <div style="font-size:12px;background:rgba(255,255,255,0.05);padding:10px;border-radius:6px">
                    <ul style="margin:0;padding-left:16px">
                         <li><strong>Equity:</strong> ₹${Math.round(sipAmount * eq / 100).toLocaleString('en-IN')}</li>
                         <li><strong>Debt:</strong> ₹${Math.round(sipAmount * db / 100).toLocaleString('en-IN')}</li>
                         <li><strong>Gold:</strong> ₹${Math.round(sipAmount * gl / 100).toLocaleString('en-IN')}</li>
               ${in_ > 0 ? `<li><strong>${altLabel}:</strong> ₹${Math.round(sipAmount * in_ / 100).toLocaleString('en-IN')}</li>` : ''}
                    </ul>
                </div>
                <div style="margin-top:12px;background:rgba(26,107,181,.08);padding:10px;border-radius:8px">
                    <div style="font-size:12px;color:var(--et-muted);margin-bottom:8px">SIP roadmap funds with allocation:</div>
                    ${fundPlan.map(p => `
                      <div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.08)">
                        <div style="font-size:12px;font-weight:600">${p.bucket} · ${p.pct}%</div>
                        <div style="font-size:11px;color:var(--et-muted)">${p.fund.name} (${p.fund.type})</div>
                        <div style="font-size:11px;margin-top:4px"><a href="${p.fund.url}" target="_blank" class="et-link">Invest ${p.pct}% via ET Partners →</a></div>
                      </div>
                    `).join('')}
                </div>
                <div style="margin-top:12px">
                    <div style="font-size:12px;color:var(--et-muted);margin-bottom:8px">Recommended services for your profile:</div>
                    ${serviceRecommendations.map(s => `
                      <div style="background:rgba(26,107,181,.08);padding:10px;border-radius:8px;margin-bottom:8px;border-left:3px solid var(--teal)">
                        <div style="font-weight:600;font-size:13px">${s.icon} ${s.title}</div>
                        <div style="font-size:11px;color:var(--et-muted);margin:4px 0 6px 0">${s.desc}</div>
                        <a href="${s.url}" target="_blank" class="et-link" style="font-size:11px">${s.cta} →</a>
                      </div>
                    `).join('')}
                </div>
            </div></div>` };
  }

  _buildDynamicOnboardUI() {
    const u = this.fabric.identityGraph;
    const path = [];

    let primeReason = u.goal === 'Retirement / FIRE' ? 'Access FIRE calculators & retirement guides' : 'Deep equity research for wealth creation';
    path.push({ ico: '📰', bg: 'rgba(208,2,27,.15)', t: 'ET Prime Subscription', s: primeReason, url: 'https://economictimes.indiatimes.com/prime' });

    if (u.assets && /Equity|Stock/i.test(u.assets)) {
      path.push({ ico: '📊', bg: 'rgba(26,107,181,.15)', t: 'ET Markets Portfolio', s: 'Track your existing equity investments', url: 'https://economictimes.indiatimes.com/markets' });
    } else {
      path.push({ ico: '📊', bg: 'rgba(26,107,181,.15)', t: 'ET Markets Screener', s: 'Discover safe entry points for your portfolio', url: 'https://economictimes.indiatimes.com/markets' });
    }

    let mcTopic = u.risk === 'Aggressive' ? 'Options Trading & Equity' : 'Personal Finance Basics';
    path.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', t: `Masterclass: ${mcTopic}`, s: `Matched to your ${u.risk} profile`, url: 'https://economictimes.indiatimes.com/masterclass' });

    if (u.hasInsurance === false) {
      path.push({ ico: '🛡️', bg: 'rgba(239,68,68,.15)', t: 'ET Wealth: Term Insurance', s: 'Critical coverage gap detected', url: 'https://economictimes.indiatimes.com/wealth/insure' });
    } else if (u.incomeNum > 1500000) {
      path.push({ ico: '💎', bg: 'rgba(201,162,39,.15)', t: 'ET Marketplace: Wealth PMS', s: 'Premium advisory for HNI profile', url: 'https://economictimes.indiatimes.com/markets' });
    } else {
      path.push({ ico: '🏦', bg: 'rgba(26,171,170,.15)', t: 'ET Marketplace: Mutual Funds', s: 'Start your SIP journey today', url: 'https://economictimes.indiatimes.com/mutual-funds' });
    }

    return `<div class="r-card"><div class="r-card-title">YOUR DYNAMIC ET PATH · ${u.segment || 'ET USER'}</div>${path.map((r, i) => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${r.bg}">${r.ico}</div><div><div class="opp-title"><a href="${r.url}" target="_blank" class="et-link" style="color:rgba(255,255,255,.88);font-size:12px">${r.t}</a></div><div class="opp-sub">${r.s}</div></div></div><span class="match-pill match-high">Step ${i + 1}</span></div>`).join('')}</div>`;
  }

  async _buildPersonalizedNewsResponse() {
    this.fabric.pushSignal('Fetching personalized news', 'var(--teal)');
    const u = this.fabric.identityGraph;

    let newsType = 'Top Stories';
    let items = [];
    if (u.risk === 'Aggressive' || (u.assets && /Equity/i.test(u.assets))) {
      newsType = 'Market Movers';
      items = await this.fabric.liveData.getMarketNews();
    } else {
      newsType = 'Wealth & Tax';
      items = await this.fabric.liveData.getWealthNews();
    }

    const newsHTML = items.slice(0, 3).map(i => `<div style="background:rgba(26,107,181,.08);padding:12px;border-radius:8px;margin:8px 0"><div style="display:flex;justify-content:space-between"><span style="color:var(--et-red);font-size:11px;font-weight:600">${i.source}</span></div><div style="font-weight:500;margin:6px 0">${i.title}</div><div style="font-size:12px;color:var(--et-muted);margin-bottom:6px">${i.description}</div><a href="${i.link}" target="_blank" class="et-link" style="font-size:11px">Read full story →</a></div>`).join('');

    return { text: `<p>📰 <strong>Based on your ${u.risk || 'Moderate'} profile and assets, here are your ${newsType}:</strong></p>${newsHTML}` };
  }

  _buildGapsCard() {
    const u = this.fabric.identityGraph, gaps = [];
    if (u.hasInsurance !== true) gaps.push({ ico: '🛡️', bg: 'rgba(239,68,68,.15)', title: 'Term Insurance Missing', sub: `Recommended: 20× income`, match: 'Critical', level: 'match-crit' });
    if (u.hasNPS !== true) gaps.push({ ico: '📋', bg: 'rgba(26,107,181,.15)', title: 'NPS Contribution Gap', sub: `₹50K extra deduction`, match: 'Important', level: 'match-med' });
    if (!gaps.length) gaps.push({ ico: '✅', bg: 'rgba(34,197,94,.15)', title: 'Well Diversified', sub: 'No critical gaps.', match: 'Healthy', level: 'match-high' });
    return `<div class="r-card"><div class="r-card-title">Gap Analysis</div>${gaps.map(g => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${g.bg}">${g.ico}</div><div><div class="opp-title">${g.title}</div><div class="opp-sub">${g.sub}</div></div></div><span class="match-pill ${g.level}">${g.match}</span></div>`).join('')}</div>`;
  }

  _buildCrossSellCard(triggers, userProfile) {
    const u = userProfile || this.fabric.identityGraph;
    const sipAmount = Math.max(5000, Math.round(u.surplus || 10000));

    let eq = 50, db = 30, gl = 10, in_ = 10;
    if (u.risk === 'Aggressive') { eq = 65; db = 15; gl = 5; in_ = 15; }
    else if (u.risk === 'Conservative') { eq = 25; db = 60; gl = 15; in_ = 0; }

    return `<div class="r-card">
      <div class="r-card-title">Behavioural Match</div>
      <div style="background:rgba(26,107,181,.08);padding:10px;border-radius:8px;margin-bottom:10px;border-left:3px solid var(--teal)">
        <div style="font-weight:600;font-size:12px;margin-bottom:6px">Profile-based SIP Recommendation</div>
        <div style="font-size:11px;color:var(--et-muted);margin-bottom:6px">Risk: ${u.risk || 'Moderate'} · Goal: ${u.goal || 'Wealth creation'} · Monthly SIP: <strong style="color:var(--teal)">₹${sipAmount.toLocaleString('en-IN')}</strong></div>
        <div style="font-size:11px;line-height:1.7">
          <span><strong>Equity:</strong> ₹${Math.round(sipAmount * eq / 100).toLocaleString('en-IN')} (${eq}%)</span> ·
          <span><strong>Debt:</strong> ₹${Math.round(sipAmount * db / 100).toLocaleString('en-IN')} (${db}%)</span> ·
          <span><strong>Gold:</strong> ₹${Math.round(sipAmount * gl / 100).toLocaleString('en-IN')} (${gl}%)</span>
          ${in_ > 0 ? ` · <span><strong>International:</strong> ₹${Math.round(sipAmount * in_ / 100).toLocaleString('en-IN')} (${in_}%)</span>` : ''}
        </div>
      </div>
      ${triggers.map(i => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(201,162,39,.15)">${i.icon}</div><div><div class="opp-title">${i.reason}</div><div class="opp-sub">${i.priority} priority</div></div></div><a href="${i.url || '#'}" target="_blank" class="match-pill match-high" style="text-decoration:none">View</a></div>`).join('')}
    </div>`;
  }

  getRichCardHTML(type) {
    const b = {
      'age': () => `<div class="opt-grid">${[['18–25', 'Early career'], ['30–35', 'Peak earning'], ['35+', 'Established']].map(r => `<div class="opt-chip" onclick="injectQuick('I am ${r[0]}')"><div class="opt-chip-name">${r[0]}</div></div>`).join('')}<div class="opt-chip" onclick="injectQuick('My exact age is: ')"><div class="opt-chip-name" style="color:var(--gold)">Other (Type it) ⌨️</div></div></div>`,
      'goal': () => `<div class="opt-grid">${[['Retirement / FIRE', 'Independence'], ['Wealth creation', 'Growth'], ['Child Education', 'Family']].map(r => `<div class="opt-chip" onclick="injectQuick('${r[0]}')"><div class="opt-chip-name">${r[0]}</div></div>`).join('')}<div class="opt-chip" onclick="injectQuick('My exact goal is: ')"><div class="opt-chip-name" style="color:var(--gold)">Custom Goal ⌨️</div></div></div>`,
      'risk': () => `<div class="opt-grid">${[['Conservative', 'Safe'], ['Moderate', 'Balanced'], ['Aggressive', 'High growth']].map(r => `<div class="opt-chip" onclick="injectQuick('${r[0]}')"><div class="opt-chip-name">${r[0]}</div></div>`).join('')}</div>`,
      'inc': () => `<div class="opt-grid">${[['₹12 Lakhs', 'Median'], ['₹18 Lakhs', 'Mid-Senior'], ['₹24 Lakhs', 'Senior']].map(r => `<div class="opt-chip" onclick="injectQuick('${r[0]}')"><div class="opt-chip-name">${r[0]}</div></div>`).join('')}<div class="opt-chip" onclick="injectQuick('My exact income is: ')"><div class="opt-chip-name" style="color:var(--gold)">Exact Amount ⌨️</div></div></div>`,
      'exp': () => `<div class="opt-grid">${[['₹40,000', 'Standard'], ['₹75,000', 'Moderate'], ['₹1.2 Lakhs', 'High']].map(r => `<div class="opt-chip" onclick="injectQuick('${r[0]}')"><div class="opt-chip-name">${r[0]}</div></div>`).join('')}<div class="opt-chip" onclick="injectQuick('My exact monthly expense is: ')"><div class="opt-chip-name" style="color:var(--gold)">Exact Amount ⌨️</div></div></div>`,
      'hor': () => `<div class="opt-grid">${[['5 yrs', 'Short'], ['10 yrs', 'Medium'], ['15 yrs', 'Long']].map(r => `<div class="opt-chip" onclick="injectQuick('${r[0]}')"><div class="opt-chip-name">${r[0]}</div></div>`).join('')}<div class="opt-chip" onclick="injectQuick('My exact horizon is: ')"><div class="opt-chip-name" style="color:var(--gold)">Other ⌨️</div></div></div>`,
      'asset': () => `<div class="opt-grid">${[['Equity & MF', 'SIPs'], ['FD & Debt', 'Fixed']].map(r => `<div class="opt-chip" onclick="injectQuick('${r[0]}')"><div class="opt-chip-name">${r[0]}</div></div>`).join('')}<div class="opt-chip" onclick="injectQuick('My exact assets are: ')"><div class="opt-chip-name" style="color:var(--gold)">Other ⌨️</div></div></div>`,
      'ins': () => `<div class="opt-grid">${[['Yes, both', 'Covered'], ['Neither', 'Need both']].map(r => `<div class="opt-chip" onclick="injectQuick('${r[0]}')"><div class="opt-chip-name">${r[0]}</div></div>`).join('')}</div>`
    };
    return b[type] ? `<div class="r-card"><div class="r-card-title">Select option or Type manually</div>${b[type]()}</div>` : '';
  }
}

// ============================= UI BINDING & BOOT =============================
const fabric = new DataFabric();
const engine = new Orchestrator(fabric);

class VoiceInput {
  constructor() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.supported = Boolean(SR);
    this.isListening = false;
    if (!this.supported) return;

    this.recognition = new SR();
    this.recognition.lang = 'en-IN';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (e) => {
      const text = e.results?.[0]?.[0]?.transcript?.trim();
      if (!text) return;
      const input = document.getElementById('msg-input');
      if (input) {
        input.value = text;
        sendMessage();
      }
    };
    this.recognition.onend = () => { this.isListening = false; this._updateBtn(); };
    this.recognition.onerror = () => { this.isListening = false; this._updateBtn(); };
  }

  toggle() {
    if (!this.supported) {
      alert('Voice input not supported in this browser.');
      return;
    }
    if (this.isListening) this.stop();
    else this.start();
  }

  start() {
    try {
      this.recognition.start();
      this.isListening = true;
      this._updateBtn();
      fabric.pushSignal('Voice input active', 'var(--coral)');
    } catch (e) {
      this.isListening = false;
      this._updateBtn();
    }
  }

  stop() {
    try { this.recognition.stop(); } catch (e) { }
    this.isListening = false;
    this._updateBtn();
  }

  _updateBtn() {
    const btn = document.getElementById('voice-btn');
    if (!btn) return;
    btn.classList.toggle('voice-active', this.isListening);
    btn.title = this.isListening ? 'Listening... click to stop' : 'Voice input';
  }
}

const voice = new VoiceInput();
const chatHistoryByAgent = {};
const openedLinks = new Set();

function updateLiveStatus(stateText) {
  const live = document.getElementById('live-status');
  if (!live) return;
  if (stateText) {
    live.textContent = stateText;
    return;
  }
  const activeAgent = engine.agentConfig[engine.currentAgent]?.title || 'Agent';
  live.textContent = `Connected · ${activeAgent} · ${fabric.metrics.interactions} queries`;
}

function nowTime() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function renderMsg(role, content, time, richType, isExtra) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div'); div.className = `msg ${role === 'user' ? 'user' : ''}`;
  const av = document.createElement('div'); av.className = `msg-av ${role === 'user' ? 'user-av' : 'et-av'}`;
  av.textContent = role === 'user' ? (fabric.identityGraph.initials || '?') : 'ET';
  const wrap = document.createElement('div'); wrap.className = 'msg-wrap';
  const bubble = document.createElement('div'); bubble.className = 'msg-bubble';
  bubble.innerHTML = content || '';
  if (richType) bubble.innerHTML += engine.getRichCardHTML(richType);
  wrap.appendChild(bubble);
  if (!isExtra) { const t = document.createElement('div'); t.className = 'msg-time'; t.textContent = time || nowTime(); wrap.appendChild(t); }
  div.appendChild(av); div.appendChild(wrap); msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
}

function classifyUsageFromLink(url, text) {
  const val = `${url || ''} ${text || ''}`.toLowerCase();
  if (/masterclass|course|webinar|learn/.test(val)) return 'classes';
  if (/read full story|article|news/.test(val)) return 'articles';
  if (/opportunit|apply via et partners|invest via et partners|pre-approved|term insurance/.test(val)) return 'opportunities';
  return 'products';
}

function trackEcosystemLinkClick(anchor) {
  if (!anchor) return;
  const url = anchor.getAttribute('href') || '';
  if (!url || url === '#') return;

  const key = `${engine.currentAgent || 'concierge'}::${url}`;
  if (openedLinks.has(key)) return;
  openedLinks.add(key);

  const bucket = classifyUsageFromLink(url, anchor.textContent || '');
  fabric.metrics[bucket] = (fabric.metrics[bucket] || 0) + 1;
  fabric.renderMetrics();
  fabric.pushSignal(`Opened ET link (${bucket})`, 'var(--teal)');
}

function bindEcosystemLinkTracking() {
  if (document.body.dataset.etLinkTrackingBound === '1') return;
  document.body.dataset.etLinkTrackingBound = '1';

  document.addEventListener('click', (e) => {
    const anchor = e.target?.closest?.('a.et-link');
    if (!anchor) return;
    trackEcosystemLinkClick(anchor);
  });
}

function showTyping() {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div'); div.className = 'msg'; div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-av et-av">ET</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight; return div;
}

function injectQuick(text) {
  const inp = document.getElementById('msg-input');
  inp.value = text;
  if (text.includes('is:')) { inp.focus(); }
  else { sendMessage(); }
}
function setQuickReplies(list) { document.getElementById('quick-replies').innerHTML = list.map(q => `<button class="qr" onclick="injectQuick('${q.replace(/'/g, "\\'")}')">${q}</button>`).join(''); }

function flashTag(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('update-flash');
  setTimeout(() => el.classList.remove('update-flash'), 1600);
}

function switchTab(tab, btn) {
  const tabRoot = btn?.closest('.panel-tabs');
  if (!tabRoot) return;

  tabRoot.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const content = tabRoot.parentElement?.querySelector('.panel-content');
  if (!content) return;

  const target = content.querySelector(`#pane-${tab}`) || content.querySelector(`#drawer-pane-${tab}`);
  if (!target) return;

  content.querySelectorAll('.panel-pane').forEach(p => p.classList.remove('active'));
  target.classList.add('active');
}

function toggleDrawer() {
  if (window.drawerManager) window.drawerManager.toggle();
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
}

function clearSession() {
  if (!confirm('Clear all saved data?')) return;
  fabric.session.clear();
  location.reload();
}

function handlePortfolioUpload(file) {
  if (!file) return;
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  fabric.pushSignal(`Portfolio file uploaded: ${file.name} (${sizeMB} MB)`, 'var(--teal)');
  renderMsg('assistant', `<p>📎 <strong>File received:</strong> ${file.name}</p><p>Upload captured. I can continue profiling and use your details from chat.</p>`, nowTime());
}

function switchAgent(key, btn) {
  const messagesEl = document.getElementById('messages');
  if (engine.currentAgent && engine.currentAgent !== key) {
    chatHistoryByAgent[engine.currentAgent] = messagesEl.innerHTML;
  }

  document.querySelectorAll('.agent-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  engine.currentAgent = key;
  const cfg = engine.agentConfig[key];
  document.getElementById('agent-title').textContent = cfg.title;
  document.getElementById('agent-desc-hdr').textContent = cfg.desc;
  const modeHint = document.getElementById('agent-mode-hint');
  if (modeHint) modeHint.textContent = `${cfg.title} mode`;
  setQuickReplies(cfg.qr);
  if (chatHistoryByAgent[key]) {
    messagesEl.innerHTML = chatHistoryByAgent[key];
    updateLiveStatus();
    return;
  }

  messagesEl.innerHTML = '';
  fabric.pushSignal(`Agent: ${cfg.title}`, 'var(--blue)');
  setTimeout(() => {
    const guide = {
      concierge: {
        title: 'Welcome Concierge',
        desc: 'Handles welcome and onboarding details only.',
        demos: ['Show my onboarding path', 'Who are you?', 'What details do you need?']
      },
      navigator: {
        title: 'Financial Navigator',
        desc: 'Understands your profile to generate investment plans, identify gaps, and guide you to the right ET tools and partner services.',
        demos: ['Build my SIP roadmap', 'Analyze my portfolio gaps', 'Recommend mutual funds']
      },
      crosssell: {
        title: 'Cross-Sell Engine',
        desc: 'Proactively identifies cross-sell and upsell opportunities at the right moment based on behavior + profile.',
        demos: ["What's best for my profile?", 'Any upsell opportunity for me?', 'Show my top opportunities']
      },
      marketplace: {
        title: 'Services Marketplace',
        desc: 'Conversational concierge for credit cards, loans, insurance, and wealth services via ET partnerships.',
        demos: ['Credit card for me', 'Term insurance quotes', 'Loan options for me']
      }
    };

    const selected = guide[key];
    const demoHtml = selected.demos.map(question => `• ${question}`).join('<br>');
    const text = `<p><strong>${selected.title}</strong> active.</p><p>${selected.desc}</p><p><strong>Demo questions:</strong><br>${demoHtml}</p>`;
    renderMsg('assistant', text, nowTime(), null);
    chatHistoryByAgent[key] = messagesEl.innerHTML;
    updateLiveStatus();
  }, 200);
}

function sendMessage() {
  const inp = document.getElementById('msg-input');
  const txt = inp.value.trim(); if (!txt) return;
  renderMsg('user', `<p>${txt}</p>`, nowTime());
  inp.value = '';
  const typing = showTyping();
  setTimeout(async () => {
    typing.remove();
    const resp = await engine.process(txt);
    renderMsg('assistant', resp.text || '', nowTime(), resp.richType);
    if (resp.extra) renderMsg('assistant', resp.extra, nowTime(), null, true);
    chatHistoryByAgent[engine.currentAgent] = document.getElementById('messages').innerHTML;
    updateLiveStatus();
  }, 600);
}
function applyHIL() {
  const updates = {};

  const hilName = document.getElementById('hil-name');
  const hilAge = document.getElementById('hil-age');
  const hilRisk = document.getElementById('hil-risk');
  const hilGoal = document.getElementById('hil-goal');
  const hilHorizon = document.getElementById('hil-horizon');

  if (hilName && hilName.value.trim()) {
    updates.name = hilName.value.trim();
    const parts = updates.name.split(/\s+/);
    updates.initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : updates.name.substring(0, 2).toUpperCase();
  }

  if (hilAge && hilAge.value.trim()) updates.ageRange = hilAge.value.trim();
  if (hilRisk && hilRisk.value) updates.risk = hilRisk.value;
  if (hilGoal && hilGoal.value) updates.goal = hilGoal.value;
  if (hilHorizon && hilHorizon.value) updates.horizon = hilHorizon.value;

  // Inject "User Confirmed" visual tagging
  const segElement = document.getElementById('p-seg');
  if (segElement) {
    segElement.innerHTML = `${fabric.identityGraph.segment || 'ET USER'} <span class="profile-section-tag tag-confirmed">User Confirmed ✓</span>`;
  }

  fabric.updateIdentity(updates, 'User confirmed profile edits');
  fabric.markConfirmed(Object.keys(updates));

  // Notify Drawer that update came from User manually
  if (window.drawerManager) window.drawerManager.notifyUpdate('User Confirmed');

  flashTag('tag-hil');

  // Give conversational feedback
  renderMsg('assistant', `<p>⚙️ <strong>Profile Overwritten.</strong> I have updated your PAIL data based on your manual inputs. Risk: <strong>${updates.risk || fabric.identityGraph.risk}</strong> · Goal: <strong>${updates.goal || fabric.identityGraph.goal}</strong>.</p><p>My ecosystem roadmaps have been repersonalised accordingly.</p>`, nowTime());
}
window.addEventListener('load', () => {
  bindEcosystemLinkTracking();
  const bar = document.getElementById('ld-bar');
  const steps = document.querySelectorAll('.loading-step');
  let i = 0;
  const tick = setInterval(() => {
    if (i < steps.length) { steps[i].classList.add('show', 'done'); bar.style.width = ((i + 1) / steps.length * 100) + '%'; i++; }
    else {
      clearInterval(tick);
      setTimeout(() => {
        document.getElementById('loading-screen').remove();
        fabric.updateUI();
        setQuickReplies(engine.agentConfig.concierge.qr);
        const intro = engine.stages[0];
        renderMsg('assistant', intro.ask, nowTime(), null);
        chatHistoryByAgent.concierge = document.getElementById('messages').innerHTML;
        updateLiveStatus('Connected');
      }, 500);
    }
  }, 300);
});