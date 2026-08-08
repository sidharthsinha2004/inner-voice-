import { useState } from "react";
import "./CommunityDetails.css";
import communityDetails from "../../data/communityDetails.mock";
import { useNavigate, useParams } from "react-router-dom";

function CommunityDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const community = communityDetails.find(
    (item) => item.id === Number(id)
  );

  const [joined, setJoined] = useState(community?.joined);

  if (!community) {

    return (

      <div className="community-details-page">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2>Community Not Found</h2>

      </div>

    );

  }

  return (

    <div className="community-details-page">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back to Communities
      </button>

      {/* Header */}

      <section className="community-header">

        <div className="community-info">

          <h1>{community.name}</h1>

          <div className="community-meta">

            <span className="community-category">
              {community.category}
            </span>

            <div className="community-members-info">

              <span className="community-members">
                👥 {community.members} Members
              </span>

              <span className="active-members">

                <span className="green-dot"></span>

                {community.activeMembers} Active Members

              </span>

            </div>

          </div>

        </div>

        <button
          className={`join-btn ${joined ? "joined-btn" : ""}`}
          onClick={() => setJoined(!joined)}
        >
          {joined ? "Joined ✓" : "Join Community"}
        </button>

      </section>

      {/* About */}

      <section className="about-section">

        <h2>About</h2>

        <p>{community.description}</p>

      </section>

      {/* Rules */}

      <section className="rules-section">

        <h2>Community Rules</h2>

        <ul>

          {community.rules.map((rule, index) => (

            <li key={index}>
              {rule}
            </li>

          ))}

        </ul>

      </section>

      {/* Discussions */}

      <section className="discussion-section">

        <h2>Recent Discussions</h2>

        {community.discussions.map((discussion) => (

          <div
            className="discussion-card"
            key={discussion.id}
          >

            <h3>{discussion.title}</h3>

            <p>{discussion.content}</p>

          </div>

        ))}

      </section>

    </div>

  );

}

export default CommunityDetails;