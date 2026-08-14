import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Search as SearchIcon,
  Users,
  X,
  ArrowUpRight,
  Hash,
  Sparkles,
  FileText,
} from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import PostCard from "../home/components/PostCard";
import "./search.css"

const TABS = [
  {
    id: "Posts",
    label: "Posts",
    icon: FileText,
  },
  {
    id: "Communities",
    label: "Communities",
    icon: Users,
  },
];


export default function Search() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const {
    posts,
    communities,
    toggleJoinCommunity,
  } = useAppData();

  const [tab, setTab] =
    useState("Posts");


  const rawQuery =
    searchParams.get("q") || "";

  const q =
    rawQuery.toLowerCase().trim();


  /* =====================================================
     SEARCH INPUT
  ===================================================== */

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchParams(
      value
        ? { q: value }
        : {},
      { replace: true }
    );
  };


  const clear = () => {
    setSearchParams(
      {},
      { replace: true }
    );
  };


  /* =====================================================
     POST RESULTS
  ===================================================== */

  const matchedPosts = useMemo(() => {
    if (!q) return [];

    return posts.filter((p) =>
      [
        p.title,
        p.description,
        p.username,
        p.category,
        ...(p.tags || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [posts, q]);


  /* =====================================================
     COMMUNITY RESULTS
  ===================================================== */

  const matchedCommunities =
    useMemo(() => {
      if (!q) return [];

      return communities.filter((c) =>
        [
          c.name,
          c.description,
          c.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }, [communities, q]);


  const totalResults =
    matchedPosts.length +
    matchedCommunities.length;


  return (
    <div className="search-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="search-header">

        <div className="search-title">

          <div className="search-title-icon">
            <SearchIcon size={20} />
          </div>

          <div>

            <span className="search-eyebrow">
              INNERVOICE · DISCOVER
            </span>

            <h1>
              Search
            </h1>

            <p>
              Find thoughts, people and
              communities worth exploring.
            </p>

          </div>

        </div>

      </header>


      {/* =================================================
          SEARCH BAR
      ================================================= */}

      <form
        onSubmit={(e) =>
          e.preventDefault()
        }
        className="search-box"
      >

        <div className="search-box-icon">
          <SearchIcon size={18} />
        </div>

        <input
          type="text"
          value={rawQuery}
          onChange={handleChange}
          placeholder="Search thoughts, people, tags..."
          autoFocus
        />

        {rawQuery && (
          <button
            type="button"
            onClick={clear}
            className="search-clear"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}

      </form>


      {/* =================================================
          EMPTY / START STATE
      ================================================= */}

      {!q ? (

        <div className="search-start">

          <div className="search-start-visual">

            <div className="search-start-circle one" />
            <div className="search-start-circle two" />

            <SearchIcon size={27} />

          </div>

          <span className="search-start-label">
            DISCOVER SOMETHING NEW
          </span>

          <h2>
            What are you curious about?
          </h2>

          <p>
            Search for conversations,
            perspectives, people or communities
            across InnerVoice.
          </p>

          <div className="search-suggestions">

            <span>
              <Hash size={12} />
              Try searching for
            </span>

            <button
              type="button"
              onClick={() =>
                setSearchParams({
                  q: "mindfulness",
                })
              }
            >
              mindfulness
            </button>

            <button
              type="button"
              onClick={() =>
                setSearchParams({
                  q: "technology",
                })
              }
            >
              technology
            </button>

            <button
              type="button"
              onClick={() =>
                setSearchParams({
                  q: "motivation",
                })
              }
            >
              motivation
            </button>

          </div>

        </div>

      ) : (

        <>


          {/* =================================================
              SEARCH SUMMARY
          ================================================= */}

          <div className="search-summary">

            <div>

              <span>
                SEARCH RESULTS
              </span>

              <h2>
                Results for{" "}
                <strong>
                  "{rawQuery}"
                </strong>
              </h2>

            </div>


            <div className="search-result-count">

              <strong>
                {totalResults}
              </strong>

              <span>
                {totalResults === 1
                  ? "result"
                  : "results"}
              </span>

            </div>

          </div>


          {/* =================================================
              TABS
          ================================================= */}

          <div className="search-tabs">

            <div className="search-tab-list">

              {TABS.map((item) => {

                const Icon = item.icon;

                const count =
                  item.id === "Posts"
                    ? matchedPosts.length
                    : matchedCommunities.length;

                return (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setTab(item.id)
                    }
                    className={
                      tab === item.id
                        ? "search-tab active"
                        : "search-tab"
                    }
                  >

                    <Icon size={14} />

                    <span>
                      {item.label}
                    </span>

                    <b>
                      {count}
                    </b>

                  </button>

                );
              })}

            </div>

          </div>


          {/* =================================================
              RESULTS
          ================================================= */}

          {tab === "Posts" ? (

            matchedPosts.length > 0 ? (

              <section className="search-results">

                <div className="search-results-heading">

                  <div>

                    <span>
                      COMMUNITY VOICES
                    </span>

                    <h3>
                      Matching posts
                    </h3>

                  </div>

                  <Sparkles size={16} />

                </div>


                <div className="search-post-results">

                  {matchedPosts.map(
                    (post, index) => (

                      <div
                        key={post.id}
                        className="search-post-item"
                      >

                        <div className="search-post-number">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </div>

                        <PostCard
                          post={post}
                        />

                      </div>

                    )
                  )}

                </div>

              </section>

            ) : (

              <EmptyResult
                query={rawQuery}
                type="posts"
              />

            )

          ) : (

            matchedCommunities.length > 0 ? (

              <section className="search-results">

                <div className="search-results-heading">

                  <div>

                    <span>
                      COMMUNITY DIRECTORY
                    </span>

                    <h3>
                      Matching communities
                    </h3>

                  </div>

                  <Users size={16} />

                </div>


                <div className="community-results">

                  {matchedCommunities.map(
                    (community, index) => (

                      <div
                        key={community.id}
                        className="community-result-card"
                      >

                        <div className="community-rank">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </div>


                        <div className="community-icon">
                          <Users size={19} />
                        </div>


                        <div className="community-info">

                          <div className="community-name-row">

                            <h3>
                              {community.name}
                            </h3>

                            {community.category && (
                              <span>
                                {community.category}
                              </span>
                            )}

                          </div>


                          <p>
                            {community.description}
                          </p>


                          <div className="community-meta">

                            <span>
                              <Users size={12} />
                              {community.members.toLocaleString()}
                              {" "}members
                            </span>

                            {community.joined && (
                              <span className="community-joined">
                                ✓ Joined
                              </span>
                            )}

                          </div>

                        </div>


                        <button
                          type="button"
                          onClick={() =>
                            toggleJoinCommunity(
                              community.id
                            )
                          }
                          className={
                            community.joined
                              ? "community-action joined"
                              : "community-action"
                          }
                        >

                          {community.joined
                            ? "Joined"
                            : "Join"}

                          <ArrowUpRight
                            size={13}
                          />

                        </button>

                      </div>

                    )
                  )}

                </div>

              </section>

            ) : (

              <EmptyResult
                query={rawQuery}
                type="communities"
              />

            )

          )}

        </>

      )}

    </div>
  );
}


/* =========================================================
   EMPTY RESULT
========================================================= */

function EmptyResult({
  query,
  type,
}) {
  return (

    <div className="search-empty">

      <div className="search-empty-icon">
        <SearchIcon size={22} />
      </div>

      <span>
        NO MATCHES
      </span>

      <h2>
        Nothing found
      </h2>

      <p>
        We couldn't find any{" "}
        {type === "posts"
          ? "posts"
          : "communities"}{" "}
        matching{" "}
        <strong>
          "{query}"
        </strong>
        .
      </p>

    </div>

  );
}