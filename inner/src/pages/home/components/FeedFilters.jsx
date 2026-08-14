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
    <section className="feed-filters-section">

      <div className="feed-filters-header">
        <div>
          <p className="feed-filters-eyebrow">DISCOVER</p>
          <h2 className="feed-filters-title">Your Feed</h2>
        </div>
      </div>

      <div className="feed-filter-row">
        {FILTERS.map((filter) => {
          const Icon = filter.icon;
          const isActive = active === filter.name;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange(filter.name)}
              className={`feed-filter-button ${
                isActive ? "active" : ""
              }`}
            >
              <span className="feed-filter-icon">
                <Icon size={15} strokeWidth={2.2} />
              </span>

              <span>{filter.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}