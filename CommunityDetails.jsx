import { useParams } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import communities from "../store/communities";

export default function CommunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const community = communities.find(
    (item) => item.id === Number(id)
  );

  const posts = [
    {
      id: 1,
      author: "Anonymous Owl",
      time: "2 hours ago",
      text: "I'm feeling stressed about my exams. Any study tips?",
      likes: 12,
      comments: 4,
    },
    {
      id: 2,
      author: "Silent Star",
      time: "5 hours ago",
      text: "Today was better than yesterday. I'm trying to stay positive.",
      likes: 24,
      comments: 8,
    },
    {
      id: 3,
      author: "Hope Bird",
      time: "Yesterday",
      text: "Don't forget to take care of yourself. You matter ❤️",
      likes: 42,
      comments: 15,
    },
  ];

  if (!community) {
    return (
      <div className="text-center text-2xl mt-10">
        Community not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Community Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

        <div className="flex items-center gap-5">

          <div
            className={`w-20 h-20 rounded-full ${community.color} text-white flex items-center justify-center text-3xl font-bold`}
          >
            {community.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              {community.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {community.description}
            </p>

            <p className="mt-3">
              👥 {community.members} Members · 📝 {community.posts} Posts
            </p>

          </div>

        </div>

      </div>

      {/* Posts */}
      <div className="space-y-6">

        {posts.map((post) => (

          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <div className="flex justify-between">

              <div>
                <h2 className="font-bold">
                  {post.author}
                </h2>

                <p className="text-gray-500 text-sm">
                  {post.time}
                </p>
              </div>

            </div>

            <p className="mt-4 text-gray-700">
              {post.text}
            </p>

            <div className="flex gap-6 mt-6">

              <button className="flex items-center gap-2 text-red-500">
                <Heart size={18}/>
                {post.likes}
              </button>

              <button className="flex items-center gap-2 text-blue-600">
                <MessageCircle size={18}/>
                {post.comments}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}