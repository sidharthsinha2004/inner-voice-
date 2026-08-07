import { useState } from "react";

export default function WhisperBox({ onPost }) {
  const [text, setText] = useState("");

  function postThought() {
    if (text.trim() === "") return;

    onPost(text);
    setText("");
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold text-[#2D5B50] mb-4">
        Share Your Thoughts
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind today?"
        className="w-full border rounded-2xl p-4 h-32 resize-none"
      />

      <button
        onClick={postThought}
        className="mt-5 bg-[#2D5B50] hover:bg-[#21453D] text-white px-6 py-3 rounded-xl"
      >
        Share Whisper
      </button>

    </div>
  );
}