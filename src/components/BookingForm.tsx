import { useMemo, useState, type FormEvent } from "react";
import { destinations } from "../data/destinations";

type BookingFormProps = {
  preselectedDestination?: string;
};

export default function BookingForm({ preselectedDestination }: BookingFormProps) {
  const initialDestination =
    destinations.find((destination) => destination.id === preselectedDestination)
      ?.id ?? destinations[0].id;
  const [destinationId, setDestinationId] = useState(initialDestination);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [options, setOptions] = useState({
    guide: true,
    protection: true,
    luxuryPack: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selectedDestination = useMemo(
    () => destinations.find((destination) => destination.id === destinationId),
    [destinationId],
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!startDate || !endDate) {
      setError("Merci de sélectionner des dates valides.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setError("La date de retour doit être postérieure au départ.");
      return;
    }

    setSubmitted(true);
  };

  const optionLabels: Record<string, string> = {
    guide: "Guide privé",
    protection: "Protection chrono",
    luxuryPack: "Pack luxe",
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-10">
      <h2 className="text-2xl font-semibold mb-6">Réservation temporelle</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm text-sand/70">Destination</label>
          <select
            value={destinationId}
            onChange={(event) => setDestinationId(event.target.value)}
            className="mt-2 w-full bg-night/60 border border-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
          >
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-sand/70">Date de départ</label>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="mt-2 w-full bg-night/60 border border-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
          <div>
            <label className="text-sm text-sand/70">Date de retour</label>
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="mt-2 w-full bg-night/60 border border-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-sand/70">Nombre de voyageurs</label>
          <input
            type="number"
            min={1}
            value={travelers}
            onChange={(event) => setTravelers(Number(event.target.value))}
            className="mt-2 w-full bg-night/60 border border-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
        <div>
          <p className="text-sm text-sand/70 mb-2">Options premium</p>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { key: "guide", label: "Guide privé" },
              { key: "protection", label: "Protection chrono" },
              { key: "luxuryPack", label: "Pack luxe" },
            ].map((option) => (
              <label
                key={option.key}
                className="flex items-center gap-2 text-sm text-sand/80"
              >
                <input
                  type="checkbox"
                  checked={options[option.key as keyof typeof options]}
                  onChange={(event) =>
                    setOptions((prev) => ({
                      ...prev,
                      [option.key]: event.target.checked,
                    }))
                  }
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="px-6 py-3 rounded-full gold-gradient text-night font-semibold"
        >
          Envoyer la demande
        </button>
      </form>

      {submitted && (
        <div className="mt-8 p-6 rounded-2xl border border-gold/20 bg-night/70 space-y-3">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">
            Demande envoyée
          </p>
          <p className="text-sand">
            Votre conseiller vous recontacte sous 24h chrono pour finaliser le
            voyage.
          </p>
          <div className="text-sm text-sand/70 space-y-1">
            <p>Destination : {selectedDestination?.name}</p>
            <p>
              Dates : {startDate} → {endDate}
            </p>
            <p>Voyageurs : {travelers}</p>
            <p>
              Options :{" "}
              {Object.entries(options)
                .filter(([, value]) => value)
                .map(([key]) => optionLabels[key])
                .join(", ") || "Aucune"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
