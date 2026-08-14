import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  X,
  RotateCcw,
  Leaf,
  Minimize2,
} from "lucide-react";

const STARTER_PROMPTS = [
  {
    text: "Give me a journaling prompt",
    icon: "✍️",
  },
  {
    text: "Suggest a caption for my post",
    icon: "✨",
  },
  {
    text: "Help me feel less anxious",
    icon: "🌿",
  },
];

function generateReply(input) {
  const text = input.toLowerCase();

  if (text.includes("journal") || text.includes("prompt")) {
    return 'Try this: "What is one small moment from today that you would want to remember a year from now — and why?" Write for five minutes without stopping.';
  }

  if (text.includes("caption")) {
    return 'How about: "Some days are for speaking. Today was for listening." Short, honest captions usually feel the most natural.';
  }

  if (
    text.includes("anx") ||
    text.includes("stress") ||
    text.includes("overwhelm")
  ) {
    return "That sounds difficult. Try a quick reset: breathe in for 4 counts, hold for 4, and breathe out for 6. Repeat five times. 🌿";
  }

  if (text.includes("hello") || text.includes("hi")) {
    return "Hey there 👋 I’m your InnerVoice assistant. You can ask me for writing prompts, captions, ideas, or simply talk something through.";
  }

  return "I hear you. I’m here to listen. Would you like me to turn that into a post, help you think through it, or simply keep listening?";
}

export default function AIAssistantModal({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi there 👋 I’m your InnerVoice assistant. I’m here to help you reflect, create, and express yourself.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    setMinimized(false);

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const send = (promptText = null) => {
    const value = (promptText ?? input).trim();

    if (!value || typing) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: value,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: generateReply(value),
        },
      ]);

      setTyping(false);
    }, 850);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        text: "Fresh start 🌿 What would you like to talk about?",
      },
    ]);
  };

  if (!open) return null;

  const assistant = (
    <div
      className={`iv-ai-assistant ${
        minimized ? "iv-ai-assistant-minimized" : ""
      }`}
      role="complementary"
      aria-label="InnerVoice AI assistant"
    >
      {!minimized && (
        <section className="iv-ai-panel">
          <header className="iv-ai-header">
            <div className="iv-ai-header-left">
              <div className="iv-ai-avatar">
                <Bot size={20} />
              </div>

              <div>
                <div className="iv-ai-title-row">
                  <h3>InnerVoice AI</h3>
                  <span>AI</span>
                </div>

                <div className="iv-ai-status">
                  <i />
                  Ready to listen
                </div>
              </div>
            </div>

            <div className="iv-ai-header-actions">
              <button
                type="button"
                onClick={clearChat}
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw size={15} />
              </button>

              <button
                type="button"
                onClick={() => setMinimized(true)}
                title="Minimize"
                aria-label="Minimize"
              >
                <Minimize2 size={16} />
              </button>

              <button
                type="button"
                onClick={onClose}
                title="Close InnerVoice AI"
                aria-label="Close InnerVoice AI"
              >
                <X size={17} />
              </button>
            </div>
          </header>

          <div className="iv-ai-chat">
            {messages.length === 1 && (
              <div className="iv-ai-welcome">
                <div className="iv-ai-welcome-icon">
                  <Leaf size={24} />
                </div>

                <h4>Your space to think out loud</h4>

                <p>
                  Reflect, create, or simply start a conversation.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`iv-ai-message-row ${
                  message.sender === "user"
                    ? "iv-ai-user-row"
                    : "iv-ai-bot-row"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="iv-ai-small-avatar">
                    <Bot size={14} />
                  </div>
                )}

                <div
                  className={`iv-ai-message ${
                    message.sender === "user"
                      ? "iv-ai-user-message"
                      : "iv-ai-bot-message"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="iv-ai-message-row iv-ai-bot-row">
                <div className="iv-ai-small-avatar">
                  <Bot size={14} />
                </div>

                <div className="iv-ai-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className="iv-ai-prompts">
              <div className="iv-ai-prompts-title">
                <Sparkles size={13} />
                Try asking
              </div>

              <div className="iv-ai-prompt-grid">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    type="button"
                    key={prompt.text}
                    onClick={() => send(prompt.text)}
                  >
                    <span>{prompt.icon}</span>
                    <small>{prompt.text}</small>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="iv-ai-input-area">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
            >
              <div className="iv-ai-input-box">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  disabled={typing}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask InnerVoice AI..."
                  aria-label="Ask InnerVoice AI"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>

            <p className="iv-ai-disclaimer">
              InnerVoice AI is a demo assistant · Conversations may not be
              stored
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        className="iv-ai-floating-button"
        onClick={() => setMinimized((value) => !value)}
        aria-label={
          minimized ? "Open InnerVoice AI" : "Minimize InnerVoice AI"
        }
        title={minimized ? "Open InnerVoice AI" : "Minimize InnerVoice AI"}
      >
        <Bot size={22} />
        <span className="iv-ai-online-dot" />
      </button>
    </div>
  );

  /*
    IMPORTANT:
    Rendering through createPortal places the AI directly under
    document.body. This prevents navbar/modal/transform containers
    from changing its fixed bottom-right position.
  */
  return createPortal(assistant, document.body);
}
