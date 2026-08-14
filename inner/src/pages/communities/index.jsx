import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Plus,
  Check,
  ArrowUpRight,
  Sparkles,
  UserRound,
  Compass,
} from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import Modal from "../../components/Modal";

import "./communities.css";

export default function Communities() {
  const { communities, toggleJoinCommunity, addCommunity } = useAppData();

  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return communities;

    return communities.filter((community) =>
      [
        community.name,
        community.description,
        community.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [communities, query]);

  const joinedCount = communities.filter(
    (community) => community.joined
  ).length;

  const totalMembers = communities.reduce(
    (total, community) => total + community.members,
    0
  );

  return (
    <div className="communities-page">

      {/* =====================================================
          HERO HEADER
      ===================================================== */}

      <section className="communities-hero">

        <div className="communities-hero-content">

          <div className="communities-icon">
            <Users size={27} strokeWidth={2} />
          </div>

          <div>
            <div className="communities-eyebrow">
              <Sparkles size={13} />
              FIND YOUR PEOPLE
            </div>

            <h1>Communities</h1>

            <p>
              Discover spaces where people share your interests,
              ideas, and experiences.
            </p>
          </div>

        </div>


        <button
          onClick={() => setCreateOpen(true)}
          className="communities-create-button"
        >
          <Plus size={17} />
          New Community
        </button>

      </section>


      {/* =====================================================
          QUICK STATS
      ===================================================== */}

      <section className="community-stats">

        <div className="community-stat">
          <div className="community-stat-icon green">
            <Compass size={18} />
          </div>

          <div>
            <strong>{communities.length}</strong>
            <span>Communities</span>
          </div>
        </div>


        <div className="community-stat">
          <div className="community-stat-icon blue">
            <Users size={18} />
          </div>

          <div>
            <strong>
              {totalMembers.toLocaleString()}
            </strong>
            <span>Total members</span>
          </div>
        </div>


        <div className="community-stat">
          <div className="community-stat-icon gold">
            <UserRound size={18} />
          </div>

          <div>
            <strong>{joinedCount}</strong>
            <span>Joined</span>
          </div>
        </div>

      </section>


      {/* =====================================================
          SEARCH BAR
      ===================================================== */}

      <section className="communities-toolbar">

        <div className="community-search">

          <Search size={19} />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search communities, topics, or interests..."
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="community-search-clear"
            >
              Clear
            </button>
          )}

        </div>

      </section>


      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="communities-section-header">

        <div>
          <span className="section-label">
            EXPLORE
          </span>

          <h2>
            Communities for you
          </h2>
        </div>

        <span className="community-result-count">
          {filtered.length}{" "}
          {filtered.length === 1
            ? "community"
            : "communities"}
        </span>

      </div>


      {/* =====================================================
          COMMUNITY GRID
      ===================================================== */}

      {filtered.length > 0 ? (

        <div className="communities-grid">

          {filtered.map((community, index) => (

            <article
              key={community.id}
              className="community-card"
            >

              {/* Top */}
              <div className="community-card-top">

                <div
                  className={`community-avatar avatar-${index % 5}`}
                >
                  <Users size={21} />
                </div>

                <button
                  onClick={() =>
                    toggleJoinCommunity(community.id)
                  }
                  className={
                    community.joined
                      ? "community-joined-button"
                      : "community-join-button"
                  }
                >
                  {community.joined && (
                    <Check size={14} />
                  )}

                  {community.joined
                    ? "Joined"
                    : "Join"}
                </button>

              </div>


              {/* Content */}
              <div className="community-card-content">

                <div className="community-category">
                  {community.category}
                </div>

                <h3>
                  {community.name}
                </h3>

                <p>
                  {community.description}
                </p>

              </div>


              {/* Footer */}
              <div className="community-card-footer">

                <div className="community-members">

                  <div className="member-stack">
                    <span>A</span>
                    <span>S</span>
                    <span>M</span>
                  </div>

                  <span>
                    {community.members.toLocaleString()} members
                  </span>

                </div>

                <ArrowUpRight
                  size={17}
                  className="community-arrow"
                />

              </div>

            </article>

          ))}

        </div>

      ) : (

        /* =====================================================
           EMPTY SEARCH STATE
        ===================================================== */

        <section className="communities-empty">

          <div className="communities-empty-icon">
            <Search size={30} />
          </div>

          <span>
            NO RESULTS
          </span>

          <h2>
            Nothing matches your search
          </h2>

          <p>
            Try another keyword or explore all available
            communities.
          </p>

          <button
            onClick={() => setQuery("")}
          >
            Show all communities
          </button>

        </section>

      )}


      {/* =====================================================
          MOBILE CREATE BUTTON
      ===================================================== */}

      <button
        className="communities-mobile-create"
        onClick={() => setCreateOpen(true)}
      >
        <Plus size={20} />
      </button>


      {/* =====================================================
          CREATE MODAL
      ===================================================== */}

      <CreateCommunityModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={addCommunity}
      />

    </div>
  );
}


/* =========================================================
   CREATE COMMUNITY MODAL
========================================================= */

function CreateCommunityModal({
  open,
  onClose,
  onCreate,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      description: description.trim(),
      category: category.trim() || "General",
    });

    setName("");
    setDescription("");
    setCategory("General");

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create a Community"
    >

      <form
        onSubmit={handleSubmit}
        className="community-modal-form"
      >

        <div className="modal-field">

          <label>
            Community name
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="e.g. Morning Pages"
          />

        </div>


        <div className="modal-field">

          <label>
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows={4}
            placeholder="What is this community about?"
          />

        </div>


        <div className="modal-field">

          <label>
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            placeholder="General"
          />

        </div>


        <div className="community-modal-actions">

          <button
            type="button"
            onClick={onClose}
            className="community-cancel-button"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!name.trim()}
            className="community-submit-button"
          >
            <Plus size={16} />
            Create Community
          </button>

        </div>

      </form>

    </Modal>
  );
}