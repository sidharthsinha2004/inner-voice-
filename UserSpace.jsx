import { useState } from "react";
import { Edit2, Save, Heart, MessageCircle, FileText } from "lucide-react";

export default function UserSpace() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Anonymous Owl");
  const [bio, setBio] = useState(
    "Spreading kindness one whisper at a time 🌿"
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D5B50] to-[#567DAA] rounded-3xl p-10 text-white shadow-lg">

        <div className="flex items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-white text-[#2D5B50] text-5xl font-bold flex items-center justify-center">
            A
          </div>

          <div>

            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-black px-3 py-2 rounded-lg"
              />
            ) : (
              <h1 className="text-4xl font-bold">{name}</h1>
            )}

            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="text-black mt-3 p-3 rounded-lg w-full"
              />
            ) : (
              <p className="mt-3">{bio}</p>
            )}

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <FileText className="mx-auto text-[#2D5B50]" size={32} />
          <h2 className="text-3xl font-bold mt-3">27</h2>
          <p className="text-gray-500">Posts</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <Heart className="mx-auto text-red-500" size={32} />
          <h2 className="text-3xl font-bold mt-3">489</h2>
          <p className="text-gray-500">Likes Received</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <MessageCircle className="mx-auto text-blue-500" size={32} />
          <h2 className="text-3xl font-bold mt-3">134</h2>
          <p className="text-gray-500">Comments</p>
        </div>

      </div>

      {/* Achievements */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-5">
          🏆 Achievements
        </h2>

        <div className="grid grid-cols-4 gap-4">

          <div className="bg-green-100 p-5 rounded-2xl text-center">
            🌿 Kind Soul
          </div>

          <div className="bg-blue-100 p-5 rounded-2xl text-center">
            ❤️ Supporter
          </div>

          <div className="bg-yellow-100 p-5 rounded-2xl text-center">
            ⭐ Top Writer
          </div>

          <div className="bg-purple-100 p-5 rounded-2xl text-center">
            💬 Active Member
          </div>

        </div>

      </div>

      {/* Edit Button */}

      <button
        onClick={() => setEditing(!editing)}
        className="bg-[#2D5B50] text-white px-6 py-3 rounded-xl flex items-center gap-2"
      >
        {editing ? (
          <>
            <Save size={18} />
            Save Profile
          </>
        ) : (
          <>
            <Edit2 size={18} />
            Edit Profile
          </>
        )}
      </button>

    </div>
  );
}