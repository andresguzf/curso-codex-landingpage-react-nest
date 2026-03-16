import type { ReactNode } from 'react';

type AdminModalProps = {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
};

export function AdminModal({ title, description, onClose, children }: AdminModalProps) {
  return (
    <div className="admin-modal-backdrop" role="presentation">
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        aria-describedby="admin-modal-description"
      >
        <div className="admin-modal-header">
          <div>
            <span className="eyebrow">Alta de curso</span>
            <h2 id="admin-modal-title">{title}</h2>
            <p id="admin-modal-description">{description}</p>
          </div>
          <button className="admin-modal-close" type="button" aria-label="Cerrar modal" onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
