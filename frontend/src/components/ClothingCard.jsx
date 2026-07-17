import TagBadge from "./TagBadge";
import "./ClothingCard.css";

/**
 * Renders either an owned ClothingItem or a thrifted ThriftListing.
 * Pass `source="listing"` to show the "found on thrift ✦" badge.
 */
export default function ClothingCard({ item, source = "owned", onDelete, selected = false }) {
  const name = item.name || item.title;
  const primaryTag = item.category;
  const secondaryTag = source === "listing" ? `$${item.price}` : (item.season?.[0] || item.tags?.[0]);

  return (
    <div className={`clothing-card${selected ? " clothing-card--selected" : ""}`}>
      {source === "listing" && <span className="clothing-card-thrift-flag">found on thrift ✦</span>}
      {selected && <span className="clothing-card-check">✓</span>}
      {item.imageUrl ? (
        <div
          className="clothing-card-image"
          style={{
            backgroundImage: `url(${item.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <div className="clothing-card-image" style={{ background: item.swatch || "#E8E4D9" }} />
      )}
      {onDelete && (
        <button className="clothing-card-delete" onClick={() => onDelete(item.id)} aria-label={`Remove ${name}`}>
          ✕
        </button>
      )}
      <div className="clothing-card-info">
        <p className="clothing-card-name">{name}</p>
        <div className="clothing-card-tags">
          <TagBadge type="category">{primaryTag}</TagBadge>
          {secondaryTag && (
            <TagBadge type={source === "listing" ? "thrift" : "season"}>{secondaryTag}</TagBadge>
          )}
        </div>
      </div>
    </div>
  );
}