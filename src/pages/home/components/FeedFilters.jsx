import {
  Flame,
  Compass,
  Clock3,
  Users,
  TrendingUp,
  MapPin,
} from "lucide-react";

const FILTERS = [
  { id: 1, name: "For You", icon: Compass },
  { id: 2, name: "Trending", icon: Flame },
  { id: 3, name: "Latest", icon: Clock3 },
  { id: 4, name: "Following", icon: Users },
  { id: 5, name: "Popular", icon: TrendingUp },
  { id: 6, name: "Nearby", icon: MapPin },
];

export default function FeedFilters({ active, onChange }) {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
            Feed
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Discover voices that matter
          </p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {FILTERS.map((filter) => {
          const Icon = filter.icon;

          return (
            <button
              key={filter.id}
              onClick={() => onChange(filter.name)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                active === filter.name
                  ? "bg-[var(--accent)] text-white shadow-lg scale-105"
                  : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-[var(--accent-soft)] dark:hover:bg-stone-800 hover:text-[var(--accent)] dark:hover:text-[var(--accent-text-dark)] hover:border-[var(--accent)]"
              }`}
            >
              <Icon size={18} />
              {filter.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
