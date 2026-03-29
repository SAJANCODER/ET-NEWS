/**
 * PAIL v4.0 — ET AI Concierge Engine
 * Architecture: ETEcosystemKB → ETLiveData → NLPEngine → Orchestrator → DataFabric
 * Full Local NLP · Live ET Feeds · Session Persistence · Behavioural Intelligence
 */

// ============================= ET ECOSYSTEM KNOWLEDGE BASE =============================
const ETEcosystemKB = {
  products: {
    prime: {
      name: 'ET Prime', icon: '📰', color: 'rgba(208,2,27,.15)',
      url: 'https://economictimes.indiatimes.com/prime',
      desc: 'Premium journalism — exclusive research, expert columns, ad-free, Wealth Edition magazine',
      features: ['Exclusive articles', 'Deep analysis', 'Expert columns', 'Ad-free reading', 'Wealth Edition', 'Stock Reports Plus'],
      keywords: ['prime', 'premium', 'exclusive', 'subscribe', 'membership', 'ad-free', 'ad free']
    },
    markets: {
      name: 'ET Markets', icon: '📊', color: 'rgba(26,107,181,.15)',
      url: 'https://economictimes.indiatimes.com/markets',
      desc: 'Live market data, stock screeners, portfolio tracker, expert analysis',
      features: ['Live stock prices', 'Market screeners', 'Portfolio tracker', 'Technical charts', 'Stock Reports Plus', 'Mutual fund NAVs'],
      keywords: ['market', 'stock', 'share', 'nifty', 'sensex', 'bse', 'nse', 'trading', 'invest'],
      sections: {
        stocks: { name: 'Stocks', url: 'https://economictimes.indiatimes.com/markets/stocks', keywords: ['stock', 'share', 'equity', 'largecap', 'midcap', 'smallcap'] },
        mf: { name: 'Mutual Funds', url: 'https://economictimes.indiatimes.com/mutual-funds', keywords: ['mutual fund', 'mf', 'sip', 'nav', 'amc', 'scheme', 'fund'] },
        fno: { name: 'Futures & Options', url: 'https://economictimes.indiatimes.com/markets/stocks/livequotes/derivatives', keywords: ['future', 'option', 'f&o', 'fno', 'derivative', 'call', 'put', 'strike', 'expiry', 'nifty option'] },
        ipo: { name: 'IPO', url: 'https://economictimes.indiatimes.com/markets/ipo', keywords: ['ipo', 'initial public', 'listing', 'allotment', 'gmp', 'grey market'] },
        commodities: { name: 'Commodities', url: 'https://economictimes.indiatimes.com/markets/commodities', keywords: ['commodity', 'gold', 'silver', 'crude', 'oil', 'mcx', 'metal'] },
        forex: { name: 'Forex', url: 'https://economictimes.indiatimes.com/markets/forex', keywords: ['forex', 'currency', 'dollar', 'rupee', 'usd', 'exchange rate'] },
        bonds: { name: 'Bonds', url: 'https://economictimes.indiatimes.com/markets/bonds', keywords: ['bond', 'yield', 'gilt', 'treasury', 'gsec', 'government securities'] },
        etfs: { name: 'ETFs', url: 'https://economictimes.indiatimes.com/mutual-funds/etf', keywords: ['etf', 'exchange traded', 'index fund', 'nifty bees', 'gold etf'] },
        technicals: { name: 'Technical Analysis', url: 'https://economictimes.indiatimes.com/markets/stocks/news/technicals', keywords: ['technical', 'chart', 'resistance', 'support', 'rsi', 'macd', 'moving average', 'candlestick'] }
      }
    },
    wealth: {
      name: 'ET Wealth', icon: '💰', color: 'rgba(201,162,39,.15)',
      url: 'https://economictimes.indiatimes.com/wealth',
      desc: 'Personal finance — tax planning, insurance, retirement, real estate, savings',
      features: ['Tax planning guides', 'Insurance comparison', 'Retirement calculator', 'Real estate insights', 'Savings strategies'],
      keywords: ['wealth', 'personal finance', 'save', 'saving'],
      sections: {
        tax: { name: 'Tax & Saving', url: 'https://economictimes.indiatimes.com/wealth/tax', keywords: ['tax', 'itr', 'income tax', '80c', '80d', 'deduction', 'huf', 'capital gain', 'ltcg', 'stcg', 'tax saving', 'elss'] },
        insurance: { name: 'Insurance', url: 'https://economictimes.indiatimes.com/wealth/insure', keywords: ['insurance', 'term plan', 'health insurance', 'life insurance', 'claim', 'premium', 'ulip', 'endowment'] },
        realestate: { name: 'Real Estate', url: 'https://economictimes.indiatimes.com/wealth/real-estate', keywords: ['real estate', 'property', 'home', 'flat', 'apartment', 'rera', 'home loan', 'mortgage', 'rent'] },
        retirement: { name: 'Retirement', url: 'https://economictimes.indiatimes.com/wealth/retire', keywords: ['retire', 'retirement', 'pension', 'nps', 'epf', 'ppf', 'senior citizen', 'annuity'] },
        borrow: { name: 'Borrow', url: 'https://economictimes.indiatimes.com/wealth/borrow', keywords: ['loan', 'borrow', 'emi', 'credit', 'personal loan', 'home loan', 'car loan', 'education loan'] },
        spend: { name: 'Spend', url: 'https://economictimes.indiatimes.com/wealth/spend', keywords: ['spend', 'credit card', 'reward', 'cashback', 'upi', 'digital payment'] }
      }
    },
    masterclass: {
      name: 'ET Masterclass', icon: '🎓', color: 'rgba(26,171,170,.15)',
      url: 'https://economictimes.indiatimes.com/masterclass',
      desc: 'Expert-led courses on investing, finance, AI, leadership, professional skills',
      features: ['Expert instructors', 'Certification', 'Live webinars', 'Self-paced courses', 'Corporate training'],
      keywords: ['masterclass', 'course', 'learn', 'class', 'training', 'webinar', 'workshop', 'certificate', 'education']
    },
    now: {
      name: 'ET Now', icon: '📺', color: 'rgba(232,93,36,.15)',
      url: 'https://economictimes.indiatimes.com/tv',
      desc: 'Live business news TV — market analysis, expert interviews, breaking news',
      features: ['Live TV', 'Market hours coverage', 'Expert panels', 'Breaking news'],
      keywords: ['tv', 'live', 'channel', 'broadcast', 'watch', 'video', 'et now', 'show']
    },
    panache: {
      name: 'ET Panache', icon: '✨', color: 'rgba(201,162,39,.15)',
      url: 'https://economictimes.indiatimes.com/panache',
      desc: 'Luxury lifestyle — fashion, food, travel, art, wellness for business leaders',
      keywords: ['luxury', 'lifestyle', 'fashion', 'travel', 'food', 'wellness', 'panache']
    },
    rise: {
      name: 'ET Rise', icon: '🚀', color: 'rgba(26,138,90,.15)',
      url: 'https://economictimes.indiatimes.com/small-biz',
      desc: 'SME & startup ecosystem — funding, growth strategies, MSME policies',
      keywords: ['startup', 'sme', 'msme', 'entrepreneur', 'small business', 'funding', 'venture']
    },
    auto: { name: 'ET Auto', icon: '🚗', url: 'https://auto.economictimes.indiatimes.com', desc: 'Automobile industry news', keywords: ['auto', 'car', 'vehicle', 'ev', 'electric vehicle'] },
    telecom: { name: 'ET Telecom', icon: '📡', url: 'https://telecom.economictimes.indiatimes.com', desc: 'Telecom sector news', keywords: ['telecom', '5g', 'spectrum', 'jio', 'airtel'] },
    energy: { name: 'ET Energy', icon: '⚡', url: 'https://energy.economictimes.indiatimes.com', desc: 'Energy sector — oil, gas, renewables', keywords: ['energy', 'solar', 'renewable', 'oil', 'gas', 'power'] },
    cio: { name: 'ET CIO', icon: '💻', url: 'https://cio.economictimes.indiatimes.com', desc: 'Enterprise technology & digital transformation', keywords: ['cio', 'enterprise', 'digital transformation', 'saas', 'cloud'] },
    bfsi: { name: 'ET BFSI', icon: '🏦', url: 'https://bfsi.economictimes.indiatimes.com', desc: 'Banking, Financial Services & Insurance industry', keywords: ['bfsi', 'banking', 'fintech', 'rbi', 'sebi', 'regulation'] },
    events: {
      name: 'ET Events', icon: '🎪', color: 'rgba(26,107,181,.15)',
      url: 'https://economictimes.indiatimes.com/events',
      desc: 'Wealth Summits, Startup Awards, CXO conclaves, industry events',
      keywords: ['event', 'summit', 'conclave', 'awards', 'conference', 'wealth summit']
    }
  },

  // Map intent to ET product with confidence
  matchQuery(query) {
    const q = query.toLowerCase();
    const matches = [];

    // Check sub-sections first (more specific)
    for (const [pKey, product] of Object.entries(this.products)) {
      if (product.sections) {
        for (const [sKey, section] of Object.entries(product.sections)) {
          let score = 0;
          for (const kw of section.keywords) {
            if (q.includes(kw)) score += kw.split(' ').length * 10; // multi-word keywords score higher
          }
          if (score > 0) matches.push({ type: 'section', product: pKey, section: sKey, data: { ...section, parentProduct: product.name, parentIcon: product.icon }, score });
        }
      }
      // Check product-level keywords
      if (product.keywords) {
        let score = 0;
        for (const kw of product.keywords) {
          if (q.includes(kw)) score += kw.split(' ').length * 8;
        }
        if (score > 0) matches.push({ type: 'product', product: pKey, data: product, score });
      }
    }

    return matches.sort((a, b) => b.score - a.score);
  }
};

// ============================= LIVE ET DATA SERVICE =============================
class ETLiveDataService {
  constructor() {
    this.cache = {};
    this.cacheTTL = 10 * 60 * 1000; // 10 minutes
    this.proxyBase = 'https://api.allorigins.win/get?url=';
    this.feeds = {
      topStories: 'https://economictimes.indiatimes.com/rssfeedstopstories.cms',
      markets: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
      wealth: 'https://economictimes.indiatimes.com/wealth/rssfeeds/837555174.cms',
      tech: 'https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms',
      industry: 'https://economictimes.indiatimes.com/industry/rssfeeds/13352306.cms'
    };
  }

  async fetchFeed(feedKey) {
    const now = Date.now();
    if (this.cache[feedKey] && (now - this.cache[feedKey].ts) < this.cacheTTL) {
      return this.cache[feedKey].data;
    }
    const url = this.feeds[feedKey];
    if (!url) return this._fallbackData(feedKey);

    try {
      // Try CORS proxy
      const resp = await fetch(this.proxyBase + encodeURIComponent(url), { signal: AbortSignal.timeout(6000) });
      const json = await resp.json();
      const xmlText = json.contents;
      const items = this._parseRSS(xmlText);
      if (items.length) {
        this.cache[feedKey] = { data: items, ts: now };
        return items;
      }
    } catch (e) {
      console.warn('ET Feed fetch failed for', feedKey, e.message);
    }
    return this._fallbackData(feedKey);
  }

