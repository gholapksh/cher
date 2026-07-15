import "./SkeletonCard.css";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card-img" />
      <div className="skeleton-card-line" style={{ width: "70%" }} />
      <div className="skeleton-card-line" style={{ width: "40%" }} />
    </div>
  );
}
