import { useState } from "react";
import "./profile.css";

import {
  MapPin,
  Edit3,
  Share2,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  LockKeyhole,
  Shield,
  EyeOff,
  RefreshCw,
  Check,
  Palette,
  UserRound,
} from "lucide-react";


/* =====================================================
   RANDOM PUBLIC IDENTITY GENERATOR
===================================================== */

function generatePublicIdentity() {
  const adjectives = [
    "quiet",
    "silent",
    "hidden",
    "soft",
    "calm",
    "gentle",
    "distant",
    "wandering",
    "little",
    "unknown",
    "silver",
    "midnight",
    "still",
    "fading",
  ];

  const nouns = [
    "river",
    "moon",
    "echo",
    "forest",
    "cloud",
    "orbit",
    "wave",
    "star",
    "comet",
    "sky",
    "mist",
    "rain",
    "ocean",
    "light",
  ];

  const adjective =
    adjectives[
      Math.floor(Math.random() * adjectives.length)
    ];

  const noun =
    nouns[
      Math.floor(Math.random() * nouns.length)
    ];

  const number =
    Math.floor(1000 + Math.random() * 9000);

  return `${adjective}_${noun}_${number}`;
}


/* =====================================================
   THEMES
===================================================== */

const themes = [
  {
    id: "forest",
    name: "Forest",
    primary: "#275a49",
    secondary: "#85bba3",
    background: "#eef5f1",
  },

  {
    id: "ocean",
    name: "Ocean",
    primary: "#315f78",
    secondary: "#85b4cc",
    background: "#edf5f8",
  },

  {
    id: "lavender",
    name: "Lavender",
    primary: "#67527d",
    secondary: "#b6a0cc",
    background: "#f4f0f8",
  },

  {
    id: "sunset",
    name: "Sunset",
    primary: "#8b5b43",
    secondary: "#dba17c",
    background: "#fbf1eb",
  },

  {
    id: "rose",
    name: "Rose",
    primary: "#825363",
    secondary: "#d39aaa",
    background: "#faf0f3",
  },

  {
    id: "midnight",
    name: "Midnight",
    primary: "#39425d",
    secondary: "#7d89ad",
    background: "#eff1f6",
  },
];


/* =====================================================
   PROFILE
===================================================== */