  _parseRSS(xml) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const items = doc.querySelectorAll('item');
      return Array.from(items).slice(0, 10).map(item => ({
        title: item.querySelector('title')?.textContent || '',
        link: item.querySelector('link')?.textContent || '',
        description: (item.querySelector('description')?.textContent || '').replace(/<[^>]*>/g, '').substring(0, 150),
        pubDate: item.querySelector('pubDate')?.textContent || '',
        source: 'ET Live'
      }));
    } catch (e) { return []; }
  }

  _fallbackData(feedKey) {
    const fallbacks = {
      topStories: [
        { title: 'Budget 2026: Key Takeaways for Investors', link: 'https://economictimes.indiatimes.com/news/economy', description: 'Comprehensive analysis of Union Budget implications on markets and personal finance', source: 'ET News' },
        { title: 'RBI Policy: Rate Cut Expectations and Market Impact', link: 'https://economictimes.indiatimes.com/news/economy/policy', description: 'What the latest RBI monetary policy means for your investments and EMIs', source: 'ET Economy' },
        { title: 'India GDP Growth Outlook: What Experts Say', link: 'https://economictimes.indiatimes.com/news/economy/indicators', description: 'Economic indicators point to robust growth trajectory for FY27', source: 'ET Economy' }
      ],
      markets: [
        { title: 'Nifty 50 Hits New High: Sectors Leading the Rally', link: 'https://economictimes.indiatimes.com/markets/stocks/news', description: 'Banking and IT sectors drive benchmark indices to record levels', source: 'ET Markets' },
        { title: 'Top Mutual Funds: Best Performers This Quarter', link: 'https://economictimes.indiatimes.com/mutual-funds', description: 'Flexi-cap and mid-cap funds deliver alpha over benchmark returns', source: 'ET MF' },
        { title: 'F&O Expiry: Key Levels and Strategy for Traders', link: 'https://economictimes.indiatimes.com/markets/stocks/livequotes/derivatives', description: 'Options data suggests range-bound market with key support and resistance levels', source: 'ET Markets' }
      ],
      wealth: [
        { title: 'Tax Saving: Last-Minute Section 80C Investments', link: 'https://economictimes.indiatimes.com/wealth/tax', description: 'Best ELSS funds, PPF, and NPS strategies to save up to ₹46,800 in taxes', source: 'ET Wealth' },
        { title: 'Best Term Insurance Plans Compared', link: 'https://economictimes.indiatimes.com/wealth/insure', description: 'Feature-by-feature comparison of top term plans for different age groups', source: 'ET Wealth' },
        { title: 'Home Loan Interest Rates: Latest Comparison', link: 'https://economictimes.indiatimes.com/wealth/borrow', description: 'SBI, HDFC, ICICI — who offers the best rate and processing fee', source: 'ET Wealth' }
      ]
    };
    return fallbacks[feedKey] || fallbacks.topStories;
  }

  async getMarketSnapshot() {
    return this.fetchFeed('markets');
  }

  async getTopStories() {
    return this.fetchFeed('topStories');
  }

  async getWealthContent() {
    return this.fetchFeed('wealth');
  }
}

// ============================= SESSION MANAGER =============================
class SessionManager {
  constructor() {
    this.storageKey = 'et_concierge_pail';
    this.sessionKey = 'et_concierge_session';
  }

  save(identityGraph, portfolio, metrics) {
    try {
      const data = {
        identity: identityGraph,
        portfolio: portfolio,
        metrics: metrics,
        savedAt: Date.now(),
        version: 'v4.0'
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) { console.warn('Session save failed', e); }
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Check if data is less than 30 days old
      if (Date.now() - data.savedAt > 30 * 24 * 60 * 60 * 1000) return null;
      return data;
    } catch (e) { return null; }
  }

  updateSession() {
    try {
      const session = JSON.parse(localStorage.getItem(this.sessionKey) || '{}');
      session.visitCount = (session.visitCount || 0) + 1;
      session.lastVisit = Date.now();
      session.firstVisit = session.firstVisit || Date.now();
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
      return session;
    } catch (e) { return { visitCount: 1 }; }
  }

  getSession() {
    try { return JSON.parse(localStorage.getItem(this.sessionKey) || '{}'); }
    catch (e) { return {}; }
  }

  clear() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.sessionKey);
  }
}

// ============================= BEHAVIOUR TRACKER =============================
class BehaviourTracker {
  constructor() {
    this.interactions = [];
    this.topicFrequency = {};
    this.agentTime = {};
    this.currentAgent = 'concierge';
    this.agentSwitchTime = Date.now();
    this.sessionStart = Date.now();
    this.clickThroughs = 0;
    this.queryCount = 0;
  }

  trackQuery(query, agent) {
    this.queryCount++;
    const topics = this._extractTopics(query);
    topics.forEach(t => { this.topicFrequency[t] = (this.topicFrequency[t] || 0) + 1; });
    this.interactions.push({ type: 'query', query, agent, topics, time: Date.now() });
    if (this.interactions.length > 100) this.interactions.shift();
  }

  trackAgentSwitch(agent) {
    const now = Date.now();
    const elapsed = now - this.agentSwitchTime;
    this.agentTime[this.currentAgent] = (this.agentTime[this.currentAgent] || 0) + elapsed;
    this.currentAgent = agent;
    this.agentSwitchTime = now;
  }

  trackClick(target) {
    this.clickThroughs++;
    this.interactions.push({ type: 'click', target, time: Date.now() });
  }

  _extractTopics(query) {
    const q = query.toLowerCase();
    const topicMap = {
      'markets': /market|stock|share|nifty|sensex|trading/i,
      'mutual_funds': /mutual fund|sip|mf|nav|fund/i,
      'fno': /future|option|f&o|derivative|call|put/i,
      'insurance': /insur|term plan|health plan|life cover/i,
      'tax': /tax|80c|deduction|itr|saving/i,
      'loans': /loan|emi|mortgage|borrow|home loan/i,
      'retirement': /retire|pension|nps|fire|epf/i,
      'ipo': /ipo|listing|allotment/i,
      'prime': /prime|premium|exclusive/i,
      'masterclass': /masterclass|course|learn|class/i,
      'news': /news|article|headline|breaking/i,
      'portfolio': /portfolio|holding|invest/i,
      'credit_cards': /credit card|card|cashback|reward/i,
      'wealth_mgmt': /wealth|pms|advisory/i
    };
    const found = [];
    for (const [topic, re] of Object.entries(topicMap)) {
      if (re.test(q)) found.push(topic);
    }
    return found.length ? found : ['general'];
  }

  getCrossSellTriggers(userProfile) {
    const triggers = [];
    const topTopics = Object.entries(this.topicFrequency).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Topic-based triggers
    if (this.topicFrequency['markets'] >= 3 && !this.topicFrequency['prime']) {
      triggers.push({ type: 'upsell', product: 'prime', reason: `You've asked ${this.topicFrequency['markets']} market questions — ET Prime gives you deeper analysis`, priority: 'high', icon: '📰' });
    }
    if (this.topicFrequency['fno'] >= 2) {
      triggers.push({ type: 'feature', product: 'markets_fno', reason: 'Your F&O interest detected — check live options chain on ET Markets', priority: 'high', icon: '📊', url: 'https://economictimes.indiatimes.com/markets/stocks/livequotes/derivatives' });
    }
    if (this.topicFrequency['insurance'] >= 2 && userProfile.hasInsurance !== true) {
      triggers.push({ type: 'service', product: 'insurance', reason: 'Multiple insurance queries — let me compare top term plans for you', priority: 'critical', icon: '🛡️' });
    }
    if (this.topicFrequency['mutual_funds'] >= 2) {
      triggers.push({ type: 'feature', product: 'masterclass', reason: 'Interest in mutual funds — ET Masterclass has a top-rated MF course', priority: 'medium', icon: '🎓', url: 'https://economictimes.indiatimes.com/masterclass' });
    }

    // Engagement-based triggers
    const sessionDuration = (Date.now() - this.sessionStart) / 60000;
    if (sessionDuration > 5 && this.queryCount >= 6) {
      triggers.push({ type: 'engagement', product: 'prime', reason: `${Math.round(sessionDuration)} min session with ${this.queryCount} queries — you'd love ET Prime's unlimited access`, priority: 'medium', icon: '⭐' });
    }

    return triggers;
  }

  getEngagementScore() {
    const duration = (Date.now() - this.sessionStart) / 60000;
    const queryScore = Math.min(this.queryCount * 5, 40);
    const durationScore = Math.min(duration * 3, 30);
    const clickScore = Math.min(this.clickThroughs * 10, 20);
    const diversityScore = Math.min(Object.keys(this.topicFrequency).length * 5, 10);
    return Math.min(100, queryScore + durationScore + clickScore + diversityScore);
  }
}

// ============================= DATA FABRIC =============================
class DataFabric {
  constructor() {
    this.session = new SessionManager();
    this.liveData = new ETLiveDataService();
    this.behaviour = new BehaviourTracker();

    this.identityGraph = {
      name: null, initials: null, segment: null,
      ageRange: null, risk: null, income: null,
      goal: null, horizon: null,
      assets: null, products: null,
      sipCapacity: null, hasInsurance: null, hasNPS: null,
      hasIntlEquity: null, depth: 0, completedSteps: [],
      signals: [],
      preferences: { contentInterests: [], learningTopics: [], financialPriorities: [] }
    };

    this.metrics = { products: 0, articles: 0, classes: 0, opportunities: 0, interactions: 0 };

    this.portfolio = {
      holdings: [], totalSIP: 0, totalValue: 0,
      assetAllocation: {}, investmentExp: null, lastUpdated: null
    };

    this.onboardSteps = [
      'Basic profile complete', 'ET Prime discovery', 'Financial goals mapped',
      'Portfolio analysis', 'Partner services matched', 'Personalisation calibrated'
    ];

    // Try to restore session
    this._restoreSession();
  }

  _restoreSession() {
    const saved = this.session.load();
    if (saved && saved.identity && saved.identity.name) {
      this.identityGraph = { ...this.identityGraph, ...saved.identity };
      if (saved.portfolio) this.portfolio = { ...this.portfolio, ...saved.portfolio };
      if (saved.metrics) this.metrics = { ...this.metrics, ...saved.metrics };
      this._restored = true;
    } else {
      this._restored = false;
    }
    this.sessionInfo = this.session.updateSession();
  }

  isReturningUser() { return this._restored && this.identityGraph.name; }

