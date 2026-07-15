// Mock dataset of 40 secondhand thrift listings — mirrors the FitFindr
// search_listings tool's dataset. Swap for a real ThriftListing table
// once this is wired to the backend.

const swatches = {
  blue: "#5B7CA3", black: "#232323", red: "#B94A48", brown: "#8A5A3C",
  gold: "#D9B24C", navy: "#243A5E", champagne: "#E7D9B0", white: "#F4F4F0",
  tan: "#C7A97A", cream: "#EFE6CF", olive: "#767A4B", gray: "#9A968C",
  multi: "#C9B8F0", beige: "#D8CBB0", pink: "#F2A7BB", khaki: "#B7AE85",
  silver: "#C7C7C7", nude: "#D9B99A", floral: "#E3A6B0", "light wash": "#A9C0D9",
};

export const listings = [
  { id: 1, title: "Cropped Denim Jacket", category: "outerwear", size: "S", price: 22, color: "blue", tags: ["casual", "spring"] },
  { id: 2, title: "Vintage Band Tee", category: "top", size: "M", price: 15, color: "black", tags: ["casual", "grunge"] },
  { id: 3, title: "Pleated Plaid Skirt", category: "bottom", size: "S", price: 18, color: "red", tags: ["preppy", "fall"] },
  { id: 4, title: "Chunky Loafers", category: "shoes", size: "8", price: 30, color: "brown", tags: ["preppy", "office"] },
  { id: 5, title: "Gold Hoop Earrings", category: "accessory", size: "OS", price: 8, color: "gold", tags: ["dressy", "everyday"] },
  { id: 6, title: "Wool Peacoat", category: "outerwear", size: "M", price: 45, color: "navy", tags: ["winter", "formal"] },
  { id: 7, title: "Silk Slip Dress", category: "top", size: "S", price: 25, color: "champagne", tags: ["dressy", "night out"] },
  { id: 8, title: "Straight Leg Jeans", category: "bottom", size: "M", price: 20, color: "light wash", tags: ["casual", "everyday"] },
  { id: 9, title: "Platform Sneakers", category: "shoes", size: "7", price: 28, color: "white", tags: ["casual", "streetwear"] },
  { id: 10, title: "Structured Tote Bag", category: "accessory", size: "OS", price: 16, color: "tan", tags: ["office", "everyday"] },
  { id: 11, title: "Cable Knit Sweater", category: "top", size: "L", price: 19, color: "cream", tags: ["fall", "cozy"] },
  { id: 12, title: "Corduroy Trousers", category: "bottom", size: "M", price: 24, color: "olive", tags: ["fall", "casual"] },
  { id: 13, title: "Ankle Boots", category: "shoes", size: "8", price: 32, color: "black", tags: ["fall", "everyday"] },
  { id: 14, title: "Beaded Choker", category: "accessory", size: "OS", price: 6, color: "multi", tags: ["y2k", "night out"] },
  { id: 15, title: "Leather Trench Coat", category: "outerwear", size: "M", price: 55, color: "black", tags: ["formal", "fall"] },
  { id: 16, title: "Graphic Crop Top", category: "top", size: "S", price: 12, color: "white", tags: ["casual", "summer"] },
  { id: 17, title: "Denim Shorts", category: "bottom", size: "S", price: 14, color: "blue", tags: ["summer", "casual"] },
  { id: 18, title: "Strappy Sandals", category: "shoes", size: "7", price: 20, color: "gold", tags: ["summer", "dressy"] },
  { id: 19, title: "Beanie Hat", category: "accessory", size: "OS", price: 7, color: "gray", tags: ["winter", "casual"] },
  { id: 20, title: "Puffer Jacket", category: "outerwear", size: "L", price: 38, color: "red", tags: ["winter", "streetwear"] },
  { id: 21, title: "Button-Up Blouse", category: "top", size: "M", price: 17, color: "white", tags: ["office", "preppy"] },
  { id: 22, title: "High-Waisted Trousers", category: "bottom", size: "M", price: 22, color: "black", tags: ["office", "formal"] },
  { id: 23, title: "Block Heels", category: "shoes", size: "8", price: 26, color: "nude", tags: ["office", "dressy"] },
  { id: 24, title: "Leather Belt", category: "accessory", size: "OS", price: 9, color: "brown", tags: ["everyday", "office"] },
  { id: 25, title: "Oversized Blazer", category: "outerwear", size: "M", price: 30, color: "beige", tags: ["office", "preppy"] },
  { id: 26, title: "Ribbed Tank Top", category: "top", size: "S", price: 8, color: "black", tags: ["summer", "everyday"] },
  { id: 27, title: "Flowy Maxi Skirt", category: "bottom", size: "L", price: 21, color: "floral", tags: ["summer", "boho"] },
  { id: 28, title: "Canvas Sneakers", category: "shoes", size: "9", price: 18, color: "white", tags: ["casual", "everyday"] },
  { id: 29, title: "Statement Necklace", category: "accessory", size: "OS", price: 11, color: "silver", tags: ["dressy", "night out"] },
  { id: 30, title: "Denim Overalls", category: "bottom", size: "M", price: 27, color: "blue", tags: ["casual", "y2k"] },
  { id: 31, title: "Cashmere Cardigan", category: "top", size: "S", price: 33, color: "pink", tags: ["fall", "cozy"] },
  { id: 32, title: "Combat Boots", category: "shoes", size: "8", price: 34, color: "black", tags: ["grunge", "fall"] },
  { id: 33, title: "Bucket Hat", category: "accessory", size: "OS", price: 10, color: "khaki", tags: ["summer", "streetwear"] },
  { id: 34, title: "Faux Fur Coat", category: "outerwear", size: "L", price: 42, color: "cream", tags: ["winter", "dressy"] },
  { id: 35, title: "Athletic Leggings", category: "bottom", size: "M", price: 13, color: "black", tags: ["athleisure", "everyday"] },
  { id: 36, title: "Oversized Hoodie", category: "top", size: "L", price: 16, color: "gray", tags: ["casual", "athleisure"] },
  { id: 37, title: "Retro Sunglasses", category: "accessory", size: "OS", price: 9, color: "brown", tags: ["summer", "y2k"] },
  { id: 38, title: "Mary Jane Flats", category: "shoes", size: "7", price: 23, color: "black", tags: ["preppy", "office"] },
  { id: 39, title: "Utility Cargo Pants", category: "bottom", size: "M", price: 25, color: "olive", tags: ["streetwear", "casual"] },
  { id: 40, title: "Satin Scrunchie Set", category: "accessory", size: "OS", price: 5, color: "multi", tags: ["everyday", "y2k"] },
].map((item) => ({ ...item, swatch: swatches[item.color] || "#C9B8F0" }));

export const CATEGORIES = ["top", "bottom", "shoes", "accessory", "outerwear"];
