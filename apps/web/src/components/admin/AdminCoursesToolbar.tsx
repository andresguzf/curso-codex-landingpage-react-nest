type AdminCoursesToolbarProps = {
  totalCourses: number;
  searchQuery: string;
  onOpenCreate: () => void;
  onSearchQueryChange: (value: string) => void;
};

export function AdminCoursesToolbar({ totalCourses, searchQuery, onOpenCreate, onSearchQueryChange }: AdminCoursesToolbarProps) {
  return (
    <div className="admin-toolbar">
      <div className="admin-toolbar-copy">
        <span className="eyebrow">Cursos</span>
        <h2>Gestion del catalogo</h2>
        <p>{totalCourses} curso(s) registrados en el backend.</p>
      </div>

      <div className="admin-toolbar-actions">
        <label className="catalog-search admin-search" htmlFor="admin-course-search">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            id="admin-course-search"
            type="search"
            placeholder="Buscar por titulo"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
          />
        </label>
        <button className="primary-button admin-toolbar-button" type="button" onClick={onOpenCreate}>
          Nuevo curso
        </button>
      </div>
    </div>
  );
}
