const { searchListings } = require("../tools/searchListings");
const { suggestOutfit } = require("../tools/suggestOutfit");
const { createFitCard } = require("../tools/createFitCard");
const { listings } = require("../data/listings");

/**
 * Very lightweight "does the prompt imply the user needs something they
 * might not own" check. Good enough for a project like this — swap for a
 * classifier or a cheap LLM call later if you want it smarter.
 */
function extractSearchHint(occasion) {
  const lower = occasion.toLowerCase();
  const keywords = ["jacket", "coat", "dress", "boots", "shoes", "sweater", "skirt", "bag", "heels"];
  const found = keywords.find((k) => lower.includes(k));
  return found || null;
}

/**
 * The main agent orchestration loop for outfit generation.
 * Runs up to 3 tools in sequence:
 *   1. search_listings  (conditional — only if the prompt hints at a gap)
 *   2. suggest_outfit
 *   3. create_fit_card
 *
 * If search_listings is triggered but returns nothing, the agent stops
 * early and returns a message telling the user what to adjust, instead
 * of calling suggest_outfit with empty/junk input.
 *
 * @param {Object} params
 * @param {Array} params.ownedItems - user's ClothingItem records from the DB
 * @param {string} params.occasion  - natural language prompt, e.g. "job interview downtown"
 * @param {Object} [params.searchFilters] - optional explicit filters { size, maxPrice }
 * @returns {Object} either a stopped-early response or a full outfit + fit card
 */
async function runOutfitAgent({ ownedItems, occasion, searchFilters = {} }) {
  const steps = [];
  let listingItems = [];

  // Step 1 — conditionally search listings
  const hint = extractSearchHint(occasion);
  if (hint || searchFilters.size || searchFilters.maxPrice) {
    const results = searchListings({
      keyword: hint,
      size: searchFilters.size,
      maxPrice: searchFilters.maxPrice,
    });
    steps.push({ tool: "search_listings", input: { keyword: hint, ...searchFilters }, resultCount: results.length });

    if (results.length === 0) {
      // Conditional early stop — don't call suggest_outfit with nothing useful
      return {
        stopped: true,
        stoppedAt: "search_listings",
        message: `I couldn't find any secondhand ${hint || "items"} matching your filters. Try widening your price range or size, or drop the thrift search and I'll work with just your wardrobe.`,
        steps,
      };
    }
    listingItems = results;
  }

  // Step 2 — suggest_outfit using owned items + any matched listings
  let outfit;
  try {
    outfit = await suggestOutfit({ ownedItems, listingItems, occasion });
    steps.push({ tool: "suggest_outfit", resultSummary: outfit.explanation });
  } catch (err) {
    return {
      stopped: true,
      stoppedAt: "suggest_outfit",
      message: "Something went wrong generating your outfit. Try rephrasing your occasion.",
      error: err.message,
      steps,
    };
  }

  // Resolve the actual item objects for the fit card caption
  const chosenOwned = ownedItems.filter((i) => outfit.selectedOwnedItemIds?.includes(i.id));
  const chosenListings = listings.filter((l) => outfit.selectedListingIds?.includes(l.id));
  const allChosenItems = [...chosenOwned, ...chosenListings];

  // Step 3 — create_fit_card
  let fitCard;
  try {
    fitCard = await createFitCard({ outfitItems: allChosenItems, occasion });
    steps.push({ tool: "create_fit_card" });
  } catch (err) {
    // Non-fatal — outfit is still useful without a caption
    fitCard = { caption: null, hashtags: [] };
    steps.push({ tool: "create_fit_card", error: err.message });
  }

  return {
    stopped: false,
    occasion,
    ownedItems: chosenOwned,
    listingItems: chosenListings,
    explanation: outfit.explanation,
    stylingTips: outfit.stylingTips,
    fitCard,
    steps, // useful for debugging / showing "how the agent thought" in a demo
  };
}

module.exports = { runOutfitAgent };
