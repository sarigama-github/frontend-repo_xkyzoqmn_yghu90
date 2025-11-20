import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function CrewDetail(){
  const { crewId } = useParams();
  const [crew, setCrew] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/crews/${crewId}`).then(r=>r.json()).then(setCrew).finally(()=>setLoading(false));
  }, [crewId]);

  if(loading) return <div className="text-blue-300">Loading...</div>;
  if(!crew) return <div className="text-blue-300">Crew not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">{crew.name}</h1>
          <div className="text-blue-300">{crew.sea}</div>
        </div>
      </div>

      <section className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
        <h2 className="text-white font-semibold text-xl mb-4">Members</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crew.members?.map(m => (
            <div key={m.id} className="bg-slate-900/40 rounded-lg p-4">
              <div className="text-white font-medium">{m.name}</div>
              {m.role && <div className="text-blue-300 text-sm">{m.role}</div>}
              <div className="text-yellow-300 font-bold mt-2">฿ {m.bounty?.toLocaleString?.() || m.bounty}</div>
            </div>
          ))}
          {!crew.members?.length && <div className="text-blue-300">No members yet</div>}
        </div>
      </section>
    </div>
  );
}
