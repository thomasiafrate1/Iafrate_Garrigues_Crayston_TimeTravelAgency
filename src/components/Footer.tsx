export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-night/70">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-lg text-sand">TimeTravel Agency</p>
          <p className="text-sand/70 mt-2">
            Voyages temporels sur-mesure, expériences immersives et sécurité
            chronologique premium.
          </p>
        </div>
        <div>
          <p className="text-gold uppercase tracking-[0.2em] text-xs">
            Bureau Chrono
          </p>
          <p className="text-sand/70 mt-2">12 Quai des Orfèvres, Paris</p>
          <p className="text-sand/70">contact@timetravel.agency</p>
        </div>
        <div>
          <p className="text-gold uppercase tracking-[0.2em] text-xs">Notes</p>
          <p className="text-sand/70 mt-2">
            Service concierge 24/7 • Protocoles certifiés ISO-Temporal
          </p>
        </div>
      </div>
      <div className="text-center text-xs text-sand/50 pb-6">
        © 2026 TimeTravel Agency. Projet pédagogique.
      </div>
    </footer>
  );
}
