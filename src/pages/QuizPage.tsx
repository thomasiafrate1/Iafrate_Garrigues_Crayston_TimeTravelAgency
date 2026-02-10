import Quiz from "../components/Quiz";

export default function QuizPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
      <div>
        <p className="text-gold uppercase tracking-[0.3em] text-xs">
          Quiz interactif
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-4">
          Quel voyage temporel vous correspond ?
        </h1>
        <p className="text-sand/70 mt-3">
          Répondez à quatre questions pour révéler l'expérience la plus alignée
          avec vos envies.
        </p>
      </div>
      <Quiz />
    </div>
  );
}
