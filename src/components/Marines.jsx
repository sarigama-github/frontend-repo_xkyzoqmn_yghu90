import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Marines() {
  const [marines, setMarines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/marines`).then(r => r.json()).then(setMarines).finally(()=>setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-white text-3xl font-bold">Marines</h1>
        <p className="text-blue-200 mt-2">Profiles of the peacekeepers across the seas.</p>
      </header>
      {loading && <div className="text-blue-300">Loading...</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {marines.map(m => (
          <div key={m.id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600/30" />
              <div>
                <div className="text-white font-semibold">{m.name}</div>
                <div className="text-blue-300 text-sm">{m.rank}</div>
              </div>
            </div>
            {m.bio && <p className="text-blue-200/80 text-sm mt-3">{m.bio}</p>}
          </div>
        ))}
        {!marines.length && !loading && <div className="text-blue-300">No marines added yet</div>}
      </div>
    </div>
  );
}
