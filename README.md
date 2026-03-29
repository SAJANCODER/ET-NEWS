# ET AI Concierge — PAIL v8.0

## Overview

**ET AI Concierge** is an intelligent financial services platform powered by **PAIL (Persistent Adaptive Intelligence Layer)**, a proprietary mathematical engine that builds dynamic financial profiles and delivers hyper-personalized recommendations across Economic Times' full product ecosystem.

Unlike generic chatbots, this system ingests user-provided financial data, calculates exact investable surplus, applies strict risk-adjusted allocation rules, and routes queries through a hierarchical NLP engine that prioritizes functional financial intent over conversational noise.

---

## Core Architecture

```
ETEcosystemKB → ETLiveDataService → ContextualNLPEngine → Orchestrator → DataFabric
```

### Key Components

| Component | Purpose |
|-----------|---------|
| **ETEcosystemKB** | Deep knowledge base of ET products, services, sections, and financial instruments (mutual funds, credit cards, insurance, etc.) |
| **ETLiveDataService** | Async RSS feed aggregator for top stories, market news, wealth articles, and tech updates |
| **DataFabric** | State layer managing identity graph, portfolio, metrics, profile depth (PAIL), signals, and behavioral tracking |
| **ContextualNLPEngine** | Priority-based intent matcher: core functional → conversational → ecosystem navigation |
| **Orchestrator** | Multi-agent orchestration with per-agent demo prompts, warm onboarding, and specialized routing |
| **ProfileDrawerManager** | Drawer UI controller for real-time profile updates with live sync notifications |

---

## Feature Breakdown

### 1. **Welcome Concierge Agent** — Smart 3-Minute Profiling

Profile Stage | Input | Captures | Formula Impact
--- | --- | --- | ---
**Basic Identity** | Name | `initials`, `name` | PAIL +10%
**Age Range** | 18–25, 30–35, 35+, etc. | `ageRange` | Risk scoring
**Financial Goal** | Wealth creation, Retirement/FIRE, Child Education | `goal` | Asset allocation strategy
**Risk Tolerance** | Conservative, Moderate, Aggressive, Very Aggressive | `risk` | Fund recommendations, SIP allocation
**Monthly Income** | ₹12L, ₹18L, ₹24L+ with exact input | `incomeNum` | Credit card eligibility, surplus calculation
**Monthly Expenses** | Exact or range (₹30K–₹80K) | `monthlyExpenses` | **Investable Surplus** = (income/12) − expenses
**Investment Horizon** | 1–3 yrs, 3–7 yrs, 7–12 yrs, 12–15 yrs, 15+ yrs | `horizon` | Fund selection (horizon-based)
**Asset Holdings** | Equity, MF, Debt, NPS, etc. | `assets` | Gap analysis baseline
**Insurance + NPS** | Yes/No for term insurance & NPS | `hasInsurance`, `hasNPS` | Critical gap detection

**Output**: PAIL Profile Depth (0–95%) reflects completion:
- PAIL 50% = 5 of 10 core fields filled
- PAIL 95% = All 10 fields + human-in-loop confirmations

---

### 2. **Financial Navigator Agent** — Gaps & SIP Roadmaps

#### Gap Analysis
Identifies missing financial products:
- **Insurance Gap**: If `hasInsurance ≠ true` → Recommends \_\_₹1Cr minimum term coverage
- **NPS Gap**: If `hasNPS ≠ true` & income ≥ ₹15L → Highlights ₹50K extra deduction under 80CCD(1B)
- **Portfolio Diversification Gap**: Flags missing asset classes

#### SIP Roadmap (Dynamic Allocation by Risk Profile)

**Moderate Profile Example:**
- Monthly Capacity: ₹75,000
- Allocation:
  - **Equity 50%** → ₹37,500 → *Parag Parikh Flexi Cap (28.6% FY25)*
  - **Debt 30%** → ₹22,500 → *Aditya Birla Balanced Advantage (8.4% FY25)*
  - **Gold 10%** → ₹7,500 → *ICICI Gold Fund (13.6% FY25)*
  - **International 10%** → ₹7,500 → *Motilal Oswal Nasdaq 100 (21.8% FY25)*

**Automatic Profile Adjustment:**

| Risk Profile | Equity | Debt | Gold | International |
|---|---|---|---|---|
| **Conservative** | 25% | 60% | 15% | 0% |
| **Moderate** | 50% | 30% | 10% | 10% |
| **Aggressive** | 65% | 15% | 5% | 15% |

---

### 3. **Cross-Sell Engine Agent** — Behavioral Trigger Analysis

Real-time triggers based on user behavior:

