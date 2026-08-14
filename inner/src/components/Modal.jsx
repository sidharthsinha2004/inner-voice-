import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
  noPadding = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative
          w-full
          ${maxWidth}
          max-h-[calc(100dvh-32px)]
          overflow-hidden
          rounded-[26px]
          bg-white
          dark:bg-stone-950
          border
          border-stone-200/80
          dark:border-stone-800
          shadow-[0_25px_80px_rgba(0,0,0,0.20)]
          animate-modal-in
        `}
      >

        {/* Optional Header */}
        {title && (
          <div
            className="
              shrink-0
              flex
              items-center
              justify-between
              px-6
              py-4
              border-b
              border-stone-100
              dark:border-stone-800
            "
          >
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
                text-stone-400
                hover:text-stone-700
                dark:hover:text-stone-200
                hover:bg-stone-100
                dark:hover:bg-stone-800
                transition
              "
              aria-label="Close"
            >
              <X size={19} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className={noPadding ? "" : "p-6"}>
          {children}
        </div>

      </div>
    </div>
  );
}