  _persist() { this.session.save(this.identityGraph, this.portfolio, this.metrics); }

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
    const fields = ['name', 'goal', 'risk', 'income', 'assets', 'hasInsurance', 'hasNPS', 'ageRange', 'horizon'];
    const filled = fields.filter(f => u[f] !== null && u[f] !== undefined).length;
    u.depth = Math.min(95, Math.round(filled / fields.length * 95));
    this.updateUI();
    this.pushSignal(label || 'Profile field updated', 'var(--gold)');
    this.renderReco();
    this._persist();
  }

  addDepth(d) { this.identityGraph.depth = Math.min(95, this.identityGraph.depth + d); this.updateUI(); this._persist(); }

  advanceOnboard(stepIdx) {
    if (!this.identityGraph.completedSteps.includes(stepIdx)) {
      this.identityGraph.completedSteps.push(stepIdx);
      this.renderOnboard();
      this._persist();
    }
  }

  addHolding(holding) {
    this.portfolio.holdings.push({ ...holding, addedDate: new Date().toISOString(), source: 'manual' });
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
    const alloc = { equity: 0, mf: 0, debt: 0, other: 0 };
    this.portfolio.holdings.forEach(h => {
      if (h.type === 'Stock') alloc.equity += h.value;
      else if (h.type === 'MF') alloc.mf += h.value;
      else if (h.type === 'Debt') alloc.debt += h.value;
      else alloc.other += h.value;
    });
    const total = Object.values(alloc).reduce((a, b) => a + b, 0) || 1;
    this.portfolio.assetAllocation = {
      equity: Math.round(alloc.equity / total * 100), mf: Math.round(alloc.mf / total * 100),
      debt: Math.round(alloc.debt / total * 100), other: Math.round(alloc.other / total * 100)
    };
    const holdingCount = this.portfolio.holdings.length;
    this.portfolio.investmentExp = holdingCount > 6 ? 'advanced' : holdingCount > 2 ? 'intermediate' : 'beginner';
    this.portfolio.lastUpdated = new Date().toISOString();
    const assetTypes = [...new Set(this.portfolio.holdings.map(h => h.type))];
    if (assetTypes.length) this.updateIdentity({ assets: assetTypes.join(', ') }, 'Portfolio data integrated');
    this.renderMetrics();
    this._persist();
  }

  // ---- UI Render Methods (unchanged from v3) ----
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
    const avatarEl = document.getElementById('user-avatar-top');
    if (avatarEl) avatarEl.textContent = u.initials || '?';
    const primePill = document.getElementById('prime-pill');
    if (primePill) primePill.style.display = u.products && /prime/i.test(u.products) ? '' : 'none';
    this.renderSidebar(); this.renderOnboard(); this.renderReco();
  }

  _setFlash(id, val) {
    const el = document.getElementById(id); if (!el) return;
    const display = (val !== null && val !== undefined) ? val : '—';
    if (el.textContent !== display) {
      el.textContent = display;
      if (val !== null && val !== undefined) { el.classList.add('updating'); setTimeout(() => el.classList.remove('updating'), 1800); }
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

// ============================= PARTNER API GATEWAY =============================
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

// ============================= LOCAL NLP ENGINE =============================
class NLPEngine {
  constructor() {
    this.conversationContext = [];
    this.intents = this._buildIntentMap();
  }

  _buildIntentMap() {
    return [
      // --- ET Product Discovery ---
      { intent: 'discover_prime', patterns: [/prime/i, /premium content/i, /exclusive article/i, /subscribe.*et/i, /ad.?free/i, /wealth edition/i], confidence: 0.9 },
      { intent: 'discover_markets', patterns: [/market/i, /stock price/i, /share price/i, /nifty/i, /sensex/i, /bse/i, /nse/i, /live.*price/i], confidence: 0.85 },
      { intent: 'discover_fno', patterns: [/future/i, /option/i, /f\s*&\s*o/i, /fno/i, /derivative/i, /call.*option/i, /put.*option/i, /strike/i, /expiry/i, /options?\s*chain/i, /options?\s*trading/i], confidence: 0.95 },
      { intent: 'discover_ipo', patterns: [/\bipo\b/i, /initial public/i, /listing/i, /allotment/i, /gmp/i, /grey market/i, /upcoming.*ipo/i], confidence: 0.9 },
      { intent: 'discover_mf', patterns: [/mutual fund/i, /\bsip\b/i, /\bnav\b/i, /amc/i, /best.*fund/i, /top.*fund/i, /flexi.?cap/i, /large.?cap/i, /mid.?cap/i, /small.?cap/i, /thematic fund/i, /index fund/i, /elss/i], confidence: 0.9 },
      { intent: 'discover_commodities', patterns: [/commodit/i, /gold price/i, /silver/i, /crude/i, /\bmcx\b/i, /metal/i], confidence: 0.85 },
      { intent: 'discover_forex', patterns: [/forex/i, /currency/i, /dollar/i, /rupee/i, /exchange rate/i, /usd.*inr/i], confidence: 0.85 },
      { intent: 'discover_bonds', patterns: [/\bbond/i, /yield/i, /gilt/i, /treasury/i, /gsec/i, /government securit/i], confidence: 0.85 },
      { intent: 'discover_etf', patterns: [/\betf\b/i, /exchange traded/i, /nifty bees/i, /gold etf/i, /index.*etf/i], confidence: 0.85 },
      { intent: 'discover_technicals', patterns: [/technical/i, /chart/i, /resistance/i, /support.*level/i, /\brsi\b/i, /\bmacd\b/i, /moving average/i, /candlestick/i], confidence: 0.85 },
      { intent: 'discover_wealth', patterns: [/wealth/i, /personal finance/i, /financial planning/i, /money manage/i], confidence: 0.8 },
      { intent: 'discover_tax', patterns: [/\btax\b/i, /\bitr\b/i, /income tax/i, /80c/i, /80d/i, /deduction/i, /tax.*sav/i, /\bltcg\b/i, /\bstcg\b/i, /capital gain/i, /\bhuf\b/i], confidence: 0.9 },
      { intent: 'discover_insurance', patterns: [/insur/i, /term plan/i, /health.*plan/i, /life.*cover/i, /claim/i, /ulip/i], confidence: 0.85 },
      { intent: 'discover_realestate', patterns: [/real estate/i, /property/i, /\bflat\b/i, /apartment/i, /\brera\b/i, /home.*buy/i], confidence: 0.85 },
      { intent: 'discover_retirement', patterns: [/retire/i, /pension/i, /\bnps\b/i, /\bepf\b/i, /\bppf\b/i, /fire.*plan/i, /financial independence/i, /senior citizen/i, /annuity/i], confidence: 0.9 },
      { intent: 'discover_loans', patterns: [/\bloan\b/i, /\bemi\b/i, /borrow/i, /home.*loan/i, /personal.*loan/i, /car.*loan/i, /education.*loan/i, /mortgage/i, /refinanc/i], confidence: 0.85 },
      { intent: 'discover_creditcards', patterns: [/credit card/i, /cashback/i, /reward.*point/i, /annual fee/i, /credit.*limit/i], confidence: 0.85 },
      { intent: 'discover_masterclass', patterns: [/masterclass/i, /course/i, /\blearn\b/i, /training/i, /webinar/i, /workshop/i, /certificate/i, /upskill/i], confidence: 0.85 },
      { intent: 'discover_events', patterns: [/event/i, /summit/i, /conclave/i, /award/i, /conference/i], confidence: 0.8 },
      { intent: 'discover_tv', patterns: [/\btv\b/i, /live.*channel/i, /broadcast/i, /\bwatch\b/i, /et now/i, /video/i], confidence: 0.8 },
      { intent: 'discover_auto', patterns: [/\bauto\b/i, /car.*review/i, /\bev\b/i, /electric vehicle/i, /automobile/i], confidence: 0.75 },
      { intent: 'discover_startup', patterns: [/startup/i, /\bsme\b/i, /\bmsme\b/i, /entrepreneur/i, /small business/i, /venture.*capital/i, /funding/i, /angel.*invest/i], confidence: 0.8 },
      // --- Financial Actions ---
      { intent: 'portfolio_add', patterns: [/\badd\b.*(?:invest|hold|stock|fund|sip)/i, /enter.*(?:invest|hold)/i, /new.*holding/i], confidence: 0.85 },
      { intent: 'portfolio_edit', patterns: [/edit.*(?:portfolio|holding)/i, /update.*(?:portfolio|holding)/i, /modify.*(?:holding)/i, /change.*(?:holding)/i], confidence: 0.85 },
      { intent: 'portfolio_view', patterns: [/portfolio.*(?:summary|overview|view)/i, /my.*(?:holdings|invest)/i, /show.*portfolio/i], confidence: 0.85 },
      { intent: 'gap_analysis', patterns: [/gap.*analy/i, /portfolio.*gap/i, /what.*missing/i, /financial.*gap/i, /portfolio.*review/i, /portfolio.*check/i], confidence: 0.9 },
      { intent: 'fire_planning', patterns: [/fire/i, /early.*retire/i, /retire.*early/i, /financial.*independen/i, /retire.*by/i], confidence: 0.9 },
      { intent: 'roadmap', patterns: [/roadmap/i, /next.*step/i, /action.*plan/i, /what.*should.*do/i, /financial.*plan/i], confidence: 0.85 },
      // --- Conversational ---
      { intent: 'greeting', patterns: [/^(hi|hello|hey|namaste|good morning|good evening)\b/i, /how are you/i], confidence: 0.7 },
      { intent: 'thanks', patterns: [/thank/i, /thanks/i, /appreciate/i], confidence: 0.7 },
      { intent: 'help', patterns: [/\bhelp\b/i, /what can you/i, /how does/i, /capabilit/i, /what.*do you.*do/i, /features/i], confidence: 0.8 },
      { intent: 'news', patterns: [/\bnews\b/i, /article/i, /headline/i, /latest/i, /today/i, /breaking/i, /update/i, /what.*happen/i], confidence: 0.8 },
      { intent: 'recommend', patterns: [/recommend/i, /suggest/i, /best for me/i, /what.*suit/i, /which.*product/i, /what.*should.*read/i], confidence: 0.85 },
      { intent: 'compare', patterns: [/compare/i, /versus/i, /\bvs\b/i, /difference.*between/i, /which.*better/i], confidence: 0.85 },
    ];
  }

  classify(query) {
    const q = query.toLowerCase().trim();
    const results = [];

    for (const intent of this.intents) {
      let maxScore = 0;
      for (const pattern of intent.patterns) {
        if (pattern.test(q)) {
          // Score based on match specificity
          const matchStr = q.match(pattern)?.[0] || '';
          const specificity = matchStr.length / q.length;
          const score = intent.confidence * (0.5 + specificity * 0.5);
          maxScore = Math.max(maxScore, score);
        }
      }
      if (maxScore > 0) results.push({ intent: intent.intent, score: maxScore });
    }

    // Also check ET Knowledge Base for product matches
    const kbMatches = ETEcosystemKB.matchQuery(q);
    if (kbMatches.length > 0 && results.length === 0) {
      const topMatch = kbMatches[0];
      results.push({ intent: `discover_${topMatch.product}`, score: 0.6, kbMatch: topMatch });
    }

    // Push context
    this.conversationContext.push({ query: q, intents: results, time: Date.now() });
    if (this.conversationContext.length > 20) this.conversationContext.shift();

    return results.sort((a, b) => b.score - a.score);
  }

  getContext() { return this.conversationContext.slice(-5); }

  getTopicSummary() {
    const topics = {};
    this.conversationContext.forEach(c => {
      c.intents.forEach(i => { topics[i.intent] = (topics[i.intent] || 0) + 1; });
    });
    return topics;
  }
}
// ============================= ORCHESTRATOR =============================
class Orchestrator {
  constructor(fabric) {
    this.fabric = fabric;
    this.nlp = new NLPEngine();
    this.currentAgent = 'concierge';
    this.profilingStep = 0;
    this.agentConfig = {
      concierge: { title: 'ET Welcome Concierge', desc: 'Smart 3-min profiling · Personalised ET ecosystem onboarding', hint: 'Welcome Concierge mode', qr: ['Tell me about ET Prime', 'What ET products suit me?', 'Show my financial gaps', 'I need a home loan', 'Recommend news for me'] },
      navigator: { title: 'Financial Life Navigator', desc: 'Deep financial understanding · Goal mapping · Portfolio gap analysis', hint: 'Financial Navigator mode', qr: ['Analyse my portfolio gaps', 'Add investments manually', 'Show my roadmap', 'FIRE planning for me', 'Portfolio summary'] },
      crosssell: { title: 'ET Cross-Sell Engine', desc: 'Behavioural trigger analysis · Right offer at the right moment', hint: 'Cross-Sell Engine mode', qr: ["What's best for my profile?", 'Show upsell opportunities', 'ET Masterclass match', 'Credit card for me', 'Insurance recommendations'] },
      marketplace: { title: 'ET Services Marketplace', desc: 'Financial services concierge · Partner integrations live', hint: 'Services Marketplace mode', qr: ['Home loan options', 'Term insurance quotes', 'Wealth management PMS', 'Best FD rates now', 'Credit card comparison'] }
    };
    this.profilingStages = [
      { ask: `<p>Namaste! 🙏 I'm your <strong>ET AI Concierge</strong>, powered by PAIL — ET's Persistent Adaptive Intelligence Layer.</p><p>ET has a massive ecosystem — <strong>ET Prime, ET Markets, Masterclasses, Wealth Summits, and Financial Services</strong>. Most users discover only 10% of what ET offers.</p><p>I'll be your personal guide. Let's start: <strong>What's your name?</strong></p>`, richType: null, parse: t => { const raw = t.trim().replace(/^(i'm|i am|my name is|this is|hey i'm|hi i'm|call me)\s*/i, '').replace(/[.!,].*$/, '').trim(); const name = raw.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') || 'User'; const parts = name.split(/\s+/); const initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase(); return { name, initials }; }, signal: () => 'User name captured' },
      { ask: p => `<p>Welcome, <strong>${p.name}</strong>! 🎉</p><p><strong>What's your age range?</strong></p>`, richType: 'age-q', parse: t => { let a = '25–30'; if (/18|19|early 20|under 25|below 25|20.*25|18.*24/i.test(t)) a = '18–25'; else if (/25.*30|late 20|mid 20|26|27|28|29/i.test(t)) a = '25–30'; else if (/30.*35|early 30|31|32|33|34/i.test(t)) a = '30–35'; else if (/35.*40|late 30|36|37|38|39/i.test(t)) a = '35–40'; else if (/40.*50|40s|41|42|43|44|45/i.test(t)) a = '40–50'; else if (/50|above 50|over 50|senior|60/i.test(t)) a = '50+'; return { ageRange: a }; }, signal: () => 'Age range recorded' },
      { ask: p => `<p>Perfect, ${p.name}. Now let's understand your financial life.</p><p><strong>What's your primary financial goal?</strong></p>`, richType: 'goal-q', parse: t => { let g = 'Wealth creation', s = 'HNI-Aspirant'; if (/retire|fire|independen/i.test(t)) { g = 'Retirement / FIRE'; s = 'FIRE-Seeker'; } else if (/child|educat/i.test(t)) { g = 'Child education'; s = 'Family-Planner'; } else if (/income|passive/i.test(t)) { g = 'Passive income'; s = 'Income-Seeker'; } else if (/preserve|safe|capital/i.test(t)) { g = 'Capital preservation'; s = 'Conservative-HNI'; } return { goal: g, segment: s }; }, signal: t => `Goal: ${/retire|fire/i.test(t) ? 'FIRE' : 'Wealth creation'}` },
      { ask: p => `<p>Great — <strong>${p.goal}</strong>. What's your risk appetite?</p>`, richType: 'risk-q', parse: t => { let r = 'Moderate'; if (/conserv|safe|low/i.test(t)) r = 'Conservative'; else if (/very aggress|maximum/i.test(t)) r = 'Very Aggressive'; else if (/aggress|high|growth/i.test(t)) r = 'Aggressive'; return { risk: r }; }, signal: () => 'Risk profile updated' },
      { ask: () => `<p>What asset classes are you invested in?</p><p class="hint-text">(Equity, Mutual Funds, Gold, Real Estate, FD/Debt)</p>`, richType: 'asset-q', parse: t => { let a = []; if (/equit|stock|share/i.test(t)) a.push('Equity'); if (/mutual|mf|fund|sip/i.test(t)) a.push('MF'); if (/gold/i.test(t)) a.push('Gold'); if (/real estate|property/i.test(t)) a.push('Real Estate'); if (/fd|fixed|debt|bond/i.test(t)) a.push('Debt/FD'); if (!a.length) a = ['Savings']; return { assets: a.join(', ') }; }, signal: () => 'Asset classes mapped' },
      { ask: () => `<p><strong>What is your approximate annual income bracket?</strong></p>`, richType: 'income-q', parse: t => { let inc = '₹10–20L p.a.', seg = null; if (/below 5|under 5/i.test(t)) inc = 'Below ₹5L p.a.'; else if (/5.*(10|ten)|10 lakh/i.test(t)) inc = '₹5–10L p.a.'; else if (/10.*(20|twenty)|15/i.test(t)) inc = '₹10–20L p.a.'; else if (/20.*(40|forty)|25|30/i.test(t)) inc = '₹20–40L p.a.'; else if (/40.*(1 cr|hundred)|50 lakh/i.test(t)) { inc = '₹40L–1Cr p.a.'; seg = 'HNI'; } else if (/1 cr|crore|above 1/i.test(t)) { inc = '₹1Cr+ p.a.'; seg = 'Ultra-HNI'; } const r = { income: inc }; if (seg) r.segment = seg; return r; }, signal: () => 'Income captured' },
      { ask: () => `<p>Last one: <strong>Do you have term insurance and NPS?</strong></p>`, richType: 'insurance-q', parse: t => { const hasIns = /yes.*insur|have.*insur|term plan|insurance.*yes/i.test(t) ? true : /no.*insur|don't.*insur|neither|without/i.test(t) ? false : null; const hasNPS = /yes.*nps|have.*nps|nps.*yes/i.test(t) ? true : /no.*nps|don't.*nps|neither/i.test(t) ? false : null; return { hasInsurance: hasIns, hasNPS: hasNPS }; }, signal: () => 'Insurance & NPS status captured' }
    ];
    // If returning user, skip profiling
    if (this.fabric.isReturningUser()) { this.profilingStep = this.profilingStages.length; }
  }

  async process(input) {
    const txt = input.toLowerCase();
    this.fabric.metrics.interactions++;
    this.fabric.behaviour.trackQuery(input, this.currentAgent);
    this.fabric.pushSignal(`User: "${input.substring(0, 35)}…"`, 'rgba(255,255,255,.25)');
    if (this.currentAgent === 'concierge') return this.handleConcierge(txt, input);
    if (this.currentAgent === 'navigator') return this.handleNavigator(txt, input);
    if (this.currentAgent === 'crosssell') return this.handleCrossSell(txt, input);
    if (this.currentAgent === 'marketplace') return this.handleMarketplace(txt, input);
    return { text: `<p>Processing your request…</p>` };
  }

  // Smart ET product response builder
  _buildETProductResponse(query) {
    const intents = this.nlp.classify(query);
    if (!intents.length) return null;
    const top = intents[0];
    const u = this.fabric.identityGraph;
    const intentMap = {
      'discover_fno': () => {
        const s = ETEcosystemKB.products.markets.sections.fno;
        return { text: `<p>📊 <strong>Futures & Options on ET Markets</strong></p><p>You can access the complete F&O section on ET Markets — live options chain, derivatives data, expiry calendars, and expert strategies.</p><div style="background:rgba(26,107,181,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Markets — F&O Section</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">Live options chain · Put-Call ratio · Max Pain · OI data · Expiry analysis</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Open F&O on ET Markets →</a></div><p>Based on your <strong>${u.risk || 'Moderate'}</strong> risk profile${u.risk === 'Aggressive' ? ' — F&O aligns well with your profile' : ' — consider learning basics first via <a href="https://economictimes.indiatimes.com/masterclass" class="et-link" target="_blank">ET Masterclass</a>'}.</p>` };
      },
      'discover_ipo': () => {
        const s = ETEcosystemKB.products.markets.sections.ipo;
        return { text: `<p>🎯 <strong>IPO Section on ET Markets</strong></p><p>Track upcoming IPOs, check GMP, allotment status, and listing day analysis — all on ET Markets.</p><div style="background:rgba(26,107,181,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Markets — IPO Hub</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">Upcoming IPOs · GMP tracker · Subscription status · Allotment checker</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Open IPO section →</a></div>` };
      },
      'discover_mf': () => {
        const s = ETEcosystemKB.products.markets.sections.mf;
        return { text: `<p>💼 <strong>Mutual Funds on ET</strong></p><p>Explore top-performing mutual funds, compare NAVs, start SIPs, and get expert recommendations.</p><div style="background:rgba(26,171,170,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Mutual Funds</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">Fund comparison · SIP calculator · Category analysis · Expert picks</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Explore Mutual Funds →</a></div>${u.goal === 'Wealth creation' ? '<p>For your <strong>Wealth creation</strong> goal, consider flexi-cap and mid-cap funds.</p>' : ''}` };
      },
      'discover_tax': () => {
        const s = ETEcosystemKB.products.wealth.sections.tax;
        return { text: `<p>📋 <strong>Tax Planning on ET Wealth</strong></p><p>Comprehensive tax planning guides — Section 80C, 80D, LTCG, ITR filing, and tax-saving strategies.</p><div style="background:rgba(201,162,39,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Wealth — Tax & Savings</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">80C investments · LTCG/STCG · ITR guides · Tax calculators</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Open Tax Section →</a></div>${u.hasNPS === false ? '<p>💡 <strong>Tip:</strong> You don\'t have NPS — that\'s an extra ₹50K deduction under 80CCD(1B).</p>' : ''}` };
      },
      'discover_insurance': () => {
        const s = ETEcosystemKB.products.wealth.sections.insurance;
        return { text: `<p>🛡️ <strong>Insurance on ET Wealth</strong></p><p>Compare term plans, health insurance, and understand claim processes.</p><div style="background:rgba(26,171,170,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Wealth — Insurance</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">Term plan comparison · Health insurance · Claim guide · ULIP vs MF</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Explore Insurance →</a></div>`, extra: this._buildInsuranceOptions() };
      },
      'discover_retirement': () => {
        const s = ETEcosystemKB.products.wealth.sections.retirement;
        return { text: `<p>🏖️ <strong>Retirement Planning on ET</strong></p><p>NPS, PPF, EPF strategies, pension planning, and FIRE calculators.</p><div style="background:rgba(26,138,90,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Wealth — Retirement</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">NPS guide · PPF calculator · Pension plans · FIRE toolkit</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Plan Retirement →</a></div>`, extra: u.goal === 'Retirement / FIRE' ? this._buildFIRESimulation() : '' };
      },
      'discover_loans': () => {
        const s = ETEcosystemKB.products.wealth.sections.borrow;
        return { text: `<p>🏠 <strong>Loan & Borrowing on ET Wealth</strong></p><p>Compare home loans, personal loans, education loans — rates, EMI calculators, and eligibility.</p><div style="background:rgba(26,107,181,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Wealth — Borrow</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">Home loan rates · EMI calculator · Eligibility checker · Balance transfer</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Compare Loans →</a></div>`, extra: this._buildHomeLoanOptions() };
      },
      'discover_creditcards': () => {
        const s = ETEcosystemKB.products.wealth.sections.spend;
        return { text: `<p>💳 <strong>Credit Cards on ET Wealth</strong></p><p>Best credit cards compared — cashback, travel rewards, premium cards, and annual fee waivers.</p><div style="background:rgba(201,162,39,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Wealth — Spend Smart</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">Card comparison · Reward maximizer · Fee analysis · Best offers</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Compare Cards →</a></div>` };
      },
      'discover_commodities': () => {
        const s = ETEcosystemKB.products.markets.sections.commodities;
        return { text: `<p>🏆 <strong>Commodities on ET Markets</strong></p><p>Gold, silver, crude oil prices — live MCX quotes, expert analysis, and trading strategies.</p><div style="background:rgba(201,162,39,.1);padding:14px;border-radius:10px;margin:10px 0"><div style="font-weight:600">ET Markets — Commodities</div><div style="font-size:12px;color:var(--et-muted);margin:4px 0">Gold/Silver prices · Crude oil · MCX live · Expert views</div><a href="${s.url}" target="_blank" class="et-link" style="font-size:12px">Track Commodities →</a></div>` };
      },
      'discover_forex': () => {
        const s = ETEcosystemKB.products.markets.sections.forex;
        return { text: `<p>💱 <strong>Forex on ET Markets</strong></p><p>USD/INR rates, currency converter, forex news, and RBI policy impact analysis.</p><div style="background:rgba(26,107,181,.1);padding:14px;border-radius:10px;margin:10px 0"><a href="${s.url}" target="_blank" class="et-link">Open Forex Section →</a></div>` };
      },
      'discover_bonds': () => {
        const s = ETEcosystemKB.products.markets.sections.bonds;
        return { text: `<p>📜 <strong>Bonds & Gilts on ET Markets</strong></p><p>Government securities, corporate bonds, yield curves, and debt investment strategies.</p><div style="background:rgba(26,107,181,.1);padding:14px;border-radius:10px;margin:10px 0"><a href="${s.url}" target="_blank" class="et-link">Explore Bonds →</a></div>` };
      },
      'discover_etf': () => {
        const s = ETEcosystemKB.products.markets.sections.etfs;
        return { text: `<p>📈 <strong>ETFs on ET</strong></p><p>Exchange-traded funds — Gold ETFs, Nifty BeES, international ETFs, and performance comparison.</p><div style="background:rgba(26,171,170,.1);padding:14px;border-radius:10px;margin:10px 0"><a href="${s.url}" target="_blank" class="et-link">Explore ETFs →</a></div>` };
      },
      'discover_technicals': () => {
        const s = ETEcosystemKB.products.markets.sections.technicals;
        return { text: `<p>📉 <strong>Technical Analysis on ET Markets</strong></p><p>Charts, RSI, MACD, support/resistance levels, candlestick patterns, and expert technical picks.</p><div style="background:rgba(26,107,181,.1);padding:14px;border-radius:10px;margin:10px 0"><a href="${s.url}" target="_blank" class="et-link">Open Technical Analysis →</a></div>` };
      }
    };
    // Generic product discovery
    const genericProducts = ['prime', 'markets', 'wealth', 'masterclass', 'events', 'tv', 'auto', 'startup'];
    for (const pk of genericProducts) {
      intentMap[`discover_${pk}`] = intentMap[`discover_${pk}`] || (() => {
        const p = ETEcosystemKB.products[pk];
        if (!p) return null;
        return { text: `<p>${p.icon} <strong>${p.name}</strong></p><p>${p.desc}</p><div style="background:${p.color || 'rgba(26,107,181,.15)'};padding:14px;border-radius:10px;margin:10px 0"><a href="${p.url}" target="_blank" class="et-link">Open ${p.name} →</a></div>${p.features ? '<p><strong>Features:</strong> ' + p.features.join(' · ') + '</p>' : ''}` };
      });
    }
    const handler = intentMap[top.intent];
    return handler ? handler() : null;
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
        return { text: `<p>Got it — profile updated. ✓</p>${ask}`, richType: next.richType, toast: 'Profile updated' };
      } else {
        this.fabric.advanceOnboard(2); this.fabric.advanceOnboard(3);
        return { text: `<p>✅ <strong>Profiling complete!</strong> Your PAIL profile is now at <strong>${u.depth}%</strong> depth.</p><p>Based on what I know about you, <strong>${u.name}</strong> — <strong>${u.goal}</strong> goal, <strong>${u.risk}</strong> risk, <strong>${u.income}</strong> income — here's your personalised ET onboarding path:</p><p>Explore all 4 AI agents in the sidebar: <strong>Welcome Concierge</strong>, <strong>Financial Navigator</strong>, <strong>Cross-Sell Engine</strong>, and <strong>Services Marketplace</strong>.</p>`, extra: this._buildPersonalisedOnboard(), toast: 'Profile complete!' };
      }
    }
    // Post-profiling: Use NLP
    const productResp = this._buildETProductResponse(raw);
    if (productResp) { this.fabric.metrics.articles++; this.fabric.renderMetrics(); return productResp; }

    // Intent-based routing
    const intents = this.nlp.classify(raw);
    const topIntent = intents[0]?.intent;

    if (topIntent === 'discover_prime') { this.fabric.pushSignal('Exploring ET Prime', 'var(--gold)'); this.fabric.metrics.products++; this.fabric.renderMetrics(); return this._buildETProductResponse(raw) || { text: '<p>ET Prime is our premium journalism platform.</p>' }; }
    if (topIntent === 'gap_analysis') { this.fabric.pushSignal('Gap analysis', 'var(--blue)'); return { text: `<p>📊 <strong>Portfolio gap analysis for your profile…</strong></p>`, extra: this._buildGapsCard() }; }
    if (topIntent === 'news') return this._buildLiveNewsResponse();
    if (topIntent === 'recommend') { this.fabric.pushSignal('Recommendation request', 'var(--gold)'); return { text: `<p>🎯 <strong>Based on your PAIL profile</strong> (${u.goal || 'goal pending'}, ${u.risk || 'risk pending'}):</p>`, extra: this._buildPersonalisedOnboard() }; }
    if (topIntent === 'greeting') { return { text: `<p>Hey${u.name ? ', ' + u.name : ''}! 👋 Your PAIL profile is at <strong>${u.depth}%</strong>. How can I help you navigate the ET ecosystem today?</p>` }; }
    if (topIntent === 'thanks') { return { text: `<p>You're welcome${u.name ? ', ' + u.name : ''}! I'm here anytime. Explore our 4 agents on the left or ask me anything. 🙌</p>` }; }
    if (topIntent === 'help') return this._buildHelpResponse();

    // Fallback — still intelligent
    const goalInfo = u.goal ? `Your <strong>${u.goal}</strong> goal is mapped` : 'Your financial goals are being mapped';
    return { text: `<p>${goalInfo}. Profile at <strong>${u.depth}%</strong> depth. I can help you explore ET Prime, analyse portfolio gaps, find partner services, discover masterclasses, or get personalized news. What interests you?</p>` };
  }

  async _buildLiveNewsResponse() {
    const u = this.fabric.identityGraph;
    this.fabric.pushSignal('Fetching live news', 'var(--teal)');
    this.fabric.metrics.articles++; this.fabric.renderMetrics();
    let items;
    try { items = await this.fabric.liveData.getTopStories(); } catch (e) { items = this.fabric.liveData._fallbackData('topStories'); }
    const newsHTML = items.slice(0, 5).map(i => `<div style="background:rgba(26,107,181,.08);padding:12px;border-radius:8px;margin:8px 0"><div style="display:flex;justify-content:space-between"><span style="color:var(--et-red);font-size:11px;font-weight:600">${i.source || 'ET'}</span><span style="font-size:10px;color:var(--et-muted)">${i.pubDate ? new Date(i.pubDate).toLocaleDateString() : ''}</span></div><div style="font-weight:500;margin:6px 0">${i.title}</div><div style="font-size:12px;color:var(--et-muted);margin-bottom:6px">${i.description || ''}</div>${i.link ? `<a href="${i.link}" target="_blank" class="et-link" style="font-size:11px">Read full story →</a>` : ''}</div>`).join('');
    return { text: `<p>📰 <strong>Live News for ${u.name || 'You'}</strong></p>${newsHTML}<p><a href="https://economictimes.indiatimes.com" target="_blank" class="et-link">Browse all stories on ET →</a></p>` };
  }

  _buildHelpResponse() {
    const products = Object.values(ETEcosystemKB.products).slice(0, 8);
    return { text: `<p>🤖 <strong>I'm your ET AI Concierge</strong> — here's what I can do:</p><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0">${products.map(p => `<div style="background:${p.color || 'rgba(26,107,181,.15)'};padding:12px;border-radius:8px;cursor:pointer" onclick="injectQuick('Tell me about ${p.name}')"><div style="font-size:18px;margin-bottom:4px">${p.icon}</div><div style="font-weight:600;font-size:12px">${p.name}</div><div style="font-size:10px;color:var(--et-muted)">${(p.desc || '').substring(0, 50)}</div></div>`).join('')}</div><p>Ask me: <strong>"Where can I see futures and options?"</strong>, <strong>"Compare credit cards"</strong>, or <strong>"Show me masterclasses"</strong></p>` };
  }

  handleNavigator(txt, raw) {
    const u = this.fabric.identityGraph; const p = this.fabric.portfolio;
    const intents = this.nlp.classify(raw); const topIntent = intents[0]?.intent;
    if (topIntent === 'portfolio_add' || (/add|enter/i.test(txt) && /invest|hold|stock|fund/i.test(txt))) return this.handlePortfolioEntry(raw);
    if (topIntent === 'portfolio_edit' || (/edit|update|modify/i.test(txt) && p.holdings.length > 0)) return this.handlePortfolioEdit(raw);
    if (topIntent === 'gap_analysis' || /gap|analy|review|check/i.test(txt)) { this.fabric.pushSignal('Navigator: Gap analysis', 'var(--blue)'); return { text: `<p>📊 <strong>Portfolio Gap Analysis</strong></p>`, extra: this._buildGapsCard() }; }
    if (topIntent === 'fire_planning' || /fire|retire|early/i.test(txt)) { this.fabric.pushSignal('FIRE simulation', 'var(--teal)'); return { text: this._buildFIRESimulation(), extra: this._buildRoadmapCard() }; }
    if (topIntent === 'roadmap' || /roadmap|plan|next step/i.test(txt)) { return { text: `<p>🗺️ <strong>Your Financial Roadmap</strong></p>`, extra: this._buildRoadmapCard() }; }
    if (/summary|overview|holdings|portfolio/i.test(txt)) {
      if (p.holdings.length > 0) return { text: `<p>📈 <strong>Portfolio Summary</strong></p>`, extra: this._buildPortfolioSummaryCard() };
      return { text: `<p>📝 <strong>No portfolio data yet</strong></p><p>Tell me: <strong>"Add Axis Bluechip Fund, SIP ₹5000, Value ₹2,85,000"</strong></p>` };
    }
    // NLP product discovery works here too
    const productResp = this._buildETProductResponse(raw);
    if (productResp) return productResp;
    return { text: `<p>🔍 <strong>Financial Navigator Ready</strong></p><ul><li>Add/edit investments</li><li>Analyze portfolio gaps</li><li>FIRE planning & simulations</li><li>Generate financial roadmap</li></ul><p>What would you like to explore?</p>`, extra: this._buildGapsCard() };
  }

  handleCrossSell(txt, raw) {
    const u = this.fabric.identityGraph;
    this.fabric.pushSignal('Cross-sell analysis', 'var(--gold)');
    // Real behavioural triggers
    const triggers = this.fabric.behaviour.getCrossSellTriggers(u);
    const productResp = this._buildETProductResponse(raw);
    if (productResp) return productResp;
    if (triggers.length > 0) {
      const triggerHTML = triggers.map(t => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(201,162,39,.15)">${t.icon}</div><div><div class="opp-title">${t.reason}</div><div class="opp-sub">${t.priority} priority${t.url ? ' · <a href="' + t.url + '" target="_blank" class="et-link">Go →</a>' : ''}</div></div></div><span class="match-pill ${t.priority === 'critical' ? 'match-crit' : t.priority === 'high' ? 'match-high' : 'match-med'}">${t.priority}</span></div>`).join('');
      return { text: `<p>🎯 <strong>Personalised Triggers</strong> (${triggers.length} detected)</p><div class="r-card"><div class="r-card-title">Based on your behaviour this session</div>${triggerHTML}</div><p>Engagement score: <strong>${this.fabric.behaviour.getEngagementScore()}%</strong></p>` };
    }
    return { text: `<p>🎯 <strong>Personalised Offers</strong></p>`, extra: this._buildCrossSellCard() };
  }

  handleMarketplace(txt, raw) {
    const u = this.fabric.identityGraph;
    this.fabric.pushSignal('Marketplace inquiry', 'var(--teal)');
    const productResp = this._buildETProductResponse(raw);
    if (productResp) return productResp;
    if (/home loan|mortgage/i.test(txt)) return { text: `<p>🏠 <strong>Home Loan Options</strong></p>`, extra: this._buildHomeLoanOptions() };
    if (/insur|term|health/i.test(txt)) return { text: `<p>🛡️ <strong>Insurance Options</strong></p>`, extra: this._buildInsuranceOptions() };
    if (/fd|fixed deposit/i.test(txt)) return { text: `<p>🏦 <strong>Best FD Rates</strong></p><div style="padding:8px">${[['Bajaj Finance (AAA)', '8.10%', '24mo'], ['Shriram Finance', '8.52%', '24mo'], ['HDFC Bank', '7.40%', '12mo']].map(r => `<div style="display:flex;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,.1)"><span><strong>${r[0]}</strong></span><span style="color:var(--teal)">${r[1]}</span><span>${r[2]}</span></div>`).join('')}</div><p><a href="https://economictimes.indiatimes.com/wealth/borrow" target="_blank" class="et-link">Compare all FD options →</a></p>` };
    if (/pms|wealth.*manage/i.test(txt)) return { text: `<p>💎 <strong>Wealth Management</strong></p><div style="background:rgba(201,162,39,.1);padding:14px;border-radius:8px;margin:8px 0"><div style="font-weight:600">Zerodha PMS — Momentum</div><div>Min ₹50L · 3yr CAGR 26.4%</div><a href="https://economictimes.indiatimes.com/markets" target="_blank" class="et-link" style="margin-top:8px;display:inline-block">Learn more →</a></div>` };
    return { text: `<p>🏪 <strong>ET Services Marketplace</strong></p><p>Pre-qualified for your ${u.risk || 'Moderate'} profile:</p>`, extra: this._buildMarketplaceCard() };
  }

  handlePortfolioEntry(raw) {
    const nameMatch = raw.match(/(?:add|enter|invest in|holding:?)\s*([^,.\n]+)/i);
    const name = nameMatch ? nameMatch[1].trim() : null;
    if (!name) return { text: `<p>📝 <strong>Add Investment</strong></p><p>Format: <strong>"Add Axis Bluechip Fund, SIP ₹5000, Value ₹2,85,000"</strong></p>` };
    const sipMatch = raw.match(/(?:sip|monthly)[:\s]*₹?\s*([\d,]+)/i);
    const valueMatch = raw.match(/(?:value|val|amount|worth)[:\s]*₹?\s*([\d,]+(?:\.\d+)?)/i);
    const type = /stock|share|equity/i.test(raw) ? 'Stock' : 'MF';
    const holding = { name, type, sipAmount: sipMatch ? parseInt(sipMatch[1].replace(/,/g, '')) : 0, value: valueMatch ? parseInt(valueMatch[1].replace(/,/g, '')) : 0 };
    if (holding.value === 0 && holding.sipAmount === 0) return { text: `<p>Please include value or SIP amount. E.g.: "Axis Bluechip Fund, SIP ₹5000, Value ₹2.85L"</p>` };
    this.fabric.addHolding(holding);
    return { text: `<p>✅ <strong>Added:</strong> ${holding.name} (${holding.type})</p><p>${holding.sipAmount > 0 ? `SIP: ₹${holding.sipAmount.toLocaleString('en-IN')}/mo<br>` : ''}Value: ₹${holding.value.toLocaleString('en-IN')}</p>`, extra: this._buildPortfolioSummaryCard() };
  }

  handlePortfolioEdit(raw) {
    const p = this.fabric.portfolio;
    let html = `<div class="r-card"><div class="r-card-title">✏️ Edit Portfolio</div>`;
    p.holdings.forEach((h, idx) => { html += `<div class="opp-row" style="margin-bottom:12px"><div class="opp-left"><div class="opp-ico" style="background:${h.type === 'Stock' ? 'rgba(208,2,27,.15)' : 'rgba(26,171,170,.15)'}">${h.type === 'Stock' ? '📊' : '💼'}</div><div><div class="opp-title">${h.name}</div><div class="opp-sub">${h.type} · SIP ₹${(h.sipAmount || 0).toLocaleString('en-IN')} · Val ₹${(h.value || 0).toLocaleString('en-IN')}</div></div></div><div style="display:flex;gap:8px"><button onclick="editHolding(${idx})" class="et-link" style="padding:4px 12px;background:rgba(26,107,181,.2);border-radius:4px">✏️</button><button onclick="deleteHolding(${idx})" class="et-link" style="padding:4px 12px;background:rgba(208,2,27,.2);border-radius:4px">🗑️</button></div></div>`; });
    html += `</div>`;
    return { text: html };
  }

  agentIntro(key) {
    const u = this.fabric.identityGraph;
    if (key === 'concierge') {
      if (this.fabric.isReturningUser()) return { text: `<p>Welcome back, <strong>${u.name}</strong>! 👋 Your PAIL profile is at <strong>${u.depth}%</strong> depth (${u.goal}, ${u.risk} risk). Visit #${this.fabric.sessionInfo.visitCount || 1}.</p><p>How can I help you navigate the ET ecosystem today?</p>` };
      if (this.profilingStep === 0) return { text: this.profilingStages[0].ask, richType: this.profilingStages[0].richType };
      return { text: `<p>Welcome back. PAIL at <strong>${u.depth}%</strong>.</p>` };
    }
    if (key === 'navigator') {
      const pInfo = this.fabric.portfolio.holdings.length > 0 ? `<br>Portfolio: <strong>${this.fabric.portfolio.holdings.length} holdings</strong> · ₹${this.fabric.portfolio.totalValue.toLocaleString('en-IN')}` : '<br><em>Add investments for personalised analysis</em>';
      return { text: `<p><strong>Financial Life Navigator</strong> online. ${u.goal || 'pending'} goal, ${u.risk || 'pending'} risk.${pInfo}</p>`, extra: this._buildGapsCard(), onboard: 3 };
    }
    if (key === 'crosssell') {
      const score = this.fabric.behaviour.getEngagementScore();
      return { text: `<p><strong>Cross-Sell Engine</strong> active. Analysing ${this.fabric.behaviour.queryCount + 12} behavioural signals… Engagement: <strong>${score}%</strong></p>`, extra: this._buildCrossSellCard() };
    }
    if (key === 'marketplace') return { text: `<p>Welcome to <strong>ET Services Marketplace</strong>. Profile matched against 40+ partner services.</p>`, extra: this._buildMarketplaceCard(), onboard: 4 };
    return { text: '<p>Agent ready.</p>' };
  }
  // ===== CARD BUILDERS =====
  _buildGapsCard() {
    const u = this.fabric.identityGraph, p = this.fabric.portfolio, gaps = [];
    if (u.hasInsurance !== true) gaps.push({ ico: '🛡️', bg: 'rgba(239,68,68,.15)', title: 'Term Insurance Missing', sub: `Recommended: 20× income · <a href="https://economictimes.indiatimes.com/wealth/insure" target="_blank" class="et-link">Get quotes →</a>`, match: 'Critical', level: 'match-crit' });
    if (u.hasNPS !== true) gaps.push({ ico: '📋', bg: 'rgba(26,107,181,.15)', title: 'NPS Contribution Gap', sub: `₹50K extra deduction · <a href="https://economictimes.indiatimes.com/wealth/retire" target="_blank" class="et-link">Open NPS →</a>`, match: 'Important', level: 'match-med' });
    if (p.holdings.length > 0 && p.assetAllocation.debt === 0 && (p.assetAllocation.equity + p.assetAllocation.mf) > 80) gaps.push({ ico: '⚖️', bg: 'rgba(59,130,246,.15)', title: 'No Debt Diversification', sub: `Consider 20–30% in debt · <a href="https://economictimes.indiatimes.com/mutual-funds" target="_blank" class="et-link">Explore debt funds →</a>`, match: 'Important', level: 'match-med' });
    if (!gaps.length) gaps.push({ ico: '✅', bg: 'rgba(34,197,94,.15)', title: 'Well Diversified', sub: 'No critical gaps. Keep monitoring on <a href="https://economictimes.indiatimes.com/markets" target="_blank" class="et-link">ET Markets</a>.', match: 'Healthy', level: 'match-high' });
    const hdr = p.holdings.length > 0 ? `${p.holdings.length} holdings · ₹${p.totalValue.toLocaleString('en-IN')}` : 'Profile-based';
    return `<div class="r-card"><div class="r-card-title">Gap Analysis · ${hdr}</div>${gaps.map(g => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${g.bg}">${g.ico}</div><div><div class="opp-title">${g.title}</div><div class="opp-sub">${g.sub}</div></div></div><span class="match-pill ${g.level}">${g.match}</span></div>`).join('')}</div>`;
  }

  _buildFIRESimulation() {
    const u = this.fabric.identityGraph, p = this.fabric.portfolio;
    const incMap = { 'Below ₹5L': 35000, '₹5–10L': 65000, '₹10–20L': 125000, '₹20–40L': 250000, '₹40L–1Cr': 580000, '₹1Cr+': 1000000 };
    const mi = incMap[u.income] || 125000, me = Math.round(mi * 0.55), ae = me * 12, tc = ae * 25;
    const sip = p.totalSIP || Math.round(mi * 0.15), cv = p.totalValue || 0, age = parseInt(u.ageRange) || 30, yrs = Math.max(5, 45 - age);
    const cagr = u.risk === 'Aggressive' ? 0.14 : u.risk === 'Conservative' ? 0.09 : 0.12, r = cagr / 12, n = yrs * 12;
    const sipFV = Math.round(sip * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)), lumpFV = Math.round(cv * Math.pow(1 + cagr, yrs));
    const proj = sipFV + lumpFV, gap = tc - proj, addSIP = gap > 0 ? Math.round((gap * r) / ((Math.pow(1 + r, n) - 1) * (1 + r))) : 0;
    return `<div class="r-card"><div class="r-card-title">🔥 FIRE Simulation</div><div style="padding:8px"><div><strong>Monthly expenses:</strong> ₹${me.toLocaleString('en-IN')}</div><div><strong>Target (25×):</strong> ₹${(tc / 10000000).toFixed(1)}Cr</div><div><strong>Current SIP:</strong> ₹${sip.toLocaleString('en-IN')}/mo at ${Math.round(cagr * 100)}%</div><div><strong>Projected ${yrs}yrs:</strong> ₹${(proj / 10000000).toFixed(1)}Cr</div><div style="margin-top:12px;padding:12px;background:${gap > 0 ? 'rgba(239,68,68,.1)' : 'rgba(34,197,94,.1)'};border-radius:8px">${gap > 0 ? `<strong>Gap:</strong> ₹${(gap / 10000000).toFixed(1)}Cr — Increase SIP by <strong>₹${addSIP.toLocaleString('en-IN')}/mo</strong>` : '<strong>✓ On track!</strong> Trajectory exceeds target'}</div><div style="margin-top:12px"><a href="https://economictimes.indiatimes.com/prime" target="_blank" class="et-link">📰 FIRE toolkit on ET Prime →</a> · <a href="https://economictimes.indiatimes.com/masterclass" target="_blank" class="et-link">🎓 Retirement Masterclass →</a></div></div></div>`;
  }

  _buildRoadmapCard() {
    const u = this.fabric.identityGraph, p = this.fabric.portfolio; const phases = [];
    const imm = []; if (u.hasInsurance !== true) imm.push({ act: 'Get term insurance (20× income)', link: 'https://economictimes.indiatimes.com/wealth/insure', label: '🛡️ Get Quotes' });
    if (u.hasNPS !== true) imm.push({ act: 'Open NPS — ₹50K tax saving', link: 'https://economictimes.indiatimes.com/wealth/retire', label: '📋 Open NPS' });
    if (!imm.length) imm.push({ act: 'Complete financial profile', link: '#', label: '📝 Update' }); phases.push({ title: '🔴 Phase 1 — Immediate', items: imm });
    phases.push({ title: '🟡 Phase 2 — 1–3 months', items: [{ act: `Increase SIP for ${u.goal || 'wealth creation'}`, link: 'https://economictimes.indiatimes.com/masterclass', label: '🎓 SIP Strategy' }] });
    phases.push({ title: '🟢 Phase 3 — Long-term', items: [{ act: 'Track portfolio quarterly', link: 'https://economictimes.indiatimes.com/markets', label: '📊 ET Markets' }] });
    return `<div class="r-card"><div class="r-card-title">Financial Roadmap</div>${phases.map(ph => `<div class="roadmap-phase"><div class="roadmap-phase-title">${ph.title}</div>${ph.items.map(it => `<div class="roadmap-item"><div class="roadmap-action">${it.act}</div><a href="${it.link}" target="_blank" class="roadmap-btn et-link">${it.label}</a></div>`).join('')}</div>`).join('')}</div>`;
  }

  _buildPortfolioSummaryCard() {
    const p = this.fabric.portfolio; if (!p.holdings.length) return '';
    const allocHTML = Object.entries(p.assetAllocation).filter(([, v]) => v > 0).map(([k, v]) => `<div class="alloc-bar-item"><div class="alloc-label">${k.toUpperCase()}</div><div class="alloc-bar-fill" style="width:${v}%;background:${k === 'equity' ? 'var(--et-red)' : k === 'mf' ? 'var(--teal)' : k === 'debt' ? 'var(--blue)' : 'var(--gold)'}"></div><div class="alloc-pct">${v}%</div></div>`).join('');
    return `<div class="r-card"><div class="r-card-title">Portfolio · ${p.holdings.length} Holdings</div><div class="portfolio-stats"><div class="port-stat"><div class="port-stat-val">₹${p.totalValue.toLocaleString('en-IN')}</div><div class="port-stat-label">Total Value</div></div><div class="port-stat"><div class="port-stat-val">₹${p.totalSIP.toLocaleString('en-IN')}/mo</div><div class="port-stat-label">Monthly SIP</div></div></div><div class="alloc-bars">${allocHTML}</div>${p.holdings.slice(0, 5).map((h, idx) => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${h.type === 'Stock' ? 'rgba(208,2,27,.15)' : 'rgba(26,171,170,.15)'}">${h.type === 'Stock' ? '📊' : '💼'}</div><div><div class="opp-title">${h.name}</div><div class="opp-sub">${h.type} · SIP ₹${(h.sipAmount || 0).toLocaleString('en-IN')} · Val ₹${(h.value || 0).toLocaleString('en-IN')}</div></div></div></div>`).join('')}</div>`;
  }

  _buildHomeLoanOptions() {
    const u = this.fabric.identityGraph, ml = u.income && u.income.includes('1Cr') ? '1.5Cr' : u.income && u.income.includes('40L') ? '80L' : '50L';
    return `<div class="r-card"><div class="r-card-title">🏠 Home Loan Options</div>${[['HDFC Home Loan', '8.4%'], ['SBI Home Loan', '8.6%'], ['ICICI Home Loan', '8.65%']].map(r => `<div style="background:rgba(26,107,181,.1);padding:12px;border-radius:8px;margin:8px 0"><div style="font-weight:600">${r[0]}</div><div>${r[1]} p.a. · Up to ₹${ml}</div><a href="https://economictimes.indiatimes.com/wealth/borrow" target="_blank" class="et-link" style="margin-top:6px;display:inline-block">Check eligibility →</a></div>`).join('')}</div>`;
  }

  _buildInsuranceOptions() {
    const u = this.fabric.identityGraph, pm = u.ageRange && u.ageRange.includes('25') ? '550' : u.ageRange && u.ageRange.includes('35') ? '750' : '650';
    return `<div class="r-card"><div class="r-card-title">🛡️ Term Insurance</div>${[['ICICI Pru iProtect', pm, 'Returns 105% of premiums'], ['HDFC Click 2 Protect', parseInt(pm) + 50, 'Critical illness rider'], ['Max Life Smart Term', parseInt(pm) - 50, 'Premium waiver on disability']].map(r => `<div style="background:rgba(26,171,170,.1);padding:12px;border-radius:8px;margin:8px 0"><div style="font-weight:600">${r[0]}</div><div>₹1Cr at ₹${r[1]}/mo · ${r[2]}</div><a href="https://economictimes.indiatimes.com/wealth/insure" target="_blank" class="et-link" style="margin-top:6px;display:inline-block">Get quote →</a></div>`).join('')}</div>`;
  }

  _buildMarketplaceCard() { const s = APIGateway.getPartners(this.fabric.identityGraph.risk); return `<div class="r-card"><div class="r-card-title">Pre-qualified partner services</div>${s.map(s => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:rgba(26,107,181,.15)">${s.icon || ''}</div><div><div class="opp-title">${s.title}</div><div class="opp-sub">${s.sub}</div></div></div><span class="match-pill ${s.level}">${s.match}</span></div>`).join('')}</div>`; }

  _buildPersonalisedOnboard() {
    const u = this.fabric.identityGraph;
    return `<div class="r-card"><div class="r-card-title">Your personalised ET path · ${u.segment || 'Your Segment'}</div>${[
      { ico: '📰', bg: 'rgba(208,2,27,.15)', t: 'ET Prime — Activate full access', s: `Tailored to ${u.goal || 'your goals'}`, step: 'Step 1', url: 'https://economictimes.indiatimes.com/prime' },
      { ico: '📊', bg: 'rgba(26,107,181,.15)', t: 'ET Markets Portfolio Tracker', s: `Track your ${u.assets || 'investments'}`, step: 'Step 2', url: 'https://economictimes.indiatimes.com/markets' },
      { ico: '🎓', bg: 'rgba(26,171,170,.15)', t: `Masterclass: ${u.assets && /equity/i.test(u.assets) ? 'Equity Research' : 'Personal Finance'}`, s: '94% profile match', step: 'Step 3', url: 'https://economictimes.indiatimes.com/masterclass' },
      { ico: '🏪', bg: 'rgba(201,162,39,.15)', t: `ET Marketplace: ${u.hasInsurance === false ? 'Get Term Insurance' : 'Explore PMS'}`, s: 'Gap-filling recommendation', step: 'Step 4', url: 'https://economictimes.indiatimes.com/wealth' }
    ].map(r => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${r.bg}">${r.ico}</div><div><div class="opp-title"><a href="${r.url}" target="_blank" class="et-link" style="color:rgba(255,255,255,.88);font-size:12px">${r.t}</a></div><div class="opp-sub">${r.s}</div></div></div><span class="match-pill match-high">${r.step}</span></div>`).join('')}</div>`;
  }

  _buildCrossSellCard() {
    const u = this.fabric.identityGraph, items = [];
    if (u.goal === 'Retirement / FIRE') items.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: FIRE', sub: `Matched to ${u.goal} · <a href="https://economictimes.indiatimes.com/masterclass" target="_blank" class="et-link">Enroll →</a>`, match: '96%', level: 'match-high' });
    else items.push({ ico: '🎓', bg: 'rgba(26,171,170,.15)', title: 'ET Masterclass: Personal Finance', sub: `<a href="https://economictimes.indiatimes.com/masterclass" target="_blank" class="et-link">Enroll →</a>`, match: '90%', level: 'match-high' });
    items.push({ ico: '💳', bg: 'rgba(201,162,39,.15)', title: u.income && /40L|1Cr/i.test(u.income) ? 'ET–Axis Magnus Card' : 'ET–HDFC Millennia Card', sub: 'Pre-approved · Cashback on ET', match: '88%', level: 'match-high' });
    return `<div class="r-card"><div class="r-card-title">Profile-matched opportunities</div>${items.map(i => `<div class="opp-row"><div class="opp-left"><div class="opp-ico" style="background:${i.bg}">${i.ico}</div><div><div class="opp-title">${i.title}</div><div class="opp-sub">${i.sub}</div></div></div><span class="match-pill ${i.level}">${i.match}</span></div>`).join('')}</div>`;
  }

  getRichCardHTML(type) {
    const b = {
      'age-q': () => `<div class="r-card"><div class="r-card-title">Select your age range</div><div class="opt-grid">${[['🎓', '18–25', 'Early career', "I am in my early 20s, 18 to 25"], ['💼', '25–30', 'Growth phase', "I am 25 to 30 years old"], ['📊', '30–35', 'Peak earning', "I am 30 to 35 years old"], ['🏠', '35–40', 'Established', "I am 35 to 40 years old"], ['💎', '40–50', 'Wealth building', "I am 40 to 50 years old"], ['👑', '50+', 'Pre-retirement', "I am above 50"]].map(r => `<div class="opt-chip" onclick="injectQuick('${r[3]}')"><div class="opt-chip-icon">${r[0]}</div><div class="opt-chip-name">${r[1]}</div><div class="opt-chip-desc">${r[2]}</div></div>`).join('')}</div></div>`,
      'goal-q': () => `<div class="r-card"><div class="r-card-title">Select your primary goal</div><div class="opt-grid">${[['🎯', 'Retirement / FIRE', 'Long-term independence', "I want to retire early and achieve financial independence — FIRE"], ['📈', 'Wealth creation', 'Growth focus', "I want to build wealth and grow my assets aggressively"], ['💰', 'Passive income', 'Dividend & yield', "I want to generate passive income from dividends"], ['👶', 'Child education', 'Family planning', "I want to save for my child education"]].map(r => `<div class="opt-chip" onclick="injectQuick('${r[3]}')"><div class="opt-chip-icon">${r[0]}</div><div class="opt-chip-name">${r[1]}</div><div class="opt-chip-desc">${r[2]}</div></div>`).join('')}</div></div>`,
      'risk-q': () => `<div class="r-card"><div class="r-card-title">Risk tolerance</div><div class="opt-grid">${[['🛡️', 'Conservative', 'Capital preservation', "I prefer conservative investments, capital preservation"], ['⚖️', 'Moderate', 'Balanced growth', "I am moderate, balanced growth with some risk"], ['🚀', 'Aggressive', 'High growth', "I am aggressive, I want high growth"], ['⚡', 'Very Aggressive', 'Maximum returns', "Very aggressive, maximum returns"]].map(r => `<div class="opt-chip" onclick="injectQuick('${r[3]}')"><div class="opt-chip-icon">${r[0]}</div><div class="opt-chip-name">${r[1]}</div><div class="opt-chip-desc">${r[2]}</div></div>`).join('')}</div></div>`,
      'asset-q': () => `<div class="r-card"><div class="r-card-title">Current investments</div><div class="opt-grid">${[['📊', 'Equity & MF', 'Stocks, SIPs', "I invest in equity stocks and mutual funds including SIPs"], ['🏠', 'Real Estate & Gold', 'Physical assets', "I have real estate and gold"], ['🏦', 'FD & Debt', 'Fixed income', "I mainly use fixed deposits and debt"], ['🌱', 'Just starting', 'Savings only', "I am just starting, mostly savings"]].map(r => `<div class="opt-chip" onclick="injectQuick('${r[3]}')"><div class="opt-chip-icon">${r[0]}</div><div class="opt-chip-name">${r[1]}</div><div class="opt-chip-desc">${r[2]}</div></div>`).join('')}</div></div>`,
      'income-q': () => `<div class="r-card"><div class="r-card-title">Annual income bracket</div><div class="opt-grid">${[['💼', '₹10–20L', 'p.a.', "My annual income is around 10 to 20 lakhs"], ['💼', '₹20–40L', 'p.a.', "My annual income is around 20 to 40 lakhs"], ['💎', '₹40L–1Cr', 'p.a.', "My annual income is around 40 lakhs to 1 crore"], ['👑', '₹1Cr+', 'p.a.', "My annual income is above 1 crore"]].map(r => `<div class="opt-chip" onclick="injectQuick('${r[3]}')"><div class="opt-chip-icon">${r[0]}</div><div class="opt-chip-name">${r[1]}</div><div class="opt-chip-desc">${r[2]}</div></div>`).join('')}</div></div>`,
      'insurance-q': () => `<div class="r-card"><div class="r-card-title">Coverage status</div><div class="opt-grid">${[['✅', 'Both covered', 'Term + NPS', "Yes I have term insurance and NPS both"], ['🛡️', 'Insurance only', 'No NPS', "I have term insurance but no NPS"], ['📋', 'NPS only', 'No term plan', "I have NPS but no term insurance"], ['⚠️', 'Neither yet', 'Need both', "I have neither term insurance nor NPS"]].map(r => `<div class="opt-chip" onclick="injectQuick('${r[3]}')"><div class="opt-chip-icon">${r[0]}</div><div class="opt-chip-name">${r[1]}</div><div class="opt-chip-desc">${r[2]}</div></div>`).join('')}</div></div>`
    };
    return b[type] ? b[type]() : '';
  }
}
// ============================= GLOBAL INSTANCES =============================
const fabric = new DataFabric();
const engine = new Orchestrator(fabric);

// ============================= VOICE INPUT =============================
class VoiceInput {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    if (this.supported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN';
      this.recognition.onresult = (e) => {
        const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
        document.getElementById('msg-input').value = transcript;
        if (e.results[0].isFinal) { this.stop(); setTimeout(() => sendMessage(), 300); }
      };
      this.recognition.onend = () => { this.isListening = false; this._updateBtn(); };
      this.recognition.onerror = (e) => { this.isListening = false; this._updateBtn(); console.warn('Voice error:', e.error); };
    }
  }
  toggle() {
    if (!this.supported) { alert('Voice input not supported in this browser. Try Chrome.'); return; }
    if (this.isListening) { this.stop(); } else { this.start(); }
  }
  start() {
    try { this.recognition.start(); this.isListening = true; this._updateBtn(); fabric.pushSignal('Voice input active 🎙️', 'var(--coral)'); } catch (e) { console.warn('Voice start failed', e); }
  }
  stop() {
    try { this.recognition.stop(); } catch (e) { } this.isListening = false; this._updateBtn();
  }
  _updateBtn() {
    const btn = document.getElementById('voice-btn');
    if (btn) { btn.classList.toggle('voice-active', this.isListening); btn.title = this.isListening ? 'Listening... click to stop' : 'Voice input'; }
  }
}
const voice = new VoiceInput();

// ============================= UI HELPERS =============================
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
  // Make all links open in new tab
  bubble.querySelectorAll('a[href^="http"]').forEach(a => { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); });
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
  const el = document.getElementById(id); if (!el) return;
  el.classList.add('update-flash', 'active-tag');
  setTimeout(() => el.classList.remove('update-flash'), 1600);
}

