import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Sparkles, X } from "lucide-react";

const stories = [
  { id: 1, name: "Your Story", own: true },
  { id: 2, name: "Anonymous 01" },
  { id: 3, name: "Silent Soul" },
  { id: 4, name: "Night Owl" },
  { id: 5, name: "Dreamer" },
  { id: 6, name: "Confessor" },
  { id: 7, name: "Inner Mind" },
  { id: 8, name: "Hidden Voice" },
];

export default function Stories() {
  const navigate = useNavigate();
  const [activeStory, setActiveStory] = useState(null);

  const handleStoryClick = (story) => {
    if (story.own) {
      navigate("/create-post");
      return;
    }
    setActiveStory(story);
  };

  return (
    <section className="w-full">
      {/* Heading */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
            Stories
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Discover today's voices
          </p>
        </div>

        <button
          onClick={() => navigate("/explore")}
          className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] dark:text-[var(--accent-text-dark)] hover:text-[var(--accent-hover)] transition"
        >
          <Sparkles size={18} />
          Explore
        </button>
      </div>

      {/* Stories */}
      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => handleStoryClick(story)}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
          >
            {/* Avatar */}
            <div
              className={`relative h-20 w-20 rounded-full p-[3px] transition-all duration-300 group-hover:scale-105 ${
                story.own
                  ? "bg-[var(--accent)]"
                  : "bg-gradient-to-br from-[#3B8069] via-[#5F8CAE] to-[#B87D22]"
              }`}
            >
              <div className="bg-white dark:bg-stone-900 h-full w-full rounded-full flex items-center justify-center">
                {story.own ? (
                  <Plus size={28} className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-xl font-bold text-stone-700 dark:text-stone-200">
                    {story.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Username */}
            <p className="text-xs text-center mt-3 font-medium text-stone-700 dark:text-stone-300 w-20 truncate">
              {story.name}
            </p>
          </button>
        ))}
      </div>

      {/* Story viewer (demo placeholder content) */}
      {activeStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-stone-950/80"
            onClick={() => setActiveStory(null)}
          />

          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--accent)] via-[#3B8069] to-[#5F8CAE] aspect-[9/16] flex flex-col animate-modal-in">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  {activeStory.name.charAt(0)}
                </div>
                <p className="text-white text-sm font-semibold">
                  {activeStory.name}
                </p>
              </div>

              <button
                onClick={() => setActiveStory(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition"
                aria-label="Close story"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center px-8 text-center">
              <p className="text-white text-lg font-medium leading-8">
                "{activeStory.name} hasn't shared today's story yet — check
                back soon 🌿"
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
