import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { sendChatMessage } from "../services/chatService";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Bienvenue chez TimeTravel Agency. Dites-moi ce qui vous attire : art, aventure, luxe ou nature ?",
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>(
    "tta-chat-history",
    initialMessages,
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ message: string }>;
      setInput(custom.detail.message);
      setIsOpen(true);
    };
    window.addEventListener("chat:prefill", handler);
    return () => window.removeEventListener("chat:prefill", handler);
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const assistantReply = await sendChatMessage(
        nextMessages.slice(-12).map((message) => ({
          role: message.role,
          content: message.content,
        })),
      );

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Je rencontre une difficulté technique. Réessayez ou activez le mode démo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm"
          >
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gold/20">
                <div>
                  <p className="text-sm text-sand font-semibold">
                    Agent temporel
                  </p>
                  <p className="text-xs text-gold/70">
                    Concierge historique IA
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-sand/70 hover:text-gold transition"
                >
                  Fermer
                </button>
              </div>
              <div
                ref={scrollRef}
                className="max-h-72 overflow-y-auto px-4 py-3 space-y-3 text-sm"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.role === "user"
                          ? "bg-gold/20 text-sand"
                          : "bg-night/70 border border-gold/10 text-sand/90"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <p className="text-xs text-gold/70">L'agent réfléchit…</p>
                )}
              </div>
              <div className="border-t border-gold/20 px-4 py-3 flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Posez-moi vos questions sur les voyages temporels…"
                  maxLength={800}
                  className="flex-1 bg-night/70 border border-gold/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="px-4 py-2 rounded-full gold-gradient text-night text-sm font-semibold"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full gold-gradient text-night shadow-lg flex items-center justify-center text-xl border border-gold/60"
        aria-label="Ouvrir le chat"
      >
        <span className="text-sm font-semibold">Chat</span>
      </button>
    </>
  );
}
