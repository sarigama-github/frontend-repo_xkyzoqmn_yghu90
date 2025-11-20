import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Events(){
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const q = filter ? `?status=${filter}` : "";
    fetch(`${API}/api/events${q}`).then(r=>r.json()).then(setEvents);
  }, [filter]);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Events</h1>
          <p className="text-blue-200 mt-2">Announcements and results from the verse.</p>
        </div>
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="bg-slate-800 text-blue-100 border border-blue-500/30 rounded-md px-3 py-2">
          <option value="">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map(ev => (
          <div key={ev.id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5">
            <div className="text-white font-semibold">{ev.title}</div>
            <div className="text-blue-300 text-sm">{new Date(ev.date).toLocaleDateString()}</div>
            {ev.description && <p className="text-blue-200/80 text-sm mt-2 line-clamp-3">{ev.description}</p>}
            <div className="text-blue-300 text-xs mt-2 uppercase tracking-wider">{ev.status}</div>
          </div>
        ))}
        {!events.length && <div className="text-blue-300">No events yet</div>}
      </div>
    </div>
  );
}
