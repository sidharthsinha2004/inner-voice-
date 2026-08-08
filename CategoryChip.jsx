export default function CategoryChip({
  title,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full transition ${
        active
          ? "bg-[#2D5B50] text-white"
          : "bg-white border hover:bg-gray-100"
      }`}
    >
      {title}
    </button>
  );
}