import { useState } from "react";
import Button from "./Button";
import "./FitCard.css";

export default function FitCard({ fitCard, items }) {
  const [copied, setCopied] = useState(false);
  if (!fitCard?.caption) return null;

  const swatchStack = items.slice(0, 4);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${fitCard.caption}\n\n${fitCard.hashtags.join(" ")}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard may be unavailable in some environments — fail silently
    }
  };

  return (
    <div className="fit-card">
      <div className="fit-card-swatches">
        {swatchStack.map((item, i) => (
          <div
            key={i}
            className="fit-card-swatch"
            style={{ background: item.swatch || "#E8E4D9", zIndex: swatchStack.length - i }}
          />
        ))}
      </div>
      <p className="fit-card-caption">{fitCard.caption}</p>
      <div className="fit-card-hashtags">
        {fitCard.hashtags.map((tag) => (
          <span key={tag} className="fit-card-hashtag">{tag}</span>
        ))}
      </div>
      <Button variant="dark" size="sm" onClick={handleCopy}>
        {copied ? "Copied ✓" : "Copy caption"}
      </Button>
    </div>
  );
}
