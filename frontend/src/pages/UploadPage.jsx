import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./UploadPage.css";

const CATEGORIES = ["top", "bottom", "shoes", "accessory", "outerwear"];
const SEASONS = ["spring", "summer", "fall", "winter"];
const SWATCH_CHOICES = ["#F0DE7A", "#B94A48", "#5B7CA3", "#232323", "#EFE6CF", "#F2A7BB", "#A8E6CF", "#C9B8F0"];

export default function UploadPage({ setWardrobe }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [color, setColor] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [swatch, setSwatch] = useState(SWATCH_CHOICES[0]);

  const toggleSeason = (s) =>
    setSeasons((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags((prev) => [...prev, tagInput.trim().toLowerCase()]);
      setTagInput("");
    }
  };

  const removeTag = (t) => setTags((prev) => prev.filter((x) => x !== t));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setWardrobe((prev) => [
      ...prev,
      { id: Date.now(), name, category, color, season: seasons.length ? seasons : ["all"], tags, swatch },
    ]);
    navigate("/wardrobe");
  };

  return (
    <div className="upload-page">
      <form className="upload-card" onSubmit={handleSubmit}>
        <h2>Add to Wardrobe</h2>
        <p className="upload-sub">Upload a photo of your clothing item — or just pick a swatch color for now</p>

        <div className="upload-dropzone" style={{ background: swatch }}>
          <span>Choose a swatch below to represent this item</span>
        </div>
        <div className="upload-swatch-row">
          {SWATCH_CHOICES.map((c) => (
            <button
              key={c}
              type="button"
              className={`upload-swatch${swatch === c ? " upload-swatch--active" : ""}`}
              style={{ background: c }}
              onClick={() => setSwatch(c)}
              aria-label={`Choose color ${c}`}
            />
          ))}
        </div>

        <div className="upload-field">
          <label>Item name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Yellow Cardigan" required />
        </div>

        <div className="upload-field-row">
          <div className="upload-field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="upload-field">
            <label>Color</label>
            <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g. yellow" />
          </div>
        </div>

        <div className="upload-field">
          <label>Season</label>
          <div className="upload-chip-row">
            {SEASONS.map((s) => (
              <button
                type="button"
                key={s}
                className={`upload-chip${seasons.includes(s) ? " upload-chip--active" : ""}`}
                onClick={() => toggleSeason(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="upload-field">
          <label>Tags</label>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Type a tag and press Enter"
          />
          <div className="upload-tag-row">
            {tags.map((t) => (
              <span key={t} className="upload-tag">
                {t} <button type="button" onClick={() => removeTag(t)}>✕</button>
              </span>
            ))}
          </div>
        </div>

        <Button type="submit" size="lg" style={{ width: "100%", marginTop: "8px" }}>
          Add to Wardrobe
        </Button>
      </form>
    </div>
  );
}
