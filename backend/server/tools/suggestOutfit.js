const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Builds the prompt sent to the LLM. Keeps owned wardrobe items and
 * thrifted listings clearly separated so the model (and the frontend,
 * once it gets the response back) can distinguish "yours" vs "found on thrift".
 */
function buildOutfitPrompt({ ownedItems, listingItems, occasion }) {
  return `You are a personal stylist for an app called CHER.

The user owns these clothing items:
${JSON.stringify(ownedItems, null, 2)}

These additional items are available secondhand (thrifted) if needed to complete the outfit:
${JSON.stringify(listingItems, null, 2)}

Occasion: "${occasion}"

Build a complete outfit. Prefer using owned items first. Only include thrifted
items if they are needed to fill a real gap (e.g. no owned item fits the category).

Return ONLY valid JSON, no preamble, no markdown fences, in this exact shape:
{
  "selectedOwnedItemIds": number[],
  "selectedListingIds": number[],
  "explanation": string,
  "stylingTips": string[]
}`;
}

/**
 * Tool 2: suggest_outfit
 * Calls Groq's LLM to generate an outfit combination from the user's
 * actual wardrobe plus any thrift listings passed in.
 *
 * @param {Object} params
 * @param {Array} params.ownedItems   - user's ClothingItem records
 * @param {Array} params.listingItems - candidate ThriftListing records (may be [])
 * @param {string} params.occasion    - natural language occasion/prompt
 * @returns {Object} { selectedOwnedItemIds, selectedListingIds, explanation, stylingTips }
 */
async function suggestOutfit({ ownedItems, listingItems, occasion }) {
  const prompt = buildOutfitPrompt({ ownedItems, listingItems, occasion });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content.trim();

  // Strip markdown fences if the model adds them anyway
  const cleaned = raw.replace(/^```json\s*|```$/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`suggest_outfit: failed to parse LLM response as JSON: ${raw}`);
  }
}

module.exports = { suggestOutfit, buildOutfitPrompt };
