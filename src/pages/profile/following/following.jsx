import { useState } from "react";
import "./Following.css";
import followingData from "../../../data/following.mock";
import { useNavigate } from "react-router-dom";

function Following() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [following, setFollowing] = useState(followingData);

  const toggleFollowing = (id) => {

    setFollowing((prev) =>
      prev.map((person) =>
        person.id === id
          ? {
              ...person,
              following: !person.following,
            }
          : person
      )
    );

  };

  const filteredFollowing = following.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="following-page">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="page-header">

        <h1>Following</h1>

        <p>
          People you follow and stay connected with.
        </p>

      </div>

      {/* Search */}

      <div className="search-bar">

        <input
          type="text"
          placeholder="🔍 Search Following..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="following-list">

        {filteredFollowing.length > 0 ? (

          filteredFollowing.map((person) => (

            <div
              className="following-card"
              key={person.id}
            >

              <div className="avatar">
                {person.name.charAt(0)}
              </div>

              <div className="following-info">

                <h2>{person.name}</h2>

                <p>{person.bio}</p>

                <span>📍 {person.location}</span>

              </div>

              <button
                className={
                  person.following
                    ? "following-btn"
                    : "follow-btn"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFollowing(person.id);
                }}
              >

                {
                  person.following
                    ? "Following ✓"
                    : "Follow"
                }

              </button>

            </div>

          ))

        ) : (

          <div className="no-results">

            <h2>😕 No Following Found</h2>

            <p>
              Try searching with a different name.
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default Following;