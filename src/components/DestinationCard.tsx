import { useState } from "react";
import { motion } from "framer-motion";
import type { Destination } from "../data/destinations";
import { NavLink } from "react-router-dom";

type DestinationCardProps = {
  destination: Destination;
  showDetailsButton?: boolean;
  actionLabel?: string;
  actionTo?: string;
};

export default function DestinationCard({
  destination,
  showDetailsButton = true,
  actionLabel = "Voir détails",
  actionTo,
}: DestinationCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="glass-panel rounded-2xl overflow-hidden group"
    >
      <div className="relative h-52 overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-800/60" />
        )}
        <img
          src={destination.heroImage}
          alt={destination.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-700 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="text-gold text-xs uppercase tracking-[0.3em]">
            {destination.era}
          </p>
          <h3 className="text-xl font-semibold text-sand">
            {destination.name}
          </h3>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-sand/80">{destination.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full border border-gold/20 text-gold/80"
            >
              {tag}
            </span>
          ))}
        </div>
        {showDetailsButton && (
          <NavLink
            to={actionTo ?? `/destinations/${destination.id}`}
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-sand transition"
          >
            {actionLabel} →
          </NavLink>
        )}
      </div>
    </motion.article>
  );
}
