import { useMemo, useState } from "react";
import ClothingCard from "../components/ClothingCard";
import EmptyState from "../components/EmptyState";
import { searchListings } from "../agent/mockAgent";
import "./ThriftSearchPage.css";

export default function ThriftSearchPage() {
  const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const results = useMemo(
    () => searchListings({ keyword, size, maxPrice: maxPrice ? Number(maxPrice) : undefined }),
    [keyword, size, maxPrice]
  );

  return (
    <div className="thrift-page">
      <div className="thrift-topbar">
        <h1>Thrift Search</h1>
        <p className="thrift-sub">Standalone access to the same <code>search_listings</code> tool the generator agent uses.</p>
      </div>

      <div className="thrift-filters">
        <input
          className="thrift-input"
          placeholder="Search keyword (e.g. jacket, boots, denim)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          className="thrift-input thrift-input--sm"
          placeholder="Size (e.g. M, 8, OS)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <input
          className="thrift-input thrift-input--sm"
          placeholder="Max price ($)"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No listings matched"
          body="Try a broader keyword, a different size, or raise the price cap."
        />
      ) : (
        <div className="thrift-grid">
          {results.map((item) => (
            <ClothingCard key={item.id} item={item} source="listing" />
          ))}
        </div>
      )}
    </div>
  );
}
