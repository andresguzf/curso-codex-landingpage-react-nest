type AdminCourseRowActionsProps = {
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function AdminCourseRowActions({ isDeleting, onEdit, onDelete }: AdminCourseRowActionsProps) {
  return (
    <div className="admin-row-actions">
      <button className="admin-action-button" type="button" onClick={onEdit}>
        Editar
      </button>
      <button className="admin-action-button is-danger" type="button" onClick={onDelete} disabled={isDeleting}>
        {isDeleting ? 'Eliminando...' : 'Eliminar'}
      </button>
    </div>
  );
}