export default function Profile() {

  /* PRIVATE USERNAME */

  const [privateUsername] = useState(() => {
    const saved =
      localStorage.getItem("privateUsername");

    if (saved) return saved;

    const username = "sidharth_sinha";

    localStorage.setItem(
      "privateUsername",
      username
    );

    return username;
  });


  /* PUBLIC IDENTITY */

  const [publicIdentity] = useState(() => {
    const saved =
      localStorage.getItem("publicIdentity");

    if (saved) return saved;

    const generated =
      generatePublicIdentity();

    localStorage.setItem(
      "publicIdentity",
      generated
    );

    return generated;
  });


  /* PROFILE DATA */

  const [name, setName] =
    useState("Sidharth Sinha");

  const [bio, setBio] = useState(
    "Building quietly, learning constantly."
  );

  const [location, setLocation] =
    useState("India");

  const [editOpen, setEditOpen] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("posts");

  const [following, setFollowing] =
    useState(false);

  const [selectedTheme, setSelectedTheme] =
    useState(() => {
      return (
        localStorage.getItem(
          "profileTheme"
        ) || "forest"
      );
    });


  /* TEMP EDIT VALUES */

  const [tempName, setTempName] =
    useState(name);

  const [tempBio, setTempBio] =
    useState(bio);

  const [tempLocation, setTempLocation] =
    useState(location);

  const [tempTheme, setTempTheme] =
    useState(selectedTheme);


  /* POSTS */

  const [posts, setPosts] = useState([
    {
      id: 1,
      text:
        "Sometimes the quietest moments give you the clearest answers.",
      time: "2h",
      likes: 148,
      comments: 12,
      liked: false,
      saved: false,
    },

    {
      id: 2,
      text:
        "Learning to build things one small step at a time.",
      time: "1d",
      likes: 93,
      comments: 8,
      liked: false,
      saved: false,
    },

    {
      id: 3,
      text:
        "Not every thought needs to become noise.",
      time: "3d",
      likes: 216,
      comments: 19,
      liked: true,
      saved: true,
    },
  ]);


  /* CURRENT THEME */

  const currentTheme =
    themes.find(
      (theme) =>
        theme.id === selectedTheme
    ) || themes[0];


  /* ===============================================
     EDIT PROFILE
  =============================================== */

  function openEditProfile() {
    setTempName(name);
    setTempBio(bio);
    setTempLocation(location);
    setTempTheme(selectedTheme);

    setEditOpen(true);
  }


  function saveProfile() {
    setName(tempName);
    setBio(tempBio);
    setLocation(tempLocation);
    setSelectedTheme(tempTheme);

    localStorage.setItem(
      "profileTheme",
      tempTheme
    );

    setEditOpen(false);
  }


  /* ===============================================
     POST LIKE
  =============================================== */

  function toggleLike(id) {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== id) {
          return post;
        }

        return {
          ...post,

          liked: !post.liked,

          likes: post.liked
            ? post.likes - 1
            : post.likes + 1,
        };
      })
    );
  }


  /* ===============================================
     SAVE POST
  =============================================== */

  function toggleSave(id) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              saved: !post.saved,
            }
          : post
      )
    );
  }


  /* ===============================================
     FILTER POSTS
  =============================================== */

  const visiblePosts =
    activeTab === "likes"
      ? posts.filter(
          (post) => post.liked
        )
      : activeTab === "saved"
      ? posts.filter(
          (post) => post.saved
        )
      : posts;


  return (
    <div
      className="profile-page"
      style={{
        "--profile-primary":
          currentTheme.primary,

        "--profile-secondary":
          currentTheme.secondary,

        "--profile-background":
          currentTheme.background,
      }}
    >

      <main className="profile-container">

        {/* =====================================
            COVER
        ===================================== */}

        <section className="profile-cover">

          <div className="cover-shape shape-one" />
          <div className="cover-shape shape-two" />
          <div className="cover-shape shape-three" />

          <div className="cover-actions">

            <button
              type="button"
              aria-label="Share profile"
            >
              <Share2 size={17} />
            </button>

            <button
              type="button"
              aria-label="More options"
            >
              <MoreHorizontal size={18} />
            </button>

          </div>

        </section>


        {/* =====================================
            PROFILE INFO
        ===================================== */}

        <section className="profile-info">

          <div className="profile-avatar">
            <UserRound size={48} />

            <span className="online-dot" />
          </div>


          <div className="profile-actions">

            <button
              type="button"
              className="edit-profile-button"
              onClick={openEditProfile}
            >
              <Edit3 size={15} />
              Edit profile
            </button>


            <button
              type="button"
              className={`follow-button ${
                following
                  ? "following"
                  : ""
              }`}
              onClick={() =>
                setFollowing(!following)
              }
            >
              {following
                ? "Following"
                : "Follow"}
            </button>

          </div>


          <div className="profile-name">

            <h1>{name}</h1>

            {/* ONLY PUBLIC IDENTITY IS SHOWN */}

            <span className="public-username">
              @{publicIdentity}
            </span>

          </div>


          <p className="profile-bio">
            {bio}
          </p>


          <div className="profile-location">
            <MapPin size={14} />
            {location}
          </div>


          {/* =====================================
              STATS
          ===================================== */}

          <div className="profile-stats">

            <div>
              <strong>{posts.length}</strong>
              <span>Posts</span>
            </div>

            <div>
              <strong>12.4K</strong>
              <span>Followers</span>
            </div>

            <div>
              <strong>342</strong>
              <span>Following</span>
            </div>

            <div>
              <strong>28.9K</strong>
              <span>Views</span>
            </div>

          </div>

        </section>


        {/* =====================================
            TABS
        ===================================== */}

        <nav className="profile-tabs">

          {[
            ["posts", "Posts"],
            ["likes", "Likes"],
            ["saved", "Saved"],
          ].map(([value, label]) => (

            <button
              type="button"
              key={value}
              className={
                activeTab === value
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab(value)
              }
            >
              {label}
            </button>

          ))}

        </nav>


        {/* =====================================
            POSTS
        ===================================== */}

        <section className="posts-grid">

          {visiblePosts.length === 0 ? (

            <div className="empty-posts">
              <Heart size={24} />

              <h3>
                Nothing here yet
              </h3>

              <p>
                Your {activeTab} will appear
                here.
              </p>
            </div>

          ) : (

            visiblePosts.map((post) => (

              <article
                className="post-card"
                key={post.id}
              >

                <header className="post-header">

                  <div className="post-avatar">
                    <UserRound size={18} />
                  </div>

                  <div className="post-user">

                    <strong>{name}</strong>

                    <span>
                      @{publicIdentity} ·{" "}
                      {post.time}
                    </span>

                  </div>

                  <button
                    type="button"
                    className="post-more"
                    aria-label="Post options"
                  >
                    <MoreHorizontal
                      size={17}
                    />
                  </button>

                </header>


                <p className="post-text">
                  {post.text}
                </p>


                <footer className="post-actions">

                  <button
                    type="button"
                    className={
                      post.liked
                        ? "liked"
                        : ""
                    }
                    onClick={() =>
                      toggleLike(post.id)
                    }
                  >
                    <Heart
                      size={16}
                      fill={
                        post.liked
                          ? "currentColor"
                          : "none"
                      }
                    />

                    {post.likes}
                  </button>


                  <button type="button">
                    <MessageCircle
                      size={16}
                    />

                    {post.comments}
                  </button>


                  <button
                    type="button"
                    className={
                      post.saved
                        ? "saved"
                        : ""
                    }
                    onClick={() =>
                      toggleSave(post.id)
                    }
                  >
                    <Bookmark
                      size={16}
                      fill={
                        post.saved
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                </footer>

              </article>

            ))

          )}

        </section>

      </main>


      {/* =================================================
          EDIT PROFILE MODAL
      ================================================= */}

      {editOpen && (

        <div
          className="edit-overlay"
          onClick={() =>
            setEditOpen(false)
          }
        >

          <div
            className="edit-profile-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="edit-modal-header">

              <div>
                <span>
                  PROFILE SETTINGS
                </span>

                <h2>
                  Edit profile
                </h2>
              </div>

              <button
                type="button"
                className="close-edit"
                onClick={() =>
                  setEditOpen(false)
                }
              >
                ×
              </button>

            </div>


            <div className="edit-modal-content">

              {/* ===============================
                  BASIC INFORMATION
              =============================== */}

              <section className="customize-section">

                <div className="customize-heading">
                  <h3>
                    Profile information
                  </h3>

                  <p>
                    Update your public profile
                    information.
                  </p>
                </div>


                <div className="profile-form">

                  <label>
                    Name

                    <input
                      type="text"
                      value={tempName}
                      onChange={(event) =>
                        setTempName(
                          event.target.value
                        )
                      }
                    />
                  </label>


                  <label>
                    Bio

                    <textarea
                      value={tempBio}
                      maxLength={150}
                      onChange={(event) =>
                        setTempBio(
                          event.target.value
                        )
                      }
                    />
                  </label>


                  <label>
                    Location

                    <input
                      type="text"
                      value={tempLocation}
                      onChange={(event) =>
                        setTempLocation(
                          event.target.value
                        )
                      }
                    />
                  </label>

                </div>

              </section>


              {/* =================================================
                  IDENTITY SYSTEM
              ================================================= */}

              <section className="customize-section identity-settings-section">

                <div className="customize-heading">

                  <h3>
                    Identity
                  </h3>

                  <p>
                    Your private account and
                    public InnerVoice identity
                    are kept separate.
                  </p>

                </div>


                <div className="profile-identity-grid">

                  {/* PRIVATE */}

                  <div className="profile-identity-card private-card">

                    <div className="identity-card-icon">
                      <LockKeyhole
                        size={18}
                      />
                    </div>

                    <div>

                      <span className="identity-card-label">
                        PRIVATE ACCOUNT
                      </span>

                      <strong>
                        @{privateUsername}
                      </strong>

                      <p>
                        Only you can see this
                        username.
                      </p>

                    </div>

                  </div>


                  {/* PUBLIC */}

                  <div className="profile-identity-card public-card">

                    <div className="identity-card-icon">
                      <Shield size={18} />
                    </div>

                    <div>

                      <span className="identity-card-label">
                        PUBLIC IDENTITY
                      </span>

                      <strong>
                        @{publicIdentity}
                      </strong>

                      <p>
                        This is how people see
                        you on InnerVoice.
                      </p>

                    </div>

                  </div>

                </div>


                <div className="identity-explanation">

                  <EyeOff size={16} />

                  <p>
                    Your private username is
                    never shown on your profile,
                    posts, comments or other
                    public activity.
                  </p>

                </div>


                {/* REQUEST CHANGE */}

                <button
                  type="button"
                  className="request-identity-change"
                  onClick={() => {
                    window.location.href =
                      "/identity/change-request";
                  }}
                >
                  <RefreshCw size={16} />

                  Request to Change Identity
                </button>

              </section>


              {/* =================================================
                  THEMES
              ================================================= */}

              <section className="customize-section">

                <div className="customize-heading">

                  <h3>
                    <Palette size={15} />
                    Profile theme
                  </h3>

                  <p>
                    Choose the atmosphere of
                    your profile.
                  </p>

                </div>


                <div className="theme-grid">

                  {themes.map((theme) => (

                    <button
                      type="button"
                      key={theme.id}
                      className={`theme-option ${
                        tempTheme === theme.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setTempTheme(
                          theme.id
                        )
                      }
                    >

                      <div
                        className="theme-preview"
                        style={{
                          background:
                            theme.background,
                        }}
                      >

                        <span
                          style={{
                            background:
                              theme.primary,
                          }}
                        />

                        <span
                          style={{
                            background:
                              theme.secondary,
                          }}
                        />

                      </div>


                      <span>
                        {theme.name}
                      </span>


                      {tempTheme ===
                        theme.id && (
                        <Check
                          size={14}
                          className="theme-check"
                        />
                      )}

                    </button>

                  ))}

                </div>

              </section>

            </div>


            {/* MODAL FOOTER */}

            <div className="edit-modal-footer">

              <button
                type="button"
                className="cancel-profile"
                onClick={() =>
                  setEditOpen(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="save-profile"
                onClick={saveProfile}
              >
                Save changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}