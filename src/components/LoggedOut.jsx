import { LogIn } from "lucide-react";
import { useAppData } from "../context/AppDataContext";

export default function LoggedOut() {
  const { login, currentUser } = useAppData();

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex items-center justify-center px-5 transition-colors duration-300">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm p-10 max-w-sm w-full text-center">
        <div className="h-16 w-16 rounded-2xl bg-[var(--accent)] flex items-center justify-center text-white text-2xl font-bold shadow-md mx-auto mb-6">
          I
        </div>

        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
          You've been logged out
        </h1>

        <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 leading-6">
          Come back anytime, {currentUser.name.split(" ")[0]} — your posts and
          bookmarks are right where you left them.
        </p>

        <button
          onClick={login}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-white px-4 py-3 rounded-full font-semibold hover:bg-[var(--accent-hover)] transition"
        >
          <LogIn size={18} />
          Log back in
        </button>
      </div>
    </div>
  );
}
