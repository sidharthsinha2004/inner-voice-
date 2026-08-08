import { useApp } from "../context/AppContext";

import WhisperBox from "../ui/WhisperBox";
import ThoughtCard from "../ui/ThoughtCard";
import InfoPanel from "../ui/InfoPanel";

export default function Feed() {
  const { thoughts, setThoughts, username, addNotification } = useApp();

  function addThought(text) {
    if (text.trim() === "") return;

    const newThought = {
      id: Date.now(),
      name: username,
      mood: "😊 Hopeful",
      time: "Just now",
      message: text,
      likes: 0,
      comments: 0,
    };

    setThoughts([newThought, ...thoughts]);

    addNotification(
      "📝 New Whisper",
      "Your whisper has been posted successfully."
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8">

      {/* Left Side */}
      <div className="col-span-8">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#2D5B50] to-[#567DAA] text-white rounded-3xl p-8 shadow-lg mb-8">

          <h1 className="text-4xl font-bold">
            Welcome to InnerVoice 🌿
          </h1>

          <p className="mt-3 text-lg">
            Express your thoughts safely, anonymously,
            and connect with a supportive community.
          </p>

        </div>

        {/* Whisper Box */}
        <WhisperBox onPost={addThought} />

        {/* Feed */}
        <div className="space-y-6">

          {thoughts.map((thought) => (
            <ThoughtCard
              key={thought.id}
              thought={thought}
            />
          ))}

        </div>

      </div>

      {/* Right Side */}
      <InfoPanel />

    </div>
  );
}