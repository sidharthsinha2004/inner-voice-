import { CheckCircle, Trash2 } from "lucide-react";

export default function AlertMenu({
  alert,
  onRead,
  onDelete,
}) {
  return (
    <div
      className={`rounded-3xl shadow-lg p-6 transition ${
        alert.read
          ? "bg-white"
          : "bg-blue-50 border-l-4 border-[#2D5B50]"
      }`}
    >
      <div className="flex justify-between">

        <div>

          <h2 className="font-bold text-lg">
            {alert.type}
          </h2>

          <p className="mt-2 text-gray-600">
            {alert.message}
          </p>

          <p className="mt-3 text-sm text-gray-400">
            {alert.time}
          </p>

        </div>

        <div className="flex gap-2">

          {!alert.read && (
            <button
              onClick={() => onRead(alert.id)}
              className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600"
            >
              <CheckCircle size={18} />
            </button>
          )}

          <button
            onClick={() => onDelete(alert.id)}
            className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}