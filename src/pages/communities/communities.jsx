import { useState } from "react";
import "./Communities.css";
import communitiesData from "../../data/communities.mock";
import { useNavigate } from "react-router-dom";

function Communities() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [communities, setCommunities] = useState(communitiesData);

  const toggleJoin = (id) => {

    setCommunities((prev) =>
      prev.map((community) =>
        community.id === id
          ? { ...community, joined: !community.joined }
          : community
      )
    );

  };

  const filteredCommunities = communities.filter((community) => {

    const matchesSearch =
      community.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      community.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  return (

    <div className="communities-page">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Page Header */}

      <div className="page-header">

        <h1>Communities</h1>

        <p>
          Find and join communities that match your interests and connect with
          like-minded people.
        </p>

      </div>

      {/* Search */}

      <div className="search-section">

        <input
          type="text"
          placeholder="Search communities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Categories */}

      <div className="category-buttons">

        <button
          className={selectedCategory === "All" ? "active-category" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        <button
          className={selectedCategory === "Mental Health" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Mental Health")}
        >
          Mental Health
        </button>

        <button
          className={selectedCategory === "Career" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Career")}
        >
          Career
        </button>

        <button
          className={selectedCategory === "Education" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Education")}
        >
          Education
        </button>

        <button
          className={selectedCategory === "Music" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Music")}
        >
          Music
        </button>

        <button
          className={selectedCategory === "Gaming" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Gaming")}
        >
          Gaming
        </button>

        <button
          className={selectedCategory === "Fitness" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Fitness")}
        >
          Fitness
        </button>

      </div>

      {/* Community Cards */}

      <div className="community-grid">

        {filteredCommunities.map((community) => (

          <div
            className="community-card"
            key={community.id}
            onClick={() => navigate(`/community-details/${community.id}`)}
          >

            <div className="community-card-header">

              <h2>{community.name}</h2>

              <button
                className="join-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleJoin(community.id);
                }}
              >
                {community.joined ? "Joined ✓" : "Join"}
              </button>

            </div>

            <p className="community-description">
              {community.description}
            </p>

            <div className="community-meta">

              <span className="community-category">
                {community.category}
              </span>

              <span className="community-members">
                👥 {community.members} Members
              </span>

              <span className="community-active">

                <span className="green-dot"></span>

                {community.activeMembers} Active Members

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Communities;