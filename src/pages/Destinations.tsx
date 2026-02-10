import { cubicBezier, motion } from "framer-motion";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../data/destinations";

const easeOut = cubicBezier(0.16, 1, 0.3, 1);

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeOut },
  viewport: { once: true, amount: 0.2 },
};

export default function Destinations() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div {...fadeIn} className="mb-12">
        <p className="text-gold uppercase tracking-[0.3em] text-xs">
          Galerie des destinations
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-4">
          Choisissez votre époque
        </h1>
        <p className="text-sand/70 mt-3 max-w-2xl">
          Chaque itinéraire est pensé pour offrir une immersion rare, encadrée
          par nos experts et nos protocoles temporels.
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            actionLabel="Explorer"
          />
        ))}
      </div>
    </div>
  );
}
