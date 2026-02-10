const SYSTEM_PROMPT =
  "Tu es l'assistant virtuel de TimeTravel Agency, agence de voyage temporel de luxe. Ton ton: professionnel mais chaleureux, passionne d'histoire, enthousiaste sans etre trop familier. Tu connais parfaitement: Paris 1889 (Tour Eiffel, Exposition Universelle), Cretace -65M (dinosaures, nature prehistorique), Florence 1504 (Renaissance, Michel-Ange). Tu inventes des prix coherents. Tu donnes des recommandations selon les preferences.";

const MAX_MESSAGE_CHARS = 800;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Missing OPENROUTER_API_KEY" });
    return;
  }

  try {
    const { messages = [], model = "openai/gpt-4o-mini" } = req.body || {};
    const sanitizedMessages = Array.isArray(messages)
      ? messages.map((message) => ({
          role: message.role,
          content: String(message.content || "")
            .trim()
            .slice(0, MAX_MESSAGE_CHARS),
        }))
      : [];

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
      res.status(500).json({ error: "Upstream error" });
      return;
    }

    const data = await response.json();
    const content =
      data?.choices?.[0]?.message?.content?.trim() || "Je suis la pour vous.";

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: "Unexpected error" });
  }
};
