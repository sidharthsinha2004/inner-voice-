import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, ArrowLeft } from "lucide-react";

import { useAppData } from "../../context/AppDataContext";

export default function Messages() {
  const { conversations, sendMessage, markConversationRead } = useAppData();
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? null);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const active = conversations.find((c) => c.id === activeId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages.length]);

  const openConversation = (id) => {
    setActiveId(id);
    markConversationRead(id);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !activeId) return;
    sendMessage(activeId, input);
    setInput("");
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm overflow-hidden h-[calc(100vh-11rem)] min-h-[420px] flex">
      {/* Conversation list */}
      <div
        className={`w-full sm:w-72 border-r border-stone-100 dark:border-stone-800 flex-col ${
          active ? "hidden sm:flex" : "flex"
        }`}
      >
        <div className="px-5 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center gap-2">
          <MessageCircle className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={20} />
          <h1 className="font-bold text-stone-900 dark:text-stone-50">
            Messages
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => {
            const lastMessage = c.messages[c.messages.length - 1];
            return (
              <button
                key={c.id}
                onClick={() => openConversation(c.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left border-b border-stone-50 dark:border-stone-800/60 transition ${
                  activeId === c.id
                    ? "bg-[var(--accent-soft)] dark:bg-stone-800"
                    : "hover:bg-stone-50 dark:hover:bg-stone-800/60"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#3B8069] to-[#5F8CAE] flex items-center justify-center text-white font-bold">
                    {c.name.charAt(0)}
                  </div>
                  {c.lastSeen === "Online" && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-stone-900 dark:text-stone-50 text-sm truncate">
                      {c.name}
                    </p>
                    {c.unread > 0 && (
                      <span className="h-5 min-w-5 px-1 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold flex items-center justify-center">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    {lastMessage ? lastMessage.text : "Say hello 👋"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat window */}
      <div className={`flex-1 flex-col ${active ? "flex" : "hidden sm:flex"}`}>
        {active ? (
          <>
            <div className="px-5 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center gap-3">
              <button
                onClick={() => setActiveId(null)}
                className="sm:hidden p-1.5 -ml-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition text-stone-600 dark:text-stone-300"
                aria-label="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#3B8069] to-[#5F8CAE] flex items-center justify-center text-white font-bold">
                {active.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-stone-900 dark:text-stone-50 text-sm">
                  {active.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {active.lastSeen}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {active.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                      m.sender === "me"
                        ? "bg-[var(--accent)] text-white rounded-br-sm"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                    <p
                      className={`text-[10px] mt-1 ${
                        m.sender === "me" ? "text-stone-200" : "text-stone-400"
                      }`}
                    >
                      {m.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 px-5 py-4 border-t border-stone-100 dark:border-stone-800"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-full px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-3 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-40 transition"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-stone-400 text-sm">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
