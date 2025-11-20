import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Marines from "./components/Marines";
import Pirates from "./components/Pirates";
import CrewDetail from "./components/CrewDetail";
import Events from "./components/Events";
import Admin from "./components/Admin";

function Layout({ children }){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <Navbar />
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <footer className="relative border-t border-blue-500/10 py-6 text-center text-blue-300/70">
        © {new Date().getFullYear()} Grandline • Fan-made verse in Bangladesh
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marines" element={<Marines />} />
          <Route path="/pirates" element={<Pirates />} />
          <Route path="/pirates/:crewId" element={<CrewDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
