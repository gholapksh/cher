import ClothingCard from "./ClothingCard";
import Button from "./Button";
import "./OutfitResult.css";

export default function OutfitResult({ result, onSave, onTryAgain, saved }) {
  const { ownedItems, listingItems, explanation, stylingTips } = result;

  return (
    <div className="outfit-result">
      <div className="outfit-result-banner">
        <p className="outfit-result-banner-title">✦ Here's your look</p>
        <p className="outfit-result-banner-text">{explanation}</p>
      </div>

      <div className="outfit-result-grid">
        {ownedItems.map((item) => (
          <ClothingCard key={`owned-${item.id}`} item={item} source="owned" selected />
        ))}
        {listingItems.map((item) => (
          <ClothingCard key={`listing-${item.id}`} item={item} source="listing" selected />
        ))}
      </div>

      {stylingTips?.length > 0 && (
        <div className="outfit-result-tips">
          <p className="outfit-result-tips-title">Styling tips</p>
          <ul>
            {stylingTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="outfit-result-actions">
        <Button variant="primary" onClick={onSave} disabled={saved}>
          {saved ? "Saved ✓" : "Save Outfit"}
        </Button>
        <Button variant="outline" onClick={onTryAgain}>Try Again</Button>
      </div>
    </div>
  );
}
