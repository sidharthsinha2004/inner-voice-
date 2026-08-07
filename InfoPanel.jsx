import {
  Flame,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";

export default function InfoPanel() {
  return (
    <div className="space-y-6">

      {/* Daily Quote */}
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-xl font-bold text-[#2D5B50] mb-4">
          🌿 Daily Quote
        </h2>

        <p className="text-gray-600 leading-7">
          "Healing doesn't mean the damage never existed.
          It means the damage no longer controls your life."
        </p>

      </div>

      {/* Community Stats */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-xl font-bold text-[#2D5B50] mb-5">
          Community
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="flex gap-2">
              <Users size={18} />
              Members
            </span>

            <strong>12,540</strong>
          </div>

          <div className="flex justify-between">
            <span className="flex gap-2">
              <Heart size={18} />
              Support Given
            </span>

            <strong>4,120</strong>
          </div>

          <div className="flex justify-between">
            <span className="flex gap-2">
              <Flame size={18} />
              Active Today
            </span>

            <strong>834</strong>
          </div>

        </div>

      </div>

      {/* Wellness Tip */}

      <div className="bg-gradient-to-r from-[#2D5B50] to-[#567DAA] text-white rounded-3xl shadow-lg p-6">

        <Sparkles size={28} />

        <h2 className="font-bold text-xl mt-4">
          Wellness Tip
        </h2>

        <p className="mt-3 leading-7">
          Take five deep breaths whenever you feel
          overwhelmed. Small pauses make a big difference.
        </p>

      </div>

    </div>
  );
}