| Trigger | Condition | Recommendation |
|---------|-----------|-----------------|
| **Insurance Gap** | `hasInsurance === false` | Critical: Term insurance + ₹1Cr calculation |
| **Premium Card Eligibility** | Income ≥ ₹24L + 2+ market queries | ET–Axis Magnus (Unlimited Lounge, 5% ET CB) |
| **ET Prime Upsell** | 2+ market-related queries + moderate+ risk | ET Prime subscription for expert analysis |
| **Credit Card Match** | Income ≥ ₹12L | 3 eligible cards based on income tier + age |

**Example**: User age 35, income ₹20L, "Best credit card for me?"
- **Tier 1**: ET–Axis Magnus (₹24L+ min → not eligible)
- **Tier 2**: HDFC Regalia (₹20L min → **eligible**, premium lounge)
- **Tier 3**: ICICI Sapphiro (₹15L min → **eligible**, 10x dining points)

---

### 4. **Services Marketplace Agent** — Funds, Cards, Insurance

#### Mutual Fund Recommendations (Profile-Based, FY25 Top Performers)

**Conservative Profile:**
- Equity: Axis Bluechip (16.2% FY25)
- Debt: HDFC Balanced Advantage (8.1% FY25)
- Gold: SBI Gold Fund (13.4% FY25)

**Moderate Profile:**
- Equity: Parag Parikh Flexi Cap (28.6% FY25)
- Debt: Aditya Birla Balanced Advantage (8.4% FY25)
- Gold: ICICI Gold Fund (13.6% FY25)
- International: Motilal Oswal Nasdaq 100 (21.8% FY25)

**Aggressive Profile:**
- Equity: Quant Small Cap (38.4% FY25)
- Debt: SBI Magnum Multicap (9.1% FY25)
- Gold: Axis Gold Fund (13.7% FY25)
- International: Edelweiss US Tech (24.6% FY25)

#### Credit Card Matching (Income + Age Based)

**8 Cards Across 3 Tiers:**

| Card | Min Income | Min Age | Type | Benefits |
|------|------------|---------|------|----------|
| ET–Axis Magnus | ₹24L | 25 | Premium Travel | Unlimited lounge, 5% CB on ET |
| HDFC Regalia | ₹20L | 25 | Premium | Airport lounge, 5% dining CB |
| ICICI Sapphiro | ₹15L | 25 | Premium | 10x dining & travel points |
| ET–HDFC Millennia | ₹4L | 21 | Cashback | 5% CB Amazon/Flipkart/ET |
| Axis Airtel Rewards | ₹6L | 21 | Rewards | 4x bonus on Airtel, 2% other |
| SBI SimplyCLICK | ₹2L | 21 | Beginner | 10x online rewards |
| HDFC Cashback | ₹2.5L | 21 | Cashback | 1–1.5% all spends |
| ICICI Amazon Pay | ₹3L | 21 | eCommerce | 5% Amazon CB |

