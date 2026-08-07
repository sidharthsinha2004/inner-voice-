import { useState } from "react";
import "./MyCommunities.css";
import communitiesData from "../../data/communities.mock";
import { useNavigate } from "react-router-dom";

function MyCommunities() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [communities, setCommunities] = useState(
    communitiesData.filter((community) => community.joined)
  );

  const toggleJoined = (id) => {

    setCommunities((prev) =>
      prev.filter((community) => community.id !== id)
    );

  };

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="my-communities-page">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="page-header">

        <h1>My Communities</h1>

        <p>
          Communities you've joined. Stay connected and continue engaging with
          people who share your interests.
        </p>

      </div>

      {/* Search */}

      <div className="search-container">

        <input
          type="text"
          placeholder="🔍 Search your communities..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="community-grid">

        {filteredCommunities.map((community) => (

          <div
            className="community-card"
            key={community.id}
            onClick={() => navigate(`/community-details/${community.id}`)}
          >

            <h2>{community.name}</h2>

            <p className="community-category">
              {community.category}
            </p>

            <p>{community.description}</p>

            <div className="community-info">

              <div className="community-stats">

                <span>👥 {community.members} Members</span>

                <div className="active-status">
                  <span className="green-dot"></span>
                  <span>{community.activeMembers} Active Members</span>
                </div>

              </div>

              <button
                className="joined-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleJoined(community.id);
                }}
              >
                Joined ✓
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default MyCommunities;