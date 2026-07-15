import "./ProfilePage.css";

export default function ProfilePage({ user, wardrobe, outfits }) {
  const counts = wardrobe.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-card">
        <div className="profile-avatar">{(user?.email || "U")[0].toUpperCase()}</div>
        <div>
          <p className="profile-name">{user?.email || "Guest"}</p>
          <p className="profile-sub">Member of CHER.</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat-num">{wardrobe.length}</span>
          <span className="profile-stat-label">Items in closet</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-num">{outfits.length}</span>
          <span className="profile-stat-label">Saved outfits</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-num">{outfits.filter((o) => o.listingItems?.length > 0).length}</span>
          <span className="profile-stat-label">With thrift finds</span>
        </div>
      </div>

      <div className="profile-breakdown">
        <p className="profile-breakdown-title">Closet by category</p>
        {Object.entries(counts).map(([cat, n]) => (
          <div key={cat} className="profile-breakdown-row">
            <span>{cat}</span>
            <span>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
