---
title: "Building ara-hunter: An ML-Powered Stock Screener for the Indonesian Market"
description: "How I built a full-stack stock screener that scans 900+ IDX stocks through a two-stage ML ranking pipeline to find breakout candidates — with hand-coded candlestick charts, Nuxt state scraping, and an AI-like reasoning layer."
date: 2026-06-03T09:00:00.000Z
readingTime: "9 min"
permalink: "ara-hunter"
tags: ["Engineering", "Python", "Machine Learning", "FastAPI", "Next.js"]
---

If you've ever traded stocks on the Indonesian Stock Exchange (IDX), you've probably heard traders talk about **ARA** — *Auto Rejection Auction*. It's the price ceiling at which the exchange's auto-rejection mechanism kicks in and halts trading for the day. Hitting ARA is the dream: a stock opens cheap and closes locked at the daily limit up. Catching one before it breaks out is the difference between a good day and a great one.

I got tired of staring at my brokerage app, manually scrolling through 900+ tickers, trying to spot the ones that were "coiling up." So I built **ara-hunter** — a full-stack stock screener that does it for me, with a twist: it doesn't just rank stocks by traditional indicators. A two-stage ML pipeline takes the top candidates and predicts the *probability* of an ARA hit within the next 5 trading days.

Here's how it came together.

## The Idea

Most free screeners out there will let you filter by RSI, MACD, or volume spikes. Useful, but shallow. They tell you what a stock is doing *right now*, not whether it has the *shape* of something about to break out. I wanted something that could combine multiple weak signals into a single "this one looks interesting" score, then layer a probabilistic model on top to say "this one is 73% likely to hit ARA in the next week."

That's the whole pitch. Find the candidates. Rank them. Predict the winners.

## Stack

I went with what I know best, leaning into a Python/TypeScript split that's pretty standard for data-heavy web apps:

**Backend**
- **FastAPI** for the API layer (with background tasks for scans)
- **SQLAlchemy 2.0** as the ORM
- **SQLite** with **WAL mode** for concurrent reads during active scans
- **yfinance** for OHLCV data
- **curl-cffi** for scraping the IDX website (more on that later)
- **scikit-learn** for the Random Forest classifier
- **pandas / numpy** for the data plumbing

