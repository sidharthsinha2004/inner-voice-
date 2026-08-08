import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: localStorage.getItem("fullName") || "Advait Bhanuse",
    username: localStorage.getItem("username") || "@advaitb",
    bio:
      localStorage.getItem("bio") ||
      "Building products that help people connect.",
    location: localStorage.getItem("location") || "Pune, India",
    profileImage: localStorage.getItem("profileImage") || null
  });

  const names = [
    profile.fullName,
    "अद्वैत भानुसे",
    "অদ্বৈত ভানুসে",
    "અદ્વૈત ભાનુસે",
    "ਅਦਵੈਤ ભાનુસે",
    "ಅದ್ವೈತ್ ಭಾನುಸೆ",
    "అద్వైత్ భానుసే",
    "அத்வைத் பானுஸே",
    "അദ്വൈത് ഭാനുസെ"
  ];

  const [currentName, setCurrentName] = useState(0);

  useEffect(() => {

    setProfile({
      fullName: localStorage.getItem("fullName") || "Advait Bhanuse",
      username: localStorage.getItem("username") || "@advaitb",
      bio:
        localStorage.getItem("bio") ||
        "Building products that help people connect.",
      location: localStorage.getItem("location") || "Pune, India",
      profileImage: localStorage.getItem("profileImage") || null
    });

    const interval = setInterval(() => {
      setCurrentName((prev) => (prev + 1) % names.length);
    }, 2400);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">

          {profile.profileImage ? (

            <img
              src={profile.profileImage}
              alt="Profile"
              className="profile-image"
            />

          ) : (

            "AB"

          )}

        </div>

        <h1 key={currentName} className="animated-name">
          {names[currentName]}
        </h1>

        <p className="username">
          {profile.username}
        </p>

        <p className="bio">
          {profile.bio}
        </p>

        <div className="profile-details">
          <span>📍 {profile.location}</span>
          <span>📅 Joined August 2026</span>
        </div>

      </div>

      {/* Stats */}

      <div className="stats-grid">

        <div
          className="stat-card"
          onClick={() => navigate("/communities")}
        >

          <div className="stat-icon">🌿</div>

          <h2>6</h2>

          <p>Communities</p>

        </div>

        <div
          className="stat-card"
          onClick={() => navigate("/followers")}
        >

          <div className="stat-icon">👥</div>

          <h2>248</h2>

          <p>Followers</p>

        </div>

        <div
          className="stat-card"
          onClick={() => navigate("/following")}
        >

          <div className="stat-icon">👤</div>

          <h2>187</h2>

          <p>Following</p>

        </div>

      </div>

      {/* About */}

      <div className="about-card">

        <h2>About Me</h2>

        <p>
          Computer Engineering student passionate about web development,
          UI/UX, and building products that solve real-world problems.
        </p>

      </div>

      {/* My Communities */}

      <div className="my-communities-section">

        <button
          className="my-communities-btn"
          onClick={() => navigate("/my-communities")}
        >
          🌿 View My Communities
        </button>

      </div>

      {/* Interests */}

      <div className="interests-card">

        <h2>Interests</h2>

     <div className="interest-tags">

  <span onClick={() => navigate("/community-details/1")}>
    Mental Health
  </span>

  <span onClick={() => navigate("/community-details/2")}>
    Career
  </span>

  <span onClick={() => navigate("/community-details/3")}>
    Education
  </span>

  <span onClick={() => navigate("/community-details/5")}>
    Gaming
  </span>

  <span onClick={() => navigate("/community-details/4")}>
    Music
  </span>

  <span onClick={() => navigate("/community-details/6")}>
    Fitness
  </span>

</div>

      </div>

      <button
        className="edit-profile-btn"
        onClick={() => navigate("/edit-profile")}
      >
        Edit Profile
      </button>

    </div>

  );

}

export default Profile;