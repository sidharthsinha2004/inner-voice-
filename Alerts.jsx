import { useApp } from "../context/AppContext";
import AlertMenu from "../ui/AlertMenu";

export default function Alerts() {
  const { alerts, setAlerts } = useApp();

  function markRead(id) {
    setAlerts(
      alerts.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  }

  function deleteAlert(id) {
    setAlerts(
      alerts.filter((item) => item.id !== id)
    );
  }

  function markAllRead() {
    setAlerts(
      alerts.map((item) => ({
        ...item,
        read: true,
      }))
    );
  }

  const unread = alerts.filter(
    (item) => !item.read
  ).length;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-[#2D5B50]">
            Notifications
          </h1>

          <p className="text-gray-500 mt-2">
            Stay updated with your latest activity.
          </p>
        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={markAllRead}
            className="bg-[#2D5B50] text-white px-5 py-2 rounded-xl hover:bg-[#21453D]"
          >
            Mark All Read
          </button>

          <div className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold">
            {unread} Unread
          </div>

        </div>

      </div>

      {/* Empty State */}
      {alerts.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

          <h2 className="text-2xl font-bold">
            🎉 You're all caught up!
          </h2>

          <p className="text-gray-500 mt-3">
            No new notifications.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {alerts.map((alert) => (

            <AlertMenu
              key={alert.id}
              alert={alert}
              onRead={markRead}
              onDelete={deleteAlert}
            />

          ))}

        </div>

      )}

    </div>
  );
}