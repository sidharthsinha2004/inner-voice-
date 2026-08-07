import { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Users,
  FileText,
  Flag,
  Trash2,
  CheckCircle,
  RotateCcw,
  Search,
} from "lucide-react";

export default function ControlCenter() {
  const { reports, setReports } = useApp();

  const [search, setSearch] = useState("");

  function approve(id) {
    setReports(
      reports.map((item) =>
        item.id === id
          ? { ...item, status: "Approved" }
          : item
      )
    );
  }

  function restore(id) {
    setReports(
      reports.map((item) =>
        item.id === id
          ? { ...item, status: "Restored" }
          : item
      )
    );
  }

  function deletePost(id) {
    setReports(
      reports.filter((item) => item.id !== id)
    );
  }

  const filteredReports = reports.filter(
    (item) =>
      item.author
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.post
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D5B50] to-[#567DAA] rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2">
          Manage reports and moderate the InnerVoice community.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <Users className="mx-auto text-[#2D5B50]" size={34}/>
          <h2 className="text-3xl font-bold mt-3">12,540</h2>
          <p className="text-gray-500">Users</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <FileText className="mx-auto text-blue-500" size={34}/>
          <h2 className="text-3xl font-bold mt-3">2,431</h2>
          <p className="text-gray-500">Posts</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <Flag className="mx-auto text-red-500" size={34}/>
          <h2 className="text-3xl font-bold mt-3">
            {reports.length}
          </h2>
          <p className="text-gray-500">
            Reported Posts
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <CheckCircle
            className="mx-auto text-green-500"
            size={34}
          />
          <h2 className="text-3xl font-bold mt-3">
            {
              reports.filter(
                (r) => r.status === "Approved"
              ).length
            }
          </h2>
          <p className="text-gray-500">
            Approved
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="relative">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={20}
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search reports..."
          className="w-full pl-12 p-4 border rounded-2xl"
        />

      </div>

      {/* Reports */}
      <div className="space-y-5">

        {filteredReports.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center shadow-lg">
            🎉 No Reports Found
          </div>

        ) : (

          filteredReports.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center"
            >

              <div>

                <h2 className="font-bold text-xl">
                  {item.author}
                </h2>

                <p className="mt-3 text-gray-600">
                  {item.post}
                </p>

                <div className="mt-4 flex gap-6">

                  <span>
                    🚩 {item.reports} Reports
                  </span>

                  <span>
                    Status:
                    <strong>
                      {" "}
                      {item.status}
                    </strong>
                  </span>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    approve(item.id)
                  }
                  className="bg-green-600 text-white p-3 rounded-xl"
                >
                  <CheckCircle size={18}/>
                </button>

                <button
                  onClick={() =>
                    restore(item.id)
                  }
                  className="bg-blue-600 text-white p-3 rounded-xl"
                >
                  <RotateCcw size={18}/>
                </button>

                <button
                  onClick={() =>
                    deletePost(item.id)
                  }
                  className="bg-red-600 text-white p-3 rounded-xl"
                >
                  <Trash2 size={18}/>
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}