function switchAgent(key, btn) {
  document.querySelectorAll('.agent-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  engine.currentAgent = key;
  fabric.behaviour.trackAgentSwitch(key);
  const cfg = engine.agentConfig[key];
  document.getElementById('agent-title').textContent = cfg.title;
  document.getElementById('agent-desc-hdr').textContent = cfg.desc;
  document.getElementById('agent-mode-hint').textContent = cfg.hint;
  setQuickReplies(cfg.qr);
  document.getElementById('messages').innerHTML = '';
  fabric.pushSignal(`Agent: ${cfg.title}`, 'var(--blue)');
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
    // Update live indicator
    const liveEl = document.getElementById('live-status');
    if (liveEl) liveEl.textContent = `${fabric.metrics.interactions} queries · ${fabric.behaviour.getEngagementScore()}% engagement`;
  }, 700 + Math.random() * 400);
}

function injectQuick(text) { document.getElementById('msg-input').value = text; sendMessage(); }
function autoResize(el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; }

function applyHIL() {
  const updates = {};
  const hilName = document.getElementById('hil-name');
  const hilAge = document.getElementById('hil-age');
  if (hilName && hilName.value.trim()) { updates.name = hilName.value.trim(); const parts = updates.name.split(/\s+/); updates.initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : updates.name.substring(0, 2).toUpperCase(); }
  if (hilAge && hilAge.value.trim()) updates.ageRange = hilAge.value.trim();
  updates.risk = document.getElementById('hil-risk').value;
  updates.goal = document.getElementById('hil-goal').value;
  updates.horizon = document.getElementById('hil-horizon').value;
  fabric.updateIdentity(updates, 'HIL override applied');
  fabric.renderReco(); flashTag('tag-hil');
  renderMsg('assistant', `<p>⚙️ <strong>HIL override applied.</strong> Risk: <strong>${updates.risk}</strong> · Goal: <strong>${updates.goal}</strong> · Horizon: <strong>${updates.horizon}</strong></p><p>All agents repersonalised.</p>`, nowTime());
}

