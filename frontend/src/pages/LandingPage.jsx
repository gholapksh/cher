import { Link } from "react-router-dom";
import Button from "../components/Button";
import "./LandingPage.css";

const STEPS = [
  { n: "01", icon: "👗", title: "Upload your closet", body: "Snap photos of what you own — CHER learns your wardrobe as you add to it." },
  { n: "02", icon: "✨", title: "Describe the occasion", body: "\"Casual coffee date,\" \"job interview downtown\" — say it your way." },
  { n: "03", icon: "🛍️", title: "Get styled, thrifted gaps included", body: "The agent builds an outfit from your closet, and searches secondhand listings if it needs to fill a gap." },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="landing-logo">CHER.</span>
        <div className="landing-nav-links">
          <Link to="/wardrobe">Wardrobe</Link>
          <Link to="/generate">Generate</Link>
          <Link to="/history">History</Link>
        </div>
        <Link to="/auth"><Button size="sm">Get Started</Button></Link>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-circle" />
        <div className="landing-hero-left">
          <p className="eyebrow">✦ AI-Powered Styling</p>
          <h1 className="landing-hero-heading">As if your closet<br />could style itself.</h1>
          <p className="landing-hero-sub">
            Upload your wardrobe. Describe your vibe. Get a full outfit in seconds —
            and if something's missing, CHER finds it secondhand.
          </p>
          <div className="landing-hero-actions">
            <Link to="/auth"><Button size="lg">Start Styling</Button></Link>
            <a href="#how-it-works"><Button variant="outline" size="lg">See how it works</Button></a>
          </div>
        </div>
        <div className="landing-hero-right">
          <div className="landing-hero-card" style={{ transform: "rotate(-5deg)", background: "#F0DE7A" }}>
            <span>Yellow Cardigan</span>
          </div>
          <div className="landing-hero-card" style={{ transform: "rotate(0deg)", background: "#B94A48" }}>
            <span>Plaid Mini Skirt</span>
          </div>
          <div className="landing-hero-card" style={{ transform: "rotate(4deg)", background: "#5B7CA3" }}>
            <span>Denim Jacket</span>
          </div>
        </div>
      </section>

      <section className="landing-features" id="how-it-works">
        <p className="eyebrow" style={{ textAlign: "center" }}>How it works</p>
        <h2 className="landing-features-heading">Three steps to your<br />perfect outfit</h2>
        <div className="landing-features-grid">
          {STEPS.map((step) => (
            <div className="landing-feature-card" key={step.n}>
              <span className="landing-feature-num">{step.n}</span>
              <span className="landing-feature-icon">{step.icon}</span>
              <h3 className="landing-feature-title">{step.title}</h3>
              <p className="landing-feature-body">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-agent">
        <div className="landing-agent-copy">
          <p className="eyebrow">Under the hood</p>
          <h2 className="landing-agent-heading">A real multi-tool agent, not a single prompt.</h2>
          <p className="landing-agent-body">
            When your closet doesn't have what an outfit needs, CHER's agent searches secondhand
            listings first, then styles from what's actually available — your closet and the thrift
            finds combined. If nothing turns up, it says so instead of guessing.
          </p>
        </div>
        <div className="landing-agent-steps">
          <div className="landing-agent-step">search_listings <span>→</span></div>
          <div className="landing-agent-step">suggest_outfit <span>→</span></div>
          <div className="landing-agent-step">create_fit_card</div>
        </div>
      </section>
    </div>
  );
}
