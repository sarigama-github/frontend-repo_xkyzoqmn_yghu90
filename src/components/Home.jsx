import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [crewOfMonth, setCrewOfMonth] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [lbRes, crewRes, evRes] = await Promise.all([
          fetch(`${API}/api/leaderboard`).then((r) => r.json()),
          fetch(`${API}/api/crews?crew_of_month=true`).then((r) => r.json()),
          fetch(`${API}/api/events?status=completed`).then((r) => r.json()),
        ]);
        setLeaderboard(lbRes);
        setCrewOfMonth(crewRes);
        setEvents(evRes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-10">
      <header className="text-center py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Grandline — The First One Piece Verse in Bangladesh
        </h1>
        <p className="text-blue-200 mt-3">Dive into crews, bounties, marines and epic events.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
          <h2 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
            <span>💰</span>Bounty Leaderboard
          </h2>
          {loading && <div className="text-blue-300">Loading...</div>}
          <ul className="space-y-3">
            {leaderboard.map((m, idx) => (
              <li key={m.id} className="flex items-center justify-between bg-slate-900/40 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600/30 text-blue-200 flex items-center justify-center text-xs">{idx+1}</div>
                  <div className="text-white font-medium">{m.name}</div>
                </div>
                <div className="text-yellow-300 font-bold">฿ {m.bounty.toLocaleString()}</div>
              </li>
            ))}
            {!leaderboard.length && !loading && (
              <div className="text-blue-300">No data yet</div>
            )}
          </ul>
        </div>
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
          <h2 className="text-white font-semibold text-xl mb-4">🏆 Best Crew of the Month</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {crewOfMonth.map((c) => (
              <div key={c.id} className="bg-slate-900/40 rounded-lg p-4">
                <div className="text-white font-semibold">{c.name}</div>
                <div className="text-blue-300 text-sm">{c.sea}</div>
                {c.description && <p className="text-blue-200/80 text-sm mt-2 line-clamp-3">{c.description}</p>}
              </div>
            ))}
            {!crewOfMonth.length && !loading && <div className="text-blue-300">Coming soon</div>}
          </div>
        </div>
      </section>

      <section className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
        <h2 className="text-white font-semibold text-xl mb-4">📜 Recent Event Results</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {events.map((e) => (
            <div key={e.id} className="bg-slate-900/40 rounded-lg p-4">
              <div className="text-white font-semibold">{e.title}</div>
              <div className="text-blue-300 text-sm">{new Date(e.date).toLocaleDateString()}</div>
              {e.description && <p className="text-blue-200/80 text-sm mt-2 line-clamp-3">{e.description}</p>}
            </div>
          ))}
          {!events.length && !loading && <div className="text-blue-300">No results yet</div>}
        </div>
      </section>
    </div>
  );
}
