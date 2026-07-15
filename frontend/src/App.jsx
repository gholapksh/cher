import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import WardrobePage from "./pages/WardrobePage";
import UploadPage from "./pages/UploadPage";
import OutfitGeneratorPage from "./pages/OutfitGeneratorPage";
import OutfitHistoryPage from "./pages/OutfitHistoryPage";
import ThriftSearchPage from "./pages/ThriftSearchPage";
import ProfilePage from "./pages/ProfilePage";
import { initialWardrobe } from "./data/mockWardrobe";

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">{children}</main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [wardrobe, setWardrobe] = useState(initialWardrobe);
  const [outfits, setOutfits] = useState([]);

  const addOutfit = (outfit) => setOutfits((prev) => [...prev, outfit]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage onLogin={setUser} />} />
      <Route
        path="/wardrobe"
        element={<AppShell><WardrobePage wardrobe={wardrobe} setWardrobe={setWardrobe} /></AppShell>}
      />
      <Route
        path="/upload"
        element={<AppShell><UploadPage setWardrobe={setWardrobe} /></AppShell>}
      />
      <Route
        path="/generate"
        element={<AppShell><OutfitGeneratorPage wardrobe={wardrobe} addOutfit={addOutfit} /></AppShell>}
      />
      <Route
        path="/thrift"
        element={<AppShell><ThriftSearchPage /></AppShell>}
      />
      <Route
        path="/history"
        element={<AppShell><OutfitHistoryPage outfits={outfits} setOutfits={setOutfits} /></AppShell>}
      />
      <Route
        path="/profile"
        element={<AppShell><ProfilePage user={user} wardrobe={wardrobe} outfits={outfits} /></AppShell>}
      />
    </Routes>
  );
}
