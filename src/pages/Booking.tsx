import { useSearchParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination") ?? undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div>
        <p className="text-gold uppercase tracking-[0.3em] text-xs">
          Réservation
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-4">
          Planifiez votre traversée
        </h1>
        <p className="text-sand/70 mt-3">
          Remplissez ce formulaire pour recevoir une proposition sur-mesure.
        </p>
      </div>
      <BookingForm preselectedDestination={destination} />
    </div>
  );
}
