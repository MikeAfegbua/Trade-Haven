# TradeHaven

**Reputation-weighted trading signals where your credibility compounds or decays based on provable performance — powered by [Ethos](https://ethos.network).**

[![Built for Ethos Vibeathon](https://img.shields.io/badge/Built%20for-Ethos%20Vibeathon-00C896)](https://ethos.network)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org)

## Overview

TradeHaven is a crypto trading signals platform that leverages Ethos reputation scores to create a trust-based ecosystem. Unlike traditional signal platforms where anyone can claim expertise, TradeHaven ties your visibility and credibility directly to your on-chain reputation and trading performance.

### Key Features

- **Reputation-Weighted Feed** — Signals are ranked by a combination of Ethos score, trader performance, and endorsement weight
- **Open Posting** — Anyone can post signals, but visibility is determined by your reputation
- **Endorsement System** — Traders with 1,200+ Ethos score can endorse signals, boosting their visibility
- **Verified Traders** — Traders with 1,400+ Ethos score receive a verified badge
- **Performance Tracking** — Win rates and trader scores are tracked and displayed publicly
- **Score Decay** — Inaccurate predictions cause your trader score to decay, ensuring accountability

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/MikeAfegbua/trade_haven.git
cd trade_haven

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with signal feed
│   ├── leaderboard/       # Trader leaderboard
│   ├── my-signals/        # User's posted signals
│   └── signal/[id]/       # Signal detail page
├── components/
│   ├── home/              # Hero, FAQ components
│   ├── layout/            # Header, Footer
│   ├── signals/           # Signal cards, feed, filters
│   └── wallet/            # Wallet connection components
├── lib/                   # Utilities and data
├── store/                 # Zustand stores
└── types/                 # TypeScript interfaces
```

## How It Works

1. **Connect Wallet** — Connect your wallet to access your Ethos reputation
2. **Post Signals** — Share your trading predictions with entry, target, and stop loss
3. **Build Reputation** — Accurate signals increase your trader score
4. **Get Endorsed** — High-reputation traders can endorse your signals
5. **Rise in Rankings** — Better reputation means higher visibility

## Ethos Integration

TradeHaven integrates with [Ethos Network](https://ethos.network) to:
- Fetch user reputation scores
- Verify trader credibility
- Weight signal visibility based on on-chain reputation
- Gate endorsement capabilities to established users

## Demo Wallets

The app includes demo wallets for testing:
- `powellruggedme` — High reputation (1,923 Ethos)
- `zachxbt` — High reputation (1,847 Ethos)
- `serpinxbt` — Mid-high reputation (1,562 Ethos)
- `0xGiwax` — Mid reputation (982 Ethos)
- `1st_Bernice` — Lower reputation (458 Ethos)
- `newbie_trader` — New user (320 Ethos)

## License

MIT

## Author

Built by [@shinobeme](https://x.com/shinobeme)

---

<p align="center">
  <sub>Built for the Ethos Vibeathon 2026</sub>
</p>
