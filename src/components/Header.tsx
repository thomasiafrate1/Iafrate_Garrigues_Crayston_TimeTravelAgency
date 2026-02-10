import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Quiz", to: "/quiz" },
  { label: "Réserver", to: "/book" },
  { label: "À propos", to: "/about" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-night/80 border-b border-gold/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <motion.div
            className="h-10 w-10 rounded-full gold-gradient border border-gold/50 border-glow"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          />
          <div>
            <p className="font-display text-lg text-sand">TimeTravel Agency</p>
            <p className="text-xs text-gold/80 uppercase tracking-[0.2em]">
              Luxury Temporal Travel
            </p>
          </div>
        </NavLink>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition ${
                  isActive ? "text-gold" : "text-sand/70 hover:text-sand"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/book"
          className="text-sm px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition"
        >
          Réserver
        </NavLink>
      </div>
      <div className="md:hidden px-4 pb-3 flex flex-wrap gap-3 text-xs">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-1 rounded-full border border-gold/10 ${
                isActive ? "text-gold bg-gold/10" : "text-sand/70"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
