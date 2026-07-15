import "./TagBadge.css";

const VARIANT_BY_TYPE = {
  category: "category",
  season: "season",
  style: "style",
  thrift: "thrift",
};

export default function TagBadge({ children, type = "style" }) {
  const variant = VARIANT_BY_TYPE[type] || "style";
  return <span className={`tag-badge tag-badge--${variant}`}>{children}</span>;
}
