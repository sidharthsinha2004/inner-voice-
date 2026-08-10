import { useMemo, useState } from "react";
import { Users, Search, Plus, Check } from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import Modal from "../../components/Modal";

export default function Communities() {
  const { communities, toggleJoinCommunity, addCommunity } = useAppData();
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return communities;
    return communities.filter((c) =>
      [c.name, c.description, c.category].join(" ").toLowerCase().includes(q)
    );
  }, [communities, query]);

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={24} />
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
              Communities
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Find your people.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition shrink-0"
        >
          <Plus size={16} />
          New Community
        </button>
      </div>

      <div className="flex items-center gap-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl px-4 py-3 mb-6 shadow-sm">
        <Search size={18} className="text-stone-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search communities..."
          className="flex-1 bg-transparent outline-none text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400"
        />
      </div>

      <button
        onClick={() => setCreateOpen(true)}
        className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition mb-6"
      >
        <Plus size={16} />
        New Community
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[var(--accent-soft)] dark:bg-stone-800 flex items-center justify-center text-[var(--accent)] dark:text-[var(--accent-text-dark)] shrink-0">
                <Users size={20} />
              </div>

              <button
                onClick={() => toggleJoinCommunity(c.id)}
                className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition ${
                  c.joined
                    ? "bg-[var(--accent-soft)] dark:bg-stone-800 text-[var(--accent)] dark:text-[var(--accent-text-dark)]"
                    : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                }`}
              >
                {c.joined && <Check size={14} />}
                {c.joined ? "Joined" : "Join"}
              </button>
            </div>

            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-50 mt-4">
              {c.name}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 leading-6">
              {c.description}
            </p>

            <div className="flex items-center gap-2 mt-4 text-xs text-stone-400">
              <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 font-medium text-stone-600 dark:text-stone-300">
                {c.category}
              </span>
              <span>{c.members.toLocaleString()} members</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="sm:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center">
            <p className="text-stone-500 dark:text-stone-400">
              No communities match "{query}".
            </p>
          </div>
        )}
      </div>

      <CreateCommunityModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={addCommunity}
      />
    </div>
  );
}

function CreateCommunityModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim(), description: description.trim(), category });
    setName("");
    setDescription("");
    setCategory("General");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create a Community">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Morning Pages"
            className="w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 border border-transparent focus:border-[var(--accent)] transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="What's this community about?"
            className="w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 border border-transparent focus:border-[var(--accent)] transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            disabled={!name.trim()}
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-40 transition"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
