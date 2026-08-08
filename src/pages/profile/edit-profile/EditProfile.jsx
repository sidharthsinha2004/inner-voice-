import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {

  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null
  );

  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || "Advait Bhanuse"
  );

  const [username, setUsername] = useState(
    localStorage.getItem("username") || "@advaitb"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("email") || "advait@email.com"
  );

  const [bio, setBio] = useState(
    localStorage.getItem("bio") ||
      "Building products that help people connect and improve mental well-being."
  );

  const [location, setLocation] = useState(
    localStorage.getItem("location") || "Pune, Maharashtra"
  );

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result);
      };

      reader.readAsDataURL(file);

    }

  };

  const handleSave = () => {

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);
    localStorage.setItem("location", location);
    localStorage.setItem("profileImage", profileImage);

    navigate("/profile");

  };

  return (

    <div className="edit-profile-page">

      <div className="edit-profile-card">

        <h1>Edit Profile</h1>

        <div className="profile-photo-section">

          <div className="profile-avatar">

            {profileImage ? (

              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
              />

            ) : (

              "AB"

            )}

            <div className="avatar-overlay">
              📷 Edit
            </div>

          </div>

          <label className="change-photo-btn">

            Change Photo

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

          </label>

        </div>

        <form className="edit-profile-form">

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Bio</label>

            <textarea
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Location</label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Interests</label>

            <div className="interest-tags">

              <span>Mental Health</span>
              <span>Career</span>
              <span>Education</span>
              <span>Gaming</span>
              <span>Music</span>
              <span>Fitness</span>

            </div>

          </div>

          <div className="button-group">

            <button
              type="button"
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditProfile;