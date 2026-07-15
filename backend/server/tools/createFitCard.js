const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Tool 3: create_fit_card
 * Generates a casual Instagram-style caption for a finished outfit,
 * to go with the shareable "fit card" UI component.
 *
 * @param {Object} params
 * @param {Array} params.outfitItems - combined list of item names/tags in the final outfit
 * @param {string} params.occasion   - original occasion prompt
 * @returns {Object} { caption, hashtags }
 */
async function createFitCard({ outfitItems, occasion }) {
  const itemNames = outfitItems.map((i) => i.name || i.title).join(", ");

  const prompt = `You are writing a short, casual Instagram caption for an outfit post.

Outfit pieces: ${itemNames}
Occasion: "${occasion}"

Write a fun, casual caption (1-2 sentences, no hashtags in the sentence itself)
in a Gen-Z/Clueless-movie-quote-adjacent tone. Then separately suggest 5 relevant hashtags.

Return ONLY valid JSON, no preamble, no markdown fences, in this exact shape:
{
  "caption": string,
  "hashtags": string[]
}`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
  });

  const raw = completion.choices[0].message.content.trim();
  const cleaned = raw.replace(/^```json\s*|```$/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`create_fit_card: failed to parse LLM response as JSON: ${raw}`);
  }
}

module.exports = { createFitCard };
