import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL || "";

const SEAS = [
  "East Blue",
  "West Blue",
  "North Blue",
  "South Blue",
  "Grand Line",
];

export default function Pirates() {
  const [crews, setCrews] = useState([]);
  const [selectedSea, setSelectedSea] = useState("");

  useEffect(() => {
    const q = selectedSea ? `?sea=${encodeURIComponent(selectedSea)}` : "";
    fetch(`${API}/api/crews${q}`).then(r=>r.json()).then(setCrews);
  }, [selectedSea]);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Pirate Crews</h1>
          <p className="text-blue-200 mt-2">Explore crews across all the seas.</p>
        </div>
        <select value={selectedSea} onChange={e=>setSelectedSea(e.target.value)} className="bg-slate-800 text-blue-100 border border-blue-500/30 rounded-md px-3 py-2">
          <option value="">All Seas</option>
          {SEAS.map(sea => <option key={sea} value={sea}>{sea}</option>)}
        </select>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {crews.map(c => (
          <Link key={c.id} to={`/pirates/${c.id}`} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5 hover:border-blue-400/40 transition">
            <div className="text-white font-semibold">{c.name}</div>
            <div className="text-blue-300 text-sm">{c.sea}</div>
            {c.description && <p className="text-blue-200/80 text-sm mt-3 line-clamp-3">{c.description}</p>}
          </Link>
        ))}
        {!crews.length && <div className="text-blue-300">No crews yet</div>}
      </div>
    </div>
  );
}
