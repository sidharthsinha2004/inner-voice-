import { useNavigate } from "react-router-dom";
import { Users, FileText } from "lucide-react";
import { useState } from "react";

export default function CommunityCard({ community }) {
  const [joined, setJoined] = useState(false);

  return (
    <div
  onClick={() => navigate(`/community/${community.id}`)}
  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer"
>

      {/* Header */}
      <div className="flex items-center gap-4">

        <div
          className={`w-14 h-14 rounded-full ${community.color} text-white flex items-center justify-center text-2xl font-bold`}
        >
          {community.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-bold">
            {community.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {community.description}
          </p>
        </div>

      </div>

      {/* Stats */}
      <div className="flex gap-8 mt-6">

        <div className="flex items-center gap-2">
          <Users className="text-blue-600" size={18} />
          <span>{community.members} Members</span>
        </div>

        <div className="flex items-center gap-2">
          <FileText className="text-green-600" size={18} />
          <span>{community.posts} Posts</span>
        </div>

      </div>

      {/* Join Button */}
      <button
        onClick={() => setJoined(!joined)}
        className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
          joined
            ? "bg-green-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {joined ? "✓ Joined" : "Join Community"}
      </button>

    </div>
  );
}