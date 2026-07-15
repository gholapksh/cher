import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import OutfitResult from "../components/OutfitResult";
import FitCard from "../components/FitCard";
import AgentSteps from "../components/AgentSteps";
import EmptyState from "../components/EmptyState";
import { runOutfitAgent } from "../agent/mockAgent";
import "./OutfitGeneratorPage.css";

const SUGGESTIONS = [
  "☀️ Beach day",
  "💼 Job interview",
  "🍕 Girls night out",
  "🎓 Class presentation",
  "🧥 Need a jacket for a cold coffee date",
];

export default function OutfitGeneratorPage({ wardrobe, addOutfit }) {
  const [occasion, setOccasion] = useState("");
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!occasion.trim() || wardrobe.length === 0) return;

    setRunning(true);
    setSteps([]);
    setResult(null);
    setSaved(false);

    const outcome = await runOutfitAgent({
      ownedItems: wardrobe,
      occasion,
      onStep: (step) => setSteps((prev) => [...prev, step]),
    });

    setResult(outcome);
    setRunning(false);
  };

  const handleTryAgain = () => {
    setResult(null);
    setSteps([]);
    setSaved(false);
  };

  const handleSave = () => {
    if (result && !result.stopped) {
      addOutfit({ ...result, occasion, id: Date.now(), createdAt: new Date().toISOString() });
      setSaved(true);
    }
  };

  if (wardrobe.length === 0) {
    return (
      <div className="generator-page">
        <EmptyState
          icon="👗"
          title="Your wardrobe is empty"
          body="Add a few items first so the agent has something to style from."
          action={<Link to="/upload"><Button>Add an item</Button></Link>}
        />
      </div>
    );
  }

  return (
    <div className="generator-page">
      <div className="generator-left">
        <h1>Generate an Outfit</h1>
        <p className="generator-sub">Describe your occasion and the agent will style you — searching thrift listings if your closet comes up short.</p>

        <form onSubmit={handleGenerate}>
          <textarea
            className="generator-textarea"
            placeholder="e.g. Casual brunch with friends on a warm Sunday..."
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />

          <div className="generator-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                type="button"
                key={s}
                className="generator-suggestion-chip"
                onClick={() => setOccasion(s.replace(/^\S+\s/, ""))}
              >
                {s}
              </button>
            ))}
          </div>

          <Button type="submit" size="lg" style={{ width: "100%" }} disabled={running || !occasion.trim()}>
            {running ? "Styling…" : "✦ Generate My Outfit"}
          </Button>
        </form>

        {(running || steps.length > 0) && (
          <div className="generator-agent-panel">
            <p className="generator-agent-label">Agent trace</p>
            <AgentSteps steps={steps} running={running} stoppedAt={result?.stopped ? result.stoppedAt : null} />
          </div>
        )}
      </div>

      <div className="generator-right">
        {!result && !running && (
          <div className="generator-placeholder">
            <span className="generator-placeholder-icon">🧥</span>
            <p>Your outfit will appear here</p>
          </div>
        )}

        {running && !result && (
          <div className="generator-placeholder">
            <span className="generator-placeholder-icon generator-placeholder-icon--spin">✦</span>
            <p>Working through the agent steps…</p>
          </div>
        )}

        {result?.stopped && (
          <div className="generator-stopped">
            <p className="generator-stopped-title">Stopped early — no crash, no guesswork</p>
            <p>{result.message}</p>
            <Button variant="outline" onClick={handleTryAgain}>Adjust and try again</Button>
          </div>
        )}

        {result && !result.stopped && (
          <>
            <OutfitResult result={result} onSave={handleSave} onTryAgain={handleTryAgain} saved={saved} />
            <FitCard fitCard={result.fitCard} items={[...result.ownedItems, ...result.listingItems]} />
          </>
        )}
      </div>
    </div>
  );
}
