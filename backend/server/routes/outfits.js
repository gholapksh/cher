const express = require("express");
const router = express.Router();
const { runOutfitAgent } = require("../agent/outfitAgent");
const { searchListings } = require("../tools/searchListings");

// Standalone endpoint for the Thrift Search page (bypasses the agent, direct tool call)
router.get("/listings/search", (req, res) => {
  const { keyword, size, maxPrice } = req.query;
  const results = searchListings({
    keyword,
    size,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
  res.json({ results });
});

// Main outfit generation endpoint — runs the full 3-tool agent
router.post("/outfits/generate", async (req, res) => {
  const { occasion, searchFilters } = req.body;
  // req.user.id would come from your auth middleware — replace with real DB fetch
  const ownedItems = req.user?.clothingItems || req.body.ownedItems || [];

  if (!occasion || !occasion.trim()) {
    return res.status(400).json({ error: "occasion is required" });
  }
  if (ownedItems.length === 0) {
    return res.status(400).json({
      error: "Your wardrobe is empty — upload a few items first so I have something to work with.",
    });
  }

  try {
    const result = await runOutfitAgent({ ownedItems, occasion, searchFilters });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate outfit." });
  }
});

module.exports = router;
