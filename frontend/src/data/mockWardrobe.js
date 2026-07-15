// Mock "owned" wardrobe — stands in for what would come from
// GET /api/clothes once the real backend + Cloudinary uploads are wired up.

export const initialWardrobe = [
  { id: 1, name: "White Oxford Shirt", category: "top", color: "white", season: ["fall", "spring"], tags: ["formal", "work"], swatch: "#FFFDF8" },
  { id: 2, name: "Blue Slim Jeans", category: "bottom", color: "blue", season: ["all"], tags: ["casual", "everyday"], swatch: "#5B7CA3" },
  { id: 3, name: "Black Ankle Boots", category: "shoes", color: "black", season: ["fall", "winter"], tags: ["everyday"], swatch: "#232323" },
  { id: 4, name: "Yellow Cardigan", category: "top", color: "yellow", season: ["fall", "spring"], tags: ["cozy", "preppy"], swatch: "#F0DE7A" },
  { id: 5, name: "Plaid Mini Skirt", category: "bottom", color: "red", season: ["fall"], tags: ["preppy", "y2k"], swatch: "#B94A48" },
  { id: 6, name: "White Sneakers", category: "shoes", color: "white", season: ["all"], tags: ["casual", "everyday"], swatch: "#F4F4F0" },
  { id: 7, name: "Cream Knit Sweater", category: "top", color: "cream", season: ["winter", "fall"], tags: ["cozy"], swatch: "#EFE6CF" },
  { id: 8, name: "Black Trousers", category: "bottom", color: "black", season: ["all"], tags: ["office", "formal"], swatch: "#1D1D1D" },
  { id: 9, name: "Denim Jacket", category: "outerwear", color: "blue", season: ["spring", "fall"], tags: ["casual"], swatch: "#7A93B5" },
  { id: 10, name: "Gold Hoop Earrings", category: "accessory", color: "gold", season: ["all"], tags: ["everyday", "dressy"], swatch: "#D9B24C" },
];
