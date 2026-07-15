import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ClothingCard from "../components/ClothingCard";
import FilterBar from "../components/FilterBar";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import "./WardrobePage.css";

const CATEGORY_FILTERS = ["All", "Top", "Bottom", "Shoes", "Accessory", "Outerwear"];

export default function WardrobePage({ wardrobe, setWardrobe }) {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = useMemo(() => {
    if (categoryFilter === "All") return wardrobe;
    return wardrobe.filter((item) => item.category === categoryFilter.toLowerCase());
  }, [wardrobe, categoryFilter]);

  const handleDelete = (id) => setWardrobe((prev) => prev.filter((item) => item.id !== id));

  return (
    <div className="wardrobe-page">
      <div className="wardrobe-topbar">
        <h1>My Wardrobe</h1>
        <Link to="/upload"><Button>＋ Add Item</Button></Link>
      </div>

      <FilterBar options={CATEGORY_FILTERS} active={categoryFilter} onChange={setCategoryFilter} />

      {filtered.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          body="Add a few pieces and CHER will start building outfits from your actual closet."
          action={<Link to="/upload"><Button>Add your first item</Button></Link>}
        />
      ) : (
        <div className="wardrobe-grid">
          {filtered.map((item) => (
            <ClothingCard key={item.id} item={item} source="owned" onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
