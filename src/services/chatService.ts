import { destinations } from "../data/destinations";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, agence de voyage temporel de luxe. Ton ton: professionnel mais chaleureux, passionné d'histoire, enthousiaste sans être trop familier. Tu connais parfaitement: Paris 1889 (Tour Eiffel, Exposition Universelle), Crétacé -65M (dinosaures, nature préhistorique), Florence 1504 (Renaissance, Michel-Ange). Tu inventes des prix cohérents. Tu donnes des recommandations selon les préférences.`;

const MAX_MESSAGE_CHARS = 800;

const provider = (import.meta.env.VITE_LLM_PROVIDER || "demo").toLowerCase();
const apiKey = import.meta.env.VITE_API_KEY || "";
const model =
  import.meta.env.VITE_LLM_MODEL || "openai/gpt-4o-mini";

const isDemo = provider === "demo";
const useServerProxy =
  provider === "openrouter" && (import.meta.env.PROD || !apiKey);

const sanitize = (message: string) =>
  message.trim().slice(0, MAX_MESSAGE_CHARS);

const normalize = (value: string) => value.toLowerCase();

const matchPreference = (input: string, keywords: string[]) =>
  keywords.some((keyword) => input.includes(keyword));

const buildDemoResponse = (input: string) => {
  const lowered = normalize(input);
  const wantsArt = matchPreference(lowered, [
    "art",
    "architecture",
    "renaissance",
    "musée",
    "musee",
    "culture",
  ]);
  const wantsNature = matchPreference(lowered, [
    "nature",
    "dino",
    "dinos",
    "aventure",
    "sauvage",
  ]);
  const wantsLuxe = matchPreference(lowered, [
    "luxe",
    "prestige",
    "raffinement",
    "élégance",
    "elegance",
  ]);

  if (wantsNature) {
    return `Je vous recommande le Crétacé -65M : safari chrono-guidé, observation aérienne et dômes premium. C'est l'expérience la plus aventureuse. Prix indicatif: ${destinations[1].pricing.prestige}.`;
  }
  if (wantsArt) {
    return `Florence 1504 est idéale pour l'art et l'architecture : ateliers privés, palais et Renaissance. Prix indicatif: ${destinations[2].pricing.prestige}.`;
  }
  if (wantsLuxe) {
    return `Paris 1889 offre le raffinement le plus immédiat : salons privés, gastronomie et Tour Eiffel. Prix indicatif: ${destinations[0].pricing.elite}.`;
  }

  return `Souhaitez-vous vivre l'effervescence de Paris 1889, la nature du Crétacé -65M ou la Renaissance florentine ? Dites-moi vos envies (art, nature, gastronomie, aventure, luxe) et je vous propose l'itinéraire parfait.`;
};

export async function sendChatMessage(messages: ChatMessage[]) {
  const sanitizedMessages = messages.map((message) => ({
    ...message,
    content: sanitize(message.content),
  }));

  if (isDemo) {
    const last = sanitizedMessages[sanitizedMessages.length - 1];
    return buildDemoResponse(last?.content ?? "");
  }

  if (provider !== "openrouter") {
    throw new Error(
      "Provider non supporté. Utilisez 'openrouter' ou 'demo'.",
    );
  }

  if (useServerProxy) {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: sanitizedMessages,
      }),
    });

    if (!response.ok) {
      throw new Error("Impossible de contacter l'agent.");
    }

    const data = (await response.json()) as { content?: string };
    return data.content ?? "Je suis là pour vous.";
  }

  const payload = {
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...sanitizedMessages,
    ],
    temperature: 0.7,
    max_tokens: 350,
  };

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error("Impossible de contacter l'agent.");
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  return data.choices?.[0]?.message?.content?.trim() ?? "Je suis là pour vous.";
}

export async function generateQuizDescription(
  recommendation: string,
  reasons: string[],
) {
  if (isDemo) {
    return `Votre profil correspond parfaitement à ${recommendation}. ${reasons.join(
      " ",
    )}`;
  }

  if (provider !== "openrouter") {
    return `Votre profil correspond parfaitement à ${recommendation}. ${reasons.join(
      " ",
    )}`;
  }

  if (useServerProxy) {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      return `Votre profil correspond parfaitement à ${recommendation}. ${reasons.join(
        " ",
      )}`;
    }

    const data = (await response.json()) as { content?: string };
    return (
      data.content ??
      `Votre profil correspond parfaitement à ${recommendation}. ${reasons.join(
        " ",
      )}`
    );
  }

  const prompt = `En 2-3 phrases, écris une recommandation personnalisée pour ${recommendation}. Mentionne: ${reasons.join(
    ", ",
  )}.`;

  const payload = {
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    temperature: 0.6,
    max_tokens: 120,
  };

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    return `Votre profil correspond parfaitement à ${recommendation}. ${reasons.join(
      " ",
    )}`;
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  return (
    data.choices?.[0]?.message?.content?.trim() ??
    `Votre profil correspond parfaitement à ${recommendation}. ${reasons.join(
      " ",
    )}`
  );
}
