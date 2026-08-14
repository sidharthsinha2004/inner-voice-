import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  TrendingUp,
  Users,
  BrainCircuit,
  ArrowUpRight,
  Check,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { useAppData } from "../context/AppDataContext";

export default function RightSidebar() {
  const navigate = useNavigate();

  const {
    posts,
    communities,
    toggleJoinCommunity,
  } = useAppData();

  /* =====================================================
     TRENDING TOPICS
  ===================================================== */

  const trendingTopics = useMemo(() => {
    const counts = {};

    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({
        tag,
        count,
      }));
  }, [posts]);

  const topCommunities = communities.slice(0, 3);

  return (
    <aside className="iv-right-rail">

      {/* =================================================
          RAIL HEADER
      ================================================= */}

      <div className="iv-right-rail-header">

        <div>
          <p className="iv-right-eyebrow">
            Discover
          </p>

          <h2>
            What's happening
          </h2>
        </div>

        <div className="iv-right-status">
          <span />
          Live
        </div>

      </div>


      {/* =================================================
          TRENDING
      ================================================= */}

      <section className="iv-right-card iv-trending-card">

        <div className="iv-right-card-header">

          <div className="iv-card-title">

            <div className="iv-card-icon iv-card-icon-green">
              <TrendingUp size={16} />
            </div>

            <div>
              <h3>
                Trending
              </h3>

              <p>
                Popular conversations
              </p>
            </div>

          </div>

          <span className="iv-card-count">
            {trendingTopics.length}
          </span>

        </div>


        <div className="iv-trending-list">

          {trendingTopics.length > 0 ? (
            trendingTopics.map((topic, index) => (
              <button
                key={topic.tag}
                type="button"
                onClick={() =>
                  navigate(
                    `/search?q=${encodeURIComponent(
                      topic.tag
                    )}`
                  )
                }
                className="iv-trending-item"
              >

                <div className="iv-trending-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="iv-trending-content">

                  <strong>
                    #{topic.tag}
                  </strong>

                  <span>
                    {topic.count}{" "}
                    {topic.count === 1
                      ? "conversation"
                      : "conversations"}
                  </span>

                </div>

                <ChevronRight
                  size={15}
                  className="iv-trending-arrow"
                />

              </button>
            ))
          ) : (

            <div className="iv-empty-state">
              <TrendingUp size={18} />

              <span>
                No trending topics yet
              </span>
            </div>

          )}

        </div>

      </section>


      {/* =================================================
          COMMUNITIES
      ================================================= */}

      <section className="iv-right-card iv-community-card">

        <div className="iv-right-card-header">

          <div className="iv-card-title">

            <div className="iv-card-icon iv-card-icon-blue">
              <Users size={16} />
            </div>

            <div>
              <h3>
                Communities
              </h3>

              <p>
                Find your people
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/communities")}
            className="iv-see-all"
          >
            See all
          </button>

        </div>


        <div className="iv-community-list">

          {topCommunities.map((community) => (

            <div
              key={community.id}
              className="iv-community-item"
            >

              <button
                type="button"
                onClick={() =>
                  navigate("/communities")
                }
                className="iv-community-info"
              >

                <div className="iv-community-avatar">
                  {community.name
                    ?.charAt(0)
                    ?.toUpperCase() || "C"}
                </div>

                <div className="iv-community-text">

                  <strong>
                    {community.name}
                  </strong>

                  <span>
                    {community.members.toLocaleString()}{" "}
                    members
                  </span>

                </div>

              </button>


              <button
                type="button"
                onClick={() =>
                  toggleJoinCommunity(
                    community.id
                  )
                }
                className={`iv-community-action ${
                  community.joined
                    ? "is-joined"
                    : ""
                }`}
              >

                {community.joined ? (
                  <>
                    <Check size={13} />
                    Joined
                  </>
                ) : (
                  "Join"
                )}

              </button>

            </div>

          ))}

        </div>


        <button
          type="button"
          onClick={() =>
            navigate("/communities")
          }
          className="iv-community-footer"
        >
          Explore communities

          <ArrowUpRight size={15} />

        </button>

      </section>


      {/* =================================================
          AI INSIGHT
      ================================================= */}

      <section className="iv-ai-insight">

        <div className="iv-ai-insight-glow" />

        <div className="iv-ai-insight-top">

          <div className="iv-ai-insight-icon">
            <BrainCircuit size={19} />
          </div>

          <div>

            <span>
              InnerVoice AI
            </span>

            <h3>
              Today's insight
            </h3>

          </div>

        </div>


        <p>
          Conversations are focusing on{" "}
          <strong>
            mental wellness
          </strong>{" "}
          and{" "}
          <strong>
            career growth
          </strong>{" "}
          today. Explore what people are talking about.
        </p>


        <button
          type="button"
          onClick={() => navigate("/explore")}
          className="iv-ai-insight-button"
        >

          Explore discussions

          <ArrowUpRight size={16} />

        </button>

      </section>


      {/* =================================================
          DAILY INSPIRATION
      ================================================= */}

      <section className="iv-inspiration-card">

        <div className="iv-inspiration-header">

          <div className="iv-inspiration-icon">
            <Sparkles size={15} />
          </div>

          <div>
            <span>
              Daily inspiration
            </span>

            <small>
              A thought for today
            </small>
          </div>

        </div>


        <blockquote>
          "Your voice has value. Share your thoughts
          today — someone out there may need to hear
          them."
        </blockquote>


        <div className="iv-inspiration-line">
          <span />
          <span />
          <span />
        </div>

      </section>

    </aside>
  );
}