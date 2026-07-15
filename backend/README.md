# CHER. + FitFindr — Merged Outfit Agent

This folder contains the scaffolded backend pieces for merging FitFindr's
multi-tool agent into CHER's outfit generator.

## Setup

```bash
npm install groq-sdk express
```

Add to your `.env`:
```
GROQ_API_KEY=your_key_from_console.groq.com
```

## Files

- `data/listings.js` — mock dataset of 40 thrift listings (swap for a real
  Prisma `ThriftListing` model + DB table once you're past prototyping)
- `tools/searchListings.js` — Tool 1: filters listings by keyword/size/price
- `tools/suggestOutfit.js` — Tool 2: calls Groq (`llama-3.3-70b-versatile`)
  to build an outfit from owned wardrobe items + thrifted listings
- `tools/createFitCard.js` — Tool 3: generates a casual IG-style caption +
  hashtags for the finished outfit
- `agent/outfitAgent.js` — orchestrates the 3 tools in sequence, with the
  conditional early-stop: if `search_listings` is triggered by the prompt
  but returns zero results, the agent stops and tells the user what to
  adjust instead of calling `suggest_outfit` with junk input
- `routes/outfits.js` — Express routes: `GET /listings/search` (standalone,
  for the Thrift Search page) and `POST /outfits/generate` (runs the full agent)

## Wiring into your existing Express app

```js
// app.js / server.js
const outfitsRouter = require("./routes/outfits");
app.use("/api", outfitsRouter);
```

## How the agent decides to search listings

`extractSearchHint()` in `outfitAgent.js` does a simple keyword check
against the occasion prompt (e.g. "job interview" won't trigger a search,
but "need a jacket for a job interview" will, matching on "jacket").
This is intentionally simple for a class project — good enough to
demonstrate conditional tool orchestration without needing a classifier.
You can also pass `searchFilters: { size, maxPrice }` explicitly from the
frontend if you add manual filter controls to the generator page.

## Example request

```bash
curl -X POST http://localhost:3001/api/outfits/generate \
  -H "Content-Type: application/json" \
  -d '{
    "occasion": "need a jacket for a casual coffee date",
    "ownedItems": [
      { "id": 1, "name": "White Tee", "category": "top", "tags": ["casual"] },
      { "id": 2, "name": "Blue Jeans", "category": "bottom", "tags": ["casual"] }
    ],
    "searchFilters": { "maxPrice": 30 }
  }'
```

## Next steps

1. Replace `data/listings.js` with a real `ThriftListing` Prisma model once
   you seed real data
2. Wire `ownedItems` to actually pull from your `ClothingItem` table via
   `req.user.id` instead of the request body
3. Build the Fit Card React component (outfit collage + caption + share button)
4. Add the "found this on thrift ✦" badge to `ClothingCard` for listing items
