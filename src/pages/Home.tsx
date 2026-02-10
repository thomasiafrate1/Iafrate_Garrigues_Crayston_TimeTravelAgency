import { cubicBezier, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Hero from "../components/Hero";
import DestinationCard from "../components/DestinationCard";
import Quiz from "../components/Quiz";
import { destinations } from "../data/destinations";

const easeOut = cubicBezier(0.16, 1, 0.3, 1);

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeOut },
  viewport: { once: true, amount: 0.2 },
};

export default function Home() {
  return (
    <div>
      <Hero />

      <motion.section
        {...fadeIn}
        className="max-w-6xl mx-auto px-4 py-20"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Luxe & confidentialité",
              description:
                "Suite privée, conciergerie 24/7 et itinéraires sur-mesure.",
            },
            {
              title: "Sécurité chronologique",
              description:
                "Protocoles certifiés, guides formés et zones stabilisées.",
            },
            {
              title: "Expérience guidée",
              description:
                "Experts historiques et immersions culturelles exclusives.",
            },
          ].map((card) => (
            <div key={card.title} className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sand/80 mt-3">{card.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...fadeIn}
        className="max-w-6xl mx-auto px-4 pb-20"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-gold uppercase tracking-[0.3em] text-xs">
              Destinations
            </p>
            <h2 className="section-title mt-3">
              Trois époques, un seul voyage parfait
            </h2>
          </div>
          <NavLink
            to="/destinations"
            className="text-sm text-gold hover:text-sand transition"
          >
            Voir la galerie →
          </NavLink>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        {...fadeIn}
        className="max-w-6xl mx-auto px-4 pb-20"
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/2 space-y-4">
            <p className="text-gold uppercase tracking-[0.3em] text-xs">
              Quiz personnalisé
            </p>
            <h2 className="section-title">
              Trouvez votre époque idéale en 60 secondes
            </h2>
            <p className="text-sand/70">
              Notre diagnostic croise vos préférences pour révéler la destination
              qui vous ressemble le plus. Passez le quiz complet pour recevoir une
              recommandation détaillée.
            </p>
            <NavLink
              to="/quiz"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition"
            >
              Lancer le quiz
            </NavLink>
          </div>
          <div className="lg:w-1/2">
            <Quiz />
          </div>
        </div>
      </motion.section>

      <motion.section
        {...fadeIn}
        id="chat"
        className="max-w-6xl mx-auto px-4 pb-20"
      >
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">
            Agent IA
          </p>
          <h2 className="section-title mt-3">Parlez à votre concierge</h2>
          <p className="text-sand/70 mt-4 max-w-2xl">
            Posez vos questions sur la sécurité, les tarifs ou les itinéraires.
            Notre assistant vous répond immédiatement. Le widget est disponible en
            bas à droite.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
