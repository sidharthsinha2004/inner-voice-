import { CheckCircle2, Info, X } from "lucide-react";
import { useAppData } from "../context/AppDataContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useAppData();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-200 flex flex-col gap-3 w-[calc(100%-3rem)] max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-start gap-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl rounded-2xl px-4 py-3 animate-fade-in"
        >
          {toast.tone === "success" ? (
            <CheckCircle2
              size={20}
              className="text-(--accent) dark:text-(--accent-text-dark) shrink-0 mt-0.5"
            />
          ) : (
            <Info
              size={20}
              className="text-[#5F8CAE] shrink-0 mt-0.5"
            />
          )}

          <p className="text-sm text-stone-700 dark:text-stone-200 flex-1">
            {toast.message}
          </p>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
