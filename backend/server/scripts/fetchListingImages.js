// backend/server/scripts/fetchListingImages.js
//
// One-time (or re-runnable) script that fills in real photo URLs for every
// item in data/listings.js using the free Pexels API.
//
// Setup:
//   1. Get a free key: https://www.pexels.com/api/
//   2. Add PEXELS_API_KEY=your_key to backend/server/.env
//   3. From backend/server, run: node scripts/fetchListingImages.js
//
// It rewrites data/listings.js in place with imageUrl filled in for every
// item. Safe to re-run — it just overwrites imageUrl each time.

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const LISTINGS_PATH = path.join(__dirname, "..", "data", "listings.js");

if (!PEXELS_API_KEY) {
  console.error("Missing PEXELS_API_KEY in .env. Get one free at https://www.pexels.com/api/");
  process.exit(1);
}

// Simple delay so we don't blow through Pexels' rate limit (200 req/hr on free tier)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square`;
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  });

  if (!res.ok) {
    throw new Error(`Pexels API error (${res.status}) for query "${query}"`);
  }

  const data = await res.json();
  const photo = data.photos?.[0];
  return photo ? photo.src.medium : null;
}

async function main() {
  // Load the current listings array
  const { listings } = require(LISTINGS_PATH);

  console.log(`Fetching images for ${listings.length} listings...`);

  for (let i = 0; i < listings.length; i++) {
    const item = listings[i];
    // Query Pexels using the title (works better than category alone,
    // e.g. "Cropped Denim Jacket" finds a much more specific photo than "outerwear")
    const query = item.title;

    try {
      const imageUrl = await searchPexels(query);
      if (imageUrl) {
        item.imageUrl = imageUrl;
        console.log(`✓ [${i + 1}/${listings.length}] ${item.title}`);
      } else {
        console.log(`✗ [${i + 1}/${listings.length}] ${item.title} — no result, leaving blank`);
      }
    } catch (err) {
      console.log(`✗ [${i + 1}/${listings.length}] ${item.title} — ${err.message}`);
    }

    // Be polite to the free-tier rate limit
    await sleep(300);
  }

  // Rewrite listings.js with the updated array, preserving the file's shape
  const fileContents = `// Mock dataset of ${listings.length} secondhand thrift listings.
// imageUrl fields populated via scripts/fetchListingImages.js (Pexels API).
// Swap this out for a real DB table (Prisma model \`ThriftListing\`) once you're past prototyping.

const listings = ${JSON.stringify(listings, null, 2)};

module.exports = { listings };
`;

  fs.writeFileSync(LISTINGS_PATH, fileContents, "utf8");
  console.log("\nDone. data/listings.js has been updated with real photo URLs.");
}

main();
