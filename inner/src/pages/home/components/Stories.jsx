import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Sparkles,
  X,
  ChevronRight,
} from "lucide-react";

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
    <>
      {/* =================================================
          STORIES
      ================================================= */}

      <section className="stories-section">

        <div className="stories-header">

          <div className="stories-heading">
            <span className="stories-heading-icon">
              <Sparkles size={15} />
            </span>

            <div>
              <p className="stories-eyebrow">COMMUNITY</p>
              <h2 className="stories-title">Stories</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="stories-view-all"
          >
            <span>Explore</span>
            <ChevronRight size={16} />
          </button>

        </div>


        <div className="stories-card">

          <div className="stories-scroll">

            {stories.map((story) => (

              <button
                key={story.id}
                type="button"
                onClick={() => handleStoryClick(story)}
                className={`story-item ${
                  story.own ? "story-item-own" : ""
                }`}
              >

                <div className="story-avatar-wrapper">

                  <div
                    className={`story-avatar-ring ${
                      story.own ? "story-own" : ""
                    }`}
                  >

                    <div className="story-avatar-inner">

                      {story.own ? (
                        <div className="story-add-icon">
                          <Plus
                            size={21}
                            strokeWidth={2.4}
                          />
                        </div>
                      ) : (
                        <div className="story-letter">
                          {story.name.charAt(0)}
                        </div>
                      )}

                    </div>

                  </div>

                  {!story.own && (
                    <span className="story-online-dot" />
                  )}

                </div>


                <span className="story-name">
                  {story.name}
                </span>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          STORY VIEWER
      ================================================= */}

      {activeStory && (

        <div className="story-modal">

          <div
            className="story-modal-backdrop"
            onClick={() => setActiveStory(null)}
          />

          <div className="story-viewer">

            {/* Progress */}

            <div className="story-progress">
              <span />
            </div>


            {/* Header */}

            <div className="story-viewer-header">

              <div className="story-viewer-user">

                <div className="story-viewer-avatar">
                  {activeStory.name.charAt(0)}
                </div>

                <div className="story-viewer-user-info">

                  <p>{activeStory.name}</p>

                  <span>
                    <span className="story-status-dot" />
                    Today
                  </span>

                </div>

              </div>


              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="story-close"
                aria-label="Close story"
              >
                <X size={19} />
              </button>

            </div>


            {/* Content */}

            <div className="story-viewer-content">

              <div className="story-viewer-glow" />

              <div className="story-viewer-mark">
                <Sparkles size={20} />
              </div>

              <h3>
                Nothing here yet
              </h3>

              <p>
                {activeStory.name} hasn't shared
                today's story yet.
              </p>

              <span>
                Some voices are worth waiting for.
              </span>

            </div>


            {/* Footer */}

            <div className="story-viewer-footer">
              <span>InnerVoice</span>
            </div>

          </div>

        </div>

      )}
    </>
  );
}