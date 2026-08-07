import { useState } from "react";
import { dashboardData, moderationQueue } from "../store/appData";

export default function Admin() {
  const [queue, setQueue] = useState(moderationQueue);

  function approve(id) {
    setQueue(
      queue.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  }

  function remove(id) {
    setQueue(queue.filter((item) => item.id !== id));
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-4xl font-bold">
            {dashboardData.users}
          </h2>
          <p>Users</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-4xl font-bold">
            {dashboardData.posts}
          </h2>
          <p>Posts</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-4xl font-bold">
            {queue.length}
          </h2>
          <p>Reports</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-4xl font-bold">
            {dashboardData.safety}%
          </h2>
          <p>Safety Score</p>
        </div>

      </div>

      {/* Queue */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Moderation Queue
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4">User</th>

              <th className="text-left">Reason</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {queue.map((item) => (

              <tr key={item.id} className="border-b">

                <td className="py-4">
                  {item.user}
                </td>

                <td>{item.reason}</td>

                <td>{item.status}</td>

                <td className="space-x-2">

                  <button
                    onClick={() => approve(item.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => remove(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}