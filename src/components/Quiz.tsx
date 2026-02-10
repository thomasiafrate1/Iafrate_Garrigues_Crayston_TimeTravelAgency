import { useMemo, useState } from "react";
import { destinations } from "../data/destinations";
import { NavLink } from "react-router-dom";
import { generateQuizDescription } from "../services/chatService";

type Option = {
  label: string;
  value: string;
  scores: Record<string, number>;
};

type Question = {
  id: string;
  title: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: "experience",
    title: "Expérience recherchée",
    options: [
      {
        label: "Culturelle / Artistique",
        value: "culture",
        scores: { "florence-1504": 3, "paris-1889": 2 },
      },
      {
        label: "Aventure / Nature",
        value: "nature",
        scores: { "cretaceous-65m": 3 },
      },
      {
        label: "Élégance / Raffinement",
        value: "luxe",
        scores: { "paris-1889": 3, "florence-1504": 2 },
      },
    ],
  },
  {
    id: "period",
    title: "Période préférée",
    options: [
      {
        label: "XIXe - XXe",
        value: "modern",
        scores: { "paris-1889": 3 },
      },
      {
        label: "Temps anciens",
        value: "ancient",
        scores: { "cretaceous-65m": 3 },
      },
      {
        label: "Renaissance",
        value: "renaissance",
        scores: { "florence-1504": 3 },
      },
    ],
  },
  {
    id: "ambiance",
    title: "Préférence",
    options: [
      {
        label: "Effervescence urbaine",
        value: "urban",
        scores: { "paris-1889": 2, "florence-1504": 1 },
      },
      {
        label: "Nature sauvage",
        value: "wild",
        scores: { "cretaceous-65m": 3 },
      },
      {
        label: "Art & architecture",
        value: "architecture",
        scores: { "florence-1504": 3, "paris-1889": 1 },
      },
    ],
  },
  {
    id: "activity",
    title: "Activité",
    options: [
      {
        label: "Monuments",
        value: "monuments",
        scores: { "paris-1889": 2, "florence-1504": 2 },
      },
      {
        label: "Faune",
        value: "fauna",
        scores: { "cretaceous-65m": 3 },
      },
      {
        label: "Musées",
        value: "museums",
        scores: { "florence-1504": 3, "paris-1889": 1 },
      },
    ],
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    destinationId: string;
    explanation: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const progress = useMemo(
    () => Object.keys(answers).length / questions.length,
    [answers],
  );

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const computeRecommendation = async () => {
    const scores: Record<string, number> = {
      "paris-1889": 0,
      "cretaceous-65m": 0,
      "florence-1504": 0,
    };

    questions.forEach((question) => {
      const choice = question.options.find(
        (option) => option.value === answers[question.id],
      );
      if (!choice) return;
      Object.entries(choice.scores).forEach(([id, value]) => {
        scores[id] += value;
      });
    });

    const destinationId =
      Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "paris-1889";
    const destination = destinations.find((item) => item.id === destinationId);
    const reasons = [
      destination?.tags[0] ?? "expérience immersive",
      destination?.practicalInfo?.duration ?? "séjour premium",
    ];

    setLoading(true);
    const description = await generateQuizDescription(
      destination?.name ?? "Paris 1889",
      reasons,
    );
    setLoading(false);

    setResult({
      destinationId,
      explanation: description,
    });
  };

  const recommendation = destinations.find(
    (destination) => destination.id === result?.destinationId,
  );

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Diagnostic temporel personnalisé
        </h2>
        <div className="text-xs text-gold/70">
          {Math.round(progress * 100)}% complété
        </div>
      </div>
      <div className="h-2 bg-night/60 rounded-full mb-8">
        <div
          className="h-2 rounded-full gold-gradient"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id}>
            <p className="text-sand mb-3">{question.title}</p>
            <div className="grid gap-3 md:grid-cols-3">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.value;
                return (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleSelect(question.id, option.value)}
                    className={`px-4 py-3 rounded-2xl border text-sm text-left transition ${
                      selected
                        ? "border-gold/60 bg-gold/10 text-sand"
                        : "border-gold/10 text-sand/70 hover:text-sand hover:border-gold/40"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={computeRecommendation}
          disabled={Object.keys(answers).length < questions.length || loading}
          className="px-6 py-3 rounded-full gold-gradient text-night font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyse en cours..." : "Voir ma recommandation"}
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setResult(null);
          }}
          className="text-sm text-gold/70 hover:text-gold"
        >
          Réinitialiser
        </button>
      </div>

      {result && recommendation && (
        <div className="mt-8 p-6 rounded-2xl border border-gold/20 bg-night/70 space-y-4">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">
            Destination recommandée
          </p>
          <h3 className="text-2xl font-semibold">{recommendation.name}</h3>
          <p className="text-sand/80">{result.explanation}</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("chat:prefill", {
                    detail: {
                      message: `Je souhaite approfondir la recommandation ${recommendation.name}.`,
                    },
                  }),
                );
              }}
              className="px-5 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition"
            >
              Discuter de cette reco avec l'agent
            </button>
            <NavLink
              to={`/destinations/${recommendation.id}`}
              className="px-5 py-2 rounded-full bg-night/70 border border-gold/20 text-sand hover:border-gold/60 transition"
            >
              Voir la fiche destination
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
