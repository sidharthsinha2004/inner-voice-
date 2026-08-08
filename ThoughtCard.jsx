import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Flag,
  Send,
} from "lucide-react";

import { useApp } from "../context/AppContext";

export default function ThoughtCard({ thought }) {
  const { addNotification, reports, setReports } = useApp();

  const [likes, setLikes] = useState(thought.likes);
  const [liked, setLiked] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([
    "Stay Strong ❤️",
    "We're here for you 🌸",
  ]);

  function handleLike() {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);

      addNotification(
        "❤️ Like",
        "Someone liked your whisper."
      );
    }

    setLiked(!liked);
  }

  function addComment() {
    if (comment.trim() === "") return;

    setComments([...comments, comment]);

    addNotification(
      "💬 Comment",
      "Someone commented on your whisper."
    );

    setComment("");
  }

  function sharePost() {
    navigator.clipboard.writeText(thought.message);

    addNotification(
      "📤 Share",
      "Your whisper was shared."
    );

    alert("Whisper copied to clipboard!");
  }

  function reportPost() {
    const report = {
      id: Date.now(),
      author: thought.name,
      post: thought.message,
      reports: 1,
      status: "Pending",
    };

    setReports([report, ...reports]);

    addNotification(
      "🚩 Report",
      "A post has been reported."
    );

    alert("Post reported successfully.");
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex justify-between">

        <div>

          <h2 className="font-bold text-xl">
            {thought.name}
          </h2>

          <p className="text-gray-500">
            {thought.time}
          </p>

        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
          {thought.mood}
        </span>

      </div>

      <p className="mt-5 text-gray-700 leading-7">
        {thought.message}
      </p>

      <div className="flex gap-8 mt-6">

        <button
          onClick={handleLike}
          className={`flex items-center gap-2 ${
            liked ? "text-red-500" : ""
          }`}
        >
          <Heart
            size={20}
            fill={liked ? "currentColor" : "none"}
          />
          {likes}
        </button>

        <button
          onClick={() =>
            setShowComments(!showComments)
          }
          className="flex items-center gap-2 text-blue-600"
        >
          <MessageCircle size={20} />
          {comments.length}
        </button>

        <button
          onClick={sharePost}
          className="flex items-center gap-2 text-green-600"
        >
          <Share2 size={20} />
          Share
        </button>

        <button
          onClick={reportPost}
          className="flex items-center gap-2 text-red-600"
        >
          <Flag size={20} />
          Report
        </button>

      </div>

      {showComments && (
        <div className="mt-6 border-t pt-5">

          <h3 className="font-semibold mb-4">
            Comments
          </h3>

          <div className="space-y-3 mb-5">

            {comments.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-xl"
              >
                {item}
              </div>
            ))}

          </div>

          <div className="flex gap-3">

            <input
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Write a comment..."
              className="flex-1 border rounded-xl p-3"
            />

            <button
              onClick={addComment}
              className="bg-[#2D5B50] text-white px-5 rounded-xl"
            >
              <Send size={18} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}