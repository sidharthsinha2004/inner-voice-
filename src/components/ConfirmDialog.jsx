import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  danger = true,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-stone-600 dark:text-stone-300 leading-6">
        {message}
      </p>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-full text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 rounded-full text-sm font-semibold text-white transition ${
            danger
              ? "bg-red-500 hover:bg-red-600"
              : "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
