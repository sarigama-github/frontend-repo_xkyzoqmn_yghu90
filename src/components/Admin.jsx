import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Admin(){
  const [token, setToken] = useState("");
  const [seedResult, setSeedResult] = useState(null);
  const [msg, setMsg] = useState("");

  const doSeed = async (force=false) => {
    setMsg("Seeding...");
    try{
      const res = await fetch(`${API}/api/admin/seed?force=${force}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      if(!res.ok){
        const t = await res.text();
        throw new Error(t || res.statusText);
      }
      const data = await res.json();
      setSeedResult(data.created || data);
      setMsg("Seed completed");
    }catch(e){
      setMsg(`Error: ${e.message}`);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-white text-3xl font-bold">Admin Panel</h1>
        <p className="text-blue-200 mt-2">Protected tools for managing Grandline content.</p>
      </header>

      <section className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-blue-200 text-sm">Admin Token</label>
          <input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="Enter admin token" className="w-full bg-slate-900 text-blue-100 border border-blue-500/30 rounded-md px-3 py-2" />
        </div>
        <div className="flex gap-3">
          <button onClick={()=>doSeed(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">Seed Sample Data</button>
          <button onClick={()=>doSeed(true)} className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600">Force Reseed</button>
        </div>
        {msg && <div className="text-blue-300 text-sm">{msg}</div>}
        {seedResult && (
          <div className="text-blue-100 text-sm">
            <div>Marines: {seedResult.marines}</div>
            <div>Crews: {seedResult.crews}</div>
            <div>Members: {seedResult.members}</div>
            <div>Events: {seedResult.events}</div>
          </div>
        )}
      </section>
    </div>
  )
}
