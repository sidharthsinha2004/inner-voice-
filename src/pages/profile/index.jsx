import { useMemo, useState } from "react";
import { Pencil, MapPin, Calendar } from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import PostCard from "../home/components/PostCard";
import Modal from "../../components/Modal";

const TABS = ["Posts", "Liked", "Bookmarks"];

export default function Profile() {
  const { currentUser, posts, updateProfile } = useAppData();
  const [tab, setTab] = useState("Posts");
  const [editOpen, setEditOpen] = useState(false);

  const myPosts = useMemo(
    () => posts.filter((p) => p.username === currentUser.name),
    [posts, currentUser.name]
  );
  const likedPosts = useMemo(() => posts.filter((p) => p.liked), [posts]);
  const bookmarkedPosts = useMemo(
    () => posts.filter((p) => p.bookmarked),
    [posts]
  );

  const shown =
    tab === "Posts" ? myPosts : tab === "Liked" ? likedPosts : bookmarkedPosts;

  return (
    <div>
      {/* Cover + profile */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm overflow-hidden mb-6">
        <div className="h-28 sm:h-36 bg-gradient-to-br from-[var(--accent)] via-[#3B8069] to-[#5F8CAE]" />

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#3B8069] to-[#5F8CAE] border-4 border-white dark:border-stone-900 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {currentUser.initial}
            </div>

            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
            >
              <Pencil size={14} />
              Edit Profile
            </button>
          </div>

          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-50 mt-4">
            {currentUser.name}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 leading-6">
            {currentUser.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-stone-500 dark:text-stone-400">
            {currentUser.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {currentUser.location}
              </span>
            )}
            {currentUser.joined && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Joined {currentUser.joined}
              </span>
            )}
          </div>

          <div className="flex items-center gap-6 mt-5 pt-5 border-t border-stone-100 dark:border-stone-800">
            <Stat label="Posts" value={myPosts.length} />
            <Stat label="Followers" value={128} />
            <Stat label="Following" value={94} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              tab === t
                ? "bg-[var(--accent)] text-white"
                : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <div className="space-y-6">
          {shown.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center">
          <p className="text-stone-500 dark:text-stone-400">
            {tab === "Posts"
              ? "You haven't shared anything yet — create your first post!"
              : tab === "Liked"
              ? "Posts you like will show up here."
              : "Posts you bookmark will show up here."}
          </p>
        </div>
      )}

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        currentUser={currentUser}
        onSave={updateProfile}
      />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <p className="font-bold text-stone-900 dark:text-stone-50">{value}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400">{label}</p>
    </div>
  );
}

function EditProfileModal({ open, onClose, currentUser, onSave }) {
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      initial: name.trim().charAt(0).toUpperCase(),
      bio: bio.trim(),
      location: location.trim(),
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 border border-transparent focus:border-[var(--accent)] transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 border border-transparent focus:border-[var(--accent)] transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 border border-transparent focus:border-[var(--accent)] transition"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-full text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
