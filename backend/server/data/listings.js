// Mock dataset of 40 secondhand thrift listings.
// imageUrl fields populated via scripts/fetchListingImages.js (Pexels API).
// Swap this out for a real DB table (Prisma model `ThriftListing`) once you're past prototyping.

const listings = [
  {
    "id": 1,
    "title": "Cropped Denim Jacket",
    "category": "outerwear",
    "size": "S",
    "price": 22,
    "color": "blue",
    "tags": [
      "casual",
      "spring"
    ],
    "imageUrl": "https://images.pexels.com/photos/6857690/pexels-photo-6857690.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 2,
    "title": "Vintage Band Tee",
    "category": "top",
    "size": "M",
    "price": 15,
    "color": "black",
    "tags": [
      "casual",
      "grunge"
    ],
    "imageUrl": "https://images.pexels.com/photos/7045173/pexels-photo-7045173.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 3,
    "title": "Pleated Plaid Skirt",
    "category": "bottom",
    "size": "S",
    "price": 18,
    "color": "red",
    "tags": [
      "preppy",
      "fall"
    ],
    "imageUrl": "https://images.pexels.com/photos/9322333/pexels-photo-9322333.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 4,
    "title": "Chunky Loafers",
    "category": "shoes",
    "size": "8",
    "price": 30,
    "color": "brown",
    "tags": [
      "preppy",
      "office"
    ],
    "imageUrl": "https://images.pexels.com/photos/27018339/pexels-photo-27018339.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 5,
    "title": "Gold Hoop Earrings",
    "category": "accessory",
    "size": "OS",
    "price": 8,
    "color": "gold",
    "tags": [
      "dressy",
      "everyday"
    ],
    "imageUrl": "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 6,
    "title": "Wool Peacoat",
    "category": "outerwear",
    "size": "M",
    "price": 45,
    "color": "navy",
    "tags": [
      "winter",
      "formal"
    ],
    "imageUrl": "https://images.pexels.com/photos/4398944/pexels-photo-4398944.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 7,
    "title": "Silk Slip Dress",
    "category": "top",
    "size": "S",
    "price": 25,
    "color": "champagne",
    "tags": [
      "dressy",
      "night out"
    ],
    "imageUrl": "https://images.pexels.com/photos/10003666/pexels-photo-10003666.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 8,
    "title": "Straight Leg Jeans",
    "category": "bottom",
    "size": "M",
    "price": 20,
    "color": "light wash",
    "tags": [
      "casual",
      "everyday"
    ],
    "imageUrl": "https://images.pexels.com/photos/29627103/pexels-photo-29627103.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 9,
    "title": "Platform Sneakers",
    "category": "shoes",
    "size": "7",
    "price": 28,
    "color": "white",
    "tags": [
      "casual",
      "streetwear"
    ],
    "imageUrl": "https://images.pexels.com/photos/27008322/pexels-photo-27008322.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 10,
    "title": "Structured Tote Bag",
    "category": "accessory",
    "size": "OS",
    "price": 16,
    "color": "tan",
    "tags": [
      "office",
      "everyday"
    ],
    "imageUrl": "https://images.pexels.com/photos/27100523/pexels-photo-27100523.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 11,
    "title": "Cable Knit Sweater",
    "category": "top",
    "size": "L",
    "price": 19,
    "color": "cream",
    "tags": [
      "fall",
      "cozy"
    ],
    "imageUrl": "https://images.pexels.com/photos/28994723/pexels-photo-28994723.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 12,
    "title": "Corduroy Trousers",
    "category": "bottom",
    "size": "M",
    "price": 24,
    "color": "olive",
    "tags": [
      "fall",
      "casual"
    ],
    "imageUrl": "https://images.pexels.com/photos/29501233/pexels-photo-29501233.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 13,
    "title": "Ankle Boots",
    "category": "shoes",
    "size": "8",
    "price": 32,
    "color": "black",
    "tags": [
      "fall",
      "everyday"
    ],
    "imageUrl": "https://images.pexels.com/photos/27256456/pexels-photo-27256456.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 14,
    "title": "Beaded Choker",
    "category": "accessory",
    "size": "OS",
    "price": 6,
    "color": "multi",
    "tags": [
      "y2k",
      "night out"
    ],
    "imageUrl": "https://images.pexels.com/photos/12377863/pexels-photo-12377863.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 15,
    "title": "Leather Trench Coat",
    "category": "outerwear",
    "size": "M",
    "price": 55,
    "color": "black",
    "tags": [
      "formal",
      "fall"
    ],
    "imageUrl": "https://images.pexels.com/photos/30951487/pexels-photo-30951487.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 16,
    "title": "Graphic Crop Top",
    "category": "top",
    "size": "S",
    "price": 12,
    "color": "white",
    "tags": [
      "casual",
      "summer"
    ],
    "imageUrl": "https://images.pexels.com/photos/6533467/pexels-photo-6533467.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 17,
    "title": "Denim Shorts",
    "category": "bottom",
    "size": "S",
    "price": 14,
    "color": "blue",
    "tags": [
      "summer",
      "casual"
    ],
    "imageUrl": "https://images.pexels.com/photos/2387307/pexels-photo-2387307.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 18,
    "title": "Strappy Sandals",
    "category": "shoes",
    "size": "7",
    "price": 20,
    "color": "gold",
    "tags": [
      "summer",
      "dressy"
    ],
    "imageUrl": "https://images.pexels.com/photos/26965818/pexels-photo-26965818.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 19,
    "title": "Beanie Hat",
    "category": "accessory",
    "size": "OS",
    "price": 7,
    "color": "gray",
    "tags": [
      "winter",
      "casual"
    ],
    "imageUrl": "https://images.pexels.com/photos/35525638/pexels-photo-35525638.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 20,
    "title": "Puffer Jacket",
    "category": "outerwear",
    "size": "L",
    "price": 38,
    "color": "red",
    "tags": [
      "winter",
      "streetwear"
    ],
    "imageUrl": "https://images.pexels.com/photos/20100588/pexels-photo-20100588.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 21,
    "title": "Button-Up Blouse",
    "category": "top",
    "size": "M",
    "price": 17,
    "color": "white",
    "tags": [
      "office",
      "preppy"
    ],
    "imageUrl": "https://images.pexels.com/photos/9322334/pexels-photo-9322334.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 22,
    "title": "High-Waisted Trousers",
    "category": "bottom",
    "size": "M",
    "price": 22,
    "color": "black",
    "tags": [
      "office",
      "formal"
    ],
    "imageUrl": "https://images.pexels.com/photos/29242373/pexels-photo-29242373.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 23,
    "title": "Block Heels",
    "category": "shoes",
    "size": "8",
    "price": 26,
    "color": "nude",
    "tags": [
      "office",
      "dressy"
    ],
    "imageUrl": "https://images.pexels.com/photos/27063075/pexels-photo-27063075.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 24,
    "title": "Leather Belt",
    "category": "accessory",
    "size": "OS",
    "price": 9,
    "color": "brown",
    "tags": [
      "everyday",
      "office"
    ],
    "imageUrl": "https://images.pexels.com/photos/4428388/pexels-photo-4428388.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 25,
    "title": "Oversized Blazer",
    "category": "outerwear",
    "size": "M",
    "price": 30,
    "color": "beige",
    "tags": [
      "office",
      "preppy"
    ],
    "imageUrl": "https://images.pexels.com/photos/5432169/pexels-photo-5432169.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 26,
    "title": "Ribbed Tank Top",
    "category": "top",
    "size": "S",
    "price": 8,
    "color": "black",
    "tags": [
      "summer",
      "everyday"
    ],
    "imageUrl": "https://images.pexels.com/photos/19279541/pexels-photo-19279541.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 27,
    "title": "Flowy Maxi Skirt",
    "category": "bottom",
    "size": "L",
    "price": 21,
    "color": "floral",
    "tags": [
      "summer",
      "boho"
    ],
    "imageUrl": "https://images.pexels.com/photos/12454042/pexels-photo-12454042.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 28,
    "title": "Canvas Sneakers",
    "category": "shoes",
    "size": "9",
    "price": 18,
    "color": "white",
    "tags": [
      "casual",
      "everyday"
    ],
    "imageUrl": "https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 29,
    "title": "Statement Necklace",
    "category": "accessory",
    "size": "OS",
    "price": 11,
    "color": "silver",
    "tags": [
      "dressy",
      "night out"
    ],
    "imageUrl": "https://images.pexels.com/photos/20159588/pexels-photo-20159588.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 30,
    "title": "Denim Overalls",
    "category": "bottom",
    "size": "M",
    "price": 27,
    "color": "blue",
    "tags": [
      "casual",
      "y2k"
    ],
    "imageUrl": "https://images.pexels.com/photos/14647303/pexels-photo-14647303.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 31,
    "title": "Cashmere Cardigan",
    "category": "top",
    "size": "S",
    "price": 33,
    "color": "pink",
    "tags": [
      "fall",
      "cozy"
    ],
    "imageUrl": "https://images.pexels.com/photos/9860463/pexels-photo-9860463.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 32,
    "title": "Combat Boots",
    "category": "shoes",
    "size": "8",
    "price": 34,
    "color": "black",
    "tags": [
      "grunge",
      "fall"
    ],
    "imageUrl": "https://images.pexels.com/photos/26732212/pexels-photo-26732212.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 33,
    "title": "Bucket Hat",
    "category": "accessory",
    "size": "OS",
    "price": 10,
    "color": "khaki",
    "tags": [
      "summer",
      "streetwear"
    ],
    "imageUrl": "https://images.pexels.com/photos/3878482/pexels-photo-3878482.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 34,
    "title": "Faux Fur Coat",
    "category": "outerwear",
    "size": "L",
    "price": 42,
    "color": "cream",
    "tags": [
      "winter",
      "dressy"
    ],
    "imageUrl": "https://images.pexels.com/photos/36074572/pexels-photo-36074572.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 35,
    "title": "Athletic Leggings",
    "category": "bottom",
    "size": "M",
    "price": 13,
    "color": "black",
    "tags": [
      "athleisure",
      "everyday"
    ],
    "imageUrl": "https://images.pexels.com/photos/16412053/pexels-photo-16412053.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 36,
    "title": "Oversized Hoodie",
    "category": "top",
    "size": "L",
    "price": 16,
    "color": "gray",
    "tags": [
      "casual",
      "athleisure"
    ],
    "imageUrl": "https://images.pexels.com/photos/19461584/pexels-photo-19461584.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 37,
    "title": "Retro Sunglasses",
    "category": "accessory",
    "size": "OS",
    "price": 9,
    "color": "brown",
    "tags": [
      "summer",
      "y2k"
    ],
    "imageUrl": "https://images.pexels.com/photos/28666281/pexels-photo-28666281.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 38,
    "title": "Mary Jane Flats",
    "category": "shoes",
    "size": "7",
    "price": 23,
    "color": "black",
    "tags": [
      "preppy",
      "office"
    ],
    "imageUrl": "https://images.pexels.com/photos/27127414/pexels-photo-27127414.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 39,
    "title": "Utility Cargo Pants",
    "category": "bottom",
    "size": "M",
    "price": 25,
    "color": "olive",
    "tags": [
      "streetwear",
      "casual"
    ],
    "imageUrl": "https://images.pexels.com/photos/11232182/pexels-photo-11232182.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    "id": 40,
    "title": "Satin Scrunchie Set",
    "category": "accessory",
    "size": "OS",
    "price": 5,
    "color": "multi",
    "tags": [
      "everyday",
      "y2k"
    ],
    "imageUrl": "https://images.pexels.com/photos/31004640/pexels-photo-31004640.jpeg?auto=compress&cs=tinysrgb&h=350"
  }
];

module.exports = { listings };
