import type { PaginationMeta } from '../../types/pagination';

type AdminTablePaginationProps = {
  pagination: PaginationMeta;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function AdminTablePagination({ pagination, onPreviousPage, onNextPage }: AdminTablePaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="admin-pagination">
      <p className="admin-pagination-copy">
        Pagina {pagination.page} de {pagination.totalPages}. Total: {pagination.total} cursos.
      </p>

      <div className="admin-pagination-actions">
        <button
          className="secondary-button compact-action-button"
          type="button"
          onClick={onPreviousPage}
          disabled={!pagination.hasPreviousPage}
        >
          Anterior
        </button>
        <button
          className="secondary-button compact-action-button"
          type="button"
          onClick={onNextPage}
          disabled={!pagination.hasNextPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
