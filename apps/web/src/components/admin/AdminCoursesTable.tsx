import { AdminCoursesToolbar } from './AdminCoursesToolbar';
import { AdminCourseRowActions } from './AdminCourseRowActions';
import { AdminTablePagination } from './AdminTablePagination';
import { formatHours, formatPrice, formatRating } from '../../lib/course-utils';
import type { Course } from '../../types/course';
import type { PaginationMeta } from '../../types/pagination';

type AdminCoursesTableProps = {
  courses: Course[];
  pagination: PaginationMeta;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  deleteError: string | null;
  deletingCourseId: number | null;
  onOpenCreate: () => void;
  onSearchQueryChange: (value: string) => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (course: Course) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function AdminCoursesTable({
  courses,
  pagination,
  searchQuery,
  isLoading,
  error,
  deleteError,
  deletingCourseId,
  onOpenCreate,
  onSearchQueryChange,
  onEditCourse,
  onDeleteCourse,
  onPreviousPage,
  onNextPage,
}: AdminCoursesTableProps) {
  return (
    <section className="catalog-panel admin-table-panel">
      <AdminCoursesToolbar
        totalCourses={pagination.total}
        searchQuery={searchQuery}
        onOpenCreate={onOpenCreate}
        onSearchQueryChange={onSearchQueryChange}
      />

      <div className="catalog-header admin-table-header">
        <div className="section-copy">
          <h2 className="catalog-title">Tabla de administracion conectada al backend.</h2>
          <p>Vista inicial para revisar el catalogo publicado. Por ahora solo lectura, pensada como base para el CRUD administrativo.</p>
        </div>
      </div>

      {error ? <p className="catalog-empty">{error}</p> : null}
      {deleteError ? <p className="catalog-empty">{deleteError}</p> : null}
      {isLoading ? <p className="catalog-empty">Cargando tabla de cursos...</p> : null}

      {!isLoading && !error ? (
        <div className="admin-table-shell">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Curso</th>
                <th>Categoria</th>
                <th>Horas</th>
                <th>Rating</th>
                <th>Precio</th>
                <th>Tags</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="admin-table-id">#{course.id}</td>
                  <td>
                    <div className="admin-course-cell">
                      <strong>{course.title}</strong>
                      <span>{course.slug}</span>
                    </div>
                  </td>
                  <td>{course.category}</td>
                  <td>{formatHours(course.hours)}</td>
                  <td>{formatRating(course.rating)}</td>
                  <td>{formatPrice(course.price)}</td>
                  <td>
                    <div className="admin-tag-list">
                      {course.tags.length > 0 ? (
                        course.tags.map((tag) => (
                          <span key={`${course.id}-${tag}`} className="admin-tag">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="admin-muted">Sin tags</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-status-badge${course.best_sellers ? ' is-highlighted' : ''}`}>
                      {course.best_sellers ? 'Best seller' : 'Catalogo'}
                    </span>
                  </td>
                  <td>
                    <AdminCourseRowActions
                      isDeleting={deletingCourseId === course.id}
                      onEdit={() => onEditCourse(course)}
                      onDelete={() => onDeleteCourse(course)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {!isLoading && !error ? (
        <AdminTablePagination
          pagination={pagination}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      ) : null}
    </section>
  );
}
