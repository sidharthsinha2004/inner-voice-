import { useState } from "react";
import "./Followers.css";
import followersData from "../../../data/followers.mock";
import { useNavigate } from "react-router-dom";

function Followers() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [followers, setFollowers] = useState(followersData);

  const toggleFollow = (id) => {

    setFollowers((prev) =>
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

  const filteredFollowers = followers.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="followers-page">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="page-header">

        <h1>Followers</h1>

        <p>
          People who follow you and stay connected with your journey.
        </p>

      </div>

      {/* Search */}

      <div className="search-bar">

        <input
          type="text"
          placeholder="🔍 Search Followers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="followers-list">

        {filteredFollowers.length > 0 ? (

          filteredFollowers.map((person) => (

            <div
              className="follower-card"
              key={person.id}
            >

              <div className="avatar">
                {person.name.charAt(0)}
              </div>

              <div className="follower-info">

                <h2>{person.name}</h2>

                <p>{person.bio}</p>

                <span>
                  📍 {person.location}
                </span>

              </div>

              <button
                className={
                  person.following
                    ? "following-btn"
                    : "follow-btn"
                }
                onClick={() => toggleFollow(person.id)}
              >

                {
                  person.following
                    ? "Following ✓"
                    : "Follow Back"
                }

              </button>

            </div>

          ))

        ) : (

          <div className="no-results">

            <h2>😕 No Followers Found</h2>

            <p>
              Try searching with a different name.
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default Followers;