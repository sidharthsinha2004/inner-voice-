import { useState } from "react";
import { Send, Bot, User, Heart } from "lucide-react";

export default function MindGuide() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "Hello 👋 I'm your AI Wellness Assistant. How are you feeling today?",
    },
  ]);

  function getReply(text) {
    const msg = text.toLowerCase();

    if (msg.includes("sad"))
      return "💙 I'm sorry you're feeling sad. Remember that difficult moments don't last forever. Try talking to someone you trust.";

    if (msg.includes("happy"))
      return "😊 That's wonderful! Keep doing the things that make you smile.";

    if (msg.includes("stress") || msg.includes("exam"))
      return "📚 Exams can be stressful. Break your study into small sessions and don't forget to rest.";

    if (msg.includes("angry"))
      return "🌿 Take a deep breath. Sometimes walking away for a few minutes helps calm your mind.";

    if (msg.includes("anxious"))
      return "💚 It's okay to feel anxious. Focus on slow breathing and remember you're stronger than your worries.";

    if (msg.includes("lonely"))
      return "❤️ You're not alone. Reach out to a friend, family member, or someone you trust.";

    return "🤖 Thank you for sharing your feelings. I'm always here to listen and support you.";
  }

  function sendMessage() {
    if (input.trim() === "") return;

    const userMessage = {
      sender: "You",
      text: input,
    };

    const aiMessage = {
      sender: "AI",
      text: getReply(input),
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  }

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-[#2D5B50] to-[#567DAA] rounded-3xl p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">
          🤖 AI Wellness Assistant
        </h1>

        <p className="mt-3 text-lg">
          Your personal companion for emotional support and positive guidance.
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-lg h-[600px] flex flex-col">

        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`flex ${
                message.sender === "You"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[75%] rounded-2xl p-4 ${
                  message.sender === "You"
                    ? "bg-[#2D5B50] text-white"
                    : "bg-gray-100"
                }`}
              >

                <div className="flex items-center gap-2 mb-2">

                  {message.sender === "AI" ? (
                    <Bot size={18} />
                  ) : (
                    <User size={18} />
                  )}

                  <strong>{message.sender}</strong>

                </div>

                {message.text}

              </div>

            </div>

          ))}

        </div>

        <div className="border-t p-5 flex gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me how you're feeling..."
            className="flex-1 border rounded-xl px-4 py-3"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-[#2D5B50] hover:bg-[#21453D] text-white px-6 rounded-xl flex items-center gap-2"
          >
            <Send size={18} />
            Send
          </button>

        </div>

      </div>

      {/* Extra Wellness Cards */}

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <Heart className="text-red-500 mb-3" />

          <h2 className="font-bold text-lg">
            Daily Affirmation
          </h2>

          <p className="mt-2 text-gray-600">
            Believe in yourself. Every small step counts.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="font-bold text-lg">
            Mood Check
          </h2>

          <p className="mt-2 text-gray-600">
            😊 Happy • 😌 Calm • 😔 Sad • 😟 Anxious
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="font-bold text-lg">
            Breathing Exercise
          </h2>

          <p className="mt-2 text-gray-600">
            Inhale 4 sec • Hold 4 sec • Exhale 4 sec
          </p>

        </div>

      </div>

    </div>
  );
}