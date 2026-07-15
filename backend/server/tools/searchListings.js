const { listings } = require("../data/listings");

/**
 * Tool 1: search_listings
 * Filters the thrift listings dataset by keyword, size, and price.
 *
 * @param {Object} params
 * @param {string} [params.keyword] - matched against title, category, color, tags
 * @param {string} [params.size]    - exact match, case-insensitive (e.g. "M", "8", "OS")
 * @param {number} [params.maxPrice] - upper bound, inclusive
 * @returns {Array} matching listings (empty array if none found — caller decides what to do)
 */
function searchListings({ keyword, size, maxPrice } = {}) {
  let results = listings;

  if (keyword) {
    const kw = keyword.toLowerCase();
    results = results.filter((item) => {
      const haystack = [item.title, item.category, item.color, ...item.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(kw);
    });
  }

  if (size) {
    const sz = size.toLowerCase();
    results = results.filter((item) => item.size.toLowerCase() === sz);
  }

  if (typeof maxPrice === "number") {
    results = results.filter((item) => item.price <= maxPrice);
  }

  return results;
}

module.exports = { searchListings };
