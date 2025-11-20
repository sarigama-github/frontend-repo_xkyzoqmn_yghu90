import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-blue-600/20"
  }`;

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/80 border-b border-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">🏴‍☠️</span>
            <div>
              <div className="text-white font-bold leading-tight">Grandline</div>
              <div className="text-[10px] uppercase tracking-widest text-blue-300/70">The first One Piece verse in Bangladesh</div>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/marines" className={navLinkClass}>
              Marines
            </NavLink>
            <NavLink to="/pirates" className={navLinkClass}>
              Pirates
            </NavLink>
            <NavLink to="/events" className={navLinkClass}>
              Events
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