**Frontend**
- **Next.js 15** (App Router)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (CSS-first configuration, no `tailwind.config.js`)
- **TanStack Query v5** for data fetching
- **Recharts** for most charts
- A **hand-coded SVG candlestick chart** for the price detail view (we'll get there)

One `dev.sh` script launches both services. The dev experience is the feature.

## The Scanning Engine

When you click "Run Scan" on the dashboard, the backend spins up a background task that walks through every ticker in the IDX universe. For each one, it:

1. Pulls ~3 months of OHLCV data from Yahoo Finance
2. Computes **15 technical indicators** — RSI, Bollinger Bands, MACD, ATR, 1d/5d/20d price changes, volume ratio, consecutive up days, the works
3. Determines the **ARA limit** based on the stock's board (Utama/Pengembangan = 25%, Akselerasi = 35%)
4. Calculates a **5-dimension score** with these weights:

| Dimension | Weight | What it captures |
|-----------|--------|------------------|
| Momentum | 30% | 1d/5d/20d price acceleration |
| Technical | 25% | RSI + Bollinger + MACD alignment |
| Volume | 20% | Volume ratio vs. 20d average |
| Proximity | 15% | How close the price is to the ARA ceiling |
| Consistency | 10% | Pattern of consecutive green days |

The scorer is hand-tuned. I tried to keep it interpretable — every number maps to a thing you can see on a chart.

A single scan of 900+ stocks takes a few minutes. The frontend polls every 3 seconds and the dashboard shows a live progress bar. Results stream in as they come, so the top candidates appear within the first 30 seconds or so.

## The ML Layer

Here's the part I'm most proud of. A traditional screener will rank every stock by its composite score. That's fine, but it's still a linear combination of features. It can't capture *interactions* between them — like the fact that a high RSI is bullish *unless* volume is also drying up, in which case it's a divergence.

So I added a second pass.

After the initial scoring, the engine takes the **top 50 candidates** and runs them through a **Random Forest classifier** trained on historical data. The model predicts the probability that each stock will hit ARA within the next 5 trading days.

The feature engineering is where the magic lives. I went beyond the raw indicators and added cross-features:

- `acceleration` — 1d price change divided by 5d change (momentum *inflection*)
- `vol_x_mom` — volume ratio multiplied by momentum score
- `rsi_sq` — RSI squared, which amplifies the "approaching overbought" signal
- `bb_x_rsi` — Bollinger Band position crossed with RSI
- `up_ratio` — fraction of green days in the last 20 sessions
- `room_pct` — remaining upside before hitting the ARA ceiling
- `price_tier` — bucketed price range (sub-100, 100-500, 500-2000, 2000+)
- `log_price` — log-transformed price

That's **22 features total** going into the model. The training script uses **time-series cross-validation** (no future peeking) over 52 weeks of walk-forward backtests. The headline numbers from the backtest:

- **Precision@1 = 70.6%** — when the model ranks a stock #1, it hits ARA 70% of the time
- **ML prob ≥ 0.6 hit rate = 66.2%** — for any stock the model flags as high-confidence, ~2/3 actually break out

Not hedge-fund numbers, but a real edge over random chance.

## Scraping the IDX Universe

This was the part that almost killed me. I needed a canonical list of all 900+ IDX-listed stocks with their tickers, company names, sectors, and board types (which determine the ARA limit).

The IDX publishes this data, but they don't have a public API. Their website is a Nuxt.js app, which means the stock universe is hydrated into the page via `window.__NUXT__` state. I wrote a small parser that pulls the HTML, extracts the embedded state object with regex, and pulls out the fields I need:

```python
# The Nuxt state is embedded as JSON in the HTML
# I parse it to extract KodeEmiten, NamaEmiten, TanggalPencatatan, JenisPapan
```

Two gotchas:
1. **TLS fingerprinting** — naive `requests` gets blocked. I switched to `curl-cffi` with `chrome124` impersonation. Problem solved.
2. **Cache fallback** — if the scrape fails, the app falls back to a cached `stocks.json` file. The universe doesn't change often, so a stale cache is fine for weeks.

## Hand-Coded Candlestick Chart

I tried every popular React chart library for the price detail view. Most either:
- Don't render candlesticks natively (Recharts, Chart.js)
- Look generic
- Bloat the bundle with 100KB+ of dependencies

So I built one from scratch. ~150 lines of TSX, hand-rolled SVG, no library.

The interesting parts:
- `ResizeObserver` for responsive resize
- Memoized candle objects (don't recompute on every render)
- Manual Y-axis interpolation from `[high, low]` price range to SVG coordinates
- Individual `<rect>` and `<line>` elements per candle
- A hover tooltip that snaps to the nearest candle

The whole thing is wrapped in `React.memo` and the coordinate math is `useMemo`'d. Renders 200+ candles in <16ms on a MacBook Air. Bundle cost: ~3KB.

Was it worth it over pulling in `lightweight-charts`? Yeah. The brutalist aesthetic of the rest of the app doesn't play well with the TradingView look, and I had full control over every visual choice.

## The "Reasoning" Layer

Numbers are great. Context is better. When the model says "73% probability of ARA hit in 5 days," that means nothing to most retail traders. So I built a **natural-language explainability layer** on top.

For each stock, the frontend renders a "Rating Analysis" card with three sections:

1. **ML Confidence** — the probability badge, front and center
2. **Strengths & Concerns** — each score dimension translated into a sentence: *"RSI at 62 — in the bullish sweet spot with room to run"* or *"Volume ratio at 0.4x — conviction is missing"*
3. **Summary** — a generated paragraph that contextualizes the ML score against the traditional scores

It's rule-based, not LLM-driven. Each dimension score has thresholds that map to specific phrasings. The output is deterministic and instant — no API calls, no hallucination risk.

> "Stock scored 78/100 with ML probability 0.71. Strong momentum across 1d, 5d, and 20d windows. Volume is confirming the move. RSI is approaching overbought but hasn't crossed yet. Watch for intraday volume spike as the trigger."

That kind of output. Plain English, anchored to the actual numbers, no vibes.

## Real-Time Scanning UX

The scan UX was the most fun to design. A scan takes 2–5 minutes — too long to block the UI, too short to make the user come back later. Here's what I landed on:

- **Background task** in FastAPI with a `ScreeningSession` row tracking status
- **Polling every 3 seconds** from the dashboard via TanStack Query's `refetchInterval`
- **Incremental results** — as soon as the first 50 stocks are scanned, they show up in the UI. The user doesn't have to wait for the full universe
- **Live progress bar** with `scanned / total` count
- **WAL-mode SQLite** so the backend can write results while the frontend reads them concurrently
- **Stale session cleanup** — if the server restarts mid-scan, the lifespan handler marks orphaned "running" sessions as "failed"

The `placeholderData: (prev) => prev` pattern in TanStack Query v5 is clutch for this. Old data stays on screen while new data fetches. No flicker, no "Loading…" flash on every poll.

## What I'd Improve

A few things I'm not happy with yet:

- **CORS is wide open** (`allow_origins=["*"]`). Fine for localhost dev, but I'd tighten this before deploying
- **No auth**. Anyone with the URL can trigger a scan, which hammers Yahoo Finance. I should add a simple API key
- **Backtest uses simple walk-forward** — I'd love to add bootstrap confidence intervals
- **The ML model is retrained manually**. No automated retraining pipeline. Should be a cron job at minimum
- **Mobile experience is functional but not great** — the stock detail page is dense

## Closing Thoughts

Building ara-hunter end-to-end — from the data pipeline to the ML model to the explainability layer to the brutalist UI — was a reminder that the most valuable engineering skill is **finishing**. Most of these components exist in isolation somewhere on the internet. Gluing them together into something that actually works at 8am while I'm drinking coffee and watching for breakouts — that's the hard part.

If you trade IDX and want to try it, the code is [on my GitHub](https://github.com/naofalleoagusta/ara-hunter). The dev script gets you up and running in two commands. Just don't blame me if you YOLO into a stock because the model said 73% and it goes sideways instead. 📉

Naofal signing out.
