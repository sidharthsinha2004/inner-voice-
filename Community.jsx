import { useState } from "react";
import { Search, Users } from "lucide-react";
import topicsData from "../store/topics";

export default function Community() {
  const [communities, setCommunities] = useState(topicsData);
  const [search, setSearch] = useState("");

  function joinCommunity(id) {
    setCommunities(
      communities.map((item) =>
        item.id === id
          ? { ...item, joined: !item.joined }
          : item
      )
    );
  }

  const filtered = communities.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Banner */}

      <div className="bg-gradient-to-r from-[#2D5B50] to-[#567DAA] text-white rounded-3xl p-8">

        <h1 className="text-4xl font-bold">
          Community
        </h1>

        <p className="mt-3 text-lg">
          Find people who understand your journey.
        </p>

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={20}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search communities..."
          className="w-full pl-12 p-4 rounded-2xl border"
        />

      </div>

      {/* Community Cards */}

      <div className="grid grid-cols-2 gap-6">

        {filtered.map((community) => (

          <div
            key={community.id}
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <h2 className="text-2xl font-bold">
              {community.name}
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              {community.description}
            </p>

            <div className="flex justify-between mt-6">

              <span className="flex gap-2 items-center">

                <Users size={18} />

                {community.members.toLocaleString()} Members

              </span>

              <span>
                {community.posts} Posts
              </span>

            </div>

            <button
              onClick={() =>
                joinCommunity(community.id)
              }
              className={`mt-6 w-full py-3 rounded-xl transition ${
                community.joined
                  ? "bg-red-500 text-white"
                  : "bg-[#2D5B50] text-white"
              }`}
            >
              {community.joined
                ? "Leave Community"
                : "Join Community"}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}