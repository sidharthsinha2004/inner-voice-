import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import Modal from "./Modal";

const STARTER_PROMPTS = [
  "Give me a journaling prompt",
  "Suggest a caption for my post",
  "Help me feel less anxious",
];

function generateReply(input) {
  const text = input.toLowerCase();

  if (text.includes("journal") || text.includes("prompt")) {
    return "Try this: \"What's one small moment from today that you'd want to remember a year from now — and why?\" Write for 5 minutes without stopping.";
  }
  if (text.includes("caption")) {
    return "How about: \"Some days are for speaking. Today was for listening.\" Short, honest captions tend to get the warmest replies here.";
  }
  if (text.includes("anx") || text.includes("stress") || text.includes("overwhelm")) {
    return "That's really valid. A quick reset: breathe in for 4 counts, hold for 4, out for 6 — repeat five times. Want a calming community to explore afterwards?";
  }
  if (text.includes("hello") || text.includes("hi")) {
    return "Hey there 👋 I'm your InnerVoice assistant. Ask me for writing prompts, captions, or just talk something through.";
  }

  return "I hear you. Want me to turn that into a post, suggest a related community, or just keep listening?";
}

export default function AIAssistantModal({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi, I'm your InnerVoice assistant 🌿 Ask me for a journaling prompt, a caption idea, or anything on your mind. (Demo assistant — wire this up to your own API in AIAssistantModal.jsx)",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text) => {
    const value = text ?? input;
    if (!value.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: value.trim() },
    ]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: generateReply(value) },
      ]);
      setTyping(false);
    }, 900);
  };

  return (
    <Modal open={open} onClose={onClose} title="AI Assistant" maxWidth="max-w-lg">
      <div className="flex flex-col h-[60vh] max-h-[480px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  m.sender === "user"
                    ? "bg-[var(--accent)] text-white rounded-br-sm"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 rounded-bl-sm"
                }`}
              >
                {m.sender === "ai" && (
                  <div className="flex items-center gap-2 mb-1 text-[var(--accent)] dark:text-[var(--accent-text-dark)] font-semibold">
                    <Bot size={14} />
                    <span className="text-xs">Assistant</span>
                  </div>
                )}
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-stone-100 dark:bg-stone-800 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-stone-400">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce [animation-delay:-0.2s]">.</span>
                  <span className="animate-bounce [animation-delay:-0.1s]">.</span>
                  <span className="animate-bounce">.</span>
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {messages.length < 2 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {STARTER_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full bg-[var(--accent-soft)] dark:bg-stone-800 text-[var(--accent)] dark:text-[var(--accent-text-dark)] hover:bg-[var(--accent-soft-hover)] dark:hover:bg-stone-700 transition"
              >
                <Sparkles size={12} />
                {p}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100 dark:border-stone-800"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the assistant anything..."
            className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-full px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:hover:bg-[var(--accent)] transition"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </Modal>
  );
}