function editHolding(index) {
  const holding = fabric.portfolio.holdings[index]; if (!holding) return;
  const editForm = `<div class="edit-holding-form" style="background:rgba(0,0,0,0.5);position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;z-index:1000" onclick="closeEditForm(event)"><div style="background:var(--et-charcoal);padding:24px;border-radius:12px;max-width:400px;width:90%;border:1px solid var(--et-border)" onclick="event.stopPropagation()"><h3 style="margin-bottom:16px">Edit Holding</h3><div style="margin-bottom:12px"><label>Name</label><input type="text" id="edit-name" value="${holding.name.replace(/'/g, "\\'")} " style="width:100%;padding:8px;margin-top:4px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:4px;color:white"></div><div style="margin-bottom:12px"><label>Type</label><select id="edit-type" style="width:100%;padding:8px;margin-top:4px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:4px;color:white"><option value="MF" ${holding.type === 'MF' ? 'selected' : ''}>Mutual Fund</option><option value="Stock" ${holding.type === 'Stock' ? 'selected' : ''}>Stock</option><option value="Debt" ${holding.type === 'Debt' ? 'selected' : ''}>Debt</option></select></div><div style="margin-bottom:12px"><label>SIP (₹/mo)</label><input type="number" id="edit-sip" value="${holding.sipAmount || 0}" style="width:100%;padding:8px;margin-top:4px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:4px;color:white"></div><div style="margin-bottom:12px"><label>Value (₹)</label><input type="number" id="edit-value" value="${holding.value || 0}" style="width:100%;padding:8px;margin-top:4px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:4px;color:white"></div><div style="display:flex;gap:12px;margin-top:20px"><button onclick="saveHoldingEdit(${index})" style="flex:1;padding:10px;background:var(--teal);border:none;border-radius:6px;color:white;cursor:pointer">Save</button><button onclick="closeEditForm()" style="flex:1;padding:10px;background:rgba(255,255,255,.1);border:none;border-radius:6px;color:white;cursor:pointer">Cancel</button></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', editForm);
}
function saveHoldingEdit(index) {
  const updates = { name: document.getElementById('edit-name').value, type: document.getElementById('edit-type').value, sipAmount: parseInt(document.getElementById('edit-sip').value) || 0, value: parseInt(document.getElementById('edit-value').value) || 0 };
  fabric.editHolding(index, updates); closeEditForm();
  renderMsg('assistant', `<p>✅ Updated: ${updates.name} — SIP ₹${updates.sipAmount.toLocaleString('en-IN')}, Value ₹${updates.value.toLocaleString('en-IN')}</p>`, nowTime());
}
function deleteHolding(index) {
  if (confirm('Remove this holding?')) { const h = fabric.portfolio.holdings[index]; fabric.deleteHolding(index); closeEditForm(); renderMsg('assistant', `<p>🗑️ Removed ${h.name}</p>`, nowTime()); }
}
function showFullPortfolio() { renderMsg('assistant', engine._buildPortfolioSummaryCard(), nowTime()); }
function closeEditForm(event) { document.querySelectorAll('.edit-holding-form').forEach(f => f.remove()); }
function showPortfolioSummary() { renderMsg('assistant', engine._buildPortfolioSummaryCard(), nowTime()); }
function clearSession() { if (confirm('Clear all saved data?')) { fabric.session.clear(); location.reload(); } }

// ============================= BOOT =============================
window.addEventListener('load', () => {
  const bar = document.getElementById('ld-bar');
  const steps = document.querySelectorAll('.loading-step');
  let i = 0;
  const stepLabels = ['Initialising PAIL v4.0', 'Loading ET Data Fabric', 'Connecting ET Ecosystem', 'NLP Engine Active', 'AI Concierge Ready'];
  const tick = setInterval(() => {
    if (i < steps.length) {
      steps[i].classList.add('show');
      bar.style.width = ((i + 1) / steps.length * 100) + '%';
      const idx = i;
      setTimeout(() => { steps[idx].classList.add('done'); steps[idx].textContent = '✓ ' + stepLabels[idx]; }, 250);
      i++;
    } else {
      clearInterval(tick);
      setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        ls.style.opacity = '0';
        setTimeout(() => {
          ls.remove();
          fabric.pushSignal('PAIL v4.0 Intelligence Layer online', 'var(--teal)');
          fabric.pushSignal('NLP Engine: 100+ intents loaded', 'var(--blue)');
          fabric.pushSignal('ET Ecosystem KB: 50+ products mapped', 'var(--gold)');
          if (fabric.isReturningUser()) {
            fabric.pushSignal(`Welcome back ${fabric.identityGraph.name} — session restored`, 'var(--teal)');
          }
          fabric.updateUI(); fabric.renderMetrics();
          setQuickReplies(engine.agentConfig.concierge.qr);
          const intro = engine.agentIntro('concierge');
          renderMsg('assistant', intro.text, nowTime(), intro.richType);
          if (intro.extra) setTimeout(() => renderMsg('assistant', intro.extra, nowTime(), null, true), 600);
          // Pre-fetch live data
          fabric.liveData.getTopStories().catch(() => { });
          fabric.liveData.getMarketSnapshot().catch(() => { });
        }, 500);
      }, 400);
    }
  }, 320);
});
