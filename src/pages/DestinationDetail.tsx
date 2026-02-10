import { motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";
import { destinations } from "../data/destinations";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
};

export default function DestinationDetail() {
  const { id } = useParams();
  const destination = destinations.find((item) => item.id === id);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-sand/80">Destination introuvable.</p>
        <NavLink to="/destinations" className="text-gold">
          Retour à la galerie
        </NavLink>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      <motion.section
        {...fadeIn}
        className="relative overflow-hidden rounded-3xl border border-gold/20"
      >
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">
            {destination.era}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            {destination.name}
          </h1>
          <p className="text-sand/80 mt-2 max-w-xl">
            {destination.longDescription}
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="grid gap-6 md:grid-cols-3">
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">À vivre sur place</h2>
          <ul className="space-y-2 text-sand/80 text-sm">
            {destination.activities.map((activity) => (
              <li key={activity}>• {activity}</li>
            ))}
          </ul>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Conseils de sécurité temporelle
          </h2>
          <ul className="space-y-2 text-sand/80 text-sm">
            {destination.safetyTips.map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Infos pratiques</h2>
          <div className="text-sand/80 text-sm space-y-2">
            <p>Durée recommandée : {destination.practicalInfo.duration}</p>
            <p>Niveau de risque : {destination.practicalInfo.riskLevel}</p>
            <p>Conditions : {destination.practicalInfo.conditions}</p>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="glass-panel rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Prix indicatifs</h2>
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div className="border border-gold/10 rounded-2xl p-4">
            <p className="text-gold uppercase tracking-[0.2em] text-xs">
              Classic
            </p>
            <p className="text-sand/80 mt-2">{destination.pricing.classic}</p>
          </div>
          <div className="border border-gold/10 rounded-2xl p-4">
            <p className="text-gold uppercase tracking-[0.2em] text-xs">
              Prestige
            </p>
            <p className="text-sand/80 mt-2">{destination.pricing.prestige}</p>
          </div>
          <div className="border border-gold/10 rounded-2xl p-4">
            <p className="text-gold uppercase tracking-[0.2em] text-xs">
              Elite
            </p>
            <p className="text-sand/80 mt-2">{destination.pricing.elite}</p>
          </div>
        </div>
        <NavLink
          to={`/book?destination=${destination.id}`}
          className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-full gold-gradient text-night font-semibold"
        >
          Réserver ce voyage
        </NavLink>
      </motion.section>
    </div>
  );
}