#### Term Insurance Quotes
- Targets: `hasInsurance === false`
- Recommendation: ₹1 Crore minimum (20× annual income rule)
- Link: [ET Wealth Insurance](https://economictimes.indiatimes.com/wealth/insure)

---

## Query Processing & Intent Hierarchy

### Priority 1: Core Functional Intents (95% confidence)
```javascript
'recommend_mf'    → /recommend.*fund|best.*mutual fund|where.*invest/i
'recommend_card'  → /best.*credit card|which card|credit card for me/i
'sip_roadmap'     → /sip.*allocation|build.*roadmap|roadmap/i
'gap_analysis'    → /gap|analyze.*portfolio|portfolio.*review/i
```

### Priority 2: Conversational Intents
```javascript
'personalized_news'   → /which news|recommend news|news for me/i
'bot_identity'        → /who are you|what can you do/i
'show_onboard'        → /where is my onboarding path|my path/i
```

### Priority 3: Ecosystem Navigation (Knowledge Base Matching)
```javascript
Query: "Tell me about forex"
→ Matches 'forex' keyword → ET Markets > Forex section
→ Link: https://economictimes.indiatimes.com/markets/forex
```

---

## ET Ecosystem Navigation

### ET Markets Sections (Live Links)
- **Stocks**: Share quotes, screeners
- **Mutual Funds**: Fund comparison, NAV, SIP calculator
- **F&O (Futures & Options)**: Derivatives, options chain, expiry data
- **IPO Hub**: Upcoming IPOs, GMP tracker, allotment status
- **Commodities**: Gold, silver, crude oil prices
- **Forex**: USD/INR rates, currency converter, RBI policy
- **Crypto**: Bitcoin, Ethereum, Web3 updates
- **Technical Analysis**: Charts, RSI, MACD, candlestick patterns

### ET Wealth Sections (Personal Finance)
- **Tax Planning**: 80C, 80D, ITR guides, capital gains
- **Insurance**: Term plans, health insurance, claim guides
- **Retirement & NPS**: NPS guide, PPF calculator, FIRE toolkit
- **Loans & Borrowing**: Home loans, personal loans, EMI calculator
- **Credit Cards**: Card comparison, reward maximizer, fees
- **Real Estate**: Property guides, RERA information

### ET Premium Services
- **ET Prime** (Premium journalism, expert research)
- **ET Masterclass** (Expert-led financial courses)
- **ET Podcasts** (Morning Brief, market updates)

---

## ET Ecosystem Usage Tracking

Real-time counter of ET links accessed during session:

| Metric | Tracks | Increments |
|--------|--------|-----------|
| **Products Active** | ET Prime, ET Markets access | When user opens ET product links |
| **Articles Read** | Full story reads | News link clicks |
| **Masterclasses** | Course/webinar engagements | Masterclass link clicks |
| **Opportunities** | Insurance, card, fund applications | Service opportunity link clicks |

Live updates persist in profile panel "ET Ecosystem Usage" card.

---

## Profile Panel (Right Drawer UI)

### Profile Tab
- **Identity Graph** (inferred): Name, Age, Risk, Income, Goal, Horizon, Assets
- **Confirmed Fields** (human-in-loop): User-manually verified data
- **PAIL Depth Bar**: 0–95% completion indicator
- **Human-in-Loop Edit Form**: Override any profile field + "Apply & Repersonalize"

### Signals Tab
- Live behavioral signals with timestamps
- Events: Profile updates, agent switches, portfolio additions, gap detections
- Max 20 signals (FIFO queue)

### Recommendations Tab
- Goal-based recommendations (Wealth creation, Retirement/FIRE)
- Risk-based recommendations (Conservative, Moderate, Aggressive)
- Critical recommendations (Insurance gap, NPS eligibility, SIP readiness)
- Each card shows match priority: Critical, High Priority, Recommended, Stable

### Onboarding Path
- 6-step journey: Basic profile → ET Prime discovery → Goals → Portfolio analysis → Services matching → Personalization calibrated
- Visual step tracker with ✓ completion indicators

### ET Ecosystem Usage
- Products active: 0
- Articles read: 0
- Masterclasses: 0
- Opportunities: 0

---

## Sidebar (Left Profile Summary)

- **PAIL Depth**: Current % (0–95%)
- **Risk Profile**: Conservative / Moderate / Aggressive
- **Segment**: ET USER / Early Career / Established / HNI
- **Behavioral Signals**: Live count of logged signals
- **Onboarding Progress**: Step count, next actionable item

---

## Chat Interface & Agent Switching

### Top Header
- **Live Status**: "Connected · [Agent Name] · [N] queries"
- **Profile Chip**: Avatar + PAIL [N]%
- **Agent Selector Tabs**: 4 buttons with warmth intro on switch

### Per-Agent Demo Prompts (On First Access)

**Welcome Concierge**
- "Tell me about ET Prime"
- "Show my financial gaps"
- "Build my SIP Roadmap"
- "Which news do you recommend for me?"

**Financial Navigator**
- "Build my SIP roadmap"
- "Analyze my portfolio gaps"
- "Show my onboarding path"

**Cross-Sell Engine**
- "What's best for my profile?"
- "Show my top opportunities"
- "Do I need term insurance?"

**Services Marketplace**
- "Recommend mutual funds"
- "Credit card for me"
- "Term insurance quotes"

### Chat Persistence
- Agent switch preserves per-agent conversation history
- Returning to previous agent shows prior chat
- Fresh reload clears all sessions (no persistent storage)

### Input Area
- **Textarea**: Auto-resizes up to 120px max height
- **Sticky Bottom**: Remains visible during scroll
- **Full Width**: 100% of chat container
- **Voice Input**: Microphone button for speech recognition (browser support)
- **Send Button**: Red play icon, executes `sendMessage()`

---

## Backend Processing

### Session Manager (Stateless)
- No persistent session storage (fresh start per reload until Vector DB integration)
- `visitCount = 1` per reload
- `lastVisit = Date.now()`
- All profile data reset on hard refresh

### Behavior Tracker
- Records interactions, query count, topic frequency
- Triggers cross-sell opportunities when thresholds met
- Calculates engagement score: `(queryCount × 5) + (duration × 3) + 20`

### Live Data Service
- Async RSS feed aggregation from ET feeds (top stories, markets, wealth, tech)
- Fallback data if feeds unavailable (sample headlines)
- Cache TTL: 10 minutes

---

## Key Calculations & Formulas

### Investable Surplus
```javascript
Monthly Income = Annual Income / 12
Monthly Expenses = User Input (₹)
Surplus = Max(0, Monthly Income − Expenses)
```

### PAIL Profile Depth
```javascript
Fields Tracked = [name, goal, risk, income, monthlyExpenses, horizon, assets, hasInsurance, hasNPS, ageRange]
Filled = Count of non-null fields
PAIL Depth = Min(95, Round(Filled / 10 × 95))
```

### SIP Allocation by Risk
- **Conservative**: 25% equity, 60% debt, 15% gold, 0% international
- **Moderate**: 50% equity, 30% debt, 10% gold, 10% international
- **Aggressive**: 65% equity, 15% debt, 5% gold, 15% international

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla HTML5, CSS3 (dark theme), JavaScript ES6+ |
| **State Management** | Client-side DataFabric class (no Redux/Vuex) |
| **NLP Engine** | Custom ContextualNLPEngine with regex-based pattern matching |
| **Data Fetching** | RSS via allOrigins proxy, fetch API with 6s timeout |
| **Testing** | Node.js assertion-based regression suite (no Jest/Mocha) |
| **Deployment** | Static files (`main.html`, `engine.js`, `styles.css`) + `package.json` |

---

## Testing & Quality Assurance

### Regression Test Suite
```bash
npm test
```
- Validates profile rendering, handler presence, metric updates
- Checks drawer manager initialization, agent switching logic
- Verifies SIP roadmap fund allocation formulas
- No external API mocking required

### Error Checking
```bash
# No errors logged in engine.js, main.html, styles.css
```

---

## File Structure

```
g:\et-code\
├── main.html                    # App shell, all UI panes
├── engine.js                    # Core logic (1438 lines)
├── styles.css                   # Dark theme styling
├── package.json                 # Test script & metadata
├── tests/
│   └── profile-regression.test.js
└── README.md                    # This file
```

---

## Setup & Running

### Local Development
1. Open `main.html` in a modern browser (Chrome 90+, Firefox 88+, Safari 14+)
2. No build step required (vanilla JS)
3. Runs fully client-side (responsive to offline after first load)

### Running Tests
```bash
cd g:\et-code
npm install          # Install test dependencies (if needed)
npm test             # Run regression suite
```

### Hosting
- Deploy `main.html`, `engine.js`, `styles.css` to static host (Netlify, Vercel, S3)
- CORS-enabled RSS feeds via allOrigins proxy (no custom backend needed)

---

## Known Limitations & Future Roadmap

### Current Limitations
- Session data not persisted (fresh profile on reload)
- No real-time price feeds (static fund returns)
- RSS feeds require proxy due to CORS (slight latency)
- Single browser tab state (no cross-tab sync)

### Future Enhancements
- **Vector DB Integration**: Persistent identity graph + conversation history
- **Real-Time Market Data**: Live fund NAVs, stock quotes, commodity prices
- **Mobile App**: React Native wrapper for iOS/Android
- **Multi-Language Support**: Hindi, Tamil, Tamil, Marathi versions
- **Advanced Analytics**: Risk profiling algorithms, portfolio backtesting
- **Partner API**: Credit card applications, insurance policy binding

---

## FAQ

**Q: What is PAIL?**  
A: **Persistent Adaptive Intelligence Layer** — A proprietary profile depth system (0–95%) that personalizes all recommendations based on financial data completeness.

**Q: Can I change my profile after creation?**  
A: Yes. Access the profile drawer (click avatar icon), scroll to "Human-in-Loop" section, edit any field, and click "Apply & Repersonalize."

**Q: Will my data be saved if I close the browser?**  
A: No. Data is reset on reload (fresh start until Vector DB integration). This ensures clean profiling sessions.

**Q: How are funds recommended?**  
A: By your PAIL profile (risk, age, income, horizon). Conservative profiles see stable funds (8–16% FY25); Aggressive see growth funds (24–38% FY25).

**Q: Can I switch agents mid-chat?**  
A: Yes. Click any agent tab. Your prior conversation is preserved and shown when you return to that agent.

**Q: Why don't Forex queries route correctly?**  
A: Fixed. Forex keyword now routes to ET Markets > Forex section automatically.

---

## Support & Feedback

For issues, feature requests, or questions:
- Check ETEcosystemKB for available links and sections
- Review NLP engine intent patterns for query suggestions
- Test with demo prompts provided on agent entry
- Validate profile depth is minimum 50% for full feature set

---

**Last Updated**: March 29, 2026  
**Version**: PAIL v8.0  
**Status**: Production Ready
