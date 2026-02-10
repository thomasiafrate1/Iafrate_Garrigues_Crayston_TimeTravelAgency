import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.2),_transparent_50%)]" />
        <motion.div
          className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
          animate={{ y: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=60')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/70 to-night" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.p
          className="uppercase tracking-[0.4em] text-xs text-gold/80 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Voyages temporels d'exception
        </motion.p>
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-shadow-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          TimeTravel Agency
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-sand/80 max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Explorez l'histoire, réinventez votre destin.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <NavLink
            to="/destinations"
            className="px-6 py-3 rounded-full gold-gradient text-night font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Découvrir les destinations
          </NavLink>
          <a
            href="#chat"
            className="px-6 py-3 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition"
          >
            Parler à l'agent
          </a>
        </motion.div>
      </div>
    </section>
  );
}
