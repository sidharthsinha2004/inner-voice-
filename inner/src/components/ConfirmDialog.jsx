import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
}) {
  if (!open) return null;

  return (
    <div className="iv-confirm-overlay">
      
      {/* Backdrop */}
      <div
        className="iv-confirm-backdrop"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="iv-confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="iv-confirm-close"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="iv-confirm-icon">
          <AlertTriangle size={23} />
        </div>

        {/* Content */}
        <div className="iv-confirm-content">
          <span className="iv-confirm-label">
            CONFIRM ACTION
          </span>

          <h2 id="confirm-dialog-title">
            {title}
          </h2>

          <p>
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="iv-confirm-actions">

          <button
            type="button"
            onClick={onClose}
            className="iv-confirm-cancel"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="iv-confirm-confirm"
          >
            {confirmLabel}
          </button>

        </div>

      </div>
    </div>
  );
}