import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import TagBadge from "../components/TagBadge";
import "./OutfitHistoryPage.css";

export default function OutfitHistoryPage({ outfits, setOutfits }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleDelete = (id) => setOutfits((prev) => prev.filter((o) => o.id !== id));

  if (outfits.length === 0) {
    return (
      <div className="history-page">
        <h1>Outfit History</h1>
        <EmptyState
          icon="📋"
          title="No saved outfits yet"
          body="Generate and save an outfit and it'll show up here."
          action={<Link to="/generate"><Button>Generate an outfit</Button></Link>}
        />
      </div>
    );
  }

  return (
    <div className="history-page">
      <h1>Outfit History</h1>
      <div className="history-list">
        {outfits.slice().reverse().map((outfit) => {
          const isExpanded = expandedId === outfit.id;
          const items = [...(outfit.ownedItems || []), ...(outfit.listingItems || [])];
          return (
            <div className="history-card" key={outfit.id}>
              <div className="history-card-top">
                <div>
                  <p className="history-card-occasion">{outfit.occasion}</p>
                  <p className="history-card-date">{new Date(outfit.createdAt).toLocaleDateString()}</p>
                </div>
                <button className="history-card-delete" onClick={() => handleDelete(outfit.id)}>Delete</button>
              </div>

              <div className="history-card-thumbs">
                {items.slice(0, 5).map((item, i) => (
                  <div key={i} className="history-thumb" style={{ background: item.swatch || "#E8E4D9" }} />
                ))}
                {outfit.listingItems?.length > 0 && <TagBadge type="thrift">thrift included</TagBadge>}
              </div>

              <button className="history-card-toggle" onClick={() => setExpandedId(isExpanded ? null : outfit.id)}>
                {isExpanded ? "Hide details ▲" : "Show details ▼"}
              </button>

              {isExpanded && (
                <div className="history-card-details">
                  <p>{outfit.explanation}</p>
                  {outfit.fitCard?.caption && (
                    <p className="history-card-caption">"{outfit.fitCard.caption}"</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
