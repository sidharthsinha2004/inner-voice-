import { X, Image, Mic, Video } from "lucide-react";

export default function ShareWhisperModal({
  open,
  onClose,
  text,
  setText,
  onPost,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-[600px] p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold mb-2">
          Share a Whisper
        </h2>

        <p className="text-gray-500 mb-6">
          Text, photo, voice or video — whatever's easier to get out.
        </p>

        <div className="flex gap-6 mb-6 text-gray-600">

          <button className="flex items-center gap-2">
            📝 Text
          </button>

          <button className="flex items-center gap-2">
            <Image size={18} />
            Photo
          </button>

          <button className="flex items-center gap-2">
            <Mic size={18} />
            Voice
          </button>

          <button className="flex items-center gap-2">
            <Video size={18} />
            Video
          </button>

        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say the thing you haven't said out loud yet..."
          className="w-full h-40 border rounded-2xl p-4"
        />

        <div className="flex justify-between mt-6">

          <select className="border rounded-xl px-4 py-2">

            <option>Anxiety</option>

            <option>Stress</option>

            <option>Happy</option>

            <option>Career</option>

            <option>Relationships</option>

          </select>

          <button
            onClick={onPost}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Send Whisper
          </button>

        </div>

      </div>

    </div>
  );
}