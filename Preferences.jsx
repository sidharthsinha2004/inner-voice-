import { useEffect, useState } from "react";
import {
  Moon,
  Bell,
  Shield,
  User,
  Globe,
  Save,
  LogOut,
} from "lucide-react";

export default function Preferences() {
  const [username, setUsername] = useState("Anonymous Owl");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [notifications, setNotifications] = useState(true);

  const [privateAccount, setPrivateAccount] = useState(false);

  const [language, setLanguage] = useState("English");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function saveSettings() {
    alert("✅ Settings Saved Successfully!");
  }

  function logout() {
    alert("Logged Out Successfully");
  }

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-[#2D5B50]">
        Settings
      </h1>

      {/* Profile */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-3 mb-5">
          <User className="text-[#2D5B50]" />
          <h2 className="text-2xl font-semibold">
            Profile
          </h2>
        </div>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-xl p-3 w-full"
        />

      </div>

      {/* Dark Mode */}

      <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <Moon className="text-indigo-600" />

          <div>

            <h2 className="font-semibold">
              Dark Mode
            </h2>

            <p className="text-gray-500">
              Enable dark appearance
            </p>

          </div>

        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-6 py-2 rounded-xl text-white ${
            darkMode
              ? "bg-green-600"
              : "bg-gray-500"
          }`}
        >
          {darkMode ? "ON" : "OFF"}
        </button>

      </div>

      {/* Notifications */}

      <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <Bell className="text-yellow-500" />

          <div>

            <h2 className="font-semibold">
              Notifications
            </h2>

            <p className="text-gray-500">
              Receive new updates
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            setNotifications(!notifications)
          }
          className={`px-6 py-2 rounded-xl text-white ${
            notifications
              ? "bg-green-600"
              : "bg-gray-500"
          }`}
        >
          {notifications ? "ON" : "OFF"}
        </button>

      </div>

      {/* Privacy */}

      <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <Shield className="text-green-600" />

          <div>

            <h2 className="font-semibold">
              Private Account
            </h2>

            <p className="text-gray-500">
              Hide your profile
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            setPrivateAccount(!privateAccount)
          }
          className={`px-6 py-2 rounded-xl text-white ${
            privateAccount
              ? "bg-green-600"
              : "bg-gray-500"
          }`}
        >
          {privateAccount
            ? "Enabled"
            : "Disabled"}
        </button>

      </div>

      {/* Language */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-3 mb-4">

          <Globe className="text-blue-600" />

          <h2 className="font-semibold">
            Language
          </h2>

        </div>

        <select
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
          className="border rounded-xl p-3 w-full"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>

      </div>

      {/* Buttons */}

      <div className="flex gap-4">

        <button
          onClick={saveSettings}
          className="bg-[#2D5B50] text-white px-6 py-3 rounded-xl flex gap-2 items-center"
        >
          <Save size={18} />
          Save Changes
        </button>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-3 rounded-xl flex gap-2 items-center"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}