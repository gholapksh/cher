// Frontend-only simulation of the FitFindr agent loop, so the UI is fully
// clickable without a live backend/API key. Swap `runOutfitAgent` for a
// real POST /api/outfits/generate call once your Express + Groq backend
// (see the server scaffold) is running.

import { listings } from "../data/mockListings";

const SEARCH_KEYWORDS = ["jacket", "coat", "dress", "boots", "shoes", "sweater", "skirt", "bag", "heels", "blazer"];

function extractSearchHint(occasion) {
  const lower = occasion.toLowerCase();
  return SEARCH_KEYWORDS.find((k) => lower.includes(k)) || null;
}

// Tool 1: search_listings
function searchListings({ keyword, size, maxPrice }) {
  let results = listings;
  if (keyword) {
    const kw = keyword.toLowerCase();
    results = results.filter((item) =>
      [item.title, item.category, item.color, ...item.tags].join(" ").toLowerCase().includes(kw)
    );
  }
  if (size) results = results.filter((item) => item.size.toLowerCase() === size.toLowerCase());
  if (typeof maxPrice === "number") results = results.filter((item) => item.price <= maxPrice);
  return results;
}

// Tool 2: suggest_outfit — mocked "LLM" logic: picks items whose tags
// loosely overlap the occasion text, mixing owned + thrifted candidates.
function suggestOutfit({ ownedItems, listingItems, occasion }) {
  const words = occasion.toLowerCase();

  const score = (tags) =>
    tags.reduce((acc, t) => acc + (words.includes(t) ? 2 : 0), 0);

  const byCategory = (pool) => {
    const grouped = {};
    pool.forEach((item) => {
      const cat = item.category === "outerwear" ? "top" : item.category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    return grouped;
  };

  const ownedByCat = byCategory(ownedItems);
  const listingByCat = byCategory(listingItems);

  const pickBest = (cat) => {
    const ownedPool = ownedByCat[cat] || [];
    const listingPool = listingByCat[cat] || [];
    const ranked = [...ownedPool.map((i) => ({ ...i, _source: "owned" })), ...listingPool.map((i) => ({ ...i, _source: "listing" }))]
      .sort((a, b) => score(b.tags) - score(a.tags));
    return ranked[0] || ownedPool[0] || listingPool[0] || null;
  };

  const chosen = ["top", "bottom", "shoes"].map(pickBest).filter(Boolean);

  const selectedOwnedItemIds = chosen.filter((c) => c._source === "owned").map((c) => c.id);
  const selectedListingIds = chosen.filter((c) => c._source === "listing").map((c) => c.id);

  const usedThrift = selectedListingIds.length > 0;
  const explanation = usedThrift
    ? `Built this around "${occasion}" — mixed in a thrifted piece to fill a gap your closet didn't cover, and paired it with what you already own.`
    : `Built this around "${occasion}" — everything here is already in your closet, no shopping needed.`;

  const stylingTips = [
    "Roll up sleeves or cuffs for a more relaxed, put-together look.",
    "Add one accessory from your closet to tie the colors together.",
    usedThrift ? "Try the thrifted piece on with something you already trust before committing." : "Rotate accessories to get a few different looks out of this same base outfit.",
  ];

  return { selectedOwnedItemIds, selectedListingIds, explanation, stylingTips };
}

// Tool 3: create_fit_card
function createFitCard({ outfitItems, occasion }) {
  const names = outfitItems.map((i) => i.name || i.title);
  const caption = `as if i wasn't already dressed for "${occasion}" 💛 (${names.slice(0, 2).join(" + ")}${names.length > 2 ? " + more" : ""})`;
  const hashtags = ["#OOTD", "#ThriftedFit", "#CHERstyle", "#SecondhandFirst", "#FitCheck"];
  return { caption, hashtags };
}

/**
 * Full agent orchestration — mirrors the real backend's runOutfitAgent().
 * Includes the conditional early-stop: if a search is triggered by the
 * prompt but returns nothing, we stop before calling suggest_outfit.
 *
 * Async + step callbacks so the UI can show the agent "thinking" through
 * each tool, matching FitFindr's sequential tool orchestration.
 */
export async function runOutfitAgent({ ownedItems, occasion, searchFilters = {}, onStep }) {
  const steps = [];
  const emit = (step) => { steps.push(step); onStep?.(step); };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const hint = extractSearchHint(occasion);
  let listingItems = [];

  if (hint || searchFilters.size || searchFilters.maxPrice) {
    await wait(500);
    const results = searchListings({ keyword: hint, ...searchFilters });
    emit({ tool: "search_listings", status: "done", detail: `${results.length} listing(s) found${hint ? ` for "${hint}"` : ""}` });

    if (results.length === 0) {
      return {
        stopped: true,
        stoppedAt: "search_listings",
        message: `No secondhand ${hint || "items"} matched your filters. Try a wider price range or size — or drop the thrift search and I'll style from just your closet.`,
        steps,
      };
    }
    listingItems = results;
  }

  await wait(700);
  const outfit = suggestOutfit({ ownedItems, listingItems, occasion });
  emit({ tool: "suggest_outfit", status: "done", detail: outfit.explanation });

  const chosenOwned = ownedItems.filter((i) => outfit.selectedOwnedItemIds.includes(i.id));
  const chosenListings = listings.filter((l) => outfit.selectedListingIds.includes(l.id));
  const allChosenItems = [...chosenOwned, ...chosenListings];

  await wait(500);
  const fitCard = createFitCard({ outfitItems: allChosenItems, occasion });
  emit({ tool: "create_fit_card", status: "done", detail: "Caption drafted" });

  return {
    stopped: false,
    occasion,
    ownedItems: chosenOwned,
    listingItems: chosenListings,
    explanation: outfit.explanation,
    stylingTips: outfit.stylingTips,
    fitCard,
    steps,
  };
}

export { searchListings };
