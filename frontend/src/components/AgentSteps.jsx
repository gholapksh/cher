import "./AgentSteps.css";

const TOOL_LABELS = {
  search_listings: { icon: "🛍️", label: "search_listings" },
  suggest_outfit: { icon: "✨", label: "suggest_outfit" },
  create_fit_card: { icon: "🖼️", label: "create_fit_card" },
};

const ALL_TOOLS = ["search_listings", "suggest_outfit", "create_fit_card"];

/**
 * Shows the agent's tool orchestration as it runs — a visual nod to
 * FitFindr's sequential tool-calling loop. `steps` is the array emitted
 * by runOutfitAgent (some conversations may skip search_listings entirely).
 */
export default function AgentSteps({ steps, running, stoppedAt }) {
  const completedTools = steps.map((s) => s.tool);

  return (
    <div className="agent-steps">
      {ALL_TOOLS.map((tool, i) => {
        const meta = TOOL_LABELS[tool];
        const stepData = steps.find((s) => s.tool === tool);
        const isDone = !!stepData;
        const isStopped = stoppedAt === tool;
        const isPending = running && !isDone && !isStopped && (i === 0 || completedTools.includes(ALL_TOOLS[i - 1]));

        let stateClass = "agent-step--idle";
        if (isDone) stateClass = "agent-step--done";
        if (isStopped) stateClass = "agent-step--stopped";
        if (isPending) stateClass = "agent-step--active";

        return (
          <div key={tool} className={`agent-step ${stateClass}`}>
            <span className="agent-step-icon">{meta.icon}</span>
            <div className="agent-step-body">
              <span className="agent-step-tool">{meta.label}</span>
              {stepData?.detail && <span className="agent-step-detail">{stepData.detail}</span>}
              {isPending && <span className="agent-step-detail agent-step-detail--pulse">running…</span>}
              {isStopped && <span className="agent-step-detail">stopped — nothing to pass forward</span>}
            </div>
            {i < ALL_TOOLS.length - 1 && <span className="agent-step-arrow">→</span>}
          </div>
        );
      })}
    </div>
  );
}
