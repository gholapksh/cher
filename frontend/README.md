# CHER. + FitFindr — Full Frontend

A complete, clickable React frontend for the merged CHER (AI outfit generator)
+ FitFindr (thrift-search agent) project. Butter-yellow, Clueless-inspired
design system, fully functional with mock data — no backend or API key
required to try it out.

## Run it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Start on the landing page, click **Get
Started** to "sign in" (mock auth, any email/password works), then explore
the sidebar: Wardrobe, Generate, Thrift Search, History, Profile.

## What's real vs. mocked

Everything is wired up and interactive — adding wardrobe items, deleting
them, filtering, generating outfits, saving history — but two things are
mocked so you don't need a backend to click through it:

- **`src/agent/mockAgent.js`** — client-side stand-in for the real 3-tool
  agent (`search_listings` → `suggest_outfit` → `create_fit_card`). It
  includes the same conditional early-stop logic as the real FitFindr/CHER
  backend: if a search is triggered by your occasion text (mentions
  "jacket," "boots," etc.) and turns up zero listings, it stops and tells
  you what to adjust instead of calling the next tool with nothing to work
  with.
- **`src/data/mockWardrobe.js`** and **`src/data/mockListings.js`** — stand
  in for the real `ClothingItem` and `ThriftListing` database tables.

## Wiring to the real backend

Once your Express + Groq backend (from the earlier server scaffold) is
running:

1. Replace the body of `runOutfitAgent()` in `src/agent/mockAgent.js` with
   a `fetch("/api/outfits/generate", { method: "POST", ... })` call
2. Replace `searchListings()` similarly with `fetch("/api/listings/search?...")`
3. Swap `initialWardrobe` for a real `GET /api/clothes` call in `App.jsx`
4. Wire `AuthPage`'s `onLogin` to your real `POST /api/auth/login`

The response shapes already match what the real backend returns
(`{ ownedItems, listingItems, explanation, stylingTips, fitCard, steps }`
and `{ stopped: true, stoppedAt, message }` for the early-stop case), so no
component code needs to change — just the data-fetching layer.

## Structure

```
src/
├── agent/mockAgent.js         # simulated 3-tool agent orchestration
├── data/
│   ├── mockWardrobe.js        # owned ClothingItems
│   └── mockListings.js        # 40 thrift listings (FitFindr dataset)
├── components/
│   ├── Sidebar.jsx            # nav: Wardrobe, Generate, Thrift, History, Profile
│   ├── ClothingCard.jsx       # renders owned items or thrift listings
│   ├── AgentSteps.jsx         # visualizes the agent's tool trace live
│   ├── OutfitResult.jsx       # generated outfit + styling tips
│   ├── FitCard.jsx            # shareable IG-style caption card
│   ├── TagBadge.jsx / Button.jsx / FilterBar.jsx / EmptyState.jsx / SkeletonCard.jsx
├── pages/
│   ├── LandingPage.jsx        # hero, how-it-works, agent explainer section
│   ├── AuthPage.jsx           # split yellow/white login-register
│   ├── WardrobePage.jsx
│   ├── UploadPage.jsx
│   ├── OutfitGeneratorPage.jsx  # the main agent flow UI
│   ├── ThriftSearchPage.jsx     # standalone search_listings UI
│   ├── OutfitHistoryPage.jsx
│   └── ProfilePage.jsx
└── styles/globals.css         # design tokens (colors, type, spacing, radius)
```

## Design system reference

| Token | Value |
|---|---|
| Butter Yellow | `#F5E642` |
| Cream | `#FFFDF0` |
| Soft Yellow | `#FAF3C0` |
| Warm Black | `#1A1A1A` |
| Blush Pink | `#F2A7BB` |
| Mint | `#A8E6CF` |
| Lavender | `#C9B8F0` |
| Deep Plum | `#3D1A47` |

Display font: Playfair Display · Section headings: DM Serif Display · Body: Lato
