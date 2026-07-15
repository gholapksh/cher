import "./EmptyState.css";

export default function EmptyState({ icon = "🧺", title, body, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {body && <p className="empty-state-body">{body}</p>}
      {action}
    </div>
  );
}
